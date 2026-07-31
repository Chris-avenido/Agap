import { Router } from 'express';
import { pool } from '../database';

const router = Router();

/**
 * GET /api/address/regions
 * Returns all distinct regions: [{name}]
 */
router.get('/regions', async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT DISTINCT region AS name FROM all_address ORDER BY name'
    );
    res.json({ success: true, data: result.rows });
  } catch (error: any) {
    console.error('Error fetching regions:', error);
    res.status(500).json({ message: error.message || 'Error fetching regions' });
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
    const result = await pool.query(
      'SELECT DISTINCT province AS name FROM all_address WHERE region = $1 ORDER BY name',
      [region]
    );
    res.json({ success: true, data: result.rows });
  } catch (error: any) {
    console.error('Error fetching provinces:', error);
    res.status(500).json({ message: error.message || 'Error fetching provinces' });
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
    let query = 'SELECT DISTINCT municipality AS name FROM all_address WHERE province = $1';
    const params: any[] = [province];

    if (region) {
      query += ' AND region = $2';
      params.push(region);
    }
    query += ' ORDER BY name';

    const result = await pool.query(query, params);
    res.json({ success: true, data: result.rows });
  } catch (error: any) {
    console.error('Error fetching municipalities:', error);
    res.status(500).json({ message: error.message || 'Error fetching municipalities' });
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
    let query = 'SELECT DISTINCT barangay AS name FROM all_address WHERE municipality = $1';
    const params: any[] = [municipality];

    if (province) {
      query += ' AND province = $2';
      params.push(province);
    }
    query += ' ORDER BY name';

    const result = await pool.query(query, params);
    res.json({ success: true, data: result.rows });
  } catch (error: any) {
    console.error('Error fetching barangays:', error);
    res.status(500).json({ message: error.message || 'Error fetching barangays' });
  }
});

export default router;
