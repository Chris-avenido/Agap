export const pdsMapping: Record<string, { sheet: string, cell: string }> = {
  // Personal Information (Sheet C1)
  surname: { sheet: 'C1', cell: 'D10' },
  firstName: { sheet: 'C1', cell: 'D11' },
  middleName: { sheet: 'C1', cell: 'D12' },
  nameExtension: { sheet: 'C1', cell: 'N11' }, // JR, SR, etc.
  dateOfBirth: { sheet: 'C1', cell: 'D13' },
  placeOfBirth: { sheet: 'C1', cell: 'D15' },
  sex: { sheet: 'C1', cell: 'D16' }, // Alternatively handled as checkbox logic
  civilStatus: { sheet: 'C1', cell: 'D17' },
  height: { sheet: 'C1', cell: 'D22' },
  weight: { sheet: 'C1', cell: 'D24' },
  bloodType: { sheet: 'C1', cell: 'D25' },
  gsis: { sheet: 'C1', cell: 'D27' },
  pagibig: { sheet: 'C1', cell: 'D29' },
  philhealth: { sheet: 'C1', cell: 'D31' },
  sss: { sheet: 'C1', cell: 'D32' },
  tin: { sheet: 'C1', cell: 'D33' },
  agencyEmployeeNo: { sheet: 'C1', cell: 'D34' },

  // Residential Address
  resHouse: { sheet: 'C1', cell: 'I17' },
  resStreet: { sheet: 'C1', cell: 'L17' },
  resSubdivision: { sheet: 'C1', cell: 'I19' },
  resBarangay: { sheet: 'C1', cell: 'L19' },
  resCity: { sheet: 'C1', cell: 'I22' },
  resProvince: { sheet: 'C1', cell: 'L22' },
  resZip: { sheet: 'C1', cell: 'I24' },

  // Permanent Address
  permHouse: { sheet: 'C1', cell: 'I25' },
  permStreet: { sheet: 'C1', cell: 'L25' },
  permSubdivision: { sheet: 'C1', cell: 'I27' },
  permBarangay: { sheet: 'C1', cell: 'L27' },
  permCity: { sheet: 'C1', cell: 'I29' },
  permProvince: { sheet: 'C1', cell: 'L29' },
  permZip: { sheet: 'C1', cell: 'I31' },

  // Contacts
  telephone: { sheet: 'C1', cell: 'I32' },
  mobile: { sheet: 'C1', cell: 'I33' },
  email: { sheet: 'C1', cell: 'I34' },

  // Family Background
  spouseSurname: { sheet: 'C1', cell: 'D36' },
  spouseFirst: { sheet: 'C1', cell: 'D37' },
  spouseMiddle: { sheet: 'C1', cell: 'D38' },
  spouseExt: { sheet: 'C1', cell: 'N37' },
  spouseOccupation: { sheet: 'C1', cell: 'D39' },
  spouseEmployer: { sheet: 'C1', cell: 'D40' },
  spouseBusAddress: { sheet: 'C1', cell: 'D41' },
  spouseTelephone: { sheet: 'C1', cell: 'D42' },

  fatherSurname: { sheet: 'C1', cell: 'D43' },
  fatherFirst: { sheet: 'C1', cell: 'D44' },
  fatherMiddle: { sheet: 'C1', cell: 'D45' },
  fatherExt: { sheet: 'C1', cell: 'N44' },
  
  motherSurname: { sheet: 'C1', cell: 'D47' },
  motherFirst: { sheet: 'C1', cell: 'D48' },
  motherMiddle: { sheet: 'C1', cell: 'D49' },

  // Education starts at C1 row 54, but varies by template.
  eduElemSchool: { sheet: 'C1', cell: 'D54' },
  eduElemDegree: { sheet: 'C1', cell: 'G54' },
  eduElemFrom: { sheet: 'C1', cell: 'J54' },
  eduElemTo: { sheet: 'C1', cell: 'K54' },
  eduElemUnits: { sheet: 'C1', cell: 'L54' },
  eduElemYear: { sheet: 'C1', cell: 'M54' },
  eduElemHonors: { sheet: 'C1', cell: 'N54' },

  eduSecSchool: { sheet: 'C1', cell: 'D55' },
  eduSecDegree: { sheet: 'C1', cell: 'G55' },
  eduSecFrom: { sheet: 'C1', cell: 'J55' },
  eduSecTo: { sheet: 'C1', cell: 'K55' },
  eduSecUnits: { sheet: 'C1', cell: 'L55' },
  eduSecYear: { sheet: 'C1', cell: 'M55' },
  eduSecHonors: { sheet: 'C1', cell: 'N55' },

  eduVocSchool: { sheet: 'C1', cell: 'D56' },
  eduVocDegree: { sheet: 'C1', cell: 'G56' },
  eduVocFrom: { sheet: 'C1', cell: 'J56' },
  eduVocTo: { sheet: 'C1', cell: 'K56' },
  eduVocUnits: { sheet: 'C1', cell: 'L56' },
  eduVocYear: { sheet: 'C1', cell: 'M56' },
  eduVocHonors: { sheet: 'C1', cell: 'N56' },

  eduColSchool: { sheet: 'C1', cell: 'D57' },
  eduColDegree: { sheet: 'C1', cell: 'G57' },
  eduColFrom: { sheet: 'C1', cell: 'J57' },
  eduColTo: { sheet: 'C1', cell: 'K57' },
  eduColUnits: { sheet: 'C1', cell: 'L57' },
  eduColYear: { sheet: 'C1', cell: 'M57' },
  eduColHonors: { sheet: 'C1', cell: 'N57' },

  eduGradSchool: { sheet: 'C1', cell: 'D58' },
  eduGradDegree: { sheet: 'C1', cell: 'G58' },
  eduGradFrom: { sheet: 'C1', cell: 'J58' },
  eduGradTo: { sheet: 'C1', cell: 'K58' },
  eduGradUnits: { sheet: 'C1', cell: 'L58' },
  eduGradYear: { sheet: 'C1', cell: 'M58' },
  eduGradHonors: { sheet: 'C1', cell: 'N58' },

  // Signatures
  dateSigned: { sheet: 'C1', cell: 'L60' },

  // C2: Eligibility (starts row 5)
  // C2: Work Experience (starts row 18)
  // C3: Voluntary Work (starts row 6)
  // C3: Learning and Dev (starts row 18)
  // C3: Other Info (starts row 29)
  // C4: Questionnaire
};

