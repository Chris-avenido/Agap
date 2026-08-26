import { Router } from 'express';
import { VacanciesService } from './vacancies.service';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const applicantId = req.query.applicantId
      ? String(req.query.applicantId)
      : undefined;
    const vacancies = await VacanciesService.getOpenVacancies(applicantId);
    res.json({ success: true, data: vacancies });
  } catch (error: any) {
    console.error('Error fetching vacancies:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
});

router.get('/locations', async (req, res) => {
  try {
    const applicantId = req.query.applicantId
      ? String(req.query.applicantId)
      : undefined;
    const locations = await VacanciesService.getAgapLocations(applicantId);
    res.json({ success: true, data: locations });
  } catch (error: any) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
});

export default router;
