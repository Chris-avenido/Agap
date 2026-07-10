import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type unit7_facilitiesModel = runtime.Types.Result.DefaultSelection<Prisma.$unit7_facilitiesPayload>;
export type AggregateUnit7_facilities = {
    _count: Unit7_facilitiesCountAggregateOutputType | null;
    _avg: Unit7_facilitiesAvgAggregateOutputType | null;
    _sum: Unit7_facilitiesSumAggregateOutputType | null;
    _min: Unit7_facilitiesMinAggregateOutputType | null;
    _max: Unit7_facilitiesMaxAggregateOutputType | null;
};
export type Unit7_facilitiesAvgAggregateOutputType = {
    unit7: number | null;
    unit7_no_buildings: number | null;
    unit7_no_rooms: number | null;
    unit7_no_buildable_space: number | null;
    unit7_no_repair_rooms: number | null;
    unit7_no_demolition: number | null;
};
export type Unit7_facilitiesSumAggregateOutputType = {
    unit7: number | null;
    unit7_no_buildings: number | null;
    unit7_no_rooms: number | null;
    unit7_no_buildable_space: number | null;
    unit7_no_repair_rooms: number | null;
    unit7_no_demolition: number | null;
};
export type Unit7_facilitiesMinAggregateOutputType = {
    iern: string | null;
    school_id: string | null;
    unit7: number | null;
    unit7_completed: boolean | null;
    unit7_updated_at: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
    unit7_no_buildings: number | null;
    unit7_no_rooms: number | null;
    unit7_has_buildable_space: boolean | null;
    unit7_no_buildable_space: number | null;
    unit7_no_repair_rooms: number | null;
    unit7_no_demolition: number | null;
    school_yr: string | null;
};
export type Unit7_facilitiesMaxAggregateOutputType = {
    iern: string | null;
    school_id: string | null;
    unit7: number | null;
    unit7_completed: boolean | null;
    unit7_updated_at: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
    unit7_no_buildings: number | null;
    unit7_no_rooms: number | null;
    unit7_has_buildable_space: boolean | null;
    unit7_no_buildable_space: number | null;
    unit7_no_repair_rooms: number | null;
    unit7_no_demolition: number | null;
    school_yr: string | null;
};
export type Unit7_facilitiesCountAggregateOutputType = {
    iern: number;
    school_id: number;
    unit7: number;
    unit7_completed: number;
    unit7_updated_at: number;
    created_at: number;
    updated_at: number;
    unit7_no_buildings: number;
    unit7_no_rooms: number;
    unit7_has_buildable_space: number;
    unit7_no_buildable_space: number;
    unit7_no_repair_rooms: number;
    unit7_no_demolition: number;
    school_yr: number;
    _all: number;
};
export type Unit7_facilitiesAvgAggregateInputType = {
    unit7?: true;
    unit7_no_buildings?: true;
    unit7_no_rooms?: true;
    unit7_no_buildable_space?: true;
    unit7_no_repair_rooms?: true;
    unit7_no_demolition?: true;
};
export type Unit7_facilitiesSumAggregateInputType = {
    unit7?: true;
    unit7_no_buildings?: true;
    unit7_no_rooms?: true;
    unit7_no_buildable_space?: true;
    unit7_no_repair_rooms?: true;
    unit7_no_demolition?: true;
};
export type Unit7_facilitiesMinAggregateInputType = {
    iern?: true;
    school_id?: true;
    unit7?: true;
    unit7_completed?: true;
    unit7_updated_at?: true;
    created_at?: true;
    updated_at?: true;
    unit7_no_buildings?: true;
    unit7_no_rooms?: true;
    unit7_has_buildable_space?: true;
    unit7_no_buildable_space?: true;
    unit7_no_repair_rooms?: true;
    unit7_no_demolition?: true;
    school_yr?: true;
};
export type Unit7_facilitiesMaxAggregateInputType = {
    iern?: true;
    school_id?: true;
    unit7?: true;
    unit7_completed?: true;
    unit7_updated_at?: true;
    created_at?: true;
    updated_at?: true;
    unit7_no_buildings?: true;
    unit7_no_rooms?: true;
    unit7_has_buildable_space?: true;
    unit7_no_buildable_space?: true;
    unit7_no_repair_rooms?: true;
    unit7_no_demolition?: true;
    school_yr?: true;
};
export type Unit7_facilitiesCountAggregateInputType = {
    iern?: true;
    school_id?: true;
    unit7?: true;
    unit7_completed?: true;
    unit7_updated_at?: true;
    created_at?: true;
    updated_at?: true;
    unit7_no_buildings?: true;
    unit7_no_rooms?: true;
    unit7_has_buildable_space?: true;
    unit7_no_buildable_space?: true;
    unit7_no_repair_rooms?: true;
    unit7_no_demolition?: true;
    school_yr?: true;
    _all?: true;
};
export type Unit7_facilitiesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.unit7_facilitiesWhereInput;
    orderBy?: Prisma.unit7_facilitiesOrderByWithRelationInput | Prisma.unit7_facilitiesOrderByWithRelationInput[];
    cursor?: Prisma.unit7_facilitiesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Unit7_facilitiesCountAggregateInputType;
    _avg?: Unit7_facilitiesAvgAggregateInputType;
    _sum?: Unit7_facilitiesSumAggregateInputType;
    _min?: Unit7_facilitiesMinAggregateInputType;
    _max?: Unit7_facilitiesMaxAggregateInputType;
};
export type GetUnit7_facilitiesAggregateType<T extends Unit7_facilitiesAggregateArgs> = {
    [P in keyof T & keyof AggregateUnit7_facilities]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUnit7_facilities[P]> : Prisma.GetScalarType<T[P], AggregateUnit7_facilities[P]>;
};
export type unit7_facilitiesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.unit7_facilitiesWhereInput;
    orderBy?: Prisma.unit7_facilitiesOrderByWithAggregationInput | Prisma.unit7_facilitiesOrderByWithAggregationInput[];
    by: Prisma.Unit7_facilitiesScalarFieldEnum[] | Prisma.Unit7_facilitiesScalarFieldEnum;
    having?: Prisma.unit7_facilitiesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Unit7_facilitiesCountAggregateInputType | true;
    _avg?: Unit7_facilitiesAvgAggregateInputType;
    _sum?: Unit7_facilitiesSumAggregateInputType;
    _min?: Unit7_facilitiesMinAggregateInputType;
    _max?: Unit7_facilitiesMaxAggregateInputType;
};
export type Unit7_facilitiesGroupByOutputType = {
    iern: string;
    school_id: string | null;
    unit7: number | null;
    unit7_completed: boolean | null;
    unit7_updated_at: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
    unit7_no_buildings: number | null;
    unit7_no_rooms: number | null;
    unit7_has_buildable_space: boolean | null;
    unit7_no_buildable_space: number | null;
    unit7_no_repair_rooms: number | null;
    unit7_no_demolition: number | null;
    school_yr: string;
    _count: Unit7_facilitiesCountAggregateOutputType | null;
    _avg: Unit7_facilitiesAvgAggregateOutputType | null;
    _sum: Unit7_facilitiesSumAggregateOutputType | null;
    _min: Unit7_facilitiesMinAggregateOutputType | null;
    _max: Unit7_facilitiesMaxAggregateOutputType | null;
};
export type GetUnit7_facilitiesGroupByPayload<T extends unit7_facilitiesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Unit7_facilitiesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Unit7_facilitiesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Unit7_facilitiesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Unit7_facilitiesGroupByOutputType[P]>;
}>>;
export type unit7_facilitiesWhereInput = {
    AND?: Prisma.unit7_facilitiesWhereInput | Prisma.unit7_facilitiesWhereInput[];
    OR?: Prisma.unit7_facilitiesWhereInput[];
    NOT?: Prisma.unit7_facilitiesWhereInput | Prisma.unit7_facilitiesWhereInput[];
    iern?: Prisma.StringFilter<"unit7_facilities"> | string;
    school_id?: Prisma.StringNullableFilter<"unit7_facilities"> | string | null;
    unit7?: Prisma.IntNullableFilter<"unit7_facilities"> | number | null;
    unit7_completed?: Prisma.BoolNullableFilter<"unit7_facilities"> | boolean | null;
    unit7_updated_at?: Prisma.DateTimeNullableFilter<"unit7_facilities"> | Date | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"unit7_facilities"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"unit7_facilities"> | Date | string | null;
    unit7_no_buildings?: Prisma.IntNullableFilter<"unit7_facilities"> | number | null;
    unit7_no_rooms?: Prisma.IntNullableFilter<"unit7_facilities"> | number | null;
    unit7_has_buildable_space?: Prisma.BoolNullableFilter<"unit7_facilities"> | boolean | null;
    unit7_no_buildable_space?: Prisma.IntNullableFilter<"unit7_facilities"> | number | null;
    unit7_no_repair_rooms?: Prisma.IntNullableFilter<"unit7_facilities"> | number | null;
    unit7_no_demolition?: Prisma.IntNullableFilter<"unit7_facilities"> | number | null;
    school_yr?: Prisma.StringFilter<"unit7_facilities"> | string;
};
export type unit7_facilitiesOrderByWithRelationInput = {
    iern?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    unit7?: Prisma.SortOrderInput | Prisma.SortOrder;
    unit7_completed?: Prisma.SortOrderInput | Prisma.SortOrder;
    unit7_updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    unit7_no_buildings?: Prisma.SortOrderInput | Prisma.SortOrder;
    unit7_no_rooms?: Prisma.SortOrderInput | Prisma.SortOrder;
    unit7_has_buildable_space?: Prisma.SortOrderInput | Prisma.SortOrder;
    unit7_no_buildable_space?: Prisma.SortOrderInput | Prisma.SortOrder;
    unit7_no_repair_rooms?: Prisma.SortOrderInput | Prisma.SortOrder;
    unit7_no_demolition?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_yr?: Prisma.SortOrder;
};
export type unit7_facilitiesWhereUniqueInput = Prisma.AtLeast<{
    school_id_school_yr?: Prisma.unit7_facilitiesSchool_idSchool_yrCompoundUniqueInput;
    iern_school_yr?: Prisma.unit7_facilitiesIernSchool_yrCompoundUniqueInput;
    AND?: Prisma.unit7_facilitiesWhereInput | Prisma.unit7_facilitiesWhereInput[];
    OR?: Prisma.unit7_facilitiesWhereInput[];
    NOT?: Prisma.unit7_facilitiesWhereInput | Prisma.unit7_facilitiesWhereInput[];
    iern?: Prisma.StringFilter<"unit7_facilities"> | string;
    school_id?: Prisma.StringNullableFilter<"unit7_facilities"> | string | null;
    unit7?: Prisma.IntNullableFilter<"unit7_facilities"> | number | null;
    unit7_completed?: Prisma.BoolNullableFilter<"unit7_facilities"> | boolean | null;
    unit7_updated_at?: Prisma.DateTimeNullableFilter<"unit7_facilities"> | Date | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"unit7_facilities"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"unit7_facilities"> | Date | string | null;
    unit7_no_buildings?: Prisma.IntNullableFilter<"unit7_facilities"> | number | null;
    unit7_no_rooms?: Prisma.IntNullableFilter<"unit7_facilities"> | number | null;
    unit7_has_buildable_space?: Prisma.BoolNullableFilter<"unit7_facilities"> | boolean | null;
    unit7_no_buildable_space?: Prisma.IntNullableFilter<"unit7_facilities"> | number | null;
    unit7_no_repair_rooms?: Prisma.IntNullableFilter<"unit7_facilities"> | number | null;
    unit7_no_demolition?: Prisma.IntNullableFilter<"unit7_facilities"> | number | null;
    school_yr?: Prisma.StringFilter<"unit7_facilities"> | string;
}, "iern_school_yr" | "school_id_school_yr">;
export type unit7_facilitiesOrderByWithAggregationInput = {
    iern?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    unit7?: Prisma.SortOrderInput | Prisma.SortOrder;
    unit7_completed?: Prisma.SortOrderInput | Prisma.SortOrder;
    unit7_updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    unit7_no_buildings?: Prisma.SortOrderInput | Prisma.SortOrder;
    unit7_no_rooms?: Prisma.SortOrderInput | Prisma.SortOrder;
    unit7_has_buildable_space?: Prisma.SortOrderInput | Prisma.SortOrder;
    unit7_no_buildable_space?: Prisma.SortOrderInput | Prisma.SortOrder;
    unit7_no_repair_rooms?: Prisma.SortOrderInput | Prisma.SortOrder;
    unit7_no_demolition?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_yr?: Prisma.SortOrder;
    _count?: Prisma.unit7_facilitiesCountOrderByAggregateInput;
    _avg?: Prisma.unit7_facilitiesAvgOrderByAggregateInput;
    _max?: Prisma.unit7_facilitiesMaxOrderByAggregateInput;
    _min?: Prisma.unit7_facilitiesMinOrderByAggregateInput;
    _sum?: Prisma.unit7_facilitiesSumOrderByAggregateInput;
};
export type unit7_facilitiesScalarWhereWithAggregatesInput = {
    AND?: Prisma.unit7_facilitiesScalarWhereWithAggregatesInput | Prisma.unit7_facilitiesScalarWhereWithAggregatesInput[];
    OR?: Prisma.unit7_facilitiesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.unit7_facilitiesScalarWhereWithAggregatesInput | Prisma.unit7_facilitiesScalarWhereWithAggregatesInput[];
    iern?: Prisma.StringWithAggregatesFilter<"unit7_facilities"> | string;
    school_id?: Prisma.StringNullableWithAggregatesFilter<"unit7_facilities"> | string | null;
    unit7?: Prisma.IntNullableWithAggregatesFilter<"unit7_facilities"> | number | null;
    unit7_completed?: Prisma.BoolNullableWithAggregatesFilter<"unit7_facilities"> | boolean | null;
    unit7_updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"unit7_facilities"> | Date | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"unit7_facilities"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"unit7_facilities"> | Date | string | null;
    unit7_no_buildings?: Prisma.IntNullableWithAggregatesFilter<"unit7_facilities"> | number | null;
    unit7_no_rooms?: Prisma.IntNullableWithAggregatesFilter<"unit7_facilities"> | number | null;
    unit7_has_buildable_space?: Prisma.BoolNullableWithAggregatesFilter<"unit7_facilities"> | boolean | null;
    unit7_no_buildable_space?: Prisma.IntNullableWithAggregatesFilter<"unit7_facilities"> | number | null;
    unit7_no_repair_rooms?: Prisma.IntNullableWithAggregatesFilter<"unit7_facilities"> | number | null;
    unit7_no_demolition?: Prisma.IntNullableWithAggregatesFilter<"unit7_facilities"> | number | null;
    school_yr?: Prisma.StringWithAggregatesFilter<"unit7_facilities"> | string;
};
export type unit7_facilitiesCreateInput = {
    iern: string;
    school_id?: string | null;
    unit7?: number | null;
    unit7_completed?: boolean | null;
    unit7_updated_at?: Date | string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    unit7_no_buildings?: number | null;
    unit7_no_rooms?: number | null;
    unit7_has_buildable_space?: boolean | null;
    unit7_no_buildable_space?: number | null;
    unit7_no_repair_rooms?: number | null;
    unit7_no_demolition?: number | null;
    school_yr?: string;
};
export type unit7_facilitiesUncheckedCreateInput = {
    iern: string;
    school_id?: string | null;
    unit7?: number | null;
    unit7_completed?: boolean | null;
    unit7_updated_at?: Date | string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    unit7_no_buildings?: number | null;
    unit7_no_rooms?: number | null;
    unit7_has_buildable_space?: boolean | null;
    unit7_no_buildable_space?: number | null;
    unit7_no_repair_rooms?: number | null;
    unit7_no_demolition?: number | null;
    school_yr?: string;
};
export type unit7_facilitiesUpdateInput = {
    iern?: Prisma.StringFieldUpdateOperationsInput | string;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unit7?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unit7_completed?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    unit7_updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    unit7_no_buildings?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unit7_no_rooms?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unit7_has_buildable_space?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    unit7_no_buildable_space?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unit7_no_repair_rooms?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unit7_no_demolition?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    school_yr?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type unit7_facilitiesUncheckedUpdateInput = {
    iern?: Prisma.StringFieldUpdateOperationsInput | string;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unit7?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unit7_completed?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    unit7_updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    unit7_no_buildings?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unit7_no_rooms?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unit7_has_buildable_space?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    unit7_no_buildable_space?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unit7_no_repair_rooms?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unit7_no_demolition?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    school_yr?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type unit7_facilitiesCreateManyInput = {
    iern: string;
    school_id?: string | null;
    unit7?: number | null;
    unit7_completed?: boolean | null;
    unit7_updated_at?: Date | string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    unit7_no_buildings?: number | null;
    unit7_no_rooms?: number | null;
    unit7_has_buildable_space?: boolean | null;
    unit7_no_buildable_space?: number | null;
    unit7_no_repair_rooms?: number | null;
    unit7_no_demolition?: number | null;
    school_yr?: string;
};
export type unit7_facilitiesUpdateManyMutationInput = {
    iern?: Prisma.StringFieldUpdateOperationsInput | string;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unit7?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unit7_completed?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    unit7_updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    unit7_no_buildings?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unit7_no_rooms?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unit7_has_buildable_space?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    unit7_no_buildable_space?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unit7_no_repair_rooms?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unit7_no_demolition?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    school_yr?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type unit7_facilitiesUncheckedUpdateManyInput = {
    iern?: Prisma.StringFieldUpdateOperationsInput | string;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unit7?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unit7_completed?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    unit7_updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    unit7_no_buildings?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unit7_no_rooms?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unit7_has_buildable_space?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    unit7_no_buildable_space?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unit7_no_repair_rooms?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unit7_no_demolition?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    school_yr?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type unit7_facilitiesSchool_idSchool_yrCompoundUniqueInput = {
    school_id: string;
    school_yr: string;
};
export type unit7_facilitiesIernSchool_yrCompoundUniqueInput = {
    iern: string;
    school_yr: string;
};
export type unit7_facilitiesCountOrderByAggregateInput = {
    iern?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    unit7?: Prisma.SortOrder;
    unit7_completed?: Prisma.SortOrder;
    unit7_updated_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    unit7_no_buildings?: Prisma.SortOrder;
    unit7_no_rooms?: Prisma.SortOrder;
    unit7_has_buildable_space?: Prisma.SortOrder;
    unit7_no_buildable_space?: Prisma.SortOrder;
    unit7_no_repair_rooms?: Prisma.SortOrder;
    unit7_no_demolition?: Prisma.SortOrder;
    school_yr?: Prisma.SortOrder;
};
export type unit7_facilitiesAvgOrderByAggregateInput = {
    unit7?: Prisma.SortOrder;
    unit7_no_buildings?: Prisma.SortOrder;
    unit7_no_rooms?: Prisma.SortOrder;
    unit7_no_buildable_space?: Prisma.SortOrder;
    unit7_no_repair_rooms?: Prisma.SortOrder;
    unit7_no_demolition?: Prisma.SortOrder;
};
export type unit7_facilitiesMaxOrderByAggregateInput = {
    iern?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    unit7?: Prisma.SortOrder;
    unit7_completed?: Prisma.SortOrder;
    unit7_updated_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    unit7_no_buildings?: Prisma.SortOrder;
    unit7_no_rooms?: Prisma.SortOrder;
    unit7_has_buildable_space?: Prisma.SortOrder;
    unit7_no_buildable_space?: Prisma.SortOrder;
    unit7_no_repair_rooms?: Prisma.SortOrder;
    unit7_no_demolition?: Prisma.SortOrder;
    school_yr?: Prisma.SortOrder;
};
export type unit7_facilitiesMinOrderByAggregateInput = {
    iern?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    unit7?: Prisma.SortOrder;
    unit7_completed?: Prisma.SortOrder;
    unit7_updated_at?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    unit7_no_buildings?: Prisma.SortOrder;
    unit7_no_rooms?: Prisma.SortOrder;
    unit7_has_buildable_space?: Prisma.SortOrder;
    unit7_no_buildable_space?: Prisma.SortOrder;
    unit7_no_repair_rooms?: Prisma.SortOrder;
    unit7_no_demolition?: Prisma.SortOrder;
    school_yr?: Prisma.SortOrder;
};
export type unit7_facilitiesSumOrderByAggregateInput = {
    unit7?: Prisma.SortOrder;
    unit7_no_buildings?: Prisma.SortOrder;
    unit7_no_rooms?: Prisma.SortOrder;
    unit7_no_buildable_space?: Prisma.SortOrder;
    unit7_no_repair_rooms?: Prisma.SortOrder;
    unit7_no_demolition?: Prisma.SortOrder;
};
export type unit7_facilitiesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    iern?: boolean;
    school_id?: boolean;
    unit7?: boolean;
    unit7_completed?: boolean;
    unit7_updated_at?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    unit7_no_buildings?: boolean;
    unit7_no_rooms?: boolean;
    unit7_has_buildable_space?: boolean;
    unit7_no_buildable_space?: boolean;
    unit7_no_repair_rooms?: boolean;
    unit7_no_demolition?: boolean;
    school_yr?: boolean;
}, ExtArgs["result"]["unit7_facilities"]>;
export type unit7_facilitiesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    iern?: boolean;
    school_id?: boolean;
    unit7?: boolean;
    unit7_completed?: boolean;
    unit7_updated_at?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    unit7_no_buildings?: boolean;
    unit7_no_rooms?: boolean;
    unit7_has_buildable_space?: boolean;
    unit7_no_buildable_space?: boolean;
    unit7_no_repair_rooms?: boolean;
    unit7_no_demolition?: boolean;
    school_yr?: boolean;
}, ExtArgs["result"]["unit7_facilities"]>;
export type unit7_facilitiesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    iern?: boolean;
    school_id?: boolean;
    unit7?: boolean;
    unit7_completed?: boolean;
    unit7_updated_at?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    unit7_no_buildings?: boolean;
    unit7_no_rooms?: boolean;
    unit7_has_buildable_space?: boolean;
    unit7_no_buildable_space?: boolean;
    unit7_no_repair_rooms?: boolean;
    unit7_no_demolition?: boolean;
    school_yr?: boolean;
}, ExtArgs["result"]["unit7_facilities"]>;
export type unit7_facilitiesSelectScalar = {
    iern?: boolean;
    school_id?: boolean;
    unit7?: boolean;
    unit7_completed?: boolean;
    unit7_updated_at?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    unit7_no_buildings?: boolean;
    unit7_no_rooms?: boolean;
    unit7_has_buildable_space?: boolean;
    unit7_no_buildable_space?: boolean;
    unit7_no_repair_rooms?: boolean;
    unit7_no_demolition?: boolean;
    school_yr?: boolean;
};
export type unit7_facilitiesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"iern" | "school_id" | "unit7" | "unit7_completed" | "unit7_updated_at" | "created_at" | "updated_at" | "unit7_no_buildings" | "unit7_no_rooms" | "unit7_has_buildable_space" | "unit7_no_buildable_space" | "unit7_no_repair_rooms" | "unit7_no_demolition" | "school_yr", ExtArgs["result"]["unit7_facilities"]>;
export type $unit7_facilitiesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "unit7_facilities";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        iern: string;
        school_id: string | null;
        unit7: number | null;
        unit7_completed: boolean | null;
        unit7_updated_at: Date | null;
        created_at: Date | null;
        updated_at: Date | null;
        unit7_no_buildings: number | null;
        unit7_no_rooms: number | null;
        unit7_has_buildable_space: boolean | null;
        unit7_no_buildable_space: number | null;
        unit7_no_repair_rooms: number | null;
        unit7_no_demolition: number | null;
        school_yr: string;
    }, ExtArgs["result"]["unit7_facilities"]>;
    composites: {};
};
export type unit7_facilitiesGetPayload<S extends boolean | null | undefined | unit7_facilitiesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$unit7_facilitiesPayload, S>;
export type unit7_facilitiesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<unit7_facilitiesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Unit7_facilitiesCountAggregateInputType | true;
};
export interface unit7_facilitiesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['unit7_facilities'];
        meta: {
            name: 'unit7_facilities';
        };
    };
    findUnique<T extends unit7_facilitiesFindUniqueArgs>(args: Prisma.SelectSubset<T, unit7_facilitiesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__unit7_facilitiesClient<runtime.Types.Result.GetResult<Prisma.$unit7_facilitiesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends unit7_facilitiesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, unit7_facilitiesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__unit7_facilitiesClient<runtime.Types.Result.GetResult<Prisma.$unit7_facilitiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends unit7_facilitiesFindFirstArgs>(args?: Prisma.SelectSubset<T, unit7_facilitiesFindFirstArgs<ExtArgs>>): Prisma.Prisma__unit7_facilitiesClient<runtime.Types.Result.GetResult<Prisma.$unit7_facilitiesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends unit7_facilitiesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, unit7_facilitiesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__unit7_facilitiesClient<runtime.Types.Result.GetResult<Prisma.$unit7_facilitiesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends unit7_facilitiesFindManyArgs>(args?: Prisma.SelectSubset<T, unit7_facilitiesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$unit7_facilitiesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends unit7_facilitiesCreateArgs>(args: Prisma.SelectSubset<T, unit7_facilitiesCreateArgs<ExtArgs>>): Prisma.Prisma__unit7_facilitiesClient<runtime.Types.Result.GetResult<Prisma.$unit7_facilitiesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends unit7_facilitiesCreateManyArgs>(args?: Prisma.SelectSubset<T, unit7_facilitiesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends unit7_facilitiesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, unit7_facilitiesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$unit7_facilitiesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends unit7_facilitiesDeleteArgs>(args: Prisma.SelectSubset<T, unit7_facilitiesDeleteArgs<ExtArgs>>): Prisma.Prisma__unit7_facilitiesClient<runtime.Types.Result.GetResult<Prisma.$unit7_facilitiesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends unit7_facilitiesUpdateArgs>(args: Prisma.SelectSubset<T, unit7_facilitiesUpdateArgs<ExtArgs>>): Prisma.Prisma__unit7_facilitiesClient<runtime.Types.Result.GetResult<Prisma.$unit7_facilitiesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends unit7_facilitiesDeleteManyArgs>(args?: Prisma.SelectSubset<T, unit7_facilitiesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends unit7_facilitiesUpdateManyArgs>(args: Prisma.SelectSubset<T, unit7_facilitiesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends unit7_facilitiesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, unit7_facilitiesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$unit7_facilitiesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends unit7_facilitiesUpsertArgs>(args: Prisma.SelectSubset<T, unit7_facilitiesUpsertArgs<ExtArgs>>): Prisma.Prisma__unit7_facilitiesClient<runtime.Types.Result.GetResult<Prisma.$unit7_facilitiesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends unit7_facilitiesCountArgs>(args?: Prisma.Subset<T, unit7_facilitiesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Unit7_facilitiesCountAggregateOutputType> : number>;
    aggregate<T extends Unit7_facilitiesAggregateArgs>(args: Prisma.Subset<T, Unit7_facilitiesAggregateArgs>): Prisma.PrismaPromise<GetUnit7_facilitiesAggregateType<T>>;
    groupBy<T extends unit7_facilitiesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: unit7_facilitiesGroupByArgs['orderBy'];
    } : {
        orderBy?: unit7_facilitiesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, unit7_facilitiesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUnit7_facilitiesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: unit7_facilitiesFieldRefs;
}
export interface Prisma__unit7_facilitiesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface unit7_facilitiesFieldRefs {
    readonly iern: Prisma.FieldRef<"unit7_facilities", 'String'>;
    readonly school_id: Prisma.FieldRef<"unit7_facilities", 'String'>;
    readonly unit7: Prisma.FieldRef<"unit7_facilities", 'Int'>;
    readonly unit7_completed: Prisma.FieldRef<"unit7_facilities", 'Boolean'>;
    readonly unit7_updated_at: Prisma.FieldRef<"unit7_facilities", 'DateTime'>;
    readonly created_at: Prisma.FieldRef<"unit7_facilities", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"unit7_facilities", 'DateTime'>;
    readonly unit7_no_buildings: Prisma.FieldRef<"unit7_facilities", 'Int'>;
    readonly unit7_no_rooms: Prisma.FieldRef<"unit7_facilities", 'Int'>;
    readonly unit7_has_buildable_space: Prisma.FieldRef<"unit7_facilities", 'Boolean'>;
    readonly unit7_no_buildable_space: Prisma.FieldRef<"unit7_facilities", 'Int'>;
    readonly unit7_no_repair_rooms: Prisma.FieldRef<"unit7_facilities", 'Int'>;
    readonly unit7_no_demolition: Prisma.FieldRef<"unit7_facilities", 'Int'>;
    readonly school_yr: Prisma.FieldRef<"unit7_facilities", 'String'>;
}
export type unit7_facilitiesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_facilitiesSelect<ExtArgs> | null;
    omit?: Prisma.unit7_facilitiesOmit<ExtArgs> | null;
    where: Prisma.unit7_facilitiesWhereUniqueInput;
};
export type unit7_facilitiesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_facilitiesSelect<ExtArgs> | null;
    omit?: Prisma.unit7_facilitiesOmit<ExtArgs> | null;
    where: Prisma.unit7_facilitiesWhereUniqueInput;
};
export type unit7_facilitiesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_facilitiesSelect<ExtArgs> | null;
    omit?: Prisma.unit7_facilitiesOmit<ExtArgs> | null;
    where?: Prisma.unit7_facilitiesWhereInput;
    orderBy?: Prisma.unit7_facilitiesOrderByWithRelationInput | Prisma.unit7_facilitiesOrderByWithRelationInput[];
    cursor?: Prisma.unit7_facilitiesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Unit7_facilitiesScalarFieldEnum | Prisma.Unit7_facilitiesScalarFieldEnum[];
};
export type unit7_facilitiesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_facilitiesSelect<ExtArgs> | null;
    omit?: Prisma.unit7_facilitiesOmit<ExtArgs> | null;
    where?: Prisma.unit7_facilitiesWhereInput;
    orderBy?: Prisma.unit7_facilitiesOrderByWithRelationInput | Prisma.unit7_facilitiesOrderByWithRelationInput[];
    cursor?: Prisma.unit7_facilitiesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Unit7_facilitiesScalarFieldEnum | Prisma.Unit7_facilitiesScalarFieldEnum[];
};
export type unit7_facilitiesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_facilitiesSelect<ExtArgs> | null;
    omit?: Prisma.unit7_facilitiesOmit<ExtArgs> | null;
    where?: Prisma.unit7_facilitiesWhereInput;
    orderBy?: Prisma.unit7_facilitiesOrderByWithRelationInput | Prisma.unit7_facilitiesOrderByWithRelationInput[];
    cursor?: Prisma.unit7_facilitiesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Unit7_facilitiesScalarFieldEnum | Prisma.Unit7_facilitiesScalarFieldEnum[];
};
export type unit7_facilitiesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_facilitiesSelect<ExtArgs> | null;
    omit?: Prisma.unit7_facilitiesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.unit7_facilitiesCreateInput, Prisma.unit7_facilitiesUncheckedCreateInput>;
};
export type unit7_facilitiesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.unit7_facilitiesCreateManyInput | Prisma.unit7_facilitiesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type unit7_facilitiesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_facilitiesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.unit7_facilitiesOmit<ExtArgs> | null;
    data: Prisma.unit7_facilitiesCreateManyInput | Prisma.unit7_facilitiesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type unit7_facilitiesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_facilitiesSelect<ExtArgs> | null;
    omit?: Prisma.unit7_facilitiesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.unit7_facilitiesUpdateInput, Prisma.unit7_facilitiesUncheckedUpdateInput>;
    where: Prisma.unit7_facilitiesWhereUniqueInput;
};
export type unit7_facilitiesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.unit7_facilitiesUpdateManyMutationInput, Prisma.unit7_facilitiesUncheckedUpdateManyInput>;
    where?: Prisma.unit7_facilitiesWhereInput;
    limit?: number;
};
export type unit7_facilitiesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_facilitiesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.unit7_facilitiesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.unit7_facilitiesUpdateManyMutationInput, Prisma.unit7_facilitiesUncheckedUpdateManyInput>;
    where?: Prisma.unit7_facilitiesWhereInput;
    limit?: number;
};
export type unit7_facilitiesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_facilitiesSelect<ExtArgs> | null;
    omit?: Prisma.unit7_facilitiesOmit<ExtArgs> | null;
    where: Prisma.unit7_facilitiesWhereUniqueInput;
    create: Prisma.XOR<Prisma.unit7_facilitiesCreateInput, Prisma.unit7_facilitiesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.unit7_facilitiesUpdateInput, Prisma.unit7_facilitiesUncheckedUpdateInput>;
};
export type unit7_facilitiesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_facilitiesSelect<ExtArgs> | null;
    omit?: Prisma.unit7_facilitiesOmit<ExtArgs> | null;
    where: Prisma.unit7_facilitiesWhereUniqueInput;
};
export type unit7_facilitiesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.unit7_facilitiesWhereInput;
    limit?: number;
};
export type unit7_facilitiesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_facilitiesSelect<ExtArgs> | null;
    omit?: Prisma.unit7_facilitiesOmit<ExtArgs> | null;
};
