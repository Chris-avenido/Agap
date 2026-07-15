import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type unit7_buildings_demolitionModel = runtime.Types.Result.DefaultSelection<Prisma.$unit7_buildings_demolitionPayload>;
export type AggregateUnit7_buildings_demolition = {
    _count: Unit7_buildings_demolitionCountAggregateOutputType | null;
    _avg: Unit7_buildings_demolitionAvgAggregateOutputType | null;
    _sum: Unit7_buildings_demolitionSumAggregateOutputType | null;
    _min: Unit7_buildings_demolitionMinAggregateOutputType | null;
    _max: Unit7_buildings_demolitionMaxAggregateOutputType | null;
};
export type Unit7_buildings_demolitionAvgAggregateOutputType = {
    id: number | null;
    less_than_7x9: number | null;
    x9: number | null;
    above_7x9: number | null;
};
export type Unit7_buildings_demolitionSumAggregateOutputType = {
    id: number | null;
    less_than_7x9: number | null;
    x9: number | null;
    above_7x9: number | null;
};
export type Unit7_buildings_demolitionMinAggregateOutputType = {
    id: number | null;
    school_id: string | null;
    iern: string | null;
    building_name: string | null;
    room_name: string | null;
    age: boolean | null;
    safety: boolean | null;
    calamity: boolean | null;
    upgrade: boolean | null;
    less_than_7x9: number | null;
    x9: number | null;
    above_7x9: number | null;
    created_at: Date | null;
    school_yr: string | null;
};
export type Unit7_buildings_demolitionMaxAggregateOutputType = {
    id: number | null;
    school_id: string | null;
    iern: string | null;
    building_name: string | null;
    room_name: string | null;
    age: boolean | null;
    safety: boolean | null;
    calamity: boolean | null;
    upgrade: boolean | null;
    less_than_7x9: number | null;
    x9: number | null;
    above_7x9: number | null;
    created_at: Date | null;
    school_yr: string | null;
};
export type Unit7_buildings_demolitionCountAggregateOutputType = {
    id: number;
    school_id: number;
    iern: number;
    building_name: number;
    room_name: number;
    age: number;
    safety: number;
    calamity: number;
    upgrade: number;
    less_than_7x9: number;
    x9: number;
    above_7x9: number;
    created_at: number;
    school_yr: number;
    _all: number;
};
export type Unit7_buildings_demolitionAvgAggregateInputType = {
    id?: true;
    less_than_7x9?: true;
    x9?: true;
    above_7x9?: true;
};
export type Unit7_buildings_demolitionSumAggregateInputType = {
    id?: true;
    less_than_7x9?: true;
    x9?: true;
    above_7x9?: true;
};
export type Unit7_buildings_demolitionMinAggregateInputType = {
    id?: true;
    school_id?: true;
    iern?: true;
    building_name?: true;
    room_name?: true;
    age?: true;
    safety?: true;
    calamity?: true;
    upgrade?: true;
    less_than_7x9?: true;
    x9?: true;
    above_7x9?: true;
    created_at?: true;
    school_yr?: true;
};
export type Unit7_buildings_demolitionMaxAggregateInputType = {
    id?: true;
    school_id?: true;
    iern?: true;
    building_name?: true;
    room_name?: true;
    age?: true;
    safety?: true;
    calamity?: true;
    upgrade?: true;
    less_than_7x9?: true;
    x9?: true;
    above_7x9?: true;
    created_at?: true;
    school_yr?: true;
};
export type Unit7_buildings_demolitionCountAggregateInputType = {
    id?: true;
    school_id?: true;
    iern?: true;
    building_name?: true;
    room_name?: true;
    age?: true;
    safety?: true;
    calamity?: true;
    upgrade?: true;
    less_than_7x9?: true;
    x9?: true;
    above_7x9?: true;
    created_at?: true;
    school_yr?: true;
    _all?: true;
};
export type Unit7_buildings_demolitionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.unit7_buildings_demolitionWhereInput;
    orderBy?: Prisma.unit7_buildings_demolitionOrderByWithRelationInput | Prisma.unit7_buildings_demolitionOrderByWithRelationInput[];
    cursor?: Prisma.unit7_buildings_demolitionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Unit7_buildings_demolitionCountAggregateInputType;
    _avg?: Unit7_buildings_demolitionAvgAggregateInputType;
    _sum?: Unit7_buildings_demolitionSumAggregateInputType;
    _min?: Unit7_buildings_demolitionMinAggregateInputType;
    _max?: Unit7_buildings_demolitionMaxAggregateInputType;
};
export type GetUnit7_buildings_demolitionAggregateType<T extends Unit7_buildings_demolitionAggregateArgs> = {
    [P in keyof T & keyof AggregateUnit7_buildings_demolition]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUnit7_buildings_demolition[P]> : Prisma.GetScalarType<T[P], AggregateUnit7_buildings_demolition[P]>;
};
export type unit7_buildings_demolitionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.unit7_buildings_demolitionWhereInput;
    orderBy?: Prisma.unit7_buildings_demolitionOrderByWithAggregationInput | Prisma.unit7_buildings_demolitionOrderByWithAggregationInput[];
    by: Prisma.Unit7_buildings_demolitionScalarFieldEnum[] | Prisma.Unit7_buildings_demolitionScalarFieldEnum;
    having?: Prisma.unit7_buildings_demolitionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Unit7_buildings_demolitionCountAggregateInputType | true;
    _avg?: Unit7_buildings_demolitionAvgAggregateInputType;
    _sum?: Unit7_buildings_demolitionSumAggregateInputType;
    _min?: Unit7_buildings_demolitionMinAggregateInputType;
    _max?: Unit7_buildings_demolitionMaxAggregateInputType;
};
export type Unit7_buildings_demolitionGroupByOutputType = {
    id: number;
    school_id: string | null;
    iern: string | null;
    building_name: string | null;
    room_name: string | null;
    age: boolean | null;
    safety: boolean | null;
    calamity: boolean | null;
    upgrade: boolean | null;
    less_than_7x9: number | null;
    x9: number | null;
    above_7x9: number | null;
    created_at: Date | null;
    school_yr: string | null;
    _count: Unit7_buildings_demolitionCountAggregateOutputType | null;
    _avg: Unit7_buildings_demolitionAvgAggregateOutputType | null;
    _sum: Unit7_buildings_demolitionSumAggregateOutputType | null;
    _min: Unit7_buildings_demolitionMinAggregateOutputType | null;
    _max: Unit7_buildings_demolitionMaxAggregateOutputType | null;
};
export type GetUnit7_buildings_demolitionGroupByPayload<T extends unit7_buildings_demolitionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Unit7_buildings_demolitionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Unit7_buildings_demolitionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Unit7_buildings_demolitionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Unit7_buildings_demolitionGroupByOutputType[P]>;
}>>;
export type unit7_buildings_demolitionWhereInput = {
    AND?: Prisma.unit7_buildings_demolitionWhereInput | Prisma.unit7_buildings_demolitionWhereInput[];
    OR?: Prisma.unit7_buildings_demolitionWhereInput[];
    NOT?: Prisma.unit7_buildings_demolitionWhereInput | Prisma.unit7_buildings_demolitionWhereInput[];
    id?: Prisma.IntFilter<"unit7_buildings_demolition"> | number;
    school_id?: Prisma.StringNullableFilter<"unit7_buildings_demolition"> | string | null;
    iern?: Prisma.StringNullableFilter<"unit7_buildings_demolition"> | string | null;
    building_name?: Prisma.StringNullableFilter<"unit7_buildings_demolition"> | string | null;
    room_name?: Prisma.StringNullableFilter<"unit7_buildings_demolition"> | string | null;
    age?: Prisma.BoolNullableFilter<"unit7_buildings_demolition"> | boolean | null;
    safety?: Prisma.BoolNullableFilter<"unit7_buildings_demolition"> | boolean | null;
    calamity?: Prisma.BoolNullableFilter<"unit7_buildings_demolition"> | boolean | null;
    upgrade?: Prisma.BoolNullableFilter<"unit7_buildings_demolition"> | boolean | null;
    less_than_7x9?: Prisma.IntNullableFilter<"unit7_buildings_demolition"> | number | null;
    x9?: Prisma.IntNullableFilter<"unit7_buildings_demolition"> | number | null;
    above_7x9?: Prisma.IntNullableFilter<"unit7_buildings_demolition"> | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"unit7_buildings_demolition"> | Date | string | null;
    school_yr?: Prisma.StringNullableFilter<"unit7_buildings_demolition"> | string | null;
};
export type unit7_buildings_demolitionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    iern?: Prisma.SortOrderInput | Prisma.SortOrder;
    building_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    room_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    age?: Prisma.SortOrderInput | Prisma.SortOrder;
    safety?: Prisma.SortOrderInput | Prisma.SortOrder;
    calamity?: Prisma.SortOrderInput | Prisma.SortOrder;
    upgrade?: Prisma.SortOrderInput | Prisma.SortOrder;
    less_than_7x9?: Prisma.SortOrderInput | Prisma.SortOrder;
    x9?: Prisma.SortOrderInput | Prisma.SortOrder;
    above_7x9?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_yr?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type unit7_buildings_demolitionWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.unit7_buildings_demolitionWhereInput | Prisma.unit7_buildings_demolitionWhereInput[];
    OR?: Prisma.unit7_buildings_demolitionWhereInput[];
    NOT?: Prisma.unit7_buildings_demolitionWhereInput | Prisma.unit7_buildings_demolitionWhereInput[];
    school_id?: Prisma.StringNullableFilter<"unit7_buildings_demolition"> | string | null;
    iern?: Prisma.StringNullableFilter<"unit7_buildings_demolition"> | string | null;
    building_name?: Prisma.StringNullableFilter<"unit7_buildings_demolition"> | string | null;
    room_name?: Prisma.StringNullableFilter<"unit7_buildings_demolition"> | string | null;
    age?: Prisma.BoolNullableFilter<"unit7_buildings_demolition"> | boolean | null;
    safety?: Prisma.BoolNullableFilter<"unit7_buildings_demolition"> | boolean | null;
    calamity?: Prisma.BoolNullableFilter<"unit7_buildings_demolition"> | boolean | null;
    upgrade?: Prisma.BoolNullableFilter<"unit7_buildings_demolition"> | boolean | null;
    less_than_7x9?: Prisma.IntNullableFilter<"unit7_buildings_demolition"> | number | null;
    x9?: Prisma.IntNullableFilter<"unit7_buildings_demolition"> | number | null;
    above_7x9?: Prisma.IntNullableFilter<"unit7_buildings_demolition"> | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"unit7_buildings_demolition"> | Date | string | null;
    school_yr?: Prisma.StringNullableFilter<"unit7_buildings_demolition"> | string | null;
}, "id">;
export type unit7_buildings_demolitionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    iern?: Prisma.SortOrderInput | Prisma.SortOrder;
    building_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    room_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    age?: Prisma.SortOrderInput | Prisma.SortOrder;
    safety?: Prisma.SortOrderInput | Prisma.SortOrder;
    calamity?: Prisma.SortOrderInput | Prisma.SortOrder;
    upgrade?: Prisma.SortOrderInput | Prisma.SortOrder;
    less_than_7x9?: Prisma.SortOrderInput | Prisma.SortOrder;
    x9?: Prisma.SortOrderInput | Prisma.SortOrder;
    above_7x9?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_yr?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.unit7_buildings_demolitionCountOrderByAggregateInput;
    _avg?: Prisma.unit7_buildings_demolitionAvgOrderByAggregateInput;
    _max?: Prisma.unit7_buildings_demolitionMaxOrderByAggregateInput;
    _min?: Prisma.unit7_buildings_demolitionMinOrderByAggregateInput;
    _sum?: Prisma.unit7_buildings_demolitionSumOrderByAggregateInput;
};
export type unit7_buildings_demolitionScalarWhereWithAggregatesInput = {
    AND?: Prisma.unit7_buildings_demolitionScalarWhereWithAggregatesInput | Prisma.unit7_buildings_demolitionScalarWhereWithAggregatesInput[];
    OR?: Prisma.unit7_buildings_demolitionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.unit7_buildings_demolitionScalarWhereWithAggregatesInput | Prisma.unit7_buildings_demolitionScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"unit7_buildings_demolition"> | number;
    school_id?: Prisma.StringNullableWithAggregatesFilter<"unit7_buildings_demolition"> | string | null;
    iern?: Prisma.StringNullableWithAggregatesFilter<"unit7_buildings_demolition"> | string | null;
    building_name?: Prisma.StringNullableWithAggregatesFilter<"unit7_buildings_demolition"> | string | null;
    room_name?: Prisma.StringNullableWithAggregatesFilter<"unit7_buildings_demolition"> | string | null;
    age?: Prisma.BoolNullableWithAggregatesFilter<"unit7_buildings_demolition"> | boolean | null;
    safety?: Prisma.BoolNullableWithAggregatesFilter<"unit7_buildings_demolition"> | boolean | null;
    calamity?: Prisma.BoolNullableWithAggregatesFilter<"unit7_buildings_demolition"> | boolean | null;
    upgrade?: Prisma.BoolNullableWithAggregatesFilter<"unit7_buildings_demolition"> | boolean | null;
    less_than_7x9?: Prisma.IntNullableWithAggregatesFilter<"unit7_buildings_demolition"> | number | null;
    x9?: Prisma.IntNullableWithAggregatesFilter<"unit7_buildings_demolition"> | number | null;
    above_7x9?: Prisma.IntNullableWithAggregatesFilter<"unit7_buildings_demolition"> | number | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"unit7_buildings_demolition"> | Date | string | null;
    school_yr?: Prisma.StringNullableWithAggregatesFilter<"unit7_buildings_demolition"> | string | null;
};
export type unit7_buildings_demolitionCreateInput = {
    school_id?: string | null;
    iern?: string | null;
    building_name?: string | null;
    room_name?: string | null;
    age?: boolean | null;
    safety?: boolean | null;
    calamity?: boolean | null;
    upgrade?: boolean | null;
    less_than_7x9?: number | null;
    x9?: number | null;
    above_7x9?: number | null;
    created_at?: Date | string | null;
    school_yr?: string | null;
};
export type unit7_buildings_demolitionUncheckedCreateInput = {
    id?: number;
    school_id?: string | null;
    iern?: string | null;
    building_name?: string | null;
    room_name?: string | null;
    age?: boolean | null;
    safety?: boolean | null;
    calamity?: boolean | null;
    upgrade?: boolean | null;
    less_than_7x9?: number | null;
    x9?: number | null;
    above_7x9?: number | null;
    created_at?: Date | string | null;
    school_yr?: string | null;
};
export type unit7_buildings_demolitionUpdateInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    building_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    room_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    age?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    safety?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    calamity?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    upgrade?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    less_than_7x9?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    x9?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    above_7x9?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    school_yr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type unit7_buildings_demolitionUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    building_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    room_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    age?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    safety?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    calamity?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    upgrade?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    less_than_7x9?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    x9?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    above_7x9?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    school_yr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type unit7_buildings_demolitionCreateManyInput = {
    id?: number;
    school_id?: string | null;
    iern?: string | null;
    building_name?: string | null;
    room_name?: string | null;
    age?: boolean | null;
    safety?: boolean | null;
    calamity?: boolean | null;
    upgrade?: boolean | null;
    less_than_7x9?: number | null;
    x9?: number | null;
    above_7x9?: number | null;
    created_at?: Date | string | null;
    school_yr?: string | null;
};
export type unit7_buildings_demolitionUpdateManyMutationInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    building_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    room_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    age?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    safety?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    calamity?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    upgrade?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    less_than_7x9?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    x9?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    above_7x9?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    school_yr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type unit7_buildings_demolitionUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    building_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    room_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    age?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    safety?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    calamity?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    upgrade?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    less_than_7x9?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    x9?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    above_7x9?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    school_yr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type unit7_buildings_demolitionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    building_name?: Prisma.SortOrder;
    room_name?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    safety?: Prisma.SortOrder;
    calamity?: Prisma.SortOrder;
    upgrade?: Prisma.SortOrder;
    less_than_7x9?: Prisma.SortOrder;
    x9?: Prisma.SortOrder;
    above_7x9?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    school_yr?: Prisma.SortOrder;
};
export type unit7_buildings_demolitionAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    less_than_7x9?: Prisma.SortOrder;
    x9?: Prisma.SortOrder;
    above_7x9?: Prisma.SortOrder;
};
export type unit7_buildings_demolitionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    building_name?: Prisma.SortOrder;
    room_name?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    safety?: Prisma.SortOrder;
    calamity?: Prisma.SortOrder;
    upgrade?: Prisma.SortOrder;
    less_than_7x9?: Prisma.SortOrder;
    x9?: Prisma.SortOrder;
    above_7x9?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    school_yr?: Prisma.SortOrder;
};
export type unit7_buildings_demolitionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    building_name?: Prisma.SortOrder;
    room_name?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    safety?: Prisma.SortOrder;
    calamity?: Prisma.SortOrder;
    upgrade?: Prisma.SortOrder;
    less_than_7x9?: Prisma.SortOrder;
    x9?: Prisma.SortOrder;
    above_7x9?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    school_yr?: Prisma.SortOrder;
};
export type unit7_buildings_demolitionSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    less_than_7x9?: Prisma.SortOrder;
    x9?: Prisma.SortOrder;
    above_7x9?: Prisma.SortOrder;
};
export type unit7_buildings_demolitionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    building_name?: boolean;
    room_name?: boolean;
    age?: boolean;
    safety?: boolean;
    calamity?: boolean;
    upgrade?: boolean;
    less_than_7x9?: boolean;
    x9?: boolean;
    above_7x9?: boolean;
    created_at?: boolean;
    school_yr?: boolean;
}, ExtArgs["result"]["unit7_buildings_demolition"]>;
export type unit7_buildings_demolitionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    building_name?: boolean;
    room_name?: boolean;
    age?: boolean;
    safety?: boolean;
    calamity?: boolean;
    upgrade?: boolean;
    less_than_7x9?: boolean;
    x9?: boolean;
    above_7x9?: boolean;
    created_at?: boolean;
    school_yr?: boolean;
}, ExtArgs["result"]["unit7_buildings_demolition"]>;
export type unit7_buildings_demolitionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    building_name?: boolean;
    room_name?: boolean;
    age?: boolean;
    safety?: boolean;
    calamity?: boolean;
    upgrade?: boolean;
    less_than_7x9?: boolean;
    x9?: boolean;
    above_7x9?: boolean;
    created_at?: boolean;
    school_yr?: boolean;
}, ExtArgs["result"]["unit7_buildings_demolition"]>;
export type unit7_buildings_demolitionSelectScalar = {
    id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    building_name?: boolean;
    room_name?: boolean;
    age?: boolean;
    safety?: boolean;
    calamity?: boolean;
    upgrade?: boolean;
    less_than_7x9?: boolean;
    x9?: boolean;
    above_7x9?: boolean;
    created_at?: boolean;
    school_yr?: boolean;
};
export type unit7_buildings_demolitionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "school_id" | "iern" | "building_name" | "room_name" | "age" | "safety" | "calamity" | "upgrade" | "less_than_7x9" | "x9" | "above_7x9" | "created_at" | "school_yr", ExtArgs["result"]["unit7_buildings_demolition"]>;
export type $unit7_buildings_demolitionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "unit7_buildings_demolition";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        school_id: string | null;
        iern: string | null;
        building_name: string | null;
        room_name: string | null;
        age: boolean | null;
        safety: boolean | null;
        calamity: boolean | null;
        upgrade: boolean | null;
        less_than_7x9: number | null;
        x9: number | null;
        above_7x9: number | null;
        created_at: Date | null;
        school_yr: string | null;
    }, ExtArgs["result"]["unit7_buildings_demolition"]>;
    composites: {};
};
export type unit7_buildings_demolitionGetPayload<S extends boolean | null | undefined | unit7_buildings_demolitionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$unit7_buildings_demolitionPayload, S>;
export type unit7_buildings_demolitionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<unit7_buildings_demolitionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Unit7_buildings_demolitionCountAggregateInputType | true;
};
export interface unit7_buildings_demolitionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['unit7_buildings_demolition'];
        meta: {
            name: 'unit7_buildings_demolition';
        };
    };
    findUnique<T extends unit7_buildings_demolitionFindUniqueArgs>(args: Prisma.SelectSubset<T, unit7_buildings_demolitionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__unit7_buildings_demolitionClient<runtime.Types.Result.GetResult<Prisma.$unit7_buildings_demolitionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends unit7_buildings_demolitionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, unit7_buildings_demolitionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__unit7_buildings_demolitionClient<runtime.Types.Result.GetResult<Prisma.$unit7_buildings_demolitionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends unit7_buildings_demolitionFindFirstArgs>(args?: Prisma.SelectSubset<T, unit7_buildings_demolitionFindFirstArgs<ExtArgs>>): Prisma.Prisma__unit7_buildings_demolitionClient<runtime.Types.Result.GetResult<Prisma.$unit7_buildings_demolitionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends unit7_buildings_demolitionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, unit7_buildings_demolitionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__unit7_buildings_demolitionClient<runtime.Types.Result.GetResult<Prisma.$unit7_buildings_demolitionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends unit7_buildings_demolitionFindManyArgs>(args?: Prisma.SelectSubset<T, unit7_buildings_demolitionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$unit7_buildings_demolitionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends unit7_buildings_demolitionCreateArgs>(args: Prisma.SelectSubset<T, unit7_buildings_demolitionCreateArgs<ExtArgs>>): Prisma.Prisma__unit7_buildings_demolitionClient<runtime.Types.Result.GetResult<Prisma.$unit7_buildings_demolitionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends unit7_buildings_demolitionCreateManyArgs>(args?: Prisma.SelectSubset<T, unit7_buildings_demolitionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends unit7_buildings_demolitionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, unit7_buildings_demolitionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$unit7_buildings_demolitionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends unit7_buildings_demolitionDeleteArgs>(args: Prisma.SelectSubset<T, unit7_buildings_demolitionDeleteArgs<ExtArgs>>): Prisma.Prisma__unit7_buildings_demolitionClient<runtime.Types.Result.GetResult<Prisma.$unit7_buildings_demolitionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends unit7_buildings_demolitionUpdateArgs>(args: Prisma.SelectSubset<T, unit7_buildings_demolitionUpdateArgs<ExtArgs>>): Prisma.Prisma__unit7_buildings_demolitionClient<runtime.Types.Result.GetResult<Prisma.$unit7_buildings_demolitionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends unit7_buildings_demolitionDeleteManyArgs>(args?: Prisma.SelectSubset<T, unit7_buildings_demolitionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends unit7_buildings_demolitionUpdateManyArgs>(args: Prisma.SelectSubset<T, unit7_buildings_demolitionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends unit7_buildings_demolitionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, unit7_buildings_demolitionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$unit7_buildings_demolitionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends unit7_buildings_demolitionUpsertArgs>(args: Prisma.SelectSubset<T, unit7_buildings_demolitionUpsertArgs<ExtArgs>>): Prisma.Prisma__unit7_buildings_demolitionClient<runtime.Types.Result.GetResult<Prisma.$unit7_buildings_demolitionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends unit7_buildings_demolitionCountArgs>(args?: Prisma.Subset<T, unit7_buildings_demolitionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Unit7_buildings_demolitionCountAggregateOutputType> : number>;
    aggregate<T extends Unit7_buildings_demolitionAggregateArgs>(args: Prisma.Subset<T, Unit7_buildings_demolitionAggregateArgs>): Prisma.PrismaPromise<GetUnit7_buildings_demolitionAggregateType<T>>;
    groupBy<T extends unit7_buildings_demolitionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: unit7_buildings_demolitionGroupByArgs['orderBy'];
    } : {
        orderBy?: unit7_buildings_demolitionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, unit7_buildings_demolitionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUnit7_buildings_demolitionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: unit7_buildings_demolitionFieldRefs;
}
export interface Prisma__unit7_buildings_demolitionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface unit7_buildings_demolitionFieldRefs {
    readonly id: Prisma.FieldRef<"unit7_buildings_demolition", 'Int'>;
    readonly school_id: Prisma.FieldRef<"unit7_buildings_demolition", 'String'>;
    readonly iern: Prisma.FieldRef<"unit7_buildings_demolition", 'String'>;
    readonly building_name: Prisma.FieldRef<"unit7_buildings_demolition", 'String'>;
    readonly room_name: Prisma.FieldRef<"unit7_buildings_demolition", 'String'>;
    readonly age: Prisma.FieldRef<"unit7_buildings_demolition", 'Boolean'>;
    readonly safety: Prisma.FieldRef<"unit7_buildings_demolition", 'Boolean'>;
    readonly calamity: Prisma.FieldRef<"unit7_buildings_demolition", 'Boolean'>;
    readonly upgrade: Prisma.FieldRef<"unit7_buildings_demolition", 'Boolean'>;
    readonly less_than_7x9: Prisma.FieldRef<"unit7_buildings_demolition", 'Int'>;
    readonly x9: Prisma.FieldRef<"unit7_buildings_demolition", 'Int'>;
    readonly above_7x9: Prisma.FieldRef<"unit7_buildings_demolition", 'Int'>;
    readonly created_at: Prisma.FieldRef<"unit7_buildings_demolition", 'DateTime'>;
    readonly school_yr: Prisma.FieldRef<"unit7_buildings_demolition", 'String'>;
}
export type unit7_buildings_demolitionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_demolitionSelect<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_demolitionOmit<ExtArgs> | null;
    where: Prisma.unit7_buildings_demolitionWhereUniqueInput;
};
export type unit7_buildings_demolitionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_demolitionSelect<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_demolitionOmit<ExtArgs> | null;
    where: Prisma.unit7_buildings_demolitionWhereUniqueInput;
};
export type unit7_buildings_demolitionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_demolitionSelect<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_demolitionOmit<ExtArgs> | null;
    where?: Prisma.unit7_buildings_demolitionWhereInput;
    orderBy?: Prisma.unit7_buildings_demolitionOrderByWithRelationInput | Prisma.unit7_buildings_demolitionOrderByWithRelationInput[];
    cursor?: Prisma.unit7_buildings_demolitionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Unit7_buildings_demolitionScalarFieldEnum | Prisma.Unit7_buildings_demolitionScalarFieldEnum[];
};
export type unit7_buildings_demolitionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_demolitionSelect<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_demolitionOmit<ExtArgs> | null;
    where?: Prisma.unit7_buildings_demolitionWhereInput;
    orderBy?: Prisma.unit7_buildings_demolitionOrderByWithRelationInput | Prisma.unit7_buildings_demolitionOrderByWithRelationInput[];
    cursor?: Prisma.unit7_buildings_demolitionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Unit7_buildings_demolitionScalarFieldEnum | Prisma.Unit7_buildings_demolitionScalarFieldEnum[];
};
export type unit7_buildings_demolitionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_demolitionSelect<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_demolitionOmit<ExtArgs> | null;
    where?: Prisma.unit7_buildings_demolitionWhereInput;
    orderBy?: Prisma.unit7_buildings_demolitionOrderByWithRelationInput | Prisma.unit7_buildings_demolitionOrderByWithRelationInput[];
    cursor?: Prisma.unit7_buildings_demolitionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Unit7_buildings_demolitionScalarFieldEnum | Prisma.Unit7_buildings_demolitionScalarFieldEnum[];
};
export type unit7_buildings_demolitionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_demolitionSelect<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_demolitionOmit<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.unit7_buildings_demolitionCreateInput, Prisma.unit7_buildings_demolitionUncheckedCreateInput>;
};
export type unit7_buildings_demolitionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.unit7_buildings_demolitionCreateManyInput | Prisma.unit7_buildings_demolitionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type unit7_buildings_demolitionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_demolitionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_demolitionOmit<ExtArgs> | null;
    data: Prisma.unit7_buildings_demolitionCreateManyInput | Prisma.unit7_buildings_demolitionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type unit7_buildings_demolitionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_demolitionSelect<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_demolitionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.unit7_buildings_demolitionUpdateInput, Prisma.unit7_buildings_demolitionUncheckedUpdateInput>;
    where: Prisma.unit7_buildings_demolitionWhereUniqueInput;
};
export type unit7_buildings_demolitionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.unit7_buildings_demolitionUpdateManyMutationInput, Prisma.unit7_buildings_demolitionUncheckedUpdateManyInput>;
    where?: Prisma.unit7_buildings_demolitionWhereInput;
    limit?: number;
};
export type unit7_buildings_demolitionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_demolitionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_demolitionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.unit7_buildings_demolitionUpdateManyMutationInput, Prisma.unit7_buildings_demolitionUncheckedUpdateManyInput>;
    where?: Prisma.unit7_buildings_demolitionWhereInput;
    limit?: number;
};
export type unit7_buildings_demolitionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_demolitionSelect<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_demolitionOmit<ExtArgs> | null;
    where: Prisma.unit7_buildings_demolitionWhereUniqueInput;
    create: Prisma.XOR<Prisma.unit7_buildings_demolitionCreateInput, Prisma.unit7_buildings_demolitionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.unit7_buildings_demolitionUpdateInput, Prisma.unit7_buildings_demolitionUncheckedUpdateInput>;
};
export type unit7_buildings_demolitionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_demolitionSelect<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_demolitionOmit<ExtArgs> | null;
    where: Prisma.unit7_buildings_demolitionWhereUniqueInput;
};
export type unit7_buildings_demolitionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.unit7_buildings_demolitionWhereInput;
    limit?: number;
};
export type unit7_buildings_demolitionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_buildings_demolitionSelect<ExtArgs> | null;
    omit?: Prisma.unit7_buildings_demolitionOmit<ExtArgs> | null;
};
