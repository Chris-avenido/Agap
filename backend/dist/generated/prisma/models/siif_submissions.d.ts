import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type siif_submissionsModel = runtime.Types.Result.DefaultSelection<Prisma.$siif_submissionsPayload>;
export type AggregateSiif_submissions = {
    _count: Siif_submissionsCountAggregateOutputType | null;
    _avg: Siif_submissionsAvgAggregateOutputType | null;
    _sum: Siif_submissionsSumAggregateOutputType | null;
    _min: Siif_submissionsMinAggregateOutputType | null;
    _max: Siif_submissionsMaxAggregateOutputType | null;
};
export type Siif_submissionsAvgAggregateOutputType = {
    siif_sub_id: number | null;
    fiscal_year: number | null;
    total_budget_estimate: runtime.Decimal | null;
};
export type Siif_submissionsSumAggregateOutputType = {
    siif_sub_id: number | null;
    fiscal_year: number | null;
    total_budget_estimate: runtime.Decimal | null;
};
export type Siif_submissionsMinAggregateOutputType = {
    siif_sub_id: number | null;
    school_id: string | null;
    school_name: string | null;
    region: string | null;
    division: string | null;
    district: string | null;
    fiscal_year: number | null;
    total_budget_estimate: runtime.Decimal | null;
    status: string | null;
    submission_status: string | null;
    remarks: string | null;
    submitted_at: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Siif_submissionsMaxAggregateOutputType = {
    siif_sub_id: number | null;
    school_id: string | null;
    school_name: string | null;
    region: string | null;
    division: string | null;
    district: string | null;
    fiscal_year: number | null;
    total_budget_estimate: runtime.Decimal | null;
    status: string | null;
    submission_status: string | null;
    remarks: string | null;
    submitted_at: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Siif_submissionsCountAggregateOutputType = {
    siif_sub_id: number;
    school_id: number;
    school_name: number;
    region: number;
    division: number;
    district: number;
    fiscal_year: number;
    total_budget_estimate: number;
    status: number;
    submission_status: number;
    remarks: number;
    submitted_at: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Siif_submissionsAvgAggregateInputType = {
    siif_sub_id?: true;
    fiscal_year?: true;
    total_budget_estimate?: true;
};
export type Siif_submissionsSumAggregateInputType = {
    siif_sub_id?: true;
    fiscal_year?: true;
    total_budget_estimate?: true;
};
export type Siif_submissionsMinAggregateInputType = {
    siif_sub_id?: true;
    school_id?: true;
    school_name?: true;
    region?: true;
    division?: true;
    district?: true;
    fiscal_year?: true;
    total_budget_estimate?: true;
    status?: true;
    submission_status?: true;
    remarks?: true;
    submitted_at?: true;
    created_at?: true;
    updated_at?: true;
};
export type Siif_submissionsMaxAggregateInputType = {
    siif_sub_id?: true;
    school_id?: true;
    school_name?: true;
    region?: true;
    division?: true;
    district?: true;
    fiscal_year?: true;
    total_budget_estimate?: true;
    status?: true;
    submission_status?: true;
    remarks?: true;
    submitted_at?: true;
    created_at?: true;
    updated_at?: true;
};
export type Siif_submissionsCountAggregateInputType = {
    siif_sub_id?: true;
    school_id?: true;
    school_name?: true;
    region?: true;
    division?: true;
    district?: true;
    fiscal_year?: true;
    total_budget_estimate?: true;
    status?: true;
    submission_status?: true;
    remarks?: true;
    submitted_at?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Siif_submissionsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_submissionsWhereInput;
    orderBy?: Prisma.siif_submissionsOrderByWithRelationInput | Prisma.siif_submissionsOrderByWithRelationInput[];
    cursor?: Prisma.siif_submissionsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Siif_submissionsCountAggregateInputType;
    _avg?: Siif_submissionsAvgAggregateInputType;
    _sum?: Siif_submissionsSumAggregateInputType;
    _min?: Siif_submissionsMinAggregateInputType;
    _max?: Siif_submissionsMaxAggregateInputType;
};
export type GetSiif_submissionsAggregateType<T extends Siif_submissionsAggregateArgs> = {
    [P in keyof T & keyof AggregateSiif_submissions]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSiif_submissions[P]> : Prisma.GetScalarType<T[P], AggregateSiif_submissions[P]>;
};
export type siif_submissionsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_submissionsWhereInput;
    orderBy?: Prisma.siif_submissionsOrderByWithAggregationInput | Prisma.siif_submissionsOrderByWithAggregationInput[];
    by: Prisma.Siif_submissionsScalarFieldEnum[] | Prisma.Siif_submissionsScalarFieldEnum;
    having?: Prisma.siif_submissionsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Siif_submissionsCountAggregateInputType | true;
    _avg?: Siif_submissionsAvgAggregateInputType;
    _sum?: Siif_submissionsSumAggregateInputType;
    _min?: Siif_submissionsMinAggregateInputType;
    _max?: Siif_submissionsMaxAggregateInputType;
};
export type Siif_submissionsGroupByOutputType = {
    siif_sub_id: number;
    school_id: string | null;
    school_name: string | null;
    region: string | null;
    division: string | null;
    district: string | null;
    fiscal_year: number | null;
    total_budget_estimate: runtime.Decimal | null;
    status: string | null;
    submission_status: string | null;
    remarks: string | null;
    submitted_at: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
    _count: Siif_submissionsCountAggregateOutputType | null;
    _avg: Siif_submissionsAvgAggregateOutputType | null;
    _sum: Siif_submissionsSumAggregateOutputType | null;
    _min: Siif_submissionsMinAggregateOutputType | null;
    _max: Siif_submissionsMaxAggregateOutputType | null;
};
export type GetSiif_submissionsGroupByPayload<T extends siif_submissionsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Siif_submissionsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Siif_submissionsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Siif_submissionsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Siif_submissionsGroupByOutputType[P]>;
}>>;
export type siif_submissionsWhereInput = {
    AND?: Prisma.siif_submissionsWhereInput | Prisma.siif_submissionsWhereInput[];
    OR?: Prisma.siif_submissionsWhereInput[];
    NOT?: Prisma.siif_submissionsWhereInput | Prisma.siif_submissionsWhereInput[];
    siif_sub_id?: Prisma.IntFilter<"siif_submissions"> | number;
    school_id?: Prisma.StringNullableFilter<"siif_submissions"> | string | null;
    school_name?: Prisma.StringNullableFilter<"siif_submissions"> | string | null;
    region?: Prisma.StringNullableFilter<"siif_submissions"> | string | null;
    division?: Prisma.StringNullableFilter<"siif_submissions"> | string | null;
    district?: Prisma.StringNullableFilter<"siif_submissions"> | string | null;
    fiscal_year?: Prisma.IntNullableFilter<"siif_submissions"> | number | null;
    total_budget_estimate?: Prisma.DecimalNullableFilter<"siif_submissions"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringNullableFilter<"siif_submissions"> | string | null;
    submission_status?: Prisma.StringNullableFilter<"siif_submissions"> | string | null;
    remarks?: Prisma.StringNullableFilter<"siif_submissions"> | string | null;
    submitted_at?: Prisma.DateTimeNullableFilter<"siif_submissions"> | Date | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"siif_submissions"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"siif_submissions"> | Date | string | null;
    siif_interventions?: Prisma.Siif_interventionsListRelationFilter;
};
export type siif_submissionsOrderByWithRelationInput = {
    siif_sub_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    region?: Prisma.SortOrderInput | Prisma.SortOrder;
    division?: Prisma.SortOrderInput | Prisma.SortOrder;
    district?: Prisma.SortOrderInput | Prisma.SortOrder;
    fiscal_year?: Prisma.SortOrderInput | Prisma.SortOrder;
    total_budget_estimate?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrderInput | Prisma.SortOrder;
    submission_status?: Prisma.SortOrderInput | Prisma.SortOrder;
    remarks?: Prisma.SortOrderInput | Prisma.SortOrder;
    submitted_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    siif_interventions?: Prisma.siif_interventionsOrderByRelationAggregateInput;
};
export type siif_submissionsWhereUniqueInput = Prisma.AtLeast<{
    siif_sub_id?: number;
    school_id?: string;
    AND?: Prisma.siif_submissionsWhereInput | Prisma.siif_submissionsWhereInput[];
    OR?: Prisma.siif_submissionsWhereInput[];
    NOT?: Prisma.siif_submissionsWhereInput | Prisma.siif_submissionsWhereInput[];
    school_name?: Prisma.StringNullableFilter<"siif_submissions"> | string | null;
    region?: Prisma.StringNullableFilter<"siif_submissions"> | string | null;
    division?: Prisma.StringNullableFilter<"siif_submissions"> | string | null;
    district?: Prisma.StringNullableFilter<"siif_submissions"> | string | null;
    fiscal_year?: Prisma.IntNullableFilter<"siif_submissions"> | number | null;
    total_budget_estimate?: Prisma.DecimalNullableFilter<"siif_submissions"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringNullableFilter<"siif_submissions"> | string | null;
    submission_status?: Prisma.StringNullableFilter<"siif_submissions"> | string | null;
    remarks?: Prisma.StringNullableFilter<"siif_submissions"> | string | null;
    submitted_at?: Prisma.DateTimeNullableFilter<"siif_submissions"> | Date | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"siif_submissions"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"siif_submissions"> | Date | string | null;
    siif_interventions?: Prisma.Siif_interventionsListRelationFilter;
}, "siif_sub_id" | "school_id">;
export type siif_submissionsOrderByWithAggregationInput = {
    siif_sub_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    region?: Prisma.SortOrderInput | Prisma.SortOrder;
    division?: Prisma.SortOrderInput | Prisma.SortOrder;
    district?: Prisma.SortOrderInput | Prisma.SortOrder;
    fiscal_year?: Prisma.SortOrderInput | Prisma.SortOrder;
    total_budget_estimate?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrderInput | Prisma.SortOrder;
    submission_status?: Prisma.SortOrderInput | Prisma.SortOrder;
    remarks?: Prisma.SortOrderInput | Prisma.SortOrder;
    submitted_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.siif_submissionsCountOrderByAggregateInput;
    _avg?: Prisma.siif_submissionsAvgOrderByAggregateInput;
    _max?: Prisma.siif_submissionsMaxOrderByAggregateInput;
    _min?: Prisma.siif_submissionsMinOrderByAggregateInput;
    _sum?: Prisma.siif_submissionsSumOrderByAggregateInput;
};
export type siif_submissionsScalarWhereWithAggregatesInput = {
    AND?: Prisma.siif_submissionsScalarWhereWithAggregatesInput | Prisma.siif_submissionsScalarWhereWithAggregatesInput[];
    OR?: Prisma.siif_submissionsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.siif_submissionsScalarWhereWithAggregatesInput | Prisma.siif_submissionsScalarWhereWithAggregatesInput[];
    siif_sub_id?: Prisma.IntWithAggregatesFilter<"siif_submissions"> | number;
    school_id?: Prisma.StringNullableWithAggregatesFilter<"siif_submissions"> | string | null;
    school_name?: Prisma.StringNullableWithAggregatesFilter<"siif_submissions"> | string | null;
    region?: Prisma.StringNullableWithAggregatesFilter<"siif_submissions"> | string | null;
    division?: Prisma.StringNullableWithAggregatesFilter<"siif_submissions"> | string | null;
    district?: Prisma.StringNullableWithAggregatesFilter<"siif_submissions"> | string | null;
    fiscal_year?: Prisma.IntNullableWithAggregatesFilter<"siif_submissions"> | number | null;
    total_budget_estimate?: Prisma.DecimalNullableWithAggregatesFilter<"siif_submissions"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringNullableWithAggregatesFilter<"siif_submissions"> | string | null;
    submission_status?: Prisma.StringNullableWithAggregatesFilter<"siif_submissions"> | string | null;
    remarks?: Prisma.StringNullableWithAggregatesFilter<"siif_submissions"> | string | null;
    submitted_at?: Prisma.DateTimeNullableWithAggregatesFilter<"siif_submissions"> | Date | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"siif_submissions"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"siif_submissions"> | Date | string | null;
};
export type siif_submissionsCreateInput = {
    school_id?: string | null;
    school_name?: string | null;
    region?: string | null;
    division?: string | null;
    district?: string | null;
    fiscal_year?: number | null;
    total_budget_estimate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string | null;
    submission_status?: string | null;
    remarks?: string | null;
    submitted_at?: Date | string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    siif_interventions?: Prisma.siif_interventionsCreateNestedManyWithoutSiif_submissionsInput;
};
export type siif_submissionsUncheckedCreateInput = {
    siif_sub_id?: number;
    school_id?: string | null;
    school_name?: string | null;
    region?: string | null;
    division?: string | null;
    district?: string | null;
    fiscal_year?: number | null;
    total_budget_estimate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string | null;
    submission_status?: string | null;
    remarks?: string | null;
    submitted_at?: Date | string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    siif_interventions?: Prisma.siif_interventionsUncheckedCreateNestedManyWithoutSiif_submissionsInput;
};
export type siif_submissionsUpdateInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fiscal_year?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    total_budget_estimate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submission_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submitted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    siif_interventions?: Prisma.siif_interventionsUpdateManyWithoutSiif_submissionsNestedInput;
};
export type siif_submissionsUncheckedUpdateInput = {
    siif_sub_id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fiscal_year?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    total_budget_estimate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submission_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submitted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    siif_interventions?: Prisma.siif_interventionsUncheckedUpdateManyWithoutSiif_submissionsNestedInput;
};
export type siif_submissionsCreateManyInput = {
    siif_sub_id?: number;
    school_id?: string | null;
    school_name?: string | null;
    region?: string | null;
    division?: string | null;
    district?: string | null;
    fiscal_year?: number | null;
    total_budget_estimate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string | null;
    submission_status?: string | null;
    remarks?: string | null;
    submitted_at?: Date | string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type siif_submissionsUpdateManyMutationInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fiscal_year?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    total_budget_estimate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submission_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submitted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type siif_submissionsUncheckedUpdateManyInput = {
    siif_sub_id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fiscal_year?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    total_budget_estimate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submission_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submitted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type Siif_submissionsNullableScalarRelationFilter = {
    is?: Prisma.siif_submissionsWhereInput | null;
    isNot?: Prisma.siif_submissionsWhereInput | null;
};
export type siif_submissionsCountOrderByAggregateInput = {
    siif_sub_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    school_name?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    fiscal_year?: Prisma.SortOrder;
    total_budget_estimate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    submission_status?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    submitted_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type siif_submissionsAvgOrderByAggregateInput = {
    siif_sub_id?: Prisma.SortOrder;
    fiscal_year?: Prisma.SortOrder;
    total_budget_estimate?: Prisma.SortOrder;
};
export type siif_submissionsMaxOrderByAggregateInput = {
    siif_sub_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    school_name?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    fiscal_year?: Prisma.SortOrder;
    total_budget_estimate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    submission_status?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    submitted_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type siif_submissionsMinOrderByAggregateInput = {
    siif_sub_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    school_name?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    fiscal_year?: Prisma.SortOrder;
    total_budget_estimate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    submission_status?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    submitted_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type siif_submissionsSumOrderByAggregateInput = {
    siif_sub_id?: Prisma.SortOrder;
    fiscal_year?: Prisma.SortOrder;
    total_budget_estimate?: Prisma.SortOrder;
};
export type siif_submissionsCreateNestedOneWithoutSiif_interventionsInput = {
    create?: Prisma.XOR<Prisma.siif_submissionsCreateWithoutSiif_interventionsInput, Prisma.siif_submissionsUncheckedCreateWithoutSiif_interventionsInput>;
    connectOrCreate?: Prisma.siif_submissionsCreateOrConnectWithoutSiif_interventionsInput;
    connect?: Prisma.siif_submissionsWhereUniqueInput;
};
export type siif_submissionsUpdateOneWithoutSiif_interventionsNestedInput = {
    create?: Prisma.XOR<Prisma.siif_submissionsCreateWithoutSiif_interventionsInput, Prisma.siif_submissionsUncheckedCreateWithoutSiif_interventionsInput>;
    connectOrCreate?: Prisma.siif_submissionsCreateOrConnectWithoutSiif_interventionsInput;
    upsert?: Prisma.siif_submissionsUpsertWithoutSiif_interventionsInput;
    disconnect?: Prisma.siif_submissionsWhereInput | boolean;
    delete?: Prisma.siif_submissionsWhereInput | boolean;
    connect?: Prisma.siif_submissionsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.siif_submissionsUpdateToOneWithWhereWithoutSiif_interventionsInput, Prisma.siif_submissionsUpdateWithoutSiif_interventionsInput>, Prisma.siif_submissionsUncheckedUpdateWithoutSiif_interventionsInput>;
};
export type siif_submissionsCreateWithoutSiif_interventionsInput = {
    school_id?: string | null;
    school_name?: string | null;
    region?: string | null;
    division?: string | null;
    district?: string | null;
    fiscal_year?: number | null;
    total_budget_estimate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string | null;
    submission_status?: string | null;
    remarks?: string | null;
    submitted_at?: Date | string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type siif_submissionsUncheckedCreateWithoutSiif_interventionsInput = {
    siif_sub_id?: number;
    school_id?: string | null;
    school_name?: string | null;
    region?: string | null;
    division?: string | null;
    district?: string | null;
    fiscal_year?: number | null;
    total_budget_estimate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string | null;
    submission_status?: string | null;
    remarks?: string | null;
    submitted_at?: Date | string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type siif_submissionsCreateOrConnectWithoutSiif_interventionsInput = {
    where: Prisma.siif_submissionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.siif_submissionsCreateWithoutSiif_interventionsInput, Prisma.siif_submissionsUncheckedCreateWithoutSiif_interventionsInput>;
};
export type siif_submissionsUpsertWithoutSiif_interventionsInput = {
    update: Prisma.XOR<Prisma.siif_submissionsUpdateWithoutSiif_interventionsInput, Prisma.siif_submissionsUncheckedUpdateWithoutSiif_interventionsInput>;
    create: Prisma.XOR<Prisma.siif_submissionsCreateWithoutSiif_interventionsInput, Prisma.siif_submissionsUncheckedCreateWithoutSiif_interventionsInput>;
    where?: Prisma.siif_submissionsWhereInput;
};
export type siif_submissionsUpdateToOneWithWhereWithoutSiif_interventionsInput = {
    where?: Prisma.siif_submissionsWhereInput;
    data: Prisma.XOR<Prisma.siif_submissionsUpdateWithoutSiif_interventionsInput, Prisma.siif_submissionsUncheckedUpdateWithoutSiif_interventionsInput>;
};
export type siif_submissionsUpdateWithoutSiif_interventionsInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fiscal_year?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    total_budget_estimate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submission_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submitted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type siif_submissionsUncheckedUpdateWithoutSiif_interventionsInput = {
    siif_sub_id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fiscal_year?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    total_budget_estimate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submission_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submitted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type Siif_submissionsCountOutputType = {
    siif_interventions: number;
};
export type Siif_submissionsCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    siif_interventions?: boolean | Siif_submissionsCountOutputTypeCountSiif_interventionsArgs;
};
export type Siif_submissionsCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.Siif_submissionsCountOutputTypeSelect<ExtArgs> | null;
};
export type Siif_submissionsCountOutputTypeCountSiif_interventionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_interventionsWhereInput;
};
export type siif_submissionsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    siif_sub_id?: boolean;
    school_id?: boolean;
    school_name?: boolean;
    region?: boolean;
    division?: boolean;
    district?: boolean;
    fiscal_year?: boolean;
    total_budget_estimate?: boolean;
    status?: boolean;
    submission_status?: boolean;
    remarks?: boolean;
    submitted_at?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    siif_interventions?: boolean | Prisma.siif_submissions$siif_interventionsArgs<ExtArgs>;
    _count?: boolean | Prisma.Siif_submissionsCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["siif_submissions"]>;
export type siif_submissionsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    siif_sub_id?: boolean;
    school_id?: boolean;
    school_name?: boolean;
    region?: boolean;
    division?: boolean;
    district?: boolean;
    fiscal_year?: boolean;
    total_budget_estimate?: boolean;
    status?: boolean;
    submission_status?: boolean;
    remarks?: boolean;
    submitted_at?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["siif_submissions"]>;
export type siif_submissionsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    siif_sub_id?: boolean;
    school_id?: boolean;
    school_name?: boolean;
    region?: boolean;
    division?: boolean;
    district?: boolean;
    fiscal_year?: boolean;
    total_budget_estimate?: boolean;
    status?: boolean;
    submission_status?: boolean;
    remarks?: boolean;
    submitted_at?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["siif_submissions"]>;
export type siif_submissionsSelectScalar = {
    siif_sub_id?: boolean;
    school_id?: boolean;
    school_name?: boolean;
    region?: boolean;
    division?: boolean;
    district?: boolean;
    fiscal_year?: boolean;
    total_budget_estimate?: boolean;
    status?: boolean;
    submission_status?: boolean;
    remarks?: boolean;
    submitted_at?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type siif_submissionsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"siif_sub_id" | "school_id" | "school_name" | "region" | "division" | "district" | "fiscal_year" | "total_budget_estimate" | "status" | "submission_status" | "remarks" | "submitted_at" | "created_at" | "updated_at", ExtArgs["result"]["siif_submissions"]>;
export type siif_submissionsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    siif_interventions?: boolean | Prisma.siif_submissions$siif_interventionsArgs<ExtArgs>;
    _count?: boolean | Prisma.Siif_submissionsCountOutputTypeDefaultArgs<ExtArgs>;
};
export type siif_submissionsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type siif_submissionsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $siif_submissionsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "siif_submissions";
    objects: {
        siif_interventions: Prisma.$siif_interventionsPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        siif_sub_id: number;
        school_id: string | null;
        school_name: string | null;
        region: string | null;
        division: string | null;
        district: string | null;
        fiscal_year: number | null;
        total_budget_estimate: runtime.Decimal | null;
        status: string | null;
        submission_status: string | null;
        remarks: string | null;
        submitted_at: Date | null;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["siif_submissions"]>;
    composites: {};
};
export type siif_submissionsGetPayload<S extends boolean | null | undefined | siif_submissionsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$siif_submissionsPayload, S>;
export type siif_submissionsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<siif_submissionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Siif_submissionsCountAggregateInputType | true;
};
export interface siif_submissionsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['siif_submissions'];
        meta: {
            name: 'siif_submissions';
        };
    };
    findUnique<T extends siif_submissionsFindUniqueArgs>(args: Prisma.SelectSubset<T, siif_submissionsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__siif_submissionsClient<runtime.Types.Result.GetResult<Prisma.$siif_submissionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends siif_submissionsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, siif_submissionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__siif_submissionsClient<runtime.Types.Result.GetResult<Prisma.$siif_submissionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends siif_submissionsFindFirstArgs>(args?: Prisma.SelectSubset<T, siif_submissionsFindFirstArgs<ExtArgs>>): Prisma.Prisma__siif_submissionsClient<runtime.Types.Result.GetResult<Prisma.$siif_submissionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends siif_submissionsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, siif_submissionsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__siif_submissionsClient<runtime.Types.Result.GetResult<Prisma.$siif_submissionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends siif_submissionsFindManyArgs>(args?: Prisma.SelectSubset<T, siif_submissionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_submissionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends siif_submissionsCreateArgs>(args: Prisma.SelectSubset<T, siif_submissionsCreateArgs<ExtArgs>>): Prisma.Prisma__siif_submissionsClient<runtime.Types.Result.GetResult<Prisma.$siif_submissionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends siif_submissionsCreateManyArgs>(args?: Prisma.SelectSubset<T, siif_submissionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends siif_submissionsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, siif_submissionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_submissionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends siif_submissionsDeleteArgs>(args: Prisma.SelectSubset<T, siif_submissionsDeleteArgs<ExtArgs>>): Prisma.Prisma__siif_submissionsClient<runtime.Types.Result.GetResult<Prisma.$siif_submissionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends siif_submissionsUpdateArgs>(args: Prisma.SelectSubset<T, siif_submissionsUpdateArgs<ExtArgs>>): Prisma.Prisma__siif_submissionsClient<runtime.Types.Result.GetResult<Prisma.$siif_submissionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends siif_submissionsDeleteManyArgs>(args?: Prisma.SelectSubset<T, siif_submissionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends siif_submissionsUpdateManyArgs>(args: Prisma.SelectSubset<T, siif_submissionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends siif_submissionsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, siif_submissionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_submissionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends siif_submissionsUpsertArgs>(args: Prisma.SelectSubset<T, siif_submissionsUpsertArgs<ExtArgs>>): Prisma.Prisma__siif_submissionsClient<runtime.Types.Result.GetResult<Prisma.$siif_submissionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends siif_submissionsCountArgs>(args?: Prisma.Subset<T, siif_submissionsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Siif_submissionsCountAggregateOutputType> : number>;
    aggregate<T extends Siif_submissionsAggregateArgs>(args: Prisma.Subset<T, Siif_submissionsAggregateArgs>): Prisma.PrismaPromise<GetSiif_submissionsAggregateType<T>>;
    groupBy<T extends siif_submissionsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: siif_submissionsGroupByArgs['orderBy'];
    } : {
        orderBy?: siif_submissionsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, siif_submissionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiif_submissionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: siif_submissionsFieldRefs;
}
export interface Prisma__siif_submissionsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    siif_interventions<T extends Prisma.siif_submissions$siif_interventionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.siif_submissions$siif_interventionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_interventionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface siif_submissionsFieldRefs {
    readonly siif_sub_id: Prisma.FieldRef<"siif_submissions", 'Int'>;
    readonly school_id: Prisma.FieldRef<"siif_submissions", 'String'>;
    readonly school_name: Prisma.FieldRef<"siif_submissions", 'String'>;
    readonly region: Prisma.FieldRef<"siif_submissions", 'String'>;
    readonly division: Prisma.FieldRef<"siif_submissions", 'String'>;
    readonly district: Prisma.FieldRef<"siif_submissions", 'String'>;
    readonly fiscal_year: Prisma.FieldRef<"siif_submissions", 'Int'>;
    readonly total_budget_estimate: Prisma.FieldRef<"siif_submissions", 'Decimal'>;
    readonly status: Prisma.FieldRef<"siif_submissions", 'String'>;
    readonly submission_status: Prisma.FieldRef<"siif_submissions", 'String'>;
    readonly remarks: Prisma.FieldRef<"siif_submissions", 'String'>;
    readonly submitted_at: Prisma.FieldRef<"siif_submissions", 'DateTime'>;
    readonly created_at: Prisma.FieldRef<"siif_submissions", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"siif_submissions", 'DateTime'>;
}
export type siif_submissionsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_submissionsSelect<ExtArgs> | null;
    omit?: Prisma.siif_submissionsOmit<ExtArgs> | null;
    include?: Prisma.siif_submissionsInclude<ExtArgs> | null;
    where: Prisma.siif_submissionsWhereUniqueInput;
};
export type siif_submissionsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_submissionsSelect<ExtArgs> | null;
    omit?: Prisma.siif_submissionsOmit<ExtArgs> | null;
    include?: Prisma.siif_submissionsInclude<ExtArgs> | null;
    where: Prisma.siif_submissionsWhereUniqueInput;
};
export type siif_submissionsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_submissionsSelect<ExtArgs> | null;
    omit?: Prisma.siif_submissionsOmit<ExtArgs> | null;
    include?: Prisma.siif_submissionsInclude<ExtArgs> | null;
    where?: Prisma.siif_submissionsWhereInput;
    orderBy?: Prisma.siif_submissionsOrderByWithRelationInput | Prisma.siif_submissionsOrderByWithRelationInput[];
    cursor?: Prisma.siif_submissionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Siif_submissionsScalarFieldEnum | Prisma.Siif_submissionsScalarFieldEnum[];
};
export type siif_submissionsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_submissionsSelect<ExtArgs> | null;
    omit?: Prisma.siif_submissionsOmit<ExtArgs> | null;
    include?: Prisma.siif_submissionsInclude<ExtArgs> | null;
    where?: Prisma.siif_submissionsWhereInput;
    orderBy?: Prisma.siif_submissionsOrderByWithRelationInput | Prisma.siif_submissionsOrderByWithRelationInput[];
    cursor?: Prisma.siif_submissionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Siif_submissionsScalarFieldEnum | Prisma.Siif_submissionsScalarFieldEnum[];
};
export type siif_submissionsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_submissionsSelect<ExtArgs> | null;
    omit?: Prisma.siif_submissionsOmit<ExtArgs> | null;
    include?: Prisma.siif_submissionsInclude<ExtArgs> | null;
    where?: Prisma.siif_submissionsWhereInput;
    orderBy?: Prisma.siif_submissionsOrderByWithRelationInput | Prisma.siif_submissionsOrderByWithRelationInput[];
    cursor?: Prisma.siif_submissionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Siif_submissionsScalarFieldEnum | Prisma.Siif_submissionsScalarFieldEnum[];
};
export type siif_submissionsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_submissionsSelect<ExtArgs> | null;
    omit?: Prisma.siif_submissionsOmit<ExtArgs> | null;
    include?: Prisma.siif_submissionsInclude<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.siif_submissionsCreateInput, Prisma.siif_submissionsUncheckedCreateInput>;
};
export type siif_submissionsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.siif_submissionsCreateManyInput | Prisma.siif_submissionsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type siif_submissionsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_submissionsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.siif_submissionsOmit<ExtArgs> | null;
    data: Prisma.siif_submissionsCreateManyInput | Prisma.siif_submissionsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type siif_submissionsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_submissionsSelect<ExtArgs> | null;
    omit?: Prisma.siif_submissionsOmit<ExtArgs> | null;
    include?: Prisma.siif_submissionsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.siif_submissionsUpdateInput, Prisma.siif_submissionsUncheckedUpdateInput>;
    where: Prisma.siif_submissionsWhereUniqueInput;
};
export type siif_submissionsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.siif_submissionsUpdateManyMutationInput, Prisma.siif_submissionsUncheckedUpdateManyInput>;
    where?: Prisma.siif_submissionsWhereInput;
    limit?: number;
};
export type siif_submissionsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_submissionsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.siif_submissionsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.siif_submissionsUpdateManyMutationInput, Prisma.siif_submissionsUncheckedUpdateManyInput>;
    where?: Prisma.siif_submissionsWhereInput;
    limit?: number;
};
export type siif_submissionsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_submissionsSelect<ExtArgs> | null;
    omit?: Prisma.siif_submissionsOmit<ExtArgs> | null;
    include?: Prisma.siif_submissionsInclude<ExtArgs> | null;
    where: Prisma.siif_submissionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.siif_submissionsCreateInput, Prisma.siif_submissionsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.siif_submissionsUpdateInput, Prisma.siif_submissionsUncheckedUpdateInput>;
};
export type siif_submissionsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_submissionsSelect<ExtArgs> | null;
    omit?: Prisma.siif_submissionsOmit<ExtArgs> | null;
    include?: Prisma.siif_submissionsInclude<ExtArgs> | null;
    where: Prisma.siif_submissionsWhereUniqueInput;
};
export type siif_submissionsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_submissionsWhereInput;
    limit?: number;
};
export type siif_submissions$siif_interventionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_interventionsSelect<ExtArgs> | null;
    omit?: Prisma.siif_interventionsOmit<ExtArgs> | null;
    include?: Prisma.siif_interventionsInclude<ExtArgs> | null;
    where?: Prisma.siif_interventionsWhereInput;
    orderBy?: Prisma.siif_interventionsOrderByWithRelationInput | Prisma.siif_interventionsOrderByWithRelationInput[];
    cursor?: Prisma.siif_interventionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Siif_interventionsScalarFieldEnum | Prisma.Siif_interventionsScalarFieldEnum[];
};
export type siif_submissionsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_submissionsSelect<ExtArgs> | null;
    omit?: Prisma.siif_submissionsOmit<ExtArgs> | null;
    include?: Prisma.siif_submissionsInclude<ExtArgs> | null;
};
