-- params: ["X-1"]
-- database: AGAP_local
SELECT * FROM reclass_gc WHERE UPPER(TRIM(item_no)) = UPPER(TRIM($1)) LIMIT 1;
