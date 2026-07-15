import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly activity_logs: "activity_logs";
    readonly app_feedback: "app_feedback";
    readonly audit_feedback_tasks: "audit_feedback_tasks";
    readonly authorization_codes: "authorization_codes";
    readonly buildable_spaces: "buildable_spaces";
    readonly chat_messages: "chat_messages";
    readonly chat_room_participants: "chat_room_participants";
    readonly chat_rooms: "chat_rooms";
    readonly chatbot_knowledge: "chatbot_knowledge";
    readonly co_finance: "co_finance";
    readonly command_center_user: "command_center_user";
    readonly engineer_create: "engineer_create";
    readonly engineer_create_updates: "engineer_create_updates";
    readonly engineer_documents: "engineer_documents";
    readonly engineer_form: "engineer_form";
    readonly engineer_form_outbox: "engineer_form_outbox";
    readonly engineer_form_updates: "engineer_form_updates";
    readonly engineer_image: "engineer_image";
    readonly engineer_mother_moa: "engineer_mother_moa";
    readonly engineer_projects_inventory: "engineer_projects_inventory";
    readonly engineer_supplamental_moa: "engineer_supplamental_moa";
    readonly engineer_supplemental_moa: "engineer_supplemental_moa";
    readonly esf7_database: "esf7_database";
    readonly esf7_resubmission_request: "esf7_resubmission_request";
    readonly esf7_scan_results: "esf7_scan_results";
    readonly esf7_staging: "esf7_staging";
    readonly esf_link: "esf_link";
    readonly facility_demolitions: "facility_demolitions";
    readonly facility_inventory: "facility_inventory";
    readonly facility_repairs: "facility_repairs";
    readonly facility_rooms: "facility_rooms";
    readonly finance_projects: "finance_projects";
    readonly insighted_project_update: "insighted_project_update";
    readonly knex_migrations: "knex_migrations";
    readonly knex_migrations_lock: "knex_migrations_lock";
    readonly lgu_image: "lgu_image";
    readonly lgu_projects: "lgu_projects";
    readonly masterlist_26_30: "masterlist_26_30";
    readonly notable_achievements: "notable_achievements";
    readonly notifications: "notifications";
    readonly pending_schools: "pending_schools";
    readonly ph_buildings_demolition: "ph_buildings_demolition";
    readonly ph_buildings_inventory: "ph_buildings_inventory";
    readonly ph_buildings_repairs: "ph_buildings_repairs";
    readonly ph_ecart_batches: "ph_ecart_batches";
    readonly ph_migrations: "ph_migrations";
    readonly ph_school_buildable_spaces: "ph_school_buildable_spaces";
    readonly ph_school_completion: "ph_school_completion";
    readonly ph_schools: "ph_schools";
    readonly ph_schools_validate: "ph_schools_validate";
    readonly ph_teachers_list: "ph_teachers_list";
    readonly project_documents: "project_documents";
    readonly realignments: "realignments";
    readonly regional_engineer_documents: "regional_engineer_documents";
    readonly regional_engineer_form: "regional_engineer_form";
    readonly regional_engineer_form_updates: "regional_engineer_form_updates";
    readonly regional_engineer_image: "regional_engineer_image";
    readonly school_documents: "school_documents";
    readonly school_location_profiles: "school_location_profiles";
    readonly school_ownership_docs: "school_ownership_docs";
    readonly school_ownership_records: "school_ownership_records";
    readonly schools_IERN: "schools_IERN";
    readonly schools_iern_archives: "schools_iern_archives";
    readonly settings: "settings";
    readonly siif_activities: "siif_activities";
    readonly siif_allocations: "siif_allocations";
    readonly siif_expenses: "siif_expenses";
    readonly siif_interventions: "siif_interventions";
    readonly siif_ro_coordination: "siif_ro_coordination";
    readonly siif_submissions: "siif_submissions";
    readonly siif_utilization: "siif_utilization";
    readonly stride_users: "stride_users";
    readonly super_user: "super_user";
    readonly system_feedback: "system_feedback";
    readonly system_settings: "system_settings";
    readonly teaching_personnel: "teaching_personnel";
    readonly third_level_official_masterlist: "third_level_official_masterlist";
    readonly third_level_officials_masterlist: "third_level_officials_masterlist";
    readonly third_level_officials_profiles: "third_level_officials_profiles";
    readonly third_level_officials_profiling_application: "third_level_officials_profiling_application";
    readonly third_level_officials_updates: "third_level_officials_updates";
    readonly ticket_announcements: "ticket_announcements";
    readonly tranche_fund: "tranche_fund";
    readonly unified_binaries: "unified_binaries";
    readonly unit1_school_identity: "unit1_school_identity";
    readonly unit2_school_learners: "unit2_school_learners";
    readonly unit3_organized_classes: "unit3_organized_classes";
    readonly unit4_learner_profile: "unit4_learner_profile";
    readonly unit5_shifting_modality: "unit5_shifting_modality";
    readonly unit6_ecart_batches: "unit6_ecart_batches";
    readonly unit6_furniture_grades: "unit6_furniture_grades";
    readonly unit6_school_resources: "unit6_school_resources";
    readonly unit7_buildings_demolition: "unit7_buildings_demolition";
    readonly unit7_buildings_inventory: "unit7_buildings_inventory";
    readonly unit7_buildings_repairs: "unit7_buildings_repairs";
    readonly unit7_facilities: "unit7_facilities";
    readonly unit7_school_buildable_spaces: "unit7_school_buildable_spaces";
    readonly unit8_location: "unit8_location";
    readonly unit9_safety: "unit9_safety";
    readonly user_device_tokens: "user_device_tokens";
    readonly user_web_push_subscriptions: "user_web_push_subscriptions";
    readonly users: "users";
    readonly variation_orders: "variation_orders";
    readonly verification_codes: "verification_codes";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "activity_logs" | "app_feedback" | "audit_feedback_tasks" | "authorization_codes" | "buildable_spaces" | "chat_messages" | "chat_room_participants" | "chat_rooms" | "chatbot_knowledge" | "co_finance" | "command_center_user" | "engineer_create" | "engineer_create_updates" | "engineer_documents" | "engineer_form" | "engineer_form_outbox" | "engineer_form_updates" | "engineer_image" | "engineer_mother_moa" | "engineer_projects_inventory" | "engineer_supplamental_moa" | "engineer_supplemental_moa" | "esf7_database" | "esf7_resubmission_request" | "esf7_scan_results" | "esf7_staging" | "esf_link" | "facility_demolitions" | "facility_inventory" | "facility_repairs" | "facility_rooms" | "finance_projects" | "insighted_project_update" | "knex_migrations" | "knex_migrations_lock" | "lgu_image" | "lgu_projects" | "masterlist_26_30" | "notable_achievements" | "notifications" | "pending_schools" | "ph_buildings_demolition" | "ph_buildings_inventory" | "ph_buildings_repairs" | "ph_ecart_batches" | "ph_migrations" | "ph_school_buildable_spaces" | "ph_school_completion" | "ph_schools" | "ph_schools_validate" | "ph_teachers_list" | "project_documents" | "realignments" | "regional_engineer_documents" | "regional_engineer_form" | "regional_engineer_form_updates" | "regional_engineer_image" | "school_documents" | "school_location_profiles" | "school_ownership_docs" | "school_ownership_records" | "schools_IERN" | "schools_iern_archives" | "settings" | "siif_activities" | "siif_allocations" | "siif_expenses" | "siif_interventions" | "siif_ro_coordination" | "siif_submissions" | "siif_utilization" | "stride_users" | "super_user" | "system_feedback" | "system_settings" | "teaching_personnel" | "third_level_official_masterlist" | "third_level_officials_masterlist" | "third_level_officials_profiles" | "third_level_officials_profiling_application" | "third_level_officials_updates" | "ticket_announcements" | "tranche_fund" | "unified_binaries" | "unit1_school_identity" | "unit2_school_learners" | "unit3_organized_classes" | "unit4_learner_profile" | "unit5_shifting_modality" | "unit6_ecart_batches" | "unit6_furniture_grades" | "unit6_school_resources" | "unit7_buildings_demolition" | "unit7_buildings_inventory" | "unit7_buildings_repairs" | "unit7_facilities" | "unit7_school_buildable_spaces" | "unit8_location" | "unit9_safety" | "user_device_tokens" | "user_web_push_subscriptions" | "users" | "variation_orders" | "verification_codes";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        activity_logs: {
            payload: Prisma.$activity_logsPayload<ExtArgs>;
            fields: Prisma.activity_logsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.activity_logsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$activity_logsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.activity_logsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$activity_logsPayload>;
                };
                findFirst: {
                    args: Prisma.activity_logsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$activity_logsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.activity_logsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$activity_logsPayload>;
                };
                findMany: {
                    args: Prisma.activity_logsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$activity_logsPayload>[];
                };
                create: {
                    args: Prisma.activity_logsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$activity_logsPayload>;
                };
                createMany: {
                    args: Prisma.activity_logsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.activity_logsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$activity_logsPayload>[];
                };
                delete: {
                    args: Prisma.activity_logsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$activity_logsPayload>;
                };
                update: {
                    args: Prisma.activity_logsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$activity_logsPayload>;
                };
                deleteMany: {
                    args: Prisma.activity_logsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.activity_logsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.activity_logsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$activity_logsPayload>[];
                };
                upsert: {
                    args: Prisma.activity_logsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$activity_logsPayload>;
                };
                aggregate: {
                    args: Prisma.Activity_logsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateActivity_logs>;
                };
                groupBy: {
                    args: Prisma.activity_logsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Activity_logsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.activity_logsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Activity_logsCountAggregateOutputType> | number;
                };
            };
        };
        app_feedback: {
            payload: Prisma.$app_feedbackPayload<ExtArgs>;
            fields: Prisma.app_feedbackFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.app_feedbackFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$app_feedbackPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.app_feedbackFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$app_feedbackPayload>;
                };
                findFirst: {
                    args: Prisma.app_feedbackFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$app_feedbackPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.app_feedbackFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$app_feedbackPayload>;
                };
                findMany: {
                    args: Prisma.app_feedbackFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$app_feedbackPayload>[];
                };
                create: {
                    args: Prisma.app_feedbackCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$app_feedbackPayload>;
                };
                createMany: {
                    args: Prisma.app_feedbackCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.app_feedbackCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$app_feedbackPayload>[];
                };
                delete: {
                    args: Prisma.app_feedbackDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$app_feedbackPayload>;
                };
                update: {
                    args: Prisma.app_feedbackUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$app_feedbackPayload>;
                };
                deleteMany: {
                    args: Prisma.app_feedbackDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.app_feedbackUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.app_feedbackUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$app_feedbackPayload>[];
                };
                upsert: {
                    args: Prisma.app_feedbackUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$app_feedbackPayload>;
                };
                aggregate: {
                    args: Prisma.App_feedbackAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateApp_feedback>;
                };
                groupBy: {
                    args: Prisma.app_feedbackGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.App_feedbackGroupByOutputType>[];
                };
                count: {
                    args: Prisma.app_feedbackCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.App_feedbackCountAggregateOutputType> | number;
                };
            };
        };
        audit_feedback_tasks: {
            payload: Prisma.$audit_feedback_tasksPayload<ExtArgs>;
            fields: Prisma.audit_feedback_tasksFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.audit_feedback_tasksFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$audit_feedback_tasksPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.audit_feedback_tasksFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$audit_feedback_tasksPayload>;
                };
                findFirst: {
                    args: Prisma.audit_feedback_tasksFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$audit_feedback_tasksPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.audit_feedback_tasksFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$audit_feedback_tasksPayload>;
                };
                findMany: {
                    args: Prisma.audit_feedback_tasksFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$audit_feedback_tasksPayload>[];
                };
                create: {
                    args: Prisma.audit_feedback_tasksCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$audit_feedback_tasksPayload>;
                };
                createMany: {
                    args: Prisma.audit_feedback_tasksCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.audit_feedback_tasksCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$audit_feedback_tasksPayload>[];
                };
                delete: {
                    args: Prisma.audit_feedback_tasksDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$audit_feedback_tasksPayload>;
                };
                update: {
                    args: Prisma.audit_feedback_tasksUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$audit_feedback_tasksPayload>;
                };
                deleteMany: {
                    args: Prisma.audit_feedback_tasksDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.audit_feedback_tasksUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.audit_feedback_tasksUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$audit_feedback_tasksPayload>[];
                };
                upsert: {
                    args: Prisma.audit_feedback_tasksUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$audit_feedback_tasksPayload>;
                };
                aggregate: {
                    args: Prisma.Audit_feedback_tasksAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAudit_feedback_tasks>;
                };
                groupBy: {
                    args: Prisma.audit_feedback_tasksGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Audit_feedback_tasksGroupByOutputType>[];
                };
                count: {
                    args: Prisma.audit_feedback_tasksCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Audit_feedback_tasksCountAggregateOutputType> | number;
                };
            };
        };
        authorization_codes: {
            payload: Prisma.$authorization_codesPayload<ExtArgs>;
            fields: Prisma.authorization_codesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.authorization_codesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$authorization_codesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.authorization_codesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$authorization_codesPayload>;
                };
                findFirst: {
                    args: Prisma.authorization_codesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$authorization_codesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.authorization_codesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$authorization_codesPayload>;
                };
                findMany: {
                    args: Prisma.authorization_codesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$authorization_codesPayload>[];
                };
                create: {
                    args: Prisma.authorization_codesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$authorization_codesPayload>;
                };
                createMany: {
                    args: Prisma.authorization_codesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.authorization_codesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$authorization_codesPayload>[];
                };
                delete: {
                    args: Prisma.authorization_codesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$authorization_codesPayload>;
                };
                update: {
                    args: Prisma.authorization_codesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$authorization_codesPayload>;
                };
                deleteMany: {
                    args: Prisma.authorization_codesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.authorization_codesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.authorization_codesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$authorization_codesPayload>[];
                };
                upsert: {
                    args: Prisma.authorization_codesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$authorization_codesPayload>;
                };
                aggregate: {
                    args: Prisma.Authorization_codesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAuthorization_codes>;
                };
                groupBy: {
                    args: Prisma.authorization_codesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Authorization_codesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.authorization_codesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Authorization_codesCountAggregateOutputType> | number;
                };
            };
        };
        buildable_spaces: {
            payload: Prisma.$buildable_spacesPayload<ExtArgs>;
            fields: Prisma.buildable_spacesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.buildable_spacesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$buildable_spacesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.buildable_spacesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$buildable_spacesPayload>;
                };
                findFirst: {
                    args: Prisma.buildable_spacesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$buildable_spacesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.buildable_spacesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$buildable_spacesPayload>;
                };
                findMany: {
                    args: Prisma.buildable_spacesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$buildable_spacesPayload>[];
                };
                create: {
                    args: Prisma.buildable_spacesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$buildable_spacesPayload>;
                };
                createMany: {
                    args: Prisma.buildable_spacesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.buildable_spacesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$buildable_spacesPayload>[];
                };
                delete: {
                    args: Prisma.buildable_spacesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$buildable_spacesPayload>;
                };
                update: {
                    args: Prisma.buildable_spacesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$buildable_spacesPayload>;
                };
                deleteMany: {
                    args: Prisma.buildable_spacesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.buildable_spacesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.buildable_spacesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$buildable_spacesPayload>[];
                };
                upsert: {
                    args: Prisma.buildable_spacesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$buildable_spacesPayload>;
                };
                aggregate: {
                    args: Prisma.Buildable_spacesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBuildable_spaces>;
                };
                groupBy: {
                    args: Prisma.buildable_spacesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Buildable_spacesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.buildable_spacesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Buildable_spacesCountAggregateOutputType> | number;
                };
            };
        };
        chat_messages: {
            payload: Prisma.$chat_messagesPayload<ExtArgs>;
            fields: Prisma.chat_messagesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.chat_messagesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_messagesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.chat_messagesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_messagesPayload>;
                };
                findFirst: {
                    args: Prisma.chat_messagesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_messagesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.chat_messagesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_messagesPayload>;
                };
                findMany: {
                    args: Prisma.chat_messagesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_messagesPayload>[];
                };
                create: {
                    args: Prisma.chat_messagesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_messagesPayload>;
                };
                createMany: {
                    args: Prisma.chat_messagesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.chat_messagesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_messagesPayload>[];
                };
                delete: {
                    args: Prisma.chat_messagesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_messagesPayload>;
                };
                update: {
                    args: Prisma.chat_messagesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_messagesPayload>;
                };
                deleteMany: {
                    args: Prisma.chat_messagesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.chat_messagesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.chat_messagesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_messagesPayload>[];
                };
                upsert: {
                    args: Prisma.chat_messagesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_messagesPayload>;
                };
                aggregate: {
                    args: Prisma.Chat_messagesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateChat_messages>;
                };
                groupBy: {
                    args: Prisma.chat_messagesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Chat_messagesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.chat_messagesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Chat_messagesCountAggregateOutputType> | number;
                };
            };
        };
        chat_room_participants: {
            payload: Prisma.$chat_room_participantsPayload<ExtArgs>;
            fields: Prisma.chat_room_participantsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.chat_room_participantsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_room_participantsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.chat_room_participantsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_room_participantsPayload>;
                };
                findFirst: {
                    args: Prisma.chat_room_participantsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_room_participantsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.chat_room_participantsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_room_participantsPayload>;
                };
                findMany: {
                    args: Prisma.chat_room_participantsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_room_participantsPayload>[];
                };
                create: {
                    args: Prisma.chat_room_participantsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_room_participantsPayload>;
                };
                createMany: {
                    args: Prisma.chat_room_participantsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.chat_room_participantsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_room_participantsPayload>[];
                };
                delete: {
                    args: Prisma.chat_room_participantsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_room_participantsPayload>;
                };
                update: {
                    args: Prisma.chat_room_participantsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_room_participantsPayload>;
                };
                deleteMany: {
                    args: Prisma.chat_room_participantsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.chat_room_participantsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.chat_room_participantsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_room_participantsPayload>[];
                };
                upsert: {
                    args: Prisma.chat_room_participantsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_room_participantsPayload>;
                };
                aggregate: {
                    args: Prisma.Chat_room_participantsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateChat_room_participants>;
                };
                groupBy: {
                    args: Prisma.chat_room_participantsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Chat_room_participantsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.chat_room_participantsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Chat_room_participantsCountAggregateOutputType> | number;
                };
            };
        };
        chat_rooms: {
            payload: Prisma.$chat_roomsPayload<ExtArgs>;
            fields: Prisma.chat_roomsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.chat_roomsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_roomsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.chat_roomsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_roomsPayload>;
                };
                findFirst: {
                    args: Prisma.chat_roomsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_roomsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.chat_roomsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_roomsPayload>;
                };
                findMany: {
                    args: Prisma.chat_roomsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_roomsPayload>[];
                };
                create: {
                    args: Prisma.chat_roomsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_roomsPayload>;
                };
                createMany: {
                    args: Prisma.chat_roomsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.chat_roomsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_roomsPayload>[];
                };
                delete: {
                    args: Prisma.chat_roomsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_roomsPayload>;
                };
                update: {
                    args: Prisma.chat_roomsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_roomsPayload>;
                };
                deleteMany: {
                    args: Prisma.chat_roomsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.chat_roomsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.chat_roomsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_roomsPayload>[];
                };
                upsert: {
                    args: Prisma.chat_roomsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chat_roomsPayload>;
                };
                aggregate: {
                    args: Prisma.Chat_roomsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateChat_rooms>;
                };
                groupBy: {
                    args: Prisma.chat_roomsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Chat_roomsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.chat_roomsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Chat_roomsCountAggregateOutputType> | number;
                };
            };
        };
        chatbot_knowledge: {
            payload: Prisma.$chatbot_knowledgePayload<ExtArgs>;
            fields: Prisma.chatbot_knowledgeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.chatbot_knowledgeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chatbot_knowledgePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.chatbot_knowledgeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chatbot_knowledgePayload>;
                };
                findFirst: {
                    args: Prisma.chatbot_knowledgeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chatbot_knowledgePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.chatbot_knowledgeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chatbot_knowledgePayload>;
                };
                findMany: {
                    args: Prisma.chatbot_knowledgeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chatbot_knowledgePayload>[];
                };
                create: {
                    args: Prisma.chatbot_knowledgeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chatbot_knowledgePayload>;
                };
                createMany: {
                    args: Prisma.chatbot_knowledgeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.chatbot_knowledgeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chatbot_knowledgePayload>[];
                };
                delete: {
                    args: Prisma.chatbot_knowledgeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chatbot_knowledgePayload>;
                };
                update: {
                    args: Prisma.chatbot_knowledgeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chatbot_knowledgePayload>;
                };
                deleteMany: {
                    args: Prisma.chatbot_knowledgeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.chatbot_knowledgeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.chatbot_knowledgeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chatbot_knowledgePayload>[];
                };
                upsert: {
                    args: Prisma.chatbot_knowledgeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$chatbot_knowledgePayload>;
                };
                aggregate: {
                    args: Prisma.Chatbot_knowledgeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateChatbot_knowledge>;
                };
                groupBy: {
                    args: Prisma.chatbot_knowledgeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Chatbot_knowledgeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.chatbot_knowledgeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Chatbot_knowledgeCountAggregateOutputType> | number;
                };
            };
        };
        co_finance: {
            payload: Prisma.$co_financePayload<ExtArgs>;
            fields: Prisma.co_financeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.co_financeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$co_financePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.co_financeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$co_financePayload>;
                };
                findFirst: {
                    args: Prisma.co_financeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$co_financePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.co_financeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$co_financePayload>;
                };
                findMany: {
                    args: Prisma.co_financeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$co_financePayload>[];
                };
                create: {
                    args: Prisma.co_financeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$co_financePayload>;
                };
                createMany: {
                    args: Prisma.co_financeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.co_financeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$co_financePayload>[];
                };
                delete: {
                    args: Prisma.co_financeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$co_financePayload>;
                };
                update: {
                    args: Prisma.co_financeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$co_financePayload>;
                };
                deleteMany: {
                    args: Prisma.co_financeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.co_financeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.co_financeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$co_financePayload>[];
                };
                upsert: {
                    args: Prisma.co_financeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$co_financePayload>;
                };
                aggregate: {
                    args: Prisma.Co_financeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCo_finance>;
                };
                groupBy: {
                    args: Prisma.co_financeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Co_financeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.co_financeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Co_financeCountAggregateOutputType> | number;
                };
            };
        };
        command_center_user: {
            payload: Prisma.$command_center_userPayload<ExtArgs>;
            fields: Prisma.command_center_userFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.command_center_userFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$command_center_userPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.command_center_userFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$command_center_userPayload>;
                };
                findFirst: {
                    args: Prisma.command_center_userFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$command_center_userPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.command_center_userFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$command_center_userPayload>;
                };
                findMany: {
                    args: Prisma.command_center_userFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$command_center_userPayload>[];
                };
                create: {
                    args: Prisma.command_center_userCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$command_center_userPayload>;
                };
                createMany: {
                    args: Prisma.command_center_userCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.command_center_userCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$command_center_userPayload>[];
                };
                delete: {
                    args: Prisma.command_center_userDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$command_center_userPayload>;
                };
                update: {
                    args: Prisma.command_center_userUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$command_center_userPayload>;
                };
                deleteMany: {
                    args: Prisma.command_center_userDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.command_center_userUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.command_center_userUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$command_center_userPayload>[];
                };
                upsert: {
                    args: Prisma.command_center_userUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$command_center_userPayload>;
                };
                aggregate: {
                    args: Prisma.Command_center_userAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCommand_center_user>;
                };
                groupBy: {
                    args: Prisma.command_center_userGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Command_center_userGroupByOutputType>[];
                };
                count: {
                    args: Prisma.command_center_userCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Command_center_userCountAggregateOutputType> | number;
                };
            };
        };
        engineer_create: {
            payload: Prisma.$engineer_createPayload<ExtArgs>;
            fields: Prisma.engineer_createFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.engineer_createFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_createPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.engineer_createFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_createPayload>;
                };
                findFirst: {
                    args: Prisma.engineer_createFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_createPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.engineer_createFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_createPayload>;
                };
                findMany: {
                    args: Prisma.engineer_createFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_createPayload>[];
                };
                create: {
                    args: Prisma.engineer_createCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_createPayload>;
                };
                createMany: {
                    args: Prisma.engineer_createCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.engineer_createCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_createPayload>[];
                };
                delete: {
                    args: Prisma.engineer_createDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_createPayload>;
                };
                update: {
                    args: Prisma.engineer_createUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_createPayload>;
                };
                deleteMany: {
                    args: Prisma.engineer_createDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.engineer_createUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.engineer_createUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_createPayload>[];
                };
                upsert: {
                    args: Prisma.engineer_createUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_createPayload>;
                };
                aggregate: {
                    args: Prisma.Engineer_createAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEngineer_create>;
                };
                groupBy: {
                    args: Prisma.engineer_createGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Engineer_createGroupByOutputType>[];
                };
                count: {
                    args: Prisma.engineer_createCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Engineer_createCountAggregateOutputType> | number;
                };
            };
        };
        engineer_create_updates: {
            payload: Prisma.$engineer_create_updatesPayload<ExtArgs>;
            fields: Prisma.engineer_create_updatesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.engineer_create_updatesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_create_updatesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.engineer_create_updatesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_create_updatesPayload>;
                };
                findFirst: {
                    args: Prisma.engineer_create_updatesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_create_updatesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.engineer_create_updatesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_create_updatesPayload>;
                };
                findMany: {
                    args: Prisma.engineer_create_updatesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_create_updatesPayload>[];
                };
                create: {
                    args: Prisma.engineer_create_updatesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_create_updatesPayload>;
                };
                createMany: {
                    args: Prisma.engineer_create_updatesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.engineer_create_updatesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_create_updatesPayload>[];
                };
                delete: {
                    args: Prisma.engineer_create_updatesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_create_updatesPayload>;
                };
                update: {
                    args: Prisma.engineer_create_updatesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_create_updatesPayload>;
                };
                deleteMany: {
                    args: Prisma.engineer_create_updatesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.engineer_create_updatesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.engineer_create_updatesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_create_updatesPayload>[];
                };
                upsert: {
                    args: Prisma.engineer_create_updatesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_create_updatesPayload>;
                };
                aggregate: {
                    args: Prisma.Engineer_create_updatesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEngineer_create_updates>;
                };
                groupBy: {
                    args: Prisma.engineer_create_updatesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Engineer_create_updatesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.engineer_create_updatesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Engineer_create_updatesCountAggregateOutputType> | number;
                };
            };
        };
        engineer_documents: {
            payload: Prisma.$engineer_documentsPayload<ExtArgs>;
            fields: Prisma.engineer_documentsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.engineer_documentsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_documentsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.engineer_documentsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_documentsPayload>;
                };
                findFirst: {
                    args: Prisma.engineer_documentsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_documentsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.engineer_documentsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_documentsPayload>;
                };
                findMany: {
                    args: Prisma.engineer_documentsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_documentsPayload>[];
                };
                create: {
                    args: Prisma.engineer_documentsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_documentsPayload>;
                };
                createMany: {
                    args: Prisma.engineer_documentsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.engineer_documentsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_documentsPayload>[];
                };
                delete: {
                    args: Prisma.engineer_documentsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_documentsPayload>;
                };
                update: {
                    args: Prisma.engineer_documentsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_documentsPayload>;
                };
                deleteMany: {
                    args: Prisma.engineer_documentsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.engineer_documentsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.engineer_documentsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_documentsPayload>[];
                };
                upsert: {
                    args: Prisma.engineer_documentsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_documentsPayload>;
                };
                aggregate: {
                    args: Prisma.Engineer_documentsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEngineer_documents>;
                };
                groupBy: {
                    args: Prisma.engineer_documentsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Engineer_documentsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.engineer_documentsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Engineer_documentsCountAggregateOutputType> | number;
                };
            };
        };
        engineer_form: {
            payload: Prisma.$engineer_formPayload<ExtArgs>;
            fields: Prisma.engineer_formFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.engineer_formFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_formPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.engineer_formFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_formPayload>;
                };
                findFirst: {
                    args: Prisma.engineer_formFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_formPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.engineer_formFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_formPayload>;
                };
                findMany: {
                    args: Prisma.engineer_formFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_formPayload>[];
                };
                create: {
                    args: Prisma.engineer_formCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_formPayload>;
                };
                createMany: {
                    args: Prisma.engineer_formCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.engineer_formCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_formPayload>[];
                };
                delete: {
                    args: Prisma.engineer_formDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_formPayload>;
                };
                update: {
                    args: Prisma.engineer_formUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_formPayload>;
                };
                deleteMany: {
                    args: Prisma.engineer_formDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.engineer_formUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.engineer_formUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_formPayload>[];
                };
                upsert: {
                    args: Prisma.engineer_formUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_formPayload>;
                };
                aggregate: {
                    args: Prisma.Engineer_formAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEngineer_form>;
                };
                groupBy: {
                    args: Prisma.engineer_formGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Engineer_formGroupByOutputType>[];
                };
                count: {
                    args: Prisma.engineer_formCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Engineer_formCountAggregateOutputType> | number;
                };
            };
        };
        engineer_form_outbox: {
            payload: Prisma.$engineer_form_outboxPayload<ExtArgs>;
            fields: Prisma.engineer_form_outboxFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.engineer_form_outboxFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_form_outboxPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.engineer_form_outboxFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_form_outboxPayload>;
                };
                findFirst: {
                    args: Prisma.engineer_form_outboxFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_form_outboxPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.engineer_form_outboxFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_form_outboxPayload>;
                };
                findMany: {
                    args: Prisma.engineer_form_outboxFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_form_outboxPayload>[];
                };
                create: {
                    args: Prisma.engineer_form_outboxCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_form_outboxPayload>;
                };
                createMany: {
                    args: Prisma.engineer_form_outboxCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.engineer_form_outboxCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_form_outboxPayload>[];
                };
                delete: {
                    args: Prisma.engineer_form_outboxDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_form_outboxPayload>;
                };
                update: {
                    args: Prisma.engineer_form_outboxUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_form_outboxPayload>;
                };
                deleteMany: {
                    args: Prisma.engineer_form_outboxDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.engineer_form_outboxUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.engineer_form_outboxUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_form_outboxPayload>[];
                };
                upsert: {
                    args: Prisma.engineer_form_outboxUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_form_outboxPayload>;
                };
                aggregate: {
                    args: Prisma.Engineer_form_outboxAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEngineer_form_outbox>;
                };
                groupBy: {
                    args: Prisma.engineer_form_outboxGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Engineer_form_outboxGroupByOutputType>[];
                };
                count: {
                    args: Prisma.engineer_form_outboxCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Engineer_form_outboxCountAggregateOutputType> | number;
                };
            };
        };
        engineer_form_updates: {
            payload: Prisma.$engineer_form_updatesPayload<ExtArgs>;
            fields: Prisma.engineer_form_updatesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.engineer_form_updatesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_form_updatesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.engineer_form_updatesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_form_updatesPayload>;
                };
                findFirst: {
                    args: Prisma.engineer_form_updatesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_form_updatesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.engineer_form_updatesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_form_updatesPayload>;
                };
                findMany: {
                    args: Prisma.engineer_form_updatesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_form_updatesPayload>[];
                };
                create: {
                    args: Prisma.engineer_form_updatesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_form_updatesPayload>;
                };
                createMany: {
                    args: Prisma.engineer_form_updatesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.engineer_form_updatesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_form_updatesPayload>[];
                };
                delete: {
                    args: Prisma.engineer_form_updatesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_form_updatesPayload>;
                };
                update: {
                    args: Prisma.engineer_form_updatesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_form_updatesPayload>;
                };
                deleteMany: {
                    args: Prisma.engineer_form_updatesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.engineer_form_updatesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.engineer_form_updatesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_form_updatesPayload>[];
                };
                upsert: {
                    args: Prisma.engineer_form_updatesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_form_updatesPayload>;
                };
                aggregate: {
                    args: Prisma.Engineer_form_updatesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEngineer_form_updates>;
                };
                groupBy: {
                    args: Prisma.engineer_form_updatesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Engineer_form_updatesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.engineer_form_updatesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Engineer_form_updatesCountAggregateOutputType> | number;
                };
            };
        };
        engineer_image: {
            payload: Prisma.$engineer_imagePayload<ExtArgs>;
            fields: Prisma.engineer_imageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.engineer_imageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_imagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.engineer_imageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_imagePayload>;
                };
                findFirst: {
                    args: Prisma.engineer_imageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_imagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.engineer_imageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_imagePayload>;
                };
                findMany: {
                    args: Prisma.engineer_imageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_imagePayload>[];
                };
                create: {
                    args: Prisma.engineer_imageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_imagePayload>;
                };
                createMany: {
                    args: Prisma.engineer_imageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.engineer_imageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_imagePayload>[];
                };
                delete: {
                    args: Prisma.engineer_imageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_imagePayload>;
                };
                update: {
                    args: Prisma.engineer_imageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_imagePayload>;
                };
                deleteMany: {
                    args: Prisma.engineer_imageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.engineer_imageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.engineer_imageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_imagePayload>[];
                };
                upsert: {
                    args: Prisma.engineer_imageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_imagePayload>;
                };
                aggregate: {
                    args: Prisma.Engineer_imageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEngineer_image>;
                };
                groupBy: {
                    args: Prisma.engineer_imageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Engineer_imageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.engineer_imageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Engineer_imageCountAggregateOutputType> | number;
                };
            };
        };
        engineer_mother_moa: {
            payload: Prisma.$engineer_mother_moaPayload<ExtArgs>;
            fields: Prisma.engineer_mother_moaFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.engineer_mother_moaFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_mother_moaPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.engineer_mother_moaFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_mother_moaPayload>;
                };
                findFirst: {
                    args: Prisma.engineer_mother_moaFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_mother_moaPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.engineer_mother_moaFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_mother_moaPayload>;
                };
                findMany: {
                    args: Prisma.engineer_mother_moaFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_mother_moaPayload>[];
                };
                create: {
                    args: Prisma.engineer_mother_moaCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_mother_moaPayload>;
                };
                createMany: {
                    args: Prisma.engineer_mother_moaCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.engineer_mother_moaCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_mother_moaPayload>[];
                };
                delete: {
                    args: Prisma.engineer_mother_moaDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_mother_moaPayload>;
                };
                update: {
                    args: Prisma.engineer_mother_moaUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_mother_moaPayload>;
                };
                deleteMany: {
                    args: Prisma.engineer_mother_moaDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.engineer_mother_moaUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.engineer_mother_moaUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_mother_moaPayload>[];
                };
                upsert: {
                    args: Prisma.engineer_mother_moaUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_mother_moaPayload>;
                };
                aggregate: {
                    args: Prisma.Engineer_mother_moaAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEngineer_mother_moa>;
                };
                groupBy: {
                    args: Prisma.engineer_mother_moaGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Engineer_mother_moaGroupByOutputType>[];
                };
                count: {
                    args: Prisma.engineer_mother_moaCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Engineer_mother_moaCountAggregateOutputType> | number;
                };
            };
        };
        engineer_projects_inventory: {
            payload: Prisma.$engineer_projects_inventoryPayload<ExtArgs>;
            fields: Prisma.engineer_projects_inventoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.engineer_projects_inventoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_projects_inventoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.engineer_projects_inventoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_projects_inventoryPayload>;
                };
                findFirst: {
                    args: Prisma.engineer_projects_inventoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_projects_inventoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.engineer_projects_inventoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_projects_inventoryPayload>;
                };
                findMany: {
                    args: Prisma.engineer_projects_inventoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_projects_inventoryPayload>[];
                };
                create: {
                    args: Prisma.engineer_projects_inventoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_projects_inventoryPayload>;
                };
                createMany: {
                    args: Prisma.engineer_projects_inventoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.engineer_projects_inventoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_projects_inventoryPayload>[];
                };
                delete: {
                    args: Prisma.engineer_projects_inventoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_projects_inventoryPayload>;
                };
                update: {
                    args: Prisma.engineer_projects_inventoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_projects_inventoryPayload>;
                };
                deleteMany: {
                    args: Prisma.engineer_projects_inventoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.engineer_projects_inventoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.engineer_projects_inventoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_projects_inventoryPayload>[];
                };
                upsert: {
                    args: Prisma.engineer_projects_inventoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_projects_inventoryPayload>;
                };
                aggregate: {
                    args: Prisma.Engineer_projects_inventoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEngineer_projects_inventory>;
                };
                groupBy: {
                    args: Prisma.engineer_projects_inventoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Engineer_projects_inventoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.engineer_projects_inventoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Engineer_projects_inventoryCountAggregateOutputType> | number;
                };
            };
        };
        engineer_supplamental_moa: {
            payload: Prisma.$engineer_supplamental_moaPayload<ExtArgs>;
            fields: Prisma.engineer_supplamental_moaFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.engineer_supplamental_moaFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_supplamental_moaPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.engineer_supplamental_moaFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_supplamental_moaPayload>;
                };
                findFirst: {
                    args: Prisma.engineer_supplamental_moaFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_supplamental_moaPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.engineer_supplamental_moaFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_supplamental_moaPayload>;
                };
                findMany: {
                    args: Prisma.engineer_supplamental_moaFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_supplamental_moaPayload>[];
                };
                create: {
                    args: Prisma.engineer_supplamental_moaCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_supplamental_moaPayload>;
                };
                createMany: {
                    args: Prisma.engineer_supplamental_moaCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.engineer_supplamental_moaCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_supplamental_moaPayload>[];
                };
                delete: {
                    args: Prisma.engineer_supplamental_moaDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_supplamental_moaPayload>;
                };
                update: {
                    args: Prisma.engineer_supplamental_moaUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_supplamental_moaPayload>;
                };
                deleteMany: {
                    args: Prisma.engineer_supplamental_moaDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.engineer_supplamental_moaUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.engineer_supplamental_moaUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_supplamental_moaPayload>[];
                };
                upsert: {
                    args: Prisma.engineer_supplamental_moaUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_supplamental_moaPayload>;
                };
                aggregate: {
                    args: Prisma.Engineer_supplamental_moaAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEngineer_supplamental_moa>;
                };
                groupBy: {
                    args: Prisma.engineer_supplamental_moaGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Engineer_supplamental_moaGroupByOutputType>[];
                };
                count: {
                    args: Prisma.engineer_supplamental_moaCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Engineer_supplamental_moaCountAggregateOutputType> | number;
                };
            };
        };
        engineer_supplemental_moa: {
            payload: Prisma.$engineer_supplemental_moaPayload<ExtArgs>;
            fields: Prisma.engineer_supplemental_moaFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.engineer_supplemental_moaFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_supplemental_moaPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.engineer_supplemental_moaFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_supplemental_moaPayload>;
                };
                findFirst: {
                    args: Prisma.engineer_supplemental_moaFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_supplemental_moaPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.engineer_supplemental_moaFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_supplemental_moaPayload>;
                };
                findMany: {
                    args: Prisma.engineer_supplemental_moaFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_supplemental_moaPayload>[];
                };
                create: {
                    args: Prisma.engineer_supplemental_moaCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_supplemental_moaPayload>;
                };
                createMany: {
                    args: Prisma.engineer_supplemental_moaCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.engineer_supplemental_moaCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_supplemental_moaPayload>[];
                };
                delete: {
                    args: Prisma.engineer_supplemental_moaDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_supplemental_moaPayload>;
                };
                update: {
                    args: Prisma.engineer_supplemental_moaUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_supplemental_moaPayload>;
                };
                deleteMany: {
                    args: Prisma.engineer_supplemental_moaDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.engineer_supplemental_moaUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.engineer_supplemental_moaUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_supplemental_moaPayload>[];
                };
                upsert: {
                    args: Prisma.engineer_supplemental_moaUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$engineer_supplemental_moaPayload>;
                };
                aggregate: {
                    args: Prisma.Engineer_supplemental_moaAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEngineer_supplemental_moa>;
                };
                groupBy: {
                    args: Prisma.engineer_supplemental_moaGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Engineer_supplemental_moaGroupByOutputType>[];
                };
                count: {
                    args: Prisma.engineer_supplemental_moaCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Engineer_supplemental_moaCountAggregateOutputType> | number;
                };
            };
        };
        esf7_database: {
            payload: Prisma.$esf7_databasePayload<ExtArgs>;
            fields: Prisma.esf7_databaseFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.esf7_databaseFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_databasePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.esf7_databaseFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_databasePayload>;
                };
                findFirst: {
                    args: Prisma.esf7_databaseFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_databasePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.esf7_databaseFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_databasePayload>;
                };
                findMany: {
                    args: Prisma.esf7_databaseFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_databasePayload>[];
                };
                create: {
                    args: Prisma.esf7_databaseCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_databasePayload>;
                };
                createMany: {
                    args: Prisma.esf7_databaseCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.esf7_databaseCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_databasePayload>[];
                };
                delete: {
                    args: Prisma.esf7_databaseDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_databasePayload>;
                };
                update: {
                    args: Prisma.esf7_databaseUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_databasePayload>;
                };
                deleteMany: {
                    args: Prisma.esf7_databaseDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.esf7_databaseUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.esf7_databaseUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_databasePayload>[];
                };
                upsert: {
                    args: Prisma.esf7_databaseUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_databasePayload>;
                };
                aggregate: {
                    args: Prisma.Esf7_databaseAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEsf7_database>;
                };
                groupBy: {
                    args: Prisma.esf7_databaseGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Esf7_databaseGroupByOutputType>[];
                };
                count: {
                    args: Prisma.esf7_databaseCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Esf7_databaseCountAggregateOutputType> | number;
                };
            };
        };
        esf7_resubmission_request: {
            payload: Prisma.$esf7_resubmission_requestPayload<ExtArgs>;
            fields: Prisma.esf7_resubmission_requestFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.esf7_resubmission_requestFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_resubmission_requestPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.esf7_resubmission_requestFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_resubmission_requestPayload>;
                };
                findFirst: {
                    args: Prisma.esf7_resubmission_requestFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_resubmission_requestPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.esf7_resubmission_requestFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_resubmission_requestPayload>;
                };
                findMany: {
                    args: Prisma.esf7_resubmission_requestFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_resubmission_requestPayload>[];
                };
                create: {
                    args: Prisma.esf7_resubmission_requestCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_resubmission_requestPayload>;
                };
                createMany: {
                    args: Prisma.esf7_resubmission_requestCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.esf7_resubmission_requestCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_resubmission_requestPayload>[];
                };
                delete: {
                    args: Prisma.esf7_resubmission_requestDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_resubmission_requestPayload>;
                };
                update: {
                    args: Prisma.esf7_resubmission_requestUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_resubmission_requestPayload>;
                };
                deleteMany: {
                    args: Prisma.esf7_resubmission_requestDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.esf7_resubmission_requestUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.esf7_resubmission_requestUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_resubmission_requestPayload>[];
                };
                upsert: {
                    args: Prisma.esf7_resubmission_requestUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_resubmission_requestPayload>;
                };
                aggregate: {
                    args: Prisma.Esf7_resubmission_requestAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEsf7_resubmission_request>;
                };
                groupBy: {
                    args: Prisma.esf7_resubmission_requestGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Esf7_resubmission_requestGroupByOutputType>[];
                };
                count: {
                    args: Prisma.esf7_resubmission_requestCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Esf7_resubmission_requestCountAggregateOutputType> | number;
                };
            };
        };
        esf7_scan_results: {
            payload: Prisma.$esf7_scan_resultsPayload<ExtArgs>;
            fields: Prisma.esf7_scan_resultsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.esf7_scan_resultsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_scan_resultsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.esf7_scan_resultsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_scan_resultsPayload>;
                };
                findFirst: {
                    args: Prisma.esf7_scan_resultsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_scan_resultsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.esf7_scan_resultsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_scan_resultsPayload>;
                };
                findMany: {
                    args: Prisma.esf7_scan_resultsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_scan_resultsPayload>[];
                };
                create: {
                    args: Prisma.esf7_scan_resultsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_scan_resultsPayload>;
                };
                createMany: {
                    args: Prisma.esf7_scan_resultsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.esf7_scan_resultsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_scan_resultsPayload>[];
                };
                delete: {
                    args: Prisma.esf7_scan_resultsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_scan_resultsPayload>;
                };
                update: {
                    args: Prisma.esf7_scan_resultsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_scan_resultsPayload>;
                };
                deleteMany: {
                    args: Prisma.esf7_scan_resultsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.esf7_scan_resultsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.esf7_scan_resultsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_scan_resultsPayload>[];
                };
                upsert: {
                    args: Prisma.esf7_scan_resultsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_scan_resultsPayload>;
                };
                aggregate: {
                    args: Prisma.Esf7_scan_resultsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEsf7_scan_results>;
                };
                groupBy: {
                    args: Prisma.esf7_scan_resultsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Esf7_scan_resultsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.esf7_scan_resultsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Esf7_scan_resultsCountAggregateOutputType> | number;
                };
            };
        };
        esf7_staging: {
            payload: Prisma.$esf7_stagingPayload<ExtArgs>;
            fields: Prisma.esf7_stagingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.esf7_stagingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_stagingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.esf7_stagingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_stagingPayload>;
                };
                findFirst: {
                    args: Prisma.esf7_stagingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_stagingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.esf7_stagingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_stagingPayload>;
                };
                findMany: {
                    args: Prisma.esf7_stagingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_stagingPayload>[];
                };
                create: {
                    args: Prisma.esf7_stagingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_stagingPayload>;
                };
                createMany: {
                    args: Prisma.esf7_stagingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.esf7_stagingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_stagingPayload>[];
                };
                delete: {
                    args: Prisma.esf7_stagingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_stagingPayload>;
                };
                update: {
                    args: Prisma.esf7_stagingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_stagingPayload>;
                };
                deleteMany: {
                    args: Prisma.esf7_stagingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.esf7_stagingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.esf7_stagingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_stagingPayload>[];
                };
                upsert: {
                    args: Prisma.esf7_stagingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf7_stagingPayload>;
                };
                aggregate: {
                    args: Prisma.Esf7_stagingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEsf7_staging>;
                };
                groupBy: {
                    args: Prisma.esf7_stagingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Esf7_stagingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.esf7_stagingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Esf7_stagingCountAggregateOutputType> | number;
                };
            };
        };
        esf_link: {
            payload: Prisma.$esf_linkPayload<ExtArgs>;
            fields: Prisma.esf_linkFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.esf_linkFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf_linkPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.esf_linkFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf_linkPayload>;
                };
                findFirst: {
                    args: Prisma.esf_linkFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf_linkPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.esf_linkFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf_linkPayload>;
                };
                findMany: {
                    args: Prisma.esf_linkFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf_linkPayload>[];
                };
                create: {
                    args: Prisma.esf_linkCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf_linkPayload>;
                };
                createMany: {
                    args: Prisma.esf_linkCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.esf_linkCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf_linkPayload>[];
                };
                delete: {
                    args: Prisma.esf_linkDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf_linkPayload>;
                };
                update: {
                    args: Prisma.esf_linkUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf_linkPayload>;
                };
                deleteMany: {
                    args: Prisma.esf_linkDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.esf_linkUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.esf_linkUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf_linkPayload>[];
                };
                upsert: {
                    args: Prisma.esf_linkUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$esf_linkPayload>;
                };
                aggregate: {
                    args: Prisma.Esf_linkAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEsf_link>;
                };
                groupBy: {
                    args: Prisma.esf_linkGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Esf_linkGroupByOutputType>[];
                };
                count: {
                    args: Prisma.esf_linkCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Esf_linkCountAggregateOutputType> | number;
                };
            };
        };
        facility_demolitions: {
            payload: Prisma.$facility_demolitionsPayload<ExtArgs>;
            fields: Prisma.facility_demolitionsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.facility_demolitionsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_demolitionsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.facility_demolitionsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_demolitionsPayload>;
                };
                findFirst: {
                    args: Prisma.facility_demolitionsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_demolitionsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.facility_demolitionsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_demolitionsPayload>;
                };
                findMany: {
                    args: Prisma.facility_demolitionsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_demolitionsPayload>[];
                };
                create: {
                    args: Prisma.facility_demolitionsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_demolitionsPayload>;
                };
                createMany: {
                    args: Prisma.facility_demolitionsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.facility_demolitionsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_demolitionsPayload>[];
                };
                delete: {
                    args: Prisma.facility_demolitionsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_demolitionsPayload>;
                };
                update: {
                    args: Prisma.facility_demolitionsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_demolitionsPayload>;
                };
                deleteMany: {
                    args: Prisma.facility_demolitionsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.facility_demolitionsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.facility_demolitionsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_demolitionsPayload>[];
                };
                upsert: {
                    args: Prisma.facility_demolitionsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_demolitionsPayload>;
                };
                aggregate: {
                    args: Prisma.Facility_demolitionsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFacility_demolitions>;
                };
                groupBy: {
                    args: Prisma.facility_demolitionsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Facility_demolitionsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.facility_demolitionsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Facility_demolitionsCountAggregateOutputType> | number;
                };
            };
        };
        facility_inventory: {
            payload: Prisma.$facility_inventoryPayload<ExtArgs>;
            fields: Prisma.facility_inventoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.facility_inventoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_inventoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.facility_inventoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_inventoryPayload>;
                };
                findFirst: {
                    args: Prisma.facility_inventoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_inventoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.facility_inventoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_inventoryPayload>;
                };
                findMany: {
                    args: Prisma.facility_inventoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_inventoryPayload>[];
                };
                create: {
                    args: Prisma.facility_inventoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_inventoryPayload>;
                };
                createMany: {
                    args: Prisma.facility_inventoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.facility_inventoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_inventoryPayload>[];
                };
                delete: {
                    args: Prisma.facility_inventoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_inventoryPayload>;
                };
                update: {
                    args: Prisma.facility_inventoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_inventoryPayload>;
                };
                deleteMany: {
                    args: Prisma.facility_inventoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.facility_inventoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.facility_inventoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_inventoryPayload>[];
                };
                upsert: {
                    args: Prisma.facility_inventoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_inventoryPayload>;
                };
                aggregate: {
                    args: Prisma.Facility_inventoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFacility_inventory>;
                };
                groupBy: {
                    args: Prisma.facility_inventoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Facility_inventoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.facility_inventoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Facility_inventoryCountAggregateOutputType> | number;
                };
            };
        };
        facility_repairs: {
            payload: Prisma.$facility_repairsPayload<ExtArgs>;
            fields: Prisma.facility_repairsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.facility_repairsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_repairsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.facility_repairsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_repairsPayload>;
                };
                findFirst: {
                    args: Prisma.facility_repairsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_repairsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.facility_repairsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_repairsPayload>;
                };
                findMany: {
                    args: Prisma.facility_repairsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_repairsPayload>[];
                };
                create: {
                    args: Prisma.facility_repairsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_repairsPayload>;
                };
                createMany: {
                    args: Prisma.facility_repairsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.facility_repairsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_repairsPayload>[];
                };
                delete: {
                    args: Prisma.facility_repairsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_repairsPayload>;
                };
                update: {
                    args: Prisma.facility_repairsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_repairsPayload>;
                };
                deleteMany: {
                    args: Prisma.facility_repairsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.facility_repairsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.facility_repairsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_repairsPayload>[];
                };
                upsert: {
                    args: Prisma.facility_repairsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_repairsPayload>;
                };
                aggregate: {
                    args: Prisma.Facility_repairsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFacility_repairs>;
                };
                groupBy: {
                    args: Prisma.facility_repairsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Facility_repairsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.facility_repairsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Facility_repairsCountAggregateOutputType> | number;
                };
            };
        };
        facility_rooms: {
            payload: Prisma.$facility_roomsPayload<ExtArgs>;
            fields: Prisma.facility_roomsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.facility_roomsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_roomsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.facility_roomsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_roomsPayload>;
                };
                findFirst: {
                    args: Prisma.facility_roomsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_roomsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.facility_roomsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_roomsPayload>;
                };
                findMany: {
                    args: Prisma.facility_roomsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_roomsPayload>[];
                };
                create: {
                    args: Prisma.facility_roomsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_roomsPayload>;
                };
                createMany: {
                    args: Prisma.facility_roomsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.facility_roomsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_roomsPayload>[];
                };
                delete: {
                    args: Prisma.facility_roomsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_roomsPayload>;
                };
                update: {
                    args: Prisma.facility_roomsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_roomsPayload>;
                };
                deleteMany: {
                    args: Prisma.facility_roomsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.facility_roomsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.facility_roomsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_roomsPayload>[];
                };
                upsert: {
                    args: Prisma.facility_roomsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$facility_roomsPayload>;
                };
                aggregate: {
                    args: Prisma.Facility_roomsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFacility_rooms>;
                };
                groupBy: {
                    args: Prisma.facility_roomsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Facility_roomsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.facility_roomsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Facility_roomsCountAggregateOutputType> | number;
                };
            };
        };
        finance_projects: {
            payload: Prisma.$finance_projectsPayload<ExtArgs>;
            fields: Prisma.finance_projectsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.finance_projectsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$finance_projectsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.finance_projectsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$finance_projectsPayload>;
                };
                findFirst: {
                    args: Prisma.finance_projectsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$finance_projectsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.finance_projectsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$finance_projectsPayload>;
                };
                findMany: {
                    args: Prisma.finance_projectsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$finance_projectsPayload>[];
                };
                create: {
                    args: Prisma.finance_projectsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$finance_projectsPayload>;
                };
                createMany: {
                    args: Prisma.finance_projectsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.finance_projectsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$finance_projectsPayload>[];
                };
                delete: {
                    args: Prisma.finance_projectsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$finance_projectsPayload>;
                };
                update: {
                    args: Prisma.finance_projectsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$finance_projectsPayload>;
                };
                deleteMany: {
                    args: Prisma.finance_projectsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.finance_projectsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.finance_projectsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$finance_projectsPayload>[];
                };
                upsert: {
                    args: Prisma.finance_projectsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$finance_projectsPayload>;
                };
                aggregate: {
                    args: Prisma.Finance_projectsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFinance_projects>;
                };
                groupBy: {
                    args: Prisma.finance_projectsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Finance_projectsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.finance_projectsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Finance_projectsCountAggregateOutputType> | number;
                };
            };
        };
        insighted_project_update: {
            payload: Prisma.$insighted_project_updatePayload<ExtArgs>;
            fields: Prisma.insighted_project_updateFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.insighted_project_updateFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$insighted_project_updatePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.insighted_project_updateFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$insighted_project_updatePayload>;
                };
                findFirst: {
                    args: Prisma.insighted_project_updateFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$insighted_project_updatePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.insighted_project_updateFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$insighted_project_updatePayload>;
                };
                findMany: {
                    args: Prisma.insighted_project_updateFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$insighted_project_updatePayload>[];
                };
                create: {
                    args: Prisma.insighted_project_updateCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$insighted_project_updatePayload>;
                };
                createMany: {
                    args: Prisma.insighted_project_updateCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.insighted_project_updateCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$insighted_project_updatePayload>[];
                };
                delete: {
                    args: Prisma.insighted_project_updateDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$insighted_project_updatePayload>;
                };
                update: {
                    args: Prisma.insighted_project_updateUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$insighted_project_updatePayload>;
                };
                deleteMany: {
                    args: Prisma.insighted_project_updateDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.insighted_project_updateUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.insighted_project_updateUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$insighted_project_updatePayload>[];
                };
                upsert: {
                    args: Prisma.insighted_project_updateUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$insighted_project_updatePayload>;
                };
                aggregate: {
                    args: Prisma.Insighted_project_updateAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateInsighted_project_update>;
                };
                groupBy: {
                    args: Prisma.insighted_project_updateGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Insighted_project_updateGroupByOutputType>[];
                };
                count: {
                    args: Prisma.insighted_project_updateCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Insighted_project_updateCountAggregateOutputType> | number;
                };
            };
        };
        knex_migrations: {
            payload: Prisma.$knex_migrationsPayload<ExtArgs>;
            fields: Prisma.knex_migrationsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.knex_migrationsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$knex_migrationsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.knex_migrationsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$knex_migrationsPayload>;
                };
                findFirst: {
                    args: Prisma.knex_migrationsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$knex_migrationsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.knex_migrationsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$knex_migrationsPayload>;
                };
                findMany: {
                    args: Prisma.knex_migrationsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$knex_migrationsPayload>[];
                };
                create: {
                    args: Prisma.knex_migrationsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$knex_migrationsPayload>;
                };
                createMany: {
                    args: Prisma.knex_migrationsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.knex_migrationsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$knex_migrationsPayload>[];
                };
                delete: {
                    args: Prisma.knex_migrationsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$knex_migrationsPayload>;
                };
                update: {
                    args: Prisma.knex_migrationsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$knex_migrationsPayload>;
                };
                deleteMany: {
                    args: Prisma.knex_migrationsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.knex_migrationsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.knex_migrationsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$knex_migrationsPayload>[];
                };
                upsert: {
                    args: Prisma.knex_migrationsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$knex_migrationsPayload>;
                };
                aggregate: {
                    args: Prisma.Knex_migrationsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateKnex_migrations>;
                };
                groupBy: {
                    args: Prisma.knex_migrationsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Knex_migrationsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.knex_migrationsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Knex_migrationsCountAggregateOutputType> | number;
                };
            };
        };
        knex_migrations_lock: {
            payload: Prisma.$knex_migrations_lockPayload<ExtArgs>;
            fields: Prisma.knex_migrations_lockFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.knex_migrations_lockFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$knex_migrations_lockPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.knex_migrations_lockFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$knex_migrations_lockPayload>;
                };
                findFirst: {
                    args: Prisma.knex_migrations_lockFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$knex_migrations_lockPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.knex_migrations_lockFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$knex_migrations_lockPayload>;
                };
                findMany: {
                    args: Prisma.knex_migrations_lockFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$knex_migrations_lockPayload>[];
                };
                create: {
                    args: Prisma.knex_migrations_lockCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$knex_migrations_lockPayload>;
                };
                createMany: {
                    args: Prisma.knex_migrations_lockCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.knex_migrations_lockCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$knex_migrations_lockPayload>[];
                };
                delete: {
                    args: Prisma.knex_migrations_lockDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$knex_migrations_lockPayload>;
                };
                update: {
                    args: Prisma.knex_migrations_lockUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$knex_migrations_lockPayload>;
                };
                deleteMany: {
                    args: Prisma.knex_migrations_lockDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.knex_migrations_lockUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.knex_migrations_lockUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$knex_migrations_lockPayload>[];
                };
                upsert: {
                    args: Prisma.knex_migrations_lockUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$knex_migrations_lockPayload>;
                };
                aggregate: {
                    args: Prisma.Knex_migrations_lockAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateKnex_migrations_lock>;
                };
                groupBy: {
                    args: Prisma.knex_migrations_lockGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Knex_migrations_lockGroupByOutputType>[];
                };
                count: {
                    args: Prisma.knex_migrations_lockCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Knex_migrations_lockCountAggregateOutputType> | number;
                };
            };
        };
        lgu_image: {
            payload: Prisma.$lgu_imagePayload<ExtArgs>;
            fields: Prisma.lgu_imageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.lgu_imageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$lgu_imagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.lgu_imageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$lgu_imagePayload>;
                };
                findFirst: {
                    args: Prisma.lgu_imageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$lgu_imagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.lgu_imageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$lgu_imagePayload>;
                };
                findMany: {
                    args: Prisma.lgu_imageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$lgu_imagePayload>[];
                };
                create: {
                    args: Prisma.lgu_imageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$lgu_imagePayload>;
                };
                createMany: {
                    args: Prisma.lgu_imageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.lgu_imageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$lgu_imagePayload>[];
                };
                delete: {
                    args: Prisma.lgu_imageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$lgu_imagePayload>;
                };
                update: {
                    args: Prisma.lgu_imageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$lgu_imagePayload>;
                };
                deleteMany: {
                    args: Prisma.lgu_imageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.lgu_imageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.lgu_imageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$lgu_imagePayload>[];
                };
                upsert: {
                    args: Prisma.lgu_imageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$lgu_imagePayload>;
                };
                aggregate: {
                    args: Prisma.Lgu_imageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLgu_image>;
                };
                groupBy: {
                    args: Prisma.lgu_imageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Lgu_imageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.lgu_imageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Lgu_imageCountAggregateOutputType> | number;
                };
            };
        };
        lgu_projects: {
            payload: Prisma.$lgu_projectsPayload<ExtArgs>;
            fields: Prisma.lgu_projectsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.lgu_projectsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$lgu_projectsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.lgu_projectsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$lgu_projectsPayload>;
                };
                findFirst: {
                    args: Prisma.lgu_projectsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$lgu_projectsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.lgu_projectsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$lgu_projectsPayload>;
                };
                findMany: {
                    args: Prisma.lgu_projectsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$lgu_projectsPayload>[];
                };
                create: {
                    args: Prisma.lgu_projectsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$lgu_projectsPayload>;
                };
                createMany: {
                    args: Prisma.lgu_projectsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.lgu_projectsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$lgu_projectsPayload>[];
                };
                delete: {
                    args: Prisma.lgu_projectsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$lgu_projectsPayload>;
                };
                update: {
                    args: Prisma.lgu_projectsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$lgu_projectsPayload>;
                };
                deleteMany: {
                    args: Prisma.lgu_projectsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.lgu_projectsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.lgu_projectsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$lgu_projectsPayload>[];
                };
                upsert: {
                    args: Prisma.lgu_projectsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$lgu_projectsPayload>;
                };
                aggregate: {
                    args: Prisma.Lgu_projectsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLgu_projects>;
                };
                groupBy: {
                    args: Prisma.lgu_projectsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Lgu_projectsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.lgu_projectsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Lgu_projectsCountAggregateOutputType> | number;
                };
            };
        };
        masterlist_26_30: {
            payload: Prisma.$masterlist_26_30Payload<ExtArgs>;
            fields: Prisma.masterlist_26_30FieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.masterlist_26_30FindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$masterlist_26_30Payload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.masterlist_26_30FindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$masterlist_26_30Payload>;
                };
                findFirst: {
                    args: Prisma.masterlist_26_30FindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$masterlist_26_30Payload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.masterlist_26_30FindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$masterlist_26_30Payload>;
                };
                findMany: {
                    args: Prisma.masterlist_26_30FindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$masterlist_26_30Payload>[];
                };
                create: {
                    args: Prisma.masterlist_26_30CreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$masterlist_26_30Payload>;
                };
                createMany: {
                    args: Prisma.masterlist_26_30CreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.masterlist_26_30CreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$masterlist_26_30Payload>[];
                };
                delete: {
                    args: Prisma.masterlist_26_30DeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$masterlist_26_30Payload>;
                };
                update: {
                    args: Prisma.masterlist_26_30UpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$masterlist_26_30Payload>;
                };
                deleteMany: {
                    args: Prisma.masterlist_26_30DeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.masterlist_26_30UpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.masterlist_26_30UpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$masterlist_26_30Payload>[];
                };
                upsert: {
                    args: Prisma.masterlist_26_30UpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$masterlist_26_30Payload>;
                };
                aggregate: {
                    args: Prisma.Masterlist_26_30AggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMasterlist_26_30>;
                };
                groupBy: {
                    args: Prisma.masterlist_26_30GroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Masterlist_26_30GroupByOutputType>[];
                };
                count: {
                    args: Prisma.masterlist_26_30CountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Masterlist_26_30CountAggregateOutputType> | number;
                };
            };
        };
        notable_achievements: {
            payload: Prisma.$notable_achievementsPayload<ExtArgs>;
            fields: Prisma.notable_achievementsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.notable_achievementsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notable_achievementsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.notable_achievementsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notable_achievementsPayload>;
                };
                findFirst: {
                    args: Prisma.notable_achievementsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notable_achievementsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.notable_achievementsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notable_achievementsPayload>;
                };
                findMany: {
                    args: Prisma.notable_achievementsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notable_achievementsPayload>[];
                };
                create: {
                    args: Prisma.notable_achievementsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notable_achievementsPayload>;
                };
                createMany: {
                    args: Prisma.notable_achievementsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.notable_achievementsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notable_achievementsPayload>[];
                };
                delete: {
                    args: Prisma.notable_achievementsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notable_achievementsPayload>;
                };
                update: {
                    args: Prisma.notable_achievementsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notable_achievementsPayload>;
                };
                deleteMany: {
                    args: Prisma.notable_achievementsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.notable_achievementsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.notable_achievementsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notable_achievementsPayload>[];
                };
                upsert: {
                    args: Prisma.notable_achievementsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notable_achievementsPayload>;
                };
                aggregate: {
                    args: Prisma.Notable_achievementsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotable_achievements>;
                };
                groupBy: {
                    args: Prisma.notable_achievementsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Notable_achievementsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.notable_achievementsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Notable_achievementsCountAggregateOutputType> | number;
                };
            };
        };
        notifications: {
            payload: Prisma.$notificationsPayload<ExtArgs>;
            fields: Prisma.notificationsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.notificationsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificationsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.notificationsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificationsPayload>;
                };
                findFirst: {
                    args: Prisma.notificationsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificationsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.notificationsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificationsPayload>;
                };
                findMany: {
                    args: Prisma.notificationsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificationsPayload>[];
                };
                create: {
                    args: Prisma.notificationsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificationsPayload>;
                };
                createMany: {
                    args: Prisma.notificationsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.notificationsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificationsPayload>[];
                };
                delete: {
                    args: Prisma.notificationsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificationsPayload>;
                };
                update: {
                    args: Prisma.notificationsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificationsPayload>;
                };
                deleteMany: {
                    args: Prisma.notificationsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.notificationsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.notificationsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificationsPayload>[];
                };
                upsert: {
                    args: Prisma.notificationsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$notificationsPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotifications>;
                };
                groupBy: {
                    args: Prisma.notificationsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.notificationsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationsCountAggregateOutputType> | number;
                };
            };
        };
        pending_schools: {
            payload: Prisma.$pending_schoolsPayload<ExtArgs>;
            fields: Prisma.pending_schoolsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.pending_schoolsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$pending_schoolsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.pending_schoolsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$pending_schoolsPayload>;
                };
                findFirst: {
                    args: Prisma.pending_schoolsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$pending_schoolsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.pending_schoolsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$pending_schoolsPayload>;
                };
                findMany: {
                    args: Prisma.pending_schoolsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$pending_schoolsPayload>[];
                };
                create: {
                    args: Prisma.pending_schoolsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$pending_schoolsPayload>;
                };
                createMany: {
                    args: Prisma.pending_schoolsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.pending_schoolsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$pending_schoolsPayload>[];
                };
                delete: {
                    args: Prisma.pending_schoolsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$pending_schoolsPayload>;
                };
                update: {
                    args: Prisma.pending_schoolsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$pending_schoolsPayload>;
                };
                deleteMany: {
                    args: Prisma.pending_schoolsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.pending_schoolsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.pending_schoolsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$pending_schoolsPayload>[];
                };
                upsert: {
                    args: Prisma.pending_schoolsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$pending_schoolsPayload>;
                };
                aggregate: {
                    args: Prisma.Pending_schoolsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePending_schools>;
                };
                groupBy: {
                    args: Prisma.pending_schoolsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Pending_schoolsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.pending_schoolsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Pending_schoolsCountAggregateOutputType> | number;
                };
            };
        };
        ph_buildings_demolition: {
            payload: Prisma.$ph_buildings_demolitionPayload<ExtArgs>;
            fields: Prisma.ph_buildings_demolitionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ph_buildings_demolitionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_demolitionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ph_buildings_demolitionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_demolitionPayload>;
                };
                findFirst: {
                    args: Prisma.ph_buildings_demolitionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_demolitionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ph_buildings_demolitionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_demolitionPayload>;
                };
                findMany: {
                    args: Prisma.ph_buildings_demolitionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_demolitionPayload>[];
                };
                create: {
                    args: Prisma.ph_buildings_demolitionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_demolitionPayload>;
                };
                createMany: {
                    args: Prisma.ph_buildings_demolitionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ph_buildings_demolitionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_demolitionPayload>[];
                };
                delete: {
                    args: Prisma.ph_buildings_demolitionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_demolitionPayload>;
                };
                update: {
                    args: Prisma.ph_buildings_demolitionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_demolitionPayload>;
                };
                deleteMany: {
                    args: Prisma.ph_buildings_demolitionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ph_buildings_demolitionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ph_buildings_demolitionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_demolitionPayload>[];
                };
                upsert: {
                    args: Prisma.ph_buildings_demolitionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_demolitionPayload>;
                };
                aggregate: {
                    args: Prisma.Ph_buildings_demolitionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePh_buildings_demolition>;
                };
                groupBy: {
                    args: Prisma.ph_buildings_demolitionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Ph_buildings_demolitionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ph_buildings_demolitionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Ph_buildings_demolitionCountAggregateOutputType> | number;
                };
            };
        };
        ph_buildings_inventory: {
            payload: Prisma.$ph_buildings_inventoryPayload<ExtArgs>;
            fields: Prisma.ph_buildings_inventoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ph_buildings_inventoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_inventoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ph_buildings_inventoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_inventoryPayload>;
                };
                findFirst: {
                    args: Prisma.ph_buildings_inventoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_inventoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ph_buildings_inventoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_inventoryPayload>;
                };
                findMany: {
                    args: Prisma.ph_buildings_inventoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_inventoryPayload>[];
                };
                create: {
                    args: Prisma.ph_buildings_inventoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_inventoryPayload>;
                };
                createMany: {
                    args: Prisma.ph_buildings_inventoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ph_buildings_inventoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_inventoryPayload>[];
                };
                delete: {
                    args: Prisma.ph_buildings_inventoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_inventoryPayload>;
                };
                update: {
                    args: Prisma.ph_buildings_inventoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_inventoryPayload>;
                };
                deleteMany: {
                    args: Prisma.ph_buildings_inventoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ph_buildings_inventoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ph_buildings_inventoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_inventoryPayload>[];
                };
                upsert: {
                    args: Prisma.ph_buildings_inventoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_inventoryPayload>;
                };
                aggregate: {
                    args: Prisma.Ph_buildings_inventoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePh_buildings_inventory>;
                };
                groupBy: {
                    args: Prisma.ph_buildings_inventoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Ph_buildings_inventoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ph_buildings_inventoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Ph_buildings_inventoryCountAggregateOutputType> | number;
                };
            };
        };
        ph_buildings_repairs: {
            payload: Prisma.$ph_buildings_repairsPayload<ExtArgs>;
            fields: Prisma.ph_buildings_repairsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ph_buildings_repairsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_repairsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ph_buildings_repairsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_repairsPayload>;
                };
                findFirst: {
                    args: Prisma.ph_buildings_repairsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_repairsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ph_buildings_repairsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_repairsPayload>;
                };
                findMany: {
                    args: Prisma.ph_buildings_repairsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_repairsPayload>[];
                };
                create: {
                    args: Prisma.ph_buildings_repairsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_repairsPayload>;
                };
                createMany: {
                    args: Prisma.ph_buildings_repairsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ph_buildings_repairsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_repairsPayload>[];
                };
                delete: {
                    args: Prisma.ph_buildings_repairsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_repairsPayload>;
                };
                update: {
                    args: Prisma.ph_buildings_repairsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_repairsPayload>;
                };
                deleteMany: {
                    args: Prisma.ph_buildings_repairsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ph_buildings_repairsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ph_buildings_repairsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_repairsPayload>[];
                };
                upsert: {
                    args: Prisma.ph_buildings_repairsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_buildings_repairsPayload>;
                };
                aggregate: {
                    args: Prisma.Ph_buildings_repairsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePh_buildings_repairs>;
                };
                groupBy: {
                    args: Prisma.ph_buildings_repairsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Ph_buildings_repairsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ph_buildings_repairsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Ph_buildings_repairsCountAggregateOutputType> | number;
                };
            };
        };
        ph_ecart_batches: {
            payload: Prisma.$ph_ecart_batchesPayload<ExtArgs>;
            fields: Prisma.ph_ecart_batchesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ph_ecart_batchesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_ecart_batchesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ph_ecart_batchesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_ecart_batchesPayload>;
                };
                findFirst: {
                    args: Prisma.ph_ecart_batchesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_ecart_batchesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ph_ecart_batchesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_ecart_batchesPayload>;
                };
                findMany: {
                    args: Prisma.ph_ecart_batchesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_ecart_batchesPayload>[];
                };
                create: {
                    args: Prisma.ph_ecart_batchesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_ecart_batchesPayload>;
                };
                createMany: {
                    args: Prisma.ph_ecart_batchesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ph_ecart_batchesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_ecart_batchesPayload>[];
                };
                delete: {
                    args: Prisma.ph_ecart_batchesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_ecart_batchesPayload>;
                };
                update: {
                    args: Prisma.ph_ecart_batchesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_ecart_batchesPayload>;
                };
                deleteMany: {
                    args: Prisma.ph_ecart_batchesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ph_ecart_batchesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ph_ecart_batchesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_ecart_batchesPayload>[];
                };
                upsert: {
                    args: Prisma.ph_ecart_batchesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_ecart_batchesPayload>;
                };
                aggregate: {
                    args: Prisma.Ph_ecart_batchesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePh_ecart_batches>;
                };
                groupBy: {
                    args: Prisma.ph_ecart_batchesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Ph_ecart_batchesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ph_ecart_batchesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Ph_ecart_batchesCountAggregateOutputType> | number;
                };
            };
        };
        ph_migrations: {
            payload: Prisma.$ph_migrationsPayload<ExtArgs>;
            fields: Prisma.ph_migrationsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ph_migrationsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_migrationsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ph_migrationsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_migrationsPayload>;
                };
                findFirst: {
                    args: Prisma.ph_migrationsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_migrationsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ph_migrationsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_migrationsPayload>;
                };
                findMany: {
                    args: Prisma.ph_migrationsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_migrationsPayload>[];
                };
                create: {
                    args: Prisma.ph_migrationsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_migrationsPayload>;
                };
                createMany: {
                    args: Prisma.ph_migrationsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ph_migrationsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_migrationsPayload>[];
                };
                delete: {
                    args: Prisma.ph_migrationsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_migrationsPayload>;
                };
                update: {
                    args: Prisma.ph_migrationsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_migrationsPayload>;
                };
                deleteMany: {
                    args: Prisma.ph_migrationsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ph_migrationsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ph_migrationsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_migrationsPayload>[];
                };
                upsert: {
                    args: Prisma.ph_migrationsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_migrationsPayload>;
                };
                aggregate: {
                    args: Prisma.Ph_migrationsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePh_migrations>;
                };
                groupBy: {
                    args: Prisma.ph_migrationsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Ph_migrationsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ph_migrationsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Ph_migrationsCountAggregateOutputType> | number;
                };
            };
        };
        ph_school_buildable_spaces: {
            payload: Prisma.$ph_school_buildable_spacesPayload<ExtArgs>;
            fields: Prisma.ph_school_buildable_spacesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ph_school_buildable_spacesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_school_buildable_spacesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ph_school_buildable_spacesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_school_buildable_spacesPayload>;
                };
                findFirst: {
                    args: Prisma.ph_school_buildable_spacesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_school_buildable_spacesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ph_school_buildable_spacesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_school_buildable_spacesPayload>;
                };
                findMany: {
                    args: Prisma.ph_school_buildable_spacesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_school_buildable_spacesPayload>[];
                };
                create: {
                    args: Prisma.ph_school_buildable_spacesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_school_buildable_spacesPayload>;
                };
                createMany: {
                    args: Prisma.ph_school_buildable_spacesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ph_school_buildable_spacesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_school_buildable_spacesPayload>[];
                };
                delete: {
                    args: Prisma.ph_school_buildable_spacesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_school_buildable_spacesPayload>;
                };
                update: {
                    args: Prisma.ph_school_buildable_spacesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_school_buildable_spacesPayload>;
                };
                deleteMany: {
                    args: Prisma.ph_school_buildable_spacesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ph_school_buildable_spacesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ph_school_buildable_spacesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_school_buildable_spacesPayload>[];
                };
                upsert: {
                    args: Prisma.ph_school_buildable_spacesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_school_buildable_spacesPayload>;
                };
                aggregate: {
                    args: Prisma.Ph_school_buildable_spacesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePh_school_buildable_spaces>;
                };
                groupBy: {
                    args: Prisma.ph_school_buildable_spacesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Ph_school_buildable_spacesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ph_school_buildable_spacesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Ph_school_buildable_spacesCountAggregateOutputType> | number;
                };
            };
        };
        ph_school_completion: {
            payload: Prisma.$ph_school_completionPayload<ExtArgs>;
            fields: Prisma.ph_school_completionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ph_school_completionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_school_completionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ph_school_completionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_school_completionPayload>;
                };
                findFirst: {
                    args: Prisma.ph_school_completionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_school_completionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ph_school_completionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_school_completionPayload>;
                };
                findMany: {
                    args: Prisma.ph_school_completionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_school_completionPayload>[];
                };
                create: {
                    args: Prisma.ph_school_completionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_school_completionPayload>;
                };
                createMany: {
                    args: Prisma.ph_school_completionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ph_school_completionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_school_completionPayload>[];
                };
                delete: {
                    args: Prisma.ph_school_completionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_school_completionPayload>;
                };
                update: {
                    args: Prisma.ph_school_completionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_school_completionPayload>;
                };
                deleteMany: {
                    args: Prisma.ph_school_completionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ph_school_completionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ph_school_completionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_school_completionPayload>[];
                };
                upsert: {
                    args: Prisma.ph_school_completionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_school_completionPayload>;
                };
                aggregate: {
                    args: Prisma.Ph_school_completionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePh_school_completion>;
                };
                groupBy: {
                    args: Prisma.ph_school_completionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Ph_school_completionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ph_school_completionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Ph_school_completionCountAggregateOutputType> | number;
                };
            };
        };
        ph_schools: {
            payload: Prisma.$ph_schoolsPayload<ExtArgs>;
            fields: Prisma.ph_schoolsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ph_schoolsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_schoolsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ph_schoolsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_schoolsPayload>;
                };
                findFirst: {
                    args: Prisma.ph_schoolsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_schoolsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ph_schoolsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_schoolsPayload>;
                };
                findMany: {
                    args: Prisma.ph_schoolsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_schoolsPayload>[];
                };
                create: {
                    args: Prisma.ph_schoolsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_schoolsPayload>;
                };
                createMany: {
                    args: Prisma.ph_schoolsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ph_schoolsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_schoolsPayload>[];
                };
                delete: {
                    args: Prisma.ph_schoolsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_schoolsPayload>;
                };
                update: {
                    args: Prisma.ph_schoolsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_schoolsPayload>;
                };
                deleteMany: {
                    args: Prisma.ph_schoolsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ph_schoolsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ph_schoolsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_schoolsPayload>[];
                };
                upsert: {
                    args: Prisma.ph_schoolsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_schoolsPayload>;
                };
                aggregate: {
                    args: Prisma.Ph_schoolsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePh_schools>;
                };
                groupBy: {
                    args: Prisma.ph_schoolsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Ph_schoolsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ph_schoolsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Ph_schoolsCountAggregateOutputType> | number;
                };
            };
        };
        ph_schools_validate: {
            payload: Prisma.$ph_schools_validatePayload<ExtArgs>;
            fields: Prisma.ph_schools_validateFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ph_schools_validateFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_schools_validatePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ph_schools_validateFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_schools_validatePayload>;
                };
                findFirst: {
                    args: Prisma.ph_schools_validateFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_schools_validatePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ph_schools_validateFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_schools_validatePayload>;
                };
                findMany: {
                    args: Prisma.ph_schools_validateFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_schools_validatePayload>[];
                };
                create: {
                    args: Prisma.ph_schools_validateCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_schools_validatePayload>;
                };
                createMany: {
                    args: Prisma.ph_schools_validateCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ph_schools_validateCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_schools_validatePayload>[];
                };
                delete: {
                    args: Prisma.ph_schools_validateDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_schools_validatePayload>;
                };
                update: {
                    args: Prisma.ph_schools_validateUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_schools_validatePayload>;
                };
                deleteMany: {
                    args: Prisma.ph_schools_validateDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ph_schools_validateUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ph_schools_validateUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_schools_validatePayload>[];
                };
                upsert: {
                    args: Prisma.ph_schools_validateUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_schools_validatePayload>;
                };
                aggregate: {
                    args: Prisma.Ph_schools_validateAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePh_schools_validate>;
                };
                groupBy: {
                    args: Prisma.ph_schools_validateGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Ph_schools_validateGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ph_schools_validateCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Ph_schools_validateCountAggregateOutputType> | number;
                };
            };
        };
        ph_teachers_list: {
            payload: Prisma.$ph_teachers_listPayload<ExtArgs>;
            fields: Prisma.ph_teachers_listFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ph_teachers_listFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_teachers_listPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ph_teachers_listFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_teachers_listPayload>;
                };
                findFirst: {
                    args: Prisma.ph_teachers_listFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_teachers_listPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ph_teachers_listFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_teachers_listPayload>;
                };
                findMany: {
                    args: Prisma.ph_teachers_listFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_teachers_listPayload>[];
                };
                create: {
                    args: Prisma.ph_teachers_listCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_teachers_listPayload>;
                };
                createMany: {
                    args: Prisma.ph_teachers_listCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ph_teachers_listCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_teachers_listPayload>[];
                };
                delete: {
                    args: Prisma.ph_teachers_listDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_teachers_listPayload>;
                };
                update: {
                    args: Prisma.ph_teachers_listUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_teachers_listPayload>;
                };
                deleteMany: {
                    args: Prisma.ph_teachers_listDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ph_teachers_listUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ph_teachers_listUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_teachers_listPayload>[];
                };
                upsert: {
                    args: Prisma.ph_teachers_listUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ph_teachers_listPayload>;
                };
                aggregate: {
                    args: Prisma.Ph_teachers_listAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePh_teachers_list>;
                };
                groupBy: {
                    args: Prisma.ph_teachers_listGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Ph_teachers_listGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ph_teachers_listCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Ph_teachers_listCountAggregateOutputType> | number;
                };
            };
        };
        project_documents: {
            payload: Prisma.$project_documentsPayload<ExtArgs>;
            fields: Prisma.project_documentsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.project_documentsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$project_documentsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.project_documentsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$project_documentsPayload>;
                };
                findFirst: {
                    args: Prisma.project_documentsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$project_documentsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.project_documentsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$project_documentsPayload>;
                };
                findMany: {
                    args: Prisma.project_documentsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$project_documentsPayload>[];
                };
                create: {
                    args: Prisma.project_documentsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$project_documentsPayload>;
                };
                createMany: {
                    args: Prisma.project_documentsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.project_documentsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$project_documentsPayload>[];
                };
                delete: {
                    args: Prisma.project_documentsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$project_documentsPayload>;
                };
                update: {
                    args: Prisma.project_documentsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$project_documentsPayload>;
                };
                deleteMany: {
                    args: Prisma.project_documentsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.project_documentsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.project_documentsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$project_documentsPayload>[];
                };
                upsert: {
                    args: Prisma.project_documentsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$project_documentsPayload>;
                };
                aggregate: {
                    args: Prisma.Project_documentsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProject_documents>;
                };
                groupBy: {
                    args: Prisma.project_documentsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Project_documentsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.project_documentsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Project_documentsCountAggregateOutputType> | number;
                };
            };
        };
        realignments: {
            payload: Prisma.$realignmentsPayload<ExtArgs>;
            fields: Prisma.realignmentsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.realignmentsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$realignmentsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.realignmentsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$realignmentsPayload>;
                };
                findFirst: {
                    args: Prisma.realignmentsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$realignmentsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.realignmentsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$realignmentsPayload>;
                };
                findMany: {
                    args: Prisma.realignmentsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$realignmentsPayload>[];
                };
                create: {
                    args: Prisma.realignmentsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$realignmentsPayload>;
                };
                createMany: {
                    args: Prisma.realignmentsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.realignmentsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$realignmentsPayload>[];
                };
                delete: {
                    args: Prisma.realignmentsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$realignmentsPayload>;
                };
                update: {
                    args: Prisma.realignmentsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$realignmentsPayload>;
                };
                deleteMany: {
                    args: Prisma.realignmentsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.realignmentsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.realignmentsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$realignmentsPayload>[];
                };
                upsert: {
                    args: Prisma.realignmentsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$realignmentsPayload>;
                };
                aggregate: {
                    args: Prisma.RealignmentsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRealignments>;
                };
                groupBy: {
                    args: Prisma.realignmentsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RealignmentsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.realignmentsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RealignmentsCountAggregateOutputType> | number;
                };
            };
        };
        regional_engineer_documents: {
            payload: Prisma.$regional_engineer_documentsPayload<ExtArgs>;
            fields: Prisma.regional_engineer_documentsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.regional_engineer_documentsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_documentsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.regional_engineer_documentsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_documentsPayload>;
                };
                findFirst: {
                    args: Prisma.regional_engineer_documentsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_documentsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.regional_engineer_documentsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_documentsPayload>;
                };
                findMany: {
                    args: Prisma.regional_engineer_documentsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_documentsPayload>[];
                };
                create: {
                    args: Prisma.regional_engineer_documentsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_documentsPayload>;
                };
                createMany: {
                    args: Prisma.regional_engineer_documentsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.regional_engineer_documentsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_documentsPayload>[];
                };
                delete: {
                    args: Prisma.regional_engineer_documentsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_documentsPayload>;
                };
                update: {
                    args: Prisma.regional_engineer_documentsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_documentsPayload>;
                };
                deleteMany: {
                    args: Prisma.regional_engineer_documentsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.regional_engineer_documentsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.regional_engineer_documentsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_documentsPayload>[];
                };
                upsert: {
                    args: Prisma.regional_engineer_documentsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_documentsPayload>;
                };
                aggregate: {
                    args: Prisma.Regional_engineer_documentsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRegional_engineer_documents>;
                };
                groupBy: {
                    args: Prisma.regional_engineer_documentsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Regional_engineer_documentsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.regional_engineer_documentsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Regional_engineer_documentsCountAggregateOutputType> | number;
                };
            };
        };
        regional_engineer_form: {
            payload: Prisma.$regional_engineer_formPayload<ExtArgs>;
            fields: Prisma.regional_engineer_formFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.regional_engineer_formFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_formPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.regional_engineer_formFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_formPayload>;
                };
                findFirst: {
                    args: Prisma.regional_engineer_formFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_formPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.regional_engineer_formFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_formPayload>;
                };
                findMany: {
                    args: Prisma.regional_engineer_formFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_formPayload>[];
                };
                create: {
                    args: Prisma.regional_engineer_formCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_formPayload>;
                };
                createMany: {
                    args: Prisma.regional_engineer_formCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.regional_engineer_formCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_formPayload>[];
                };
                delete: {
                    args: Prisma.regional_engineer_formDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_formPayload>;
                };
                update: {
                    args: Prisma.regional_engineer_formUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_formPayload>;
                };
                deleteMany: {
                    args: Prisma.regional_engineer_formDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.regional_engineer_formUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.regional_engineer_formUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_formPayload>[];
                };
                upsert: {
                    args: Prisma.regional_engineer_formUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_formPayload>;
                };
                aggregate: {
                    args: Prisma.Regional_engineer_formAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRegional_engineer_form>;
                };
                groupBy: {
                    args: Prisma.regional_engineer_formGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Regional_engineer_formGroupByOutputType>[];
                };
                count: {
                    args: Prisma.regional_engineer_formCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Regional_engineer_formCountAggregateOutputType> | number;
                };
            };
        };
        regional_engineer_form_updates: {
            payload: Prisma.$regional_engineer_form_updatesPayload<ExtArgs>;
            fields: Prisma.regional_engineer_form_updatesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.regional_engineer_form_updatesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_form_updatesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.regional_engineer_form_updatesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_form_updatesPayload>;
                };
                findFirst: {
                    args: Prisma.regional_engineer_form_updatesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_form_updatesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.regional_engineer_form_updatesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_form_updatesPayload>;
                };
                findMany: {
                    args: Prisma.regional_engineer_form_updatesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_form_updatesPayload>[];
                };
                create: {
                    args: Prisma.regional_engineer_form_updatesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_form_updatesPayload>;
                };
                createMany: {
                    args: Prisma.regional_engineer_form_updatesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.regional_engineer_form_updatesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_form_updatesPayload>[];
                };
                delete: {
                    args: Prisma.regional_engineer_form_updatesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_form_updatesPayload>;
                };
                update: {
                    args: Prisma.regional_engineer_form_updatesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_form_updatesPayload>;
                };
                deleteMany: {
                    args: Prisma.regional_engineer_form_updatesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.regional_engineer_form_updatesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.regional_engineer_form_updatesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_form_updatesPayload>[];
                };
                upsert: {
                    args: Prisma.regional_engineer_form_updatesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_form_updatesPayload>;
                };
                aggregate: {
                    args: Prisma.Regional_engineer_form_updatesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRegional_engineer_form_updates>;
                };
                groupBy: {
                    args: Prisma.regional_engineer_form_updatesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Regional_engineer_form_updatesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.regional_engineer_form_updatesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Regional_engineer_form_updatesCountAggregateOutputType> | number;
                };
            };
        };
        regional_engineer_image: {
            payload: Prisma.$regional_engineer_imagePayload<ExtArgs>;
            fields: Prisma.regional_engineer_imageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.regional_engineer_imageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_imagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.regional_engineer_imageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_imagePayload>;
                };
                findFirst: {
                    args: Prisma.regional_engineer_imageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_imagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.regional_engineer_imageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_imagePayload>;
                };
                findMany: {
                    args: Prisma.regional_engineer_imageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_imagePayload>[];
                };
                create: {
                    args: Prisma.regional_engineer_imageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_imagePayload>;
                };
                createMany: {
                    args: Prisma.regional_engineer_imageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.regional_engineer_imageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_imagePayload>[];
                };
                delete: {
                    args: Prisma.regional_engineer_imageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_imagePayload>;
                };
                update: {
                    args: Prisma.regional_engineer_imageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_imagePayload>;
                };
                deleteMany: {
                    args: Prisma.regional_engineer_imageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.regional_engineer_imageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.regional_engineer_imageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_imagePayload>[];
                };
                upsert: {
                    args: Prisma.regional_engineer_imageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$regional_engineer_imagePayload>;
                };
                aggregate: {
                    args: Prisma.Regional_engineer_imageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRegional_engineer_image>;
                };
                groupBy: {
                    args: Prisma.regional_engineer_imageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Regional_engineer_imageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.regional_engineer_imageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Regional_engineer_imageCountAggregateOutputType> | number;
                };
            };
        };
        school_documents: {
            payload: Prisma.$school_documentsPayload<ExtArgs>;
            fields: Prisma.school_documentsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.school_documentsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_documentsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.school_documentsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_documentsPayload>;
                };
                findFirst: {
                    args: Prisma.school_documentsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_documentsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.school_documentsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_documentsPayload>;
                };
                findMany: {
                    args: Prisma.school_documentsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_documentsPayload>[];
                };
                create: {
                    args: Prisma.school_documentsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_documentsPayload>;
                };
                createMany: {
                    args: Prisma.school_documentsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.school_documentsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_documentsPayload>[];
                };
                delete: {
                    args: Prisma.school_documentsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_documentsPayload>;
                };
                update: {
                    args: Prisma.school_documentsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_documentsPayload>;
                };
                deleteMany: {
                    args: Prisma.school_documentsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.school_documentsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.school_documentsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_documentsPayload>[];
                };
                upsert: {
                    args: Prisma.school_documentsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_documentsPayload>;
                };
                aggregate: {
                    args: Prisma.School_documentsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSchool_documents>;
                };
                groupBy: {
                    args: Prisma.school_documentsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.School_documentsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.school_documentsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.School_documentsCountAggregateOutputType> | number;
                };
            };
        };
        school_location_profiles: {
            payload: Prisma.$school_location_profilesPayload<ExtArgs>;
            fields: Prisma.school_location_profilesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.school_location_profilesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_location_profilesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.school_location_profilesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_location_profilesPayload>;
                };
                findFirst: {
                    args: Prisma.school_location_profilesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_location_profilesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.school_location_profilesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_location_profilesPayload>;
                };
                findMany: {
                    args: Prisma.school_location_profilesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_location_profilesPayload>[];
                };
                create: {
                    args: Prisma.school_location_profilesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_location_profilesPayload>;
                };
                createMany: {
                    args: Prisma.school_location_profilesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.school_location_profilesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_location_profilesPayload>[];
                };
                delete: {
                    args: Prisma.school_location_profilesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_location_profilesPayload>;
                };
                update: {
                    args: Prisma.school_location_profilesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_location_profilesPayload>;
                };
                deleteMany: {
                    args: Prisma.school_location_profilesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.school_location_profilesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.school_location_profilesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_location_profilesPayload>[];
                };
                upsert: {
                    args: Prisma.school_location_profilesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_location_profilesPayload>;
                };
                aggregate: {
                    args: Prisma.School_location_profilesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSchool_location_profiles>;
                };
                groupBy: {
                    args: Prisma.school_location_profilesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.School_location_profilesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.school_location_profilesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.School_location_profilesCountAggregateOutputType> | number;
                };
            };
        };
        school_ownership_docs: {
            payload: Prisma.$school_ownership_docsPayload<ExtArgs>;
            fields: Prisma.school_ownership_docsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.school_ownership_docsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_ownership_docsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.school_ownership_docsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_ownership_docsPayload>;
                };
                findFirst: {
                    args: Prisma.school_ownership_docsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_ownership_docsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.school_ownership_docsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_ownership_docsPayload>;
                };
                findMany: {
                    args: Prisma.school_ownership_docsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_ownership_docsPayload>[];
                };
                create: {
                    args: Prisma.school_ownership_docsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_ownership_docsPayload>;
                };
                createMany: {
                    args: Prisma.school_ownership_docsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.school_ownership_docsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_ownership_docsPayload>[];
                };
                delete: {
                    args: Prisma.school_ownership_docsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_ownership_docsPayload>;
                };
                update: {
                    args: Prisma.school_ownership_docsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_ownership_docsPayload>;
                };
                deleteMany: {
                    args: Prisma.school_ownership_docsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.school_ownership_docsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.school_ownership_docsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_ownership_docsPayload>[];
                };
                upsert: {
                    args: Prisma.school_ownership_docsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_ownership_docsPayload>;
                };
                aggregate: {
                    args: Prisma.School_ownership_docsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSchool_ownership_docs>;
                };
                groupBy: {
                    args: Prisma.school_ownership_docsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.School_ownership_docsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.school_ownership_docsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.School_ownership_docsCountAggregateOutputType> | number;
                };
            };
        };
        school_ownership_records: {
            payload: Prisma.$school_ownership_recordsPayload<ExtArgs>;
            fields: Prisma.school_ownership_recordsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.school_ownership_recordsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_ownership_recordsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.school_ownership_recordsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_ownership_recordsPayload>;
                };
                findFirst: {
                    args: Prisma.school_ownership_recordsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_ownership_recordsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.school_ownership_recordsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_ownership_recordsPayload>;
                };
                findMany: {
                    args: Prisma.school_ownership_recordsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_ownership_recordsPayload>[];
                };
                create: {
                    args: Prisma.school_ownership_recordsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_ownership_recordsPayload>;
                };
                createMany: {
                    args: Prisma.school_ownership_recordsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.school_ownership_recordsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_ownership_recordsPayload>[];
                };
                delete: {
                    args: Prisma.school_ownership_recordsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_ownership_recordsPayload>;
                };
                update: {
                    args: Prisma.school_ownership_recordsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_ownership_recordsPayload>;
                };
                deleteMany: {
                    args: Prisma.school_ownership_recordsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.school_ownership_recordsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.school_ownership_recordsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_ownership_recordsPayload>[];
                };
                upsert: {
                    args: Prisma.school_ownership_recordsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$school_ownership_recordsPayload>;
                };
                aggregate: {
                    args: Prisma.School_ownership_recordsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSchool_ownership_records>;
                };
                groupBy: {
                    args: Prisma.school_ownership_recordsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.School_ownership_recordsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.school_ownership_recordsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.School_ownership_recordsCountAggregateOutputType> | number;
                };
            };
        };
        schools_IERN: {
            payload: Prisma.$schools_IERNPayload<ExtArgs>;
            fields: Prisma.schools_IERNFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.schools_IERNFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$schools_IERNPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.schools_IERNFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$schools_IERNPayload>;
                };
                findFirst: {
                    args: Prisma.schools_IERNFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$schools_IERNPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.schools_IERNFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$schools_IERNPayload>;
                };
                findMany: {
                    args: Prisma.schools_IERNFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$schools_IERNPayload>[];
                };
                create: {
                    args: Prisma.schools_IERNCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$schools_IERNPayload>;
                };
                createMany: {
                    args: Prisma.schools_IERNCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.schools_IERNCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$schools_IERNPayload>[];
                };
                delete: {
                    args: Prisma.schools_IERNDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$schools_IERNPayload>;
                };
                update: {
                    args: Prisma.schools_IERNUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$schools_IERNPayload>;
                };
                deleteMany: {
                    args: Prisma.schools_IERNDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.schools_IERNUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.schools_IERNUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$schools_IERNPayload>[];
                };
                upsert: {
                    args: Prisma.schools_IERNUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$schools_IERNPayload>;
                };
                aggregate: {
                    args: Prisma.Schools_IERNAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSchools_IERN>;
                };
                groupBy: {
                    args: Prisma.schools_IERNGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Schools_IERNGroupByOutputType>[];
                };
                count: {
                    args: Prisma.schools_IERNCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Schools_IERNCountAggregateOutputType> | number;
                };
            };
        };
        schools_iern_archives: {
            payload: Prisma.$schools_iern_archivesPayload<ExtArgs>;
            fields: Prisma.schools_iern_archivesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.schools_iern_archivesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$schools_iern_archivesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.schools_iern_archivesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$schools_iern_archivesPayload>;
                };
                findFirst: {
                    args: Prisma.schools_iern_archivesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$schools_iern_archivesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.schools_iern_archivesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$schools_iern_archivesPayload>;
                };
                findMany: {
                    args: Prisma.schools_iern_archivesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$schools_iern_archivesPayload>[];
                };
                create: {
                    args: Prisma.schools_iern_archivesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$schools_iern_archivesPayload>;
                };
                createMany: {
                    args: Prisma.schools_iern_archivesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.schools_iern_archivesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$schools_iern_archivesPayload>[];
                };
                delete: {
                    args: Prisma.schools_iern_archivesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$schools_iern_archivesPayload>;
                };
                update: {
                    args: Prisma.schools_iern_archivesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$schools_iern_archivesPayload>;
                };
                deleteMany: {
                    args: Prisma.schools_iern_archivesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.schools_iern_archivesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.schools_iern_archivesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$schools_iern_archivesPayload>[];
                };
                upsert: {
                    args: Prisma.schools_iern_archivesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$schools_iern_archivesPayload>;
                };
                aggregate: {
                    args: Prisma.Schools_iern_archivesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSchools_iern_archives>;
                };
                groupBy: {
                    args: Prisma.schools_iern_archivesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Schools_iern_archivesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.schools_iern_archivesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Schools_iern_archivesCountAggregateOutputType> | number;
                };
            };
        };
        settings: {
            payload: Prisma.$settingsPayload<ExtArgs>;
            fields: Prisma.settingsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.settingsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$settingsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.settingsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$settingsPayload>;
                };
                findFirst: {
                    args: Prisma.settingsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$settingsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.settingsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$settingsPayload>;
                };
                findMany: {
                    args: Prisma.settingsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$settingsPayload>[];
                };
                create: {
                    args: Prisma.settingsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$settingsPayload>;
                };
                createMany: {
                    args: Prisma.settingsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.settingsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$settingsPayload>[];
                };
                delete: {
                    args: Prisma.settingsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$settingsPayload>;
                };
                update: {
                    args: Prisma.settingsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$settingsPayload>;
                };
                deleteMany: {
                    args: Prisma.settingsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.settingsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.settingsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$settingsPayload>[];
                };
                upsert: {
                    args: Prisma.settingsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$settingsPayload>;
                };
                aggregate: {
                    args: Prisma.SettingsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSettings>;
                };
                groupBy: {
                    args: Prisma.settingsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SettingsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.settingsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SettingsCountAggregateOutputType> | number;
                };
            };
        };
        siif_activities: {
            payload: Prisma.$siif_activitiesPayload<ExtArgs>;
            fields: Prisma.siif_activitiesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.siif_activitiesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_activitiesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.siif_activitiesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_activitiesPayload>;
                };
                findFirst: {
                    args: Prisma.siif_activitiesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_activitiesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.siif_activitiesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_activitiesPayload>;
                };
                findMany: {
                    args: Prisma.siif_activitiesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_activitiesPayload>[];
                };
                create: {
                    args: Prisma.siif_activitiesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_activitiesPayload>;
                };
                createMany: {
                    args: Prisma.siif_activitiesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.siif_activitiesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_activitiesPayload>[];
                };
                delete: {
                    args: Prisma.siif_activitiesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_activitiesPayload>;
                };
                update: {
                    args: Prisma.siif_activitiesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_activitiesPayload>;
                };
                deleteMany: {
                    args: Prisma.siif_activitiesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.siif_activitiesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.siif_activitiesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_activitiesPayload>[];
                };
                upsert: {
                    args: Prisma.siif_activitiesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_activitiesPayload>;
                };
                aggregate: {
                    args: Prisma.Siif_activitiesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSiif_activities>;
                };
                groupBy: {
                    args: Prisma.siif_activitiesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Siif_activitiesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.siif_activitiesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Siif_activitiesCountAggregateOutputType> | number;
                };
            };
        };
        siif_allocations: {
            payload: Prisma.$siif_allocationsPayload<ExtArgs>;
            fields: Prisma.siif_allocationsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.siif_allocationsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_allocationsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.siif_allocationsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_allocationsPayload>;
                };
                findFirst: {
                    args: Prisma.siif_allocationsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_allocationsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.siif_allocationsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_allocationsPayload>;
                };
                findMany: {
                    args: Prisma.siif_allocationsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_allocationsPayload>[];
                };
                create: {
                    args: Prisma.siif_allocationsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_allocationsPayload>;
                };
                createMany: {
                    args: Prisma.siif_allocationsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.siif_allocationsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_allocationsPayload>[];
                };
                delete: {
                    args: Prisma.siif_allocationsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_allocationsPayload>;
                };
                update: {
                    args: Prisma.siif_allocationsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_allocationsPayload>;
                };
                deleteMany: {
                    args: Prisma.siif_allocationsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.siif_allocationsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.siif_allocationsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_allocationsPayload>[];
                };
                upsert: {
                    args: Prisma.siif_allocationsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_allocationsPayload>;
                };
                aggregate: {
                    args: Prisma.Siif_allocationsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSiif_allocations>;
                };
                groupBy: {
                    args: Prisma.siif_allocationsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Siif_allocationsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.siif_allocationsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Siif_allocationsCountAggregateOutputType> | number;
                };
            };
        };
        siif_expenses: {
            payload: Prisma.$siif_expensesPayload<ExtArgs>;
            fields: Prisma.siif_expensesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.siif_expensesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_expensesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.siif_expensesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_expensesPayload>;
                };
                findFirst: {
                    args: Prisma.siif_expensesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_expensesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.siif_expensesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_expensesPayload>;
                };
                findMany: {
                    args: Prisma.siif_expensesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_expensesPayload>[];
                };
                create: {
                    args: Prisma.siif_expensesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_expensesPayload>;
                };
                createMany: {
                    args: Prisma.siif_expensesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.siif_expensesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_expensesPayload>[];
                };
                delete: {
                    args: Prisma.siif_expensesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_expensesPayload>;
                };
                update: {
                    args: Prisma.siif_expensesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_expensesPayload>;
                };
                deleteMany: {
                    args: Prisma.siif_expensesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.siif_expensesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.siif_expensesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_expensesPayload>[];
                };
                upsert: {
                    args: Prisma.siif_expensesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_expensesPayload>;
                };
                aggregate: {
                    args: Prisma.Siif_expensesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSiif_expenses>;
                };
                groupBy: {
                    args: Prisma.siif_expensesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Siif_expensesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.siif_expensesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Siif_expensesCountAggregateOutputType> | number;
                };
            };
        };
        siif_interventions: {
            payload: Prisma.$siif_interventionsPayload<ExtArgs>;
            fields: Prisma.siif_interventionsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.siif_interventionsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_interventionsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.siif_interventionsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_interventionsPayload>;
                };
                findFirst: {
                    args: Prisma.siif_interventionsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_interventionsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.siif_interventionsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_interventionsPayload>;
                };
                findMany: {
                    args: Prisma.siif_interventionsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_interventionsPayload>[];
                };
                create: {
                    args: Prisma.siif_interventionsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_interventionsPayload>;
                };
                createMany: {
                    args: Prisma.siif_interventionsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.siif_interventionsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_interventionsPayload>[];
                };
                delete: {
                    args: Prisma.siif_interventionsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_interventionsPayload>;
                };
                update: {
                    args: Prisma.siif_interventionsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_interventionsPayload>;
                };
                deleteMany: {
                    args: Prisma.siif_interventionsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.siif_interventionsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.siif_interventionsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_interventionsPayload>[];
                };
                upsert: {
                    args: Prisma.siif_interventionsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_interventionsPayload>;
                };
                aggregate: {
                    args: Prisma.Siif_interventionsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSiif_interventions>;
                };
                groupBy: {
                    args: Prisma.siif_interventionsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Siif_interventionsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.siif_interventionsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Siif_interventionsCountAggregateOutputType> | number;
                };
            };
        };
        siif_ro_coordination: {
            payload: Prisma.$siif_ro_coordinationPayload<ExtArgs>;
            fields: Prisma.siif_ro_coordinationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.siif_ro_coordinationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_ro_coordinationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.siif_ro_coordinationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_ro_coordinationPayload>;
                };
                findFirst: {
                    args: Prisma.siif_ro_coordinationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_ro_coordinationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.siif_ro_coordinationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_ro_coordinationPayload>;
                };
                findMany: {
                    args: Prisma.siif_ro_coordinationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_ro_coordinationPayload>[];
                };
                create: {
                    args: Prisma.siif_ro_coordinationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_ro_coordinationPayload>;
                };
                createMany: {
                    args: Prisma.siif_ro_coordinationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.siif_ro_coordinationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_ro_coordinationPayload>[];
                };
                delete: {
                    args: Prisma.siif_ro_coordinationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_ro_coordinationPayload>;
                };
                update: {
                    args: Prisma.siif_ro_coordinationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_ro_coordinationPayload>;
                };
                deleteMany: {
                    args: Prisma.siif_ro_coordinationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.siif_ro_coordinationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.siif_ro_coordinationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_ro_coordinationPayload>[];
                };
                upsert: {
                    args: Prisma.siif_ro_coordinationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_ro_coordinationPayload>;
                };
                aggregate: {
                    args: Prisma.Siif_ro_coordinationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSiif_ro_coordination>;
                };
                groupBy: {
                    args: Prisma.siif_ro_coordinationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Siif_ro_coordinationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.siif_ro_coordinationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Siif_ro_coordinationCountAggregateOutputType> | number;
                };
            };
        };
        siif_submissions: {
            payload: Prisma.$siif_submissionsPayload<ExtArgs>;
            fields: Prisma.siif_submissionsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.siif_submissionsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_submissionsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.siif_submissionsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_submissionsPayload>;
                };
                findFirst: {
                    args: Prisma.siif_submissionsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_submissionsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.siif_submissionsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_submissionsPayload>;
                };
                findMany: {
                    args: Prisma.siif_submissionsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_submissionsPayload>[];
                };
                create: {
                    args: Prisma.siif_submissionsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_submissionsPayload>;
                };
                createMany: {
                    args: Prisma.siif_submissionsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.siif_submissionsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_submissionsPayload>[];
                };
                delete: {
                    args: Prisma.siif_submissionsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_submissionsPayload>;
                };
                update: {
                    args: Prisma.siif_submissionsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_submissionsPayload>;
                };
                deleteMany: {
                    args: Prisma.siif_submissionsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.siif_submissionsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.siif_submissionsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_submissionsPayload>[];
                };
                upsert: {
                    args: Prisma.siif_submissionsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_submissionsPayload>;
                };
                aggregate: {
                    args: Prisma.Siif_submissionsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSiif_submissions>;
                };
                groupBy: {
                    args: Prisma.siif_submissionsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Siif_submissionsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.siif_submissionsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Siif_submissionsCountAggregateOutputType> | number;
                };
            };
        };
        siif_utilization: {
            payload: Prisma.$siif_utilizationPayload<ExtArgs>;
            fields: Prisma.siif_utilizationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.siif_utilizationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_utilizationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.siif_utilizationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_utilizationPayload>;
                };
                findFirst: {
                    args: Prisma.siif_utilizationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_utilizationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.siif_utilizationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_utilizationPayload>;
                };
                findMany: {
                    args: Prisma.siif_utilizationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_utilizationPayload>[];
                };
                create: {
                    args: Prisma.siif_utilizationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_utilizationPayload>;
                };
                createMany: {
                    args: Prisma.siif_utilizationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.siif_utilizationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_utilizationPayload>[];
                };
                delete: {
                    args: Prisma.siif_utilizationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_utilizationPayload>;
                };
                update: {
                    args: Prisma.siif_utilizationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_utilizationPayload>;
                };
                deleteMany: {
                    args: Prisma.siif_utilizationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.siif_utilizationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.siif_utilizationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_utilizationPayload>[];
                };
                upsert: {
                    args: Prisma.siif_utilizationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$siif_utilizationPayload>;
                };
                aggregate: {
                    args: Prisma.Siif_utilizationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSiif_utilization>;
                };
                groupBy: {
                    args: Prisma.siif_utilizationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Siif_utilizationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.siif_utilizationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Siif_utilizationCountAggregateOutputType> | number;
                };
            };
        };
        stride_users: {
            payload: Prisma.$stride_usersPayload<ExtArgs>;
            fields: Prisma.stride_usersFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.stride_usersFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$stride_usersPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.stride_usersFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$stride_usersPayload>;
                };
                findFirst: {
                    args: Prisma.stride_usersFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$stride_usersPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.stride_usersFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$stride_usersPayload>;
                };
                findMany: {
                    args: Prisma.stride_usersFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$stride_usersPayload>[];
                };
                create: {
                    args: Prisma.stride_usersCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$stride_usersPayload>;
                };
                createMany: {
                    args: Prisma.stride_usersCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.stride_usersCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$stride_usersPayload>[];
                };
                delete: {
                    args: Prisma.stride_usersDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$stride_usersPayload>;
                };
                update: {
                    args: Prisma.stride_usersUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$stride_usersPayload>;
                };
                deleteMany: {
                    args: Prisma.stride_usersDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.stride_usersUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.stride_usersUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$stride_usersPayload>[];
                };
                upsert: {
                    args: Prisma.stride_usersUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$stride_usersPayload>;
                };
                aggregate: {
                    args: Prisma.Stride_usersAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateStride_users>;
                };
                groupBy: {
                    args: Prisma.stride_usersGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Stride_usersGroupByOutputType>[];
                };
                count: {
                    args: Prisma.stride_usersCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Stride_usersCountAggregateOutputType> | number;
                };
            };
        };
        super_user: {
            payload: Prisma.$super_userPayload<ExtArgs>;
            fields: Prisma.super_userFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.super_userFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$super_userPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.super_userFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$super_userPayload>;
                };
                findFirst: {
                    args: Prisma.super_userFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$super_userPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.super_userFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$super_userPayload>;
                };
                findMany: {
                    args: Prisma.super_userFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$super_userPayload>[];
                };
                create: {
                    args: Prisma.super_userCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$super_userPayload>;
                };
                createMany: {
                    args: Prisma.super_userCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.super_userCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$super_userPayload>[];
                };
                delete: {
                    args: Prisma.super_userDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$super_userPayload>;
                };
                update: {
                    args: Prisma.super_userUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$super_userPayload>;
                };
                deleteMany: {
                    args: Prisma.super_userDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.super_userUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.super_userUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$super_userPayload>[];
                };
                upsert: {
                    args: Prisma.super_userUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$super_userPayload>;
                };
                aggregate: {
                    args: Prisma.Super_userAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSuper_user>;
                };
                groupBy: {
                    args: Prisma.super_userGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Super_userGroupByOutputType>[];
                };
                count: {
                    args: Prisma.super_userCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Super_userCountAggregateOutputType> | number;
                };
            };
        };
        system_feedback: {
            payload: Prisma.$system_feedbackPayload<ExtArgs>;
            fields: Prisma.system_feedbackFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.system_feedbackFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$system_feedbackPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.system_feedbackFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$system_feedbackPayload>;
                };
                findFirst: {
                    args: Prisma.system_feedbackFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$system_feedbackPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.system_feedbackFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$system_feedbackPayload>;
                };
                findMany: {
                    args: Prisma.system_feedbackFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$system_feedbackPayload>[];
                };
                create: {
                    args: Prisma.system_feedbackCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$system_feedbackPayload>;
                };
                createMany: {
                    args: Prisma.system_feedbackCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.system_feedbackCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$system_feedbackPayload>[];
                };
                delete: {
                    args: Prisma.system_feedbackDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$system_feedbackPayload>;
                };
                update: {
                    args: Prisma.system_feedbackUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$system_feedbackPayload>;
                };
                deleteMany: {
                    args: Prisma.system_feedbackDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.system_feedbackUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.system_feedbackUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$system_feedbackPayload>[];
                };
                upsert: {
                    args: Prisma.system_feedbackUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$system_feedbackPayload>;
                };
                aggregate: {
                    args: Prisma.System_feedbackAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSystem_feedback>;
                };
                groupBy: {
                    args: Prisma.system_feedbackGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.System_feedbackGroupByOutputType>[];
                };
                count: {
                    args: Prisma.system_feedbackCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.System_feedbackCountAggregateOutputType> | number;
                };
            };
        };
        system_settings: {
            payload: Prisma.$system_settingsPayload<ExtArgs>;
            fields: Prisma.system_settingsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.system_settingsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$system_settingsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.system_settingsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$system_settingsPayload>;
                };
                findFirst: {
                    args: Prisma.system_settingsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$system_settingsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.system_settingsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$system_settingsPayload>;
                };
                findMany: {
                    args: Prisma.system_settingsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$system_settingsPayload>[];
                };
                create: {
                    args: Prisma.system_settingsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$system_settingsPayload>;
                };
                createMany: {
                    args: Prisma.system_settingsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.system_settingsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$system_settingsPayload>[];
                };
                delete: {
                    args: Prisma.system_settingsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$system_settingsPayload>;
                };
                update: {
                    args: Prisma.system_settingsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$system_settingsPayload>;
                };
                deleteMany: {
                    args: Prisma.system_settingsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.system_settingsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.system_settingsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$system_settingsPayload>[];
                };
                upsert: {
                    args: Prisma.system_settingsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$system_settingsPayload>;
                };
                aggregate: {
                    args: Prisma.System_settingsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSystem_settings>;
                };
                groupBy: {
                    args: Prisma.system_settingsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.System_settingsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.system_settingsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.System_settingsCountAggregateOutputType> | number;
                };
            };
        };
        teaching_personnel: {
            payload: Prisma.$teaching_personnelPayload<ExtArgs>;
            fields: Prisma.teaching_personnelFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.teaching_personnelFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$teaching_personnelPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.teaching_personnelFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$teaching_personnelPayload>;
                };
                findFirst: {
                    args: Prisma.teaching_personnelFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$teaching_personnelPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.teaching_personnelFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$teaching_personnelPayload>;
                };
                findMany: {
                    args: Prisma.teaching_personnelFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$teaching_personnelPayload>[];
                };
                create: {
                    args: Prisma.teaching_personnelCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$teaching_personnelPayload>;
                };
                createMany: {
                    args: Prisma.teaching_personnelCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.teaching_personnelCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$teaching_personnelPayload>[];
                };
                delete: {
                    args: Prisma.teaching_personnelDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$teaching_personnelPayload>;
                };
                update: {
                    args: Prisma.teaching_personnelUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$teaching_personnelPayload>;
                };
                deleteMany: {
                    args: Prisma.teaching_personnelDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.teaching_personnelUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.teaching_personnelUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$teaching_personnelPayload>[];
                };
                upsert: {
                    args: Prisma.teaching_personnelUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$teaching_personnelPayload>;
                };
                aggregate: {
                    args: Prisma.Teaching_personnelAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTeaching_personnel>;
                };
                groupBy: {
                    args: Prisma.teaching_personnelGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Teaching_personnelGroupByOutputType>[];
                };
                count: {
                    args: Prisma.teaching_personnelCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Teaching_personnelCountAggregateOutputType> | number;
                };
            };
        };
        third_level_official_masterlist: {
            payload: Prisma.$third_level_official_masterlistPayload<ExtArgs>;
            fields: Prisma.third_level_official_masterlistFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.third_level_official_masterlistFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_official_masterlistPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.third_level_official_masterlistFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_official_masterlistPayload>;
                };
                findFirst: {
                    args: Prisma.third_level_official_masterlistFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_official_masterlistPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.third_level_official_masterlistFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_official_masterlistPayload>;
                };
                findMany: {
                    args: Prisma.third_level_official_masterlistFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_official_masterlistPayload>[];
                };
                create: {
                    args: Prisma.third_level_official_masterlistCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_official_masterlistPayload>;
                };
                createMany: {
                    args: Prisma.third_level_official_masterlistCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.third_level_official_masterlistCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_official_masterlistPayload>[];
                };
                delete: {
                    args: Prisma.third_level_official_masterlistDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_official_masterlistPayload>;
                };
                update: {
                    args: Prisma.third_level_official_masterlistUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_official_masterlistPayload>;
                };
                deleteMany: {
                    args: Prisma.third_level_official_masterlistDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.third_level_official_masterlistUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.third_level_official_masterlistUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_official_masterlistPayload>[];
                };
                upsert: {
                    args: Prisma.third_level_official_masterlistUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_official_masterlistPayload>;
                };
                aggregate: {
                    args: Prisma.Third_level_official_masterlistAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateThird_level_official_masterlist>;
                };
                groupBy: {
                    args: Prisma.third_level_official_masterlistGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Third_level_official_masterlistGroupByOutputType>[];
                };
                count: {
                    args: Prisma.third_level_official_masterlistCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Third_level_official_masterlistCountAggregateOutputType> | number;
                };
            };
        };
        third_level_officials_masterlist: {
            payload: Prisma.$third_level_officials_masterlistPayload<ExtArgs>;
            fields: Prisma.third_level_officials_masterlistFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.third_level_officials_masterlistFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_masterlistPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.third_level_officials_masterlistFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_masterlistPayload>;
                };
                findFirst: {
                    args: Prisma.third_level_officials_masterlistFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_masterlistPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.third_level_officials_masterlistFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_masterlistPayload>;
                };
                findMany: {
                    args: Prisma.third_level_officials_masterlistFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_masterlistPayload>[];
                };
                create: {
                    args: Prisma.third_level_officials_masterlistCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_masterlistPayload>;
                };
                createMany: {
                    args: Prisma.third_level_officials_masterlistCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.third_level_officials_masterlistCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_masterlistPayload>[];
                };
                delete: {
                    args: Prisma.third_level_officials_masterlistDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_masterlistPayload>;
                };
                update: {
                    args: Prisma.third_level_officials_masterlistUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_masterlistPayload>;
                };
                deleteMany: {
                    args: Prisma.third_level_officials_masterlistDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.third_level_officials_masterlistUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.third_level_officials_masterlistUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_masterlistPayload>[];
                };
                upsert: {
                    args: Prisma.third_level_officials_masterlistUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_masterlistPayload>;
                };
                aggregate: {
                    args: Prisma.Third_level_officials_masterlistAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateThird_level_officials_masterlist>;
                };
                groupBy: {
                    args: Prisma.third_level_officials_masterlistGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Third_level_officials_masterlistGroupByOutputType>[];
                };
                count: {
                    args: Prisma.third_level_officials_masterlistCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Third_level_officials_masterlistCountAggregateOutputType> | number;
                };
            };
        };
        third_level_officials_profiles: {
            payload: Prisma.$third_level_officials_profilesPayload<ExtArgs>;
            fields: Prisma.third_level_officials_profilesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.third_level_officials_profilesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_profilesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.third_level_officials_profilesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_profilesPayload>;
                };
                findFirst: {
                    args: Prisma.third_level_officials_profilesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_profilesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.third_level_officials_profilesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_profilesPayload>;
                };
                findMany: {
                    args: Prisma.third_level_officials_profilesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_profilesPayload>[];
                };
                create: {
                    args: Prisma.third_level_officials_profilesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_profilesPayload>;
                };
                createMany: {
                    args: Prisma.third_level_officials_profilesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.third_level_officials_profilesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_profilesPayload>[];
                };
                delete: {
                    args: Prisma.third_level_officials_profilesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_profilesPayload>;
                };
                update: {
                    args: Prisma.third_level_officials_profilesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_profilesPayload>;
                };
                deleteMany: {
                    args: Prisma.third_level_officials_profilesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.third_level_officials_profilesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.third_level_officials_profilesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_profilesPayload>[];
                };
                upsert: {
                    args: Prisma.third_level_officials_profilesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_profilesPayload>;
                };
                aggregate: {
                    args: Prisma.Third_level_officials_profilesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateThird_level_officials_profiles>;
                };
                groupBy: {
                    args: Prisma.third_level_officials_profilesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Third_level_officials_profilesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.third_level_officials_profilesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Third_level_officials_profilesCountAggregateOutputType> | number;
                };
            };
        };
        third_level_officials_profiling_application: {
            payload: Prisma.$third_level_officials_profiling_applicationPayload<ExtArgs>;
            fields: Prisma.third_level_officials_profiling_applicationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.third_level_officials_profiling_applicationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_profiling_applicationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.third_level_officials_profiling_applicationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_profiling_applicationPayload>;
                };
                findFirst: {
                    args: Prisma.third_level_officials_profiling_applicationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_profiling_applicationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.third_level_officials_profiling_applicationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_profiling_applicationPayload>;
                };
                findMany: {
                    args: Prisma.third_level_officials_profiling_applicationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_profiling_applicationPayload>[];
                };
                create: {
                    args: Prisma.third_level_officials_profiling_applicationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_profiling_applicationPayload>;
                };
                createMany: {
                    args: Prisma.third_level_officials_profiling_applicationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.third_level_officials_profiling_applicationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_profiling_applicationPayload>[];
                };
                delete: {
                    args: Prisma.third_level_officials_profiling_applicationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_profiling_applicationPayload>;
                };
                update: {
                    args: Prisma.third_level_officials_profiling_applicationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_profiling_applicationPayload>;
                };
                deleteMany: {
                    args: Prisma.third_level_officials_profiling_applicationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.third_level_officials_profiling_applicationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.third_level_officials_profiling_applicationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_profiling_applicationPayload>[];
                };
                upsert: {
                    args: Prisma.third_level_officials_profiling_applicationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_profiling_applicationPayload>;
                };
                aggregate: {
                    args: Prisma.Third_level_officials_profiling_applicationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateThird_level_officials_profiling_application>;
                };
                groupBy: {
                    args: Prisma.third_level_officials_profiling_applicationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Third_level_officials_profiling_applicationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.third_level_officials_profiling_applicationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Third_level_officials_profiling_applicationCountAggregateOutputType> | number;
                };
            };
        };
        third_level_officials_updates: {
            payload: Prisma.$third_level_officials_updatesPayload<ExtArgs>;
            fields: Prisma.third_level_officials_updatesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.third_level_officials_updatesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_updatesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.third_level_officials_updatesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_updatesPayload>;
                };
                findFirst: {
                    args: Prisma.third_level_officials_updatesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_updatesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.third_level_officials_updatesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_updatesPayload>;
                };
                findMany: {
                    args: Prisma.third_level_officials_updatesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_updatesPayload>[];
                };
                create: {
                    args: Prisma.third_level_officials_updatesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_updatesPayload>;
                };
                createMany: {
                    args: Prisma.third_level_officials_updatesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.third_level_officials_updatesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_updatesPayload>[];
                };
                delete: {
                    args: Prisma.third_level_officials_updatesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_updatesPayload>;
                };
                update: {
                    args: Prisma.third_level_officials_updatesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_updatesPayload>;
                };
                deleteMany: {
                    args: Prisma.third_level_officials_updatesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.third_level_officials_updatesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.third_level_officials_updatesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_updatesPayload>[];
                };
                upsert: {
                    args: Prisma.third_level_officials_updatesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$third_level_officials_updatesPayload>;
                };
                aggregate: {
                    args: Prisma.Third_level_officials_updatesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateThird_level_officials_updates>;
                };
                groupBy: {
                    args: Prisma.third_level_officials_updatesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Third_level_officials_updatesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.third_level_officials_updatesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Third_level_officials_updatesCountAggregateOutputType> | number;
                };
            };
        };
        ticket_announcements: {
            payload: Prisma.$ticket_announcementsPayload<ExtArgs>;
            fields: Prisma.ticket_announcementsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ticket_announcementsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ticket_announcementsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ticket_announcementsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ticket_announcementsPayload>;
                };
                findFirst: {
                    args: Prisma.ticket_announcementsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ticket_announcementsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ticket_announcementsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ticket_announcementsPayload>;
                };
                findMany: {
                    args: Prisma.ticket_announcementsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ticket_announcementsPayload>[];
                };
                create: {
                    args: Prisma.ticket_announcementsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ticket_announcementsPayload>;
                };
                createMany: {
                    args: Prisma.ticket_announcementsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ticket_announcementsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ticket_announcementsPayload>[];
                };
                delete: {
                    args: Prisma.ticket_announcementsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ticket_announcementsPayload>;
                };
                update: {
                    args: Prisma.ticket_announcementsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ticket_announcementsPayload>;
                };
                deleteMany: {
                    args: Prisma.ticket_announcementsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ticket_announcementsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ticket_announcementsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ticket_announcementsPayload>[];
                };
                upsert: {
                    args: Prisma.ticket_announcementsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ticket_announcementsPayload>;
                };
                aggregate: {
                    args: Prisma.Ticket_announcementsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTicket_announcements>;
                };
                groupBy: {
                    args: Prisma.ticket_announcementsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Ticket_announcementsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ticket_announcementsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Ticket_announcementsCountAggregateOutputType> | number;
                };
            };
        };
        tranche_fund: {
            payload: Prisma.$tranche_fundPayload<ExtArgs>;
            fields: Prisma.tranche_fundFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.tranche_fundFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tranche_fundPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.tranche_fundFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tranche_fundPayload>;
                };
                findFirst: {
                    args: Prisma.tranche_fundFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tranche_fundPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.tranche_fundFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tranche_fundPayload>;
                };
                findMany: {
                    args: Prisma.tranche_fundFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tranche_fundPayload>[];
                };
                create: {
                    args: Prisma.tranche_fundCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tranche_fundPayload>;
                };
                createMany: {
                    args: Prisma.tranche_fundCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.tranche_fundCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tranche_fundPayload>[];
                };
                delete: {
                    args: Prisma.tranche_fundDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tranche_fundPayload>;
                };
                update: {
                    args: Prisma.tranche_fundUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tranche_fundPayload>;
                };
                deleteMany: {
                    args: Prisma.tranche_fundDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.tranche_fundUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.tranche_fundUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tranche_fundPayload>[];
                };
                upsert: {
                    args: Prisma.tranche_fundUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tranche_fundPayload>;
                };
                aggregate: {
                    args: Prisma.Tranche_fundAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTranche_fund>;
                };
                groupBy: {
                    args: Prisma.tranche_fundGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Tranche_fundGroupByOutputType>[];
                };
                count: {
                    args: Prisma.tranche_fundCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Tranche_fundCountAggregateOutputType> | number;
                };
            };
        };
        unified_binaries: {
            payload: Prisma.$unified_binariesPayload<ExtArgs>;
            fields: Prisma.unified_binariesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.unified_binariesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unified_binariesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.unified_binariesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unified_binariesPayload>;
                };
                findFirst: {
                    args: Prisma.unified_binariesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unified_binariesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.unified_binariesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unified_binariesPayload>;
                };
                findMany: {
                    args: Prisma.unified_binariesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unified_binariesPayload>[];
                };
                create: {
                    args: Prisma.unified_binariesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unified_binariesPayload>;
                };
                createMany: {
                    args: Prisma.unified_binariesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.unified_binariesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unified_binariesPayload>[];
                };
                delete: {
                    args: Prisma.unified_binariesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unified_binariesPayload>;
                };
                update: {
                    args: Prisma.unified_binariesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unified_binariesPayload>;
                };
                deleteMany: {
                    args: Prisma.unified_binariesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.unified_binariesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.unified_binariesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unified_binariesPayload>[];
                };
                upsert: {
                    args: Prisma.unified_binariesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unified_binariesPayload>;
                };
                aggregate: {
                    args: Prisma.Unified_binariesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUnified_binaries>;
                };
                groupBy: {
                    args: Prisma.unified_binariesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unified_binariesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.unified_binariesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unified_binariesCountAggregateOutputType> | number;
                };
            };
        };
        unit1_school_identity: {
            payload: Prisma.$unit1_school_identityPayload<ExtArgs>;
            fields: Prisma.unit1_school_identityFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.unit1_school_identityFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit1_school_identityPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.unit1_school_identityFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit1_school_identityPayload>;
                };
                findFirst: {
                    args: Prisma.unit1_school_identityFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit1_school_identityPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.unit1_school_identityFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit1_school_identityPayload>;
                };
                findMany: {
                    args: Prisma.unit1_school_identityFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit1_school_identityPayload>[];
                };
                create: {
                    args: Prisma.unit1_school_identityCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit1_school_identityPayload>;
                };
                createMany: {
                    args: Prisma.unit1_school_identityCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.unit1_school_identityCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit1_school_identityPayload>[];
                };
                delete: {
                    args: Prisma.unit1_school_identityDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit1_school_identityPayload>;
                };
                update: {
                    args: Prisma.unit1_school_identityUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit1_school_identityPayload>;
                };
                deleteMany: {
                    args: Prisma.unit1_school_identityDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.unit1_school_identityUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.unit1_school_identityUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit1_school_identityPayload>[];
                };
                upsert: {
                    args: Prisma.unit1_school_identityUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit1_school_identityPayload>;
                };
                aggregate: {
                    args: Prisma.Unit1_school_identityAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUnit1_school_identity>;
                };
                groupBy: {
                    args: Prisma.unit1_school_identityGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit1_school_identityGroupByOutputType>[];
                };
                count: {
                    args: Prisma.unit1_school_identityCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit1_school_identityCountAggregateOutputType> | number;
                };
            };
        };
        unit2_school_learners: {
            payload: Prisma.$unit2_school_learnersPayload<ExtArgs>;
            fields: Prisma.unit2_school_learnersFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.unit2_school_learnersFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit2_school_learnersPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.unit2_school_learnersFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit2_school_learnersPayload>;
                };
                findFirst: {
                    args: Prisma.unit2_school_learnersFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit2_school_learnersPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.unit2_school_learnersFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit2_school_learnersPayload>;
                };
                findMany: {
                    args: Prisma.unit2_school_learnersFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit2_school_learnersPayload>[];
                };
                create: {
                    args: Prisma.unit2_school_learnersCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit2_school_learnersPayload>;
                };
                createMany: {
                    args: Prisma.unit2_school_learnersCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.unit2_school_learnersCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit2_school_learnersPayload>[];
                };
                delete: {
                    args: Prisma.unit2_school_learnersDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit2_school_learnersPayload>;
                };
                update: {
                    args: Prisma.unit2_school_learnersUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit2_school_learnersPayload>;
                };
                deleteMany: {
                    args: Prisma.unit2_school_learnersDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.unit2_school_learnersUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.unit2_school_learnersUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit2_school_learnersPayload>[];
                };
                upsert: {
                    args: Prisma.unit2_school_learnersUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit2_school_learnersPayload>;
                };
                aggregate: {
                    args: Prisma.Unit2_school_learnersAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUnit2_school_learners>;
                };
                groupBy: {
                    args: Prisma.unit2_school_learnersGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit2_school_learnersGroupByOutputType>[];
                };
                count: {
                    args: Prisma.unit2_school_learnersCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit2_school_learnersCountAggregateOutputType> | number;
                };
            };
        };
        unit3_organized_classes: {
            payload: Prisma.$unit3_organized_classesPayload<ExtArgs>;
            fields: Prisma.unit3_organized_classesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.unit3_organized_classesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit3_organized_classesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.unit3_organized_classesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit3_organized_classesPayload>;
                };
                findFirst: {
                    args: Prisma.unit3_organized_classesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit3_organized_classesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.unit3_organized_classesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit3_organized_classesPayload>;
                };
                findMany: {
                    args: Prisma.unit3_organized_classesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit3_organized_classesPayload>[];
                };
                create: {
                    args: Prisma.unit3_organized_classesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit3_organized_classesPayload>;
                };
                createMany: {
                    args: Prisma.unit3_organized_classesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.unit3_organized_classesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit3_organized_classesPayload>[];
                };
                delete: {
                    args: Prisma.unit3_organized_classesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit3_organized_classesPayload>;
                };
                update: {
                    args: Prisma.unit3_organized_classesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit3_organized_classesPayload>;
                };
                deleteMany: {
                    args: Prisma.unit3_organized_classesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.unit3_organized_classesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.unit3_organized_classesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit3_organized_classesPayload>[];
                };
                upsert: {
                    args: Prisma.unit3_organized_classesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit3_organized_classesPayload>;
                };
                aggregate: {
                    args: Prisma.Unit3_organized_classesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUnit3_organized_classes>;
                };
                groupBy: {
                    args: Prisma.unit3_organized_classesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit3_organized_classesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.unit3_organized_classesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit3_organized_classesCountAggregateOutputType> | number;
                };
            };
        };
        unit4_learner_profile: {
            payload: Prisma.$unit4_learner_profilePayload<ExtArgs>;
            fields: Prisma.unit4_learner_profileFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.unit4_learner_profileFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit4_learner_profilePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.unit4_learner_profileFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit4_learner_profilePayload>;
                };
                findFirst: {
                    args: Prisma.unit4_learner_profileFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit4_learner_profilePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.unit4_learner_profileFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit4_learner_profilePayload>;
                };
                findMany: {
                    args: Prisma.unit4_learner_profileFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit4_learner_profilePayload>[];
                };
                create: {
                    args: Prisma.unit4_learner_profileCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit4_learner_profilePayload>;
                };
                createMany: {
                    args: Prisma.unit4_learner_profileCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.unit4_learner_profileCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit4_learner_profilePayload>[];
                };
                delete: {
                    args: Prisma.unit4_learner_profileDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit4_learner_profilePayload>;
                };
                update: {
                    args: Prisma.unit4_learner_profileUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit4_learner_profilePayload>;
                };
                deleteMany: {
                    args: Prisma.unit4_learner_profileDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.unit4_learner_profileUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.unit4_learner_profileUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit4_learner_profilePayload>[];
                };
                upsert: {
                    args: Prisma.unit4_learner_profileUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit4_learner_profilePayload>;
                };
                aggregate: {
                    args: Prisma.Unit4_learner_profileAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUnit4_learner_profile>;
                };
                groupBy: {
                    args: Prisma.unit4_learner_profileGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit4_learner_profileGroupByOutputType>[];
                };
                count: {
                    args: Prisma.unit4_learner_profileCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit4_learner_profileCountAggregateOutputType> | number;
                };
            };
        };
        unit5_shifting_modality: {
            payload: Prisma.$unit5_shifting_modalityPayload<ExtArgs>;
            fields: Prisma.unit5_shifting_modalityFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.unit5_shifting_modalityFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit5_shifting_modalityPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.unit5_shifting_modalityFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit5_shifting_modalityPayload>;
                };
                findFirst: {
                    args: Prisma.unit5_shifting_modalityFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit5_shifting_modalityPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.unit5_shifting_modalityFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit5_shifting_modalityPayload>;
                };
                findMany: {
                    args: Prisma.unit5_shifting_modalityFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit5_shifting_modalityPayload>[];
                };
                create: {
                    args: Prisma.unit5_shifting_modalityCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit5_shifting_modalityPayload>;
                };
                createMany: {
                    args: Prisma.unit5_shifting_modalityCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.unit5_shifting_modalityCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit5_shifting_modalityPayload>[];
                };
                delete: {
                    args: Prisma.unit5_shifting_modalityDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit5_shifting_modalityPayload>;
                };
                update: {
                    args: Prisma.unit5_shifting_modalityUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit5_shifting_modalityPayload>;
                };
                deleteMany: {
                    args: Prisma.unit5_shifting_modalityDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.unit5_shifting_modalityUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.unit5_shifting_modalityUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit5_shifting_modalityPayload>[];
                };
                upsert: {
                    args: Prisma.unit5_shifting_modalityUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit5_shifting_modalityPayload>;
                };
                aggregate: {
                    args: Prisma.Unit5_shifting_modalityAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUnit5_shifting_modality>;
                };
                groupBy: {
                    args: Prisma.unit5_shifting_modalityGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit5_shifting_modalityGroupByOutputType>[];
                };
                count: {
                    args: Prisma.unit5_shifting_modalityCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit5_shifting_modalityCountAggregateOutputType> | number;
                };
            };
        };
        unit6_ecart_batches: {
            payload: Prisma.$unit6_ecart_batchesPayload<ExtArgs>;
            fields: Prisma.unit6_ecart_batchesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.unit6_ecart_batchesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_ecart_batchesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.unit6_ecart_batchesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_ecart_batchesPayload>;
                };
                findFirst: {
                    args: Prisma.unit6_ecart_batchesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_ecart_batchesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.unit6_ecart_batchesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_ecart_batchesPayload>;
                };
                findMany: {
                    args: Prisma.unit6_ecart_batchesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_ecart_batchesPayload>[];
                };
                create: {
                    args: Prisma.unit6_ecart_batchesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_ecart_batchesPayload>;
                };
                createMany: {
                    args: Prisma.unit6_ecart_batchesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.unit6_ecart_batchesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_ecart_batchesPayload>[];
                };
                delete: {
                    args: Prisma.unit6_ecart_batchesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_ecart_batchesPayload>;
                };
                update: {
                    args: Prisma.unit6_ecart_batchesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_ecart_batchesPayload>;
                };
                deleteMany: {
                    args: Prisma.unit6_ecart_batchesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.unit6_ecart_batchesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.unit6_ecart_batchesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_ecart_batchesPayload>[];
                };
                upsert: {
                    args: Prisma.unit6_ecart_batchesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_ecart_batchesPayload>;
                };
                aggregate: {
                    args: Prisma.Unit6_ecart_batchesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUnit6_ecart_batches>;
                };
                groupBy: {
                    args: Prisma.unit6_ecart_batchesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit6_ecart_batchesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.unit6_ecart_batchesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit6_ecart_batchesCountAggregateOutputType> | number;
                };
            };
        };
        unit6_furniture_grades: {
            payload: Prisma.$unit6_furniture_gradesPayload<ExtArgs>;
            fields: Prisma.unit6_furniture_gradesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.unit6_furniture_gradesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_furniture_gradesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.unit6_furniture_gradesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_furniture_gradesPayload>;
                };
                findFirst: {
                    args: Prisma.unit6_furniture_gradesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_furniture_gradesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.unit6_furniture_gradesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_furniture_gradesPayload>;
                };
                findMany: {
                    args: Prisma.unit6_furniture_gradesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_furniture_gradesPayload>[];
                };
                create: {
                    args: Prisma.unit6_furniture_gradesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_furniture_gradesPayload>;
                };
                createMany: {
                    args: Prisma.unit6_furniture_gradesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.unit6_furniture_gradesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_furniture_gradesPayload>[];
                };
                delete: {
                    args: Prisma.unit6_furniture_gradesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_furniture_gradesPayload>;
                };
                update: {
                    args: Prisma.unit6_furniture_gradesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_furniture_gradesPayload>;
                };
                deleteMany: {
                    args: Prisma.unit6_furniture_gradesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.unit6_furniture_gradesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.unit6_furniture_gradesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_furniture_gradesPayload>[];
                };
                upsert: {
                    args: Prisma.unit6_furniture_gradesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_furniture_gradesPayload>;
                };
                aggregate: {
                    args: Prisma.Unit6_furniture_gradesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUnit6_furniture_grades>;
                };
                groupBy: {
                    args: Prisma.unit6_furniture_gradesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit6_furniture_gradesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.unit6_furniture_gradesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit6_furniture_gradesCountAggregateOutputType> | number;
                };
            };
        };
        unit6_school_resources: {
            payload: Prisma.$unit6_school_resourcesPayload<ExtArgs>;
            fields: Prisma.unit6_school_resourcesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.unit6_school_resourcesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_school_resourcesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.unit6_school_resourcesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_school_resourcesPayload>;
                };
                findFirst: {
                    args: Prisma.unit6_school_resourcesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_school_resourcesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.unit6_school_resourcesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_school_resourcesPayload>;
                };
                findMany: {
                    args: Prisma.unit6_school_resourcesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_school_resourcesPayload>[];
                };
                create: {
                    args: Prisma.unit6_school_resourcesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_school_resourcesPayload>;
                };
                createMany: {
                    args: Prisma.unit6_school_resourcesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.unit6_school_resourcesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_school_resourcesPayload>[];
                };
                delete: {
                    args: Prisma.unit6_school_resourcesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_school_resourcesPayload>;
                };
                update: {
                    args: Prisma.unit6_school_resourcesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_school_resourcesPayload>;
                };
                deleteMany: {
                    args: Prisma.unit6_school_resourcesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.unit6_school_resourcesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.unit6_school_resourcesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_school_resourcesPayload>[];
                };
                upsert: {
                    args: Prisma.unit6_school_resourcesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit6_school_resourcesPayload>;
                };
                aggregate: {
                    args: Prisma.Unit6_school_resourcesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUnit6_school_resources>;
                };
                groupBy: {
                    args: Prisma.unit6_school_resourcesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit6_school_resourcesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.unit6_school_resourcesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit6_school_resourcesCountAggregateOutputType> | number;
                };
            };
        };
        unit7_buildings_demolition: {
            payload: Prisma.$unit7_buildings_demolitionPayload<ExtArgs>;
            fields: Prisma.unit7_buildings_demolitionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.unit7_buildings_demolitionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_demolitionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.unit7_buildings_demolitionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_demolitionPayload>;
                };
                findFirst: {
                    args: Prisma.unit7_buildings_demolitionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_demolitionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.unit7_buildings_demolitionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_demolitionPayload>;
                };
                findMany: {
                    args: Prisma.unit7_buildings_demolitionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_demolitionPayload>[];
                };
                create: {
                    args: Prisma.unit7_buildings_demolitionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_demolitionPayload>;
                };
                createMany: {
                    args: Prisma.unit7_buildings_demolitionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.unit7_buildings_demolitionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_demolitionPayload>[];
                };
                delete: {
                    args: Prisma.unit7_buildings_demolitionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_demolitionPayload>;
                };
                update: {
                    args: Prisma.unit7_buildings_demolitionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_demolitionPayload>;
                };
                deleteMany: {
                    args: Prisma.unit7_buildings_demolitionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.unit7_buildings_demolitionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.unit7_buildings_demolitionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_demolitionPayload>[];
                };
                upsert: {
                    args: Prisma.unit7_buildings_demolitionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_demolitionPayload>;
                };
                aggregate: {
                    args: Prisma.Unit7_buildings_demolitionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUnit7_buildings_demolition>;
                };
                groupBy: {
                    args: Prisma.unit7_buildings_demolitionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit7_buildings_demolitionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.unit7_buildings_demolitionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit7_buildings_demolitionCountAggregateOutputType> | number;
                };
            };
        };
        unit7_buildings_inventory: {
            payload: Prisma.$unit7_buildings_inventoryPayload<ExtArgs>;
            fields: Prisma.unit7_buildings_inventoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.unit7_buildings_inventoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_inventoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.unit7_buildings_inventoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_inventoryPayload>;
                };
                findFirst: {
                    args: Prisma.unit7_buildings_inventoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_inventoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.unit7_buildings_inventoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_inventoryPayload>;
                };
                findMany: {
                    args: Prisma.unit7_buildings_inventoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_inventoryPayload>[];
                };
                create: {
                    args: Prisma.unit7_buildings_inventoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_inventoryPayload>;
                };
                createMany: {
                    args: Prisma.unit7_buildings_inventoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.unit7_buildings_inventoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_inventoryPayload>[];
                };
                delete: {
                    args: Prisma.unit7_buildings_inventoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_inventoryPayload>;
                };
                update: {
                    args: Prisma.unit7_buildings_inventoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_inventoryPayload>;
                };
                deleteMany: {
                    args: Prisma.unit7_buildings_inventoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.unit7_buildings_inventoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.unit7_buildings_inventoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_inventoryPayload>[];
                };
                upsert: {
                    args: Prisma.unit7_buildings_inventoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_inventoryPayload>;
                };
                aggregate: {
                    args: Prisma.Unit7_buildings_inventoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUnit7_buildings_inventory>;
                };
                groupBy: {
                    args: Prisma.unit7_buildings_inventoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit7_buildings_inventoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.unit7_buildings_inventoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit7_buildings_inventoryCountAggregateOutputType> | number;
                };
            };
        };
        unit7_buildings_repairs: {
            payload: Prisma.$unit7_buildings_repairsPayload<ExtArgs>;
            fields: Prisma.unit7_buildings_repairsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.unit7_buildings_repairsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_repairsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.unit7_buildings_repairsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_repairsPayload>;
                };
                findFirst: {
                    args: Prisma.unit7_buildings_repairsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_repairsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.unit7_buildings_repairsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_repairsPayload>;
                };
                findMany: {
                    args: Prisma.unit7_buildings_repairsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_repairsPayload>[];
                };
                create: {
                    args: Prisma.unit7_buildings_repairsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_repairsPayload>;
                };
                createMany: {
                    args: Prisma.unit7_buildings_repairsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.unit7_buildings_repairsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_repairsPayload>[];
                };
                delete: {
                    args: Prisma.unit7_buildings_repairsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_repairsPayload>;
                };
                update: {
                    args: Prisma.unit7_buildings_repairsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_repairsPayload>;
                };
                deleteMany: {
                    args: Prisma.unit7_buildings_repairsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.unit7_buildings_repairsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.unit7_buildings_repairsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_repairsPayload>[];
                };
                upsert: {
                    args: Prisma.unit7_buildings_repairsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_buildings_repairsPayload>;
                };
                aggregate: {
                    args: Prisma.Unit7_buildings_repairsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUnit7_buildings_repairs>;
                };
                groupBy: {
                    args: Prisma.unit7_buildings_repairsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit7_buildings_repairsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.unit7_buildings_repairsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit7_buildings_repairsCountAggregateOutputType> | number;
                };
            };
        };
        unit7_facilities: {
            payload: Prisma.$unit7_facilitiesPayload<ExtArgs>;
            fields: Prisma.unit7_facilitiesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.unit7_facilitiesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_facilitiesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.unit7_facilitiesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_facilitiesPayload>;
                };
                findFirst: {
                    args: Prisma.unit7_facilitiesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_facilitiesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.unit7_facilitiesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_facilitiesPayload>;
                };
                findMany: {
                    args: Prisma.unit7_facilitiesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_facilitiesPayload>[];
                };
                create: {
                    args: Prisma.unit7_facilitiesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_facilitiesPayload>;
                };
                createMany: {
                    args: Prisma.unit7_facilitiesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.unit7_facilitiesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_facilitiesPayload>[];
                };
                delete: {
                    args: Prisma.unit7_facilitiesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_facilitiesPayload>;
                };
                update: {
                    args: Prisma.unit7_facilitiesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_facilitiesPayload>;
                };
                deleteMany: {
                    args: Prisma.unit7_facilitiesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.unit7_facilitiesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.unit7_facilitiesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_facilitiesPayload>[];
                };
                upsert: {
                    args: Prisma.unit7_facilitiesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_facilitiesPayload>;
                };
                aggregate: {
                    args: Prisma.Unit7_facilitiesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUnit7_facilities>;
                };
                groupBy: {
                    args: Prisma.unit7_facilitiesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit7_facilitiesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.unit7_facilitiesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit7_facilitiesCountAggregateOutputType> | number;
                };
            };
        };
        unit7_school_buildable_spaces: {
            payload: Prisma.$unit7_school_buildable_spacesPayload<ExtArgs>;
            fields: Prisma.unit7_school_buildable_spacesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.unit7_school_buildable_spacesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_school_buildable_spacesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.unit7_school_buildable_spacesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_school_buildable_spacesPayload>;
                };
                findFirst: {
                    args: Prisma.unit7_school_buildable_spacesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_school_buildable_spacesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.unit7_school_buildable_spacesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_school_buildable_spacesPayload>;
                };
                findMany: {
                    args: Prisma.unit7_school_buildable_spacesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_school_buildable_spacesPayload>[];
                };
                create: {
                    args: Prisma.unit7_school_buildable_spacesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_school_buildable_spacesPayload>;
                };
                createMany: {
                    args: Prisma.unit7_school_buildable_spacesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.unit7_school_buildable_spacesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_school_buildable_spacesPayload>[];
                };
                delete: {
                    args: Prisma.unit7_school_buildable_spacesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_school_buildable_spacesPayload>;
                };
                update: {
                    args: Prisma.unit7_school_buildable_spacesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_school_buildable_spacesPayload>;
                };
                deleteMany: {
                    args: Prisma.unit7_school_buildable_spacesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.unit7_school_buildable_spacesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.unit7_school_buildable_spacesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_school_buildable_spacesPayload>[];
                };
                upsert: {
                    args: Prisma.unit7_school_buildable_spacesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit7_school_buildable_spacesPayload>;
                };
                aggregate: {
                    args: Prisma.Unit7_school_buildable_spacesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUnit7_school_buildable_spaces>;
                };
                groupBy: {
                    args: Prisma.unit7_school_buildable_spacesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit7_school_buildable_spacesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.unit7_school_buildable_spacesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit7_school_buildable_spacesCountAggregateOutputType> | number;
                };
            };
        };
        unit8_location: {
            payload: Prisma.$unit8_locationPayload<ExtArgs>;
            fields: Prisma.unit8_locationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.unit8_locationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit8_locationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.unit8_locationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit8_locationPayload>;
                };
                findFirst: {
                    args: Prisma.unit8_locationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit8_locationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.unit8_locationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit8_locationPayload>;
                };
                findMany: {
                    args: Prisma.unit8_locationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit8_locationPayload>[];
                };
                create: {
                    args: Prisma.unit8_locationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit8_locationPayload>;
                };
                createMany: {
                    args: Prisma.unit8_locationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.unit8_locationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit8_locationPayload>[];
                };
                delete: {
                    args: Prisma.unit8_locationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit8_locationPayload>;
                };
                update: {
                    args: Prisma.unit8_locationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit8_locationPayload>;
                };
                deleteMany: {
                    args: Prisma.unit8_locationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.unit8_locationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.unit8_locationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit8_locationPayload>[];
                };
                upsert: {
                    args: Prisma.unit8_locationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit8_locationPayload>;
                };
                aggregate: {
                    args: Prisma.Unit8_locationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUnit8_location>;
                };
                groupBy: {
                    args: Prisma.unit8_locationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit8_locationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.unit8_locationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit8_locationCountAggregateOutputType> | number;
                };
            };
        };
        unit9_safety: {
            payload: Prisma.$unit9_safetyPayload<ExtArgs>;
            fields: Prisma.unit9_safetyFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.unit9_safetyFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit9_safetyPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.unit9_safetyFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit9_safetyPayload>;
                };
                findFirst: {
                    args: Prisma.unit9_safetyFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit9_safetyPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.unit9_safetyFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit9_safetyPayload>;
                };
                findMany: {
                    args: Prisma.unit9_safetyFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit9_safetyPayload>[];
                };
                create: {
                    args: Prisma.unit9_safetyCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit9_safetyPayload>;
                };
                createMany: {
                    args: Prisma.unit9_safetyCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.unit9_safetyCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit9_safetyPayload>[];
                };
                delete: {
                    args: Prisma.unit9_safetyDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit9_safetyPayload>;
                };
                update: {
                    args: Prisma.unit9_safetyUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit9_safetyPayload>;
                };
                deleteMany: {
                    args: Prisma.unit9_safetyDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.unit9_safetyUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.unit9_safetyUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit9_safetyPayload>[];
                };
                upsert: {
                    args: Prisma.unit9_safetyUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$unit9_safetyPayload>;
                };
                aggregate: {
                    args: Prisma.Unit9_safetyAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUnit9_safety>;
                };
                groupBy: {
                    args: Prisma.unit9_safetyGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit9_safetyGroupByOutputType>[];
                };
                count: {
                    args: Prisma.unit9_safetyCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Unit9_safetyCountAggregateOutputType> | number;
                };
            };
        };
        user_device_tokens: {
            payload: Prisma.$user_device_tokensPayload<ExtArgs>;
            fields: Prisma.user_device_tokensFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.user_device_tokensFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_device_tokensPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.user_device_tokensFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_device_tokensPayload>;
                };
                findFirst: {
                    args: Prisma.user_device_tokensFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_device_tokensPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.user_device_tokensFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_device_tokensPayload>;
                };
                findMany: {
                    args: Prisma.user_device_tokensFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_device_tokensPayload>[];
                };
                create: {
                    args: Prisma.user_device_tokensCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_device_tokensPayload>;
                };
                createMany: {
                    args: Prisma.user_device_tokensCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.user_device_tokensCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_device_tokensPayload>[];
                };
                delete: {
                    args: Prisma.user_device_tokensDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_device_tokensPayload>;
                };
                update: {
                    args: Prisma.user_device_tokensUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_device_tokensPayload>;
                };
                deleteMany: {
                    args: Prisma.user_device_tokensDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.user_device_tokensUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.user_device_tokensUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_device_tokensPayload>[];
                };
                upsert: {
                    args: Prisma.user_device_tokensUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_device_tokensPayload>;
                };
                aggregate: {
                    args: Prisma.User_device_tokensAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser_device_tokens>;
                };
                groupBy: {
                    args: Prisma.user_device_tokensGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.User_device_tokensGroupByOutputType>[];
                };
                count: {
                    args: Prisma.user_device_tokensCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.User_device_tokensCountAggregateOutputType> | number;
                };
            };
        };
        user_web_push_subscriptions: {
            payload: Prisma.$user_web_push_subscriptionsPayload<ExtArgs>;
            fields: Prisma.user_web_push_subscriptionsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.user_web_push_subscriptionsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_web_push_subscriptionsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.user_web_push_subscriptionsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_web_push_subscriptionsPayload>;
                };
                findFirst: {
                    args: Prisma.user_web_push_subscriptionsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_web_push_subscriptionsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.user_web_push_subscriptionsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_web_push_subscriptionsPayload>;
                };
                findMany: {
                    args: Prisma.user_web_push_subscriptionsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_web_push_subscriptionsPayload>[];
                };
                create: {
                    args: Prisma.user_web_push_subscriptionsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_web_push_subscriptionsPayload>;
                };
                createMany: {
                    args: Prisma.user_web_push_subscriptionsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.user_web_push_subscriptionsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_web_push_subscriptionsPayload>[];
                };
                delete: {
                    args: Prisma.user_web_push_subscriptionsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_web_push_subscriptionsPayload>;
                };
                update: {
                    args: Prisma.user_web_push_subscriptionsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_web_push_subscriptionsPayload>;
                };
                deleteMany: {
                    args: Prisma.user_web_push_subscriptionsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.user_web_push_subscriptionsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.user_web_push_subscriptionsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_web_push_subscriptionsPayload>[];
                };
                upsert: {
                    args: Prisma.user_web_push_subscriptionsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$user_web_push_subscriptionsPayload>;
                };
                aggregate: {
                    args: Prisma.User_web_push_subscriptionsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser_web_push_subscriptions>;
                };
                groupBy: {
                    args: Prisma.user_web_push_subscriptionsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.User_web_push_subscriptionsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.user_web_push_subscriptionsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.User_web_push_subscriptionsCountAggregateOutputType> | number;
                };
            };
        };
        users: {
            payload: Prisma.$usersPayload<ExtArgs>;
            fields: Prisma.usersFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.usersFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>;
                };
                findFirst: {
                    args: Prisma.usersFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>;
                };
                findMany: {
                    args: Prisma.usersFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>[];
                };
                create: {
                    args: Prisma.usersCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>;
                };
                createMany: {
                    args: Prisma.usersCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>[];
                };
                delete: {
                    args: Prisma.usersDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>;
                };
                update: {
                    args: Prisma.usersUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>;
                };
                deleteMany: {
                    args: Prisma.usersDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.usersUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>[];
                };
                upsert: {
                    args: Prisma.usersUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usersPayload>;
                };
                aggregate: {
                    args: Prisma.UsersAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUsers>;
                };
                groupBy: {
                    args: Prisma.usersGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UsersGroupByOutputType>[];
                };
                count: {
                    args: Prisma.usersCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UsersCountAggregateOutputType> | number;
                };
            };
        };
        variation_orders: {
            payload: Prisma.$variation_ordersPayload<ExtArgs>;
            fields: Prisma.variation_ordersFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.variation_ordersFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$variation_ordersPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.variation_ordersFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$variation_ordersPayload>;
                };
                findFirst: {
                    args: Prisma.variation_ordersFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$variation_ordersPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.variation_ordersFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$variation_ordersPayload>;
                };
                findMany: {
                    args: Prisma.variation_ordersFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$variation_ordersPayload>[];
                };
                create: {
                    args: Prisma.variation_ordersCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$variation_ordersPayload>;
                };
                createMany: {
                    args: Prisma.variation_ordersCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.variation_ordersCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$variation_ordersPayload>[];
                };
                delete: {
                    args: Prisma.variation_ordersDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$variation_ordersPayload>;
                };
                update: {
                    args: Prisma.variation_ordersUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$variation_ordersPayload>;
                };
                deleteMany: {
                    args: Prisma.variation_ordersDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.variation_ordersUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.variation_ordersUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$variation_ordersPayload>[];
                };
                upsert: {
                    args: Prisma.variation_ordersUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$variation_ordersPayload>;
                };
                aggregate: {
                    args: Prisma.Variation_ordersAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVariation_orders>;
                };
                groupBy: {
                    args: Prisma.variation_ordersGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Variation_ordersGroupByOutputType>[];
                };
                count: {
                    args: Prisma.variation_ordersCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Variation_ordersCountAggregateOutputType> | number;
                };
            };
        };
        verification_codes: {
            payload: Prisma.$verification_codesPayload<ExtArgs>;
            fields: Prisma.verification_codesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.verification_codesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$verification_codesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.verification_codesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$verification_codesPayload>;
                };
                findFirst: {
                    args: Prisma.verification_codesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$verification_codesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.verification_codesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$verification_codesPayload>;
                };
                findMany: {
                    args: Prisma.verification_codesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$verification_codesPayload>[];
                };
                create: {
                    args: Prisma.verification_codesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$verification_codesPayload>;
                };
                createMany: {
                    args: Prisma.verification_codesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.verification_codesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$verification_codesPayload>[];
                };
                delete: {
                    args: Prisma.verification_codesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$verification_codesPayload>;
                };
                update: {
                    args: Prisma.verification_codesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$verification_codesPayload>;
                };
                deleteMany: {
                    args: Prisma.verification_codesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.verification_codesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.verification_codesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$verification_codesPayload>[];
                };
                upsert: {
                    args: Prisma.verification_codesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$verification_codesPayload>;
                };
                aggregate: {
                    args: Prisma.Verification_codesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVerification_codes>;
                };
                groupBy: {
                    args: Prisma.verification_codesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Verification_codesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.verification_codesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Verification_codesCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const Activity_logsScalarFieldEnum: {
    readonly log_id: "log_id";
    readonly user_uid: "user_uid";
    readonly user_name: "user_name";
    readonly role: "role";
    readonly action_type: "action_type";
    readonly target_entity: "target_entity";
    readonly details: "details";
    readonly timestamp: "timestamp";
};
export type Activity_logsScalarFieldEnum = (typeof Activity_logsScalarFieldEnum)[keyof typeof Activity_logsScalarFieldEnum];
export declare const App_feedbackScalarFieldEnum: {
    readonly id: "id";
    readonly user_id: "user_id";
    readonly user_name: "user_name";
    readonly role: "role";
    readonly ease_of_use: "ease_of_use";
    readonly aesthetics: "aesthetics";
    readonly functionality: "functionality";
    readonly comment: "comment";
    readonly app_version: "app_version";
    readonly created_at: "created_at";
};
export type App_feedbackScalarFieldEnum = (typeof App_feedbackScalarFieldEnum)[keyof typeof App_feedbackScalarFieldEnum];
export declare const Audit_feedback_tasksScalarFieldEnum: {
    readonly id: "id";
    readonly school_id: "school_id";
    readonly iern: "iern";
    readonly unit_id: "unit_id";
    readonly instruction: "instruction";
    readonly auditor_uid: "auditor_uid";
    readonly auditor_name: "auditor_name";
    readonly status: "status";
    readonly school_head_note: "school_head_note";
    readonly is_resolved: "is_resolved";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Audit_feedback_tasksScalarFieldEnum = (typeof Audit_feedback_tasksScalarFieldEnum)[keyof typeof Audit_feedback_tasksScalarFieldEnum];
export declare const Authorization_codesScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly role: "role";
    readonly is_active: "is_active";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Authorization_codesScalarFieldEnum = (typeof Authorization_codesScalarFieldEnum)[keyof typeof Authorization_codesScalarFieldEnum];
export declare const Buildable_spacesScalarFieldEnum: {
    readonly space_id: "space_id";
    readonly school_id: "school_id";
    readonly iern: "iern";
    readonly space_number: "space_number";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly length: "length";
    readonly width: "width";
    readonly total_area: "total_area";
    readonly created_at: "created_at";
};
export type Buildable_spacesScalarFieldEnum = (typeof Buildable_spacesScalarFieldEnum)[keyof typeof Buildable_spacesScalarFieldEnum];
export declare const Chat_messagesScalarFieldEnum: {
    readonly id: "id";
    readonly room_id: "room_id";
    readonly sender_uid: "sender_uid";
    readonly message_text: "message_text";
    readonly message_type: "message_type";
    readonly attachment_url: "attachment_url";
    readonly attachment_metadata: "attachment_metadata";
    readonly is_read: "is_read";
    readonly created_at: "created_at";
};
export type Chat_messagesScalarFieldEnum = (typeof Chat_messagesScalarFieldEnum)[keyof typeof Chat_messagesScalarFieldEnum];
export declare const Chat_room_participantsScalarFieldEnum: {
    readonly room_id: "room_id";
    readonly user_uid: "user_uid";
    readonly user_role: "user_role";
    readonly joined_at: "joined_at";
};
export type Chat_room_participantsScalarFieldEnum = (typeof Chat_room_participantsScalarFieldEnum)[keyof typeof Chat_room_participantsScalarFieldEnum];
export declare const Chat_roomsScalarFieldEnum: {
    readonly id: "id";
    readonly room_type: "room_type";
    readonly region: "region";
    readonly division: "division";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Chat_roomsScalarFieldEnum = (typeof Chat_roomsScalarFieldEnum)[keyof typeof Chat_roomsScalarFieldEnum];
export declare const Chatbot_knowledgeScalarFieldEnum: {
    readonly id: "id";
    readonly content: "content";
    readonly embedding: "embedding";
    readonly metadata: "metadata";
    readonly created_at: "created_at";
};
export type Chatbot_knowledgeScalarFieldEnum = (typeof Chatbot_knowledgeScalarFieldEnum)[keyof typeof Chatbot_knowledgeScalarFieldEnum];
export declare const Co_financeScalarFieldEnum: {
    readonly finance_id: "finance_id";
    readonly project_id: "project_id";
    readonly ipc: "ipc";
    readonly tranche_1: "tranche_1";
    readonly tranche_2: "tranche_2";
    readonly tranche_3: "tranche_3";
    readonly liquidated_tranche_1: "liquidated_tranche_1";
    readonly liquidated_tranche_2: "liquidated_tranche_2";
    readonly liquidated_tranche_3: "liquidated_tranche_3";
    readonly updated_at: "updated_at";
};
export type Co_financeScalarFieldEnum = (typeof Co_financeScalarFieldEnum)[keyof typeof Co_financeScalarFieldEnum];
export declare const Command_center_userScalarFieldEnum: {
    readonly uid: "uid";
    readonly name: "name";
    readonly designation: "designation";
    readonly role: "role";
    readonly created_at: "created_at";
};
export type Command_center_userScalarFieldEnum = (typeof Command_center_userScalarFieldEnum)[keyof typeof Command_center_userScalarFieldEnum];
export declare const Engineer_createScalarFieldEnum: {
    readonly project_id: "project_id";
    readonly project_name: "project_name";
    readonly school_name: "school_name";
    readonly school_id: "school_id";
    readonly region: "region";
    readonly division: "division";
    readonly status_of_construction_phase: "status_of_construction_phase";
    readonly accomplishment_percentage: "accomplishment_percentage";
    readonly status_as_of: "status_as_of";
    readonly target_completion_date: "target_completion_date";
    readonly actual_completion_date: "actual_completion_date";
    readonly notice_to_proceed: "notice_to_proceed";
    readonly contractor_name: "contractor_name";
    readonly approved_budget_for_contract: "approved_budget_for_contract";
    readonly batch_of_funds: "batch_of_funds";
    readonly other_remarks: "other_remarks";
    readonly created_at: "created_at";
    readonly engineer_id: "engineer_id";
    readonly validation_status: "validation_status";
    readonly validation_remarks: "validation_remarks";
    readonly validated_by: "validated_by";
    readonly ipc: "ipc";
    readonly engineer_name: "engineer_name";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly construction_start_date: "construction_start_date";
    readonly project_category: "project_category";
    readonly scope_of_work: "scope_of_work";
    readonly number_of_classrooms: "number_of_classrooms";
    readonly number_of_sites: "number_of_sites";
    readonly number_of_storeys: "number_of_storeys";
    readonly actions: "actions";
    readonly contract_amount: "contract_amount";
    readonly funds_utilized: "funds_utilized";
    readonly savings: "savings";
    readonly status_design_phase: "status_design_phase";
    readonly contract_id: "contract_id";
    readonly date_notice_of_award: "date_notice_of_award";
    readonly issuance_of_invitation_to_bid: "issuance_of_invitation_to_bid";
    readonly pre_bid_conference: "pre_bid_conference";
    readonly opening_of_technical_proposal: "opening_of_technical_proposal";
    readonly opening_of_financial_proposal: "opening_of_financial_proposal";
    readonly request_for_quotation: "request_for_quotation";
    readonly negotiation: "negotiation";
    readonly opening_of_quotation: "opening_of_quotation";
    readonly funding_year: "funding_year";
    readonly funding_year_justification: "funding_year_justification";
    readonly revised_target_completion_date: "revised_target_completion_date";
    readonly delay_reason: "delay_reason";
    readonly time_lapsed_days: "time_lapsed_days";
    readonly time_lapsed_percentage: "time_lapsed_percentage";
    readonly is_donated: "is_donated";
    readonly uploader_type: "uploader_type";
    readonly mode_of_project: "mode_of_project";
    readonly date_assigned: "date_assigned";
    readonly assigned_engineer_id: "assigned_engineer_id";
    readonly assigned_engineer_name: "assigned_engineer_name";
    readonly internal_description: "internal_description";
    readonly external_description: "external_description";
    readonly uploader_id_update_moa_rta: "uploader_id_update_moa_rta";
    readonly implementing_agency: "implementing_agency";
    readonly implementing_agency_specific: "implementing_agency_specific";
    readonly uploader_id_moa_rta: "uploader_id_moa_rta";
    readonly no_of_units: "no_of_units";
    readonly program_type: "program_type";
    readonly province: "province";
    readonly city: "city";
    readonly municipality: "municipality";
    readonly mother_moa_id: "mother_moa_id";
    readonly supplemental_moa_id: "supplemental_moa_id";
    readonly sangguniang_resolution_id: "sangguniang_resolution_id";
    readonly bid_opening: "bid_opening";
    readonly issuance_of_resolution_to_award: "issuance_of_resolution_to_award";
    readonly leg_district: "leg_district";
    readonly supplamental_moa_id: "supplamental_moa_id";
    readonly status_as_of_date: "status_as_of_date";
    readonly notice_to_proceed_date: "notice_to_proceed_date";
    readonly issuance_of_invitation_to_bid_date: "issuance_of_invitation_to_bid_date";
    readonly pre_bid_conference_date: "pre_bid_conference_date";
    readonly opening_of_technical_proposal_date: "opening_of_technical_proposal_date";
    readonly opening_of_financial_proposal_date: "opening_of_financial_proposal_date";
    readonly request_for_quotation_date: "request_for_quotation_date";
    readonly negotiation_date: "negotiation_date";
    readonly opening_of_quotation_date: "opening_of_quotation_date";
    readonly procurement_status: "procurement_status";
    readonly project_category_id: "project_category_id";
    readonly pow_pdf: "pow_pdf";
    readonly dupa_pdf: "dupa_pdf";
    readonly contract_pdf: "contract_pdf";
    readonly checklist: "checklist";
    readonly triangulated_percentage: "triangulated_percentage";
    readonly pow_filename: "pow_filename";
    readonly dupa_filename: "dupa_filename";
    readonly contract_filename: "contract_filename";
    readonly approval_status: "approval_status";
    readonly is_duplicate: "is_duplicate";
    readonly dpwh_project_id: "dpwh_project_id";
    readonly project_name_: "project_name_";
    readonly scope_of_work_: "scope_of_work_";
    readonly number_of_classrooms_: "number_of_classrooms_";
    readonly contract_amount_: "contract_amount_";
    readonly column27: "column27";
    readonly content_hash: "content_hash";
    readonly district: "district";
};
export type Engineer_createScalarFieldEnum = (typeof Engineer_createScalarFieldEnum)[keyof typeof Engineer_createScalarFieldEnum];
export declare const Engineer_create_updatesScalarFieldEnum: {
    readonly project_id: "project_id";
    readonly project_name: "project_name";
    readonly school_name: "school_name";
    readonly school_id: "school_id";
    readonly region: "region";
    readonly division: "division";
    readonly status_of_construction_phase: "status_of_construction_phase";
    readonly accomplishment_percentage: "accomplishment_percentage";
    readonly status_as_of: "status_as_of";
    readonly target_completion_date: "target_completion_date";
    readonly actual_completion_date: "actual_completion_date";
    readonly notice_to_proceed: "notice_to_proceed";
    readonly contractor_name: "contractor_name";
    readonly approved_budget_for_contract: "approved_budget_for_contract";
    readonly batch_of_funds: "batch_of_funds";
    readonly other_remarks: "other_remarks";
    readonly created_at: "created_at";
    readonly engineer_id: "engineer_id";
    readonly validation_status: "validation_status";
    readonly validation_remarks: "validation_remarks";
    readonly validated_by: "validated_by";
    readonly ipc: "ipc";
    readonly engineer_name: "engineer_name";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly construction_start_date: "construction_start_date";
    readonly project_category: "project_category";
    readonly scope_of_work: "scope_of_work";
    readonly number_of_classrooms: "number_of_classrooms";
    readonly number_of_sites: "number_of_sites";
    readonly number_of_storeys: "number_of_storeys";
    readonly actions: "actions";
    readonly contract_amount: "contract_amount";
    readonly funds_utilized: "funds_utilized";
    readonly savings: "savings";
    readonly status_design_phase: "status_design_phase";
    readonly contract_id: "contract_id";
    readonly date_notice_of_award: "date_notice_of_award";
    readonly issuance_of_invitation_to_bid: "issuance_of_invitation_to_bid";
    readonly pre_bid_conference: "pre_bid_conference";
    readonly opening_of_technical_proposal: "opening_of_technical_proposal";
    readonly opening_of_financial_proposal: "opening_of_financial_proposal";
    readonly request_for_quotation: "request_for_quotation";
    readonly negotiation: "negotiation";
    readonly opening_of_quotation: "opening_of_quotation";
    readonly funding_year: "funding_year";
    readonly funding_year_justification: "funding_year_justification";
    readonly revised_target_completion_date: "revised_target_completion_date";
    readonly delay_reason: "delay_reason";
    readonly time_lapsed_days: "time_lapsed_days";
    readonly time_lapsed_percentage: "time_lapsed_percentage";
    readonly is_donated: "is_donated";
    readonly uploader_type: "uploader_type";
    readonly mode_of_project: "mode_of_project";
    readonly date_assigned: "date_assigned";
    readonly assigned_engineer_id: "assigned_engineer_id";
    readonly assigned_engineer_name: "assigned_engineer_name";
    readonly internal_description: "internal_description";
    readonly external_description: "external_description";
    readonly uploader_id_update_moa_rta: "uploader_id_update_moa_rta";
    readonly implementing_agency: "implementing_agency";
    readonly implementing_agency_specific: "implementing_agency_specific";
    readonly uploader_id_moa_rta: "uploader_id_moa_rta";
    readonly no_of_units: "no_of_units";
    readonly program_type: "program_type";
    readonly province: "province";
    readonly city: "city";
    readonly municipality: "municipality";
    readonly mother_moa_id: "mother_moa_id";
    readonly supplemental_moa_id: "supplemental_moa_id";
    readonly sangguniang_resolution_id: "sangguniang_resolution_id";
    readonly bid_opening: "bid_opening";
    readonly issuance_of_resolution_to_award: "issuance_of_resolution_to_award";
    readonly leg_district: "leg_district";
    readonly supplamental_moa_id: "supplamental_moa_id";
    readonly status_as_of_date: "status_as_of_date";
    readonly notice_to_proceed_date: "notice_to_proceed_date";
    readonly issuance_of_invitation_to_bid_date: "issuance_of_invitation_to_bid_date";
    readonly pre_bid_conference_date: "pre_bid_conference_date";
    readonly opening_of_technical_proposal_date: "opening_of_technical_proposal_date";
    readonly opening_of_financial_proposal_date: "opening_of_financial_proposal_date";
    readonly request_for_quotation_date: "request_for_quotation_date";
    readonly negotiation_date: "negotiation_date";
    readonly opening_of_quotation_date: "opening_of_quotation_date";
    readonly procurement_status: "procurement_status";
    readonly project_category_id: "project_category_id";
    readonly pow_pdf: "pow_pdf";
    readonly dupa_pdf: "dupa_pdf";
    readonly contract_pdf: "contract_pdf";
    readonly checklist: "checklist";
    readonly triangulated_percentage: "triangulated_percentage";
    readonly pow_filename: "pow_filename";
    readonly dupa_filename: "dupa_filename";
    readonly contract_filename: "contract_filename";
    readonly approval_status: "approval_status";
    readonly is_duplicate: "is_duplicate";
    readonly dpwh_project_id: "dpwh_project_id";
    readonly project_name_: "project_name_";
    readonly scope_of_work_: "scope_of_work_";
    readonly number_of_classrooms_: "number_of_classrooms_";
    readonly contract_amount_: "contract_amount_";
    readonly column27: "column27";
    readonly content_hash: "content_hash";
    readonly district: "district";
};
export type Engineer_create_updatesScalarFieldEnum = (typeof Engineer_create_updatesScalarFieldEnum)[keyof typeof Engineer_create_updatesScalarFieldEnum];
export declare const Engineer_documentsScalarFieldEnum: {
    readonly doc_id: "doc_id";
    readonly project_id: "project_id";
    readonly ipc: "ipc";
    readonly pow_pdf: "pow_pdf";
    readonly dupa_pdf: "dupa_pdf";
    readonly contract_pdf: "contract_pdf";
    readonly rta_pdf: "rta_pdf";
    readonly moa_pdf: "moa_pdf";
    readonly uploader_id: "uploader_id";
    readonly created_at: "created_at";
    readonly pow_filename: "pow_filename";
    readonly dupa_filename: "dupa_filename";
    readonly contract_filename: "contract_filename";
    readonly binary_id: "binary_id";
    readonly pow_binary_id: "pow_binary_id";
    readonly dupa_binary_id: "dupa_binary_id";
    readonly contract_binary_id: "contract_binary_id";
    readonly rta_binary_id: "rta_binary_id";
    readonly moa_binary_id: "moa_binary_id";
    readonly pow_size: "pow_size";
    readonly dupa_size: "dupa_size";
    readonly contract_size: "contract_size";
    readonly moa_size: "moa_size";
    readonly rta_size: "rta_size";
    readonly hydra_manifest: "hydra_manifest";
    readonly pow_original_size: "pow_original_size";
    readonly dupa_original_size: "dupa_original_size";
    readonly contract_original_size: "contract_original_size";
    readonly moa_original_size: "moa_original_size";
    readonly rta_original_size: "rta_original_size";
    readonly outbox_project_id: "outbox_project_id";
    readonly suspension_order_pdf: "suspension_order_pdf";
    readonly suspension_order_filename: "suspension_order_filename";
    readonly suspension_order_size: "suspension_order_size";
    readonly suspension_order_original_size: "suspension_order_original_size";
};
export type Engineer_documentsScalarFieldEnum = (typeof Engineer_documentsScalarFieldEnum)[keyof typeof Engineer_documentsScalarFieldEnum];
export declare const Engineer_formScalarFieldEnum: {
    readonly project_id: "project_id";
    readonly project_name: "project_name";
    readonly school_name: "school_name";
    readonly school_id: "school_id";
    readonly region: "region";
    readonly division: "division";
    readonly status_of_construction_phase: "status_of_construction_phase";
    readonly accomplishment_percentage: "accomplishment_percentage";
    readonly status_as_of: "status_as_of";
    readonly target_completion_date: "target_completion_date";
    readonly actual_completion_date: "actual_completion_date";
    readonly notice_to_proceed: "notice_to_proceed";
    readonly contractor_name: "contractor_name";
    readonly approved_budget_for_contract: "approved_budget_for_contract";
    readonly batch_of_funds: "batch_of_funds";
    readonly other_remarks: "other_remarks";
    readonly created_at: "created_at";
    readonly engineer_id: "engineer_id";
    readonly validation_status: "validation_status";
    readonly validation_remarks: "validation_remarks";
    readonly validated_by: "validated_by";
    readonly ipc: "ipc";
    readonly engineer_name: "engineer_name";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly construction_start_date: "construction_start_date";
    readonly project_category: "project_category";
    readonly scope_of_work: "scope_of_work";
    readonly number_of_classrooms: "number_of_classrooms";
    readonly number_of_sites: "number_of_sites";
    readonly number_of_storeys: "number_of_storeys";
    readonly actions: "actions";
    readonly contract_amount: "contract_amount";
    readonly funds_utilized: "funds_utilized";
    readonly savings: "savings";
    readonly status_design_phase: "status_design_phase";
    readonly contract_id: "contract_id";
    readonly date_notice_of_award: "date_notice_of_award";
    readonly issuance_of_invitation_to_bid: "issuance_of_invitation_to_bid";
    readonly pre_bid_conference: "pre_bid_conference";
    readonly opening_of_technical_proposal: "opening_of_technical_proposal";
    readonly opening_of_financial_proposal: "opening_of_financial_proposal";
    readonly request_for_quotation: "request_for_quotation";
    readonly negotiation: "negotiation";
    readonly opening_of_quotation: "opening_of_quotation";
    readonly funding_year: "funding_year";
    readonly funding_year_justification: "funding_year_justification";
    readonly revised_target_completion_date: "revised_target_completion_date";
    readonly delay_reason: "delay_reason";
    readonly time_lapsed_days: "time_lapsed_days";
    readonly time_lapsed_percentage: "time_lapsed_percentage";
    readonly is_donated: "is_donated";
    readonly uploader_type: "uploader_type";
    readonly mode_of_project: "mode_of_project";
    readonly date_assigned: "date_assigned";
    readonly assigned_engineer_id: "assigned_engineer_id";
    readonly assigned_engineer_name: "assigned_engineer_name";
    readonly implementing_agency: "implementing_agency";
    readonly implementing_agency_specific: "implementing_agency_specific";
    readonly uploader_id_moa_rta: "uploader_id_moa_rta";
    readonly no_of_units: "no_of_units";
    readonly program_type: "program_type";
    readonly province: "province";
    readonly city: "city";
    readonly municipality: "municipality";
    readonly mother_moa_id: "mother_moa_id";
    readonly sangguniang_resolution_id: "sangguniang_resolution_id";
    readonly leg_district: "leg_district";
    readonly supplamental_moa_id: "supplamental_moa_id";
    readonly status_as_of_date: "status_as_of_date";
    readonly procurement_status: "procurement_status";
    readonly project_category_id: "project_category_id";
    readonly pow_pdf: "pow_pdf";
    readonly dupa_pdf: "dupa_pdf";
    readonly contract_pdf: "contract_pdf";
    readonly checklist: "checklist";
    readonly triangulated_percentage: "triangulated_percentage";
    readonly pow_filename: "pow_filename";
    readonly dupa_filename: "dupa_filename";
    readonly contract_filename: "contract_filename";
    readonly approval_status: "approval_status";
    readonly is_duplicate: "is_duplicate";
    readonly dpwh_project_id: "dpwh_project_id";
    readonly column27: "column27";
    readonly content_hash: "content_hash";
    readonly district: "district";
    readonly contractor_id: "contractor_id";
    readonly issuance_of_resolution_to_award: "issuance_of_resolution_to_award";
    readonly notice_to_proceed_date: "notice_to_proceed_date";
    readonly legislative_district: "legislative_district";
    readonly status_check: "status_check";
    readonly pcab_license_number: "pcab_license_number";
    readonly notice_of_award: "notice_of_award";
    readonly start_date: "start_date";
    readonly suspension_events: "suspension_events";
    readonly is_reverted: "is_reverted";
    readonly approved_days_of_suspension: "approved_days_of_suspension";
    readonly suspension_order_pdf: "suspension_order_pdf";
    readonly suspension_order_days: "suspension_order_days";
    readonly contract_duration: "contract_duration";
    readonly procurement_details_status: "procurement_details_status";
    readonly bidding_status: "bidding_status";
    readonly fund_source: "fund_source";
    readonly final_inspection_date: "final_inspection_date";
    readonly certificate_of_completion_date: "certificate_of_completion_date";
    readonly turnover_acceptance_date: "turnover_acceptance_date";
};
export type Engineer_formScalarFieldEnum = (typeof Engineer_formScalarFieldEnum)[keyof typeof Engineer_formScalarFieldEnum];
export declare const Engineer_form_outboxScalarFieldEnum: {
    readonly outbox_id: "outbox_id";
    readonly original_project_id: "original_project_id";
    readonly outbox_reason: "outbox_reason";
    readonly migrated_at: "migrated_at";
    readonly project_name: "project_name";
    readonly school_name: "school_name";
    readonly school_id: "school_id";
    readonly region: "region";
    readonly division: "division";
    readonly status_of_construction_phase: "status_of_construction_phase";
    readonly accomplishment_percentage: "accomplishment_percentage";
    readonly status_as_of: "status_as_of";
    readonly target_completion_date: "target_completion_date";
    readonly actual_completion_date: "actual_completion_date";
    readonly notice_to_proceed: "notice_to_proceed";
    readonly contractor_name: "contractor_name";
    readonly approved_budget_for_contract: "approved_budget_for_contract";
    readonly batch_of_funds: "batch_of_funds";
    readonly other_remarks: "other_remarks";
    readonly created_at: "created_at";
    readonly engineer_id: "engineer_id";
    readonly validation_status: "validation_status";
    readonly validation_remarks: "validation_remarks";
    readonly validated_by: "validated_by";
    readonly ipc: "ipc";
    readonly engineer_name: "engineer_name";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly construction_start_date: "construction_start_date";
    readonly project_category: "project_category";
    readonly scope_of_work: "scope_of_work";
    readonly number_of_classrooms: "number_of_classrooms";
    readonly number_of_sites: "number_of_sites";
    readonly number_of_storeys: "number_of_storeys";
    readonly actions: "actions";
    readonly contract_amount: "contract_amount";
    readonly funds_utilized: "funds_utilized";
    readonly savings: "savings";
    readonly status_design_phase: "status_design_phase";
    readonly contract_id: "contract_id";
    readonly date_notice_of_award: "date_notice_of_award";
    readonly issuance_of_invitation_to_bid: "issuance_of_invitation_to_bid";
    readonly pre_bid_conference: "pre_bid_conference";
    readonly opening_of_technical_proposal: "opening_of_technical_proposal";
    readonly opening_of_financial_proposal: "opening_of_financial_proposal";
    readonly request_for_quotation: "request_for_quotation";
    readonly negotiation: "negotiation";
    readonly opening_of_quotation: "opening_of_quotation";
    readonly funding_year: "funding_year";
    readonly funding_year_justification: "funding_year_justification";
    readonly revised_target_completion_date: "revised_target_completion_date";
    readonly delay_reason: "delay_reason";
    readonly time_lapsed_days: "time_lapsed_days";
    readonly time_lapsed_percentage: "time_lapsed_percentage";
    readonly is_donated: "is_donated";
    readonly uploader_type: "uploader_type";
    readonly mode_of_project: "mode_of_project";
    readonly date_assigned: "date_assigned";
    readonly assigned_engineer_id: "assigned_engineer_id";
    readonly assigned_engineer_name: "assigned_engineer_name";
    readonly internal_description: "internal_description";
    readonly external_description: "external_description";
    readonly uploader_id_update_moa_rta: "uploader_id_update_moa_rta";
    readonly implementing_agency: "implementing_agency";
    readonly implementing_agency_specific: "implementing_agency_specific";
    readonly uploader_id_moa_rta: "uploader_id_moa_rta";
    readonly no_of_units: "no_of_units";
    readonly program_type: "program_type";
    readonly province: "province";
    readonly city: "city";
    readonly municipality: "municipality";
    readonly mother_moa_id: "mother_moa_id";
    readonly supplemental_moa_id: "supplemental_moa_id";
    readonly sangguniang_resolution_id: "sangguniang_resolution_id";
    readonly bid_opening: "bid_opening";
    readonly issuance_of_resolution_to_award: "issuance_of_resolution_to_award";
    readonly leg_district: "leg_district";
    readonly supplamental_moa_id: "supplamental_moa_id";
    readonly status_as_of_date: "status_as_of_date";
    readonly notice_to_proceed_date: "notice_to_proceed_date";
    readonly issuance_of_invitation_to_bid_date: "issuance_of_invitation_to_bid_date";
    readonly pre_bid_conference_date: "pre_bid_conference_date";
    readonly opening_of_technical_proposal_date: "opening_of_technical_proposal_date";
    readonly opening_of_financial_proposal_date: "opening_of_financial_proposal_date";
    readonly request_for_quotation_date: "request_for_quotation_date";
    readonly negotiation_date: "negotiation_date";
    readonly opening_of_quotation_date: "opening_of_quotation_date";
    readonly procurement_status: "procurement_status";
    readonly project_category_id: "project_category_id";
    readonly pow_pdf: "pow_pdf";
    readonly dupa_pdf: "dupa_pdf";
    readonly contract_pdf: "contract_pdf";
    readonly checklist: "checklist";
    readonly triangulated_percentage: "triangulated_percentage";
    readonly pow_filename: "pow_filename";
    readonly dupa_filename: "dupa_filename";
    readonly contract_filename: "contract_filename";
    readonly approval_status: "approval_status";
    readonly is_duplicate: "is_duplicate";
    readonly dpwh_project_id: "dpwh_project_id";
    readonly project_name_: "project_name_";
    readonly scope_of_work_: "scope_of_work_";
    readonly number_of_classrooms_: "number_of_classrooms_";
    readonly contract_amount_: "contract_amount_";
    readonly column27: "column27";
    readonly content_hash: "content_hash";
    readonly archived_at: "archived_at";
    readonly project_id: "project_id";
};
export type Engineer_form_outboxScalarFieldEnum = (typeof Engineer_form_outboxScalarFieldEnum)[keyof typeof Engineer_form_outboxScalarFieldEnum];
export declare const Engineer_form_updatesScalarFieldEnum: {
    readonly update_id: "update_id";
    readonly ipc: "ipc";
    readonly project_id_ref: "project_id_ref";
    readonly school_id: "school_id";
    readonly school_name: "school_name";
    readonly project_name: "project_name";
    readonly procurement_status: "procurement_status";
    readonly contract_id: "contract_id";
    readonly contractor_id: "contractor_id";
    readonly contractor_name: "contractor_name";
    readonly notice_of_award: "notice_of_award";
    readonly notice_to_proceed: "notice_to_proceed";
    readonly start_date: "start_date";
    readonly target_completion_date: "target_completion_date";
    readonly actual_completion_date: "actual_completion_date";
    readonly accomplishment_percentage: "accomplishment_percentage";
    readonly other_remarks: "other_remarks";
    readonly modified_by: "modified_by";
    readonly uid: "uid";
    readonly update_type: "update_type";
    readonly created_at: "created_at";
    readonly project_category: "project_category";
    readonly funding_year: "funding_year";
    readonly batch_of_funds: "batch_of_funds";
    readonly program_type: "program_type";
    readonly contract_amount: "contract_amount";
    readonly status: "status";
    readonly status_as_of: "status_as_of";
    readonly checklist: "checklist";
    readonly triangulated_percentage: "triangulated_percentage";
    readonly mode_of_project: "mode_of_project";
    readonly pcab_license_number: "pcab_license_number";
    readonly suspension_order_pdf: "suspension_order_pdf";
    readonly suspension_order_days: "suspension_order_days";
    readonly revised_target_completion_date: "revised_target_completion_date";
    readonly contract_duration: "contract_duration";
    readonly issuance_of_invitation_to_bid: "issuance_of_invitation_to_bid";
    readonly pre_bid_conference: "pre_bid_conference";
    readonly opening_of_technical_proposal: "opening_of_technical_proposal";
    readonly opening_of_financial_proposal: "opening_of_financial_proposal";
    readonly request_for_quotation: "request_for_quotation";
    readonly negotiation: "negotiation";
    readonly opening_of_quotation: "opening_of_quotation";
    readonly fund_source: "fund_source";
    readonly approved_budget_for_contract: "approved_budget_for_contract";
    readonly procurement_details_status: "procurement_details_status";
    readonly bidding_status: "bidding_status";
    readonly final_inspection_date: "final_inspection_date";
    readonly certificate_of_completion_date: "certificate_of_completion_date";
    readonly turnover_acceptance_date: "turnover_acceptance_date";
};
export type Engineer_form_updatesScalarFieldEnum = (typeof Engineer_form_updatesScalarFieldEnum)[keyof typeof Engineer_form_updatesScalarFieldEnum];
export declare const Engineer_imageScalarFieldEnum: {
    readonly id: "id";
    readonly project_id: "project_id";
    readonly image_data: "image_data";
    readonly uploaded_by: "uploaded_by";
    readonly created_at: "created_at";
    readonly category: "category";
    readonly ipc: "ipc";
    readonly file_path: "file_path";
    readonly binary_id: "binary_id";
    readonly file_size: "file_size";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly taken_at: "taken_at";
    readonly exif_metadata: "exif_metadata";
    readonly outbox_project_id: "outbox_project_id";
    readonly date_captured: "date_captured";
    readonly uploaded_at: "uploaded_at";
};
export type Engineer_imageScalarFieldEnum = (typeof Engineer_imageScalarFieldEnum)[keyof typeof Engineer_imageScalarFieldEnum];
export declare const Engineer_mother_moaScalarFieldEnum: {
    readonly mother_moa_id: "mother_moa_id";
    readonly lgu_type: "lgu_type";
    readonly lgu_name: "lgu_name";
    readonly moa_pdf: "moa_pdf";
    readonly uploaded_by: "uploaded_by";
    readonly created_at: "created_at";
    readonly region: "region";
    readonly province: "province";
    readonly municipality_city: "municipality_city";
    readonly sangguniang_resolution_id: "sangguniang_resolution_id";
    readonly sangguniang_resolution: "sangguniang_resolution";
};
export type Engineer_mother_moaScalarFieldEnum = (typeof Engineer_mother_moaScalarFieldEnum)[keyof typeof Engineer_mother_moaScalarFieldEnum];
export declare const Engineer_projects_inventoryScalarFieldEnum: {
    readonly ipc: "ipc";
    readonly project_name: "project_name";
    readonly school_id: "school_id";
    readonly school_name: "school_name";
    readonly region: "region";
    readonly division: "division";
    readonly province: "province";
    readonly city: "city";
    readonly municipality: "municipality";
    readonly project_category: "project_category";
    readonly funding_year: "funding_year";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Engineer_projects_inventoryScalarFieldEnum = (typeof Engineer_projects_inventoryScalarFieldEnum)[keyof typeof Engineer_projects_inventoryScalarFieldEnum];
export declare const Engineer_supplamental_moaScalarFieldEnum: {
    readonly supplamental_moa_id: "supplamental_moa_id";
    readonly mother_moa_id: "mother_moa_id";
    readonly moa_pdf: "moa_pdf";
    readonly uploaded_by: "uploaded_by";
    readonly created_at: "created_at";
    readonly ipc_ids: "ipc_ids";
};
export type Engineer_supplamental_moaScalarFieldEnum = (typeof Engineer_supplamental_moaScalarFieldEnum)[keyof typeof Engineer_supplamental_moaScalarFieldEnum];
export declare const Engineer_supplemental_moaScalarFieldEnum: {
    readonly supplemental_id: "supplemental_id";
    readonly mother_moa_id: "mother_moa_id";
    readonly moa_pdf: "moa_pdf";
    readonly ipc_ids: "ipc_ids";
    readonly uploaded_by: "uploaded_by";
    readonly created_at: "created_at";
};
export type Engineer_supplemental_moaScalarFieldEnum = (typeof Engineer_supplemental_moaScalarFieldEnum)[keyof typeof Engineer_supplemental_moaScalarFieldEnum];
export declare const Esf7_databaseScalarFieldEnum: {
    readonly id: "id";
    readonly schoool_id: "schoool_id";
    readonly school_name: "school_name";
    readonly region: "region";
    readonly muncipality: "muncipality";
    readonly division: "division";
    readonly district: "district";
    readonly tin: "tin";
    readonly first: "first";
    readonly middle: "middle";
    readonly last: "last";
    readonly gender: "gender";
    readonly fund_source: "fund_source";
    readonly position: "position";
    readonly nature_of_appointment: "nature_of_appointment";
    readonly degree_finished__baccalaureate: "degree_finished__baccalaureate";
    readonly major__specialization: "major__specialization";
    readonly minor: "minor";
    readonly post_graduate__degree: "post_graduate__degree";
    readonly employee_no: "employee_no";
    readonly hiring_arrangement: "hiring_arrangement";
    readonly religion: "religion";
    readonly department_1: "department_1";
    readonly subject_1: "subject_1";
    readonly lvl_1: "lvl_1";
    readonly section_1: "section_1";
    readonly d1_1: "d1_1";
    readonly d2_1: "d2_1";
    readonly d3_1: "d3_1";
    readonly d4_1: "d4_1";
    readonly d5_1: "d5_1";
    readonly d6_1: "d6_1";
    readonly d7_1: "d7_1";
    readonly from_1: "from_1";
    readonly to_1: "to_1";
    readonly department_2: "department_2";
    readonly categ_1: "categ_1";
    readonly department_1_2: "department_1_2";
    readonly subject_1_2: "subject_1_2";
    readonly lvl_1_2: "lvl_1_2";
    readonly section_1_2: "section_1_2";
    readonly d1_1_2: "d1_1_2";
    readonly d2_1_2: "d2_1_2";
    readonly d3_1_2: "d3_1_2";
    readonly d4_1_2: "d4_1_2";
    readonly d5_1_2: "d5_1_2";
    readonly d6_1_2: "d6_1_2";
    readonly d7_1_2: "d7_1_2";
    readonly from_1_2: "from_1_2";
    readonly to_1_2: "to_1_2";
    readonly department_2_2: "department_2_2";
    readonly categ_1_2: "categ_1_2";
    readonly department_1_3: "department_1_3";
    readonly subject_1_3: "subject_1_3";
    readonly lvl_1_3: "lvl_1_3";
    readonly section_1_3: "section_1_3";
    readonly d1_1_3: "d1_1_3";
    readonly d2_1_3: "d2_1_3";
    readonly d3_1_3: "d3_1_3";
    readonly d4_1_3: "d4_1_3";
    readonly d5_1_3: "d5_1_3";
    readonly d6_1_3: "d6_1_3";
    readonly d7_1_3: "d7_1_3";
    readonly from_1_3: "from_1_3";
    readonly to_1_3: "to_1_3";
    readonly department_2_3: "department_2_3";
    readonly categ_1_3: "categ_1_3";
    readonly department_1_4: "department_1_4";
    readonly subject_1_4: "subject_1_4";
    readonly lvl_1_4: "lvl_1_4";
    readonly section_1_4: "section_1_4";
    readonly d1_1_4: "d1_1_4";
    readonly d2_1_4: "d2_1_4";
    readonly d3_1_4: "d3_1_4";
    readonly d4_1_4: "d4_1_4";
    readonly d5_1_4: "d5_1_4";
    readonly d6_1_4: "d6_1_4";
    readonly d7_1_4: "d7_1_4";
    readonly from_1_4: "from_1_4";
    readonly to_1_4: "to_1_4";
    readonly department_2_4: "department_2_4";
    readonly categ_1_4: "categ_1_4";
    readonly department_1_5: "department_1_5";
    readonly subject_1_5: "subject_1_5";
    readonly lvl_1_5: "lvl_1_5";
    readonly section_1_5: "section_1_5";
    readonly d1_1_5: "d1_1_5";
    readonly d2_1_5: "d2_1_5";
    readonly d3_1_5: "d3_1_5";
    readonly d4_1_5: "d4_1_5";
    readonly d5_1_5: "d5_1_5";
    readonly d6_1_5: "d6_1_5";
    readonly d7_1_5: "d7_1_5";
    readonly from_1_5: "from_1_5";
    readonly to_1_5: "to_1_5";
    readonly department_2_5: "department_2_5";
    readonly categ_1_5: "categ_1_5";
    readonly department_1_6: "department_1_6";
    readonly subject_1_6: "subject_1_6";
    readonly lvl_1_6: "lvl_1_6";
    readonly section_1_6: "section_1_6";
    readonly d1_1_6: "d1_1_6";
    readonly d2_1_6: "d2_1_6";
    readonly d3_1_6: "d3_1_6";
    readonly d4_1_6: "d4_1_6";
    readonly d5_1_6: "d5_1_6";
    readonly d6_1_6: "d6_1_6";
    readonly d7_1_6: "d7_1_6";
    readonly from_1_6: "from_1_6";
    readonly to_1_6: "to_1_6";
    readonly department_2_6: "department_2_6";
    readonly categ_1_6: "categ_1_6";
    readonly department_1_7: "department_1_7";
    readonly subject_1_7: "subject_1_7";
    readonly lvl_1_7: "lvl_1_7";
    readonly section_1_7: "section_1_7";
    readonly d1_1_7: "d1_1_7";
    readonly d2_1_7: "d2_1_7";
    readonly d3_1_7: "d3_1_7";
    readonly d4_1_7: "d4_1_7";
    readonly d5_1_7: "d5_1_7";
    readonly d6_1_7: "d6_1_7";
    readonly d7_1_7: "d7_1_7";
    readonly from_1_7: "from_1_7";
    readonly to_1_7: "to_1_7";
    readonly department_2_7: "department_2_7";
    readonly categ_1_7: "categ_1_7";
    readonly department_1_8: "department_1_8";
    readonly subject_1_8: "subject_1_8";
    readonly lvl_1_8: "lvl_1_8";
    readonly section_1_8: "section_1_8";
    readonly d1_1_8: "d1_1_8";
    readonly d2_1_8: "d2_1_8";
    readonly d3_1_8: "d3_1_8";
    readonly d4_1_8: "d4_1_8";
    readonly d5_1_8: "d5_1_8";
    readonly d6_1_8: "d6_1_8";
    readonly d7_1_8: "d7_1_8";
    readonly from_1_8: "from_1_8";
    readonly to_1_8: "to_1_8";
    readonly department_2_8: "department_2_8";
    readonly categ_1_8: "categ_1_8";
    readonly department_1_9: "department_1_9";
    readonly subject_1_9: "subject_1_9";
    readonly lvl_1_9: "lvl_1_9";
    readonly section_1_9: "section_1_9";
    readonly d1_1_9: "d1_1_9";
    readonly d2_1_9: "d2_1_9";
    readonly d3_1_9: "d3_1_9";
    readonly d4_1_9: "d4_1_9";
    readonly d5_1_9: "d5_1_9";
    readonly d6_1_9: "d6_1_9";
    readonly d7_1_9: "d7_1_9";
    readonly from_1_9: "from_1_9";
    readonly to_1_9: "to_1_9";
    readonly department_2_9: "department_2_9";
    readonly categ_1_9: "categ_1_9";
    readonly department_1_10: "department_1_10";
    readonly subject_1_10: "subject_1_10";
    readonly lvl_1_10: "lvl_1_10";
    readonly section_1_10: "section_1_10";
    readonly d1_1_10: "d1_1_10";
    readonly d2_1_10: "d2_1_10";
    readonly d3_1_10: "d3_1_10";
    readonly d4_1_10: "d4_1_10";
    readonly d5_1_10: "d5_1_10";
    readonly d6_1_10: "d6_1_10";
    readonly d7_1_10: "d7_1_10";
    readonly from_1_10: "from_1_10";
    readonly to_1_10: "to_1_10";
    readonly department_2_10: "department_2_10";
    readonly categ_1_10: "categ_1_10";
    readonly department_1_11: "department_1_11";
    readonly subject_1_11: "subject_1_11";
    readonly lvl_1_11: "lvl_1_11";
    readonly section_1_11: "section_1_11";
    readonly d1_1_11: "d1_1_11";
    readonly d2_1_11: "d2_1_11";
    readonly d3_1_11: "d3_1_11";
    readonly d4_1_11: "d4_1_11";
    readonly d5_1_11: "d5_1_11";
    readonly d6_1_11: "d6_1_11";
    readonly d7_1_11: "d7_1_11";
    readonly from_1_11: "from_1_11";
    readonly to_1_11: "to_1_11";
    readonly department_2_11: "department_2_11";
    readonly categ_1_11: "categ_1_11";
    readonly department_1_12: "department_1_12";
    readonly subject_1_12: "subject_1_12";
    readonly lvl_1_12: "lvl_1_12";
    readonly section_1_12: "section_1_12";
    readonly d1_1_12: "d1_1_12";
    readonly d2_1_12: "d2_1_12";
    readonly d3_1_12: "d3_1_12";
    readonly d4_1_12: "d4_1_12";
    readonly d5_1_12: "d5_1_12";
    readonly d6_1_12: "d6_1_12";
    readonly d7_1_12: "d7_1_12";
    readonly from_1_12: "from_1_12";
    readonly to_1_12: "to_1_12";
    readonly department_2_12: "department_2_12";
    readonly categ_1_12: "categ_1_12";
    readonly department_1_13: "department_1_13";
    readonly subject_1_13: "subject_1_13";
    readonly lvl_1_13: "lvl_1_13";
    readonly section_1_13: "section_1_13";
    readonly d1_1_13: "d1_1_13";
    readonly d2_1_13: "d2_1_13";
    readonly d3_1_13: "d3_1_13";
    readonly d4_1_13: "d4_1_13";
    readonly d5_1_13: "d5_1_13";
    readonly d6_1_13: "d6_1_13";
    readonly d7_1_13: "d7_1_13";
    readonly from_1_13: "from_1_13";
    readonly to_1_13: "to_1_13";
    readonly department_2_13: "department_2_13";
    readonly categ_1_13: "categ_1_13";
    readonly department_1_14: "department_1_14";
    readonly subject_1_14: "subject_1_14";
    readonly lvl_1_14: "lvl_1_14";
    readonly section_1_14: "section_1_14";
    readonly d1_1_14: "d1_1_14";
    readonly d2_1_14: "d2_1_14";
    readonly d3_1_14: "d3_1_14";
    readonly d4_1_14: "d4_1_14";
    readonly d5_1_14: "d5_1_14";
    readonly d6_1_14: "d6_1_14";
    readonly d7_1_14: "d7_1_14";
    readonly from_1_14: "from_1_14";
    readonly to_1_14: "to_1_14";
    readonly department_2_14: "department_2_14";
    readonly categ_1_14: "categ_1_14";
    readonly department_1_15: "department_1_15";
    readonly subject_1_15: "subject_1_15";
    readonly lvl_1_15: "lvl_1_15";
    readonly section_1_15: "section_1_15";
    readonly d1_1_15: "d1_1_15";
    readonly d2_1_15: "d2_1_15";
    readonly d3_1_15: "d3_1_15";
    readonly d4_1_15: "d4_1_15";
    readonly d5_1_15: "d5_1_15";
    readonly d6_1_15: "d6_1_15";
    readonly d7_1_15: "d7_1_15";
    readonly from_1_15: "from_1_15";
    readonly to_1_15: "to_1_15";
    readonly department_2_15: "department_2_15";
    readonly categ_1_15: "categ_1_15";
    readonly department_1_16: "department_1_16";
    readonly subject_1_16: "subject_1_16";
    readonly lvl_1_16: "lvl_1_16";
    readonly section_1_16: "section_1_16";
    readonly d1_1_16: "d1_1_16";
    readonly d2_1_16: "d2_1_16";
    readonly d3_1_16: "d3_1_16";
    readonly d4_1_16: "d4_1_16";
    readonly d5_1_16: "d5_1_16";
    readonly d6_1_16: "d6_1_16";
    readonly d7_1_16: "d7_1_16";
    readonly from_1_16: "from_1_16";
    readonly to_1_16: "to_1_16";
    readonly department_2_16: "department_2_16";
    readonly categ_1_16: "categ_1_16";
    readonly department_1_17: "department_1_17";
    readonly subject_1_17: "subject_1_17";
    readonly lvl_1_17: "lvl_1_17";
    readonly section_1_17: "section_1_17";
    readonly d1_1_17: "d1_1_17";
    readonly d2_1_17: "d2_1_17";
    readonly d3_1_17: "d3_1_17";
    readonly d4_1_17: "d4_1_17";
    readonly d5_1_17: "d5_1_17";
    readonly d6_1_17: "d6_1_17";
    readonly d7_1_17: "d7_1_17";
    readonly from_1_17: "from_1_17";
    readonly to_1_17: "to_1_17";
    readonly department_2_17: "department_2_17";
    readonly categ_1_17: "categ_1_17";
    readonly department_1_18: "department_1_18";
    readonly subject_1_18: "subject_1_18";
    readonly lvl_1_18: "lvl_1_18";
    readonly section_1_18: "section_1_18";
    readonly d1_1_18: "d1_1_18";
    readonly d2_1_18: "d2_1_18";
    readonly d3_1_18: "d3_1_18";
    readonly d4_1_18: "d4_1_18";
    readonly d5_1_18: "d5_1_18";
    readonly d6_1_18: "d6_1_18";
    readonly d7_1_18: "d7_1_18";
    readonly from_1_18: "from_1_18";
    readonly to_1_18: "to_1_18";
    readonly department_2_18: "department_2_18";
    readonly categ_1_18: "categ_1_18";
    readonly department_1_19: "department_1_19";
    readonly subject_1_19: "subject_1_19";
    readonly lvl_1_19: "lvl_1_19";
    readonly section_1_19: "section_1_19";
    readonly d1_1_19: "d1_1_19";
    readonly d2_1_19: "d2_1_19";
    readonly d3_1_19: "d3_1_19";
    readonly d4_1_19: "d4_1_19";
    readonly d5_1_19: "d5_1_19";
    readonly d6_1_19: "d6_1_19";
    readonly d7_1_19: "d7_1_19";
    readonly from_1_19: "from_1_19";
    readonly to_1_19: "to_1_19";
    readonly department_2_19: "department_2_19";
    readonly categ_1_19: "categ_1_19";
    readonly department_1_20: "department_1_20";
    readonly subject_1_20: "subject_1_20";
    readonly lvl_1_20: "lvl_1_20";
    readonly section_1_20: "section_1_20";
    readonly d1_1_20: "d1_1_20";
    readonly d2_1_20: "d2_1_20";
    readonly d3_1_20: "d3_1_20";
    readonly d4_1_20: "d4_1_20";
    readonly d5_1_20: "d5_1_20";
    readonly d6_1_20: "d6_1_20";
    readonly d7_1_20: "d7_1_20";
    readonly from_1_20: "from_1_20";
    readonly to_1_20: "to_1_20";
    readonly department_2_20: "department_2_20";
    readonly categ_1_20: "categ_1_20";
    readonly ehtinic_group: "ehtinic_group";
    readonly status__item_: "status__item_";
    readonly last_first: "last_first";
    readonly number_of_loads: "number_of_loads";
    readonly position_value: "position_value";
    readonly rank_position: "rank_position";
    readonly search_and_sort: "search_and_sort";
    readonly filipino: "filipino";
    readonly english: "english";
    readonly mathematics: "mathematics";
    readonly science: "science";
    readonly araling_panlipunan: "araling_panlipunan";
    readonly tle_epp: "tle_epp";
    readonly mapeh: "mapeh";
    readonly esp: "esp";
    readonly mtb: "mtb";
    readonly shs_core_subjects: "shs_core_subjects";
    readonly shs_applied_subjects: "shs_applied_subjects";
    readonly shs_specialized_subjects: "shs_specialized_subjects";
    readonly ancillary_curriculum: "ancillary_curriculum";
    readonly ancillary_admin_management: "ancillary_admin_management";
    readonly ancillary_professional_development: "ancillary_professional_development";
    readonly ancillary_program__project: "ancillary_program__project";
    readonly ancillary_inter__agency: "ancillary_inter__agency";
    readonly advisory: "advisory";
    readonly related_tasks: "related_tasks";
    readonly administrative: "administrative";
    readonly home_guidance: "home_guidance";
    readonly gmrc: "gmrc";
    readonly major: "major";
    readonly non_major: "non_major";
    readonly grandtotal_load: "grandtotal_load";
    readonly time_major: "time_major";
    readonly time_nonmajor: "time_nonmajor";
    readonly time_ancillary_curriculum: "time_ancillary_curriculum";
    readonly time_ancillary_admin_management: "time_ancillary_admin_management";
    readonly time_ancillary_professional_development: "time_ancillary_professional_development";
    readonly time_ancillary_program__project: "time_ancillary_program__project";
    readonly time_ancillary_inter__agency: "time_ancillary_inter__agency";
    readonly time_advisory: "time_advisory";
    readonly time_related_tasks: "time_related_tasks";
    readonly time_administrative: "time_administrative";
    readonly time_home_guidance: "time_home_guidance";
    readonly time_gmrc: "time_gmrc";
    readonly training_1: "training_1";
    readonly training_2: "training_2";
    readonly training_3: "training_3";
    readonly training_4: "training_4";
    readonly training_5: "training_5";
    readonly training_6: "training_6";
    readonly training_7: "training_7";
    readonly training_8: "training_8";
    readonly training_9: "training_9";
    readonly training_10: "training_10";
    readonly training_11: "training_11";
    readonly training_12: "training_12";
    readonly training_13: "training_13";
    readonly training_14: "training_14";
    readonly training_15: "training_15";
    readonly training_16: "training_16";
    readonly training_17: "training_17";
    readonly training_18: "training_18";
    readonly training_19: "training_19";
    readonly training_20: "training_20";
    readonly total_trainings: "total_trainings";
    readonly birthday_mm: "birthday_mm";
    readonly birthday_dd: "birthday_dd";
    readonly birthday_yyyy: "birthday_yyyy";
    readonly appt_mm: "appt_mm";
    readonly school_other_info_a: "school_other_info_a";
    readonly school_other_info_b: "school_other_info_b";
    readonly phylsys_num: "phylsys_num";
    readonly eligibility: "eligibility";
    readonly station_mm: "station_mm";
    readonly station_dd: "station_dd";
    readonly station_yyyy: "station_yyyy";
    readonly civil_status: "civil_status";
    readonly all_time: "all_time";
    readonly appt_yyyy: "appt_yyyy";
    readonly school_id: "school_id";
    readonly iern: "iern";
    readonly data: "data";
    readonly sex: "sex";
    readonly teaching_load: "teaching_load";
    readonly esf7_id: "esf7_id";
    readonly submitted_at: "submitted_at";
    readonly harvested_at: "harvested_at";
    readonly appt_dd: "appt_dd";
    readonly semester: "semester";
    readonly major_specialization: "major_specialization";
    readonly changes: "changes";
};
export type Esf7_databaseScalarFieldEnum = (typeof Esf7_databaseScalarFieldEnum)[keyof typeof Esf7_databaseScalarFieldEnum];
export declare const Esf7_resubmission_requestScalarFieldEnum: {
    readonly id: "id";
    readonly school_id: "school_id";
    readonly status: "status";
    readonly can_resubmit: "can_resubmit";
    readonly request_reason: "request_reason";
    readonly updated_at: "updated_at";
};
export type Esf7_resubmission_requestScalarFieldEnum = (typeof Esf7_resubmission_requestScalarFieldEnum)[keyof typeof Esf7_resubmission_requestScalarFieldEnum];
export declare const Esf7_scan_resultsScalarFieldEnum: {
    readonly job_id: "job_id";
    readonly school_id: "school_id";
    readonly result: "result";
    readonly error: "error";
    readonly status: "status";
    readonly progress: "progress";
    readonly updated_at: "updated_at";
};
export type Esf7_scan_resultsScalarFieldEnum = (typeof Esf7_scan_resultsScalarFieldEnum)[keyof typeof Esf7_scan_resultsScalarFieldEnum];
export declare const Esf7_stagingScalarFieldEnum: {
    readonly id: "id";
    readonly school_id: "school_id";
    readonly data: "data";
    readonly status: "status";
    readonly updated_at: "updated_at";
};
export type Esf7_stagingScalarFieldEnum = (typeof Esf7_stagingScalarFieldEnum)[keyof typeof Esf7_stagingScalarFieldEnum];
export declare const Esf_linkScalarFieldEnum: {
    readonly id: "id";
    readonly school_id: "school_id";
    readonly link: "link";
    readonly status: "status";
    readonly row_count: "row_count";
    readonly summary: "summary";
    readonly audit_remarks: "audit_remarks";
    readonly updated_at: "updated_at";
};
export type Esf_linkScalarFieldEnum = (typeof Esf_linkScalarFieldEnum)[keyof typeof Esf_linkScalarFieldEnum];
export declare const Facility_demolitionsScalarFieldEnum: {
    readonly demolition_id: "demolition_id";
    readonly school_id: "school_id";
    readonly iern: "iern";
    readonly building_no: "building_no";
    readonly created_at: "created_at";
};
export type Facility_demolitionsScalarFieldEnum = (typeof Facility_demolitionsScalarFieldEnum)[keyof typeof Facility_demolitionsScalarFieldEnum];
export declare const Facility_inventoryScalarFieldEnum: {
    readonly id: "id";
    readonly school_id: "school_id";
    readonly iern: "iern";
    readonly building_name: "building_name";
    readonly category: "category";
    readonly status: "status";
    readonly created_at: "created_at";
};
export type Facility_inventoryScalarFieldEnum = (typeof Facility_inventoryScalarFieldEnum)[keyof typeof Facility_inventoryScalarFieldEnum];
export declare const Facility_repairsScalarFieldEnum: {
    readonly repair_id: "repair_id";
    readonly school_id: "school_id";
    readonly iern: "iern";
    readonly building_no: "building_no";
    readonly remarks: "remarks";
    readonly created_at: "created_at";
    readonly repair_roofing: "repair_roofing";
    readonly repair_ceiling_ext: "repair_ceiling_ext";
    readonly repair_ceiling_int: "repair_ceiling_int";
    readonly repair_wall_ext: "repair_wall_ext";
    readonly repair_partition: "repair_partition";
    readonly repair_door: "repair_door";
    readonly repair_windows: "repair_windows";
    readonly repair_flooring: "repair_flooring";
    readonly repair_structural: "repair_structural";
};
export type Facility_repairsScalarFieldEnum = (typeof Facility_repairsScalarFieldEnum)[keyof typeof Facility_repairsScalarFieldEnum];
export declare const Facility_roomsScalarFieldEnum: {
    readonly room_id: "room_id";
    readonly building_id: "building_id";
    readonly school_id: "school_id";
    readonly room_name: "room_name";
    readonly dimension: "dimension";
    readonly grade_level: "grade_level";
    readonly advisory_teacher: "advisory_teacher";
    readonly condition: "condition";
    readonly created_at: "created_at";
};
export type Facility_roomsScalarFieldEnum = (typeof Facility_roomsScalarFieldEnum)[keyof typeof Facility_roomsScalarFieldEnum];
export declare const Finance_projectsScalarFieldEnum: {
    readonly finance_id: "finance_id";
    readonly school_id: "school_id";
    readonly school_name: "school_name";
    readonly project_name: "project_name";
    readonly region: "region";
    readonly division: "division";
    readonly municipality: "municipality";
    readonly district: "district";
    readonly legislative_district: "legislative_district";
    readonly total_funds: "total_funds";
    readonly fund_released: "fund_released";
    readonly date_of_release: "date_of_release";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly root_id: "root_id";
};
export type Finance_projectsScalarFieldEnum = (typeof Finance_projectsScalarFieldEnum)[keyof typeof Finance_projectsScalarFieldEnum];
export declare const Insighted_project_updateScalarFieldEnum: {
    readonly ipc: "ipc";
    readonly approved_budget_for_contract: "approved_budget_for_contract";
    readonly batch_of_funds: "batch_of_funds";
    readonly project_category: "project_category";
    readonly number_of_classrooms: "number_of_classrooms";
    readonly number_of_sites: "number_of_sites";
    readonly implementing_agency: "implementing_agency";
    readonly school_id: "school_id";
    readonly region: "region";
    readonly division: "division";
    readonly scope_of_work: "scope_of_work";
    readonly legislative_district: "legislative_district";
    readonly funding_year: "funding_year";
};
export type Insighted_project_updateScalarFieldEnum = (typeof Insighted_project_updateScalarFieldEnum)[keyof typeof Insighted_project_updateScalarFieldEnum];
export declare const Knex_migrationsScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly batch: "batch";
    readonly migration_time: "migration_time";
};
export type Knex_migrationsScalarFieldEnum = (typeof Knex_migrationsScalarFieldEnum)[keyof typeof Knex_migrationsScalarFieldEnum];
export declare const Knex_migrations_lockScalarFieldEnum: {
    readonly index: "index";
    readonly is_locked: "is_locked";
};
export type Knex_migrations_lockScalarFieldEnum = (typeof Knex_migrations_lockScalarFieldEnum)[keyof typeof Knex_migrations_lockScalarFieldEnum];
export declare const Lgu_imageScalarFieldEnum: {
    readonly id: "id";
    readonly project_id: "project_id";
    readonly image_data: "image_data";
    readonly uploaded_by: "uploaded_by";
    readonly file_size: "file_size";
    readonly created_at: "created_at";
};
export type Lgu_imageScalarFieldEnum = (typeof Lgu_imageScalarFieldEnum)[keyof typeof Lgu_imageScalarFieldEnum];
export declare const Lgu_projectsScalarFieldEnum: {
    readonly lgu_project_id: "lgu_project_id";
    readonly region: "region";
    readonly division: "division";
    readonly district: "district";
    readonly legislative_district: "legislative_district";
    readonly school_id: "school_id";
    readonly school_name: "school_name";
    readonly project_name: "project_name";
    readonly total_funds: "total_funds";
    readonly fund_released: "fund_released";
    readonly date_of_release: "date_of_release";
    readonly liquidated_amount: "liquidated_amount";
    readonly liquidation_date: "liquidation_date";
    readonly percentage_liquidated: "percentage_liquidated";
    readonly finance_id: "finance_id";
    readonly created_at: "created_at";
    readonly source_agency: "source_agency";
    readonly contractor_name: "contractor_name";
    readonly lsb_resolution_no: "lsb_resolution_no";
    readonly moa_ref_no: "moa_ref_no";
    readonly moa_date: "moa_date";
    readonly validity_period: "validity_period";
    readonly contract_duration: "contract_duration";
    readonly date_approved_pow: "date_approved_pow";
    readonly approved_contract_budget: "approved_contract_budget";
    readonly schedule_of_fund_release: "schedule_of_fund_release";
    readonly number_of_tranches: "number_of_tranches";
    readonly amount_per_tranche: "amount_per_tranche";
    readonly mode_of_procurement: "mode_of_procurement";
    readonly philgeps_ref_no: "philgeps_ref_no";
    readonly pcab_license_no: "pcab_license_no";
    readonly date_contract_signing: "date_contract_signing";
    readonly date_notice_of_award: "date_notice_of_award";
    readonly bid_amount: "bid_amount";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly pow_pdf: "pow_pdf";
    readonly dupa_pdf: "dupa_pdf";
    readonly contract_pdf: "contract_pdf";
    readonly project_status: "project_status";
    readonly accomplishment_percentage: "accomplishment_percentage";
    readonly status_as_of_date: "status_as_of_date";
    readonly amount_utilized: "amount_utilized";
    readonly nature_of_delay: "nature_of_delay";
    readonly hydra_manifest: "hydra_manifest";
    readonly root_project_id: "root_project_id";
    readonly pow_size: "pow_size";
    readonly dupa_size: "dupa_size";
    readonly contract_size: "contract_size";
    readonly moa_size: "moa_size";
    readonly rta_size: "rta_size";
    readonly ipc: "ipc";
    readonly lgu_id: "lgu_id";
    readonly lgu_name: "lgu_name";
    readonly batch_of_funds: "batch_of_funds";
    readonly target_completion_date: "target_completion_date";
    readonly actual_completion_date: "actual_completion_date";
    readonly notice_to_proceed: "notice_to_proceed";
    readonly pow_original_size: "pow_original_size";
    readonly dupa_original_size: "dupa_original_size";
    readonly contract_original_size: "contract_original_size";
    readonly moa_original_size: "moa_original_size";
    readonly rta_original_size: "rta_original_size";
    readonly is_reverted: "is_reverted";
    readonly approved_days_of_suspension: "approved_days_of_suspension";
};
export type Lgu_projectsScalarFieldEnum = (typeof Lgu_projectsScalarFieldEnum)[keyof typeof Lgu_projectsScalarFieldEnum];
export declare const Masterlist_26_30ScalarFieldEnum: {
    readonly Index: "Index";
    readonly congressman: "congressman";
    readonly governor: "governor";
    readonly mayor: "mayor";
    readonly region: "region";
    readonly division: "division";
    readonly school_id: "school_id";
    readonly lis_nsbi_school_id_24_25: "lis_nsbi_school_id_24_25";
    readonly in_masterlist_with_gov: "in_masterlist_with_gov";
    readonly school_name: "school_name";
    readonly municipality: "municipality";
    readonly legislative_district: "legislative_district";
    readonly priority_index: "priority_index";
    readonly cl_requirement: "cl_requirement";
    readonly est_classroom_shortage: "est_classroom_shortage";
    readonly no_of_sites: "no_of_sites";
    readonly proposed_no_of_cl: "proposed_no_of_cl";
    readonly no_of_unit: "no_of_unit";
    readonly sty_count: "sty_count";
    readonly cl_count: "cl_count";
    readonly proposed_scope_of_work: "proposed_scope_of_work";
    readonly number_of_workshops: "number_of_workshops";
    readonly workshop_types: "workshop_types";
    readonly other_design_configurations: "other_design_configurations";
    readonly proposed_funding_year: "proposed_funding_year";
    readonly est_classroom_cost: "est_classroom_cost";
    readonly project_implementor: "project_implementor";
    readonly cl_sty_ratio: "cl_sty_ratio";
    readonly province: "province";
};
export type Masterlist_26_30ScalarFieldEnum = (typeof Masterlist_26_30ScalarFieldEnum)[keyof typeof Masterlist_26_30ScalarFieldEnum];
export declare const Notable_achievementsScalarFieldEnum: {
    readonly index_number: "index_number";
    readonly achievement: "achievement";
    readonly delete_flg: "delete_flg";
    readonly create_date: "create_date";
    readonly edit_date: "edit_date";
};
export type Notable_achievementsScalarFieldEnum = (typeof Notable_achievementsScalarFieldEnum)[keyof typeof Notable_achievementsScalarFieldEnum];
export declare const NotificationsScalarFieldEnum: {
    readonly id: "id";
    readonly recipient_uid: "recipient_uid";
    readonly sender_uid: "sender_uid";
    readonly sender_name: "sender_name";
    readonly title: "title";
    readonly message: "message";
    readonly type: "type";
    readonly is_read: "is_read";
    readonly created_at: "created_at";
};
export type NotificationsScalarFieldEnum = (typeof NotificationsScalarFieldEnum)[keyof typeof NotificationsScalarFieldEnum];
export declare const Pending_schoolsScalarFieldEnum: {
    readonly pending_id: "pending_id";
    readonly registration_type: "registration_type";
    readonly old_school_id: "old_school_id";
    readonly school_id: "school_id";
    readonly school_name: "school_name";
    readonly region: "region";
    readonly division: "division";
    readonly district: "district";
    readonly province: "province";
    readonly municipality: "municipality";
    readonly leg_district: "leg_district";
    readonly barangay: "barangay";
    readonly street_address: "street_address";
    readonly mother_school_id: "mother_school_id";
    readonly curricular_offering: "curricular_offering";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly submitted_by: "submitted_by";
    readonly submitted_by_name: "submitted_by_name";
    readonly submitted_at: "submitted_at";
    readonly status: "status";
    readonly reviewed_by: "reviewed_by";
    readonly reviewed_by_name: "reviewed_by_name";
    readonly reviewed_at: "reviewed_at";
    readonly rejection_reason: "rejection_reason";
    readonly special_order: "special_order";
    readonly admin_comment: "admin_comment";
    readonly is_deleted: "is_deleted";
};
export type Pending_schoolsScalarFieldEnum = (typeof Pending_schoolsScalarFieldEnum)[keyof typeof Pending_schoolsScalarFieldEnum];
export declare const Ph_buildings_demolitionScalarFieldEnum: {
    readonly id: "id";
    readonly school_id: "school_id";
    readonly iern: "iern";
    readonly building_name: "building_name";
    readonly room_length: "room_length";
    readonly room_width: "room_width";
    readonly age: "age";
    readonly safety: "safety";
    readonly calamity: "calamity";
    readonly upgrade: "upgrade";
    readonly created_at: "created_at";
    readonly less_than_7x9: "less_than_7x9";
    readonly x9: "x9";
    readonly above_7x9: "above_7x9";
    readonly room_name: "room_name";
    readonly reason_age: "reason_age";
    readonly reason_safety: "reason_safety";
    readonly reason_calamity: "reason_calamity";
    readonly reason_upgrade: "reason_upgrade";
};
export type Ph_buildings_demolitionScalarFieldEnum = (typeof Ph_buildings_demolitionScalarFieldEnum)[keyof typeof Ph_buildings_demolitionScalarFieldEnum];
export declare const Ph_buildings_inventoryScalarFieldEnum: {
    readonly id: "id";
    readonly school_id: "school_id";
    readonly iern: "iern";
    readonly building_name: "building_name";
    readonly category: "category";
    readonly storey: "storey";
    readonly classroom: "classroom";
    readonly room_length: "room_length";
    readonly room_width: "room_width";
    readonly year_completed: "year_completed";
    readonly remarks: "remarks";
    readonly status: "status";
    readonly created_at: "created_at";
    readonly room_name: "room_name";
    readonly less_than_7x9: "less_than_7x9";
    readonly x9: "x9";
    readonly above_7x9: "above_7x9";
    readonly grade_level: "grade_level";
    readonly advisory_teacher: "advisory_teacher";
    readonly is_in_use: "is_in_use";
    readonly seats: "seats";
    readonly dimension: "dimension";
};
export type Ph_buildings_inventoryScalarFieldEnum = (typeof Ph_buildings_inventoryScalarFieldEnum)[keyof typeof Ph_buildings_inventoryScalarFieldEnum];
export declare const Ph_buildings_repairsScalarFieldEnum: {
    readonly id: "id";
    readonly school_id: "school_id";
    readonly iern: "iern";
    readonly building_name: "building_name";
    readonly room_name: "room_name";
    readonly item_name: "item_name";
    readonly oms: "oms";
    readonly condition: "condition";
    readonly damage_ratio: "damage_ratio";
    readonly recommended_action: "recommended_action";
    readonly demo_justification: "demo_justification";
    readonly remarks: "remarks";
    readonly created_at: "created_at";
};
export type Ph_buildings_repairsScalarFieldEnum = (typeof Ph_buildings_repairsScalarFieldEnum)[keyof typeof Ph_buildings_repairsScalarFieldEnum];
export declare const Ph_ecart_batchesScalarFieldEnum: {
    readonly id: "id";
    readonly school_id: "school_id";
    readonly iern: "iern";
    readonly batches_name: "batches_name";
    readonly year_received: "year_received";
    readonly sources_fund: "sources_fund";
    readonly ecart_laptops: "ecart_laptops";
    readonly ecart_tablets: "ecart_tablets";
    readonly ecart_tv: "ecart_tv";
    readonly charging_condition: "charging_condition";
    readonly remarks: "remarks";
    readonly created_at: "created_at";
};
export type Ph_ecart_batchesScalarFieldEnum = (typeof Ph_ecart_batchesScalarFieldEnum)[keyof typeof Ph_ecart_batchesScalarFieldEnum];
export declare const Ph_migrationsScalarFieldEnum: {
    readonly id: "id";
    readonly migration_name: "migration_name";
    readonly executed_at: "executed_at";
};
export type Ph_migrationsScalarFieldEnum = (typeof Ph_migrationsScalarFieldEnum)[keyof typeof Ph_migrationsScalarFieldEnum];
export declare const Ph_school_buildable_spacesScalarFieldEnum: {
    readonly id: "id";
    readonly school_id: "school_id";
    readonly iern: "iern";
    readonly space_name: "space_name";
    readonly center_lat: "center_lat";
    readonly center_lng: "center_lng";
    readonly length_m: "length_m";
    readonly width_m: "width_m";
    readonly total_area_sqm: "total_area_sqm";
    readonly created_at: "created_at";
    readonly rotation_deg: "rotation_deg";
    readonly less_than_7x9: "less_than_7x9";
    readonly x9: "x9";
    readonly above_7x9: "above_7x9";
    readonly dimension: "dimension";
    readonly status: "status";
};
export type Ph_school_buildable_spacesScalarFieldEnum = (typeof Ph_school_buildable_spacesScalarFieldEnum)[keyof typeof Ph_school_buildable_spacesScalarFieldEnum];
export declare const Ph_school_completionScalarFieldEnum: {
    readonly iern: "iern";
    readonly school_id: "school_id";
    readonly region: "region";
    readonly division: "division";
    readonly unit1_completion: "unit1_completion";
    readonly unit2_completion: "unit2_completion";
    readonly unit3_completion: "unit3_completion";
    readonly unit4_completion: "unit4_completion";
    readonly unit5_completion: "unit5_completion";
    readonly unit6_completion: "unit6_completion";
    readonly unit7_completion: "unit7_completion";
    readonly unit8_completion: "unit8_completion";
    readonly total_completion: "total_completion";
    readonly registration_date: "registration_date";
    readonly updated_at: "updated_at";
    readonly unit9_completion: "unit9_completion";
    readonly unit10_completion: "unit10_completion";
};
export type Ph_school_completionScalarFieldEnum = (typeof Ph_school_completionScalarFieldEnum)[keyof typeof Ph_school_completionScalarFieldEnum];
export declare const Ph_schoolsScalarFieldEnum: {
    readonly iern: "iern";
    readonly school_id: "school_id";
    readonly updated_at: "updated_at";
    readonly verified_as_of: "verified_as_of";
    readonly school_name: "school_name";
    readonly region: "region";
    readonly province: "province";
    readonly municipality: "municipality";
    readonly barangay: "barangay";
    readonly division: "division";
    readonly district: "district";
    readonly leg_district: "leg_district";
    readonly curricular_offering: "curricular_offering";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly school_head: "school_head";
    readonly contact_number: "contact_number";
    readonly ownership: "ownership";
    readonly ownership_document_path: "ownership_document_path";
    readonly ownership_document_type: "ownership_document_type";
    readonly google_drive_link: "google_drive_link";
    readonly google_drive_file_id: "google_drive_file_id";
    readonly google_drive_file_name: "google_drive_file_name";
    readonly google_drive_thumbnail_url: "google_drive_thumbnail_url";
    readonly school_type: "school_type";
    readonly mother_school_id: "mother_school_id";
    readonly extension_mother_school_name: "extension_mother_school_name";
    readonly established_month: "established_month";
    readonly established_year: "established_year";
    readonly head_first_name: "head_first_name";
    readonly head_middle_name: "head_middle_name";
    readonly head_last_name: "head_last_name";
    readonly head_sex: "head_sex";
    readonly head_position_title: "head_position_title";
    readonly head_date_of_birth: "head_date_of_birth";
    readonly head_date_hired: "head_date_hired";
    readonly unit1_updated_at: "unit1_updated_at";
    readonly enroll_kinder: "enroll_kinder";
    readonly enroll_g1: "enroll_g1";
    readonly enroll_g2: "enroll_g2";
    readonly enroll_g3: "enroll_g3";
    readonly enroll_g4: "enroll_g4";
    readonly enroll_g5: "enroll_g5";
    readonly enroll_g6: "enroll_g6";
    readonly enroll_g7: "enroll_g7";
    readonly enroll_g8: "enroll_g8";
    readonly enroll_g9: "enroll_g9";
    readonly enroll_g10: "enroll_g10";
    readonly enroll_g11: "enroll_g11";
    readonly enroll_g12: "enroll_g12";
    readonly total_enrollment: "total_enrollment";
    readonly male_enrollment: "male_enrollment";
    readonly female_enrollment: "female_enrollment";
    readonly total_male: "total_male";
    readonly total_female: "total_female";
    readonly kinder_male: "kinder_male";
    readonly kinder_female: "kinder_female";
    readonly g1_male: "g1_male";
    readonly g1_female: "g1_female";
    readonly g2_male: "g2_male";
    readonly g2_female: "g2_female";
    readonly g3_male: "g3_male";
    readonly g3_female: "g3_female";
    readonly g4_male: "g4_male";
    readonly g4_female: "g4_female";
    readonly g5_male: "g5_male";
    readonly g5_female: "g5_female";
    readonly g6_male: "g6_male";
    readonly g6_female: "g6_female";
    readonly g7_male: "g7_male";
    readonly g7_female: "g7_female";
    readonly g8_male: "g8_male";
    readonly g8_female: "g8_female";
    readonly g9_male: "g9_male";
    readonly g9_female: "g9_female";
    readonly g10_male: "g10_male";
    readonly g10_female: "g10_female";
    readonly g11_male: "g11_male";
    readonly g11_female: "g11_female";
    readonly g12_male: "g12_male";
    readonly g12_female: "g12_female";
    readonly sned_male: "sned_male";
    readonly sned_female: "sned_female";
    readonly sned_self_contained_count: "sned_self_contained_count";
    readonly unit2_simplified_enrollment: "unit2_simplified_enrollment";
    readonly multigrade_groupings_1: "multigrade_groupings_1";
    readonly multigrade_groupings_2: "multigrade_groupings_2";
    readonly multigrade_groupings_3: "multigrade_groupings_3";
    readonly multigrade_enrollment_1: "multigrade_enrollment_1";
    readonly multigrade_enrollment_2: "multigrade_enrollment_2";
    readonly multigrade_enrollment_3: "multigrade_enrollment_3";
    readonly unit2_updated_at: "unit2_updated_at";
    readonly unit3_updated_at: "unit3_updated_at";
    readonly has_standard_shifting: "has_standard_shifting";
    readonly adm_mdl: "adm_mdl";
    readonly adm_odl: "adm_odl";
    readonly adm_tvi: "adm_tvi";
    readonly adm_blended: "adm_blended";
    readonly shifting_modality: "shifting_modality";
    readonly shift_kinder: "shift_kinder";
    readonly shift_g1: "shift_g1";
    readonly shift_g2: "shift_g2";
    readonly shift_g3: "shift_g3";
    readonly shift_g4: "shift_g4";
    readonly shift_g5: "shift_g5";
    readonly shift_g6: "shift_g6";
    readonly shift_g7: "shift_g7";
    readonly shift_g8: "shift_g8";
    readonly shift_g9: "shift_g9";
    readonly shift_g10: "shift_g10";
    readonly shift_g11: "shift_g11";
    readonly shift_g12: "shift_g12";
    readonly shift_mg_1: "shift_mg_1";
    readonly shift_mg_2: "shift_mg_2";
    readonly shift_mg_3: "shift_mg_3";
    readonly mode_kinder: "mode_kinder";
    readonly mode_g1: "mode_g1";
    readonly mode_g2: "mode_g2";
    readonly mode_g3: "mode_g3";
    readonly mode_g4: "mode_g4";
    readonly mode_g5: "mode_g5";
    readonly mode_g6: "mode_g6";
    readonly mode_g7: "mode_g7";
    readonly mode_g8: "mode_g8";
    readonly mode_g9: "mode_g9";
    readonly mode_g10: "mode_g10";
    readonly mode_g11: "mode_g11";
    readonly mode_g12: "mode_g12";
    readonly mode_mg_1: "mode_mg_1";
    readonly mode_mg_2: "mode_mg_2";
    readonly mode_mg_3: "mode_mg_3";
    readonly unit5_updated_at: "unit5_updated_at";
    readonly total_teachers_registered: "total_teachers_registered";
    readonly total_teachers_kinder: "total_teachers_kinder";
    readonly total_teachers_elementary: "total_teachers_elementary";
    readonly total_teachers_jhs: "total_teachers_jhs";
    readonly total_teachers_shs: "total_teachers_shs";
    readonly unit6_updated_at: "unit6_updated_at";
    readonly unit7_furniture: "unit7_furniture";
    readonly unit7_ict: "unit7_ict";
    readonly unit7_has_ecart: "unit7_has_ecart";
    readonly unit7_ecarts: "unit7_ecarts";
    readonly unit7_wash: "unit7_wash";
    readonly unit7_utilities: "unit7_utilities";
    readonly u7_ict_smart_tv_cond: "u7_ict_smart_tv_cond";
    readonly u7_ict_projector_cond: "u7_ict_projector_cond";
    readonly u7_ict_printer_cond: "u7_ict_printer_cond";
    readonly u7_wash_male_seats_cond: "u7_wash_male_seats_cond";
    readonly u7_wash_female_seats_cond: "u7_wash_female_seats_cond";
    readonly u7_wash_common_seats_cond: "u7_wash_common_seats_cond";
    readonly u7_wash_pwd_seats_cond: "u7_wash_pwd_seats_cond";
    readonly u7_wash_faucets_cond: "u7_wash_faucets_cond";
    readonly u7_confirm_no_grid: "u7_confirm_no_grid";
    readonly u7_confirm_no_piped: "u7_confirm_no_piped";
    readonly u7_confirm_no_wired: "u7_confirm_no_wired";
    readonly u7_utility_internet_type: "u7_utility_internet_type";
    readonly unit7_updated_at: "unit7_updated_at";
    readonly bldg_count_good: "bldg_count_good";
    readonly bldg_count_minor_repair: "bldg_count_minor_repair";
    readonly bldg_count_major_repair: "bldg_count_major_repair";
    readonly it_laptop_total: "it_laptop_total";
    readonly it_tablet_total: "it_tablet_total";
    readonly it_pc_total: "it_pc_total";
    readonly it_printer_total: "it_printer_total";
    readonly it_ecart_total: "it_ecart_total";
    readonly unit8_updated_at: "unit8_updated_at";
    readonly hazard_risk_score: "hazard_risk_score";
    readonly unit9_updated_at: "unit9_updated_at";
    readonly unit10_updated_at: "unit10_updated_at";
    readonly unit_completion: "unit_completion";
    readonly forms_completed_count: "forms_completed_count";
    readonly completion_percentage: "completion_percentage";
    readonly school_classification: "school_classification";
    readonly sned_learners: "sned_learners";
    readonly non_graded_learners: "non_graded_learners";
    readonly aral_math_g1: "aral_math_g1";
    readonly aral_math_g2: "aral_math_g2";
    readonly aral_math_g3: "aral_math_g3";
    readonly aral_math_g4: "aral_math_g4";
    readonly aral_math_g5: "aral_math_g5";
    readonly aral_math_g6: "aral_math_g6";
    readonly aral_read_g1: "aral_read_g1";
    readonly aral_read_g2: "aral_read_g2";
    readonly aral_read_g3: "aral_read_g3";
    readonly aral_read_g4: "aral_read_g4";
    readonly aral_read_g5: "aral_read_g5";
    readonly aral_read_g6: "aral_read_g6";
    readonly aral_sci_g1: "aral_sci_g1";
    readonly aral_sci_g2: "aral_sci_g2";
    readonly aral_sci_g3: "aral_sci_g3";
    readonly aral_sci_g4: "aral_sci_g4";
    readonly aral_sci_g5: "aral_sci_g5";
    readonly aral_sci_g6: "aral_sci_g6";
    readonly multigrade_details: "multigrade_details";
    readonly sections_kinder: "sections_kinder";
    readonly size_less_kinder: "size_less_kinder";
    readonly size_within_kinder: "size_within_kinder";
    readonly size_above_kinder: "size_above_kinder";
    readonly sections_g1: "sections_g1";
    readonly size_less_g1: "size_less_g1";
    readonly size_within_g1: "size_within_g1";
    readonly size_above_g1: "size_above_g1";
    readonly sections_g2: "sections_g2";
    readonly size_less_g2: "size_less_g2";
    readonly size_within_g2: "size_within_g2";
    readonly size_above_g2: "size_above_g2";
    readonly sections_g3: "sections_g3";
    readonly size_less_g3: "size_less_g3";
    readonly size_within_g3: "size_within_g3";
    readonly size_above_g3: "size_above_g3";
    readonly sections_g4: "sections_g4";
    readonly size_less_g4: "size_less_g4";
    readonly size_within_g4: "size_within_g4";
    readonly size_above_g4: "size_above_g4";
    readonly sections_g5: "sections_g5";
    readonly size_less_g5: "size_less_g5";
    readonly size_within_g5: "size_within_g5";
    readonly size_above_g5: "size_above_g5";
    readonly sections_g6: "sections_g6";
    readonly size_less_g6: "size_less_g6";
    readonly size_within_g6: "size_within_g6";
    readonly size_above_g6: "size_above_g6";
    readonly als_k: "als_k";
    readonly muslim_k: "muslim_k";
    readonly ip_k: "ip_k";
    readonly lwd_k: "lwd_k";
    readonly displaced_k: "displaced_k";
    readonly overage_k: "overage_k";
    readonly sned_k: "sned_k";
    readonly dropout_k: "dropout_k";
    readonly repeater_k: "repeater_k";
    readonly has_electricity: "has_electricity";
    readonly has_internet: "has_internet";
    readonly water_source: "water_source";
    readonly classrooms_total: "classrooms_total";
    readonly classrooms_good: "classrooms_good";
    readonly classrooms_repair: "classrooms_repair";
    readonly classrooms_condemned: "classrooms_condemned";
    readonly toilets_male: "toilets_male";
    readonly toilets_female: "toilets_female";
    readonly toilets_pwd: "toilets_pwd";
    readonly handwashing_stations: "handwashing_stations";
    readonly shift_k: "shift_k";
    readonly mode_k: "mode_k";
    readonly adm_others: "adm_others";
    readonly unit3_sections: "unit3_sections";
    readonly building_inventory_data: "building_inventory_data";
    readonly buildable_space_data: "buildable_space_data";
    readonly unit9_furniture: "unit9_furniture";
    readonly unit9_ict: "unit9_ict";
    readonly unit9_has_ecart: "unit9_has_ecart";
    readonly unit9_ecarts: "unit9_ecarts";
    readonly unit9_wash: "unit9_wash";
    readonly unit9_utilities: "unit9_utilities";
    readonly unit4_dropouts: "unit4_dropouts";
    readonly has_sned: "has_sned";
    readonly sned_total_count: "sned_total_count";
    readonly sned_program_type: "sned_program_type";
    readonly sned_organized_class_count: "sned_organized_class_count";
    readonly unit10_completed: "unit10_completed";
    readonly unit1: "unit1";
    readonly unit2: "unit2";
    readonly unit8: "unit8";
    readonly unit5: "unit5";
    readonly unit6: "unit6";
    readonly unit3: "unit3";
    readonly unit7: "unit7";
    readonly unit1_completed: "unit1_completed";
    readonly unit2_completed: "unit2_completed";
    readonly unit3_completed: "unit3_completed";
    readonly unit5_completed: "unit5_completed";
    readonly unit6_completed: "unit6_completed";
    readonly unit7_completed: "unit7_completed";
    readonly unit8_completed: "unit8_completed";
    readonly unit9: "unit9";
    readonly unit9_completed: "unit9_completed";
    readonly unit10: "unit10";
    readonly u7_confirm_zero_wash: "u7_confirm_zero_wash";
    readonly build_classrooms_total: "build_classrooms_total";
    readonly build_classrooms_new: "build_classrooms_new";
    readonly build_classrooms_good: "build_classrooms_good";
    readonly build_classrooms_repair: "build_classrooms_repair";
    readonly build_classrooms_demolition: "build_classrooms_demolition";
    readonly submitted_by: "submitted_by";
    readonly local_file_path: "local_file_path";
    readonly local_file_name: "local_file_name";
    readonly local_file_size: "local_file_size";
    readonly annex_details: "annex_details";
    readonly has_no_building: "has_no_building";
    readonly ownership_multiple: "ownership_multiple";
    readonly ownership_na_reason: "ownership_na_reason";
    readonly uploaded_at: "uploaded_at";
    readonly approved_at: "approved_at";
    readonly has_facilities_anomaly: "has_facilities_anomaly";
    readonly unit7_status: "unit7_status";
    readonly u9_general: "u9_general";
    readonly u9_wiring: "u9_wiring";
    readonly u9_cords_cctv: "u9_cords_cctv";
    readonly u9_final: "u9_final";
    readonly u9_fire_exit_exists: "u9_fire_exit_exists";
    readonly u9_backup_light_exists: "u9_backup_light_exists";
    readonly u9_ecart_load_ready: "u9_ecart_load_ready";
    readonly u9_has_surge_protection: "u9_has_surge_protection";
    readonly u9_remarks: "u9_remarks";
    readonly u9_cctv_working: "u9_cctv_working";
    readonly u9_cctv_broken: "u9_cctv_broken";
    readonly u9_cctv_spares: "u9_cctv_spares";
    readonly u9_fire_ext_working: "u9_fire_ext_working";
    readonly u9_fire_ext_broken: "u9_fire_ext_broken";
    readonly u9_fire_ext_spares: "u9_fire_ext_spares";
    readonly u9_first_aid_working: "u9_first_aid_working";
    readonly u9_first_aid_broken: "u9_first_aid_broken";
    readonly u9_first_aid_spares: "u9_first_aid_spares";
    readonly u9_bullhorns_working: "u9_bullhorns_working";
    readonly u9_bullhorns_broken: "u9_bullhorns_broken";
    readonly u9_bullhorns_spares: "u9_bullhorns_spares";
    readonly u9_radios_working: "u9_radios_working";
    readonly u9_radios_broken: "u9_radios_broken";
    readonly u9_radios_spares: "u9_radios_spares";
    readonly u9_flashlight_working: "u9_flashlight_working";
    readonly u9_flashlight_broken: "u9_flashlight_broken";
    readonly u9_flashlight_spares: "u9_flashlight_spares";
    readonly u9_whistles_quantity: "u9_whistles_quantity";
    readonly u9_bulbs_working: "u9_bulbs_working";
    readonly u9_bulbs_broken: "u9_bulbs_broken";
    readonly u9_bulbs_spares: "u9_bulbs_spares";
    readonly u9_covers_working: "u9_covers_working";
    readonly u9_covers_broken: "u9_covers_broken";
    readonly u9_covers_spares: "u9_covers_spares";
    readonly u9_breakers_working: "u9_breakers_working";
    readonly u9_breakers_broken: "u9_breakers_broken";
    readonly u9_breakers_spares: "u9_breakers_spares";
    readonly u9_ext_cords_working: "u9_ext_cords_working";
    readonly u9_ext_cords_broken: "u9_ext_cords_broken";
    readonly u9_ext_cords_spares: "u9_ext_cords_spares";
    readonly u9_tape_quantity: "u9_tape_quantity";
    readonly unit10_spaces: "unit10_spaces";
    readonly unit7_has_no_building: "unit7_has_no_building";
    readonly unit7_data: "unit7_data";
    readonly unit7_rooms: "unit7_rooms";
    readonly unit7_repair: "unit7_repair";
    readonly unit7_demolition: "unit7_demolition";
    readonly unit7_spaces: "unit7_spaces";
    readonly u7_confirm_no_space: "u7_confirm_no_space";
    readonly is_esf7_opened: "is_esf7_opened";
    readonly status: "status";
    readonly ownership_document_multiple: "ownership_document_multiple";
    readonly ownership_doc_id: "ownership_doc_id";
    readonly ownership_doc_compressed_id: "ownership_doc_compressed_id";
    readonly ownership_doc_compressed_size: "ownership_doc_compressed_size";
    readonly unit4: "unit4";
    readonly unit4_completed: "unit4_completed";
    readonly unit4_updated_at: "unit4_updated_at";
};
export type Ph_schoolsScalarFieldEnum = (typeof Ph_schoolsScalarFieldEnum)[keyof typeof Ph_schoolsScalarFieldEnum];
export declare const Ph_schools_validateScalarFieldEnum: {
    readonly school_id: "school_id";
    readonly unit1_completed: "unit1_completed";
    readonly unit2_completed: "unit2_completed";
    readonly unit3_completed: "unit3_completed";
    readonly unit4_completed: "unit4_completed";
    readonly unit5_completed: "unit5_completed";
    readonly unit6_completed: "unit6_completed";
    readonly unit7_completed: "unit7_completed";
    readonly unit8_completed: "unit8_completed";
    readonly unit9_completed: "unit9_completed";
    readonly unit1_validated: "unit1_validated";
    readonly unit2_validated: "unit2_validated";
    readonly unit3_validated: "unit3_validated";
    readonly unit4_validated: "unit4_validated";
    readonly unit5_validated: "unit5_validated";
    readonly unit6_validated: "unit6_validated";
    readonly unit7_validated: "unit7_validated";
    readonly unit8_validated: "unit8_validated";
    readonly unit9_validated: "unit9_validated";
    readonly needs_validation: "needs_validation";
    readonly validation_percentage: "validation_percentage";
    readonly validated_units_count: "validated_units_count";
};
export type Ph_schools_validateScalarFieldEnum = (typeof Ph_schools_validateScalarFieldEnum)[keyof typeof Ph_schools_validateScalarFieldEnum];
export declare const Ph_teachers_listScalarFieldEnum: {
    readonly id: "id";
    readonly school_id: "school_id";
    readonly first_name: "first_name";
    readonly last_name: "last_name";
    readonly created_at: "created_at";
    readonly designations: "designations";
};
export type Ph_teachers_listScalarFieldEnum = (typeof Ph_teachers_listScalarFieldEnum)[keyof typeof Ph_teachers_listScalarFieldEnum];
export declare const Project_documentsScalarFieldEnum: {
    readonly id: "id";
    readonly project_id: "project_id";
    readonly doc_type: "doc_type";
    readonly file_data: "file_data";
    readonly created_at: "created_at";
};
export type Project_documentsScalarFieldEnum = (typeof Project_documentsScalarFieldEnum)[keyof typeof Project_documentsScalarFieldEnum];
export declare const RealignmentsScalarFieldEnum: {
    readonly id: "id";
    readonly source_project_id: "source_project_id";
    readonly target_project_id: "target_project_id";
    readonly source_ipc: "source_ipc";
    readonly target_ipc: "target_ipc";
    readonly realignment_amount: "realignment_amount";
    readonly request_date: "request_date";
    readonly justification: "justification";
    readonly approving_authority: "approving_authority";
    readonly status: "status";
    readonly document_url: "document_url";
    readonly created_at: "created_at";
    readonly created_by: "created_by";
};
export type RealignmentsScalarFieldEnum = (typeof RealignmentsScalarFieldEnum)[keyof typeof RealignmentsScalarFieldEnum];
export declare const Regional_engineer_documentsScalarFieldEnum: {
    readonly doc_id: "doc_id";
    readonly project_id: "project_id";
    readonly ipc: "ipc";
    readonly pow_pdf: "pow_pdf";
    readonly dupa_pdf: "dupa_pdf";
    readonly contract_pdf: "contract_pdf";
    readonly rta_pdf: "rta_pdf";
    readonly moa_pdf: "moa_pdf";
    readonly uploader_id: "uploader_id";
    readonly created_at: "created_at";
    readonly pow_filename: "pow_filename";
    readonly dupa_filename: "dupa_filename";
    readonly contract_filename: "contract_filename";
    readonly binary_id: "binary_id";
    readonly pow_binary_id: "pow_binary_id";
    readonly dupa_binary_id: "dupa_binary_id";
    readonly contract_binary_id: "contract_binary_id";
    readonly rta_binary_id: "rta_binary_id";
    readonly moa_binary_id: "moa_binary_id";
    readonly pow_size: "pow_size";
    readonly dupa_size: "dupa_size";
    readonly contract_size: "contract_size";
    readonly moa_size: "moa_size";
    readonly rta_size: "rta_size";
    readonly hydra_manifest: "hydra_manifest";
    readonly pow_original_size: "pow_original_size";
    readonly dupa_original_size: "dupa_original_size";
    readonly contract_original_size: "contract_original_size";
    readonly moa_original_size: "moa_original_size";
    readonly rta_original_size: "rta_original_size";
    readonly outbox_project_id: "outbox_project_id";
    readonly suspension_order_pdf: "suspension_order_pdf";
    readonly suspension_order_filename: "suspension_order_filename";
    readonly suspension_order_size: "suspension_order_size";
    readonly suspension_order_original_size: "suspension_order_original_size";
};
export type Regional_engineer_documentsScalarFieldEnum = (typeof Regional_engineer_documentsScalarFieldEnum)[keyof typeof Regional_engineer_documentsScalarFieldEnum];
export declare const Regional_engineer_formScalarFieldEnum: {
    readonly project_id: "project_id";
    readonly project_name: "project_name";
    readonly school_name: "school_name";
    readonly school_id: "school_id";
    readonly region: "region";
    readonly division: "division";
    readonly status_of_construction_phase: "status_of_construction_phase";
    readonly accomplishment_percentage: "accomplishment_percentage";
    readonly status_as_of: "status_as_of";
    readonly target_completion_date: "target_completion_date";
    readonly actual_completion_date: "actual_completion_date";
    readonly notice_to_proceed: "notice_to_proceed";
    readonly contractor_name: "contractor_name";
    readonly approved_budget_for_contract: "approved_budget_for_contract";
    readonly batch_of_funds: "batch_of_funds";
    readonly other_remarks: "other_remarks";
    readonly created_at: "created_at";
    readonly engineer_id: "engineer_id";
    readonly validation_status: "validation_status";
    readonly validation_remarks: "validation_remarks";
    readonly validated_by: "validated_by";
    readonly ipc: "ipc";
    readonly engineer_name: "engineer_name";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly construction_start_date: "construction_start_date";
    readonly project_category: "project_category";
    readonly scope_of_work: "scope_of_work";
    readonly number_of_classrooms: "number_of_classrooms";
    readonly number_of_sites: "number_of_sites";
    readonly number_of_storeys: "number_of_storeys";
    readonly actions: "actions";
    readonly contract_amount: "contract_amount";
    readonly funds_utilized: "funds_utilized";
    readonly savings: "savings";
    readonly status_design_phase: "status_design_phase";
    readonly contract_id: "contract_id";
    readonly date_notice_of_award: "date_notice_of_award";
    readonly issuance_of_invitation_to_bid: "issuance_of_invitation_to_bid";
    readonly pre_bid_conference: "pre_bid_conference";
    readonly opening_of_technical_proposal: "opening_of_technical_proposal";
    readonly opening_of_financial_proposal: "opening_of_financial_proposal";
    readonly request_for_quotation: "request_for_quotation";
    readonly negotiation: "negotiation";
    readonly opening_of_quotation: "opening_of_quotation";
    readonly funding_year: "funding_year";
    readonly funding_year_justification: "funding_year_justification";
    readonly revised_target_completion_date: "revised_target_completion_date";
    readonly delay_reason: "delay_reason";
    readonly time_lapsed_days: "time_lapsed_days";
    readonly time_lapsed_percentage: "time_lapsed_percentage";
    readonly is_donated: "is_donated";
    readonly uploader_type: "uploader_type";
    readonly mode_of_project: "mode_of_project";
    readonly date_assigned: "date_assigned";
    readonly assigned_engineer_id: "assigned_engineer_id";
    readonly assigned_engineer_name: "assigned_engineer_name";
    readonly implementing_agency: "implementing_agency";
    readonly implementing_agency_specific: "implementing_agency_specific";
    readonly uploader_id_moa_rta: "uploader_id_moa_rta";
    readonly no_of_units: "no_of_units";
    readonly program_type: "program_type";
    readonly province: "province";
    readonly city: "city";
    readonly municipality: "municipality";
    readonly mother_moa_id: "mother_moa_id";
    readonly sangguniang_resolution_id: "sangguniang_resolution_id";
    readonly leg_district: "leg_district";
    readonly supplamental_moa_id: "supplamental_moa_id";
    readonly status_as_of_date: "status_as_of_date";
    readonly procurement_status: "procurement_status";
    readonly project_category_id: "project_category_id";
    readonly pow_pdf: "pow_pdf";
    readonly dupa_pdf: "dupa_pdf";
    readonly contract_pdf: "contract_pdf";
    readonly checklist: "checklist";
    readonly triangulated_percentage: "triangulated_percentage";
    readonly pow_filename: "pow_filename";
    readonly dupa_filename: "dupa_filename";
    readonly contract_filename: "contract_filename";
    readonly approval_status: "approval_status";
    readonly is_duplicate: "is_duplicate";
    readonly dpwh_project_id: "dpwh_project_id";
    readonly content_hash: "content_hash";
    readonly district: "district";
    readonly contractor_id: "contractor_id";
    readonly issuance_of_resolution_to_award: "issuance_of_resolution_to_award";
    readonly notice_to_proceed_date: "notice_to_proceed_date";
    readonly legislative_district: "legislative_district";
    readonly status_check: "status_check";
    readonly pcab_license_number: "pcab_license_number";
    readonly notice_of_award: "notice_of_award";
    readonly start_date: "start_date";
    readonly suspension_events: "suspension_events";
    readonly is_reverted: "is_reverted";
    readonly approved_days_of_suspension: "approved_days_of_suspension";
    readonly suspension_order_pdf: "suspension_order_pdf";
    readonly suspension_order_days: "suspension_order_days";
    readonly contract_duration: "contract_duration";
    readonly procurement_details_status: "procurement_details_status";
    readonly bidding_status: "bidding_status";
    readonly column27: "column27";
    readonly final_inspection_date: "final_inspection_date";
    readonly certificate_of_completion_date: "certificate_of_completion_date";
    readonly turnover_acceptance_date: "turnover_acceptance_date";
};
export type Regional_engineer_formScalarFieldEnum = (typeof Regional_engineer_formScalarFieldEnum)[keyof typeof Regional_engineer_formScalarFieldEnum];
export declare const Regional_engineer_form_updatesScalarFieldEnum: {
    readonly update_id: "update_id";
    readonly ipc: "ipc";
    readonly project_id_ref: "project_id_ref";
    readonly school_id: "school_id";
    readonly school_name: "school_name";
    readonly project_name: "project_name";
    readonly procurement_status: "procurement_status";
    readonly contract_id: "contract_id";
    readonly contractor_id: "contractor_id";
    readonly contractor_name: "contractor_name";
    readonly notice_of_award: "notice_of_award";
    readonly notice_to_proceed: "notice_to_proceed";
    readonly start_date: "start_date";
    readonly target_completion_date: "target_completion_date";
    readonly actual_completion_date: "actual_completion_date";
    readonly accomplishment_percentage: "accomplishment_percentage";
    readonly other_remarks: "other_remarks";
    readonly modified_by: "modified_by";
    readonly uid: "uid";
    readonly update_type: "update_type";
    readonly created_at: "created_at";
    readonly project_category: "project_category";
    readonly funding_year: "funding_year";
    readonly batch_of_funds: "batch_of_funds";
    readonly program_type: "program_type";
    readonly contract_amount: "contract_amount";
    readonly status: "status";
    readonly status_as_of: "status_as_of";
    readonly checklist: "checklist";
    readonly triangulated_percentage: "triangulated_percentage";
    readonly mode_of_project: "mode_of_project";
    readonly pcab_license_number: "pcab_license_number";
    readonly suspension_order_pdf: "suspension_order_pdf";
    readonly suspension_order_days: "suspension_order_days";
    readonly revised_target_completion_date: "revised_target_completion_date";
    readonly contract_duration: "contract_duration";
    readonly issuance_of_invitation_to_bid: "issuance_of_invitation_to_bid";
    readonly pre_bid_conference: "pre_bid_conference";
    readonly opening_of_technical_proposal: "opening_of_technical_proposal";
    readonly opening_of_financial_proposal: "opening_of_financial_proposal";
    readonly request_for_quotation: "request_for_quotation";
    readonly negotiation: "negotiation";
    readonly opening_of_quotation: "opening_of_quotation";
    readonly fund_source: "fund_source";
    readonly approved_budget_for_contract: "approved_budget_for_contract";
    readonly procurement_details_status: "procurement_details_status";
    readonly bidding_status: "bidding_status";
    readonly final_inspection_date: "final_inspection_date";
    readonly certificate_of_completion_date: "certificate_of_completion_date";
    readonly turnover_acceptance_date: "turnover_acceptance_date";
};
export type Regional_engineer_form_updatesScalarFieldEnum = (typeof Regional_engineer_form_updatesScalarFieldEnum)[keyof typeof Regional_engineer_form_updatesScalarFieldEnum];
export declare const Regional_engineer_imageScalarFieldEnum: {
    readonly id: "id";
    readonly project_id: "project_id";
    readonly image_data: "image_data";
    readonly uploaded_by: "uploaded_by";
    readonly created_at: "created_at";
    readonly category: "category";
    readonly ipc: "ipc";
    readonly file_path: "file_path";
    readonly binary_id: "binary_id";
    readonly file_size: "file_size";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly taken_at: "taken_at";
    readonly exif_metadata: "exif_metadata";
    readonly outbox_project_id: "outbox_project_id";
    readonly date_captured: "date_captured";
    readonly uploaded_at: "uploaded_at";
};
export type Regional_engineer_imageScalarFieldEnum = (typeof Regional_engineer_imageScalarFieldEnum)[keyof typeof Regional_engineer_imageScalarFieldEnum];
export declare const School_documentsScalarFieldEnum: {
    readonly id: "id";
    readonly school_id: "school_id";
    readonly pending_id: "pending_id";
    readonly doc_type: "doc_type";
    readonly file_data: "file_data";
    readonly created_at: "created_at";
    readonly binary_id: "binary_id";
    readonly file_path: "file_path";
    readonly file_size: "file_size";
    readonly original_size: "original_size";
    readonly hydra_manifest: "hydra_manifest";
    readonly file_name: "file_name";
    readonly is_deleted: "is_deleted";
};
export type School_documentsScalarFieldEnum = (typeof School_documentsScalarFieldEnum)[keyof typeof School_documentsScalarFieldEnum];
export declare const School_location_profilesScalarFieldEnum: {
    readonly id: "id";
    readonly school_id: "school_id";
    readonly transportation_modes: "transportation_modes";
    readonly road_paved_pct: "road_paved_pct";
    readonly road_unpaved_pct: "road_unpaved_pct";
    readonly road_lighting_pct: "road_lighting_pct";
    readonly public_transpo_availability: "public_transpo_availability";
    readonly water_proximity: "water_proximity";
    readonly near_cliff_ravine: "near_cliff_ravine";
    readonly cliff_distance_m: "cliff_distance_m";
    readonly natural_calamities: "natural_calamities";
    readonly hazards_experienced: "hazards_experienced";
    readonly insurgency_threats_6mo: "insurgency_threats_6mo";
    readonly requires_hiking: "requires_hiking";
    readonly hiking_distance_km: "hiking_distance_km";
    readonly manmade_bridge_foot: "manmade_bridge_foot";
    readonly river_crossing_no_bridge: "river_crossing_no_bridge";
    readonly emergency_response_mins: "emergency_response_mins";
    readonly cellular_coverage: "cellular_coverage";
    readonly weather_isolation: "weather_isolation";
    readonly risk_index: "risk_index";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly road_cliff_pct: "road_cliff_pct";
    readonly near_water: "near_water";
    readonly has_insurgency_threats: "has_insurgency_threats";
    readonly road_passable_public_transpo_pct: "road_passable_public_transpo_pct";
    readonly river_crossing_on_foot: "river_crossing_on_foot";
    readonly river_crossing_count: "river_crossing_count";
    readonly proximity_hospital_km: "proximity_hospital_km";
    readonly proximity_brgy_hall_mins: "proximity_brgy_hall_mins";
    readonly proximity_brgy_hall_km: "proximity_brgy_hall_km";
    readonly proximity_muni_hall_mins: "proximity_muni_hall_mins";
    readonly proximity_muni_hall_km: "proximity_muni_hall_km";
    readonly proximity_sdo_mins: "proximity_sdo_mins";
    readonly proximity_sdo_km: "proximity_sdo_km";
    readonly proximity_clinic_mins: "proximity_clinic_mins";
    readonly proximity_clinic_km: "proximity_clinic_km";
    readonly proximity_terminal_mins: "proximity_terminal_mins";
    readonly proximity_terminal_km: "proximity_terminal_km";
    readonly proximity_highway_mins: "proximity_highway_mins";
    readonly proximity_highway_km: "proximity_highway_km";
    readonly anthropogenic_threats: "anthropogenic_threats";
    readonly iern: "iern";
    readonly weather_isolation_6mo: "weather_isolation_6mo";
};
export type School_location_profilesScalarFieldEnum = (typeof School_location_profilesScalarFieldEnum)[keyof typeof School_location_profilesScalarFieldEnum];
export declare const School_ownership_docsScalarFieldEnum: {
    readonly id: "id";
    readonly iern: "iern";
    readonly file_path: "file_path";
    readonly file_name: "file_name";
    readonly doc_type: "doc_type";
    readonly status: "status";
    readonly created_at: "created_at";
    readonly ownership_document_type: "ownership_document_type";
    readonly binary_id: "binary_id";
    readonly file_size: "file_size";
    readonly hydra_manifest: "hydra_manifest";
    readonly school_id: "school_id";
    readonly original_size: "original_size";
    readonly compressed_binary_id: "compressed_binary_id";
    readonly compressed_size: "compressed_size";
};
export type School_ownership_docsScalarFieldEnum = (typeof School_ownership_docsScalarFieldEnum)[keyof typeof School_ownership_docsScalarFieldEnum];
export declare const School_ownership_recordsScalarFieldEnum: {
    readonly id: "id";
    readonly iern: "iern";
    readonly ownership_type: "ownership_type";
    readonly document_type: "document_type";
    readonly ownership_doc_id: "ownership_doc_id";
    readonly created_at: "created_at";
    readonly school_yr: "school_yr";
};
export type School_ownership_recordsScalarFieldEnum = (typeof School_ownership_recordsScalarFieldEnum)[keyof typeof School_ownership_recordsScalarFieldEnum];
export declare const Schools_IERNScalarFieldEnum: {
    readonly id: "id";
    readonly IERN: "IERN";
    readonly SchoolID: "SchoolID";
    readonly Region: "Region";
    readonly Division: "Division";
    readonly District: "District";
    readonly School_Name: "School_Name";
    readonly Barangay: "Barangay";
    readonly Latitude: "Latitude";
    readonly Longitude: "Longitude";
    readonly Curricular_Offering: "Curricular_Offering";
    readonly Street_Address: "Street_Address";
    readonly Mother_School_ID: "Mother_School_ID";
    readonly Province: "Province";
    readonly Municipality: "Municipality";
    readonly Legislative_District: "Legislative_District";
    readonly status: "status";
    readonly updated_at: "updated_at";
};
export type Schools_IERNScalarFieldEnum = (typeof Schools_IERNScalarFieldEnum)[keyof typeof Schools_IERNScalarFieldEnum];
export declare const Schools_iern_archivesScalarFieldEnum: {
    readonly id: "id";
    readonly IERN: "IERN";
    readonly SchoolID: "SchoolID";
    readonly Region: "Region";
    readonly Division: "Division";
    readonly District: "District";
    readonly School_Name: "School_Name";
    readonly Barangay: "Barangay";
    readonly Latitude: "Latitude";
    readonly Longitude: "Longitude";
    readonly Curricular_Offering: "Curricular_Offering";
    readonly Street_Address: "Street_Address";
    readonly Mother_School_ID: "Mother_School_ID";
    readonly Province: "Province";
    readonly Municipality: "Municipality";
    readonly Legislative_District: "Legislative_District";
    readonly status: "status";
    readonly updated_at: "updated_at";
};
export type Schools_iern_archivesScalarFieldEnum = (typeof Schools_iern_archivesScalarFieldEnum)[keyof typeof Schools_iern_archivesScalarFieldEnum];
export declare const SettingsScalarFieldEnum: {
    readonly key: "key";
    readonly value: "value";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type SettingsScalarFieldEnum = (typeof SettingsScalarFieldEnum)[keyof typeof SettingsScalarFieldEnum];
export declare const Siif_activitiesScalarFieldEnum: {
    readonly siif_act_id: "siif_act_id";
    readonly siif_int_id: "siif_int_id";
    readonly activity_category: "activity_category";
    readonly activity_specific: "activity_specific";
};
export type Siif_activitiesScalarFieldEnum = (typeof Siif_activitiesScalarFieldEnum)[keyof typeof Siif_activitiesScalarFieldEnum];
export declare const Siif_allocationsScalarFieldEnum: {
    readonly siif_allocation_id: "siif_allocation_id";
    readonly masterlist_no: "masterlist_no";
    readonly region: "region";
    readonly division: "division";
    readonly district: "district";
    readonly school_id: "school_id";
    readonly school_name: "school_name";
    readonly fiscal_year: "fiscal_year";
    readonly allocation_amount: "allocation_amount";
    readonly spent_amount: "spent_amount";
    readonly remarks: "remarks";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Siif_allocationsScalarFieldEnum = (typeof Siif_allocationsScalarFieldEnum)[keyof typeof Siif_allocationsScalarFieldEnum];
export declare const Siif_expensesScalarFieldEnum: {
    readonly id: "id";
    readonly school_id: "school_id";
    readonly description: "description";
    readonly category: "category";
    readonly amount: "amount";
    readonly expense_date: "expense_date";
    readonly created_at: "created_at";
};
export type Siif_expensesScalarFieldEnum = (typeof Siif_expensesScalarFieldEnum)[keyof typeof Siif_expensesScalarFieldEnum];
export declare const Siif_interventionsScalarFieldEnum: {
    readonly siif_int_id: "siif_int_id";
    readonly siif_sub_id: "siif_sub_id";
    readonly intervention_type: "intervention_type";
    readonly budget_estimate: "budget_estimate";
    readonly has_aral: "has_aral";
    readonly aral_subjects: "aral_subjects";
    readonly other_activity_details: "other_activity_details";
};
export type Siif_interventionsScalarFieldEnum = (typeof Siif_interventionsScalarFieldEnum)[keyof typeof Siif_interventionsScalarFieldEnum];
export declare const Siif_ro_coordinationScalarFieldEnum: {
    readonly MID: "MID";
    readonly division_name: "division_name";
    readonly sender_role: "sender_role";
    readonly sender_id: "sender_id";
    readonly sender_name: "sender_name";
    readonly message: "message";
    readonly created_at: "created_at";
};
export type Siif_ro_coordinationScalarFieldEnum = (typeof Siif_ro_coordinationScalarFieldEnum)[keyof typeof Siif_ro_coordinationScalarFieldEnum];
export declare const Siif_submissionsScalarFieldEnum: {
    readonly siif_sub_id: "siif_sub_id";
    readonly school_id: "school_id";
    readonly school_name: "school_name";
    readonly region: "region";
    readonly division: "division";
    readonly district: "district";
    readonly fiscal_year: "fiscal_year";
    readonly total_budget_estimate: "total_budget_estimate";
    readonly status: "status";
    readonly submission_status: "submission_status";
    readonly remarks: "remarks";
    readonly submitted_at: "submitted_at";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Siif_submissionsScalarFieldEnum = (typeof Siif_submissionsScalarFieldEnum)[keyof typeof Siif_submissionsScalarFieldEnum];
export declare const Siif_utilizationScalarFieldEnum: {
    readonly siif_util_id: "siif_util_id";
    readonly siif_int_id: "siif_int_id";
    readonly quarter: "quarter";
    readonly utilized_amount: "utilized_amount";
    readonly updated_at: "updated_at";
    readonly implementation_status: "implementation_status";
};
export type Siif_utilizationScalarFieldEnum = (typeof Siif_utilizationScalarFieldEnum)[keyof typeof Siif_utilizationScalarFieldEnum];
export declare const Stride_usersScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly password_hash: "password_hash";
    readonly role: "role";
    readonly station_level: "station_level";
    readonly office_name: "office_name";
    readonly school_id: "school_id";
    readonly position: "position";
    readonly first_name: "first_name";
    readonly middle_name: "middle_name";
    readonly last_name: "last_name";
    readonly age: "age";
    readonly birthday: "birthday";
    readonly address: "address";
    readonly region: "region";
    readonly division: "division";
    readonly district: "district";
    readonly school: "school";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Stride_usersScalarFieldEnum = (typeof Stride_usersScalarFieldEnum)[keyof typeof Stride_usersScalarFieldEnum];
export declare const Super_userScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly password: "password";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Super_userScalarFieldEnum = (typeof Super_userScalarFieldEnum)[keyof typeof Super_userScalarFieldEnum];
export declare const System_feedbackScalarFieldEnum: {
    readonly id: "id";
    readonly content: "content";
    readonly user_email: "user_email";
    readonly user_uid: "user_uid";
    readonly created_at: "created_at";
};
export type System_feedbackScalarFieldEnum = (typeof System_feedbackScalarFieldEnum)[keyof typeof System_feedbackScalarFieldEnum];
export declare const System_settingsScalarFieldEnum: {
    readonly setting_key: "setting_key";
    readonly setting_value: "setting_value";
    readonly updated_at: "updated_at";
    readonly updated_by: "updated_by";
};
export type System_settingsScalarFieldEnum = (typeof System_settingsScalarFieldEnum)[keyof typeof System_settingsScalarFieldEnum];
export declare const Teaching_personnelScalarFieldEnum: {
    readonly school_id: "school_id";
    readonly updated_at: "updated_at";
};
export type Teaching_personnelScalarFieldEnum = (typeof Teaching_personnelScalarFieldEnum)[keyof typeof Teaching_personnelScalarFieldEnum];
export declare const Third_level_official_masterlistScalarFieldEnum: {
    readonly TLOid: "TLOid";
    readonly first_name: "first_name";
    readonly last_name: "last_name";
    readonly middle_name: "middle_name";
    readonly suffix: "suffix";
    readonly gender: "gender";
    readonly date_of_birth: "date_of_birth";
    readonly civil_status: "civil_status";
    readonly position_title: "position_title";
    readonly office: "office";
    readonly strand: "strand";
    readonly status: "status";
    readonly email: "email";
    readonly alt_email_1: "alt_email_1";
    readonly alt_email_2: "alt_email_2";
    readonly contact_details: "contact_details";
    readonly alt_contact_details_1: "alt_contact_details_1";
    readonly alt_contact_details_2: "alt_contact_details_2";
    readonly permanent_address: "permanent_address";
    readonly emt_passer: "emt_passer";
    readonly emt_date: "emt_date";
    readonly ces_stage: "ces_stage";
    readonly ces_conferment_date: "ces_conferment_date";
    readonly previous_positions: "previous_positions";
    readonly total_years_third_level: "total_years_third_level";
    readonly managerial_experience_total: "managerial_experience_total";
    readonly highest_education: "highest_education";
    readonly specific_degree: "specific_degree";
    readonly education_program: "education_program";
    readonly education_year_graduated: "education_year_graduated";
    readonly relevant_trainings: "relevant_trainings";
    readonly performance_rating_1: "performance_rating_1";
    readonly performance_rating_1_period: "performance_rating_1_period";
    readonly performance_rating_2: "performance_rating_2";
    readonly performance_rating_2_period: "performance_rating_2_period";
    readonly cespes_1_rating: "cespes_1_rating";
    readonly cespes_2_rating: "cespes_2_rating";
    readonly cespes_rating_1_period: "cespes_rating_1_period";
    readonly cespes_rating_2_period: "cespes_rating_2_period";
    readonly notable_achievements: "notable_achievements";
    readonly total_training_hours: "total_training_hours";
    readonly performance_rating_ipcrf: "performance_rating_ipcrf";
    readonly performance_rating_cespes: "performance_rating_cespes";
    readonly photo_binary_id: "photo_binary_id";
    readonly pds_binary_id: "pds_binary_id";
    readonly profile_word_binary_id: "profile_word_binary_id";
    readonly profile_ppt_binary_id: "profile_ppt_binary_id";
    readonly service_records_binary_id: "service_records_binary_id";
    readonly pending_admin_case: "pending_admin_case";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly appointment_date: "appointment_date";
    readonly age: "age";
    readonly dpa_consented_at: "dpa_consented_at";
    readonly is_oic: "is_oic";
    readonly nationality: "nationality";
    readonly religion: "religion";
    readonly blood_type: "blood_type";
    readonly dependents: "dependents";
    readonly height: "height";
    readonly weight: "weight";
    readonly division: "division";
    readonly designation: "designation";
    readonly effectivity_date: "effectivity_date";
    readonly reassign_target_tloid: "reassign_target_tloid";
    readonly reassign_assignee_tloid: "reassign_assignee_tloid";
    readonly individual_accomplishments: "individual_accomplishments";
    readonly region: "region";
    readonly notable_achievements_year: "notable_achievements_year";
    readonly eligibilities: "eligibilities";
    readonly sandiganbayan_clearance_binary_id: "sandiganbayan_clearance_binary_id";
    readonly nbi_clearance_binary_id: "nbi_clearance_binary_id";
    readonly csc_clearance_binary_id: "csc_clearance_binary_id";
    readonly ombudsman_clearance_binary_id: "ombudsman_clearance_binary_id";
    readonly guilty_admin_details: "guilty_admin_details";
    readonly criminally_charged_details: "criminally_charged_details";
    readonly convicted_crime_details: "convicted_crime_details";
    readonly other_courses: "other_courses";
    readonly sort_index: "sort_index";
    readonly ombudsman_case: "ombudsman_case";
};
export type Third_level_official_masterlistScalarFieldEnum = (typeof Third_level_official_masterlistScalarFieldEnum)[keyof typeof Third_level_official_masterlistScalarFieldEnum];
export declare const Third_level_officials_masterlistScalarFieldEnum: {
    readonly id: "id";
    readonly tlid: "tlid";
    readonly sort_index: "sort_index";
    readonly strand: "strand";
    readonly office: "office";
    readonly name: "name";
    readonly position: "position";
    readonly email: "email";
    readonly alt_email_1: "alt_email_1";
    readonly alt_email_2: "alt_email_2";
    readonly contact_details: "contact_details";
    readonly alt_contact_details_1: "alt_contact_details_1";
    readonly alt_contact_details_2: "alt_contact_details_2";
    readonly assignment_date: "assignment_date";
    readonly remarks: "remarks";
    readonly status: "status";
    readonly change_type: "change_type";
    readonly updated_by: "updated_by";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Third_level_officials_masterlistScalarFieldEnum = (typeof Third_level_officials_masterlistScalarFieldEnum)[keyof typeof Third_level_officials_masterlistScalarFieldEnum];
export declare const Third_level_officials_profilesScalarFieldEnum: {
    readonly tlid: "tlid";
    readonly last_name: "last_name";
    readonly first_name: "first_name";
    readonly middle_name: "middle_name";
    readonly suffix: "suffix";
    readonly gender: "gender";
    readonly date_of_birth: "date_of_birth";
    readonly age: "age";
    readonly civil_status: "civil_status";
    readonly position_title: "position_title";
    readonly appointment_date: "appointment_date";
    readonly emt_passer: "emt_passer";
    readonly emt_date: "emt_date";
    readonly ces_stage: "ces_stage";
    readonly ces_conferment_date: "ces_conferment_date";
    readonly total_years_third_level: "total_years_third_level";
    readonly previous_positions: "previous_positions";
    readonly relevant_trainings: "relevant_trainings";
    readonly permanent_address: "permanent_address";
    readonly highest_education: "highest_education";
    readonly education_program: "education_program";
    readonly education_year_graduated: "education_year_graduated";
    readonly notable_achievements: "notable_achievements";
    readonly performance_rating_ipcrf: "performance_rating_ipcrf";
    readonly performance_rating_cespes: "performance_rating_cespes";
    readonly photo_binary_id: "photo_binary_id";
    readonly pds_binary_id: "pds_binary_id";
    readonly profile_word_binary_id: "profile_word_binary_id";
    readonly profile_ppt_binary_id: "profile_ppt_binary_id";
    readonly service_records_binary_id: "service_records_binary_id";
    readonly pending_admin_case: "pending_admin_case";
    readonly ombudsman_case: "ombudsman_case";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
};
export type Third_level_officials_profilesScalarFieldEnum = (typeof Third_level_officials_profilesScalarFieldEnum)[keyof typeof Third_level_officials_profilesScalarFieldEnum];
export declare const Third_level_officials_profiling_applicationScalarFieldEnum: {
    readonly application_id: "application_id";
    readonly app_tloid: "app_tloid";
    readonly profiling_status: "profiling_status";
    readonly application_status: "application_status";
    readonly position_applied_for: "position_applied_for";
    readonly target_tloid: "target_tloid";
    readonly submitted_at: "submitted_at";
    readonly reviewed_at: "reviewed_at";
    readonly reviewed_by: "reviewed_by";
    readonly denial_reason: "denial_reason";
    readonly last_name: "last_name";
    readonly first_name: "first_name";
    readonly middle_name: "middle_name";
    readonly suffix: "suffix";
    readonly gender: "gender";
    readonly date_of_birth: "date_of_birth";
    readonly civil_status: "civil_status";
    readonly strand: "strand";
    readonly office: "office";
    readonly designation: "designation";
    readonly assignment: "assignment";
    readonly date_of_assignment: "date_of_assignment";
    readonly position_title: "position_title";
    readonly status: "status";
    readonly email: "email";
    readonly alt_email_1: "alt_email_1";
    readonly alt_email_2: "alt_email_2";
    readonly contact_details: "contact_details";
    readonly alt_contact_details_1: "alt_contact_details_1";
    readonly alt_contact_details_2: "alt_contact_details_2";
    readonly permanent_address: "permanent_address";
    readonly emt_passer: "emt_passer";
    readonly emt_date: "emt_date";
    readonly ces_stage: "ces_stage";
    readonly ces_conferment_date: "ces_conferment_date";
    readonly previous_positions: "previous_positions";
    readonly total_years_third_level: "total_years_third_level";
    readonly managerial_experience_total: "managerial_experience_total";
    readonly highest_education: "highest_education";
    readonly specific_degree: "specific_degree";
    readonly education_program: "education_program";
    readonly education_year_graduated: "education_year_graduated";
    readonly relevant_trainings: "relevant_trainings";
    readonly performance_rating_1: "performance_rating_1";
    readonly performance_rating_1_period: "performance_rating_1_period";
    readonly performance_rating_2: "performance_rating_2";
    readonly performance_rating_2_period: "performance_rating_2_period";
    readonly cespes_1_rating: "cespes_1_rating";
    readonly cespes_2_rating: "cespes_2_rating";
    readonly cespes_rating_1_period: "cespes_rating_1_period";
    readonly cespes_rating_2_period: "cespes_rating_2_period";
    readonly notable_achievements: "notable_achievements";
    readonly total_training_hours: "total_training_hours";
    readonly performance_rating_ipcrf: "performance_rating_ipcrf";
    readonly performance_rating_cespes: "performance_rating_cespes";
    readonly photo_binary_id: "photo_binary_id";
    readonly pds_binary_id: "pds_binary_id";
    readonly profile_word_binary_id: "profile_word_binary_id";
    readonly profile_ppt_binary_id: "profile_ppt_binary_id";
    readonly service_records_binary_id: "service_records_binary_id";
    readonly pending_admin_case: "pending_admin_case";
    readonly dpa_consented_at: "dpa_consented_at";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly target_TLOid: "target_TLOid";
    readonly is_oic: "is_oic";
    readonly nationality: "nationality";
    readonly religion: "religion";
    readonly blood_type: "blood_type";
    readonly dependents: "dependents";
    readonly height: "height";
    readonly weight: "weight";
    readonly individual_accomplishments: "individual_accomplishments";
    readonly notable_achievements_year: "notable_achievements_year";
    readonly eligibilities: "eligibilities";
    readonly sandiganbayan_clearance_binary_id: "sandiganbayan_clearance_binary_id";
    readonly nbi_clearance_binary_id: "nbi_clearance_binary_id";
    readonly csc_clearance_binary_id: "csc_clearance_binary_id";
    readonly ombudsman_clearance_binary_id: "ombudsman_clearance_binary_id";
    readonly guilty_admin_details: "guilty_admin_details";
    readonly criminally_charged_details: "criminally_charged_details";
    readonly convicted_crime_details: "convicted_crime_details";
    readonly other_courses: "other_courses";
};
export type Third_level_officials_profiling_applicationScalarFieldEnum = (typeof Third_level_officials_profiling_applicationScalarFieldEnum)[keyof typeof Third_level_officials_profiling_applicationScalarFieldEnum];
export declare const Third_level_officials_updatesScalarFieldEnum: {
    readonly TLOUid: "TLOUid";
    readonly TLOid: "TLOid";
    readonly change_type: "change_type";
    readonly updated_by: "updated_by";
    readonly remarks: "remarks";
    readonly sort_index: "sort_index";
    readonly last_name: "last_name";
    readonly first_name: "first_name";
    readonly middle_name: "middle_name";
    readonly suffix: "suffix";
    readonly gender: "gender";
    readonly date_of_birth: "date_of_birth";
    readonly civil_status: "civil_status";
    readonly strand: "strand";
    readonly office: "office";
    readonly designation: "designation";
    readonly assignment: "assignment";
    readonly date_of_assignment: "date_of_assignment";
    readonly position_title: "position_title";
    readonly status: "status";
    readonly email: "email";
    readonly alt_email_1: "alt_email_1";
    readonly alt_email_2: "alt_email_2";
    readonly contact_details: "contact_details";
    readonly alt_contact_details_1: "alt_contact_details_1";
    readonly alt_contact_details_2: "alt_contact_details_2";
    readonly permanent_address: "permanent_address";
    readonly emt_passer: "emt_passer";
    readonly emt_date: "emt_date";
    readonly ces_stage: "ces_stage";
    readonly ces_conferment_date: "ces_conferment_date";
    readonly previous_positions: "previous_positions";
    readonly total_years_third_level: "total_years_third_level";
    readonly highest_education: "highest_education";
    readonly education_program: "education_program";
    readonly education_year_graduated: "education_year_graduated";
    readonly relevant_trainings: "relevant_trainings";
    readonly notable_achievements: "notable_achievements";
    readonly performance_rating_ipcrf: "performance_rating_ipcrf";
    readonly performance_rating_cespes: "performance_rating_cespes";
    readonly photo_binary_id: "photo_binary_id";
    readonly pds_binary_id: "pds_binary_id";
    readonly profile_word_binary_id: "profile_word_binary_id";
    readonly profile_ppt_binary_id: "profile_ppt_binary_id";
    readonly service_records_binary_id: "service_records_binary_id";
    readonly pending_admin_case: "pending_admin_case";
    readonly ombudsman_case: "ombudsman_case";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly tlid: "tlid";
    readonly effectivity_date: "effectivity_date";
    readonly vacate_reason: "vacate_reason";
    readonly region: "region";
    readonly division: "division";
};
export type Third_level_officials_updatesScalarFieldEnum = (typeof Third_level_officials_updatesScalarFieldEnum)[keyof typeof Third_level_officials_updatesScalarFieldEnum];
export declare const Ticket_announcementsScalarFieldEnum: {
    readonly id: "id";
    readonly content: "content";
    readonly is_deleted: "is_deleted";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly type: "type";
};
export type Ticket_announcementsScalarFieldEnum = (typeof Ticket_announcementsScalarFieldEnum)[keyof typeof Ticket_announcementsScalarFieldEnum];
export declare const Tranche_fundScalarFieldEnum: {
    readonly id: "id";
    readonly project_id: "project_id";
    readonly tranche_1: "tranche_1";
    readonly tranche_2: "tranche_2";
    readonly tranche_3: "tranche_3";
    readonly tranche_flag: "tranche_flag";
    readonly create_date: "create_date";
    readonly edit_date: "edit_date";
    readonly user_id: "user_id";
    readonly remarks: "remarks";
    readonly approved_by: "approved_by";
    readonly approved_date: "approved_date";
    readonly is_tranche_1_confirmed: "is_tranche_1_confirmed";
    readonly is_tranche_2_confirmed: "is_tranche_2_confirmed";
    readonly is_tranche_3_confirmed: "is_tranche_3_confirmed";
    readonly tranche_1_liquidated: "tranche_1_liquidated";
    readonly tranche_2_liquidated: "tranche_2_liquidated";
    readonly tranche_3_liquidated: "tranche_3_liquidated";
    readonly tranche_1_status: "tranche_1_status";
    readonly tranche_2_status: "tranche_2_status";
    readonly tranche_3_status: "tranche_3_status";
    readonly tranche_1_release_date: "tranche_1_release_date";
    readonly tranche_1_latest_liquidation_date: "tranche_1_latest_liquidation_date";
    readonly tranche_2_release_date: "tranche_2_release_date";
    readonly tranche_2_latest_liquidation_date: "tranche_2_latest_liquidation_date";
    readonly tranche_3_release_date: "tranche_3_release_date";
    readonly tranche_3_latest_liquidation_date: "tranche_3_latest_liquidation_date";
};
export type Tranche_fundScalarFieldEnum = (typeof Tranche_fundScalarFieldEnum)[keyof typeof Tranche_fundScalarFieldEnum];
export declare const Unified_binariesScalarFieldEnum: {
    readonly id: "id";
    readonly hash: "hash";
    readonly content: "content";
    readonly mime_type: "mime_type";
    readonly size_bytes: "size_bytes";
    readonly created_at: "created_at";
};
export type Unified_binariesScalarFieldEnum = (typeof Unified_binariesScalarFieldEnum)[keyof typeof Unified_binariesScalarFieldEnum];
export declare const Unit1_school_identityScalarFieldEnum: {
    readonly iern: "iern";
    readonly school_id: "school_id";
    readonly school_name: "school_name";
    readonly region: "region";
    readonly province: "province";
    readonly municipality: "municipality";
    readonly barangay: "barangay";
    readonly division: "division";
    readonly district: "district";
    readonly leg_district: "leg_district";
    readonly curricular_offering: "curricular_offering";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly school_type: "school_type";
    readonly mother_school_id: "mother_school_id";
    readonly extension_mother_school_name: "extension_mother_school_name";
    readonly established_month: "established_month";
    readonly established_year: "established_year";
    readonly head_first_name: "head_first_name";
    readonly head_middle_name: "head_middle_name";
    readonly head_last_name: "head_last_name";
    readonly head_sex: "head_sex";
    readonly head_position_title: "head_position_title";
    readonly head_date_hired: "head_date_hired";
    readonly ownership_na_reason: "ownership_na_reason";
    readonly ownership_doc_id: "ownership_doc_id";
    readonly ownership_type: "ownership_type";
    readonly document_type: "document_type";
    readonly multiple_ownership: "multiple_ownership";
    readonly multiple_document_type: "multiple_document_type";
    readonly document_path: "document_path";
    readonly annexes: "annexes";
    readonly unit1: "unit1";
    readonly unit1_completed: "unit1_completed";
    readonly unit1_updated_at: "unit1_updated_at";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly school_yr: "school_yr";
};
export type Unit1_school_identityScalarFieldEnum = (typeof Unit1_school_identityScalarFieldEnum)[keyof typeof Unit1_school_identityScalarFieldEnum];
export declare const Unit2_school_learnersScalarFieldEnum: {
    readonly iern: "iern";
    readonly school_id: "school_id";
    readonly enroll_kinder: "enroll_kinder";
    readonly enroll_g1: "enroll_g1";
    readonly enroll_g2: "enroll_g2";
    readonly enroll_g3: "enroll_g3";
    readonly enroll_g4: "enroll_g4";
    readonly enroll_g5: "enroll_g5";
    readonly enroll_g6: "enroll_g6";
    readonly enroll_g7: "enroll_g7";
    readonly enroll_g8: "enroll_g8";
    readonly enroll_g9: "enroll_g9";
    readonly enroll_g10: "enroll_g10";
    readonly enroll_g11: "enroll_g11";
    readonly enroll_g12: "enroll_g12";
    readonly total_enrollment: "total_enrollment";
    readonly male_enrollment: "male_enrollment";
    readonly female_enrollment: "female_enrollment";
    readonly total_male: "total_male";
    readonly total_female: "total_female";
    readonly kinder_male: "kinder_male";
    readonly kinder_female: "kinder_female";
    readonly g1_male: "g1_male";
    readonly g1_female: "g1_female";
    readonly g2_male: "g2_male";
    readonly g2_female: "g2_female";
    readonly g3_male: "g3_male";
    readonly g3_female: "g3_female";
    readonly g4_male: "g4_male";
    readonly g4_female: "g4_female";
    readonly g5_male: "g5_male";
    readonly g5_female: "g5_female";
    readonly g6_male: "g6_male";
    readonly g6_female: "g6_female";
    readonly g7_male: "g7_male";
    readonly g7_female: "g7_female";
    readonly g8_male: "g8_male";
    readonly g8_female: "g8_female";
    readonly g9_male: "g9_male";
    readonly g9_female: "g9_female";
    readonly g10_male: "g10_male";
    readonly g10_female: "g10_female";
    readonly g11_male: "g11_male";
    readonly g11_female: "g11_female";
    readonly g12_male: "g12_male";
    readonly g12_female: "g12_female";
    readonly main_sned: "main_sned";
    readonly main_sned_male: "main_sned_male";
    readonly main_sned_female: "main_sned_female";
    readonly self_sned: "self_sned";
    readonly self_sned_male: "self_sned_male";
    readonly self_sned_female: "self_sned_female";
    readonly self_sned_org_class: "self_sned_org_class";
    readonly has_aral_math: "has_aral_math";
    readonly aral_math_learners_g1: "aral_math_learners_g1";
    readonly aral_math_learners_g2: "aral_math_learners_g2";
    readonly aral_math_learners_g3: "aral_math_learners_g3";
    readonly aral_math_learners_g4: "aral_math_learners_g4";
    readonly aral_math_learners_g5: "aral_math_learners_g5";
    readonly aral_math_learners_g6: "aral_math_learners_g6";
    readonly has_aral_reading: "has_aral_reading";
    readonly aral_reading_learners_g1: "aral_reading_learners_g1";
    readonly aral_reading_learners_g2: "aral_reading_learners_g2";
    readonly aral_reading_learners_g3: "aral_reading_learners_g3";
    readonly aral_reading_learners_g4: "aral_reading_learners_g4";
    readonly aral_reading_learners_g5: "aral_reading_learners_g5";
    readonly aral_reading_learners_g6: "aral_reading_learners_g6";
    readonly has_aral_science: "has_aral_science";
    readonly aral_science_learners_g1: "aral_science_learners_g1";
    readonly aral_science_learners_g2: "aral_science_learners_g2";
    readonly aral_science_learners_g3: "aral_science_learners_g3";
    readonly aral_science_learners_g4: "aral_science_learners_g4";
    readonly aral_science_learners_g5: "aral_science_learners_g5";
    readonly aral_science_learners_g6: "aral_science_learners_g6";
    readonly multigrade_groupings_1: "multigrade_groupings_1";
    readonly multigrade_groupings_2: "multigrade_groupings_2";
    readonly multigrade_groupings_3: "multigrade_groupings_3";
    readonly multigrade_enrollment_1: "multigrade_enrollment_1";
    readonly multigrade_enrollment_2: "multigrade_enrollment_2";
    readonly multigrade_enrollment_3: "multigrade_enrollment_3";
    readonly multigrade_groupings_1_male: "multigrade_groupings_1_male";
    readonly multigrade_groupings_1_female: "multigrade_groupings_1_female";
    readonly multigrade_groupings_2_male: "multigrade_groupings_2_male";
    readonly multigrade_groupings_2_female: "multigrade_groupings_2_female";
    readonly multigrade_groupings_3_male: "multigrade_groupings_3_male";
    readonly multigrade_groupings_3_female: "multigrade_groupings_3_female";
    readonly unit2: "unit2";
    readonly unit2_completed: "unit2_completed";
    readonly unit_2_updated_at: "unit_2_updated_at";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly school_yr: "school_yr";
};
export type Unit2_school_learnersScalarFieldEnum = (typeof Unit2_school_learnersScalarFieldEnum)[keyof typeof Unit2_school_learnersScalarFieldEnum];
export declare const Unit3_organized_classesScalarFieldEnum: {
    readonly iern: "iern";
    readonly school_id: "school_id";
    readonly grade_kinder_size: "grade_kinder_size";
    readonly grade_1_size: "grade_1_size";
    readonly grade_2_size: "grade_2_size";
    readonly grade_3_size: "grade_3_size";
    readonly grade_4_size: "grade_4_size";
    readonly grade_5_size: "grade_5_size";
    readonly grade_6_size: "grade_6_size";
    readonly grade_7_size: "grade_7_size";
    readonly grade_8_size: "grade_8_size";
    readonly grade_9_size: "grade_9_size";
    readonly grade_10_size: "grade_10_size";
    readonly grade_11_size: "grade_11_size";
    readonly grade_12_size: "grade_12_size";
    readonly multigrade_size_1: "multigrade_size_1";
    readonly multigrade_size_2: "multigrade_size_2";
    readonly multigrade_size_3: "multigrade_size_3";
    readonly unit3: "unit3";
    readonly unit3_completed: "unit3_completed";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly school_yr: "school_yr";
};
export type Unit3_organized_classesScalarFieldEnum = (typeof Unit3_organized_classesScalarFieldEnum)[keyof typeof Unit3_organized_classesScalarFieldEnum];
export declare const Unit4_learner_profileScalarFieldEnum: {
    readonly iern: "iern";
    readonly school_id: "school_id";
    readonly selected_learner_groups: "selected_learner_groups";
    readonly bmi_severely_wasted: "bmi_severely_wasted";
    readonly bmi_wasted: "bmi_wasted";
    readonly bmi_overweight_obese: "bmi_overweight_obese";
    readonly bmi_normal: "bmi_normal";
    readonly als_kinder: "als_kinder";
    readonly als_g1: "als_g1";
    readonly als_g2: "als_g2";
    readonly als_g3: "als_g3";
    readonly als_g4: "als_g4";
    readonly als_g5: "als_g5";
    readonly als_g6: "als_g6";
    readonly als_g7: "als_g7";
    readonly als_g8: "als_g8";
    readonly als_g9: "als_g9";
    readonly als_g10: "als_g10";
    readonly als_g11: "als_g11";
    readonly als_g12: "als_g12";
    readonly als_total: "als_total";
    readonly muslim_kinder: "muslim_kinder";
    readonly muslim_g1: "muslim_g1";
    readonly muslim_g2: "muslim_g2";
    readonly muslim_g3: "muslim_g3";
    readonly muslim_g4: "muslim_g4";
    readonly muslim_g5: "muslim_g5";
    readonly muslim_g6: "muslim_g6";
    readonly muslim_g7: "muslim_g7";
    readonly muslim_g8: "muslim_g8";
    readonly muslim_g9: "muslim_g9";
    readonly muslim_g10: "muslim_g10";
    readonly muslim_g11: "muslim_g11";
    readonly muslim_g12: "muslim_g12";
    readonly ip_kinder: "ip_kinder";
    readonly ip_g1: "ip_g1";
    readonly ip_g2: "ip_g2";
    readonly ip_g3: "ip_g3";
    readonly ip_g4: "ip_g4";
    readonly ip_g5: "ip_g5";
    readonly ip_g6: "ip_g6";
    readonly ip_g7: "ip_g7";
    readonly ip_g8: "ip_g8";
    readonly ip_g9: "ip_g9";
    readonly ip_g10: "ip_g10";
    readonly ip_g11: "ip_g11";
    readonly ip_g12: "ip_g12";
    readonly displaced_kinder: "displaced_kinder";
    readonly displaced_g1: "displaced_g1";
    readonly displaced_g2: "displaced_g2";
    readonly displaced_g3: "displaced_g3";
    readonly displaced_g4: "displaced_g4";
    readonly displaced_g5: "displaced_g5";
    readonly displaced_g6: "displaced_g6";
    readonly displaced_g7: "displaced_g7";
    readonly displaced_g8: "displaced_g8";
    readonly displaced_g9: "displaced_g9";
    readonly displaced_g10: "displaced_g10";
    readonly displaced_g11: "displaced_g11";
    readonly displaced_g12: "displaced_g12";
    readonly overage_kinder: "overage_kinder";
    readonly overage_g1: "overage_g1";
    readonly overage_g2: "overage_g2";
    readonly overage_g3: "overage_g3";
    readonly overage_g4: "overage_g4";
    readonly overage_g5: "overage_g5";
    readonly overage_g6: "overage_g6";
    readonly overage_g7: "overage_g7";
    readonly overage_g8: "overage_g8";
    readonly overage_g9: "overage_g9";
    readonly overage_g10: "overage_g10";
    readonly overage_g11: "overage_g11";
    readonly overage_g12: "overage_g12";
    readonly dropout_kinder: "dropout_kinder";
    readonly dropout_g1: "dropout_g1";
    readonly dropout_g2: "dropout_g2";
    readonly dropout_g3: "dropout_g3";
    readonly dropout_g4: "dropout_g4";
    readonly dropout_g5: "dropout_g5";
    readonly dropout_g6: "dropout_g6";
    readonly dropout_g7: "dropout_g7";
    readonly dropout_g8: "dropout_g8";
    readonly dropout_g9: "dropout_g9";
    readonly dropout_g10: "dropout_g10";
    readonly dropout_g11: "dropout_g11";
    readonly dropout_g12: "dropout_g12";
    readonly repeater_kinder: "repeater_kinder";
    readonly repeater_g1: "repeater_g1";
    readonly repeater_g2: "repeater_g2";
    readonly repeater_g3: "repeater_g3";
    readonly repeater_g4: "repeater_g4";
    readonly repeater_g5: "repeater_g5";
    readonly repeater_g6: "repeater_g6";
    readonly repeater_g7: "repeater_g7";
    readonly repeater_g8: "repeater_g8";
    readonly repeater_g9: "repeater_g9";
    readonly repeater_g10: "repeater_g10";
    readonly repeater_g11: "repeater_g11";
    readonly repeater_g12: "repeater_g12";
    readonly lwd_kinder: "lwd_kinder";
    readonly lwd_g1: "lwd_g1";
    readonly lwd_g2: "lwd_g2";
    readonly lwd_g3: "lwd_g3";
    readonly lwd_g4: "lwd_g4";
    readonly lwd_g5: "lwd_g5";
    readonly lwd_g6: "lwd_g6";
    readonly lwd_g7: "lwd_g7";
    readonly lwd_g8: "lwd_g8";
    readonly lwd_g9: "lwd_g9";
    readonly lwd_g10: "lwd_g10";
    readonly lwd_g11: "lwd_g11";
    readonly lwd_g12: "lwd_g12";
    readonly sned_kinder: "sned_kinder";
    readonly sned_g1: "sned_g1";
    readonly sned_g2: "sned_g2";
    readonly sned_g3: "sned_g3";
    readonly sned_g4: "sned_g4";
    readonly sned_g5: "sned_g5";
    readonly sned_g6: "sned_g6";
    readonly sned_g7: "sned_g7";
    readonly sned_g8: "sned_g8";
    readonly sned_g9: "sned_g9";
    readonly sned_g10: "sned_g10";
    readonly sned_g11: "sned_g11";
    readonly sned_g12: "sned_g12";
    readonly unit4: "unit4";
    readonly unit4_completed: "unit4_completed";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly fourps_kinder: "fourps_kinder";
    readonly fourps_g1: "fourps_g1";
    readonly fourps_g2: "fourps_g2";
    readonly fourps_g3: "fourps_g3";
    readonly fourps_g4: "fourps_g4";
    readonly fourps_g5: "fourps_g5";
    readonly fourps_g6: "fourps_g6";
    readonly fourps_g7: "fourps_g7";
    readonly fourps_g8: "fourps_g8";
    readonly fourps_g9: "fourps_g9";
    readonly fourps_g10: "fourps_g10";
    readonly fourps_g11: "fourps_g11";
    readonly fourps_g12: "fourps_g12";
    readonly school_yr: "school_yr";
};
export type Unit4_learner_profileScalarFieldEnum = (typeof Unit4_learner_profileScalarFieldEnum)[keyof typeof Unit4_learner_profileScalarFieldEnum];
export declare const Unit5_shifting_modalityScalarFieldEnum: {
    readonly iern: "iern";
    readonly school_id: "school_id";
    readonly has_standard_shifting: "has_standard_shifting";
    readonly has_adms: "has_adms";
    readonly shifting_modality: "shifting_modality";
    readonly adm_mdl: "adm_mdl";
    readonly adm_odl: "adm_odl";
    readonly adm_tvi: "adm_tvi";
    readonly adm_blended: "adm_blended";
    readonly shift_kinder: "shift_kinder";
    readonly shift_g1: "shift_g1";
    readonly shift_g2: "shift_g2";
    readonly shift_g3: "shift_g3";
    readonly shift_g4: "shift_g4";
    readonly shift_g5: "shift_g5";
    readonly shift_g6: "shift_g6";
    readonly shift_g7: "shift_g7";
    readonly shift_g8: "shift_g8";
    readonly shift_g9: "shift_g9";
    readonly shift_g10: "shift_g10";
    readonly shift_g11: "shift_g11";
    readonly shift_g12: "shift_g12";
    readonly shift_mg_1: "shift_mg_1";
    readonly shift_mg_2: "shift_mg_2";
    readonly shift_mg_3: "shift_mg_3";
    readonly mode_kinder: "mode_kinder";
    readonly mode_g1: "mode_g1";
    readonly mode_g2: "mode_g2";
    readonly mode_g3: "mode_g3";
    readonly mode_g4: "mode_g4";
    readonly mode_g5: "mode_g5";
    readonly mode_g6: "mode_g6";
    readonly mode_g7: "mode_g7";
    readonly mode_g8: "mode_g8";
    readonly mode_g9: "mode_g9";
    readonly mode_g10: "mode_g10";
    readonly mode_g11: "mode_g11";
    readonly mode_g12: "mode_g12";
    readonly mode_mg_1: "mode_mg_1";
    readonly mode_mg_2: "mode_mg_2";
    readonly mode_mg_3: "mode_mg_3";
    readonly unit5: "unit5";
    readonly unit5_completed: "unit5_completed";
    readonly unit5_updated_at: "unit5_updated_at";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly school_yr: "school_yr";
};
export type Unit5_shifting_modalityScalarFieldEnum = (typeof Unit5_shifting_modalityScalarFieldEnum)[keyof typeof Unit5_shifting_modalityScalarFieldEnum];
export declare const Unit6_ecart_batchesScalarFieldEnum: {
    readonly id: "id";
    readonly iern: "iern";
    readonly batches_name: "batches_name";
    readonly year_received: "year_received";
    readonly sources_fund: "sources_fund";
    readonly ecart_laptops: "ecart_laptops";
    readonly ecart_tablets: "ecart_tablets";
    readonly ecart_tv: "ecart_tv";
    readonly charging_condition: "charging_condition";
    readonly remarks: "remarks";
    readonly created_at: "created_at";
    readonly school_yr: "school_yr";
};
export type Unit6_ecart_batchesScalarFieldEnum = (typeof Unit6_ecart_batchesScalarFieldEnum)[keyof typeof Unit6_ecart_batchesScalarFieldEnum];
export declare const Unit6_furniture_gradesScalarFieldEnum: {
    readonly id: "id";
    readonly iern: "iern";
    readonly grade_level: "grade_level";
    readonly armchair_wood_func: "armchair_wood_func";
    readonly armchair_wood_broken: "armchair_wood_broken";
    readonly armchair_plastic_func: "armchair_plastic_func";
    readonly armchair_plastic_broken: "armchair_plastic_broken";
    readonly armchair_plastic_steel_func: "armchair_plastic_steel_func";
    readonly armchair_plastic_steel_broken: "armchair_plastic_steel_broken";
    readonly individual_table_chair_func: "individual_table_chair_func";
    readonly individual_table_chair_broken: "individual_table_chair_broken";
    readonly two_seater_wood_func: "two_seater_wood_func";
    readonly two_seater_wood_broken: "two_seater_wood_broken";
    readonly two_seater_wood_steel_func: "two_seater_wood_steel_func";
    readonly two_seater_wood_steel_broken: "two_seater_wood_steel_broken";
    readonly wooden_chair_only_func: "wooden_chair_only_func";
    readonly wooden_chair_only_broken: "wooden_chair_only_broken";
    readonly plastic_chair_only_func: "plastic_chair_only_func";
    readonly plastic_chair_only_broken: "plastic_chair_only_broken";
    readonly is_sharing: "is_sharing";
    readonly shared_with: "shared_with";
    readonly is_kinder_double_shift: "is_kinder_double_shift";
    readonly created_at: "created_at";
    readonly school_yr: "school_yr";
};
export type Unit6_furniture_gradesScalarFieldEnum = (typeof Unit6_furniture_gradesScalarFieldEnum)[keyof typeof Unit6_furniture_gradesScalarFieldEnum];
export declare const Unit6_school_resourcesScalarFieldEnum: {
    readonly iern: "iern";
    readonly school_id: "school_id";
    readonly iern_val: "iern_val";
    readonly unit6_completed: "unit6_completed";
    readonly unit6_updated_at: "unit6_updated_at";
    readonly has_general_rooms: "has_general_rooms";
    readonly general_rooms_count: "general_rooms_count";
    readonly armchair_wood_func: "armchair_wood_func";
    readonly armchair_wood_broken: "armchair_wood_broken";
    readonly armchair_plastic_func: "armchair_plastic_func";
    readonly armchair_plastic_broken: "armchair_plastic_broken";
    readonly armchair_plastic_steel_func: "armchair_plastic_steel_func";
    readonly armchair_plastic_steel_broken: "armchair_plastic_steel_broken";
    readonly individual_table_chair_func: "individual_table_chair_func";
    readonly individual_table_chair_broken: "individual_table_chair_broken";
    readonly two_seater_wood_func: "two_seater_wood_func";
    readonly two_seater_wood_broken: "two_seater_wood_broken";
    readonly two_seater_wood_steel_func: "two_seater_wood_steel_func";
    readonly two_seater_wood_steel_broken: "two_seater_wood_steel_broken";
    readonly wooden_chair_only_func: "wooden_chair_only_func";
    readonly wooden_chair_only_broken: "wooden_chair_only_broken";
    readonly plastic_chair_only_func: "plastic_chair_only_func";
    readonly plastic_chair_only_broken: "plastic_chair_only_broken";
    readonly has_teacher_desk: "has_teacher_desk";
    readonly laptops_total: "laptops_total";
    readonly laptops_func: "laptops_func";
    readonly laptops_teaching: "laptops_teaching";
    readonly laptops_working: "laptops_working";
    readonly tablets_total: "tablets_total";
    readonly tablets_func: "tablets_func";
    readonly tablets_teaching: "tablets_teaching";
    readonly tablets_working: "tablets_working";
    readonly desktops_total: "desktops_total";
    readonly desktops_func: "desktops_func";
    readonly desktops_teaching: "desktops_teaching";
    readonly desktops_working: "desktops_working";
    readonly smart_tvs_total: "smart_tvs_total";
    readonly smart_tvs_func: "smart_tvs_func";
    readonly smart_tvs_cond: "smart_tvs_cond";
    readonly projectors_total: "projectors_total";
    readonly projectors_func: "projectors_func";
    readonly projectors_cond: "projectors_cond";
    readonly printers_total: "printers_total";
    readonly printers_func: "printers_func";
    readonly printers_cond: "printers_cond";
    readonly unit7_has_ecart: "unit7_has_ecart";
    readonly male_seats_total: "male_seats_total";
    readonly male_seats_func: "male_seats_func";
    readonly male_seats_cond: "male_seats_cond";
    readonly male_urinals_total: "male_urinals_total";
    readonly male_urinals_func: "male_urinals_func";
    readonly female_seats_total: "female_seats_total";
    readonly female_seats_func: "female_seats_func";
    readonly female_seats_cond: "female_seats_cond";
    readonly common_seats_total: "common_seats_total";
    readonly common_seats_func: "common_seats_func";
    readonly common_seats_cond: "common_seats_cond";
    readonly pwd_seats_total: "pwd_seats_total";
    readonly pwd_seats_func: "pwd_seats_func";
    readonly pwd_seats_cond: "pwd_seats_cond";
    readonly faucets_total: "faucets_total";
    readonly faucets_func: "faucets_func";
    readonly faucets_cond: "faucets_cond";
    readonly water_source: "water_source";
    readonly confirm_no_piped: "confirm_no_piped";
    readonly confirm_no_piped_text: "confirm_no_piped_text";
    readonly confirm_zero_wash_text: "confirm_zero_wash_text";
    readonly attached_cr_classrooms: "attached_cr_classrooms";
    readonly attached_cr_seats: "attached_cr_seats";
    readonly attached_cr_included_in_main: "attached_cr_included_in_main";
    readonly utility_electricity: "utility_electricity";
    readonly confirm_no_grid: "confirm_no_grid";
    readonly confirm_no_grid_text: "confirm_no_grid_text";
    readonly has_solar_or_gen: "has_solar_or_gen";
    readonly utility_internet_yesno: "utility_internet_yesno";
    readonly utility_internet_type: "utility_internet_type";
    readonly confirm_no_wired: "confirm_no_wired";
    readonly confirm_no_wired_text: "confirm_no_wired_text";
    readonly utility_internet_funder: "utility_internet_funder";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly laptops_students: "laptops_students";
    readonly tablets_students: "tablets_students";
    readonly desktops_students: "desktops_students";
    readonly school_yr: "school_yr";
};
export type Unit6_school_resourcesScalarFieldEnum = (typeof Unit6_school_resourcesScalarFieldEnum)[keyof typeof Unit6_school_resourcesScalarFieldEnum];
export declare const Unit7_buildings_demolitionScalarFieldEnum: {
    readonly id: "id";
    readonly school_id: "school_id";
    readonly iern: "iern";
    readonly building_name: "building_name";
    readonly room_name: "room_name";
    readonly age: "age";
    readonly safety: "safety";
    readonly calamity: "calamity";
    readonly upgrade: "upgrade";
    readonly less_than_7x9: "less_than_7x9";
    readonly x9: "x9";
    readonly above_7x9: "above_7x9";
    readonly created_at: "created_at";
    readonly school_yr: "school_yr";
};
export type Unit7_buildings_demolitionScalarFieldEnum = (typeof Unit7_buildings_demolitionScalarFieldEnum)[keyof typeof Unit7_buildings_demolitionScalarFieldEnum];
export declare const Unit7_buildings_inventoryScalarFieldEnum: {
    readonly id: "id";
    readonly school_id: "school_id";
    readonly iern: "iern";
    readonly building_name: "building_name";
    readonly room_name: "room_name";
    readonly category: "category";
    readonly storey: "storey";
    readonly classroom: "classroom";
    readonly year_completed: "year_completed";
    readonly remarks: "remarks";
    readonly less_than_7x9: "less_than_7x9";
    readonly x9: "x9";
    readonly above_7x9: "above_7x9";
    readonly grade_level: "grade_level";
    readonly status: "status";
    readonly is_in_use: "is_in_use";
    readonly seats: "seats";
    readonly dimension: "dimension";
    readonly room_length: "room_length";
    readonly room_width: "room_width";
    readonly created_at: "created_at";
    readonly school_yr: "school_yr";
};
export type Unit7_buildings_inventoryScalarFieldEnum = (typeof Unit7_buildings_inventoryScalarFieldEnum)[keyof typeof Unit7_buildings_inventoryScalarFieldEnum];
export declare const Unit7_buildings_repairsScalarFieldEnum: {
    readonly id: "id";
    readonly school_id: "school_id";
    readonly iern: "iern";
    readonly building_name: "building_name";
    readonly room_name: "room_name";
    readonly item_name: "item_name";
    readonly oms: "oms";
    readonly condition: "condition";
    readonly damage_ratio: "damage_ratio";
    readonly recommended_action: "recommended_action";
    readonly demo_justification: "demo_justification";
    readonly remarks: "remarks";
    readonly created_at: "created_at";
    readonly school_yr: "school_yr";
};
export type Unit7_buildings_repairsScalarFieldEnum = (typeof Unit7_buildings_repairsScalarFieldEnum)[keyof typeof Unit7_buildings_repairsScalarFieldEnum];
export declare const Unit7_facilitiesScalarFieldEnum: {
    readonly iern: "iern";
    readonly school_id: "school_id";
    readonly unit7: "unit7";
    readonly unit7_completed: "unit7_completed";
    readonly unit7_updated_at: "unit7_updated_at";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly unit7_no_buildings: "unit7_no_buildings";
    readonly unit7_no_rooms: "unit7_no_rooms";
    readonly unit7_has_buildable_space: "unit7_has_buildable_space";
    readonly unit7_no_buildable_space: "unit7_no_buildable_space";
    readonly unit7_no_repair_rooms: "unit7_no_repair_rooms";
    readonly unit7_no_demolition: "unit7_no_demolition";
    readonly school_yr: "school_yr";
};
export type Unit7_facilitiesScalarFieldEnum = (typeof Unit7_facilitiesScalarFieldEnum)[keyof typeof Unit7_facilitiesScalarFieldEnum];
export declare const Unit7_school_buildable_spacesScalarFieldEnum: {
    readonly id: "id";
    readonly school_id: "school_id";
    readonly iern: "iern";
    readonly space_name: "space_name";
    readonly center_lat: "center_lat";
    readonly center_lng: "center_lng";
    readonly length_m: "length_m";
    readonly width_m: "width_m";
    readonly rotation_deg: "rotation_deg";
    readonly total_area_sqm: "total_area_sqm";
    readonly created_at: "created_at";
    readonly school_yr: "school_yr";
};
export type Unit7_school_buildable_spacesScalarFieldEnum = (typeof Unit7_school_buildable_spacesScalarFieldEnum)[keyof typeof Unit7_school_buildable_spacesScalarFieldEnum];
export declare const Unit8_locationScalarFieldEnum: {
    readonly school_id: "school_id";
    readonly iern: "iern";
    readonly transportation_modes: "transportation_modes";
    readonly road_paved_pct: "road_paved_pct";
    readonly road_unpaved_pct: "road_unpaved_pct";
    readonly road_lighting_pct: "road_lighting_pct";
    readonly public_transpo_availability: "public_transpo_availability";
    readonly water_proximity: "water_proximity";
    readonly near_cliff_ravine: "near_cliff_ravine";
    readonly road_cliff_pct: "road_cliff_pct";
    readonly near_water: "near_water";
    readonly natural_calamities: "natural_calamities";
    readonly hazards_experienced: "hazards_experienced";
    readonly has_insurgency_threats: "has_insurgency_threats";
    readonly insurgency_threats_6mo: "insurgency_threats_6mo";
    readonly road_passable_public_transpo_pct: "road_passable_public_transpo_pct";
    readonly river_crossing_on_foot: "river_crossing_on_foot";
    readonly river_crossing_count: "river_crossing_count";
    readonly emergency_response_mins: "emergency_response_mins";
    readonly proximity_hospital_km: "proximity_hospital_km";
    readonly proximity_brgy_hall_mins: "proximity_brgy_hall_mins";
    readonly proximity_brgy_hall_km: "proximity_brgy_hall_km";
    readonly proximity_muni_hall_mins: "proximity_muni_hall_mins";
    readonly proximity_muni_hall_km: "proximity_muni_hall_km";
    readonly proximity_sdo_mins: "proximity_sdo_mins";
    readonly proximity_sdo_km: "proximity_sdo_km";
    readonly proximity_clinic_mins: "proximity_clinic_mins";
    readonly proximity_clinic_km: "proximity_clinic_km";
    readonly proximity_terminal_mins: "proximity_terminal_mins";
    readonly proximity_terminal_km: "proximity_terminal_km";
    readonly proximity_highway_mins: "proximity_highway_mins";
    readonly proximity_highway_km: "proximity_highway_km";
    readonly cellular_coverage: "cellular_coverage";
    readonly weather_isolation: "weather_isolation";
    readonly weather_isolation_6mo: "weather_isolation_6mo";
    readonly anthropogenic_threats: "anthropogenic_threats";
    readonly risk_index: "risk_index";
    readonly updated_at: "updated_at";
    readonly unit8: "unit8";
    readonly unit8_completed: "unit8_completed";
    readonly unit8_updated_at: "unit8_updated_at";
    readonly created_at: "created_at";
    readonly school_yr: "school_yr";
};
export type Unit8_locationScalarFieldEnum = (typeof Unit8_locationScalarFieldEnum)[keyof typeof Unit8_locationScalarFieldEnum];
export declare const Unit9_safetyScalarFieldEnum: {
    readonly school_id: "school_id";
    readonly iern: "iern";
    readonly u9_main_power_source: "u9_main_power_source";
    readonly u9_active_meters: "u9_active_meters";
    readonly u9_wiring_age: "u9_wiring_age";
    readonly u9_last_inspection_year: "u9_last_inspection_year";
    readonly u9_panel_clear: "u9_panel_clear";
    readonly u9_panel_labeled: "u9_panel_labeled";
    readonly u9_panel_locked: "u9_panel_locked";
    readonly u9_lights_working_chk: "u9_lights_working_chk";
    readonly u9_outlet_covers_unbroken: "u9_outlet_covers_unbroken";
    readonly u9_child_safety_covered: "u9_child_safety_covered";
    readonly u9_water_splash_safe: "u9_water_splash_safe";
    readonly u9_bare_wires_visible: "u9_bare_wires_visible";
    readonly u9_enough_outlets: "u9_enough_outlets";
    readonly u9_ext_cord_temp_only: "u9_ext_cord_temp_only";
    readonly u9_no_trip_hazards: "u9_no_trip_hazards";
    readonly u9_appliance_cords_good: "u9_appliance_cords_good";
    readonly u9_plugs_feel_cool: "u9_plugs_feel_cool";
    readonly u9_cctv_recording_clear: "u9_cctv_recording_clear";
    readonly u9_dvr_room_cool_locked: "u9_dvr_room_cool_locked";
    readonly u9_cctv_wires_protected: "u9_cctv_wires_protected";
    readonly u9_fire_exit_exists: "u9_fire_exit_exists";
    readonly u9_backup_light_exists: "u9_backup_light_exists";
    readonly u9_ecart_load_ready: "u9_ecart_load_ready";
    readonly u9_has_surge_protection: "u9_has_surge_protection";
    readonly u9_remarks: "u9_remarks";
    readonly u9_cctv_working: "u9_cctv_working";
    readonly u9_cctv_broken: "u9_cctv_broken";
    readonly u9_cctv_spares: "u9_cctv_spares";
    readonly u9_fire_ext_working: "u9_fire_ext_working";
    readonly u9_fire_ext_broken: "u9_fire_ext_broken";
    readonly u9_fire_ext_spares: "u9_fire_ext_spares";
    readonly u9_first_aid_working: "u9_first_aid_working";
    readonly u9_first_aid_broken: "u9_first_aid_broken";
    readonly u9_first_aid_spares: "u9_first_aid_spares";
    readonly u9_bullhorns_working: "u9_bullhorns_working";
    readonly u9_bullhorns_broken: "u9_bullhorns_broken";
    readonly u9_bullhorns_spares: "u9_bullhorns_spares";
    readonly u9_radios_working: "u9_radios_working";
    readonly u9_radios_broken: "u9_radios_broken";
    readonly u9_radios_spares: "u9_radios_spares";
    readonly u9_flashlight_working: "u9_flashlight_working";
    readonly u9_flashlight_broken: "u9_flashlight_broken";
    readonly u9_flashlight_spares: "u9_flashlight_spares";
    readonly u9_whistles_quantity: "u9_whistles_quantity";
    readonly u9_bulbs_working: "u9_bulbs_working";
    readonly u9_bulbs_broken: "u9_bulbs_broken";
    readonly u9_bulbs_spares: "u9_bulbs_spares";
    readonly u9_covers_working: "u9_covers_working";
    readonly u9_covers_broken: "u9_covers_broken";
    readonly u9_covers_spares: "u9_covers_spares";
    readonly u9_breakers_working: "u9_breakers_working";
    readonly u9_breakers_broken: "u9_breakers_broken";
    readonly u9_breakers_spares: "u9_breakers_spares";
    readonly u9_ext_cords_working: "u9_ext_cords_working";
    readonly u9_ext_cords_broken: "u9_ext_cords_broken";
    readonly u9_ext_cords_spares: "u9_ext_cords_spares";
    readonly u9_tape_quantity: "u9_tape_quantity";
    readonly unit9: "unit9";
    readonly unit9_completed: "unit9_completed";
    readonly unit9_updated_at: "unit9_updated_at";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly school_yr: "school_yr";
};
export type Unit9_safetyScalarFieldEnum = (typeof Unit9_safetyScalarFieldEnum)[keyof typeof Unit9_safetyScalarFieldEnum];
export declare const User_device_tokensScalarFieldEnum: {
    readonly uid: "uid";
    readonly fcm_token: "fcm_token";
    readonly updated_at: "updated_at";
};
export type User_device_tokensScalarFieldEnum = (typeof User_device_tokensScalarFieldEnum)[keyof typeof User_device_tokensScalarFieldEnum];
export declare const User_web_push_subscriptionsScalarFieldEnum: {
    readonly id: "id";
    readonly uid: "uid";
    readonly subscription_json: "subscription_json";
    readonly device_info: "device_info";
    readonly created_at: "created_at";
};
export type User_web_push_subscriptionsScalarFieldEnum = (typeof User_web_push_subscriptionsScalarFieldEnum)[keyof typeof User_web_push_subscriptionsScalarFieldEnum];
export declare const UsersScalarFieldEnum: {
    readonly uid: "uid";
    readonly email: "email";
    readonly role: "role";
    readonly created_at: "created_at";
    readonly first_name: "first_name";
    readonly last_name: "last_name";
    readonly region: "region";
    readonly division: "division";
    readonly province: "province";
    readonly city: "city";
    readonly barangay: "barangay";
    readonly office: "office";
    readonly position: "position";
    readonly disabled: "disabled";
    readonly contact_number: "contact_number";
    readonly alt_email: "alt_email";
    readonly account_category: "account_category";
    readonly password_hash: "password_hash";
    readonly password_salt: "password_salt";
    readonly hash_version: "hash_version";
    readonly passcode: "passcode";
    readonly iern: "iern";
    readonly registrant_type: "registrant_type";
    readonly school_id: "school_id";
    readonly has_seen_nexus_tutorial: "has_seen_nexus_tutorial";
    readonly registration_status: "registration_status";
    readonly is_testaccount: "is_testaccount";
    readonly assigned_region: "assigned_region";
    readonly assigned_division: "assigned_division";
    readonly division_multiple: "division_multiple";
};
export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum];
export declare const Variation_ordersScalarFieldEnum: {
    readonly id: "id";
    readonly project_id: "project_id";
    readonly ipc: "ipc";
    readonly vo_number: "vo_number";
    readonly vo_sequence_no: "vo_sequence_no";
    readonly vo_type: "vo_type";
    readonly requested_date: "requested_date";
    readonly requested_by: "requested_by";
    readonly original_contract_amount: "original_contract_amount";
    readonly additive_amount: "additive_amount";
    readonly deductive_amount: "deductive_amount";
    readonly net_vo_amount: "net_vo_amount";
    readonly revised_contract_amount: "revised_contract_amount";
    readonly original_target_completion_date: "original_target_completion_date";
    readonly revised_target_completion_date: "revised_target_completion_date";
    readonly time_extension_days: "time_extension_days";
    readonly revised_expiry_date: "revised_expiry_date";
    readonly justification: "justification";
    readonly caf_reference: "caf_reference";
    readonly status_of_construction_phase: "status_of_construction_phase";
    readonly revised_pow_pdf: "revised_pow_pdf";
    readonly created_at: "created_at";
    readonly created_by: "created_by";
    readonly justification_category: "justification_category";
    readonly justification_details: "justification_details";
    readonly previous_vo_total: "previous_vo_total";
    readonly original_expiry_date: "original_expiry_date";
};
export type Variation_ordersScalarFieldEnum = (typeof Variation_ordersScalarFieldEnum)[keyof typeof Variation_ordersScalarFieldEnum];
export declare const Verification_codesScalarFieldEnum: {
    readonly email: "email";
    readonly code: "code";
    readonly expires_at: "expires_at";
};
export type Verification_codesScalarFieldEnum = (typeof Verification_codesScalarFieldEnum)[keyof typeof Verification_codesScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: runtime.JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>;
export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type BytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes'>;
export type ListBytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    accelerateUrl: string;
    adapter?: never;
}) & {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
    queryPlanCacheMaxSize?: number;
};
export type GlobalOmitConfig = {
    activity_logs?: Prisma.activity_logsOmit;
    app_feedback?: Prisma.app_feedbackOmit;
    audit_feedback_tasks?: Prisma.audit_feedback_tasksOmit;
    authorization_codes?: Prisma.authorization_codesOmit;
    buildable_spaces?: Prisma.buildable_spacesOmit;
    chat_messages?: Prisma.chat_messagesOmit;
    chat_room_participants?: Prisma.chat_room_participantsOmit;
    chat_rooms?: Prisma.chat_roomsOmit;
    chatbot_knowledge?: Prisma.chatbot_knowledgeOmit;
    co_finance?: Prisma.co_financeOmit;
    command_center_user?: Prisma.command_center_userOmit;
    engineer_create?: Prisma.engineer_createOmit;
    engineer_create_updates?: Prisma.engineer_create_updatesOmit;
    engineer_documents?: Prisma.engineer_documentsOmit;
    engineer_form?: Prisma.engineer_formOmit;
    engineer_form_outbox?: Prisma.engineer_form_outboxOmit;
    engineer_form_updates?: Prisma.engineer_form_updatesOmit;
    engineer_image?: Prisma.engineer_imageOmit;
    engineer_mother_moa?: Prisma.engineer_mother_moaOmit;
    engineer_projects_inventory?: Prisma.engineer_projects_inventoryOmit;
    engineer_supplamental_moa?: Prisma.engineer_supplamental_moaOmit;
    engineer_supplemental_moa?: Prisma.engineer_supplemental_moaOmit;
    esf7_database?: Prisma.esf7_databaseOmit;
    esf7_resubmission_request?: Prisma.esf7_resubmission_requestOmit;
    esf7_scan_results?: Prisma.esf7_scan_resultsOmit;
    esf7_staging?: Prisma.esf7_stagingOmit;
    esf_link?: Prisma.esf_linkOmit;
    facility_demolitions?: Prisma.facility_demolitionsOmit;
    facility_inventory?: Prisma.facility_inventoryOmit;
    facility_repairs?: Prisma.facility_repairsOmit;
    facility_rooms?: Prisma.facility_roomsOmit;
    finance_projects?: Prisma.finance_projectsOmit;
    insighted_project_update?: Prisma.insighted_project_updateOmit;
    knex_migrations?: Prisma.knex_migrationsOmit;
    knex_migrations_lock?: Prisma.knex_migrations_lockOmit;
    lgu_image?: Prisma.lgu_imageOmit;
    lgu_projects?: Prisma.lgu_projectsOmit;
    masterlist_26_30?: Prisma.masterlist_26_30Omit;
    notable_achievements?: Prisma.notable_achievementsOmit;
    notifications?: Prisma.notificationsOmit;
    pending_schools?: Prisma.pending_schoolsOmit;
    ph_buildings_demolition?: Prisma.ph_buildings_demolitionOmit;
    ph_buildings_inventory?: Prisma.ph_buildings_inventoryOmit;
    ph_buildings_repairs?: Prisma.ph_buildings_repairsOmit;
    ph_ecart_batches?: Prisma.ph_ecart_batchesOmit;
    ph_migrations?: Prisma.ph_migrationsOmit;
    ph_school_buildable_spaces?: Prisma.ph_school_buildable_spacesOmit;
    ph_school_completion?: Prisma.ph_school_completionOmit;
    ph_schools?: Prisma.ph_schoolsOmit;
    ph_schools_validate?: Prisma.ph_schools_validateOmit;
    ph_teachers_list?: Prisma.ph_teachers_listOmit;
    project_documents?: Prisma.project_documentsOmit;
    realignments?: Prisma.realignmentsOmit;
    regional_engineer_documents?: Prisma.regional_engineer_documentsOmit;
    regional_engineer_form?: Prisma.regional_engineer_formOmit;
    regional_engineer_form_updates?: Prisma.regional_engineer_form_updatesOmit;
    regional_engineer_image?: Prisma.regional_engineer_imageOmit;
    school_documents?: Prisma.school_documentsOmit;
    school_location_profiles?: Prisma.school_location_profilesOmit;
    school_ownership_docs?: Prisma.school_ownership_docsOmit;
    school_ownership_records?: Prisma.school_ownership_recordsOmit;
    schools_IERN?: Prisma.schools_IERNOmit;
    schools_iern_archives?: Prisma.schools_iern_archivesOmit;
    settings?: Prisma.settingsOmit;
    siif_activities?: Prisma.siif_activitiesOmit;
    siif_allocations?: Prisma.siif_allocationsOmit;
    siif_expenses?: Prisma.siif_expensesOmit;
    siif_interventions?: Prisma.siif_interventionsOmit;
    siif_ro_coordination?: Prisma.siif_ro_coordinationOmit;
    siif_submissions?: Prisma.siif_submissionsOmit;
    siif_utilization?: Prisma.siif_utilizationOmit;
    stride_users?: Prisma.stride_usersOmit;
    super_user?: Prisma.super_userOmit;
    system_feedback?: Prisma.system_feedbackOmit;
    system_settings?: Prisma.system_settingsOmit;
    teaching_personnel?: Prisma.teaching_personnelOmit;
    third_level_official_masterlist?: Prisma.third_level_official_masterlistOmit;
    third_level_officials_masterlist?: Prisma.third_level_officials_masterlistOmit;
    third_level_officials_profiles?: Prisma.third_level_officials_profilesOmit;
    third_level_officials_profiling_application?: Prisma.third_level_officials_profiling_applicationOmit;
    third_level_officials_updates?: Prisma.third_level_officials_updatesOmit;
    ticket_announcements?: Prisma.ticket_announcementsOmit;
    tranche_fund?: Prisma.tranche_fundOmit;
    unified_binaries?: Prisma.unified_binariesOmit;
    unit1_school_identity?: Prisma.unit1_school_identityOmit;
    unit2_school_learners?: Prisma.unit2_school_learnersOmit;
    unit3_organized_classes?: Prisma.unit3_organized_classesOmit;
    unit4_learner_profile?: Prisma.unit4_learner_profileOmit;
    unit5_shifting_modality?: Prisma.unit5_shifting_modalityOmit;
    unit6_ecart_batches?: Prisma.unit6_ecart_batchesOmit;
    unit6_furniture_grades?: Prisma.unit6_furniture_gradesOmit;
    unit6_school_resources?: Prisma.unit6_school_resourcesOmit;
    unit7_buildings_demolition?: Prisma.unit7_buildings_demolitionOmit;
    unit7_buildings_inventory?: Prisma.unit7_buildings_inventoryOmit;
    unit7_buildings_repairs?: Prisma.unit7_buildings_repairsOmit;
    unit7_facilities?: Prisma.unit7_facilitiesOmit;
    unit7_school_buildable_spaces?: Prisma.unit7_school_buildable_spacesOmit;
    unit8_location?: Prisma.unit8_locationOmit;
    unit9_safety?: Prisma.unit9_safetyOmit;
    user_device_tokens?: Prisma.user_device_tokensOmit;
    user_web_push_subscriptions?: Prisma.user_web_push_subscriptionsOmit;
    users?: Prisma.usersOmit;
    variation_orders?: Prisma.variation_ordersOmit;
    verification_codes?: Prisma.verification_codesOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
