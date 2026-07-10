import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type engineer_mother_moaModel = runtime.Types.Result.DefaultSelection<Prisma.$engineer_mother_moaPayload>;
export type AggregateEngineer_mother_moa = {
    _count: Engineer_mother_moaCountAggregateOutputType | null;
    _min: Engineer_mother_moaMinAggregateOutputType | null;
    _max: Engineer_mother_moaMaxAggregateOutputType | null;
};
export type Engineer_mother_moaMinAggregateOutputType = {
    mother_moa_id: string | null;
    lgu_type: string | null;
    lgu_name: string | null;
    moa_pdf: string | null;
    uploaded_by: string | null;
    created_at: Date | null;
    region: string | null;
    province: string | null;
    municipality_city: string | null;
    sangguniang_resolution_id: string | null;
    sangguniang_resolution: string | null;
};
export type Engineer_mother_moaMaxAggregateOutputType = {
    mother_moa_id: string | null;
    lgu_type: string | null;
    lgu_name: string | null;
    moa_pdf: string | null;
    uploaded_by: string | null;
    created_at: Date | null;
    region: string | null;
    province: string | null;
    municipality_city: string | null;
    sangguniang_resolution_id: string | null;
    sangguniang_resolution: string | null;
};
export type Engineer_mother_moaCountAggregateOutputType = {
    mother_moa_id: number;
    lgu_type: number;
    lgu_name: number;
    moa_pdf: number;
    uploaded_by: number;
    created_at: number;
    region: number;
    province: number;
    municipality_city: number;
    sangguniang_resolution_id: number;
    sangguniang_resolution: number;
    _all: number;
};
export type Engineer_mother_moaMinAggregateInputType = {
    mother_moa_id?: true;
    lgu_type?: true;
    lgu_name?: true;
    moa_pdf?: true;
    uploaded_by?: true;
    created_at?: true;
    region?: true;
    province?: true;
    municipality_city?: true;
    sangguniang_resolution_id?: true;
    sangguniang_resolution?: true;
};
export type Engineer_mother_moaMaxAggregateInputType = {
    mother_moa_id?: true;
    lgu_type?: true;
    lgu_name?: true;
    moa_pdf?: true;
    uploaded_by?: true;
    created_at?: true;
    region?: true;
    province?: true;
    municipality_city?: true;
    sangguniang_resolution_id?: true;
    sangguniang_resolution?: true;
};
export type Engineer_mother_moaCountAggregateInputType = {
    mother_moa_id?: true;
    lgu_type?: true;
    lgu_name?: true;
    moa_pdf?: true;
    uploaded_by?: true;
    created_at?: true;
    region?: true;
    province?: true;
    municipality_city?: true;
    sangguniang_resolution_id?: true;
    sangguniang_resolution?: true;
    _all?: true;
};
export type Engineer_mother_moaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.engineer_mother_moaWhereInput;
    orderBy?: Prisma.engineer_mother_moaOrderByWithRelationInput | Prisma.engineer_mother_moaOrderByWithRelationInput[];
    cursor?: Prisma.engineer_mother_moaWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Engineer_mother_moaCountAggregateInputType;
    _min?: Engineer_mother_moaMinAggregateInputType;
    _max?: Engineer_mother_moaMaxAggregateInputType;
};
export type GetEngineer_mother_moaAggregateType<T extends Engineer_mother_moaAggregateArgs> = {
    [P in keyof T & keyof AggregateEngineer_mother_moa]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEngineer_mother_moa[P]> : Prisma.GetScalarType<T[P], AggregateEngineer_mother_moa[P]>;
};
export type engineer_mother_moaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.engineer_mother_moaWhereInput;
    orderBy?: Prisma.engineer_mother_moaOrderByWithAggregationInput | Prisma.engineer_mother_moaOrderByWithAggregationInput[];
    by: Prisma.Engineer_mother_moaScalarFieldEnum[] | Prisma.Engineer_mother_moaScalarFieldEnum;
    having?: Prisma.engineer_mother_moaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Engineer_mother_moaCountAggregateInputType | true;
    _min?: Engineer_mother_moaMinAggregateInputType;
    _max?: Engineer_mother_moaMaxAggregateInputType;
};
export type Engineer_mother_moaGroupByOutputType = {
    mother_moa_id: string;
    lgu_type: string;
    lgu_name: string;
    moa_pdf: string | null;
    uploaded_by: string;
    created_at: Date | null;
    region: string | null;
    province: string | null;
    municipality_city: string | null;
    sangguniang_resolution_id: string | null;
    sangguniang_resolution: string | null;
    _count: Engineer_mother_moaCountAggregateOutputType | null;
    _min: Engineer_mother_moaMinAggregateOutputType | null;
    _max: Engineer_mother_moaMaxAggregateOutputType | null;
};
export type GetEngineer_mother_moaGroupByPayload<T extends engineer_mother_moaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Engineer_mother_moaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Engineer_mother_moaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Engineer_mother_moaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Engineer_mother_moaGroupByOutputType[P]>;
}>>;
export type engineer_mother_moaWhereInput = {
    AND?: Prisma.engineer_mother_moaWhereInput | Prisma.engineer_mother_moaWhereInput[];
    OR?: Prisma.engineer_mother_moaWhereInput[];
    NOT?: Prisma.engineer_mother_moaWhereInput | Prisma.engineer_mother_moaWhereInput[];
    mother_moa_id?: Prisma.StringFilter<"engineer_mother_moa"> | string;
    lgu_type?: Prisma.StringFilter<"engineer_mother_moa"> | string;
    lgu_name?: Prisma.StringFilter<"engineer_mother_moa"> | string;
    moa_pdf?: Prisma.StringNullableFilter<"engineer_mother_moa"> | string | null;
    uploaded_by?: Prisma.StringFilter<"engineer_mother_moa"> | string;
    created_at?: Prisma.DateTimeNullableFilter<"engineer_mother_moa"> | Date | string | null;
    region?: Prisma.StringNullableFilter<"engineer_mother_moa"> | string | null;
    province?: Prisma.StringNullableFilter<"engineer_mother_moa"> | string | null;
    municipality_city?: Prisma.StringNullableFilter<"engineer_mother_moa"> | string | null;
    sangguniang_resolution_id?: Prisma.StringNullableFilter<"engineer_mother_moa"> | string | null;
    sangguniang_resolution?: Prisma.StringNullableFilter<"engineer_mother_moa"> | string | null;
    engineer_supplamental_moa?: Prisma.Engineer_supplamental_moaListRelationFilter;
};
export type engineer_mother_moaOrderByWithRelationInput = {
    mother_moa_id?: Prisma.SortOrder;
    lgu_type?: Prisma.SortOrder;
    lgu_name?: Prisma.SortOrder;
    moa_pdf?: Prisma.SortOrderInput | Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    region?: Prisma.SortOrderInput | Prisma.SortOrder;
    province?: Prisma.SortOrderInput | Prisma.SortOrder;
    municipality_city?: Prisma.SortOrderInput | Prisma.SortOrder;
    sangguniang_resolution_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    sangguniang_resolution?: Prisma.SortOrderInput | Prisma.SortOrder;
    engineer_supplamental_moa?: Prisma.engineer_supplamental_moaOrderByRelationAggregateInput;
};
export type engineer_mother_moaWhereUniqueInput = Prisma.AtLeast<{
    mother_moa_id?: string;
    AND?: Prisma.engineer_mother_moaWhereInput | Prisma.engineer_mother_moaWhereInput[];
    OR?: Prisma.engineer_mother_moaWhereInput[];
    NOT?: Prisma.engineer_mother_moaWhereInput | Prisma.engineer_mother_moaWhereInput[];
    lgu_type?: Prisma.StringFilter<"engineer_mother_moa"> | string;
    lgu_name?: Prisma.StringFilter<"engineer_mother_moa"> | string;
    moa_pdf?: Prisma.StringNullableFilter<"engineer_mother_moa"> | string | null;
    uploaded_by?: Prisma.StringFilter<"engineer_mother_moa"> | string;
    created_at?: Prisma.DateTimeNullableFilter<"engineer_mother_moa"> | Date | string | null;
    region?: Prisma.StringNullableFilter<"engineer_mother_moa"> | string | null;
    province?: Prisma.StringNullableFilter<"engineer_mother_moa"> | string | null;
    municipality_city?: Prisma.StringNullableFilter<"engineer_mother_moa"> | string | null;
    sangguniang_resolution_id?: Prisma.StringNullableFilter<"engineer_mother_moa"> | string | null;
    sangguniang_resolution?: Prisma.StringNullableFilter<"engineer_mother_moa"> | string | null;
    engineer_supplamental_moa?: Prisma.Engineer_supplamental_moaListRelationFilter;
}, "mother_moa_id">;
export type engineer_mother_moaOrderByWithAggregationInput = {
    mother_moa_id?: Prisma.SortOrder;
    lgu_type?: Prisma.SortOrder;
    lgu_name?: Prisma.SortOrder;
    moa_pdf?: Prisma.SortOrderInput | Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    region?: Prisma.SortOrderInput | Prisma.SortOrder;
    province?: Prisma.SortOrderInput | Prisma.SortOrder;
    municipality_city?: Prisma.SortOrderInput | Prisma.SortOrder;
    sangguniang_resolution_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    sangguniang_resolution?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.engineer_mother_moaCountOrderByAggregateInput;
    _max?: Prisma.engineer_mother_moaMaxOrderByAggregateInput;
    _min?: Prisma.engineer_mother_moaMinOrderByAggregateInput;
};
export type engineer_mother_moaScalarWhereWithAggregatesInput = {
    AND?: Prisma.engineer_mother_moaScalarWhereWithAggregatesInput | Prisma.engineer_mother_moaScalarWhereWithAggregatesInput[];
    OR?: Prisma.engineer_mother_moaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.engineer_mother_moaScalarWhereWithAggregatesInput | Prisma.engineer_mother_moaScalarWhereWithAggregatesInput[];
    mother_moa_id?: Prisma.StringWithAggregatesFilter<"engineer_mother_moa"> | string;
    lgu_type?: Prisma.StringWithAggregatesFilter<"engineer_mother_moa"> | string;
    lgu_name?: Prisma.StringWithAggregatesFilter<"engineer_mother_moa"> | string;
    moa_pdf?: Prisma.StringNullableWithAggregatesFilter<"engineer_mother_moa"> | string | null;
    uploaded_by?: Prisma.StringWithAggregatesFilter<"engineer_mother_moa"> | string;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"engineer_mother_moa"> | Date | string | null;
    region?: Prisma.StringNullableWithAggregatesFilter<"engineer_mother_moa"> | string | null;
    province?: Prisma.StringNullableWithAggregatesFilter<"engineer_mother_moa"> | string | null;
    municipality_city?: Prisma.StringNullableWithAggregatesFilter<"engineer_mother_moa"> | string | null;
    sangguniang_resolution_id?: Prisma.StringNullableWithAggregatesFilter<"engineer_mother_moa"> | string | null;
    sangguniang_resolution?: Prisma.StringNullableWithAggregatesFilter<"engineer_mother_moa"> | string | null;
};
export type engineer_mother_moaCreateInput = {
    mother_moa_id?: string;
    lgu_type: string;
    lgu_name: string;
    moa_pdf?: string | null;
    uploaded_by: string;
    created_at?: Date | string | null;
    region?: string | null;
    province?: string | null;
    municipality_city?: string | null;
    sangguniang_resolution_id?: string | null;
    sangguniang_resolution?: string | null;
    engineer_supplamental_moa?: Prisma.engineer_supplamental_moaCreateNestedManyWithoutEngineer_mother_moaInput;
};
export type engineer_mother_moaUncheckedCreateInput = {
    mother_moa_id?: string;
    lgu_type: string;
    lgu_name: string;
    moa_pdf?: string | null;
    uploaded_by: string;
    created_at?: Date | string | null;
    region?: string | null;
    province?: string | null;
    municipality_city?: string | null;
    sangguniang_resolution_id?: string | null;
    sangguniang_resolution?: string | null;
    engineer_supplamental_moa?: Prisma.engineer_supplamental_moaUncheckedCreateNestedManyWithoutEngineer_mother_moaInput;
};
export type engineer_mother_moaUpdateInput = {
    mother_moa_id?: Prisma.StringFieldUpdateOperationsInput | string;
    lgu_type?: Prisma.StringFieldUpdateOperationsInput | string;
    lgu_name?: Prisma.StringFieldUpdateOperationsInput | string;
    moa_pdf?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    province?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    municipality_city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sangguniang_resolution_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sangguniang_resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    engineer_supplamental_moa?: Prisma.engineer_supplamental_moaUpdateManyWithoutEngineer_mother_moaNestedInput;
};
export type engineer_mother_moaUncheckedUpdateInput = {
    mother_moa_id?: Prisma.StringFieldUpdateOperationsInput | string;
    lgu_type?: Prisma.StringFieldUpdateOperationsInput | string;
    lgu_name?: Prisma.StringFieldUpdateOperationsInput | string;
    moa_pdf?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    province?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    municipality_city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sangguniang_resolution_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sangguniang_resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    engineer_supplamental_moa?: Prisma.engineer_supplamental_moaUncheckedUpdateManyWithoutEngineer_mother_moaNestedInput;
};
export type engineer_mother_moaCreateManyInput = {
    mother_moa_id?: string;
    lgu_type: string;
    lgu_name: string;
    moa_pdf?: string | null;
    uploaded_by: string;
    created_at?: Date | string | null;
    region?: string | null;
    province?: string | null;
    municipality_city?: string | null;
    sangguniang_resolution_id?: string | null;
    sangguniang_resolution?: string | null;
};
export type engineer_mother_moaUpdateManyMutationInput = {
    mother_moa_id?: Prisma.StringFieldUpdateOperationsInput | string;
    lgu_type?: Prisma.StringFieldUpdateOperationsInput | string;
    lgu_name?: Prisma.StringFieldUpdateOperationsInput | string;
    moa_pdf?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    province?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    municipality_city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sangguniang_resolution_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sangguniang_resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type engineer_mother_moaUncheckedUpdateManyInput = {
    mother_moa_id?: Prisma.StringFieldUpdateOperationsInput | string;
    lgu_type?: Prisma.StringFieldUpdateOperationsInput | string;
    lgu_name?: Prisma.StringFieldUpdateOperationsInput | string;
    moa_pdf?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    province?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    municipality_city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sangguniang_resolution_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sangguniang_resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type engineer_mother_moaCountOrderByAggregateInput = {
    mother_moa_id?: Prisma.SortOrder;
    lgu_type?: Prisma.SortOrder;
    lgu_name?: Prisma.SortOrder;
    moa_pdf?: Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    province?: Prisma.SortOrder;
    municipality_city?: Prisma.SortOrder;
    sangguniang_resolution_id?: Prisma.SortOrder;
    sangguniang_resolution?: Prisma.SortOrder;
};
export type engineer_mother_moaMaxOrderByAggregateInput = {
    mother_moa_id?: Prisma.SortOrder;
    lgu_type?: Prisma.SortOrder;
    lgu_name?: Prisma.SortOrder;
    moa_pdf?: Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    province?: Prisma.SortOrder;
    municipality_city?: Prisma.SortOrder;
    sangguniang_resolution_id?: Prisma.SortOrder;
    sangguniang_resolution?: Prisma.SortOrder;
};
export type engineer_mother_moaMinOrderByAggregateInput = {
    mother_moa_id?: Prisma.SortOrder;
    lgu_type?: Prisma.SortOrder;
    lgu_name?: Prisma.SortOrder;
    moa_pdf?: Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    province?: Prisma.SortOrder;
    municipality_city?: Prisma.SortOrder;
    sangguniang_resolution_id?: Prisma.SortOrder;
    sangguniang_resolution?: Prisma.SortOrder;
};
export type Engineer_mother_moaNullableScalarRelationFilter = {
    is?: Prisma.engineer_mother_moaWhereInput | null;
    isNot?: Prisma.engineer_mother_moaWhereInput | null;
};
export type engineer_mother_moaCreateNestedOneWithoutEngineer_supplamental_moaInput = {
    create?: Prisma.XOR<Prisma.engineer_mother_moaCreateWithoutEngineer_supplamental_moaInput, Prisma.engineer_mother_moaUncheckedCreateWithoutEngineer_supplamental_moaInput>;
    connectOrCreate?: Prisma.engineer_mother_moaCreateOrConnectWithoutEngineer_supplamental_moaInput;
    connect?: Prisma.engineer_mother_moaWhereUniqueInput;
};
export type engineer_mother_moaUpdateOneWithoutEngineer_supplamental_moaNestedInput = {
    create?: Prisma.XOR<Prisma.engineer_mother_moaCreateWithoutEngineer_supplamental_moaInput, Prisma.engineer_mother_moaUncheckedCreateWithoutEngineer_supplamental_moaInput>;
    connectOrCreate?: Prisma.engineer_mother_moaCreateOrConnectWithoutEngineer_supplamental_moaInput;
    upsert?: Prisma.engineer_mother_moaUpsertWithoutEngineer_supplamental_moaInput;
    disconnect?: Prisma.engineer_mother_moaWhereInput | boolean;
    delete?: Prisma.engineer_mother_moaWhereInput | boolean;
    connect?: Prisma.engineer_mother_moaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.engineer_mother_moaUpdateToOneWithWhereWithoutEngineer_supplamental_moaInput, Prisma.engineer_mother_moaUpdateWithoutEngineer_supplamental_moaInput>, Prisma.engineer_mother_moaUncheckedUpdateWithoutEngineer_supplamental_moaInput>;
};
export type engineer_mother_moaCreateWithoutEngineer_supplamental_moaInput = {
    mother_moa_id?: string;
    lgu_type: string;
    lgu_name: string;
    moa_pdf?: string | null;
    uploaded_by: string;
    created_at?: Date | string | null;
    region?: string | null;
    province?: string | null;
    municipality_city?: string | null;
    sangguniang_resolution_id?: string | null;
    sangguniang_resolution?: string | null;
};
export type engineer_mother_moaUncheckedCreateWithoutEngineer_supplamental_moaInput = {
    mother_moa_id?: string;
    lgu_type: string;
    lgu_name: string;
    moa_pdf?: string | null;
    uploaded_by: string;
    created_at?: Date | string | null;
    region?: string | null;
    province?: string | null;
    municipality_city?: string | null;
    sangguniang_resolution_id?: string | null;
    sangguniang_resolution?: string | null;
};
export type engineer_mother_moaCreateOrConnectWithoutEngineer_supplamental_moaInput = {
    where: Prisma.engineer_mother_moaWhereUniqueInput;
    create: Prisma.XOR<Prisma.engineer_mother_moaCreateWithoutEngineer_supplamental_moaInput, Prisma.engineer_mother_moaUncheckedCreateWithoutEngineer_supplamental_moaInput>;
};
export type engineer_mother_moaUpsertWithoutEngineer_supplamental_moaInput = {
    update: Prisma.XOR<Prisma.engineer_mother_moaUpdateWithoutEngineer_supplamental_moaInput, Prisma.engineer_mother_moaUncheckedUpdateWithoutEngineer_supplamental_moaInput>;
    create: Prisma.XOR<Prisma.engineer_mother_moaCreateWithoutEngineer_supplamental_moaInput, Prisma.engineer_mother_moaUncheckedCreateWithoutEngineer_supplamental_moaInput>;
    where?: Prisma.engineer_mother_moaWhereInput;
};
export type engineer_mother_moaUpdateToOneWithWhereWithoutEngineer_supplamental_moaInput = {
    where?: Prisma.engineer_mother_moaWhereInput;
    data: Prisma.XOR<Prisma.engineer_mother_moaUpdateWithoutEngineer_supplamental_moaInput, Prisma.engineer_mother_moaUncheckedUpdateWithoutEngineer_supplamental_moaInput>;
};
export type engineer_mother_moaUpdateWithoutEngineer_supplamental_moaInput = {
    mother_moa_id?: Prisma.StringFieldUpdateOperationsInput | string;
    lgu_type?: Prisma.StringFieldUpdateOperationsInput | string;
    lgu_name?: Prisma.StringFieldUpdateOperationsInput | string;
    moa_pdf?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    province?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    municipality_city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sangguniang_resolution_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sangguniang_resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type engineer_mother_moaUncheckedUpdateWithoutEngineer_supplamental_moaInput = {
    mother_moa_id?: Prisma.StringFieldUpdateOperationsInput | string;
    lgu_type?: Prisma.StringFieldUpdateOperationsInput | string;
    lgu_name?: Prisma.StringFieldUpdateOperationsInput | string;
    moa_pdf?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    province?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    municipality_city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sangguniang_resolution_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sangguniang_resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type Engineer_mother_moaCountOutputType = {
    engineer_supplamental_moa: number;
};
export type Engineer_mother_moaCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    engineer_supplamental_moa?: boolean | Engineer_mother_moaCountOutputTypeCountEngineer_supplamental_moaArgs;
};
export type Engineer_mother_moaCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.Engineer_mother_moaCountOutputTypeSelect<ExtArgs> | null;
};
export type Engineer_mother_moaCountOutputTypeCountEngineer_supplamental_moaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.engineer_supplamental_moaWhereInput;
};
export type engineer_mother_moaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    mother_moa_id?: boolean;
    lgu_type?: boolean;
    lgu_name?: boolean;
    moa_pdf?: boolean;
    uploaded_by?: boolean;
    created_at?: boolean;
    region?: boolean;
    province?: boolean;
    municipality_city?: boolean;
    sangguniang_resolution_id?: boolean;
    sangguniang_resolution?: boolean;
    engineer_supplamental_moa?: boolean | Prisma.engineer_mother_moa$engineer_supplamental_moaArgs<ExtArgs>;
    _count?: boolean | Prisma.Engineer_mother_moaCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["engineer_mother_moa"]>;
export type engineer_mother_moaSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    mother_moa_id?: boolean;
    lgu_type?: boolean;
    lgu_name?: boolean;
    moa_pdf?: boolean;
    uploaded_by?: boolean;
    created_at?: boolean;
    region?: boolean;
    province?: boolean;
    municipality_city?: boolean;
    sangguniang_resolution_id?: boolean;
    sangguniang_resolution?: boolean;
}, ExtArgs["result"]["engineer_mother_moa"]>;
export type engineer_mother_moaSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    mother_moa_id?: boolean;
    lgu_type?: boolean;
    lgu_name?: boolean;
    moa_pdf?: boolean;
    uploaded_by?: boolean;
    created_at?: boolean;
    region?: boolean;
    province?: boolean;
    municipality_city?: boolean;
    sangguniang_resolution_id?: boolean;
    sangguniang_resolution?: boolean;
}, ExtArgs["result"]["engineer_mother_moa"]>;
export type engineer_mother_moaSelectScalar = {
    mother_moa_id?: boolean;
    lgu_type?: boolean;
    lgu_name?: boolean;
    moa_pdf?: boolean;
    uploaded_by?: boolean;
    created_at?: boolean;
    region?: boolean;
    province?: boolean;
    municipality_city?: boolean;
    sangguniang_resolution_id?: boolean;
    sangguniang_resolution?: boolean;
};
export type engineer_mother_moaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"mother_moa_id" | "lgu_type" | "lgu_name" | "moa_pdf" | "uploaded_by" | "created_at" | "region" | "province" | "municipality_city" | "sangguniang_resolution_id" | "sangguniang_resolution", ExtArgs["result"]["engineer_mother_moa"]>;
export type engineer_mother_moaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    engineer_supplamental_moa?: boolean | Prisma.engineer_mother_moa$engineer_supplamental_moaArgs<ExtArgs>;
    _count?: boolean | Prisma.Engineer_mother_moaCountOutputTypeDefaultArgs<ExtArgs>;
};
export type engineer_mother_moaIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type engineer_mother_moaIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $engineer_mother_moaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "engineer_mother_moa";
    objects: {
        engineer_supplamental_moa: Prisma.$engineer_supplamental_moaPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        mother_moa_id: string;
        lgu_type: string;
        lgu_name: string;
        moa_pdf: string | null;
        uploaded_by: string;
        created_at: Date | null;
        region: string | null;
        province: string | null;
        municipality_city: string | null;
        sangguniang_resolution_id: string | null;
        sangguniang_resolution: string | null;
    }, ExtArgs["result"]["engineer_mother_moa"]>;
    composites: {};
};
export type engineer_mother_moaGetPayload<S extends boolean | null | undefined | engineer_mother_moaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$engineer_mother_moaPayload, S>;
export type engineer_mother_moaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<engineer_mother_moaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Engineer_mother_moaCountAggregateInputType | true;
};
export interface engineer_mother_moaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['engineer_mother_moa'];
        meta: {
            name: 'engineer_mother_moa';
        };
    };
    findUnique<T extends engineer_mother_moaFindUniqueArgs>(args: Prisma.SelectSubset<T, engineer_mother_moaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__engineer_mother_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_mother_moaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends engineer_mother_moaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, engineer_mother_moaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__engineer_mother_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_mother_moaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends engineer_mother_moaFindFirstArgs>(args?: Prisma.SelectSubset<T, engineer_mother_moaFindFirstArgs<ExtArgs>>): Prisma.Prisma__engineer_mother_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_mother_moaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends engineer_mother_moaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, engineer_mother_moaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__engineer_mother_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_mother_moaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends engineer_mother_moaFindManyArgs>(args?: Prisma.SelectSubset<T, engineer_mother_moaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$engineer_mother_moaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends engineer_mother_moaCreateArgs>(args: Prisma.SelectSubset<T, engineer_mother_moaCreateArgs<ExtArgs>>): Prisma.Prisma__engineer_mother_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_mother_moaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends engineer_mother_moaCreateManyArgs>(args?: Prisma.SelectSubset<T, engineer_mother_moaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends engineer_mother_moaCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, engineer_mother_moaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$engineer_mother_moaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends engineer_mother_moaDeleteArgs>(args: Prisma.SelectSubset<T, engineer_mother_moaDeleteArgs<ExtArgs>>): Prisma.Prisma__engineer_mother_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_mother_moaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends engineer_mother_moaUpdateArgs>(args: Prisma.SelectSubset<T, engineer_mother_moaUpdateArgs<ExtArgs>>): Prisma.Prisma__engineer_mother_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_mother_moaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends engineer_mother_moaDeleteManyArgs>(args?: Prisma.SelectSubset<T, engineer_mother_moaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends engineer_mother_moaUpdateManyArgs>(args: Prisma.SelectSubset<T, engineer_mother_moaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends engineer_mother_moaUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, engineer_mother_moaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$engineer_mother_moaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends engineer_mother_moaUpsertArgs>(args: Prisma.SelectSubset<T, engineer_mother_moaUpsertArgs<ExtArgs>>): Prisma.Prisma__engineer_mother_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_mother_moaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends engineer_mother_moaCountArgs>(args?: Prisma.Subset<T, engineer_mother_moaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Engineer_mother_moaCountAggregateOutputType> : number>;
    aggregate<T extends Engineer_mother_moaAggregateArgs>(args: Prisma.Subset<T, Engineer_mother_moaAggregateArgs>): Prisma.PrismaPromise<GetEngineer_mother_moaAggregateType<T>>;
    groupBy<T extends engineer_mother_moaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: engineer_mother_moaGroupByArgs['orderBy'];
    } : {
        orderBy?: engineer_mother_moaGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, engineer_mother_moaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEngineer_mother_moaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: engineer_mother_moaFieldRefs;
}
export interface Prisma__engineer_mother_moaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    engineer_supplamental_moa<T extends Prisma.engineer_mother_moa$engineer_supplamental_moaArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.engineer_mother_moa$engineer_supplamental_moaArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$engineer_supplamental_moaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface engineer_mother_moaFieldRefs {
    readonly mother_moa_id: Prisma.FieldRef<"engineer_mother_moa", 'String'>;
    readonly lgu_type: Prisma.FieldRef<"engineer_mother_moa", 'String'>;
    readonly lgu_name: Prisma.FieldRef<"engineer_mother_moa", 'String'>;
    readonly moa_pdf: Prisma.FieldRef<"engineer_mother_moa", 'String'>;
    readonly uploaded_by: Prisma.FieldRef<"engineer_mother_moa", 'String'>;
    readonly created_at: Prisma.FieldRef<"engineer_mother_moa", 'DateTime'>;
    readonly region: Prisma.FieldRef<"engineer_mother_moa", 'String'>;
    readonly province: Prisma.FieldRef<"engineer_mother_moa", 'String'>;
    readonly municipality_city: Prisma.FieldRef<"engineer_mother_moa", 'String'>;
    readonly sangguniang_resolution_id: Prisma.FieldRef<"engineer_mother_moa", 'String'>;
    readonly sangguniang_resolution: Prisma.FieldRef<"engineer_mother_moa", 'String'>;
}
export type engineer_mother_moaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_mother_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_mother_moaOmit<ExtArgs> | null;
    include?: Prisma.engineer_mother_moaInclude<ExtArgs> | null;
    where: Prisma.engineer_mother_moaWhereUniqueInput;
};
export type engineer_mother_moaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_mother_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_mother_moaOmit<ExtArgs> | null;
    include?: Prisma.engineer_mother_moaInclude<ExtArgs> | null;
    where: Prisma.engineer_mother_moaWhereUniqueInput;
};
export type engineer_mother_moaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_mother_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_mother_moaOmit<ExtArgs> | null;
    include?: Prisma.engineer_mother_moaInclude<ExtArgs> | null;
    where?: Prisma.engineer_mother_moaWhereInput;
    orderBy?: Prisma.engineer_mother_moaOrderByWithRelationInput | Prisma.engineer_mother_moaOrderByWithRelationInput[];
    cursor?: Prisma.engineer_mother_moaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Engineer_mother_moaScalarFieldEnum | Prisma.Engineer_mother_moaScalarFieldEnum[];
};
export type engineer_mother_moaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_mother_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_mother_moaOmit<ExtArgs> | null;
    include?: Prisma.engineer_mother_moaInclude<ExtArgs> | null;
    where?: Prisma.engineer_mother_moaWhereInput;
    orderBy?: Prisma.engineer_mother_moaOrderByWithRelationInput | Prisma.engineer_mother_moaOrderByWithRelationInput[];
    cursor?: Prisma.engineer_mother_moaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Engineer_mother_moaScalarFieldEnum | Prisma.Engineer_mother_moaScalarFieldEnum[];
};
export type engineer_mother_moaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_mother_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_mother_moaOmit<ExtArgs> | null;
    include?: Prisma.engineer_mother_moaInclude<ExtArgs> | null;
    where?: Prisma.engineer_mother_moaWhereInput;
    orderBy?: Prisma.engineer_mother_moaOrderByWithRelationInput | Prisma.engineer_mother_moaOrderByWithRelationInput[];
    cursor?: Prisma.engineer_mother_moaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Engineer_mother_moaScalarFieldEnum | Prisma.Engineer_mother_moaScalarFieldEnum[];
};
export type engineer_mother_moaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_mother_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_mother_moaOmit<ExtArgs> | null;
    include?: Prisma.engineer_mother_moaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.engineer_mother_moaCreateInput, Prisma.engineer_mother_moaUncheckedCreateInput>;
};
export type engineer_mother_moaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.engineer_mother_moaCreateManyInput | Prisma.engineer_mother_moaCreateManyInput[];
    skipDuplicates?: boolean;
};
export type engineer_mother_moaCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_mother_moaSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.engineer_mother_moaOmit<ExtArgs> | null;
    data: Prisma.engineer_mother_moaCreateManyInput | Prisma.engineer_mother_moaCreateManyInput[];
    skipDuplicates?: boolean;
};
export type engineer_mother_moaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_mother_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_mother_moaOmit<ExtArgs> | null;
    include?: Prisma.engineer_mother_moaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.engineer_mother_moaUpdateInput, Prisma.engineer_mother_moaUncheckedUpdateInput>;
    where: Prisma.engineer_mother_moaWhereUniqueInput;
};
export type engineer_mother_moaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.engineer_mother_moaUpdateManyMutationInput, Prisma.engineer_mother_moaUncheckedUpdateManyInput>;
    where?: Prisma.engineer_mother_moaWhereInput;
    limit?: number;
};
export type engineer_mother_moaUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_mother_moaSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.engineer_mother_moaOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.engineer_mother_moaUpdateManyMutationInput, Prisma.engineer_mother_moaUncheckedUpdateManyInput>;
    where?: Prisma.engineer_mother_moaWhereInput;
    limit?: number;
};
export type engineer_mother_moaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_mother_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_mother_moaOmit<ExtArgs> | null;
    include?: Prisma.engineer_mother_moaInclude<ExtArgs> | null;
    where: Prisma.engineer_mother_moaWhereUniqueInput;
    create: Prisma.XOR<Prisma.engineer_mother_moaCreateInput, Prisma.engineer_mother_moaUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.engineer_mother_moaUpdateInput, Prisma.engineer_mother_moaUncheckedUpdateInput>;
};
export type engineer_mother_moaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_mother_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_mother_moaOmit<ExtArgs> | null;
    include?: Prisma.engineer_mother_moaInclude<ExtArgs> | null;
    where: Prisma.engineer_mother_moaWhereUniqueInput;
};
export type engineer_mother_moaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.engineer_mother_moaWhereInput;
    limit?: number;
};
export type engineer_mother_moa$engineer_supplamental_moaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type engineer_mother_moaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_mother_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_mother_moaOmit<ExtArgs> | null;
    include?: Prisma.engineer_mother_moaInclude<ExtArgs> | null;
};
