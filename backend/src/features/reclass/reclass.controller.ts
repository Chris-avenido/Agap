import { NextFunction, Request, Response } from 'express';
import { ReclassService } from './reclass.service';

// GET /incumbent-locations
export async function incumbentLocations(req: Request, res: Response) {
  try {
    const data = await ReclassService.getIncumbentLocations();
    res.json({ success: true, data });
  } catch (error: any) {
    console.error('Error fetching incumbent locations:', error);
    res
      .status(500)
      .json({ message: error.message || 'Error fetching locations' });
  }
}

// GET /incumbent-info
export async function incumbentInfo(req: Request, res: Response) {
  const { plantilla } = req.query;
  if (!plantilla || typeof plantilla !== 'string') {
    return res.status(400).json({ message: 'Plantilla is required' });
  }
  try {
    const data = await ReclassService.getIncumbentInfoByPlantilla(plantilla);
    res.json({ success: true, data });
  } catch (error: any) {
    console.error('Error fetching incumbent info:', error);
    res
      .status(500)
      .json({ message: error.message || 'Error fetching incumbent info' });
  }
}

// POST /reclass-verify-item
export async function verifyItem(req: Request, res: Response) {
  try {
    const { item_number, category, new_application } = req.body;
    if (!item_number || typeof item_number !== 'string' || !item_number.trim()) {
      return res.status(400).json({
        status: 'not_found',
        message: 'Plantilla Item Number is required.',
      });
    }

    const resolvedCategory: 'existing' | 'new' =
      category === 'new' || Boolean(new_application) ? 'new' : 'existing';

    const result = await ReclassService.verifyReclassItemNumber(
      item_number,
      resolvedCategory,
    );
    if (result.status === 'not_found') {
      return res.status(404).json(result);
    }
    if (result.status === 'already_registered') {
      // Check if email, password, and passcode are NULL in reclass_gc and gmis_gc_items.
      // If NULL, bypass the 409 Conflict error and allow the registration/claim process to overwrite these fields.
      const credStatus = await ReclassService.checkCredentialsStatus(item_number);
      if (credStatus && credStatus.canClaim) {
        return res.json({
          status: 'valid',
          message: 'Plantilla Item Number verified. Account is ready to be claimed.',
          data: credStatus.data || (result as any).data,
          can_claim: true,
        });
      }
      return res.status(409).json(result);
    }
    if (result.status === 'invalid') {
      return res.status(400).json(result);
    }
    return res.json(result);
  } catch (error: any) {
    console.error('Error verifying plantilla item:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error verifying plantilla item',
    });
  }
}

// POST /:id/verify-plantilla
export async function verifyPlantilla(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id as string, 10);
    const { plantilla_item_number } = req.body;
    if (!plantilla_item_number || !String(plantilla_item_number).trim()) {
      return res
        .status(400)
        .json({ message: 'Plantilla item number is required.' });
    }
    const reclassRecord = await ReclassService.verifyPlantillaItem(
      id,
      plantilla_item_number,
    );
    res.json({
      success: true,
      message: 'Plantilla item number verified successfully.',
      data: reclassRecord,
    });
  } catch (error: any) {
    console.error('Error verifying plantilla item number:', error);
    res
      .status(404)
      .json({ message: error.message || 'Plantilla item number not found.' });
  }
}

// GET /reclass-positions-qs
export async function positionsQs(req: Request, res: Response) {
  try {
    const positions = await ReclassService.getReclassPositionsQS();
    res.json({
      success: true,
      data: positions,
    });
  } catch (error: any) {
    console.error('Error fetching reclass QS positions:', error);
    res.status(500).json({
      message: error.message || 'Error fetching reclassification qualification standards.',
    });
  }
}

// GET /:id/reclass-details
export async function details(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id as string, 10);
    const reclassDetails = await ReclassService.getReclassDetails(id);
    res.json({
      success: true,
      data: reclassDetails,
    });
  } catch (error: any) {
    console.error('Error fetching reclass details:', error);
    res.status(500).json({
      message: error.message || 'Error fetching reclassification details.',
    });
  }
}

// PUT /:id/reclass-target-position
export async function targetPosition(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid applicant ID.' });
    }
    const target_position = req.body.desired_position || req.body.desire_position || req.body.target_position;
    const { update_application, is_registered } = req.body;
    if (!target_position || !String(target_position).trim()) {
      return res.status(400).json({ message: 'Target position is required.' });
    }
    const updated = await ReclassService.updateTargetPosition(
      id,
      String(target_position).trim(),
      { update_application, is_registered },
    );
    res.json({
      success: true,
      message: 'Target reclassification position updated successfully.',
      data: updated,
    });
  } catch (error: any) {
    console.error('Error updating target position:', error);
    const status = (error.message && error.message.includes('disabled')) ? 400 : 500;
    res.status(status).json({
      success: false,
      message: error.message || 'Error updating target reclassification position.',
    });
  }
}

