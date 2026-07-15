import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type facility_inventoryModel = runtime.Types.Result.DefaultSelection<Prisma.$facility_inventoryPayload>;
export type AggregateFacility_inventory = {
    _count: Facility_inventoryCountAggregateOutputType | null;
    _avg: Facility_inventoryAvgAggregateOutputType | null;
    _sum: Facility_inventorySumAggregateOutputType | null;
    _min: Facility_inventoryMinAggregateOutputType | null;
    _max: Facility_inventoryMaxAggregateOutputType | null;
};
export type Facility_inventoryAvgAggregateOutputType = {
    id: number | null;
};
export type Facility_inventorySumAggregateOutputType = {
    id: number | null;
};
export type Facility_inventoryMinAggregateOutputType = {
    id: number | null;
    school_id: string | null;
    iern: string | null;
    building_name: string | null;
    category: string | null;
    status: string | null;
    created_at: Date | null;
};
export type Facility_inventoryMaxAggregateOutputType = {
    id: number | null;
    school_id: string | null;
    iern: string | null;
    building_name: string | null;
    category: string | null;
    status: string | null;
    created_at: Date | null;
};
export type Facility_inventoryCountAggregateOutputType = {
    id: number;
    school_id: number;
    iern: number;
    building_name: number;
    category: number;
    status: number;
    created_at: number;
    _all: number;
};
export type Facility_inventoryAvgAggregateInputType = {
    id?: true;
};
export type Facility_inventorySumAggregateInputType = {
    id?: true;
};
export type Facility_inventoryMinAggregateInputType = {
    id?: true;
    school_id?: true;
    iern?: true;
    building_name?: true;
    category?: true;
    status?: true;
    created_at?: true;
};
export type Facility_inventoryMaxAggregateInputType = {
    id?: true;
    school_id?: true;
    iern?: true;
    building_name?: true;
    category?: true;
    status?: true;
    created_at?: true;
};
export type Facility_inventoryCountAggregateInputType = {
    id?: true;
    school_id?: true;
    iern?: true;
    building_name?: true;
    category?: true;
    status?: true;
    created_at?: true;
    _all?: true;
};
export type Facility_inventoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.facility_inventoryWhereInput;
    orderBy?: Prisma.facility_inventoryOrderByWithRelationInput | Prisma.facility_inventoryOrderByWithRelationInput[];
    cursor?: Prisma.facility_inventoryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Facility_inventoryCountAggregateInputType;
    _avg?: Facility_inventoryAvgAggregateInputType;
    _sum?: Facility_inventorySumAggregateInputType;
    _min?: Facility_inventoryMinAggregateInputType;
    _max?: Facility_inventoryMaxAggregateInputType;
};
export type GetFacility_inventoryAggregateType<T extends Facility_inventoryAggregateArgs> = {
    [P in keyof T & keyof AggregateFacility_inventory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFacility_inventory[P]> : Prisma.GetScalarType<T[P], AggregateFacility_inventory[P]>;
};
export type facility_inventoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.facility_inventoryWhereInput;
    orderBy?: Prisma.facility_inventoryOrderByWithAggregationInput | Prisma.facility_inventoryOrderByWithAggregationInput[];
    by: Prisma.Facility_inventoryScalarFieldEnum[] | Prisma.Facility_inventoryScalarFieldEnum;
    having?: Prisma.facility_inventoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Facility_inventoryCountAggregateInputType | true;
    _avg?: Facility_inventoryAvgAggregateInputType;
    _sum?: Facility_inventorySumAggregateInputType;
    _min?: Facility_inventoryMinAggregateInputType;
    _max?: Facility_inventoryMaxAggregateInputType;
};
export type Facility_inventoryGroupByOutputType = {
    id: number;
    school_id: string | null;
    iern: string | null;
    building_name: string;
    category: string;
    status: string;
    created_at: Date | null;
    _count: Facility_inventoryCountAggregateOutputType | null;
    _avg: Facility_inventoryAvgAggregateOutputType | null;
    _sum: Facility_inventorySumAggregateOutputType | null;
    _min: Facility_inventoryMinAggregateOutputType | null;
    _max: Facility_inventoryMaxAggregateOutputType | null;
};
export type GetFacility_inventoryGroupByPayload<T extends facility_inventoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Facility_inventoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Facility_inventoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Facility_inventoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Facility_inventoryGroupByOutputType[P]>;
}>>;
export type facility_inventoryWhereInput = {
    AND?: Prisma.facility_inventoryWhereInput | Prisma.facility_inventoryWhereInput[];
    OR?: Prisma.facility_inventoryWhereInput[];
    NOT?: Prisma.facility_inventoryWhereInput | Prisma.facility_inventoryWhereInput[];
    id?: Prisma.IntFilter<"facility_inventory"> | number;
    school_id?: Prisma.StringNullableFilter<"facility_inventory"> | string | null;
    iern?: Prisma.StringNullableFilter<"facility_inventory"> | string | null;
    building_name?: Prisma.StringFilter<"facility_inventory"> | string;
    category?: Prisma.StringFilter<"facility_inventory"> | string;
    status?: Prisma.StringFilter<"facility_inventory"> | string;
    created_at?: Prisma.DateTimeNullableFilter<"facility_inventory"> | Date | string | null;
    facility_rooms?: Prisma.Facility_roomsListRelationFilter;
};
export type facility_inventoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    iern?: Prisma.SortOrderInput | Prisma.SortOrder;
    building_name?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    facility_rooms?: Prisma.facility_roomsOrderByRelationAggregateInput;
};
export type facility_inventoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.facility_inventoryWhereInput | Prisma.facility_inventoryWhereInput[];
    OR?: Prisma.facility_inventoryWhereInput[];
    NOT?: Prisma.facility_inventoryWhereInput | Prisma.facility_inventoryWhereInput[];
    school_id?: Prisma.StringNullableFilter<"facility_inventory"> | string | null;
    iern?: Prisma.StringNullableFilter<"facility_inventory"> | string | null;
    building_name?: Prisma.StringFilter<"facility_inventory"> | string;
    category?: Prisma.StringFilter<"facility_inventory"> | string;
    status?: Prisma.StringFilter<"facility_inventory"> | string;
    created_at?: Prisma.DateTimeNullableFilter<"facility_inventory"> | Date | string | null;
    facility_rooms?: Prisma.Facility_roomsListRelationFilter;
}, "id">;
export type facility_inventoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    iern?: Prisma.SortOrderInput | Prisma.SortOrder;
    building_name?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.facility_inventoryCountOrderByAggregateInput;
    _avg?: Prisma.facility_inventoryAvgOrderByAggregateInput;
    _max?: Prisma.facility_inventoryMaxOrderByAggregateInput;
    _min?: Prisma.facility_inventoryMinOrderByAggregateInput;
    _sum?: Prisma.facility_inventorySumOrderByAggregateInput;
};
export type facility_inventoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.facility_inventoryScalarWhereWithAggregatesInput | Prisma.facility_inventoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.facility_inventoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.facility_inventoryScalarWhereWithAggregatesInput | Prisma.facility_inventoryScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"facility_inventory"> | number;
    school_id?: Prisma.StringNullableWithAggregatesFilter<"facility_inventory"> | string | null;
    iern?: Prisma.StringNullableWithAggregatesFilter<"facility_inventory"> | string | null;
    building_name?: Prisma.StringWithAggregatesFilter<"facility_inventory"> | string;
    category?: Prisma.StringWithAggregatesFilter<"facility_inventory"> | string;
    status?: Prisma.StringWithAggregatesFilter<"facility_inventory"> | string;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"facility_inventory"> | Date | string | null;
};
export type facility_inventoryCreateInput = {
    school_id?: string | null;
    iern?: string | null;
    building_name: string;
    category: string;
    status: string;
    created_at?: Date | string | null;
    facility_rooms?: Prisma.facility_roomsCreateNestedManyWithoutFacility_inventoryInput;
};
export type facility_inventoryUncheckedCreateInput = {
    id?: number;
    school_id?: string | null;
    iern?: string | null;
    building_name: string;
    category: string;
    status: string;
    created_at?: Date | string | null;
    facility_rooms?: Prisma.facility_roomsUncheckedCreateNestedManyWithoutFacility_inventoryInput;
};
export type facility_inventoryUpdateInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    building_name?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    facility_rooms?: Prisma.facility_roomsUpdateManyWithoutFacility_inventoryNestedInput;
};
export type facility_inventoryUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    building_name?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    facility_rooms?: Prisma.facility_roomsUncheckedUpdateManyWithoutFacility_inventoryNestedInput;
};
export type facility_inventoryCreateManyInput = {
    id?: number;
    school_id?: string | null;
    iern?: string | null;
    building_name: string;
    category: string;
    status: string;
    created_at?: Date | string | null;
};
export type facility_inventoryUpdateManyMutationInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    building_name?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type facility_inventoryUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    building_name?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type facility_inventoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    building_name?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type facility_inventoryAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type facility_inventoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    building_name?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type facility_inventoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    building_name?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type facility_inventorySumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type Facility_inventoryNullableScalarRelationFilter = {
    is?: Prisma.facility_inventoryWhereInput | null;
    isNot?: Prisma.facility_inventoryWhereInput | null;
};
export type facility_inventoryCreateNestedOneWithoutFacility_roomsInput = {
    create?: Prisma.XOR<Prisma.facility_inventoryCreateWithoutFacility_roomsInput, Prisma.facility_inventoryUncheckedCreateWithoutFacility_roomsInput>;
    connectOrCreate?: Prisma.facility_inventoryCreateOrConnectWithoutFacility_roomsInput;
    connect?: Prisma.facility_inventoryWhereUniqueInput;
};
export type facility_inventoryUpdateOneWithoutFacility_roomsNestedInput = {
    create?: Prisma.XOR<Prisma.facility_inventoryCreateWithoutFacility_roomsInput, Prisma.facility_inventoryUncheckedCreateWithoutFacility_roomsInput>;
    connectOrCreate?: Prisma.facility_inventoryCreateOrConnectWithoutFacility_roomsInput;
    upsert?: Prisma.facility_inventoryUpsertWithoutFacility_roomsInput;
    disconnect?: Prisma.facility_inventoryWhereInput | boolean;
    delete?: Prisma.facility_inventoryWhereInput | boolean;
    connect?: Prisma.facility_inventoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.facility_inventoryUpdateToOneWithWhereWithoutFacility_roomsInput, Prisma.facility_inventoryUpdateWithoutFacility_roomsInput>, Prisma.facility_inventoryUncheckedUpdateWithoutFacility_roomsInput>;
};
export type facility_inventoryCreateWithoutFacility_roomsInput = {
    school_id?: string | null;
    iern?: string | null;
    building_name: string;
    category: string;
    status: string;
    created_at?: Date | string | null;
};
export type facility_inventoryUncheckedCreateWithoutFacility_roomsInput = {
    id?: number;
    school_id?: string | null;
    iern?: string | null;
    building_name: string;
    category: string;
    status: string;
    created_at?: Date | string | null;
};
export type facility_inventoryCreateOrConnectWithoutFacility_roomsInput = {
    where: Prisma.facility_inventoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.facility_inventoryCreateWithoutFacility_roomsInput, Prisma.facility_inventoryUncheckedCreateWithoutFacility_roomsInput>;
};
export type facility_inventoryUpsertWithoutFacility_roomsInput = {
    update: Prisma.XOR<Prisma.facility_inventoryUpdateWithoutFacility_roomsInput, Prisma.facility_inventoryUncheckedUpdateWithoutFacility_roomsInput>;
    create: Prisma.XOR<Prisma.facility_inventoryCreateWithoutFacility_roomsInput, Prisma.facility_inventoryUncheckedCreateWithoutFacility_roomsInput>;
    where?: Prisma.facility_inventoryWhereInput;
};
export type facility_inventoryUpdateToOneWithWhereWithoutFacility_roomsInput = {
    where?: Prisma.facility_inventoryWhereInput;
    data: Prisma.XOR<Prisma.facility_inventoryUpdateWithoutFacility_roomsInput, Prisma.facility_inventoryUncheckedUpdateWithoutFacility_roomsInput>;
};
export type facility_inventoryUpdateWithoutFacility_roomsInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    building_name?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type facility_inventoryUncheckedUpdateWithoutFacility_roomsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    building_name?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type Facility_inventoryCountOutputType = {
    facility_rooms: number;
};
export type Facility_inventoryCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    facility_rooms?: boolean | Facility_inventoryCountOutputTypeCountFacility_roomsArgs;
};
export type Facility_inventoryCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.Facility_inventoryCountOutputTypeSelect<ExtArgs> | null;
};
export type Facility_inventoryCountOutputTypeCountFacility_roomsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.facility_roomsWhereInput;
};
export type facility_inventorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    building_name?: boolean;
    category?: boolean;
    status?: boolean;
    created_at?: boolean;
    facility_rooms?: boolean | Prisma.facility_inventory$facility_roomsArgs<ExtArgs>;
    _count?: boolean | Prisma.Facility_inventoryCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["facility_inventory"]>;
