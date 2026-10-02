import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';

export class SqlitePool {
  private db: DatabaseSync;
  private inTransaction = false;

  constructor(customPath?: string) {
    let resolvedPath = customPath;
    if (!resolvedPath && process.env.SQLITE_DB_PATH) {
      const envPath = path.isAbsolute(process.env.SQLITE_DB_PATH)
        ? process.env.SQLITE_DB_PATH
        : path.resolve(process.cwd(), process.env.SQLITE_DB_PATH);
      if (fs.existsSync(envPath)) {
        resolvedPath = envPath;
      }
    }

    if (!resolvedPath) {
      const candidates = [
        path.resolve(__dirname, '..', '..', 'agap_production_backup.db'),
        path.resolve(process.cwd(), 'agap_production_backup.db'),
        path.resolve(process.cwd(), '..', 'agap_production_backup.db'),
        path.resolve(__dirname, '..', 'agap_production_backup.db'),
      ];
      for (const c of candidates) {
        if (fs.existsSync(c)) {
          resolvedPath = c;
          break;
        }
      }
    }

    if (!resolvedPath || !fs.existsSync(resolvedPath)) {
      throw new Error(
        `Local SQLite database not found. Please ensure agap_production_backup.db exists in the repository root.`,
      );
    }

    console.log(`📦 Connected to Local SQLite Database: ${resolvedPath}`);
    this.db = new DatabaseSync(resolvedPath);

    // Performance and compatibility pragmas
    try {
      this.db.exec('PRAGMA journal_mode = WAL;');
      this.db.exec('PRAGMA synchronous = NORMAL;');
      this.db.exec('PRAGMA foreign_keys = ON;');
    } catch (e: any) {
      console.warn('SQLite pragma warning:', e?.message || e);
    }

    // Register PostgreSQL compatibility functions
    try {
      this.db.function('now', () => new Date().toISOString());
      this.db.function('gen_random_uuid', () => randomUUID());
    } catch (e: any) {
      console.warn('SQLite function registration warning:', e?.message || e);
    }
  }

  async query(
    sql: string,
    params: any[] = [],
  ): Promise<{ rows: any[]; rowCount: number }> {
    return this.executeQuery(sql, params);
  }

  async connect() {
    return {
      query: (sql: string, params: any[] = []) => this.executeQuery(sql, params),
      release: () => {},
    };
  }

  on(_event: string, _callback: Function) {
    // Event listener compatibility
  }

  async end() {
    try {
      this.db.close();
    } catch {}
  }

  private executeQuery(
    sql: string,
    params: any[] = [],
  ): { rows: any[]; rowCount: number } {
    let s = sql.trim();

    // 1. Transaction statements
    if (/^\s*BEGIN\b/i.test(s)) {
      try {
        this.db.exec('BEGIN TRANSACTION;');
        this.inTransaction = true;
      } catch {}
      return { rows: [], rowCount: 0 };
    }
    if (/^\s*COMMIT\b/i.test(s)) {
      try {
        this.db.exec('COMMIT;');
        this.inTransaction = false;
      } catch {}
      return { rows: [], rowCount: 0 };
    }
    if (/^\s*ROLLBACK\b/i.test(s)) {
      try {
        this.db.exec('ROLLBACK;');
        this.inTransaction = false;
      } catch {}
      return { rows: [], rowCount: 0 };
    }

    // 2. Ignore LOCK TABLE statements
    if (/^\s*LOCK\s+TABLE\b/i.test(s)) {
      return { rows: [], rowCount: 0 };
    }

    // 3. Clean PostgreSQL specific clauses
    s = s.replace(/LOCK\s+TABLE\s+[^;]+;?/gi, '');
    s = s.replace(/\bFOR\s+(?:UPDATE|SHARE)\b/gi, '');
    s = s.replace(/\bIN\s+EXCLUSIVE\s+MODE\b/gi, '');
    s = s.replace(/\bpublic\.([a-zA-Z0-9_]+)/gi, '$1');
    s = s.replace(/\bCASCADE\b/gi, '');
    s = s.replace(/DEFAULT\s+NOW\(\)/gi, 'DEFAULT (now())');
    s = s.replace(/DEFAULT\s+gen_random_uuid\(\)/gi, 'DEFAULT (gen_random_uuid())');
    s = s.replace(/\bILIKE\b/gi, 'LIKE');

    // 4. Handle DISTINCT ON (col)
    let distinctCol: string | null = null;
    const distMatch = s.match(/SELECT\s+DISTINCT\s+ON\s*\(\s*([a-zA-Z0-9_]+)\s*\)/i);
    if (distMatch) {
      distinctCol = distMatch[1];
      s = s.replace(/SELECT\s+DISTINCT\s+ON\s*\(\s*[a-zA-Z0-9_]+\s*\)/i, 'SELECT');
    }

    // 5. Rewrite '= ANY($1)' or '= ANY($1::text[])' to IN (SELECT value FROM json_each($1))
    s = s.replace(
      /([a-zA-Z0-9_.]+(?:\([^)]*\))?)\s*=\s*ANY\s*\(\s*\$(\d+)(?:::text\[\])?\s*\)/gi,
      (_m, col, num) => `${col} IN (SELECT value FROM json_each($${num}))`,
    );

