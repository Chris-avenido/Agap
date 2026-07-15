import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type facility_demolitionsModel = runtime.Types.Result.DefaultSelection<Prisma.$facility_demolitionsPayload>;
export type AggregateFacility_demolitions = {
    _count: Facility_demolitionsCountAggregateOutputType | null;
    _avg: Facility_demolitionsAvgAggregateOutputType | null;
    _sum: Facility_demolitionsSumAggregateOutputType | null;
    _min: Facility_demolitionsMinAggregateOutputType | null;
    _max: Facility_demolitionsMaxAggregateOutputType | null;
};
export type Facility_demolitionsAvgAggregateOutputType = {
    demolition_id: number | null;
};
export type Facility_demolitionsSumAggregateOutputType = {
    demolition_id: number | null;
};
export type Facility_demolitionsMinAggregateOutputType = {
    demolition_id: number | null;
    school_id: string | null;
    iern: string | null;
    building_no: string | null;
    created_at: Date | null;
};
export type Facility_demolitionsMaxAggregateOutputType = {
    demolition_id: number | null;
    school_id: string | null;
    iern: string | null;
    building_no: string | null;
    created_at: Date | null;
};
export type Facility_demolitionsCountAggregateOutputType = {
    demolition_id: number;
    school_id: number;
    iern: number;
    building_no: number;
    created_at: number;
    _all: number;
};
export type Facility_demolitionsAvgAggregateInputType = {
    demolition_id?: true;
};
export type Facility_demolitionsSumAggregateInputType = {
    demolition_id?: true;
};
export type Facility_demolitionsMinAggregateInputType = {
    demolition_id?: true;
    school_id?: true;
    iern?: true;
    building_no?: true;
    created_at?: true;
};
export type Facility_demolitionsMaxAggregateInputType = {
    demolition_id?: true;
    school_id?: true;
    iern?: true;
    building_no?: true;
    created_at?: true;
};
export type Facility_demolitionsCountAggregateInputType = {
    demolition_id?: true;
    school_id?: true;
    iern?: true;
    building_no?: true;
    created_at?: true;
    _all?: true;
};
export type Facility_demolitionsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.facility_demolitionsWhereInput;
    orderBy?: Prisma.facility_demolitionsOrderByWithRelationInput | Prisma.facility_demolitionsOrderByWithRelationInput[];
    cursor?: Prisma.facility_demolitionsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Facility_demolitionsCountAggregateInputType;
    _avg?: Facility_demolitionsAvgAggregateInputType;
    _sum?: Facility_demolitionsSumAggregateInputType;
    _min?: Facility_demolitionsMinAggregateInputType;
    _max?: Facility_demolitionsMaxAggregateInputType;
};
export type GetFacility_demolitionsAggregateType<T extends Facility_demolitionsAggregateArgs> = {
    [P in keyof T & keyof AggregateFacility_demolitions]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFacility_demolitions[P]> : Prisma.GetScalarType<T[P], AggregateFacility_demolitions[P]>;
};
export type facility_demolitionsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.facility_demolitionsWhereInput;
    orderBy?: Prisma.facility_demolitionsOrderByWithAggregationInput | Prisma.facility_demolitionsOrderByWithAggregationInput[];
    by: Prisma.Facility_demolitionsScalarFieldEnum[] | Prisma.Facility_demolitionsScalarFieldEnum;
    having?: Prisma.facility_demolitionsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Facility_demolitionsCountAggregateInputType | true;
    _avg?: Facility_demolitionsAvgAggregateInputType;
    _sum?: Facility_demolitionsSumAggregateInputType;
    _min?: Facility_demolitionsMinAggregateInputType;
    _max?: Facility_demolitionsMaxAggregateInputType;
};
export type Facility_demolitionsGroupByOutputType = {
    demolition_id: number;
    school_id: string | null;
    iern: string | null;
    building_no: string | null;
    created_at: Date | null;
    _count: Facility_demolitionsCountAggregateOutputType | null;
    _avg: Facility_demolitionsAvgAggregateOutputType | null;
    _sum: Facility_demolitionsSumAggregateOutputType | null;
    _min: Facility_demolitionsMinAggregateOutputType | null;
    _max: Facility_demolitionsMaxAggregateOutputType | null;
};
export type GetFacility_demolitionsGroupByPayload<T extends facility_demolitionsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Facility_demolitionsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Facility_demolitionsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Facility_demolitionsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Facility_demolitionsGroupByOutputType[P]>;
}>>;
export type facility_demolitionsWhereInput = {
    AND?: Prisma.facility_demolitionsWhereInput | Prisma.facility_demolitionsWhereInput[];
    OR?: Prisma.facility_demolitionsWhereInput[];
    NOT?: Prisma.facility_demolitionsWhereInput | Prisma.facility_demolitionsWhereInput[];
    demolition_id?: Prisma.IntFilter<"facility_demolitions"> | number;
    school_id?: Prisma.StringNullableFilter<"facility_demolitions"> | string | null;
    iern?: Prisma.StringNullableFilter<"facility_demolitions"> | string | null;
    building_no?: Prisma.StringNullableFilter<"facility_demolitions"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"facility_demolitions"> | Date | string | null;
};
export type facility_demolitionsOrderByWithRelationInput = {
    demolition_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    iern?: Prisma.SortOrderInput | Prisma.SortOrder;
    building_no?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type facility_demolitionsWhereUniqueInput = Prisma.AtLeast<{
    demolition_id?: number;
    AND?: Prisma.facility_demolitionsWhereInput | Prisma.facility_demolitionsWhereInput[];
    OR?: Prisma.facility_demolitionsWhereInput[];
    NOT?: Prisma.facility_demolitionsWhereInput | Prisma.facility_demolitionsWhereInput[];
    school_id?: Prisma.StringNullableFilter<"facility_demolitions"> | string | null;
    iern?: Prisma.StringNullableFilter<"facility_demolitions"> | string | null;
    building_no?: Prisma.StringNullableFilter<"facility_demolitions"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"facility_demolitions"> | Date | string | null;
}, "demolition_id">;
export type facility_demolitionsOrderByWithAggregationInput = {
    demolition_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    iern?: Prisma.SortOrderInput | Prisma.SortOrder;
    building_no?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.facility_demolitionsCountOrderByAggregateInput;
    _avg?: Prisma.facility_demolitionsAvgOrderByAggregateInput;
    _max?: Prisma.facility_demolitionsMaxOrderByAggregateInput;
    _min?: Prisma.facility_demolitionsMinOrderByAggregateInput;
    _sum?: Prisma.facility_demolitionsSumOrderByAggregateInput;
};
export type facility_demolitionsScalarWhereWithAggregatesInput = {
    AND?: Prisma.facility_demolitionsScalarWhereWithAggregatesInput | Prisma.facility_demolitionsScalarWhereWithAggregatesInput[];
    OR?: Prisma.facility_demolitionsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.facility_demolitionsScalarWhereWithAggregatesInput | Prisma.facility_demolitionsScalarWhereWithAggregatesInput[];
    demolition_id?: Prisma.IntWithAggregatesFilter<"facility_demolitions"> | number;
    school_id?: Prisma.StringNullableWithAggregatesFilter<"facility_demolitions"> | string | null;
    iern?: Prisma.StringNullableWithAggregatesFilter<"facility_demolitions"> | string | null;
    building_no?: Prisma.StringNullableWithAggregatesFilter<"facility_demolitions"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"facility_demolitions"> | Date | string | null;
};
export type facility_demolitionsCreateInput = {
    school_id?: string | null;
    iern?: string | null;
    building_no?: string | null;
    created_at?: Date | string | null;
};
export type facility_demolitionsUncheckedCreateInput = {
    demolition_id?: number;
    school_id?: string | null;
    iern?: string | null;
    building_no?: string | null;
    created_at?: Date | string | null;
};
export type facility_demolitionsUpdateInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    building_no?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type facility_demolitionsUncheckedUpdateInput = {
    demolition_id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    building_no?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type facility_demolitionsCreateManyInput = {
    demolition_id?: number;
    school_id?: string | null;
    iern?: string | null;
    building_no?: string | null;
    created_at?: Date | string | null;
};
export type facility_demolitionsUpdateManyMutationInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    building_no?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type facility_demolitionsUncheckedUpdateManyInput = {
    demolition_id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    building_no?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type facility_demolitionsCountOrderByAggregateInput = {
    demolition_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    building_no?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type facility_demolitionsAvgOrderByAggregateInput = {
    demolition_id?: Prisma.SortOrder;
};
export type facility_demolitionsMaxOrderByAggregateInput = {
    demolition_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    building_no?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type facility_demolitionsMinOrderByAggregateInput = {
    demolition_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    building_no?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type facility_demolitionsSumOrderByAggregateInput = {
    demolition_id?: Prisma.SortOrder;
};
export type facility_demolitionsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    demolition_id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    building_no?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["facility_demolitions"]>;
export type facility_demolitionsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    demolition_id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    building_no?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["facility_demolitions"]>;
export type facility_demolitionsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    demolition_id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    building_no?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["facility_demolitions"]>;
export type facility_demolitionsSelectScalar = {
    demolition_id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    building_no?: boolean;
    created_at?: boolean;
};
export type facility_demolitionsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"demolition_id" | "school_id" | "iern" | "building_no" | "created_at", ExtArgs["result"]["facility_demolitions"]>;
export type $facility_demolitionsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "facility_demolitions";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        demolition_id: number;
        school_id: string | null;
        iern: string | null;
        building_no: string | null;
        created_at: Date | null;
    }, ExtArgs["result"]["facility_demolitions"]>;
    composites: {};
};
export type facility_demolitionsGetPayload<S extends boolean | null | undefined | facility_demolitionsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$facility_demolitionsPayload, S>;
export type facility_demolitionsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<facility_demolitionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Facility_demolitionsCountAggregateInputType | true;
};
export interface facility_demolitionsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['facility_demolitions'];
        meta: {
            name: 'facility_demolitions';
        };
    };
    findUnique<T extends facility_demolitionsFindUniqueArgs>(args: Prisma.SelectSubset<T, facility_demolitionsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__facility_demolitionsClient<runtime.Types.Result.GetResult<Prisma.$facility_demolitionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends facility_demolitionsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, facility_demolitionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__facility_demolitionsClient<runtime.Types.Result.GetResult<Prisma.$facility_demolitionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends facility_demolitionsFindFirstArgs>(args?: Prisma.SelectSubset<T, facility_demolitionsFindFirstArgs<ExtArgs>>): Prisma.Prisma__facility_demolitionsClient<runtime.Types.Result.GetResult<Prisma.$facility_demolitionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends facility_demolitionsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, facility_demolitionsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__facility_demolitionsClient<runtime.Types.Result.GetResult<Prisma.$facility_demolitionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends facility_demolitionsFindManyArgs>(args?: Prisma.SelectSubset<T, facility_demolitionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$facility_demolitionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends facility_demolitionsCreateArgs>(args: Prisma.SelectSubset<T, facility_demolitionsCreateArgs<ExtArgs>>): Prisma.Prisma__facility_demolitionsClient<runtime.Types.Result.GetResult<Prisma.$facility_demolitionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends facility_demolitionsCreateManyArgs>(args?: Prisma.SelectSubset<T, facility_demolitionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends facility_demolitionsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, facility_demolitionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$facility_demolitionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends facility_demolitionsDeleteArgs>(args: Prisma.SelectSubset<T, facility_demolitionsDeleteArgs<ExtArgs>>): Prisma.Prisma__facility_demolitionsClient<runtime.Types.Result.GetResult<Prisma.$facility_demolitionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends facility_demolitionsUpdateArgs>(args: Prisma.SelectSubset<T, facility_demolitionsUpdateArgs<ExtArgs>>): Prisma.Prisma__facility_demolitionsClient<runtime.Types.Result.GetResult<Prisma.$facility_demolitionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends facility_demolitionsDeleteManyArgs>(args?: Prisma.SelectSubset<T, facility_demolitionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends facility_demolitionsUpdateManyArgs>(args: Prisma.SelectSubset<T, facility_demolitionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends facility_demolitionsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, facility_demolitionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$facility_demolitionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends facility_demolitionsUpsertArgs>(args: Prisma.SelectSubset<T, facility_demolitionsUpsertArgs<ExtArgs>>): Prisma.Prisma__facility_demolitionsClient<runtime.Types.Result.GetResult<Prisma.$facility_demolitionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends facility_demolitionsCountArgs>(args?: Prisma.Subset<T, facility_demolitionsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Facility_demolitionsCountAggregateOutputType> : number>;
    aggregate<T extends Facility_demolitionsAggregateArgs>(args: Prisma.Subset<T, Facility_demolitionsAggregateArgs>): Prisma.PrismaPromise<GetFacility_demolitionsAggregateType<T>>;
    groupBy<T extends facility_demolitionsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: facility_demolitionsGroupByArgs['orderBy'];
    } : {
        orderBy?: facility_demolitionsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, facility_demolitionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFacility_demolitionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: facility_demolitionsFieldRefs;
}
export interface Prisma__facility_demolitionsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface facility_demolitionsFieldRefs {
    readonly demolition_id: Prisma.FieldRef<"facility_demolitions", 'Int'>;
    readonly school_id: Prisma.FieldRef<"facility_demolitions", 'String'>;
    readonly iern: Prisma.FieldRef<"facility_demolitions", 'String'>;
    readonly building_no: Prisma.FieldRef<"facility_demolitions", 'String'>;
    readonly created_at: Prisma.FieldRef<"facility_demolitions", 'DateTime'>;
}
export type facility_demolitionsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_demolitionsSelect<ExtArgs> | null;
    omit?: Prisma.facility_demolitionsOmit<ExtArgs> | null;
    where: Prisma.facility_demolitionsWhereUniqueInput;
};
export type facility_demolitionsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_demolitionsSelect<ExtArgs> | null;
    omit?: Prisma.facility_demolitionsOmit<ExtArgs> | null;
    where: Prisma.facility_demolitionsWhereUniqueInput;
};
export type facility_demolitionsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_demolitionsSelect<ExtArgs> | null;
    omit?: Prisma.facility_demolitionsOmit<ExtArgs> | null;
    where?: Prisma.facility_demolitionsWhereInput;
    orderBy?: Prisma.facility_demolitionsOrderByWithRelationInput | Prisma.facility_demolitionsOrderByWithRelationInput[];
    cursor?: Prisma.facility_demolitionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Facility_demolitionsScalarFieldEnum | Prisma.Facility_demolitionsScalarFieldEnum[];
};
export type facility_demolitionsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_demolitionsSelect<ExtArgs> | null;
    omit?: Prisma.facility_demolitionsOmit<ExtArgs> | null;
    where?: Prisma.facility_demolitionsWhereInput;
    orderBy?: Prisma.facility_demolitionsOrderByWithRelationInput | Prisma.facility_demolitionsOrderByWithRelationInput[];
    cursor?: Prisma.facility_demolitionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Facility_demolitionsScalarFieldEnum | Prisma.Facility_demolitionsScalarFieldEnum[];
};
export type facility_demolitionsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_demolitionsSelect<ExtArgs> | null;
    omit?: Prisma.facility_demolitionsOmit<ExtArgs> | null;
    where?: Prisma.facility_demolitionsWhereInput;
    orderBy?: Prisma.facility_demolitionsOrderByWithRelationInput | Prisma.facility_demolitionsOrderByWithRelationInput[];
    cursor?: Prisma.facility_demolitionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Facility_demolitionsScalarFieldEnum | Prisma.Facility_demolitionsScalarFieldEnum[];
};
export type facility_demolitionsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_demolitionsSelect<ExtArgs> | null;
    omit?: Prisma.facility_demolitionsOmit<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.facility_demolitionsCreateInput, Prisma.facility_demolitionsUncheckedCreateInput>;
};
export type facility_demolitionsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.facility_demolitionsCreateManyInput | Prisma.facility_demolitionsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type facility_demolitionsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_demolitionsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.facility_demolitionsOmit<ExtArgs> | null;
    data: Prisma.facility_demolitionsCreateManyInput | Prisma.facility_demolitionsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type facility_demolitionsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_demolitionsSelect<ExtArgs> | null;
    omit?: Prisma.facility_demolitionsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.facility_demolitionsUpdateInput, Prisma.facility_demolitionsUncheckedUpdateInput>;
    where: Prisma.facility_demolitionsWhereUniqueInput;
};
export type facility_demolitionsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.facility_demolitionsUpdateManyMutationInput, Prisma.facility_demolitionsUncheckedUpdateManyInput>;
    where?: Prisma.facility_demolitionsWhereInput;
    limit?: number;
};
export type facility_demolitionsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_demolitionsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.facility_demolitionsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.facility_demolitionsUpdateManyMutationInput, Prisma.facility_demolitionsUncheckedUpdateManyInput>;
    where?: Prisma.facility_demolitionsWhereInput;
    limit?: number;
};
export type facility_demolitionsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_demolitionsSelect<ExtArgs> | null;
    omit?: Prisma.facility_demolitionsOmit<ExtArgs> | null;
    where: Prisma.facility_demolitionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.facility_demolitionsCreateInput, Prisma.facility_demolitionsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.facility_demolitionsUpdateInput, Prisma.facility_demolitionsUncheckedUpdateInput>;
};
export type facility_demolitionsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_demolitionsSelect<ExtArgs> | null;
    omit?: Prisma.facility_demolitionsOmit<ExtArgs> | null;
    where: Prisma.facility_demolitionsWhereUniqueInput;
};
export type facility_demolitionsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.facility_demolitionsWhereInput;
    limit?: number;
};
export type facility_demolitionsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.facility_demolitionsSelect<ExtArgs> | null;
    omit?: Prisma.facility_demolitionsOmit<ExtArgs> | null;
};
