export const NOT_REGISTERED_TARGET_OPTIONS = [
  { value: 'SCHOOL COUNSELOR ASSOCIATE I', label: 'School Counselor Associate I', sg: 'SG-11' },
  { value: 'SCHOOL COUNSELOR ASSOCIATE II', label: 'School Counselor Associate II', sg: 'SG-12' },
  { value: 'SCHOOL COUNSELOR ASSOCIATE III', label: 'School Counselor Associate III', sg: 'SG-13' },
  { value: 'SCHOOL COUNSELOR ASSOCIATE IV', label: 'School Counselor Associate IV', sg: 'SG-14' },
  { value: 'SCHOOL COUNSELOR ASSOCIATE V', label: 'School Counselor Associate V', sg: 'SG-15' },
];

export const REGISTERED_TARGET_OPTIONS = [
  { value: 'SCHOOL COUNSELOR I', label: 'School Counselor I', sg: 'SG-16' },
  { value: 'SCHOOL COUNSELOR II', label: 'School Counselor II', sg: 'SG-18' },
  { value: 'SCHOOL COUNSELOR III', label: 'School Counselor III', sg: 'SG-20' },
  { value: 'SCHOOL COUNSELOR IV', label: 'School Counselor IV', sg: 'SG-22' },
];

export const TARGET_POSITION_OPTIONS = [
  ...NOT_REGISTERED_TARGET_OPTIONS,
  ...REGISTERED_TARGET_OPTIONS,
];

export const RECLASS_TARGET_OPTIONS = TARGET_POSITION_OPTIONS;

export function isRegisteredPosition(pos?: string | null): boolean {
  if (!pos) return false;
  const clean = pos.toUpperCase();
  return !clean.includes('ASSOCIATE') && (clean.includes('COUNSELOR') || clean.includes('SPECIALIST'));
}

export function isAssessedSCIV(pos?: string | null): boolean {
  if (!pos) return false;
  const clean = pos.toUpperCase().trim();
  if (clean.includes('ASSOCIATE')) return false;
  return (
    clean.includes('SCHOOL COUNSELOR IV') ||
    clean.includes('SC IV') ||
    clean === 'SC 4' ||
    clean.includes('COUNSELOR IV')
  );
}

export function getPositionSalaryGrade(posName?: string | null): string {
  if (!posName) return '—';
  const clean = posName.toUpperCase().trim();

  // Schools Division Counselor track
  if (clean.includes('SCHOOLS DIVISION COUNSELOR') || clean.includes('SCHOOL DIVISION COUNSELOR') || clean.includes('DIVISION COUNSELOR')) return 'SG-24';

  // School Counselor Associate track
  if (clean.includes('SCHOOL COUNSELOR ASSOCIATE V')) return 'SG-15';
  if (clean.includes('SCHOOL COUNSELOR ASSOCIATE IV')) return 'SG-14';
  if (clean.includes('SCHOOL COUNSELOR ASSOCIATE III')) return 'SG-13';
  if (clean.includes('SCHOOL COUNSELOR ASSOCIATE II')) return 'SG-12';
  if (clean.includes('SCHOOL COUNSELOR ASSOCIATE I') || clean === 'SCHOOL COUNSELOR ASSOCIATE') return 'SG-11';

  // School Counselor track
  if (clean.includes('SCHOOL COUNSELOR IV')) return 'SG-22';
  if (clean.includes('SCHOOL COUNSELOR III')) return 'SG-20';
  if (clean.includes('SCHOOL COUNSELOR II')) return 'SG-18';
  if (clean.includes('SCHOOL COUNSELOR I') || clean === 'SCHOOL COUNSELOR') return 'SG-16';

  // Incumbent Guidance track (for current position)
  if (clean.includes('GUIDANCE SERVICES SPECIALIST II')) return 'SG-18';
  if (clean.includes('GUIDANCE SERVICES SPECIALIST I') || clean.includes('GUIDANCE SERVICES SPECIALIST')) return 'SG-16';
  if (clean.includes('GUIDANCE COORDINATOR III')) return 'SG-16';
  if (clean.includes('GUIDANCE COORDINATOR II')) return 'SG-15';
  if (clean.includes('GUIDANCE COORDINATOR I') || clean.includes('GUIDANCE COORDINATOR')) return 'SG-14';
  if (clean.includes('GUIDANCE COUNSELOR III')) return 'SG-13';
  if (clean.includes('GUIDANCE COUNSELOR II')) return 'SG-12';
  if (clean.includes('GUIDANCE COUNSELOR I') || clean === 'GUIDANCE COUNSELOR' || clean.includes('GUIDANCE COUNSELOR')) return 'SG-11';

  return '—';
}

export async function safeFetchJson(url: string, fallback: any = { success: false }, retries = 3, delayMs = 1000): Promise<any> {
  try {
    const res = await fetch(url);
    if ((res.status === 502 || res.status === 503 || res.status === 504) && retries > 0) {
      await new Promise(r => setTimeout(r, delayMs));
      return safeFetchJson(url, fallback, retries - 1, delayMs * 1.5);
    }
    if (!res.ok) return fallback;
    const text = await res.text();
    if (!text || !text.trim()) return fallback;
    return JSON.parse(text);
  } catch (_err) {
    if (retries > 0) {
      await new Promise(r => setTimeout(r, delayMs));
      return safeFetchJson(url, fallback, retries - 1, delayMs * 1.5);
    }
    return fallback;
  }
}

export interface ChecklistDocumentItem {
  id?: string;
  key?: string;
  title: string;
  status: string;
  rawStatus: string;
  remarks?: string;
  required?: boolean;
  fileName?: string;
  fileUrl?: string;
}

export type RevisionDocumentItem = ChecklistDocumentItem;

