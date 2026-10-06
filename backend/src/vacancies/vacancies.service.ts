import { pool } from '../database';

export class VacanciesService {
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
            AND (a.job_cluster_id = c.id OR a.job_cluster_id::text = c.id::text)
        )
      )`;
    }

    if (applicantEmails.length > 0) {
      queryParams.push(applicantEmails);
      const emailParamIndex = `$${queryParams.length}`;
      hasAllowedEmailClause = `(
        EXISTS (
          SELECT 1 FROM agap_invited ai 
          WHERE (ai.job_cluster_id IS NULL OR ai.job_cluster_id::text = c.id::text OR REPLACE(ai.job_cluster_id::text, '-', '') = REPLACE(c.id::text, '-', ''))
            AND LOWER(TRIM(ai.email)) = ANY(${emailParamIndex}::text[])
        )
      )`;
      allowedEmailCondition = hasAllowedEmailClause;
    }

    const vacancyCondition = `(
      (v.status = 'open' AND (v.filling_up_status = 'UNFILLED' OR v.filling_up_status IS NULL))
      OR ${allowedEmailCondition}
      ${isTestApplicant ? "OR v.is_test IS TRUE OR (UPPER(c.region) = 'CENTRAL OFFICE' AND UPPER(c.division) IN ('BHROD', 'SED'))" : ""}
    )`;

    let filterCondition = '';
    if (isTestApplicant) {
      // Test applicant: ONLY show test vacancies (where is_test is true or CENTRAL OFFICE BHROD/SED or invited)
      filterCondition = `
        AND (
          ${hasAllowedEmailClause}
          OR (UPPER(c.region) = 'CENTRAL OFFICE' AND UPPER(c.division) IN ('BHROD', 'SED'))
          OR (EXISTS (SELECT 1 FROM vacancies v WHERE (v.job_cluster_id = c.id OR v.job_cluster_id::text = c.id::text) AND v.is_test IS TRUE))
        )
      `;
    } else {
      // Regular applicant / Public: DO NOT display BHROD & SED under CENTRAL OFFICE and DO NOT display test vacancies (unless explicitly permitted via agap_invited)
      filterCondition = `
        AND (
          ${hasAllowedEmailClause}
          OR NOT (
            (UPPER(c.region) = 'CENTRAL OFFICE' AND UPPER(c.division) IN ('BHROD', 'SED'))
            OR (EXISTS (SELECT 1 FROM vacancies v WHERE (v.job_cluster_id = c.id OR v.job_cluster_id::text = c.id::text) AND v.is_test IS TRUE))
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
        (SELECT COUNT(*) FROM vacancies v WHERE (v.job_cluster_id = c.id OR v.job_cluster_id::text = c.id::text) AND ${vacancyCondition})::int as "vacantItemCount",
        (SELECT MIN(posting_start) FROM vacancies v WHERE (v.job_cluster_id = c.id OR v.job_cluster_id::text = c.id::text) AND ${vacancyCondition}) as "posting_start",
        (SELECT MAX(posting_end) FROM vacancies v WHERE (v.job_cluster_id = c.id OR v.job_cluster_id::text = c.id::text) AND ${vacancyCondition}) as "posting_end",
        ${hasAllowedEmailClause} as "has_allowed_email_access",
        (EXISTS (
          SELECT 1 FROM vacancies v 
          WHERE (v.job_cluster_id = c.id OR v.job_cluster_id::text = c.id::text) 
            AND v.status = 'open' 
            AND (v.filling_up_status = 'UNFILLED' OR v.filling_up_status IS NULL)
        )) as "has_open_vacancies",
        ${alreadyAppliedClause} as "already_applied",
        p.required_bachelor_degree,
        p.required_degree_keywords,
        p.years_experience as "min_years_experience",
        p.training_hours as "min_training_hours",
        p.eligibility_required,
        (EXISTS (SELECT 1 FROM vacancies v WHERE (v.job_cluster_id = c.id OR v.job_cluster_id::text = c.id::text) AND v.is_test IS TRUE)) as "is_test"
      FROM job_clusters c
      JOIN positions p ON c.position_id = p.id
      WHERE EXISTS (
        SELECT 1 FROM vacancies v 
        WHERE (v.job_cluster_id = c.id OR v.job_cluster_id::text = c.id::text) 
          AND ${vacancyCondition}
      )
      AND NOT (
        -- If cluster has NO open vacancies (status is closed / expired)
        NOT EXISTS (
          SELECT 1 FROM vacancies v 
          WHERE (v.job_cluster_id = c.id OR v.job_cluster_id::text = c.id::text) 
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
        is_invited: Boolean(row.has_allowed_email_access),
        isInvited: Boolean(row.has_allowed_email_access),
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

    // Test applicants will have Central Office added to all other regions

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
    const regions: string[] = regionsResult.rows.map((r) => r.region);
    const divisions: string[] = divisionsResult.rows.map((r) => r.division);

    regdivResult.rows.forEach((r) => {
      if (!divisionsByRegion[r.region]) divisionsByRegion[r.region] = [];
      if (r.division && !divisionsByRegion[r.region].includes(r.division)) {
        divisionsByRegion[r.region].push(r.division);
      }
    });

    // If applicant has invited clusters in agap_invited, also include those regions and divisions in the available locations
    if (applicantEmails.length > 0) {
      const invitedLocs = await pool.query(
        `SELECT DISTINCT c.region, c.division 
         FROM agap_invited ai
         JOIN job_clusters c ON (ai.job_cluster_id::text = c.id::text OR REPLACE(ai.job_cluster_id::text, '-', '') = REPLACE(c.id::text, '-', ''))
         WHERE LOWER(TRIM(ai.email)) = ANY($1::text[]) AND c.region IS NOT NULL AND c.division IS NOT NULL`,
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

