import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type siif_interventionsModel = runtime.Types.Result.DefaultSelection<Prisma.$siif_interventionsPayload>;
export type AggregateSiif_interventions = {
    _count: Siif_interventionsCountAggregateOutputType | null;
    _avg: Siif_interventionsAvgAggregateOutputType | null;
    _sum: Siif_interventionsSumAggregateOutputType | null;
    _min: Siif_interventionsMinAggregateOutputType | null;
    _max: Siif_interventionsMaxAggregateOutputType | null;
};
export type Siif_interventionsAvgAggregateOutputType = {
    siif_int_id: number | null;
    siif_sub_id: number | null;
    budget_estimate: runtime.Decimal | null;
};
export type Siif_interventionsSumAggregateOutputType = {
    siif_int_id: number | null;
    siif_sub_id: number | null;
    budget_estimate: runtime.Decimal | null;
};
export type Siif_interventionsMinAggregateOutputType = {
    siif_int_id: number | null;
    siif_sub_id: number | null;
    intervention_type: string | null;
    budget_estimate: runtime.Decimal | null;
    has_aral: boolean | null;
    other_activity_details: string | null;
};
export type Siif_interventionsMaxAggregateOutputType = {
    siif_int_id: number | null;
    siif_sub_id: number | null;
    intervention_type: string | null;
    budget_estimate: runtime.Decimal | null;
    has_aral: boolean | null;
    other_activity_details: string | null;
};
export type Siif_interventionsCountAggregateOutputType = {
    siif_int_id: number;
    siif_sub_id: number;
    intervention_type: number;
    budget_estimate: number;
    has_aral: number;
    aral_subjects: number;
    other_activity_details: number;
    _all: number;
};
export type Siif_interventionsAvgAggregateInputType = {
    siif_int_id?: true;
    siif_sub_id?: true;
    budget_estimate?: true;
};
export type Siif_interventionsSumAggregateInputType = {
    siif_int_id?: true;
    siif_sub_id?: true;
    budget_estimate?: true;
};
export type Siif_interventionsMinAggregateInputType = {
    siif_int_id?: true;
    siif_sub_id?: true;
    intervention_type?: true;
    budget_estimate?: true;
    has_aral?: true;
    other_activity_details?: true;
};
export type Siif_interventionsMaxAggregateInputType = {
    siif_int_id?: true;
    siif_sub_id?: true;
    intervention_type?: true;
    budget_estimate?: true;
    has_aral?: true;
    other_activity_details?: true;
};
export type Siif_interventionsCountAggregateInputType = {
    siif_int_id?: true;
    siif_sub_id?: true;
    intervention_type?: true;
    budget_estimate?: true;
    has_aral?: true;
    aral_subjects?: true;
    other_activity_details?: true;
    _all?: true;
};
export type Siif_interventionsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_interventionsWhereInput;
    orderBy?: Prisma.siif_interventionsOrderByWithRelationInput | Prisma.siif_interventionsOrderByWithRelationInput[];
    cursor?: Prisma.siif_interventionsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Siif_interventionsCountAggregateInputType;
    _avg?: Siif_interventionsAvgAggregateInputType;
    _sum?: Siif_interventionsSumAggregateInputType;
    _min?: Siif_interventionsMinAggregateInputType;
    _max?: Siif_interventionsMaxAggregateInputType;
};
export type GetSiif_interventionsAggregateType<T extends Siif_interventionsAggregateArgs> = {
    [P in keyof T & keyof AggregateSiif_interventions]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSiif_interventions[P]> : Prisma.GetScalarType<T[P], AggregateSiif_interventions[P]>;
};
export type siif_interventionsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_interventionsWhereInput;
    orderBy?: Prisma.siif_interventionsOrderByWithAggregationInput | Prisma.siif_interventionsOrderByWithAggregationInput[];
    by: Prisma.Siif_interventionsScalarFieldEnum[] | Prisma.Siif_interventionsScalarFieldEnum;
    having?: Prisma.siif_interventionsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Siif_interventionsCountAggregateInputType | true;
    _avg?: Siif_interventionsAvgAggregateInputType;
    _sum?: Siif_interventionsSumAggregateInputType;
    _min?: Siif_interventionsMinAggregateInputType;
    _max?: Siif_interventionsMaxAggregateInputType;
};
export type Siif_interventionsGroupByOutputType = {
    siif_int_id: number;
    siif_sub_id: number | null;
    intervention_type: string | null;
    budget_estimate: runtime.Decimal | null;
    has_aral: boolean | null;
    aral_subjects: string[];
    other_activity_details: string | null;
    _count: Siif_interventionsCountAggregateOutputType | null;
    _avg: Siif_interventionsAvgAggregateOutputType | null;
    _sum: Siif_interventionsSumAggregateOutputType | null;
    _min: Siif_interventionsMinAggregateOutputType | null;
    _max: Siif_interventionsMaxAggregateOutputType | null;
};
export type GetSiif_interventionsGroupByPayload<T extends siif_interventionsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Siif_interventionsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Siif_interventionsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Siif_interventionsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Siif_interventionsGroupByOutputType[P]>;
}>>;
export type siif_interventionsWhereInput = {
    AND?: Prisma.siif_interventionsWhereInput | Prisma.siif_interventionsWhereInput[];
    OR?: Prisma.siif_interventionsWhereInput[];
    NOT?: Prisma.siif_interventionsWhereInput | Prisma.siif_interventionsWhereInput[];
    siif_int_id?: Prisma.IntFilter<"siif_interventions"> | number;
    siif_sub_id?: Prisma.IntNullableFilter<"siif_interventions"> | number | null;
    intervention_type?: Prisma.StringNullableFilter<"siif_interventions"> | string | null;
    budget_estimate?: Prisma.DecimalNullableFilter<"siif_interventions"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: Prisma.BoolNullableFilter<"siif_interventions"> | boolean | null;
    aral_subjects?: Prisma.StringNullableListFilter<"siif_interventions">;
    other_activity_details?: Prisma.StringNullableFilter<"siif_interventions"> | string | null;
    siif_activities?: Prisma.Siif_activitiesListRelationFilter;
    siif_submissions?: Prisma.XOR<Prisma.Siif_submissionsNullableScalarRelationFilter, Prisma.siif_submissionsWhereInput> | null;
    siif_utilization?: Prisma.Siif_utilizationListRelationFilter;
};
export type siif_interventionsOrderByWithRelationInput = {
    siif_int_id?: Prisma.SortOrder;
    siif_sub_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    intervention_type?: Prisma.SortOrderInput | Prisma.SortOrder;
    budget_estimate?: Prisma.SortOrderInput | Prisma.SortOrder;
    has_aral?: Prisma.SortOrderInput | Prisma.SortOrder;
    aral_subjects?: Prisma.SortOrder;
    other_activity_details?: Prisma.SortOrderInput | Prisma.SortOrder;
    siif_activities?: Prisma.siif_activitiesOrderByRelationAggregateInput;
    siif_submissions?: Prisma.siif_submissionsOrderByWithRelationInput;
    siif_utilization?: Prisma.siif_utilizationOrderByRelationAggregateInput;
};
export type siif_interventionsWhereUniqueInput = Prisma.AtLeast<{
    siif_int_id?: number;
    AND?: Prisma.siif_interventionsWhereInput | Prisma.siif_interventionsWhereInput[];
    OR?: Prisma.siif_interventionsWhereInput[];
    NOT?: Prisma.siif_interventionsWhereInput | Prisma.siif_interventionsWhereInput[];
    siif_sub_id?: Prisma.IntNullableFilter<"siif_interventions"> | number | null;
    intervention_type?: Prisma.StringNullableFilter<"siif_interventions"> | string | null;
    budget_estimate?: Prisma.DecimalNullableFilter<"siif_interventions"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: Prisma.BoolNullableFilter<"siif_interventions"> | boolean | null;
    aral_subjects?: Prisma.StringNullableListFilter<"siif_interventions">;
    other_activity_details?: Prisma.StringNullableFilter<"siif_interventions"> | string | null;
    siif_activities?: Prisma.Siif_activitiesListRelationFilter;
    siif_submissions?: Prisma.XOR<Prisma.Siif_submissionsNullableScalarRelationFilter, Prisma.siif_submissionsWhereInput> | null;
    siif_utilization?: Prisma.Siif_utilizationListRelationFilter;
}, "siif_int_id">;
export type siif_interventionsOrderByWithAggregationInput = {
    siif_int_id?: Prisma.SortOrder;
    siif_sub_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    intervention_type?: Prisma.SortOrderInput | Prisma.SortOrder;
    budget_estimate?: Prisma.SortOrderInput | Prisma.SortOrder;
    has_aral?: Prisma.SortOrderInput | Prisma.SortOrder;
    aral_subjects?: Prisma.SortOrder;
    other_activity_details?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.siif_interventionsCountOrderByAggregateInput;
    _avg?: Prisma.siif_interventionsAvgOrderByAggregateInput;
    _max?: Prisma.siif_interventionsMaxOrderByAggregateInput;
    _min?: Prisma.siif_interventionsMinOrderByAggregateInput;
    _sum?: Prisma.siif_interventionsSumOrderByAggregateInput;
};
export type siif_interventionsScalarWhereWithAggregatesInput = {
    AND?: Prisma.siif_interventionsScalarWhereWithAggregatesInput | Prisma.siif_interventionsScalarWhereWithAggregatesInput[];
    OR?: Prisma.siif_interventionsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.siif_interventionsScalarWhereWithAggregatesInput | Prisma.siif_interventionsScalarWhereWithAggregatesInput[];
    siif_int_id?: Prisma.IntWithAggregatesFilter<"siif_interventions"> | number;
    siif_sub_id?: Prisma.IntNullableWithAggregatesFilter<"siif_interventions"> | number | null;
    intervention_type?: Prisma.StringNullableWithAggregatesFilter<"siif_interventions"> | string | null;
    budget_estimate?: Prisma.DecimalNullableWithAggregatesFilter<"siif_interventions"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: Prisma.BoolNullableWithAggregatesFilter<"siif_interventions"> | boolean | null;
    aral_subjects?: Prisma.StringNullableListFilter<"siif_interventions">;
    other_activity_details?: Prisma.StringNullableWithAggregatesFilter<"siif_interventions"> | string | null;
};
export type siif_interventionsCreateInput = {
    intervention_type?: string | null;
    budget_estimate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: boolean | null;
    aral_subjects?: Prisma.siif_interventionsCreatearal_subjectsInput | string[];
    other_activity_details?: string | null;
    siif_activities?: Prisma.siif_activitiesCreateNestedManyWithoutSiif_interventionsInput;
    siif_submissions?: Prisma.siif_submissionsCreateNestedOneWithoutSiif_interventionsInput;
    siif_utilization?: Prisma.siif_utilizationCreateNestedManyWithoutSiif_interventionsInput;
};
export type siif_interventionsUncheckedCreateInput = {
    siif_int_id?: number;
    siif_sub_id?: number | null;
    intervention_type?: string | null;
    budget_estimate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: boolean | null;
    aral_subjects?: Prisma.siif_interventionsCreatearal_subjectsInput | string[];
    other_activity_details?: string | null;
    siif_activities?: Prisma.siif_activitiesUncheckedCreateNestedManyWithoutSiif_interventionsInput;
    siif_utilization?: Prisma.siif_utilizationUncheckedCreateNestedManyWithoutSiif_interventionsInput;
};
export type siif_interventionsUpdateInput = {
    intervention_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    budget_estimate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    aral_subjects?: Prisma.siif_interventionsUpdatearal_subjectsInput | string[];
    other_activity_details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    siif_activities?: Prisma.siif_activitiesUpdateManyWithoutSiif_interventionsNestedInput;
    siif_submissions?: Prisma.siif_submissionsUpdateOneWithoutSiif_interventionsNestedInput;
    siif_utilization?: Prisma.siif_utilizationUpdateManyWithoutSiif_interventionsNestedInput;
};
export type siif_interventionsUncheckedUpdateInput = {
    siif_int_id?: Prisma.IntFieldUpdateOperationsInput | number;
    siif_sub_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    intervention_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    budget_estimate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    aral_subjects?: Prisma.siif_interventionsUpdatearal_subjectsInput | string[];
    other_activity_details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    siif_activities?: Prisma.siif_activitiesUncheckedUpdateManyWithoutSiif_interventionsNestedInput;
    siif_utilization?: Prisma.siif_utilizationUncheckedUpdateManyWithoutSiif_interventionsNestedInput;
};
export type siif_interventionsCreateManyInput = {
    siif_int_id?: number;
    siif_sub_id?: number | null;
    intervention_type?: string | null;
    budget_estimate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: boolean | null;
    aral_subjects?: Prisma.siif_interventionsCreatearal_subjectsInput | string[];
    other_activity_details?: string | null;
};
export type siif_interventionsUpdateManyMutationInput = {
    intervention_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    budget_estimate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    aral_subjects?: Prisma.siif_interventionsUpdatearal_subjectsInput | string[];
    other_activity_details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type siif_interventionsUncheckedUpdateManyInput = {
    siif_int_id?: Prisma.IntFieldUpdateOperationsInput | number;
    siif_sub_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    intervention_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    budget_estimate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    aral_subjects?: Prisma.siif_interventionsUpdatearal_subjectsInput | string[];
    other_activity_details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type Siif_interventionsNullableScalarRelationFilter = {
    is?: Prisma.siif_interventionsWhereInput | null;
    isNot?: Prisma.siif_interventionsWhereInput | null;
};
export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type siif_interventionsCountOrderByAggregateInput = {
    siif_int_id?: Prisma.SortOrder;
    siif_sub_id?: Prisma.SortOrder;
    intervention_type?: Prisma.SortOrder;
    budget_estimate?: Prisma.SortOrder;
    has_aral?: Prisma.SortOrder;
    aral_subjects?: Prisma.SortOrder;
    other_activity_details?: Prisma.SortOrder;
};
export type siif_interventionsAvgOrderByAggregateInput = {
    siif_int_id?: Prisma.SortOrder;
    siif_sub_id?: Prisma.SortOrder;
    budget_estimate?: Prisma.SortOrder;
};
export type siif_interventionsMaxOrderByAggregateInput = {
    siif_int_id?: Prisma.SortOrder;
    siif_sub_id?: Prisma.SortOrder;
    intervention_type?: Prisma.SortOrder;
    budget_estimate?: Prisma.SortOrder;
    has_aral?: Prisma.SortOrder;
    other_activity_details?: Prisma.SortOrder;
};
export type siif_interventionsMinOrderByAggregateInput = {
    siif_int_id?: Prisma.SortOrder;
    siif_sub_id?: Prisma.SortOrder;
    intervention_type?: Prisma.SortOrder;
    budget_estimate?: Prisma.SortOrder;
    has_aral?: Prisma.SortOrder;
    other_activity_details?: Prisma.SortOrder;
};
export type siif_interventionsSumOrderByAggregateInput = {
    siif_int_id?: Prisma.SortOrder;
    siif_sub_id?: Prisma.SortOrder;
    budget_estimate?: Prisma.SortOrder;
};
export type Siif_interventionsListRelationFilter = {
    every?: Prisma.siif_interventionsWhereInput;
    some?: Prisma.siif_interventionsWhereInput;
    none?: Prisma.siif_interventionsWhereInput;
};
export type siif_interventionsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type siif_interventionsCreateNestedOneWithoutSiif_activitiesInput = {
    create?: Prisma.XOR<Prisma.siif_interventionsCreateWithoutSiif_activitiesInput, Prisma.siif_interventionsUncheckedCreateWithoutSiif_activitiesInput>;
    connectOrCreate?: Prisma.siif_interventionsCreateOrConnectWithoutSiif_activitiesInput;
    connect?: Prisma.siif_interventionsWhereUniqueInput;
};
export type siif_interventionsUpdateOneWithoutSiif_activitiesNestedInput = {
    create?: Prisma.XOR<Prisma.siif_interventionsCreateWithoutSiif_activitiesInput, Prisma.siif_interventionsUncheckedCreateWithoutSiif_activitiesInput>;
    connectOrCreate?: Prisma.siif_interventionsCreateOrConnectWithoutSiif_activitiesInput;
    upsert?: Prisma.siif_interventionsUpsertWithoutSiif_activitiesInput;
    disconnect?: Prisma.siif_interventionsWhereInput | boolean;
    delete?: Prisma.siif_interventionsWhereInput | boolean;
    connect?: Prisma.siif_interventionsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.siif_interventionsUpdateToOneWithWhereWithoutSiif_activitiesInput, Prisma.siif_interventionsUpdateWithoutSiif_activitiesInput>, Prisma.siif_interventionsUncheckedUpdateWithoutSiif_activitiesInput>;
};
export type siif_interventionsCreatearal_subjectsInput = {
    set: string[];
};
export type siif_interventionsUpdatearal_subjectsInput = {
    set?: string[];
    push?: string | string[];
};
export type siif_interventionsCreateNestedManyWithoutSiif_submissionsInput = {
    create?: Prisma.XOR<Prisma.siif_interventionsCreateWithoutSiif_submissionsInput, Prisma.siif_interventionsUncheckedCreateWithoutSiif_submissionsInput> | Prisma.siif_interventionsCreateWithoutSiif_submissionsInput[] | Prisma.siif_interventionsUncheckedCreateWithoutSiif_submissionsInput[];
    connectOrCreate?: Prisma.siif_interventionsCreateOrConnectWithoutSiif_submissionsInput | Prisma.siif_interventionsCreateOrConnectWithoutSiif_submissionsInput[];
    createMany?: Prisma.siif_interventionsCreateManySiif_submissionsInputEnvelope;
    connect?: Prisma.siif_interventionsWhereUniqueInput | Prisma.siif_interventionsWhereUniqueInput[];
};
export type siif_interventionsUncheckedCreateNestedManyWithoutSiif_submissionsInput = {
    create?: Prisma.XOR<Prisma.siif_interventionsCreateWithoutSiif_submissionsInput, Prisma.siif_interventionsUncheckedCreateWithoutSiif_submissionsInput> | Prisma.siif_interventionsCreateWithoutSiif_submissionsInput[] | Prisma.siif_interventionsUncheckedCreateWithoutSiif_submissionsInput[];
    connectOrCreate?: Prisma.siif_interventionsCreateOrConnectWithoutSiif_submissionsInput | Prisma.siif_interventionsCreateOrConnectWithoutSiif_submissionsInput[];
    createMany?: Prisma.siif_interventionsCreateManySiif_submissionsInputEnvelope;
    connect?: Prisma.siif_interventionsWhereUniqueInput | Prisma.siif_interventionsWhereUniqueInput[];
};
export type siif_interventionsUpdateManyWithoutSiif_submissionsNestedInput = {
    create?: Prisma.XOR<Prisma.siif_interventionsCreateWithoutSiif_submissionsInput, Prisma.siif_interventionsUncheckedCreateWithoutSiif_submissionsInput> | Prisma.siif_interventionsCreateWithoutSiif_submissionsInput[] | Prisma.siif_interventionsUncheckedCreateWithoutSiif_submissionsInput[];
    connectOrCreate?: Prisma.siif_interventionsCreateOrConnectWithoutSiif_submissionsInput | Prisma.siif_interventionsCreateOrConnectWithoutSiif_submissionsInput[];
    upsert?: Prisma.siif_interventionsUpsertWithWhereUniqueWithoutSiif_submissionsInput | Prisma.siif_interventionsUpsertWithWhereUniqueWithoutSiif_submissionsInput[];
    createMany?: Prisma.siif_interventionsCreateManySiif_submissionsInputEnvelope;
    set?: Prisma.siif_interventionsWhereUniqueInput | Prisma.siif_interventionsWhereUniqueInput[];
    disconnect?: Prisma.siif_interventionsWhereUniqueInput | Prisma.siif_interventionsWhereUniqueInput[];
    delete?: Prisma.siif_interventionsWhereUniqueInput | Prisma.siif_interventionsWhereUniqueInput[];
    connect?: Prisma.siif_interventionsWhereUniqueInput | Prisma.siif_interventionsWhereUniqueInput[];
    update?: Prisma.siif_interventionsUpdateWithWhereUniqueWithoutSiif_submissionsInput | Prisma.siif_interventionsUpdateWithWhereUniqueWithoutSiif_submissionsInput[];
    updateMany?: Prisma.siif_interventionsUpdateManyWithWhereWithoutSiif_submissionsInput | Prisma.siif_interventionsUpdateManyWithWhereWithoutSiif_submissionsInput[];
    deleteMany?: Prisma.siif_interventionsScalarWhereInput | Prisma.siif_interventionsScalarWhereInput[];
};
export type siif_interventionsUncheckedUpdateManyWithoutSiif_submissionsNestedInput = {
    create?: Prisma.XOR<Prisma.siif_interventionsCreateWithoutSiif_submissionsInput, Prisma.siif_interventionsUncheckedCreateWithoutSiif_submissionsInput> | Prisma.siif_interventionsCreateWithoutSiif_submissionsInput[] | Prisma.siif_interventionsUncheckedCreateWithoutSiif_submissionsInput[];
    connectOrCreate?: Prisma.siif_interventionsCreateOrConnectWithoutSiif_submissionsInput | Prisma.siif_interventionsCreateOrConnectWithoutSiif_submissionsInput[];
    upsert?: Prisma.siif_interventionsUpsertWithWhereUniqueWithoutSiif_submissionsInput | Prisma.siif_interventionsUpsertWithWhereUniqueWithoutSiif_submissionsInput[];
    createMany?: Prisma.siif_interventionsCreateManySiif_submissionsInputEnvelope;
    set?: Prisma.siif_interventionsWhereUniqueInput | Prisma.siif_interventionsWhereUniqueInput[];
    disconnect?: Prisma.siif_interventionsWhereUniqueInput | Prisma.siif_interventionsWhereUniqueInput[];
    delete?: Prisma.siif_interventionsWhereUniqueInput | Prisma.siif_interventionsWhereUniqueInput[];
    connect?: Prisma.siif_interventionsWhereUniqueInput | Prisma.siif_interventionsWhereUniqueInput[];
    update?: Prisma.siif_interventionsUpdateWithWhereUniqueWithoutSiif_submissionsInput | Prisma.siif_interventionsUpdateWithWhereUniqueWithoutSiif_submissionsInput[];
    updateMany?: Prisma.siif_interventionsUpdateManyWithWhereWithoutSiif_submissionsInput | Prisma.siif_interventionsUpdateManyWithWhereWithoutSiif_submissionsInput[];
    deleteMany?: Prisma.siif_interventionsScalarWhereInput | Prisma.siif_interventionsScalarWhereInput[];
};
export type siif_interventionsCreateNestedOneWithoutSiif_utilizationInput = {
    create?: Prisma.XOR<Prisma.siif_interventionsCreateWithoutSiif_utilizationInput, Prisma.siif_interventionsUncheckedCreateWithoutSiif_utilizationInput>;
    connectOrCreate?: Prisma.siif_interventionsCreateOrConnectWithoutSiif_utilizationInput;
    connect?: Prisma.siif_interventionsWhereUniqueInput;
};
export type siif_interventionsUpdateOneWithoutSiif_utilizationNestedInput = {
    create?: Prisma.XOR<Prisma.siif_interventionsCreateWithoutSiif_utilizationInput, Prisma.siif_interventionsUncheckedCreateWithoutSiif_utilizationInput>;
    connectOrCreate?: Prisma.siif_interventionsCreateOrConnectWithoutSiif_utilizationInput;
    upsert?: Prisma.siif_interventionsUpsertWithoutSiif_utilizationInput;
    disconnect?: Prisma.siif_interventionsWhereInput | boolean;
    delete?: Prisma.siif_interventionsWhereInput | boolean;
    connect?: Prisma.siif_interventionsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.siif_interventionsUpdateToOneWithWhereWithoutSiif_utilizationInput, Prisma.siif_interventionsUpdateWithoutSiif_utilizationInput>, Prisma.siif_interventionsUncheckedUpdateWithoutSiif_utilizationInput>;
};
export type siif_interventionsCreateWithoutSiif_activitiesInput = {
    intervention_type?: string | null;
    budget_estimate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: boolean | null;
    aral_subjects?: Prisma.siif_interventionsCreatearal_subjectsInput | string[];
    other_activity_details?: string | null;
    siif_submissions?: Prisma.siif_submissionsCreateNestedOneWithoutSiif_interventionsInput;
    siif_utilization?: Prisma.siif_utilizationCreateNestedManyWithoutSiif_interventionsInput;
};
export type siif_interventionsUncheckedCreateWithoutSiif_activitiesInput = {
    siif_int_id?: number;
    siif_sub_id?: number | null;
    intervention_type?: string | null;
    budget_estimate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: boolean | null;
    aral_subjects?: Prisma.siif_interventionsCreatearal_subjectsInput | string[];
    other_activity_details?: string | null;
    siif_utilization?: Prisma.siif_utilizationUncheckedCreateNestedManyWithoutSiif_interventionsInput;
};
export type siif_interventionsCreateOrConnectWithoutSiif_activitiesInput = {
    where: Prisma.siif_interventionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.siif_interventionsCreateWithoutSiif_activitiesInput, Prisma.siif_interventionsUncheckedCreateWithoutSiif_activitiesInput>;
};
export type siif_interventionsUpsertWithoutSiif_activitiesInput = {
    update: Prisma.XOR<Prisma.siif_interventionsUpdateWithoutSiif_activitiesInput, Prisma.siif_interventionsUncheckedUpdateWithoutSiif_activitiesInput>;
    create: Prisma.XOR<Prisma.siif_interventionsCreateWithoutSiif_activitiesInput, Prisma.siif_interventionsUncheckedCreateWithoutSiif_activitiesInput>;
    where?: Prisma.siif_interventionsWhereInput;
};
export type siif_interventionsUpdateToOneWithWhereWithoutSiif_activitiesInput = {
    where?: Prisma.siif_interventionsWhereInput;
    data: Prisma.XOR<Prisma.siif_interventionsUpdateWithoutSiif_activitiesInput, Prisma.siif_interventionsUncheckedUpdateWithoutSiif_activitiesInput>;
};
export type siif_interventionsUpdateWithoutSiif_activitiesInput = {
    intervention_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    budget_estimate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    aral_subjects?: Prisma.siif_interventionsUpdatearal_subjectsInput | string[];
    other_activity_details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    siif_submissions?: Prisma.siif_submissionsUpdateOneWithoutSiif_interventionsNestedInput;
    siif_utilization?: Prisma.siif_utilizationUpdateManyWithoutSiif_interventionsNestedInput;
};
export type siif_interventionsUncheckedUpdateWithoutSiif_activitiesInput = {
    siif_int_id?: Prisma.IntFieldUpdateOperationsInput | number;
    siif_sub_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    intervention_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    budget_estimate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    aral_subjects?: Prisma.siif_interventionsUpdatearal_subjectsInput | string[];
    other_activity_details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    siif_utilization?: Prisma.siif_utilizationUncheckedUpdateManyWithoutSiif_interventionsNestedInput;
};
export type siif_interventionsCreateWithoutSiif_submissionsInput = {
    intervention_type?: string | null;
    budget_estimate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: boolean | null;
    aral_subjects?: Prisma.siif_interventionsCreatearal_subjectsInput | string[];
    other_activity_details?: string | null;
    siif_activities?: Prisma.siif_activitiesCreateNestedManyWithoutSiif_interventionsInput;
    siif_utilization?: Prisma.siif_utilizationCreateNestedManyWithoutSiif_interventionsInput;
};
export type siif_interventionsUncheckedCreateWithoutSiif_submissionsInput = {
    siif_int_id?: number;
    intervention_type?: string | null;
    budget_estimate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: boolean | null;
    aral_subjects?: Prisma.siif_interventionsCreatearal_subjectsInput | string[];
    other_activity_details?: string | null;
    siif_activities?: Prisma.siif_activitiesUncheckedCreateNestedManyWithoutSiif_interventionsInput;
    siif_utilization?: Prisma.siif_utilizationUncheckedCreateNestedManyWithoutSiif_interventionsInput;
};
export type siif_interventionsCreateOrConnectWithoutSiif_submissionsInput = {
    where: Prisma.siif_interventionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.siif_interventionsCreateWithoutSiif_submissionsInput, Prisma.siif_interventionsUncheckedCreateWithoutSiif_submissionsInput>;
};
export type siif_interventionsCreateManySiif_submissionsInputEnvelope = {
    data: Prisma.siif_interventionsCreateManySiif_submissionsInput | Prisma.siif_interventionsCreateManySiif_submissionsInput[];
    skipDuplicates?: boolean;
};
export type siif_interventionsUpsertWithWhereUniqueWithoutSiif_submissionsInput = {
    where: Prisma.siif_interventionsWhereUniqueInput;
    update: Prisma.XOR<Prisma.siif_interventionsUpdateWithoutSiif_submissionsInput, Prisma.siif_interventionsUncheckedUpdateWithoutSiif_submissionsInput>;
    create: Prisma.XOR<Prisma.siif_interventionsCreateWithoutSiif_submissionsInput, Prisma.siif_interventionsUncheckedCreateWithoutSiif_submissionsInput>;
};
export type siif_interventionsUpdateWithWhereUniqueWithoutSiif_submissionsInput = {
    where: Prisma.siif_interventionsWhereUniqueInput;
    data: Prisma.XOR<Prisma.siif_interventionsUpdateWithoutSiif_submissionsInput, Prisma.siif_interventionsUncheckedUpdateWithoutSiif_submissionsInput>;
};
export type siif_interventionsUpdateManyWithWhereWithoutSiif_submissionsInput = {
    where: Prisma.siif_interventionsScalarWhereInput;
    data: Prisma.XOR<Prisma.siif_interventionsUpdateManyMutationInput, Prisma.siif_interventionsUncheckedUpdateManyWithoutSiif_submissionsInput>;
};
export type siif_interventionsScalarWhereInput = {
    AND?: Prisma.siif_interventionsScalarWhereInput | Prisma.siif_interventionsScalarWhereInput[];
    OR?: Prisma.siif_interventionsScalarWhereInput[];
    NOT?: Prisma.siif_interventionsScalarWhereInput | Prisma.siif_interventionsScalarWhereInput[];
    siif_int_id?: Prisma.IntFilter<"siif_interventions"> | number;
    siif_sub_id?: Prisma.IntNullableFilter<"siif_interventions"> | number | null;
    intervention_type?: Prisma.StringNullableFilter<"siif_interventions"> | string | null;
    budget_estimate?: Prisma.DecimalNullableFilter<"siif_interventions"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: Prisma.BoolNullableFilter<"siif_interventions"> | boolean | null;
    aral_subjects?: Prisma.StringNullableListFilter<"siif_interventions">;
    other_activity_details?: Prisma.StringNullableFilter<"siif_interventions"> | string | null;
};
export type siif_interventionsCreateWithoutSiif_utilizationInput = {
    intervention_type?: string | null;
    budget_estimate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: boolean | null;
    aral_subjects?: Prisma.siif_interventionsCreatearal_subjectsInput | string[];
    other_activity_details?: string | null;
    siif_activities?: Prisma.siif_activitiesCreateNestedManyWithoutSiif_interventionsInput;
    siif_submissions?: Prisma.siif_submissionsCreateNestedOneWithoutSiif_interventionsInput;
};
export type siif_interventionsUncheckedCreateWithoutSiif_utilizationInput = {
    siif_int_id?: number;
    siif_sub_id?: number | null;
    intervention_type?: string | null;
    budget_estimate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: boolean | null;
    aral_subjects?: Prisma.siif_interventionsCreatearal_subjectsInput | string[];
    other_activity_details?: string | null;
    siif_activities?: Prisma.siif_activitiesUncheckedCreateNestedManyWithoutSiif_interventionsInput;
};
export type siif_interventionsCreateOrConnectWithoutSiif_utilizationInput = {
    where: Prisma.siif_interventionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.siif_interventionsCreateWithoutSiif_utilizationInput, Prisma.siif_interventionsUncheckedCreateWithoutSiif_utilizationInput>;
};
export type siif_interventionsUpsertWithoutSiif_utilizationInput = {
    update: Prisma.XOR<Prisma.siif_interventionsUpdateWithoutSiif_utilizationInput, Prisma.siif_interventionsUncheckedUpdateWithoutSiif_utilizationInput>;
    create: Prisma.XOR<Prisma.siif_interventionsCreateWithoutSiif_utilizationInput, Prisma.siif_interventionsUncheckedCreateWithoutSiif_utilizationInput>;
    where?: Prisma.siif_interventionsWhereInput;
};
export type siif_interventionsUpdateToOneWithWhereWithoutSiif_utilizationInput = {
    where?: Prisma.siif_interventionsWhereInput;
    data: Prisma.XOR<Prisma.siif_interventionsUpdateWithoutSiif_utilizationInput, Prisma.siif_interventionsUncheckedUpdateWithoutSiif_utilizationInput>;
};
export type siif_interventionsUpdateWithoutSiif_utilizationInput = {
    intervention_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    budget_estimate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    aral_subjects?: Prisma.siif_interventionsUpdatearal_subjectsInput | string[];
    other_activity_details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    siif_activities?: Prisma.siif_activitiesUpdateManyWithoutSiif_interventionsNestedInput;
    siif_submissions?: Prisma.siif_submissionsUpdateOneWithoutSiif_interventionsNestedInput;
};
export type siif_interventionsUncheckedUpdateWithoutSiif_utilizationInput = {
    siif_int_id?: Prisma.IntFieldUpdateOperationsInput | number;
    siif_sub_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    intervention_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    budget_estimate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    aral_subjects?: Prisma.siif_interventionsUpdatearal_subjectsInput | string[];
    other_activity_details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    siif_activities?: Prisma.siif_activitiesUncheckedUpdateManyWithoutSiif_interventionsNestedInput;
};
export type siif_interventionsCreateManySiif_submissionsInput = {
    siif_int_id?: number;
    intervention_type?: string | null;
    budget_estimate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: boolean | null;
    aral_subjects?: Prisma.siif_interventionsCreatearal_subjectsInput | string[];
    other_activity_details?: string | null;
};
export type siif_interventionsUpdateWithoutSiif_submissionsInput = {
    intervention_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    budget_estimate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    aral_subjects?: Prisma.siif_interventionsUpdatearal_subjectsInput | string[];
    other_activity_details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    siif_activities?: Prisma.siif_activitiesUpdateManyWithoutSiif_interventionsNestedInput;
    siif_utilization?: Prisma.siif_utilizationUpdateManyWithoutSiif_interventionsNestedInput;
};
export type siif_interventionsUncheckedUpdateWithoutSiif_submissionsInput = {
    siif_int_id?: Prisma.IntFieldUpdateOperationsInput | number;
    intervention_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    budget_estimate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    aral_subjects?: Prisma.siif_interventionsUpdatearal_subjectsInput | string[];
    other_activity_details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    siif_activities?: Prisma.siif_activitiesUncheckedUpdateManyWithoutSiif_interventionsNestedInput;
    siif_utilization?: Prisma.siif_utilizationUncheckedUpdateManyWithoutSiif_interventionsNestedInput;
};
export type siif_interventionsUncheckedUpdateManyWithoutSiif_submissionsInput = {
    siif_int_id?: Prisma.IntFieldUpdateOperationsInput | number;
    intervention_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    budget_estimate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    has_aral?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    aral_subjects?: Prisma.siif_interventionsUpdatearal_subjectsInput | string[];
    other_activity_details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type Siif_interventionsCountOutputType = {
    siif_activities: number;
    siif_utilization: number;
};
export type Siif_interventionsCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    siif_activities?: boolean | Siif_interventionsCountOutputTypeCountSiif_activitiesArgs;
    siif_utilization?: boolean | Siif_interventionsCountOutputTypeCountSiif_utilizationArgs;
};
export type Siif_interventionsCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.Siif_interventionsCountOutputTypeSelect<ExtArgs> | null;
};
export type Siif_interventionsCountOutputTypeCountSiif_activitiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_activitiesWhereInput;
};
export type Siif_interventionsCountOutputTypeCountSiif_utilizationArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_utilizationWhereInput;
};
export type siif_interventionsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    siif_int_id?: boolean;
    siif_sub_id?: boolean;
    intervention_type?: boolean;
    budget_estimate?: boolean;
    has_aral?: boolean;
    aral_subjects?: boolean;
    other_activity_details?: boolean;
    siif_activities?: boolean | Prisma.siif_interventions$siif_activitiesArgs<ExtArgs>;
    siif_submissions?: boolean | Prisma.siif_interventions$siif_submissionsArgs<ExtArgs>;
    siif_utilization?: boolean | Prisma.siif_interventions$siif_utilizationArgs<ExtArgs>;
    _count?: boolean | Prisma.Siif_interventionsCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["siif_interventions"]>;
