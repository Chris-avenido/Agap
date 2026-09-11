import { pool } from '../database';

export class VacanciesService {
  static async getOpenVacancies(applicantId?: string | number | null) {
    let isTestApplicant = false;
    const applicantEmails: string[] = [];
    let authenticatedApplicantNumId: number | null = null;

    if (applicantId) {
      const numId = Number(applicantId);
      if (!isNaN(numId)) {
        authenticatedApplicantNumId = numId;
        const appRes = await pool.query(
          'SELECT is_test, email_address, alternate_email FROM applicants WHERE id = $1',
          [numId],
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
        }
      }
    }

    const queryParams: any[] = [];
    let hasAllowedEmailClause = 'FALSE';
    let allowedEmailCondition = 'FALSE';
    let alreadyAppliedClause = 'FALSE';

    if (authenticatedApplicantNumId !== null) {
      queryParams.push(authenticatedApplicantNumId);
      const appNumIdIndex = `$${queryParams.length}`;
      alreadyAppliedClause = `(
        EXISTS (
          SELECT 1 FROM applications a 
          WHERE (a.applicant_id = ${appNumIdIndex} OR a.applicant_id::text = ${appNumIdIndex}::text)
            AND a.job_cluster_id = c.id
        )
      )`;
    }

    if (applicantEmails.length > 0) {
      queryParams.push(applicantEmails);
      const emailParamIndex = `$${queryParams.length}`;
      allowedEmailCondition = `(
        v.allowed_emails IS NOT NULL 
        AND jsonb_typeof(v.allowed_emails) = 'array' 
        AND EXISTS (
          SELECT 1 FROM jsonb_array_elements_text(v.allowed_emails) AS elem 
          WHERE LOWER(TRIM(elem)) = ANY(${emailParamIndex}::text[])
        )
      )`;
      hasAllowedEmailClause = `(
        EXISTS (
          SELECT 1 FROM vacancies v 
          WHERE v.job_cluster_id = c.id 
            AND ${allowedEmailCondition}
        )
      )`;
    }

    const vacancyCondition = `(
      (v.status = 'open' AND (v.filling_up_status = 'UNFILLED' OR v.filling_up_status IS NULL))
      OR ${allowedEmailCondition}
    )`;

    let filterCondition = '';
    if (isTestApplicant) {
      // Test applicant: ONLY show CENTRAL OFFICE (BHROD & SED)
      filterCondition = `
        AND (
          (UPPER(c.region) = 'CENTRAL OFFICE' AND UPPER(c.division) = 'BHROD') OR
          (UPPER(c.region) = 'CENTRAL OFFICE' AND UPPER(c.division) = 'SED')
        )
      `;
    } else {
      // Regular applicant / Public: DO NOT display BHROD & SED under CENTRAL OFFICE and DO NOT display test vacancies (unless explicitly permitted via allowed_emails)
      filterCondition = `
        AND (
          ${hasAllowedEmailClause}
          OR NOT (
            (UPPER(c.region) = 'CENTRAL OFFICE' AND UPPER(c.division) IN ('BHROD', 'SED'))
            OR (EXISTS (SELECT 1 FROM vacancies v WHERE v.job_cluster_id = c.id AND v.is_test IS TRUE))
          )
        )
      `;
    }

    const result = await pool.query(
      `
      SELECT 
        c.id as "jobClusterId",
        p.title as "positionTitle",
        c.region as "region",
        c.division as "division",
        p.salary_grade as "salaryGrade",
        (SELECT COUNT(*) FROM vacancies v WHERE v.job_cluster_id = c.id AND ${vacancyCondition})::int as "vacantItemCount",
        (SELECT MIN(posting_start) FROM vacancies v WHERE v.job_cluster_id = c.id AND ${vacancyCondition}) as "posting_start",
        (SELECT MAX(posting_end) FROM vacancies v WHERE v.job_cluster_id = c.id AND ${vacancyCondition}) as "posting_end",
        ${hasAllowedEmailClause} as "has_allowed_email_access",
        (EXISTS (
          SELECT 1 FROM vacancies v 
          WHERE v.job_cluster_id = c.id 
            AND v.status = 'open' 
            AND (v.filling_up_status = 'UNFILLED' OR v.filling_up_status IS NULL)
        )) as "has_open_vacancies",
        ${alreadyAppliedClause} as "already_applied",
        p.required_bachelor_degree,
        p.required_degree_keywords,
        p.years_experience as "min_years_experience",
        p.training_hours as "min_training_hours",
        p.eligibility_required,
        (EXISTS (SELECT 1 FROM vacancies v WHERE v.job_cluster_id = c.id AND v.is_test IS TRUE)) as "is_test"
      FROM job_clusters c
      JOIN positions p ON c.position_id = p.id
      WHERE EXISTS (
        SELECT 1 FROM vacancies v 
        WHERE v.job_cluster_id = c.id 
          AND ${vacancyCondition}
      )
      AND NOT (
        -- If cluster has NO open vacancies (status is closed / expired)
        NOT EXISTS (
          SELECT 1 FROM vacancies v 
          WHERE v.job_cluster_id = c.id 
            AND v.status = 'open' 
            AND (v.filling_up_status = 'UNFILLED' OR v.filling_up_status IS NULL)
        )
        -- AND applicant has already applied for this job cluster in applications
        AND ${alreadyAppliedClause}
      )
      ${filterCondition}
      ORDER BY posting_start DESC
    `,
      queryParams,
    );

    // Process response shape and check posting window
    const now = new Date();
    return result.rows
      .filter((row) => {
        // If the cluster has NO open vacancies (closed/expired) and applicant already applied, do NOT display
        if (!row.has_open_vacancies && row.already_applied) {
          return false;
        }
        if (row.has_allowed_email_access) {
          return true;
        }
        const start = row.posting_start ? new Date(row.posting_start) : null;
        const end = row.posting_end ? new Date(row.posting_end) : null;
        if (start && start > now) return false;
        if (end && end < now) return false;
        return true;
      })
      .map((row) => ({
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
        // Keep posting_start and end for frontend display if needed
        posting_start: row.posting_start,
        posting_end: row.posting_end,
        is_test: Boolean(row.is_test),
        has_allowed_email_access: Boolean(row.has_allowed_email_access),
      }));
  }

