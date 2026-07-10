import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type school_ownership_recordsModel = runtime.Types.Result.DefaultSelection<Prisma.$school_ownership_recordsPayload>;
export type AggregateSchool_ownership_records = {
    _count: School_ownership_recordsCountAggregateOutputType | null;
    _avg: School_ownership_recordsAvgAggregateOutputType | null;
    _sum: School_ownership_recordsSumAggregateOutputType | null;
    _min: School_ownership_recordsMinAggregateOutputType | null;
    _max: School_ownership_recordsMaxAggregateOutputType | null;
};
export type School_ownership_recordsAvgAggregateOutputType = {
    id: number | null;
    ownership_doc_id: number | null;
};
export type School_ownership_recordsSumAggregateOutputType = {
    id: number | null;
    ownership_doc_id: number | null;
};
export type School_ownership_recordsMinAggregateOutputType = {
    id: number | null;
    iern: string | null;
    ownership_type: string | null;
    document_type: string | null;
    ownership_doc_id: number | null;
    created_at: Date | null;
    school_yr: string | null;
};
export type School_ownership_recordsMaxAggregateOutputType = {
    id: number | null;
    iern: string | null;
    ownership_type: string | null;
    document_type: string | null;
    ownership_doc_id: number | null;
    created_at: Date | null;
    school_yr: string | null;
};
export type School_ownership_recordsCountAggregateOutputType = {
    id: number;
    iern: number;
    ownership_type: number;
    document_type: number;
    ownership_doc_id: number;
    created_at: number;
    school_yr: number;
    _all: number;
};
export type School_ownership_recordsAvgAggregateInputType = {
    id?: true;
    ownership_doc_id?: true;
};
export type School_ownership_recordsSumAggregateInputType = {
    id?: true;
    ownership_doc_id?: true;
};
export type School_ownership_recordsMinAggregateInputType = {
    id?: true;
    iern?: true;
    ownership_type?: true;
    document_type?: true;
    ownership_doc_id?: true;
    created_at?: true;
    school_yr?: true;
};
export type School_ownership_recordsMaxAggregateInputType = {
    id?: true;
    iern?: true;
    ownership_type?: true;
    document_type?: true;
    ownership_doc_id?: true;
    created_at?: true;
    school_yr?: true;
};
export type School_ownership_recordsCountAggregateInputType = {
    id?: true;
    iern?: true;
    ownership_type?: true;
    document_type?: true;
    ownership_doc_id?: true;
    created_at?: true;
    school_yr?: true;
    _all?: true;
};
export type School_ownership_recordsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.school_ownership_recordsWhereInput;
    orderBy?: Prisma.school_ownership_recordsOrderByWithRelationInput | Prisma.school_ownership_recordsOrderByWithRelationInput[];
    cursor?: Prisma.school_ownership_recordsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | School_ownership_recordsCountAggregateInputType;
    _avg?: School_ownership_recordsAvgAggregateInputType;
    _sum?: School_ownership_recordsSumAggregateInputType;
    _min?: School_ownership_recordsMinAggregateInputType;
    _max?: School_ownership_recordsMaxAggregateInputType;
};
export type GetSchool_ownership_recordsAggregateType<T extends School_ownership_recordsAggregateArgs> = {
    [P in keyof T & keyof AggregateSchool_ownership_records]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSchool_ownership_records[P]> : Prisma.GetScalarType<T[P], AggregateSchool_ownership_records[P]>;
};
export type school_ownership_recordsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.school_ownership_recordsWhereInput;
    orderBy?: Prisma.school_ownership_recordsOrderByWithAggregationInput | Prisma.school_ownership_recordsOrderByWithAggregationInput[];
    by: Prisma.School_ownership_recordsScalarFieldEnum[] | Prisma.School_ownership_recordsScalarFieldEnum;
    having?: Prisma.school_ownership_recordsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: School_ownership_recordsCountAggregateInputType | true;
    _avg?: School_ownership_recordsAvgAggregateInputType;
    _sum?: School_ownership_recordsSumAggregateInputType;
    _min?: School_ownership_recordsMinAggregateInputType;
    _max?: School_ownership_recordsMaxAggregateInputType;
};
export type School_ownership_recordsGroupByOutputType = {
    id: number;
    iern: string;
    ownership_type: string;
    document_type: string | null;
    ownership_doc_id: number | null;
    created_at: Date | null;
    school_yr: string | null;
    _count: School_ownership_recordsCountAggregateOutputType | null;
    _avg: School_ownership_recordsAvgAggregateOutputType | null;
    _sum: School_ownership_recordsSumAggregateOutputType | null;
    _min: School_ownership_recordsMinAggregateOutputType | null;
    _max: School_ownership_recordsMaxAggregateOutputType | null;
};
export type GetSchool_ownership_recordsGroupByPayload<T extends school_ownership_recordsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<School_ownership_recordsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof School_ownership_recordsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], School_ownership_recordsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], School_ownership_recordsGroupByOutputType[P]>;
}>>;
export type school_ownership_recordsWhereInput = {
    AND?: Prisma.school_ownership_recordsWhereInput | Prisma.school_ownership_recordsWhereInput[];
    OR?: Prisma.school_ownership_recordsWhereInput[];
    NOT?: Prisma.school_ownership_recordsWhereInput | Prisma.school_ownership_recordsWhereInput[];
    id?: Prisma.IntFilter<"school_ownership_records"> | number;
    iern?: Prisma.StringFilter<"school_ownership_records"> | string;
    ownership_type?: Prisma.StringFilter<"school_ownership_records"> | string;
    document_type?: Prisma.StringNullableFilter<"school_ownership_records"> | string | null;
    ownership_doc_id?: Prisma.IntNullableFilter<"school_ownership_records"> | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"school_ownership_records"> | Date | string | null;
    school_yr?: Prisma.StringNullableFilter<"school_ownership_records"> | string | null;
    school_ownership_docs?: Prisma.XOR<Prisma.School_ownership_docsNullableScalarRelationFilter, Prisma.school_ownership_docsWhereInput> | null;
};
export type school_ownership_recordsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    ownership_type?: Prisma.SortOrder;
    document_type?: Prisma.SortOrderInput | Prisma.SortOrder;
    ownership_doc_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_yr?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_ownership_docs?: Prisma.school_ownership_docsOrderByWithRelationInput;
};
export type school_ownership_recordsWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.school_ownership_recordsWhereInput | Prisma.school_ownership_recordsWhereInput[];
    OR?: Prisma.school_ownership_recordsWhereInput[];
    NOT?: Prisma.school_ownership_recordsWhereInput | Prisma.school_ownership_recordsWhereInput[];
    iern?: Prisma.StringFilter<"school_ownership_records"> | string;
    ownership_type?: Prisma.StringFilter<"school_ownership_records"> | string;
    document_type?: Prisma.StringNullableFilter<"school_ownership_records"> | string | null;
    ownership_doc_id?: Prisma.IntNullableFilter<"school_ownership_records"> | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"school_ownership_records"> | Date | string | null;
    school_yr?: Prisma.StringNullableFilter<"school_ownership_records"> | string | null;
    school_ownership_docs?: Prisma.XOR<Prisma.School_ownership_docsNullableScalarRelationFilter, Prisma.school_ownership_docsWhereInput> | null;
}, "id">;
export type school_ownership_recordsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    ownership_type?: Prisma.SortOrder;
    document_type?: Prisma.SortOrderInput | Prisma.SortOrder;
    ownership_doc_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_yr?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.school_ownership_recordsCountOrderByAggregateInput;
    _avg?: Prisma.school_ownership_recordsAvgOrderByAggregateInput;
    _max?: Prisma.school_ownership_recordsMaxOrderByAggregateInput;
    _min?: Prisma.school_ownership_recordsMinOrderByAggregateInput;
    _sum?: Prisma.school_ownership_recordsSumOrderByAggregateInput;
};
export type school_ownership_recordsScalarWhereWithAggregatesInput = {
    AND?: Prisma.school_ownership_recordsScalarWhereWithAggregatesInput | Prisma.school_ownership_recordsScalarWhereWithAggregatesInput[];
    OR?: Prisma.school_ownership_recordsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.school_ownership_recordsScalarWhereWithAggregatesInput | Prisma.school_ownership_recordsScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"school_ownership_records"> | number;
    iern?: Prisma.StringWithAggregatesFilter<"school_ownership_records"> | string;
    ownership_type?: Prisma.StringWithAggregatesFilter<"school_ownership_records"> | string;
    document_type?: Prisma.StringNullableWithAggregatesFilter<"school_ownership_records"> | string | null;
    ownership_doc_id?: Prisma.IntNullableWithAggregatesFilter<"school_ownership_records"> | number | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"school_ownership_records"> | Date | string | null;
    school_yr?: Prisma.StringNullableWithAggregatesFilter<"school_ownership_records"> | string | null;
};
export type school_ownership_recordsCreateInput = {
    iern: string;
    ownership_type: string;
    document_type?: string | null;
    created_at?: Date | string | null;
    school_yr?: string | null;
    school_ownership_docs?: Prisma.school_ownership_docsCreateNestedOneWithoutSchool_ownership_recordsInput;
};
export type school_ownership_recordsUncheckedCreateInput = {
    id?: number;
    iern: string;
    ownership_type: string;
    document_type?: string | null;
    ownership_doc_id?: number | null;
    created_at?: Date | string | null;
    school_yr?: string | null;
};
export type school_ownership_recordsUpdateInput = {
    iern?: Prisma.StringFieldUpdateOperationsInput | string;
    ownership_type?: Prisma.StringFieldUpdateOperationsInput | string;
    document_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    school_yr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_ownership_docs?: Prisma.school_ownership_docsUpdateOneWithoutSchool_ownership_recordsNestedInput;
};
export type school_ownership_recordsUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    iern?: Prisma.StringFieldUpdateOperationsInput | string;
    ownership_type?: Prisma.StringFieldUpdateOperationsInput | string;
    document_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ownership_doc_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    school_yr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type school_ownership_recordsCreateManyInput = {
    id?: number;
    iern: string;
    ownership_type: string;
    document_type?: string | null;
    ownership_doc_id?: number | null;
    created_at?: Date | string | null;
    school_yr?: string | null;
};
export type school_ownership_recordsUpdateManyMutationInput = {
    iern?: Prisma.StringFieldUpdateOperationsInput | string;
    ownership_type?: Prisma.StringFieldUpdateOperationsInput | string;
    document_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    school_yr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type school_ownership_recordsUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    iern?: Prisma.StringFieldUpdateOperationsInput | string;
    ownership_type?: Prisma.StringFieldUpdateOperationsInput | string;
    document_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ownership_doc_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    school_yr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type School_ownership_recordsListRelationFilter = {
    every?: Prisma.school_ownership_recordsWhereInput;
    some?: Prisma.school_ownership_recordsWhereInput;
    none?: Prisma.school_ownership_recordsWhereInput;
};
export type school_ownership_recordsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type school_ownership_recordsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    ownership_type?: Prisma.SortOrder;
    document_type?: Prisma.SortOrder;
    ownership_doc_id?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    school_yr?: Prisma.SortOrder;
};
export type school_ownership_recordsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ownership_doc_id?: Prisma.SortOrder;
};
export type school_ownership_recordsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    ownership_type?: Prisma.SortOrder;
    document_type?: Prisma.SortOrder;
    ownership_doc_id?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    school_yr?: Prisma.SortOrder;
};
export type school_ownership_recordsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    ownership_type?: Prisma.SortOrder;
    document_type?: Prisma.SortOrder;
    ownership_doc_id?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    school_yr?: Prisma.SortOrder;
};
export type school_ownership_recordsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ownership_doc_id?: Prisma.SortOrder;
};
export type school_ownership_recordsCreateNestedManyWithoutSchool_ownership_docsInput = {
    create?: Prisma.XOR<Prisma.school_ownership_recordsCreateWithoutSchool_ownership_docsInput, Prisma.school_ownership_recordsUncheckedCreateWithoutSchool_ownership_docsInput> | Prisma.school_ownership_recordsCreateWithoutSchool_ownership_docsInput[] | Prisma.school_ownership_recordsUncheckedCreateWithoutSchool_ownership_docsInput[];
    connectOrCreate?: Prisma.school_ownership_recordsCreateOrConnectWithoutSchool_ownership_docsInput | Prisma.school_ownership_recordsCreateOrConnectWithoutSchool_ownership_docsInput[];
    createMany?: Prisma.school_ownership_recordsCreateManySchool_ownership_docsInputEnvelope;
    connect?: Prisma.school_ownership_recordsWhereUniqueInput | Prisma.school_ownership_recordsWhereUniqueInput[];
};
export type school_ownership_recordsUncheckedCreateNestedManyWithoutSchool_ownership_docsInput = {
    create?: Prisma.XOR<Prisma.school_ownership_recordsCreateWithoutSchool_ownership_docsInput, Prisma.school_ownership_recordsUncheckedCreateWithoutSchool_ownership_docsInput> | Prisma.school_ownership_recordsCreateWithoutSchool_ownership_docsInput[] | Prisma.school_ownership_recordsUncheckedCreateWithoutSchool_ownership_docsInput[];
    connectOrCreate?: Prisma.school_ownership_recordsCreateOrConnectWithoutSchool_ownership_docsInput | Prisma.school_ownership_recordsCreateOrConnectWithoutSchool_ownership_docsInput[];
    createMany?: Prisma.school_ownership_recordsCreateManySchool_ownership_docsInputEnvelope;
    connect?: Prisma.school_ownership_recordsWhereUniqueInput | Prisma.school_ownership_recordsWhereUniqueInput[];
};
export type school_ownership_recordsUpdateManyWithoutSchool_ownership_docsNestedInput = {
    create?: Prisma.XOR<Prisma.school_ownership_recordsCreateWithoutSchool_ownership_docsInput, Prisma.school_ownership_recordsUncheckedCreateWithoutSchool_ownership_docsInput> | Prisma.school_ownership_recordsCreateWithoutSchool_ownership_docsInput[] | Prisma.school_ownership_recordsUncheckedCreateWithoutSchool_ownership_docsInput[];
    connectOrCreate?: Prisma.school_ownership_recordsCreateOrConnectWithoutSchool_ownership_docsInput | Prisma.school_ownership_recordsCreateOrConnectWithoutSchool_ownership_docsInput[];
    upsert?: Prisma.school_ownership_recordsUpsertWithWhereUniqueWithoutSchool_ownership_docsInput | Prisma.school_ownership_recordsUpsertWithWhereUniqueWithoutSchool_ownership_docsInput[];
    createMany?: Prisma.school_ownership_recordsCreateManySchool_ownership_docsInputEnvelope;
    set?: Prisma.school_ownership_recordsWhereUniqueInput | Prisma.school_ownership_recordsWhereUniqueInput[];
    disconnect?: Prisma.school_ownership_recordsWhereUniqueInput | Prisma.school_ownership_recordsWhereUniqueInput[];
    delete?: Prisma.school_ownership_recordsWhereUniqueInput | Prisma.school_ownership_recordsWhereUniqueInput[];
    connect?: Prisma.school_ownership_recordsWhereUniqueInput | Prisma.school_ownership_recordsWhereUniqueInput[];
    update?: Prisma.school_ownership_recordsUpdateWithWhereUniqueWithoutSchool_ownership_docsInput | Prisma.school_ownership_recordsUpdateWithWhereUniqueWithoutSchool_ownership_docsInput[];
    updateMany?: Prisma.school_ownership_recordsUpdateManyWithWhereWithoutSchool_ownership_docsInput | Prisma.school_ownership_recordsUpdateManyWithWhereWithoutSchool_ownership_docsInput[];
    deleteMany?: Prisma.school_ownership_recordsScalarWhereInput | Prisma.school_ownership_recordsScalarWhereInput[];
};
export type school_ownership_recordsUncheckedUpdateManyWithoutSchool_ownership_docsNestedInput = {
    create?: Prisma.XOR<Prisma.school_ownership_recordsCreateWithoutSchool_ownership_docsInput, Prisma.school_ownership_recordsUncheckedCreateWithoutSchool_ownership_docsInput> | Prisma.school_ownership_recordsCreateWithoutSchool_ownership_docsInput[] | Prisma.school_ownership_recordsUncheckedCreateWithoutSchool_ownership_docsInput[];
    connectOrCreate?: Prisma.school_ownership_recordsCreateOrConnectWithoutSchool_ownership_docsInput | Prisma.school_ownership_recordsCreateOrConnectWithoutSchool_ownership_docsInput[];
    upsert?: Prisma.school_ownership_recordsUpsertWithWhereUniqueWithoutSchool_ownership_docsInput | Prisma.school_ownership_recordsUpsertWithWhereUniqueWithoutSchool_ownership_docsInput[];
    createMany?: Prisma.school_ownership_recordsCreateManySchool_ownership_docsInputEnvelope;
    set?: Prisma.school_ownership_recordsWhereUniqueInput | Prisma.school_ownership_recordsWhereUniqueInput[];
    disconnect?: Prisma.school_ownership_recordsWhereUniqueInput | Prisma.school_ownership_recordsWhereUniqueInput[];
    delete?: Prisma.school_ownership_recordsWhereUniqueInput | Prisma.school_ownership_recordsWhereUniqueInput[];
    connect?: Prisma.school_ownership_recordsWhereUniqueInput | Prisma.school_ownership_recordsWhereUniqueInput[];
    update?: Prisma.school_ownership_recordsUpdateWithWhereUniqueWithoutSchool_ownership_docsInput | Prisma.school_ownership_recordsUpdateWithWhereUniqueWithoutSchool_ownership_docsInput[];
    updateMany?: Prisma.school_ownership_recordsUpdateManyWithWhereWithoutSchool_ownership_docsInput | Prisma.school_ownership_recordsUpdateManyWithWhereWithoutSchool_ownership_docsInput[];
    deleteMany?: Prisma.school_ownership_recordsScalarWhereInput | Prisma.school_ownership_recordsScalarWhereInput[];
};
export type school_ownership_recordsCreateWithoutSchool_ownership_docsInput = {
    iern: string;
    ownership_type: string;
    document_type?: string | null;
    created_at?: Date | string | null;
    school_yr?: string | null;
};
export type school_ownership_recordsUncheckedCreateWithoutSchool_ownership_docsInput = {
    id?: number;
    iern: string;
    ownership_type: string;
    document_type?: string | null;
    created_at?: Date | string | null;
    school_yr?: string | null;
};
export type school_ownership_recordsCreateOrConnectWithoutSchool_ownership_docsInput = {
    where: Prisma.school_ownership_recordsWhereUniqueInput;
    create: Prisma.XOR<Prisma.school_ownership_recordsCreateWithoutSchool_ownership_docsInput, Prisma.school_ownership_recordsUncheckedCreateWithoutSchool_ownership_docsInput>;
};
export type school_ownership_recordsCreateManySchool_ownership_docsInputEnvelope = {
    data: Prisma.school_ownership_recordsCreateManySchool_ownership_docsInput | Prisma.school_ownership_recordsCreateManySchool_ownership_docsInput[];
    skipDuplicates?: boolean;
};
export type school_ownership_recordsUpsertWithWhereUniqueWithoutSchool_ownership_docsInput = {
    where: Prisma.school_ownership_recordsWhereUniqueInput;
    update: Prisma.XOR<Prisma.school_ownership_recordsUpdateWithoutSchool_ownership_docsInput, Prisma.school_ownership_recordsUncheckedUpdateWithoutSchool_ownership_docsInput>;
    create: Prisma.XOR<Prisma.school_ownership_recordsCreateWithoutSchool_ownership_docsInput, Prisma.school_ownership_recordsUncheckedCreateWithoutSchool_ownership_docsInput>;
};
export type school_ownership_recordsUpdateWithWhereUniqueWithoutSchool_ownership_docsInput = {
    where: Prisma.school_ownership_recordsWhereUniqueInput;
    data: Prisma.XOR<Prisma.school_ownership_recordsUpdateWithoutSchool_ownership_docsInput, Prisma.school_ownership_recordsUncheckedUpdateWithoutSchool_ownership_docsInput>;
};
export type school_ownership_recordsUpdateManyWithWhereWithoutSchool_ownership_docsInput = {
    where: Prisma.school_ownership_recordsScalarWhereInput;
    data: Prisma.XOR<Prisma.school_ownership_recordsUpdateManyMutationInput, Prisma.school_ownership_recordsUncheckedUpdateManyWithoutSchool_ownership_docsInput>;
};
export type school_ownership_recordsScalarWhereInput = {
    AND?: Prisma.school_ownership_recordsScalarWhereInput | Prisma.school_ownership_recordsScalarWhereInput[];
    OR?: Prisma.school_ownership_recordsScalarWhereInput[];
    NOT?: Prisma.school_ownership_recordsScalarWhereInput | Prisma.school_ownership_recordsScalarWhereInput[];
    id?: Prisma.IntFilter<"school_ownership_records"> | number;
    iern?: Prisma.StringFilter<"school_ownership_records"> | string;
    ownership_type?: Prisma.StringFilter<"school_ownership_records"> | string;
    document_type?: Prisma.StringNullableFilter<"school_ownership_records"> | string | null;
    ownership_doc_id?: Prisma.IntNullableFilter<"school_ownership_records"> | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"school_ownership_records"> | Date | string | null;
    school_yr?: Prisma.StringNullableFilter<"school_ownership_records"> | string | null;
};
export type school_ownership_recordsCreateManySchool_ownership_docsInput = {
    id?: number;
    iern: string;
    ownership_type: string;
    document_type?: string | null;
    created_at?: Date | string | null;
    school_yr?: string | null;
};
export type school_ownership_recordsUpdateWithoutSchool_ownership_docsInput = {
    iern?: Prisma.StringFieldUpdateOperationsInput | string;
    ownership_type?: Prisma.StringFieldUpdateOperationsInput | string;
    document_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    school_yr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type school_ownership_recordsUncheckedUpdateWithoutSchool_ownership_docsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    iern?: Prisma.StringFieldUpdateOperationsInput | string;
    ownership_type?: Prisma.StringFieldUpdateOperationsInput | string;
    document_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    school_yr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type school_ownership_recordsUncheckedUpdateManyWithoutSchool_ownership_docsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    iern?: Prisma.StringFieldUpdateOperationsInput | string;
    ownership_type?: Prisma.StringFieldUpdateOperationsInput | string;
    document_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    school_yr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type school_ownership_recordsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    iern?: boolean;
    ownership_type?: boolean;
    document_type?: boolean;
    ownership_doc_id?: boolean;
    created_at?: boolean;
    school_yr?: boolean;
    school_ownership_docs?: boolean | Prisma.school_ownership_records$school_ownership_docsArgs<ExtArgs>;
}, ExtArgs["result"]["school_ownership_records"]>;
export type school_ownership_recordsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    iern?: boolean;
    ownership_type?: boolean;
    document_type?: boolean;
    ownership_doc_id?: boolean;
    created_at?: boolean;
    school_yr?: boolean;
    school_ownership_docs?: boolean | Prisma.school_ownership_records$school_ownership_docsArgs<ExtArgs>;
}, ExtArgs["result"]["school_ownership_records"]>;
export type school_ownership_recordsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    iern?: boolean;
    ownership_type?: boolean;
    document_type?: boolean;
    ownership_doc_id?: boolean;
    created_at?: boolean;
    school_yr?: boolean;
    school_ownership_docs?: boolean | Prisma.school_ownership_records$school_ownership_docsArgs<ExtArgs>;
}, ExtArgs["result"]["school_ownership_records"]>;
export type school_ownership_recordsSelectScalar = {
    id?: boolean;
    iern?: boolean;
    ownership_type?: boolean;
    document_type?: boolean;
    ownership_doc_id?: boolean;
    created_at?: boolean;
    school_yr?: boolean;
};
export type school_ownership_recordsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "iern" | "ownership_type" | "document_type" | "ownership_doc_id" | "created_at" | "school_yr", ExtArgs["result"]["school_ownership_records"]>;
export type school_ownership_recordsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    school_ownership_docs?: boolean | Prisma.school_ownership_records$school_ownership_docsArgs<ExtArgs>;
};
export type school_ownership_recordsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    school_ownership_docs?: boolean | Prisma.school_ownership_records$school_ownership_docsArgs<ExtArgs>;
};
export type school_ownership_recordsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    school_ownership_docs?: boolean | Prisma.school_ownership_records$school_ownership_docsArgs<ExtArgs>;
};
export type $school_ownership_recordsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "school_ownership_records";
    objects: {
        school_ownership_docs: Prisma.$school_ownership_docsPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        iern: string;
        ownership_type: string;
        document_type: string | null;
        ownership_doc_id: number | null;
        created_at: Date | null;
        school_yr: string | null;
    }, ExtArgs["result"]["school_ownership_records"]>;
    composites: {};
};
export type school_ownership_recordsGetPayload<S extends boolean | null | undefined | school_ownership_recordsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$school_ownership_recordsPayload, S>;
export type school_ownership_recordsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<school_ownership_recordsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: School_ownership_recordsCountAggregateInputType | true;
};
export interface school_ownership_recordsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['school_ownership_records'];
        meta: {
            name: 'school_ownership_records';
        };
    };
    findUnique<T extends school_ownership_recordsFindUniqueArgs>(args: Prisma.SelectSubset<T, school_ownership_recordsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__school_ownership_recordsClient<runtime.Types.Result.GetResult<Prisma.$school_ownership_recordsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends school_ownership_recordsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, school_ownership_recordsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__school_ownership_recordsClient<runtime.Types.Result.GetResult<Prisma.$school_ownership_recordsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends school_ownership_recordsFindFirstArgs>(args?: Prisma.SelectSubset<T, school_ownership_recordsFindFirstArgs<ExtArgs>>): Prisma.Prisma__school_ownership_recordsClient<runtime.Types.Result.GetResult<Prisma.$school_ownership_recordsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends school_ownership_recordsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, school_ownership_recordsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__school_ownership_recordsClient<runtime.Types.Result.GetResult<Prisma.$school_ownership_recordsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends school_ownership_recordsFindManyArgs>(args?: Prisma.SelectSubset<T, school_ownership_recordsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$school_ownership_recordsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends school_ownership_recordsCreateArgs>(args: Prisma.SelectSubset<T, school_ownership_recordsCreateArgs<ExtArgs>>): Prisma.Prisma__school_ownership_recordsClient<runtime.Types.Result.GetResult<Prisma.$school_ownership_recordsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends school_ownership_recordsCreateManyArgs>(args?: Prisma.SelectSubset<T, school_ownership_recordsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends school_ownership_recordsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, school_ownership_recordsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$school_ownership_recordsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends school_ownership_recordsDeleteArgs>(args: Prisma.SelectSubset<T, school_ownership_recordsDeleteArgs<ExtArgs>>): Prisma.Prisma__school_ownership_recordsClient<runtime.Types.Result.GetResult<Prisma.$school_ownership_recordsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends school_ownership_recordsUpdateArgs>(args: Prisma.SelectSubset<T, school_ownership_recordsUpdateArgs<ExtArgs>>): Prisma.Prisma__school_ownership_recordsClient<runtime.Types.Result.GetResult<Prisma.$school_ownership_recordsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends school_ownership_recordsDeleteManyArgs>(args?: Prisma.SelectSubset<T, school_ownership_recordsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends school_ownership_recordsUpdateManyArgs>(args: Prisma.SelectSubset<T, school_ownership_recordsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends school_ownership_recordsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, school_ownership_recordsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$school_ownership_recordsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends school_ownership_recordsUpsertArgs>(args: Prisma.SelectSubset<T, school_ownership_recordsUpsertArgs<ExtArgs>>): Prisma.Prisma__school_ownership_recordsClient<runtime.Types.Result.GetResult<Prisma.$school_ownership_recordsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends school_ownership_recordsCountArgs>(args?: Prisma.Subset<T, school_ownership_recordsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], School_ownership_recordsCountAggregateOutputType> : number>;
    aggregate<T extends School_ownership_recordsAggregateArgs>(args: Prisma.Subset<T, School_ownership_recordsAggregateArgs>): Prisma.PrismaPromise<GetSchool_ownership_recordsAggregateType<T>>;
    groupBy<T extends school_ownership_recordsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: school_ownership_recordsGroupByArgs['orderBy'];
    } : {
        orderBy?: school_ownership_recordsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, school_ownership_recordsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSchool_ownership_recordsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: school_ownership_recordsFieldRefs;
}
export interface Prisma__school_ownership_recordsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    school_ownership_docs<T extends Prisma.school_ownership_records$school_ownership_docsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.school_ownership_records$school_ownership_docsArgs<ExtArgs>>): Prisma.Prisma__school_ownership_docsClient<runtime.Types.Result.GetResult<Prisma.$school_ownership_docsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface school_ownership_recordsFieldRefs {
    readonly id: Prisma.FieldRef<"school_ownership_records", 'Int'>;
    readonly iern: Prisma.FieldRef<"school_ownership_records", 'String'>;
    readonly ownership_type: Prisma.FieldRef<"school_ownership_records", 'String'>;
    readonly document_type: Prisma.FieldRef<"school_ownership_records", 'String'>;
    readonly ownership_doc_id: Prisma.FieldRef<"school_ownership_records", 'Int'>;
    readonly created_at: Prisma.FieldRef<"school_ownership_records", 'DateTime'>;
    readonly school_yr: Prisma.FieldRef<"school_ownership_records", 'String'>;
}
export type school_ownership_recordsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_recordsSelect<ExtArgs> | null;
    omit?: Prisma.school_ownership_recordsOmit<ExtArgs> | null;
    include?: Prisma.school_ownership_recordsInclude<ExtArgs> | null;
    where: Prisma.school_ownership_recordsWhereUniqueInput;
};
export type school_ownership_recordsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_recordsSelect<ExtArgs> | null;
    omit?: Prisma.school_ownership_recordsOmit<ExtArgs> | null;
    include?: Prisma.school_ownership_recordsInclude<ExtArgs> | null;
    where: Prisma.school_ownership_recordsWhereUniqueInput;
};
export type school_ownership_recordsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_recordsSelect<ExtArgs> | null;
    omit?: Prisma.school_ownership_recordsOmit<ExtArgs> | null;
    include?: Prisma.school_ownership_recordsInclude<ExtArgs> | null;
    where?: Prisma.school_ownership_recordsWhereInput;
    orderBy?: Prisma.school_ownership_recordsOrderByWithRelationInput | Prisma.school_ownership_recordsOrderByWithRelationInput[];
    cursor?: Prisma.school_ownership_recordsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.School_ownership_recordsScalarFieldEnum | Prisma.School_ownership_recordsScalarFieldEnum[];
};
export type school_ownership_recordsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_recordsSelect<ExtArgs> | null;
    omit?: Prisma.school_ownership_recordsOmit<ExtArgs> | null;
    include?: Prisma.school_ownership_recordsInclude<ExtArgs> | null;
    where?: Prisma.school_ownership_recordsWhereInput;
    orderBy?: Prisma.school_ownership_recordsOrderByWithRelationInput | Prisma.school_ownership_recordsOrderByWithRelationInput[];
    cursor?: Prisma.school_ownership_recordsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.School_ownership_recordsScalarFieldEnum | Prisma.School_ownership_recordsScalarFieldEnum[];
};
export type school_ownership_recordsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_recordsSelect<ExtArgs> | null;
    omit?: Prisma.school_ownership_recordsOmit<ExtArgs> | null;
    include?: Prisma.school_ownership_recordsInclude<ExtArgs> | null;
    where?: Prisma.school_ownership_recordsWhereInput;
    orderBy?: Prisma.school_ownership_recordsOrderByWithRelationInput | Prisma.school_ownership_recordsOrderByWithRelationInput[];
    cursor?: Prisma.school_ownership_recordsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.School_ownership_recordsScalarFieldEnum | Prisma.School_ownership_recordsScalarFieldEnum[];
};
export type school_ownership_recordsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_recordsSelect<ExtArgs> | null;
    omit?: Prisma.school_ownership_recordsOmit<ExtArgs> | null;
    include?: Prisma.school_ownership_recordsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.school_ownership_recordsCreateInput, Prisma.school_ownership_recordsUncheckedCreateInput>;
};
export type school_ownership_recordsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.school_ownership_recordsCreateManyInput | Prisma.school_ownership_recordsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type school_ownership_recordsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_recordsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.school_ownership_recordsOmit<ExtArgs> | null;
    data: Prisma.school_ownership_recordsCreateManyInput | Prisma.school_ownership_recordsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.school_ownership_recordsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type school_ownership_recordsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_recordsSelect<ExtArgs> | null;
    omit?: Prisma.school_ownership_recordsOmit<ExtArgs> | null;
    include?: Prisma.school_ownership_recordsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.school_ownership_recordsUpdateInput, Prisma.school_ownership_recordsUncheckedUpdateInput>;
    where: Prisma.school_ownership_recordsWhereUniqueInput;
};
export type school_ownership_recordsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.school_ownership_recordsUpdateManyMutationInput, Prisma.school_ownership_recordsUncheckedUpdateManyInput>;
    where?: Prisma.school_ownership_recordsWhereInput;
    limit?: number;
};
export type school_ownership_recordsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_recordsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.school_ownership_recordsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.school_ownership_recordsUpdateManyMutationInput, Prisma.school_ownership_recordsUncheckedUpdateManyInput>;
    where?: Prisma.school_ownership_recordsWhereInput;
    limit?: number;
    include?: Prisma.school_ownership_recordsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type school_ownership_recordsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_recordsSelect<ExtArgs> | null;
    omit?: Prisma.school_ownership_recordsOmit<ExtArgs> | null;
    include?: Prisma.school_ownership_recordsInclude<ExtArgs> | null;
    where: Prisma.school_ownership_recordsWhereUniqueInput;
    create: Prisma.XOR<Prisma.school_ownership_recordsCreateInput, Prisma.school_ownership_recordsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.school_ownership_recordsUpdateInput, Prisma.school_ownership_recordsUncheckedUpdateInput>;
};
export type school_ownership_recordsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_recordsSelect<ExtArgs> | null;
    omit?: Prisma.school_ownership_recordsOmit<ExtArgs> | null;
    include?: Prisma.school_ownership_recordsInclude<ExtArgs> | null;
    where: Prisma.school_ownership_recordsWhereUniqueInput;
};
export type school_ownership_recordsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.school_ownership_recordsWhereInput;
    limit?: number;
};
export type school_ownership_records$school_ownership_docsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_docsSelect<ExtArgs> | null;
    omit?: Prisma.school_ownership_docsOmit<ExtArgs> | null;
    include?: Prisma.school_ownership_docsInclude<ExtArgs> | null;
    where?: Prisma.school_ownership_docsWhereInput;
};
export type school_ownership_recordsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_recordsSelect<ExtArgs> | null;
    omit?: Prisma.school_ownership_recordsOmit<ExtArgs> | null;
    include?: Prisma.school_ownership_recordsInclude<ExtArgs> | null;
};
