import { ApplicantsService } from '../../applicants/applicants.service';

/**
 * Reclassification service facade. Data access still lives in the shared
 * ApplicantsService (uses the pool from src/database.ts); controllers talk to
 * this module only, so the logic can move here incrementally.
 */
export const ReclassService = {
  getIncumbentLocations: (...a: Parameters<typeof ApplicantsService.getIncumbentLocations>) =>
    ApplicantsService.getIncumbentLocations(...a),
  getIncumbentInfoByPlantilla: (...a: Parameters<typeof ApplicantsService.getIncumbentInfoByPlantilla>) =>
    ApplicantsService.getIncumbentInfoByPlantilla(...a),
  verifyReclassItemNumber: (...a: Parameters<typeof ApplicantsService.verifyReclassItemNumber>) =>
    ApplicantsService.verifyReclassItemNumber(...a),
  verifyPlantillaItem: (...a: Parameters<typeof ApplicantsService.verifyPlantillaItem>) =>
    ApplicantsService.verifyPlantillaItem(...a),
  getReclassPositionsQS: (...a: Parameters<typeof ApplicantsService.getReclassPositionsQS>) =>
    ApplicantsService.getReclassPositionsQS(...a),
  getReclassDetails: (...a: Parameters<typeof ApplicantsService.getReclassDetails>) =>
    ApplicantsService.getReclassDetails(...a),
  updateTargetPosition: (...a: Parameters<typeof ApplicantsService.updateTargetPosition>) =>
    ApplicantsService.updateTargetPosition(...a),
  updateReclassApplicationPreference: (...a: Parameters<typeof ApplicantsService.updateReclassApplicationPreference>) =>
    ApplicantsService.updateReclassApplicationPreference(...a),
  applyForReclassification: (...a: Parameters<typeof ApplicantsService.applyForReclassification>) =>
    ApplicantsService.applyForReclassification(...a),
  setReclassNewApplication: (...a: Parameters<typeof ApplicantsService.setReclassNewApplication>) =>
    ApplicantsService.setReclassNewApplication(...a),
  getReclassDocuments: (...a: Parameters<typeof ApplicantsService.getReclassDocuments>) =>
    ApplicantsService.getReclassDocuments(...a),
  uploadReclassDocument: (...a: Parameters<typeof ApplicantsService.uploadReclassDocument>) =>
    ApplicantsService.uploadReclassDocument(...a),
};
