import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type unified_binariesModel = runtime.Types.Result.DefaultSelection<Prisma.$unified_binariesPayload>;
export type AggregateUnified_binaries = {
    _count: Unified_binariesCountAggregateOutputType | null;
    _avg: Unified_binariesAvgAggregateOutputType | null;
    _sum: Unified_binariesSumAggregateOutputType | null;
    _min: Unified_binariesMinAggregateOutputType | null;
    _max: Unified_binariesMaxAggregateOutputType | null;
};
export type Unified_binariesAvgAggregateOutputType = {
    size_bytes: number | null;
};
export type Unified_binariesSumAggregateOutputType = {
    size_bytes: number | null;
};
export type Unified_binariesMinAggregateOutputType = {
    id: string | null;
    hash: string | null;
    content: runtime.Bytes | null;
    mime_type: string | null;
    size_bytes: number | null;
    created_at: Date | null;
};
export type Unified_binariesMaxAggregateOutputType = {
    id: string | null;
    hash: string | null;
    content: runtime.Bytes | null;
    mime_type: string | null;
    size_bytes: number | null;
    created_at: Date | null;
};
export type Unified_binariesCountAggregateOutputType = {
    id: number;
    hash: number;
    content: number;
    mime_type: number;
    size_bytes: number;
    created_at: number;
    _all: number;
};
export type Unified_binariesAvgAggregateInputType = {
    size_bytes?: true;
};
export type Unified_binariesSumAggregateInputType = {
    size_bytes?: true;
};
export type Unified_binariesMinAggregateInputType = {
    id?: true;
    hash?: true;
    content?: true;
    mime_type?: true;
    size_bytes?: true;
    created_at?: true;
};
export type Unified_binariesMaxAggregateInputType = {
    id?: true;
    hash?: true;
    content?: true;
    mime_type?: true;
    size_bytes?: true;
    created_at?: true;
};
export type Unified_binariesCountAggregateInputType = {
    id?: true;
    hash?: true;
    content?: true;
    mime_type?: true;
    size_bytes?: true;
    created_at?: true;
    _all?: true;
};
export type Unified_binariesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.unified_binariesWhereInput;
    orderBy?: Prisma.unified_binariesOrderByWithRelationInput | Prisma.unified_binariesOrderByWithRelationInput[];
    cursor?: Prisma.unified_binariesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Unified_binariesCountAggregateInputType;
    _avg?: Unified_binariesAvgAggregateInputType;
    _sum?: Unified_binariesSumAggregateInputType;
    _min?: Unified_binariesMinAggregateInputType;
    _max?: Unified_binariesMaxAggregateInputType;
};
export type GetUnified_binariesAggregateType<T extends Unified_binariesAggregateArgs> = {
    [P in keyof T & keyof AggregateUnified_binaries]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUnified_binaries[P]> : Prisma.GetScalarType<T[P], AggregateUnified_binaries[P]>;
};
export type unified_binariesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.unified_binariesWhereInput;
    orderBy?: Prisma.unified_binariesOrderByWithAggregationInput | Prisma.unified_binariesOrderByWithAggregationInput[];
    by: Prisma.Unified_binariesScalarFieldEnum[] | Prisma.Unified_binariesScalarFieldEnum;
    having?: Prisma.unified_binariesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Unified_binariesCountAggregateInputType | true;
    _avg?: Unified_binariesAvgAggregateInputType;
    _sum?: Unified_binariesSumAggregateInputType;
    _min?: Unified_binariesMinAggregateInputType;
    _max?: Unified_binariesMaxAggregateInputType;
};
export type Unified_binariesGroupByOutputType = {
    id: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at: Date | null;
    _count: Unified_binariesCountAggregateOutputType | null;
    _avg: Unified_binariesAvgAggregateOutputType | null;
    _sum: Unified_binariesSumAggregateOutputType | null;
    _min: Unified_binariesMinAggregateOutputType | null;
    _max: Unified_binariesMaxAggregateOutputType | null;
};
export type GetUnified_binariesGroupByPayload<T extends unified_binariesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Unified_binariesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Unified_binariesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Unified_binariesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Unified_binariesGroupByOutputType[P]>;
}>>;
export type unified_binariesWhereInput = {
    AND?: Prisma.unified_binariesWhereInput | Prisma.unified_binariesWhereInput[];
    OR?: Prisma.unified_binariesWhereInput[];
    NOT?: Prisma.unified_binariesWhereInput | Prisma.unified_binariesWhereInput[];
    id?: Prisma.UuidFilter<"unified_binaries"> | string;
    hash?: Prisma.StringFilter<"unified_binaries"> | string;
    content?: Prisma.BytesFilter<"unified_binaries"> | runtime.Bytes;
    mime_type?: Prisma.StringFilter<"unified_binaries"> | string;
    size_bytes?: Prisma.IntFilter<"unified_binaries"> | number;
    created_at?: Prisma.DateTimeNullableFilter<"unified_binaries"> | Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.Engineer_documentsListRelationFilter;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.Engineer_documentsListRelationFilter;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.Engineer_documentsListRelationFilter;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.Engineer_documentsListRelationFilter;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.Engineer_documentsListRelationFilter;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.Third_level_officials_profilesListRelationFilter;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.Third_level_officials_profilesListRelationFilter;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.Third_level_officials_profilesListRelationFilter;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.Third_level_officials_profilesListRelationFilter;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.Third_level_officials_profilesListRelationFilter;
};
export type unified_binariesOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    hash?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    mime_type?: Prisma.SortOrder;
    size_bytes?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsOrderByRelationAggregateInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsOrderByRelationAggregateInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsOrderByRelationAggregateInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsOrderByRelationAggregateInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsOrderByRelationAggregateInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesOrderByRelationAggregateInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesOrderByRelationAggregateInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesOrderByRelationAggregateInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesOrderByRelationAggregateInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesOrderByRelationAggregateInput;
};
export type unified_binariesWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    hash?: string;
    AND?: Prisma.unified_binariesWhereInput | Prisma.unified_binariesWhereInput[];
    OR?: Prisma.unified_binariesWhereInput[];
    NOT?: Prisma.unified_binariesWhereInput | Prisma.unified_binariesWhereInput[];
    content?: Prisma.BytesFilter<"unified_binaries"> | runtime.Bytes;
    mime_type?: Prisma.StringFilter<"unified_binaries"> | string;
    size_bytes?: Prisma.IntFilter<"unified_binaries"> | number;
    created_at?: Prisma.DateTimeNullableFilter<"unified_binaries"> | Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.Engineer_documentsListRelationFilter;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.Engineer_documentsListRelationFilter;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.Engineer_documentsListRelationFilter;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.Engineer_documentsListRelationFilter;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.Engineer_documentsListRelationFilter;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.Third_level_officials_profilesListRelationFilter;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.Third_level_officials_profilesListRelationFilter;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.Third_level_officials_profilesListRelationFilter;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.Third_level_officials_profilesListRelationFilter;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.Third_level_officials_profilesListRelationFilter;
}, "id" | "hash">;
export type unified_binariesOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    hash?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    mime_type?: Prisma.SortOrder;
    size_bytes?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.unified_binariesCountOrderByAggregateInput;
    _avg?: Prisma.unified_binariesAvgOrderByAggregateInput;
    _max?: Prisma.unified_binariesMaxOrderByAggregateInput;
    _min?: Prisma.unified_binariesMinOrderByAggregateInput;
    _sum?: Prisma.unified_binariesSumOrderByAggregateInput;
};
export type unified_binariesScalarWhereWithAggregatesInput = {
    AND?: Prisma.unified_binariesScalarWhereWithAggregatesInput | Prisma.unified_binariesScalarWhereWithAggregatesInput[];
    OR?: Prisma.unified_binariesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.unified_binariesScalarWhereWithAggregatesInput | Prisma.unified_binariesScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"unified_binaries"> | string;
    hash?: Prisma.StringWithAggregatesFilter<"unified_binaries"> | string;
    content?: Prisma.BytesWithAggregatesFilter<"unified_binaries"> | runtime.Bytes;
    mime_type?: Prisma.StringWithAggregatesFilter<"unified_binaries"> | string;
    size_bytes?: Prisma.IntWithAggregatesFilter<"unified_binaries"> | number;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"unified_binaries"> | Date | string | null;
};
export type unified_binariesCreateInput = {
    id?: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at?: Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesInput;
};
export type unified_binariesUncheckedCreateInput = {
    id?: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at?: Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesInput;
};
export type unified_binariesUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesNestedInput;
};
export type unified_binariesUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesNestedInput;
};
export type unified_binariesCreateManyInput = {
    id?: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at?: Date | string | null;
};
export type unified_binariesUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type unified_binariesUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type Unified_binariesNullableScalarRelationFilter = {
    is?: Prisma.unified_binariesWhereInput | null;
    isNot?: Prisma.unified_binariesWhereInput | null;
};
export type unified_binariesCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hash?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    mime_type?: Prisma.SortOrder;
    size_bytes?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type unified_binariesAvgOrderByAggregateInput = {
    size_bytes?: Prisma.SortOrder;
};
export type unified_binariesMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hash?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    mime_type?: Prisma.SortOrder;
    size_bytes?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type unified_binariesMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hash?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    mime_type?: Prisma.SortOrder;
    size_bytes?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type unified_binariesSumOrderByAggregateInput = {
    size_bytes?: Prisma.SortOrder;
};
export type unified_binariesCreateNestedOneWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput = {
    create?: Prisma.XOR<Prisma.unified_binariesCreateWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput>;
    connectOrCreate?: Prisma.unified_binariesCreateOrConnectWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput;
    connect?: Prisma.unified_binariesWhereUniqueInput;
};
export type unified_binariesCreateNestedOneWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput = {
    create?: Prisma.XOR<Prisma.unified_binariesCreateWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput>;
    connectOrCreate?: Prisma.unified_binariesCreateOrConnectWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput;
    connect?: Prisma.unified_binariesWhereUniqueInput;
};
export type unified_binariesCreateNestedOneWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput = {
    create?: Prisma.XOR<Prisma.unified_binariesCreateWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput>;
    connectOrCreate?: Prisma.unified_binariesCreateOrConnectWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput;
    connect?: Prisma.unified_binariesWhereUniqueInput;
};
export type unified_binariesCreateNestedOneWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput = {
    create?: Prisma.XOR<Prisma.unified_binariesCreateWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput>;
    connectOrCreate?: Prisma.unified_binariesCreateOrConnectWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput;
    connect?: Prisma.unified_binariesWhereUniqueInput;
};
export type unified_binariesCreateNestedOneWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput = {
    create?: Prisma.XOR<Prisma.unified_binariesCreateWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput>;
    connectOrCreate?: Prisma.unified_binariesCreateOrConnectWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput;
    connect?: Prisma.unified_binariesWhereUniqueInput;
};
export type unified_binariesUpdateOneWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesNestedInput = {
    create?: Prisma.XOR<Prisma.unified_binariesCreateWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput>;
    connectOrCreate?: Prisma.unified_binariesCreateOrConnectWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput;
    upsert?: Prisma.unified_binariesUpsertWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput;
    disconnect?: Prisma.unified_binariesWhereInput | boolean;
    delete?: Prisma.unified_binariesWhereInput | boolean;
    connect?: Prisma.unified_binariesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.unified_binariesUpdateToOneWithWhereWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput, Prisma.unified_binariesUpdateWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput>, Prisma.unified_binariesUncheckedUpdateWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput>;
};
export type unified_binariesUpdateOneWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesNestedInput = {
    create?: Prisma.XOR<Prisma.unified_binariesCreateWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput>;
    connectOrCreate?: Prisma.unified_binariesCreateOrConnectWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput;
    upsert?: Prisma.unified_binariesUpsertWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput;
    disconnect?: Prisma.unified_binariesWhereInput | boolean;
    delete?: Prisma.unified_binariesWhereInput | boolean;
    connect?: Prisma.unified_binariesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.unified_binariesUpdateToOneWithWhereWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput, Prisma.unified_binariesUpdateWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput>, Prisma.unified_binariesUncheckedUpdateWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput>;
};
export type unified_binariesUpdateOneWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesNestedInput = {
    create?: Prisma.XOR<Prisma.unified_binariesCreateWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput>;
    connectOrCreate?: Prisma.unified_binariesCreateOrConnectWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput;
    upsert?: Prisma.unified_binariesUpsertWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput;
    disconnect?: Prisma.unified_binariesWhereInput | boolean;
    delete?: Prisma.unified_binariesWhereInput | boolean;
    connect?: Prisma.unified_binariesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.unified_binariesUpdateToOneWithWhereWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput, Prisma.unified_binariesUpdateWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput>, Prisma.unified_binariesUncheckedUpdateWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput>;
};
export type unified_binariesUpdateOneWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesNestedInput = {
    create?: Prisma.XOR<Prisma.unified_binariesCreateWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput>;
    connectOrCreate?: Prisma.unified_binariesCreateOrConnectWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput;
    upsert?: Prisma.unified_binariesUpsertWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput;
    disconnect?: Prisma.unified_binariesWhereInput | boolean;
    delete?: Prisma.unified_binariesWhereInput | boolean;
    connect?: Prisma.unified_binariesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.unified_binariesUpdateToOneWithWhereWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput, Prisma.unified_binariesUpdateWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput>, Prisma.unified_binariesUncheckedUpdateWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput>;
};
export type unified_binariesUpdateOneWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesNestedInput = {
    create?: Prisma.XOR<Prisma.unified_binariesCreateWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput>;
    connectOrCreate?: Prisma.unified_binariesCreateOrConnectWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput;
    upsert?: Prisma.unified_binariesUpsertWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput;
    disconnect?: Prisma.unified_binariesWhereInput | boolean;
    delete?: Prisma.unified_binariesWhereInput | boolean;
    connect?: Prisma.unified_binariesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.unified_binariesUpdateToOneWithWhereWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput, Prisma.unified_binariesUpdateWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput>, Prisma.unified_binariesUncheckedUpdateWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput>;
};
export type unified_binariesCreateNestedOneWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput = {
    create?: Prisma.XOR<Prisma.unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput>;
    connectOrCreate?: Prisma.unified_binariesCreateOrConnectWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput;
    connect?: Prisma.unified_binariesWhereUniqueInput;
};
export type unified_binariesCreateNestedOneWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput = {
    create?: Prisma.XOR<Prisma.unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput>;
    connectOrCreate?: Prisma.unified_binariesCreateOrConnectWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput;
    connect?: Prisma.unified_binariesWhereUniqueInput;
};
export type unified_binariesCreateNestedOneWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput = {
    create?: Prisma.XOR<Prisma.unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput>;
    connectOrCreate?: Prisma.unified_binariesCreateOrConnectWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput;
    connect?: Prisma.unified_binariesWhereUniqueInput;
};
export type unified_binariesCreateNestedOneWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput = {
    create?: Prisma.XOR<Prisma.unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput>;
    connectOrCreate?: Prisma.unified_binariesCreateOrConnectWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput;
    connect?: Prisma.unified_binariesWhereUniqueInput;
};
export type unified_binariesCreateNestedOneWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput = {
    create?: Prisma.XOR<Prisma.unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput>;
    connectOrCreate?: Prisma.unified_binariesCreateOrConnectWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput;
    connect?: Prisma.unified_binariesWhereUniqueInput;
};
export type unified_binariesUpdateOneWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesNestedInput = {
    create?: Prisma.XOR<Prisma.unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput>;
    connectOrCreate?: Prisma.unified_binariesCreateOrConnectWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput;
    upsert?: Prisma.unified_binariesUpsertWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput;
    disconnect?: Prisma.unified_binariesWhereInput | boolean;
    delete?: Prisma.unified_binariesWhereInput | boolean;
    connect?: Prisma.unified_binariesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.unified_binariesUpdateToOneWithWhereWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput, Prisma.unified_binariesUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput>, Prisma.unified_binariesUncheckedUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput>;
};
export type unified_binariesUpdateOneWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesNestedInput = {
    create?: Prisma.XOR<Prisma.unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput>;
    connectOrCreate?: Prisma.unified_binariesCreateOrConnectWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput;
    upsert?: Prisma.unified_binariesUpsertWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput;
    disconnect?: Prisma.unified_binariesWhereInput | boolean;
    delete?: Prisma.unified_binariesWhereInput | boolean;
    connect?: Prisma.unified_binariesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.unified_binariesUpdateToOneWithWhereWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput, Prisma.unified_binariesUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput>, Prisma.unified_binariesUncheckedUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput>;
};
export type unified_binariesUpdateOneWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesNestedInput = {
    create?: Prisma.XOR<Prisma.unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput>;
    connectOrCreate?: Prisma.unified_binariesCreateOrConnectWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput;
    upsert?: Prisma.unified_binariesUpsertWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput;
    disconnect?: Prisma.unified_binariesWhereInput | boolean;
    delete?: Prisma.unified_binariesWhereInput | boolean;
    connect?: Prisma.unified_binariesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.unified_binariesUpdateToOneWithWhereWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput, Prisma.unified_binariesUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput>, Prisma.unified_binariesUncheckedUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput>;
};
export type unified_binariesUpdateOneWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesNestedInput = {
    create?: Prisma.XOR<Prisma.unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput>;
    connectOrCreate?: Prisma.unified_binariesCreateOrConnectWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput;
    upsert?: Prisma.unified_binariesUpsertWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput;
    disconnect?: Prisma.unified_binariesWhereInput | boolean;
    delete?: Prisma.unified_binariesWhereInput | boolean;
    connect?: Prisma.unified_binariesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.unified_binariesUpdateToOneWithWhereWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput, Prisma.unified_binariesUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput>, Prisma.unified_binariesUncheckedUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput>;
};
export type unified_binariesUpdateOneWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesNestedInput = {
    create?: Prisma.XOR<Prisma.unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput>;
    connectOrCreate?: Prisma.unified_binariesCreateOrConnectWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput;
    upsert?: Prisma.unified_binariesUpsertWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput;
    disconnect?: Prisma.unified_binariesWhereInput | boolean;
    delete?: Prisma.unified_binariesWhereInput | boolean;
    connect?: Prisma.unified_binariesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.unified_binariesUpdateToOneWithWhereWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput, Prisma.unified_binariesUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput>, Prisma.unified_binariesUncheckedUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput>;
};
export type BytesFieldUpdateOperationsInput = {
    set?: runtime.Bytes;
};
export type unified_binariesCreateWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput = {
    id?: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at?: Date | string | null;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesInput;
};
export type unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput = {
    id?: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at?: Date | string | null;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesInput;
};
export type unified_binariesCreateOrConnectWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput = {
    where: Prisma.unified_binariesWhereUniqueInput;
    create: Prisma.XOR<Prisma.unified_binariesCreateWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput>;
};
export type unified_binariesCreateWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput = {
    id?: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at?: Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesInput;
};
export type unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput = {
    id?: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at?: Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesInput;
};
export type unified_binariesCreateOrConnectWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput = {
    where: Prisma.unified_binariesWhereUniqueInput;
    create: Prisma.XOR<Prisma.unified_binariesCreateWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput>;
};
export type unified_binariesCreateWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput = {
    id?: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at?: Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesInput;
};
export type unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput = {
    id?: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at?: Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesInput;
};
export type unified_binariesCreateOrConnectWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput = {
    where: Prisma.unified_binariesWhereUniqueInput;
    create: Prisma.XOR<Prisma.unified_binariesCreateWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput>;
};
export type unified_binariesCreateWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput = {
    id?: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at?: Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesInput;
};
export type unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput = {
    id?: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at?: Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesInput;
};
export type unified_binariesCreateOrConnectWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput = {
    where: Prisma.unified_binariesWhereUniqueInput;
    create: Prisma.XOR<Prisma.unified_binariesCreateWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput>;
};
export type unified_binariesCreateWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput = {
    id?: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at?: Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesInput;
};
export type unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput = {
    id?: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at?: Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesInput;
};
export type unified_binariesCreateOrConnectWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput = {
    where: Prisma.unified_binariesWhereUniqueInput;
    create: Prisma.XOR<Prisma.unified_binariesCreateWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput>;
};
export type unified_binariesUpsertWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput = {
    update: Prisma.XOR<Prisma.unified_binariesUpdateWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedUpdateWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput>;
    create: Prisma.XOR<Prisma.unified_binariesCreateWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput>;
    where?: Prisma.unified_binariesWhereInput;
};
export type unified_binariesUpdateToOneWithWhereWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput = {
    where?: Prisma.unified_binariesWhereInput;
    data: Prisma.XOR<Prisma.unified_binariesUpdateWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedUpdateWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput>;
};
export type unified_binariesUpdateWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesNestedInput;
};
export type unified_binariesUncheckedUpdateWithoutEngineer_documents_engineer_documents_contract_binary_idTounified_binariesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesNestedInput;
};
export type unified_binariesUpsertWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput = {
    update: Prisma.XOR<Prisma.unified_binariesUpdateWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedUpdateWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput>;
    create: Prisma.XOR<Prisma.unified_binariesCreateWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput>;
    where?: Prisma.unified_binariesWhereInput;
};
export type unified_binariesUpdateToOneWithWhereWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput = {
    where?: Prisma.unified_binariesWhereInput;
    data: Prisma.XOR<Prisma.unified_binariesUpdateWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedUpdateWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput>;
};
export type unified_binariesUpdateWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesNestedInput;
};
export type unified_binariesUncheckedUpdateWithoutEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesNestedInput;
};
export type unified_binariesUpsertWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput = {
    update: Prisma.XOR<Prisma.unified_binariesUpdateWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedUpdateWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput>;
    create: Prisma.XOR<Prisma.unified_binariesCreateWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput>;
    where?: Prisma.unified_binariesWhereInput;
};
export type unified_binariesUpdateToOneWithWhereWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput = {
    where?: Prisma.unified_binariesWhereInput;
    data: Prisma.XOR<Prisma.unified_binariesUpdateWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedUpdateWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput>;
};
export type unified_binariesUpdateWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesNestedInput;
};
export type unified_binariesUncheckedUpdateWithoutEngineer_documents_engineer_documents_moa_binary_idTounified_binariesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesNestedInput;
};
export type unified_binariesUpsertWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput = {
    update: Prisma.XOR<Prisma.unified_binariesUpdateWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedUpdateWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput>;
    create: Prisma.XOR<Prisma.unified_binariesCreateWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput>;
    where?: Prisma.unified_binariesWhereInput;
};
export type unified_binariesUpdateToOneWithWhereWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput = {
    where?: Prisma.unified_binariesWhereInput;
    data: Prisma.XOR<Prisma.unified_binariesUpdateWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedUpdateWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput>;
};
export type unified_binariesUpdateWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesNestedInput;
};
export type unified_binariesUncheckedUpdateWithoutEngineer_documents_engineer_documents_pow_binary_idTounified_binariesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesNestedInput;
};
export type unified_binariesUpsertWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput = {
    update: Prisma.XOR<Prisma.unified_binariesUpdateWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedUpdateWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput>;
    create: Prisma.XOR<Prisma.unified_binariesCreateWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput>;
    where?: Prisma.unified_binariesWhereInput;
};
export type unified_binariesUpdateToOneWithWhereWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput = {
    where?: Prisma.unified_binariesWhereInput;
    data: Prisma.XOR<Prisma.unified_binariesUpdateWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedUpdateWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput>;
};
export type unified_binariesUpdateWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesNestedInput;
};
export type unified_binariesUncheckedUpdateWithoutEngineer_documents_engineer_documents_rta_binary_idTounified_binariesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesNestedInput;
};
export type unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput = {
    id?: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at?: Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesInput;
};
export type unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput = {
    id?: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at?: Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesInput;
};
export type unified_binariesCreateOrConnectWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput = {
    where: Prisma.unified_binariesWhereUniqueInput;
    create: Prisma.XOR<Prisma.unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput>;
};
export type unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput = {
    id?: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at?: Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesInput;
};
export type unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput = {
    id?: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at?: Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesInput;
};
export type unified_binariesCreateOrConnectWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput = {
    where: Prisma.unified_binariesWhereUniqueInput;
    create: Prisma.XOR<Prisma.unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput>;
};
export type unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput = {
    id?: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at?: Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesInput;
};
export type unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput = {
    id?: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at?: Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesInput;
};
export type unified_binariesCreateOrConnectWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput = {
    where: Prisma.unified_binariesWhereUniqueInput;
    create: Prisma.XOR<Prisma.unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput>;
};
export type unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput = {
    id?: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at?: Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesInput;
};
export type unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput = {
    id?: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at?: Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesInput;
};
export type unified_binariesCreateOrConnectWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput = {
    where: Prisma.unified_binariesWhereUniqueInput;
    create: Prisma.XOR<Prisma.unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput>;
};
export type unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput = {
    id?: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at?: Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsCreateNestedManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput;
};
export type unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput = {
    id?: string;
    hash: string;
    content: runtime.Bytes;
    mime_type: string;
    size_bytes: number;
    created_at?: Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedCreateNestedManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedCreateNestedManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput;
};
export type unified_binariesCreateOrConnectWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput = {
    where: Prisma.unified_binariesWhereUniqueInput;
    create: Prisma.XOR<Prisma.unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput>;
};
export type unified_binariesUpsertWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput = {
    update: Prisma.XOR<Prisma.unified_binariesUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput>;
    create: Prisma.XOR<Prisma.unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput>;
    where?: Prisma.unified_binariesWhereInput;
};
export type unified_binariesUpdateToOneWithWhereWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput = {
    where?: Prisma.unified_binariesWhereInput;
    data: Prisma.XOR<Prisma.unified_binariesUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput>;
};
export type unified_binariesUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesNestedInput;
};
export type unified_binariesUncheckedUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesNestedInput;
};
export type unified_binariesUpsertWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput = {
    update: Prisma.XOR<Prisma.unified_binariesUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput>;
    create: Prisma.XOR<Prisma.unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput>;
    where?: Prisma.unified_binariesWhereInput;
};
export type unified_binariesUpdateToOneWithWhereWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput = {
    where?: Prisma.unified_binariesWhereInput;
    data: Prisma.XOR<Prisma.unified_binariesUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput>;
};
export type unified_binariesUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesNestedInput;
};
export type unified_binariesUncheckedUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesNestedInput;
};
export type unified_binariesUpsertWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput = {
    update: Prisma.XOR<Prisma.unified_binariesUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput>;
    create: Prisma.XOR<Prisma.unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput>;
    where?: Prisma.unified_binariesWhereInput;
};
export type unified_binariesUpdateToOneWithWhereWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput = {
    where?: Prisma.unified_binariesWhereInput;
    data: Prisma.XOR<Prisma.unified_binariesUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput>;
};
export type unified_binariesUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesNestedInput;
};
export type unified_binariesUncheckedUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesNestedInput;
};
export type unified_binariesUpsertWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput = {
    update: Prisma.XOR<Prisma.unified_binariesUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput>;
    create: Prisma.XOR<Prisma.unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput>;
    where?: Prisma.unified_binariesWhereInput;
};
export type unified_binariesUpdateToOneWithWhereWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput = {
    where?: Prisma.unified_binariesWhereInput;
    data: Prisma.XOR<Prisma.unified_binariesUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput>;
};
export type unified_binariesUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesNestedInput;
};
export type unified_binariesUncheckedUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_service_records_binary_idTounified_binariesNestedInput;
};
export type unified_binariesUpsertWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput = {
    update: Prisma.XOR<Prisma.unified_binariesUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput>;
    create: Prisma.XOR<Prisma.unified_binariesCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedCreateWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput>;
    where?: Prisma.unified_binariesWhereInput;
};
export type unified_binariesUpdateToOneWithWhereWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput = {
    where?: Prisma.unified_binariesWhereInput;
    data: Prisma.XOR<Prisma.unified_binariesUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput, Prisma.unified_binariesUncheckedUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput>;
};
export type unified_binariesUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUpdateManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesNestedInput;
};
export type unified_binariesUncheckedUpdateWithoutThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.BytesFieldUpdateOperationsInput | runtime.Bytes;
    mime_type?: Prisma.StringFieldUpdateOperationsInput | string;
    size_bytes?: Prisma.IntFieldUpdateOperationsInput | number;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_contract_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_dupa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_moa_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_pow_binary_idTounified_binariesNestedInput;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: Prisma.engineer_documentsUncheckedUpdateManyWithoutUnified_binaries_engineer_documents_rta_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_pds_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_photo_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesNestedInput;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: Prisma.third_level_officials_profilesUncheckedUpdateManyWithoutUnified_binaries_third_level_officials_profiles_profile_word_binary_idTounified_binariesNestedInput;
};
export type Unified_binariesCountOutputType = {
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries: number;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries: number;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries: number;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries: number;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries: number;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries: number;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries: number;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries: number;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries: number;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries: number;
};
export type Unified_binariesCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: boolean | Unified_binariesCountOutputTypeCountEngineer_documents_engineer_documents_contract_binary_idTounified_binariesArgs;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: boolean | Unified_binariesCountOutputTypeCountEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesArgs;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: boolean | Unified_binariesCountOutputTypeCountEngineer_documents_engineer_documents_moa_binary_idTounified_binariesArgs;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: boolean | Unified_binariesCountOutputTypeCountEngineer_documents_engineer_documents_pow_binary_idTounified_binariesArgs;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: boolean | Unified_binariesCountOutputTypeCountEngineer_documents_engineer_documents_rta_binary_idTounified_binariesArgs;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: boolean | Unified_binariesCountOutputTypeCountThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesArgs;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: boolean | Unified_binariesCountOutputTypeCountThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesArgs;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: boolean | Unified_binariesCountOutputTypeCountThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesArgs;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: boolean | Unified_binariesCountOutputTypeCountThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesArgs;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: boolean | Unified_binariesCountOutputTypeCountThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesArgs;
};
export type Unified_binariesCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.Unified_binariesCountOutputTypeSelect<ExtArgs> | null;
};
export type Unified_binariesCountOutputTypeCountEngineer_documents_engineer_documents_contract_binary_idTounified_binariesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.engineer_documentsWhereInput;
};
export type Unified_binariesCountOutputTypeCountEngineer_documents_engineer_documents_dupa_binary_idTounified_binariesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.engineer_documentsWhereInput;
};
export type Unified_binariesCountOutputTypeCountEngineer_documents_engineer_documents_moa_binary_idTounified_binariesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.engineer_documentsWhereInput;
};
export type Unified_binariesCountOutputTypeCountEngineer_documents_engineer_documents_pow_binary_idTounified_binariesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.engineer_documentsWhereInput;
};
export type Unified_binariesCountOutputTypeCountEngineer_documents_engineer_documents_rta_binary_idTounified_binariesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.engineer_documentsWhereInput;
};
export type Unified_binariesCountOutputTypeCountThird_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.third_level_officials_profilesWhereInput;
};
export type Unified_binariesCountOutputTypeCountThird_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.third_level_officials_profilesWhereInput;
};
export type Unified_binariesCountOutputTypeCountThird_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.third_level_officials_profilesWhereInput;
};
export type Unified_binariesCountOutputTypeCountThird_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.third_level_officials_profilesWhereInput;
};
export type Unified_binariesCountOutputTypeCountThird_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.third_level_officials_profilesWhereInput;
};
export type unified_binariesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hash?: boolean;
    content?: boolean;
    mime_type?: boolean;
    size_bytes?: boolean;
    created_at?: boolean;
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: boolean | Prisma.unified_binaries$engineer_documents_engineer_documents_contract_binary_idTounified_binariesArgs<ExtArgs>;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: boolean | Prisma.unified_binaries$engineer_documents_engineer_documents_dupa_binary_idTounified_binariesArgs<ExtArgs>;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: boolean | Prisma.unified_binaries$engineer_documents_engineer_documents_moa_binary_idTounified_binariesArgs<ExtArgs>;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: boolean | Prisma.unified_binaries$engineer_documents_engineer_documents_pow_binary_idTounified_binariesArgs<ExtArgs>;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: boolean | Prisma.unified_binaries$engineer_documents_engineer_documents_rta_binary_idTounified_binariesArgs<ExtArgs>;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: boolean | Prisma.unified_binaries$third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesArgs<ExtArgs>;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: boolean | Prisma.unified_binaries$third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesArgs<ExtArgs>;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: boolean | Prisma.unified_binaries$third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesArgs<ExtArgs>;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: boolean | Prisma.unified_binaries$third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesArgs<ExtArgs>;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: boolean | Prisma.unified_binaries$third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesArgs<ExtArgs>;
    _count?: boolean | Prisma.Unified_binariesCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["unified_binaries"]>;
