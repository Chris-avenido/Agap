import { pool } from '../database';

export class VacanciesService {
  static async getOpenVacancies() {
    const result = await pool.query(`
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
        p.eligibility_required
      FROM job_clusters c
      JOIN positions p ON c.position_id = p.id
      WHERE EXISTS (SELECT 1 FROM vacancies v WHERE v.job_cluster_id = c.id AND v.status = 'open' AND (v.filling_up_status = 'UNFILLED' OR v.filling_up_status IS NULL))
      ORDER BY posting_start DESC
    `);
    
    // Process response shape and check posting window
    const now = new Date();
    return result.rows.filter(row => {
      const start = row.posting_start ? new Date(row.posting_start) : null;
      const end = row.posting_end ? new Date(row.posting_end) : null;
      if (start && start > now) return false;
      if (end && end < now) return false;
      return true;
    }).map(row => ({
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
        eligibilityRequired: row.eligibility_required
      },
      // Keep posting_start and end for frontend display if needed
      posting_start: row.posting_start,
      posting_end: row.posting_end
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

  static async getAgapLocations() {
    const regionsResult = await pool.query('SELECT region FROM agap_schools WHERE region IS NOT NULL GROUP BY region ORDER BY region');
    const divisionsResult = await pool.query('SELECT division FROM agap_schools WHERE division IS NOT NULL GROUP BY division ORDER BY division');
    const regdivResult = await pool.query('SELECT DISTINCT region, division FROM agap_schools WHERE region IS NOT NULL AND division IS NOT NULL ORDER BY region, division');
    
    const divisionsByRegion: Record<string, string[]> = {};
    regdivResult.rows.forEach(r => {
      if (!divisionsByRegion[r.region]) divisionsByRegion[r.region] = [];
      if (r.division && !divisionsByRegion[r.region].includes(r.division)) {
        divisionsByRegion[r.region].push(r.division);
      }
    });

    return {
      regions: regionsResult.rows.map(r => r.region),
      divisions: divisionsResult.rows.map(r => r.division),
      divisionsByRegion
    };
  }
}
