"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vacancies_service_1 = require("./vacancies.service");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const vacancies = await vacancies_service_1.VacanciesService.getOpenVacancies();
        res.json({ success: true, data: vacancies });
    }
    catch (error) {
        console.error('Error fetching vacancies:', error);
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
});
exports.default = router;
//# sourceMappingURL=vacancies.routes.js.map