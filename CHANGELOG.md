# AGAP Portal — Changelog & Architecture Notes

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

### 15. Preserved Existing Functionality
- All existing Applicant, Vacancy, Address, and Auth routes were preserved untouched in accordance with `.agents/agents.md`.
- Experience and training display rules preserved (`0` outputs `'None Required'`).