  static async markExpiredVacancies() {
    const result = await pool.query(`
      UPDATE vacancies
      SET status = 'EXPIRED'
      WHERE status = 'open' AND posting_end <= CURRENT_DATE
    `);
    return result.rowCount;
  }

  static async getAgapLocations(applicantId?: string | number | null) {
    let isTestApplicant = false;
    if (applicantId) {
      const numId = Number(applicantId);
      if (!isNaN(numId)) {
        const appRes = await pool.query(
          'SELECT is_test FROM applicants WHERE id = $1',
          [numId],
        );
        if (appRes.rows.length > 0 && appRes.rows[0].is_test === true) {
          isTestApplicant = true;
        }
      }
    }

    if (isTestApplicant) {
      return {
        regions: ['CENTRAL OFFICE'],
        divisions: ['BHROD', 'SED'],
        divisionsByRegion: {
          'CENTRAL OFFICE': ['BHROD', 'SED'],
        },
      };
    }

    const [regionsResult, divisionsResult, regdivResult] = await Promise.all([
      pool.query(
        "SELECT region FROM agap_schools WHERE region IS NOT NULL AND region != 'CENTRAL OFFICE' GROUP BY region ORDER BY region",
      ),
      pool.query(
        "SELECT division FROM agap_schools WHERE division IS NOT NULL AND division NOT IN ('BHROD', 'SED') GROUP BY division ORDER BY division",
      ),
      pool.query(
        "SELECT DISTINCT region, division FROM agap_schools WHERE region IS NOT NULL AND division IS NOT NULL AND NOT (region = 'CENTRAL OFFICE' AND division IN ('BHROD', 'SED')) ORDER BY region, division",
      ),
    ]);

    const divisionsByRegion: Record<string, string[]> = {};
    regdivResult.rows.forEach((r) => {
      if (!divisionsByRegion[r.region]) divisionsByRegion[r.region] = [];
      if (r.division && !divisionsByRegion[r.region].includes(r.division)) {
        divisionsByRegion[r.region].push(r.division);
      }
    });

    return {
      regions: regionsResult.rows.map((r) => r.region),
      divisions: divisionsResult.rows.map((r) => r.division),
      divisionsByRegion,
    };
  }
}
