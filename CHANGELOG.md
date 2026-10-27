# AGAP Portal — Changelog & Architecture Notes

## [2026-10-27] [Reclass] Retained `reclass_position` Column in `public.reclass_gc` & Ensured Live Database Schema Synchronization
- **Root Cause & Resolution**:
  - The PostgreSQL trigger `trg_uppercase_reclass_gc()` on `reclass_gc` references `NEW.reclass_position`. Because the live database table was previously missing the column, row updates threw `record "new" has no field "reclass_position"`.
  - In accordance with instructions, **`reclass_position` is explicitly retained** in `reclass_gc`.
  - Added `ALTER TABLE public.reclass_gc ADD COLUMN IF NOT EXISTS reclass_position VARCHAR(255);` to [`database.ts`](file:///e:/christop/AGAP%20Portal/backend/src/database.ts) and [`add_desire_position_migration.sql`](file:///e:/christop/AGAP%20Portal/backend/database/migrations/add_desire_position_migration.sql).
  - Retained `reclass_position` in [`schema.prisma`](file:///e:/christop/AGAP%20Portal/backend/database/schema.prisma) and uppercase trigger handling in `trg_uppercase_reclass_gc()`.
  - Ensured both `reclass_position` and `desired_position` coexist cleanly with zero schema collisions or trigger exceptions.

- **Database Migration (`backend/database/migrations/add_desire_position_migration.sql`)**:
  - Added `ALTER TABLE public.reclass_gc ADD COLUMN IF NOT EXISTS desired_position VARCHAR(255);`.
  - Dropped obsolete `target_position` and `desire_position` columns if present.
  - Added index `idx_reclass_gc_desired_position` on `public.reclass_gc(desired_position)`.
  - Backfilled existing `desired_position` from existing `reclass_position` values.
- **Backend Schema & Service Synchronization**:
  - Updated [`database.ts`](file:///e:/christop/AGAP%20Portal/backend/src/database.ts) `runSchemaMigrations` to ensure `desired_position` exists automatically on database connection and included in uppercase trigger.
  - Updated [`schema.prisma`](file:///e:/christop/AGAP%20Portal/backend/database/schema.prisma) model `reclass_gc` with `desired_position String? @db.VarChar(255)`.
  - Updated [`applicants.service.ts`](file:///e:/christop/AGAP%20Portal/backend/src/applicants/applicants.service.ts) to update and query `desired_position` directly.
  - Updated [`applicants.routes.ts`](file:///e:/christop/AGAP%20Portal/backend/src/applicants/applicants.routes.ts) to accept `desired_position` in PUT `/reclass-update-preference` and PUT `/reclass-target-position`.
- **Frontend Integration**:
  - Updated [`ReclassUpdateModal.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/components/ReclassUpdateModal.tsx) to pass `desired_position: selectedPosition` in `handleSave`.
  - Updated [`ApplicantDashboard.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/pages/ApplicantDashboard.tsx) to send and read `desired_position`.

## [2026-10-27] [Reclass] Renamed "Target Reclass" Field to "QS-Based Assessed Position"
- **Field Label Standardization in [`ApplicantDashboard.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/pages/ApplicantDashboard.tsx)**:
  - Renamed the display-only **"Target Reclass"** card header to **"QS-Based Assessed Position"** in the **Reclassification Info** grid.
  - This accurately reflects the evaluation criteria: it presents the position evaluated against DepEd Qualification Standards (QS) based on incumbent credentials, distinct from the user's editable "Desired Position".
  - Updated the section subtitle to `"Current plantilla record, initial assessment, desired position, and QS-based assessed position"`.
  - Preserved underlying data bindings (`reclassData.reclass_position`), calculations, and styling without regressions.

## [2026-10-27] [Reclass] Disable Further Update Options for Users Assessed as SC IV During Initial Assessment
- **Core Rule & Requirement**:
  - Incumbents already assessed as **School Counselor IV** (`SC IV` / `SG-22`) during the initial assessment have achieved the terminal benchmark position under the School Counselor career track (DepEd Order No. 004, s. 2026).
  - All options allowing them to update their desired position, change registration tracks, or toggle application update preferences are disabled, while preserving their ability to inspect their Qualification Standards (QS).
- **Backend API & Service Safeguards**:
  - Added helper `isAssessedSCIV()` in [`ApplicantsService`](file:///e:/christop/AGAP%20Portal/backend/src/applicants/applicants.service.ts) to accurately detect SC IV while explicitly distinguishing it from *School Counselor Associate IV* (`SG-14`).
  - Added server-side validation in `ApplicantsService.updateTargetPosition()` and `ApplicantsService.updateReclassApplicationPreference()`. If an incumbent's initial assessment is SC IV, the update is rejected with an Error: *"Further update options are disabled: Applicant is already assessed as School Counselor IV (SC IV), the maximum reclassification role."*
  - Updated [`applicants.routes.ts`](file:///e:/christop/AGAP%20Portal/backend/src/applicants/applicants.routes.ts) to return an HTTP `400 Bad Request` status for disabled update attempts.
- **No Schema Changes / Zero Unnecessary Columns**:
  - Reverted and dropped the temporary `initial_assessment` column from `reclass_gc` in [`database.ts`](file:///e:/christop/AGAP%20Portal/backend/src/database.ts) and the live database.
  - Leverages the existing data fetch (`reclass_position` / `initial_assessment_position`) already used by the dashboard's assessment card to evaluate whether an applicant is assessed as SC IV without modifying the database schema.
  - Adheres strictly to the bug-fix and minimal-change protocol in [`.agents/agents.md`](file:///e:/christop/AGAP%20Portal/.agents/agents.md).
- **Frontend Dashboard Logic & Presentation in [`ApplicantDashboard.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/pages/ApplicantDashboard.tsx)**:
  - Suppressed the initial reclassification popup prompt modal (`showInitialPrompt`) for SC IV incumbents on initial login.
  - Replaced the *Application Update Preference* card with a dedicated **Maximum Level Reached (SC IV)** state:
    - Displays green/emerald badge: `✓ MAXIMUM LEVEL (SC IV)`.
    - Shows informational notice explaining that SC IV is the highest position under DO 004, s. 2026.
    - Replaced the update action buttons with **"View QS"** and **"Updates Disabled"** indicators.
  - On the *Desired Position* card, replaced the **"Change"** button with a locked **"Max Level"** badge while keeping **"View QS"** accessible.
  - Added guards in `handleSaveTargetPosition` and `handleUpdateApplicationAnswer` preventing any client-side update attempts.
- **Reclass Update Modal Controls in [`ReclassUpdateModal.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/components/ReclassUpdateModal.tsx)**:
  - Added `isAlreadySCIV` prop.
  - When true, automatically initializes modal in Step 2 with `School Counselor IV` and `Registered (RA 1080)` locked.
  - Displays a clear terminal role notice banner.
  - Disables track switching, hides Quick Select chips, disables position dropdown, and replaces the footer *"Save & Confirm"* button with an informational *"Close"* button.
- **Strict Adherence to Guidelines (`.agents/agents.md`)**:
  - Preserved all existing applicant dashboard and reclassification functions without regressions.
  - Retained `'None Required'` display formatting for 0 years experience and 0 training hours.

## [2026-10-27] [Reclass] Added Tag Indicating Uploading of Document is For Updating
- **Document Upload Modal Tagging in [`ReclassUploadModal.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/components/ReclassUploadModal.tsx)**:
  - Added prominent **`For Updating`** header pill tag (`bg-[#facc15] text-[#022851]`) directly in the modal title bar beside *"Reclassification Document Submission"*.
  - Added **`For Updating`** pill badge in the Submission Progress counter banner.
  - Added **`For Updating`** tags on individual requirement cards (`Pending Upload (For Updating)`, `Optional (For Updating)`, and `Selected for Updating` for staged files).
  - Updated primary per-item upload action label to **`Upload for Updating`**.
- **Applicant Dashboard Synchronization in [`ApplicantDashboard.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/pages/ApplicantDashboard.tsx)**:
  - Added a dedicated **`For Updating`** badge (`bg-sky-400/20 text-sky-200 border-sky-300/30`) on the primary **"Upload Requirements"** header action button.
  - Added a dedicated **`For Updating`** badge beside the **"Updating of Documents"** title on the Step 1 Stepper card.
  - Updated Step 1 button text to **`Upload for Updating (${uploadedDocsCount}/8)`** (or `Manage Updated Docs`).
- **Strict Guideline Compliance (`.agents/agents.md`)**:
  - Preserved all existing document upload, revision, replacement, and evaluator checklist review logic without breaking changes or regression.

## [2026-10-27] [Reclass] Enable Qualification Standards (QS) Visibility for Applicants
- **Qualification Standards (QS) Integration in [`ReclassUpdateModal.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/components/ReclassUpdateModal.tsx)**:
  - Enabled dynamic Qualification Standards (QS) visibility when choosing a desired reclassification role in Step 2.
  - Displays DepEd & CSC benchmark qualification criteria for every role:
    - **Education**: Degree & coursework prerequisites (e.g. Master's in Guidance and Counseling / Psychology or Bachelor's with 18 units & 200 hours practicum).
    - **Experience**: Relevant professional experience description and duration.
    - **Training**: Relevant specialized training hours description and duration.
    - **Eligibility**: License requirements (RA 1080 PRC Guidance Counselor license or Career Service Professional).
    - **Compensation**: Live Salary Grade and monthly compensation (`₱xx,xxx.00 / month`).
  - **Strict Guideline Compliance (`.agents/agents.md`)**:
    - When `years_experience` is `0`, prominently renders badge & text as **`None Required`** (`bg-emerald-100 text-emerald-800 border-emerald-300`).
    - When `hours_of_training` is `0`, prominently renders badge & text as **`None Required`** (`bg-emerald-100 text-emerald-800 border-emerald-300`).
  - Added interactive quick-selection chips beneath the position dropdown for rapid position browsing and instant QS comparison.
- **Backend API Endpoint in [`applicants.routes.ts`](file:///e:/christop/AGAP%20Portal/backend/src/applicants/applicants.routes.ts) & [`applicants.service.ts`](file:///e:/christop/AGAP%20Portal/backend/src/applicants/applicants.service.ts)**:
  - Added `GET /api/applicants/reclass-positions-qs` to query the `reclass_sg` table.
  - Retrieves all 9 benchmark positions ordered by `salary_grade ASC`.
  - Normalizes numeric `years_experience`, `hours_of_training`, `monthly_salary`, and `salary_grade`.
- **Applicant Dashboard Integration in [`ApplicantDashboard.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/pages/ApplicantDashboard.tsx)**:
  - Added **"View QS"** quick action button on the "Desired Position" card, enabling incumbents to open the modal directly into Step 2 with full Qualification Standards visible.

## [2026-10-26] Removed Dependency on Dropped `reclass_applications` Table (Unified to `reclass_gc`)
- **Investigation & Root Cause**:
  - A database schema change removed table `reclass_applications`.
  - Backend queries in `getReclassDetails`, `getReclassDocuments`, `updateTargetPosition`, `updateReclassApplicationPreference`, and auth routes threw Postgres errors: `relation "reclass_applications" does not exist (code: 42P01)`.
- **Backend Code Adaptation in [`applicants.service.ts`](file:///e:/christop/AGAP%20Portal/backend/src/applicants/applicants.service.ts)**:
  - Unified all reclassification applicant queries, updates, and preference saves directly to `reclass_gc` as the authoritative single source of truth.
  - In `getReclassDetails`: Removed read queries against `reclass_applications`, obtaining applicant status directly from `reclass_gc`. Kept `reclass_application` property mapped to the incumbent record for full backward compatibility with frontend consumers.
  - In `getReclassDocuments`: Removed fallback check on `reclass_applications`; documents are queried and filtered directly by `plantilla_item_number` in `reclass_documents`.
  - In `updateTargetPosition` and `updateReclassApplicationPreference`: Removed `UPDATE reclass_applications` queries; preferences (`update_application`, `is_registered`, `target_position`, `reclass_position`) are persisted to `reclass_gc`.
  - In `loginWithPlantilla` & `verifyPasscodeLogin`: Removed queries to `reclass_applications`.
  - In `uploadReclassDocument`: Updated `reclass_gc` directly instead of `reclass_applications`.
- **Database Migrations & Schema**:
  - Removed table creation and FK reference from [`database.ts`](file:///e:/christop/AGAP%20Portal/backend/src/database.ts).
  - Removed `reclass_applications` model and FK relation from [`schema.prisma`](file:///e:/christop/AGAP%20Portal/backend/database/schema.prisma).

## [2026-10-26] Reclassification Guided 2-Step Workflow (Registration Question Before Desired Position)
- **Sequential Multi-Step Progression in [`ReclassUpdateModal.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/components/ReclassUpdateModal.tsx)**:
  - Ensured that when an applicant wants to update or apply for reclassification, they are **asked first whether they are already a Registered Guidance Counselor (RA 1080) or not before asking for their Desired Position**.
  - **Step 1: Registration Status Check**:
    - Displays visual 2-step wizard progress indicator (`1. Registration Status` active, `2. Desired Position` pending).
    - Prominently prompts: *"Are you already a Registered Guidance Counselor?"*
    - Two clear selection cards:
      1. **Yes, Registered Guidance Counselor (RA 1080)** (Counselor Track: SG 16–22 • School Counselor I to IV).
      2. **No, Not Registered** (Associate Track: SG 11–15 • School Counselor Associate I to V).
    - Hides the Desired Position dropdown completely during Step 1.
    - Includes a **"Next: Select Desired Position →"** button to advance once the user chooses their status.
  - **Step 2: Desired Position Selection**:
    - Displays a confirmation summary banner with an editable **"← Change Status"** button returning to Step 1.
    - Prompts: *"Select your Desired Position"*.
    - Renders the dropdown options filtered strictly to their chosen track:
      - If Registered: `School Counselor I (SG-16)`, `School Counselor II (SG-18)`, `School Counselor III (SG-20)`, `School Counselor IV (SG-22)`.
      - If Not Registered: `School Counselor Associate I (SG-11)`, `School Counselor Associate II (SG-12)`, `School Counselor Associate III (SG-13)`, `School Counselor Associate IV (SG-14)`, `School Counselor Associate V (SG-15)`.
    - Live Salary Grade pill badge with full application summary (Track, Position, SG).
    - Navigation footer with **"← Back"** button to return to Step 1, and **"Save & Confirm"** to submit preference.
- **First-Time Reclassification Incumbent Trigger in [`ApplicantDashboard.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/pages/ApplicantDashboard.tsx)**:
  - In `PlantillaGateModal` verification callback (`onVerified`), immediately checks if `update_application` is `null`/`undefined`, launching the initial prompt (*"Would you like to update your application? Yes or No"*). Clicking "Yes" directly initiates Step 1 of the guided 2-step modal.

## [2026-10-26] Reclassification "Would you like to update your application" & Register Preference (Boolean Schema)
- **Database Migration & Schema Update**:
  - Created and executed standalone idempotent migration script [`update_application_columns_migration.sql`](file:///e:/christop/AGAP%20Portal/backend/database/migrations/update_application_columns_migration.sql).
  - Configured strictly **2 BOOLEAN columns** on both `public.reclass_gc` and `public.reclass_applications`:
    - `update_application BOOLEAN DEFAULT FALSE`: Stores `true` (Yes) or `false` (No) to *"Would you like to update your application"*.
    - `is_registered BOOLEAN DEFAULT FALSE`: Stores `true` (Registered RA 1080 Guidance Counselor track) or `false` (Not Registered Associate track).
  - Dropped obsolete `registered_or_not` column and its index from both tables.
  - Added indexes `idx_reclass_gc_update_app` & `idx_reclass_gc_is_registered` on `reclass_gc`, and `idx_reclass_app_update_app` & `idx_reclass_app_is_registered` on `reclass_applications`.
  - Added idempotent column & index verification in `runSchemaMigrations` within [`database.ts`](file:///e:/christop/AGAP%20Portal/backend/src/database.ts).
  - Updated Prisma models `reclass_gc` and `reclass_applications` in [`schema.prisma`](file:///e:/christop/AGAP%20Portal/backend/database/schema.prisma) with `update_application Boolean?` and `is_registered Boolean?`.
- **Backend API & Service Methods**:
  - Updated `ApplicantsService.updateReclassApplicationPreference` in [`applicants.service.ts`](file:///e:/christop/AGAP%20Portal/backend/src/applicants/applicants.service.ts) to accept boolean `update_application` and `is_registered`.
  - Updated `ApplicantsService.updateTargetPosition` to accept boolean `update_application` and `is_registered`.
  - Updated `ApplicantsService.getReclassDetails` to return boolean `update_application` and `is_registered`.
  - Updated `PUT /api/applicants/:id/reclass-update-preference` and `PUT /api/applicants/:id/reclass-target-position` in [`applicants.routes.ts`](file:///e:/christop/AGAP%20Portal/backend/src/applicants/applicants.routes.ts).
- **Frontend Interactive UI & Workflow**:
  - **Renamed Target Position to Desired Position**:
    - Renamed all user-facing labels from **"Target Position"** to **"Desired Position"** across [`ApplicantDashboard.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/pages/ApplicantDashboard.tsx), [`ReclassUpdateModal.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/components/ReclassUpdateModal.tsx), and [`LoginConfirmationModal.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/components/LoginConfirmationModal.tsx).
  - **Added School Counselor I to IV with SGs**:
    - `School Counselor I` (SG-16)
    - `School Counselor II` (SG-18)
    - `School Counselor III` (SG-20)
    - `School Counselor IV` (SG-22)
    - Along with `School Counselor Associate I to V` (SG 11 to 15) for the non-registered track.
  - Updated [`ReclassUpdateModal.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/components/ReclassUpdateModal.tsx) to manage boolean `isRegistered` state and save `{ update_application: true, is_registered: isRegistered, target_position }`.
  - Updated [`ApplicantDashboard.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/pages/ApplicantDashboard.tsx) to evaluate boolean `update_application` (`true`, `false`, or `null/undefined`) and `is_registered` (`true` vs `false`), removing `registered_or_not`.

## [2026-10-26] Reclassification Salary Grade & Qualification Standards Table (`reclass_sg`)
- **Table Creation & Migration**:
  - Created standalone idempotent SQL migration script [`reclass_sg_migration.sql`](file:///e:/christop/AGAP%20Portal/backend/database/migrations/reclass_sg_migration.sql).
  - Created table `public.reclass_sg` with columns:
    - `id` (SERIAL PRIMARY KEY)
    - `position_title` (VARCHAR(255) NOT NULL UNIQUE)
    - `salary_grade` (INTEGER NOT NULL)
    - `monthly_salary` (NUMERIC(12, 2) NOT NULL)
    - `education` (TEXT)
    - `experience` (TEXT)
    - `training` (TEXT)
    - `eligibility` (TEXT)
    - `years_experience` (NUMERIC DEFAULT 0)
    - `hours_of_training` (NUMERIC DEFAULT 0)
    - `created_at` (TIMESTAMP WITH TIME ZONE DEFAULT NOW())
    - `updated_at` (TIMESTAMP WITH TIME ZONE DEFAULT NOW())
  - Created unique index `idx_reclass_sg_position_title_upper` on `UPPER(TRIM(position_title))` and index `idx_reclass_sg_salary_grade` on `salary_grade`.
- **Data Ingestion**:
  - Populated all 9 benchmark positions and qualification standards from `"Inventory of Application for GC Reclass(New Positions-QS SG)"`:
    1. `School Counselor Associate I` (SG-11, ₱31,705.00)
    2. `School Counselor Associate II` (SG-12, ₱33,947.00)
    3. `School Counselor Associate III` (SG-13, ₱36,125.00)
    4. `School Counselor Associate IV` (SG-14, ₱38,764.00)
    5. `School Counselor Associate V` (SG-15, ₱42,178.00)
    6. `School Counselor I` (SG-16, ₱45,694.00)
    7. `School Counselor II` (SG-18, ₱53,818.00)
    8. `School Counselor III` (SG-20, ₱66,052.00)
    9. `School Counselor IV` (SG-22, ₱81,796.00)
  - Populated all 8 incumbent Guidance Counselor positions from `"Inventory of Application for GC Reclass(GC - SG)"` with null in other columns:
    10. `Guidance Counselor I` (SG-11, ₱31,705.00)
    11. `Guidance Counselor II` (SG-12, ₱33,947.00)
    12. `Guidance Counselor III` (SG-13, ₱36,125.00)
    13. `Guidance Coordinator I` (SG-14, ₱38,764.00)
    14. `Guidance Coordinator II` (SG-15, ₱42,178.00)
    15. `Guidance Coordinator III` (SG-16, ₱45,694.00)
    16. `Guidance Services Specialist I` (SG-16, ₱45,694.00)
    17. `Guidance Services Specialist II` (SG-18, ₱53,818.00)
- **Application & Schema Synchronization**:
  - Integrated idempotent table verification in `runSchemaMigrations` within [`database.ts`](file:///e:/christop/AGAP%20Portal/backend/src/database.ts).
  - Increased PostgreSQL pool `connectionTimeoutMillis` to `25000` to prevent cold connection timeouts on Azure PostgreSQL.
  - Added Prisma model `reclass_sg` in [`schema.prisma`](file:///e:/christop/AGAP%20Portal/backend/database/schema.prisma).
  - Updated [`reclass_sg_migration.sql`](file:///e:/christop/AGAP%20Portal/backend/database/migrations/reclass_sg_migration.sql) with both dataset batches.


## [2026-10-21] Incumbent GMIS Plantilla Redirection & Reclassification Verification Fix (`applicants.service.ts`, `Login.tsx`)
- **Incumbent GMIS Plantilla Item Redirection**:
  - When verifying a Plantilla Item Number in the **New Reclassification Application** form (`category === 'new'`), if the item number exists in GMIS / `reclass_gc` with an assigned incumbent personnel name (`hasName === true`) but has not yet registered a reclassification email (`hasEmail === false`), the API now returns `status: 'incumbent_record'`.
  - The UI presents a specialized banner: *"This Plantilla Item Number belongs to an existing GMIS incumbent record. Please proceed to Incumbent Plantilla Registration."* along with a direct action button: **`Proceed to Incumbent Plantilla Registration →`**.
  - Clicking this button automatically switches to the Incumbent Registration view (`category: 'existing'`), carries over the entered Plantilla Item Number, and executes verification seamlessly without re-typing.
- **Accurate Incumbent Registration Verification & Jobseeker Decoupling**:
  - In `ApplicantsService.verifyReclassItemNumber` and `registerReclassAccount`:
    - Resolved a conflict where incumbent personnel with existing legacy jobseeker applicant accounts (e.g. `OSEC-DECSB-GUIDC2-570110-2016` / Cristy Ross Pacatang) were falsely flagged as `already_registered` because of their jobseeker credentials.
    - An incumbent in `reclass_gc` is now only treated as already registered if `reclass_gc.email` is non-empty AND an applicant record exists with `registrant_type === 'reclass'`.
    - If `reclass_gc.email` is empty, verification returns `status: 'valid'` and pre-populates their incumbent GMIS data, and registration re-purposes the applicant account cleanly into `reclass`.

## [2026-10-21] Paginated Multi-Step Wizard for New Reclassification Application (`Login.tsx`)
- **Display Optimization**: Paginated the lengthy 14-field New Reclassification Application registration form into a clean, 3-step wizard with "Next" and "Back" navigation buttons, maximizing the display space and eliminating excessive vertical scrolling.
  - **Step 1: Plantilla & Identity**: Plantilla Item Number Verification, First/Middle/Last Name, and Official DepEd Email & Mobile Number with "Next: Station & Qualifications &rarr;".
  - **Step 2: Station & Qualifications**: Current Position, Region & Division dropdowns, School/Station Name, Education/Degree, Eligibility, and Experience & Training hours with "&larr; Back" and "Next: Security Credentials &rarr;".
  - **Step 3: Security & Submission**: Password, Confirm Password, and 6-Digit Passcode with "&larr; Back" and "Register New Application".
- **Step Wizard Progress Bar**: Added an interactive progress bar at the top of the form indicating current step completion (with step jumping for visited steps and mobile-optimized step indicators).
- **Interactive Validation**: Integrated per-step validation to guide users before advancing (verifying plantilla slots, required names, valid DepEd email format, mobile format, and station details).
- **Guided Tour Synchronization**: Automatically synchronizes the "Register Tutorial" steps with the form wizard so navigating through the tutorial seamlessly switches between Step 1, Step 2, and Step 3 views.
- **Dynamic Subtitle**: Updated header subtitle to dynamically reflect the active step instructions.

## [2026-10-21] Read-Only Target Position Card & Automatic Selection Modal (`ApplicantDashboard.tsx`)
- Changed the **"Target Position"** card to be strictly read-only on the dashboard (removed the inline Edit button and form).
- Added an automatic **Target Position Selection Modal** that triggers if `reclass_gc.target_position` is null or empty upon dashboard load or after plantilla verification.
- Configured the modal to allow selection of **`School Counselor II`** (`SG-18`).
- Persists the confirmed selection to the backend via `PUT /api/applicants/:id/reclass-target-position` and dynamically refreshes the dashboard state.

## [2026-10-21] Dedicated "Register Tutorial" for New Reclassification Application (`Login.tsx`)
- Added dedicated `RECLASS_NEW_APP_TOUR_STEPS` for **New Reclassification Application** candidates.
- Configured `getActiveTourSteps()` to detect `reclassRegType === 'new'` and display the step-by-step tutorial matching the New Application form (Plantilla Verification, Applicant Personal Details, Official Contact Info, Position & Station, Qualifications, and Security Credentials).
- Added corresponding element IDs (`#tour-newapp-*`) across the New Application registration form.
- Dynamically customized the onboarding Welcome Modal copy and highlights when viewing New Reclassification Application.

## [2026-10-21] Reclassification Info Layout: 2-Row Grid (`ApplicantDashboard.tsx`)
- Updated the **Reclassification Info** card container from a single 6-column row (`xl:grid-cols-6`) to a structured 2-row grid (`md:grid-cols-3`):
  - **Row 1**: Plantilla Item No. | Position Title | Salary Grade
  - **Row 2**: Initial Assessment | Target Position (Editable) | Target Reclass
- Removed `col-span-2` expansion when editing Target Position to ensure the layout remains strictly 2 rows without pushing adjacent cards to extra lines.

## [2026-10-21] Editable "Target Position" Card with Specific Dropdown Options

### 1. Interactive Dropdown Selection (`ApplicantDashboard.tsx`)
- Made the **"Target Position"** card interactive and editable with an inline Edit button, select dropdown, and Save/Cancel controls.
- Configured the dropdown list to strictly contain the 4 requested positions:
  - **`School Counselor Associate I`** (SG-11)
  - **`School Counselor Associate II`** (SG-12)
  - **`School Counselor Associate III`** (SG-13)
  - **`School Counselor Associate IV`** (SG-14)
- Linked selection to dynamic Salary Grade recalculation and backend synchronization via `PUT /api/applicants/:id/reclass-target-position`.
- Standardized the subsequent **"Target Reclass"** card as a clean, display-only card rendering `reclassData.reclass_position || '—'`.

## [2026-10-21] Status Normalization: Removed Hyphen ("Re-submit" → "Resubmit")

### 1. UI Label & Badge Normalization
- Removed the hyphen from the reclassification status across all frontend components:
  - **Dashboard Stepper Top Badge**: Updated to **`Resubmit`**.
  - **Dashboard Current Stage Header Badge**: Updated to **`Resubmit`**.
  - **Dashboard Step 2 HRMO Review Box & Title Badge**: Updated to **`Resubmit`**.
  - **Reclassification Modal Cards (`ReclassUploadModal.tsx`)**: Updated badge, staged file helper, remarks label, and upload button to **`Resubmit`** (and notification title to **`Document Resubmitted`**).

### 2. Backend & Database Status Value Synchronization
- Updated `ApplicantsService.uploadReclassDocument` and `getReclassDocuments` to record and normalize status as **`'resubmit'`** (previously `'re-submit'`).
- Migrated existing checklist rows in PostgreSQL database `reclass_gc.document_checklist` from `'re-submit'` to `'resubmit'`.

## [2026-10-21] Added "Target Position" Card in Reclassification Info (`reclass_gc.target_position`)

### 1. Frontend Layout & Card Pipeline (`ApplicantDashboard.tsx`)
- Added a dedicated **"Target Position"** card in the **Reclassification Info** section placed directly before the **"Target Reclass"** card.
- Updated the grid layout to support up to 6 columns seamlessly across responsive viewports (`grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5`).
- The new card directly renders `reclassData.target_position || reclassData.reclass_position || '—'`.
- The subsequent **"Target Reclass"** card continues to display `reclassData.reclass_position || reclassData.target_position || '—'` alongside its interactive position edit and save functionality.
- Updated the **"Initial Assessment"** card to gracefully render `'—'` when empty.

### 2. Backend Data Synchronization (`ApplicantsService.ts`)
- In `ApplicantsService.getReclassDetails`, `ApplicantsService.login` (reclass flow), and session profile helpers:
  - Ensured `target_position` explicitly prioritizes `reclass_gc.target_position` (`incumbent?.target_position`), falling back to `reclass_position`.
  - Added explicit `reclass_position` field in returned data objects to preserve separate access to both database columns.

## [2026-10-21] Fixed Revision Document Count Discrepancy (Dashboard vs Modal)

### 1. Root Cause Identification
- In `reclass_gc.document_checklist` (JSONB array), duplicate entries existed for the same requirement key (e.g., `eligibility` appeared 3 times with `status: 'for_revision'`).
- In `ApplicantDashboard.tsx`:
  - `parseChecklistDocuments` previously mapped raw array entries directly without key deduplication.
  - As a result, `revisionDocuments = checklistDocuments.filter(d => d.rawStatus === 'for_revision')` returned a length of `3`, displaying `"3 For Revision"` on the dashboard button and `"3 Document(s) Returned"` in Step 2.
- In `ReclassUploadModal.tsx`:
  - The modal maps against the 8 unique standard `RECLASS_REQUIREMENTS`.
  - For each standard requirement (e.g. `proof_of_eligibility`), `(revisionDocuments || []).find(...)` matched only the first item, rendering exactly **1 requirement card** flagged for revision.
  - This caused the dashboard button to say `"3 For Revision"` while the modal only displayed `1`.

### 2. Resolution & Fixes Applied
- **Database Cleanup**:
  - Ran automated deduplication script against `reclass_gc.document_checklist`, collapsing redundant array entries down to unique requirements while strictly preserving `for_revision` status, remarks, and file URLs.
- **Frontend Deduplication (`ApplicantDashboard.tsx`)**:
  - Added `normalizeRequirementKey` to canonicalize requirement keys across aliases (`pds`, `loi`, `eligibility`, `tor`, `service`, `training`, `cav`, `performance`).
  - Updated `parseChecklistDocuments` to deduplicate items by normalized requirement key. If duplicate items exist, priority is given to items with `for_revision` status and existing evaluator remarks/file URLs.
  - `revisionDocsCount` and `revisionDocuments` now strictly represent unique requirement cards requiring revision, ensuring 1:1 parity with the modal cards.
- **Backend Persistence Deduplication (`ApplicantsService.uploadReclassDocument`)**:
  - Added `normalizeReclassChecklistKey` and deduplication in `ApplicantsService.uploadReclassDocument` to prevent any future duplicate checklist entries from being written to `reclass_gc.document_checklist`.

## [2026-10-21] Wording Reduction & Simplification (Step 2 Revision & Step 3 Regional Cards)

### 1. Step 2 Revision Card Copywriting Reduction (`ApplicantDashboard.tsx`)
- Condensed repetitive wording in the rose revision card:
  - Header: Reduced from `HRMO Document Review` to **`Document Review`**.
  - Count text: Changed from uppercase `3 DOCUMENT(S) RETURNED` to clean sentence case **`3 Document(s) Returned`**.
  - Instruction: Reduced from *"Evaluator flagged requirements for revision. Please re-upload updated copies."* to **`Please re-upload revised copies.`**
  - Action Button: Shortened from *"Reclassification Document Submission"* to **`Submit Revisions`**.

### 2. Step 3 Regional Office Card Copywriting Reduction (`ApplicantDashboard.tsx`)
- Condensed redundant phrasing in the Step 3 card:
  - Subtitle: Reduced from `Step 3 • DepEd Regional Office` to **`Step 3 • Regional Office`**.
  - Title: Simplified from `Endorsed to RO (Final Eval)` to **`RO Evaluation`**.
  - Description: Condensed from *"Endorsement to DepEd Regional Office for final evaluation, regional consolidation, and endorsement to DBM."* to **`Final evaluation and endorsement to DBM.`**
  - Status Tag: Shortened from `Under Regional Office Evaluation` to **`Under RO Evaluation`**.

## [2026-10-21] Database Migration: Added `target_position` Column to `reclass_gc`

### 1. Schema Enhancement (`reclass_gc`)
- Added new column **`target_position VARCHAR(255)`** to the `reclass_gc` table:
  - In schema definition (`backend/src/database.ts`), placed before `reclass_position VARCHAR(255)`.
  - Added startup migration `ALTER TABLE reclass_gc ADD COLUMN IF NOT EXISTS target_position VARCHAR(255);`.
  - Added database trigger rule in `trg_uppercase_reclass_gc()` to automatically uppercase and trim `target_position`.
  - Backfilled existing 45 rows in `reclass_gc` with `target_position = reclass_position`.
  - Updated backend service queries in [[ApplicantsService](file:///e:/christop/AGAP%20Portal/backend/src/applicants/applicants.service.ts)] to synchronize `target_position` alongside `reclass_position`.

## [2026-10-21] Status Transition ("Re-submit") & Approved Document Re-upload Override

### 1. Document Re-upload Override (`ApplicantsService.uploadReclassDocument`)
- When a document is re-uploaded by the applicant, the checklist item in `reclass_gc.document_checklist` is now updated to **`status: 're-submit'`** and **`rawStatus: 're-submit'`** unconditionally, even if the document was previously marked as **`approved`** or **`verified`**.
- Sets `submitted: true`, `reupload = true`, and timestamps `resubmitted_at = NOW()`.

### 2. Status Label Transition (`Re-submitted` → `Re-submit`)
- Replaced the status label from **`"Re-submitted"`** to **`"Re-submit"`** across UI components:
  - **Dashboard Stepper Top Badge**: Displays **`Re-submit`**.
  - **Dashboard Header Badge**: Displays **`Re-submit`**.
  - **Dashboard Step 2 Review Box**: Displays **`Re-submit`**.
  - **Reclassification Modal Cards (`ReclassUploadModal.tsx`)**: Displays badge **`Re-submit`** and sets button title to **`Re-submit`** when replacing an existing/approved file.

## [2026-10-21] Simplified Step 2 HRMO Review Status Card Text

### 1. Concise Copywriting (`ApplicantDashboard.tsx`)
- Condensed redundant text inside the Step 2 amber review box:
  - Header: `Document Review` with `Re-submitted` status pill.
  - Body: Simplified from *"DOCUMENTS RE-SUBMITTED / Verification of re-submitted qualification credentials in progress."* to a crisp, clear: **`Verification in progress.`**
  - Action Button: Shortened to **`View Documents`**.

## [2026-10-21] Unified Reclassification Document Fetching (`reclass_documents` + `reclass_gc`)

### 1. Dual-Source Document Retrieval Pipeline (`ApplicantsService.getReclassDocuments`)
- **Direct Linkage Resolution**:
  - Resolves applicant linkage across `applicants` (`plantilla_item_number`), `reclass_gc` (`item_no` or `first_name` + `last_name`), and `reclass_applications`.
- **Query from `reclass_documents`**:
  - Queries `reclass_documents` matching `reclass_application_id` or `plantilla_item_number`.
  - Added strict `AND file_url IS NOT NULL AND TRIM(file_url) != ''` to guarantee that only rows with valid, uploaded file URLs are retrieved and counted.
  - Ordered by `uploaded_at DESC, id DESC` to ensure the newest uploaded version takes precedence and is not overwritten by null/empty rows.
- **Merge with `reclass_gc.document_checklist` (JSONB)**:
  - Parses `document_checklist` from `reclass_gc` and merges files into the document map.
  - Automatically enriches any missing documents or status indicators directly from the evaluator checklist.
- **Resilient Key Normalization**:
  - Added robust keyword and fuzzy title matching (`resolveCategoryKey`) ensuring database title variations (e.g., extra whitespace, alternate naming like `"Personal Data Sheet (PDS)"` vs `"pds"`) reliably map to the frontend requirement keys.

## [2026-10-21] Status Replacement ("Re-submitted") & Amber Color Palette Implementation

### 1. Status Label Transition (`submitted` → `re-submitted`)
- Replaced the status of `"submitted"` with **`"re-submitted"`** across the reclassification pipeline:
  - **Backend Synchronization (`ApplicantsService.uploadReclassDocument`)**: When a requirement flagged for revision is re-uploaded, its status in `document_checklist` is recorded as `'re-submitted'` with `rawStatus: 're-submitted'`.
  - **Dashboard Stepper Title Badge**: Next to "HRMO Review & Evaluation", displays the badge with label **`Re-submitted`**.
  - **Dashboard Stepper Top Status Pill**: Displays **`Re-submitted`**.
  - **Dashboard Stepper Review Card Body**: Displays **`DOCUMENTS RE-SUBMITTED`** with the **`Re-submitted`** status tag.
  - **Current Stage Header**: Displays the prominent **`Re-submitted`** badge beside the current stage title.
  - **Reclassification Modal Cards (`ReclassUploadModal.tsx`)**: Replaced the `"Submitted"` tag with **`"Re-submitted"`**, and updated success dialogs to note documents as `"Re-submitted"`.

### 2. Amber Visual Palette Integration
- Adopted the exact warm amber aesthetic specified by user:
  - **Badge Background**: `bg-amber-50/90`
  - **Badge Border**: `border border-amber-300/80`
  - **Badge Text Color**: `text-amber-900`
  - **Badge Icon Color**: `text-amber-600` (`<FileCheck className="w-3 h-3 text-amber-600" />`)
  - **Status Card Container**: `bg-amber-50/90 border border-amber-300/80 text-amber-950`
  - **Accessibility**: Exceeds WCAG AAA contrast ratio ($\ge 7.4:1$) for dark amber text against soft amber/cream background.

## [2026-10-21] Un-Uploaded Document Action Button Isolation & HRMO Review Submitted Status Display

### 1. Document Submission Action Button Isolation (`ReclassUploadModal.tsx`)
- **Un-Uploaded Document Action State**:
  - When no document is attached / uploaded (`!hasUploadedDoc`):
    - Removed the **"View"** button.
    - Removed the **"Replace"** button.
    - Strictly displays the primary **"Upload"** button (`<Upload className="w-3.5 h-3.5" /> Upload`) styled with high-contrast portal theme (`bg-[#022851] hover:bg-[#033a76] text-white`).
- **Uploaded Document Action State**:
  - Only when a document is uploaded (`hasUploadedDoc` is true with valid file URL):
    - Displays the **"View"** button (`<Eye className="w-3.5 h-3.5 text-blue-600" /> View`).
    - Displays the **"Replace"** button (`<RefreshCw className="w-3.5 h-3.5 text-gray-500" /> Replace` or `<Upload /> Re-upload` if flagged for revision).
- **Staged File State**:
  - Displays `Remove` / `Change` / `Upload` (or `Re-submit`) for immediate single-click submission.

### 2. "HRMO Review & Evaluation" Submitted Status Synchronization (`ApplicantDashboard.tsx`)
- **Comprehensive Submitted State Detection (`hasSubmittedStatus`)**:
  - Evaluates true when `reclass_gc.documents_status` is `DOCUMENTS SUBMITTED` or `SUBMITTED`, or when any requirement in `reclass_gc.document_checklist` has `status: 'submitted'` or `submitted: true`.
- **Display "Submitted" in "HRMO Review & Evaluation"**:
  - **Step 2 Stepper Card Title**: Renders a dedicated `Submitted` badge directly beside `HRMO Review & Evaluation`:
    `<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-100 text-sky-800 border border-sky-300 shadow-2xs"><FileCheck className="w-3 h-3 text-sky-600" /> Submitted</span>`.
  - **Step 2 Top Status Pill**: Displays `Submitted`.
  - **Step 2 Review Body**: Renders the `DOCUMENTS SUBMITTED` card with `[FileCheck] Submitted` tag and direct document viewing action.
  - **Current Stage Header**: In Step 2 with submitted status, displays a prominent `[FileCheck] Submitted` badge right beside the stage title `HRMO Review & Evaluation`.

## [2026-10-21] Reclassification Document Submission: "For Revision" Re-Submission Pipeline & Responsive Design

### 1. Document Status Transition on Re-submission (`for_revision` → `submitted`)
- **Backend API Synchronization (`ApplicantsService.uploadReclassDocument`)**:
  - When an applicant uploads/re-uploads a document attached to their reclassification profile:
    - Queries `reclass_gc.document_checklist` matching the document requirement (`categoryKey` / `categoryTitle`).
    - If the requirement status was `for_revision` (or includes `revision`), automatically updates the item's `status` to `'submitted'`, sets `submitted: true`, updates timestamps and file metadata.
    - Persists the updated JSON array back to `reclass_gc.document_checklist`.
    - Triggers PostgreSQL `trg_uppercase_reclass_gc` to recalculate `reclass_gc.document_status`, cleanly transitioning it out of `FOR REVISION` and into `DOCUMENTS SUBMITTED` / `PENDING DOCUMENT REVIEW`.
    - Ensures `getReclassDetails` returns the updated checklist with `status: "submitted"`.

### 2. Document Requirement Card Visual Presentation (`ReclassUploadModal.tsx`)
- **Submitted Tag & Icon**:
  - Cards with `status: 'submitted'` now feature dedicated sky/blue portal styling:
    - **Tag / Badge**: `<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-300 shadow-2xs"><FileCheck className="w-3 h-3 text-sky-600" /> Submitted</span>`.
    - **Icon Box**: `<div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs bg-sky-100 text-sky-700 border border-sky-300 shadow-2xs"><FileCheck className="w-5 h-5 text-sky-600" /></div>`.
    - **Card Container**: High-contrast, clean container `bg-sky-50/40 border-sky-300/80 shadow-xs ring-1 ring-sky-200/50`.
  - **Staged File State on Revision Documents**:
    - When a replacement PDF is selected for a revision item, the card displays `[FileCheck] Replacement Selected (Ready to Re-submit)` with a calm sky ring, giving immediate feedback without persistent alarming red rings.
  - **Immediate Per-Card Re-Submit Action**:
    - Added a direct `Re-submit` / `Submit` button on each card when a file is staged, providing instant 1-click re-submission alongside the batch footer `Upload & Submit ({count})` button.
  - **Evaluator Feedback Context**:
    - For re-submitted documents with previous evaluator remarks, displays `Previous HRMO Remarks (Re-submitted): "..."` in a neutral slate callout.

### 3. Dashboard Stepper Card Synchronization (`ApplicantDashboard.tsx`)
- In Step 2 ("SDO Division HRMO / HRMO Review & Evaluation"):
  - When documents are submitted, displays `Submitted` top badge with `<FileCheck />` icon.
  - Displays `DOCUMENTS SUBMITTED` with `<FileCheck className="w-3.5 h-3.5 text-sky-600" />` status icon and a direct `View Reclassification Documents` action button.

### 4. Senior Designer Accessibility & Responsive Architecture
- Adheres to Arthur's Master Designer directives (`.agents/senior_designer_agent.md`):
  - **Responsive Design**: Action buttons and status tags wrap cleanly on mobile screens (`< sm`) without overflow or text truncation. Touch targets meet minimum accessible sizes (>= 36px-40px).
  - **Contrast & Hierarchy**: Colors adhere to WCAG AA/AAA guidelines with text contrast ratios >= 7:1 for sky badges and status labels.

## [2026-10-20] Reclassification Status Display: "ALL DOCUMENT REVIEWED" & QS Status (Excluded Red Highlighting)

### 1. Dual Status Rendering for Completed HRMO Review
- In [`ApplicantDashboard.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/pages/ApplicantDashboard.tsx):
  - When `reclass_gc.documents_status = "ALL DOCUMENT REVIEWED"`:
    - **Simultaneous Display**: Both **`ALL DOCUMENT REVIEWED`** and **`reclass_gc.qs_status`** are displayed together.
    - **Step 2 Card Body (Separated Cards & Adjusted Layout)**:
      - **Separated Cards**: Split the previous combined container into two dedicated, clean cards (`space-y-2`) with crisp contrast and breathing room.
      - **Card 1: Document Review Status (Verified)**: Dedicated container displaying `[FileCheck] Document Review` and `Verified` pill on the header line, with `ALL DOCUMENT REVIEWED` on its own unconstrained line to avoid awkward text wrapping.
      - **Card 2: HRMO QS Evaluation Result (Qualified / Excluded)**: Dedicated container displaying `[Check/Alert] HRMO QS Evaluation` and `Qualified` / `Excluded` pill on the header line, with qualification status and description clearly formatted below.
    - **Current Stage Header**:
      - Displays both `ALL DOCUMENT REVIEWED` badge and `qs_status` badge.
      - Live pulsing dot and stage title seamlessly adapt to the QS evaluation outcome.

### 2. High-Contrast Red Styling for `qs_status = excluded`
- When `qs_status` contains `EXCLUDED` (or `DISQUALIFIED` / `NOT QUALIFIED`):
  - **Color**: Rendered in high-contrast rose/red (`text-rose-700`, `bg-rose-600 text-white`, `border-rose-300`, `bg-rose-50/90`).
  - **Step 2 Card Styling**:
    - Outer card ring & border styled with `border-rose-400 ring-2 ring-rose-200`.
    - Stage icon transformed to rose alert badge (`bg-rose-600 text-white` with `<AlertCircle />`).
    - Top-right stage pill styled with `bg-rose-100 text-rose-800 border border-rose-300` displaying `Excluded`.
    - Evaluation result box and text styled in rose/red with clear guidance: *"Evaluation Result: Excluded from reclassification based on Division HRMO Qualification Standards (QS)."*
  - **Header & Badges**:
    - Current Stage title in bold red `text-rose-700`.
    - Stage badge styled in `bg-rose-700 text-white`.
    - QS status pill rendered in `bg-rose-600 text-white border-rose-700 shadow-sm` with `<AlertCircle />`.
    - Live indicator dot rendered in pulsating `bg-rose-500`.
- Complies strictly with Arthur's Senior Designer guidelines for accessibility (WCAG AA/AAA contrast), clear visual hierarchy, and an authoritative portal feel.

## [2026-10-20] Document Checklist Status Display & HRMO Review Click-Through Pipeline

### 1. Document Checklist Status Display (All Statuses Except Null)
- **Checklist Status Visualization in [`ReclassUploadModal.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/components/ReclassUploadModal.tsx)**:
  - Display all non-null statuses from `document_checklist` / `documents_checklist`:
    - `for_revision`: Prominent `Action Required: For Revision` badge with high-contrast rose ring and specialized `Re-upload` button.
    - `approved`: Emerald `Approved` badge with `<CheckCircle2 />`.
    - `verified`: Emerald `Verified` badge.
    - `under_review` / `for_review` / `pending`: Amber `Under Review` badge with `<Clock />`.
    - `submitted`: Sky `Submitted` badge with `<FileCheck />`.
    - Any other evaluator status: Rendered in uppercase pill badge.
  - When status is `null`, undefined, or not in checklist, cleanly falls back to upload states (`Uploaded`, `Selected (Pending Upload)`, `Pending Selection`, `Optional`).
  - Evaluator remarks and feedback are displayed with dedicated styled cards for both revision requests and general reviewer feedback.

### 2. "HRMO Review & Evaluation" Step 2 Revision Click-Through
- **Interactive Portal Step in [`ApplicantDashboard.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/pages/ApplicantDashboard.tsx)**:
  - When revisions are required (`isRevision`), clicking **"HRMO Review & Evaluation"** (either the card, the title, or the active stage header) directly opens the **"Reclassification Document Submission"** modal.
  - Added an explicit action button directly within the Step 2 revision card labeled **`Reclassification Document Submission`** with an upload icon.
  - Interactive cursor and hover feedback guide the user directly to the re-upload modal.

## [2026-10-20] Applicant Dashboard: Revision Upload Documents Pipeline (`reclass_gc.documents_checklist`)

### 1. Reclassification Revision Documents Display (`documents_checklist` / `document_checklist`)
- **Backend API Harmonization**:
  - In [`ApplicantsService.getReclassDetails`](file:///e:/christop/AGAP%20Portal/backend/src/applicants/applicants.service.ts#L2039), exposed both `document_checklist` (actual database JSONB column) and `documents_checklist` (aliased property) containing evaluator checklist items.
- **Strict Status Filtering for Re-upload**:
  - In [`ApplicantDashboard.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/pages/ApplicantDashboard.tsx#L68) and [`ReclassUploadModal.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/components/ReclassUploadModal.tsx#L87), strictly filters checklist items where `"status": "for_revision"`.
  - Non-revision, pending, or approved checklist items are no longer counted or flagged for re-upload, ensuring only documents explicitly marked `"for_revision"` trigger revision badges and re-upload highlights.
- **Streamlined UI & Red Message on "Upload Requirements" Button (Arthur Guidelines)**:
  - **Removed Bulky Revision Section**: Removed the `Action Required: Documents for Revision / Re-upload` section from the dashboard body to reduce cognitive load and keep the main view clean.
  - **Header Action Button Red Indicator**:
    - The **"Upload Requirements"** button now prominently features a red notification badge (`{count} For Revision`), a red focus ring, and a pulsating alert indicator whenever documents are flagged for revision.
    - Displays a subtle red status line under the button: `Documents need to be re-uploaded`.
    - Clicking the button directly opens the modal where each flagged requirement is highlighted with specific evaluator remarks and re-upload inputs.
  - **Cleaned Step 1 ("Updating of Documents") Card**:
    - Removed the "10 document(s) need revision" pill and the "Re-upload Flagged Docs (10)" button override from the Step 1 Stepper card.
    - Preserved standard progress, initial assessment, and `Upload Docs` / `Manage Docs` button in Step 1.
    - Centralized all revision action cues directly onto the primary **"Upload Requirements"** button in the header and within [`ReclassUploadModal.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/components/ReclassUploadModal.tsx).
  - **Modal Revision Highlighting**:
    - [`ReclassUploadModal.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/components/ReclassUploadModal.tsx) clearly highlights each flagged requirement with a rose ring, `Action Required: For Revision` badge, evaluator remarks quote, and specialized `Re-upload` button.

## [2026-10-20] Applicant Dashboard: Reclassification Stage & Status Mapping Pipeline

### 1. Reclassification Portal Status Rules & Database Mapping
- Implemented precise stage resolution and status rendering in [`ApplicantDashboard.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/pages/ApplicantDashboard.tsx) adhering to executive portal design:
  1. **Step 2 (SDO Division HRMO): HRMO Review & Evaluation**:
     - Triggered when `reclass_gc.documents_status = "DOCUMENTS SUBMITTED"` (or `reclass_gc.document_status`).
     - Displays `Step 2 of 5: HRMO Review & Evaluation` as the active stage, with in-progress review card indicator.
  2. **HRMO QS Status Display on Review Completion**:
     - When `reclass_gc.documents_status = "ALL DOCUMENT REVIEWED"` (or `reclass_gc.document_status`), the portal displays `reclass_gc.qs_status` (e.g., `QUALIFIED FOR RECLASSIFICATION` or `PENDING QS EVALUATION`).
     - Displayed in:
       - Current Stage header badge and title.
       - Stepper Card 2 with an authoritative, high-contrast portal badge (`HRMO QS Evaluation: Reviewed` with verification checkmark and qualification status).
  3. **Step 3 (DepEd Regional Office): Endorsed to RO (Final Eval)**:
     - Triggered when `reclass_gc.staging_of_reclassification = 'ENDORSED TO RO'` (or `reclass_gc.stage_of_reclassification`).
     - Displays `Step 3 of 5: Endorsed to RO (Final Eval)` as active stage.
  4. **Step 4 (DBM Regional Office): Endorsed to DBM RO**:
     - Triggered when `reclass_gc.staging_of_reclassification = 'ENDORSED TO DBM RO'` (or `reclass_gc.stage_of_reclassification`).
     - Displays `Step 4 of 5: Endorsed to DBM RO` as active stage.
  5. **Step 5 (Official Appointment): Appointment / Reclass Proper**:
     - Triggered when `reclass_gc.new_item_no IS NOT NULL` (and non-empty).
     - Displays `Step 5 of 5: Appointment / Reclass Proper` as completed/active stage.
     - Renders an executive plantilla item badge with `New Item No: <new_item_no>` and `NOSCA Serial: <nosca_serial_no>`.

### 2. Backend API Harmonization
- In [`ApplicantsService.getReclassDetails`](file:///e:/christop/AGAP%20Portal/backend/src/applicants/applicants.service.ts#L2005):
  - Preserves exact stage directly from `reclass_gc.stage_of_reclassification` without artificial overwrites.
  - Returns both standard and aliased properties (`document_status`/`documents_status`, `stage_of_reclassification`/`staging_of_reclassification`, `qs_status`, `new_item_no`) for reliable cross-compatibility.

## [2026-10-20] Strict Uppercase Input & Database Insertion Standardization for New Reclassification Application (Excluding DepEd Email)

### 1. Frontend Form Input Uppercase Enforcement
- **Real-Time Uppercase Transformation**:
  - In [`Login.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/pages/Login.tsx):
    - Text input and selection fields in the **New Reclassification Application** form transform values to `.toUpperCase()` directly in their `onChange` handlers:
      - `Plantilla Item Number`
      - `First Name`, `Middle Name`, `Last Name`
      - `Current Position`
      - `Region`, `Division`, `School / Station Name`
      - `Education / Degree`, `Eligibility / License`
    - Form inputs apply the Tailwind `uppercase` class for clean visual consistency.
    - Form placeholders updated to uppercase conventions (e.g., `JUAN`, `SANTOS`, `DELA CRUZ`).
    - **Excluded Fields**:
      - `Official DepEd Email`: Does not force uppercase, allows lowercase typing, and placeholder set to `name@deped.gov.ph`.
      - `Mobile Number`, `Passcode`, `Years of Experience`, `Hours of Relevant Training`: Retain standard numeric input handling.
      - `Password`, `Confirm Password`: Retain strict case-sensitivity for credential security.

### 2. Backend & Database Uppercase Guarantee with Lowercase Email
- **API Payload Normalization**:
  - In [`applicants.routes.ts`](file:///e:/christop/AGAP%20Portal/backend/src/applicants/applicants.routes.ts#L166):
    - `POST /reclass-register` converts candidate profile and plantilla fields to uppercase when `new_application: true`, while preserving standard lowercase formatting for the DepEd email address (`checkEmail`).
- **Database Insertion and Update Sanitization**:
  - In [`ApplicantsService.registerReclassAccount`](file:///e:/christop/AGAP%20Portal/backend/src/applicants/applicants.service.ts#L2261):
    - Sanitizes `cleanFirstName`, `cleanMiddleName`, `cleanLastName`, `designation`, `region`, `division`, `schoolName`, `education`, and `eligibility` to uppercase.
    - DepEd email (`cleanEmail`) is formatted to lowercase (`.toLowerCase()`).
    - Writes uppercase profile values and lowercase email to both `applicants` table (`first_name`, `middle_name`, `surname`, `email`, `email_address`, `current_designation`, `region`, `division`, `bachelor_degree`, `bachelors_degree`, `eligibility`) and `reclass_gc` table (`first_name`, `last_name`, `email`, `current_position`, `region`, `division`, `school_name`, `education`, `eligibility`).
    - Database trigger `trg_uppercase_reclass_gc` updated to format `NEW.email := LOWER(TRIM(NEW.email))` while enforcing uppercase for all other text fields.
    - Explicit SQL type casting (`$14::varchar`, `$14::text`) ensures complete type safety between `bachelor_degree` (varchar) and `bachelors_degree` (text).
- **Item Verification Pre-Fill Normalization**:
  - In [`ApplicantsService.verifyReclassItemNumber`](file:///e:/christop/AGAP%20Portal/backend/src/applicants/applicants.service.ts#L2088):
    - Pre-populated fields returned for New Reclassification Applications (`category: 'new'`) are normalized to `.toUpperCase()`.

## [2026-10-20] New Reclassification Application Verification via Vacant `reclass_gc` Slots

### 1. Updated Plantilla Validation for "New Reclassification Application"
- **Switched Source Table from `gmis_gc_items` to `reclass_gc`**:
  - In [`ApplicantsService.verifyReclassItemNumber`](file:///e:/christop/AGAP%20Portal/backend/src/applicants/applicants.service.ts#L2088) and [`ApplicantsService.registerReclassAccount`](file:///e:/christop/AGAP%20Portal/backend/src/applicants/applicants.service.ts#L2262), the validation for New Reclassification Applications (`category === 'new'`, `isNewApp === true`) now directly targets `reclass_gc`.
- **Vacant / Unassigned Slot Validation Rules**:
  - Requires the `Plantilla Item Number` (`item_no` or `new_item_no`) to exist in `reclass_gc` where:
    1. `first_name IS NULL OR TRIM(first_name) = ''`,
    2. `last_name IS NULL OR TRIM(last_name) = ''`, and
    3. `email IS NULL OR TRIM(email) = ''`.
  - If a matching vacant slot is found: verification passes (`status: 'valid'`), auto-populating position, region, and division while allowing the new applicant to enter their personal credentials and name.
  - If the item exists in `reclass_gc` but is already registered or assigned to personnel: returns `already_registered` (`409`).
  - If no record exists for that item: returns `not_found` (`404`, `"No records found"`).
- **Post-Registration State**:
  - Upon successful registration, the vacant record in `reclass_gc` is updated with applicant credentials and explicitly sets `new_application = TRUE`.

## [2026-10-19] Reclassification Registration Category Selection & Plantilla Verification Rules

### 1. Plantilla Item Number Verification & Registration Rules
- **Incumbent GMIS Plantilla Record** (*Existing Application*):
  - Verification & Registration strictly require the `Plantilla Item Number` to exist in **BOTH** `reclass_gc` **AND** `gmis_gc_items` (`psi_cd`):
    - Uses an `INNER JOIN` matching `gmis_gc_items.psi_cd` with `reclass_gc.item_no` or `reclass_gc.new_item_no`.
    - If the item has **NO records on `gmis_gc_items.psi_cd`** (e.g. test items like `GC-01`, `GC-02`, `GC-03`), or does not exist in `reclass_gc`: registration and verification return `404 not_found` (`"No records found."`). Registration cannot proceed.
    - If existing in both and not yet registered: returns status `valid` with pre-filled incumbent data (First Name, Last Name, Position, Region, Division, Station).
    - If already registered with credentials: returns status `already_registered` (409) prompting the user to sign in.
- **New Reclassification Application** (*New Application*):
  - Verification requires the `Plantilla Item Number` to exist in `gmis_gc_items` (`psi_cd`) where:
    1. `email IS NULL` (or empty string in both `gmis_gc_items` and `reclass_gc`), and
    2. `first_name IS NOT NULL` OR `last_name IS NOT NULL` (filled position / non-empty personnel name).
  - If matching: returns status `valid` with verified personnel details pre-populated (First Name, Last Name, Position, Region, Division).
  - If already registered: returns status `already_registered`.
  - If not matching (e.g. unfilled position with blank name, already assigned email, or not in GMIS): returns status `not_found` (`"No records found"`). Registration cannot proceed.

### 2. Frontend Inline Form Experience
- In [`Login.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/pages/Login.tsx):
  - Both **Incumbent GMIS Plantilla Record** and **New Reclassification Application** registration forms feature dedicated **Plantilla Item Number Verification** with a "Verify" button.
  - The "Register" button is disabled until the Plantilla Item Number has been verified (`disabled={!stepAVerified}` / `disabled={!newAppVerified}`).
  - Verification auto-populates candidate fields from GMIS records while locking against unregistered or unfilled item numbers.

### 3. Backend & Database Schema Support
- **Database Column**: Added `new_application BOOLEAN DEFAULT FALSE` to `reclass_gc` and `email VARCHAR(255)` to `gmis_gc_items` in [`database.ts`](file:///e:/christop/AGAP%20Portal/backend/src/database.ts), [`reclass_feature_migration.sql`](file:///e:/christop/AGAP%20Portal/backend/database/migrations/reclass_feature_migration.sql), and [`schema.prisma`](file:///e:/christop/AGAP%20Portal/backend/database/schema.prisma).
- **Backend Service & Route**:
  - In [`applicants.routes.ts`](file:///e:/christop/AGAP%20Portal/backend/src/applicants/applicants.routes.ts):
    - `POST /api/applicants/reclass-verify-item` accepts `{ item_number, category }` and dispatches to `verifyReclassItemNumber`.
    - `POST /api/applicants/reclass-register` enforces `item_number` validation.
  - In [`applicants.service.ts`](file:///e:/christop/AGAP%20Portal/backend/src/applicants/applicants.service.ts):
    - `verifyReclassItemNumber` enforces the strict dual existence `INNER JOIN` (`reclass_gc` AND `gmis_gc_items.psi_cd`) for `'existing'`, and the unassigned email + filled position criteria for `'new'`.
    - `registerReclassAccount` enforces the exact same `INNER JOIN` before registering incumbent applications, rejecting any attempt if no records exist on `gmis_gc_items.psi_cd`.
    - `verifyPlantillaItem` gates access inside applicant dashboard by strictly enforcing the dual existence `INNER JOIN`.

---

## [2026-10-19] Unlock Reclassification Portal Access

### 1. Reclassification Portal Login Availability
- **Removed Locked State on Portal Gateway**: In [`PublicCareers.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/pages/PublicCareers.tsx), unlocked the **Reclassification Portal** card in the "Select Login Portal" modal.
- **Restored Navigation Action**: Removed `disabled`, `cursor-not-allowed`, and `Locked` badges; reinstated the active interactive card leading to `/login?type=reclass&guide=true` with the "Login for Reclassification" action.

---

## [2026-10-03] Reclassification Salary Grade Mapping Updates (Hardcoded)

### 1. Position to Salary Grade Mapping
Updated the salary grade mappings across the reclassification module in frontend ([`ApplicantDashboard.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/pages/ApplicantDashboard.tsx)) and backend ([`applicants.service.ts`](file:///e:/christop/AGAP%20Portal/backend/src/applicants/applicants.service.ts)):
- **Schools Division Counselor**: Salary Grade 24 (`SG-24`)
- **School Counselor IV**: Salary Grade 22 (`SG-22`)
- **School Counselor III**: Salary Grade 20 (`SG-20`)
- **School Counselor II**: Salary Grade 18 (`SG-18`)
- **School Counselor I**: Salary Grade 16 (`SG-16`)
- **School Counselor Associate V**: Salary Grade 15 (`SG-15`)
- **School Counselor Associate IV**: Salary Grade 14 (`SG-14`)
- **School Counselor Associate III**: Salary Grade 13 (`SG-13`)
- **School Counselor Associate II**: Salary Grade 12 (`SG-12`)
- **School Counselor Associate I**: Salary Grade 11 (`SG-11`)

### 2. Real-Time Dynamic Target Reclass & Salary Grade Synchronization
- **Live Preview & Persistence**: In [`ApplicantDashboard.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/pages/ApplicantDashboard.tsx), the **Salary Grade** card automatically computes and updates in real-time based on the selected **Target Reclass** position (both while selecting in the dropdown and when saved).
- **Backend Response Synchronization**: `ApplicantsService.getReclassDetails` and `ApplicantsService.updateTargetPosition` in [`applicants.service.ts`](file:///e:/christop/AGAP%20Portal/backend/src/applicants/applicants.service.ts) immediately resolve and return the accurate salary grade matching the updated target position.

---

## [2026-09-29] Guidance Counselor (GC) Reclassification Module Implementation

### 1. Overview & Business Model
Implemented the complete 5-phase **GC Reclass thru AGAP** workflow using the **Two-Column, No Copying Architecture**:
- **Initial Assessment**: Uploaded by SDO HRMO via PAL template during Phase 1. Read-only and strictly immutable after upload.
- **Assessed New Position**: Filled by SDO HRMO during reassessment (Phase 3). Blank until reassessed. If different from Initial Assessment, requires a documented justification reason.
- **Effective Position**: Computed on-the-fly (`assessed_new_position || initial_assessment`). Never stored in the database, used strictly for comparison, transmittal counts, and display.

---

### 2. Database Schema (`database/gc_reclass_schema.sql`)
Executed schema migration into PostgreSQL:
1. `pal_uploads`: Per-division upload artifact tracking upload state, status (`active`, `finalized`, `reopened`), row count, submission status, and timestamps.
2. `pal_items`: The core two-column model containing `plantilla_item_number`, `incumbent_name`, `initial_assessment`, `assessed_new_position`, `registration_status`, `reassessment_override_reason`, `reclass_result`, `reclass_confirmed`, `appointment_eligible`.
3. `gc_accounts`: Dedicated GC incumbent accounts (`email`, `password_hash`, `plantilla_item_number`, `window_reopened`, `window_reopen_reason`), tied to a PAL item.
4. `gc_documents`: Document submissions (`document_name`, `file_url`, `status`: `under_review`, `approved`, `returned`, `hrmo_remarks`, `needs_recheck`).
5. `gc_document_history`: Full versioning history when approved documents are replaced.
6. `reclass_settings`: Global configuration table for `submission_deadline`, `deadline_extended_at`, `deadline_extended_by`.
7. `reclass_audit_log`: Tamper-evident audit trail for all admin and HRMO operations (corrections, unlinking, deadline adjustments, overrides).
8. `reclass_csv_results`: Stores Phase 5 RO/DBM result uploads.

---

### 3. Backend Architecture (`backend/src/reclass/`)
- **`reclass.service.ts`**: Encapsulates business logic across all 5 phases:
  - Phase 1: `uploadPal`, `validatePalRows`, `checkDivisionPalExists`, `getDivisionPal`.
  - Phase 2: `lookupPalItem`, `registerGc`, `loginGc`, `unlinkRegistration`.
  - Phase 3: `getDocuments`, `uploadDocument`, `reviewDocument`, `reassessItem`, `reopenGcWindow`.
  - Phase 4: `finalizePal`, `generateTransmittalSummary`, `exportPalCsv`, `reopenPal`.
  - Phase 5: `processReclassCsvResults`, `getEligibleItems`.
  - Admin & Global: `getAdminStats`, `getAdminPalItems`, `adminCorrectPalItem`, `adminResetPalUpload`, `getAuditLog`.
- **`reclass.routes.ts`**: Express router under `/api/reclass`:
  - Public / GC endpoints: `/pal/template`, `/gc/check-division`, `/gc/lookup`, `/gc/register`, `/gc/login`, `/gc/:gcId/documents`, `/gc/:gcId/status`, `/settings`.
  - HRMO endpoints: `/pal/upload`, `/pal/:division/items`, `/documents/:docId/review`, `/pal/item/:id/reassess`, `/pal/:division/finalize`, `/pal/:division/export-csv`, `/pal/:division/reclass-results`.
  - Admin endpoints: `/admin/stats`, `/admin/items`, `/admin/pal/:division/reset`, `/pal/item/:id` (corrections), `/gc/unlink`, `/settings/deadline`, `/settings/extend-deadline`, `/audit-log`.

---

### 4. Separation of Standalone Modules
- **Admin, HRMO & Standalone GC Dashboards**: Removed `AdminReclassDashboard.tsx`, `HrmoDashboard.tsx`, `GcDashboard.tsx`, `GcLogin.tsx`, and `GcRegister.tsx` from AGAP Portal as those management workflows are housed in separate modules/portals.
- **Backend Cleanup**: Removed unmounted standalone reclass/pal backend endpoints and dropped unnecessary startup DROP TABLE statements from `database.ts`.
- **Production Schema Alignment**: Standardized `reclass_applications` table schema to exactly mirror the production database columns (`id`, `reclass_gc_id`, `item_no`, `current_position`, `region`, `division`, `school_id`, `school_name`, `reclass_position`, `new_item_no`, `created_at`, `updated_at`) and indexes.
- **Integrated Applicant Experience**: Retained and maintained the streamlined applicant-side reclassification login with confirmation modal and document uploads in [`ApplicantDashboard.tsx`](file:///e:/christop/AGAP%20Portal/frontend/src/pages/ApplicantDashboard.tsx).

### 5. Reclassification Login Insert Prevention
- **Read-Only Reclassification Check on Login**: Updated `reclassLogin`, `getReclassDetails`, `login`, and `verifyPlantillaItem` in `ApplicantsService` to ensure no row is inserted into the `reclass_applications` table when an incumbent guidance counselor logs in or fetches their reclassification profile.
- **Graceful Null Handling**: Login and dashboard flows retrieve existing `reclass_applications` records if present, or fall back to authoritative `reclass_gc` incumbent data without performing auto-inserts.

### 6. Portal Display Isolation
- **Reclassification Gateway UI Isolation**: When users select **Reclassification Portal** from the "Select Login Portal" modal, the login interface is dedicated solely to Reclassification (`/login?type=reclass`). The **Jobseeker Portal** tab and "Switch to Jobseeker Portal" prompt are hidden, preventing cross-portal confusion for Guidance Counselors.

### 7. Reclassification Incumbent Classification Tabs
- **Dual Classification Tabs**: Added professional segmented tabs on the Reclassification Portal login page:
  - **Plantilla Incumbent** (Existing in `reclass_gc`): Allows incumbent counselors to log in using **strictly** their **Plantilla Item Number**. The Target Position and other personal details are omitted from the form and automatically resolved from DepEd `reclass_gc` records, then displayed in the Confirmation Modal.
  - **Non-Plantilla / Designate** (Teacher-Designate / Special Assignment / Non-Plantilla): Form provides fields for Full Name, Region, Division, Current Designation, and Target Position.
- **Backend & Route Integration**: Updated `ApplicantsService.reclassLogin` and `/api/applicants/reclass-login` endpoint to allow authentication by Plantilla Item Number directly without requiring manual input of full name, region, or division for existing incumbents.

### 8. Document Upload Trigger for Reclassification Applications & `reclass_documents` Schema Optimization
- **`reclass_documents` Schema Optimization & Column Cleanup**:
  - Removed obsolete and unnecessary legacy columns: `pal_record_id`, `reviewed_by`, `reviewed_at`, `doc_type`, `doc_title`, and `created_at`.
  - Standardized active columns: `id`, `applicant_id`, `reclass_application_id` (foreign key to `reclass_applications(id)`), `plantilla_item_number`, `document_type`, `document_title`, `file_name`, `file_url`, `file_size`, `mimetype`, `description`, `status`, `remarks`, `uploaded_at`, `updated_at`, and `is_test`.
  - Added indexes for performant querying: `idx_reclass_docs_applicant`, `idx_reclass_docs_app_id`, `idx_reclass_docs_plantilla`, and `idx_reclass_docs_type`.
- **Application Creation & Linking on Document Upload**:
  - Maintained read-only access on login (no data inserted on login).
  - When an applicant uploads a reclassification document (`uploadReclassDocument`), the system checks if a `reclass_applications` record exists. If not, it creates and inserts the application record via `ensureReclassificationApplication`, linking the incumbent's `reclass_gc_id`, plantilla item number, station, and target position.
  - Each uploaded document is saved into `reclass_documents` with the associated `reclass_application_id`, `plantilla_item_number`, and metadata.
- **Staged File Selection & Batch Upload on "Done / Close" Action**:
  - In `ReclassUploadModal.tsx`, file inputs stage chosen files locally without triggering premature uploads.
  - Clicking the **"Done / Close"** button submits all selected documents to the backend in sequence, inserts/updates `reclass_applications` and individual `reclass_documents` rows, and closes the modal upon completion with user feedback.

### 9. Reclassification GC Table (`reclass_gc`) Production Schema Alignment & Column Ordering
- **Exact Production Column Arrangement**:
  - Reordered table columns in `reclass_gc` to match the exact ordinal positions in the production database:
    1. `id` (INTEGER, PRIMARY KEY, SERIAL)
    2. `item_no` (VARCHAR(150))
    3. `current_position` (VARCHAR(255))
    4. `first_name` (VARCHAR(150))
    5. `last_name` (VARCHAR(150))
    6. `email` (VARCHAR(255))
    7. `region` (VARCHAR(255))
    8. `division` (VARCHAR(255))
    9. `school_id` (VARCHAR(50))
    10. `school_name` (VARCHAR(255))
    11. `qs_status` (VARCHAR(100))
    12. `stage_of_reclassification` (VARCHAR(100), DEFAULT 'For Review')
    13. `reclass_position` (VARCHAR(255))
    14. `new_item_no` (VARCHAR(150))
    15. `is_test` (BOOLEAN, DEFAULT FALSE)
    16. `reupload` (BOOLEAN, DEFAULT FALSE)
    17. `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())
    18. `updated_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())
  - Preserved all 5,619 incumbent records during the reordering migration.
  - Aligned table indexes: `idx_reclass_gc_item_no`, `idx_reclass_gc_region`, `idx_reclass_gc_division`, and `idx_reclass_gc_school_id`.
- **Backend Service Alignment**:
  - Updated all `reclass_gc` queries in `ApplicantsService` (`reclassLogin`, `verifyPlantillaItem`, `getReclassDetails`, `ensureReclassificationApplication`, and `getIncumbentInfoByPlantilla`) to reference the standardized production column names.
- **Azure Blob Storage Client Reliability**:
  - Ensured environment configuration is eagerly and dynamically loaded in `azureStorage.ts` to prevent missing connection string errors during document uploads.

### 10. Reclassification Document Azure Storage Folder Structure (`reclass-{reclass_gc.id}/{document_type}/`)
- **Folder Hierarchy Standardization**:
  - Main Directory: `reclass-{reclass_gc.id}` (resolved via `reclass_gc.id` associated with the plantilla item or application).
  - Subfolder per Document Category: `{document_type}` (e.g. `reclass_form`, `pds`, `service_records`, `academic_credentials`, `training_certs`, `performance_ratings`, `admin_support`).
  - File Naming: Stored with original filename and timestamp/random version token within its dedicated subfolder (e.g., `reclass-9/reclass_form/RFTP_Document_1790738919073_24842379.pdf`).

### 11. `reclass_documents` Table Column Cleanup
- **Dropped Redundant Columns**:
  - Dropped: `applicant_id`, `file_size`, `status`, `document_type`, `mimetype`, `description`.
  - Remaining Active Columns: `id`, `reclass_application_id` (foreign key to `reclass_applications`), `plantilla_item_number`, `document_title`, `file_name`, `file_url`, `remarks`, `uploaded_at`, `updated_at`, `is_test`.
- **Query Optimization**:
  - Queries for documents in `ApplicantsService` (`getReclassDocuments`, `uploadReclassDocument`) now link directly via `reclass_application_id` and `plantilla_item_number`, matching requirements by `document_title`.
  - Indexes configured: `idx_reclass_docs_app_id`, `idx_reclass_docs_plantilla`, `idx_reclass_docs_title`.

### 12. Dashboard UI Cleanup & Database Table Drop (`reclass_document_history`)
- **Dashboard UI Streamlining**: Removed the redundant "Reclassification Document Folder" card from the applicant dashboard. Document management remains accessible through the top action button.
- **Database Table Drop**: Dropped legacy `reclass_document_history` table in PostgreSQL staging database and ensured automatic cleanup in `database.ts`.

### 13. Reclassification Dashboard Information Grid Field Alignment
- **School Name Display**:
  - Position 1: `Plantilla Item No.`
  - Position 2: `School Name` (displays `school_name` from DepEd incumbent / application record).
  - Subsequent Fields: `Position Title`, `Target Position`, `Salary Grade`, `Division`, `Region`, `Evaluation Status`.
- **Backend Service & Route Updates**:
  - Updated `ApplicantsService.getReclassDetails` and `ApplicantsService.reclassLogin` to pass `school_name` and map `application_number` to `school_name`.

### 14. "Current Stage" Reclassification Process Stepper (`reclass_gc.qs_status`)
- **Multi-Step Process Visualization**:
  - Dynamically computes the active stage based on `reclass_gc.qs_status`:
    - **Step 1: For Review**: Initial verification by SDO Division HRMO.
    - **Step 2: Endorsed To RO**: Regional Office evaluation and transmittal processing.
    - **Step 3: Endorsed TO DBM RO**: Department of Budget and Management (DBM) Regional Office budget allocation & NOSCA issuance.
  - Highlights step states (`Completed` checkmark, `Active Stage` with pulsing indicator, or `Upcoming` queued status) with contextual descriptions and badges.

### 15. Jobseeker Direct Login Workflow
- **Bypassed Confirmation Modal**: When a regular Jobseeker logs in, credentials are verified and the session is directly initialized in `localStorage`, navigating straight to the Applicant Dashboard without displaying the "Confirm Account Details" modal.
- **Retained Reclassification Confirmation**: Incumbent counselors logging into the Reclassification Portal continue to review their DepEd plantilla credentials via the confirmation modal before proceeding.

### 16. Incumbent Re-upload Flag (`reclass_gc.reupload = true`)
- **Automatic Re-upload Flagging**: Whenever an incumbent or reclassification applicant uploads any credential document, the backend automatically updates the corresponding row in `reclass_gc` (`SET reupload = true, updated_at = NOW()`), notifying HRMO reviewers that new documents have been submitted.

### 18. PDF-Only Enforcement for Reclassification Document Uploads
- **Frontend Validation (`ReclassUploadModal.tsx`)**:
  - Configured file input `accept` attribute strictly to `.pdf,application/pdf` (removed image MIME types).
  - Added programmatic type validation in `handleFileSelect` rejecting any non-PDF files with a clear alert notice (`Swal.fire`).
  - Updated document selection guidance message to state PDF format requirement clearly.
- **Backend Validation (`applicants.routes.ts`)**:
  - Enforced file MIME type / extension validation on `POST /api/applicants/:id/reclass-documents`, responding with HTTP 400 if a non-PDF file is submitted.