// PUT /:id/reclass-update-preference
export async function updatePreference(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid applicant ID.' });
    }
    const {
      update_application,
      is_registered,
      target_position,
      desire_position,
      desired_position,
      education,
      years_experience,
      year_of_experience,
      hours_of_training,
      eligibility,
    } = req.body;
    if (
      update_application === undefined ||
      update_application === null ||
      String(update_application).trim() === ''
    ) {
      return res.status(400).json({ message: 'update_application answer is required.' });
    }
    const updated = await ReclassService.updateReclassApplicationPreference(
      id,
      {
        update_application,
        is_registered,
        target_position,
        desired_position: desired_position || desire_position,
        education,
        years_experience: years_experience !== undefined ? years_experience : year_of_experience,
        hours_of_training,
        eligibility,
      },
    );
    res.json({
      success: true,
      message: 'Reclassification application preference saved successfully.',
      data: updated,
    });
  } catch (error: any) {
    console.error('Error updating application preference:', error);
    const status = (error.message && error.message.includes('disabled')) ? 400 : 500;
    res.status(status).json({
      success: false,
      message: error.message || 'Error updating reclassification application preference.',
    });
  }
}

// PUT /:id/reclass-apply
export async function apply(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid applicant ID.' });
    }
    const {
      education,
      years_experience,
      year_of_experience,
      hours_of_training,
      eligibility,
      update_application,
    } = req.body;

    const exp = years_experience !== undefined ? years_experience : year_of_experience;
    const updated = await ReclassService.applyForReclassification(id, {
      education,
      years_experience: exp,
      hours_of_training,
      eligibility,
      update_application: update_application !== undefined ? update_application : 'Yes',
    });
    res.json({
      success: true,
      message: 'Reclassification application submitted successfully.',
      data: updated,
    });
  } catch (error: any) {
    console.error('Error applying for reclassification:', error);
    const status = (error.message && error.message.includes('disabled')) ? 400 : 500;
    res.status(status).json({
      success: false,
      message: error.message || 'Error applying for reclassification.',
    });
  }
}

// PUT /:id/reclass-set-new-application
export async function setNewApplication(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid applicant ID.' });
    }
    const isNewApp = req.body.new_application !== undefined ? !!req.body.new_application : true;
    const { education, years_experience, year_of_experience, hours_of_training, eligibility } = req.body;
    const updated = await ReclassService.setReclassNewApplication(id, isNewApp, {
      education,
      years_experience,
      year_of_experience,
      hours_of_training,
      eligibility,
    });
    res.json({
      success: true,
      message: 'Reclassification new_application status updated successfully.',
      data: updated,
    });
  } catch (error: any) {
    console.error('Error setting reclass new_application:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update reclassification new_application status.',
    });
  }
}

// GET /:id/reclass-documents
export async function getDocuments(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid applicant ID.' });
    }
    const documents = await ReclassService.getReclassDocuments(id);
    res.json({
      success: true,
      data: documents,
    });
  } catch (error: any) {
    console.error('Error fetching reclass documents:', error);
    res
      .status(500)
      .json({ message: error.message || 'Error fetching documents.' });
  }
}

// POST /:id/reclass-documents
export async function uploadDocument(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid applicant ID.' });
    }
    const file = (req as any).file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const isPdf =
      file.mimetype === 'application/pdf' ||
      (file.originalname && file.originalname.toLowerCase().endsWith('.pdf'));
    if (!isPdf) {
      return res.status(400).json({
        message:
          'Only PDF files (.pdf) are allowed for reclassification documents.',
      });
    }

    const {
      category_key,
      category_title,
      description,
      education,
      years_experience,
      year_of_experience,
      hours_of_training,
      eligibility,
    } = req.body;
    if (!category_key) {
      return res
        .status(400)
        .json({ message: 'Document category key is required.' });
    }

    const result = await ReclassService.uploadReclassDocument(
      id,
      category_key,
      category_title || category_key,
      file,
      description,
      {
        education,
        years_experience: years_experience !== undefined ? years_experience : year_of_experience,
        hours_of_training,
        eligibility,
      },
    );

    res.json({
      success: true,
      message: `Document for "${category_title || category_key}" uploaded successfully.`,
      data: result,
    });
  } catch (error: any) {
    console.error('Error uploading reclass document:', error);
    res
      .status(500)
      .json({ message: error.message || 'Error uploading document.' });
  }
}
