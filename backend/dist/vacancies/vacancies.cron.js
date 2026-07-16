"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupVacanciesCron = setupVacanciesCron;
const node_cron_1 = __importDefault(require("node-cron"));
const vacancies_service_1 = require("./vacancies.service");
function setupVacanciesCron() {
    node_cron_1.default.schedule('0 0 * * *', async () => {
        try {
            const updatedCount = await vacancies_service_1.VacanciesService.markExpiredVacancies();
            if (updatedCount && updatedCount > 0) {
                console.log(`[Cron] Updated ${updatedCount} expired vacancies to 'EXPIRED'.`);
            }
        }
        catch (error) {
            console.error('[Cron] Error updating expired vacancies:', error);
        }
    });
}
//# sourceMappingURL=vacancies.cron.js.map