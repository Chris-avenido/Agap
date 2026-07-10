import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace.js";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    $connect(): runtime.Types.Utils.JsPromise<void>;
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    get activity_logs(): Prisma.activity_logsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get app_feedback(): Prisma.app_feedbackDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get audit_feedback_tasks(): Prisma.audit_feedback_tasksDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get authorization_codes(): Prisma.authorization_codesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get buildable_spaces(): Prisma.buildable_spacesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get chat_messages(): Prisma.chat_messagesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get chat_room_participants(): Prisma.chat_room_participantsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get chat_rooms(): Prisma.chat_roomsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get chatbot_knowledge(): Prisma.chatbot_knowledgeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get co_finance(): Prisma.co_financeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get command_center_user(): Prisma.command_center_userDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get engineer_create(): Prisma.engineer_createDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get engineer_create_updates(): Prisma.engineer_create_updatesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get engineer_documents(): Prisma.engineer_documentsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get engineer_form(): Prisma.engineer_formDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get engineer_form_outbox(): Prisma.engineer_form_outboxDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get engineer_form_updates(): Prisma.engineer_form_updatesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get engineer_image(): Prisma.engineer_imageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get engineer_mother_moa(): Prisma.engineer_mother_moaDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get engineer_projects_inventory(): Prisma.engineer_projects_inventoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get engineer_supplamental_moa(): Prisma.engineer_supplamental_moaDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get engineer_supplemental_moa(): Prisma.engineer_supplemental_moaDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get esf7_database(): Prisma.esf7_databaseDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get esf7_resubmission_request(): Prisma.esf7_resubmission_requestDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get esf7_scan_results(): Prisma.esf7_scan_resultsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get esf7_staging(): Prisma.esf7_stagingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get esf_link(): Prisma.esf_linkDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get facility_demolitions(): Prisma.facility_demolitionsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get facility_inventory(): Prisma.facility_inventoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get facility_repairs(): Prisma.facility_repairsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get facility_rooms(): Prisma.facility_roomsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get finance_projects(): Prisma.finance_projectsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get insighted_project_update(): Prisma.insighted_project_updateDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get knex_migrations(): Prisma.knex_migrationsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get knex_migrations_lock(): Prisma.knex_migrations_lockDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get lgu_image(): Prisma.lgu_imageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get lgu_projects(): Prisma.lgu_projectsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get masterlist_26_30(): Prisma.masterlist_26_30Delegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notable_achievements(): Prisma.notable_achievementsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notifications(): Prisma.notificationsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get pending_schools(): Prisma.pending_schoolsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get ph_buildings_demolition(): Prisma.ph_buildings_demolitionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get ph_buildings_inventory(): Prisma.ph_buildings_inventoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get ph_buildings_repairs(): Prisma.ph_buildings_repairsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get ph_ecart_batches(): Prisma.ph_ecart_batchesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get ph_migrations(): Prisma.ph_migrationsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get ph_school_buildable_spaces(): Prisma.ph_school_buildable_spacesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get ph_school_completion(): Prisma.ph_school_completionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get ph_schools(): Prisma.ph_schoolsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get ph_schools_validate(): Prisma.ph_schools_validateDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get ph_teachers_list(): Prisma.ph_teachers_listDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get project_documents(): Prisma.project_documentsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get realignments(): Prisma.realignmentsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get regional_engineer_documents(): Prisma.regional_engineer_documentsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get regional_engineer_form(): Prisma.regional_engineer_formDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get regional_engineer_form_updates(): Prisma.regional_engineer_form_updatesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get regional_engineer_image(): Prisma.regional_engineer_imageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get school_documents(): Prisma.school_documentsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get school_location_profiles(): Prisma.school_location_profilesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get school_ownership_docs(): Prisma.school_ownership_docsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get school_ownership_records(): Prisma.school_ownership_recordsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get schools_IERN(): Prisma.schools_IERNDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get schools_iern_archives(): Prisma.schools_iern_archivesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get settings(): Prisma.settingsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get siif_activities(): Prisma.siif_activitiesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get siif_allocations(): Prisma.siif_allocationsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get siif_expenses(): Prisma.siif_expensesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get siif_interventions(): Prisma.siif_interventionsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get siif_ro_coordination(): Prisma.siif_ro_coordinationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get siif_submissions(): Prisma.siif_submissionsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get siif_utilization(): Prisma.siif_utilizationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get stride_users(): Prisma.stride_usersDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get super_user(): Prisma.super_userDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get system_feedback(): Prisma.system_feedbackDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get system_settings(): Prisma.system_settingsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get teaching_personnel(): Prisma.teaching_personnelDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get third_level_official_masterlist(): Prisma.third_level_official_masterlistDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get third_level_officials_masterlist(): Prisma.third_level_officials_masterlistDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get third_level_officials_profiles(): Prisma.third_level_officials_profilesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get third_level_officials_profiling_application(): Prisma.third_level_officials_profiling_applicationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get third_level_officials_updates(): Prisma.third_level_officials_updatesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get ticket_announcements(): Prisma.ticket_announcementsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tranche_fund(): Prisma.tranche_fundDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get unified_binaries(): Prisma.unified_binariesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get unit1_school_identity(): Prisma.unit1_school_identityDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get unit2_school_learners(): Prisma.unit2_school_learnersDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get unit3_organized_classes(): Prisma.unit3_organized_classesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get unit4_learner_profile(): Prisma.unit4_learner_profileDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get unit5_shifting_modality(): Prisma.unit5_shifting_modalityDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get unit6_ecart_batches(): Prisma.unit6_ecart_batchesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get unit6_furniture_grades(): Prisma.unit6_furniture_gradesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get unit6_school_resources(): Prisma.unit6_school_resourcesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get unit7_buildings_demolition(): Prisma.unit7_buildings_demolitionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get unit7_buildings_inventory(): Prisma.unit7_buildings_inventoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get unit7_buildings_repairs(): Prisma.unit7_buildings_repairsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get unit7_facilities(): Prisma.unit7_facilitiesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get unit7_school_buildable_spaces(): Prisma.unit7_school_buildable_spacesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get unit8_location(): Prisma.unit8_locationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get unit9_safety(): Prisma.unit9_safetyDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get user_device_tokens(): Prisma.user_device_tokensDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get user_web_push_subscriptions(): Prisma.user_web_push_subscriptionsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get users(): Prisma.usersDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get variation_orders(): Prisma.variation_ordersDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get verification_codes(): Prisma.verification_codesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
