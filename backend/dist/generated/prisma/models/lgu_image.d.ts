import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type lgu_imageModel = runtime.Types.Result.DefaultSelection<Prisma.$lgu_imagePayload>;
export type AggregateLgu_image = {
    _count: Lgu_imageCountAggregateOutputType | null;
    _avg: Lgu_imageAvgAggregateOutputType | null;
    _sum: Lgu_imageSumAggregateOutputType | null;
    _min: Lgu_imageMinAggregateOutputType | null;
    _max: Lgu_imageMaxAggregateOutputType | null;
};
export type Lgu_imageAvgAggregateOutputType = {
    id: number | null;
    project_id: number | null;
    file_size: number | null;
};
export type Lgu_imageSumAggregateOutputType = {
    id: number | null;
    project_id: number | null;
    file_size: bigint | null;
};
export type Lgu_imageMinAggregateOutputType = {
    id: number | null;
    project_id: number | null;
    image_data: string | null;
    uploaded_by: string | null;
    file_size: bigint | null;
    created_at: Date | null;
};
export type Lgu_imageMaxAggregateOutputType = {
    id: number | null;
    project_id: number | null;
    image_data: string | null;
    uploaded_by: string | null;
    file_size: bigint | null;
    created_at: Date | null;
};
export type Lgu_imageCountAggregateOutputType = {
    id: number;
    project_id: number;
    image_data: number;
    uploaded_by: number;
    file_size: number;
    created_at: number;
    _all: number;
};
export type Lgu_imageAvgAggregateInputType = {
    id?: true;
    project_id?: true;
    file_size?: true;
};
export type Lgu_imageSumAggregateInputType = {
    id?: true;
    project_id?: true;
    file_size?: true;
};
export type Lgu_imageMinAggregateInputType = {
    id?: true;
    project_id?: true;
    image_data?: true;
    uploaded_by?: true;
    file_size?: true;
    created_at?: true;
};
export type Lgu_imageMaxAggregateInputType = {
    id?: true;
    project_id?: true;
    image_data?: true;
    uploaded_by?: true;
    file_size?: true;
    created_at?: true;
};
export type Lgu_imageCountAggregateInputType = {
    id?: true;
    project_id?: true;
    image_data?: true;
    uploaded_by?: true;
    file_size?: true;
    created_at?: true;
    _all?: true;
};
export type Lgu_imageAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.lgu_imageWhereInput;
    orderBy?: Prisma.lgu_imageOrderByWithRelationInput | Prisma.lgu_imageOrderByWithRelationInput[];
    cursor?: Prisma.lgu_imageWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Lgu_imageCountAggregateInputType;
    _avg?: Lgu_imageAvgAggregateInputType;
    _sum?: Lgu_imageSumAggregateInputType;
    _min?: Lgu_imageMinAggregateInputType;
    _max?: Lgu_imageMaxAggregateInputType;
};
export type GetLgu_imageAggregateType<T extends Lgu_imageAggregateArgs> = {
    [P in keyof T & keyof AggregateLgu_image]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLgu_image[P]> : Prisma.GetScalarType<T[P], AggregateLgu_image[P]>;
};
export type lgu_imageGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.lgu_imageWhereInput;
    orderBy?: Prisma.lgu_imageOrderByWithAggregationInput | Prisma.lgu_imageOrderByWithAggregationInput[];
    by: Prisma.Lgu_imageScalarFieldEnum[] | Prisma.Lgu_imageScalarFieldEnum;
    having?: Prisma.lgu_imageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Lgu_imageCountAggregateInputType | true;
    _avg?: Lgu_imageAvgAggregateInputType;
    _sum?: Lgu_imageSumAggregateInputType;
    _min?: Lgu_imageMinAggregateInputType;
    _max?: Lgu_imageMaxAggregateInputType;
};
export type Lgu_imageGroupByOutputType = {
    id: number;
    project_id: number | null;
    image_data: string | null;
    uploaded_by: string | null;
    file_size: bigint | null;
    created_at: Date | null;
    _count: Lgu_imageCountAggregateOutputType | null;
    _avg: Lgu_imageAvgAggregateOutputType | null;
    _sum: Lgu_imageSumAggregateOutputType | null;
    _min: Lgu_imageMinAggregateOutputType | null;
    _max: Lgu_imageMaxAggregateOutputType | null;
};
export type GetLgu_imageGroupByPayload<T extends lgu_imageGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Lgu_imageGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Lgu_imageGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Lgu_imageGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Lgu_imageGroupByOutputType[P]>;
}>>;
export type lgu_imageWhereInput = {
    AND?: Prisma.lgu_imageWhereInput | Prisma.lgu_imageWhereInput[];
    OR?: Prisma.lgu_imageWhereInput[];
    NOT?: Prisma.lgu_imageWhereInput | Prisma.lgu_imageWhereInput[];
    id?: Prisma.IntFilter<"lgu_image"> | number;
    project_id?: Prisma.IntNullableFilter<"lgu_image"> | number | null;
    image_data?: Prisma.StringNullableFilter<"lgu_image"> | string | null;
    uploaded_by?: Prisma.StringNullableFilter<"lgu_image"> | string | null;
    file_size?: Prisma.BigIntNullableFilter<"lgu_image"> | bigint | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"lgu_image"> | Date | string | null;
    lgu_projects?: Prisma.XOR<Prisma.Lgu_projectsNullableScalarRelationFilter, Prisma.lgu_projectsWhereInput> | null;
};
export type lgu_imageOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    project_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    image_data?: Prisma.SortOrderInput | Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrderInput | Prisma.SortOrder;
    file_size?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    lgu_projects?: Prisma.lgu_projectsOrderByWithRelationInput;
};
export type lgu_imageWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.lgu_imageWhereInput | Prisma.lgu_imageWhereInput[];
    OR?: Prisma.lgu_imageWhereInput[];
    NOT?: Prisma.lgu_imageWhereInput | Prisma.lgu_imageWhereInput[];
    project_id?: Prisma.IntNullableFilter<"lgu_image"> | number | null;
    image_data?: Prisma.StringNullableFilter<"lgu_image"> | string | null;
    uploaded_by?: Prisma.StringNullableFilter<"lgu_image"> | string | null;
    file_size?: Prisma.BigIntNullableFilter<"lgu_image"> | bigint | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"lgu_image"> | Date | string | null;
    lgu_projects?: Prisma.XOR<Prisma.Lgu_projectsNullableScalarRelationFilter, Prisma.lgu_projectsWhereInput> | null;
}, "id">;
export type lgu_imageOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    project_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    image_data?: Prisma.SortOrderInput | Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrderInput | Prisma.SortOrder;
    file_size?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.lgu_imageCountOrderByAggregateInput;
    _avg?: Prisma.lgu_imageAvgOrderByAggregateInput;
    _max?: Prisma.lgu_imageMaxOrderByAggregateInput;
    _min?: Prisma.lgu_imageMinOrderByAggregateInput;
    _sum?: Prisma.lgu_imageSumOrderByAggregateInput;
};
export type lgu_imageScalarWhereWithAggregatesInput = {
    AND?: Prisma.lgu_imageScalarWhereWithAggregatesInput | Prisma.lgu_imageScalarWhereWithAggregatesInput[];
    OR?: Prisma.lgu_imageScalarWhereWithAggregatesInput[];
    NOT?: Prisma.lgu_imageScalarWhereWithAggregatesInput | Prisma.lgu_imageScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"lgu_image"> | number;
    project_id?: Prisma.IntNullableWithAggregatesFilter<"lgu_image"> | number | null;
    image_data?: Prisma.StringNullableWithAggregatesFilter<"lgu_image"> | string | null;
    uploaded_by?: Prisma.StringNullableWithAggregatesFilter<"lgu_image"> | string | null;
    file_size?: Prisma.BigIntNullableWithAggregatesFilter<"lgu_image"> | bigint | number | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"lgu_image"> | Date | string | null;
};
export type lgu_imageCreateInput = {
    image_data?: string | null;
    uploaded_by?: string | null;
    file_size?: bigint | number | null;
    created_at?: Date | string | null;
    lgu_projects?: Prisma.lgu_projectsCreateNestedOneWithoutLgu_imageInput;
};
export type lgu_imageUncheckedCreateInput = {
    id?: number;
    project_id?: number | null;
    image_data?: string | null;
    uploaded_by?: string | null;
    file_size?: bigint | number | null;
    created_at?: Date | string | null;
};
export type lgu_imageUpdateInput = {
    image_data?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lgu_projects?: Prisma.lgu_projectsUpdateOneWithoutLgu_imageNestedInput;
};
export type lgu_imageUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    project_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    image_data?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type lgu_imageCreateManyInput = {
    id?: number;
    project_id?: number | null;
    image_data?: string | null;
    uploaded_by?: string | null;
    file_size?: bigint | number | null;
    created_at?: Date | string | null;
};
export type lgu_imageUpdateManyMutationInput = {
    image_data?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type lgu_imageUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    project_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    image_data?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type lgu_imageCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    project_id?: Prisma.SortOrder;
    image_data?: Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    file_size?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type lgu_imageAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    project_id?: Prisma.SortOrder;
    file_size?: Prisma.SortOrder;
};
export type lgu_imageMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    project_id?: Prisma.SortOrder;
    image_data?: Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    file_size?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type lgu_imageMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    project_id?: Prisma.SortOrder;
    image_data?: Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    file_size?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type lgu_imageSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    project_id?: Prisma.SortOrder;
    file_size?: Prisma.SortOrder;
};
export type Lgu_imageListRelationFilter = {
    every?: Prisma.lgu_imageWhereInput;
    some?: Prisma.lgu_imageWhereInput;
    none?: Prisma.lgu_imageWhereInput;
};
export type lgu_imageOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type lgu_imageCreateNestedManyWithoutLgu_projectsInput = {
    create?: Prisma.XOR<Prisma.lgu_imageCreateWithoutLgu_projectsInput, Prisma.lgu_imageUncheckedCreateWithoutLgu_projectsInput> | Prisma.lgu_imageCreateWithoutLgu_projectsInput[] | Prisma.lgu_imageUncheckedCreateWithoutLgu_projectsInput[];
    connectOrCreate?: Prisma.lgu_imageCreateOrConnectWithoutLgu_projectsInput | Prisma.lgu_imageCreateOrConnectWithoutLgu_projectsInput[];
    createMany?: Prisma.lgu_imageCreateManyLgu_projectsInputEnvelope;
    connect?: Prisma.lgu_imageWhereUniqueInput | Prisma.lgu_imageWhereUniqueInput[];
};
export type lgu_imageUncheckedCreateNestedManyWithoutLgu_projectsInput = {
    create?: Prisma.XOR<Prisma.lgu_imageCreateWithoutLgu_projectsInput, Prisma.lgu_imageUncheckedCreateWithoutLgu_projectsInput> | Prisma.lgu_imageCreateWithoutLgu_projectsInput[] | Prisma.lgu_imageUncheckedCreateWithoutLgu_projectsInput[];
    connectOrCreate?: Prisma.lgu_imageCreateOrConnectWithoutLgu_projectsInput | Prisma.lgu_imageCreateOrConnectWithoutLgu_projectsInput[];
    createMany?: Prisma.lgu_imageCreateManyLgu_projectsInputEnvelope;
    connect?: Prisma.lgu_imageWhereUniqueInput | Prisma.lgu_imageWhereUniqueInput[];
};
export type lgu_imageUpdateManyWithoutLgu_projectsNestedInput = {
    create?: Prisma.XOR<Prisma.lgu_imageCreateWithoutLgu_projectsInput, Prisma.lgu_imageUncheckedCreateWithoutLgu_projectsInput> | Prisma.lgu_imageCreateWithoutLgu_projectsInput[] | Prisma.lgu_imageUncheckedCreateWithoutLgu_projectsInput[];
    connectOrCreate?: Prisma.lgu_imageCreateOrConnectWithoutLgu_projectsInput | Prisma.lgu_imageCreateOrConnectWithoutLgu_projectsInput[];
    upsert?: Prisma.lgu_imageUpsertWithWhereUniqueWithoutLgu_projectsInput | Prisma.lgu_imageUpsertWithWhereUniqueWithoutLgu_projectsInput[];
    createMany?: Prisma.lgu_imageCreateManyLgu_projectsInputEnvelope;
    set?: Prisma.lgu_imageWhereUniqueInput | Prisma.lgu_imageWhereUniqueInput[];
    disconnect?: Prisma.lgu_imageWhereUniqueInput | Prisma.lgu_imageWhereUniqueInput[];
    delete?: Prisma.lgu_imageWhereUniqueInput | Prisma.lgu_imageWhereUniqueInput[];
    connect?: Prisma.lgu_imageWhereUniqueInput | Prisma.lgu_imageWhereUniqueInput[];
    update?: Prisma.lgu_imageUpdateWithWhereUniqueWithoutLgu_projectsInput | Prisma.lgu_imageUpdateWithWhereUniqueWithoutLgu_projectsInput[];
    updateMany?: Prisma.lgu_imageUpdateManyWithWhereWithoutLgu_projectsInput | Prisma.lgu_imageUpdateManyWithWhereWithoutLgu_projectsInput[];
    deleteMany?: Prisma.lgu_imageScalarWhereInput | Prisma.lgu_imageScalarWhereInput[];
};
export type lgu_imageUncheckedUpdateManyWithoutLgu_projectsNestedInput = {
    create?: Prisma.XOR<Prisma.lgu_imageCreateWithoutLgu_projectsInput, Prisma.lgu_imageUncheckedCreateWithoutLgu_projectsInput> | Prisma.lgu_imageCreateWithoutLgu_projectsInput[] | Prisma.lgu_imageUncheckedCreateWithoutLgu_projectsInput[];
    connectOrCreate?: Prisma.lgu_imageCreateOrConnectWithoutLgu_projectsInput | Prisma.lgu_imageCreateOrConnectWithoutLgu_projectsInput[];
    upsert?: Prisma.lgu_imageUpsertWithWhereUniqueWithoutLgu_projectsInput | Prisma.lgu_imageUpsertWithWhereUniqueWithoutLgu_projectsInput[];
    createMany?: Prisma.lgu_imageCreateManyLgu_projectsInputEnvelope;
    set?: Prisma.lgu_imageWhereUniqueInput | Prisma.lgu_imageWhereUniqueInput[];
    disconnect?: Prisma.lgu_imageWhereUniqueInput | Prisma.lgu_imageWhereUniqueInput[];
    delete?: Prisma.lgu_imageWhereUniqueInput | Prisma.lgu_imageWhereUniqueInput[];
    connect?: Prisma.lgu_imageWhereUniqueInput | Prisma.lgu_imageWhereUniqueInput[];
    update?: Prisma.lgu_imageUpdateWithWhereUniqueWithoutLgu_projectsInput | Prisma.lgu_imageUpdateWithWhereUniqueWithoutLgu_projectsInput[];
    updateMany?: Prisma.lgu_imageUpdateManyWithWhereWithoutLgu_projectsInput | Prisma.lgu_imageUpdateManyWithWhereWithoutLgu_projectsInput[];
    deleteMany?: Prisma.lgu_imageScalarWhereInput | Prisma.lgu_imageScalarWhereInput[];
};
export type lgu_imageCreateWithoutLgu_projectsInput = {
    image_data?: string | null;
    uploaded_by?: string | null;
    file_size?: bigint | number | null;
    created_at?: Date | string | null;
};
export type lgu_imageUncheckedCreateWithoutLgu_projectsInput = {
    id?: number;
    image_data?: string | null;
    uploaded_by?: string | null;
    file_size?: bigint | number | null;
    created_at?: Date | string | null;
};
export type lgu_imageCreateOrConnectWithoutLgu_projectsInput = {
    where: Prisma.lgu_imageWhereUniqueInput;
    create: Prisma.XOR<Prisma.lgu_imageCreateWithoutLgu_projectsInput, Prisma.lgu_imageUncheckedCreateWithoutLgu_projectsInput>;
};
export type lgu_imageCreateManyLgu_projectsInputEnvelope = {
    data: Prisma.lgu_imageCreateManyLgu_projectsInput | Prisma.lgu_imageCreateManyLgu_projectsInput[];
    skipDuplicates?: boolean;
};
export type lgu_imageUpsertWithWhereUniqueWithoutLgu_projectsInput = {
    where: Prisma.lgu_imageWhereUniqueInput;
    update: Prisma.XOR<Prisma.lgu_imageUpdateWithoutLgu_projectsInput, Prisma.lgu_imageUncheckedUpdateWithoutLgu_projectsInput>;
    create: Prisma.XOR<Prisma.lgu_imageCreateWithoutLgu_projectsInput, Prisma.lgu_imageUncheckedCreateWithoutLgu_projectsInput>;
};
export type lgu_imageUpdateWithWhereUniqueWithoutLgu_projectsInput = {
    where: Prisma.lgu_imageWhereUniqueInput;
    data: Prisma.XOR<Prisma.lgu_imageUpdateWithoutLgu_projectsInput, Prisma.lgu_imageUncheckedUpdateWithoutLgu_projectsInput>;
};
export type lgu_imageUpdateManyWithWhereWithoutLgu_projectsInput = {
    where: Prisma.lgu_imageScalarWhereInput;
    data: Prisma.XOR<Prisma.lgu_imageUpdateManyMutationInput, Prisma.lgu_imageUncheckedUpdateManyWithoutLgu_projectsInput>;
};
export type lgu_imageScalarWhereInput = {
    AND?: Prisma.lgu_imageScalarWhereInput | Prisma.lgu_imageScalarWhereInput[];
    OR?: Prisma.lgu_imageScalarWhereInput[];
    NOT?: Prisma.lgu_imageScalarWhereInput | Prisma.lgu_imageScalarWhereInput[];
    id?: Prisma.IntFilter<"lgu_image"> | number;
    project_id?: Prisma.IntNullableFilter<"lgu_image"> | number | null;
    image_data?: Prisma.StringNullableFilter<"lgu_image"> | string | null;
    uploaded_by?: Prisma.StringNullableFilter<"lgu_image"> | string | null;
    file_size?: Prisma.BigIntNullableFilter<"lgu_image"> | bigint | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"lgu_image"> | Date | string | null;
};
export type lgu_imageCreateManyLgu_projectsInput = {
    id?: number;
    image_data?: string | null;
    uploaded_by?: string | null;
    file_size?: bigint | number | null;
    created_at?: Date | string | null;
};
export type lgu_imageUpdateWithoutLgu_projectsInput = {
    image_data?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type lgu_imageUncheckedUpdateWithoutLgu_projectsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    image_data?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type lgu_imageUncheckedUpdateManyWithoutLgu_projectsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    image_data?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    file_size?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type lgu_imageSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    project_id?: boolean;
    image_data?: boolean;
    uploaded_by?: boolean;
    file_size?: boolean;
    created_at?: boolean;
    lgu_projects?: boolean | Prisma.lgu_image$lgu_projectsArgs<ExtArgs>;
}, ExtArgs["result"]["lgu_image"]>;
export type lgu_imageSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    project_id?: boolean;
    image_data?: boolean;
    uploaded_by?: boolean;
    file_size?: boolean;
    created_at?: boolean;
    lgu_projects?: boolean | Prisma.lgu_image$lgu_projectsArgs<ExtArgs>;
}, ExtArgs["result"]["lgu_image"]>;
export type lgu_imageSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    project_id?: boolean;
    image_data?: boolean;
    uploaded_by?: boolean;
    file_size?: boolean;
    created_at?: boolean;
    lgu_projects?: boolean | Prisma.lgu_image$lgu_projectsArgs<ExtArgs>;
}, ExtArgs["result"]["lgu_image"]>;
export type lgu_imageSelectScalar = {
    id?: boolean;
    project_id?: boolean;
    image_data?: boolean;
    uploaded_by?: boolean;
    file_size?: boolean;
    created_at?: boolean;
};
export type lgu_imageOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "project_id" | "image_data" | "uploaded_by" | "file_size" | "created_at", ExtArgs["result"]["lgu_image"]>;
export type lgu_imageInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lgu_projects?: boolean | Prisma.lgu_image$lgu_projectsArgs<ExtArgs>;
};
export type lgu_imageIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lgu_projects?: boolean | Prisma.lgu_image$lgu_projectsArgs<ExtArgs>;
};
export type lgu_imageIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lgu_projects?: boolean | Prisma.lgu_image$lgu_projectsArgs<ExtArgs>;
};
export type $lgu_imagePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "lgu_image";
    objects: {
        lgu_projects: Prisma.$lgu_projectsPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        project_id: number | null;
        image_data: string | null;
        uploaded_by: string | null;
        file_size: bigint | null;
        created_at: Date | null;
    }, ExtArgs["result"]["lgu_image"]>;
    composites: {};
};
export type lgu_imageGetPayload<S extends boolean | null | undefined | lgu_imageDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$lgu_imagePayload, S>;
export type lgu_imageCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<lgu_imageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Lgu_imageCountAggregateInputType | true;
};
export interface lgu_imageDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['lgu_image'];
        meta: {
            name: 'lgu_image';
        };
    };
    findUnique<T extends lgu_imageFindUniqueArgs>(args: Prisma.SelectSubset<T, lgu_imageFindUniqueArgs<ExtArgs>>): Prisma.Prisma__lgu_imageClient<runtime.Types.Result.GetResult<Prisma.$lgu_imagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends lgu_imageFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, lgu_imageFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__lgu_imageClient<runtime.Types.Result.GetResult<Prisma.$lgu_imagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends lgu_imageFindFirstArgs>(args?: Prisma.SelectSubset<T, lgu_imageFindFirstArgs<ExtArgs>>): Prisma.Prisma__lgu_imageClient<runtime.Types.Result.GetResult<Prisma.$lgu_imagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends lgu_imageFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, lgu_imageFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__lgu_imageClient<runtime.Types.Result.GetResult<Prisma.$lgu_imagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends lgu_imageFindManyArgs>(args?: Prisma.SelectSubset<T, lgu_imageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$lgu_imagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends lgu_imageCreateArgs>(args: Prisma.SelectSubset<T, lgu_imageCreateArgs<ExtArgs>>): Prisma.Prisma__lgu_imageClient<runtime.Types.Result.GetResult<Prisma.$lgu_imagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends lgu_imageCreateManyArgs>(args?: Prisma.SelectSubset<T, lgu_imageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends lgu_imageCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, lgu_imageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$lgu_imagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends lgu_imageDeleteArgs>(args: Prisma.SelectSubset<T, lgu_imageDeleteArgs<ExtArgs>>): Prisma.Prisma__lgu_imageClient<runtime.Types.Result.GetResult<Prisma.$lgu_imagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends lgu_imageUpdateArgs>(args: Prisma.SelectSubset<T, lgu_imageUpdateArgs<ExtArgs>>): Prisma.Prisma__lgu_imageClient<runtime.Types.Result.GetResult<Prisma.$lgu_imagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends lgu_imageDeleteManyArgs>(args?: Prisma.SelectSubset<T, lgu_imageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends lgu_imageUpdateManyArgs>(args: Prisma.SelectSubset<T, lgu_imageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends lgu_imageUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, lgu_imageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$lgu_imagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends lgu_imageUpsertArgs>(args: Prisma.SelectSubset<T, lgu_imageUpsertArgs<ExtArgs>>): Prisma.Prisma__lgu_imageClient<runtime.Types.Result.GetResult<Prisma.$lgu_imagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends lgu_imageCountArgs>(args?: Prisma.Subset<T, lgu_imageCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Lgu_imageCountAggregateOutputType> : number>;
    aggregate<T extends Lgu_imageAggregateArgs>(args: Prisma.Subset<T, Lgu_imageAggregateArgs>): Prisma.PrismaPromise<GetLgu_imageAggregateType<T>>;
    groupBy<T extends lgu_imageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: lgu_imageGroupByArgs['orderBy'];
    } : {
        orderBy?: lgu_imageGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, lgu_imageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLgu_imageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: lgu_imageFieldRefs;
}
export interface Prisma__lgu_imageClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    lgu_projects<T extends Prisma.lgu_image$lgu_projectsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.lgu_image$lgu_projectsArgs<ExtArgs>>): Prisma.Prisma__lgu_projectsClient<runtime.Types.Result.GetResult<Prisma.$lgu_projectsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface lgu_imageFieldRefs {
    readonly id: Prisma.FieldRef<"lgu_image", 'Int'>;
    readonly project_id: Prisma.FieldRef<"lgu_image", 'Int'>;
    readonly image_data: Prisma.FieldRef<"lgu_image", 'String'>;
    readonly uploaded_by: Prisma.FieldRef<"lgu_image", 'String'>;
    readonly file_size: Prisma.FieldRef<"lgu_image", 'BigInt'>;
    readonly created_at: Prisma.FieldRef<"lgu_image", 'DateTime'>;
}
export type lgu_imageFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.lgu_imageSelect<ExtArgs> | null;
    omit?: Prisma.lgu_imageOmit<ExtArgs> | null;
    include?: Prisma.lgu_imageInclude<ExtArgs> | null;
    where: Prisma.lgu_imageWhereUniqueInput;
};
export type lgu_imageFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.lgu_imageSelect<ExtArgs> | null;
    omit?: Prisma.lgu_imageOmit<ExtArgs> | null;
    include?: Prisma.lgu_imageInclude<ExtArgs> | null;
    where: Prisma.lgu_imageWhereUniqueInput;
};
export type lgu_imageFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.lgu_imageSelect<ExtArgs> | null;
    omit?: Prisma.lgu_imageOmit<ExtArgs> | null;
    include?: Prisma.lgu_imageInclude<ExtArgs> | null;
    where?: Prisma.lgu_imageWhereInput;
    orderBy?: Prisma.lgu_imageOrderByWithRelationInput | Prisma.lgu_imageOrderByWithRelationInput[];
    cursor?: Prisma.lgu_imageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Lgu_imageScalarFieldEnum | Prisma.Lgu_imageScalarFieldEnum[];
};
export type lgu_imageFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.lgu_imageSelect<ExtArgs> | null;
    omit?: Prisma.lgu_imageOmit<ExtArgs> | null;
    include?: Prisma.lgu_imageInclude<ExtArgs> | null;
    where?: Prisma.lgu_imageWhereInput;
    orderBy?: Prisma.lgu_imageOrderByWithRelationInput | Prisma.lgu_imageOrderByWithRelationInput[];
    cursor?: Prisma.lgu_imageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Lgu_imageScalarFieldEnum | Prisma.Lgu_imageScalarFieldEnum[];
};
export type lgu_imageFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.lgu_imageSelect<ExtArgs> | null;
    omit?: Prisma.lgu_imageOmit<ExtArgs> | null;
    include?: Prisma.lgu_imageInclude<ExtArgs> | null;
    where?: Prisma.lgu_imageWhereInput;
    orderBy?: Prisma.lgu_imageOrderByWithRelationInput | Prisma.lgu_imageOrderByWithRelationInput[];
    cursor?: Prisma.lgu_imageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Lgu_imageScalarFieldEnum | Prisma.Lgu_imageScalarFieldEnum[];
};
export type lgu_imageCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.lgu_imageSelect<ExtArgs> | null;
    omit?: Prisma.lgu_imageOmit<ExtArgs> | null;
    include?: Prisma.lgu_imageInclude<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.lgu_imageCreateInput, Prisma.lgu_imageUncheckedCreateInput>;
};
export type lgu_imageCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.lgu_imageCreateManyInput | Prisma.lgu_imageCreateManyInput[];
    skipDuplicates?: boolean;
};
export type lgu_imageCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.lgu_imageSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.lgu_imageOmit<ExtArgs> | null;
    data: Prisma.lgu_imageCreateManyInput | Prisma.lgu_imageCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.lgu_imageIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type lgu_imageUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.lgu_imageSelect<ExtArgs> | null;
    omit?: Prisma.lgu_imageOmit<ExtArgs> | null;
    include?: Prisma.lgu_imageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.lgu_imageUpdateInput, Prisma.lgu_imageUncheckedUpdateInput>;
    where: Prisma.lgu_imageWhereUniqueInput;
};
export type lgu_imageUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.lgu_imageUpdateManyMutationInput, Prisma.lgu_imageUncheckedUpdateManyInput>;
    where?: Prisma.lgu_imageWhereInput;
    limit?: number;
};
export type lgu_imageUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.lgu_imageSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.lgu_imageOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.lgu_imageUpdateManyMutationInput, Prisma.lgu_imageUncheckedUpdateManyInput>;
    where?: Prisma.lgu_imageWhereInput;
    limit?: number;
    include?: Prisma.lgu_imageIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type lgu_imageUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.lgu_imageSelect<ExtArgs> | null;
    omit?: Prisma.lgu_imageOmit<ExtArgs> | null;
    include?: Prisma.lgu_imageInclude<ExtArgs> | null;
    where: Prisma.lgu_imageWhereUniqueInput;
    create: Prisma.XOR<Prisma.lgu_imageCreateInput, Prisma.lgu_imageUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.lgu_imageUpdateInput, Prisma.lgu_imageUncheckedUpdateInput>;
};
export type lgu_imageDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.lgu_imageSelect<ExtArgs> | null;
    omit?: Prisma.lgu_imageOmit<ExtArgs> | null;
    include?: Prisma.lgu_imageInclude<ExtArgs> | null;
    where: Prisma.lgu_imageWhereUniqueInput;
};
export type lgu_imageDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.lgu_imageWhereInput;
    limit?: number;
};
export type lgu_image$lgu_projectsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.lgu_projectsSelect<ExtArgs> | null;
    omit?: Prisma.lgu_projectsOmit<ExtArgs> | null;
    include?: Prisma.lgu_projectsInclude<ExtArgs> | null;
    where?: Prisma.lgu_projectsWhereInput;
};
export type lgu_imageDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.lgu_imageSelect<ExtArgs> | null;
    omit?: Prisma.lgu_imageOmit<ExtArgs> | null;
    include?: Prisma.lgu_imageInclude<ExtArgs> | null;
};
