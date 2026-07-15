import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type facility_repairsModel = runtime.Types.Result.DefaultSelection<Prisma.$facility_repairsPayload>;
export type AggregateFacility_repairs = {
    _count: Facility_repairsCountAggregateOutputType | null;
    _avg: Facility_repairsAvgAggregateOutputType | null;
    _sum: Facility_repairsSumAggregateOutputType | null;
    _min: Facility_repairsMinAggregateOutputType | null;
    _max: Facility_repairsMaxAggregateOutputType | null;
};
export type Facility_repairsAvgAggregateOutputType = {
    repair_id: number | null;
};
export type Facility_repairsSumAggregateOutputType = {
    repair_id: number | null;
};
export type Facility_repairsMinAggregateOutputType = {
    repair_id: number | null;
    school_id: string | null;
    iern: string | null;
    building_no: string | null;
    remarks: string | null;
    created_at: Date | null;
    repair_roofing: boolean | null;
    repair_ceiling_ext: boolean | null;
    repair_ceiling_int: boolean | null;
    repair_wall_ext: boolean | null;
    repair_partition: boolean | null;
    repair_door: boolean | null;
    repair_windows: boolean | null;
    repair_flooring: boolean | null;
    repair_structural: boolean | null;
};
export type Facility_repairsMaxAggregateOutputType = {
    repair_id: number | null;
    school_id: string | null;
    iern: string | null;
    building_no: string | null;
    remarks: string | null;
    created_at: Date | null;
    repair_roofing: boolean | null;
    repair_ceiling_ext: boolean | null;
    repair_ceiling_int: boolean | null;
    repair_wall_ext: boolean | null;
    repair_partition: boolean | null;
    repair_door: boolean | null;
    repair_windows: boolean | null;
    repair_flooring: boolean | null;
    repair_structural: boolean | null;
};
export type Facility_repairsCountAggregateOutputType = {
    repair_id: number;
    school_id: number;
    iern: number;
    building_no: number;
    remarks: number;
    created_at: number;
    repair_roofing: number;
    repair_ceiling_ext: number;
    repair_ceiling_int: number;
    repair_wall_ext: number;
    repair_partition: number;
    repair_door: number;
    repair_windows: number;
    repair_flooring: number;
    repair_structural: number;
    _all: number;
};
export type Facility_repairsAvgAggregateInputType = {
    repair_id?: true;
};
export type Facility_repairsSumAggregateInputType = {
    repair_id?: true;
};
export type Facility_repairsMinAggregateInputType = {
    repair_id?: true;
    school_id?: true;
    iern?: true;
    building_no?: true;
    remarks?: true;
    created_at?: true;
    repair_roofing?: true;
    repair_ceiling_ext?: true;
    repair_ceiling_int?: true;
    repair_wall_ext?: true;
    repair_partition?: true;
    repair_door?: true;
    repair_windows?: true;
    repair_flooring?: true;
    repair_structural?: true;
};
export type Facility_repairsMaxAggregateInputType = {
    repair_id?: true;
    school_id?: true;
    iern?: true;
    building_no?: true;
    remarks?: true;
    created_at?: true;
    repair_roofing?: true;
    repair_ceiling_ext?: true;
    repair_ceiling_int?: true;
    repair_wall_ext?: true;
    repair_partition?: true;
    repair_door?: true;
    repair_windows?: true;
    repair_flooring?: true;
    repair_structural?: true;
};
export type Facility_repairsCountAggregateInputType = {
    repair_id?: true;
    school_id?: true;
    iern?: true;
    building_no?: true;
    remarks?: true;
    created_at?: true;
    repair_roofing?: true;
    repair_ceiling_ext?: true;
    repair_ceiling_int?: true;
    repair_wall_ext?: true;
    repair_partition?: true;
    repair_door?: true;
    repair_windows?: true;
    repair_flooring?: true;
    repair_structural?: true;
    _all?: true;
};
export type Facility_repairsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.facility_repairsWhereInput;
    orderBy?: Prisma.facility_repairsOrderByWithRelationInput | Prisma.facility_repairsOrderByWithRelationInput[];
    cursor?: Prisma.facility_repairsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Facility_repairsCountAggregateInputType;
    _avg?: Facility_repairsAvgAggregateInputType;
    _sum?: Facility_repairsSumAggregateInputType;
    _min?: Facility_repairsMinAggregateInputType;
    _max?: Facility_repairsMaxAggregateInputType;
};
export type GetFacility_repairsAggregateType<T extends Facility_repairsAggregateArgs> = {
    [P in keyof T & keyof AggregateFacility_repairs]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFacility_repairs[P]> : Prisma.GetScalarType<T[P], AggregateFacility_repairs[P]>;
};
export type facility_repairsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.facility_repairsWhereInput;
    orderBy?: Prisma.facility_repairsOrderByWithAggregationInput | Prisma.facility_repairsOrderByWithAggregationInput[];
    by: Prisma.Facility_repairsScalarFieldEnum[] | Prisma.Facility_repairsScalarFieldEnum;
    having?: Prisma.facility_repairsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Facility_repairsCountAggregateInputType | true;
    _avg?: Facility_repairsAvgAggregateInputType;
    _sum?: Facility_repairsSumAggregateInputType;
    _min?: Facility_repairsMinAggregateInputType;
    _max?: Facility_repairsMaxAggregateInputType;
};
export type Facility_repairsGroupByOutputType = {
    repair_id: number;
    school_id: string | null;
    iern: string | null;
    building_no: string | null;
    remarks: string | null;
    created_at: Date | null;
    repair_roofing: boolean | null;
    repair_ceiling_ext: boolean | null;
    repair_ceiling_int: boolean | null;
    repair_wall_ext: boolean | null;
    repair_partition: boolean | null;
    repair_door: boolean | null;
    repair_windows: boolean | null;
    repair_flooring: boolean | null;
    repair_structural: boolean | null;
    _count: Facility_repairsCountAggregateOutputType | null;
    _avg: Facility_repairsAvgAggregateOutputType | null;
    _sum: Facility_repairsSumAggregateOutputType | null;
    _min: Facility_repairsMinAggregateOutputType | null;
    _max: Facility_repairsMaxAggregateOutputType | null;
};
export type GetFacility_repairsGroupByPayload<T extends facility_repairsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Facility_repairsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Facility_repairsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Facility_repairsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Facility_repairsGroupByOutputType[P]>;
}>>;
export type facility_repairsWhereInput = {
    AND?: Prisma.facility_repairsWhereInput | Prisma.facility_repairsWhereInput[];
    OR?: Prisma.facility_repairsWhereInput[];
    NOT?: Prisma.facility_repairsWhereInput | Prisma.facility_repairsWhereInput[];
    repair_id?: Prisma.IntFilter<"facility_repairs"> | number;
    school_id?: Prisma.StringNullableFilter<"facility_repairs"> | string | null;
    iern?: Prisma.StringNullableFilter<"facility_repairs"> | string | null;
    building_no?: Prisma.StringNullableFilter<"facility_repairs"> | string | null;
    remarks?: Prisma.StringNullableFilter<"facility_repairs"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"facility_repairs"> | Date | string | null;
    repair_roofing?: Prisma.BoolNullableFilter<"facility_repairs"> | boolean | null;
    repair_ceiling_ext?: Prisma.BoolNullableFilter<"facility_repairs"> | boolean | null;
    repair_ceiling_int?: Prisma.BoolNullableFilter<"facility_repairs"> | boolean | null;
    repair_wall_ext?: Prisma.BoolNullableFilter<"facility_repairs"> | boolean | null;
    repair_partition?: Prisma.BoolNullableFilter<"facility_repairs"> | boolean | null;
    repair_door?: Prisma.BoolNullableFilter<"facility_repairs"> | boolean | null;
    repair_windows?: Prisma.BoolNullableFilter<"facility_repairs"> | boolean | null;
    repair_flooring?: Prisma.BoolNullableFilter<"facility_repairs"> | boolean | null;
    repair_structural?: Prisma.BoolNullableFilter<"facility_repairs"> | boolean | null;
};
export type facility_repairsOrderByWithRelationInput = {
    repair_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    iern?: Prisma.SortOrderInput | Prisma.SortOrder;
    building_no?: Prisma.SortOrderInput | Prisma.SortOrder;
    remarks?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    repair_roofing?: Prisma.SortOrderInput | Prisma.SortOrder;
    repair_ceiling_ext?: Prisma.SortOrderInput | Prisma.SortOrder;
    repair_ceiling_int?: Prisma.SortOrderInput | Prisma.SortOrder;
    repair_wall_ext?: Prisma.SortOrderInput | Prisma.SortOrder;
    repair_partition?: Prisma.SortOrderInput | Prisma.SortOrder;
    repair_door?: Prisma.SortOrderInput | Prisma.SortOrder;
    repair_windows?: Prisma.SortOrderInput | Prisma.SortOrder;
    repair_flooring?: Prisma.SortOrderInput | Prisma.SortOrder;
    repair_structural?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type facility_repairsWhereUniqueInput = Prisma.AtLeast<{
    repair_id?: number;
    AND?: Prisma.facility_repairsWhereInput | Prisma.facility_repairsWhereInput[];
    OR?: Prisma.facility_repairsWhereInput[];
    NOT?: Prisma.facility_repairsWhereInput | Prisma.facility_repairsWhereInput[];
    school_id?: Prisma.StringNullableFilter<"facility_repairs"> | string | null;
    iern?: Prisma.StringNullableFilter<"facility_repairs"> | string | null;
    building_no?: Prisma.StringNullableFilter<"facility_repairs"> | string | null;
    remarks?: Prisma.StringNullableFilter<"facility_repairs"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"facility_repairs"> | Date | string | null;
    repair_roofing?: Prisma.BoolNullableFilter<"facility_repairs"> | boolean | null;
    repair_ceiling_ext?: Prisma.BoolNullableFilter<"facility_repairs"> | boolean | null;
    repair_ceiling_int?: Prisma.BoolNullableFilter<"facility_repairs"> | boolean | null;
    repair_wall_ext?: Prisma.BoolNullableFilter<"facility_repairs"> | boolean | null;
    repair_partition?: Prisma.BoolNullableFilter<"facility_repairs"> | boolean | null;
    repair_door?: Prisma.BoolNullableFilter<"facility_repairs"> | boolean | null;
    repair_windows?: Prisma.BoolNullableFilter<"facility_repairs"> | boolean | null;
    repair_flooring?: Prisma.BoolNullableFilter<"facility_repairs"> | boolean | null;
    repair_structural?: Prisma.BoolNullableFilter<"facility_repairs"> | boolean | null;
}, "repair_id">;
export type facility_repairsOrderByWithAggregationInput = {
    repair_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    iern?: Prisma.SortOrderInput | Prisma.SortOrder;
    building_no?: Prisma.SortOrderInput | Prisma.SortOrder;
    remarks?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    repair_roofing?: Prisma.SortOrderInput | Prisma.SortOrder;
    repair_ceiling_ext?: Prisma.SortOrderInput | Prisma.SortOrder;
    repair_ceiling_int?: Prisma.SortOrderInput | Prisma.SortOrder;
    repair_wall_ext?: Prisma.SortOrderInput | Prisma.SortOrder;
    repair_partition?: Prisma.SortOrderInput | Prisma.SortOrder;
    repair_door?: Prisma.SortOrderInput | Prisma.SortOrder;
    repair_windows?: Prisma.SortOrderInput | Prisma.SortOrder;
    repair_flooring?: Prisma.SortOrderInput | Prisma.SortOrder;
    repair_structural?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.facility_repairsCountOrderByAggregateInput;
    _avg?: Prisma.facility_repairsAvgOrderByAggregateInput;
    _max?: Prisma.facility_repairsMaxOrderByAggregateInput;
    _min?: Prisma.facility_repairsMinOrderByAggregateInput;
    _sum?: Prisma.facility_repairsSumOrderByAggregateInput;
};
export type facility_repairsScalarWhereWithAggregatesInput = {
    AND?: Prisma.facility_repairsScalarWhereWithAggregatesInput | Prisma.facility_repairsScalarWhereWithAggregatesInput[];
    OR?: Prisma.facility_repairsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.facility_repairsScalarWhereWithAggregatesInput | Prisma.facility_repairsScalarWhereWithAggregatesInput[];
    repair_id?: Prisma.IntWithAggregatesFilter<"facility_repairs"> | number;
    school_id?: Prisma.StringNullableWithAggregatesFilter<"facility_repairs"> | string | null;
    iern?: Prisma.StringNullableWithAggregatesFilter<"facility_repairs"> | string | null;
    building_no?: Prisma.StringNullableWithAggregatesFilter<"facility_repairs"> | string | null;
    remarks?: Prisma.StringNullableWithAggregatesFilter<"facility_repairs"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"facility_repairs"> | Date | string | null;
    repair_roofing?: Prisma.BoolNullableWithAggregatesFilter<"facility_repairs"> | boolean | null;
    repair_ceiling_ext?: Prisma.BoolNullableWithAggregatesFilter<"facility_repairs"> | boolean | null;
    repair_ceiling_int?: Prisma.BoolNullableWithAggregatesFilter<"facility_repairs"> | boolean | null;
    repair_wall_ext?: Prisma.BoolNullableWithAggregatesFilter<"facility_repairs"> | boolean | null;
    repair_partition?: Prisma.BoolNullableWithAggregatesFilter<"facility_repairs"> | boolean | null;
    repair_door?: Prisma.BoolNullableWithAggregatesFilter<"facility_repairs"> | boolean | null;
    repair_windows?: Prisma.BoolNullableWithAggregatesFilter<"facility_repairs"> | boolean | null;
    repair_flooring?: Prisma.BoolNullableWithAggregatesFilter<"facility_repairs"> | boolean | null;
    repair_structural?: Prisma.BoolNullableWithAggregatesFilter<"facility_repairs"> | boolean | null;
};
export type facility_repairsCreateInput = {
    school_id?: string | null;
    iern?: string | null;
    building_no?: string | null;
    remarks?: string | null;
    created_at?: Date | string | null;
    repair_roofing?: boolean | null;
    repair_ceiling_ext?: boolean | null;
    repair_ceiling_int?: boolean | null;
    repair_wall_ext?: boolean | null;
    repair_partition?: boolean | null;
    repair_door?: boolean | null;
    repair_windows?: boolean | null;
    repair_flooring?: boolean | null;
    repair_structural?: boolean | null;
};
export type facility_repairsUncheckedCreateInput = {
    repair_id?: number;
    school_id?: string | null;
    iern?: string | null;
    building_no?: string | null;
    remarks?: string | null;
    created_at?: Date | string | null;
    repair_roofing?: boolean | null;
    repair_ceiling_ext?: boolean | null;
    repair_ceiling_int?: boolean | null;
    repair_wall_ext?: boolean | null;
    repair_partition?: boolean | null;
    repair_door?: boolean | null;
    repair_windows?: boolean | null;
    repair_flooring?: boolean | null;
    repair_structural?: boolean | null;
};
export type facility_repairsUpdateInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    building_no?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repair_roofing?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_ceiling_ext?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_ceiling_int?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_wall_ext?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_partition?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_door?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_windows?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_flooring?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_structural?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
};
export type facility_repairsUncheckedUpdateInput = {
    repair_id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    building_no?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repair_roofing?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_ceiling_ext?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_ceiling_int?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_wall_ext?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_partition?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_door?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_windows?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_flooring?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_structural?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
};
export type facility_repairsCreateManyInput = {
    repair_id?: number;
    school_id?: string | null;
    iern?: string | null;
    building_no?: string | null;
    remarks?: string | null;
    created_at?: Date | string | null;
    repair_roofing?: boolean | null;
    repair_ceiling_ext?: boolean | null;
    repair_ceiling_int?: boolean | null;
    repair_wall_ext?: boolean | null;
    repair_partition?: boolean | null;
    repair_door?: boolean | null;
    repair_windows?: boolean | null;
    repair_flooring?: boolean | null;
    repair_structural?: boolean | null;
};
export type facility_repairsUpdateManyMutationInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    building_no?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repair_roofing?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_ceiling_ext?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_ceiling_int?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_wall_ext?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_partition?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_door?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_windows?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_flooring?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_structural?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
};
export type facility_repairsUncheckedUpdateManyInput = {
    repair_id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    building_no?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repair_roofing?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_ceiling_ext?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_ceiling_int?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_wall_ext?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_partition?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_door?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_windows?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_flooring?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    repair_structural?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
};
export type facility_repairsCountOrderByAggregateInput = {
    repair_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    building_no?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    repair_roofing?: Prisma.SortOrder;
    repair_ceiling_ext?: Prisma.SortOrder;
    repair_ceiling_int?: Prisma.SortOrder;
    repair_wall_ext?: Prisma.SortOrder;
    repair_partition?: Prisma.SortOrder;
    repair_door?: Prisma.SortOrder;
    repair_windows?: Prisma.SortOrder;
    repair_flooring?: Prisma.SortOrder;
    repair_structural?: Prisma.SortOrder;
};
export type facility_repairsAvgOrderByAggregateInput = {
    repair_id?: Prisma.SortOrder;
};
export type facility_repairsMaxOrderByAggregateInput = {
    repair_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    building_no?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    repair_roofing?: Prisma.SortOrder;
    repair_ceiling_ext?: Prisma.SortOrder;
    repair_ceiling_int?: Prisma.SortOrder;
    repair_wall_ext?: Prisma.SortOrder;
    repair_partition?: Prisma.SortOrder;
    repair_door?: Prisma.SortOrder;
    repair_windows?: Prisma.SortOrder;
    repair_flooring?: Prisma.SortOrder;
    repair_structural?: Prisma.SortOrder;
};
export type facility_repairsMinOrderByAggregateInput = {
    repair_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    building_no?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    repair_roofing?: Prisma.SortOrder;
    repair_ceiling_ext?: Prisma.SortOrder;
    repair_ceiling_int?: Prisma.SortOrder;
    repair_wall_ext?: Prisma.SortOrder;
    repair_partition?: Prisma.SortOrder;
    repair_door?: Prisma.SortOrder;
    repair_windows?: Prisma.SortOrder;
    repair_flooring?: Prisma.SortOrder;
    repair_structural?: Prisma.SortOrder;
};
export type facility_repairsSumOrderByAggregateInput = {
    repair_id?: Prisma.SortOrder;
};
export type facility_repairsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    repair_id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    building_no?: boolean;
    remarks?: boolean;
    created_at?: boolean;
    repair_roofing?: boolean;
    repair_ceiling_ext?: boolean;
    repair_ceiling_int?: boolean;
    repair_wall_ext?: boolean;
    repair_partition?: boolean;
    repair_door?: boolean;
    repair_windows?: boolean;
    repair_flooring?: boolean;
    repair_structural?: boolean;
}, ExtArgs["result"]["facility_repairs"]>;
export type facility_repairsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    repair_id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    building_no?: boolean;
    remarks?: boolean;
    created_at?: boolean;
    repair_roofing?: boolean;
    repair_ceiling_ext?: boolean;
    repair_ceiling_int?: boolean;
    repair_wall_ext?: boolean;
    repair_partition?: boolean;
    repair_door?: boolean;
    repair_windows?: boolean;
    repair_flooring?: boolean;
    repair_structural?: boolean;
}, ExtArgs["result"]["facility_repairs"]>;
export type facility_repairsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    repair_id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    building_no?: boolean;
    remarks?: boolean;
    created_at?: boolean;
    repair_roofing?: boolean;
    repair_ceiling_ext?: boolean;
    repair_ceiling_int?: boolean;
    repair_wall_ext?: boolean;
    repair_partition?: boolean;
    repair_door?: boolean;
    repair_windows?: boolean;
    repair_flooring?: boolean;
    repair_structural?: boolean;
}, ExtArgs["result"]["facility_repairs"]>;
export type facility_repairsSelectScalar = {
    repair_id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    building_no?: boolean;
    remarks?: boolean;
    created_at?: boolean;
    repair_roofing?: boolean;
    repair_ceiling_ext?: boolean;
    repair_ceiling_int?: boolean;
    repair_wall_ext?: boolean;
    repair_partition?: boolean;
    repair_door?: boolean;
    repair_windows?: boolean;
    repair_flooring?: boolean;
    repair_structural?: boolean;
};
export type facility_repairsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"repair_id" | "school_id" | "iern" | "building_no" | "remarks" | "created_at" | "repair_roofing" | "repair_ceiling_ext" | "repair_ceiling_int" | "repair_wall_ext" | "repair_partition" | "repair_door" | "repair_windows" | "repair_flooring" | "repair_structural", ExtArgs["result"]["facility_repairs"]>;
export type $facility_repairsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "facility_repairs";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        repair_id: number;
        school_id: string | null;
        iern: string | null;
        building_no: string | null;
        remarks: string | null;
        created_at: Date | null;
        repair_roofing: boolean | null;
        repair_ceiling_ext: boolean | null;
        repair_ceiling_int: boolean | null;
        repair_wall_ext: boolean | null;
        repair_partition: boolean | null;
        repair_door: boolean | null;
        repair_windows: boolean | null;
        repair_flooring: boolean | null;
        repair_structural: boolean | null;
    }, ExtArgs["result"]["facility_repairs"]>;
    composites: {};
};
export type facility_repairsGetPayload<S extends boolean | null | undefined | facility_repairsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$facility_repairsPayload, S>;
export type facility_repairsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<facility_repairsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Facility_repairsCountAggregateInputType | true;
};
export interface facility_repairsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['facility_repairs'];
        meta: {
            name: 'facility_repairs';
        };
    };
    findUnique<T extends facility_repairsFindUniqueArgs>(args: Prisma.SelectSubset<T, facility_repairsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__facility_repairsClient<runtime.Types.Result.GetResult<Prisma.$facility_repairsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends facility_repairsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, facility_repairsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__facility_repairsClient<runtime.Types.Result.GetResult<Prisma.$facility_repairsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends facility_repairsFindFirstArgs>(args?: Prisma.SelectSubset<T, facility_repairsFindFirstArgs<ExtArgs>>): Prisma.Prisma__facility_repairsClient<runtime.Types.Result.GetResult<Prisma.$facility_repairsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends facility_repairsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, facility_repairsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__facility_repairsClient<runtime.Types.Result.GetResult<Prisma.$facility_repairsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends facility_repairsFindManyArgs>(args?: Prisma.SelectSubset<T, facility_repairsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$facility_repairsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends facility_repairsCreateArgs>(args: Prisma.SelectSubset<T, facility_repairsCreateArgs<ExtArgs>>): Prisma.Prisma__facility_repairsClient<runtime.Types.Result.GetResult<Prisma.$facility_repairsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends facility_repairsCreateManyArgs>(args?: Prisma.SelectSubset<T, facility_repairsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends facility_repairsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, facility_repairsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$facility_repairsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends facility_repairsDeleteArgs>(args: Prisma.SelectSubset<T, facility_repairsDeleteArgs<ExtArgs>>): Prisma.Prisma__facility_repairsClient<runtime.Types.Result.GetResult<Prisma.$facility_repairsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends facility_repairsUpdateArgs>(args: Prisma.SelectSubset<T, facility_repairsUpdateArgs<ExtArgs>>): Prisma.Prisma__facility_repairsClient<runtime.Types.Result.GetResult<Prisma.$facility_repairsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends facility_repairsDeleteManyArgs>(args?: Prisma.SelectSubset<T, facility_repairsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends facility_repairsUpdateManyArgs>(args: Prisma.SelectSubset<T, facility_repairsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends facility_repairsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, facility_repairsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$facility_repairsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends facility_repairsUpsertArgs>(args: Prisma.SelectSubset<T, facility_repairsUpsertArgs<ExtArgs>>): Prisma.Prisma__facility_repairsClient<runtime.Types.Result.GetResult<Prisma.$facility_repairsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends facility_repairsCountArgs>(args?: Prisma.Subset<T, facility_repairsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Facility_repairsCountAggregateOutputType> : number>;
    aggregate<T extends Facility_repairsAggregateArgs>(args: Prisma.Subset<T, Facility_repairsAggregateArgs>): Prisma.PrismaPromise<GetFacility_repairsAggregateType<T>>;
    groupBy<T extends facility_repairsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: facility_repairsGroupByArgs['orderBy'];
    } : {
        orderBy?: facility_repairsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, facility_repairsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFacility_repairsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: facility_repairsFieldRefs;
}
export interface Prisma__facility_repairsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface facility_repairsFieldRefs {
    readonly repair_id: Prisma.FieldRef<"facility_repairs", 'Int'>;
    readonly school_id: Prisma.FieldRef<"facility_repairs", 'String'>;
    readonly iern: Prisma.FieldRef<"facility_repairs", 'String'>;
    readonly building_no: Prisma.FieldRef<"facility_repairs", 'String'>;
    readonly remarks: Prisma.FieldRef<"facility_repairs", 'String'>;
    readonly created_at: Prisma.FieldRef<"facility_repairs", 'DateTime'>;
    readonly repair_roofing: Prisma.FieldRef<"facility_repairs", 'Boolean'>;
    readonly repair_ceiling_ext: Prisma.FieldRef<"facility_repairs", 'Boolean'>;
    readonly repair_ceiling_int: Prisma.FieldRef<"facility_repairs", 'Boolean'>;
    readonly repair_wall_ext: Prisma.FieldRef<"facility_repairs", 'Boolean'>;
    readonly repair_partition: Prisma.FieldRef<"facility_repairs", 'Boolean'>;
    readonly repair_door: Prisma.FieldRef<"facility_repairs", 'Boolean'>;
    readonly repair_windows: Prisma.FieldRef<"facility_repairs", 'Boolean'>;
    readonly repair_flooring: Prisma.FieldRef<"facility_repairs", 'Boolean'>;
    readonly repair_structural: Prisma.FieldRef<"facility_repairs", 'Boolean'>;
}
export type facility_repairsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_repairsSelect<ExtArgs> | null;
    omit?: Prisma.facility_repairsOmit<ExtArgs> | null;
    where: Prisma.facility_repairsWhereUniqueInput;
};
export type facility_repairsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_repairsSelect<ExtArgs> | null;
    omit?: Prisma.facility_repairsOmit<ExtArgs> | null;
    where: Prisma.facility_repairsWhereUniqueInput;
};
export type facility_repairsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_repairsSelect<ExtArgs> | null;
    omit?: Prisma.facility_repairsOmit<ExtArgs> | null;
    where?: Prisma.facility_repairsWhereInput;
    orderBy?: Prisma.facility_repairsOrderByWithRelationInput | Prisma.facility_repairsOrderByWithRelationInput[];
    cursor?: Prisma.facility_repairsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Facility_repairsScalarFieldEnum | Prisma.Facility_repairsScalarFieldEnum[];
};
export type facility_repairsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_repairsSelect<ExtArgs> | null;
    omit?: Prisma.facility_repairsOmit<ExtArgs> | null;
    where?: Prisma.facility_repairsWhereInput;
    orderBy?: Prisma.facility_repairsOrderByWithRelationInput | Prisma.facility_repairsOrderByWithRelationInput[];
    cursor?: Prisma.facility_repairsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Facility_repairsScalarFieldEnum | Prisma.Facility_repairsScalarFieldEnum[];
};
export type facility_repairsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_repairsSelect<ExtArgs> | null;
    omit?: Prisma.facility_repairsOmit<ExtArgs> | null;
    where?: Prisma.facility_repairsWhereInput;
    orderBy?: Prisma.facility_repairsOrderByWithRelationInput | Prisma.facility_repairsOrderByWithRelationInput[];
    cursor?: Prisma.facility_repairsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Facility_repairsScalarFieldEnum | Prisma.Facility_repairsScalarFieldEnum[];
};
export type facility_repairsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_repairsSelect<ExtArgs> | null;
    omit?: Prisma.facility_repairsOmit<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.facility_repairsCreateInput, Prisma.facility_repairsUncheckedCreateInput>;
};
export type facility_repairsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.facility_repairsCreateManyInput | Prisma.facility_repairsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type facility_repairsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_repairsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.facility_repairsOmit<ExtArgs> | null;
    data: Prisma.facility_repairsCreateManyInput | Prisma.facility_repairsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type facility_repairsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_repairsSelect<ExtArgs> | null;
    omit?: Prisma.facility_repairsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.facility_repairsUpdateInput, Prisma.facility_repairsUncheckedUpdateInput>;
    where: Prisma.facility_repairsWhereUniqueInput;
};
export type facility_repairsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.facility_repairsUpdateManyMutationInput, Prisma.facility_repairsUncheckedUpdateManyInput>;
    where?: Prisma.facility_repairsWhereInput;
    limit?: number;
};
export type facility_repairsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_repairsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.facility_repairsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.facility_repairsUpdateManyMutationInput, Prisma.facility_repairsUncheckedUpdateManyInput>;
    where?: Prisma.facility_repairsWhereInput;
    limit?: number;
};
export type facility_repairsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_repairsSelect<ExtArgs> | null;
    omit?: Prisma.facility_repairsOmit<ExtArgs> | null;
    where: Prisma.facility_repairsWhereUniqueInput;
    create: Prisma.XOR<Prisma.facility_repairsCreateInput, Prisma.facility_repairsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.facility_repairsUpdateInput, Prisma.facility_repairsUncheckedUpdateInput>;
};
export type facility_repairsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_repairsSelect<ExtArgs> | null;
    omit?: Prisma.facility_repairsOmit<ExtArgs> | null;
    where: Prisma.facility_repairsWhereUniqueInput;
};
export type facility_repairsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.facility_repairsWhereInput;
    limit?: number;
};
export type facility_repairsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_repairsSelect<ExtArgs> | null;
    omit?: Prisma.facility_repairsOmit<ExtArgs> | null;
};
