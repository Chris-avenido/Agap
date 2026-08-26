import { pool } from '../database';

export class VacanciesService {
  static async getOpenVacancies(applicantId?: string | number | null) {
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
      // Regular applicant / Public: DO NOT display BHROD & SED under CENTRAL OFFICE and DO NOT display test vacancies
      filterCondition = `
        AND NOT (
          (UPPER(c.region) = 'CENTRAL OFFICE' AND UPPER(c.division) IN ('BHROD', 'SED'))
          OR (EXISTS (SELECT 1 FROM vacancies v WHERE v.job_cluster_id = c.id AND v.is_test IS TRUE))
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
        (SELECT COUNT(*) FROM vacancies v WHERE v.job_cluster_id = c.id AND v.status = 'open' AND (v.filling_up_status = 'UNFILLED' OR v.filling_up_status IS NULL))::int as "vacantItemCount",
        (SELECT MIN(posting_start) FROM vacancies v WHERE v.job_cluster_id = c.id AND v.status = 'open') as "posting_start",
        (SELECT MAX(posting_end) FROM vacancies v WHERE v.job_cluster_id = c.id AND v.status = 'open') as "posting_end",
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
          AND v.status = 'open' 
          AND (v.filling_up_status = 'UNFILLED' OR v.filling_up_status IS NULL)
      )
      ${filterCondition}
      ORDER BY posting_start DESC
    `,
    );

    // Process response shape and check posting window
    const now = new Date();
    return result.rows
      .filter((row) => {
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
