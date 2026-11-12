-- params: ["MANILA","NCR"]
-- database: AGAP_local
SELECT DISTINCT barangay AS name FROM all_address WHERE municipality = $1 AND province = $2 ORDER BY name;
