import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type school_documentsModel = runtime.Types.Result.DefaultSelection<Prisma.$school_documentsPayload>;
export type AggregateSchool_documents = {
    _count: School_documentsCountAggregateOutputType | null;
    _avg: School_documentsAvgAggregateOutputType | null;
    _sum: School_documentsSumAggregateOutputType | null;
    _min: School_documentsMinAggregateOutputType | null;
    _max: School_documentsMaxAggregateOutputType | null;
};
export type School_documentsAvgAggregateOutputType = {
    id: number | null;
    pending_id: number | null;
    file_size: number | null;
    original_size: number | null;
};
export type School_documentsSumAggregateOutputType = {
    id: number | null;
    pending_id: number | null;
    file_size: bigint | null;
    original_size: bigint | null;
};
export type School_documentsMinAggregateOutputType = {
    id: number | null;
    school_id: string | null;
    pending_id: number | null;
    doc_type: string | null;
    file_data: string | null;
    created_at: Date | null;
    binary_id: string | null;
    file_path: string | null;
    file_size: bigint | null;
    original_size: bigint | null;
    file_name: string | null;
    is_deleted: boolean | null;
};
export type School_documentsMaxAggregateOutputType = {
    id: number | null;
    school_id: string | null;
    pending_id: number | null;
    doc_type: string | null;
    file_data: string | null;
    created_at: Date | null;
    binary_id: string | null;
    file_path: string | null;
    file_size: bigint | null;
    original_size: bigint | null;
    file_name: string | null;
    is_deleted: boolean | null;
};
export type School_documentsCountAggregateOutputType = {
    id: number;
    school_id: number;
    pending_id: number;
    doc_type: number;
    file_data: number;
    created_at: number;
    binary_id: number;
    file_path: number;
    file_size: number;
    original_size: number;
    hydra_manifest: number;
    file_name: number;
    is_deleted: number;
    _all: number;
};
export type School_documentsAvgAggregateInputType = {
    id?: true;
    pending_id?: true;
    file_size?: true;
    original_size?: true;
};
export type School_documentsSumAggregateInputType = {
    id?: true;
    pending_id?: true;
    file_size?: true;
    original_size?: true;
};
export type School_documentsMinAggregateInputType = {
    id?: true;
    school_id?: true;
    pending_id?: true;
    doc_type?: true;
    file_data?: true;
    created_at?: true;
    binary_id?: true;
    file_path?: true;
    file_size?: true;
    original_size?: true;
    file_name?: true;
    is_deleted?: true;
};
export type School_documentsMaxAggregateInputType = {
    id?: true;
    school_id?: true;
    pending_id?: true;
    doc_type?: true;
    file_data?: true;
    created_at?: true;
    binary_id?: true;
    file_path?: true;
    file_size?: true;
    original_size?: true;
    file_name?: true;
    is_deleted?: true;
};
export type School_documentsCountAggregateInputType = {
    id?: true;
    school_id?: true;
    pending_id?: true;
    doc_type?: true;
    file_data?: true;
    created_at?: true;
    binary_id?: true;
    file_path?: true;
    file_size?: true;
    original_size?: true;
    hydra_manifest?: true;
    file_name?: true;
    is_deleted?: true;
    _all?: true;
};
export type School_documentsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.school_documentsWhereInput;
    orderBy?: Prisma.school_documentsOrderByWithRelationInput | Prisma.school_documentsOrderByWithRelationInput[];
    cursor?: Prisma.school_documentsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | School_documentsCountAggregateInputType;
    _avg?: School_documentsAvgAggregateInputType;
    _sum?: School_documentsSumAggregateInputType;
    _min?: School_documentsMinAggregateInputType;
    _max?: School_documentsMaxAggregateInputType;
};
export type GetSchool_documentsAggregateType<T extends School_documentsAggregateArgs> = {
    [P in keyof T & keyof AggregateSchool_documents]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSchool_documents[P]> : Prisma.GetScalarType<T[P], AggregateSchool_documents[P]>;
};
export type school_documentsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.school_documentsWhereInput;
    orderBy?: Prisma.school_documentsOrderByWithAggregationInput | Prisma.school_documentsOrderByWithAggregationInput[];
    by: Prisma.School_documentsScalarFieldEnum[] | Prisma.School_documentsScalarFieldEnum;
    having?: Prisma.school_documentsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: School_documentsCountAggregateInputType | true;
    _avg?: School_documentsAvgAggregateInputType;
    _sum?: School_documentsSumAggregateInputType;
    _min?: School_documentsMinAggregateInputType;
    _max?: School_documentsMaxAggregateInputType;
};
export type School_documentsGroupByOutputType = {
    id: number;
    school_id: string | null;
    pending_id: number | null;
    doc_type: string;
    file_data: string | null;
    created_at: Date | null;
    binary_id: string | null;
    file_path: string | null;
    file_size: bigint | null;
    original_size: bigint | null;
    hydra_manifest: runtime.JsonValue | null;
    file_name: string | null;
    is_deleted: boolean | null;
    _count: School_documentsCountAggregateOutputType | null;
    _avg: School_documentsAvgAggregateOutputType | null;
    _sum: School_documentsSumAggregateOutputType | null;
    _min: School_documentsMinAggregateOutputType | null;
    _max: School_documentsMaxAggregateOutputType | null;
};
export type GetSchool_documentsGroupByPayload<T extends school_documentsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<School_documentsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof School_documentsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], School_documentsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], School_documentsGroupByOutputType[P]>;
}>>;
export type school_documentsWhereInput = {
    AND?: Prisma.school_documentsWhereInput | Prisma.school_documentsWhereInput[];
    OR?: Prisma.school_documentsWhereInput[];
    NOT?: Prisma.school_documentsWhereInput | Prisma.school_documentsWhereInput[];
    id?: Prisma.IntFilter<"school_documents"> | number;
    school_id?: Prisma.StringNullableFilter<"school_documents"> | string | null;
    pending_id?: Prisma.IntNullableFilter<"school_documents"> | number | null;
    doc_type?: Prisma.StringFilter<"school_documents"> | string;
    file_data?: Prisma.StringNullableFilter<"school_documents"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"school_documents"> | Date | string | null;
    binary_id?: Prisma.UuidNullableFilter<"school_documents"> | string | null;
    file_path?: Prisma.StringNullableFilter<"school_documents"> | string | null;
    file_size?: Prisma.BigIntNullableFilter<"school_documents"> | bigint | number | null;
    original_size?: Prisma.BigIntNullableFilter<"school_documents"> | bigint | number | null;
    hydra_manifest?: Prisma.JsonNullableFilter<"school_documents">;
    file_name?: Prisma.StringNullableFilter<"school_documents"> | string | null;
    is_deleted?: Prisma.BoolNullableFilter<"school_documents"> | boolean | null;
};
export type school_documentsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    pending_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    doc_type?: Prisma.SortOrder;
    file_data?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    binary_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    file_path?: Prisma.SortOrderInput | Prisma.SortOrder;
    file_size?: Prisma.SortOrderInput | Prisma.SortOrder;
    original_size?: Prisma.SortOrderInput | Prisma.SortOrder;
    hydra_manifest?: Prisma.SortOrderInput | Prisma.SortOrder;
    file_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    is_deleted?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type school_documentsWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.school_documentsWhereInput | Prisma.school_documentsWhereInput[];
    OR?: Prisma.school_documentsWhereInput[];
    NOT?: Prisma.school_documentsWhereInput | Prisma.school_documentsWhereInput[];
    school_id?: Prisma.StringNullableFilter<"school_documents"> | string | null;
    pending_id?: Prisma.IntNullableFilter<"school_documents"> | number | null;
    doc_type?: Prisma.StringFilter<"school_documents"> | string;
    file_data?: Prisma.StringNullableFilter<"school_documents"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"school_documents"> | Date | string | null;
    binary_id?: Prisma.UuidNullableFilter<"school_documents"> | string | null;
    file_path?: Prisma.StringNullableFilter<"school_documents"> | string | null;
    file_size?: Prisma.BigIntNullableFilter<"school_documents"> | bigint | number | null;
    original_size?: Prisma.BigIntNullableFilter<"school_documents"> | bigint | number | null;
    hydra_manifest?: Prisma.JsonNullableFilter<"school_documents">;
    file_name?: Prisma.StringNullableFilter<"school_documents"> | string | null;
    is_deleted?: Prisma.BoolNullableFilter<"school_documents"> | boolean | null;
}, "id">;
export type school_documentsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    pending_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    doc_type?: Prisma.SortOrder;
    file_data?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    binary_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    file_path?: Prisma.SortOrderInput | Prisma.SortOrder;
    file_size?: Prisma.SortOrderInput | Prisma.SortOrder;
    original_size?: Prisma.SortOrderInput | Prisma.SortOrder;
    hydra_manifest?: Prisma.SortOrderInput | Prisma.SortOrder;
    file_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    is_deleted?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.school_documentsCountOrderByAggregateInput;
    _avg?: Prisma.school_documentsAvgOrderByAggregateInput;
    _max?: Prisma.school_documentsMaxOrderByAggregateInput;
    _min?: Prisma.school_documentsMinOrderByAggregateInput;
    _sum?: Prisma.school_documentsSumOrderByAggregateInput;
};
export type school_documentsScalarWhereWithAggregatesInput = {
    AND?: Prisma.school_documentsScalarWhereWithAggregatesInput | Prisma.school_documentsScalarWhereWithAggregatesInput[];
    OR?: Prisma.school_documentsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.school_documentsScalarWhereWithAggregatesInput | Prisma.school_documentsScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"school_documents"> | number;
    school_id?: Prisma.StringNullableWithAggregatesFilter<"school_documents"> | string | null;
    pending_id?: Prisma.IntNullableWithAggregatesFilter<"school_documents"> | number | null;
    doc_type?: Prisma.StringWithAggregatesFilter<"school_documents"> | string;
    file_data?: Prisma.StringNullableWithAggregatesFilter<"school_documents"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"school_documents"> | Date | string | null;
    binary_id?: Prisma.UuidNullableWithAggregatesFilter<"school_documents"> | string | null;
    file_path?: Prisma.StringNullableWithAggregatesFilter<"school_documents"> | string | null;
    file_size?: Prisma.BigIntNullableWithAggregatesFilter<"school_documents"> | bigint | number | null;
    original_size?: Prisma.BigIntNullableWithAggregatesFilter<"school_documents"> | bigint | number | null;
    hydra_manifest?: Prisma.JsonNullableWithAggregatesFilter<"school_documents">;
    file_name?: Prisma.StringNullableWithAggregatesFilter<"school_documents"> | string | null;
    is_deleted?: Prisma.BoolNullableWithAggregatesFilter<"school_documents"> | boolean | null;
};
export type school_documentsCreateInput = {
    school_id?: string | null;
    pending_id?: number | null;
    doc_type: string;
    file_data?: string | null;
    created_at?: Date | string | null;
    binary_id?: string | null;
    file_path?: string | null;
    file_size?: bigint | number | null;
    original_size?: bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    file_name?: string | null;
    is_deleted?: boolean | null;
};
export type school_documentsUncheckedCreateInput = {
    id?: number;
    school_id?: string | null;
    pending_id?: number | null;
    doc_type: string;
    file_data?: string | null;
    created_at?: Date | string | null;
    binary_id?: string | null;
    file_path?: string | null;
    file_size?: bigint | number | null;
    original_size?: bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    file_name?: string | null;
    is_deleted?: boolean | null;
};
export type school_documentsUpdateInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pending_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    doc_type?: Prisma.StringFieldUpdateOperationsInput | string;
    file_data?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_path?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    original_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    file_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_deleted?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
};
export type school_documentsUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pending_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    doc_type?: Prisma.StringFieldUpdateOperationsInput | string;
    file_data?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_path?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    original_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    file_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_deleted?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
};
export type school_documentsCreateManyInput = {
    id?: number;
    school_id?: string | null;
    pending_id?: number | null;
    doc_type: string;
    file_data?: string | null;
    created_at?: Date | string | null;
    binary_id?: string | null;
    file_path?: string | null;
    file_size?: bigint | number | null;
    original_size?: bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    file_name?: string | null;
    is_deleted?: boolean | null;
};
export type school_documentsUpdateManyMutationInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pending_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    doc_type?: Prisma.StringFieldUpdateOperationsInput | string;
    file_data?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_path?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    original_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    file_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_deleted?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
};
export type school_documentsUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pending_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    doc_type?: Prisma.StringFieldUpdateOperationsInput | string;
    file_data?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    binary_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_path?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    original_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    hydra_manifest?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    file_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_deleted?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
};
export type school_documentsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    pending_id?: Prisma.SortOrder;
    doc_type?: Prisma.SortOrder;
    file_data?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    binary_id?: Prisma.SortOrder;
    file_path?: Prisma.SortOrder;
    file_size?: Prisma.SortOrder;
    original_size?: Prisma.SortOrder;
    hydra_manifest?: Prisma.SortOrder;
    file_name?: Prisma.SortOrder;
    is_deleted?: Prisma.SortOrder;
};
export type school_documentsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pending_id?: Prisma.SortOrder;
    file_size?: Prisma.SortOrder;
    original_size?: Prisma.SortOrder;
};
export type school_documentsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    pending_id?: Prisma.SortOrder;
    doc_type?: Prisma.SortOrder;
    file_data?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    binary_id?: Prisma.SortOrder;
    file_path?: Prisma.SortOrder;
    file_size?: Prisma.SortOrder;
    original_size?: Prisma.SortOrder;
    file_name?: Prisma.SortOrder;
    is_deleted?: Prisma.SortOrder;
};
export type school_documentsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    pending_id?: Prisma.SortOrder;
    doc_type?: Prisma.SortOrder;
    file_data?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    binary_id?: Prisma.SortOrder;
    file_path?: Prisma.SortOrder;
    file_size?: Prisma.SortOrder;
    original_size?: Prisma.SortOrder;
    file_name?: Prisma.SortOrder;
    is_deleted?: Prisma.SortOrder;
};
export type school_documentsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pending_id?: Prisma.SortOrder;
    file_size?: Prisma.SortOrder;
    original_size?: Prisma.SortOrder;
};
export type school_documentsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    pending_id?: boolean;
    doc_type?: boolean;
    file_data?: boolean;
    created_at?: boolean;
    binary_id?: boolean;
    file_path?: boolean;
    file_size?: boolean;
    original_size?: boolean;
    hydra_manifest?: boolean;
    file_name?: boolean;
    is_deleted?: boolean;
}, ExtArgs["result"]["school_documents"]>;
export type school_documentsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    pending_id?: boolean;
    doc_type?: boolean;
    file_data?: boolean;
    created_at?: boolean;
    binary_id?: boolean;
    file_path?: boolean;
    file_size?: boolean;
    original_size?: boolean;
    hydra_manifest?: boolean;
    file_name?: boolean;
    is_deleted?: boolean;
}, ExtArgs["result"]["school_documents"]>;
export type school_documentsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    pending_id?: boolean;
    doc_type?: boolean;
    file_data?: boolean;
    created_at?: boolean;
    binary_id?: boolean;
    file_path?: boolean;
    file_size?: boolean;
    original_size?: boolean;
    hydra_manifest?: boolean;
    file_name?: boolean;
    is_deleted?: boolean;
}, ExtArgs["result"]["school_documents"]>;
export type school_documentsSelectScalar = {
    id?: boolean;
    school_id?: boolean;
    pending_id?: boolean;
    doc_type?: boolean;
    file_data?: boolean;
    created_at?: boolean;
    binary_id?: boolean;
    file_path?: boolean;
    file_size?: boolean;
    original_size?: boolean;
    hydra_manifest?: boolean;
    file_name?: boolean;
    is_deleted?: boolean;
};
export type school_documentsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "school_id" | "pending_id" | "doc_type" | "file_data" | "created_at" | "binary_id" | "file_path" | "file_size" | "original_size" | "hydra_manifest" | "file_name" | "is_deleted", ExtArgs["result"]["school_documents"]>;
export type $school_documentsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "school_documents";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        school_id: string | null;
        pending_id: number | null;
        doc_type: string;
        file_data: string | null;
        created_at: Date | null;
        binary_id: string | null;
        file_path: string | null;
        file_size: bigint | null;
        original_size: bigint | null;
        hydra_manifest: runtime.JsonValue | null;
        file_name: string | null;
        is_deleted: boolean | null;
    }, ExtArgs["result"]["school_documents"]>;
    composites: {};
};
export type school_documentsGetPayload<S extends boolean | null | undefined | school_documentsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$school_documentsPayload, S>;
export type school_documentsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<school_documentsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: School_documentsCountAggregateInputType | true;
};
export interface school_documentsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['school_documents'];
        meta: {
            name: 'school_documents';
        };
    };
    findUnique<T extends school_documentsFindUniqueArgs>(args: Prisma.SelectSubset<T, school_documentsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__school_documentsClient<runtime.Types.Result.GetResult<Prisma.$school_documentsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends school_documentsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, school_documentsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__school_documentsClient<runtime.Types.Result.GetResult<Prisma.$school_documentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends school_documentsFindFirstArgs>(args?: Prisma.SelectSubset<T, school_documentsFindFirstArgs<ExtArgs>>): Prisma.Prisma__school_documentsClient<runtime.Types.Result.GetResult<Prisma.$school_documentsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends school_documentsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, school_documentsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__school_documentsClient<runtime.Types.Result.GetResult<Prisma.$school_documentsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends school_documentsFindManyArgs>(args?: Prisma.SelectSubset<T, school_documentsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$school_documentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends school_documentsCreateArgs>(args: Prisma.SelectSubset<T, school_documentsCreateArgs<ExtArgs>>): Prisma.Prisma__school_documentsClient<runtime.Types.Result.GetResult<Prisma.$school_documentsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends school_documentsCreateManyArgs>(args?: Prisma.SelectSubset<T, school_documentsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends school_documentsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, school_documentsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$school_documentsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends school_documentsDeleteArgs>(args: Prisma.SelectSubset<T, school_documentsDeleteArgs<ExtArgs>>): Prisma.Prisma__school_documentsClient<runtime.Types.Result.GetResult<Prisma.$school_documentsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends school_documentsUpdateArgs>(args: Prisma.SelectSubset<T, school_documentsUpdateArgs<ExtArgs>>): Prisma.Prisma__school_documentsClient<runtime.Types.Result.GetResult<Prisma.$school_documentsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends school_documentsDeleteManyArgs>(args?: Prisma.SelectSubset<T, school_documentsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends school_documentsUpdateManyArgs>(args: Prisma.SelectSubset<T, school_documentsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends school_documentsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, school_documentsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$school_documentsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends school_documentsUpsertArgs>(args: Prisma.SelectSubset<T, school_documentsUpsertArgs<ExtArgs>>): Prisma.Prisma__school_documentsClient<runtime.Types.Result.GetResult<Prisma.$school_documentsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends school_documentsCountArgs>(args?: Prisma.Subset<T, school_documentsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], School_documentsCountAggregateOutputType> : number>;
    aggregate<T extends School_documentsAggregateArgs>(args: Prisma.Subset<T, School_documentsAggregateArgs>): Prisma.PrismaPromise<GetSchool_documentsAggregateType<T>>;
    groupBy<T extends school_documentsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: school_documentsGroupByArgs['orderBy'];
    } : {
        orderBy?: school_documentsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, school_documentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSchool_documentsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: school_documentsFieldRefs;
}
export interface Prisma__school_documentsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface school_documentsFieldRefs {
    readonly id: Prisma.FieldRef<"school_documents", 'Int'>;
    readonly school_id: Prisma.FieldRef<"school_documents", 'String'>;
    readonly pending_id: Prisma.FieldRef<"school_documents", 'Int'>;
    readonly doc_type: Prisma.FieldRef<"school_documents", 'String'>;
    readonly file_data: Prisma.FieldRef<"school_documents", 'String'>;
    readonly created_at: Prisma.FieldRef<"school_documents", 'DateTime'>;
    readonly binary_id: Prisma.FieldRef<"school_documents", 'String'>;
    readonly file_path: Prisma.FieldRef<"school_documents", 'String'>;
    readonly file_size: Prisma.FieldRef<"school_documents", 'BigInt'>;
    readonly original_size: Prisma.FieldRef<"school_documents", 'BigInt'>;
    readonly hydra_manifest: Prisma.FieldRef<"school_documents", 'Json'>;
    readonly file_name: Prisma.FieldRef<"school_documents", 'String'>;
    readonly is_deleted: Prisma.FieldRef<"school_documents", 'Boolean'>;
}
export type school_documentsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_documentsSelect<ExtArgs> | null;
    omit?: Prisma.school_documentsOmit<ExtArgs> | null;
    where: Prisma.school_documentsWhereUniqueInput;
};
export type school_documentsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_documentsSelect<ExtArgs> | null;
    omit?: Prisma.school_documentsOmit<ExtArgs> | null;
    where: Prisma.school_documentsWhereUniqueInput;
};
export type school_documentsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_documentsSelect<ExtArgs> | null;
    omit?: Prisma.school_documentsOmit<ExtArgs> | null;
    where?: Prisma.school_documentsWhereInput;
    orderBy?: Prisma.school_documentsOrderByWithRelationInput | Prisma.school_documentsOrderByWithRelationInput[];
    cursor?: Prisma.school_documentsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.School_documentsScalarFieldEnum | Prisma.School_documentsScalarFieldEnum[];
};
export type school_documentsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_documentsSelect<ExtArgs> | null;
    omit?: Prisma.school_documentsOmit<ExtArgs> | null;
    where?: Prisma.school_documentsWhereInput;
    orderBy?: Prisma.school_documentsOrderByWithRelationInput | Prisma.school_documentsOrderByWithRelationInput[];
    cursor?: Prisma.school_documentsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.School_documentsScalarFieldEnum | Prisma.School_documentsScalarFieldEnum[];
};
export type school_documentsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_documentsSelect<ExtArgs> | null;
    omit?: Prisma.school_documentsOmit<ExtArgs> | null;
    where?: Prisma.school_documentsWhereInput;
    orderBy?: Prisma.school_documentsOrderByWithRelationInput | Prisma.school_documentsOrderByWithRelationInput[];
    cursor?: Prisma.school_documentsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.School_documentsScalarFieldEnum | Prisma.School_documentsScalarFieldEnum[];
};
export type school_documentsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_documentsSelect<ExtArgs> | null;
    omit?: Prisma.school_documentsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.school_documentsCreateInput, Prisma.school_documentsUncheckedCreateInput>;
};
export type school_documentsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.school_documentsCreateManyInput | Prisma.school_documentsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type school_documentsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_documentsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.school_documentsOmit<ExtArgs> | null;
    data: Prisma.school_documentsCreateManyInput | Prisma.school_documentsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type school_documentsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_documentsSelect<ExtArgs> | null;
    omit?: Prisma.school_documentsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.school_documentsUpdateInput, Prisma.school_documentsUncheckedUpdateInput>;
    where: Prisma.school_documentsWhereUniqueInput;
};
export type school_documentsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.school_documentsUpdateManyMutationInput, Prisma.school_documentsUncheckedUpdateManyInput>;
    where?: Prisma.school_documentsWhereInput;
    limit?: number;
};
export type school_documentsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_documentsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.school_documentsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.school_documentsUpdateManyMutationInput, Prisma.school_documentsUncheckedUpdateManyInput>;
    where?: Prisma.school_documentsWhereInput;
    limit?: number;
};
export type school_documentsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_documentsSelect<ExtArgs> | null;
    omit?: Prisma.school_documentsOmit<ExtArgs> | null;
    where: Prisma.school_documentsWhereUniqueInput;
    create: Prisma.XOR<Prisma.school_documentsCreateInput, Prisma.school_documentsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.school_documentsUpdateInput, Prisma.school_documentsUncheckedUpdateInput>;
};
export type school_documentsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_documentsSelect<ExtArgs> | null;
    omit?: Prisma.school_documentsOmit<ExtArgs> | null;
    where: Prisma.school_documentsWhereUniqueInput;
};
export type school_documentsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.school_documentsWhereInput;
    limit?: number;
};
export type school_documentsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.school_documentsSelect<ExtArgs> | null;
    omit?: Prisma.school_documentsOmit<ExtArgs> | null;
};