export function normalizeRequirementKey(item: any): string {
  const rawKey = String(item.key || item.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const title = String(item.shortTitle || item.label || item.title || item.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  if (rawKey === 'pds' || rawKey.includes('personaldata') || title.includes('personaldata') || title.includes('pds')) return 'pds';
  if (
    rawKey === 'loi' ||
    rawKey === 'letter_of_updating_records' ||
    rawKey === 'letter_of_intent' ||
    rawKey.includes('intent') ||
    rawKey.includes('updatingrecord') ||
    rawKey.includes('updating') ||
    title.includes('intent') ||
    title.includes('updating') ||
    title.includes('records')
  )
    return 'letter_of_updating_records';
  if (
    rawKey === 'eligibility' ||
    rawKey.includes('prc') ||
    rawKey.includes('license') ||
    rawKey.includes('eligib') ||
    title.includes('eligib') ||
    title.includes('prc')
  ) {
    if (!title.includes('performance') && !rawKey.includes('performance') && !rawKey.includes('ipcrf')) {
      return 'proof_of_eligibility';
    }
  }
  if (
    rawKey === 'tor' ||
    rawKey.includes('academic') ||
    rawKey.includes('transcript') ||
    rawKey.includes('diploma') ||
    title.includes('transcript') ||
    title.includes('diploma') ||
    title.includes('tor')
  )
    return 'academic_record';
  if (
    rawKey === 'service' ||
    rawKey.includes('servicerecord') ||
    rawKey.includes('employment') ||
    rawKey.includes('appointment') ||
    title.includes('servicerecord') ||
    title.includes('appointment')
  )
    return 'service_record';
  if (rawKey === 'training' || rawKey.includes('certificate') || title.includes('training')) return 'training_certs';
  if (
    rawKey === 'cav' ||
    rawKey.includes('omnibus') ||
    rawKey.includes('sworn') ||
    title.includes('omnibus') ||
    title.includes('sworn') ||
    title.includes('cav')
  )
    return 'omnibus_sworn_statement';
  if (
    rawKey === 'performance' ||
    rawKey.includes('ipcrf') ||
    rawKey.includes('rating') ||
    title.includes('performance') ||
    title.includes('ipcrf') ||
    title.includes('rating')
  )
    return 'performance_rating';

  return rawKey || title || String(item.id || item.key || '');
}

export function parseChecklistDocuments(checklist: any): ChecklistDocumentItem[] {
  if (!checklist) return [];

  let list: any[] = [];
  if (Array.isArray(checklist)) {
    list = checklist;
  } else if (typeof checklist === 'string') {
    const trimmed = checklist.trim();
    if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          list = parsed;
        } else if (typeof parsed === 'object' && parsed !== null) {
          list = Object.entries(parsed).map(([key, val]) => {
            if (typeof val === 'object' && val !== null) {
              return { key, ...val };
            }
            return { key, status: val };
          });
        }
      } catch {
        list = [];
      }
    } else {
      list = [];
    }
  } else if (typeof checklist === 'object' && checklist !== null) {
    list = Object.entries(checklist).map(([key, val]) => {
      if (typeof val === 'object' && val !== null) {
        return { key, ...val };
      }
      return { key, status: val };
    });
  }

  if (!list || list.length === 0) return [];

  const itemMap = new Map<string, ChecklistDocumentItem>();

  for (let idx = 0; idx < list.length; idx++) {
    const item = list[idx];
    if (!item || typeof item !== 'object') continue;

    // Display all status except for null / undefined / empty string / 'null'
    const itemStatusVal =
      item.status !== null && item.status !== undefined && item.status !== ''
        ? item.status
        : item.submitted
        ? 'submitted'
        : null;
    if (!itemStatusVal) continue;

    const rawStatusStr = String(itemStatusVal).trim();
    if (rawStatusStr.toLowerCase() === 'null') continue;

    const rawStatus = rawStatusStr.toLowerCase().replace(/[\s-]/g, '_');
    const title =
      item.shortTitle ||
      item.label ||
      item.title ||
      item.name ||
      item.id ||
      item.key ||
      `Document ${idx + 1}`;
    const remarks = item.remarks || item.comment || item.reason || '';

    const docItem: ChecklistDocumentItem = {
      id: item.id || item.key || `chk-${idx}`,
      key: item.key || item.id || '',
      title,
      status: rawStatusStr,
      rawStatus,
      remarks,
      required: Boolean(item.required),
      fileName: item.file_name || item.fileName,
      fileUrl: item.file_url || item.url,
    };

    const normKey = normalizeRequirementKey(item);
    if (!itemMap.has(normKey)) {
      itemMap.set(normKey, docItem);
    } else {
      const existing = itemMap.get(normKey)!;
      const isCurrentRev = docItem.rawStatus === 'for_revision' || docItem.rawStatus.includes('revision');
      const isExistingRev = existing.rawStatus === 'for_revision' || existing.rawStatus.includes('revision');

      // Prioritize revision item if any duplicate has for_revision
      if (isCurrentRev && !isExistingRev) {
        itemMap.set(normKey, { ...existing, ...docItem });
      } else if (docItem.fileUrl && !existing.fileUrl) {
        itemMap.set(normKey, { ...existing, fileUrl: docItem.fileUrl, fileName: docItem.fileName || existing.fileName });
      } else if (docItem.remarks && !existing.remarks) {
        itemMap.set(normKey, { ...existing, remarks: docItem.remarks });
      }
    }
  }

  return Array.from(itemMap.values());
}

export function parseRevisionDocuments(checklist: any): ChecklistDocumentItem[] {
  const allDocs = parseChecklistDocuments(checklist);
  return allDocs.filter((doc) => doc.rawStatus === 'for_revision' || doc.rawStatus.includes('revision'));
}
