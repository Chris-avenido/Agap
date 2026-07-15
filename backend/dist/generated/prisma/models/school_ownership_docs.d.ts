import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type school_ownership_docsModel = runtime.Types.Result.DefaultSelection<Prisma.$school_ownership_docsPayload>;
export type AggregateSchool_ownership_docs = {
    _count: School_ownership_docsCountAggregateOutputType | null;
    _avg: School_ownership_docsAvgAggregateOutputType | null;
    _sum: School_ownership_docsSumAggregateOutputType | null;
    _min: School_ownership_docsMinAggregateOutputType | null;
    _max: School_ownership_docsMaxAggregateOutputType | null;
};
export type School_ownership_docsAvgAggregateOutputType = {
    id: number | null;
    file_size: number | null;
    original_size: number | null;
    compressed_size: number | null;
};
export type School_ownership_docsSumAggregateOutputType = {
    id: number | null;
    file_size: bigint | null;
    original_size: bigint | null;
    compressed_size: bigint | null;
};
export type School_ownership_docsMinAggregateOutputType = {
    id: number | null;
    iern: string | null;
    file_path: string | null;
    file_name: string | null;
    doc_type: string | null;
    status: string | null;
    created_at: Date | null;
    ownership_document_type: string | null;
    binary_id: string | null;
    file_size: bigint | null;
    school_id: string | null;
    original_size: bigint | null;
    compressed_binary_id: string | null;
    compressed_size: bigint | null;
};
export type School_ownership_docsMaxAggregateOutputType = {
    id: number | null;
    iern: string | null;
    file_path: string | null;
    file_name: string | null;
    doc_type: string | null;
    status: string | null;
    created_at: Date | null;
    ownership_document_type: string | null;
    binary_id: string | null;
    file_size: bigint | null;
    school_id: string | null;
    original_size: bigint | null;
    compressed_binary_id: string | null;
    compressed_size: bigint | null;
};
export type School_ownership_docsCountAggregateOutputType = {
    id: number;
    iern: number;
    file_path: number;
    file_name: number;
    doc_type: number;
    status: number;
    created_at: number;
    ownership_document_type: number;
    binary_id: number;
    file_size: number;
    hydra_manifest: number;
    school_id: number;
    original_size: number;
    compressed_binary_id: number;
    compressed_size: number;
    _all: number;
};
export type School_ownership_docsAvgAggregateInputType = {
    id?: true;
    file_size?: true;
    original_size?: true;
    compressed_size?: true;
};
export type School_ownership_docsSumAggregateInputType = {
    id?: true;
    file_size?: true;
    original_size?: true;
    compressed_size?: true;
};
export type School_ownership_docsMinAggregateInputType = {
    id?: true;
    iern?: true;
    file_path?: true;
    file_name?: true;
    doc_type?: true;
    status?: true;
    created_at?: true;
    ownership_document_type?: true;
    binary_id?: true;
    file_size?: true;
    school_id?: true;
    original_size?: true;
    compressed_binary_id?: true;
    compressed_size?: true;
};
export type School_ownership_docsMaxAggregateInputType = {
    id?: true;
    iern?: true;
    file_path?: true;
    file_name?: true;
    doc_type?: true;
    status?: true;
    created_at?: true;
    ownership_document_type?: true;
    binary_id?: true;
    file_size?: true;
    school_id?: true;
    original_size?: true;
    compressed_binary_id?: true;
    compressed_size?: true;
};
export type School_ownership_docsCountAggregateInputType = {
    id?: true;
    iern?: true;
    file_path?: true;
    file_name?: true;
    doc_type?: true;
    status?: true;
    created_at?: true;
    ownership_document_type?: true;
    binary_id?: true;
    file_size?: true;
    hydra_manifest?: true;
    school_id?: true;
    original_size?: true;
    compressed_binary_id?: true;
    compressed_size?: true;
    _all?: true;
};
export type School_ownership_docsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.school_ownership_docsWhereInput;
    orderBy?: Prisma.school_ownership_docsOrderByWithRelationInput | Prisma.school_ownership_docsOrderByWithRelationInput[];
    cursor?: Prisma.school_ownership_docsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | School_ownership_docsCountAggregateInputType;
    _avg?: School_ownership_docsAvgAggregateInputType;
    _sum?: School_ownership_docsSumAggregateInputType;
    _min?: School_ownership_docsMinAggregateInputType;
    _max?: School_ownership_docsMaxAggregateInputType;
};
export type GetSchool_ownership_docsAggregateType<T extends School_ownership_docsAggregateArgs> = {
    [P in keyof T & keyof AggregateSchool_ownership_docs]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSchool_ownership_docs[P]> : Prisma.GetScalarType<T[P], AggregateSchool_ownership_docs[P]>;
};
export type school_ownership_docsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.school_ownership_docsWhereInput;
    orderBy?: Prisma.school_ownership_docsOrderByWithAggregationInput | Prisma.school_ownership_docsOrderByWithAggregationInput[];
    by: Prisma.School_ownership_docsScalarFieldEnum[] | Prisma.School_ownership_docsScalarFieldEnum;
    having?: Prisma.school_ownership_docsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: School_ownership_docsCountAggregateInputType | true;
    _avg?: School_ownership_docsAvgAggregateInputType;
    _sum?: School_ownership_docsSumAggregateInputType;
    _min?: School_ownership_docsMinAggregateInputType;
    _max?: School_ownership_docsMaxAggregateInputType;
};
export type School_ownership_docsGroupByOutputType = {
    id: number;
    iern: string;
    file_path: string;
    file_name: string | null;
    doc_type: string | null;
    status: string | null;
    created_at: Date | null;
    ownership_document_type: string | null;
    binary_id: string | null;
    file_size: bigint | null;
    hydra_manifest: runtime.JsonValue | null;
    school_id: string | null;
    original_size: bigint | null;
    compressed_binary_id: string | null;
    compressed_size: bigint | null;
    _count: School_ownership_docsCountAggregateOutputType | null;
    _avg: School_ownership_docsAvgAggregateOutputType | null;
    _sum: School_ownership_docsSumAggregateOutputType | null;
    _min: School_ownership_docsMinAggregateOutputType | null;
    _max: School_ownership_docsMaxAggregateOutputType | null;
};
export type GetSchool_ownership_docsGroupByPayload<T extends school_ownership_docsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<School_ownership_docsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof School_ownership_docsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], School_ownership_docsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], School_ownership_docsGroupByOutputType[P]>;
}>>;
export type school_ownership_docsWhereInput = {
    AND?: Prisma.school_ownership_docsWhereInput | Prisma.school_ownership_docsWhereInput[];
    OR?: Prisma.school_ownership_docsWhereInput[];
    NOT?: Prisma.school_ownership_docsWhereInput | Prisma.school_ownership_docsWhereInput[];
    id?: Prisma.IntFilter<"school_ownership_docs"> | number;
    iern?: Prisma.StringFilter<"school_ownership_docs"> | string;
    file_path?: Prisma.StringFilter<"school_ownership_docs"> | string;
    file_name?: Prisma.StringNullableFilter<"school_ownership_docs"> | string | null;
    doc_type?: Prisma.StringNullableFilter<"school_ownership_docs"> | string | null;
    status?: Prisma.StringNullableFilter<"school_ownership_docs"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"school_ownership_docs"> | Date | string | null;
    ownership_document_type?: Prisma.StringNullableFilter<"school_ownership_docs"> | string | null;
    binary_id?: Prisma.UuidNullableFilter<"school_ownership_docs"> | string | null;
    file_size?: Prisma.BigIntNullableFilter<"school_ownership_docs"> | bigint | number | null;
    hydra_manifest?: Prisma.JsonNullableFilter<"school_ownership_docs">;
    school_id?: Prisma.StringNullableFilter<"school_ownership_docs"> | string | null;
    original_size?: Prisma.BigIntNullableFilter<"school_ownership_docs"> | bigint | number | null;
    compressed_binary_id?: Prisma.UuidNullableFilter<"school_ownership_docs"> | string | null;
    compressed_size?: Prisma.BigIntNullableFilter<"school_ownership_docs"> | bigint | number | null;
    ph_schools?: Prisma.XOR<Prisma.Ph_schoolsScalarRelationFilter, Prisma.ph_schoolsWhereInput>;
    school_ownership_records?: Prisma.School_ownership_recordsListRelationFilter;
    unit1_school_identity?: Prisma.Unit1_school_identityListRelationFilter;
};
export type school_ownership_docsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    file_path?: Prisma.SortOrder;
    file_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    doc_type?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    ownership_document_type?: Prisma.SortOrderInput | Prisma.SortOrder;
    binary_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    file_size?: Prisma.SortOrderInput | Prisma.SortOrder;
    hydra_manifest?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    original_size?: Prisma.SortOrderInput | Prisma.SortOrder;
    compressed_binary_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    compressed_size?: Prisma.SortOrderInput | Prisma.SortOrder;
    ph_schools?: Prisma.ph_schoolsOrderByWithRelationInput;
    school_ownership_records?: Prisma.school_ownership_recordsOrderByRelationAggregateInput;
    unit1_school_identity?: Prisma.unit1_school_identityOrderByRelationAggregateInput;
};
export type school_ownership_docsWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    iern?: string;
    AND?: Prisma.school_ownership_docsWhereInput | Prisma.school_ownership_docsWhereInput[];
    OR?: Prisma.school_ownership_docsWhereInput[];
    NOT?: Prisma.school_ownership_docsWhereInput | Prisma.school_ownership_docsWhereInput[];
    file_path?: Prisma.StringFilter<"school_ownership_docs"> | string;
    file_name?: Prisma.StringNullableFilter<"school_ownership_docs"> | string | null;
    doc_type?: Prisma.StringNullableFilter<"school_ownership_docs"> | string | null;
    status?: Prisma.StringNullableFilter<"school_ownership_docs"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"school_ownership_docs"> | Date | string | null;
    ownership_document_type?: Prisma.StringNullableFilter<"school_ownership_docs"> | string | null;
    binary_id?: Prisma.UuidNullableFilter<"school_ownership_docs"> | string | null;
    file_size?: Prisma.BigIntNullableFilter<"school_ownership_docs"> | bigint | number | null;
    hydra_manifest?: Prisma.JsonNullableFilter<"school_ownership_docs">;
    school_id?: Prisma.StringNullableFilter<"school_ownership_docs"> | string | null;
    original_size?: Prisma.BigIntNullableFilter<"school_ownership_docs"> | bigint | number | null;
    compressed_binary_id?: Prisma.UuidNullableFilter<"school_ownership_docs"> | string | null;
    compressed_size?: Prisma.BigIntNullableFilter<"school_ownership_docs"> | bigint | number | null;
    ph_schools?: Prisma.XOR<Prisma.Ph_schoolsScalarRelationFilter, Prisma.ph_schoolsWhereInput>;
    school_ownership_records?: Prisma.School_ownership_recordsListRelationFilter;
    unit1_school_identity?: Prisma.Unit1_school_identityListRelationFilter;
}, "id" | "iern">;
export type school_ownership_docsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    file_path?: Prisma.SortOrder;
    file_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    doc_type?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    ownership_document_type?: Prisma.SortOrderInput | Prisma.SortOrder;
    binary_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    file_size?: Prisma.SortOrderInput | Prisma.SortOrder;
    hydra_manifest?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    original_size?: Prisma.SortOrderInput | Prisma.SortOrder;
    compressed_binary_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    compressed_size?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.school_ownership_docsCountOrderByAggregateInput;
    _avg?: Prisma.school_ownership_docsAvgOrderByAggregateInput;
    _max?: Prisma.school_ownership_docsMaxOrderByAggregateInput;
    _min?: Prisma.school_ownership_docsMinOrderByAggregateInput;
    _sum?: Prisma.school_ownership_docsSumOrderByAggregateInput;
};
export type school_ownership_docsScalarWhereWithAggregatesInput = {
    AND?: Prisma.school_ownership_docsScalarWhereWithAggregatesInput | Prisma.school_ownership_docsScalarWhereWithAggregatesInput[];
    OR?: Prisma.school_ownership_docsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.school_ownership_docsScalarWhereWithAggregatesInput | Prisma.school_ownership_docsScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"school_ownership_docs"> | number;
    iern?: Prisma.StringWithAggregatesFilter<"school_ownership_docs"> | string;
    file_path?: Prisma.StringWithAggregatesFilter<"school_ownership_docs"> | string;
    file_name?: Prisma.StringNullableWithAggregatesFilter<"school_ownership_docs"> | string | null;
    doc_type?: Prisma.StringNullableWithAggregatesFilter<"school_ownership_docs"> | string | null;
    status?: Prisma.StringNullableWithAggregatesFilter<"school_ownership_docs"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"school_ownership_docs"> | Date | string | null;
    ownership_document_type?: Prisma.StringNullableWithAggregatesFilter<"school_ownership_docs"> | string | null;
    binary_id?: Prisma.UuidNullableWithAggregatesFilter<"school_ownership_docs"> | string | null;
    file_size?: Prisma.BigIntNullableWithAggregatesFilter<"school_ownership_docs"> | bigint | number | null;
    hydra_manifest?: Prisma.JsonNullableWithAggregatesFilter<"school_ownership_docs">;
    school_id?: Prisma.StringNullableWithAggregatesFilter<"school_ownership_docs"> | string | null;
    original_size?: Prisma.BigIntNullableWithAggregatesFilter<"school_ownership_docs"> | bigint | number | null;
    compressed_binary_id?: Prisma.UuidNullableWithAggregatesFilter<"school_ownership_docs"> | string | null;
    compressed_size?: Prisma.BigIntNullableWithAggregatesFilter<"school_ownership_docs"> | bigint | number | null;
};
export type school_ownership_docsCreateInput = {
    file_path: string;
    file_name?: string | null;
    doc_type?: string | null;
    status?: string | null;
    created_at?: Date | string | null;
    ownership_document_type?: string | null;
    binary_id?: string | null;
    file_size?: bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    school_id?: string | null;
    original_size?: bigint | number | null;
    compressed_binary_id?: string | null;
    compressed_size?: bigint | number | null;
    ph_schools: Prisma.ph_schoolsCreateNestedOneWithoutSchool_ownership_docsInput;
    school_ownership_records?: Prisma.school_ownership_recordsCreateNestedManyWithoutSchool_ownership_docsInput;
    unit1_school_identity?: Prisma.unit1_school_identityCreateNestedManyWithoutSchool_ownership_docsInput;
};
export type school_ownership_docsUncheckedCreateInput = {
    id?: number;
    iern: string;
    file_path: string;
    file_name?: string | null;
    doc_type?: string | null;
    status?: string | null;
    created_at?: Date | string | null;
    ownership_document_type?: string | null;
    binary_id?: string | null;
    file_size?: bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    school_id?: string | null;
    original_size?: bigint | number | null;
    compressed_binary_id?: string | null;
    compressed_size?: bigint | number | null;
    school_ownership_records?: Prisma.school_ownership_recordsUncheckedCreateNestedManyWithoutSchool_ownership_docsInput;
    unit1_school_identity?: Prisma.unit1_school_identityUncheckedCreateNestedManyWithoutSchool_ownership_docsInput;
};
export type school_ownership_docsUpdateInput = {
    file_path?: Prisma.StringFieldUpdateOperationsInput | string;
    file_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    doc_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ownership_document_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    original_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    compressed_binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    compressed_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    ph_schools?: Prisma.ph_schoolsUpdateOneRequiredWithoutSchool_ownership_docsNestedInput;
    school_ownership_records?: Prisma.school_ownership_recordsUpdateManyWithoutSchool_ownership_docsNestedInput;
    unit1_school_identity?: Prisma.unit1_school_identityUpdateManyWithoutSchool_ownership_docsNestedInput;
};
export type school_ownership_docsUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    iern?: Prisma.StringFieldUpdateOperationsInput | string;
    file_path?: Prisma.StringFieldUpdateOperationsInput | string;
    file_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    doc_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ownership_document_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    original_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    compressed_binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    compressed_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    school_ownership_records?: Prisma.school_ownership_recordsUncheckedUpdateManyWithoutSchool_ownership_docsNestedInput;
    unit1_school_identity?: Prisma.unit1_school_identityUncheckedUpdateManyWithoutSchool_ownership_docsNestedInput;
};
export type school_ownership_docsCreateManyInput = {
    id?: number;
    iern: string;
    file_path: string;
    file_name?: string | null;
    doc_type?: string | null;
    status?: string | null;
    created_at?: Date | string | null;
    ownership_document_type?: string | null;
    binary_id?: string | null;
    file_size?: bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    school_id?: string | null;
    original_size?: bigint | number | null;
    compressed_binary_id?: string | null;
    compressed_size?: bigint | number | null;
};
export type school_ownership_docsUpdateManyMutationInput = {
    file_path?: Prisma.StringFieldUpdateOperationsInput | string;
    file_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    doc_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ownership_document_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    original_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    compressed_binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    compressed_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
};
export type school_ownership_docsUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    iern?: Prisma.StringFieldUpdateOperationsInput | string;
    file_path?: Prisma.StringFieldUpdateOperationsInput | string;
    file_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    doc_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ownership_document_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    original_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    compressed_binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    compressed_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
};
export type School_ownership_docsNullableScalarRelationFilter = {
    is?: Prisma.school_ownership_docsWhereInput | null;
    isNot?: Prisma.school_ownership_docsWhereInput | null;
};
export type school_ownership_docsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    file_path?: Prisma.SortOrder;
    file_name?: Prisma.SortOrder;
    doc_type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    ownership_document_type?: Prisma.SortOrder;
    binary_id?: Prisma.SortOrder;
    file_size?: Prisma.SortOrder;
    hydra_manifest?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    original_size?: Prisma.SortOrder;
    compressed_binary_id?: Prisma.SortOrder;
    compressed_size?: Prisma.SortOrder;
};
export type school_ownership_docsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    file_size?: Prisma.SortOrder;
    original_size?: Prisma.SortOrder;
    compressed_size?: Prisma.SortOrder;
};
export type school_ownership_docsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    file_path?: Prisma.SortOrder;
    file_name?: Prisma.SortOrder;
    doc_type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    ownership_document_type?: Prisma.SortOrder;
    binary_id?: Prisma.SortOrder;
    file_size?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    original_size?: Prisma.SortOrder;
    compressed_binary_id?: Prisma.SortOrder;
    compressed_size?: Prisma.SortOrder;
};
export type school_ownership_docsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    file_path?: Prisma.SortOrder;
    file_name?: Prisma.SortOrder;
    doc_type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    ownership_document_type?: Prisma.SortOrder;
    binary_id?: Prisma.SortOrder;
    file_size?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    original_size?: Prisma.SortOrder;
    compressed_binary_id?: Prisma.SortOrder;
    compressed_size?: Prisma.SortOrder;
};
export type school_ownership_docsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    file_size?: Prisma.SortOrder;
    original_size?: Prisma.SortOrder;
    compressed_size?: Prisma.SortOrder;
};
export type school_ownership_docsCreateNestedOneWithoutPh_schoolsInput = {
    create?: Prisma.XOR<Prisma.school_ownership_docsCreateWithoutPh_schoolsInput, Prisma.school_ownership_docsUncheckedCreateWithoutPh_schoolsInput>;
    connectOrCreate?: Prisma.school_ownership_docsCreateOrConnectWithoutPh_schoolsInput;
    connect?: Prisma.school_ownership_docsWhereUniqueInput;
};
export type school_ownership_docsUncheckedCreateNestedOneWithoutPh_schoolsInput = {
    create?: Prisma.XOR<Prisma.school_ownership_docsCreateWithoutPh_schoolsInput, Prisma.school_ownership_docsUncheckedCreateWithoutPh_schoolsInput>;
    connectOrCreate?: Prisma.school_ownership_docsCreateOrConnectWithoutPh_schoolsInput;
    connect?: Prisma.school_ownership_docsWhereUniqueInput;
};
export type school_ownership_docsUpdateOneWithoutPh_schoolsNestedInput = {
    create?: Prisma.XOR<Prisma.school_ownership_docsCreateWithoutPh_schoolsInput, Prisma.school_ownership_docsUncheckedCreateWithoutPh_schoolsInput>;
    connectOrCreate?: Prisma.school_ownership_docsCreateOrConnectWithoutPh_schoolsInput;
    upsert?: Prisma.school_ownership_docsUpsertWithoutPh_schoolsInput;
    disconnect?: Prisma.school_ownership_docsWhereInput | boolean;
    delete?: Prisma.school_ownership_docsWhereInput | boolean;
    connect?: Prisma.school_ownership_docsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.school_ownership_docsUpdateToOneWithWhereWithoutPh_schoolsInput, Prisma.school_ownership_docsUpdateWithoutPh_schoolsInput>, Prisma.school_ownership_docsUncheckedUpdateWithoutPh_schoolsInput>;
};
export type school_ownership_docsUncheckedUpdateOneWithoutPh_schoolsNestedInput = {
    create?: Prisma.XOR<Prisma.school_ownership_docsCreateWithoutPh_schoolsInput, Prisma.school_ownership_docsUncheckedCreateWithoutPh_schoolsInput>;
    connectOrCreate?: Prisma.school_ownership_docsCreateOrConnectWithoutPh_schoolsInput;
    upsert?: Prisma.school_ownership_docsUpsertWithoutPh_schoolsInput;
    disconnect?: Prisma.school_ownership_docsWhereInput | boolean;
    delete?: Prisma.school_ownership_docsWhereInput | boolean;
    connect?: Prisma.school_ownership_docsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.school_ownership_docsUpdateToOneWithWhereWithoutPh_schoolsInput, Prisma.school_ownership_docsUpdateWithoutPh_schoolsInput>, Prisma.school_ownership_docsUncheckedUpdateWithoutPh_schoolsInput>;
};
export type school_ownership_docsCreateNestedOneWithoutSchool_ownership_recordsInput = {
    create?: Prisma.XOR<Prisma.school_ownership_docsCreateWithoutSchool_ownership_recordsInput, Prisma.school_ownership_docsUncheckedCreateWithoutSchool_ownership_recordsInput>;
    connectOrCreate?: Prisma.school_ownership_docsCreateOrConnectWithoutSchool_ownership_recordsInput;
    connect?: Prisma.school_ownership_docsWhereUniqueInput;
};
export type school_ownership_docsUpdateOneWithoutSchool_ownership_recordsNestedInput = {
    create?: Prisma.XOR<Prisma.school_ownership_docsCreateWithoutSchool_ownership_recordsInput, Prisma.school_ownership_docsUncheckedCreateWithoutSchool_ownership_recordsInput>;
    connectOrCreate?: Prisma.school_ownership_docsCreateOrConnectWithoutSchool_ownership_recordsInput;
    upsert?: Prisma.school_ownership_docsUpsertWithoutSchool_ownership_recordsInput;
    disconnect?: Prisma.school_ownership_docsWhereInput | boolean;
    delete?: Prisma.school_ownership_docsWhereInput | boolean;
    connect?: Prisma.school_ownership_docsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.school_ownership_docsUpdateToOneWithWhereWithoutSchool_ownership_recordsInput, Prisma.school_ownership_docsUpdateWithoutSchool_ownership_recordsInput>, Prisma.school_ownership_docsUncheckedUpdateWithoutSchool_ownership_recordsInput>;
};
export type school_ownership_docsCreateNestedOneWithoutUnit1_school_identityInput = {
    create?: Prisma.XOR<Prisma.school_ownership_docsCreateWithoutUnit1_school_identityInput, Prisma.school_ownership_docsUncheckedCreateWithoutUnit1_school_identityInput>;
    connectOrCreate?: Prisma.school_ownership_docsCreateOrConnectWithoutUnit1_school_identityInput;
    connect?: Prisma.school_ownership_docsWhereUniqueInput;
};
export type school_ownership_docsUpdateOneWithoutUnit1_school_identityNestedInput = {
    create?: Prisma.XOR<Prisma.school_ownership_docsCreateWithoutUnit1_school_identityInput, Prisma.school_ownership_docsUncheckedCreateWithoutUnit1_school_identityInput>;
    connectOrCreate?: Prisma.school_ownership_docsCreateOrConnectWithoutUnit1_school_identityInput;
    upsert?: Prisma.school_ownership_docsUpsertWithoutUnit1_school_identityInput;
    disconnect?: Prisma.school_ownership_docsWhereInput | boolean;
    delete?: Prisma.school_ownership_docsWhereInput | boolean;
    connect?: Prisma.school_ownership_docsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.school_ownership_docsUpdateToOneWithWhereWithoutUnit1_school_identityInput, Prisma.school_ownership_docsUpdateWithoutUnit1_school_identityInput>, Prisma.school_ownership_docsUncheckedUpdateWithoutUnit1_school_identityInput>;
};
export type school_ownership_docsCreateWithoutPh_schoolsInput = {
    file_path: string;
    file_name?: string | null;
    doc_type?: string | null;
    status?: string | null;
    created_at?: Date | string | null;
    ownership_document_type?: string | null;
    binary_id?: string | null;
    file_size?: bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    school_id?: string | null;
    original_size?: bigint | number | null;
    compressed_binary_id?: string | null;
    compressed_size?: bigint | number | null;
    school_ownership_records?: Prisma.school_ownership_recordsCreateNestedManyWithoutSchool_ownership_docsInput;
    unit1_school_identity?: Prisma.unit1_school_identityCreateNestedManyWithoutSchool_ownership_docsInput;
};
export type school_ownership_docsUncheckedCreateWithoutPh_schoolsInput = {
    id?: number;
    file_path: string;
    file_name?: string | null;
    doc_type?: string | null;
    status?: string | null;
    created_at?: Date | string | null;
    ownership_document_type?: string | null;
    binary_id?: string | null;
    file_size?: bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    school_id?: string | null;
    original_size?: bigint | number | null;
    compressed_binary_id?: string | null;
    compressed_size?: bigint | number | null;
    school_ownership_records?: Prisma.school_ownership_recordsUncheckedCreateNestedManyWithoutSchool_ownership_docsInput;
    unit1_school_identity?: Prisma.unit1_school_identityUncheckedCreateNestedManyWithoutSchool_ownership_docsInput;
};
export type school_ownership_docsCreateOrConnectWithoutPh_schoolsInput = {
    where: Prisma.school_ownership_docsWhereUniqueInput;
    create: Prisma.XOR<Prisma.school_ownership_docsCreateWithoutPh_schoolsInput, Prisma.school_ownership_docsUncheckedCreateWithoutPh_schoolsInput>;
};
export type school_ownership_docsUpsertWithoutPh_schoolsInput = {
    update: Prisma.XOR<Prisma.school_ownership_docsUpdateWithoutPh_schoolsInput, Prisma.school_ownership_docsUncheckedUpdateWithoutPh_schoolsInput>;
    create: Prisma.XOR<Prisma.school_ownership_docsCreateWithoutPh_schoolsInput, Prisma.school_ownership_docsUncheckedCreateWithoutPh_schoolsInput>;
    where?: Prisma.school_ownership_docsWhereInput;
};
export type school_ownership_docsUpdateToOneWithWhereWithoutPh_schoolsInput = {
    where?: Prisma.school_ownership_docsWhereInput;
    data: Prisma.XOR<Prisma.school_ownership_docsUpdateWithoutPh_schoolsInput, Prisma.school_ownership_docsUncheckedUpdateWithoutPh_schoolsInput>;
};
export type school_ownership_docsUpdateWithoutPh_schoolsInput = {
    file_path?: Prisma.StringFieldUpdateOperationsInput | string;
    file_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    doc_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ownership_document_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    original_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    compressed_binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    compressed_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    school_ownership_records?: Prisma.school_ownership_recordsUpdateManyWithoutSchool_ownership_docsNestedInput;
    unit1_school_identity?: Prisma.unit1_school_identityUpdateManyWithoutSchool_ownership_docsNestedInput;
};
export type school_ownership_docsUncheckedUpdateWithoutPh_schoolsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    file_path?: Prisma.StringFieldUpdateOperationsInput | string;
    file_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    doc_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ownership_document_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    original_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    compressed_binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    compressed_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    school_ownership_records?: Prisma.school_ownership_recordsUncheckedUpdateManyWithoutSchool_ownership_docsNestedInput;
    unit1_school_identity?: Prisma.unit1_school_identityUncheckedUpdateManyWithoutSchool_ownership_docsNestedInput;
};
export type school_ownership_docsCreateWithoutSchool_ownership_recordsInput = {
    file_path: string;
    file_name?: string | null;
    doc_type?: string | null;
    status?: string | null;
    created_at?: Date | string | null;
    ownership_document_type?: string | null;
    binary_id?: string | null;
    file_size?: bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    school_id?: string | null;
    original_size?: bigint | number | null;
    compressed_binary_id?: string | null;
    compressed_size?: bigint | number | null;
    ph_schools: Prisma.ph_schoolsCreateNestedOneWithoutSchool_ownership_docsInput;
    unit1_school_identity?: Prisma.unit1_school_identityCreateNestedManyWithoutSchool_ownership_docsInput;
};
export type school_ownership_docsUncheckedCreateWithoutSchool_ownership_recordsInput = {
    id?: number;
    iern: string;
    file_path: string;
    file_name?: string | null;
    doc_type?: string | null;
    status?: string | null;
    created_at?: Date | string | null;
    ownership_document_type?: string | null;
    binary_id?: string | null;
    file_size?: bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    school_id?: string | null;
    original_size?: bigint | number | null;
    compressed_binary_id?: string | null;
    compressed_size?: bigint | number | null;
    unit1_school_identity?: Prisma.unit1_school_identityUncheckedCreateNestedManyWithoutSchool_ownership_docsInput;
};
export type school_ownership_docsCreateOrConnectWithoutSchool_ownership_recordsInput = {
    where: Prisma.school_ownership_docsWhereUniqueInput;
    create: Prisma.XOR<Prisma.school_ownership_docsCreateWithoutSchool_ownership_recordsInput, Prisma.school_ownership_docsUncheckedCreateWithoutSchool_ownership_recordsInput>;
};
export type school_ownership_docsUpsertWithoutSchool_ownership_recordsInput = {
    update: Prisma.XOR<Prisma.school_ownership_docsUpdateWithoutSchool_ownership_recordsInput, Prisma.school_ownership_docsUncheckedUpdateWithoutSchool_ownership_recordsInput>;
    create: Prisma.XOR<Prisma.school_ownership_docsCreateWithoutSchool_ownership_recordsInput, Prisma.school_ownership_docsUncheckedCreateWithoutSchool_ownership_recordsInput>;
    where?: Prisma.school_ownership_docsWhereInput;
};
export type school_ownership_docsUpdateToOneWithWhereWithoutSchool_ownership_recordsInput = {
    where?: Prisma.school_ownership_docsWhereInput;
    data: Prisma.XOR<Prisma.school_ownership_docsUpdateWithoutSchool_ownership_recordsInput, Prisma.school_ownership_docsUncheckedUpdateWithoutSchool_ownership_recordsInput>;
};
export type school_ownership_docsUpdateWithoutSchool_ownership_recordsInput = {
    file_path?: Prisma.StringFieldUpdateOperationsInput | string;
    file_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    doc_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ownership_document_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    original_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    compressed_binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    compressed_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    ph_schools?: Prisma.ph_schoolsUpdateOneRequiredWithoutSchool_ownership_docsNestedInput;
    unit1_school_identity?: Prisma.unit1_school_identityUpdateManyWithoutSchool_ownership_docsNestedInput;
};
export type school_ownership_docsUncheckedUpdateWithoutSchool_ownership_recordsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    iern?: Prisma.StringFieldUpdateOperationsInput | string;
    file_path?: Prisma.StringFieldUpdateOperationsInput | string;
    file_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    doc_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ownership_document_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    original_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    compressed_binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    compressed_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    unit1_school_identity?: Prisma.unit1_school_identityUncheckedUpdateManyWithoutSchool_ownership_docsNestedInput;
};
export type school_ownership_docsCreateWithoutUnit1_school_identityInput = {
    file_path: string;
    file_name?: string | null;
    doc_type?: string | null;
    status?: string | null;
    created_at?: Date | string | null;
    ownership_document_type?: string | null;
    binary_id?: string | null;
    file_size?: bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    school_id?: string | null;
    original_size?: bigint | number | null;
    compressed_binary_id?: string | null;
    compressed_size?: bigint | number | null;
    ph_schools: Prisma.ph_schoolsCreateNestedOneWithoutSchool_ownership_docsInput;
    school_ownership_records?: Prisma.school_ownership_recordsCreateNestedManyWithoutSchool_ownership_docsInput;
};
export type school_ownership_docsUncheckedCreateWithoutUnit1_school_identityInput = {
    id?: number;
    iern: string;
    file_path: string;
    file_name?: string | null;
    doc_type?: string | null;
    status?: string | null;
    created_at?: Date | string | null;
    ownership_document_type?: string | null;
    binary_id?: string | null;
    file_size?: bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    school_id?: string | null;
    original_size?: bigint | number | null;
    compressed_binary_id?: string | null;
    compressed_size?: bigint | number | null;
    school_ownership_records?: Prisma.school_ownership_recordsUncheckedCreateNestedManyWithoutSchool_ownership_docsInput;
};
export type school_ownership_docsCreateOrConnectWithoutUnit1_school_identityInput = {
    where: Prisma.school_ownership_docsWhereUniqueInput;
    create: Prisma.XOR<Prisma.school_ownership_docsCreateWithoutUnit1_school_identityInput, Prisma.school_ownership_docsUncheckedCreateWithoutUnit1_school_identityInput>;
};
export type school_ownership_docsUpsertWithoutUnit1_school_identityInput = {
    update: Prisma.XOR<Prisma.school_ownership_docsUpdateWithoutUnit1_school_identityInput, Prisma.school_ownership_docsUncheckedUpdateWithoutUnit1_school_identityInput>;
    create: Prisma.XOR<Prisma.school_ownership_docsCreateWithoutUnit1_school_identityInput, Prisma.school_ownership_docsUncheckedCreateWithoutUnit1_school_identityInput>;
    where?: Prisma.school_ownership_docsWhereInput;
};
export type school_ownership_docsUpdateToOneWithWhereWithoutUnit1_school_identityInput = {
    where?: Prisma.school_ownership_docsWhereInput;
    data: Prisma.XOR<Prisma.school_ownership_docsUpdateWithoutUnit1_school_identityInput, Prisma.school_ownership_docsUncheckedUpdateWithoutUnit1_school_identityInput>;
};
export type school_ownership_docsUpdateWithoutUnit1_school_identityInput = {
    file_path?: Prisma.StringFieldUpdateOperationsInput | string;
    file_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    doc_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ownership_document_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    original_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    compressed_binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    compressed_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    ph_schools?: Prisma.ph_schoolsUpdateOneRequiredWithoutSchool_ownership_docsNestedInput;
    school_ownership_records?: Prisma.school_ownership_recordsUpdateManyWithoutSchool_ownership_docsNestedInput;
};
export type school_ownership_docsUncheckedUpdateWithoutUnit1_school_identityInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    iern?: Prisma.StringFieldUpdateOperationsInput | string;
    file_path?: Prisma.StringFieldUpdateOperationsInput | string;
    file_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    doc_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ownership_document_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    original_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    compressed_binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    compressed_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    school_ownership_records?: Prisma.school_ownership_recordsUncheckedUpdateManyWithoutSchool_ownership_docsNestedInput;
};
export type School_ownership_docsCountOutputType = {
    school_ownership_records: number;
    unit1_school_identity: number;
};
export type School_ownership_docsCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    school_ownership_records?: boolean | School_ownership_docsCountOutputTypeCountSchool_ownership_recordsArgs;
    unit1_school_identity?: boolean | School_ownership_docsCountOutputTypeCountUnit1_school_identityArgs;
};
export type School_ownership_docsCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.School_ownership_docsCountOutputTypeSelect<ExtArgs> | null;
};
export type School_ownership_docsCountOutputTypeCountSchool_ownership_recordsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.school_ownership_recordsWhereInput;
};
export type School_ownership_docsCountOutputTypeCountUnit1_school_identityArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.unit1_school_identityWhereInput;
};
export type school_ownership_docsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    iern?: boolean;
    file_path?: boolean;
    file_name?: boolean;
    doc_type?: boolean;
    status?: boolean;
    created_at?: boolean;
    ownership_document_type?: boolean;
    binary_id?: boolean;
    file_size?: boolean;
    hydra_manifest?: boolean;
    school_id?: boolean;
    original_size?: boolean;
    compressed_binary_id?: boolean;
    compressed_size?: boolean;
    ph_schools?: boolean | Prisma.ph_schoolsDefaultArgs<ExtArgs>;
    school_ownership_records?: boolean | Prisma.school_ownership_docs$school_ownership_recordsArgs<ExtArgs>;
    unit1_school_identity?: boolean | Prisma.school_ownership_docs$unit1_school_identityArgs<ExtArgs>;
    _count?: boolean | Prisma.School_ownership_docsCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["school_ownership_docs"]>;
