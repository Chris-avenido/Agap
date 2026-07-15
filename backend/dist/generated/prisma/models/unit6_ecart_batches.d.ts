import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type unit6_ecart_batchesModel = runtime.Types.Result.DefaultSelection<Prisma.$unit6_ecart_batchesPayload>;
export type AggregateUnit6_ecart_batches = {
    _count: Unit6_ecart_batchesCountAggregateOutputType | null;
    _avg: Unit6_ecart_batchesAvgAggregateOutputType | null;
    _sum: Unit6_ecart_batchesSumAggregateOutputType | null;
    _min: Unit6_ecart_batchesMinAggregateOutputType | null;
    _max: Unit6_ecart_batchesMaxAggregateOutputType | null;
};
export type Unit6_ecart_batchesAvgAggregateOutputType = {
    id: number | null;
    year_received: number | null;
    ecart_laptops: number | null;
    ecart_tablets: number | null;
    ecart_tv: number | null;
};
export type Unit6_ecart_batchesSumAggregateOutputType = {
    id: number | null;
    year_received: number | null;
    ecart_laptops: number | null;
    ecart_tablets: number | null;
    ecart_tv: number | null;
};
export type Unit6_ecart_batchesMinAggregateOutputType = {
    id: number | null;
    iern: string | null;
    batches_name: string | null;
    year_received: number | null;
    sources_fund: string | null;
    ecart_laptops: number | null;
    ecart_tablets: number | null;
    ecart_tv: number | null;
    charging_condition: string | null;
    remarks: string | null;
    created_at: Date | null;
    school_yr: string | null;
};
export type Unit6_ecart_batchesMaxAggregateOutputType = {
    id: number | null;
    iern: string | null;
    batches_name: string | null;
    year_received: number | null;
    sources_fund: string | null;
    ecart_laptops: number | null;
    ecart_tablets: number | null;
    ecart_tv: number | null;
    charging_condition: string | null;
    remarks: string | null;
    created_at: Date | null;
    school_yr: string | null;
};
export type Unit6_ecart_batchesCountAggregateOutputType = {
    id: number;
    iern: number;
    batches_name: number;
    year_received: number;
    sources_fund: number;
    ecart_laptops: number;
    ecart_tablets: number;
    ecart_tv: number;
    charging_condition: number;
    remarks: number;
    created_at: number;
    school_yr: number;
    _all: number;
};
export type Unit6_ecart_batchesAvgAggregateInputType = {
    id?: true;
    year_received?: true;
    ecart_laptops?: true;
    ecart_tablets?: true;
    ecart_tv?: true;
};
export type Unit6_ecart_batchesSumAggregateInputType = {
    id?: true;
    year_received?: true;
    ecart_laptops?: true;
    ecart_tablets?: true;
    ecart_tv?: true;
};
export type Unit6_ecart_batchesMinAggregateInputType = {
    id?: true;
    iern?: true;
    batches_name?: true;
    year_received?: true;
    sources_fund?: true;
    ecart_laptops?: true;
    ecart_tablets?: true;
    ecart_tv?: true;
    charging_condition?: true;
    remarks?: true;
    created_at?: true;
    school_yr?: true;
};
export type Unit6_ecart_batchesMaxAggregateInputType = {
    id?: true;
    iern?: true;
    batches_name?: true;
    year_received?: true;
    sources_fund?: true;
    ecart_laptops?: true;
    ecart_tablets?: true;
    ecart_tv?: true;
    charging_condition?: true;
    remarks?: true;
    created_at?: true;
    school_yr?: true;
};
export type Unit6_ecart_batchesCountAggregateInputType = {
    id?: true;
    iern?: true;
    batches_name?: true;
    year_received?: true;
    sources_fund?: true;
    ecart_laptops?: true;
    ecart_tablets?: true;
    ecart_tv?: true;
    charging_condition?: true;
    remarks?: true;
    created_at?: true;
    school_yr?: true;
    _all?: true;
};
export type Unit6_ecart_batchesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.unit6_ecart_batchesWhereInput;
    orderBy?: Prisma.unit6_ecart_batchesOrderByWithRelationInput | Prisma.unit6_ecart_batchesOrderByWithRelationInput[];
    cursor?: Prisma.unit6_ecart_batchesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Unit6_ecart_batchesCountAggregateInputType;
    _avg?: Unit6_ecart_batchesAvgAggregateInputType;
    _sum?: Unit6_ecart_batchesSumAggregateInputType;
    _min?: Unit6_ecart_batchesMinAggregateInputType;
    _max?: Unit6_ecart_batchesMaxAggregateInputType;
};
export type GetUnit6_ecart_batchesAggregateType<T extends Unit6_ecart_batchesAggregateArgs> = {
    [P in keyof T & keyof AggregateUnit6_ecart_batches]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUnit6_ecart_batches[P]> : Prisma.GetScalarType<T[P], AggregateUnit6_ecart_batches[P]>;
};
export type unit6_ecart_batchesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.unit6_ecart_batchesWhereInput;
    orderBy?: Prisma.unit6_ecart_batchesOrderByWithAggregationInput | Prisma.unit6_ecart_batchesOrderByWithAggregationInput[];
    by: Prisma.Unit6_ecart_batchesScalarFieldEnum[] | Prisma.Unit6_ecart_batchesScalarFieldEnum;
    having?: Prisma.unit6_ecart_batchesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Unit6_ecart_batchesCountAggregateInputType | true;
    _avg?: Unit6_ecart_batchesAvgAggregateInputType;
    _sum?: Unit6_ecart_batchesSumAggregateInputType;
    _min?: Unit6_ecart_batchesMinAggregateInputType;
    _max?: Unit6_ecart_batchesMaxAggregateInputType;
};
export type Unit6_ecart_batchesGroupByOutputType = {
    id: number;
    iern: string | null;
    batches_name: string | null;
    year_received: number | null;
    sources_fund: string | null;
    ecart_laptops: number | null;
    ecart_tablets: number | null;
    ecart_tv: number | null;
    charging_condition: string | null;
    remarks: string | null;
    created_at: Date | null;
    school_yr: string | null;
    _count: Unit6_ecart_batchesCountAggregateOutputType | null;
    _avg: Unit6_ecart_batchesAvgAggregateOutputType | null;
    _sum: Unit6_ecart_batchesSumAggregateOutputType | null;
    _min: Unit6_ecart_batchesMinAggregateOutputType | null;
    _max: Unit6_ecart_batchesMaxAggregateOutputType | null;
};
export type GetUnit6_ecart_batchesGroupByPayload<T extends unit6_ecart_batchesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Unit6_ecart_batchesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Unit6_ecart_batchesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Unit6_ecart_batchesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Unit6_ecart_batchesGroupByOutputType[P]>;
}>>;
export type unit6_ecart_batchesWhereInput = {
    AND?: Prisma.unit6_ecart_batchesWhereInput | Prisma.unit6_ecart_batchesWhereInput[];
    OR?: Prisma.unit6_ecart_batchesWhereInput[];
    NOT?: Prisma.unit6_ecart_batchesWhereInput | Prisma.unit6_ecart_batchesWhereInput[];
    id?: Prisma.IntFilter<"unit6_ecart_batches"> | number;
    iern?: Prisma.StringNullableFilter<"unit6_ecart_batches"> | string | null;
    batches_name?: Prisma.StringNullableFilter<"unit6_ecart_batches"> | string | null;
    year_received?: Prisma.IntNullableFilter<"unit6_ecart_batches"> | number | null;
    sources_fund?: Prisma.StringNullableFilter<"unit6_ecart_batches"> | string | null;
    ecart_laptops?: Prisma.IntNullableFilter<"unit6_ecart_batches"> | number | null;
    ecart_tablets?: Prisma.IntNullableFilter<"unit6_ecart_batches"> | number | null;
    ecart_tv?: Prisma.IntNullableFilter<"unit6_ecart_batches"> | number | null;
    charging_condition?: Prisma.StringNullableFilter<"unit6_ecart_batches"> | string | null;
    remarks?: Prisma.StringNullableFilter<"unit6_ecart_batches"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"unit6_ecart_batches"> | Date | string | null;
    school_yr?: Prisma.StringNullableFilter<"unit6_ecart_batches"> | string | null;
};
export type unit6_ecart_batchesOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    iern?: Prisma.SortOrderInput | Prisma.SortOrder;
    batches_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    year_received?: Prisma.SortOrderInput | Prisma.SortOrder;
    sources_fund?: Prisma.SortOrderInput | Prisma.SortOrder;
    ecart_laptops?: Prisma.SortOrderInput | Prisma.SortOrder;
    ecart_tablets?: Prisma.SortOrderInput | Prisma.SortOrder;
    ecart_tv?: Prisma.SortOrderInput | Prisma.SortOrder;
    charging_condition?: Prisma.SortOrderInput | Prisma.SortOrder;
    remarks?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_yr?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type unit6_ecart_batchesWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.unit6_ecart_batchesWhereInput | Prisma.unit6_ecart_batchesWhereInput[];
    OR?: Prisma.unit6_ecart_batchesWhereInput[];
    NOT?: Prisma.unit6_ecart_batchesWhereInput | Prisma.unit6_ecart_batchesWhereInput[];
    iern?: Prisma.StringNullableFilter<"unit6_ecart_batches"> | string | null;
    batches_name?: Prisma.StringNullableFilter<"unit6_ecart_batches"> | string | null;
    year_received?: Prisma.IntNullableFilter<"unit6_ecart_batches"> | number | null;
    sources_fund?: Prisma.StringNullableFilter<"unit6_ecart_batches"> | string | null;
    ecart_laptops?: Prisma.IntNullableFilter<"unit6_ecart_batches"> | number | null;
    ecart_tablets?: Prisma.IntNullableFilter<"unit6_ecart_batches"> | number | null;
    ecart_tv?: Prisma.IntNullableFilter<"unit6_ecart_batches"> | number | null;
    charging_condition?: Prisma.StringNullableFilter<"unit6_ecart_batches"> | string | null;
    remarks?: Prisma.StringNullableFilter<"unit6_ecart_batches"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"unit6_ecart_batches"> | Date | string | null;
    school_yr?: Prisma.StringNullableFilter<"unit6_ecart_batches"> | string | null;
}, "id">;
export type unit6_ecart_batchesOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    iern?: Prisma.SortOrderInput | Prisma.SortOrder;
    batches_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    year_received?: Prisma.SortOrderInput | Prisma.SortOrder;
    sources_fund?: Prisma.SortOrderInput | Prisma.SortOrder;
    ecart_laptops?: Prisma.SortOrderInput | Prisma.SortOrder;
    ecart_tablets?: Prisma.SortOrderInput | Prisma.SortOrder;
    ecart_tv?: Prisma.SortOrderInput | Prisma.SortOrder;
    charging_condition?: Prisma.SortOrderInput | Prisma.SortOrder;
    remarks?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_yr?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.unit6_ecart_batchesCountOrderByAggregateInput;
    _avg?: Prisma.unit6_ecart_batchesAvgOrderByAggregateInput;
    _max?: Prisma.unit6_ecart_batchesMaxOrderByAggregateInput;
    _min?: Prisma.unit6_ecart_batchesMinOrderByAggregateInput;
    _sum?: Prisma.unit6_ecart_batchesSumOrderByAggregateInput;
};
export type unit6_ecart_batchesScalarWhereWithAggregatesInput = {
    AND?: Prisma.unit6_ecart_batchesScalarWhereWithAggregatesInput | Prisma.unit6_ecart_batchesScalarWhereWithAggregatesInput[];
    OR?: Prisma.unit6_ecart_batchesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.unit6_ecart_batchesScalarWhereWithAggregatesInput | Prisma.unit6_ecart_batchesScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"unit6_ecart_batches"> | number;
    iern?: Prisma.StringNullableWithAggregatesFilter<"unit6_ecart_batches"> | string | null;
    batches_name?: Prisma.StringNullableWithAggregatesFilter<"unit6_ecart_batches"> | string | null;
    year_received?: Prisma.IntNullableWithAggregatesFilter<"unit6_ecart_batches"> | number | null;
    sources_fund?: Prisma.StringNullableWithAggregatesFilter<"unit6_ecart_batches"> | string | null;
    ecart_laptops?: Prisma.IntNullableWithAggregatesFilter<"unit6_ecart_batches"> | number | null;
    ecart_tablets?: Prisma.IntNullableWithAggregatesFilter<"unit6_ecart_batches"> | number | null;
    ecart_tv?: Prisma.IntNullableWithAggregatesFilter<"unit6_ecart_batches"> | number | null;
    charging_condition?: Prisma.StringNullableWithAggregatesFilter<"unit6_ecart_batches"> | string | null;
    remarks?: Prisma.StringNullableWithAggregatesFilter<"unit6_ecart_batches"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"unit6_ecart_batches"> | Date | string | null;
    school_yr?: Prisma.StringNullableWithAggregatesFilter<"unit6_ecart_batches"> | string | null;
};
export type unit6_ecart_batchesCreateInput = {
    iern?: string | null;
    batches_name?: string | null;
    year_received?: number | null;
    sources_fund?: string | null;
    ecart_laptops?: number | null;
    ecart_tablets?: number | null;
    ecart_tv?: number | null;
    charging_condition?: string | null;
    remarks?: string | null;
    created_at?: Date | string | null;
    school_yr?: string | null;
};
export type unit6_ecart_batchesUncheckedCreateInput = {
    id?: number;
    iern?: string | null;
    batches_name?: string | null;
    year_received?: number | null;
    sources_fund?: string | null;
    ecart_laptops?: number | null;
    ecart_tablets?: number | null;
    ecart_tv?: number | null;
    charging_condition?: string | null;
    remarks?: string | null;
    created_at?: Date | string | null;
    school_yr?: string | null;
};
export type unit6_ecart_batchesUpdateInput = {
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batches_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    year_received?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    sources_fund?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ecart_laptops?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    ecart_tablets?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    ecart_tv?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    charging_condition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    school_yr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type unit6_ecart_batchesUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batches_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    year_received?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    sources_fund?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ecart_laptops?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    ecart_tablets?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    ecart_tv?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    charging_condition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    school_yr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type unit6_ecart_batchesCreateManyInput = {
    id?: number;
    iern?: string | null;
    batches_name?: string | null;
    year_received?: number | null;
    sources_fund?: string | null;
    ecart_laptops?: number | null;
    ecart_tablets?: number | null;
    ecart_tv?: number | null;
    charging_condition?: string | null;
    remarks?: string | null;
    created_at?: Date | string | null;
    school_yr?: string | null;
};
export type unit6_ecart_batchesUpdateManyMutationInput = {
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batches_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    year_received?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    sources_fund?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ecart_laptops?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    ecart_tablets?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    ecart_tv?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    charging_condition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    school_yr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type unit6_ecart_batchesUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batches_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    year_received?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    sources_fund?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ecart_laptops?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    ecart_tablets?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    ecart_tv?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    charging_condition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    school_yr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type unit6_ecart_batchesCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    batches_name?: Prisma.SortOrder;
    year_received?: Prisma.SortOrder;
    sources_fund?: Prisma.SortOrder;
    ecart_laptops?: Prisma.SortOrder;
    ecart_tablets?: Prisma.SortOrder;
    ecart_tv?: Prisma.SortOrder;
    charging_condition?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    school_yr?: Prisma.SortOrder;
};
export type unit6_ecart_batchesAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    year_received?: Prisma.SortOrder;
    ecart_laptops?: Prisma.SortOrder;
    ecart_tablets?: Prisma.SortOrder;
    ecart_tv?: Prisma.SortOrder;
};
export type unit6_ecart_batchesMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    batches_name?: Prisma.SortOrder;
    year_received?: Prisma.SortOrder;
    sources_fund?: Prisma.SortOrder;
    ecart_laptops?: Prisma.SortOrder;
    ecart_tablets?: Prisma.SortOrder;
    ecart_tv?: Prisma.SortOrder;
    charging_condition?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    school_yr?: Prisma.SortOrder;
};
export type unit6_ecart_batchesMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    batches_name?: Prisma.SortOrder;
    year_received?: Prisma.SortOrder;
    sources_fund?: Prisma.SortOrder;
    ecart_laptops?: Prisma.SortOrder;
    ecart_tablets?: Prisma.SortOrder;
    ecart_tv?: Prisma.SortOrder;
    charging_condition?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    school_yr?: Prisma.SortOrder;
};
export type unit6_ecart_batchesSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    year_received?: Prisma.SortOrder;
    ecart_laptops?: Prisma.SortOrder;
    ecart_tablets?: Prisma.SortOrder;
    ecart_tv?: Prisma.SortOrder;
};
export type unit6_ecart_batchesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    iern?: boolean;
    batches_name?: boolean;
    year_received?: boolean;
    sources_fund?: boolean;
    ecart_laptops?: boolean;
    ecart_tablets?: boolean;
    ecart_tv?: boolean;
    charging_condition?: boolean;
    remarks?: boolean;
    created_at?: boolean;
    school_yr?: boolean;
}, ExtArgs["result"]["unit6_ecart_batches"]>;
export type unit6_ecart_batchesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    iern?: boolean;
    batches_name?: boolean;
    year_received?: boolean;
    sources_fund?: boolean;
    ecart_laptops?: boolean;
    ecart_tablets?: boolean;
    ecart_tv?: boolean;
    charging_condition?: boolean;
    remarks?: boolean;
    created_at?: boolean;
    school_yr?: boolean;
}, ExtArgs["result"]["unit6_ecart_batches"]>;
export type unit6_ecart_batchesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    iern?: boolean;
    batches_name?: boolean;
    year_received?: boolean;
    sources_fund?: boolean;
    ecart_laptops?: boolean;
    ecart_tablets?: boolean;
    ecart_tv?: boolean;
    charging_condition?: boolean;
    remarks?: boolean;
    created_at?: boolean;
    school_yr?: boolean;
}, ExtArgs["result"]["unit6_ecart_batches"]>;
export type unit6_ecart_batchesSelectScalar = {
    id?: boolean;
    iern?: boolean;
    batches_name?: boolean;
    year_received?: boolean;
    sources_fund?: boolean;
    ecart_laptops?: boolean;
    ecart_tablets?: boolean;
    ecart_tv?: boolean;
    charging_condition?: boolean;
    remarks?: boolean;
    created_at?: boolean;
    school_yr?: boolean;
};
export type unit6_ecart_batchesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "iern" | "batches_name" | "year_received" | "sources_fund" | "ecart_laptops" | "ecart_tablets" | "ecart_tv" | "charging_condition" | "remarks" | "created_at" | "school_yr", ExtArgs["result"]["unit6_ecart_batches"]>;
export type $unit6_ecart_batchesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "unit6_ecart_batches";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        iern: string | null;
        batches_name: string | null;
        year_received: number | null;
        sources_fund: string | null;
        ecart_laptops: number | null;
        ecart_tablets: number | null;
        ecart_tv: number | null;
        charging_condition: string | null;
        remarks: string | null;
        created_at: Date | null;
        school_yr: string | null;
    }, ExtArgs["result"]["unit6_ecart_batches"]>;
    composites: {};
};
export type unit6_ecart_batchesGetPayload<S extends boolean | null | undefined | unit6_ecart_batchesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$unit6_ecart_batchesPayload, S>;
export type unit6_ecart_batchesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<unit6_ecart_batchesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Unit6_ecart_batchesCountAggregateInputType | true;
};
export interface unit6_ecart_batchesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['unit6_ecart_batches'];
        meta: {
            name: 'unit6_ecart_batches';
        };
    };
    findUnique<T extends unit6_ecart_batchesFindUniqueArgs>(args: Prisma.SelectSubset<T, unit6_ecart_batchesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__unit6_ecart_batchesClient<runtime.Types.Result.GetResult<Prisma.$unit6_ecart_batchesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends unit6_ecart_batchesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, unit6_ecart_batchesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__unit6_ecart_batchesClient<runtime.Types.Result.GetResult<Prisma.$unit6_ecart_batchesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends unit6_ecart_batchesFindFirstArgs>(args?: Prisma.SelectSubset<T, unit6_ecart_batchesFindFirstArgs<ExtArgs>>): Prisma.Prisma__unit6_ecart_batchesClient<runtime.Types.Result.GetResult<Prisma.$unit6_ecart_batchesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends unit6_ecart_batchesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, unit6_ecart_batchesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__unit6_ecart_batchesClient<runtime.Types.Result.GetResult<Prisma.$unit6_ecart_batchesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends unit6_ecart_batchesFindManyArgs>(args?: Prisma.SelectSubset<T, unit6_ecart_batchesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$unit6_ecart_batchesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends unit6_ecart_batchesCreateArgs>(args: Prisma.SelectSubset<T, unit6_ecart_batchesCreateArgs<ExtArgs>>): Prisma.Prisma__unit6_ecart_batchesClient<runtime.Types.Result.GetResult<Prisma.$unit6_ecart_batchesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends unit6_ecart_batchesCreateManyArgs>(args?: Prisma.SelectSubset<T, unit6_ecart_batchesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends unit6_ecart_batchesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, unit6_ecart_batchesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$unit6_ecart_batchesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends unit6_ecart_batchesDeleteArgs>(args: Prisma.SelectSubset<T, unit6_ecart_batchesDeleteArgs<ExtArgs>>): Prisma.Prisma__unit6_ecart_batchesClient<runtime.Types.Result.GetResult<Prisma.$unit6_ecart_batchesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends unit6_ecart_batchesUpdateArgs>(args: Prisma.SelectSubset<T, unit6_ecart_batchesUpdateArgs<ExtArgs>>): Prisma.Prisma__unit6_ecart_batchesClient<runtime.Types.Result.GetResult<Prisma.$unit6_ecart_batchesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends unit6_ecart_batchesDeleteManyArgs>(args?: Prisma.SelectSubset<T, unit6_ecart_batchesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends unit6_ecart_batchesUpdateManyArgs>(args: Prisma.SelectSubset<T, unit6_ecart_batchesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends unit6_ecart_batchesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, unit6_ecart_batchesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$unit6_ecart_batchesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends unit6_ecart_batchesUpsertArgs>(args: Prisma.SelectSubset<T, unit6_ecart_batchesUpsertArgs<ExtArgs>>): Prisma.Prisma__unit6_ecart_batchesClient<runtime.Types.Result.GetResult<Prisma.$unit6_ecart_batchesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends unit6_ecart_batchesCountArgs>(args?: Prisma.Subset<T, unit6_ecart_batchesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Unit6_ecart_batchesCountAggregateOutputType> : number>;
    aggregate<T extends Unit6_ecart_batchesAggregateArgs>(args: Prisma.Subset<T, Unit6_ecart_batchesAggregateArgs>): Prisma.PrismaPromise<GetUnit6_ecart_batchesAggregateType<T>>;
    groupBy<T extends unit6_ecart_batchesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: unit6_ecart_batchesGroupByArgs['orderBy'];
    } : {
        orderBy?: unit6_ecart_batchesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, unit6_ecart_batchesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUnit6_ecart_batchesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: unit6_ecart_batchesFieldRefs;
}
export interface Prisma__unit6_ecart_batchesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface unit6_ecart_batchesFieldRefs {
    readonly id: Prisma.FieldRef<"unit6_ecart_batches", 'Int'>;
    readonly iern: Prisma.FieldRef<"unit6_ecart_batches", 'String'>;
    readonly batches_name: Prisma.FieldRef<"unit6_ecart_batches", 'String'>;
    readonly year_received: Prisma.FieldRef<"unit6_ecart_batches", 'Int'>;
    readonly sources_fund: Prisma.FieldRef<"unit6_ecart_batches", 'String'>;
    readonly ecart_laptops: Prisma.FieldRef<"unit6_ecart_batches", 'Int'>;
    readonly ecart_tablets: Prisma.FieldRef<"unit6_ecart_batches", 'Int'>;
    readonly ecart_tv: Prisma.FieldRef<"unit6_ecart_batches", 'Int'>;
    readonly charging_condition: Prisma.FieldRef<"unit6_ecart_batches", 'String'>;
    readonly remarks: Prisma.FieldRef<"unit6_ecart_batches", 'String'>;
    readonly created_at: Prisma.FieldRef<"unit6_ecart_batches", 'DateTime'>;
    readonly school_yr: Prisma.FieldRef<"unit6_ecart_batches", 'String'>;
}
export type unit6_ecart_batchesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit6_ecart_batchesSelect<ExtArgs> | null;
    omit?: Prisma.unit6_ecart_batchesOmit<ExtArgs> | null;
    where: Prisma.unit6_ecart_batchesWhereUniqueInput;
};
export type unit6_ecart_batchesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit6_ecart_batchesSelect<ExtArgs> | null;
    omit?: Prisma.unit6_ecart_batchesOmit<ExtArgs> | null;
    where: Prisma.unit6_ecart_batchesWhereUniqueInput;
};
export type unit6_ecart_batchesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit6_ecart_batchesSelect<ExtArgs> | null;
    omit?: Prisma.unit6_ecart_batchesOmit<ExtArgs> | null;
    where?: Prisma.unit6_ecart_batchesWhereInput;
    orderBy?: Prisma.unit6_ecart_batchesOrderByWithRelationInput | Prisma.unit6_ecart_batchesOrderByWithRelationInput[];
    cursor?: Prisma.unit6_ecart_batchesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Unit6_ecart_batchesScalarFieldEnum | Prisma.Unit6_ecart_batchesScalarFieldEnum[];
};
export type unit6_ecart_batchesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit6_ecart_batchesSelect<ExtArgs> | null;
    omit?: Prisma.unit6_ecart_batchesOmit<ExtArgs> | null;
    where?: Prisma.unit6_ecart_batchesWhereInput;
    orderBy?: Prisma.unit6_ecart_batchesOrderByWithRelationInput | Prisma.unit6_ecart_batchesOrderByWithRelationInput[];
    cursor?: Prisma.unit6_ecart_batchesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Unit6_ecart_batchesScalarFieldEnum | Prisma.Unit6_ecart_batchesScalarFieldEnum[];
};
export type unit6_ecart_batchesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit6_ecart_batchesSelect<ExtArgs> | null;
    omit?: Prisma.unit6_ecart_batchesOmit<ExtArgs> | null;
    where?: Prisma.unit6_ecart_batchesWhereInput;
    orderBy?: Prisma.unit6_ecart_batchesOrderByWithRelationInput | Prisma.unit6_ecart_batchesOrderByWithRelationInput[];
    cursor?: Prisma.unit6_ecart_batchesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Unit6_ecart_batchesScalarFieldEnum | Prisma.Unit6_ecart_batchesScalarFieldEnum[];
};
export type unit6_ecart_batchesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit6_ecart_batchesSelect<ExtArgs> | null;
    omit?: Prisma.unit6_ecart_batchesOmit<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.unit6_ecart_batchesCreateInput, Prisma.unit6_ecart_batchesUncheckedCreateInput>;
};
export type unit6_ecart_batchesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.unit6_ecart_batchesCreateManyInput | Prisma.unit6_ecart_batchesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type unit6_ecart_batchesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit6_ecart_batchesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.unit6_ecart_batchesOmit<ExtArgs> | null;
    data: Prisma.unit6_ecart_batchesCreateManyInput | Prisma.unit6_ecart_batchesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type unit6_ecart_batchesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit6_ecart_batchesSelect<ExtArgs> | null;
    omit?: Prisma.unit6_ecart_batchesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.unit6_ecart_batchesUpdateInput, Prisma.unit6_ecart_batchesUncheckedUpdateInput>;
    where: Prisma.unit6_ecart_batchesWhereUniqueInput;
};
export type unit6_ecart_batchesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.unit6_ecart_batchesUpdateManyMutationInput, Prisma.unit6_ecart_batchesUncheckedUpdateManyInput>;
    where?: Prisma.unit6_ecart_batchesWhereInput;
    limit?: number;
};
export type unit6_ecart_batchesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit6_ecart_batchesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.unit6_ecart_batchesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.unit6_ecart_batchesUpdateManyMutationInput, Prisma.unit6_ecart_batchesUncheckedUpdateManyInput>;
    where?: Prisma.unit6_ecart_batchesWhereInput;
    limit?: number;
};
export type unit6_ecart_batchesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit6_ecart_batchesSelect<ExtArgs> | null;
    omit?: Prisma.unit6_ecart_batchesOmit<ExtArgs> | null;
    where: Prisma.unit6_ecart_batchesWhereUniqueInput;
    create: Prisma.XOR<Prisma.unit6_ecart_batchesCreateInput, Prisma.unit6_ecart_batchesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.unit6_ecart_batchesUpdateInput, Prisma.unit6_ecart_batchesUncheckedUpdateInput>;
};
export type unit6_ecart_batchesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit6_ecart_batchesSelect<ExtArgs> | null;
    omit?: Prisma.unit6_ecart_batchesOmit<ExtArgs> | null;
    where: Prisma.unit6_ecart_batchesWhereUniqueInput;
};
export type unit6_ecart_batchesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.unit6_ecart_batchesWhereInput;
    limit?: number;
};
export type unit6_ecart_batchesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit6_ecart_batchesSelect<ExtArgs> | null;
    omit?: Prisma.unit6_ecart_batchesOmit<ExtArgs> | null;
};
