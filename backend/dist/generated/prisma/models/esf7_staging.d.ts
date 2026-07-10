import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type esf7_stagingModel = runtime.Types.Result.DefaultSelection<Prisma.$esf7_stagingPayload>;
export type AggregateEsf7_staging = {
    _count: Esf7_stagingCountAggregateOutputType | null;
    _avg: Esf7_stagingAvgAggregateOutputType | null;
    _sum: Esf7_stagingSumAggregateOutputType | null;
    _min: Esf7_stagingMinAggregateOutputType | null;
    _max: Esf7_stagingMaxAggregateOutputType | null;
};
export type Esf7_stagingAvgAggregateOutputType = {
    id: number | null;
};
export type Esf7_stagingSumAggregateOutputType = {
    id: number | null;
};
export type Esf7_stagingMinAggregateOutputType = {
    id: number | null;
    school_id: string | null;
    status: string | null;
    updated_at: Date | null;
};
export type Esf7_stagingMaxAggregateOutputType = {
    id: number | null;
    school_id: string | null;
    status: string | null;
    updated_at: Date | null;
};
export type Esf7_stagingCountAggregateOutputType = {
    id: number;
    school_id: number;
    data: number;
    status: number;
    updated_at: number;
    _all: number;
};
export type Esf7_stagingAvgAggregateInputType = {
    id?: true;
};
export type Esf7_stagingSumAggregateInputType = {
    id?: true;
};
export type Esf7_stagingMinAggregateInputType = {
    id?: true;
    school_id?: true;
    status?: true;
    updated_at?: true;
};
export type Esf7_stagingMaxAggregateInputType = {
    id?: true;
    school_id?: true;
    status?: true;
    updated_at?: true;
};
export type Esf7_stagingCountAggregateInputType = {
    id?: true;
    school_id?: true;
    data?: true;
    status?: true;
    updated_at?: true;
    _all?: true;
};
export type Esf7_stagingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.esf7_stagingWhereInput;
    orderBy?: Prisma.esf7_stagingOrderByWithRelationInput | Prisma.esf7_stagingOrderByWithRelationInput[];
    cursor?: Prisma.esf7_stagingWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Esf7_stagingCountAggregateInputType;
    _avg?: Esf7_stagingAvgAggregateInputType;
    _sum?: Esf7_stagingSumAggregateInputType;
    _min?: Esf7_stagingMinAggregateInputType;
    _max?: Esf7_stagingMaxAggregateInputType;
};
export type GetEsf7_stagingAggregateType<T extends Esf7_stagingAggregateArgs> = {
    [P in keyof T & keyof AggregateEsf7_staging]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEsf7_staging[P]> : Prisma.GetScalarType<T[P], AggregateEsf7_staging[P]>;
};
export type esf7_stagingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.esf7_stagingWhereInput;
    orderBy?: Prisma.esf7_stagingOrderByWithAggregationInput | Prisma.esf7_stagingOrderByWithAggregationInput[];
    by: Prisma.Esf7_stagingScalarFieldEnum[] | Prisma.Esf7_stagingScalarFieldEnum;
    having?: Prisma.esf7_stagingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Esf7_stagingCountAggregateInputType | true;
    _avg?: Esf7_stagingAvgAggregateInputType;
    _sum?: Esf7_stagingSumAggregateInputType;
    _min?: Esf7_stagingMinAggregateInputType;
    _max?: Esf7_stagingMaxAggregateInputType;
};
export type Esf7_stagingGroupByOutputType = {
    id: number;
    school_id: string | null;
    data: runtime.JsonValue | null;
    status: string | null;
    updated_at: Date | null;
    _count: Esf7_stagingCountAggregateOutputType | null;
    _avg: Esf7_stagingAvgAggregateOutputType | null;
    _sum: Esf7_stagingSumAggregateOutputType | null;
    _min: Esf7_stagingMinAggregateOutputType | null;
    _max: Esf7_stagingMaxAggregateOutputType | null;
};
export type GetEsf7_stagingGroupByPayload<T extends esf7_stagingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Esf7_stagingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Esf7_stagingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Esf7_stagingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Esf7_stagingGroupByOutputType[P]>;
}>>;
export type esf7_stagingWhereInput = {
    AND?: Prisma.esf7_stagingWhereInput | Prisma.esf7_stagingWhereInput[];
    OR?: Prisma.esf7_stagingWhereInput[];
    NOT?: Prisma.esf7_stagingWhereInput | Prisma.esf7_stagingWhereInput[];
    id?: Prisma.IntFilter<"esf7_staging"> | number;
    school_id?: Prisma.StringNullableFilter<"esf7_staging"> | string | null;
    data?: Prisma.JsonNullableFilter<"esf7_staging">;
    status?: Prisma.StringNullableFilter<"esf7_staging"> | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"esf7_staging"> | Date | string | null;
};
export type esf7_stagingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    data?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type esf7_stagingWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.esf7_stagingWhereInput | Prisma.esf7_stagingWhereInput[];
    OR?: Prisma.esf7_stagingWhereInput[];
    NOT?: Prisma.esf7_stagingWhereInput | Prisma.esf7_stagingWhereInput[];
    school_id?: Prisma.StringNullableFilter<"esf7_staging"> | string | null;
    data?: Prisma.JsonNullableFilter<"esf7_staging">;
    status?: Prisma.StringNullableFilter<"esf7_staging"> | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"esf7_staging"> | Date | string | null;
}, "id">;
export type esf7_stagingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    data?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.esf7_stagingCountOrderByAggregateInput;
    _avg?: Prisma.esf7_stagingAvgOrderByAggregateInput;
    _max?: Prisma.esf7_stagingMaxOrderByAggregateInput;
    _min?: Prisma.esf7_stagingMinOrderByAggregateInput;
    _sum?: Prisma.esf7_stagingSumOrderByAggregateInput;
};
export type esf7_stagingScalarWhereWithAggregatesInput = {
    AND?: Prisma.esf7_stagingScalarWhereWithAggregatesInput | Prisma.esf7_stagingScalarWhereWithAggregatesInput[];
    OR?: Prisma.esf7_stagingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.esf7_stagingScalarWhereWithAggregatesInput | Prisma.esf7_stagingScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"esf7_staging"> | number;
    school_id?: Prisma.StringNullableWithAggregatesFilter<"esf7_staging"> | string | null;
    data?: Prisma.JsonNullableWithAggregatesFilter<"esf7_staging">;
    status?: Prisma.StringNullableWithAggregatesFilter<"esf7_staging"> | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"esf7_staging"> | Date | string | null;
};
export type esf7_stagingCreateInput = {
    school_id?: string | null;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: string | null;
    updated_at?: Date | string | null;
};
export type esf7_stagingUncheckedCreateInput = {
    id?: number;
    school_id?: string | null;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: string | null;
    updated_at?: Date | string | null;
};
export type esf7_stagingUpdateInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type esf7_stagingUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type esf7_stagingCreateManyInput = {
    id?: number;
    school_id?: string | null;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: string | null;
    updated_at?: Date | string | null;
};
export type esf7_stagingUpdateManyMutationInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type esf7_stagingUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type esf7_stagingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    data?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type esf7_stagingAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type esf7_stagingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type esf7_stagingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type esf7_stagingSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type esf7_stagingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    data?: boolean;
    status?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["esf7_staging"]>;