// Repeating sections logic
export const pdsRepeatingConfig = {
  eligibility: {
    sheet: 'C2',
    startRow: 5,
    maxRows: 7,
    columns: {
      name: 'A',
      rating: 'F',
      date: 'G',
      place: 'I',
      licenseNumber: 'L',
      licenseDate: 'M'
    }
  },
  workExperience: {
    sheet: 'C2',
    startRow: 18,
    maxRows: 28,
    columns: {
      fromDate: 'A',
      toDate: 'C',
      positionTitle: 'D',
      company: 'G',
      monthlySalary: 'J',
      salaryGrade: 'K',
      statusOfAppointment: 'L',
      govtService: 'M'
    }
  },
  voluntaryWork: {
    sheet: 'C3',
    startRow: 6,
    maxRows: 7,
    columns: {
      nameAddress: 'A',
      fromDate: 'E',
      toDate: 'F',
      hours: 'G',
      position: 'H'
    }
  },
  learningAndDevelopment: {
    sheet: 'C3',
    startRow: 18,
    maxRows: 21,
    columns: {
      title: 'A',
      fromDate: 'E',
      toDate: 'F',
      hours: 'G',
      type: 'H',
      sponsor: 'I'
    }
  },
  children: {
    sheet: 'C1',
    startRow: 37,
    maxRows: 12,
    columns: { name: 'I', dateOfBirth: 'M' }
  },
  skills: {
    sheet: 'C3',
    startRow: 29,
    maxRows: 7,
    columns: { value: 'A' }
  },
  distinctions: {
    sheet: 'C3',
    startRow: 29,
    maxRows: 7,
    columns: { value: 'C' }
  },
  memberships: {
    sheet: 'C3',
    startRow: 29,
    maxRows: 7,
    columns: { value: 'I' }
  },
  references: {
    sheet: 'C4',
    startRow: 53,
    maxRows: 3,
    columns: { name: 'A', address: 'F', telephone: 'G' }
  }
};
