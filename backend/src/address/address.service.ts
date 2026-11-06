import { pool } from '../database';

export const AddressService = {
  async getRegions() {
    const result = await pool.query(
      'SELECT DISTINCT region AS name FROM all_address ORDER BY name',
    );
    return result.rows;
  },

  async getProvinces(region: unknown) {
    const result = await pool.query(
      'SELECT DISTINCT province AS name FROM all_address WHERE region = $1 ORDER BY name',
      [region],
    );
    return result.rows;
  },

  async getMunicipalities(province: unknown, region?: unknown) {
    let query =
      'SELECT DISTINCT municipality AS name FROM all_address WHERE province = $1';
    const params: unknown[] = [province];

    if (region) {
      query += ' AND region = $2';
      params.push(region);
    }
    query += ' ORDER BY name';

    const result = await pool.query(query, params);
    return result.rows;
  },

  async getBarangays(municipality: unknown, province?: unknown) {
    let query =
      'SELECT DISTINCT barangay AS name FROM all_address WHERE municipality = $1';
    const params: unknown[] = [municipality];

    if (province) {
      query += ' AND province = $2';
      params.push(province);
    }
    query += ' ORDER BY name';

    const result = await pool.query(query, params);
    return result.rows;
  },
};
