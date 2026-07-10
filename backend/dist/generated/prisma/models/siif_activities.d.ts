import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type siif_activitiesModel = runtime.Types.Result.DefaultSelection<Prisma.$siif_activitiesPayload>;
export type AggregateSiif_activities = {
    _count: Siif_activitiesCountAggregateOutputType | null;
    _avg: Siif_activitiesAvgAggregateOutputType | null;
    _sum: Siif_activitiesSumAggregateOutputType | null;
    _min: Siif_activitiesMinAggregateOutputType | null;
    _max: Siif_activitiesMaxAggregateOutputType | null;
};
export type Siif_activitiesAvgAggregateOutputType = {
    siif_act_id: number | null;
    siif_int_id: number | null;
};
export type Siif_activitiesSumAggregateOutputType = {
    siif_act_id: number | null;
    siif_int_id: number | null;
};
export type Siif_activitiesMinAggregateOutputType = {
    siif_act_id: number | null;
    siif_int_id: number | null;
    activity_category: string | null;
    activity_specific: string | null;
};
export type Siif_activitiesMaxAggregateOutputType = {
    siif_act_id: number | null;
    siif_int_id: number | null;
    activity_category: string | null;
    activity_specific: string | null;
};
export type Siif_activitiesCountAggregateOutputType = {
    siif_act_id: number;
    siif_int_id: number;
    activity_category: number;
    activity_specific: number;
    _all: number;
};
export type Siif_activitiesAvgAggregateInputType = {
    siif_act_id?: true;
    siif_int_id?: true;
};
export type Siif_activitiesSumAggregateInputType = {
    siif_act_id?: true;
    siif_int_id?: true;
};
export type Siif_activitiesMinAggregateInputType = {
    siif_act_id?: true;
    siif_int_id?: true;
    activity_category?: true;
    activity_specific?: true;
};
export type Siif_activitiesMaxAggregateInputType = {
    siif_act_id?: true;
    siif_int_id?: true;
    activity_category?: true;
    activity_specific?: true;
};
export type Siif_activitiesCountAggregateInputType = {
    siif_act_id?: true;
    siif_int_id?: true;
    activity_category?: true;
    activity_specific?: true;
    _all?: true;
};
export type Siif_activitiesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_activitiesWhereInput;
    orderBy?: Prisma.siif_activitiesOrderByWithRelationInput | Prisma.siif_activitiesOrderByWithRelationInput[];
    cursor?: Prisma.siif_activitiesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Siif_activitiesCountAggregateInputType;
    _avg?: Siif_activitiesAvgAggregateInputType;
    _sum?: Siif_activitiesSumAggregateInputType;
    _min?: Siif_activitiesMinAggregateInputType;
    _max?: Siif_activitiesMaxAggregateInputType;
};
export type GetSiif_activitiesAggregateType<T extends Siif_activitiesAggregateArgs> = {
    [P in keyof T & keyof AggregateSiif_activities]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSiif_activities[P]> : Prisma.GetScalarType<T[P], AggregateSiif_activities[P]>;
};
export type siif_activitiesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_activitiesWhereInput;
    orderBy?: Prisma.siif_activitiesOrderByWithAggregationInput | Prisma.siif_activitiesOrderByWithAggregationInput[];
    by: Prisma.Siif_activitiesScalarFieldEnum[] | Prisma.Siif_activitiesScalarFieldEnum;
    having?: Prisma.siif_activitiesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Siif_activitiesCountAggregateInputType | true;
    _avg?: Siif_activitiesAvgAggregateInputType;
    _sum?: Siif_activitiesSumAggregateInputType;
    _min?: Siif_activitiesMinAggregateInputType;
    _max?: Siif_activitiesMaxAggregateInputType;
};
export type Siif_activitiesGroupByOutputType = {
    siif_act_id: number;
    siif_int_id: number | null;
    activity_category: string | null;
    activity_specific: string | null;
    _count: Siif_activitiesCountAggregateOutputType | null;
    _avg: Siif_activitiesAvgAggregateOutputType | null;
    _sum: Siif_activitiesSumAggregateOutputType | null;
    _min: Siif_activitiesMinAggregateOutputType | null;
    _max: Siif_activitiesMaxAggregateOutputType | null;
};
export type GetSiif_activitiesGroupByPayload<T extends siif_activitiesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Siif_activitiesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Siif_activitiesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Siif_activitiesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Siif_activitiesGroupByOutputType[P]>;
}>>;
export type siif_activitiesWhereInput = {
    AND?: Prisma.siif_activitiesWhereInput | Prisma.siif_activitiesWhereInput[];
    OR?: Prisma.siif_activitiesWhereInput[];
    NOT?: Prisma.siif_activitiesWhereInput | Prisma.siif_activitiesWhereInput[];
    siif_act_id?: Prisma.IntFilter<"siif_activities"> | number;
    siif_int_id?: Prisma.IntNullableFilter<"siif_activities"> | number | null;
    activity_category?: Prisma.StringNullableFilter<"siif_activities"> | string | null;
    activity_specific?: Prisma.StringNullableFilter<"siif_activities"> | string | null;
    siif_interventions?: Prisma.XOR<Prisma.Siif_interventionsNullableScalarRelationFilter, Prisma.siif_interventionsWhereInput> | null;
};
export type siif_activitiesOrderByWithRelationInput = {
    siif_act_id?: Prisma.SortOrder;
    siif_int_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    activity_category?: Prisma.SortOrderInput | Prisma.SortOrder;
    activity_specific?: Prisma.SortOrderInput | Prisma.SortOrder;
    siif_interventions?: Prisma.siif_interventionsOrderByWithRelationInput;
};
export type siif_activitiesWhereUniqueInput = Prisma.AtLeast<{
    siif_act_id?: number;
    AND?: Prisma.siif_activitiesWhereInput | Prisma.siif_activitiesWhereInput[];
    OR?: Prisma.siif_activitiesWhereInput[];
    NOT?: Prisma.siif_activitiesWhereInput | Prisma.siif_activitiesWhereInput[];
    siif_int_id?: Prisma.IntNullableFilter<"siif_activities"> | number | null;
    activity_category?: Prisma.StringNullableFilter<"siif_activities"> | string | null;
    activity_specific?: Prisma.StringNullableFilter<"siif_activities"> | string | null;
    siif_interventions?: Prisma.XOR<Prisma.Siif_interventionsNullableScalarRelationFilter, Prisma.siif_interventionsWhereInput> | null;
}, "siif_act_id">;
export type siif_activitiesOrderByWithAggregationInput = {
    siif_act_id?: Prisma.SortOrder;
    siif_int_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    activity_category?: Prisma.SortOrderInput | Prisma.SortOrder;
    activity_specific?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.siif_activitiesCountOrderByAggregateInput;
    _avg?: Prisma.siif_activitiesAvgOrderByAggregateInput;
    _max?: Prisma.siif_activitiesMaxOrderByAggregateInput;
    _min?: Prisma.siif_activitiesMinOrderByAggregateInput;
    _sum?: Prisma.siif_activitiesSumOrderByAggregateInput;
};
export type siif_activitiesScalarWhereWithAggregatesInput = {
    AND?: Prisma.siif_activitiesScalarWhereWithAggregatesInput | Prisma.siif_activitiesScalarWhereWithAggregatesInput[];
    OR?: Prisma.siif_activitiesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.siif_activitiesScalarWhereWithAggregatesInput | Prisma.siif_activitiesScalarWhereWithAggregatesInput[];
    siif_act_id?: Prisma.IntWithAggregatesFilter<"siif_activities"> | number;
    siif_int_id?: Prisma.IntNullableWithAggregatesFilter<"siif_activities"> | number | null;
    activity_category?: Prisma.StringNullableWithAggregatesFilter<"siif_activities"> | string | null;
    activity_specific?: Prisma.StringNullableWithAggregatesFilter<"siif_activities"> | string | null;
};
export type siif_activitiesCreateInput = {
    activity_category?: string | null;
    activity_specific?: string | null;
    siif_interventions?: Prisma.siif_interventionsCreateNestedOneWithoutSiif_activitiesInput;
};
export type siif_activitiesUncheckedCreateInput = {
    siif_act_id?: number;
    siif_int_id?: number | null;
    activity_category?: string | null;
    activity_specific?: string | null;
};
export type siif_activitiesUpdateInput = {
    activity_category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activity_specific?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    siif_interventions?: Prisma.siif_interventionsUpdateOneWithoutSiif_activitiesNestedInput;
};
export type siif_activitiesUncheckedUpdateInput = {
    siif_act_id?: Prisma.IntFieldUpdateOperationsInput | number;
    siif_int_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    activity_category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activity_specific?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type siif_activitiesCreateManyInput = {
    siif_act_id?: number;
    siif_int_id?: number | null;
    activity_category?: string | null;
    activity_specific?: string | null;
};
export type siif_activitiesUpdateManyMutationInput = {
    activity_category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activity_specific?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type siif_activitiesUncheckedUpdateManyInput = {
    siif_act_id?: Prisma.IntFieldUpdateOperationsInput | number;
    siif_int_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    activity_category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activity_specific?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type siif_activitiesCountOrderByAggregateInput = {
    siif_act_id?: Prisma.SortOrder;
    siif_int_id?: Prisma.SortOrder;
    activity_category?: Prisma.SortOrder;
    activity_specific?: Prisma.SortOrder;
};
export type siif_activitiesAvgOrderByAggregateInput = {
    siif_act_id?: Prisma.SortOrder;
    siif_int_id?: Prisma.SortOrder;
};
export type siif_activitiesMaxOrderByAggregateInput = {
    siif_act_id?: Prisma.SortOrder;
    siif_int_id?: Prisma.SortOrder;
    activity_category?: Prisma.SortOrder;
    activity_specific?: Prisma.SortOrder;
};
export type siif_activitiesMinOrderByAggregateInput = {
    siif_act_id?: Prisma.SortOrder;
    siif_int_id?: Prisma.SortOrder;
    activity_category?: Prisma.SortOrder;
    activity_specific?: Prisma.SortOrder;
};
export type siif_activitiesSumOrderByAggregateInput = {
    siif_act_id?: Prisma.SortOrder;
    siif_int_id?: Prisma.SortOrder;
};
export type Siif_activitiesListRelationFilter = {
    every?: Prisma.siif_activitiesWhereInput;
    some?: Prisma.siif_activitiesWhereInput;
    none?: Prisma.siif_activitiesWhereInput;
};
export type siif_activitiesOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type siif_activitiesCreateNestedManyWithoutSiif_interventionsInput = {
    create?: Prisma.XOR<Prisma.siif_activitiesCreateWithoutSiif_interventionsInput, Prisma.siif_activitiesUncheckedCreateWithoutSiif_interventionsInput> | Prisma.siif_activitiesCreateWithoutSiif_interventionsInput[] | Prisma.siif_activitiesUncheckedCreateWithoutSiif_interventionsInput[];
    connectOrCreate?: Prisma.siif_activitiesCreateOrConnectWithoutSiif_interventionsInput | Prisma.siif_activitiesCreateOrConnectWithoutSiif_interventionsInput[];
    createMany?: Prisma.siif_activitiesCreateManySiif_interventionsInputEnvelope;
    connect?: Prisma.siif_activitiesWhereUniqueInput | Prisma.siif_activitiesWhereUniqueInput[];
};
export type siif_activitiesUncheckedCreateNestedManyWithoutSiif_interventionsInput = {
    create?: Prisma.XOR<Prisma.siif_activitiesCreateWithoutSiif_interventionsInput, Prisma.siif_activitiesUncheckedCreateWithoutSiif_interventionsInput> | Prisma.siif_activitiesCreateWithoutSiif_interventionsInput[] | Prisma.siif_activitiesUncheckedCreateWithoutSiif_interventionsInput[];
    connectOrCreate?: Prisma.siif_activitiesCreateOrConnectWithoutSiif_interventionsInput | Prisma.siif_activitiesCreateOrConnectWithoutSiif_interventionsInput[];
    createMany?: Prisma.siif_activitiesCreateManySiif_interventionsInputEnvelope;
    connect?: Prisma.siif_activitiesWhereUniqueInput | Prisma.siif_activitiesWhereUniqueInput[];
};
export type siif_activitiesUpdateManyWithoutSiif_interventionsNestedInput = {
    create?: Prisma.XOR<Prisma.siif_activitiesCreateWithoutSiif_interventionsInput, Prisma.siif_activitiesUncheckedCreateWithoutSiif_interventionsInput> | Prisma.siif_activitiesCreateWithoutSiif_interventionsInput[] | Prisma.siif_activitiesUncheckedCreateWithoutSiif_interventionsInput[];
    connectOrCreate?: Prisma.siif_activitiesCreateOrConnectWithoutSiif_interventionsInput | Prisma.siif_activitiesCreateOrConnectWithoutSiif_interventionsInput[];
    upsert?: Prisma.siif_activitiesUpsertWithWhereUniqueWithoutSiif_interventionsInput | Prisma.siif_activitiesUpsertWithWhereUniqueWithoutSiif_interventionsInput[];
    createMany?: Prisma.siif_activitiesCreateManySiif_interventionsInputEnvelope;
    set?: Prisma.siif_activitiesWhereUniqueInput | Prisma.siif_activitiesWhereUniqueInput[];
    disconnect?: Prisma.siif_activitiesWhereUniqueInput | Prisma.siif_activitiesWhereUniqueInput[];
    delete?: Prisma.siif_activitiesWhereUniqueInput | Prisma.siif_activitiesWhereUniqueInput[];
    connect?: Prisma.siif_activitiesWhereUniqueInput | Prisma.siif_activitiesWhereUniqueInput[];
    update?: Prisma.siif_activitiesUpdateWithWhereUniqueWithoutSiif_interventionsInput | Prisma.siif_activitiesUpdateWithWhereUniqueWithoutSiif_interventionsInput[];
    updateMany?: Prisma.siif_activitiesUpdateManyWithWhereWithoutSiif_interventionsInput | Prisma.siif_activitiesUpdateManyWithWhereWithoutSiif_interventionsInput[];
    deleteMany?: Prisma.siif_activitiesScalarWhereInput | Prisma.siif_activitiesScalarWhereInput[];
};
export type siif_activitiesUncheckedUpdateManyWithoutSiif_interventionsNestedInput = {
    create?: Prisma.XOR<Prisma.siif_activitiesCreateWithoutSiif_interventionsInput, Prisma.siif_activitiesUncheckedCreateWithoutSiif_interventionsInput> | Prisma.siif_activitiesCreateWithoutSiif_interventionsInput[] | Prisma.siif_activitiesUncheckedCreateWithoutSiif_interventionsInput[];
    connectOrCreate?: Prisma.siif_activitiesCreateOrConnectWithoutSiif_interventionsInput | Prisma.siif_activitiesCreateOrConnectWithoutSiif_interventionsInput[];
    upsert?: Prisma.siif_activitiesUpsertWithWhereUniqueWithoutSiif_interventionsInput | Prisma.siif_activitiesUpsertWithWhereUniqueWithoutSiif_interventionsInput[];
    createMany?: Prisma.siif_activitiesCreateManySiif_interventionsInputEnvelope;
    set?: Prisma.siif_activitiesWhereUniqueInput | Prisma.siif_activitiesWhereUniqueInput[];
    disconnect?: Prisma.siif_activitiesWhereUniqueInput | Prisma.siif_activitiesWhereUniqueInput[];
    delete?: Prisma.siif_activitiesWhereUniqueInput | Prisma.siif_activitiesWhereUniqueInput[];
    connect?: Prisma.siif_activitiesWhereUniqueInput | Prisma.siif_activitiesWhereUniqueInput[];
    update?: Prisma.siif_activitiesUpdateWithWhereUniqueWithoutSiif_interventionsInput | Prisma.siif_activitiesUpdateWithWhereUniqueWithoutSiif_interventionsInput[];
    updateMany?: Prisma.siif_activitiesUpdateManyWithWhereWithoutSiif_interventionsInput | Prisma.siif_activitiesUpdateManyWithWhereWithoutSiif_interventionsInput[];
    deleteMany?: Prisma.siif_activitiesScalarWhereInput | Prisma.siif_activitiesScalarWhereInput[];
};
export type siif_activitiesCreateWithoutSiif_interventionsInput = {
    activity_category?: string | null;
    activity_specific?: string | null;
};
export type siif_activitiesUncheckedCreateWithoutSiif_interventionsInput = {
    siif_act_id?: number;
    activity_category?: string | null;
    activity_specific?: string | null;
};
export type siif_activitiesCreateOrConnectWithoutSiif_interventionsInput = {
    where: Prisma.siif_activitiesWhereUniqueInput;
    create: Prisma.XOR<Prisma.siif_activitiesCreateWithoutSiif_interventionsInput, Prisma.siif_activitiesUncheckedCreateWithoutSiif_interventionsInput>;
};
export type siif_activitiesCreateManySiif_interventionsInputEnvelope = {
    data: Prisma.siif_activitiesCreateManySiif_interventionsInput | Prisma.siif_activitiesCreateManySiif_interventionsInput[];
    skipDuplicates?: boolean;
};
export type siif_activitiesUpsertWithWhereUniqueWithoutSiif_interventionsInput = {
    where: Prisma.siif_activitiesWhereUniqueInput;
    update: Prisma.XOR<Prisma.siif_activitiesUpdateWithoutSiif_interventionsInput, Prisma.siif_activitiesUncheckedUpdateWithoutSiif_interventionsInput>;
    create: Prisma.XOR<Prisma.siif_activitiesCreateWithoutSiif_interventionsInput, Prisma.siif_activitiesUncheckedCreateWithoutSiif_interventionsInput>;
};
export type siif_activitiesUpdateWithWhereUniqueWithoutSiif_interventionsInput = {
    where: Prisma.siif_activitiesWhereUniqueInput;
    data: Prisma.XOR<Prisma.siif_activitiesUpdateWithoutSiif_interventionsInput, Prisma.siif_activitiesUncheckedUpdateWithoutSiif_interventionsInput>;
};
export type siif_activitiesUpdateManyWithWhereWithoutSiif_interventionsInput = {
    where: Prisma.siif_activitiesScalarWhereInput;
    data: Prisma.XOR<Prisma.siif_activitiesUpdateManyMutationInput, Prisma.siif_activitiesUncheckedUpdateManyWithoutSiif_interventionsInput>;
};
export type siif_activitiesScalarWhereInput = {
    AND?: Prisma.siif_activitiesScalarWhereInput | Prisma.siif_activitiesScalarWhereInput[];
    OR?: Prisma.siif_activitiesScalarWhereInput[];
    NOT?: Prisma.siif_activitiesScalarWhereInput | Prisma.siif_activitiesScalarWhereInput[];
    siif_act_id?: Prisma.IntFilter<"siif_activities"> | number;
    siif_int_id?: Prisma.IntNullableFilter<"siif_activities"> | number | null;
    activity_category?: Prisma.StringNullableFilter<"siif_activities"> | string | null;
    activity_specific?: Prisma.StringNullableFilter<"siif_activities"> | string | null;
};
export type siif_activitiesCreateManySiif_interventionsInput = {
    siif_act_id?: number;
    activity_category?: string | null;
    activity_specific?: string | null;
};
export type siif_activitiesUpdateWithoutSiif_interventionsInput = {
    activity_category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activity_specific?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type siif_activitiesUncheckedUpdateWithoutSiif_interventionsInput = {
    siif_act_id?: Prisma.IntFieldUpdateOperationsInput | number;
    activity_category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activity_specific?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type siif_activitiesUncheckedUpdateManyWithoutSiif_interventionsInput = {
    siif_act_id?: Prisma.IntFieldUpdateOperationsInput | number;
    activity_category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activity_specific?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type siif_activitiesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    siif_act_id?: boolean;
    siif_int_id?: boolean;
    activity_category?: boolean;
    activity_specific?: boolean;
    siif_interventions?: boolean | Prisma.siif_activities$siif_interventionsArgs<ExtArgs>;
}, ExtArgs["result"]["siif_activities"]>;
export type siif_activitiesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    siif_act_id?: boolean;
    siif_int_id?: boolean;
    activity_category?: boolean;
    activity_specific?: boolean;
    siif_interventions?: boolean | Prisma.siif_activities$siif_interventionsArgs<ExtArgs>;
}, ExtArgs["result"]["siif_activities"]>;
export type siif_activitiesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    siif_act_id?: boolean;
    siif_int_id?: boolean;
    activity_category?: boolean;
    activity_specific?: boolean;
    siif_interventions?: boolean | Prisma.siif_activities$siif_interventionsArgs<ExtArgs>;
}, ExtArgs["result"]["siif_activities"]>;
export type siif_activitiesSelectScalar = {
    siif_act_id?: boolean;
    siif_int_id?: boolean;
    activity_category?: boolean;
    activity_specific?: boolean;
};
export type siif_activitiesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"siif_act_id" | "siif_int_id" | "activity_category" | "activity_specific", ExtArgs["result"]["siif_activities"]>;
export type siif_activitiesInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    siif_interventions?: boolean | Prisma.siif_activities$siif_interventionsArgs<ExtArgs>;
};
export type siif_activitiesIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    siif_interventions?: boolean | Prisma.siif_activities$siif_interventionsArgs<ExtArgs>;
};
export type siif_activitiesIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    siif_interventions?: boolean | Prisma.siif_activities$siif_interventionsArgs<ExtArgs>;
};
export type $siif_activitiesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "siif_activities";
    objects: {
        siif_interventions: Prisma.$siif_interventionsPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        siif_act_id: number;
        siif_int_id: number | null;
        activity_category: string | null;
        activity_specific: string | null;
    }, ExtArgs["result"]["siif_activities"]>;
    composites: {};
};
export type siif_activitiesGetPayload<S extends boolean | null | undefined | siif_activitiesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$siif_activitiesPayload, S>;
export type siif_activitiesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<siif_activitiesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Siif_activitiesCountAggregateInputType | true;
};
export interface siif_activitiesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['siif_activities'];
        meta: {
            name: 'siif_activities';
        };
    };
    findUnique<T extends siif_activitiesFindUniqueArgs>(args: Prisma.SelectSubset<T, siif_activitiesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__siif_activitiesClient<runtime.Types.Result.GetResult<Prisma.$siif_activitiesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends siif_activitiesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, siif_activitiesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__siif_activitiesClient<runtime.Types.Result.GetResult<Prisma.$siif_activitiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends siif_activitiesFindFirstArgs>(args?: Prisma.SelectSubset<T, siif_activitiesFindFirstArgs<ExtArgs>>): Prisma.Prisma__siif_activitiesClient<runtime.Types.Result.GetResult<Prisma.$siif_activitiesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends siif_activitiesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, siif_activitiesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__siif_activitiesClient<runtime.Types.Result.GetResult<Prisma.$siif_activitiesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends siif_activitiesFindManyArgs>(args?: Prisma.SelectSubset<T, siif_activitiesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_activitiesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends siif_activitiesCreateArgs>(args: Prisma.SelectSubset<T, siif_activitiesCreateArgs<ExtArgs>>): Prisma.Prisma__siif_activitiesClient<runtime.Types.Result.GetResult<Prisma.$siif_activitiesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends siif_activitiesCreateManyArgs>(args?: Prisma.SelectSubset<T, siif_activitiesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends siif_activitiesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, siif_activitiesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_activitiesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends siif_activitiesDeleteArgs>(args: Prisma.SelectSubset<T, siif_activitiesDeleteArgs<ExtArgs>>): Prisma.Prisma__siif_activitiesClient<runtime.Types.Result.GetResult<Prisma.$siif_activitiesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends siif_activitiesUpdateArgs>(args: Prisma.SelectSubset<T, siif_activitiesUpdateArgs<ExtArgs>>): Prisma.Prisma__siif_activitiesClient<runtime.Types.Result.GetResult<Prisma.$siif_activitiesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends siif_activitiesDeleteManyArgs>(args?: Prisma.SelectSubset<T, siif_activitiesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends siif_activitiesUpdateManyArgs>(args: Prisma.SelectSubset<T, siif_activitiesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends siif_activitiesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, siif_activitiesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_activitiesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends siif_activitiesUpsertArgs>(args: Prisma.SelectSubset<T, siif_activitiesUpsertArgs<ExtArgs>>): Prisma.Prisma__siif_activitiesClient<runtime.Types.Result.GetResult<Prisma.$siif_activitiesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends siif_activitiesCountArgs>(args?: Prisma.Subset<T, siif_activitiesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Siif_activitiesCountAggregateOutputType> : number>;
    aggregate<T extends Siif_activitiesAggregateArgs>(args: Prisma.Subset<T, Siif_activitiesAggregateArgs>): Prisma.PrismaPromise<GetSiif_activitiesAggregateType<T>>;
    groupBy<T extends siif_activitiesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: siif_activitiesGroupByArgs['orderBy'];
    } : {
        orderBy?: siif_activitiesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, siif_activitiesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiif_activitiesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: siif_activitiesFieldRefs;
}
export interface Prisma__siif_activitiesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    siif_interventions<T extends Prisma.siif_activities$siif_interventionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.siif_activities$siif_interventionsArgs<ExtArgs>>): Prisma.Prisma__siif_interventionsClient<runtime.Types.Result.GetResult<Prisma.$siif_interventionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface siif_activitiesFieldRefs {
    readonly siif_act_id: Prisma.FieldRef<"siif_activities", 'Int'>;
    readonly siif_int_id: Prisma.FieldRef<"siif_activities", 'Int'>;
    readonly activity_category: Prisma.FieldRef<"siif_activities", 'String'>;
    readonly activity_specific: Prisma.FieldRef<"siif_activities", 'String'>;
}
export type siif_activitiesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_activitiesSelect<ExtArgs> | null;
    omit?: Prisma.siif_activitiesOmit<ExtArgs> | null;
    include?: Prisma.siif_activitiesInclude<ExtArgs> | null;
    where: Prisma.siif_activitiesWhereUniqueInput;
};
export type siif_activitiesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_activitiesSelect<ExtArgs> | null;
    omit?: Prisma.siif_activitiesOmit<ExtArgs> | null;
    include?: Prisma.siif_activitiesInclude<ExtArgs> | null;
    where: Prisma.siif_activitiesWhereUniqueInput;
};
export type siif_activitiesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_activitiesSelect<ExtArgs> | null;
    omit?: Prisma.siif_activitiesOmit<ExtArgs> | null;
    include?: Prisma.siif_activitiesInclude<ExtArgs> | null;
    where?: Prisma.siif_activitiesWhereInput;
    orderBy?: Prisma.siif_activitiesOrderByWithRelationInput | Prisma.siif_activitiesOrderByWithRelationInput[];
    cursor?: Prisma.siif_activitiesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Siif_activitiesScalarFieldEnum | Prisma.Siif_activitiesScalarFieldEnum[];
};
export type siif_activitiesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_activitiesSelect<ExtArgs> | null;
    omit?: Prisma.siif_activitiesOmit<ExtArgs> | null;
    include?: Prisma.siif_activitiesInclude<ExtArgs> | null;
    where?: Prisma.siif_activitiesWhereInput;
    orderBy?: Prisma.siif_activitiesOrderByWithRelationInput | Prisma.siif_activitiesOrderByWithRelationInput[];
    cursor?: Prisma.siif_activitiesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Siif_activitiesScalarFieldEnum | Prisma.Siif_activitiesScalarFieldEnum[];
};
export type siif_activitiesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_activitiesSelect<ExtArgs> | null;
    omit?: Prisma.siif_activitiesOmit<ExtArgs> | null;
    include?: Prisma.siif_activitiesInclude<ExtArgs> | null;
    where?: Prisma.siif_activitiesWhereInput;
    orderBy?: Prisma.siif_activitiesOrderByWithRelationInput | Prisma.siif_activitiesOrderByWithRelationInput[];
    cursor?: Prisma.siif_activitiesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Siif_activitiesScalarFieldEnum | Prisma.Siif_activitiesScalarFieldEnum[];
};
export type siif_activitiesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_activitiesSelect<ExtArgs> | null;
    omit?: Prisma.siif_activitiesOmit<ExtArgs> | null;
    include?: Prisma.siif_activitiesInclude<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.siif_activitiesCreateInput, Prisma.siif_activitiesUncheckedCreateInput>;
};
export type siif_activitiesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.siif_activitiesCreateManyInput | Prisma.siif_activitiesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type siif_activitiesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_activitiesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.siif_activitiesOmit<ExtArgs> | null;
    data: Prisma.siif_activitiesCreateManyInput | Prisma.siif_activitiesCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.siif_activitiesIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type siif_activitiesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_activitiesSelect<ExtArgs> | null;
    omit?: Prisma.siif_activitiesOmit<ExtArgs> | null;
    include?: Prisma.siif_activitiesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.siif_activitiesUpdateInput, Prisma.siif_activitiesUncheckedUpdateInput>;
    where: Prisma.siif_activitiesWhereUniqueInput;
};
export type siif_activitiesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.siif_activitiesUpdateManyMutationInput, Prisma.siif_activitiesUncheckedUpdateManyInput>;
    where?: Prisma.siif_activitiesWhereInput;
    limit?: number;
};
export type siif_activitiesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_activitiesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.siif_activitiesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.siif_activitiesUpdateManyMutationInput, Prisma.siif_activitiesUncheckedUpdateManyInput>;
    where?: Prisma.siif_activitiesWhereInput;
    limit?: number;
    include?: Prisma.siif_activitiesIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type siif_activitiesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_activitiesSelect<ExtArgs> | null;
    omit?: Prisma.siif_activitiesOmit<ExtArgs> | null;
    include?: Prisma.siif_activitiesInclude<ExtArgs> | null;
    where: Prisma.siif_activitiesWhereUniqueInput;
    create: Prisma.XOR<Prisma.siif_activitiesCreateInput, Prisma.siif_activitiesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.siif_activitiesUpdateInput, Prisma.siif_activitiesUncheckedUpdateInput>;
};
export type siif_activitiesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_activitiesSelect<ExtArgs> | null;
    omit?: Prisma.siif_activitiesOmit<ExtArgs> | null;
    include?: Prisma.siif_activitiesInclude<ExtArgs> | null;
    where: Prisma.siif_activitiesWhereUniqueInput;
};
export type siif_activitiesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_activitiesWhereInput;
    limit?: number;
};
export type siif_activities$siif_interventionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_interventionsSelect<ExtArgs> | null;
    omit?: Prisma.siif_interventionsOmit<ExtArgs> | null;
    include?: Prisma.siif_interventionsInclude<ExtArgs> | null;
    where?: Prisma.siif_interventionsWhereInput;
};
export type siif_activitiesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_activitiesSelect<ExtArgs> | null;
    omit?: Prisma.siif_activitiesOmit<ExtArgs> | null;
    include?: Prisma.siif_activitiesInclude<ExtArgs> | null;
};
