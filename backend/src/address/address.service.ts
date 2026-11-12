import { pool } from '../database';

/**
 * Regions change almost never, so they are cached in process memory (this app
 * has no Redis). Concurrent callers share one in-flight query; a failed query
 * is not cached. TTL is configurable via ADDRESS_REGIONS_CACHE_TTL_MS (0 disables).
 */
const REGIONS_TTL_MS = parseInt(
  process.env.ADDRESS_REGIONS_CACHE_TTL_MS || String(60 * 60 * 1000),
  10,
);
let regionsCache: { rows: any[]; expiresAt: number } | null = null;
let regionsInFlight: Promise<any[]> | null = null;

export const AddressService = {
  async getRegions() {
    if (regionsCache && regionsCache.expiresAt > Date.now()) {
      return regionsCache.rows;
    }
    if (!regionsInFlight) {
      regionsInFlight = pool
        .query('SELECT DISTINCT region AS name FROM all_address ORDER BY name')
        .then((result) => {
          if (REGIONS_TTL_MS > 0) {
            regionsCache = {
              rows: result.rows,
              expiresAt: Date.now() + REGIONS_TTL_MS,
            };
          }
          return result.rows;
        })
        .finally(() => {
          regionsInFlight = null;
        });
    }
    return regionsInFlight;
  },

  /** Clears the cached regions (e.g. after the all_address table is reloaded). */
  clearRegionsCache() {
    regionsCache = null;
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
