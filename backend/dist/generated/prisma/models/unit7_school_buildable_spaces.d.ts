import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type unit7_school_buildable_spacesModel = runtime.Types.Result.DefaultSelection<Prisma.$unit7_school_buildable_spacesPayload>;
export type AggregateUnit7_school_buildable_spaces = {
    _count: Unit7_school_buildable_spacesCountAggregateOutputType | null;
    _avg: Unit7_school_buildable_spacesAvgAggregateOutputType | null;
    _sum: Unit7_school_buildable_spacesSumAggregateOutputType | null;
    _min: Unit7_school_buildable_spacesMinAggregateOutputType | null;
    _max: Unit7_school_buildable_spacesMaxAggregateOutputType | null;
};
export type Unit7_school_buildable_spacesAvgAggregateOutputType = {
    id: number | null;
    center_lat: runtime.Decimal | null;
    center_lng: runtime.Decimal | null;
    length_m: runtime.Decimal | null;
    width_m: runtime.Decimal | null;
    rotation_deg: runtime.Decimal | null;
    total_area_sqm: runtime.Decimal | null;
};
export type Unit7_school_buildable_spacesSumAggregateOutputType = {
    id: number | null;
    center_lat: runtime.Decimal | null;
    center_lng: runtime.Decimal | null;
    length_m: runtime.Decimal | null;
    width_m: runtime.Decimal | null;
    rotation_deg: runtime.Decimal | null;
    total_area_sqm: runtime.Decimal | null;
};
export type Unit7_school_buildable_spacesMinAggregateOutputType = {
    id: number | null;
    school_id: string | null;
    iern: string | null;
    space_name: string | null;
    center_lat: runtime.Decimal | null;
    center_lng: runtime.Decimal | null;
    length_m: runtime.Decimal | null;
    width_m: runtime.Decimal | null;
    rotation_deg: runtime.Decimal | null;
    total_area_sqm: runtime.Decimal | null;
    created_at: Date | null;
    school_yr: string | null;
};
export type Unit7_school_buildable_spacesMaxAggregateOutputType = {
    id: number | null;
    school_id: string | null;
    iern: string | null;
    space_name: string | null;
    center_lat: runtime.Decimal | null;
    center_lng: runtime.Decimal | null;
    length_m: runtime.Decimal | null;
    width_m: runtime.Decimal | null;
    rotation_deg: runtime.Decimal | null;
    total_area_sqm: runtime.Decimal | null;
    created_at: Date | null;
    school_yr: string | null;
};
export type Unit7_school_buildable_spacesCountAggregateOutputType = {
    id: number;
    school_id: number;
    iern: number;
    space_name: number;
    center_lat: number;
    center_lng: number;
    length_m: number;
    width_m: number;
    rotation_deg: number;
    total_area_sqm: number;
    created_at: number;
    school_yr: number;
    _all: number;
};
export type Unit7_school_buildable_spacesAvgAggregateInputType = {
    id?: true;
    center_lat?: true;
    center_lng?: true;
    length_m?: true;
    width_m?: true;
    rotation_deg?: true;
    total_area_sqm?: true;
};
export type Unit7_school_buildable_spacesSumAggregateInputType = {
    id?: true;
    center_lat?: true;
    center_lng?: true;
    length_m?: true;
    width_m?: true;
    rotation_deg?: true;
    total_area_sqm?: true;
};
export type Unit7_school_buildable_spacesMinAggregateInputType = {
    id?: true;
    school_id?: true;
    iern?: true;
    space_name?: true;
    center_lat?: true;
    center_lng?: true;
    length_m?: true;
    width_m?: true;
    rotation_deg?: true;
    total_area_sqm?: true;
    created_at?: true;
    school_yr?: true;
};
export type Unit7_school_buildable_spacesMaxAggregateInputType = {
    id?: true;
    school_id?: true;
    iern?: true;
    space_name?: true;
    center_lat?: true;
    center_lng?: true;
    length_m?: true;
    width_m?: true;
    rotation_deg?: true;
    total_area_sqm?: true;
    created_at?: true;
    school_yr?: true;
};
export type Unit7_school_buildable_spacesCountAggregateInputType = {
    id?: true;
    school_id?: true;
    iern?: true;
    space_name?: true;
    center_lat?: true;
    center_lng?: true;
    length_m?: true;
    width_m?: true;
    rotation_deg?: true;
    total_area_sqm?: true;
    created_at?: true;
    school_yr?: true;
    _all?: true;
};
export type Unit7_school_buildable_spacesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.unit7_school_buildable_spacesWhereInput;
    orderBy?: Prisma.unit7_school_buildable_spacesOrderByWithRelationInput | Prisma.unit7_school_buildable_spacesOrderByWithRelationInput[];
    cursor?: Prisma.unit7_school_buildable_spacesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Unit7_school_buildable_spacesCountAggregateInputType;
    _avg?: Unit7_school_buildable_spacesAvgAggregateInputType;
    _sum?: Unit7_school_buildable_spacesSumAggregateInputType;
    _min?: Unit7_school_buildable_spacesMinAggregateInputType;
    _max?: Unit7_school_buildable_spacesMaxAggregateInputType;
};
export type GetUnit7_school_buildable_spacesAggregateType<T extends Unit7_school_buildable_spacesAggregateArgs> = {
    [P in keyof T & keyof AggregateUnit7_school_buildable_spaces]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUnit7_school_buildable_spaces[P]> : Prisma.GetScalarType<T[P], AggregateUnit7_school_buildable_spaces[P]>;
};
export type unit7_school_buildable_spacesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.unit7_school_buildable_spacesWhereInput;
    orderBy?: Prisma.unit7_school_buildable_spacesOrderByWithAggregationInput | Prisma.unit7_school_buildable_spacesOrderByWithAggregationInput[];
    by: Prisma.Unit7_school_buildable_spacesScalarFieldEnum[] | Prisma.Unit7_school_buildable_spacesScalarFieldEnum;
    having?: Prisma.unit7_school_buildable_spacesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Unit7_school_buildable_spacesCountAggregateInputType | true;
    _avg?: Unit7_school_buildable_spacesAvgAggregateInputType;
    _sum?: Unit7_school_buildable_spacesSumAggregateInputType;
    _min?: Unit7_school_buildable_spacesMinAggregateInputType;
    _max?: Unit7_school_buildable_spacesMaxAggregateInputType;
};
export type Unit7_school_buildable_spacesGroupByOutputType = {
    id: number;
    school_id: string | null;
    iern: string | null;
    space_name: string | null;
    center_lat: runtime.Decimal | null;
    center_lng: runtime.Decimal | null;
    length_m: runtime.Decimal | null;
    width_m: runtime.Decimal | null;
    rotation_deg: runtime.Decimal | null;
    total_area_sqm: runtime.Decimal | null;
    created_at: Date | null;
    school_yr: string | null;
    _count: Unit7_school_buildable_spacesCountAggregateOutputType | null;
    _avg: Unit7_school_buildable_spacesAvgAggregateOutputType | null;
    _sum: Unit7_school_buildable_spacesSumAggregateOutputType | null;
    _min: Unit7_school_buildable_spacesMinAggregateOutputType | null;
    _max: Unit7_school_buildable_spacesMaxAggregateOutputType | null;
};
export type GetUnit7_school_buildable_spacesGroupByPayload<T extends unit7_school_buildable_spacesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Unit7_school_buildable_spacesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Unit7_school_buildable_spacesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Unit7_school_buildable_spacesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Unit7_school_buildable_spacesGroupByOutputType[P]>;
}>>;
export type unit7_school_buildable_spacesWhereInput = {
    AND?: Prisma.unit7_school_buildable_spacesWhereInput | Prisma.unit7_school_buildable_spacesWhereInput[];
    OR?: Prisma.unit7_school_buildable_spacesWhereInput[];
    NOT?: Prisma.unit7_school_buildable_spacesWhereInput | Prisma.unit7_school_buildable_spacesWhereInput[];
    id?: Prisma.IntFilter<"unit7_school_buildable_spaces"> | number;
    school_id?: Prisma.StringNullableFilter<"unit7_school_buildable_spaces"> | string | null;
    iern?: Prisma.StringNullableFilter<"unit7_school_buildable_spaces"> | string | null;
    space_name?: Prisma.StringNullableFilter<"unit7_school_buildable_spaces"> | string | null;
    center_lat?: Prisma.DecimalNullableFilter<"unit7_school_buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    center_lng?: Prisma.DecimalNullableFilter<"unit7_school_buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length_m?: Prisma.DecimalNullableFilter<"unit7_school_buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width_m?: Prisma.DecimalNullableFilter<"unit7_school_buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    rotation_deg?: Prisma.DecimalNullableFilter<"unit7_school_buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total_area_sqm?: Prisma.DecimalNullableFilter<"unit7_school_buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"unit7_school_buildable_spaces"> | Date | string | null;
    school_yr?: Prisma.StringNullableFilter<"unit7_school_buildable_spaces"> | string | null;
};
export type unit7_school_buildable_spacesOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    iern?: Prisma.SortOrderInput | Prisma.SortOrder;
    space_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    center_lat?: Prisma.SortOrderInput | Prisma.SortOrder;
    center_lng?: Prisma.SortOrderInput | Prisma.SortOrder;
    length_m?: Prisma.SortOrderInput | Prisma.SortOrder;
    width_m?: Prisma.SortOrderInput | Prisma.SortOrder;
    rotation_deg?: Prisma.SortOrderInput | Prisma.SortOrder;
    total_area_sqm?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_yr?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type unit7_school_buildable_spacesWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    iern_space_name?: Prisma.unit7_school_buildable_spacesIernSpace_nameCompoundUniqueInput;
    iern_space_name_school_yr?: Prisma.unit7_school_buildable_spacesIernSpace_nameSchool_yrCompoundUniqueInput;
    AND?: Prisma.unit7_school_buildable_spacesWhereInput | Prisma.unit7_school_buildable_spacesWhereInput[];
    OR?: Prisma.unit7_school_buildable_spacesWhereInput[];
    NOT?: Prisma.unit7_school_buildable_spacesWhereInput | Prisma.unit7_school_buildable_spacesWhereInput[];
    school_id?: Prisma.StringNullableFilter<"unit7_school_buildable_spaces"> | string | null;
    iern?: Prisma.StringNullableFilter<"unit7_school_buildable_spaces"> | string | null;
    space_name?: Prisma.StringNullableFilter<"unit7_school_buildable_spaces"> | string | null;
    center_lat?: Prisma.DecimalNullableFilter<"unit7_school_buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    center_lng?: Prisma.DecimalNullableFilter<"unit7_school_buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length_m?: Prisma.DecimalNullableFilter<"unit7_school_buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width_m?: Prisma.DecimalNullableFilter<"unit7_school_buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    rotation_deg?: Prisma.DecimalNullableFilter<"unit7_school_buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total_area_sqm?: Prisma.DecimalNullableFilter<"unit7_school_buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"unit7_school_buildable_spaces"> | Date | string | null;
    school_yr?: Prisma.StringNullableFilter<"unit7_school_buildable_spaces"> | string | null;
}, "id" | "iern_space_name" | "iern_space_name_school_yr">;
export type unit7_school_buildable_spacesOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    iern?: Prisma.SortOrderInput | Prisma.SortOrder;
    space_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    center_lat?: Prisma.SortOrderInput | Prisma.SortOrder;
    center_lng?: Prisma.SortOrderInput | Prisma.SortOrder;
    length_m?: Prisma.SortOrderInput | Prisma.SortOrder;
    width_m?: Prisma.SortOrderInput | Prisma.SortOrder;
    rotation_deg?: Prisma.SortOrderInput | Prisma.SortOrder;
    total_area_sqm?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_yr?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.unit7_school_buildable_spacesCountOrderByAggregateInput;
    _avg?: Prisma.unit7_school_buildable_spacesAvgOrderByAggregateInput;
    _max?: Prisma.unit7_school_buildable_spacesMaxOrderByAggregateInput;
    _min?: Prisma.unit7_school_buildable_spacesMinOrderByAggregateInput;
    _sum?: Prisma.unit7_school_buildable_spacesSumOrderByAggregateInput;
};
export type unit7_school_buildable_spacesScalarWhereWithAggregatesInput = {
    AND?: Prisma.unit7_school_buildable_spacesScalarWhereWithAggregatesInput | Prisma.unit7_school_buildable_spacesScalarWhereWithAggregatesInput[];
    OR?: Prisma.unit7_school_buildable_spacesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.unit7_school_buildable_spacesScalarWhereWithAggregatesInput | Prisma.unit7_school_buildable_spacesScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"unit7_school_buildable_spaces"> | number;
    school_id?: Prisma.StringNullableWithAggregatesFilter<"unit7_school_buildable_spaces"> | string | null;
    iern?: Prisma.StringNullableWithAggregatesFilter<"unit7_school_buildable_spaces"> | string | null;
    space_name?: Prisma.StringNullableWithAggregatesFilter<"unit7_school_buildable_spaces"> | string | null;
    center_lat?: Prisma.DecimalNullableWithAggregatesFilter<"unit7_school_buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    center_lng?: Prisma.DecimalNullableWithAggregatesFilter<"unit7_school_buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length_m?: Prisma.DecimalNullableWithAggregatesFilter<"unit7_school_buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width_m?: Prisma.DecimalNullableWithAggregatesFilter<"unit7_school_buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    rotation_deg?: Prisma.DecimalNullableWithAggregatesFilter<"unit7_school_buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total_area_sqm?: Prisma.DecimalNullableWithAggregatesFilter<"unit7_school_buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"unit7_school_buildable_spaces"> | Date | string | null;
    school_yr?: Prisma.StringNullableWithAggregatesFilter<"unit7_school_buildable_spaces"> | string | null;
};
export type unit7_school_buildable_spacesCreateInput = {
    school_id?: string | null;
    iern?: string | null;
    space_name?: string | null;
    center_lat?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    center_lng?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length_m?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width_m?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    rotation_deg?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total_area_sqm?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Date | string | null;
    school_yr?: string | null;
};
export type unit7_school_buildable_spacesUncheckedCreateInput = {
    id?: number;
    school_id?: string | null;
    iern?: string | null;
    space_name?: string | null;
    center_lat?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    center_lng?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length_m?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width_m?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    rotation_deg?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total_area_sqm?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Date | string | null;
    school_yr?: string | null;
};
export type unit7_school_buildable_spacesUpdateInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    space_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    center_lat?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    center_lng?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length_m?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width_m?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    rotation_deg?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total_area_sqm?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    school_yr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type unit7_school_buildable_spacesUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    space_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    center_lat?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    center_lng?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length_m?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width_m?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    rotation_deg?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total_area_sqm?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    school_yr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type unit7_school_buildable_spacesCreateManyInput = {
    id?: number;
    school_id?: string | null;
    iern?: string | null;
    space_name?: string | null;
    center_lat?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    center_lng?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length_m?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width_m?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    rotation_deg?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total_area_sqm?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Date | string | null;
    school_yr?: string | null;
};
export type unit7_school_buildable_spacesUpdateManyMutationInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    space_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    center_lat?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    center_lng?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length_m?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width_m?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    rotation_deg?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total_area_sqm?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    school_yr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type unit7_school_buildable_spacesUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    space_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    center_lat?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    center_lng?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length_m?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width_m?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    rotation_deg?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total_area_sqm?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    school_yr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type unit7_school_buildable_spacesIernSpace_nameCompoundUniqueInput = {
    iern: string;
    space_name: string;
};
export type unit7_school_buildable_spacesIernSpace_nameSchool_yrCompoundUniqueInput = {
    iern: string;
    space_name: string;
    school_yr: string;
};
export type unit7_school_buildable_spacesCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    space_name?: Prisma.SortOrder;
    center_lat?: Prisma.SortOrder;
    center_lng?: Prisma.SortOrder;
    length_m?: Prisma.SortOrder;
    width_m?: Prisma.SortOrder;
    rotation_deg?: Prisma.SortOrder;
    total_area_sqm?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    school_yr?: Prisma.SortOrder;
};
export type unit7_school_buildable_spacesAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    center_lat?: Prisma.SortOrder;
    center_lng?: Prisma.SortOrder;
    length_m?: Prisma.SortOrder;
    width_m?: Prisma.SortOrder;
    rotation_deg?: Prisma.SortOrder;
    total_area_sqm?: Prisma.SortOrder;
};
export type unit7_school_buildable_spacesMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    space_name?: Prisma.SortOrder;
    center_lat?: Prisma.SortOrder;
    center_lng?: Prisma.SortOrder;
    length_m?: Prisma.SortOrder;
    width_m?: Prisma.SortOrder;
    rotation_deg?: Prisma.SortOrder;
    total_area_sqm?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    school_yr?: Prisma.SortOrder;
};
export type unit7_school_buildable_spacesMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    space_name?: Prisma.SortOrder;
    center_lat?: Prisma.SortOrder;
    center_lng?: Prisma.SortOrder;
    length_m?: Prisma.SortOrder;
    width_m?: Prisma.SortOrder;
    rotation_deg?: Prisma.SortOrder;
    total_area_sqm?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    school_yr?: Prisma.SortOrder;
};
export type unit7_school_buildable_spacesSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    center_lat?: Prisma.SortOrder;
    center_lng?: Prisma.SortOrder;
    length_m?: Prisma.SortOrder;
    width_m?: Prisma.SortOrder;
    rotation_deg?: Prisma.SortOrder;
    total_area_sqm?: Prisma.SortOrder;
};
export type unit7_school_buildable_spacesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    space_name?: boolean;
    center_lat?: boolean;
    center_lng?: boolean;
    length_m?: boolean;
    width_m?: boolean;
    rotation_deg?: boolean;
    total_area_sqm?: boolean;
    created_at?: boolean;
    school_yr?: boolean;
}, ExtArgs["result"]["unit7_school_buildable_spaces"]>;
export type unit7_school_buildable_spacesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    space_name?: boolean;
    center_lat?: boolean;
    center_lng?: boolean;
    length_m?: boolean;
    width_m?: boolean;
    rotation_deg?: boolean;
    total_area_sqm?: boolean;
    created_at?: boolean;
    school_yr?: boolean;
}, ExtArgs["result"]["unit7_school_buildable_spaces"]>;
export type unit7_school_buildable_spacesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    space_name?: boolean;
    center_lat?: boolean;
    center_lng?: boolean;
    length_m?: boolean;
    width_m?: boolean;
    rotation_deg?: boolean;
    total_area_sqm?: boolean;
    created_at?: boolean;
    school_yr?: boolean;
}, ExtArgs["result"]["unit7_school_buildable_spaces"]>;
export type unit7_school_buildable_spacesSelectScalar = {
    id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    space_name?: boolean;
    center_lat?: boolean;
    center_lng?: boolean;
    length_m?: boolean;
    width_m?: boolean;
    rotation_deg?: boolean;
    total_area_sqm?: boolean;
    created_at?: boolean;
    school_yr?: boolean;
};
export type unit7_school_buildable_spacesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "school_id" | "iern" | "space_name" | "center_lat" | "center_lng" | "length_m" | "width_m" | "rotation_deg" | "total_area_sqm" | "created_at" | "school_yr", ExtArgs["result"]["unit7_school_buildable_spaces"]>;
export type $unit7_school_buildable_spacesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "unit7_school_buildable_spaces";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        school_id: string | null;
        iern: string | null;
        space_name: string | null;
        center_lat: runtime.Decimal | null;
        center_lng: runtime.Decimal | null;
        length_m: runtime.Decimal | null;
        width_m: runtime.Decimal | null;
        rotation_deg: runtime.Decimal | null;
        total_area_sqm: runtime.Decimal | null;
        created_at: Date | null;
        school_yr: string | null;
    }, ExtArgs["result"]["unit7_school_buildable_spaces"]>;
    composites: {};
};
export type unit7_school_buildable_spacesGetPayload<S extends boolean | null | undefined | unit7_school_buildable_spacesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$unit7_school_buildable_spacesPayload, S>;
export type unit7_school_buildable_spacesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<unit7_school_buildable_spacesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Unit7_school_buildable_spacesCountAggregateInputType | true;
};
export interface unit7_school_buildable_spacesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['unit7_school_buildable_spaces'];
        meta: {
            name: 'unit7_school_buildable_spaces';
        };
    };
    findUnique<T extends unit7_school_buildable_spacesFindUniqueArgs>(args: Prisma.SelectSubset<T, unit7_school_buildable_spacesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__unit7_school_buildable_spacesClient<runtime.Types.Result.GetResult<Prisma.$unit7_school_buildable_spacesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends unit7_school_buildable_spacesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, unit7_school_buildable_spacesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__unit7_school_buildable_spacesClient<runtime.Types.Result.GetResult<Prisma.$unit7_school_buildable_spacesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends unit7_school_buildable_spacesFindFirstArgs>(args?: Prisma.SelectSubset<T, unit7_school_buildable_spacesFindFirstArgs<ExtArgs>>): Prisma.Prisma__unit7_school_buildable_spacesClient<runtime.Types.Result.GetResult<Prisma.$unit7_school_buildable_spacesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends unit7_school_buildable_spacesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, unit7_school_buildable_spacesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__unit7_school_buildable_spacesClient<runtime.Types.Result.GetResult<Prisma.$unit7_school_buildable_spacesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends unit7_school_buildable_spacesFindManyArgs>(args?: Prisma.SelectSubset<T, unit7_school_buildable_spacesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$unit7_school_buildable_spacesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends unit7_school_buildable_spacesCreateArgs>(args: Prisma.SelectSubset<T, unit7_school_buildable_spacesCreateArgs<ExtArgs>>): Prisma.Prisma__unit7_school_buildable_spacesClient<runtime.Types.Result.GetResult<Prisma.$unit7_school_buildable_spacesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends unit7_school_buildable_spacesCreateManyArgs>(args?: Prisma.SelectSubset<T, unit7_school_buildable_spacesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends unit7_school_buildable_spacesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, unit7_school_buildable_spacesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$unit7_school_buildable_spacesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends unit7_school_buildable_spacesDeleteArgs>(args: Prisma.SelectSubset<T, unit7_school_buildable_spacesDeleteArgs<ExtArgs>>): Prisma.Prisma__unit7_school_buildable_spacesClient<runtime.Types.Result.GetResult<Prisma.$unit7_school_buildable_spacesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends unit7_school_buildable_spacesUpdateArgs>(args: Prisma.SelectSubset<T, unit7_school_buildable_spacesUpdateArgs<ExtArgs>>): Prisma.Prisma__unit7_school_buildable_spacesClient<runtime.Types.Result.GetResult<Prisma.$unit7_school_buildable_spacesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends unit7_school_buildable_spacesDeleteManyArgs>(args?: Prisma.SelectSubset<T, unit7_school_buildable_spacesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends unit7_school_buildable_spacesUpdateManyArgs>(args: Prisma.SelectSubset<T, unit7_school_buildable_spacesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends unit7_school_buildable_spacesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, unit7_school_buildable_spacesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$unit7_school_buildable_spacesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends unit7_school_buildable_spacesUpsertArgs>(args: Prisma.SelectSubset<T, unit7_school_buildable_spacesUpsertArgs<ExtArgs>>): Prisma.Prisma__unit7_school_buildable_spacesClient<runtime.Types.Result.GetResult<Prisma.$unit7_school_buildable_spacesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends unit7_school_buildable_spacesCountArgs>(args?: Prisma.Subset<T, unit7_school_buildable_spacesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Unit7_school_buildable_spacesCountAggregateOutputType> : number>;
    aggregate<T extends Unit7_school_buildable_spacesAggregateArgs>(args: Prisma.Subset<T, Unit7_school_buildable_spacesAggregateArgs>): Prisma.PrismaPromise<GetUnit7_school_buildable_spacesAggregateType<T>>;
    groupBy<T extends unit7_school_buildable_spacesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: unit7_school_buildable_spacesGroupByArgs['orderBy'];
    } : {
        orderBy?: unit7_school_buildable_spacesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, unit7_school_buildable_spacesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUnit7_school_buildable_spacesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: unit7_school_buildable_spacesFieldRefs;
}
export interface Prisma__unit7_school_buildable_spacesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface unit7_school_buildable_spacesFieldRefs {
    readonly id: Prisma.FieldRef<"unit7_school_buildable_spaces", 'Int'>;
    readonly school_id: Prisma.FieldRef<"unit7_school_buildable_spaces", 'String'>;
    readonly iern: Prisma.FieldRef<"unit7_school_buildable_spaces", 'String'>;
    readonly space_name: Prisma.FieldRef<"unit7_school_buildable_spaces", 'String'>;
    readonly center_lat: Prisma.FieldRef<"unit7_school_buildable_spaces", 'Decimal'>;
    readonly center_lng: Prisma.FieldRef<"unit7_school_buildable_spaces", 'Decimal'>;
    readonly length_m: Prisma.FieldRef<"unit7_school_buildable_spaces", 'Decimal'>;
    readonly width_m: Prisma.FieldRef<"unit7_school_buildable_spaces", 'Decimal'>;
    readonly rotation_deg: Prisma.FieldRef<"unit7_school_buildable_spaces", 'Decimal'>;
    readonly total_area_sqm: Prisma.FieldRef<"unit7_school_buildable_spaces", 'Decimal'>;
    readonly created_at: Prisma.FieldRef<"unit7_school_buildable_spaces", 'DateTime'>;
    readonly school_yr: Prisma.FieldRef<"unit7_school_buildable_spaces", 'String'>;
}
export type unit7_school_buildable_spacesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_school_buildable_spacesSelect<ExtArgs> | null;
    omit?: Prisma.unit7_school_buildable_spacesOmit<ExtArgs> | null;
    where: Prisma.unit7_school_buildable_spacesWhereUniqueInput;
};
export type unit7_school_buildable_spacesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_school_buildable_spacesSelect<ExtArgs> | null;
    omit?: Prisma.unit7_school_buildable_spacesOmit<ExtArgs> | null;
    where: Prisma.unit7_school_buildable_spacesWhereUniqueInput;
};
export type unit7_school_buildable_spacesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_school_buildable_spacesSelect<ExtArgs> | null;
    omit?: Prisma.unit7_school_buildable_spacesOmit<ExtArgs> | null;
    where?: Prisma.unit7_school_buildable_spacesWhereInput;
    orderBy?: Prisma.unit7_school_buildable_spacesOrderByWithRelationInput | Prisma.unit7_school_buildable_spacesOrderByWithRelationInput[];
    cursor?: Prisma.unit7_school_buildable_spacesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Unit7_school_buildable_spacesScalarFieldEnum | Prisma.Unit7_school_buildable_spacesScalarFieldEnum[];
};
export type unit7_school_buildable_spacesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_school_buildable_spacesSelect<ExtArgs> | null;
    omit?: Prisma.unit7_school_buildable_spacesOmit<ExtArgs> | null;
    where?: Prisma.unit7_school_buildable_spacesWhereInput;
    orderBy?: Prisma.unit7_school_buildable_spacesOrderByWithRelationInput | Prisma.unit7_school_buildable_spacesOrderByWithRelationInput[];
    cursor?: Prisma.unit7_school_buildable_spacesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Unit7_school_buildable_spacesScalarFieldEnum | Prisma.Unit7_school_buildable_spacesScalarFieldEnum[];
};
export type unit7_school_buildable_spacesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_school_buildable_spacesSelect<ExtArgs> | null;
    omit?: Prisma.unit7_school_buildable_spacesOmit<ExtArgs> | null;
    where?: Prisma.unit7_school_buildable_spacesWhereInput;
    orderBy?: Prisma.unit7_school_buildable_spacesOrderByWithRelationInput | Prisma.unit7_school_buildable_spacesOrderByWithRelationInput[];
    cursor?: Prisma.unit7_school_buildable_spacesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Unit7_school_buildable_spacesScalarFieldEnum | Prisma.Unit7_school_buildable_spacesScalarFieldEnum[];
};
export type unit7_school_buildable_spacesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_school_buildable_spacesSelect<ExtArgs> | null;
    omit?: Prisma.unit7_school_buildable_spacesOmit<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.unit7_school_buildable_spacesCreateInput, Prisma.unit7_school_buildable_spacesUncheckedCreateInput>;
};
export type unit7_school_buildable_spacesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.unit7_school_buildable_spacesCreateManyInput | Prisma.unit7_school_buildable_spacesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type unit7_school_buildable_spacesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_school_buildable_spacesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.unit7_school_buildable_spacesOmit<ExtArgs> | null;
    data: Prisma.unit7_school_buildable_spacesCreateManyInput | Prisma.unit7_school_buildable_spacesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type unit7_school_buildable_spacesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_school_buildable_spacesSelect<ExtArgs> | null;
    omit?: Prisma.unit7_school_buildable_spacesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.unit7_school_buildable_spacesUpdateInput, Prisma.unit7_school_buildable_spacesUncheckedUpdateInput>;
    where: Prisma.unit7_school_buildable_spacesWhereUniqueInput;
};
export type unit7_school_buildable_spacesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.unit7_school_buildable_spacesUpdateManyMutationInput, Prisma.unit7_school_buildable_spacesUncheckedUpdateManyInput>;
    where?: Prisma.unit7_school_buildable_spacesWhereInput;
    limit?: number;
};
export type unit7_school_buildable_spacesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_school_buildable_spacesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.unit7_school_buildable_spacesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.unit7_school_buildable_spacesUpdateManyMutationInput, Prisma.unit7_school_buildable_spacesUncheckedUpdateManyInput>;
    where?: Prisma.unit7_school_buildable_spacesWhereInput;
    limit?: number;
};
export type unit7_school_buildable_spacesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_school_buildable_spacesSelect<ExtArgs> | null;
    omit?: Prisma.unit7_school_buildable_spacesOmit<ExtArgs> | null;
    where: Prisma.unit7_school_buildable_spacesWhereUniqueInput;
    create: Prisma.XOR<Prisma.unit7_school_buildable_spacesCreateInput, Prisma.unit7_school_buildable_spacesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.unit7_school_buildable_spacesUpdateInput, Prisma.unit7_school_buildable_spacesUncheckedUpdateInput>;
};
export type unit7_school_buildable_spacesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_school_buildable_spacesSelect<ExtArgs> | null;
    omit?: Prisma.unit7_school_buildable_spacesOmit<ExtArgs> | null;
    where: Prisma.unit7_school_buildable_spacesWhereUniqueInput;
};
export type unit7_school_buildable_spacesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.unit7_school_buildable_spacesWhereInput;
    limit?: number;
};
export type unit7_school_buildable_spacesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.unit7_school_buildable_spacesSelect<ExtArgs> | null;
    omit?: Prisma.unit7_school_buildable_spacesOmit<ExtArgs> | null;
};
