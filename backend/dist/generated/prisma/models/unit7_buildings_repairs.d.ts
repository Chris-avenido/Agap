import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type unit7_buildings_repairsModel = runtime.Types.Result.DefaultSelection<Prisma.$unit7_buildings_repairsPayload>;
export type AggregateUnit7_buildings_repairs = {
    _count: Unit7_buildings_repairsCountAggregateOutputType | null;
    _avg: Unit7_buildings_repairsAvgAggregateOutputType | null;
    _sum: Unit7_buildings_repairsSumAggregateOutputType | null;
    _min: Unit7_buildings_repairsMinAggregateOutputType | null;
    _max: Unit7_buildings_repairsMaxAggregateOutputType | null;
};
export type Unit7_buildings_repairsAvgAggregateOutputType = {
    id: number | null;
    damage_ratio: number | null;
};
export type Unit7_buildings_repairsSumAggregateOutputType = {
    id: number | null;
    damage_ratio: number | null;
};
export type Unit7_buildings_repairsMinAggregateOutputType = {
    id: number | null;
    school_id: string | null;
    iern: string | null;
    building_name: string | null;
    room_name: string | null;
    item_name: string | null;
    oms: string | null;
    condition: string | null;
    damage_ratio: number | null;
    recommended_action: string | null;
    demo_justification: string | null;
    remarks: string | null;
    created_at: Date | null;
    school_yr: string | null;
};
export type Unit7_buildings_repairsMaxAggregateOutputType = {
    id: number | null;
    school_id: string | null;
    iern: string | null;
    building_name: string | null;
    room_name: string | null;
    item_name: string | null;
    oms: string | null;
    condition: string | null;
    damage_ratio: number | null;
    recommended_action: string | null;
    demo_justification: string | null;
    remarks: string | null;
    created_at: Date | null;
    school_yr: string | null;
};
export type Unit7_buildings_repairsCountAggregateOutputType = {
    id: number;
    school_id: number;
    iern: number;
    building_name: number;
    room_name: number;
    item_name: number;
    oms: number;
    condition: number;
    damage_ratio: number;
    recommended_action: number;
    demo_justification: number;
    remarks: number;
    created_at: number;
    school_yr: number;
    _all: number;
};
export type Unit7_buildings_repairsAvgAggregateInputType = {
    id?: true;
    damage_ratio?: true;
};
export type Unit7_buildings_repairsSumAggregateInputType = {
    id?: true;
    damage_ratio?: true;
};
export type Unit7_buildings_repairsMinAggregateInputType = {
    id?: true;
    school_id?: true;
    iern?: true;
    building_name?: true;
    room_name?: true;
    item_name?: true;
    oms?: true;
    condition?: true;
    damage_ratio?: true;
    recommended_action?: true;
    demo_justification?: true;
    remarks?: true;
    created_at?: true;
    school_yr?: true;
};
export type Unit7_buildings_repairsMaxAggregateInputType = {
    id?: true;
    school_id?: true;
    iern?: true;
    building_name?: true;
    room_name?: true;
    item_name?: true;
    oms?: true;
    condition?: true;
    damage_ratio?: true;
    recommended_action?: true;
    demo_justification?: true;
    remarks?: true;
    created_at?: true;
    school_yr?: true;
};
export type Unit7_buildings_repairsCountAggregateInputType = {
    id?: true;
    school_id?: true;
    iern?: true;
    building_name?: true;
    room_name?: true;
    item_name?: true;
    oms?: true;
    condition?: true;
    damage_ratio?: true;
    recommended_action?: true;
    demo_justification?: true;
    remarks?: true;
    created_at?: true;
    school_yr?: true;
    _all?: true;
};
export type Unit7_buildings_repairsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.unit7_buildings_repairsWhereInput;
    orderBy?: Prisma.unit7_buildings_repairsOrderByWithRelationInput | Prisma.unit7_buildings_repairsOrderByWithRelationInput[];
    cursor?: Prisma.unit7_buildings_repairsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Unit7_buildings_repairsCountAggregateInputType;
    _avg?: Unit7_buildings_repairsAvgAggregateInputType;
    _sum?: Unit7_buildings_repairsSumAggregateInputType;
    _min?: Unit7_buildings_repairsMinAggregateInputType;
    _max?: Unit7_buildings_repairsMaxAggregateInputType;
};
export type GetUnit7_buildings_repairsAggregateType<T extends Unit7_buildings_repairsAggregateArgs> = {
    [P in keyof T & keyof AggregateUnit7_buildings_repairs]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUnit7_buildings_repairs[P]> : Prisma.GetScalarType<T[P], AggregateUnit7_buildings_repairs[P]>;
};
export type unit7_buildings_repairsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.unit7_buildings_repairsWhereInput;
    orderBy?: Prisma.unit7_buildings_repairsOrderByWithAggregationInput | Prisma.unit7_buildings_repairsOrderByWithAggregationInput[];
    by: Prisma.Unit7_buildings_repairsScalarFieldEnum[] | Prisma.Unit7_buildings_repairsScalarFieldEnum;
    having?: Prisma.unit7_buildings_repairsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Unit7_buildings_repairsCountAggregateInputType | true;
    _avg?: Unit7_buildings_repairsAvgAggregateInputType;
    _sum?: Unit7_buildings_repairsSumAggregateInputType;
    _min?: Unit7_buildings_repairsMinAggregateInputType;
    _max?: Unit7_buildings_repairsMaxAggregateInputType;
};
export type Unit7_buildings_repairsGroupByOutputType = {
    id: number;
    school_id: string | null;
    iern: string | null;
    building_name: string | null;
    room_name: string | null;
    item_name: string | null;
    oms: string | null;
    condition: string | null;
    damage_ratio: number | null;
    recommended_action: string | null;
    demo_justification: string | null;
    remarks: string | null;
    created_at: Date | null;
    school_yr: string | null;
    _count: Unit7_buildings_repairsCountAggregateOutputType | null;
    _avg: Unit7_buildings_repairsAvgAggregateOutputType | null;
    _sum: Unit7_buildings_repairsSumAggregateOutputType | null;
    _min: Unit7_buildings_repairsMinAggregateOutputType | null;
    _max: Unit7_buildings_repairsMaxAggregateOutputType | null;
};
export type GetUnit7_buildings_repairsGroupByPayload<T extends unit7_buildings_repairsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Unit7_buildings_repairsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Unit7_buildings_repairsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Unit7_buildings_repairsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Unit7_buildings_repairsGroupByOutputType[P]>;
}>>;
export type unit7_buildings_repairsWhereInput = {
    AND?: Prisma.unit7_buildings_repairsWhereInput | Prisma.unit7_buildings_repairsWhereInput[];
    OR?: Prisma.unit7_buildings_repairsWhereInput[];
    NOT?: Prisma.unit7_buildings_repairsWhereInput | Prisma.unit7_buildings_repairsWhereInput[];
    id?: Prisma.IntFilter<"unit7_buildings_repairs"> | number;
    school_id?: Prisma.StringNullableFilter<"unit7_buildings_repairs"> | string | null;
    iern?: Prisma.StringNullableFilter<"unit7_buildings_repairs"> | string | null;
    building_name?: Prisma.StringNullableFilter<"unit7_buildings_repairs"> | string | null;
    room_name?: Prisma.StringNullableFilter<"unit7_buildings_repairs"> | string | null;
    item_name?: Prisma.StringNullableFilter<"unit7_buildings_repairs"> | string | null;
    oms?: Prisma.StringNullableFilter<"unit7_buildings_repairs"> | string | null;
    condition?: Prisma.StringNullableFilter<"unit7_buildings_repairs"> | string | null;
    damage_ratio?: Prisma.IntNullableFilter<"unit7_buildings_repairs"> | number | null;
    recommended_action?: Prisma.StringNullableFilter<"unit7_buildings_repairs"> | string | null;
    demo_justification?: Prisma.StringNullableFilter<"unit7_buildings_repairs"> | string | null;
    remarks?: Prisma.StringNullableFilter<"unit7_buildings_repairs"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"unit7_buildings_repairs"> | Date | string | null;
    school_yr?: Prisma.StringNullableFilter<"unit7_buildings_repairs"> | string | null;
};
export type unit7_buildings_repairsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    iern?: Prisma.SortOrderInput | Prisma.SortOrder;
    building_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    room_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    item_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    oms?: Prisma.SortOrderInput | Prisma.SortOrder;
    condition?: Prisma.SortOrderInput | Prisma.SortOrder;
    damage_ratio?: Prisma.SortOrderInput | Prisma.SortOrder;
    recommended_action?: Prisma.SortOrderInput | Prisma.SortOrder;
    demo_justification?: Prisma.SortOrderInput | Prisma.SortOrder;
    remarks?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_yr?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type unit7_buildings_repairsWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.unit7_buildings_repairsWhereInput | Prisma.unit7_buildings_repairsWhereInput[];
    OR?: Prisma.unit7_buildings_repairsWhereInput[];
    NOT?: Prisma.unit7_buildings_repairsWhereInput | Prisma.unit7_buildings_repairsWhereInput[];
    school_id?: Prisma.StringNullableFilter<"unit7_buildings_repairs"> | string | null;
    iern?: Prisma.StringNullableFilter<"unit7_buildings_repairs"> | string | null;
    building_name?: Prisma.StringNullableFilter<"unit7_buildings_repairs"> | string | null;
    room_name?: Prisma.StringNullableFilter<"unit7_buildings_repairs"> | string | null;
    item_name?: Prisma.StringNullableFilter<"unit7_buildings_repairs"> | string | null;
    oms?: Prisma.StringNullableFilter<"unit7_buildings_repairs"> | string | null;
    condition?: Prisma.StringNullableFilter<"unit7_buildings_repairs"> | string | null;
    damage_ratio?: Prisma.IntNullableFilter<"unit7_buildings_repairs"> | number | null;
    recommended_action?: Prisma.StringNullableFilter<"unit7_buildings_repairs"> | string | null;
    demo_justification?: Prisma.StringNullableFilter<"unit7_buildings_repairs"> | string | null;
    remarks?: Prisma.StringNullableFilter<"unit7_buildings_repairs"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"unit7_buildings_repairs"> | Date | string | null;
    school_yr?: Prisma.StringNullableFilter<"unit7_buildings_repairs"> | string | null;
}, "id">;
export type unit7_buildings_repairsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    iern?: Prisma.SortOrderInput | Prisma.SortOrder;
    building_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    room_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    item_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    oms?: Prisma.SortOrderInput | Prisma.SortOrder;
    condition?: Prisma.SortOrderInput | Prisma.SortOrder;
    damage_ratio?: Prisma.SortOrderInput | Prisma.SortOrder;
    recommended_action?: Prisma.SortOrderInput | Prisma.SortOrder;
    demo_justification?: Prisma.SortOrderInput | Prisma.SortOrder;
    remarks?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_yr?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.unit7_buildings_repairsCountOrderByAggregateInput;
    _avg?: Prisma.unit7_buildings_repairsAvgOrderByAggregateInput;
    _max?: Prisma.unit7_buildings_repairsMaxOrderByAggregateInput;
    _min?: Prisma.unit7_buildings_repairsMinOrderByAggregateInput;
    _sum?: Prisma.unit7_buildings_repairsSumOrderByAggregateInput;
};
export type unit7_buildings_repairsScalarWhereWithAggregatesInput = {
    AND?: Prisma.unit7_buildings_repairsScalarWhereWithAggregatesInput | Prisma.unit7_buildings_repairsScalarWhereWithAggregatesInput[];
    OR?: Prisma.unit7_buildings_repairsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.unit7_buildings_repairsScalarWhereWithAggregatesInput | Prisma.unit7_buildings_repairsScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"unit7_buildings_repairs"> | number;
    school_id?: Prisma.StringNullableWithAggregatesFilter<"unit7_buildings_repairs"> | string | null;
    iern?: Prisma.StringNullableWithAggregatesFilter<"unit7_buildings_repairs"> | string | null;
    building_name?: Prisma.StringNullableWithAggregatesFilter<"unit7_buildings_repairs"> | string | null;
    room_name?: Prisma.StringNullableWithAggregatesFilter<"unit7_buildings_repairs"> | string | null;
    item_name?: Prisma.StringNullableWithAggregatesFilter<"unit7_buildings_repairs"> | string | null;
    oms?: Prisma.StringNullableWithAggregatesFilter<"unit7_buildings_repairs"> | string | null;
    condition?: Prisma.StringNullableWithAggregatesFilter<"unit7_buildings_repairs"> | string | null;
    damage_ratio?: Prisma.IntNullableWithAggregatesFilter<"unit7_buildings_repairs"> | number | null;
    recommended_action?: Prisma.StringNullableWithAggregatesFilter<"unit7_buildings_repairs"> | string | null;
    demo_justification?: Prisma.StringNullableWithAggregatesFilter<"unit7_buildings_repairs"> | string | null;
    remarks?: Prisma.StringNullableWithAggregatesFilter<"unit7_buildings_repairs"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"unit7_buildings_repairs"> | Date | string | null;
    school_yr?: Prisma.StringNullableWithAggregatesFilter<"unit7_buildings_repairs"> | string | null;
};
export type unit7_buildings_repairsCreateInput = {
    school_id?: string | null;
    iern?: string | null;
    building_name?: string | null;
    room_name?: string | null;
    item_name?: string | null;
    oms?: string | null;
    condition?: string | null;
    damage_ratio?: number | null;
    recommended_action?: string | null;
    demo_justification?: string | null;
    remarks?: string | null;
    created_at?: Date | string | null;
    school_yr?: string | null;
};
export type unit7_buildings_repairsUncheckedCreateInput = {
    id?: number;
    school_id?: string | null;
    iern?: string | null;
    building_name?: string | null;
    room_name?: string | null;
    item_name?: string | null;
    oms?: string | null;
    condition?: string | null;
    damage_ratio?: number | null;
    recommended_action?: string | null;
    demo_justification?: string | null;
    remarks?: string | null;
    created_at?: Date | string | null;
    school_yr?: string | null;
};
export type unit7_buildings_repairsUpdateInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    building_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    room_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    item_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    condition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    damage_ratio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    recommended_action?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demo_justification?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    school_yr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type unit7_buildings_repairsUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    building_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    room_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    item_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    condition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    damage_ratio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    recommended_action?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demo_justification?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    school_yr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type unit7_buildings_repairsCreateManyInput = {
    id?: number;
    school_id?: string | null;
    iern?: string | null;
    building_name?: string | null;
    room_name?: string | null;
    item_name?: string | null;
    oms?: string | null;
    condition?: string | null;
    damage_ratio?: number | null;
    recommended_action?: string | null;
    demo_justification?: string | null;
    remarks?: string | null;
    created_at?: Date | string | null;
    school_yr?: string | null;
};
export type unit7_buildings_repairsUpdateManyMutationInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    building_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    room_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    item_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    condition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    damage_ratio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    recommended_action?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demo_justification?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    school_yr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type unit7_buildings_repairsUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    building_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    room_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    item_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    condition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    damage_ratio?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    recommended_action?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    demo_justification?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    school_yr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type unit7_buildings_repairsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    building_name?: Prisma.SortOrder;
    room_name?: Prisma.SortOrder;
    item_name?: Prisma.SortOrder;
    oms?: Prisma.SortOrder;
    condition?: Prisma.SortOrder;
    damage_ratio?: Prisma.SortOrder;
    recommended_action?: Prisma.SortOrder;
    demo_justification?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    school_yr?: Prisma.SortOrder;
};
export type unit7_buildings_repairsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    damage_ratio?: Prisma.SortOrder;
};
export type unit7_buildings_repairsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    building_name?: Prisma.SortOrder;
    room_name?: Prisma.SortOrder;
    item_name?: Prisma.SortOrder;
    oms?: Prisma.SortOrder;
    condition?: Prisma.SortOrder;
    damage_ratio?: Prisma.SortOrder;
    recommended_action?: Prisma.SortOrder;
    demo_justification?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    school_yr?: Prisma.SortOrder;
};
export type unit7_buildings_repairsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    building_name?: Prisma.SortOrder;
    room_name?: Prisma.SortOrder;
    item_name?: Prisma.SortOrder;
    oms?: Prisma.SortOrder;
    condition?: Prisma.SortOrder;
    damage_ratio?: Prisma.SortOrder;
    recommended_action?: Prisma.SortOrder;
    demo_justification?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    school_yr?: Prisma.SortOrder;
};
export type unit7_buildings_repairsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    damage_ratio?: Prisma.SortOrder;
};
export type unit7_buildings_repairsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    building_name?: boolean;
    room_name?: boolean;
    item_name?: boolean;
    oms?: boolean;
    condition?: boolean;
    damage_ratio?: boolean;
    recommended_action?: boolean;
    demo_justification?: boolean;
    remarks?: boolean;
    created_at?: boolean;
    school_yr?: boolean;
}, ExtArgs["result"]["unit7_buildings_repairs"]>;
export type unit7_buildings_repairsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    building_name?: boolean;
    room_name?: boolean;
    item_name?: boolean;
    oms?: boolean;
    condition?: boolean;
    damage_ratio?: boolean;
    recommended_action?: boolean;
    demo_justification?: boolean;
    remarks?: boolean;
    created_at?: boolean;
    school_yr?: boolean;
}, ExtArgs["result"]["unit7_buildings_repairs"]>;
export type unit7_buildings_repairsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    building_name?: boolean;
    room_name?: boolean;
    item_name?: boolean;
    oms?: boolean;
    condition?: boolean;
    damage_ratio?: boolean;
    recommended_action?: boolean;
    demo_justification?: boolean;
    remarks?: boolean;
    created_at?: boolean;
    school_yr?: boolean;
}, ExtArgs["result"]["unit7_buildings_repairs"]>;
export type unit7_buildings_repairsSelectScalar = {
    id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    building_name?: boolean;
    room_name?: boolean;
    item_name?: boolean;
    oms?: boolean;
    condition?: boolean;
    damage_ratio?: boolean;
    recommended_action?: boolean;
    demo_justification?: boolean;
    remarks?: boolean;
    created_at?: boolean;
    school_yr?: boolean;
};
export type unit7_buildings_repairsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "school_id" | "iern" | "building_name" | "room_name" | "item_name" | "oms" | "condition" | "damage_ratio" | "recommended_action" | "demo_justification" | "remarks" | "created_at" | "school_yr", ExtArgs["result"]["unit7_buildings_repairs"]>;
export type $unit7_buildings_repairsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "unit7_buildings_repairs";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        school_id: string | null;
        iern: string | null;
        building_name: string | null;
        room_name: string | null;
        item_name: string | null;
        oms: string | null;
        condition: string | null;
        damage_ratio: number | null;
        recommended_action: string | null;
        demo_justification: string | null;
        remarks: string | null;
        created_at: Date | null;
        school_yr: string | null;
    }, ExtArgs["result"]["unit7_buildings_repairs"]>;
    composites: {};
};
export type unit7_buildings_repairsGetPayload<S extends boolean | null | undefined | unit7_buildings_repairsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$unit7_buildings_repairsPayload, S>;
export type unit7_buildings_repairsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<unit7_buildings_repairsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Unit7_buildings_repairsCountAggregateInputType | true;
};
export interface unit7_buildings_repairsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['unit7_buildings_repairs'];
        meta: {
            name: 'unit7_buildings_repairs';
        };
    };
    findUnique<T extends unit7_buildings_repairsFindUniqueArgs>(args: Prisma.SelectSubset<T, unit7_buildings_repairsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__unit7_buildings_repairsClient<runtime.Types.Result.GetResult<Prisma.$unit7_buildings_repairsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends unit7_buildings_repairsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, unit7_buildings_repairsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__unit7_buildings_repairsClient<runtime.Types.Result.GetResult<Prisma.$unit7_buildings_repairsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends unit7_buildings_repairsFindFirstArgs>(args?: Prisma.SelectSubset<T, unit7_buildings_repairsFindFirstArgs<ExtArgs>>): Prisma.Prisma__unit7_buildings_repairsClient<runtime.Types.Result.GetResult<Prisma.$unit7_buildings_repairsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends unit7_buildings_repairsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, unit7_buildings_repairsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__unit7_buildings_repairsClient<runtime.Types.Result.GetResult<Prisma.$unit7_buildings_repairsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends unit7_buildings_repairsFindManyArgs>(args?: Prisma.SelectSubset<T, unit7_buildings_repairsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$unit7_buildings_repairsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends unit7_buildings_repairsCreateArgs>(args: Prisma.SelectSubset<T, unit7_buildings_repairsCreateArgs<ExtArgs>>): Prisma.Prisma__unit7_buildings_repairsClient<runtime.Types.Result.GetResult<Prisma.$unit7_buildings_repairsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends unit7_buildings_repairsCreateManyArgs>(args?: Prisma.SelectSubset<T, unit7_buildings_repairsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends unit7_buildings_repairsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, unit7_buildings_repairsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$unit7_buildings_repairsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends unit7_buildings_repairsDeleteArgs>(args: Prisma.SelectSubset<T, unit7_buildings_repairsDeleteArgs<ExtArgs>>): Prisma.Prisma__unit7_buildings_repairsClient<runtime.Types.Result.GetResult<Prisma.$unit7_buildings_repairsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends unit7_buildings_repairsUpdateArgs>(args: Prisma.SelectSubset<T, unit7_buildings_repairsUpdateArgs<ExtArgs>>): Prisma.Prisma__unit7_buildings_repairsClient<runtime.Types.Result.GetResult<Prisma.$unit7_buildings_repairsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends unit7_buildings_repairsDeleteManyArgs>(args?: Prisma.SelectSubset<T, unit7_buildings_repairsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends unit7_buildings_repairsUpdateManyArgs>(args: Prisma.SelectSubset<T, unit7_buildings_repairsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends unit7_buildings_repairsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, unit7_buildings_repairsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$unit7_buildings_repairsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends unit7_buildings_repairsUpsertArgs>(args: Prisma.SelectSubset<T, unit7_buildings_repairsUpsertArgs<ExtArgs>>): Prisma.Prisma__unit7_buildings_repairsClient<runtime.Types.Result.GetResult<Prisma.$unit7_buildings_repairsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends unit7_buildings_repairsCountArgs>(args?: Prisma.Subset<T, unit7_buildings_repairsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Unit7_buildings_repairsCountAggregateOutputType> : number>;
    aggregate<T extends Unit7_buildings_repairsAggregateArgs>(args: Prisma.Subset<T, Unit7_buildings_repairsAggregateArgs>): Prisma.PrismaPromise<GetUnit7_buildings_repairsAggregateType<T>>;
    groupBy<T extends unit7_buildings_repairsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: unit7_buildings_repairsGroupByArgs['orderBy'];
    } : {
        orderBy?: unit7_buildings_repairsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, unit7_buildings_repairsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUnit7_buildings_repairsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: unit7_buildings_repairsFieldRefs;
}
export interface Prisma__unit7_buildings_repairsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface unit7_buildings_repairsFieldRefs {
    readonly id: Prisma.FieldRef<"unit7_buildings_repairs", 'Int'>;
    readonly school_id: Prisma.FieldRef<"unit7_buildings_repairs", 'String'>;
    readonly iern: Prisma.FieldRef<"unit7_buildings_repairs", 'String'>;
    readonly building_name: Prisma.FieldRef<"unit7_buildings_repairs", 'String'>;
    readonly room_name: Prisma.FieldRef<"unit7_buildings_repairs", 'String'>;
    readonly item_name: Prisma.FieldRef<"unit7_buildings_repairs", 'String'>;
    readonly oms: Prisma.FieldRef<"unit7_buildings_repairs", 'String'>;
    readonly condition: Prisma.FieldRef<"unit7_buildings_repairs", 'String'>;
    readonly damage_ratio: Prisma.FieldRef<"unit7_buildings_repairs", 'Int'>;
    readonly recommended_action: Prisma.FieldRef<"unit7_buildings_repairs", 'String'>;
    readonly demo_justification: Prisma.FieldRef<"unit7_buildings_repairs", 'String'>;
    readonly remarks: Prisma.FieldRef<"unit7_buildings_repairs", 'String'>;
    readonly created_at: Prisma.FieldRef<"unit7_buildings_repairs", 'DateTime'>;
    readonly school_yr: Prisma.FieldRef<"unit7_buildings_repairs", 'String'>;
}
export type unit7_buildings_repairsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_repairsSelect<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_repairsOmit<ExtArgs> | null;
    where: Prisma.unit7_buildings_repairsWhereUniqueInput;
};
export type unit7_buildings_repairsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_repairsSelect<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_repairsOmit<ExtArgs> | null;
    where: Prisma.unit7_buildings_repairsWhereUniqueInput;
};
export type unit7_buildings_repairsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_repairsSelect<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_repairsOmit<ExtArgs> | null;
    where?: Prisma.unit7_buildings_repairsWhereInput;
    orderBy?: Prisma.unit7_buildings_repairsOrderByWithRelationInput | Prisma.unit7_buildings_repairsOrderByWithRelationInput[];
    cursor?: Prisma.unit7_buildings_repairsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Unit7_buildings_repairsScalarFieldEnum | Prisma.Unit7_buildings_repairsScalarFieldEnum[];
};
export type unit7_buildings_repairsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_repairsSelect<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_repairsOmit<ExtArgs> | null;
    where?: Prisma.unit7_buildings_repairsWhereInput;
    orderBy?: Prisma.unit7_buildings_repairsOrderByWithRelationInput | Prisma.unit7_buildings_repairsOrderByWithRelationInput[];
    cursor?: Prisma.unit7_buildings_repairsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Unit7_buildings_repairsScalarFieldEnum | Prisma.Unit7_buildings_repairsScalarFieldEnum[];
};
export type unit7_buildings_repairsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_repairsSelect<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_repairsOmit<ExtArgs> | null;
    where?: Prisma.unit7_buildings_repairsWhereInput;
    orderBy?: Prisma.unit7_buildings_repairsOrderByWithRelationInput | Prisma.unit7_buildings_repairsOrderByWithRelationInput[];
    cursor?: Prisma.unit7_buildings_repairsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Unit7_buildings_repairsScalarFieldEnum | Prisma.Unit7_buildings_repairsScalarFieldEnum[];
};
export type unit7_buildings_repairsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_repairsSelect<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_repairsOmit<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.unit7_buildings_repairsCreateInput, Prisma.unit7_buildings_repairsUncheckedCreateInput>;
};
export type unit7_buildings_repairsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.unit7_buildings_repairsCreateManyInput | Prisma.unit7_buildings_repairsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type unit7_buildings_repairsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_repairsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_repairsOmit<ExtArgs> | null;
    data: Prisma.unit7_buildings_repairsCreateManyInput | Prisma.unit7_buildings_repairsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type unit7_buildings_repairsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_repairsSelect<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_repairsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.unit7_buildings_repairsUpdateInput, Prisma.unit7_buildings_repairsUncheckedUpdateInput>;
    where: Prisma.unit7_buildings_repairsWhereUniqueInput;
};
export type unit7_buildings_repairsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.unit7_buildings_repairsUpdateManyMutationInput, Prisma.unit7_buildings_repairsUncheckedUpdateManyInput>;
    where?: Prisma.unit7_buildings_repairsWhereInput;
    limit?: number;
};
export type unit7_buildings_repairsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_repairsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_repairsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.unit7_buildings_repairsUpdateManyMutationInput, Prisma.unit7_buildings_repairsUncheckedUpdateManyInput>;
    where?: Prisma.unit7_buildings_repairsWhereInput;
    limit?: number;
};
export type unit7_buildings_repairsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_repairsSelect<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_repairsOmit<ExtArgs> | null;
    where: Prisma.unit7_buildings_repairsWhereUniqueInput;
    create: Prisma.XOR<Prisma.unit7_buildings_repairsCreateInput, Prisma.unit7_buildings_repairsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.unit7_buildings_repairsUpdateInput, Prisma.unit7_buildings_repairsUncheckedUpdateInput>;
};
export type unit7_buildings_repairsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_repairsSelect<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_repairsOmit<ExtArgs> | null;
    where: Prisma.unit7_buildings_repairsWhereUniqueInput;
};
export type unit7_buildings_repairsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.unit7_buildings_repairsWhereInput;
    limit?: number;
};
export type unit7_buildings_repairsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_repairsSelect<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_repairsOmit<ExtArgs> | null;
};
