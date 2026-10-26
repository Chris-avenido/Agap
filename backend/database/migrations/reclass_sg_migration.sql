-- =====================================================================
-- RECLASSIFICATION SALARY GRADE (reclass_sg) MIGRATION SCRIPT
-- Source: "Inventory of Application for GC Reclass(New Positions-QS SG)"
-- =====================================================================
-- Description: Idempotent DDL and data seeding to create and populate
-- the reclass_sg table with Qualification Standards (QS) and Salary Grades (SG)
-- for new Guidance Counselor and School Counselor positions.
-- Safe to execute repeatedly on PostgreSQL.
-- =====================================================================

-- 1. Create reclass_sg table
CREATE TABLE IF NOT EXISTS reclass_sg (
  id SERIAL PRIMARY KEY,
  position_title VARCHAR(255) NOT NULL UNIQUE,
  salary_grade INTEGER NOT NULL,
  monthly_salary NUMERIC(12, 2) NOT NULL,
  education TEXT,
  experience TEXT,
  training TEXT,
  eligibility TEXT,
  years_experience NUMERIC DEFAULT 0,
  hours_of_training NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Indexes for fast lookup
CREATE UNIQUE INDEX IF NOT EXISTS idx_reclass_sg_position_title_upper 
ON reclass_sg (UPPER(TRIM(position_title)));

CREATE INDEX IF NOT EXISTS idx_reclass_sg_salary_grade 
ON reclass_sg (salary_grade);

-- 3. Populate / Seed Data from Inventory of Application for GC Reclass(New Positions-QS SG)
INSERT INTO reclass_sg (
  position_title,
  salary_grade,
  monthly_salary,
  education,
  experience,
  training,
  eligibility,
  years_experience,
  hours_of_training
) VALUES 
(
  'School Counselor Associate I',
  11,
  31705.00,
  E'Bachelor\'s Degree in Guidance and Counseling or Psychology; or\n\nAny Bachelor\'s Degree with at least eighteen (18) units of courses in Guidance and Counseling or Psychology; or\n\nAny related Bachelor\'s Degree with a minimum of eighteen (18) units of Behavioral Science courses that shall include 200 hours of supervised practicum or internship experience on guidance and counseling, preferably in a school or community setting',
  'None required',
  'None required',
  E'Career Service \nProfessional/ \nSecond Level \nEligibility',
  0,
  0
),
(
  'School Counselor Associate II',
  12,
  33947.00,
  E'Bachelor\'s Degree in Guidance and Counseling or Psychology; or\n\nAny Bachelor\'s Degree with at least eighteen (18) units of courses in Guidance and Counseling or Psychology; or\n\nAny related Bachelor\'s Degree with a minimum of eighteen (18) units of Behavioral Science courses that shall include 200 hours of supervised practicum or internship experience on guidance and counseling, preferably in a school or community setting',
  '1 year of relevant experience in providing support and assistance in the delivery of guidance and counseling services, career development activities, and/or implementation of mental health and well-being programs in schools or other related settings',
  '4 hours of relevant training on providing support in guidance and counseling services, career development programs, or mental health and well-being programs in schools or other related settings',
  E'Career Service \nProfessional/ \nSecond Level \nEligibility',
  1,
  4
),
(
  'School Counselor Associate III',
  13,
  36125.00,
  E'Bachelor\'s Degree in Guidance and Counseling or Psychology; or\n\nAny Bachelor\'s Degree with at least eighteen (18) units of courses in Guidance and Counseling or Psychology; or\n\nAny related Bachelor\'s Degree with a minimum of eighteen (18) units of Behavioral Science courses that shall include 200 hours of supervised practicum or internship experience on guidance and counseling, preferably in a school or community setting',
  '2 years of relevant experience in providing support and assistance in the delivery of guidance and counseling services, career development activities, and/or implementation of mental health and well-being programs in schools or other related settings',
  '8 hours of relevant training on providing support in guidance and counseling services, career development programs, or mental health and well-being programs in schools or other related settings',
  E'Career Service \nProfessional/ \nSecond Level \nEligibility',
  2,
  8
),
(
  'School Counselor Associate IV',
  14,
  38764.00,
  E'Bachelor\'s Degree in Guidance and Counseling or Psychology; or\n\nAny Bachelor\'s Degree with at least eighteen (18) units of courses in Guidance and Counseling or Psychology; or\n\nAny related Bachelor\'s Degree with a minimum of eighteen (18) units of Behavioral Science courses that shall include 200 hours of supervised practicum or internship experience on guidance and counseling, preferably in a school or community setting',
  '3 years of relevant experience in providing support and assistance in the delivery of guidance and counseling services, career development activities, and/or implementation of mental health and well-being programs in schools or other related settings',
  '16 hours of relevant training on providing support in guidance and counseling services, career development programs, or mental health and well-being programs in schools or other related settings',
  E'Career Service \nProfessional/ \nSecond Level \nEligibility',
  3,
  16
),
(
  'School Counselor Associate V',
  15,
  42178.00,
  E'Bachelor\'s Degree in Guidance and Counseling or Psychology; or\n\nAny Bachelor\'s Degree with at least eighteen (18) units of courses in Guidance and Counseling or Psychology; or\n\nAny related Bachelor\'s Degree with a minimum of eighteen (18) units of Behavioral Science courses that shall include 200 hours of supervised practicum or internship experience on guidance and counseling, preferably in a school or community setting',
  '3 years of relevant experience in providing support and assistance in the delivery of guidance and counseling services, career development activities, and/or implementation of mental health and well-being programs in schools or other related settings',
  '24 hours of relevant training on providing support in guidance and counseling services, career development programs, or mental health and well-being programs in schools or other related settings',
  E'Career Service \nProfessional/ \nSecond Level \nEligibility',
  3,
  24
),
(
  'School Counselor I',
  16,
  45694.00,
  E'Master\'s degree in \nGuidance and \nCounseling; or \n \nMaster\'s degree in \nPsychology',
  'None required',
  'None required',
  E'RA 1080, as \namended \n(Guidance \nCounselor or \nPsychologist)',
  0,
  0
),
(
  'School Counselor II',
  18,
  53818.00,
  E'Master\'s degree in \nGuidance and \nCounseling; or \n \nMaster\'s degree in \nPsychology',
  '1 year of relevant experience involving the delivery of guidance and counseling services and career development programs, and/or implementation of mental health and well-being programs in schools or other settings',
  '8 hours of relevant training on the delivery of counseling and guidance services, career development programs, or implementation of mental health and well-being programs in schools or other settings',
  E'RA 1080, as \namended \n(Guidance \nCounselor or \nPsychologist)',
  1,
  8
),
(
  'School Counselor III',
  20,
  66052.00,
  E'Master\'s degree in \nGuidance and \nCounseling; or \n \nMaster\'s degree in \nPsychology',
  '2 years of relevant experience involving the delivery of guidance and counseling services and career development programs, and/or implementation of mental health and well-being programs in schools or other settings',
  '16 hours of relevant training on the delivery of counseling and guidance services, career development programs, or implementation of mental health and well-being programs in schools or other settings',
  E'RA 1080, as \namended \n(Guidance \nCounselor or \nPsychologist)',
  2,
  16
),
(
  'School Counselor IV',
  22,
  81796.00,
  E'Master\'s degree in \nGuidance and \nCounseling; or \n \nMaster\'s degree in \nPsychology',
  '3 years of relevant experience involving the delivery of guidance and counseling services and career development programs, and/or implementation of mental health and well-being programs in schools or other settings',
  '24 hours of relevant training on the delivery of counseling and guidance services, career development programs, or implementation of mental health and well-being programs in schools or other settings',
  E'RA 1080, as \namended \n(Guidance \nCounselor or \nPsychologist)',
  3,
  24
)
ON CONFLICT (position_title) DO UPDATE SET
  salary_grade = EXCLUDED.salary_grade,
  monthly_salary = EXCLUDED.monthly_salary,
  education = EXCLUDED.education,
  experience = EXCLUDED.experience,
  training = EXCLUDED.training,
  eligibility = EXCLUDED.eligibility,
  years_experience = EXCLUDED.years_experience,
  hours_of_training = EXCLUDED.hours_of_training,
  updated_at = NOW();

-- 4. Populate / Seed Data from Inventory of Application for GC Reclass(GC - SG) (other columns null)
INSERT INTO reclass_sg (
  position_title,
  salary_grade,
  monthly_salary,
  education,
  experience,
  training,
  eligibility,
  years_experience,
  hours_of_training
) VALUES 
(
  'Guidance Counselor I',
  11,
  31705.00,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL
),
(
  'Guidance Counselor II',
  12,
  33947.00,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL
),
(
  'Guidance Counselor III',
  13,
  36125.00,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL
),
(
  'Guidance Coordinator I',
  14,
  38764.00,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL
),
(
  'Guidance Coordinator II',
  15,
  42178.00,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL
),
(
  'Guidance Coordinator III',
  16,
  45694.00,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL
),
(
  'Guidance Services Specialist I',
  16,
  45694.00,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL
),
(
  'Guidance Services Specialist II',
  18,
  53818.00,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL
)
ON CONFLICT (position_title) DO UPDATE SET
  salary_grade = EXCLUDED.salary_grade,
  monthly_salary = EXCLUDED.monthly_salary,
  education = NULL,
  experience = NULL,
  training = NULL,
  eligibility = NULL,
  years_experience = NULL,
  hours_of_training = NULL,
  updated_at = NOW();

