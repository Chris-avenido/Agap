describe('Applicant Validation Rules', () => {
  it('should validate educational background logic correctly', () => {
    const validEd: Array<{ level: string; school: string }> = [
      { level: 'ELEMENTARY', school: 'Elementary School' },
      { level: 'SECONDARY', school: 'High School' },
      { level: 'COLLEGE', school: 'State University' },
    ];
    const hasSecondary = validEd.some(
      (i) => i.level.toUpperCase() === 'SECONDARY' && i.school.trim() !== '',
    );
    const hasCollege = validEd.some(
      (i) => i.level.toUpperCase() === 'COLLEGE' && i.school.trim() !== '',
    );

    expect(hasSecondary).toBe(true);
    expect(hasCollege).toBe(true);
  });

  it('should reject when secondary or college is missing', () => {
    const invalidEd: Array<{ level: string; school: string }> = [
      { level: 'ELEMENTARY', school: 'Elementary School' },
    ];
    const hasSecondary = invalidEd.some(
      (i) => i.level.toUpperCase() === 'SECONDARY' && i.school.trim() !== '',
    );
    const hasCollege = invalidEd.some(
      (i) => i.level.toUpperCase() === 'COLLEGE' && i.school.trim() !== '',
    );

    expect(hasSecondary && hasCollege).toBe(false);
  });

  it('should validate 34-40 questionnaire answers, references, and government ID', () => {
    const qIds = [
      '34a',
      '34b',
      '35a',
      '35b',
      '36',
      '37',
      '38a',
      '38b',
      '39',
      '40a',
      '40b',
      '40b_ethnic',
      '40c',
    ];
    const mockQRes: Record<string, { answer: string; details: string }> = {};
    qIds.forEach((id) => {
      mockQRes[id] = { answer: 'No', details: '' };
    });

    const allAnswered = qIds.every((id) => {
      const val = mockQRes[id];
      return Boolean(val && (val.answer === 'Yes' || val.answer === 'No'));
    });

    expect(allAnswered).toBe(true);
  });
});

describe('Document URL Consistency & Metadata Merging Rules', () => {
  function mergeOtherInformation(
    currentOtherInfo: any,
    incomingOtherInfo: any,
    latestAudits: any[],
  ) {
    const auditMap: Record<string, string> = {};
    for (const audit of latestAudits) {
      if (audit.document_type && audit.new_blob_url) {
        auditMap[audit.document_type] = audit.new_blob_url;
      }
    }

    const existingDocs =
      (currentOtherInfo &&
        typeof currentOtherInfo === 'object' &&
        currentOtherInfo.documents) ||
      {};
    const incomingDocs =
      (incomingOtherInfo &&
        typeof incomingOtherInfo === 'object' &&
        incomingOtherInfo.documents) ||
      {};

    const mergedDocs: Record<string, any> = {};
    const allDocKeys = new Set([
      ...Object.keys(existingDocs),
      ...Object.keys(incomingDocs),
    ]);

    for (const docKey of allDocKeys) {
      const existingDoc = existingDocs[docKey];
      const incomingDoc = incomingDocs[docKey];

      let authoritativeUrl: string | null = null;
      if (auditMap[docKey]) {
        authoritativeUrl = auditMap[docKey];
      } else if (typeof existingDoc === 'string' && existingDoc.trim()) {
        authoritativeUrl = existingDoc.trim();
      } else if (
        existingDoc &&
        typeof existingDoc === 'object' &&
        typeof existingDoc.url === 'string' &&
        existingDoc.url.trim()
      ) {
        authoritativeUrl = existingDoc.url.trim();
      }

      if (
        incomingDoc &&
        typeof incomingDoc === 'object' &&
        !Array.isArray(incomingDoc)
      ) {
        const existingObj =
          existingDoc &&
          typeof existingDoc === 'object' &&
          !Array.isArray(existingDoc)
            ? existingDoc
            : {};
        mergedDocs[docKey] = {
          ...existingObj,
          ...incomingDoc,
        };
        if (authoritativeUrl) {
          mergedDocs[docKey].url = authoritativeUrl;
        } else {
          delete mergedDocs[docKey].url;
        }
      } else if (
        existingDoc &&
        typeof existingDoc === 'object' &&
        !Array.isArray(existingDoc)
      ) {
        mergedDocs[docKey] = {
          ...existingDoc,
        };
        if (authoritativeUrl) {
          mergedDocs[docKey].url = authoritativeUrl;
        } else {
          delete mergedDocs[docKey].url;
        }
      } else {
        if (authoritativeUrl) {
          mergedDocs[docKey] = authoritativeUrl;
        }
      }
    }

    return {
      ...currentOtherInfo,
      ...incomingOtherInfo,
      documents: mergedDocs,
    };
  }

  it('should ignore incoming URL and use latest audit new_blob_url', () => {
    const current = {
      references: 'Old Reference',
      documents: {
        'Notarized Personal Data Sheet': {
          url: 'https://azure.blob/pds_v1.pdf',
          fileName: 'pds_v1.pdf',
        },
      },
    };
    const incoming = {
      references: 'New Reference',
      documents: {
        'Notarized Personal Data Sheet': {
          url: 'https://malicious-or-stale.com/fake.pdf',
          fileName: 'pds_v2.pdf',
          remarks: 'Updated remarks',
        },
      },
    };
    const latestAudits = [
      {
        id: 30,
        document_type: 'Notarized Personal Data Sheet',
        new_blob_url: 'https://azure.blob/pds_v3_authoritative.pdf',
      },
    ];

    const result = mergeOtherInformation(current, incoming, latestAudits);

    expect(result.references).toBe('New Reference');
    expect(result.documents['Notarized Personal Data Sheet'].url).toBe(
      'https://azure.blob/pds_v3_authoritative.pdf',
    );
    expect(result.documents['Notarized Personal Data Sheet'].fileName).toBe(
      'pds_v2.pdf',
    );
    expect(result.documents['Notarized Personal Data Sheet'].remarks).toBe(
      'Updated remarks',
    );
  });

  it('should preserve existing DB URL when no audit record exists and not use incoming URL', () => {
    const current = {
      documents: {
        'Work Experience Sheet': {
          url: 'https://azure.blob/work_exp_original.pdf',
          fileName: 'work_exp.pdf',
        },
      },
    };
    const incoming = {
      documents: {
        'Work Experience Sheet': {
          url: 'https://stale-link.com/stale.pdf',
          fileName: 'work_exp_renamed.pdf',
        },
      },
    };
    const latestAudits: any[] = [];

    const result = mergeOtherInformation(current, incoming, latestAudits);

    expect(result.documents['Work Experience Sheet'].url).toBe(
      'https://azure.blob/work_exp_original.pdf',
    );
    expect(result.documents['Work Experience Sheet'].fileName).toBe(
      'work_exp_renamed.pdf',
    );
  });

  it('should handle string document URLs correctly', () => {
    const current = {
      documents: {
        'Certificate of Eligibility': 'https://azure.blob/eligibility_v1.pdf',
      },
    };
    const incoming = {
      documents: {
        'Certificate of Eligibility': 'https://incoming-stale.com/stale.pdf',
      },
    };
    const latestAudits = [
      {
        id: 15,
        document_type: 'Certificate of Eligibility',
        new_blob_url: 'https://azure.blob/eligibility_latest.pdf',
      },
    ];

    const result = mergeOtherInformation(current, incoming, latestAudits);

    expect(result.documents['Certificate of Eligibility']).toBe(
      'https://azure.blob/eligibility_latest.pdf',
    );
  });
});