export type facility_inventorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    building_name?: boolean;
    category?: boolean;
    status?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["facility_inventory"]>;
export type facility_inventorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    building_name?: boolean;
    category?: boolean;
    status?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["facility_inventory"]>;
export type facility_inventorySelectScalar = {
    id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    building_name?: boolean;
    category?: boolean;
    status?: boolean;
    created_at?: boolean;
};
export type facility_inventoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "school_id" | "iern" | "building_name" | "category" | "status" | "created_at", ExtArgs["result"]["facility_inventory"]>;
export type facility_inventoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    facility_rooms?: boolean | Prisma.facility_inventory$facility_roomsArgs<ExtArgs>;
    _count?: boolean | Prisma.Facility_inventoryCountOutputTypeDefaultArgs<ExtArgs>;
};
export type facility_inventoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type facility_inventoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $facility_inventoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "facility_inventory";
    objects: {
        facility_rooms: Prisma.$facility_roomsPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        school_id: string | null;
        iern: string | null;
        building_name: string;
        category: string;
        status: string;
        created_at: Date | null;
    }, ExtArgs["result"]["facility_inventory"]>;
    composites: {};
};
export type facility_inventoryGetPayload<S extends boolean | null | undefined | facility_inventoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$facility_inventoryPayload, S>;
export type facility_inventoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<facility_inventoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Facility_inventoryCountAggregateInputType | true;
};
export interface facility_inventoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['facility_inventory'];
        meta: {
            name: 'facility_inventory';
        };
    };
    findUnique<T extends facility_inventoryFindUniqueArgs>(args: Prisma.SelectSubset<T, facility_inventoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__facility_inventoryClient<runtime.Types.Result.GetResult<Prisma.$facility_inventoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends facility_inventoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, facility_inventoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__facility_inventoryClient<runtime.Types.Result.GetResult<Prisma.$facility_inventoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends facility_inventoryFindFirstArgs>(args?: Prisma.SelectSubset<T, facility_inventoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__facility_inventoryClient<runtime.Types.Result.GetResult<Prisma.$facility_inventoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends facility_inventoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, facility_inventoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__facility_inventoryClient<runtime.Types.Result.GetResult<Prisma.$facility_inventoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends facility_inventoryFindManyArgs>(args?: Prisma.SelectSubset<T, facility_inventoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$facility_inventoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends facility_inventoryCreateArgs>(args: Prisma.SelectSubset<T, facility_inventoryCreateArgs<ExtArgs>>): Prisma.Prisma__facility_inventoryClient<runtime.Types.Result.GetResult<Prisma.$facility_inventoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends facility_inventoryCreateManyArgs>(args?: Prisma.SelectSubset<T, facility_inventoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends facility_inventoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, facility_inventoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$facility_inventoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends facility_inventoryDeleteArgs>(args: Prisma.SelectSubset<T, facility_inventoryDeleteArgs<ExtArgs>>): Prisma.Prisma__facility_inventoryClient<runtime.Types.Result.GetResult<Prisma.$facility_inventoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends facility_inventoryUpdateArgs>(args: Prisma.SelectSubset<T, facility_inventoryUpdateArgs<ExtArgs>>): Prisma.Prisma__facility_inventoryClient<runtime.Types.Result.GetResult<Prisma.$facility_inventoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends facility_inventoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, facility_inventoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends facility_inventoryUpdateManyArgs>(args: Prisma.SelectSubset<T, facility_inventoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends facility_inventoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, facility_inventoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$facility_inventoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends facility_inventoryUpsertArgs>(args: Prisma.SelectSubset<T, facility_inventoryUpsertArgs<ExtArgs>>): Prisma.Prisma__facility_inventoryClient<runtime.Types.Result.GetResult<Prisma.$facility_inventoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends facility_inventoryCountArgs>(args?: Prisma.Subset<T, facility_inventoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Facility_inventoryCountAggregateOutputType> : number>;
    aggregate<T extends Facility_inventoryAggregateArgs>(args: Prisma.Subset<T, Facility_inventoryAggregateArgs>): Prisma.PrismaPromise<GetFacility_inventoryAggregateType<T>>;
    groupBy<T extends facility_inventoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: facility_inventoryGroupByArgs['orderBy'];
    } : {
        orderBy?: facility_inventoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, facility_inventoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFacility_inventoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: facility_inventoryFieldRefs;
}
export interface Prisma__facility_inventoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    facility_rooms<T extends Prisma.facility_inventory$facility_roomsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.facility_inventory$facility_roomsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$facility_roomsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface facility_inventoryFieldRefs {
    readonly id: Prisma.FieldRef<"facility_inventory", 'Int'>;
    readonly school_id: Prisma.FieldRef<"facility_inventory", 'String'>;
    readonly iern: Prisma.FieldRef<"facility_inventory", 'String'>;
    readonly building_name: Prisma.FieldRef<"facility_inventory", 'String'>;
    readonly category: Prisma.FieldRef<"facility_inventory", 'String'>;
    readonly status: Prisma.FieldRef<"facility_inventory", 'String'>;
    readonly created_at: Prisma.FieldRef<"facility_inventory", 'DateTime'>;
}
export type facility_inventoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_inventorySelect<ExtArgs> | null;
    omit?: Prisma.facility_inventoryOmit<ExtArgs> | null;
    include?: Prisma.facility_inventoryInclude<ExtArgs> | null;
    where: Prisma.facility_inventoryWhereUniqueInput;
};
export type facility_inventoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_inventorySelect<ExtArgs> | null;
    omit?: Prisma.facility_inventoryOmit<ExtArgs> | null;
    include?: Prisma.facility_inventoryInclude<ExtArgs> | null;
    where: Prisma.facility_inventoryWhereUniqueInput;
};
export type facility_inventoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_inventorySelect<ExtArgs> | null;
    omit?: Prisma.facility_inventoryOmit<ExtArgs> | null;
    include?: Prisma.facility_inventoryInclude<ExtArgs> | null;
    where?: Prisma.facility_inventoryWhereInput;
    orderBy?: Prisma.facility_inventoryOrderByWithRelationInput | Prisma.facility_inventoryOrderByWithRelationInput[];
    cursor?: Prisma.facility_inventoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Facility_inventoryScalarFieldEnum | Prisma.Facility_inventoryScalarFieldEnum[];
};
export type facility_inventoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_inventorySelect<ExtArgs> | null;
    omit?: Prisma.facility_inventoryOmit<ExtArgs> | null;
    include?: Prisma.facility_inventoryInclude<ExtArgs> | null;
    where?: Prisma.facility_inventoryWhereInput;
    orderBy?: Prisma.facility_inventoryOrderByWithRelationInput | Prisma.facility_inventoryOrderByWithRelationInput[];
    cursor?: Prisma.facility_inventoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Facility_inventoryScalarFieldEnum | Prisma.Facility_inventoryScalarFieldEnum[];
};
export type facility_inventoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_inventorySelect<ExtArgs> | null;
    omit?: Prisma.facility_inventoryOmit<ExtArgs> | null;
    include?: Prisma.facility_inventoryInclude<ExtArgs> | null;
    where?: Prisma.facility_inventoryWhereInput;
    orderBy?: Prisma.facility_inventoryOrderByWithRelationInput | Prisma.facility_inventoryOrderByWithRelationInput[];
    cursor?: Prisma.facility_inventoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Facility_inventoryScalarFieldEnum | Prisma.Facility_inventoryScalarFieldEnum[];
};
export type facility_inventoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_inventorySelect<ExtArgs> | null;
    omit?: Prisma.facility_inventoryOmit<ExtArgs> | null;
    include?: Prisma.facility_inventoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.facility_inventoryCreateInput, Prisma.facility_inventoryUncheckedCreateInput>;
};
export type facility_inventoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.facility_inventoryCreateManyInput | Prisma.facility_inventoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type facility_inventoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_inventorySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.facility_inventoryOmit<ExtArgs> | null;
    data: Prisma.facility_inventoryCreateManyInput | Prisma.facility_inventoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type facility_inventoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_inventorySelect<ExtArgs> | null;
    omit?: Prisma.facility_inventoryOmit<ExtArgs> | null;
    include?: Prisma.facility_inventoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.facility_inventoryUpdateInput, Prisma.facility_inventoryUncheckedUpdateInput>;
    where: Prisma.facility_inventoryWhereUniqueInput;
};
export type facility_inventoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.facility_inventoryUpdateManyMutationInput, Prisma.facility_inventoryUncheckedUpdateManyInput>;
    where?: Prisma.facility_inventoryWhereInput;
    limit?: number;
};
export type facility_inventoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_inventorySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.facility_inventoryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.facility_inventoryUpdateManyMutationInput, Prisma.facility_inventoryUncheckedUpdateManyInput>;
    where?: Prisma.facility_inventoryWhereInput;
    limit?: number;
};
export type facility_inventoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_inventorySelect<ExtArgs> | null;
    omit?: Prisma.facility_inventoryOmit<ExtArgs> | null;
    include?: Prisma.facility_inventoryInclude<ExtArgs> | null;
    where: Prisma.facility_inventoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.facility_inventoryCreateInput, Prisma.facility_inventoryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.facility_inventoryUpdateInput, Prisma.facility_inventoryUncheckedUpdateInput>;
};
export type facility_inventoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_inventorySelect<ExtArgs> | null;
    omit?: Prisma.facility_inventoryOmit<ExtArgs> | null;
    include?: Prisma.facility_inventoryInclude<ExtArgs> | null;
    where: Prisma.facility_inventoryWhereUniqueInput;
};
export type facility_inventoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.facility_inventoryWhereInput;
    limit?: number;
};
export type facility_inventory$facility_roomsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type facility_inventoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_inventorySelect<ExtArgs> | null;
    omit?: Prisma.facility_inventoryOmit<ExtArgs> | null;
    include?: Prisma.facility_inventoryInclude<ExtArgs> | null;
};
