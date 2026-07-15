import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type audit_feedback_tasksModel = runtime.Types.Result.DefaultSelection<Prisma.$audit_feedback_tasksPayload>;
export type AggregateAudit_feedback_tasks = {
    _count: Audit_feedback_tasksCountAggregateOutputType | null;
    _avg: Audit_feedback_tasksAvgAggregateOutputType | null;
    _sum: Audit_feedback_tasksSumAggregateOutputType | null;
    _min: Audit_feedback_tasksMinAggregateOutputType | null;
    _max: Audit_feedback_tasksMaxAggregateOutputType | null;
};
export type Audit_feedback_tasksAvgAggregateOutputType = {
    id: number | null;
};
export type Audit_feedback_tasksSumAggregateOutputType = {
    id: number | null;
};
export type Audit_feedback_tasksMinAggregateOutputType = {
    id: number | null;
    school_id: string | null;
    iern: string | null;
    unit_id: string | null;
    instruction: string | null;
    auditor_uid: string | null;
    auditor_name: string | null;
    status: string | null;
    school_head_note: string | null;
    is_resolved: boolean | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Audit_feedback_tasksMaxAggregateOutputType = {
    id: number | null;
    school_id: string | null;
    iern: string | null;
    unit_id: string | null;
    instruction: string | null;
    auditor_uid: string | null;
    auditor_name: string | null;
    status: string | null;
    school_head_note: string | null;
    is_resolved: boolean | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Audit_feedback_tasksCountAggregateOutputType = {
    id: number;
    school_id: number;
    iern: number;
    unit_id: number;
    instruction: number;
    auditor_uid: number;
    auditor_name: number;
    status: number;
    school_head_note: number;
    is_resolved: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Audit_feedback_tasksAvgAggregateInputType = {
    id?: true;
};
export type Audit_feedback_tasksSumAggregateInputType = {
    id?: true;
};
export type Audit_feedback_tasksMinAggregateInputType = {
    id?: true;
    school_id?: true;
    iern?: true;
    unit_id?: true;
    instruction?: true;
    auditor_uid?: true;
    auditor_name?: true;
    status?: true;
    school_head_note?: true;
    is_resolved?: true;
    created_at?: true;
    updated_at?: true;
};
export type Audit_feedback_tasksMaxAggregateInputType = {
    id?: true;
    school_id?: true;
    iern?: true;
    unit_id?: true;
    instruction?: true;
    auditor_uid?: true;
    auditor_name?: true;
    status?: true;
    school_head_note?: true;
    is_resolved?: true;
    created_at?: true;
    updated_at?: true;
};
export type Audit_feedback_tasksCountAggregateInputType = {
    id?: true;
    school_id?: true;
    iern?: true;
    unit_id?: true;
    instruction?: true;
    auditor_uid?: true;
    auditor_name?: true;
    status?: true;
    school_head_note?: true;
    is_resolved?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Audit_feedback_tasksAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.audit_feedback_tasksWhereInput;
    orderBy?: Prisma.audit_feedback_tasksOrderByWithRelationInput | Prisma.audit_feedback_tasksOrderByWithRelationInput[];
    cursor?: Prisma.audit_feedback_tasksWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Audit_feedback_tasksCountAggregateInputType;
    _avg?: Audit_feedback_tasksAvgAggregateInputType;
    _sum?: Audit_feedback_tasksSumAggregateInputType;
    _min?: Audit_feedback_tasksMinAggregateInputType;
    _max?: Audit_feedback_tasksMaxAggregateInputType;
};
export type GetAudit_feedback_tasksAggregateType<T extends Audit_feedback_tasksAggregateArgs> = {
    [P in keyof T & keyof AggregateAudit_feedback_tasks]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAudit_feedback_tasks[P]> : Prisma.GetScalarType<T[P], AggregateAudit_feedback_tasks[P]>;
};
export type audit_feedback_tasksGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.audit_feedback_tasksWhereInput;
    orderBy?: Prisma.audit_feedback_tasksOrderByWithAggregationInput | Prisma.audit_feedback_tasksOrderByWithAggregationInput[];
    by: Prisma.Audit_feedback_tasksScalarFieldEnum[] | Prisma.Audit_feedback_tasksScalarFieldEnum;
    having?: Prisma.audit_feedback_tasksScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Audit_feedback_tasksCountAggregateInputType | true;
    _avg?: Audit_feedback_tasksAvgAggregateInputType;
    _sum?: Audit_feedback_tasksSumAggregateInputType;
    _min?: Audit_feedback_tasksMinAggregateInputType;
    _max?: Audit_feedback_tasksMaxAggregateInputType;
};
export type Audit_feedback_tasksGroupByOutputType = {
    id: number;
    school_id: string;
    iern: string | null;
    unit_id: string;
    instruction: string;
    auditor_uid: string | null;
    auditor_name: string | null;
    status: string | null;
    school_head_note: string | null;
    is_resolved: boolean | null;
    created_at: Date | null;
    updated_at: Date | null;
    _count: Audit_feedback_tasksCountAggregateOutputType | null;
    _avg: Audit_feedback_tasksAvgAggregateOutputType | null;
    _sum: Audit_feedback_tasksSumAggregateOutputType | null;
    _min: Audit_feedback_tasksMinAggregateOutputType | null;
    _max: Audit_feedback_tasksMaxAggregateOutputType | null;
};
export type GetAudit_feedback_tasksGroupByPayload<T extends audit_feedback_tasksGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Audit_feedback_tasksGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Audit_feedback_tasksGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Audit_feedback_tasksGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Audit_feedback_tasksGroupByOutputType[P]>;
}>>;
export type audit_feedback_tasksWhereInput = {
    AND?: Prisma.audit_feedback_tasksWhereInput | Prisma.audit_feedback_tasksWhereInput[];
    OR?: Prisma.audit_feedback_tasksWhereInput[];
    NOT?: Prisma.audit_feedback_tasksWhereInput | Prisma.audit_feedback_tasksWhereInput[];
    id?: Prisma.IntFilter<"audit_feedback_tasks"> | number;
    school_id?: Prisma.StringFilter<"audit_feedback_tasks"> | string;
    iern?: Prisma.StringNullableFilter<"audit_feedback_tasks"> | string | null;
    unit_id?: Prisma.StringFilter<"audit_feedback_tasks"> | string;
    instruction?: Prisma.StringFilter<"audit_feedback_tasks"> | string;
    auditor_uid?: Prisma.StringNullableFilter<"audit_feedback_tasks"> | string | null;
    auditor_name?: Prisma.StringNullableFilter<"audit_feedback_tasks"> | string | null;
    status?: Prisma.StringNullableFilter<"audit_feedback_tasks"> | string | null;
    school_head_note?: Prisma.StringNullableFilter<"audit_feedback_tasks"> | string | null;
    is_resolved?: Prisma.BoolNullableFilter<"audit_feedback_tasks"> | boolean | null;
    created_at?: Prisma.DateTimeNullableFilter<"audit_feedback_tasks"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"audit_feedback_tasks"> | Date | string | null;
};
export type audit_feedback_tasksOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrderInput | Prisma.SortOrder;
    unit_id?: Prisma.SortOrder;
    instruction?: Prisma.SortOrder;
    auditor_uid?: Prisma.SortOrderInput | Prisma.SortOrder;
    auditor_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_head_note?: Prisma.SortOrderInput | Prisma.SortOrder;
    is_resolved?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type audit_feedback_tasksWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.audit_feedback_tasksWhereInput | Prisma.audit_feedback_tasksWhereInput[];
    OR?: Prisma.audit_feedback_tasksWhereInput[];
    NOT?: Prisma.audit_feedback_tasksWhereInput | Prisma.audit_feedback_tasksWhereInput[];
    school_id?: Prisma.StringFilter<"audit_feedback_tasks"> | string;
    iern?: Prisma.StringNullableFilter<"audit_feedback_tasks"> | string | null;
    unit_id?: Prisma.StringFilter<"audit_feedback_tasks"> | string;
    instruction?: Prisma.StringFilter<"audit_feedback_tasks"> | string;
    auditor_uid?: Prisma.StringNullableFilter<"audit_feedback_tasks"> | string | null;
    auditor_name?: Prisma.StringNullableFilter<"audit_feedback_tasks"> | string | null;
    status?: Prisma.StringNullableFilter<"audit_feedback_tasks"> | string | null;
    school_head_note?: Prisma.StringNullableFilter<"audit_feedback_tasks"> | string | null;
    is_resolved?: Prisma.BoolNullableFilter<"audit_feedback_tasks"> | boolean | null;
    created_at?: Prisma.DateTimeNullableFilter<"audit_feedback_tasks"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"audit_feedback_tasks"> | Date | string | null;
}, "id">;
export type audit_feedback_tasksOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrderInput | Prisma.SortOrder;
    unit_id?: Prisma.SortOrder;
    instruction?: Prisma.SortOrder;
    auditor_uid?: Prisma.SortOrderInput | Prisma.SortOrder;
    auditor_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_head_note?: Prisma.SortOrderInput | Prisma.SortOrder;
    is_resolved?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.audit_feedback_tasksCountOrderByAggregateInput;
    _avg?: Prisma.audit_feedback_tasksAvgOrderByAggregateInput;
    _max?: Prisma.audit_feedback_tasksMaxOrderByAggregateInput;
    _min?: Prisma.audit_feedback_tasksMinOrderByAggregateInput;
    _sum?: Prisma.audit_feedback_tasksSumOrderByAggregateInput;
};
export type audit_feedback_tasksScalarWhereWithAggregatesInput = {
    AND?: Prisma.audit_feedback_tasksScalarWhereWithAggregatesInput | Prisma.audit_feedback_tasksScalarWhereWithAggregatesInput[];
    OR?: Prisma.audit_feedback_tasksScalarWhereWithAggregatesInput[];
    NOT?: Prisma.audit_feedback_tasksScalarWhereWithAggregatesInput | Prisma.audit_feedback_tasksScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"audit_feedback_tasks"> | number;
    school_id?: Prisma.StringWithAggregatesFilter<"audit_feedback_tasks"> | string;
    iern?: Prisma.StringNullableWithAggregatesFilter<"audit_feedback_tasks"> | string | null;
    unit_id?: Prisma.StringWithAggregatesFilter<"audit_feedback_tasks"> | string;
    instruction?: Prisma.StringWithAggregatesFilter<"audit_feedback_tasks"> | string;
    auditor_uid?: Prisma.StringNullableWithAggregatesFilter<"audit_feedback_tasks"> | string | null;
    auditor_name?: Prisma.StringNullableWithAggregatesFilter<"audit_feedback_tasks"> | string | null;
    status?: Prisma.StringNullableWithAggregatesFilter<"audit_feedback_tasks"> | string | null;
    school_head_note?: Prisma.StringNullableWithAggregatesFilter<"audit_feedback_tasks"> | string | null;
    is_resolved?: Prisma.BoolNullableWithAggregatesFilter<"audit_feedback_tasks"> | boolean | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"audit_feedback_tasks"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"audit_feedback_tasks"> | Date | string | null;
};
export type audit_feedback_tasksCreateInput = {
    school_id: string;
    iern?: string | null;
    unit_id: string;
    instruction: string;
    auditor_uid?: string | null;
    auditor_name?: string | null;
    status?: string | null;
    school_head_note?: string | null;
    is_resolved?: boolean | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type audit_feedback_tasksUncheckedCreateInput = {
    id?: number;
    school_id: string;
    iern?: string | null;
    unit_id: string;
    instruction: string;
    auditor_uid?: string | null;
    auditor_name?: string | null;
    status?: string | null;
    school_head_note?: string | null;
    is_resolved?: boolean | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type audit_feedback_tasksUpdateInput = {
    school_id?: Prisma.StringFieldUpdateOperationsInput | string;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unit_id?: Prisma.StringFieldUpdateOperationsInput | string;
    instruction?: Prisma.StringFieldUpdateOperationsInput | string;
    auditor_uid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    auditor_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_head_note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_resolved?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type audit_feedback_tasksUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.StringFieldUpdateOperationsInput | string;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unit_id?: Prisma.StringFieldUpdateOperationsInput | string;
    instruction?: Prisma.StringFieldUpdateOperationsInput | string;
    auditor_uid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    auditor_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_head_note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_resolved?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type audit_feedback_tasksCreateManyInput = {
    id?: number;
    school_id: string;
    iern?: string | null;
    unit_id: string;
    instruction: string;
    auditor_uid?: string | null;
    auditor_name?: string | null;
    status?: string | null;
    school_head_note?: string | null;
    is_resolved?: boolean | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type audit_feedback_tasksUpdateManyMutationInput = {
    school_id?: Prisma.StringFieldUpdateOperationsInput | string;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unit_id?: Prisma.StringFieldUpdateOperationsInput | string;
    instruction?: Prisma.StringFieldUpdateOperationsInput | string;
    auditor_uid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    auditor_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_head_note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_resolved?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type audit_feedback_tasksUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.StringFieldUpdateOperationsInput | string;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unit_id?: Prisma.StringFieldUpdateOperationsInput | string;
    instruction?: Prisma.StringFieldUpdateOperationsInput | string;
    auditor_uid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    auditor_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_head_note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_resolved?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type audit_feedback_tasksCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    unit_id?: Prisma.SortOrder;
    instruction?: Prisma.SortOrder;
    auditor_uid?: Prisma.SortOrder;
    auditor_name?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    school_head_note?: Prisma.SortOrder;
    is_resolved?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type audit_feedback_tasksAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type audit_feedback_tasksMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    unit_id?: Prisma.SortOrder;
    instruction?: Prisma.SortOrder;
    auditor_uid?: Prisma.SortOrder;
    auditor_name?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    school_head_note?: Prisma.SortOrder;
    is_resolved?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type audit_feedback_tasksMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    unit_id?: Prisma.SortOrder;
    instruction?: Prisma.SortOrder;
    auditor_uid?: Prisma.SortOrder;
    auditor_name?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    school_head_note?: Prisma.SortOrder;
    is_resolved?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type audit_feedback_tasksSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null;
};
export type audit_feedback_tasksSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    unit_id?: boolean;
    instruction?: boolean;
    auditor_uid?: boolean;
    auditor_name?: boolean;
    status?: boolean;
    school_head_note?: boolean;
    is_resolved?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["audit_feedback_tasks"]>;
export type audit_feedback_tasksSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    unit_id?: boolean;
    instruction?: boolean;
    auditor_uid?: boolean;
    auditor_name?: boolean;
    status?: boolean;
    school_head_note?: boolean;
    is_resolved?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["audit_feedback_tasks"]>;
export type audit_feedback_tasksSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    unit_id?: boolean;
    instruction?: boolean;
    auditor_uid?: boolean;
    auditor_name?: boolean;
    status?: boolean;
    school_head_note?: boolean;
    is_resolved?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["audit_feedback_tasks"]>;
export type audit_feedback_tasksSelectScalar = {
    id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    unit_id?: boolean;
    instruction?: boolean;
    auditor_uid?: boolean;
    auditor_name?: boolean;
    status?: boolean;
    school_head_note?: boolean;
    is_resolved?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type audit_feedback_tasksOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "school_id" | "iern" | "unit_id" | "instruction" | "auditor_uid" | "auditor_name" | "status" | "school_head_note" | "is_resolved" | "created_at" | "updated_at", ExtArgs["result"]["audit_feedback_tasks"]>;
export type $audit_feedback_tasksPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "audit_feedback_tasks";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        school_id: string;
        iern: string | null;
        unit_id: string;
        instruction: string;
        auditor_uid: string | null;
        auditor_name: string | null;
        status: string | null;
        school_head_note: string | null;
        is_resolved: boolean | null;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["audit_feedback_tasks"]>;
    composites: {};
};
export type audit_feedback_tasksGetPayload<S extends boolean | null | undefined | audit_feedback_tasksDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$audit_feedback_tasksPayload, S>;
export type audit_feedback_tasksCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<audit_feedback_tasksFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Audit_feedback_tasksCountAggregateInputType | true;
};
export interface audit_feedback_tasksDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['audit_feedback_tasks'];
        meta: {
            name: 'audit_feedback_tasks';
        };
    };
    findUnique<T extends audit_feedback_tasksFindUniqueArgs>(args: Prisma.SelectSubset<T, audit_feedback_tasksFindUniqueArgs<ExtArgs>>): Prisma.Prisma__audit_feedback_tasksClient<runtime.Types.Result.GetResult<Prisma.$audit_feedback_tasksPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends audit_feedback_tasksFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, audit_feedback_tasksFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__audit_feedback_tasksClient<runtime.Types.Result.GetResult<Prisma.$audit_feedback_tasksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends audit_feedback_tasksFindFirstArgs>(args?: Prisma.SelectSubset<T, audit_feedback_tasksFindFirstArgs<ExtArgs>>): Prisma.Prisma__audit_feedback_tasksClient<runtime.Types.Result.GetResult<Prisma.$audit_feedback_tasksPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends audit_feedback_tasksFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, audit_feedback_tasksFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__audit_feedback_tasksClient<runtime.Types.Result.GetResult<Prisma.$audit_feedback_tasksPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends audit_feedback_tasksFindManyArgs>(args?: Prisma.SelectSubset<T, audit_feedback_tasksFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$audit_feedback_tasksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends audit_feedback_tasksCreateArgs>(args: Prisma.SelectSubset<T, audit_feedback_tasksCreateArgs<ExtArgs>>): Prisma.Prisma__audit_feedback_tasksClient<runtime.Types.Result.GetResult<Prisma.$audit_feedback_tasksPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends audit_feedback_tasksCreateManyArgs>(args?: Prisma.SelectSubset<T, audit_feedback_tasksCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends audit_feedback_tasksCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, audit_feedback_tasksCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$audit_feedback_tasksPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends audit_feedback_tasksDeleteArgs>(args: Prisma.SelectSubset<T, audit_feedback_tasksDeleteArgs<ExtArgs>>): Prisma.Prisma__audit_feedback_tasksClient<runtime.Types.Result.GetResult<Prisma.$audit_feedback_tasksPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends audit_feedback_tasksUpdateArgs>(args: Prisma.SelectSubset<T, audit_feedback_tasksUpdateArgs<ExtArgs>>): Prisma.Prisma__audit_feedback_tasksClient<runtime.Types.Result.GetResult<Prisma.$audit_feedback_tasksPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends audit_feedback_tasksDeleteManyArgs>(args?: Prisma.SelectSubset<T, audit_feedback_tasksDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends audit_feedback_tasksUpdateManyArgs>(args: Prisma.SelectSubset<T, audit_feedback_tasksUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends audit_feedback_tasksUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, audit_feedback_tasksUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$audit_feedback_tasksPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends audit_feedback_tasksUpsertArgs>(args: Prisma.SelectSubset<T, audit_feedback_tasksUpsertArgs<ExtArgs>>): Prisma.Prisma__audit_feedback_tasksClient<runtime.Types.Result.GetResult<Prisma.$audit_feedback_tasksPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends audit_feedback_tasksCountArgs>(args?: Prisma.Subset<T, audit_feedback_tasksCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Audit_feedback_tasksCountAggregateOutputType> : number>;
    aggregate<T extends Audit_feedback_tasksAggregateArgs>(args: Prisma.Subset<T, Audit_feedback_tasksAggregateArgs>): Prisma.PrismaPromise<GetAudit_feedback_tasksAggregateType<T>>;
    groupBy<T extends audit_feedback_tasksGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: audit_feedback_tasksGroupByArgs['orderBy'];
    } : {
        orderBy?: audit_feedback_tasksGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, audit_feedback_tasksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAudit_feedback_tasksGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: audit_feedback_tasksFieldRefs;
}
export interface Prisma__audit_feedback_tasksClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface audit_feedback_tasksFieldRefs {
    readonly id: Prisma.FieldRef<"audit_feedback_tasks", 'Int'>;
    readonly school_id: Prisma.FieldRef<"audit_feedback_tasks", 'String'>;
    readonly iern: Prisma.FieldRef<"audit_feedback_tasks", 'String'>;
    readonly unit_id: Prisma.FieldRef<"audit_feedback_tasks", 'String'>;
    readonly instruction: Prisma.FieldRef<"audit_feedback_tasks", 'String'>;
    readonly auditor_uid: Prisma.FieldRef<"audit_feedback_tasks", 'String'>;
    readonly auditor_name: Prisma.FieldRef<"audit_feedback_tasks", 'String'>;
    readonly status: Prisma.FieldRef<"audit_feedback_tasks", 'String'>;
    readonly school_head_note: Prisma.FieldRef<"audit_feedback_tasks", 'String'>;
    readonly is_resolved: Prisma.FieldRef<"audit_feedback_tasks", 'Boolean'>;
    readonly created_at: Prisma.FieldRef<"audit_feedback_tasks", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"audit_feedback_tasks", 'DateTime'>;
}
export type audit_feedback_tasksFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.audit_feedback_tasksSelect<ExtArgs> | null;
    omit?: Prisma.audit_feedback_tasksOmit<ExtArgs> | null;
    where: Prisma.audit_feedback_tasksWhereUniqueInput;
};
export type audit_feedback_tasksFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.audit_feedback_tasksSelect<ExtArgs> | null;
    omit?: Prisma.audit_feedback_tasksOmit<ExtArgs> | null;
    where: Prisma.audit_feedback_tasksWhereUniqueInput;
};
export type audit_feedback_tasksFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.audit_feedback_tasksSelect<ExtArgs> | null;
    omit?: Prisma.audit_feedback_tasksOmit<ExtArgs> | null;
    where?: Prisma.audit_feedback_tasksWhereInput;
    orderBy?: Prisma.audit_feedback_tasksOrderByWithRelationInput | Prisma.audit_feedback_tasksOrderByWithRelationInput[];
    cursor?: Prisma.audit_feedback_tasksWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Audit_feedback_tasksScalarFieldEnum | Prisma.Audit_feedback_tasksScalarFieldEnum[];
};
export type audit_feedback_tasksFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.audit_feedback_tasksSelect<ExtArgs> | null;
    omit?: Prisma.audit_feedback_tasksOmit<ExtArgs> | null;
    where?: Prisma.audit_feedback_tasksWhereInput;
    orderBy?: Prisma.audit_feedback_tasksOrderByWithRelationInput | Prisma.audit_feedback_tasksOrderByWithRelationInput[];
    cursor?: Prisma.audit_feedback_tasksWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Audit_feedback_tasksScalarFieldEnum | Prisma.Audit_feedback_tasksScalarFieldEnum[];
};
export type audit_feedback_tasksFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.audit_feedback_tasksSelect<ExtArgs> | null;
    omit?: Prisma.audit_feedback_tasksOmit<ExtArgs> | null;
    where?: Prisma.audit_feedback_tasksWhereInput;
    orderBy?: Prisma.audit_feedback_tasksOrderByWithRelationInput | Prisma.audit_feedback_tasksOrderByWithRelationInput[];
    cursor?: Prisma.audit_feedback_tasksWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Audit_feedback_tasksScalarFieldEnum | Prisma.Audit_feedback_tasksScalarFieldEnum[];
};
export type audit_feedback_tasksCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.audit_feedback_tasksSelect<ExtArgs> | null;
    omit?: Prisma.audit_feedback_tasksOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.audit_feedback_tasksCreateInput, Prisma.audit_feedback_tasksUncheckedCreateInput>;
};
export type audit_feedback_tasksCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.audit_feedback_tasksCreateManyInput | Prisma.audit_feedback_tasksCreateManyInput[];
    skipDuplicates?: boolean;
};
export type audit_feedback_tasksCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.audit_feedback_tasksSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.audit_feedback_tasksOmit<ExtArgs> | null;
    data: Prisma.audit_feedback_tasksCreateManyInput | Prisma.audit_feedback_tasksCreateManyInput[];
    skipDuplicates?: boolean;
};
export type audit_feedback_tasksUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.audit_feedback_tasksSelect<ExtArgs> | null;
    omit?: Prisma.audit_feedback_tasksOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.audit_feedback_tasksUpdateInput, Prisma.audit_feedback_tasksUncheckedUpdateInput>;
    where: Prisma.audit_feedback_tasksWhereUniqueInput;
};
export type audit_feedback_tasksUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.audit_feedback_tasksUpdateManyMutationInput, Prisma.audit_feedback_tasksUncheckedUpdateManyInput>;
    where?: Prisma.audit_feedback_tasksWhereInput;
    limit?: number;
};
export type audit_feedback_tasksUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.audit_feedback_tasksSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.audit_feedback_tasksOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.audit_feedback_tasksUpdateManyMutationInput, Prisma.audit_feedback_tasksUncheckedUpdateManyInput>;
    where?: Prisma.audit_feedback_tasksWhereInput;
    limit?: number;
};
export type audit_feedback_tasksUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.audit_feedback_tasksSelect<ExtArgs> | null;
    omit?: Prisma.audit_feedback_tasksOmit<ExtArgs> | null;
    where: Prisma.audit_feedback_tasksWhereUniqueInput;
    create: Prisma.XOR<Prisma.audit_feedback_tasksCreateInput, Prisma.audit_feedback_tasksUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.audit_feedback_tasksUpdateInput, Prisma.audit_feedback_tasksUncheckedUpdateInput>;
};
export type audit_feedback_tasksDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.audit_feedback_tasksSelect<ExtArgs> | null;
    omit?: Prisma.audit_feedback_tasksOmit<ExtArgs> | null;
    where: Prisma.audit_feedback_tasksWhereUniqueInput;
};
export type audit_feedback_tasksDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.audit_feedback_tasksWhereInput;
    limit?: number;
};
export type audit_feedback_tasksDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.audit_feedback_tasksSelect<ExtArgs> | null;
    omit?: Prisma.audit_feedback_tasksOmit<ExtArgs> | null;
};