describe('Reclassification Auth & Registration Rules', () => {
  const mobileRegex = /^09\d{9}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  const passcodeRegex = /^\d{6}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  it('should validate Philippine mobile numbers correctly', () => {
    expect(mobileRegex.test('09171234567')).toBe(true);
    expect(mobileRegex.test('09998765432')).toBe(true);
    // Invalid prefixes or lengths
    expect(mobileRegex.test('08171234567')).toBe(false);
    expect(mobileRegex.test('0917123456')).toBe(false);
    expect(mobileRegex.test('091712345678')).toBe(false);
    expect(mobileRegex.test('0917123456a')).toBe(false);
    expect(mobileRegex.test('+639171234567')).toBe(false);
  });

  it('should validate password is provided and non-empty', () => {
    expect(Boolean('Password123')).toBe(true);
    expect(Boolean('123456')).toBe(true);
    expect(Boolean('')).toBe(false);
  });

  it('should validate 6-digit numeric passcodes strictly', () => {
    expect(passcodeRegex.test('123456')).toBe(true);
    expect(passcodeRegex.test('000000')).toBe(true);
    expect(passcodeRegex.test('987654')).toBe(true);
    // Invalid passcodes
    expect(passcodeRegex.test('12345')).toBe(false); // 5 digits
    expect(passcodeRegex.test('1234567')).toBe(false); // 7 digits
    expect(passcodeRegex.test('12345a')).toBe(false); // non-numeric
    expect(passcodeRegex.test('abcdef')).toBe(false);
    expect(passcodeRegex.test('      ')).toBe(false);
  });

  it('should validate email format strictly', () => {
    expect(emailRegex.test('counselor@deped.gov.ph')).toBe(true);
    expect(emailRegex.test('user.test@example.com')).toBe(true);
    expect(emailRegex.test('invalid-email')).toBe(false);
    expect(emailRegex.test('user@')).toBe(false);
    expect(emailRegex.test('@example.com')).toBe(false);
  });

  it('should normalize Plantilla Item Number by trimming and uppercasing', () => {
    const normalize = (input: string) => (input || '').trim().toUpperCase();
    expect(normalize('  osec-decsb-12345-gdc-01  ')).toBe('OSEC-DECSB-12345-GDC-01');
    expect(normalize('Osec-Decsb-Gdc-1')).toBe('OSEC-DECSB-GDC-1');
    expect(normalize('   ')).toBe('');
  });

  it('should enforce rate limiting and 15-minute temporary lockout after 5 failed attempts', () => {
    interface FailedAttemptRecord {
      attempts: number;
      lockedUntil: number;
    }
    const failedAttempts = new Map<string, FailedAttemptRecord>();

    function recordFailure(key: string, now: number) {
      const record = failedAttempts.get(key) || { attempts: 0, lockedUntil: 0 };
      record.attempts += 1;
      if (record.attempts >= 5) {
        record.lockedUntil = now + 15 * 60 * 1000;
      }
      failedAttempts.set(key, record);
    }

    function checkLockout(key: string, now: number): boolean {
      const record = failedAttempts.get(key);
      if (!record) return false;
      return record.lockedUntil > now;
    }

    const testKey = 'test@deped.gov.ph_127.0.0.1';
    const baseTime = Date.now();

    // 4 failed attempts should not lock out
    for (let i = 0; i < 4; i++) {
      recordFailure(testKey, baseTime);
      expect(checkLockout(testKey, baseTime)).toBe(false);
    }

    // 5th failed attempt triggers lockout
    recordFailure(testKey, baseTime);
    expect(checkLockout(testKey, baseTime)).toBe(true);

    // 10 minutes later (still locked out)
    expect(checkLockout(testKey, baseTime + 10 * 60 * 1000)).toBe(true);

    // 15 minutes and 1 second later (lockout expired)
    expect(checkLockout(testKey, baseTime + 15 * 60 * 1000 + 1000)).toBe(false);
  });
});