export type esf7_stagingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    data?: boolean;
    status?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["esf7_staging"]>;
export type esf7_stagingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    data?: boolean;
    status?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["esf7_staging"]>;
export type esf7_stagingSelectScalar = {
    id?: boolean;
    school_id?: boolean;
    data?: boolean;
    status?: boolean;
    updated_at?: boolean;
};
export type esf7_stagingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "school_id" | "data" | "status" | "updated_at", ExtArgs["result"]["esf7_staging"]>;
export type $esf7_stagingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "esf7_staging";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        school_id: string | null;
        data: runtime.JsonValue | null;
        status: string | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["esf7_staging"]>;
    composites: {};
};
export type esf7_stagingGetPayload<S extends boolean | null | undefined | esf7_stagingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$esf7_stagingPayload, S>;
export type esf7_stagingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<esf7_stagingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Esf7_stagingCountAggregateInputType | true;
};
export interface esf7_stagingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['esf7_staging'];
        meta: {
            name: 'esf7_staging';
        };
    };
    findUnique<T extends esf7_stagingFindUniqueArgs>(args: Prisma.SelectSubset<T, esf7_stagingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__esf7_stagingClient<runtime.Types.Result.GetResult<Prisma.$esf7_stagingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends esf7_stagingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, esf7_stagingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__esf7_stagingClient<runtime.Types.Result.GetResult<Prisma.$esf7_stagingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends esf7_stagingFindFirstArgs>(args?: Prisma.SelectSubset<T, esf7_stagingFindFirstArgs<ExtArgs>>): Prisma.Prisma__esf7_stagingClient<runtime.Types.Result.GetResult<Prisma.$esf7_stagingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends esf7_stagingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, esf7_stagingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__esf7_stagingClient<runtime.Types.Result.GetResult<Prisma.$esf7_stagingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends esf7_stagingFindManyArgs>(args?: Prisma.SelectSubset<T, esf7_stagingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$esf7_stagingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends esf7_stagingCreateArgs>(args: Prisma.SelectSubset<T, esf7_stagingCreateArgs<ExtArgs>>): Prisma.Prisma__esf7_stagingClient<runtime.Types.Result.GetResult<Prisma.$esf7_stagingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends esf7_stagingCreateManyArgs>(args?: Prisma.SelectSubset<T, esf7_stagingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends esf7_stagingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, esf7_stagingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$esf7_stagingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends esf7_stagingDeleteArgs>(args: Prisma.SelectSubset<T, esf7_stagingDeleteArgs<ExtArgs>>): Prisma.Prisma__esf7_stagingClient<runtime.Types.Result.GetResult<Prisma.$esf7_stagingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends esf7_stagingUpdateArgs>(args: Prisma.SelectSubset<T, esf7_stagingUpdateArgs<ExtArgs>>): Prisma.Prisma__esf7_stagingClient<runtime.Types.Result.GetResult<Prisma.$esf7_stagingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends esf7_stagingDeleteManyArgs>(args?: Prisma.SelectSubset<T, esf7_stagingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends esf7_stagingUpdateManyArgs>(args: Prisma.SelectSubset<T, esf7_stagingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends esf7_stagingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, esf7_stagingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$esf7_stagingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends esf7_stagingUpsertArgs>(args: Prisma.SelectSubset<T, esf7_stagingUpsertArgs<ExtArgs>>): Prisma.Prisma__esf7_stagingClient<runtime.Types.Result.GetResult<Prisma.$esf7_stagingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends esf7_stagingCountArgs>(args?: Prisma.Subset<T, esf7_stagingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Esf7_stagingCountAggregateOutputType> : number>;
    aggregate<T extends Esf7_stagingAggregateArgs>(args: Prisma.Subset<T, Esf7_stagingAggregateArgs>): Prisma.PrismaPromise<GetEsf7_stagingAggregateType<T>>;
    groupBy<T extends esf7_stagingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: esf7_stagingGroupByArgs['orderBy'];
    } : {
        orderBy?: esf7_stagingGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, esf7_stagingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEsf7_stagingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: esf7_stagingFieldRefs;
}
export interface Prisma__esf7_stagingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface esf7_stagingFieldRefs {
    readonly id: Prisma.FieldRef<"esf7_staging", 'Int'>;
    readonly school_id: Prisma.FieldRef<"esf7_staging", 'String'>;
    readonly data: Prisma.FieldRef<"esf7_staging", 'Json'>;
    readonly status: Prisma.FieldRef<"esf7_staging", 'String'>;
    readonly updated_at: Prisma.FieldRef<"esf7_staging", 'DateTime'>;
}
export type esf7_stagingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_stagingSelect<ExtArgs> | null;
    omit?: Prisma.esf7_stagingOmit<ExtArgs> | null;
    where: Prisma.esf7_stagingWhereUniqueInput;
};
export type esf7_stagingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_stagingSelect<ExtArgs> | null;
    omit?: Prisma.esf7_stagingOmit<ExtArgs> | null;
    where: Prisma.esf7_stagingWhereUniqueInput;
};
export type esf7_stagingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_stagingSelect<ExtArgs> | null;
    omit?: Prisma.esf7_stagingOmit<ExtArgs> | null;
    where?: Prisma.esf7_stagingWhereInput;
    orderBy?: Prisma.esf7_stagingOrderByWithRelationInput | Prisma.esf7_stagingOrderByWithRelationInput[];
    cursor?: Prisma.esf7_stagingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Esf7_stagingScalarFieldEnum | Prisma.Esf7_stagingScalarFieldEnum[];
};
export type esf7_stagingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_stagingSelect<ExtArgs> | null;
    omit?: Prisma.esf7_stagingOmit<ExtArgs> | null;
    where?: Prisma.esf7_stagingWhereInput;
    orderBy?: Prisma.esf7_stagingOrderByWithRelationInput | Prisma.esf7_stagingOrderByWithRelationInput[];
    cursor?: Prisma.esf7_stagingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Esf7_stagingScalarFieldEnum | Prisma.Esf7_stagingScalarFieldEnum[];
};
export type esf7_stagingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_stagingSelect<ExtArgs> | null;
    omit?: Prisma.esf7_stagingOmit<ExtArgs> | null;
    where?: Prisma.esf7_stagingWhereInput;
    orderBy?: Prisma.esf7_stagingOrderByWithRelationInput | Prisma.esf7_stagingOrderByWithRelationInput[];
    cursor?: Prisma.esf7_stagingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Esf7_stagingScalarFieldEnum | Prisma.Esf7_stagingScalarFieldEnum[];
};
export type esf7_stagingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_stagingSelect<ExtArgs> | null;
    omit?: Prisma.esf7_stagingOmit<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.esf7_stagingCreateInput, Prisma.esf7_stagingUncheckedCreateInput>;
};
export type esf7_stagingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.esf7_stagingCreateManyInput | Prisma.esf7_stagingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type esf7_stagingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_stagingSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.esf7_stagingOmit<ExtArgs> | null;
    data: Prisma.esf7_stagingCreateManyInput | Prisma.esf7_stagingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type esf7_stagingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_stagingSelect<ExtArgs> | null;
    omit?: Prisma.esf7_stagingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.esf7_stagingUpdateInput, Prisma.esf7_stagingUncheckedUpdateInput>;
    where: Prisma.esf7_stagingWhereUniqueInput;
};
export type esf7_stagingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.esf7_stagingUpdateManyMutationInput, Prisma.esf7_stagingUncheckedUpdateManyInput>;
    where?: Prisma.esf7_stagingWhereInput;
    limit?: number;
};
export type esf7_stagingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_stagingSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.esf7_stagingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.esf7_stagingUpdateManyMutationInput, Prisma.esf7_stagingUncheckedUpdateManyInput>;
    where?: Prisma.esf7_stagingWhereInput;
    limit?: number;
};
export type esf7_stagingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_stagingSelect<ExtArgs> | null;
    omit?: Prisma.esf7_stagingOmit<ExtArgs> | null;
    where: Prisma.esf7_stagingWhereUniqueInput;
    create: Prisma.XOR<Prisma.esf7_stagingCreateInput, Prisma.esf7_stagingUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.esf7_stagingUpdateInput, Prisma.esf7_stagingUncheckedUpdateInput>;
};
export type esf7_stagingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_stagingSelect<ExtArgs> | null;
    omit?: Prisma.esf7_stagingOmit<ExtArgs> | null;
    where: Prisma.esf7_stagingWhereUniqueInput;
};
export type esf7_stagingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.esf7_stagingWhereInput;
    limit?: number;
};
export type esf7_stagingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_stagingSelect<ExtArgs> | null;
    omit?: Prisma.esf7_stagingOmit<ExtArgs> | null;
};
