import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ph_teachers_listModel = runtime.Types.Result.DefaultSelection<Prisma.$ph_teachers_listPayload>;
export type AggregatePh_teachers_list = {
    _count: Ph_teachers_listCountAggregateOutputType | null;
    _avg: Ph_teachers_listAvgAggregateOutputType | null;
    _sum: Ph_teachers_listSumAggregateOutputType | null;
    _min: Ph_teachers_listMinAggregateOutputType | null;
    _max: Ph_teachers_listMaxAggregateOutputType | null;
};
export type Ph_teachers_listAvgAggregateOutputType = {
    id: number | null;
};
export type Ph_teachers_listSumAggregateOutputType = {
    id: number | null;
};
export type Ph_teachers_listMinAggregateOutputType = {
    id: number | null;
    school_id: string | null;
    first_name: string | null;
    last_name: string | null;
    created_at: Date | null;
    designations: string | null;
};
export type Ph_teachers_listMaxAggregateOutputType = {
    id: number | null;
    school_id: string | null;
    first_name: string | null;
    last_name: string | null;
    created_at: Date | null;
    designations: string | null;
};
export type Ph_teachers_listCountAggregateOutputType = {
    id: number;
    school_id: number;
    first_name: number;
    last_name: number;
    created_at: number;
    designations: number;
    _all: number;
};
export type Ph_teachers_listAvgAggregateInputType = {
    id?: true;
};
export type Ph_teachers_listSumAggregateInputType = {
    id?: true;
};
export type Ph_teachers_listMinAggregateInputType = {
    id?: true;
    school_id?: true;
    first_name?: true;
    last_name?: true;
    created_at?: true;
    designations?: true;
};
export type Ph_teachers_listMaxAggregateInputType = {
    id?: true;
    school_id?: true;
    first_name?: true;
    last_name?: true;
    created_at?: true;
    designations?: true;
};
export type Ph_teachers_listCountAggregateInputType = {
    id?: true;
    school_id?: true;
    first_name?: true;
    last_name?: true;
    created_at?: true;
    designations?: true;
    _all?: true;
};
export type Ph_teachers_listAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ph_teachers_listWhereInput;
    orderBy?: Prisma.ph_teachers_listOrderByWithRelationInput | Prisma.ph_teachers_listOrderByWithRelationInput[];
    cursor?: Prisma.ph_teachers_listWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Ph_teachers_listCountAggregateInputType;
    _avg?: Ph_teachers_listAvgAggregateInputType;
    _sum?: Ph_teachers_listSumAggregateInputType;
    _min?: Ph_teachers_listMinAggregateInputType;
    _max?: Ph_teachers_listMaxAggregateInputType;
};
export type GetPh_teachers_listAggregateType<T extends Ph_teachers_listAggregateArgs> = {
    [P in keyof T & keyof AggregatePh_teachers_list]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePh_teachers_list[P]> : Prisma.GetScalarType<T[P], AggregatePh_teachers_list[P]>;
};
export type ph_teachers_listGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ph_teachers_listWhereInput;
    orderBy?: Prisma.ph_teachers_listOrderByWithAggregationInput | Prisma.ph_teachers_listOrderByWithAggregationInput[];
    by: Prisma.Ph_teachers_listScalarFieldEnum[] | Prisma.Ph_teachers_listScalarFieldEnum;
    having?: Prisma.ph_teachers_listScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Ph_teachers_listCountAggregateInputType | true;
    _avg?: Ph_teachers_listAvgAggregateInputType;
    _sum?: Ph_teachers_listSumAggregateInputType;
    _min?: Ph_teachers_listMinAggregateInputType;
    _max?: Ph_teachers_listMaxAggregateInputType;
};
export type Ph_teachers_listGroupByOutputType = {
    id: number;
    school_id: string | null;
    first_name: string | null;
    last_name: string | null;
    created_at: Date | null;
    designations: string | null;
    _count: Ph_teachers_listCountAggregateOutputType | null;
    _avg: Ph_teachers_listAvgAggregateOutputType | null;
    _sum: Ph_teachers_listSumAggregateOutputType | null;
    _min: Ph_teachers_listMinAggregateOutputType | null;
    _max: Ph_teachers_listMaxAggregateOutputType | null;
};
export type GetPh_teachers_listGroupByPayload<T extends ph_teachers_listGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Ph_teachers_listGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Ph_teachers_listGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Ph_teachers_listGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Ph_teachers_listGroupByOutputType[P]>;
}>>;
export type ph_teachers_listWhereInput = {
    AND?: Prisma.ph_teachers_listWhereInput | Prisma.ph_teachers_listWhereInput[];
    OR?: Prisma.ph_teachers_listWhereInput[];
    NOT?: Prisma.ph_teachers_listWhereInput | Prisma.ph_teachers_listWhereInput[];
    id?: Prisma.IntFilter<"ph_teachers_list"> | number;
    school_id?: Prisma.StringNullableFilter<"ph_teachers_list"> | string | null;
    first_name?: Prisma.StringNullableFilter<"ph_teachers_list"> | string | null;
    last_name?: Prisma.StringNullableFilter<"ph_teachers_list"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"ph_teachers_list"> | Date | string | null;
    designations?: Prisma.StringNullableFilter<"ph_teachers_list"> | string | null;
};
export type ph_teachers_listOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    first_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    last_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    designations?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type ph_teachers_listWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.ph_teachers_listWhereInput | Prisma.ph_teachers_listWhereInput[];
    OR?: Prisma.ph_teachers_listWhereInput[];
    NOT?: Prisma.ph_teachers_listWhereInput | Prisma.ph_teachers_listWhereInput[];
    school_id?: Prisma.StringNullableFilter<"ph_teachers_list"> | string | null;
    first_name?: Prisma.StringNullableFilter<"ph_teachers_list"> | string | null;
    last_name?: Prisma.StringNullableFilter<"ph_teachers_list"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"ph_teachers_list"> | Date | string | null;
    designations?: Prisma.StringNullableFilter<"ph_teachers_list"> | string | null;
}, "id">;
export type ph_teachers_listOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    first_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    last_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    designations?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ph_teachers_listCountOrderByAggregateInput;
    _avg?: Prisma.ph_teachers_listAvgOrderByAggregateInput;
    _max?: Prisma.ph_teachers_listMaxOrderByAggregateInput;
    _min?: Prisma.ph_teachers_listMinOrderByAggregateInput;
    _sum?: Prisma.ph_teachers_listSumOrderByAggregateInput;
};
export type ph_teachers_listScalarWhereWithAggregatesInput = {
    AND?: Prisma.ph_teachers_listScalarWhereWithAggregatesInput | Prisma.ph_teachers_listScalarWhereWithAggregatesInput[];
    OR?: Prisma.ph_teachers_listScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ph_teachers_listScalarWhereWithAggregatesInput | Prisma.ph_teachers_listScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"ph_teachers_list"> | number;
    school_id?: Prisma.StringNullableWithAggregatesFilter<"ph_teachers_list"> | string | null;
    first_name?: Prisma.StringNullableWithAggregatesFilter<"ph_teachers_list"> | string | null;
    last_name?: Prisma.StringNullableWithAggregatesFilter<"ph_teachers_list"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"ph_teachers_list"> | Date | string | null;
    designations?: Prisma.StringNullableWithAggregatesFilter<"ph_teachers_list"> | string | null;
};
export type ph_teachers_listCreateInput = {
    school_id?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    created_at?: Date | string | null;
    designations?: string | null;
};
export type ph_teachers_listUncheckedCreateInput = {
    id?: number;
    school_id?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    created_at?: Date | string | null;
    designations?: string | null;
};
export type ph_teachers_listUpdateInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    first_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    last_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    designations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ph_teachers_listUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    first_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    last_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    designations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ph_teachers_listCreateManyInput = {
    id?: number;
    school_id?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    created_at?: Date | string | null;
    designations?: string | null;
};
export type ph_teachers_listUpdateManyMutationInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    first_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    last_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    designations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ph_teachers_listUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    first_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    last_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    designations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ph_teachers_listCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    first_name?: Prisma.SortOrder;
    last_name?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    designations?: Prisma.SortOrder;
};
export type ph_teachers_listAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type ph_teachers_listMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    first_name?: Prisma.SortOrder;
    last_name?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    designations?: Prisma.SortOrder;
};
export type ph_teachers_listMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    first_name?: Prisma.SortOrder;
    last_name?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    designations?: Prisma.SortOrder;
};
export type ph_teachers_listSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type ph_teachers_listSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    first_name?: boolean;
    last_name?: boolean;
    created_at?: boolean;
    designations?: boolean;
}, ExtArgs["result"]["ph_teachers_list"]>;
export type ph_teachers_listSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    first_name?: boolean;
    last_name?: boolean;
    created_at?: boolean;
    designations?: boolean;
}, ExtArgs["result"]["ph_teachers_list"]>;
export type ph_teachers_listSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    first_name?: boolean;
    last_name?: boolean;
    created_at?: boolean;
    designations?: boolean;
}, ExtArgs["result"]["ph_teachers_list"]>;
export type ph_teachers_listSelectScalar = {
    id?: boolean;
    school_id?: boolean;
    first_name?: boolean;
    last_name?: boolean;
    created_at?: boolean;
    designations?: boolean;
};
export type ph_teachers_listOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "school_id" | "first_name" | "last_name" | "created_at" | "designations", ExtArgs["result"]["ph_teachers_list"]>;
export type $ph_teachers_listPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ph_teachers_list";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        school_id: string | null;
        first_name: string | null;
        last_name: string | null;
        created_at: Date | null;
        designations: string | null;
    }, ExtArgs["result"]["ph_teachers_list"]>;
    composites: {};
};
export type ph_teachers_listGetPayload<S extends boolean | null | undefined | ph_teachers_listDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ph_teachers_listPayload, S>;
export type ph_teachers_listCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ph_teachers_listFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Ph_teachers_listCountAggregateInputType | true;
};
export interface ph_teachers_listDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ph_teachers_list'];
        meta: {
            name: 'ph_teachers_list';
        };
    };
    findUnique<T extends ph_teachers_listFindUniqueArgs>(args: Prisma.SelectSubset<T, ph_teachers_listFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ph_teachers_listClient<runtime.Types.Result.GetResult<Prisma.$ph_teachers_listPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ph_teachers_listFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ph_teachers_listFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ph_teachers_listClient<runtime.Types.Result.GetResult<Prisma.$ph_teachers_listPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ph_teachers_listFindFirstArgs>(args?: Prisma.SelectSubset<T, ph_teachers_listFindFirstArgs<ExtArgs>>): Prisma.Prisma__ph_teachers_listClient<runtime.Types.Result.GetResult<Prisma.$ph_teachers_listPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ph_teachers_listFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ph_teachers_listFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ph_teachers_listClient<runtime.Types.Result.GetResult<Prisma.$ph_teachers_listPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ph_teachers_listFindManyArgs>(args?: Prisma.SelectSubset<T, ph_teachers_listFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ph_teachers_listPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ph_teachers_listCreateArgs>(args: Prisma.SelectSubset<T, ph_teachers_listCreateArgs<ExtArgs>>): Prisma.Prisma__ph_teachers_listClient<runtime.Types.Result.GetResult<Prisma.$ph_teachers_listPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ph_teachers_listCreateManyArgs>(args?: Prisma.SelectSubset<T, ph_teachers_listCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ph_teachers_listCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ph_teachers_listCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ph_teachers_listPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ph_teachers_listDeleteArgs>(args: Prisma.SelectSubset<T, ph_teachers_listDeleteArgs<ExtArgs>>): Prisma.Prisma__ph_teachers_listClient<runtime.Types.Result.GetResult<Prisma.$ph_teachers_listPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ph_teachers_listUpdateArgs>(args: Prisma.SelectSubset<T, ph_teachers_listUpdateArgs<ExtArgs>>): Prisma.Prisma__ph_teachers_listClient<runtime.Types.Result.GetResult<Prisma.$ph_teachers_listPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ph_teachers_listDeleteManyArgs>(args?: Prisma.SelectSubset<T, ph_teachers_listDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ph_teachers_listUpdateManyArgs>(args: Prisma.SelectSubset<T, ph_teachers_listUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ph_teachers_listUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ph_teachers_listUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ph_teachers_listPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ph_teachers_listUpsertArgs>(args: Prisma.SelectSubset<T, ph_teachers_listUpsertArgs<ExtArgs>>): Prisma.Prisma__ph_teachers_listClient<runtime.Types.Result.GetResult<Prisma.$ph_teachers_listPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ph_teachers_listCountArgs>(args?: Prisma.Subset<T, ph_teachers_listCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Ph_teachers_listCountAggregateOutputType> : number>;
    aggregate<T extends Ph_teachers_listAggregateArgs>(args: Prisma.Subset<T, Ph_teachers_listAggregateArgs>): Prisma.PrismaPromise<GetPh_teachers_listAggregateType<T>>;
    groupBy<T extends ph_teachers_listGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ph_teachers_listGroupByArgs['orderBy'];
    } : {
        orderBy?: ph_teachers_listGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ph_teachers_listGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPh_teachers_listGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ph_teachers_listFieldRefs;
}
export interface Prisma__ph_teachers_listClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ph_teachers_listFieldRefs {
    readonly id: Prisma.FieldRef<"ph_teachers_list", 'Int'>;
    readonly school_id: Prisma.FieldRef<"ph_teachers_list", 'String'>;
    readonly first_name: Prisma.FieldRef<"ph_teachers_list", 'String'>;
    readonly last_name: Prisma.FieldRef<"ph_teachers_list", 'String'>;
    readonly created_at: Prisma.FieldRef<"ph_teachers_list", 'DateTime'>;
    readonly designations: Prisma.FieldRef<"ph_teachers_list", 'String'>;
}
export type ph_teachers_listFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_teachers_listSelect<ExtArgs> | null;
    omit?: Prisma.ph_teachers_listOmit<ExtArgs> | null;
    where: Prisma.ph_teachers_listWhereUniqueInput;
};
export type ph_teachers_listFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_teachers_listSelect<ExtArgs> | null;
    omit?: Prisma.ph_teachers_listOmit<ExtArgs> | null;
    where: Prisma.ph_teachers_listWhereUniqueInput;
};
export type ph_teachers_listFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_teachers_listSelect<ExtArgs> | null;
    omit?: Prisma.ph_teachers_listOmit<ExtArgs> | null;
    where?: Prisma.ph_teachers_listWhereInput;
    orderBy?: Prisma.ph_teachers_listOrderByWithRelationInput | Prisma.ph_teachers_listOrderByWithRelationInput[];
    cursor?: Prisma.ph_teachers_listWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Ph_teachers_listScalarFieldEnum | Prisma.Ph_teachers_listScalarFieldEnum[];
};
export type ph_teachers_listFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_teachers_listSelect<ExtArgs> | null;
    omit?: Prisma.ph_teachers_listOmit<ExtArgs> | null;
    where?: Prisma.ph_teachers_listWhereInput;
    orderBy?: Prisma.ph_teachers_listOrderByWithRelationInput | Prisma.ph_teachers_listOrderByWithRelationInput[];
    cursor?: Prisma.ph_teachers_listWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Ph_teachers_listScalarFieldEnum | Prisma.Ph_teachers_listScalarFieldEnum[];
};
export type ph_teachers_listFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_teachers_listSelect<ExtArgs> | null;
    omit?: Prisma.ph_teachers_listOmit<ExtArgs> | null;
    where?: Prisma.ph_teachers_listWhereInput;
    orderBy?: Prisma.ph_teachers_listOrderByWithRelationInput | Prisma.ph_teachers_listOrderByWithRelationInput[];
    cursor?: Prisma.ph_teachers_listWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Ph_teachers_listScalarFieldEnum | Prisma.Ph_teachers_listScalarFieldEnum[];
};
export type ph_teachers_listCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_teachers_listSelect<ExtArgs> | null;
    omit?: Prisma.ph_teachers_listOmit<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.ph_teachers_listCreateInput, Prisma.ph_teachers_listUncheckedCreateInput>;
};
export type ph_teachers_listCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ph_teachers_listCreateManyInput | Prisma.ph_teachers_listCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ph_teachers_listCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_teachers_listSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ph_teachers_listOmit<ExtArgs> | null;
    data: Prisma.ph_teachers_listCreateManyInput | Prisma.ph_teachers_listCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ph_teachers_listUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_teachers_listSelect<ExtArgs> | null;
    omit?: Prisma.ph_teachers_listOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ph_teachers_listUpdateInput, Prisma.ph_teachers_listUncheckedUpdateInput>;
    where: Prisma.ph_teachers_listWhereUniqueInput;
};
export type ph_teachers_listUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ph_teachers_listUpdateManyMutationInput, Prisma.ph_teachers_listUncheckedUpdateManyInput>;
    where?: Prisma.ph_teachers_listWhereInput;
    limit?: number;
};
export type ph_teachers_listUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_teachers_listSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ph_teachers_listOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ph_teachers_listUpdateManyMutationInput, Prisma.ph_teachers_listUncheckedUpdateManyInput>;
    where?: Prisma.ph_teachers_listWhereInput;
    limit?: number;
};
export type ph_teachers_listUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_teachers_listSelect<ExtArgs> | null;
    omit?: Prisma.ph_teachers_listOmit<ExtArgs> | null;
    where: Prisma.ph_teachers_listWhereUniqueInput;
    create: Prisma.XOR<Prisma.ph_teachers_listCreateInput, Prisma.ph_teachers_listUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ph_teachers_listUpdateInput, Prisma.ph_teachers_listUncheckedUpdateInput>;
};
export type ph_teachers_listDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_teachers_listSelect<ExtArgs> | null;
    omit?: Prisma.ph_teachers_listOmit<ExtArgs> | null;
    where: Prisma.ph_teachers_listWhereUniqueInput;
};
export type ph_teachers_listDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ph_teachers_listWhereInput;
    limit?: number;
};
export type ph_teachers_listDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_teachers_listSelect<ExtArgs> | null;
    omit?: Prisma.ph_teachers_listOmit<ExtArgs> | null;
};
