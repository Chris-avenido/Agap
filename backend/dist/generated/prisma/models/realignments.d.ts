import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type realignmentsModel = runtime.Types.Result.DefaultSelection<Prisma.$realignmentsPayload>;
export type AggregateRealignments = {
    _count: RealignmentsCountAggregateOutputType | null;
    _avg: RealignmentsAvgAggregateOutputType | null;
    _sum: RealignmentsSumAggregateOutputType | null;
    _min: RealignmentsMinAggregateOutputType | null;
    _max: RealignmentsMaxAggregateOutputType | null;
};
export type RealignmentsAvgAggregateOutputType = {
    id: number | null;
    source_project_id: number | null;
    target_project_id: number | null;
    realignment_amount: runtime.Decimal | null;
};
export type RealignmentsSumAggregateOutputType = {
    id: number | null;
    source_project_id: number | null;
    target_project_id: number | null;
    realignment_amount: runtime.Decimal | null;
};
export type RealignmentsMinAggregateOutputType = {
    id: number | null;
    source_project_id: number | null;
    target_project_id: number | null;
    source_ipc: string | null;
    target_ipc: string | null;
    realignment_amount: runtime.Decimal | null;
    request_date: Date | null;
    justification: string | null;
    approving_authority: string | null;
    status: string | null;
    document_url: string | null;
    created_at: Date | null;
    created_by: string | null;
};
export type RealignmentsMaxAggregateOutputType = {
    id: number | null;
    source_project_id: number | null;
    target_project_id: number | null;
    source_ipc: string | null;
    target_ipc: string | null;
    realignment_amount: runtime.Decimal | null;
    request_date: Date | null;
    justification: string | null;
    approving_authority: string | null;
    status: string | null;
    document_url: string | null;
    created_at: Date | null;
    created_by: string | null;
};
export type RealignmentsCountAggregateOutputType = {
    id: number;
    source_project_id: number;
    target_project_id: number;
    source_ipc: number;
    target_ipc: number;
    realignment_amount: number;
    request_date: number;
    justification: number;
    approving_authority: number;
    status: number;
    document_url: number;
    created_at: number;
    created_by: number;
    _all: number;
};
export type RealignmentsAvgAggregateInputType = {
    id?: true;
    source_project_id?: true;
    target_project_id?: true;
    realignment_amount?: true;
};
export type RealignmentsSumAggregateInputType = {
    id?: true;
    source_project_id?: true;
    target_project_id?: true;
    realignment_amount?: true;
};
export type RealignmentsMinAggregateInputType = {
    id?: true;
    source_project_id?: true;
    target_project_id?: true;
    source_ipc?: true;
    target_ipc?: true;
    realignment_amount?: true;
    request_date?: true;
    justification?: true;
    approving_authority?: true;
    status?: true;
    document_url?: true;
    created_at?: true;
    created_by?: true;
};
export type RealignmentsMaxAggregateInputType = {
    id?: true;
    source_project_id?: true;
    target_project_id?: true;
    source_ipc?: true;
    target_ipc?: true;
    realignment_amount?: true;
    request_date?: true;
    justification?: true;
    approving_authority?: true;
    status?: true;
    document_url?: true;
    created_at?: true;
    created_by?: true;
};
export type RealignmentsCountAggregateInputType = {
    id?: true;
    source_project_id?: true;
    target_project_id?: true;
    source_ipc?: true;
    target_ipc?: true;
    realignment_amount?: true;
    request_date?: true;
    justification?: true;
    approving_authority?: true;
    status?: true;
    document_url?: true;
    created_at?: true;
    created_by?: true;
    _all?: true;
};
export type RealignmentsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.realignmentsWhereInput;
    orderBy?: Prisma.realignmentsOrderByWithRelationInput | Prisma.realignmentsOrderByWithRelationInput[];
    cursor?: Prisma.realignmentsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RealignmentsCountAggregateInputType;
    _avg?: RealignmentsAvgAggregateInputType;
    _sum?: RealignmentsSumAggregateInputType;
    _min?: RealignmentsMinAggregateInputType;
    _max?: RealignmentsMaxAggregateInputType;
};
export type GetRealignmentsAggregateType<T extends RealignmentsAggregateArgs> = {
    [P in keyof T & keyof AggregateRealignments]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRealignments[P]> : Prisma.GetScalarType<T[P], AggregateRealignments[P]>;
};
export type realignmentsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.realignmentsWhereInput;
    orderBy?: Prisma.realignmentsOrderByWithAggregationInput | Prisma.realignmentsOrderByWithAggregationInput[];
    by: Prisma.RealignmentsScalarFieldEnum[] | Prisma.RealignmentsScalarFieldEnum;
    having?: Prisma.realignmentsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RealignmentsCountAggregateInputType | true;
    _avg?: RealignmentsAvgAggregateInputType;
    _sum?: RealignmentsSumAggregateInputType;
    _min?: RealignmentsMinAggregateInputType;
    _max?: RealignmentsMaxAggregateInputType;
};
export type RealignmentsGroupByOutputType = {
    id: number;
    source_project_id: number | null;
    target_project_id: number | null;
    source_ipc: string | null;
    target_ipc: string | null;
    realignment_amount: runtime.Decimal | null;
    request_date: Date | null;
    justification: string | null;
    approving_authority: string | null;
    status: string | null;
    document_url: string | null;
    created_at: Date | null;
    created_by: string | null;
    _count: RealignmentsCountAggregateOutputType | null;
    _avg: RealignmentsAvgAggregateOutputType | null;
    _sum: RealignmentsSumAggregateOutputType | null;
    _min: RealignmentsMinAggregateOutputType | null;
    _max: RealignmentsMaxAggregateOutputType | null;
};
export type GetRealignmentsGroupByPayload<T extends realignmentsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RealignmentsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RealignmentsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RealignmentsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RealignmentsGroupByOutputType[P]>;
}>>;
export type realignmentsWhereInput = {
    AND?: Prisma.realignmentsWhereInput | Prisma.realignmentsWhereInput[];
    OR?: Prisma.realignmentsWhereInput[];
    NOT?: Prisma.realignmentsWhereInput | Prisma.realignmentsWhereInput[];
    id?: Prisma.IntFilter<"realignments"> | number;
    source_project_id?: Prisma.IntNullableFilter<"realignments"> | number | null;
    target_project_id?: Prisma.IntNullableFilter<"realignments"> | number | null;
    source_ipc?: Prisma.StringNullableFilter<"realignments"> | string | null;
    target_ipc?: Prisma.StringNullableFilter<"realignments"> | string | null;
    realignment_amount?: Prisma.DecimalNullableFilter<"realignments"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    request_date?: Prisma.DateTimeNullableFilter<"realignments"> | Date | string | null;
    justification?: Prisma.StringNullableFilter<"realignments"> | string | null;
    approving_authority?: Prisma.StringNullableFilter<"realignments"> | string | null;
    status?: Prisma.StringNullableFilter<"realignments"> | string | null;
    document_url?: Prisma.StringNullableFilter<"realignments"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"realignments"> | Date | string | null;
    created_by?: Prisma.StringNullableFilter<"realignments"> | string | null;
};
export type realignmentsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    source_project_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    target_project_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    source_ipc?: Prisma.SortOrderInput | Prisma.SortOrder;
    target_ipc?: Prisma.SortOrderInput | Prisma.SortOrder;
    realignment_amount?: Prisma.SortOrderInput | Prisma.SortOrder;
    request_date?: Prisma.SortOrderInput | Prisma.SortOrder;
    justification?: Prisma.SortOrderInput | Prisma.SortOrder;
    approving_authority?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrderInput | Prisma.SortOrder;
    document_url?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_by?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type realignmentsWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.realignmentsWhereInput | Prisma.realignmentsWhereInput[];
    OR?: Prisma.realignmentsWhereInput[];
    NOT?: Prisma.realignmentsWhereInput | Prisma.realignmentsWhereInput[];
    source_project_id?: Prisma.IntNullableFilter<"realignments"> | number | null;
    target_project_id?: Prisma.IntNullableFilter<"realignments"> | number | null;
    source_ipc?: Prisma.StringNullableFilter<"realignments"> | string | null;
    target_ipc?: Prisma.StringNullableFilter<"realignments"> | string | null;
    realignment_amount?: Prisma.DecimalNullableFilter<"realignments"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    request_date?: Prisma.DateTimeNullableFilter<"realignments"> | Date | string | null;
    justification?: Prisma.StringNullableFilter<"realignments"> | string | null;
    approving_authority?: Prisma.StringNullableFilter<"realignments"> | string | null;
    status?: Prisma.StringNullableFilter<"realignments"> | string | null;
    document_url?: Prisma.StringNullableFilter<"realignments"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"realignments"> | Date | string | null;
    created_by?: Prisma.StringNullableFilter<"realignments"> | string | null;
}, "id">;
export type realignmentsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    source_project_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    target_project_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    source_ipc?: Prisma.SortOrderInput | Prisma.SortOrder;
    target_ipc?: Prisma.SortOrderInput | Prisma.SortOrder;
    realignment_amount?: Prisma.SortOrderInput | Prisma.SortOrder;
    request_date?: Prisma.SortOrderInput | Prisma.SortOrder;
    justification?: Prisma.SortOrderInput | Prisma.SortOrder;
    approving_authority?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrderInput | Prisma.SortOrder;
    document_url?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_by?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.realignmentsCountOrderByAggregateInput;
    _avg?: Prisma.realignmentsAvgOrderByAggregateInput;
    _max?: Prisma.realignmentsMaxOrderByAggregateInput;
    _min?: Prisma.realignmentsMinOrderByAggregateInput;
    _sum?: Prisma.realignmentsSumOrderByAggregateInput;
};
export type realignmentsScalarWhereWithAggregatesInput = {
    AND?: Prisma.realignmentsScalarWhereWithAggregatesInput | Prisma.realignmentsScalarWhereWithAggregatesInput[];
    OR?: Prisma.realignmentsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.realignmentsScalarWhereWithAggregatesInput | Prisma.realignmentsScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"realignments"> | number;
    source_project_id?: Prisma.IntNullableWithAggregatesFilter<"realignments"> | number | null;
    target_project_id?: Prisma.IntNullableWithAggregatesFilter<"realignments"> | number | null;
    source_ipc?: Prisma.StringNullableWithAggregatesFilter<"realignments"> | string | null;
    target_ipc?: Prisma.StringNullableWithAggregatesFilter<"realignments"> | string | null;
    realignment_amount?: Prisma.DecimalNullableWithAggregatesFilter<"realignments"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    request_date?: Prisma.DateTimeNullableWithAggregatesFilter<"realignments"> | Date | string | null;
    justification?: Prisma.StringNullableWithAggregatesFilter<"realignments"> | string | null;
    approving_authority?: Prisma.StringNullableWithAggregatesFilter<"realignments"> | string | null;
    status?: Prisma.StringNullableWithAggregatesFilter<"realignments"> | string | null;
    document_url?: Prisma.StringNullableWithAggregatesFilter<"realignments"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"realignments"> | Date | string | null;
    created_by?: Prisma.StringNullableWithAggregatesFilter<"realignments"> | string | null;
};
export type realignmentsCreateInput = {
    source_project_id?: number | null;
    target_project_id?: number | null;
    source_ipc?: string | null;
    target_ipc?: string | null;
    realignment_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    request_date?: Date | string | null;
    justification?: string | null;
    approving_authority?: string | null;
    status?: string | null;
    document_url?: string | null;
    created_at?: Date | string | null;
    created_by?: string | null;
};
export type realignmentsUncheckedCreateInput = {
    id?: number;
    source_project_id?: number | null;
    target_project_id?: number | null;
    source_ipc?: string | null;
    target_ipc?: string | null;
    realignment_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    request_date?: Date | string | null;
    justification?: string | null;
    approving_authority?: string | null;
    status?: string | null;
    document_url?: string | null;
    created_at?: Date | string | null;
    created_by?: string | null;
};
export type realignmentsUpdateInput = {
    source_project_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    target_project_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    source_ipc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    target_ipc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    realignment_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    request_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    justification?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approving_authority?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    document_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type realignmentsUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    source_project_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    target_project_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    source_ipc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    target_ipc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    realignment_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    request_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    justification?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approving_authority?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    document_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type realignmentsCreateManyInput = {
    id?: number;
    source_project_id?: number | null;
    target_project_id?: number | null;
    source_ipc?: string | null;
    target_ipc?: string | null;
    realignment_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    request_date?: Date | string | null;
    justification?: string | null;
    approving_authority?: string | null;
    status?: string | null;
    document_url?: string | null;
    created_at?: Date | string | null;
    created_by?: string | null;
};
export type realignmentsUpdateManyMutationInput = {
    source_project_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    target_project_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    source_ipc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    target_ipc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    realignment_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    request_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    justification?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approving_authority?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    document_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type realignmentsUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    source_project_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    target_project_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    source_ipc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    target_ipc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    realignment_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    request_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    justification?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approving_authority?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    document_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type realignmentsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    source_project_id?: Prisma.SortOrder;
    target_project_id?: Prisma.SortOrder;
    source_ipc?: Prisma.SortOrder;
    target_ipc?: Prisma.SortOrder;
    realignment_amount?: Prisma.SortOrder;
    request_date?: Prisma.SortOrder;
    justification?: Prisma.SortOrder;
    approving_authority?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    document_url?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
};
export type realignmentsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    source_project_id?: Prisma.SortOrder;
    target_project_id?: Prisma.SortOrder;
    realignment_amount?: Prisma.SortOrder;
};
export type realignmentsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    source_project_id?: Prisma.SortOrder;
    target_project_id?: Prisma.SortOrder;
    source_ipc?: Prisma.SortOrder;
    target_ipc?: Prisma.SortOrder;
    realignment_amount?: Prisma.SortOrder;
    request_date?: Prisma.SortOrder;
    justification?: Prisma.SortOrder;
    approving_authority?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    document_url?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
};
export type realignmentsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    source_project_id?: Prisma.SortOrder;
    target_project_id?: Prisma.SortOrder;
    source_ipc?: Prisma.SortOrder;
    target_ipc?: Prisma.SortOrder;
    realignment_amount?: Prisma.SortOrder;
    request_date?: Prisma.SortOrder;
    justification?: Prisma.SortOrder;
    approving_authority?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    document_url?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
};
export type realignmentsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    source_project_id?: Prisma.SortOrder;
    target_project_id?: Prisma.SortOrder;
    realignment_amount?: Prisma.SortOrder;
};
export type realignmentsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    source_project_id?: boolean;
    target_project_id?: boolean;
    source_ipc?: boolean;
    target_ipc?: boolean;
    realignment_amount?: boolean;
    request_date?: boolean;
    justification?: boolean;
    approving_authority?: boolean;
    status?: boolean;
    document_url?: boolean;
    created_at?: boolean;
    created_by?: boolean;
}, ExtArgs["result"]["realignments"]>;
export type realignmentsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    source_project_id?: boolean;
    target_project_id?: boolean;
    source_ipc?: boolean;
    target_ipc?: boolean;
    realignment_amount?: boolean;
    request_date?: boolean;
    justification?: boolean;
    approving_authority?: boolean;
    status?: boolean;
    document_url?: boolean;
    created_at?: boolean;
    created_by?: boolean;
}, ExtArgs["result"]["realignments"]>;
export type realignmentsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    source_project_id?: boolean;
    target_project_id?: boolean;
    source_ipc?: boolean;
    target_ipc?: boolean;
    realignment_amount?: boolean;
    request_date?: boolean;
    justification?: boolean;
    approving_authority?: boolean;
    status?: boolean;
    document_url?: boolean;
    created_at?: boolean;
    created_by?: boolean;
}, ExtArgs["result"]["realignments"]>;
export type realignmentsSelectScalar = {
    id?: boolean;
    source_project_id?: boolean;
    target_project_id?: boolean;
    source_ipc?: boolean;
    target_ipc?: boolean;
    realignment_amount?: boolean;
    request_date?: boolean;
    justification?: boolean;
    approving_authority?: boolean;
    status?: boolean;
    document_url?: boolean;
    created_at?: boolean;
    created_by?: boolean;
};
export type realignmentsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "source_project_id" | "target_project_id" | "source_ipc" | "target_ipc" | "realignment_amount" | "request_date" | "justification" | "approving_authority" | "status" | "document_url" | "created_at" | "created_by", ExtArgs["result"]["realignments"]>;
export type $realignmentsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "realignments";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        source_project_id: number | null;
        target_project_id: number | null;
        source_ipc: string | null;
        target_ipc: string | null;
        realignment_amount: runtime.Decimal | null;
        request_date: Date | null;
        justification: string | null;
        approving_authority: string | null;
        status: string | null;
        document_url: string | null;
        created_at: Date | null;
        created_by: string | null;
    }, ExtArgs["result"]["realignments"]>;
    composites: {};
};
export type realignmentsGetPayload<S extends boolean | null | undefined | realignmentsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$realignmentsPayload, S>;
export type realignmentsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<realignmentsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RealignmentsCountAggregateInputType | true;
};
export interface realignmentsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['realignments'];
        meta: {
            name: 'realignments';
        };
    };
    findUnique<T extends realignmentsFindUniqueArgs>(args: Prisma.SelectSubset<T, realignmentsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__realignmentsClient<runtime.Types.Result.GetResult<Prisma.$realignmentsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends realignmentsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, realignmentsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__realignmentsClient<runtime.Types.Result.GetResult<Prisma.$realignmentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends realignmentsFindFirstArgs>(args?: Prisma.SelectSubset<T, realignmentsFindFirstArgs<ExtArgs>>): Prisma.Prisma__realignmentsClient<runtime.Types.Result.GetResult<Prisma.$realignmentsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends realignmentsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, realignmentsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__realignmentsClient<runtime.Types.Result.GetResult<Prisma.$realignmentsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends realignmentsFindManyArgs>(args?: Prisma.SelectSubset<T, realignmentsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$realignmentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends realignmentsCreateArgs>(args: Prisma.SelectSubset<T, realignmentsCreateArgs<ExtArgs>>): Prisma.Prisma__realignmentsClient<runtime.Types.Result.GetResult<Prisma.$realignmentsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends realignmentsCreateManyArgs>(args?: Prisma.SelectSubset<T, realignmentsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends realignmentsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, realignmentsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$realignmentsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends realignmentsDeleteArgs>(args: Prisma.SelectSubset<T, realignmentsDeleteArgs<ExtArgs>>): Prisma.Prisma__realignmentsClient<runtime.Types.Result.GetResult<Prisma.$realignmentsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends realignmentsUpdateArgs>(args: Prisma.SelectSubset<T, realignmentsUpdateArgs<ExtArgs>>): Prisma.Prisma__realignmentsClient<runtime.Types.Result.GetResult<Prisma.$realignmentsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends realignmentsDeleteManyArgs>(args?: Prisma.SelectSubset<T, realignmentsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends realignmentsUpdateManyArgs>(args: Prisma.SelectSubset<T, realignmentsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends realignmentsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, realignmentsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$realignmentsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends realignmentsUpsertArgs>(args: Prisma.SelectSubset<T, realignmentsUpsertArgs<ExtArgs>>): Prisma.Prisma__realignmentsClient<runtime.Types.Result.GetResult<Prisma.$realignmentsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends realignmentsCountArgs>(args?: Prisma.Subset<T, realignmentsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RealignmentsCountAggregateOutputType> : number>;
    aggregate<T extends RealignmentsAggregateArgs>(args: Prisma.Subset<T, RealignmentsAggregateArgs>): Prisma.PrismaPromise<GetRealignmentsAggregateType<T>>;
    groupBy<T extends realignmentsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: realignmentsGroupByArgs['orderBy'];
    } : {
        orderBy?: realignmentsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, realignmentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRealignmentsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: realignmentsFieldRefs;
}
export interface Prisma__realignmentsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface realignmentsFieldRefs {
    readonly id: Prisma.FieldRef<"realignments", 'Int'>;
    readonly source_project_id: Prisma.FieldRef<"realignments", 'Int'>;
    readonly target_project_id: Prisma.FieldRef<"realignments", 'Int'>;
    readonly source_ipc: Prisma.FieldRef<"realignments", 'String'>;
    readonly target_ipc: Prisma.FieldRef<"realignments", 'String'>;
    readonly realignment_amount: Prisma.FieldRef<"realignments", 'Decimal'>;
    readonly request_date: Prisma.FieldRef<"realignments", 'DateTime'>;
    readonly justification: Prisma.FieldRef<"realignments", 'String'>;
    readonly approving_authority: Prisma.FieldRef<"realignments", 'String'>;
    readonly status: Prisma.FieldRef<"realignments", 'String'>;
    readonly document_url: Prisma.FieldRef<"realignments", 'String'>;
    readonly created_at: Prisma.FieldRef<"realignments", 'DateTime'>;
    readonly created_by: Prisma.FieldRef<"realignments", 'String'>;
}
export type realignmentsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.realignmentsSelect<ExtArgs> | null;
    omit?: Prisma.realignmentsOmit<ExtArgs> | null;
    where: Prisma.realignmentsWhereUniqueInput;
};
export type realignmentsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.realignmentsSelect<ExtArgs> | null;
    omit?: Prisma.realignmentsOmit<ExtArgs> | null;
    where: Prisma.realignmentsWhereUniqueInput;
};
export type realignmentsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.realignmentsSelect<ExtArgs> | null;
    omit?: Prisma.realignmentsOmit<ExtArgs> | null;
    where?: Prisma.realignmentsWhereInput;
    orderBy?: Prisma.realignmentsOrderByWithRelationInput | Prisma.realignmentsOrderByWithRelationInput[];
    cursor?: Prisma.realignmentsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RealignmentsScalarFieldEnum | Prisma.RealignmentsScalarFieldEnum[];
};
export type realignmentsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.realignmentsSelect<ExtArgs> | null;
    omit?: Prisma.realignmentsOmit<ExtArgs> | null;
    where?: Prisma.realignmentsWhereInput;
    orderBy?: Prisma.realignmentsOrderByWithRelationInput | Prisma.realignmentsOrderByWithRelationInput[];
    cursor?: Prisma.realignmentsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RealignmentsScalarFieldEnum | Prisma.RealignmentsScalarFieldEnum[];
};
export type realignmentsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.realignmentsSelect<ExtArgs> | null;
    omit?: Prisma.realignmentsOmit<ExtArgs> | null;
    where?: Prisma.realignmentsWhereInput;
    orderBy?: Prisma.realignmentsOrderByWithRelationInput | Prisma.realignmentsOrderByWithRelationInput[];
    cursor?: Prisma.realignmentsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RealignmentsScalarFieldEnum | Prisma.RealignmentsScalarFieldEnum[];
};
export type realignmentsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.realignmentsSelect<ExtArgs> | null;
    omit?: Prisma.realignmentsOmit<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.realignmentsCreateInput, Prisma.realignmentsUncheckedCreateInput>;
};
export type realignmentsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.realignmentsCreateManyInput | Prisma.realignmentsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type realignmentsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.realignmentsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.realignmentsOmit<ExtArgs> | null;
    data: Prisma.realignmentsCreateManyInput | Prisma.realignmentsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type realignmentsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.realignmentsSelect<ExtArgs> | null;
    omit?: Prisma.realignmentsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.realignmentsUpdateInput, Prisma.realignmentsUncheckedUpdateInput>;
    where: Prisma.realignmentsWhereUniqueInput;
};
export type realignmentsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.realignmentsUpdateManyMutationInput, Prisma.realignmentsUncheckedUpdateManyInput>;
    where?: Prisma.realignmentsWhereInput;
    limit?: number;
};
export type realignmentsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.realignmentsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.realignmentsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.realignmentsUpdateManyMutationInput, Prisma.realignmentsUncheckedUpdateManyInput>;
    where?: Prisma.realignmentsWhereInput;
    limit?: number;
};
export type realignmentsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.realignmentsSelect<ExtArgs> | null;
    omit?: Prisma.realignmentsOmit<ExtArgs> | null;
    where: Prisma.realignmentsWhereUniqueInput;
    create: Prisma.XOR<Prisma.realignmentsCreateInput, Prisma.realignmentsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.realignmentsUpdateInput, Prisma.realignmentsUncheckedUpdateInput>;
};
export type realignmentsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.realignmentsSelect<ExtArgs> | null;
    omit?: Prisma.realignmentsOmit<ExtArgs> | null;
    where: Prisma.realignmentsWhereUniqueInput;
};
export type realignmentsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.realignmentsWhereInput;
    limit?: number;
};
export type realignmentsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.realignmentsSelect<ExtArgs> | null;
    omit?: Prisma.realignmentsOmit<ExtArgs> | null;
};
