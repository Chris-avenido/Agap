import { useState, useEffect } from "react";
import { ADDRESS_API } from "../constants";

export interface UseAddressListsInput {
  permCity: string;
  permProvince: string;
  permRegion: string;
  resCity: string;
  resProvince: string;
  resRegion: string;
}

export function useAddressLists({
  permCity,
  permProvince,
  permRegion,
  resCity,
  resProvince,
  resRegion,
}: UseAddressListsInput) {
  // ─── API-driven cascading address data ───
  const [regionsList, setRegionsList] = useState<any[]>([]);
  const [resProvincesList, setResProvincesList] = useState<any[]>([]);
  const [resCitiesList, setResCitiesList] = useState<any[]>([]);
  const [resBarangaysList, setResBarangaysList] = useState<any[]>([]);
  const [permProvincesList, setPermProvincesList] = useState<any[]>([]);
  const [permCitiesList, setPermCitiesList] = useState<any[]>([]);
  const [permBarangaysList, setPermBarangaysList] = useState<any[]>([]);

  // Fetch regions on mount
  useEffect(() => {
    fetch(`${ADDRESS_API}/regions`).then(r => r.json()).then(d => {
      if (d.success) setRegionsList(d.data);
    }).catch(console.error);
  }, []);

  // Residential: fetch provinces when region changes
  useEffect(() => {
    if (!resRegion) { setResProvincesList([]); return; }
    fetch(`${ADDRESS_API}/provinces?region=${encodeURIComponent(resRegion)}`).then(r => r.json()).then(d => {
      if (d.success) setResProvincesList(d.data);
    }).catch(console.error);
  }, [resRegion]);

  // Residential: fetch cities when province changes
  useEffect(() => {
    if (!resProvince) { setResCitiesList([]); return; }
    fetch(`${ADDRESS_API}/municipalities?province=${encodeURIComponent(resProvince)}&region=${encodeURIComponent(resRegion)}`).then(r => r.json()).then(d => {
      if (d.success) setResCitiesList(d.data);
    }).catch(console.error);
  }, [resProvince, resRegion]);

  // Residential: fetch barangays when city changes
  useEffect(() => {
    if (!resCity) { setResBarangaysList([]); return; }
    fetch(`${ADDRESS_API}/barangays?municipality=${encodeURIComponent(resCity)}&province=${encodeURIComponent(resProvince)}`).then(r => r.json()).then(d => {
      if (d.success) setResBarangaysList(d.data);
    }).catch(console.error);
  }, [resCity, resProvince]);

  // Permanent: fetch provinces when region changes
  useEffect(() => {
    if (!permRegion) { setPermProvincesList([]); return; }
    fetch(`${ADDRESS_API}/provinces?region=${encodeURIComponent(permRegion)}`).then(r => r.json()).then(d => {
      if (d.success) setPermProvincesList(d.data);
    }).catch(console.error);
  }, [permRegion]);

  // Permanent: fetch cities when province changes
  useEffect(() => {
    if (!permProvince) { setPermCitiesList([]); return; }
    fetch(`${ADDRESS_API}/municipalities?province=${encodeURIComponent(permProvince)}&region=${encodeURIComponent(permRegion)}`).then(r => r.json()).then(d => {
      if (d.success) setPermCitiesList(d.data);
    }).catch(console.error);
  }, [permProvince, permRegion]);

  // Permanent: fetch barangays when city changes
  useEffect(() => {
    if (!permCity) { setPermBarangaysList([]); return; }
    fetch(`${ADDRESS_API}/barangays?municipality=${encodeURIComponent(permCity)}&province=${encodeURIComponent(permProvince)}`).then(r => r.json()).then(d => {
      if (d.success) setPermBarangaysList(d.data);
    }).catch(console.error);
  }, [permCity, permProvince]);

  return { permBarangaysList, permCitiesList, permProvincesList, regionsList, resBarangaysList, resCitiesList, resProvincesList };
}
