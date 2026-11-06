import { Router } from 'express';
import { AddressService } from './address.service';

const router = Router();

/**
 * GET /api/address/regions
 * Returns all distinct regions: [{name}]
 */
router.get('/regions', async (_req, res) => {
  try {
    const data = await AddressService.getRegions();
    res.json({ success: true, data });
  } catch (error: any) {
    console.error('Error fetching regions:', error);
    res
      .status(500)
      .json({ message: error.message || 'Error fetching regions' });
  }
});

/**
 * GET /api/address/provinces?region=X
 * Returns distinct provinces for a given region: [{name}]
 */
router.get('/provinces', async (req, res) => {
  const { region } = req.query;
  if (!region) {
    return res.status(400).json({ message: 'region is required' });
  }
  try {
    const data = await AddressService.getProvinces(region);
    res.json({ success: true, data });
  } catch (error: any) {
    console.error('Error fetching provinces:', error);
    res
      .status(500)
      .json({ message: error.message || 'Error fetching provinces' });
  }
});

/**
 * GET /api/address/municipalities?region=X&province=Y
 * Returns distinct municipalities for a given province: [{name}]
 */
router.get('/municipalities', async (req, res) => {
  const { region, province } = req.query;
  if (!province) {
    return res.status(400).json({ message: 'province is required' });
  }
  try {
    const data = await AddressService.getMunicipalities(province, region);
    res.json({ success: true, data });
  } catch (error: any) {
    console.error('Error fetching municipalities:', error);
    res
      .status(500)
      .json({ message: error.message || 'Error fetching municipalities' });
  }
});

/**
 * GET /api/address/barangays?municipality=Z&province=Y
 * Returns distinct barangays for a given municipality: [{name}]
 */
router.get('/barangays', async (req, res) => {
  const { municipality, province } = req.query;
  if (!municipality) {
    return res.status(400).json({ message: 'municipality is required' });
  }
  try {
    const data = await AddressService.getBarangays(municipality, province);
    res.json({ success: true, data });
  } catch (error: any) {
    console.error('Error fetching barangays:', error);
    res
      .status(500)
      .json({ message: error.message || 'Error fetching barangays' });
  }
});

export default router;
