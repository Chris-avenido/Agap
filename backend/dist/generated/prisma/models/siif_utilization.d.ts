import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type siif_utilizationModel = runtime.Types.Result.DefaultSelection<Prisma.$siif_utilizationPayload>;
export type AggregateSiif_utilization = {
    _count: Siif_utilizationCountAggregateOutputType | null;
    _avg: Siif_utilizationAvgAggregateOutputType | null;
    _sum: Siif_utilizationSumAggregateOutputType | null;
    _min: Siif_utilizationMinAggregateOutputType | null;
    _max: Siif_utilizationMaxAggregateOutputType | null;
};
export type Siif_utilizationAvgAggregateOutputType = {
    siif_util_id: number | null;
    siif_int_id: number | null;
    utilized_amount: runtime.Decimal | null;
};
export type Siif_utilizationSumAggregateOutputType = {
    siif_util_id: number | null;
    siif_int_id: number | null;
    utilized_amount: runtime.Decimal | null;
};
export type Siif_utilizationMinAggregateOutputType = {
    siif_util_id: number | null;
    siif_int_id: number | null;
    quarter: string | null;
    utilized_amount: runtime.Decimal | null;
    updated_at: Date | null;
    implementation_status: string | null;
};
export type Siif_utilizationMaxAggregateOutputType = {
    siif_util_id: number | null;
    siif_int_id: number | null;
    quarter: string | null;
    utilized_amount: runtime.Decimal | null;
    updated_at: Date | null;
    implementation_status: string | null;
};
export type Siif_utilizationCountAggregateOutputType = {
    siif_util_id: number;
    siif_int_id: number;
    quarter: number;
    utilized_amount: number;
    updated_at: number;
    implementation_status: number;
    _all: number;
};
export type Siif_utilizationAvgAggregateInputType = {
    siif_util_id?: true;
    siif_int_id?: true;
    utilized_amount?: true;
};
export type Siif_utilizationSumAggregateInputType = {
    siif_util_id?: true;
    siif_int_id?: true;
    utilized_amount?: true;
};
export type Siif_utilizationMinAggregateInputType = {
    siif_util_id?: true;
    siif_int_id?: true;
    quarter?: true;
    utilized_amount?: true;
    updated_at?: true;
    implementation_status?: true;
};
export type Siif_utilizationMaxAggregateInputType = {
    siif_util_id?: true;
    siif_int_id?: true;
    quarter?: true;
    utilized_amount?: true;
    updated_at?: true;
    implementation_status?: true;
};
export type Siif_utilizationCountAggregateInputType = {
    siif_util_id?: true;
    siif_int_id?: true;
    quarter?: true;
    utilized_amount?: true;
    updated_at?: true;
    implementation_status?: true;
    _all?: true;
};
export type Siif_utilizationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_utilizationWhereInput;
    orderBy?: Prisma.siif_utilizationOrderByWithRelationInput | Prisma.siif_utilizationOrderByWithRelationInput[];
    cursor?: Prisma.siif_utilizationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Siif_utilizationCountAggregateInputType;
    _avg?: Siif_utilizationAvgAggregateInputType;
    _sum?: Siif_utilizationSumAggregateInputType;
    _min?: Siif_utilizationMinAggregateInputType;
    _max?: Siif_utilizationMaxAggregateInputType;
};
export type GetSiif_utilizationAggregateType<T extends Siif_utilizationAggregateArgs> = {
    [P in keyof T & keyof AggregateSiif_utilization]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSiif_utilization[P]> : Prisma.GetScalarType<T[P], AggregateSiif_utilization[P]>;
};
export type siif_utilizationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_utilizationWhereInput;
    orderBy?: Prisma.siif_utilizationOrderByWithAggregationInput | Prisma.siif_utilizationOrderByWithAggregationInput[];
    by: Prisma.Siif_utilizationScalarFieldEnum[] | Prisma.Siif_utilizationScalarFieldEnum;
    having?: Prisma.siif_utilizationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Siif_utilizationCountAggregateInputType | true;
    _avg?: Siif_utilizationAvgAggregateInputType;
    _sum?: Siif_utilizationSumAggregateInputType;
    _min?: Siif_utilizationMinAggregateInputType;
    _max?: Siif_utilizationMaxAggregateInputType;
};
export type Siif_utilizationGroupByOutputType = {
    siif_util_id: number;
    siif_int_id: number | null;
    quarter: string | null;
    utilized_amount: runtime.Decimal | null;
    updated_at: Date | null;
    implementation_status: string | null;
    _count: Siif_utilizationCountAggregateOutputType | null;
    _avg: Siif_utilizationAvgAggregateOutputType | null;
    _sum: Siif_utilizationSumAggregateOutputType | null;
    _min: Siif_utilizationMinAggregateOutputType | null;
    _max: Siif_utilizationMaxAggregateOutputType | null;
};
export type GetSiif_utilizationGroupByPayload<T extends siif_utilizationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Siif_utilizationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Siif_utilizationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Siif_utilizationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Siif_utilizationGroupByOutputType[P]>;
}>>;
export type siif_utilizationWhereInput = {
    AND?: Prisma.siif_utilizationWhereInput | Prisma.siif_utilizationWhereInput[];
    OR?: Prisma.siif_utilizationWhereInput[];
    NOT?: Prisma.siif_utilizationWhereInput | Prisma.siif_utilizationWhereInput[];
    siif_util_id?: Prisma.IntFilter<"siif_utilization"> | number;
    siif_int_id?: Prisma.IntNullableFilter<"siif_utilization"> | number | null;
    quarter?: Prisma.StringNullableFilter<"siif_utilization"> | string | null;
    utilized_amount?: Prisma.DecimalNullableFilter<"siif_utilization"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"siif_utilization"> | Date | string | null;
    implementation_status?: Prisma.StringNullableFilter<"siif_utilization"> | string | null;
    siif_interventions?: Prisma.XOR<Prisma.Siif_interventionsNullableScalarRelationFilter, Prisma.siif_interventionsWhereInput> | null;
};
export type siif_utilizationOrderByWithRelationInput = {
    siif_util_id?: Prisma.SortOrder;
    siif_int_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    quarter?: Prisma.SortOrderInput | Prisma.SortOrder;
    utilized_amount?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    implementation_status?: Prisma.SortOrderInput | Prisma.SortOrder;
    siif_interventions?: Prisma.siif_interventionsOrderByWithRelationInput;
};
export type siif_utilizationWhereUniqueInput = Prisma.AtLeast<{
    siif_util_id?: number;
    siif_int_id_quarter?: Prisma.siif_utilizationSiif_int_idQuarterCompoundUniqueInput;
    AND?: Prisma.siif_utilizationWhereInput | Prisma.siif_utilizationWhereInput[];
    OR?: Prisma.siif_utilizationWhereInput[];
    NOT?: Prisma.siif_utilizationWhereInput | Prisma.siif_utilizationWhereInput[];
    siif_int_id?: Prisma.IntNullableFilter<"siif_utilization"> | number | null;
    quarter?: Prisma.StringNullableFilter<"siif_utilization"> | string | null;
    utilized_amount?: Prisma.DecimalNullableFilter<"siif_utilization"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"siif_utilization"> | Date | string | null;
    implementation_status?: Prisma.StringNullableFilter<"siif_utilization"> | string | null;
    siif_interventions?: Prisma.XOR<Prisma.Siif_interventionsNullableScalarRelationFilter, Prisma.siif_interventionsWhereInput> | null;
}, "siif_util_id" | "siif_int_id_quarter" | "siif_int_id_quarter" | "siif_int_id_quarter">;
export type siif_utilizationOrderByWithAggregationInput = {
    siif_util_id?: Prisma.SortOrder;
    siif_int_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    quarter?: Prisma.SortOrderInput | Prisma.SortOrder;
    utilized_amount?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    implementation_status?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.siif_utilizationCountOrderByAggregateInput;
    _avg?: Prisma.siif_utilizationAvgOrderByAggregateInput;
    _max?: Prisma.siif_utilizationMaxOrderByAggregateInput;
    _min?: Prisma.siif_utilizationMinOrderByAggregateInput;
    _sum?: Prisma.siif_utilizationSumOrderByAggregateInput;
};
export type siif_utilizationScalarWhereWithAggregatesInput = {
    AND?: Prisma.siif_utilizationScalarWhereWithAggregatesInput | Prisma.siif_utilizationScalarWhereWithAggregatesInput[];
    OR?: Prisma.siif_utilizationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.siif_utilizationScalarWhereWithAggregatesInput | Prisma.siif_utilizationScalarWhereWithAggregatesInput[];
    siif_util_id?: Prisma.IntWithAggregatesFilter<"siif_utilization"> | number;
    siif_int_id?: Prisma.IntNullableWithAggregatesFilter<"siif_utilization"> | number | null;
    quarter?: Prisma.StringNullableWithAggregatesFilter<"siif_utilization"> | string | null;
    utilized_amount?: Prisma.DecimalNullableWithAggregatesFilter<"siif_utilization"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"siif_utilization"> | Date | string | null;
    implementation_status?: Prisma.StringNullableWithAggregatesFilter<"siif_utilization"> | string | null;
};
export type siif_utilizationCreateInput = {
    quarter?: string | null;
    utilized_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Date | string | null;
    implementation_status?: string | null;
    siif_interventions?: Prisma.siif_interventionsCreateNestedOneWithoutSiif_utilizationInput;
};
export type siif_utilizationUncheckedCreateInput = {
    siif_util_id?: number;
    siif_int_id?: number | null;
    quarter?: string | null;
    utilized_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Date | string | null;
    implementation_status?: string | null;
};
export type siif_utilizationUpdateInput = {
    quarter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    utilized_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    implementation_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    siif_interventions?: Prisma.siif_interventionsUpdateOneWithoutSiif_utilizationNestedInput;
};
export type siif_utilizationUncheckedUpdateInput = {
    siif_util_id?: Prisma.IntFieldUpdateOperationsInput | number;
    siif_int_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    quarter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    utilized_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    implementation_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type siif_utilizationCreateManyInput = {
    siif_util_id?: number;
    siif_int_id?: number | null;
    quarter?: string | null;
    utilized_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Date | string | null;
    implementation_status?: string | null;
};
export type siif_utilizationUpdateManyMutationInput = {
    quarter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    utilized_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    implementation_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type siif_utilizationUncheckedUpdateManyInput = {
    siif_util_id?: Prisma.IntFieldUpdateOperationsInput | number;
    siif_int_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    quarter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    utilized_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    implementation_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type Siif_utilizationListRelationFilter = {
    every?: Prisma.siif_utilizationWhereInput;
    some?: Prisma.siif_utilizationWhereInput;
    none?: Prisma.siif_utilizationWhereInput;
};
export type siif_utilizationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type siif_utilizationSiif_int_idQuarterCompoundUniqueInput = {
    siif_int_id: number;
    quarter: string;
};
export type siif_utilizationCountOrderByAggregateInput = {
    siif_util_id?: Prisma.SortOrder;
    siif_int_id?: Prisma.SortOrder;
    quarter?: Prisma.SortOrder;
    utilized_amount?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    implementation_status?: Prisma.SortOrder;
};
export type siif_utilizationAvgOrderByAggregateInput = {
    siif_util_id?: Prisma.SortOrder;
    siif_int_id?: Prisma.SortOrder;
    utilized_amount?: Prisma.SortOrder;
};
export type siif_utilizationMaxOrderByAggregateInput = {
    siif_util_id?: Prisma.SortOrder;
    siif_int_id?: Prisma.SortOrder;
    quarter?: Prisma.SortOrder;
    utilized_amount?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    implementation_status?: Prisma.SortOrder;
};
export type siif_utilizationMinOrderByAggregateInput = {
    siif_util_id?: Prisma.SortOrder;
    siif_int_id?: Prisma.SortOrder;
    quarter?: Prisma.SortOrder;
    utilized_amount?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    implementation_status?: Prisma.SortOrder;
};
export type siif_utilizationSumOrderByAggregateInput = {
    siif_util_id?: Prisma.SortOrder;
    siif_int_id?: Prisma.SortOrder;
    utilized_amount?: Prisma.SortOrder;
};
export type siif_utilizationCreateNestedManyWithoutSiif_interventionsInput = {
    create?: Prisma.XOR<Prisma.siif_utilizationCreateWithoutSiif_interventionsInput, Prisma.siif_utilizationUncheckedCreateWithoutSiif_interventionsInput> | Prisma.siif_utilizationCreateWithoutSiif_interventionsInput[] | Prisma.siif_utilizationUncheckedCreateWithoutSiif_interventionsInput[];
    connectOrCreate?: Prisma.siif_utilizationCreateOrConnectWithoutSiif_interventionsInput | Prisma.siif_utilizationCreateOrConnectWithoutSiif_interventionsInput[];
    createMany?: Prisma.siif_utilizationCreateManySiif_interventionsInputEnvelope;
    connect?: Prisma.siif_utilizationWhereUniqueInput | Prisma.siif_utilizationWhereUniqueInput[];
};
export type siif_utilizationUncheckedCreateNestedManyWithoutSiif_interventionsInput = {
    create?: Prisma.XOR<Prisma.siif_utilizationCreateWithoutSiif_interventionsInput, Prisma.siif_utilizationUncheckedCreateWithoutSiif_interventionsInput> | Prisma.siif_utilizationCreateWithoutSiif_interventionsInput[] | Prisma.siif_utilizationUncheckedCreateWithoutSiif_interventionsInput[];
    connectOrCreate?: Prisma.siif_utilizationCreateOrConnectWithoutSiif_interventionsInput | Prisma.siif_utilizationCreateOrConnectWithoutSiif_interventionsInput[];
    createMany?: Prisma.siif_utilizationCreateManySiif_interventionsInputEnvelope;
    connect?: Prisma.siif_utilizationWhereUniqueInput | Prisma.siif_utilizationWhereUniqueInput[];
};
export type siif_utilizationUpdateManyWithoutSiif_interventionsNestedInput = {
    create?: Prisma.XOR<Prisma.siif_utilizationCreateWithoutSiif_interventionsInput, Prisma.siif_utilizationUncheckedCreateWithoutSiif_interventionsInput> | Prisma.siif_utilizationCreateWithoutSiif_interventionsInput[] | Prisma.siif_utilizationUncheckedCreateWithoutSiif_interventionsInput[];
    connectOrCreate?: Prisma.siif_utilizationCreateOrConnectWithoutSiif_interventionsInput | Prisma.siif_utilizationCreateOrConnectWithoutSiif_interventionsInput[];
    upsert?: Prisma.siif_utilizationUpsertWithWhereUniqueWithoutSiif_interventionsInput | Prisma.siif_utilizationUpsertWithWhereUniqueWithoutSiif_interventionsInput[];
    createMany?: Prisma.siif_utilizationCreateManySiif_interventionsInputEnvelope;
    set?: Prisma.siif_utilizationWhereUniqueInput | Prisma.siif_utilizationWhereUniqueInput[];
    disconnect?: Prisma.siif_utilizationWhereUniqueInput | Prisma.siif_utilizationWhereUniqueInput[];
    delete?: Prisma.siif_utilizationWhereUniqueInput | Prisma.siif_utilizationWhereUniqueInput[];
    connect?: Prisma.siif_utilizationWhereUniqueInput | Prisma.siif_utilizationWhereUniqueInput[];
    update?: Prisma.siif_utilizationUpdateWithWhereUniqueWithoutSiif_interventionsInput | Prisma.siif_utilizationUpdateWithWhereUniqueWithoutSiif_interventionsInput[];
    updateMany?: Prisma.siif_utilizationUpdateManyWithWhereWithoutSiif_interventionsInput | Prisma.siif_utilizationUpdateManyWithWhereWithoutSiif_interventionsInput[];
    deleteMany?: Prisma.siif_utilizationScalarWhereInput | Prisma.siif_utilizationScalarWhereInput[];
};
export type siif_utilizationUncheckedUpdateManyWithoutSiif_interventionsNestedInput = {
    create?: Prisma.XOR<Prisma.siif_utilizationCreateWithoutSiif_interventionsInput, Prisma.siif_utilizationUncheckedCreateWithoutSiif_interventionsInput> | Prisma.siif_utilizationCreateWithoutSiif_interventionsInput[] | Prisma.siif_utilizationUncheckedCreateWithoutSiif_interventionsInput[];
    connectOrCreate?: Prisma.siif_utilizationCreateOrConnectWithoutSiif_interventionsInput | Prisma.siif_utilizationCreateOrConnectWithoutSiif_interventionsInput[];
    upsert?: Prisma.siif_utilizationUpsertWithWhereUniqueWithoutSiif_interventionsInput | Prisma.siif_utilizationUpsertWithWhereUniqueWithoutSiif_interventionsInput[];
    createMany?: Prisma.siif_utilizationCreateManySiif_interventionsInputEnvelope;
    set?: Prisma.siif_utilizationWhereUniqueInput | Prisma.siif_utilizationWhereUniqueInput[];
    disconnect?: Prisma.siif_utilizationWhereUniqueInput | Prisma.siif_utilizationWhereUniqueInput[];
    delete?: Prisma.siif_utilizationWhereUniqueInput | Prisma.siif_utilizationWhereUniqueInput[];
    connect?: Prisma.siif_utilizationWhereUniqueInput | Prisma.siif_utilizationWhereUniqueInput[];
    update?: Prisma.siif_utilizationUpdateWithWhereUniqueWithoutSiif_interventionsInput | Prisma.siif_utilizationUpdateWithWhereUniqueWithoutSiif_interventionsInput[];
    updateMany?: Prisma.siif_utilizationUpdateManyWithWhereWithoutSiif_interventionsInput | Prisma.siif_utilizationUpdateManyWithWhereWithoutSiif_interventionsInput[];
    deleteMany?: Prisma.siif_utilizationScalarWhereInput | Prisma.siif_utilizationScalarWhereInput[];
};
export type siif_utilizationCreateWithoutSiif_interventionsInput = {
    quarter?: string | null;
    utilized_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Date | string | null;
    implementation_status?: string | null;
};
export type siif_utilizationUncheckedCreateWithoutSiif_interventionsInput = {
    siif_util_id?: number;
    quarter?: string | null;
    utilized_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Date | string | null;
    implementation_status?: string | null;
};
export type siif_utilizationCreateOrConnectWithoutSiif_interventionsInput = {
    where: Prisma.siif_utilizationWhereUniqueInput;
    create: Prisma.XOR<Prisma.siif_utilizationCreateWithoutSiif_interventionsInput, Prisma.siif_utilizationUncheckedCreateWithoutSiif_interventionsInput>;
};
export type siif_utilizationCreateManySiif_interventionsInputEnvelope = {
    data: Prisma.siif_utilizationCreateManySiif_interventionsInput | Prisma.siif_utilizationCreateManySiif_interventionsInput[];
    skipDuplicates?: boolean;
};
export type siif_utilizationUpsertWithWhereUniqueWithoutSiif_interventionsInput = {
    where: Prisma.siif_utilizationWhereUniqueInput;
    update: Prisma.XOR<Prisma.siif_utilizationUpdateWithoutSiif_interventionsInput, Prisma.siif_utilizationUncheckedUpdateWithoutSiif_interventionsInput>;
    create: Prisma.XOR<Prisma.siif_utilizationCreateWithoutSiif_interventionsInput, Prisma.siif_utilizationUncheckedCreateWithoutSiif_interventionsInput>;
};
export type siif_utilizationUpdateWithWhereUniqueWithoutSiif_interventionsInput = {
    where: Prisma.siif_utilizationWhereUniqueInput;
    data: Prisma.XOR<Prisma.siif_utilizationUpdateWithoutSiif_interventionsInput, Prisma.siif_utilizationUncheckedUpdateWithoutSiif_interventionsInput>;
};
export type siif_utilizationUpdateManyWithWhereWithoutSiif_interventionsInput = {
    where: Prisma.siif_utilizationScalarWhereInput;
    data: Prisma.XOR<Prisma.siif_utilizationUpdateManyMutationInput, Prisma.siif_utilizationUncheckedUpdateManyWithoutSiif_interventionsInput>;
};
export type siif_utilizationScalarWhereInput = {
    AND?: Prisma.siif_utilizationScalarWhereInput | Prisma.siif_utilizationScalarWhereInput[];
    OR?: Prisma.siif_utilizationScalarWhereInput[];
    NOT?: Prisma.siif_utilizationScalarWhereInput | Prisma.siif_utilizationScalarWhereInput[];
    siif_util_id?: Prisma.IntFilter<"siif_utilization"> | number;
    siif_int_id?: Prisma.IntNullableFilter<"siif_utilization"> | number | null;
    quarter?: Prisma.StringNullableFilter<"siif_utilization"> | string | null;
    utilized_amount?: Prisma.DecimalNullableFilter<"siif_utilization"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"siif_utilization"> | Date | string | null;
    implementation_status?: Prisma.StringNullableFilter<"siif_utilization"> | string | null;
};
export type siif_utilizationCreateManySiif_interventionsInput = {
    siif_util_id?: number;
    quarter?: string | null;
    utilized_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Date | string | null;
    implementation_status?: string | null;
};
export type siif_utilizationUpdateWithoutSiif_interventionsInput = {
    quarter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    utilized_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    implementation_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type siif_utilizationUncheckedUpdateWithoutSiif_interventionsInput = {
    siif_util_id?: Prisma.IntFieldUpdateOperationsInput | number;
    quarter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    utilized_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    implementation_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type siif_utilizationUncheckedUpdateManyWithoutSiif_interventionsInput = {
    siif_util_id?: Prisma.IntFieldUpdateOperationsInput | number;
    quarter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    utilized_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    implementation_status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type siif_utilizationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    siif_util_id?: boolean;
    siif_int_id?: boolean;
    quarter?: boolean;
    utilized_amount?: boolean;
    updated_at?: boolean;
    implementation_status?: boolean;
    siif_interventions?: boolean | Prisma.siif_utilization$siif_interventionsArgs<ExtArgs>;
}, ExtArgs["result"]["siif_utilization"]>;
export type siif_utilizationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    siif_util_id?: boolean;
    siif_int_id?: boolean;
    quarter?: boolean;
    utilized_amount?: boolean;
    updated_at?: boolean;
    implementation_status?: boolean;
    siif_interventions?: boolean | Prisma.siif_utilization$siif_interventionsArgs<ExtArgs>;
}, ExtArgs["result"]["siif_utilization"]>;
export type siif_utilizationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    siif_util_id?: boolean;
    siif_int_id?: boolean;
    quarter?: boolean;
    utilized_amount?: boolean;
    updated_at?: boolean;
    implementation_status?: boolean;
    siif_interventions?: boolean | Prisma.siif_utilization$siif_interventionsArgs<ExtArgs>;
}, ExtArgs["result"]["siif_utilization"]>;
export type siif_utilizationSelectScalar = {
    siif_util_id?: boolean;
    siif_int_id?: boolean;
    quarter?: boolean;
    utilized_amount?: boolean;
    updated_at?: boolean;
    implementation_status?: boolean;
};
export type siif_utilizationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"siif_util_id" | "siif_int_id" | "quarter" | "utilized_amount" | "updated_at" | "implementation_status", ExtArgs["result"]["siif_utilization"]>;
export type siif_utilizationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    siif_interventions?: boolean | Prisma.siif_utilization$siif_interventionsArgs<ExtArgs>;
};
export type siif_utilizationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    siif_interventions?: boolean | Prisma.siif_utilization$siif_interventionsArgs<ExtArgs>;
};
export type siif_utilizationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    siif_interventions?: boolean | Prisma.siif_utilization$siif_interventionsArgs<ExtArgs>;
};
export type $siif_utilizationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "siif_utilization";
    objects: {
        siif_interventions: Prisma.$siif_interventionsPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        siif_util_id: number;
        siif_int_id: number | null;
        quarter: string | null;
        utilized_amount: runtime.Decimal | null;
        updated_at: Date | null;
        implementation_status: string | null;
    }, ExtArgs["result"]["siif_utilization"]>;
    composites: {};
};
export type siif_utilizationGetPayload<S extends boolean | null | undefined | siif_utilizationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$siif_utilizationPayload, S>;
export type siif_utilizationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<siif_utilizationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Siif_utilizationCountAggregateInputType | true;
};
export interface siif_utilizationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['siif_utilization'];
        meta: {
            name: 'siif_utilization';
        };
    };
    findUnique<T extends siif_utilizationFindUniqueArgs>(args: Prisma.SelectSubset<T, siif_utilizationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__siif_utilizationClient<runtime.Types.Result.GetResult<Prisma.$siif_utilizationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends siif_utilizationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, siif_utilizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__siif_utilizationClient<runtime.Types.Result.GetResult<Prisma.$siif_utilizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends siif_utilizationFindFirstArgs>(args?: Prisma.SelectSubset<T, siif_utilizationFindFirstArgs<ExtArgs>>): Prisma.Prisma__siif_utilizationClient<runtime.Types.Result.GetResult<Prisma.$siif_utilizationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends siif_utilizationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, siif_utilizationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__siif_utilizationClient<runtime.Types.Result.GetResult<Prisma.$siif_utilizationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends siif_utilizationFindManyArgs>(args?: Prisma.SelectSubset<T, siif_utilizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_utilizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends siif_utilizationCreateArgs>(args: Prisma.SelectSubset<T, siif_utilizationCreateArgs<ExtArgs>>): Prisma.Prisma__siif_utilizationClient<runtime.Types.Result.GetResult<Prisma.$siif_utilizationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends siif_utilizationCreateManyArgs>(args?: Prisma.SelectSubset<T, siif_utilizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends siif_utilizationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, siif_utilizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_utilizationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends siif_utilizationDeleteArgs>(args: Prisma.SelectSubset<T, siif_utilizationDeleteArgs<ExtArgs>>): Prisma.Prisma__siif_utilizationClient<runtime.Types.Result.GetResult<Prisma.$siif_utilizationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends siif_utilizationUpdateArgs>(args: Prisma.SelectSubset<T, siif_utilizationUpdateArgs<ExtArgs>>): Prisma.Prisma__siif_utilizationClient<runtime.Types.Result.GetResult<Prisma.$siif_utilizationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends siif_utilizationDeleteManyArgs>(args?: Prisma.SelectSubset<T, siif_utilizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends siif_utilizationUpdateManyArgs>(args: Prisma.SelectSubset<T, siif_utilizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends siif_utilizationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, siif_utilizationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_utilizationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends siif_utilizationUpsertArgs>(args: Prisma.SelectSubset<T, siif_utilizationUpsertArgs<ExtArgs>>): Prisma.Prisma__siif_utilizationClient<runtime.Types.Result.GetResult<Prisma.$siif_utilizationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends siif_utilizationCountArgs>(args?: Prisma.Subset<T, siif_utilizationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Siif_utilizationCountAggregateOutputType> : number>;
    aggregate<T extends Siif_utilizationAggregateArgs>(args: Prisma.Subset<T, Siif_utilizationAggregateArgs>): Prisma.PrismaPromise<GetSiif_utilizationAggregateType<T>>;
    groupBy<T extends siif_utilizationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: siif_utilizationGroupByArgs['orderBy'];
    } : {
        orderBy?: siif_utilizationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, siif_utilizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiif_utilizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: siif_utilizationFieldRefs;
}
export interface Prisma__siif_utilizationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    siif_interventions<T extends Prisma.siif_utilization$siif_interventionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.siif_utilization$siif_interventionsArgs<ExtArgs>>): Prisma.Prisma__siif_interventionsClient<runtime.Types.Result.GetResult<Prisma.$siif_interventionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface siif_utilizationFieldRefs {
    readonly siif_util_id: Prisma.FieldRef<"siif_utilization", 'Int'>;
    readonly siif_int_id: Prisma.FieldRef<"siif_utilization", 'Int'>;
    readonly quarter: Prisma.FieldRef<"siif_utilization", 'String'>;
    readonly utilized_amount: Prisma.FieldRef<"siif_utilization", 'Decimal'>;
    readonly updated_at: Prisma.FieldRef<"siif_utilization", 'DateTime'>;
    readonly implementation_status: Prisma.FieldRef<"siif_utilization", 'String'>;
}
export type siif_utilizationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_utilizationSelect<ExtArgs> | null;
    omit?: Prisma.siif_utilizationOmit<ExtArgs> | null;
    include?: Prisma.siif_utilizationInclude<ExtArgs> | null;
    where: Prisma.siif_utilizationWhereUniqueInput;
};
export type siif_utilizationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_utilizationSelect<ExtArgs> | null;
    omit?: Prisma.siif_utilizationOmit<ExtArgs> | null;
    include?: Prisma.siif_utilizationInclude<ExtArgs> | null;
    where: Prisma.siif_utilizationWhereUniqueInput;
};
export type siif_utilizationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type siif_utilizationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type siif_utilizationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type siif_utilizationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_utilizationSelect<ExtArgs> | null;
    omit?: Prisma.siif_utilizationOmit<ExtArgs> | null;
    include?: Prisma.siif_utilizationInclude<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.siif_utilizationCreateInput, Prisma.siif_utilizationUncheckedCreateInput>;
};
export type siif_utilizationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.siif_utilizationCreateManyInput | Prisma.siif_utilizationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type siif_utilizationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_utilizationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.siif_utilizationOmit<ExtArgs> | null;
    data: Prisma.siif_utilizationCreateManyInput | Prisma.siif_utilizationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.siif_utilizationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type siif_utilizationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_utilizationSelect<ExtArgs> | null;
    omit?: Prisma.siif_utilizationOmit<ExtArgs> | null;
    include?: Prisma.siif_utilizationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.siif_utilizationUpdateInput, Prisma.siif_utilizationUncheckedUpdateInput>;
    where: Prisma.siif_utilizationWhereUniqueInput;
};
export type siif_utilizationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.siif_utilizationUpdateManyMutationInput, Prisma.siif_utilizationUncheckedUpdateManyInput>;
    where?: Prisma.siif_utilizationWhereInput;
    limit?: number;
};
export type siif_utilizationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_utilizationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.siif_utilizationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.siif_utilizationUpdateManyMutationInput, Prisma.siif_utilizationUncheckedUpdateManyInput>;
    where?: Prisma.siif_utilizationWhereInput;
    limit?: number;
    include?: Prisma.siif_utilizationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type siif_utilizationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_utilizationSelect<ExtArgs> | null;
    omit?: Prisma.siif_utilizationOmit<ExtArgs> | null;
    include?: Prisma.siif_utilizationInclude<ExtArgs> | null;
    where: Prisma.siif_utilizationWhereUniqueInput;
    create: Prisma.XOR<Prisma.siif_utilizationCreateInput, Prisma.siif_utilizationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.siif_utilizationUpdateInput, Prisma.siif_utilizationUncheckedUpdateInput>;
};
export type siif_utilizationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_utilizationSelect<ExtArgs> | null;
    omit?: Prisma.siif_utilizationOmit<ExtArgs> | null;
    include?: Prisma.siif_utilizationInclude<ExtArgs> | null;
    where: Prisma.siif_utilizationWhereUniqueInput;
};
export type siif_utilizationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_utilizationWhereInput;
    limit?: number;
};
export type siif_utilization$siif_interventionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_interventionsSelect<ExtArgs> | null;
    omit?: Prisma.siif_interventionsOmit<ExtArgs> | null;
    include?: Prisma.siif_interventionsInclude<ExtArgs> | null;
    where?: Prisma.siif_interventionsWhereInput;
};
export type siif_utilizationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_utilizationSelect<ExtArgs> | null;
    omit?: Prisma.siif_utilizationOmit<ExtArgs> | null;
    include?: Prisma.siif_utilizationInclude<ExtArgs> | null;
};
