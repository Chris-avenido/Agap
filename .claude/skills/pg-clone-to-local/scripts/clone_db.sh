#!/usr/bin/env bash
# Full-refresh clone of the .env source Postgres DB into localhost, then write LOCAL_DATABASE_URL.
set -euo pipefail

ENV_FILE=./.env; SOURCE_KEY=DATABASE_URL; LOCAL_DB=""; LOCAL_KEY=LOCAL_DATABASE_URL
LOCAL_ADMIN_URL="${LOCAL_PG_ADMIN_URL:-postgresql://postgres@localhost:5432/postgres}"
while [ $# -gt 0 ]; do
  case "$1" in
    --env-file) ENV_FILE=$2; shift 2;;
    --source-key) SOURCE_KEY=$2; shift 2;;
    --local-db) LOCAL_DB=$2; shift 2;;
    --local-admin-url) LOCAL_ADMIN_URL=$2; shift 2;;
    --local-key) LOCAL_KEY=$2; shift 2;;
    *) echo "[stage 1/10 parse-env] unknown argument: $1" >&2; exit 2;;
  esac
done

STAGE="0/10 init"; TMPDIR_CLONE=""; SRC_PW=""; LOC_PW=""
mask() { local s=$1; [ -n "$SRC_PW" ] && s=${s//"$SRC_PW"/***}; [ -n "$LOC_PW" ] && s=${s//"$LOC_PW"/***}; printf '%s' "$s"; }
cleanup() { [ -n "$TMPDIR_CLONE" ] && rm -rf "$TMPDIR_CLONE"; return 0; }
trap cleanup EXIT
stage() { STAGE="$1/10 $2"; echo "[stage $STAGE]"; }
fail() { echo "[stage $STAGE] ERROR: $(mask "$1")" >&2; exit 1; }
# run a command, masking secrets in its output; fail the stage on error
run() { local out; out=$("$@" 2>&1) || fail "$out"; printf '%s' "$out"; }

urldecode() { local s=$1; printf '%b' "${s//%/\\x}"; }
urlenc() { printf %s "$1" | sed -e 's/%/%25/g' -e 's/@/%40/g' -e 's/:/%3A/g' -e 's#/#%2F#g'; }
# parse_url URL PREFIX -> PREFIX_{USER,PW,HOST,PORT,DB,QS}
parse_url() {
  local u=$1 p=$2 rest auth hostport q="" db user pw="" host port=5432
  case "$u" in postgres://*|postgresql://*) ;; *) fail "not a postgres URL";; esac
  rest=${u#*://}
  if [[ "$rest" == *\?* ]]; then q=${rest#*\?}; rest=${rest%%\?*}; fi
  auth=""; if [[ "$rest" == *@* ]]; then auth=${rest%@*}; rest=${rest##*@}; fi
  hostport=${rest%%/*}; db=""; if [[ "$rest" == */* ]]; then db=${rest#*/}; fi
  user=${auth%%:*}; if [[ "$auth" == *:* ]]; then pw=${auth#*:}; fi
  if [[ "$hostport" == \[* ]]; then
    host=${hostport#\[}; host=${host%%\]*}
    if [[ "$hostport" == *\]:* ]]; then port=${hostport##*:}; fi
  else
    host=${hostport%%:*}
    if [[ "$hostport" == *:* ]]; then port=${hostport##*:}; fi
  fi
  printf -v "${p}_USER" '%s' "$(urldecode "$user")"; printf -v "${p}_PW" '%s' "$(urldecode "$pw")"
  printf -v "${p}_HOST" '%s' "$host"; printf -v "${p}_PORT" '%s' "$port"
  printf -v "${p}_DB" '%s' "$(urldecode "$db")"; printf -v "${p}_QS" '%s' "$q"
}
# password-less URL for tools; the password goes via PGPASSWORD in the child env only
mkurl() { local h=$2; if [[ "$h" == *:* ]]; then h="[$h]"; fi; printf 'postgresql://%s@%s:%s/%s%s' "$(urlenc "$1")" "$h" "$3" "$4" "${5:+?$5}"; }
is_local() { case "$1" in localhost|127.0.0.1|::1) return 0;; *) return 1;; esac; }
srvmajor() { sed -E 's/^PostgreSQL ([0-9]+).*/\1/' <<<"$1"; }

# ---- 1 parse-env
stage 1 parse-env
for t in pg_dump pg_restore psql; do command -v "$t" >/dev/null || fail "$t not found; install PostgreSQL client tools"; done
[ -f "$ENV_FILE" ] || fail "env file not found: $ENV_FILE"
line=$(grep -E "^[[:space:]]*(export[[:space:]]+)?${SOURCE_KEY}=" "$ENV_FILE" | tail -n1 || true)
[ -n "$line" ] || fail "key $SOURCE_KEY missing in $ENV_FILE"
val=${line#*=}; val=${val%$'\r'}
case "$val" in \"*\") val=${val#\"}; val=${val%\"};; \'*\') val=${val#\'}; val=${val%\'};; esac
parse_url "$val" S; parse_url "$LOCAL_ADMIN_URL" A
SRC_PW=$S_PW; LOC_PW=$A_PW; unset val line
[ -n "$S_DB" ] || fail "source URL has no database name"
[ -n "$LOCAL_DB" ] || LOCAL_DB="${S_DB}_local"
SRC_URL=$(mkurl "$S_USER" "$S_HOST" "$S_PORT" "$S_DB" "$S_QS")
ADM_URL=$(mkurl "$A_USER" "$A_HOST" "$A_PORT" "$A_DB" "$A_QS")
LOC_URL=$(mkurl "$A_USER" "$A_HOST" "$A_PORT" "$LOCAL_DB" "$A_QS")
echo "source: $S_HOST:$S_PORT/$S_DB (read-only) -> local: $A_HOST:$A_PORT/$LOCAL_DB"
sq() { PGPASSWORD="$SRC_PW" psql "$SRC_URL" -X -v ON_ERROR_STOP=1 "$@"; }
lq() { PGPASSWORD="$LOC_PW" psql "$LOC_URL" -X -v ON_ERROR_STOP=1 "$@"; }
aq() { PGPASSWORD="$LOC_PW" psql "$ADM_URL" -X -v ON_ERROR_STOP=1 "$@"; }

# ---- 2 safety
stage 2 safety
is_local "$A_HOST" || fail "local admin host must be localhost/127.0.0.1/::1 (got $A_HOST)"
if is_local "$S_HOST" && [ "$S_PORT" = "$A_PORT" ] && [ "$LOCAL_DB" = "$S_DB" ]; then
  fail "refusing to drop '$LOCAL_DB': same host, port and name as the source"
fi
[[ "$LOCAL_DB" =~ ^[A-Za-z0-9_]+$ ]] || fail "local db name must match [A-Za-z0-9_]+"

# ---- 3 connectivity
stage 3 connectivity
SRC_VER=$(run sq -Atc "select version()")
LOC_VER=$(run aq -Atc "select version()")
DUMP_MAJOR=$(pg_dump --version | sed -E 's/[^0-9]*([0-9]+).*/\1/')
SRC_MAJOR=$(srvmajor "$SRC_VER"); LOC_MAJOR=$(srvmajor "$LOC_VER")
[ "$DUMP_MAJOR" -ge "$SRC_MAJOR" ] || fail "pg_dump $DUMP_MAJOR is older than source server $SRC_MAJOR; install a matching client"
[ "$LOC_MAJOR" -ge "$SRC_MAJOR" ] || fail "local server $LOC_MAJOR is older than source $SRC_MAJOR; restore may fail"

TMPDIR_CLONE=$(mktemp -d); DUMP="$TMPDIR_CLONE/source.dump"

# ---- 4 dump
stage 4 dump
PGPASSWORD="$SRC_PW" pg_dump --format=custom --no-owner --no-privileges --no-acl --dbname "$SRC_URL" --file "$DUMP" 2>"$TMPDIR_CLONE/err" \
  || fail "pg_dump failed: $(cat "$TMPDIR_CLONE/err")"

# ---- 5 source-stats (one read-only repeatable-read transaction)
stage 5 source-stats
cat > "$TMPDIR_CLONE/stats.sql" <<'SQL'
BEGIN ISOLATION LEVEL REPEATABLE READ READ ONLY;
select 'T|'||n.nspname||'.'||c.relname||'|'||(xpath('/row/c/text()', query_to_xml(format('select count(*) as c from %I.%I', n.nspname, c.relname), false, true, '')))[1]::text
  from pg_class c join pg_namespace n on n.oid=c.relnamespace
 where c.relkind in ('r','p') and not c.relispartition and n.nspname not in ('pg_catalog','information_schema') and n.nspname !~ '^pg_' order by 1;
select 'N|tables|'||count(*) from pg_class c join pg_namespace n on n.oid=c.relnamespace where c.relkind in ('r','p') and n.nspname not in ('pg_catalog','information_schema') and n.nspname !~ '^pg_';
select 'N|indexes|'||count(*) from pg_indexes where schemaname not in ('pg_catalog','information_schema') and schemaname !~ '^pg_';
select 'N|sequences|'||count(*) from pg_class c join pg_namespace n on n.oid=c.relnamespace where c.relkind='S' and n.nspname not in ('pg_catalog','information_schema') and n.nspname !~ '^pg_';
COMMIT;
SQL
sq -At -f "$TMPDIR_CLONE/stats.sql" >"$TMPDIR_CLONE/src.raw" 2>"$TMPDIR_CLONE/err" || fail "stats failed: $(cat "$TMPDIR_CLONE/err")"
grep -E '^[TN]\|' "$TMPDIR_CLONE/src.raw" > "$TMPDIR_CLONE/src.stats" || true

# ---- 6 prepare-local
stage 6 prepare-local
EXISTED=$(run aq -Atc "select count(*) from pg_database where datname='$LOCAL_DB'")
run aq -Atc "select pg_terminate_backend(pid) from pg_stat_activity where datname='$LOCAL_DB' and pid<>pg_backend_pid()" >/dev/null
run aq -c "DROP DATABASE IF EXISTS \"$LOCAL_DB\"" >/dev/null
run aq -c "CREATE DATABASE \"$LOCAL_DB\"" >/dev/null
if [ "$EXISTED" = 1 ]; then MODE="refreshed existing"; else MODE="created new"; fi

# ---- 7 restore
stage 7 restore
EXT=$(sq -Atc "select extname from pg_extension where extname<>'plpgsql'" 2>/dev/null || true)
for e in $EXT; do
  run lq -c "CREATE EXTENSION IF NOT EXISTS \"$e\"" >/dev/null || fail "required extension not available locally: $e"
done
PGPASSWORD="$LOC_PW" pg_restore --no-owner --no-privileges --exit-on-error --dbname "$LOC_URL" "$DUMP" 2>"$TMPDIR_CLONE/err" \
  || fail "pg_restore failed: $(cat "$TMPDIR_CLONE/err")"

# ---- 8 verify
stage 8 verify
lq -At -f "$TMPDIR_CLONE/stats.sql" >"$TMPDIR_CLONE/loc.raw" 2>"$TMPDIR_CLONE/err" || fail "local stats failed: $(cat "$TMPDIR_CLONE/err")"
grep -E '^[TN]\|' "$TMPDIR_CLONE/loc.raw" > "$TMPDIR_CLONE/loc.stats" || true
RESULT=PASS
printf '%-45s %12s %12s %s\n' "table" "source" "local" "status"
while IFS='|' read -r kind name cnt; do
  l=$(awk -F'|' -v k="$kind" -v n="$name" '$1==k && $2==n {print $3}' "$TMPDIR_CLONE/loc.stats")
  if [ "$cnt" = "$l" ]; then st=OK; else st=MISMATCH; RESULT=FAIL; fi
  printf '%-45s %12s %12s %s\n' "$name" "$cnt" "${l:-missing}" "$st"
done < "$TMPDIR_CLONE/src.stats"
[ "$(wc -l < "$TMPDIR_CLONE/src.stats")" = "$(wc -l < "$TMPDIR_CLONE/loc.stats")" ] || RESULT=FAIL
echo "RESULT: $RESULT"
[ "$RESULT" = PASS ] || fail "verification failed; .env untouched"

# ---- 9 update-env
stage 9 update-env
NEW_URL="postgresql://$(urlenc "$A_USER")"
if [ -n "$A_PW" ]; then NEW_URL+=":$(urlenc "$A_PW")"; fi
h=$A_HOST; if [[ "$h" == *:* ]]; then h="[$h]"; fi
NEW_URL+="@$h:$A_PORT/$LOCAL_DB${A_QS:+?$A_QS}"
before_src=$(grep -E "^[[:space:]]*(export[[:space:]]+)?${SOURCE_KEY}=" "$ENV_FILE" || true)
TMP_ENV=$(mktemp "$(dirname "$ENV_FILE")/.env.XXXXXX")
found=0
{
  while IFS= read -r l || [ -n "$l" ]; do
    if [[ "$l" == "${LOCAL_KEY}="* ]]; then
      if [ "$found" = 0 ]; then printf '%s=%s\n' "$LOCAL_KEY" "$NEW_URL"; fi
      found=1
    else
      printf '%s\n' "$l"
    fi
  done < "$ENV_FILE"
  if [ "$found" = 0 ]; then printf '%s=%s\n' "$LOCAL_KEY" "$NEW_URL"; fi
} > "$TMP_ENV"
chmod --reference="$ENV_FILE" "$TMP_ENV" 2>/dev/null || chmod 600 "$TMP_ENV"
mv "$TMP_ENV" "$ENV_FILE"
after_src=$(grep -E "^[[:space:]]*(export[[:space:]]+)?${SOURCE_KEY}=" "$ENV_FILE" || true)
[ "$before_src" = "$after_src" ] || fail "source key line changed (unexpected)"
[ "$(grep -c "^${LOCAL_KEY}=" "$ENV_FILE")" = 1 ] || fail "expected exactly one $LOCAL_KEY line"
git check-ignore -q "$ENV_FILE" 2>/dev/null || echo "WARNING: $ENV_FILE is not gitignored (or not in a git repo)"

# ---- 10 report
stage 10 report
echo "mode:        $MODE"
echo "source:      $S_HOST:$S_PORT/$S_DB"
echo "local db:    $LOCAL_DB"
echo "env key:     $LOCAL_KEY written to $ENV_FILE"
echo "local url:   postgresql://$A_USER${A_PW:+:***}@$A_HOST:$A_PORT/$LOCAL_DB"
echo "RESULT: PASS"
