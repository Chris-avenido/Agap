import cron from 'node-cron';
import { VacanciesService } from './vacancies.service';

export function setupVacanciesCron() {
  // Cron job to mark expired vacancies
  // Runs every day at midnight (0 0 * * *)
  cron.schedule('0 0 * * *', async () => {
    try {
      const updatedCount = await VacanciesService.markExpiredVacancies();
      if (updatedCount && updatedCount > 0) {
        console.log(`[Cron] Updated ${updatedCount} expired vacancies to 'EXPIRED'.`);
      }
    } catch (error) {
      console.error('[Cron] Error updating expired vacancies:', error);
    }
  });
}
