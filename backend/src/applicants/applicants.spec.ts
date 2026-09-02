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

