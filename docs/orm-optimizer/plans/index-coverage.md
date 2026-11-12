# Index coverage (database `AGAP_local`, read-only catalog queries)

Schema file: `not found` (0 tables, 0 declared indexes). Live: 124 indexes on 33 tables. Stats reset: never/unknown.
Largest tables (live rows): document_audit_logs=359499, application_history=107826, qual_evals=57344, agap_schools=45929, applicants=35513.

## Missing-index candidates (column used at a query site, no live index leads with it)

_No column usage was extracted from the scan (no Drizzle query builders or single-table raw SELECTs matched)._

## Foreign keys without a supporting index (live)

_none_

## Drift: declared in schema.ts but missing live

_none_

## Drift: live but not declared in schema.ts

_none_

## Unused indexes (idx_scan = 0, not unique/primary)

| table | index | columns | size | table rows |
|---|---|---|---|---|
| applicants | idx_applicants_email_lower | (expr) | 1.6 MB | 35513 |
| applicants | idx_applicants_plantilla | (expr) | 0.0 MB | 35513 |
| applications | idx_applications_job_cluster_id | job_cluster_id | 0.2 MB | 25664 |
| vacancies | idx_vacancies_job_cluster_id | job_cluster_id | 0.2 MB | 10011 |
| vacancies | idx_vacancies_position_id | position_id | 0.1 MB | 10011 |
| gmis_gc_items | idx_gmis_gc_items_division | division | 0.1 MB | 5621 |
| gmis_gc_items | idx_gmis_gc_items_initial_assessment | initial_assessment | 0.1 MB | 5621 |
| gmis_gc_items | idx_gmis_gc_items_is_test | is_test | 0.1 MB | 5621 |
| gmis_gc_items | idx_gmis_gc_items_org_cod | org_cod | 0.2 MB | 5621 |
| gmis_gc_items | idx_gmis_gc_items_reclass_gc_id | reclass_gc_id | 0.1 MB | 5621 |
| gmis_gc_items | idx_gmis_gc_items_region | region | 0.1 MB | 5621 |
| reclass_gc | idx_reclass_gc_assessment_readiness | assessment_readiness | 0.1 MB | 1187 |
| reclass_gc | idx_reclass_gc_desired_position | desired_position | 0.1 MB | 1187 |
| reclass_gc | idx_reclass_gc_division | division | 0.1 MB | 1187 |
| reclass_gc | idx_reclass_gc_document_status | document_status | 0.1 MB | 1187 |
| reclass_gc | idx_reclass_gc_education | education | 0.1 MB | 1187 |
| reclass_gc | idx_reclass_gc_eligibility | eligibility | 0.1 MB | 1187 |
| reclass_gc | idx_reclass_gc_email | email | 0.1 MB | 1187 |
| reclass_gc | idx_reclass_gc_new_application | new_application | 0.1 MB | 1187 |
| reclass_gc | idx_reclass_gc_qs_eval_result | qs_eval_result | 0.1 MB | 1187 |
| reclass_gc | idx_reclass_gc_salary_grade | salary_grade | 0.1 MB | 1187 |
| reclass_gc | idx_reclass_gc_school_id | school_id | 0.1 MB | 1187 |
| reclass_gc | idx_reclass_gc_gmis_id | gmis_id | 0.0 MB | 1187 |
| reclass_gc | idx_reclass_gc_update_app | update_application | 0.0 MB | 1187 |
| reclass_gc | idx_reclass_gc_is_registered | is_registered | 0.0 MB | 1187 |
| users | idx_users_email | (expr) | 0.1 MB | 674 |
| messages | idx_messages_conversation_created | conversation_id, created_at | 0.0 MB | 479 |
| messages | idx_messages_author_admin_id | author_admin_id | 0.0 MB | 479 |
| job_clusters | idx_job_clusters_position_id | position_id | 0.0 MB | 229 |
| conversations | idx_conversations_admin_sort | status, assigned_to, last_message_at | 0.0 MB | 145 |
| conversations | idx_conversations_assigned_to | assigned_to | 0.0 MB | 145 |
| conversations | idx_conversations_last_message_at | last_message_at | 0.0 MB | 145 |
| conversations | idx_conversations_unassigned | last_message_at | 0.0 MB | 145 |
| conversations | idx_conversations_user | user_id | 0.0 MB | 145 |
| reclass_documents | idx_reclass_docs_app_id | reclass_application_id | 0.0 MB | 80 |
| reclass_documents | idx_reclass_docs_title | document_title | 0.0 MB | 80 |
| reclass_documents | idx_reclass_documents_item_no | plantilla_item_number | 0.0 MB | 80 |
| agap_invited | idx_agap_invited_item_no | item_no | 0.0 MB | 40 |
| agap_invited | idx_agap_invited_vacancy_id | vacancy_id | 0.0 MB | 40 |
| agap_invited | idx_agap_invited_job_cluster_id | job_cluster_id | 0.0 MB | 40 |
| car_results | idx_car_results_batch_id | batch_id | 0.0 MB | 40 |
| shared_applications | idx_shared_applications_new_div | new_division | 0.0 MB | 25 |
| shared_applications | idx_shared_applications_vac_id | vacancy_id | 0.0 MB | 25 |
| teacher_items | idx_teacher_items_division | division | 0.0 MB | 14 |
| teacher_items | idx_teacher_items_is_filled | is_filled | 0.0 MB | 14 |
| car_upload_batches | idx_car_upload_batches_uploader_id | uploader_id | 0.0 MB | 13 |
| collaborators | idx_collaborators_email | email | 0.0 MB | 10 |
| collaborators | idx_collaborators_host_hrmo | host_hrmo_id | 0.0 MB | 10 |
| admins | idx_admins_email | (expr) | 0.0 MB | 4 |
| teacher_appointments | idx_teacher_appointments_code | applicant_code | 0.0 MB | 4 |
| teacher_appointments | idx_teacher_appointments_appointed_by | appointed_by | 0.0 MB | 4 |
| teacher_appointments | idx_teacher_appointments_batch_id | batch_id | 0.0 MB | 4 |
| teacher_appointments | idx_teacher_appointments_car_result_id | car_result_id | 0.0 MB | 4 |
| reclass_item_no | idx_reclass_item_no_division | division | 0.0 MB | 3 |
| reclass_item_no | idx_reclass_item_no_gc_id | reclass_gc_id | 0.0 MB | 3 |
| reclass_item_no | idx_reclass_item_no_school_id | school_id | 0.0 MB | 3 |
| reclass_item_no | idx_reclass_item_no_status | new_item_no_status | 0.0 MB | 3 |
| reclassification_nosca_documents | idx_nosca_docs_serial | serial_no | 0.0 MB | 1 |
| incumbent_guidance_counselors | idx_incumbent_division | division | 0.0 MB | 0 |
| incumbent_guidance_counselors | idx_incumbent_emp_id | employee_id | 0.0 MB | 0 |
| incumbent_guidance_counselors | idx_incumbent_item_no | plantilla_item_number | 0.0 MB | 0 |
| incumbent_guidance_counselors | idx_incumbent_new_item_no | new_item_number | 0.0 MB | 0 |
| incumbent_guidance_counselors | idx_incumbent_nosca_serial | nosca_serial_no | 0.0 MB | 0 |
| incumbent_guidance_counselors | idx_incumbent_reclass_pos | reclass_position | 0.0 MB | 0 |
| incumbent_guidance_counselors | idx_incumbent_region | region | 0.0 MB | 0 |
| incumbent_guidance_counselors | idx_incumbent_stage | stage_of_reclassification | 0.0 MB | 0 |
| reclass_sg | idx_reclass_sg_salary_grade | salary_grade | 0.0 MB | 0 |

## Duplicate or redundant indexes

_none_

## Tables with high sequential scan counts (>= 100 scans and >= 10000 rows)

_none_

_Counts are cumulative since the stats reset and reflect whatever workload ran on this local DB, not production traffic. Confirm any suspect with `explain-query.mjs` before reporting it as Verified._