export type unified_binariesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hash?: boolean;
    content?: boolean;
    mime_type?: boolean;
    size_bytes?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["unified_binaries"]>;
export type unified_binariesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hash?: boolean;
    content?: boolean;
    mime_type?: boolean;
    size_bytes?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["unified_binaries"]>;
export type unified_binariesSelectScalar = {
    id?: boolean;
    hash?: boolean;
    content?: boolean;
    mime_type?: boolean;
    size_bytes?: boolean;
    created_at?: boolean;
};
export type unified_binariesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "hash" | "content" | "mime_type" | "size_bytes" | "created_at", ExtArgs["result"]["unified_binaries"]>;
export type unified_binariesInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries?: boolean | Prisma.unified_binaries$engineer_documents_engineer_documents_contract_binary_idTounified_binariesArgs<ExtArgs>;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries?: boolean | Prisma.unified_binaries$engineer_documents_engineer_documents_dupa_binary_idTounified_binariesArgs<ExtArgs>;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries?: boolean | Prisma.unified_binaries$engineer_documents_engineer_documents_moa_binary_idTounified_binariesArgs<ExtArgs>;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries?: boolean | Prisma.unified_binaries$engineer_documents_engineer_documents_pow_binary_idTounified_binariesArgs<ExtArgs>;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries?: boolean | Prisma.unified_binaries$engineer_documents_engineer_documents_rta_binary_idTounified_binariesArgs<ExtArgs>;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries?: boolean | Prisma.unified_binaries$third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesArgs<ExtArgs>;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries?: boolean | Prisma.unified_binaries$third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesArgs<ExtArgs>;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries?: boolean | Prisma.unified_binaries$third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesArgs<ExtArgs>;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries?: boolean | Prisma.unified_binaries$third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesArgs<ExtArgs>;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries?: boolean | Prisma.unified_binaries$third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesArgs<ExtArgs>;
    _count?: boolean | Prisma.Unified_binariesCountOutputTypeDefaultArgs<ExtArgs>;
};
export type unified_binariesIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type unified_binariesIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $unified_binariesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "unified_binaries";
    objects: {
        engineer_documents_engineer_documents_contract_binary_idTounified_binaries: Prisma.$engineer_documentsPayload<ExtArgs>[];
        engineer_documents_engineer_documents_dupa_binary_idTounified_binaries: Prisma.$engineer_documentsPayload<ExtArgs>[];
        engineer_documents_engineer_documents_moa_binary_idTounified_binaries: Prisma.$engineer_documentsPayload<ExtArgs>[];
        engineer_documents_engineer_documents_pow_binary_idTounified_binaries: Prisma.$engineer_documentsPayload<ExtArgs>[];
        engineer_documents_engineer_documents_rta_binary_idTounified_binaries: Prisma.$engineer_documentsPayload<ExtArgs>[];
        third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries: Prisma.$third_level_officials_profilesPayload<ExtArgs>[];
        third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries: Prisma.$third_level_officials_profilesPayload<ExtArgs>[];
        third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries: Prisma.$third_level_officials_profilesPayload<ExtArgs>[];
        third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries: Prisma.$third_level_officials_profilesPayload<ExtArgs>[];
        third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries: Prisma.$third_level_officials_profilesPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        hash: string;
        content: runtime.Bytes;
        mime_type: string;
        size_bytes: number;
        created_at: Date | null;
    }, ExtArgs["result"]["unified_binaries"]>;
    composites: {};
};
export type unified_binariesGetPayload<S extends boolean | null | undefined | unified_binariesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$unified_binariesPayload, S>;
export type unified_binariesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<unified_binariesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Unified_binariesCountAggregateInputType | true;
};
export interface unified_binariesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['unified_binaries'];
        meta: {
            name: 'unified_binaries';
        };
    };
    findUnique<T extends unified_binariesFindUniqueArgs>(args: Prisma.SelectSubset<T, unified_binariesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__unified_binariesClient<runtime.Types.Result.GetResult<Prisma.$unified_binariesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends unified_binariesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, unified_binariesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__unified_binariesClient<runtime.Types.Result.GetResult<Prisma.$unified_binariesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends unified_binariesFindFirstArgs>(args?: Prisma.SelectSubset<T, unified_binariesFindFirstArgs<ExtArgs>>): Prisma.Prisma__unified_binariesClient<runtime.Types.Result.GetResult<Prisma.$unified_binariesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends unified_binariesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, unified_binariesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__unified_binariesClient<runtime.Types.Result.GetResult<Prisma.$unified_binariesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends unified_binariesFindManyArgs>(args?: Prisma.SelectSubset<T, unified_binariesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$unified_binariesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends unified_binariesCreateArgs>(args: Prisma.SelectSubset<T, unified_binariesCreateArgs<ExtArgs>>): Prisma.Prisma__unified_binariesClient<runtime.Types.Result.GetResult<Prisma.$unified_binariesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends unified_binariesCreateManyArgs>(args?: Prisma.SelectSubset<T, unified_binariesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends unified_binariesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, unified_binariesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$unified_binariesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends unified_binariesDeleteArgs>(args: Prisma.SelectSubset<T, unified_binariesDeleteArgs<ExtArgs>>): Prisma.Prisma__unified_binariesClient<runtime.Types.Result.GetResult<Prisma.$unified_binariesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends unified_binariesUpdateArgs>(args: Prisma.SelectSubset<T, unified_binariesUpdateArgs<ExtArgs>>): Prisma.Prisma__unified_binariesClient<runtime.Types.Result.GetResult<Prisma.$unified_binariesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends unified_binariesDeleteManyArgs>(args?: Prisma.SelectSubset<T, unified_binariesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends unified_binariesUpdateManyArgs>(args: Prisma.SelectSubset<T, unified_binariesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends unified_binariesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, unified_binariesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$unified_binariesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends unified_binariesUpsertArgs>(args: Prisma.SelectSubset<T, unified_binariesUpsertArgs<ExtArgs>>): Prisma.Prisma__unified_binariesClient<runtime.Types.Result.GetResult<Prisma.$unified_binariesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends unified_binariesCountArgs>(args?: Prisma.Subset<T, unified_binariesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Unified_binariesCountAggregateOutputType> : number>;
    aggregate<T extends Unified_binariesAggregateArgs>(args: Prisma.Subset<T, Unified_binariesAggregateArgs>): Prisma.PrismaPromise<GetUnified_binariesAggregateType<T>>;
    groupBy<T extends unified_binariesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: unified_binariesGroupByArgs['orderBy'];
    } : {
        orderBy?: unified_binariesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, unified_binariesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUnified_binariesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: unified_binariesFieldRefs;
}
export interface Prisma__unified_binariesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    engineer_documents_engineer_documents_contract_binary_idTounified_binaries<T extends Prisma.unified_binaries$engineer_documents_engineer_documents_contract_binary_idTounified_binariesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.unified_binaries$engineer_documents_engineer_documents_contract_binary_idTounified_binariesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$engineer_documentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    engineer_documents_engineer_documents_dupa_binary_idTounified_binaries<T extends Prisma.unified_binaries$engineer_documents_engineer_documents_dupa_binary_idTounified_binariesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.unified_binaries$engineer_documents_engineer_documents_dupa_binary_idTounified_binariesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$engineer_documentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    engineer_documents_engineer_documents_moa_binary_idTounified_binaries<T extends Prisma.unified_binaries$engineer_documents_engineer_documents_moa_binary_idTounified_binariesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.unified_binaries$engineer_documents_engineer_documents_moa_binary_idTounified_binariesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$engineer_documentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    engineer_documents_engineer_documents_pow_binary_idTounified_binaries<T extends Prisma.unified_binaries$engineer_documents_engineer_documents_pow_binary_idTounified_binariesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.unified_binaries$engineer_documents_engineer_documents_pow_binary_idTounified_binariesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$engineer_documentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    engineer_documents_engineer_documents_rta_binary_idTounified_binaries<T extends Prisma.unified_binaries$engineer_documents_engineer_documents_rta_binary_idTounified_binariesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.unified_binaries$engineer_documents_engineer_documents_rta_binary_idTounified_binariesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$engineer_documentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binaries<T extends Prisma.unified_binaries$third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.unified_binaries$third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$third_level_officials_profilesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binaries<T extends Prisma.unified_binaries$third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.unified_binaries$third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$third_level_officials_profilesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binaries<T extends Prisma.unified_binaries$third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.unified_binaries$third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$third_level_officials_profilesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binaries<T extends Prisma.unified_binaries$third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.unified_binaries$third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$third_level_officials_profilesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binaries<T extends Prisma.unified_binaries$third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.unified_binaries$third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$third_level_officials_profilesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface unified_binariesFieldRefs {
    readonly id: Prisma.FieldRef<"unified_binaries", 'String'>;
    readonly hash: Prisma.FieldRef<"unified_binaries", 'String'>;
    readonly content: Prisma.FieldRef<"unified_binaries", 'Bytes'>;
    readonly mime_type: Prisma.FieldRef<"unified_binaries", 'String'>;
    readonly size_bytes: Prisma.FieldRef<"unified_binaries", 'Int'>;
    readonly created_at: Prisma.FieldRef<"unified_binaries", 'DateTime'>;
}
export type unified_binariesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unified_binariesSelect<ExtArgs> | null;
    omit?: Prisma.unified_binariesOmit<ExtArgs> | null;
    include?: Prisma.unified_binariesInclude<ExtArgs> | null;
    where: Prisma.unified_binariesWhereUniqueInput;
};
export type unified_binariesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unified_binariesSelect<ExtArgs> | null;
    omit?: Prisma.unified_binariesOmit<ExtArgs> | null;
    include?: Prisma.unified_binariesInclude<ExtArgs> | null;
    where: Prisma.unified_binariesWhereUniqueInput;
};
export type unified_binariesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unified_binariesSelect<ExtArgs> | null;
    omit?: Prisma.unified_binariesOmit<ExtArgs> | null;
    include?: Prisma.unified_binariesInclude<ExtArgs> | null;
    where?: Prisma.unified_binariesWhereInput;
    orderBy?: Prisma.unified_binariesOrderByWithRelationInput | Prisma.unified_binariesOrderByWithRelationInput[];
    cursor?: Prisma.unified_binariesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Unified_binariesScalarFieldEnum | Prisma.Unified_binariesScalarFieldEnum[];
};
export type unified_binariesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unified_binariesSelect<ExtArgs> | null;
    omit?: Prisma.unified_binariesOmit<ExtArgs> | null;
    include?: Prisma.unified_binariesInclude<ExtArgs> | null;
    where?: Prisma.unified_binariesWhereInput;
    orderBy?: Prisma.unified_binariesOrderByWithRelationInput | Prisma.unified_binariesOrderByWithRelationInput[];
    cursor?: Prisma.unified_binariesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Unified_binariesScalarFieldEnum | Prisma.Unified_binariesScalarFieldEnum[];
};
export type unified_binariesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unified_binariesSelect<ExtArgs> | null;
    omit?: Prisma.unified_binariesOmit<ExtArgs> | null;
    include?: Prisma.unified_binariesInclude<ExtArgs> | null;
    where?: Prisma.unified_binariesWhereInput;
    orderBy?: Prisma.unified_binariesOrderByWithRelationInput | Prisma.unified_binariesOrderByWithRelationInput[];
    cursor?: Prisma.unified_binariesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Unified_binariesScalarFieldEnum | Prisma.Unified_binariesScalarFieldEnum[];
};
export type unified_binariesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unified_binariesSelect<ExtArgs> | null;
    omit?: Prisma.unified_binariesOmit<ExtArgs> | null;
    include?: Prisma.unified_binariesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.unified_binariesCreateInput, Prisma.unified_binariesUncheckedCreateInput>;
};
export type unified_binariesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.unified_binariesCreateManyInput | Prisma.unified_binariesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type unified_binariesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unified_binariesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.unified_binariesOmit<ExtArgs> | null;
    data: Prisma.unified_binariesCreateManyInput | Prisma.unified_binariesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type unified_binariesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unified_binariesSelect<ExtArgs> | null;
    omit?: Prisma.unified_binariesOmit<ExtArgs> | null;
    include?: Prisma.unified_binariesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.unified_binariesUpdateInput, Prisma.unified_binariesUncheckedUpdateInput>;
    where: Prisma.unified_binariesWhereUniqueInput;
};
export type unified_binariesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.unified_binariesUpdateManyMutationInput, Prisma.unified_binariesUncheckedUpdateManyInput>;
    where?: Prisma.unified_binariesWhereInput;
    limit?: number;
};
export type unified_binariesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unified_binariesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.unified_binariesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.unified_binariesUpdateManyMutationInput, Prisma.unified_binariesUncheckedUpdateManyInput>;
    where?: Prisma.unified_binariesWhereInput;
    limit?: number;
};
export type unified_binariesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unified_binariesSelect<ExtArgs> | null;
    omit?: Prisma.unified_binariesOmit<ExtArgs> | null;
    include?: Prisma.unified_binariesInclude<ExtArgs> | null;
    where: Prisma.unified_binariesWhereUniqueInput;
    create: Prisma.XOR<Prisma.unified_binariesCreateInput, Prisma.unified_binariesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.unified_binariesUpdateInput, Prisma.unified_binariesUncheckedUpdateInput>;
};
export type unified_binariesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unified_binariesSelect<ExtArgs> | null;
    omit?: Prisma.unified_binariesOmit<ExtArgs> | null;
    include?: Prisma.unified_binariesInclude<ExtArgs> | null;
    where: Prisma.unified_binariesWhereUniqueInput;
};
export type unified_binariesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.unified_binariesWhereInput;
    limit?: number;
};
export type unified_binaries$engineer_documents_engineer_documents_contract_binary_idTounified_binariesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_documentsSelect<ExtArgs> | null;
    omit?: Prisma.engineer_documentsOmit<ExtArgs> | null;
    include?: Prisma.engineer_documentsInclude<ExtArgs> | null;
    where?: Prisma.engineer_documentsWhereInput;
    orderBy?: Prisma.engineer_documentsOrderByWithRelationInput | Prisma.engineer_documentsOrderByWithRelationInput[];
    cursor?: Prisma.engineer_documentsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Engineer_documentsScalarFieldEnum | Prisma.Engineer_documentsScalarFieldEnum[];
};
export type unified_binaries$engineer_documents_engineer_documents_dupa_binary_idTounified_binariesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_documentsSelect<ExtArgs> | null;
    omit?: Prisma.engineer_documentsOmit<ExtArgs> | null;
    include?: Prisma.engineer_documentsInclude<ExtArgs> | null;
    where?: Prisma.engineer_documentsWhereInput;
    orderBy?: Prisma.engineer_documentsOrderByWithRelationInput | Prisma.engineer_documentsOrderByWithRelationInput[];
    cursor?: Prisma.engineer_documentsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Engineer_documentsScalarFieldEnum | Prisma.Engineer_documentsScalarFieldEnum[];
};
export type unified_binaries$engineer_documents_engineer_documents_moa_binary_idTounified_binariesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_documentsSelect<ExtArgs> | null;
    omit?: Prisma.engineer_documentsOmit<ExtArgs> | null;
    include?: Prisma.engineer_documentsInclude<ExtArgs> | null;
    where?: Prisma.engineer_documentsWhereInput;
    orderBy?: Prisma.engineer_documentsOrderByWithRelationInput | Prisma.engineer_documentsOrderByWithRelationInput[];
    cursor?: Prisma.engineer_documentsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Engineer_documentsScalarFieldEnum | Prisma.Engineer_documentsScalarFieldEnum[];
};
export type unified_binaries$engineer_documents_engineer_documents_pow_binary_idTounified_binariesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_documentsSelect<ExtArgs> | null;
    omit?: Prisma.engineer_documentsOmit<ExtArgs> | null;
    include?: Prisma.engineer_documentsInclude<ExtArgs> | null;
    where?: Prisma.engineer_documentsWhereInput;
    orderBy?: Prisma.engineer_documentsOrderByWithRelationInput | Prisma.engineer_documentsOrderByWithRelationInput[];
    cursor?: Prisma.engineer_documentsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Engineer_documentsScalarFieldEnum | Prisma.Engineer_documentsScalarFieldEnum[];
};
export type unified_binaries$engineer_documents_engineer_documents_rta_binary_idTounified_binariesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_documentsSelect<ExtArgs> | null;
    omit?: Prisma.engineer_documentsOmit<ExtArgs> | null;
    include?: Prisma.engineer_documentsInclude<ExtArgs> | null;
    where?: Prisma.engineer_documentsWhereInput;
    orderBy?: Prisma.engineer_documentsOrderByWithRelationInput | Prisma.engineer_documentsOrderByWithRelationInput[];
    cursor?: Prisma.engineer_documentsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Engineer_documentsScalarFieldEnum | Prisma.Engineer_documentsScalarFieldEnum[];
};
export type unified_binaries$third_level_officials_profiles_third_level_officials_profiles_pds_binary_idTounified_binariesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.third_level_officials_profilesSelect<ExtArgs> | null;
    omit?: Prisma.third_level_officials_profilesOmit<ExtArgs> | null;
    include?: Prisma.third_level_officials_profilesInclude<ExtArgs> | null;
    where?: Prisma.third_level_officials_profilesWhereInput;
    orderBy?: Prisma.third_level_officials_profilesOrderByWithRelationInput | Prisma.third_level_officials_profilesOrderByWithRelationInput[];
    cursor?: Prisma.third_level_officials_profilesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Third_level_officials_profilesScalarFieldEnum | Prisma.Third_level_officials_profilesScalarFieldEnum[];
};
export type unified_binaries$third_level_officials_profiles_third_level_officials_profiles_photo_binary_idTounified_binariesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.third_level_officials_profilesSelect<ExtArgs> | null;
    omit?: Prisma.third_level_officials_profilesOmit<ExtArgs> | null;
    include?: Prisma.third_level_officials_profilesInclude<ExtArgs> | null;
    where?: Prisma.third_level_officials_profilesWhereInput;
    orderBy?: Prisma.third_level_officials_profilesOrderByWithRelationInput | Prisma.third_level_officials_profilesOrderByWithRelationInput[];
    cursor?: Prisma.third_level_officials_profilesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Third_level_officials_profilesScalarFieldEnum | Prisma.Third_level_officials_profilesScalarFieldEnum[];
};
export type unified_binaries$third_level_officials_profiles_third_level_officials_profiles_profile_ppt_binary_idTounified_binariesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.third_level_officials_profilesSelect<ExtArgs> | null;
    omit?: Prisma.third_level_officials_profilesOmit<ExtArgs> | null;
    include?: Prisma.third_level_officials_profilesInclude<ExtArgs> | null;
    where?: Prisma.third_level_officials_profilesWhereInput;
    orderBy?: Prisma.third_level_officials_profilesOrderByWithRelationInput | Prisma.third_level_officials_profilesOrderByWithRelationInput[];
    cursor?: Prisma.third_level_officials_profilesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Third_level_officials_profilesScalarFieldEnum | Prisma.Third_level_officials_profilesScalarFieldEnum[];
};
export type unified_binaries$third_level_officials_profiles_third_level_officials_profiles_profile_word_binary_idTounified_binariesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.third_level_officials_profilesSelect<ExtArgs> | null;
    omit?: Prisma.third_level_officials_profilesOmit<ExtArgs> | null;
    include?: Prisma.third_level_officials_profilesInclude<ExtArgs> | null;
    where?: Prisma.third_level_officials_profilesWhereInput;
    orderBy?: Prisma.third_level_officials_profilesOrderByWithRelationInput | Prisma.third_level_officials_profilesOrderByWithRelationInput[];
    cursor?: Prisma.third_level_officials_profilesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Third_level_officials_profilesScalarFieldEnum | Prisma.Third_level_officials_profilesScalarFieldEnum[];
};
export type unified_binaries$third_level_officials_profiles_third_level_officials_profiles_service_records_binary_idTounified_binariesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.third_level_officials_profilesSelect<ExtArgs> | null;
    omit?: Prisma.third_level_officials_profilesOmit<ExtArgs> | null;
    include?: Prisma.third_level_officials_profilesInclude<ExtArgs> | null;
    where?: Prisma.third_level_officials_profilesWhereInput;
    orderBy?: Prisma.third_level_officials_profilesOrderByWithRelationInput | Prisma.third_level_officials_profilesOrderByWithRelationInput[];
    cursor?: Prisma.third_level_officials_profilesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Third_level_officials_profilesScalarFieldEnum | Prisma.Third_level_officials_profilesScalarFieldEnum[];
};
export type unified_binariesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unified_binariesSelect<ExtArgs> | null;
    omit?: Prisma.unified_binariesOmit<ExtArgs> | null;
    include?: Prisma.unified_binariesInclude<ExtArgs> | null;
};