export type siif_interventionsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    siif_int_id?: boolean;
    siif_sub_id?: boolean;
    intervention_type?: boolean;
    budget_estimate?: boolean;
    has_aral?: boolean;
    aral_subjects?: boolean;
    other_activity_details?: boolean;
    siif_submissions?: boolean | Prisma.siif_interventions$siif_submissionsArgs<ExtArgs>;
}, ExtArgs["result"]["siif_interventions"]>;
export type siif_interventionsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    siif_int_id?: boolean;
    siif_sub_id?: boolean;
    intervention_type?: boolean;
    budget_estimate?: boolean;
    has_aral?: boolean;
    aral_subjects?: boolean;
    other_activity_details?: boolean;
    siif_submissions?: boolean | Prisma.siif_interventions$siif_submissionsArgs<ExtArgs>;
}, ExtArgs["result"]["siif_interventions"]>;
export type siif_interventionsSelectScalar = {
    siif_int_id?: boolean;
    siif_sub_id?: boolean;
    intervention_type?: boolean;
    budget_estimate?: boolean;
    has_aral?: boolean;
    aral_subjects?: boolean;
    other_activity_details?: boolean;
};
export type siif_interventionsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"siif_int_id" | "siif_sub_id" | "intervention_type" | "budget_estimate" | "has_aral" | "aral_subjects" | "other_activity_details", ExtArgs["result"]["siif_interventions"]>;
export type siif_interventionsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    siif_activities?: boolean | Prisma.siif_interventions$siif_activitiesArgs<ExtArgs>;
    siif_submissions?: boolean | Prisma.siif_interventions$siif_submissionsArgs<ExtArgs>;
    siif_utilization?: boolean | Prisma.siif_interventions$siif_utilizationArgs<ExtArgs>;
    _count?: boolean | Prisma.Siif_interventionsCountOutputTypeDefaultArgs<ExtArgs>;
};
export type siif_interventionsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    siif_submissions?: boolean | Prisma.siif_interventions$siif_submissionsArgs<ExtArgs>;
};
export type siif_interventionsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    siif_submissions?: boolean | Prisma.siif_interventions$siif_submissionsArgs<ExtArgs>;
};
export type $siif_interventionsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "siif_interventions";
    objects: {
        siif_activities: Prisma.$siif_activitiesPayload<ExtArgs>[];
        siif_submissions: Prisma.$siif_submissionsPayload<ExtArgs> | null;
        siif_utilization: Prisma.$siif_utilizationPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        siif_int_id: number;
        siif_sub_id: number | null;
        intervention_type: string | null;
        budget_estimate: runtime.Decimal | null;
        has_aral: boolean | null;
        aral_subjects: string[];
        other_activity_details: string | null;
    }, ExtArgs["result"]["siif_interventions"]>;
    composites: {};
};
export type siif_interventionsGetPayload<S extends boolean | null | undefined | siif_interventionsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$siif_interventionsPayload, S>;
export type siif_interventionsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<siif_interventionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Siif_interventionsCountAggregateInputType | true;
};
export interface siif_interventionsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['siif_interventions'];
        meta: {
            name: 'siif_interventions';
        };
    };
    findUnique<T extends siif_interventionsFindUniqueArgs>(args: Prisma.SelectSubset<T, siif_interventionsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__siif_interventionsClient<runtime.Types.Result.GetResult<Prisma.$siif_interventionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends siif_interventionsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, siif_interventionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__siif_interventionsClient<runtime.Types.Result.GetResult<Prisma.$siif_interventionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends siif_interventionsFindFirstArgs>(args?: Prisma.SelectSubset<T, siif_interventionsFindFirstArgs<ExtArgs>>): Prisma.Prisma__siif_interventionsClient<runtime.Types.Result.GetResult<Prisma.$siif_interventionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends siif_interventionsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, siif_interventionsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__siif_interventionsClient<runtime.Types.Result.GetResult<Prisma.$siif_interventionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends siif_interventionsFindManyArgs>(args?: Prisma.SelectSubset<T, siif_interventionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_interventionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends siif_interventionsCreateArgs>(args: Prisma.SelectSubset<T, siif_interventionsCreateArgs<ExtArgs>>): Prisma.Prisma__siif_interventionsClient<runtime.Types.Result.GetResult<Prisma.$siif_interventionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends siif_interventionsCreateManyArgs>(args?: Prisma.SelectSubset<T, siif_interventionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends siif_interventionsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, siif_interventionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_interventionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends siif_interventionsDeleteArgs>(args: Prisma.SelectSubset<T, siif_interventionsDeleteArgs<ExtArgs>>): Prisma.Prisma__siif_interventionsClient<runtime.Types.Result.GetResult<Prisma.$siif_interventionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends siif_interventionsUpdateArgs>(args: Prisma.SelectSubset<T, siif_interventionsUpdateArgs<ExtArgs>>): Prisma.Prisma__siif_interventionsClient<runtime.Types.Result.GetResult<Prisma.$siif_interventionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends siif_interventionsDeleteManyArgs>(args?: Prisma.SelectSubset<T, siif_interventionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends siif_interventionsUpdateManyArgs>(args: Prisma.SelectSubset<T, siif_interventionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends siif_interventionsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, siif_interventionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_interventionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends siif_interventionsUpsertArgs>(args: Prisma.SelectSubset<T, siif_interventionsUpsertArgs<ExtArgs>>): Prisma.Prisma__siif_interventionsClient<runtime.Types.Result.GetResult<Prisma.$siif_interventionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends siif_interventionsCountArgs>(args?: Prisma.Subset<T, siif_interventionsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Siif_interventionsCountAggregateOutputType> : number>;
    aggregate<T extends Siif_interventionsAggregateArgs>(args: Prisma.Subset<T, Siif_interventionsAggregateArgs>): Prisma.PrismaPromise<GetSiif_interventionsAggregateType<T>>;
    groupBy<T extends siif_interventionsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: siif_interventionsGroupByArgs['orderBy'];
    } : {
        orderBy?: siif_interventionsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, siif_interventionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiif_interventionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: siif_interventionsFieldRefs;
}
export interface Prisma__siif_interventionsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    siif_activities<T extends Prisma.siif_interventions$siif_activitiesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.siif_interventions$siif_activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_activitiesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    siif_submissions<T extends Prisma.siif_interventions$siif_submissionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.siif_interventions$siif_submissionsArgs<ExtArgs>>): Prisma.Prisma__siif_submissionsClient<runtime.Types.Result.GetResult<Prisma.$siif_submissionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    siif_utilization<T extends Prisma.siif_interventions$siif_utilizationArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.siif_interventions$siif_utilizationArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_utilizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface siif_interventionsFieldRefs {
    readonly siif_int_id: Prisma.FieldRef<"siif_interventions", 'Int'>;
    readonly siif_sub_id: Prisma.FieldRef<"siif_interventions", 'Int'>;
    readonly intervention_type: Prisma.FieldRef<"siif_interventions", 'String'>;
    readonly budget_estimate: Prisma.FieldRef<"siif_interventions", 'Decimal'>;
    readonly has_aral: Prisma.FieldRef<"siif_interventions", 'Boolean'>;
    readonly aral_subjects: Prisma.FieldRef<"siif_interventions", 'String[]'>;
    readonly other_activity_details: Prisma.FieldRef<"siif_interventions", 'String'>;
}
export type siif_interventionsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_interventionsSelect<ExtArgs> | null;
    omit?: Prisma.siif_interventionsOmit<ExtArgs> | null;
    include?: Prisma.siif_interventionsInclude<ExtArgs> | null;
    where: Prisma.siif_interventionsWhereUniqueInput;
};
export type siif_interventionsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_interventionsSelect<ExtArgs> | null;
    omit?: Prisma.siif_interventionsOmit<ExtArgs> | null;
    include?: Prisma.siif_interventionsInclude<ExtArgs> | null;
    where: Prisma.siif_interventionsWhereUniqueInput;
};
export type siif_interventionsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type siif_interventionsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type siif_interventionsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type siif_interventionsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_interventionsSelect<ExtArgs> | null;
    omit?: Prisma.siif_interventionsOmit<ExtArgs> | null;
    include?: Prisma.siif_interventionsInclude<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.siif_interventionsCreateInput, Prisma.siif_interventionsUncheckedCreateInput>;
};
export type siif_interventionsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.siif_interventionsCreateManyInput | Prisma.siif_interventionsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type siif_interventionsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_interventionsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.siif_interventionsOmit<ExtArgs> | null;
    data: Prisma.siif_interventionsCreateManyInput | Prisma.siif_interventionsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.siif_interventionsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type siif_interventionsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_interventionsSelect<ExtArgs> | null;
    omit?: Prisma.siif_interventionsOmit<ExtArgs> | null;
    include?: Prisma.siif_interventionsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.siif_interventionsUpdateInput, Prisma.siif_interventionsUncheckedUpdateInput>;
    where: Prisma.siif_interventionsWhereUniqueInput;
};
export type siif_interventionsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.siif_interventionsUpdateManyMutationInput, Prisma.siif_interventionsUncheckedUpdateManyInput>;
    where?: Prisma.siif_interventionsWhereInput;
    limit?: number;
};
export type siif_interventionsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_interventionsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.siif_interventionsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.siif_interventionsUpdateManyMutationInput, Prisma.siif_interventionsUncheckedUpdateManyInput>;
    where?: Prisma.siif_interventionsWhereInput;
    limit?: number;
    include?: Prisma.siif_interventionsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type siif_interventionsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_interventionsSelect<ExtArgs> | null;
    omit?: Prisma.siif_interventionsOmit<ExtArgs> | null;
    include?: Prisma.siif_interventionsInclude<ExtArgs> | null;
    where: Prisma.siif_interventionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.siif_interventionsCreateInput, Prisma.siif_interventionsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.siif_interventionsUpdateInput, Prisma.siif_interventionsUncheckedUpdateInput>;
};
export type siif_interventionsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_interventionsSelect<ExtArgs> | null;
    omit?: Prisma.siif_interventionsOmit<ExtArgs> | null;
    include?: Prisma.siif_interventionsInclude<ExtArgs> | null;
    where: Prisma.siif_interventionsWhereUniqueInput;
};
export type siif_interventionsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_interventionsWhereInput;
    limit?: number;
};
export type siif_interventions$siif_activitiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_activitiesSelect<ExtArgs> | null;
    omit?: Prisma.siif_activitiesOmit<ExtArgs> | null;
    include?: Prisma.siif_activitiesInclude<ExtArgs> | null;
    where?: Prisma.siif_activitiesWhereInput;
    orderBy?: Prisma.siif_activitiesOrderByWithRelationInput | Prisma.siif_activitiesOrderByWithRelationInput[];
    cursor?: Prisma.siif_activitiesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Siif_activitiesScalarFieldEnum | Prisma.Siif_activitiesScalarFieldEnum[];
};
export type siif_interventions$siif_submissionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_submissionsSelect<ExtArgs> | null;
    omit?: Prisma.siif_submissionsOmit<ExtArgs> | null;
    include?: Prisma.siif_submissionsInclude<ExtArgs> | null;
    where?: Prisma.siif_submissionsWhereInput;
};
export type siif_interventions$siif_utilizationArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_utilizationSelect<ExtArgs> | null;
    omit?: Prisma.siif_utilizationOmit<ExtArgs> | null;
    include?: Prisma.siif_utilizationInclude<ExtArgs> | null;
    where?: Prisma.siif_utilizationWhereInput;
    orderBy?: Prisma.siif_utilizationOrderByWithRelationInput | Prisma.siif_utilizationOrderByWithRelationInput[];
    cursor?: Prisma.siif_utilizationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Siif_utilizationScalarFieldEnum | Prisma.Siif_utilizationScalarFieldEnum[];
};
export type siif_interventionsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_interventionsSelect<ExtArgs> | null;
    omit?: Prisma.siif_interventionsOmit<ExtArgs> | null;
    include?: Prisma.siif_interventionsInclude<ExtArgs> | null;
};
