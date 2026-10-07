import { pool } from '../database';

export class VacanciesService {
  private static cachedBaseLocations: {
    regions: string[];
    divisions: string[];
    divisionsByRegion: Record<string, string[]>;
    timestamp: number;
  } | null = null;

  static async getOpenVacancies(applicantId?: string | number | null, explicitEmail?: string | null) {
    let isTestApplicant = false;
    const applicantEmails: string[] = [];
    let authenticatedApplicantNumId: number | null = null;

    if (applicantId) {
      const numId = Number(applicantId);
      const appRes = !isNaN(numId)
        ? await pool.query(
            'SELECT id, is_test, email_address, alternate_email, email FROM applicants WHERE id = $1',
            [numId],
          )
        : await pool.query(
            'SELECT id, is_test, email_address, alternate_email, email FROM applicants WHERE id::text = $1 OR applicant_number = $1',
            [String(applicantId)],
          );

      if (appRes.rows.length > 0) {
        authenticatedApplicantNumId = appRes.rows[0].id ? Number(appRes.rows[0].id) : (!isNaN(numId) ? numId : null);
        if (appRes.rows[0].is_test === true) {
          isTestApplicant = true;
        }
        if (appRes.rows[0].email_address) {
          const email = String(appRes.rows[0].email_address).trim().toLowerCase();
          if (email && !applicantEmails.includes(email)) {
            applicantEmails.push(email);
          }
        }
        if (appRes.rows[0].alternate_email) {
          const altEmail = String(appRes.rows[0].alternate_email).trim().toLowerCase();
          if (altEmail && !applicantEmails.includes(altEmail)) {
            applicantEmails.push(altEmail);
          }
        }
        if (appRes.rows[0].email) {
          const mainEmail = String(appRes.rows[0].email).trim().toLowerCase();
          if (mainEmail && !applicantEmails.includes(mainEmail)) {
            applicantEmails.push(mainEmail);
          }
        }
      }
    }

    if (explicitEmail) {
      const cleanEmail = String(explicitEmail).trim().toLowerCase();
      if (cleanEmail && !applicantEmails.includes(cleanEmail)) {
        applicantEmails.push(cleanEmail);
      }
    }

    // Pre-fetch invited clusters and already applied clusters in parallel (Fast indexed queries)
    const [invitedRes, appliedRes] = await Promise.all([
      applicantEmails.length > 0
        ? pool.query(
            `SELECT DISTINCT job_cluster_id FROM agap_invited WHERE LOWER(TRIM(email)) = ANY($1::text[]) AND (is_revoked IS NOT TRUE)`,
            [applicantEmails],
          )
        : Promise.resolve({ rows: [] }),
      authenticatedApplicantNumId !== null
        ? pool.query(
            `SELECT DISTINCT job_cluster_id FROM applications WHERE applicant_id = $1 OR applicant_id::text = $2`,
            [authenticatedApplicantNumId, String(authenticatedApplicantNumId)],
          )
        : Promise.resolve({ rows: [] }),
    ]);

    const invitedClusterIds: string[] = [];
    let hasGlobalInvite = false;
    invitedRes.rows.forEach((r: any) => {
      if (!r.job_cluster_id) {
        hasGlobalInvite = true;
      } else {
        invitedClusterIds.push(String(r.job_cluster_id).trim());
      }
    });

    const appliedClusterIds = new Set<string>();
    appliedRes.rows.forEach((r: any) => {
      if (r.job_cluster_id) {
        appliedClusterIds.add(String(r.job_cluster_id).trim());
      }
    });

    let filterCondition = '';
    if (isTestApplicant) {
      filterCondition = `
        AND (
          $1::boolean IS TRUE
          OR c.id = ANY($2::text[])
          OR (UPPER(c.region) = 'CENTRAL OFFICE' AND UPPER(c.division) IN ('BHROD', 'SED'))
          OR mv."is_test" IS TRUE
        )
      `;
    } else {
      filterCondition = `
        AND (
          $1::boolean IS TRUE
          OR c.id = ANY($2::text[])
          OR NOT (
            (UPPER(c.region) = 'CENTRAL OFFICE' AND UPPER(c.division) IN ('BHROD', 'SED'))
            OR mv."is_test" IS TRUE
          )
        )
      `;
    }

    const result = await pool.query(
      `
      WITH matched_vacancies AS (
        SELECT 
          v.job_cluster_id,
          COUNT(*)::int as "vacantItemCount",
          MIN(v.posting_start) as "posting_start",
          MAX(v.posting_end) as "posting_end",
          BOOL_OR(v.status = 'open' AND (UPPER(TRIM(COALESCE(v.filling_up_status, ''))) = 'UNFILLED' OR v.filling_up_status IS NULL)) as "has_open_vacancies",
          BOOL_OR(v.is_test IS TRUE) as "is_test"
        FROM vacancies v
        WHERE (
          (UPPER(TRIM(COALESCE(v.filling_up_status, ''))) = 'UNFILLED' OR v.filling_up_status IS NULL)
          AND (
            v.status = 'open'
            OR $1::boolean IS TRUE
            OR v.job_cluster_id = ANY($2::text[])
            ${isTestApplicant ? "OR v.is_test IS TRUE" : ""}
          )
        )
        GROUP BY v.job_cluster_id
      )
      SELECT 
        c.id as "jobClusterId",
        p.title as "positionTitle",
        c.region as "region",
        c.division as "division",
        p.salary_grade as "salaryGrade",
        mv."vacantItemCount",
        mv."posting_start",
        mv."posting_end",
        mv."has_open_vacancies",
        COALESCE(mv."is_test", false) as "is_test",
        p.required_bachelor_degree,
        p.required_degree_keywords,
        p.years_experience as "min_years_experience",
        p.training_hours as "min_training_hours",
        p.eligibility_required
      FROM matched_vacancies mv
      JOIN job_clusters c ON c.id = mv.job_cluster_id
      JOIN positions p ON c.position_id = p.id
      WHERE mv."vacantItemCount" > 0
      ${filterCondition}
      ORDER BY mv."posting_start" DESC NULLS LAST
    `,
      [hasGlobalInvite, invitedClusterIds],
    );

    // Process response shape and check posting window
    const now = new Date();
    return result.rows
      .filter((row) => {
        const isInvited = hasGlobalInvite || invitedClusterIds.includes(String(row.jobClusterId).trim());
        const alreadyApplied = appliedClusterIds.has(String(row.jobClusterId).trim());

        // If the cluster has NO open vacancies (closed/expired) and applicant already applied, do NOT display
        if (!row.has_open_vacancies && alreadyApplied) {
          return false;
        }
        if (isInvited) {
          return true;
        }
        const start = row.posting_start ? new Date(row.posting_start) : null;
        const end = row.posting_end ? new Date(row.posting_end) : null;
        if (start && start > now) return false;
        if (end && end < now) return false;
        return true;
      })
      .map((row) => {
        const isInvited = hasGlobalInvite || invitedClusterIds.includes(String(row.jobClusterId).trim());
        return {
          jobClusterId: row.jobClusterId,
          positionTitle: row.positionTitle,
          region: row.region,
          division: row.division,
          salaryGrade: row.salaryGrade,
          vacantItemCount: row.vacantItemCount,
          qualificationStandards: {
            requiredBachelorDegree: row.required_bachelor_degree,
            requiredDegreeKeywords: row.required_degree_keywords,
            minYearsExperience: row.min_years_experience,
            minTrainingHours: row.min_training_hours,
            eligibilityRequired: row.eligibility_required,
          },
          posting_start: row.posting_start,
          posting_end: row.posting_end,
          is_test: Boolean(row.is_test),
          has_allowed_email_access: Boolean(isInvited),
          is_invited: Boolean(isInvited),
          isInvited: Boolean(isInvited),
        };
      });
  }