    // 6. Strip PostgreSQL type casts (e.g. ::text, ::int, ::uuid, ::text[])
    s = s.replace(/::[a-zA-Z0-9_]+(?:\([^)]*\))?(?:\[\])?/g, '');

    // 7. Handle ALTER TABLE ... ADD COLUMN (SQLite doesn't support IF NOT EXISTS for columns)
    const addColMatch = s.match(
      /^\s*ALTER\s+TABLE\s+(\w+)\s+ADD\s+COLUMN\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s+([^;]+)/i,
    );
    if (addColMatch) {
      const tableName = addColMatch[1];
      const colName = addColMatch[2];
      const colType = addColMatch[3];
      try {
        const cols = (this.db.prepare(`PRAGMA table_info(${tableName})`).all() as any[]).map(
          (c) => String(c.name).toLowerCase(),
        );
        if (!cols.includes(colName.toLowerCase())) {
          this.db.exec(`ALTER TABLE ${tableName} ADD COLUMN ${colName} ${colType};`);
        }
      } catch {}
      return { rows: [], rowCount: 0 };
    }

    // 8. Handle ALTER TABLE ... DROP COLUMN
    const dropColMatch = s.match(
      /^\s*ALTER\s+TABLE\s+(\w+)\s+DROP\s+COLUMN\s+(?:IF\s+EXISTS\s+)?(\w+)/i,
    );
    if (dropColMatch) {
      const tableName = dropColMatch[1];
      const colName = dropColMatch[2];
      try {
        const cols = (this.db.prepare(`PRAGMA table_info(${tableName})`).all() as any[]).map(
          (c) => String(c.name).toLowerCase(),
        );
        if (cols.includes(colName.toLowerCase())) {
          this.db.exec(`ALTER TABLE ${tableName} DROP COLUMN ${colName};`);
        }
      } catch {}
      return { rows: [], rowCount: 0 };
    }

    // 9. Handle multi-statement scripts without parameters
    const mappedParams: any[] = [];
    if (params && params.length > 0) {
      s = s.replace(/\$(\d+)/g, (_, numStr) => {
        const idx = parseInt(numStr, 10) - 1;
        const v = params[idx];
        mappedParams.push(this.cleanParam(v));
        return '?';
      });
    } else if (s.includes(';')) {
      const statements = s
        .split(';')
        .map((st) => st.trim())
        .filter((st) => st.length > 0);

      for (const stmtSql of statements) {
        try {
          this.db.exec(stmtSql + ';');
        } catch (execErr: any) {
          // If a UNIQUE constraint failed on CREATE UNIQUE INDEX due to historical duplicates, fallback to non-unique index
          if (
            /UNIQUE constraint failed/i.test(execErr?.message || '') &&
            /CREATE\s+UNIQUE\s+INDEX/i.test(stmtSql)
          ) {
            try {
              const fallbackSql = stmtSql.replace(/CREATE\s+UNIQUE\s+INDEX/i, 'CREATE INDEX');
              this.db.exec(fallbackSql + ';');
            } catch {}
          }
        }
      }
      return { rows: [], rowCount: 0 };
    }

    // 10. Execute query
    const isSelectOrReturning =
      /^\s*(SELECT|PRAGMA|EXPLAIN)\b/i.test(s) || /\bRETURNING\b/i.test(s);

    if (isSelectOrReturning) {
      const stmt = this.db.prepare(s);
      let rows = stmt.all(...mappedParams) as any[];

      if (distinctCol && rows.length > 0) {
        const seen = new Set();
        rows = rows.filter((r) => {
          const val = r[distinctCol!];
          if (seen.has(val)) return false;
          seen.add(val);
          return true;
        });
      }

      return { rows, rowCount: rows.length };
    } else {
      const stmt = this.db.prepare(s);
      const info = stmt.run(...mappedParams);
      return { rows: [], rowCount: Number(info.changes || 0) };
    }
  }

  private cleanParam(v: any): any {
    if (v === undefined || v === null) return null;
    if (typeof v === 'boolean') return v ? 1 : 0;
    if (v instanceof Date) return v.toISOString();
    if (Array.isArray(v)) return JSON.stringify(v);
    if (typeof v === 'object') return JSON.stringify(v);
    return v;
  }
}
