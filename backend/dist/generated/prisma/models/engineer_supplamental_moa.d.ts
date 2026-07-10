import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type engineer_supplamental_moaModel = runtime.Types.Result.DefaultSelection<Prisma.$engineer_supplamental_moaPayload>;
export type AggregateEngineer_supplamental_moa = {
    _count: Engineer_supplamental_moaCountAggregateOutputType | null;
    _min: Engineer_supplamental_moaMinAggregateOutputType | null;
    _max: Engineer_supplamental_moaMaxAggregateOutputType | null;
};
export type Engineer_supplamental_moaMinAggregateOutputType = {
    supplamental_moa_id: string | null;
    mother_moa_id: string | null;
    moa_pdf: string | null;
    uploaded_by: string | null;
    created_at: Date | null;
};
export type Engineer_supplamental_moaMaxAggregateOutputType = {
    supplamental_moa_id: string | null;
    mother_moa_id: string | null;
    moa_pdf: string | null;
    uploaded_by: string | null;
    created_at: Date | null;
};
export type Engineer_supplamental_moaCountAggregateOutputType = {
    supplamental_moa_id: number;
    mother_moa_id: number;
    moa_pdf: number;
    uploaded_by: number;
    created_at: number;
    ipc_ids: number;
    _all: number;
};
export type Engineer_supplamental_moaMinAggregateInputType = {
    supplamental_moa_id?: true;
    mother_moa_id?: true;
    moa_pdf?: true;
    uploaded_by?: true;
    created_at?: true;
};
export type Engineer_supplamental_moaMaxAggregateInputType = {
    supplamental_moa_id?: true;
    mother_moa_id?: true;
    moa_pdf?: true;
    uploaded_by?: true;
    created_at?: true;
};
export type Engineer_supplamental_moaCountAggregateInputType = {
    supplamental_moa_id?: true;
    mother_moa_id?: true;
    moa_pdf?: true;
    uploaded_by?: true;
    created_at?: true;
    ipc_ids?: true;
    _all?: true;
};
export type Engineer_supplamental_moaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.engineer_supplamental_moaWhereInput;
    orderBy?: Prisma.engineer_supplamental_moaOrderByWithRelationInput | Prisma.engineer_supplamental_moaOrderByWithRelationInput[];
    cursor?: Prisma.engineer_supplamental_moaWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Engineer_supplamental_moaCountAggregateInputType;
    _min?: Engineer_supplamental_moaMinAggregateInputType;
    _max?: Engineer_supplamental_moaMaxAggregateInputType;
};
export type GetEngineer_supplamental_moaAggregateType<T extends Engineer_supplamental_moaAggregateArgs> = {
    [P in keyof T & keyof AggregateEngineer_supplamental_moa]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEngineer_supplamental_moa[P]> : Prisma.GetScalarType<T[P], AggregateEngineer_supplamental_moa[P]>;
};
export type engineer_supplamental_moaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.engineer_supplamental_moaWhereInput;
    orderBy?: Prisma.engineer_supplamental_moaOrderByWithAggregationInput | Prisma.engineer_supplamental_moaOrderByWithAggregationInput[];
    by: Prisma.Engineer_supplamental_moaScalarFieldEnum[] | Prisma.Engineer_supplamental_moaScalarFieldEnum;
    having?: Prisma.engineer_supplamental_moaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Engineer_supplamental_moaCountAggregateInputType | true;
    _min?: Engineer_supplamental_moaMinAggregateInputType;
    _max?: Engineer_supplamental_moaMaxAggregateInputType;
};
export type Engineer_supplamental_moaGroupByOutputType = {
    supplamental_moa_id: string;
    mother_moa_id: string | null;
    moa_pdf: string | null;
    uploaded_by: string | null;
    created_at: Date | null;
    ipc_ids: runtime.JsonValue | null;
    _count: Engineer_supplamental_moaCountAggregateOutputType | null;
    _min: Engineer_supplamental_moaMinAggregateOutputType | null;
    _max: Engineer_supplamental_moaMaxAggregateOutputType | null;
};
export type GetEngineer_supplamental_moaGroupByPayload<T extends engineer_supplamental_moaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Engineer_supplamental_moaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Engineer_supplamental_moaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Engineer_supplamental_moaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Engineer_supplamental_moaGroupByOutputType[P]>;
}>>;
export type engineer_supplamental_moaWhereInput = {
    AND?: Prisma.engineer_supplamental_moaWhereInput | Prisma.engineer_supplamental_moaWhereInput[];
    OR?: Prisma.engineer_supplamental_moaWhereInput[];
    NOT?: Prisma.engineer_supplamental_moaWhereInput | Prisma.engineer_supplamental_moaWhereInput[];
    supplamental_moa_id?: Prisma.StringFilter<"engineer_supplamental_moa"> | string;
    mother_moa_id?: Prisma.StringNullableFilter<"engineer_supplamental_moa"> | string | null;
    moa_pdf?: Prisma.StringNullableFilter<"engineer_supplamental_moa"> | string | null;
    uploaded_by?: Prisma.StringNullableFilter<"engineer_supplamental_moa"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"engineer_supplamental_moa"> | Date | string | null;
    ipc_ids?: Prisma.JsonNullableFilter<"engineer_supplamental_moa">;
    engineer_mother_moa?: Prisma.XOR<Prisma.Engineer_mother_moaNullableScalarRelationFilter, Prisma.engineer_mother_moaWhereInput> | null;
};
export type engineer_supplamental_moaOrderByWithRelationInput = {
    supplamental_moa_id?: Prisma.SortOrder;
    mother_moa_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    moa_pdf?: Prisma.SortOrderInput | Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipc_ids?: Prisma.SortOrderInput | Prisma.SortOrder;
    engineer_mother_moa?: Prisma.engineer_mother_moaOrderByWithRelationInput;
};
export type engineer_supplamental_moaWhereUniqueInput = Prisma.AtLeast<{
    supplamental_moa_id?: string;
    AND?: Prisma.engineer_supplamental_moaWhereInput | Prisma.engineer_supplamental_moaWhereInput[];
    OR?: Prisma.engineer_supplamental_moaWhereInput[];
    NOT?: Prisma.engineer_supplamental_moaWhereInput | Prisma.engineer_supplamental_moaWhereInput[];
    mother_moa_id?: Prisma.StringNullableFilter<"engineer_supplamental_moa"> | string | null;
    moa_pdf?: Prisma.StringNullableFilter<"engineer_supplamental_moa"> | string | null;
    uploaded_by?: Prisma.StringNullableFilter<"engineer_supplamental_moa"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"engineer_supplamental_moa"> | Date | string | null;
    ipc_ids?: Prisma.JsonNullableFilter<"engineer_supplamental_moa">;
    engineer_mother_moa?: Prisma.XOR<Prisma.Engineer_mother_moaNullableScalarRelationFilter, Prisma.engineer_mother_moaWhereInput> | null;
}, "supplamental_moa_id">;
export type engineer_supplamental_moaOrderByWithAggregationInput = {
    supplamental_moa_id?: Prisma.SortOrder;
    mother_moa_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    moa_pdf?: Prisma.SortOrderInput | Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipc_ids?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.engineer_supplamental_moaCountOrderByAggregateInput;
    _max?: Prisma.engineer_supplamental_moaMaxOrderByAggregateInput;
    _min?: Prisma.engineer_supplamental_moaMinOrderByAggregateInput;
};
export type engineer_supplamental_moaScalarWhereWithAggregatesInput = {
    AND?: Prisma.engineer_supplamental_moaScalarWhereWithAggregatesInput | Prisma.engineer_supplamental_moaScalarWhereWithAggregatesInput[];
    OR?: Prisma.engineer_supplamental_moaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.engineer_supplamental_moaScalarWhereWithAggregatesInput | Prisma.engineer_supplamental_moaScalarWhereWithAggregatesInput[];
    supplamental_moa_id?: Prisma.StringWithAggregatesFilter<"engineer_supplamental_moa"> | string;
    mother_moa_id?: Prisma.StringNullableWithAggregatesFilter<"engineer_supplamental_moa"> | string | null;
    moa_pdf?: Prisma.StringNullableWithAggregatesFilter<"engineer_supplamental_moa"> | string | null;
    uploaded_by?: Prisma.StringNullableWithAggregatesFilter<"engineer_supplamental_moa"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"engineer_supplamental_moa"> | Date | string | null;
    ipc_ids?: Prisma.JsonNullableWithAggregatesFilter<"engineer_supplamental_moa">;
};
export type engineer_supplamental_moaCreateInput = {
    supplamental_moa_id?: string;
    moa_pdf?: string | null;
    uploaded_by?: string | null;
    created_at?: Date | string | null;
    ipc_ids?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    engineer_mother_moa?: Prisma.engineer_mother_moaCreateNestedOneWithoutEngineer_supplamental_moaInput;
};
export type engineer_supplamental_moaUncheckedCreateInput = {
    supplamental_moa_id?: string;
    mother_moa_id?: string | null;
    moa_pdf?: string | null;
    uploaded_by?: string | null;
    created_at?: Date | string | null;
    ipc_ids?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type engineer_supplamental_moaUpdateInput = {
    supplamental_moa_id?: Prisma.StringFieldUpdateOperationsInput | string;
    moa_pdf?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ipc_ids?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    engineer_mother_moa?: Prisma.engineer_mother_moaUpdateOneWithoutEngineer_supplamental_moaNestedInput;
};
export type engineer_supplamental_moaUncheckedUpdateInput = {
    supplamental_moa_id?: Prisma.StringFieldUpdateOperationsInput | string;
    mother_moa_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    moa_pdf?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ipc_ids?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type engineer_supplamental_moaCreateManyInput = {
    supplamental_moa_id?: string;
    mother_moa_id?: string | null;
    moa_pdf?: string | null;
    uploaded_by?: string | null;
    created_at?: Date | string | null;
    ipc_ids?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type engineer_supplamental_moaUpdateManyMutationInput = {
    supplamental_moa_id?: Prisma.StringFieldUpdateOperationsInput | string;
    moa_pdf?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ipc_ids?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type engineer_supplamental_moaUncheckedUpdateManyInput = {
    supplamental_moa_id?: Prisma.StringFieldUpdateOperationsInput | string;
    mother_moa_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    moa_pdf?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ipc_ids?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type Engineer_supplamental_moaListRelationFilter = {
    every?: Prisma.engineer_supplamental_moaWhereInput;
    some?: Prisma.engineer_supplamental_moaWhereInput;
    none?: Prisma.engineer_supplamental_moaWhereInput;
};
export type engineer_supplamental_moaOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type engineer_supplamental_moaCountOrderByAggregateInput = {
    supplamental_moa_id?: Prisma.SortOrder;
    mother_moa_id?: Prisma.SortOrder;
    moa_pdf?: Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    ipc_ids?: Prisma.SortOrder;
};
export type engineer_supplamental_moaMaxOrderByAggregateInput = {
    supplamental_moa_id?: Prisma.SortOrder;
    mother_moa_id?: Prisma.SortOrder;
    moa_pdf?: Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type engineer_supplamental_moaMinOrderByAggregateInput = {
    supplamental_moa_id?: Prisma.SortOrder;
    mother_moa_id?: Prisma.SortOrder;
    moa_pdf?: Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type engineer_supplamental_moaCreateNestedManyWithoutEngineer_mother_moaInput = {
    create?: Prisma.XOR<Prisma.engineer_supplamental_moaCreateWithoutEngineer_mother_moaInput, Prisma.engineer_supplamental_moaUncheckedCreateWithoutEngineer_mother_moaInput> | Prisma.engineer_supplamental_moaCreateWithoutEngineer_mother_moaInput[] | Prisma.engineer_supplamental_moaUncheckedCreateWithoutEngineer_mother_moaInput[];
    connectOrCreate?: Prisma.engineer_supplamental_moaCreateOrConnectWithoutEngineer_mother_moaInput | Prisma.engineer_supplamental_moaCreateOrConnectWithoutEngineer_mother_moaInput[];
    createMany?: Prisma.engineer_supplamental_moaCreateManyEngineer_mother_moaInputEnvelope;
    connect?: Prisma.engineer_supplamental_moaWhereUniqueInput | Prisma.engineer_supplamental_moaWhereUniqueInput[];
};
export type engineer_supplamental_moaUncheckedCreateNestedManyWithoutEngineer_mother_moaInput = {
    create?: Prisma.XOR<Prisma.engineer_supplamental_moaCreateWithoutEngineer_mother_moaInput, Prisma.engineer_supplamental_moaUncheckedCreateWithoutEngineer_mother_moaInput> | Prisma.engineer_supplamental_moaCreateWithoutEngineer_mother_moaInput[] | Prisma.engineer_supplamental_moaUncheckedCreateWithoutEngineer_mother_moaInput[];
    connectOrCreate?: Prisma.engineer_supplamental_moaCreateOrConnectWithoutEngineer_mother_moaInput | Prisma.engineer_supplamental_moaCreateOrConnectWithoutEngineer_mother_moaInput[];
    createMany?: Prisma.engineer_supplamental_moaCreateManyEngineer_mother_moaInputEnvelope;
    connect?: Prisma.engineer_supplamental_moaWhereUniqueInput | Prisma.engineer_supplamental_moaWhereUniqueInput[];
};
export type engineer_supplamental_moaUpdateManyWithoutEngineer_mother_moaNestedInput = {
    create?: Prisma.XOR<Prisma.engineer_supplamental_moaCreateWithoutEngineer_mother_moaInput, Prisma.engineer_supplamental_moaUncheckedCreateWithoutEngineer_mother_moaInput> | Prisma.engineer_supplamental_moaCreateWithoutEngineer_mother_moaInput[] | Prisma.engineer_supplamental_moaUncheckedCreateWithoutEngineer_mother_moaInput[];
    connectOrCreate?: Prisma.engineer_supplamental_moaCreateOrConnectWithoutEngineer_mother_moaInput | Prisma.engineer_supplamental_moaCreateOrConnectWithoutEngineer_mother_moaInput[];
    upsert?: Prisma.engineer_supplamental_moaUpsertWithWhereUniqueWithoutEngineer_mother_moaInput | Prisma.engineer_supplamental_moaUpsertWithWhereUniqueWithoutEngineer_mother_moaInput[];
    createMany?: Prisma.engineer_supplamental_moaCreateManyEngineer_mother_moaInputEnvelope;
    set?: Prisma.engineer_supplamental_moaWhereUniqueInput | Prisma.engineer_supplamental_moaWhereUniqueInput[];
    disconnect?: Prisma.engineer_supplamental_moaWhereUniqueInput | Prisma.engineer_supplamental_moaWhereUniqueInput[];
    delete?: Prisma.engineer_supplamental_moaWhereUniqueInput | Prisma.engineer_supplamental_moaWhereUniqueInput[];
    connect?: Prisma.engineer_supplamental_moaWhereUniqueInput | Prisma.engineer_supplamental_moaWhereUniqueInput[];
    update?: Prisma.engineer_supplamental_moaUpdateWithWhereUniqueWithoutEngineer_mother_moaInput | Prisma.engineer_supplamental_moaUpdateWithWhereUniqueWithoutEngineer_mother_moaInput[];
    updateMany?: Prisma.engineer_supplamental_moaUpdateManyWithWhereWithoutEngineer_mother_moaInput | Prisma.engineer_supplamental_moaUpdateManyWithWhereWithoutEngineer_mother_moaInput[];
    deleteMany?: Prisma.engineer_supplamental_moaScalarWhereInput | Prisma.engineer_supplamental_moaScalarWhereInput[];
};
export type engineer_supplamental_moaUncheckedUpdateManyWithoutEngineer_mother_moaNestedInput = {
    create?: Prisma.XOR<Prisma.engineer_supplamental_moaCreateWithoutEngineer_mother_moaInput, Prisma.engineer_supplamental_moaUncheckedCreateWithoutEngineer_mother_moaInput> | Prisma.engineer_supplamental_moaCreateWithoutEngineer_mother_moaInput[] | Prisma.engineer_supplamental_moaUncheckedCreateWithoutEngineer_mother_moaInput[];
    connectOrCreate?: Prisma.engineer_supplamental_moaCreateOrConnectWithoutEngineer_mother_moaInput | Prisma.engineer_supplamental_moaCreateOrConnectWithoutEngineer_mother_moaInput[];
    upsert?: Prisma.engineer_supplamental_moaUpsertWithWhereUniqueWithoutEngineer_mother_moaInput | Prisma.engineer_supplamental_moaUpsertWithWhereUniqueWithoutEngineer_mother_moaInput[];
    createMany?: Prisma.engineer_supplamental_moaCreateManyEngineer_mother_moaInputEnvelope;
    set?: Prisma.engineer_supplamental_moaWhereUniqueInput | Prisma.engineer_supplamental_moaWhereUniqueInput[];
    disconnect?: Prisma.engineer_supplamental_moaWhereUniqueInput | Prisma.engineer_supplamental_moaWhereUniqueInput[];
    delete?: Prisma.engineer_supplamental_moaWhereUniqueInput | Prisma.engineer_supplamental_moaWhereUniqueInput[];
    connect?: Prisma.engineer_supplamental_moaWhereUniqueInput | Prisma.engineer_supplamental_moaWhereUniqueInput[];
    update?: Prisma.engineer_supplamental_moaUpdateWithWhereUniqueWithoutEngineer_mother_moaInput | Prisma.engineer_supplamental_moaUpdateWithWhereUniqueWithoutEngineer_mother_moaInput[];
    updateMany?: Prisma.engineer_supplamental_moaUpdateManyWithWhereWithoutEngineer_mother_moaInput | Prisma.engineer_supplamental_moaUpdateManyWithWhereWithoutEngineer_mother_moaInput[];
    deleteMany?: Prisma.engineer_supplamental_moaScalarWhereInput | Prisma.engineer_supplamental_moaScalarWhereInput[];
};
export type engineer_supplamental_moaCreateWithoutEngineer_mother_moaInput = {
    supplamental_moa_id?: string;
    moa_pdf?: string | null;
    uploaded_by?: string | null;
    created_at?: Date | string | null;
    ipc_ids?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type engineer_supplamental_moaUncheckedCreateWithoutEngineer_mother_moaInput = {
    supplamental_moa_id?: string;
    moa_pdf?: string | null;
    uploaded_by?: string | null;
    created_at?: Date | string | null;
    ipc_ids?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type engineer_supplamental_moaCreateOrConnectWithoutEngineer_mother_moaInput = {
    where: Prisma.engineer_supplamental_moaWhereUniqueInput;
    create: Prisma.XOR<Prisma.engineer_supplamental_moaCreateWithoutEngineer_mother_moaInput, Prisma.engineer_supplamental_moaUncheckedCreateWithoutEngineer_mother_moaInput>;
};
export type engineer_supplamental_moaCreateManyEngineer_mother_moaInputEnvelope = {
    data: Prisma.engineer_supplamental_moaCreateManyEngineer_mother_moaInput | Prisma.engineer_supplamental_moaCreateManyEngineer_mother_moaInput[];
    skipDuplicates?: boolean;
};
export type engineer_supplamental_moaUpsertWithWhereUniqueWithoutEngineer_mother_moaInput = {
    where: Prisma.engineer_supplamental_moaWhereUniqueInput;
    update: Prisma.XOR<Prisma.engineer_supplamental_moaUpdateWithoutEngineer_mother_moaInput, Prisma.engineer_supplamental_moaUncheckedUpdateWithoutEngineer_mother_moaInput>;
    create: Prisma.XOR<Prisma.engineer_supplamental_moaCreateWithoutEngineer_mother_moaInput, Prisma.engineer_supplamental_moaUncheckedCreateWithoutEngineer_mother_moaInput>;
};
export type engineer_supplamental_moaUpdateWithWhereUniqueWithoutEngineer_mother_moaInput = {
    where: Prisma.engineer_supplamental_moaWhereUniqueInput;
    data: Prisma.XOR<Prisma.engineer_supplamental_moaUpdateWithoutEngineer_mother_moaInput, Prisma.engineer_supplamental_moaUncheckedUpdateWithoutEngineer_mother_moaInput>;
};
export type engineer_supplamental_moaUpdateManyWithWhereWithoutEngineer_mother_moaInput = {
    where: Prisma.engineer_supplamental_moaScalarWhereInput;
    data: Prisma.XOR<Prisma.engineer_supplamental_moaUpdateManyMutationInput, Prisma.engineer_supplamental_moaUncheckedUpdateManyWithoutEngineer_mother_moaInput>;
};
export type engineer_supplamental_moaScalarWhereInput = {
    AND?: Prisma.engineer_supplamental_moaScalarWhereInput | Prisma.engineer_supplamental_moaScalarWhereInput[];
    OR?: Prisma.engineer_supplamental_moaScalarWhereInput[];
    NOT?: Prisma.engineer_supplamental_moaScalarWhereInput | Prisma.engineer_supplamental_moaScalarWhereInput[];
    supplamental_moa_id?: Prisma.StringFilter<"engineer_supplamental_moa"> | string;
    mother_moa_id?: Prisma.StringNullableFilter<"engineer_supplamental_moa"> | string | null;
    moa_pdf?: Prisma.StringNullableFilter<"engineer_supplamental_moa"> | string | null;
    uploaded_by?: Prisma.StringNullableFilter<"engineer_supplamental_moa"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"engineer_supplamental_moa"> | Date | string | null;
    ipc_ids?: Prisma.JsonNullableFilter<"engineer_supplamental_moa">;
};
export type engineer_supplamental_moaCreateManyEngineer_mother_moaInput = {
    supplamental_moa_id?: string;
    moa_pdf?: string | null;
    uploaded_by?: string | null;
    created_at?: Date | string | null;
    ipc_ids?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type engineer_supplamental_moaUpdateWithoutEngineer_mother_moaInput = {
    supplamental_moa_id?: Prisma.StringFieldUpdateOperationsInput | string;
    moa_pdf?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ipc_ids?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type engineer_supplamental_moaUncheckedUpdateWithoutEngineer_mother_moaInput = {
    supplamental_moa_id?: Prisma.StringFieldUpdateOperationsInput | string;
    moa_pdf?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ipc_ids?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type engineer_supplamental_moaUncheckedUpdateManyWithoutEngineer_mother_moaInput = {
    supplamental_moa_id?: Prisma.StringFieldUpdateOperationsInput | string;
    moa_pdf?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ipc_ids?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type engineer_supplamental_moaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    supplamental_moa_id?: boolean;
    mother_moa_id?: boolean;
    moa_pdf?: boolean;
    uploaded_by?: boolean;
    created_at?: boolean;
    ipc_ids?: boolean;
    engineer_mother_moa?: boolean | Prisma.engineer_supplamental_moa$engineer_mother_moaArgs<ExtArgs>;
}, ExtArgs["result"]["engineer_supplamental_moa"]>;
export type engineer_supplamental_moaSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    supplamental_moa_id?: boolean;
    mother_moa_id?: boolean;
    moa_pdf?: boolean;
    uploaded_by?: boolean;
    created_at?: boolean;
    ipc_ids?: boolean;
    engineer_mother_moa?: boolean | Prisma.engineer_supplamental_moa$engineer_mother_moaArgs<ExtArgs>;
}, ExtArgs["result"]["engineer_supplamental_moa"]>;
export type engineer_supplamental_moaSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    supplamental_moa_id?: boolean;
    mother_moa_id?: boolean;
    moa_pdf?: boolean;
    uploaded_by?: boolean;
    created_at?: boolean;
    ipc_ids?: boolean;
    engineer_mother_moa?: boolean | Prisma.engineer_supplamental_moa$engineer_mother_moaArgs<ExtArgs>;
}, ExtArgs["result"]["engineer_supplamental_moa"]>;
export type engineer_supplamental_moaSelectScalar = {
    supplamental_moa_id?: boolean;
    mother_moa_id?: boolean;
    moa_pdf?: boolean;
    uploaded_by?: boolean;
    created_at?: boolean;
    ipc_ids?: boolean;
};
export type engineer_supplamental_moaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"supplamental_moa_id" | "mother_moa_id" | "moa_pdf" | "uploaded_by" | "created_at" | "ipc_ids", ExtArgs["result"]["engineer_supplamental_moa"]>;
export type engineer_supplamental_moaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    engineer_mother_moa?: boolean | Prisma.engineer_supplamental_moa$engineer_mother_moaArgs<ExtArgs>;
};
export type engineer_supplamental_moaIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    engineer_mother_moa?: boolean | Prisma.engineer_supplamental_moa$engineer_mother_moaArgs<ExtArgs>;
};
export type engineer_supplamental_moaIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    engineer_mother_moa?: boolean | Prisma.engineer_supplamental_moa$engineer_mother_moaArgs<ExtArgs>;
};
export type $engineer_supplamental_moaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "engineer_supplamental_moa";
    objects: {
        engineer_mother_moa: Prisma.$engineer_mother_moaPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        supplamental_moa_id: string;
        mother_moa_id: string | null;
        moa_pdf: string | null;
        uploaded_by: string | null;
        created_at: Date | null;
        ipc_ids: runtime.JsonValue | null;
    }, ExtArgs["result"]["engineer_supplamental_moa"]>;
    composites: {};
};
export type engineer_supplamental_moaGetPayload<S extends boolean | null | undefined | engineer_supplamental_moaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$engineer_supplamental_moaPayload, S>;
export type engineer_supplamental_moaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<engineer_supplamental_moaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Engineer_supplamental_moaCountAggregateInputType | true;
};
export interface engineer_supplamental_moaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['engineer_supplamental_moa'];
        meta: {
            name: 'engineer_supplamental_moa';
        };
    };
    findUnique<T extends engineer_supplamental_moaFindUniqueArgs>(args: Prisma.SelectSubset<T, engineer_supplamental_moaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__engineer_supplamental_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_supplamental_moaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends engineer_supplamental_moaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, engineer_supplamental_moaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__engineer_supplamental_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_supplamental_moaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends engineer_supplamental_moaFindFirstArgs>(args?: Prisma.SelectSubset<T, engineer_supplamental_moaFindFirstArgs<ExtArgs>>): Prisma.Prisma__engineer_supplamental_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_supplamental_moaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends engineer_supplamental_moaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, engineer_supplamental_moaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__engineer_supplamental_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_supplamental_moaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends engineer_supplamental_moaFindManyArgs>(args?: Prisma.SelectSubset<T, engineer_supplamental_moaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$engineer_supplamental_moaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends engineer_supplamental_moaCreateArgs>(args: Prisma.SelectSubset<T, engineer_supplamental_moaCreateArgs<ExtArgs>>): Prisma.Prisma__engineer_supplamental_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_supplamental_moaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends engineer_supplamental_moaCreateManyArgs>(args?: Prisma.SelectSubset<T, engineer_supplamental_moaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends engineer_supplamental_moaCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, engineer_supplamental_moaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$engineer_supplamental_moaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends engineer_supplamental_moaDeleteArgs>(args: Prisma.SelectSubset<T, engineer_supplamental_moaDeleteArgs<ExtArgs>>): Prisma.Prisma__engineer_supplamental_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_supplamental_moaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends engineer_supplamental_moaUpdateArgs>(args: Prisma.SelectSubset<T, engineer_supplamental_moaUpdateArgs<ExtArgs>>): Prisma.Prisma__engineer_supplamental_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_supplamental_moaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends engineer_supplamental_moaDeleteManyArgs>(args?: Prisma.SelectSubset<T, engineer_supplamental_moaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends engineer_supplamental_moaUpdateManyArgs>(args: Prisma.SelectSubset<T, engineer_supplamental_moaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends engineer_supplamental_moaUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, engineer_supplamental_moaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$engineer_supplamental_moaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends engineer_supplamental_moaUpsertArgs>(args: Prisma.SelectSubset<T, engineer_supplamental_moaUpsertArgs<ExtArgs>>): Prisma.Prisma__engineer_supplamental_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_supplamental_moaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends engineer_supplamental_moaCountArgs>(args?: Prisma.Subset<T, engineer_supplamental_moaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Engineer_supplamental_moaCountAggregateOutputType> : number>;
    aggregate<T extends Engineer_supplamental_moaAggregateArgs>(args: Prisma.Subset<T, Engineer_supplamental_moaAggregateArgs>): Prisma.PrismaPromise<GetEngineer_supplamental_moaAggregateType<T>>;
    groupBy<T extends engineer_supplamental_moaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: engineer_supplamental_moaGroupByArgs['orderBy'];
    } : {
        orderBy?: engineer_supplamental_moaGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, engineer_supplamental_moaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEngineer_supplamental_moaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: engineer_supplamental_moaFieldRefs;
}
export interface Prisma__engineer_supplamental_moaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    engineer_mother_moa<T extends Prisma.engineer_supplamental_moa$engineer_mother_moaArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.engineer_supplamental_moa$engineer_mother_moaArgs<ExtArgs>>): Prisma.Prisma__engineer_mother_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_mother_moaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface engineer_supplamental_moaFieldRefs {
    readonly supplamental_moa_id: Prisma.FieldRef<"engineer_supplamental_moa", 'String'>;
    readonly mother_moa_id: Prisma.FieldRef<"engineer_supplamental_moa", 'String'>;
    readonly moa_pdf: Prisma.FieldRef<"engineer_supplamental_moa", 'String'>;
    readonly uploaded_by: Prisma.FieldRef<"engineer_supplamental_moa", 'String'>;
    readonly created_at: Prisma.FieldRef<"engineer_supplamental_moa", 'DateTime'>;
    readonly ipc_ids: Prisma.FieldRef<"engineer_supplamental_moa", 'Json'>;
}
export type engineer_supplamental_moaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplamental_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_supplamental_moaOmit<ExtArgs> | null;
    include?: Prisma.engineer_supplamental_moaInclude<ExtArgs> | null;
    where: Prisma.engineer_supplamental_moaWhereUniqueInput;
};
export type engineer_supplamental_moaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplamental_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_supplamental_moaOmit<ExtArgs> | null;
    include?: Prisma.engineer_supplamental_moaInclude<ExtArgs> | null;
    where: Prisma.engineer_supplamental_moaWhereUniqueInput;
};
export type engineer_supplamental_moaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplamental_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_supplamental_moaOmit<ExtArgs> | null;
    include?: Prisma.engineer_supplamental_moaInclude<ExtArgs> | null;
    where?: Prisma.engineer_supplamental_moaWhereInput;
    orderBy?: Prisma.engineer_supplamental_moaOrderByWithRelationInput | Prisma.engineer_supplamental_moaOrderByWithRelationInput[];
    cursor?: Prisma.engineer_supplamental_moaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Engineer_supplamental_moaScalarFieldEnum | Prisma.Engineer_supplamental_moaScalarFieldEnum[];
};
export type engineer_supplamental_moaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplamental_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_supplamental_moaOmit<ExtArgs> | null;
    include?: Prisma.engineer_supplamental_moaInclude<ExtArgs> | null;
    where?: Prisma.engineer_supplamental_moaWhereInput;
    orderBy?: Prisma.engineer_supplamental_moaOrderByWithRelationInput | Prisma.engineer_supplamental_moaOrderByWithRelationInput[];
    cursor?: Prisma.engineer_supplamental_moaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Engineer_supplamental_moaScalarFieldEnum | Prisma.Engineer_supplamental_moaScalarFieldEnum[];
};
export type engineer_supplamental_moaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplamental_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_supplamental_moaOmit<ExtArgs> | null;
    include?: Prisma.engineer_supplamental_moaInclude<ExtArgs> | null;
    where?: Prisma.engineer_supplamental_moaWhereInput;
    orderBy?: Prisma.engineer_supplamental_moaOrderByWithRelationInput | Prisma.engineer_supplamental_moaOrderByWithRelationInput[];
    cursor?: Prisma.engineer_supplamental_moaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Engineer_supplamental_moaScalarFieldEnum | Prisma.Engineer_supplamental_moaScalarFieldEnum[];
};
export type engineer_supplamental_moaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplamental_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_supplamental_moaOmit<ExtArgs> | null;
    include?: Prisma.engineer_supplamental_moaInclude<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.engineer_supplamental_moaCreateInput, Prisma.engineer_supplamental_moaUncheckedCreateInput>;
};
export type engineer_supplamental_moaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.engineer_supplamental_moaCreateManyInput | Prisma.engineer_supplamental_moaCreateManyInput[];
    skipDuplicates?: boolean;
};
export type engineer_supplamental_moaCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplamental_moaSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.engineer_supplamental_moaOmit<ExtArgs> | null;
    data: Prisma.engineer_supplamental_moaCreateManyInput | Prisma.engineer_supplamental_moaCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.engineer_supplamental_moaIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type engineer_supplamental_moaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplamental_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_supplamental_moaOmit<ExtArgs> | null;
    include?: Prisma.engineer_supplamental_moaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.engineer_supplamental_moaUpdateInput, Prisma.engineer_supplamental_moaUncheckedUpdateInput>;
    where: Prisma.engineer_supplamental_moaWhereUniqueInput;
};
export type engineer_supplamental_moaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.engineer_supplamental_moaUpdateManyMutationInput, Prisma.engineer_supplamental_moaUncheckedUpdateManyInput>;
    where?: Prisma.engineer_supplamental_moaWhereInput;
    limit?: number;
};
export type engineer_supplamental_moaUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplamental_moaSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.engineer_supplamental_moaOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.engineer_supplamental_moaUpdateManyMutationInput, Prisma.engineer_supplamental_moaUncheckedUpdateManyInput>;
    where?: Prisma.engineer_supplamental_moaWhereInput;
    limit?: number;
    include?: Prisma.engineer_supplamental_moaIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type engineer_supplamental_moaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplamental_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_supplamental_moaOmit<ExtArgs> | null;
    include?: Prisma.engineer_supplamental_moaInclude<ExtArgs> | null;
    where: Prisma.engineer_supplamental_moaWhereUniqueInput;
    create: Prisma.XOR<Prisma.engineer_supplamental_moaCreateInput, Prisma.engineer_supplamental_moaUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.engineer_supplamental_moaUpdateInput, Prisma.engineer_supplamental_moaUncheckedUpdateInput>;
};
export type engineer_supplamental_moaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplamental_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_supplamental_moaOmit<ExtArgs> | null;
    include?: Prisma.engineer_supplamental_moaInclude<ExtArgs> | null;
    where: Prisma.engineer_supplamental_moaWhereUniqueInput;
};
export type engineer_supplamental_moaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.engineer_supplamental_moaWhereInput;
    limit?: number;
};
export type engineer_supplamental_moa$engineer_mother_moaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_mother_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_mother_moaOmit<ExtArgs> | null;
    include?: Prisma.engineer_mother_moaInclude<ExtArgs> | null;
    where?: Prisma.engineer_mother_moaWhereInput;
};
export type engineer_supplamental_moaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplamental_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_supplamental_moaOmit<ExtArgs> | null;
    include?: Prisma.engineer_supplamental_moaInclude<ExtArgs> | null;
};