  static async markExpiredVacancies() {
    const result = await pool.query(`
      UPDATE vacancies
      SET status = 'EXPIRED'
      WHERE status = 'open' AND posting_end <= CURRENT_DATE
    `);
    return result.rowCount;
  }

  static async getAgapLocations(applicantId?: string | number | null, explicitEmail?: string | null) {
    let isTestApplicant = false;
    const applicantEmails: string[] = [];

    if (applicantId) {
      const numId = Number(applicantId);
      const appRes = !isNaN(numId)
        ? await pool.query(
            'SELECT id, is_test, email_address, alternate_email, email FROM applicants WHERE id = $1',
            [numId],
          )
        : await pool.query(
            'SELECT id, is_test, email_address, alternate_email, email FROM applicants WHERE id::text = $1 OR applicant_number = $1',
            [String(applicantId)],
          );

      if (appRes.rows.length > 0) {
        if (appRes.rows[0].is_test === true) {
          isTestApplicant = true;
        }
        if (appRes.rows[0].email_address) {
          const email = String(appRes.rows[0].email_address).trim().toLowerCase();
          if (email && !applicantEmails.includes(email)) {
            applicantEmails.push(email);
          }
        }
        if (appRes.rows[0].alternate_email) {
          const altEmail = String(appRes.rows[0].alternate_email).trim().toLowerCase();
          if (altEmail && !applicantEmails.includes(altEmail)) {
            applicantEmails.push(altEmail);
          }
        }
        if (appRes.rows[0].email) {
          const mainEmail = String(appRes.rows[0].email).trim().toLowerCase();
          if (mainEmail && !applicantEmails.includes(mainEmail)) {
            applicantEmails.push(mainEmail);
          }
        }
      }
    }

    if (explicitEmail) {
      const cleanEmail = String(explicitEmail).trim().toLowerCase();
      if (cleanEmail && !applicantEmails.includes(cleanEmail)) {
        applicantEmails.push(cleanEmail);
      }
    }

    // Cache base locations from agap_schools in-memory for 10 minutes to avoid slow multi-second scans
    const now = Date.now();
    if (!this.cachedBaseLocations || now - this.cachedBaseLocations.timestamp > 10 * 60 * 1000) {
      const regdivResult = await pool.query(
        "SELECT DISTINCT region, division FROM agap_schools WHERE region IS NOT NULL AND division IS NOT NULL AND NOT (region = 'CENTRAL OFFICE' AND division IN ('BHROD', 'SED')) ORDER BY region, division",
      );
      const divisionsByRegion: Record<string, string[]> = {};
      const regionsSet = new Set<string>();
      const divisionsSet = new Set<string>();

      regdivResult.rows.forEach((r) => {
        const reg = String(r.region).trim();
        const div = String(r.division).trim();
        if (reg) regionsSet.add(reg);
        if (div) divisionsSet.add(div);
        if (reg) {
          if (!divisionsByRegion[reg]) divisionsByRegion[reg] = [];
          if (div && !divisionsByRegion[reg].includes(div)) {
            divisionsByRegion[reg].push(div);
          }
        }
      });

      this.cachedBaseLocations = {
        regions: Array.from(regionsSet).sort(),
        divisions: Array.from(divisionsSet).sort(),
        divisionsByRegion,
        timestamp: now,
      };
    }

    const regions = [...this.cachedBaseLocations.regions];
    const divisions = [...this.cachedBaseLocations.divisions];
    const divisionsByRegion: Record<string, string[]> = {};
    for (const [k, v] of Object.entries(this.cachedBaseLocations.divisionsByRegion)) {
      divisionsByRegion[k] = [...v];
    }

    // If applicant has invited clusters in agap_invited, also include those regions and divisions in the available locations
    if (applicantEmails.length > 0) {
      const invitedLocs = await pool.query(
        `SELECT DISTINCT c.region, c.division 
         FROM agap_invited ai
         JOIN job_clusters c ON (ai.job_cluster_id = c.id OR ai.job_cluster_id::text = c.id::text)
         WHERE LOWER(TRIM(ai.email)) = ANY($1::text[]) AND c.region IS NOT NULL AND c.division IS NOT NULL AND (ai.is_revoked IS NOT TRUE)`,
        [applicantEmails],
      );
      invitedLocs.rows.forEach((r) => {
        const reg = String(r.region).trim();
        const div = String(r.division).trim();
        if (reg && !regions.includes(reg)) {
          regions.push(reg);
        }
        if (div && !divisions.includes(div)) {
          divisions.push(div);
        }
        if (reg) {
          if (!divisionsByRegion[reg]) divisionsByRegion[reg] = [];
          if (div && !divisionsByRegion[reg].includes(div)) {
            divisionsByRegion[reg].push(div);
          }
        }
      });
    }

    if (isTestApplicant) {
      if (!regions.includes('CENTRAL OFFICE')) {
        regions.unshift('CENTRAL OFFICE');
      }
      if (!divisions.includes('BHROD')) divisions.push('BHROD');
      if (!divisions.includes('SED')) divisions.push('SED');
      if (!divisionsByRegion['CENTRAL OFFICE']) divisionsByRegion['CENTRAL OFFICE'] = [];
      if (!divisionsByRegion['CENTRAL OFFICE'].includes('BHROD')) divisionsByRegion['CENTRAL OFFICE'].push('BHROD');
      if (!divisionsByRegion['CENTRAL OFFICE'].includes('SED')) divisionsByRegion['CENTRAL OFFICE'].push('SED');
    }

    return {
      regions,
      divisions,
      divisionsByRegion,
    };
  }
}

