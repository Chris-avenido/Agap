import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type facility_roomsModel = runtime.Types.Result.DefaultSelection<Prisma.$facility_roomsPayload>;
export type AggregateFacility_rooms = {
    _count: Facility_roomsCountAggregateOutputType | null;
    _avg: Facility_roomsAvgAggregateOutputType | null;
    _sum: Facility_roomsSumAggregateOutputType | null;
    _min: Facility_roomsMinAggregateOutputType | null;
    _max: Facility_roomsMaxAggregateOutputType | null;
};
export type Facility_roomsAvgAggregateOutputType = {
    room_id: number | null;
    building_id: number | null;
};
export type Facility_roomsSumAggregateOutputType = {
    room_id: number | null;
    building_id: number | null;
};
export type Facility_roomsMinAggregateOutputType = {
    room_id: number | null;
    building_id: number | null;
    school_id: string | null;
    room_name: string | null;
    dimension: string | null;
    grade_level: string | null;
    advisory_teacher: string | null;
    condition: string | null;
    created_at: Date | null;
};
export type Facility_roomsMaxAggregateOutputType = {
    room_id: number | null;
    building_id: number | null;
    school_id: string | null;
    room_name: string | null;
    dimension: string | null;
    grade_level: string | null;
    advisory_teacher: string | null;
    condition: string | null;
    created_at: Date | null;
};
export type Facility_roomsCountAggregateOutputType = {
    room_id: number;
    building_id: number;
    school_id: number;
    room_name: number;
    dimension: number;
    grade_level: number;
    advisory_teacher: number;
    condition: number;
    created_at: number;
    _all: number;
};
export type Facility_roomsAvgAggregateInputType = {
    room_id?: true;
    building_id?: true;
};
export type Facility_roomsSumAggregateInputType = {
    room_id?: true;
    building_id?: true;
};
export type Facility_roomsMinAggregateInputType = {
    room_id?: true;
    building_id?: true;
    school_id?: true;
    room_name?: true;
    dimension?: true;
    grade_level?: true;
    advisory_teacher?: true;
    condition?: true;
    created_at?: true;
};
export type Facility_roomsMaxAggregateInputType = {
    room_id?: true;
    building_id?: true;
    school_id?: true;
    room_name?: true;
    dimension?: true;
    grade_level?: true;
    advisory_teacher?: true;
    condition?: true;
    created_at?: true;
};
export type Facility_roomsCountAggregateInputType = {
    room_id?: true;
    building_id?: true;
    school_id?: true;
    room_name?: true;
    dimension?: true;
    grade_level?: true;
    advisory_teacher?: true;
    condition?: true;
    created_at?: true;
    _all?: true;
};
export type Facility_roomsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.facility_roomsWhereInput;
    orderBy?: Prisma.facility_roomsOrderByWithRelationInput | Prisma.facility_roomsOrderByWithRelationInput[];
    cursor?: Prisma.facility_roomsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Facility_roomsCountAggregateInputType;
    _avg?: Facility_roomsAvgAggregateInputType;
    _sum?: Facility_roomsSumAggregateInputType;
    _min?: Facility_roomsMinAggregateInputType;
    _max?: Facility_roomsMaxAggregateInputType;
};
export type GetFacility_roomsAggregateType<T extends Facility_roomsAggregateArgs> = {
    [P in keyof T & keyof AggregateFacility_rooms]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFacility_rooms[P]> : Prisma.GetScalarType<T[P], AggregateFacility_rooms[P]>;
};
export type facility_roomsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.facility_roomsWhereInput;
    orderBy?: Prisma.facility_roomsOrderByWithAggregationInput | Prisma.facility_roomsOrderByWithAggregationInput[];
    by: Prisma.Facility_roomsScalarFieldEnum[] | Prisma.Facility_roomsScalarFieldEnum;
    having?: Prisma.facility_roomsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Facility_roomsCountAggregateInputType | true;
    _avg?: Facility_roomsAvgAggregateInputType;
    _sum?: Facility_roomsSumAggregateInputType;
    _min?: Facility_roomsMinAggregateInputType;
    _max?: Facility_roomsMaxAggregateInputType;
};
export type Facility_roomsGroupByOutputType = {
    room_id: number;
    building_id: number | null;
    school_id: string | null;
    room_name: string;
    dimension: string | null;
    grade_level: string | null;
    advisory_teacher: string | null;
    condition: string | null;
    created_at: Date | null;
    _count: Facility_roomsCountAggregateOutputType | null;
    _avg: Facility_roomsAvgAggregateOutputType | null;
    _sum: Facility_roomsSumAggregateOutputType | null;
    _min: Facility_roomsMinAggregateOutputType | null;
    _max: Facility_roomsMaxAggregateOutputType | null;
};
export type GetFacility_roomsGroupByPayload<T extends facility_roomsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Facility_roomsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Facility_roomsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Facility_roomsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Facility_roomsGroupByOutputType[P]>;
}>>;
export type facility_roomsWhereInput = {
    AND?: Prisma.facility_roomsWhereInput | Prisma.facility_roomsWhereInput[];
    OR?: Prisma.facility_roomsWhereInput[];
    NOT?: Prisma.facility_roomsWhereInput | Prisma.facility_roomsWhereInput[];
    room_id?: Prisma.IntFilter<"facility_rooms"> | number;
    building_id?: Prisma.IntNullableFilter<"facility_rooms"> | number | null;
    school_id?: Prisma.StringNullableFilter<"facility_rooms"> | string | null;
    room_name?: Prisma.StringFilter<"facility_rooms"> | string;
    dimension?: Prisma.StringNullableFilter<"facility_rooms"> | string | null;
    grade_level?: Prisma.StringNullableFilter<"facility_rooms"> | string | null;
    advisory_teacher?: Prisma.StringNullableFilter<"facility_rooms"> | string | null;
    condition?: Prisma.StringNullableFilter<"facility_rooms"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"facility_rooms"> | Date | string | null;
    facility_inventory?: Prisma.XOR<Prisma.Facility_inventoryNullableScalarRelationFilter, Prisma.facility_inventoryWhereInput> | null;
};
export type facility_roomsOrderByWithRelationInput = {
    room_id?: Prisma.SortOrder;
    building_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    room_name?: Prisma.SortOrder;
    dimension?: Prisma.SortOrderInput | Prisma.SortOrder;
    grade_level?: Prisma.SortOrderInput | Prisma.SortOrder;
    advisory_teacher?: Prisma.SortOrderInput | Prisma.SortOrder;
    condition?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    facility_inventory?: Prisma.facility_inventoryOrderByWithRelationInput;
};
export type facility_roomsWhereUniqueInput = Prisma.AtLeast<{
    room_id?: number;
    AND?: Prisma.facility_roomsWhereInput | Prisma.facility_roomsWhereInput[];
    OR?: Prisma.facility_roomsWhereInput[];
    NOT?: Prisma.facility_roomsWhereInput | Prisma.facility_roomsWhereInput[];
    building_id?: Prisma.IntNullableFilter<"facility_rooms"> | number | null;
    school_id?: Prisma.StringNullableFilter<"facility_rooms"> | string | null;
    room_name?: Prisma.StringFilter<"facility_rooms"> | string;
    dimension?: Prisma.StringNullableFilter<"facility_rooms"> | string | null;
    grade_level?: Prisma.StringNullableFilter<"facility_rooms"> | string | null;
    advisory_teacher?: Prisma.StringNullableFilter<"facility_rooms"> | string | null;
    condition?: Prisma.StringNullableFilter<"facility_rooms"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"facility_rooms"> | Date | string | null;
    facility_inventory?: Prisma.XOR<Prisma.Facility_inventoryNullableScalarRelationFilter, Prisma.facility_inventoryWhereInput> | null;
}, "room_id">;
export type facility_roomsOrderByWithAggregationInput = {
    room_id?: Prisma.SortOrder;
    building_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    room_name?: Prisma.SortOrder;
    dimension?: Prisma.SortOrderInput | Prisma.SortOrder;
    grade_level?: Prisma.SortOrderInput | Prisma.SortOrder;
    advisory_teacher?: Prisma.SortOrderInput | Prisma.SortOrder;
    condition?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.facility_roomsCountOrderByAggregateInput;
    _avg?: Prisma.facility_roomsAvgOrderByAggregateInput;
    _max?: Prisma.facility_roomsMaxOrderByAggregateInput;
    _min?: Prisma.facility_roomsMinOrderByAggregateInput;
    _sum?: Prisma.facility_roomsSumOrderByAggregateInput;
};
export type facility_roomsScalarWhereWithAggregatesInput = {
    AND?: Prisma.facility_roomsScalarWhereWithAggregatesInput | Prisma.facility_roomsScalarWhereWithAggregatesInput[];
    OR?: Prisma.facility_roomsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.facility_roomsScalarWhereWithAggregatesInput | Prisma.facility_roomsScalarWhereWithAggregatesInput[];
    room_id?: Prisma.IntWithAggregatesFilter<"facility_rooms"> | number;
    building_id?: Prisma.IntNullableWithAggregatesFilter<"facility_rooms"> | number | null;
    school_id?: Prisma.StringNullableWithAggregatesFilter<"facility_rooms"> | string | null;
    room_name?: Prisma.StringWithAggregatesFilter<"facility_rooms"> | string;
    dimension?: Prisma.StringNullableWithAggregatesFilter<"facility_rooms"> | string | null;
    grade_level?: Prisma.StringNullableWithAggregatesFilter<"facility_rooms"> | string | null;
    advisory_teacher?: Prisma.StringNullableWithAggregatesFilter<"facility_rooms"> | string | null;
    condition?: Prisma.StringNullableWithAggregatesFilter<"facility_rooms"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"facility_rooms"> | Date | string | null;
};
export type facility_roomsCreateInput = {
    school_id?: string | null;
    room_name: string;
    dimension?: string | null;
    grade_level?: string | null;
    advisory_teacher?: string | null;
    condition?: string | null;
    created_at?: Date | string | null;
    facility_inventory?: Prisma.facility_inventoryCreateNestedOneWithoutFacility_roomsInput;
};
export type facility_roomsUncheckedCreateInput = {
    room_id?: number;
    building_id?: number | null;
    school_id?: string | null;
    room_name: string;
    dimension?: string | null;
    grade_level?: string | null;
    advisory_teacher?: string | null;
    condition?: string | null;
    created_at?: Date | string | null;
};
export type facility_roomsUpdateInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    room_name?: Prisma.StringFieldUpdateOperationsInput | string;
    dimension?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grade_level?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    advisory_teacher?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    condition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    facility_inventory?: Prisma.facility_inventoryUpdateOneWithoutFacility_roomsNestedInput;
};
export type facility_roomsUncheckedUpdateInput = {
    room_id?: Prisma.IntFieldUpdateOperationsInput | number;
    building_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    room_name?: Prisma.StringFieldUpdateOperationsInput | string;
    dimension?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grade_level?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    advisory_teacher?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    condition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type facility_roomsCreateManyInput = {
    room_id?: number;
    building_id?: number | null;
    school_id?: string | null;
    room_name: string;
    dimension?: string | null;
    grade_level?: string | null;
    advisory_teacher?: string | null;
    condition?: string | null;
    created_at?: Date | string | null;
};
export type facility_roomsUpdateManyMutationInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    room_name?: Prisma.StringFieldUpdateOperationsInput | string;
    dimension?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grade_level?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    advisory_teacher?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    condition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type facility_roomsUncheckedUpdateManyInput = {
    room_id?: Prisma.IntFieldUpdateOperationsInput | number;
    building_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    room_name?: Prisma.StringFieldUpdateOperationsInput | string;
    dimension?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grade_level?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    advisory_teacher?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    condition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type Facility_roomsListRelationFilter = {
    every?: Prisma.facility_roomsWhereInput;
    some?: Prisma.facility_roomsWhereInput;
    none?: Prisma.facility_roomsWhereInput;
};
export type facility_roomsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type facility_roomsCountOrderByAggregateInput = {
    room_id?: Prisma.SortOrder;
    building_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    room_name?: Prisma.SortOrder;
    dimension?: Prisma.SortOrder;
    grade_level?: Prisma.SortOrder;
    advisory_teacher?: Prisma.SortOrder;
    condition?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type facility_roomsAvgOrderByAggregateInput = {
    room_id?: Prisma.SortOrder;
    building_id?: Prisma.SortOrder;
};
export type facility_roomsMaxOrderByAggregateInput = {
    room_id?: Prisma.SortOrder;
    building_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    room_name?: Prisma.SortOrder;
    dimension?: Prisma.SortOrder;
    grade_level?: Prisma.SortOrder;
    advisory_teacher?: Prisma.SortOrder;
    condition?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type facility_roomsMinOrderByAggregateInput = {
    room_id?: Prisma.SortOrder;
    building_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    room_name?: Prisma.SortOrder;
    dimension?: Prisma.SortOrder;
    grade_level?: Prisma.SortOrder;
    advisory_teacher?: Prisma.SortOrder;
    condition?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type facility_roomsSumOrderByAggregateInput = {
    room_id?: Prisma.SortOrder;
    building_id?: Prisma.SortOrder;
};
export type facility_roomsCreateNestedManyWithoutFacility_inventoryInput = {
    create?: Prisma.XOR<Prisma.facility_roomsCreateWithoutFacility_inventoryInput, Prisma.facility_roomsUncheckedCreateWithoutFacility_inventoryInput> | Prisma.facility_roomsCreateWithoutFacility_inventoryInput[] | Prisma.facility_roomsUncheckedCreateWithoutFacility_inventoryInput[];
    connectOrCreate?: Prisma.facility_roomsCreateOrConnectWithoutFacility_inventoryInput | Prisma.facility_roomsCreateOrConnectWithoutFacility_inventoryInput[];
    createMany?: Prisma.facility_roomsCreateManyFacility_inventoryInputEnvelope;
    connect?: Prisma.facility_roomsWhereUniqueInput | Prisma.facility_roomsWhereUniqueInput[];
};
export type facility_roomsUncheckedCreateNestedManyWithoutFacility_inventoryInput = {
    create?: Prisma.XOR<Prisma.facility_roomsCreateWithoutFacility_inventoryInput, Prisma.facility_roomsUncheckedCreateWithoutFacility_inventoryInput> | Prisma.facility_roomsCreateWithoutFacility_inventoryInput[] | Prisma.facility_roomsUncheckedCreateWithoutFacility_inventoryInput[];
    connectOrCreate?: Prisma.facility_roomsCreateOrConnectWithoutFacility_inventoryInput | Prisma.facility_roomsCreateOrConnectWithoutFacility_inventoryInput[];
    createMany?: Prisma.facility_roomsCreateManyFacility_inventoryInputEnvelope;
    connect?: Prisma.facility_roomsWhereUniqueInput | Prisma.facility_roomsWhereUniqueInput[];
};
export type facility_roomsUpdateManyWithoutFacility_inventoryNestedInput = {
    create?: Prisma.XOR<Prisma.facility_roomsCreateWithoutFacility_inventoryInput, Prisma.facility_roomsUncheckedCreateWithoutFacility_inventoryInput> | Prisma.facility_roomsCreateWithoutFacility_inventoryInput[] | Prisma.facility_roomsUncheckedCreateWithoutFacility_inventoryInput[];
    connectOrCreate?: Prisma.facility_roomsCreateOrConnectWithoutFacility_inventoryInput | Prisma.facility_roomsCreateOrConnectWithoutFacility_inventoryInput[];
    upsert?: Prisma.facility_roomsUpsertWithWhereUniqueWithoutFacility_inventoryInput | Prisma.facility_roomsUpsertWithWhereUniqueWithoutFacility_inventoryInput[];
    createMany?: Prisma.facility_roomsCreateManyFacility_inventoryInputEnvelope;
    set?: Prisma.facility_roomsWhereUniqueInput | Prisma.facility_roomsWhereUniqueInput[];
    disconnect?: Prisma.facility_roomsWhereUniqueInput | Prisma.facility_roomsWhereUniqueInput[];
    delete?: Prisma.facility_roomsWhereUniqueInput | Prisma.facility_roomsWhereUniqueInput[];
    connect?: Prisma.facility_roomsWhereUniqueInput | Prisma.facility_roomsWhereUniqueInput[];
    update?: Prisma.facility_roomsUpdateWithWhereUniqueWithoutFacility_inventoryInput | Prisma.facility_roomsUpdateWithWhereUniqueWithoutFacility_inventoryInput[];
    updateMany?: Prisma.facility_roomsUpdateManyWithWhereWithoutFacility_inventoryInput | Prisma.facility_roomsUpdateManyWithWhereWithoutFacility_inventoryInput[];
    deleteMany?: Prisma.facility_roomsScalarWhereInput | Prisma.facility_roomsScalarWhereInput[];
};
export type facility_roomsUncheckedUpdateManyWithoutFacility_inventoryNestedInput = {
    create?: Prisma.XOR<Prisma.facility_roomsCreateWithoutFacility_inventoryInput, Prisma.facility_roomsUncheckedCreateWithoutFacility_inventoryInput> | Prisma.facility_roomsCreateWithoutFacility_inventoryInput[] | Prisma.facility_roomsUncheckedCreateWithoutFacility_inventoryInput[];
    connectOrCreate?: Prisma.facility_roomsCreateOrConnectWithoutFacility_inventoryInput | Prisma.facility_roomsCreateOrConnectWithoutFacility_inventoryInput[];
    upsert?: Prisma.facility_roomsUpsertWithWhereUniqueWithoutFacility_inventoryInput | Prisma.facility_roomsUpsertWithWhereUniqueWithoutFacility_inventoryInput[];
    createMany?: Prisma.facility_roomsCreateManyFacility_inventoryInputEnvelope;
    set?: Prisma.facility_roomsWhereUniqueInput | Prisma.facility_roomsWhereUniqueInput[];
    disconnect?: Prisma.facility_roomsWhereUniqueInput | Prisma.facility_roomsWhereUniqueInput[];
    delete?: Prisma.facility_roomsWhereUniqueInput | Prisma.facility_roomsWhereUniqueInput[];
    connect?: Prisma.facility_roomsWhereUniqueInput | Prisma.facility_roomsWhereUniqueInput[];
    update?: Prisma.facility_roomsUpdateWithWhereUniqueWithoutFacility_inventoryInput | Prisma.facility_roomsUpdateWithWhereUniqueWithoutFacility_inventoryInput[];
    updateMany?: Prisma.facility_roomsUpdateManyWithWhereWithoutFacility_inventoryInput | Prisma.facility_roomsUpdateManyWithWhereWithoutFacility_inventoryInput[];
    deleteMany?: Prisma.facility_roomsScalarWhereInput | Prisma.facility_roomsScalarWhereInput[];
};
export type facility_roomsCreateWithoutFacility_inventoryInput = {
    school_id?: string | null;
    room_name: string;
    dimension?: string | null;
    grade_level?: string | null;
    advisory_teacher?: string | null;
    condition?: string | null;
    created_at?: Date | string | null;
};
export type facility_roomsUncheckedCreateWithoutFacility_inventoryInput = {
    room_id?: number;
    school_id?: string | null;
    room_name: string;
    dimension?: string | null;
    grade_level?: string | null;
    advisory_teacher?: string | null;
    condition?: string | null;
    created_at?: Date | string | null;
};
export type facility_roomsCreateOrConnectWithoutFacility_inventoryInput = {
    where: Prisma.facility_roomsWhereUniqueInput;
    create: Prisma.XOR<Prisma.facility_roomsCreateWithoutFacility_inventoryInput, Prisma.facility_roomsUncheckedCreateWithoutFacility_inventoryInput>;
};
export type facility_roomsCreateManyFacility_inventoryInputEnvelope = {
    data: Prisma.facility_roomsCreateManyFacility_inventoryInput | Prisma.facility_roomsCreateManyFacility_inventoryInput[];
    skipDuplicates?: boolean;
};
export type facility_roomsUpsertWithWhereUniqueWithoutFacility_inventoryInput = {
    where: Prisma.facility_roomsWhereUniqueInput;
    update: Prisma.XOR<Prisma.facility_roomsUpdateWithoutFacility_inventoryInput, Prisma.facility_roomsUncheckedUpdateWithoutFacility_inventoryInput>;
    create: Prisma.XOR<Prisma.facility_roomsCreateWithoutFacility_inventoryInput, Prisma.facility_roomsUncheckedCreateWithoutFacility_inventoryInput>;
};
export type facility_roomsUpdateWithWhereUniqueWithoutFacility_inventoryInput = {
    where: Prisma.facility_roomsWhereUniqueInput;
    data: Prisma.XOR<Prisma.facility_roomsUpdateWithoutFacility_inventoryInput, Prisma.facility_roomsUncheckedUpdateWithoutFacility_inventoryInput>;
};
export type facility_roomsUpdateManyWithWhereWithoutFacility_inventoryInput = {
    where: Prisma.facility_roomsScalarWhereInput;
    data: Prisma.XOR<Prisma.facility_roomsUpdateManyMutationInput, Prisma.facility_roomsUncheckedUpdateManyWithoutFacility_inventoryInput>;
};
export type facility_roomsScalarWhereInput = {
    AND?: Prisma.facility_roomsScalarWhereInput | Prisma.facility_roomsScalarWhereInput[];
    OR?: Prisma.facility_roomsScalarWhereInput[];
    NOT?: Prisma.facility_roomsScalarWhereInput | Prisma.facility_roomsScalarWhereInput[];
    room_id?: Prisma.IntFilter<"facility_rooms"> | number;
    building_id?: Prisma.IntNullableFilter<"facility_rooms"> | number | null;
    school_id?: Prisma.StringNullableFilter<"facility_rooms"> | string | null;
    room_name?: Prisma.StringFilter<"facility_rooms"> | string;
    dimension?: Prisma.StringNullableFilter<"facility_rooms"> | string | null;
    grade_level?: Prisma.StringNullableFilter<"facility_rooms"> | string | null;
    advisory_teacher?: Prisma.StringNullableFilter<"facility_rooms"> | string | null;
    condition?: Prisma.StringNullableFilter<"facility_rooms"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"facility_rooms"> | Date | string | null;
};
export type facility_roomsCreateManyFacility_inventoryInput = {
    room_id?: number;
    school_id?: string | null;
    room_name: string;
    dimension?: string | null;
    grade_level?: string | null;
    advisory_teacher?: string | null;
    condition?: string | null;
    created_at?: Date | string | null;
};
export type facility_roomsUpdateWithoutFacility_inventoryInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    room_name?: Prisma.StringFieldUpdateOperationsInput | string;
    dimension?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grade_level?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    advisory_teacher?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    condition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type facility_roomsUncheckedUpdateWithoutFacility_inventoryInput = {
    room_id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    room_name?: Prisma.StringFieldUpdateOperationsInput | string;
    dimension?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grade_level?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    advisory_teacher?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    condition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type facility_roomsUncheckedUpdateManyWithoutFacility_inventoryInput = {
    room_id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    room_name?: Prisma.StringFieldUpdateOperationsInput | string;
    dimension?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grade_level?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    advisory_teacher?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    condition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type facility_roomsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    room_id?: boolean;
    building_id?: boolean;
    school_id?: boolean;
    room_name?: boolean;
    dimension?: boolean;
    grade_level?: boolean;
    advisory_teacher?: boolean;
    condition?: boolean;
    created_at?: boolean;
    facility_inventory?: boolean | Prisma.facility_rooms$facility_inventoryArgs<ExtArgs>;
}, ExtArgs["result"]["facility_rooms"]>;
export type facility_roomsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    room_id?: boolean;
    building_id?: boolean;
    school_id?: boolean;
    room_name?: boolean;
    dimension?: boolean;
    grade_level?: boolean;
    advisory_teacher?: boolean;
    condition?: boolean;
    created_at?: boolean;
    facility_inventory?: boolean | Prisma.facility_rooms$facility_inventoryArgs<ExtArgs>;
}, ExtArgs["result"]["facility_rooms"]>;
export type facility_roomsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    room_id?: boolean;
    building_id?: boolean;
    school_id?: boolean;
    room_name?: boolean;
    dimension?: boolean;
    grade_level?: boolean;
    advisory_teacher?: boolean;
    condition?: boolean;
    created_at?: boolean;
    facility_inventory?: boolean | Prisma.facility_rooms$facility_inventoryArgs<ExtArgs>;
}, ExtArgs["result"]["facility_rooms"]>;
export type facility_roomsSelectScalar = {
    room_id?: boolean;
    building_id?: boolean;
    school_id?: boolean;
    room_name?: boolean;
    dimension?: boolean;
    grade_level?: boolean;
    advisory_teacher?: boolean;
    condition?: boolean;
    created_at?: boolean;
};
export type facility_roomsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"room_id" | "building_id" | "school_id" | "room_name" | "dimension" | "grade_level" | "advisory_teacher" | "condition" | "created_at", ExtArgs["result"]["facility_rooms"]>;
export type facility_roomsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    facility_inventory?: boolean | Prisma.facility_rooms$facility_inventoryArgs<ExtArgs>;
};
export type facility_roomsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    facility_inventory?: boolean | Prisma.facility_rooms$facility_inventoryArgs<ExtArgs>;
};
export type facility_roomsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    facility_inventory?: boolean | Prisma.facility_rooms$facility_inventoryArgs<ExtArgs>;
};
export type $facility_roomsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "facility_rooms";
    objects: {
        facility_inventory: Prisma.$facility_inventoryPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        room_id: number;
        building_id: number | null;
        school_id: string | null;
        room_name: string;
        dimension: string | null;
        grade_level: string | null;
        advisory_teacher: string | null;
        condition: string | null;
        created_at: Date | null;
    }, ExtArgs["result"]["facility_rooms"]>;
    composites: {};
};
export type facility_roomsGetPayload<S extends boolean | null | undefined | facility_roomsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$facility_roomsPayload, S>;
export type facility_roomsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<facility_roomsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Facility_roomsCountAggregateInputType | true;
};
export interface facility_roomsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['facility_rooms'];
        meta: {
            name: 'facility_rooms';
        };
    };
    findUnique<T extends facility_roomsFindUniqueArgs>(args: Prisma.SelectSubset<T, facility_roomsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__facility_roomsClient<runtime.Types.Result.GetResult<Prisma.$facility_roomsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends facility_roomsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, facility_roomsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__facility_roomsClient<runtime.Types.Result.GetResult<Prisma.$facility_roomsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends facility_roomsFindFirstArgs>(args?: Prisma.SelectSubset<T, facility_roomsFindFirstArgs<ExtArgs>>): Prisma.Prisma__facility_roomsClient<runtime.Types.Result.GetResult<Prisma.$facility_roomsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends facility_roomsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, facility_roomsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__facility_roomsClient<runtime.Types.Result.GetResult<Prisma.$facility_roomsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends facility_roomsFindManyArgs>(args?: Prisma.SelectSubset<T, facility_roomsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$facility_roomsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends facility_roomsCreateArgs>(args: Prisma.SelectSubset<T, facility_roomsCreateArgs<ExtArgs>>): Prisma.Prisma__facility_roomsClient<runtime.Types.Result.GetResult<Prisma.$facility_roomsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends facility_roomsCreateManyArgs>(args?: Prisma.SelectSubset<T, facility_roomsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends facility_roomsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, facility_roomsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$facility_roomsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends facility_roomsDeleteArgs>(args: Prisma.SelectSubset<T, facility_roomsDeleteArgs<ExtArgs>>): Prisma.Prisma__facility_roomsClient<runtime.Types.Result.GetResult<Prisma.$facility_roomsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends facility_roomsUpdateArgs>(args: Prisma.SelectSubset<T, facility_roomsUpdateArgs<ExtArgs>>): Prisma.Prisma__facility_roomsClient<runtime.Types.Result.GetResult<Prisma.$facility_roomsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends facility_roomsDeleteManyArgs>(args?: Prisma.SelectSubset<T, facility_roomsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends facility_roomsUpdateManyArgs>(args: Prisma.SelectSubset<T, facility_roomsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends facility_roomsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, facility_roomsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$facility_roomsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends facility_roomsUpsertArgs>(args: Prisma.SelectSubset<T, facility_roomsUpsertArgs<ExtArgs>>): Prisma.Prisma__facility_roomsClient<runtime.Types.Result.GetResult<Prisma.$facility_roomsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends facility_roomsCountArgs>(args?: Prisma.Subset<T, facility_roomsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Facility_roomsCountAggregateOutputType> : number>;
    aggregate<T extends Facility_roomsAggregateArgs>(args: Prisma.Subset<T, Facility_roomsAggregateArgs>): Prisma.PrismaPromise<GetFacility_roomsAggregateType<T>>;
    groupBy<T extends facility_roomsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: facility_roomsGroupByArgs['orderBy'];
    } : {
        orderBy?: facility_roomsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, facility_roomsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFacility_roomsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: facility_roomsFieldRefs;
}
export interface Prisma__facility_roomsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    facility_inventory<T extends Prisma.facility_rooms$facility_inventoryArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.facility_rooms$facility_inventoryArgs<ExtArgs>>): Prisma.Prisma__facility_inventoryClient<runtime.Types.Result.GetResult<Prisma.$facility_inventoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface facility_roomsFieldRefs {
    readonly room_id: Prisma.FieldRef<"facility_rooms", 'Int'>;
    readonly building_id: Prisma.FieldRef<"facility_rooms", 'Int'>;
    readonly school_id: Prisma.FieldRef<"facility_rooms", 'String'>;
    readonly room_name: Prisma.FieldRef<"facility_rooms", 'String'>;
    readonly dimension: Prisma.FieldRef<"facility_rooms", 'String'>;
    readonly grade_level: Prisma.FieldRef<"facility_rooms", 'String'>;
    readonly advisory_teacher: Prisma.FieldRef<"facility_rooms", 'String'>;
    readonly condition: Prisma.FieldRef<"facility_rooms", 'String'>;
    readonly created_at: Prisma.FieldRef<"facility_rooms", 'DateTime'>;
}
export type facility_roomsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_roomsSelect<ExtArgs> | null;
    omit?: Prisma.facility_roomsOmit<ExtArgs> | null;
    include?: Prisma.facility_roomsInclude<ExtArgs> | null;
    where: Prisma.facility_roomsWhereUniqueInput;
};
export type facility_roomsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_roomsSelect<ExtArgs> | null;
    omit?: Prisma.facility_roomsOmit<ExtArgs> | null;
    include?: Prisma.facility_roomsInclude<ExtArgs> | null;
    where: Prisma.facility_roomsWhereUniqueInput;
};
export type facility_roomsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_roomsSelect<ExtArgs> | null;
    omit?: Prisma.facility_roomsOmit<ExtArgs> | null;
    include?: Prisma.facility_roomsInclude<ExtArgs> | null;
    where?: Prisma.facility_roomsWhereInput;
    orderBy?: Prisma.facility_roomsOrderByWithRelationInput | Prisma.facility_roomsOrderByWithRelationInput[];
    cursor?: Prisma.facility_roomsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Facility_roomsScalarFieldEnum | Prisma.Facility_roomsScalarFieldEnum[];
};
export type facility_roomsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_roomsSelect<ExtArgs> | null;
    omit?: Prisma.facility_roomsOmit<ExtArgs> | null;
    include?: Prisma.facility_roomsInclude<ExtArgs> | null;
    where?: Prisma.facility_roomsWhereInput;
    orderBy?: Prisma.facility_roomsOrderByWithRelationInput | Prisma.facility_roomsOrderByWithRelationInput[];
    cursor?: Prisma.facility_roomsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Facility_roomsScalarFieldEnum | Prisma.Facility_roomsScalarFieldEnum[];
};
export type facility_roomsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_roomsSelect<ExtArgs> | null;
    omit?: Prisma.facility_roomsOmit<ExtArgs> | null;
    include?: Prisma.facility_roomsInclude<ExtArgs> | null;
    where?: Prisma.facility_roomsWhereInput;
    orderBy?: Prisma.facility_roomsOrderByWithRelationInput | Prisma.facility_roomsOrderByWithRelationInput[];
    cursor?: Prisma.facility_roomsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Facility_roomsScalarFieldEnum | Prisma.Facility_roomsScalarFieldEnum[];
};
export type facility_roomsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_roomsSelect<ExtArgs> | null;
    omit?: Prisma.facility_roomsOmit<ExtArgs> | null;
    include?: Prisma.facility_roomsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.facility_roomsCreateInput, Prisma.facility_roomsUncheckedCreateInput>;
};
export type facility_roomsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.facility_roomsCreateManyInput | Prisma.facility_roomsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type facility_roomsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_roomsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.facility_roomsOmit<ExtArgs> | null;
    data: Prisma.facility_roomsCreateManyInput | Prisma.facility_roomsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.facility_roomsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type facility_roomsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_roomsSelect<ExtArgs> | null;
    omit?: Prisma.facility_roomsOmit<ExtArgs> | null;
    include?: Prisma.facility_roomsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.facility_roomsUpdateInput, Prisma.facility_roomsUncheckedUpdateInput>;
    where: Prisma.facility_roomsWhereUniqueInput;
};
export type facility_roomsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.facility_roomsUpdateManyMutationInput, Prisma.facility_roomsUncheckedUpdateManyInput>;
    where?: Prisma.facility_roomsWhereInput;
    limit?: number;
};
export type facility_roomsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_roomsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.facility_roomsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.facility_roomsUpdateManyMutationInput, Prisma.facility_roomsUncheckedUpdateManyInput>;
    where?: Prisma.facility_roomsWhereInput;
    limit?: number;
    include?: Prisma.facility_roomsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type facility_roomsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_roomsSelect<ExtArgs> | null;
    omit?: Prisma.facility_roomsOmit<ExtArgs> | null;
    include?: Prisma.facility_roomsInclude<ExtArgs> | null;
    where: Prisma.facility_roomsWhereUniqueInput;
    create: Prisma.XOR<Prisma.facility_roomsCreateInput, Prisma.facility_roomsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.facility_roomsUpdateInput, Prisma.facility_roomsUncheckedUpdateInput>;
};
export type facility_roomsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_roomsSelect<ExtArgs> | null;
    omit?: Prisma.facility_roomsOmit<ExtArgs> | null;
    include?: Prisma.facility_roomsInclude<ExtArgs> | null;
    where: Prisma.facility_roomsWhereUniqueInput;
};
export type facility_roomsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.facility_roomsWhereInput;
    limit?: number;
};
export type facility_rooms$facility_inventoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_inventorySelect<ExtArgs> | null;
    omit?: Prisma.facility_inventoryOmit<ExtArgs> | null;
    include?: Prisma.facility_inventoryInclude<ExtArgs> | null;
    where?: Prisma.facility_inventoryWhereInput;
};
export type facility_roomsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_roomsSelect<ExtArgs> | null;
    omit?: Prisma.facility_roomsOmit<ExtArgs> | null;
    include?: Prisma.facility_roomsInclude<ExtArgs> | null;
};