export type school_ownership_docsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    iern?: boolean;
    file_path?: boolean;
    file_name?: boolean;
    doc_type?: boolean;
    status?: boolean;
    created_at?: boolean;
    ownership_document_type?: boolean;
    binary_id?: boolean;
    file_size?: boolean;
    hydra_manifest?: boolean;
    school_id?: boolean;
    original_size?: boolean;
    compressed_binary_id?: boolean;
    compressed_size?: boolean;
    ph_schools?: boolean | Prisma.ph_schoolsDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["school_ownership_docs"]>;
export type school_ownership_docsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    iern?: boolean;
    file_path?: boolean;
    file_name?: boolean;
    doc_type?: boolean;
    status?: boolean;
    created_at?: boolean;
    ownership_document_type?: boolean;
    binary_id?: boolean;
    file_size?: boolean;
    hydra_manifest?: boolean;
    school_id?: boolean;
    original_size?: boolean;
    compressed_binary_id?: boolean;
    compressed_size?: boolean;
    ph_schools?: boolean | Prisma.ph_schoolsDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["school_ownership_docs"]>;
export type school_ownership_docsSelectScalar = {
    id?: boolean;
    iern?: boolean;
    file_path?: boolean;
    file_name?: boolean;
    doc_type?: boolean;
    status?: boolean;
    created_at?: boolean;
    ownership_document_type?: boolean;
    binary_id?: boolean;
    file_size?: boolean;
    hydra_manifest?: boolean;
    school_id?: boolean;
    original_size?: boolean;
    compressed_binary_id?: boolean;
    compressed_size?: boolean;
};
export type school_ownership_docsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "iern" | "file_path" | "file_name" | "doc_type" | "status" | "created_at" | "ownership_document_type" | "binary_id" | "file_size" | "hydra_manifest" | "school_id" | "original_size" | "compressed_binary_id" | "compressed_size", ExtArgs["result"]["school_ownership_docs"]>;
export type school_ownership_docsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ph_schools?: boolean | Prisma.ph_schoolsDefaultArgs<ExtArgs>;
    school_ownership_records?: boolean | Prisma.school_ownership_docs$school_ownership_recordsArgs<ExtArgs>;
    unit1_school_identity?: boolean | Prisma.school_ownership_docs$unit1_school_identityArgs<ExtArgs>;
    _count?: boolean | Prisma.School_ownership_docsCountOutputTypeDefaultArgs<ExtArgs>;
};
export type school_ownership_docsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ph_schools?: boolean | Prisma.ph_schoolsDefaultArgs<ExtArgs>;
};
export type school_ownership_docsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ph_schools?: boolean | Prisma.ph_schoolsDefaultArgs<ExtArgs>;
};
export type $school_ownership_docsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "school_ownership_docs";
    objects: {
        ph_schools: Prisma.$ph_schoolsPayload<ExtArgs>;
        school_ownership_records: Prisma.$school_ownership_recordsPayload<ExtArgs>[];
        unit1_school_identity: Prisma.$unit1_school_identityPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        iern: string;
        file_path: string;
        file_name: string | null;
        doc_type: string | null;
        status: string | null;
        created_at: Date | null;
        ownership_document_type: string | null;
        binary_id: string | null;
        file_size: bigint | null;
        hydra_manifest: runtime.JsonValue | null;
        school_id: string | null;
        original_size: bigint | null;
        compressed_binary_id: string | null;
        compressed_size: bigint | null;
    }, ExtArgs["result"]["school_ownership_docs"]>;
    composites: {};
};
export type school_ownership_docsGetPayload<S extends boolean | null | undefined | school_ownership_docsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$school_ownership_docsPayload, S>;
export type school_ownership_docsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<school_ownership_docsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: School_ownership_docsCountAggregateInputType | true;
};
export interface school_ownership_docsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['school_ownership_docs'];
        meta: {
            name: 'school_ownership_docs';
        };
    };
    findUnique<T extends school_ownership_docsFindUniqueArgs>(args: Prisma.SelectSubset<T, school_ownership_docsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__school_ownership_docsClient<runtime.Types.Result.GetResult<Prisma.$school_ownership_docsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends school_ownership_docsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, school_ownership_docsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__school_ownership_docsClient<runtime.Types.Result.GetResult<Prisma.$school_ownership_docsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends school_ownership_docsFindFirstArgs>(args?: Prisma.SelectSubset<T, school_ownership_docsFindFirstArgs<ExtArgs>>): Prisma.Prisma__school_ownership_docsClient<runtime.Types.Result.GetResult<Prisma.$school_ownership_docsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends school_ownership_docsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, school_ownership_docsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__school_ownership_docsClient<runtime.Types.Result.GetResult<Prisma.$school_ownership_docsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends school_ownership_docsFindManyArgs>(args?: Prisma.SelectSubset<T, school_ownership_docsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$school_ownership_docsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends school_ownership_docsCreateArgs>(args: Prisma.SelectSubset<T, school_ownership_docsCreateArgs<ExtArgs>>): Prisma.Prisma__school_ownership_docsClient<runtime.Types.Result.GetResult<Prisma.$school_ownership_docsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends school_ownership_docsCreateManyArgs>(args?: Prisma.SelectSubset<T, school_ownership_docsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends school_ownership_docsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, school_ownership_docsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$school_ownership_docsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends school_ownership_docsDeleteArgs>(args: Prisma.SelectSubset<T, school_ownership_docsDeleteArgs<ExtArgs>>): Prisma.Prisma__school_ownership_docsClient<runtime.Types.Result.GetResult<Prisma.$school_ownership_docsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends school_ownership_docsUpdateArgs>(args: Prisma.SelectSubset<T, school_ownership_docsUpdateArgs<ExtArgs>>): Prisma.Prisma__school_ownership_docsClient<runtime.Types.Result.GetResult<Prisma.$school_ownership_docsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends school_ownership_docsDeleteManyArgs>(args?: Prisma.SelectSubset<T, school_ownership_docsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends school_ownership_docsUpdateManyArgs>(args: Prisma.SelectSubset<T, school_ownership_docsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends school_ownership_docsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, school_ownership_docsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$school_ownership_docsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends school_ownership_docsUpsertArgs>(args: Prisma.SelectSubset<T, school_ownership_docsUpsertArgs<ExtArgs>>): Prisma.Prisma__school_ownership_docsClient<runtime.Types.Result.GetResult<Prisma.$school_ownership_docsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends school_ownership_docsCountArgs>(args?: Prisma.Subset<T, school_ownership_docsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], School_ownership_docsCountAggregateOutputType> : number>;
    aggregate<T extends School_ownership_docsAggregateArgs>(args: Prisma.Subset<T, School_ownership_docsAggregateArgs>): Prisma.PrismaPromise<GetSchool_ownership_docsAggregateType<T>>;
    groupBy<T extends school_ownership_docsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: school_ownership_docsGroupByArgs['orderBy'];
    } : {
        orderBy?: school_ownership_docsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, school_ownership_docsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSchool_ownership_docsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: school_ownership_docsFieldRefs;
}
export interface Prisma__school_ownership_docsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    ph_schools<T extends Prisma.ph_schoolsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ph_schoolsDefaultArgs<ExtArgs>>): Prisma.Prisma__ph_schoolsClient<runtime.Types.Result.GetResult<Prisma.$ph_schoolsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    school_ownership_records<T extends Prisma.school_ownership_docs$school_ownership_recordsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.school_ownership_docs$school_ownership_recordsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$school_ownership_recordsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    unit1_school_identity<T extends Prisma.school_ownership_docs$unit1_school_identityArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.school_ownership_docs$unit1_school_identityArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$unit1_school_identityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface school_ownership_docsFieldRefs {
    readonly id: Prisma.FieldRef<"school_ownership_docs", 'Int'>;
    readonly iern: Prisma.FieldRef<"school_ownership_docs", 'String'>;
    readonly file_path: Prisma.FieldRef<"school_ownership_docs", 'String'>;
    readonly file_name: Prisma.FieldRef<"school_ownership_docs", 'String'>;
    readonly doc_type: Prisma.FieldRef<"school_ownership_docs", 'String'>;
    readonly status: Prisma.FieldRef<"school_ownership_docs", 'String'>;
    readonly created_at: Prisma.FieldRef<"school_ownership_docs", 'DateTime'>;
    readonly ownership_document_type: Prisma.FieldRef<"school_ownership_docs", 'String'>;
    readonly binary_id: Prisma.FieldRef<"school_ownership_docs", 'String'>;
    readonly file_size: Prisma.FieldRef<"school_ownership_docs", 'BigInt'>;
    readonly hydra_manifest: Prisma.FieldRef<"school_ownership_docs", 'Json'>;
    readonly school_id: Prisma.FieldRef<"school_ownership_docs", 'String'>;
    readonly original_size: Prisma.FieldRef<"school_ownership_docs", 'BigInt'>;
    readonly compressed_binary_id: Prisma.FieldRef<"school_ownership_docs", 'String'>;
    readonly compressed_size: Prisma.FieldRef<"school_ownership_docs", 'BigInt'>;
}
export type school_ownership_docsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_docsSelect<ExtArgs> | null;
    omit?: Prisma.school_ownership_docsOmit<ExtArgs> | null;
    include?: Prisma.school_ownership_docsInclude<ExtArgs> | null;
    where: Prisma.school_ownership_docsWhereUniqueInput;
};
export type school_ownership_docsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_docsSelect<ExtArgs> | null;
    omit?: Prisma.school_ownership_docsOmit<ExtArgs> | null;
    include?: Prisma.school_ownership_docsInclude<ExtArgs> | null;
    where: Prisma.school_ownership_docsWhereUniqueInput;
};
export type school_ownership_docsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_docsSelect<ExtArgs> | null;
    omit?: Prisma.school_ownership_docsOmit<ExtArgs> | null;
    include?: Prisma.school_ownership_docsInclude<ExtArgs> | null;
    where?: Prisma.school_ownership_docsWhereInput;
    orderBy?: Prisma.school_ownership_docsOrderByWithRelationInput | Prisma.school_ownership_docsOrderByWithRelationInput[];
    cursor?: Prisma.school_ownership_docsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.School_ownership_docsScalarFieldEnum | Prisma.School_ownership_docsScalarFieldEnum[];
};
export type school_ownership_docsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_docsSelect<ExtArgs> | null;
    omit?: Prisma.school_ownership_docsOmit<ExtArgs> | null;
    include?: Prisma.school_ownership_docsInclude<ExtArgs> | null;
    where?: Prisma.school_ownership_docsWhereInput;
    orderBy?: Prisma.school_ownership_docsOrderByWithRelationInput | Prisma.school_ownership_docsOrderByWithRelationInput[];
    cursor?: Prisma.school_ownership_docsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.School_ownership_docsScalarFieldEnum | Prisma.School_ownership_docsScalarFieldEnum[];
};
export type school_ownership_docsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_docsSelect<ExtArgs> | null;
    omit?: Prisma.school_ownership_docsOmit<ExtArgs> | null;
    include?: Prisma.school_ownership_docsInclude<ExtArgs> | null;
    where?: Prisma.school_ownership_docsWhereInput;
    orderBy?: Prisma.school_ownership_docsOrderByWithRelationInput | Prisma.school_ownership_docsOrderByWithRelationInput[];
    cursor?: Prisma.school_ownership_docsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.School_ownership_docsScalarFieldEnum | Prisma.School_ownership_docsScalarFieldEnum[];
};
export type school_ownership_docsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_docsSelect<ExtArgs> | null;
    omit?: Prisma.school_ownership_docsOmit<ExtArgs> | null;
    include?: Prisma.school_ownership_docsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.school_ownership_docsCreateInput, Prisma.school_ownership_docsUncheckedCreateInput>;
};
export type school_ownership_docsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.school_ownership_docsCreateManyInput | Prisma.school_ownership_docsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type school_ownership_docsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_docsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.school_ownership_docsOmit<ExtArgs> | null;
    data: Prisma.school_ownership_docsCreateManyInput | Prisma.school_ownership_docsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.school_ownership_docsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type school_ownership_docsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_docsSelect<ExtArgs> | null;
    omit?: Prisma.school_ownership_docsOmit<ExtArgs> | null;
    include?: Prisma.school_ownership_docsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.school_ownership_docsUpdateInput, Prisma.school_ownership_docsUncheckedUpdateInput>;
    where: Prisma.school_ownership_docsWhereUniqueInput;
};
export type school_ownership_docsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.school_ownership_docsUpdateManyMutationInput, Prisma.school_ownership_docsUncheckedUpdateManyInput>;
    where?: Prisma.school_ownership_docsWhereInput;
    limit?: number;
};
export type school_ownership_docsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_docsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.school_ownership_docsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.school_ownership_docsUpdateManyMutationInput, Prisma.school_ownership_docsUncheckedUpdateManyInput>;
    where?: Prisma.school_ownership_docsWhereInput;
    limit?: number;
    include?: Prisma.school_ownership_docsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type school_ownership_docsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_docsSelect<ExtArgs> | null;
    omit?: Prisma.school_ownership_docsOmit<ExtArgs> | null;
    include?: Prisma.school_ownership_docsInclude<ExtArgs> | null;
    where: Prisma.school_ownership_docsWhereUniqueInput;
    create: Prisma.XOR<Prisma.school_ownership_docsCreateInput, Prisma.school_ownership_docsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.school_ownership_docsUpdateInput, Prisma.school_ownership_docsUncheckedUpdateInput>;
};
export type school_ownership_docsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_docsSelect<ExtArgs> | null;
    omit?: Prisma.school_ownership_docsOmit<ExtArgs> | null;
    include?: Prisma.school_ownership_docsInclude<ExtArgs> | null;
    where: Prisma.school_ownership_docsWhereUniqueInput;
};
export type school_ownership_docsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.school_ownership_docsWhereInput;
    limit?: number;
};
export type school_ownership_docs$school_ownership_recordsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type school_ownership_docs$unit1_school_identityArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit1_school_identitySelect<ExtArgs> | null;
    omit?: Prisma.unit1_school_identityOmit<ExtArgs> | null;
    include?: Prisma.unit1_school_identityInclude<ExtArgs> | null;
    where?: Prisma.unit1_school_identityWhereInput;
    orderBy?: Prisma.unit1_school_identityOrderByWithRelationInput | Prisma.unit1_school_identityOrderByWithRelationInput[];
    cursor?: Prisma.unit1_school_identityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Unit1_school_identityScalarFieldEnum | Prisma.Unit1_school_identityScalarFieldEnum[];
};
export type school_ownership_docsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_ownership_docsSelect<ExtArgs> | null;
    omit?: Prisma.school_ownership_docsOmit<ExtArgs> | null;
    include?: Prisma.school_ownership_docsInclude<ExtArgs> | null;
};