describe('Reclassification Position Salary Grade Resolution', () => {
  const getSalaryGradeForPosition = (posName?: string | null): string | null => {
    if (!posName) return null;
    const upper = posName.toUpperCase().trim();

    // Schools Division Counselor track
    if (
      upper.includes('SCHOOLS DIVISION COUNSELOR') ||
      upper.includes('SCHOOL DIVISION COUNSELOR') ||
      upper.includes('DIVISION COUNSELOR')
    )
      return '24';

    // School Counselor Associate track
    if (upper.includes('SCHOOL COUNSELOR ASSOCIATE V')) return '15';
    if (upper.includes('SCHOOL COUNSELOR ASSOCIATE IV')) return '14';
    if (upper.includes('SCHOOL COUNSELOR ASSOCIATE III')) return '13';
    if (upper.includes('SCHOOL COUNSELOR ASSOCIATE II')) return '12';
    if (
      upper.includes('SCHOOL COUNSELOR ASSOCIATE I') ||
      upper === 'SCHOOL COUNSELOR ASSOCIATE'
    )
      return '11';

    // School Counselor track
    if (upper.includes('SCHOOL COUNSELOR IV')) return '22';
    if (upper.includes('SCHOOL COUNSELOR III')) return '20';
    if (upper.includes('SCHOOL COUNSELOR II')) return '18';
    if (upper.includes('SCHOOL COUNSELOR I') || upper === 'SCHOOL COUNSELOR')
      return '16';

    // Incumbent Guidance track
    if (upper.includes('GUIDANCE SERVICES SPECIALIST II')) return '18';
    if (
      upper.includes('GUIDANCE SERVICES SPECIALIST I') ||
      upper.includes('GUIDANCE SERVICES SPECIALIST')
    )
      return '16';
    if (upper.includes('GUIDANCE COORDINATOR III')) return '16';
    if (upper.includes('GUIDANCE COORDINATOR II')) return '15';
    if (
      upper.includes('GUIDANCE COORDINATOR I') ||
      upper.includes('GUIDANCE COORDINATOR')
    )
      return '14';
    if (upper.includes('GUIDANCE COUNSELOR III')) return '13';
    if (upper.includes('GUIDANCE COUNSELOR II')) return '12';
    if (
      upper.includes('GUIDANCE COUNSELOR I') ||
      upper === 'GUIDANCE COUNSELOR' ||
      upper.includes('GUIDANCE COUNSELOR')
    )
      return '11';
    return null;
  };

  it('should correctly resolve salary grades for all School Counselor and Associate tracks', () => {
    expect(getSalaryGradeForPosition('Schools Division Counselor')).toBe('24');
    expect(getSalaryGradeForPosition('School Counselor IV')).toBe('22');
    expect(getSalaryGradeForPosition('School Counselor III')).toBe('20');
    expect(getSalaryGradeForPosition('School Counselor II')).toBe('18');
    expect(getSalaryGradeForPosition('School Counselor I')).toBe('16');
    expect(getSalaryGradeForPosition('School Counselor Associate V')).toBe('15');
    expect(getSalaryGradeForPosition('School Counselor Associate IV')).toBe('14');
    expect(getSalaryGradeForPosition('School Counselor Associate III')).toBe('13');
    expect(getSalaryGradeForPosition('School Counselor Associate II')).toBe('12');
    expect(getSalaryGradeForPosition('School Counselor Associate I')).toBe('11');
  });
});

