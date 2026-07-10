import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ph_ecart_batchesModel = runtime.Types.Result.DefaultSelection<Prisma.$ph_ecart_batchesPayload>;
export type AggregatePh_ecart_batches = {
    _count: Ph_ecart_batchesCountAggregateOutputType | null;
    _avg: Ph_ecart_batchesAvgAggregateOutputType | null;
    _sum: Ph_ecart_batchesSumAggregateOutputType | null;
    _min: Ph_ecart_batchesMinAggregateOutputType | null;
    _max: Ph_ecart_batchesMaxAggregateOutputType | null;
};
export type Ph_ecart_batchesAvgAggregateOutputType = {
    id: number | null;
    year_received: number | null;
    ecart_laptops: number | null;
    ecart_tablets: number | null;
    ecart_tv: number | null;
};
export type Ph_ecart_batchesSumAggregateOutputType = {
    id: number | null;
    year_received: number | null;
    ecart_laptops: number | null;
    ecart_tablets: number | null;
    ecart_tv: number | null;
};
export type Ph_ecart_batchesMinAggregateOutputType = {
    id: number | null;
    school_id: string | null;
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
};
export type Ph_ecart_batchesMaxAggregateOutputType = {
    id: number | null;
    school_id: string | null;
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
};
export type Ph_ecart_batchesCountAggregateOutputType = {
    id: number;
    school_id: number;
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
    _all: number;
};
export type Ph_ecart_batchesAvgAggregateInputType = {
    id?: true;
    year_received?: true;
    ecart_laptops?: true;
    ecart_tablets?: true;
    ecart_tv?: true;
};
export type Ph_ecart_batchesSumAggregateInputType = {
    id?: true;
    year_received?: true;
    ecart_laptops?: true;
    ecart_tablets?: true;
    ecart_tv?: true;
};
export type Ph_ecart_batchesMinAggregateInputType = {
    id?: true;
    school_id?: true;
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
};
export type Ph_ecart_batchesMaxAggregateInputType = {
    id?: true;
    school_id?: true;
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
};
export type Ph_ecart_batchesCountAggregateInputType = {
    id?: true;
    school_id?: true;
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
    _all?: true;
};
export type Ph_ecart_batchesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ph_ecart_batchesWhereInput;
    orderBy?: Prisma.ph_ecart_batchesOrderByWithRelationInput | Prisma.ph_ecart_batchesOrderByWithRelationInput[];
    cursor?: Prisma.ph_ecart_batchesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Ph_ecart_batchesCountAggregateInputType;
    _avg?: Ph_ecart_batchesAvgAggregateInputType;
    _sum?: Ph_ecart_batchesSumAggregateInputType;
    _min?: Ph_ecart_batchesMinAggregateInputType;
    _max?: Ph_ecart_batchesMaxAggregateInputType;
};
export type GetPh_ecart_batchesAggregateType<T extends Ph_ecart_batchesAggregateArgs> = {
    [P in keyof T & keyof AggregatePh_ecart_batches]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePh_ecart_batches[P]> : Prisma.GetScalarType<T[P], AggregatePh_ecart_batches[P]>;
};
export type ph_ecart_batchesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ph_ecart_batchesWhereInput;
    orderBy?: Prisma.ph_ecart_batchesOrderByWithAggregationInput | Prisma.ph_ecart_batchesOrderByWithAggregationInput[];
    by: Prisma.Ph_ecart_batchesScalarFieldEnum[] | Prisma.Ph_ecart_batchesScalarFieldEnum;
    having?: Prisma.ph_ecart_batchesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Ph_ecart_batchesCountAggregateInputType | true;
    _avg?: Ph_ecart_batchesAvgAggregateInputType;
    _sum?: Ph_ecart_batchesSumAggregateInputType;
    _min?: Ph_ecart_batchesMinAggregateInputType;
    _max?: Ph_ecart_batchesMaxAggregateInputType;
};
export type Ph_ecart_batchesGroupByOutputType = {
    id: number;
    school_id: string | null;
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
    _count: Ph_ecart_batchesCountAggregateOutputType | null;
    _avg: Ph_ecart_batchesAvgAggregateOutputType | null;
    _sum: Ph_ecart_batchesSumAggregateOutputType | null;
    _min: Ph_ecart_batchesMinAggregateOutputType | null;
    _max: Ph_ecart_batchesMaxAggregateOutputType | null;
};
export type GetPh_ecart_batchesGroupByPayload<T extends ph_ecart_batchesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Ph_ecart_batchesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Ph_ecart_batchesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Ph_ecart_batchesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Ph_ecart_batchesGroupByOutputType[P]>;
}>>;
export type ph_ecart_batchesWhereInput = {
    AND?: Prisma.ph_ecart_batchesWhereInput | Prisma.ph_ecart_batchesWhereInput[];
    OR?: Prisma.ph_ecart_batchesWhereInput[];
    NOT?: Prisma.ph_ecart_batchesWhereInput | Prisma.ph_ecart_batchesWhereInput[];
    id?: Prisma.IntFilter<"ph_ecart_batches"> | number;
    school_id?: Prisma.StringNullableFilter<"ph_ecart_batches"> | string | null;
    iern?: Prisma.StringNullableFilter<"ph_ecart_batches"> | string | null;
    batches_name?: Prisma.StringNullableFilter<"ph_ecart_batches"> | string | null;
    year_received?: Prisma.IntNullableFilter<"ph_ecart_batches"> | number | null;
    sources_fund?: Prisma.StringNullableFilter<"ph_ecart_batches"> | string | null;
    ecart_laptops?: Prisma.IntNullableFilter<"ph_ecart_batches"> | number | null;
    ecart_tablets?: Prisma.IntNullableFilter<"ph_ecart_batches"> | number | null;
    ecart_tv?: Prisma.IntNullableFilter<"ph_ecart_batches"> | number | null;
    charging_condition?: Prisma.StringNullableFilter<"ph_ecart_batches"> | string | null;
    remarks?: Prisma.StringNullableFilter<"ph_ecart_batches"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"ph_ecart_batches"> | Date | string | null;
};
export type ph_ecart_batchesOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
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
};
export type ph_ecart_batchesWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.ph_ecart_batchesWhereInput | Prisma.ph_ecart_batchesWhereInput[];
    OR?: Prisma.ph_ecart_batchesWhereInput[];
    NOT?: Prisma.ph_ecart_batchesWhereInput | Prisma.ph_ecart_batchesWhereInput[];
    school_id?: Prisma.StringNullableFilter<"ph_ecart_batches"> | string | null;
    iern?: Prisma.StringNullableFilter<"ph_ecart_batches"> | string | null;
    batches_name?: Prisma.StringNullableFilter<"ph_ecart_batches"> | string | null;
    year_received?: Prisma.IntNullableFilter<"ph_ecart_batches"> | number | null;
    sources_fund?: Prisma.StringNullableFilter<"ph_ecart_batches"> | string | null;
    ecart_laptops?: Prisma.IntNullableFilter<"ph_ecart_batches"> | number | null;
    ecart_tablets?: Prisma.IntNullableFilter<"ph_ecart_batches"> | number | null;
    ecart_tv?: Prisma.IntNullableFilter<"ph_ecart_batches"> | number | null;
    charging_condition?: Prisma.StringNullableFilter<"ph_ecart_batches"> | string | null;
    remarks?: Prisma.StringNullableFilter<"ph_ecart_batches"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"ph_ecart_batches"> | Date | string | null;
}, "id">;
export type ph_ecart_batchesOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
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
    _count?: Prisma.ph_ecart_batchesCountOrderByAggregateInput;
    _avg?: Prisma.ph_ecart_batchesAvgOrderByAggregateInput;
    _max?: Prisma.ph_ecart_batchesMaxOrderByAggregateInput;
    _min?: Prisma.ph_ecart_batchesMinOrderByAggregateInput;
    _sum?: Prisma.ph_ecart_batchesSumOrderByAggregateInput;
};
export type ph_ecart_batchesScalarWhereWithAggregatesInput = {
    AND?: Prisma.ph_ecart_batchesScalarWhereWithAggregatesInput | Prisma.ph_ecart_batchesScalarWhereWithAggregatesInput[];
    OR?: Prisma.ph_ecart_batchesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ph_ecart_batchesScalarWhereWithAggregatesInput | Prisma.ph_ecart_batchesScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"ph_ecart_batches"> | number;
    school_id?: Prisma.StringNullableWithAggregatesFilter<"ph_ecart_batches"> | string | null;
    iern?: Prisma.StringNullableWithAggregatesFilter<"ph_ecart_batches"> | string | null;
    batches_name?: Prisma.StringNullableWithAggregatesFilter<"ph_ecart_batches"> | string | null;
    year_received?: Prisma.IntNullableWithAggregatesFilter<"ph_ecart_batches"> | number | null;
    sources_fund?: Prisma.StringNullableWithAggregatesFilter<"ph_ecart_batches"> | string | null;
    ecart_laptops?: Prisma.IntNullableWithAggregatesFilter<"ph_ecart_batches"> | number | null;
    ecart_tablets?: Prisma.IntNullableWithAggregatesFilter<"ph_ecart_batches"> | number | null;
    ecart_tv?: Prisma.IntNullableWithAggregatesFilter<"ph_ecart_batches"> | number | null;
    charging_condition?: Prisma.StringNullableWithAggregatesFilter<"ph_ecart_batches"> | string | null;
    remarks?: Prisma.StringNullableWithAggregatesFilter<"ph_ecart_batches"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"ph_ecart_batches"> | Date | string | null;
};
export type ph_ecart_batchesCreateInput = {
    id: number;
    school_id?: string | null;
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
};
export type ph_ecart_batchesUncheckedCreateInput = {
    id: number;
    school_id?: string | null;
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
};
export type ph_ecart_batchesUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
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
};
export type ph_ecart_batchesUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
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
};
export type ph_ecart_batchesCreateManyInput = {
    id: number;
    school_id?: string | null;
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
};
export type ph_ecart_batchesUpdateManyMutationInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
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
};
export type ph_ecart_batchesUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
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
};
export type ph_ecart_batchesCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
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
};
export type ph_ecart_batchesAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    year_received?: Prisma.SortOrder;
    ecart_laptops?: Prisma.SortOrder;
    ecart_tablets?: Prisma.SortOrder;
    ecart_tv?: Prisma.SortOrder;
};
export type ph_ecart_batchesMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
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
};
export type ph_ecart_batchesMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
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
};
export type ph_ecart_batchesSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    year_received?: Prisma.SortOrder;
    ecart_laptops?: Prisma.SortOrder;
    ecart_tablets?: Prisma.SortOrder;
    ecart_tv?: Prisma.SortOrder;
};
export type ph_ecart_batchesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
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
}, ExtArgs["result"]["ph_ecart_batches"]>;
export type ph_ecart_batchesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
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
}, ExtArgs["result"]["ph_ecart_batches"]>;
export type ph_ecart_batchesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
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
}, ExtArgs["result"]["ph_ecart_batches"]>;
export type ph_ecart_batchesSelectScalar = {
    id?: boolean;
    school_id?: boolean;
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
};
export type ph_ecart_batchesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "school_id" | "iern" | "batches_name" | "year_received" | "sources_fund" | "ecart_laptops" | "ecart_tablets" | "ecart_tv" | "charging_condition" | "remarks" | "created_at", ExtArgs["result"]["ph_ecart_batches"]>;
export type $ph_ecart_batchesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ph_ecart_batches";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        school_id: string | null;
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
    }, ExtArgs["result"]["ph_ecart_batches"]>;
    composites: {};
};
export type ph_ecart_batchesGetPayload<S extends boolean | null | undefined | ph_ecart_batchesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ph_ecart_batchesPayload, S>;
export type ph_ecart_batchesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ph_ecart_batchesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Ph_ecart_batchesCountAggregateInputType | true;
};
export interface ph_ecart_batchesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ph_ecart_batches'];
        meta: {
            name: 'ph_ecart_batches';
        };
    };
    findUnique<T extends ph_ecart_batchesFindUniqueArgs>(args: Prisma.SelectSubset<T, ph_ecart_batchesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ph_ecart_batchesClient<runtime.Types.Result.GetResult<Prisma.$ph_ecart_batchesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ph_ecart_batchesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ph_ecart_batchesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ph_ecart_batchesClient<runtime.Types.Result.GetResult<Prisma.$ph_ecart_batchesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ph_ecart_batchesFindFirstArgs>(args?: Prisma.SelectSubset<T, ph_ecart_batchesFindFirstArgs<ExtArgs>>): Prisma.Prisma__ph_ecart_batchesClient<runtime.Types.Result.GetResult<Prisma.$ph_ecart_batchesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ph_ecart_batchesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ph_ecart_batchesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ph_ecart_batchesClient<runtime.Types.Result.GetResult<Prisma.$ph_ecart_batchesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ph_ecart_batchesFindManyArgs>(args?: Prisma.SelectSubset<T, ph_ecart_batchesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ph_ecart_batchesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ph_ecart_batchesCreateArgs>(args: Prisma.SelectSubset<T, ph_ecart_batchesCreateArgs<ExtArgs>>): Prisma.Prisma__ph_ecart_batchesClient<runtime.Types.Result.GetResult<Prisma.$ph_ecart_batchesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ph_ecart_batchesCreateManyArgs>(args?: Prisma.SelectSubset<T, ph_ecart_batchesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ph_ecart_batchesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ph_ecart_batchesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ph_ecart_batchesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ph_ecart_batchesDeleteArgs>(args: Prisma.SelectSubset<T, ph_ecart_batchesDeleteArgs<ExtArgs>>): Prisma.Prisma__ph_ecart_batchesClient<runtime.Types.Result.GetResult<Prisma.$ph_ecart_batchesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ph_ecart_batchesUpdateArgs>(args: Prisma.SelectSubset<T, ph_ecart_batchesUpdateArgs<ExtArgs>>): Prisma.Prisma__ph_ecart_batchesClient<runtime.Types.Result.GetResult<Prisma.$ph_ecart_batchesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ph_ecart_batchesDeleteManyArgs>(args?: Prisma.SelectSubset<T, ph_ecart_batchesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ph_ecart_batchesUpdateManyArgs>(args: Prisma.SelectSubset<T, ph_ecart_batchesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ph_ecart_batchesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ph_ecart_batchesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ph_ecart_batchesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ph_ecart_batchesUpsertArgs>(args: Prisma.SelectSubset<T, ph_ecart_batchesUpsertArgs<ExtArgs>>): Prisma.Prisma__ph_ecart_batchesClient<runtime.Types.Result.GetResult<Prisma.$ph_ecart_batchesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ph_ecart_batchesCountArgs>(args?: Prisma.Subset<T, ph_ecart_batchesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Ph_ecart_batchesCountAggregateOutputType> : number>;
    aggregate<T extends Ph_ecart_batchesAggregateArgs>(args: Prisma.Subset<T, Ph_ecart_batchesAggregateArgs>): Prisma.PrismaPromise<GetPh_ecart_batchesAggregateType<T>>;
    groupBy<T extends ph_ecart_batchesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ph_ecart_batchesGroupByArgs['orderBy'];
    } : {
        orderBy?: ph_ecart_batchesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ph_ecart_batchesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPh_ecart_batchesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ph_ecart_batchesFieldRefs;
}
export interface Prisma__ph_ecart_batchesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ph_ecart_batchesFieldRefs {
    readonly id: Prisma.FieldRef<"ph_ecart_batches", 'Int'>;
    readonly school_id: Prisma.FieldRef<"ph_ecart_batches", 'String'>;
    readonly iern: Prisma.FieldRef<"ph_ecart_batches", 'String'>;
    readonly batches_name: Prisma.FieldRef<"ph_ecart_batches", 'String'>;
    readonly year_received: Prisma.FieldRef<"ph_ecart_batches", 'Int'>;
    readonly sources_fund: Prisma.FieldRef<"ph_ecart_batches", 'String'>;
    readonly ecart_laptops: Prisma.FieldRef<"ph_ecart_batches", 'Int'>;
    readonly ecart_tablets: Prisma.FieldRef<"ph_ecart_batches", 'Int'>;
    readonly ecart_tv: Prisma.FieldRef<"ph_ecart_batches", 'Int'>;
    readonly charging_condition: Prisma.FieldRef<"ph_ecart_batches", 'String'>;
    readonly remarks: Prisma.FieldRef<"ph_ecart_batches", 'String'>;
    readonly created_at: Prisma.FieldRef<"ph_ecart_batches", 'DateTime'>;
}
export type ph_ecart_batchesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_ecart_batchesSelect<ExtArgs> | null;
    omit?: Prisma.ph_ecart_batchesOmit<ExtArgs> | null;
    where: Prisma.ph_ecart_batchesWhereUniqueInput;
};
export type ph_ecart_batchesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_ecart_batchesSelect<ExtArgs> | null;
    omit?: Prisma.ph_ecart_batchesOmit<ExtArgs> | null;
    where: Prisma.ph_ecart_batchesWhereUniqueInput;
};
export type ph_ecart_batchesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_ecart_batchesSelect<ExtArgs> | null;
    omit?: Prisma.ph_ecart_batchesOmit<ExtArgs> | null;
    where?: Prisma.ph_ecart_batchesWhereInput;
    orderBy?: Prisma.ph_ecart_batchesOrderByWithRelationInput | Prisma.ph_ecart_batchesOrderByWithRelationInput[];
    cursor?: Prisma.ph_ecart_batchesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Ph_ecart_batchesScalarFieldEnum | Prisma.Ph_ecart_batchesScalarFieldEnum[];
};
export type ph_ecart_batchesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_ecart_batchesSelect<ExtArgs> | null;
    omit?: Prisma.ph_ecart_batchesOmit<ExtArgs> | null;
    where?: Prisma.ph_ecart_batchesWhereInput;
    orderBy?: Prisma.ph_ecart_batchesOrderByWithRelationInput | Prisma.ph_ecart_batchesOrderByWithRelationInput[];
    cursor?: Prisma.ph_ecart_batchesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Ph_ecart_batchesScalarFieldEnum | Prisma.Ph_ecart_batchesScalarFieldEnum[];
};
export type ph_ecart_batchesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_ecart_batchesSelect<ExtArgs> | null;
    omit?: Prisma.ph_ecart_batchesOmit<ExtArgs> | null;
    where?: Prisma.ph_ecart_batchesWhereInput;
    orderBy?: Prisma.ph_ecart_batchesOrderByWithRelationInput | Prisma.ph_ecart_batchesOrderByWithRelationInput[];
    cursor?: Prisma.ph_ecart_batchesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Ph_ecart_batchesScalarFieldEnum | Prisma.Ph_ecart_batchesScalarFieldEnum[];
};
export type ph_ecart_batchesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_ecart_batchesSelect<ExtArgs> | null;
    omit?: Prisma.ph_ecart_batchesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ph_ecart_batchesCreateInput, Prisma.ph_ecart_batchesUncheckedCreateInput>;
};
export type ph_ecart_batchesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ph_ecart_batchesCreateManyInput | Prisma.ph_ecart_batchesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ph_ecart_batchesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_ecart_batchesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ph_ecart_batchesOmit<ExtArgs> | null;
    data: Prisma.ph_ecart_batchesCreateManyInput | Prisma.ph_ecart_batchesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ph_ecart_batchesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_ecart_batchesSelect<ExtArgs> | null;
    omit?: Prisma.ph_ecart_batchesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ph_ecart_batchesUpdateInput, Prisma.ph_ecart_batchesUncheckedUpdateInput>;
    where: Prisma.ph_ecart_batchesWhereUniqueInput;
};
export type ph_ecart_batchesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ph_ecart_batchesUpdateManyMutationInput, Prisma.ph_ecart_batchesUncheckedUpdateManyInput>;
    where?: Prisma.ph_ecart_batchesWhereInput;
    limit?: number;
};
export type ph_ecart_batchesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_ecart_batchesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ph_ecart_batchesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ph_ecart_batchesUpdateManyMutationInput, Prisma.ph_ecart_batchesUncheckedUpdateManyInput>;
    where?: Prisma.ph_ecart_batchesWhereInput;
    limit?: number;
};
export type ph_ecart_batchesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_ecart_batchesSelect<ExtArgs> | null;
    omit?: Prisma.ph_ecart_batchesOmit<ExtArgs> | null;
    where: Prisma.ph_ecart_batchesWhereUniqueInput;
    create: Prisma.XOR<Prisma.ph_ecart_batchesCreateInput, Prisma.ph_ecart_batchesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ph_ecart_batchesUpdateInput, Prisma.ph_ecart_batchesUncheckedUpdateInput>;
};
export type ph_ecart_batchesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_ecart_batchesSelect<ExtArgs> | null;
    omit?: Prisma.ph_ecart_batchesOmit<ExtArgs> | null;
    where: Prisma.ph_ecart_batchesWhereUniqueInput;
};
export type ph_ecart_batchesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ph_ecart_batchesWhereInput;
    limit?: number;
};
export type ph_ecart_batchesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_ecart_batchesSelect<ExtArgs> | null;
    omit?: Prisma.ph_ecart_batchesOmit<ExtArgs> | null;
};
