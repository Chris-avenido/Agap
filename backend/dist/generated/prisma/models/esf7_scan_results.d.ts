import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type esf7_scan_resultsModel = runtime.Types.Result.DefaultSelection<Prisma.$esf7_scan_resultsPayload>;
export type AggregateEsf7_scan_results = {
    _count: Esf7_scan_resultsCountAggregateOutputType | null;
    _avg: Esf7_scan_resultsAvgAggregateOutputType | null;
    _sum: Esf7_scan_resultsSumAggregateOutputType | null;
    _min: Esf7_scan_resultsMinAggregateOutputType | null;
    _max: Esf7_scan_resultsMaxAggregateOutputType | null;
};
export type Esf7_scan_resultsAvgAggregateOutputType = {
    progress: number | null;
};
export type Esf7_scan_resultsSumAggregateOutputType = {
    progress: number | null;
};
export type Esf7_scan_resultsMinAggregateOutputType = {
    job_id: string | null;
    school_id: string | null;
    error: string | null;
    status: string | null;
    progress: number | null;
    updated_at: Date | null;
};
export type Esf7_scan_resultsMaxAggregateOutputType = {
    job_id: string | null;
    school_id: string | null;
    error: string | null;
    status: string | null;
    progress: number | null;
    updated_at: Date | null;
};
export type Esf7_scan_resultsCountAggregateOutputType = {
    job_id: number;
    school_id: number;
    result: number;
    error: number;
    status: number;
    progress: number;
    updated_at: number;
    _all: number;
};
export type Esf7_scan_resultsAvgAggregateInputType = {
    progress?: true;
};
export type Esf7_scan_resultsSumAggregateInputType = {
    progress?: true;
};
export type Esf7_scan_resultsMinAggregateInputType = {
    job_id?: true;
    school_id?: true;
    error?: true;
    status?: true;
    progress?: true;
    updated_at?: true;
};
export type Esf7_scan_resultsMaxAggregateInputType = {
    job_id?: true;
    school_id?: true;
    error?: true;
    status?: true;
    progress?: true;
    updated_at?: true;
};
export type Esf7_scan_resultsCountAggregateInputType = {
    job_id?: true;
    school_id?: true;
    result?: true;
    error?: true;
    status?: true;
    progress?: true;
    updated_at?: true;
    _all?: true;
};
export type Esf7_scan_resultsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.esf7_scan_resultsWhereInput;
    orderBy?: Prisma.esf7_scan_resultsOrderByWithRelationInput | Prisma.esf7_scan_resultsOrderByWithRelationInput[];
    cursor?: Prisma.esf7_scan_resultsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Esf7_scan_resultsCountAggregateInputType;
    _avg?: Esf7_scan_resultsAvgAggregateInputType;
    _sum?: Esf7_scan_resultsSumAggregateInputType;
    _min?: Esf7_scan_resultsMinAggregateInputType;
    _max?: Esf7_scan_resultsMaxAggregateInputType;
};
export type GetEsf7_scan_resultsAggregateType<T extends Esf7_scan_resultsAggregateArgs> = {
    [P in keyof T & keyof AggregateEsf7_scan_results]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEsf7_scan_results[P]> : Prisma.GetScalarType<T[P], AggregateEsf7_scan_results[P]>;
};
export type esf7_scan_resultsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.esf7_scan_resultsWhereInput;
    orderBy?: Prisma.esf7_scan_resultsOrderByWithAggregationInput | Prisma.esf7_scan_resultsOrderByWithAggregationInput[];
    by: Prisma.Esf7_scan_resultsScalarFieldEnum[] | Prisma.Esf7_scan_resultsScalarFieldEnum;
    having?: Prisma.esf7_scan_resultsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Esf7_scan_resultsCountAggregateInputType | true;
    _avg?: Esf7_scan_resultsAvgAggregateInputType;
    _sum?: Esf7_scan_resultsSumAggregateInputType;
    _min?: Esf7_scan_resultsMinAggregateInputType;
    _max?: Esf7_scan_resultsMaxAggregateInputType;
};
export type Esf7_scan_resultsGroupByOutputType = {
    job_id: string;
    school_id: string | null;
    result: runtime.JsonValue | null;
    error: string | null;
    status: string | null;
    progress: number | null;
    updated_at: Date | null;
    _count: Esf7_scan_resultsCountAggregateOutputType | null;
    _avg: Esf7_scan_resultsAvgAggregateOutputType | null;
    _sum: Esf7_scan_resultsSumAggregateOutputType | null;
    _min: Esf7_scan_resultsMinAggregateOutputType | null;
    _max: Esf7_scan_resultsMaxAggregateOutputType | null;
};
export type GetEsf7_scan_resultsGroupByPayload<T extends esf7_scan_resultsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Esf7_scan_resultsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Esf7_scan_resultsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Esf7_scan_resultsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Esf7_scan_resultsGroupByOutputType[P]>;
}>>;
export type esf7_scan_resultsWhereInput = {
    AND?: Prisma.esf7_scan_resultsWhereInput | Prisma.esf7_scan_resultsWhereInput[];
    OR?: Prisma.esf7_scan_resultsWhereInput[];
    NOT?: Prisma.esf7_scan_resultsWhereInput | Prisma.esf7_scan_resultsWhereInput[];
    job_id?: Prisma.UuidFilter<"esf7_scan_results"> | string;
    school_id?: Prisma.StringNullableFilter<"esf7_scan_results"> | string | null;
    result?: Prisma.JsonNullableFilter<"esf7_scan_results">;
    error?: Prisma.StringNullableFilter<"esf7_scan_results"> | string | null;
    status?: Prisma.StringNullableFilter<"esf7_scan_results"> | string | null;
    progress?: Prisma.IntNullableFilter<"esf7_scan_results"> | number | null;
    updated_at?: Prisma.DateTimeNullableFilter<"esf7_scan_results"> | Date | string | null;
};
export type esf7_scan_resultsOrderByWithRelationInput = {
    job_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    result?: Prisma.SortOrderInput | Prisma.SortOrder;
    error?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrderInput | Prisma.SortOrder;
    progress?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type esf7_scan_resultsWhereUniqueInput = Prisma.AtLeast<{
    job_id?: string;
    AND?: Prisma.esf7_scan_resultsWhereInput | Prisma.esf7_scan_resultsWhereInput[];
    OR?: Prisma.esf7_scan_resultsWhereInput[];
    NOT?: Prisma.esf7_scan_resultsWhereInput | Prisma.esf7_scan_resultsWhereInput[];
    school_id?: Prisma.StringNullableFilter<"esf7_scan_results"> | string | null;
    result?: Prisma.JsonNullableFilter<"esf7_scan_results">;
    error?: Prisma.StringNullableFilter<"esf7_scan_results"> | string | null;
    status?: Prisma.StringNullableFilter<"esf7_scan_results"> | string | null;
    progress?: Prisma.IntNullableFilter<"esf7_scan_results"> | number | null;
    updated_at?: Prisma.DateTimeNullableFilter<"esf7_scan_results"> | Date | string | null;
}, "job_id">;
export type esf7_scan_resultsOrderByWithAggregationInput = {
    job_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    result?: Prisma.SortOrderInput | Prisma.SortOrder;
    error?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrderInput | Prisma.SortOrder;
    progress?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.esf7_scan_resultsCountOrderByAggregateInput;
    _avg?: Prisma.esf7_scan_resultsAvgOrderByAggregateInput;
    _max?: Prisma.esf7_scan_resultsMaxOrderByAggregateInput;
    _min?: Prisma.esf7_scan_resultsMinOrderByAggregateInput;
    _sum?: Prisma.esf7_scan_resultsSumOrderByAggregateInput;
};
export type esf7_scan_resultsScalarWhereWithAggregatesInput = {
    AND?: Prisma.esf7_scan_resultsScalarWhereWithAggregatesInput | Prisma.esf7_scan_resultsScalarWhereWithAggregatesInput[];
    OR?: Prisma.esf7_scan_resultsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.esf7_scan_resultsScalarWhereWithAggregatesInput | Prisma.esf7_scan_resultsScalarWhereWithAggregatesInput[];
    job_id?: Prisma.UuidWithAggregatesFilter<"esf7_scan_results"> | string;
    school_id?: Prisma.StringNullableWithAggregatesFilter<"esf7_scan_results"> | string | null;
    result?: Prisma.JsonNullableWithAggregatesFilter<"esf7_scan_results">;
    error?: Prisma.StringNullableWithAggregatesFilter<"esf7_scan_results"> | string | null;
    status?: Prisma.StringNullableWithAggregatesFilter<"esf7_scan_results"> | string | null;
    progress?: Prisma.IntNullableWithAggregatesFilter<"esf7_scan_results"> | number | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"esf7_scan_results"> | Date | string | null;
};
export type esf7_scan_resultsCreateInput = {
    job_id: string;
    school_id?: string | null;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    error?: string | null;
    status?: string | null;
    progress?: number | null;
    updated_at?: Date | string | null;
};
export type esf7_scan_resultsUncheckedCreateInput = {
    job_id: string;
    school_id?: string | null;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    error?: string | null;
    status?: string | null;
    progress?: number | null;
    updated_at?: Date | string | null;
};
export type esf7_scan_resultsUpdateInput = {
    job_id?: Prisma.StringFieldUpdateOperationsInput | string;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    progress?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type esf7_scan_resultsUncheckedUpdateInput = {
    job_id?: Prisma.StringFieldUpdateOperationsInput | string;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    progress?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type esf7_scan_resultsCreateManyInput = {
    job_id: string;
    school_id?: string | null;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    error?: string | null;
    status?: string | null;
    progress?: number | null;
    updated_at?: Date | string | null;
};
export type esf7_scan_resultsUpdateManyMutationInput = {
    job_id?: Prisma.StringFieldUpdateOperationsInput | string;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    progress?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type esf7_scan_resultsUncheckedUpdateManyInput = {
    job_id?: Prisma.StringFieldUpdateOperationsInput | string;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    result?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    progress?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type esf7_scan_resultsCountOrderByAggregateInput = {
    job_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    result?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    progress?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type esf7_scan_resultsAvgOrderByAggregateInput = {
    progress?: Prisma.SortOrder;
};
export type esf7_scan_resultsMaxOrderByAggregateInput = {
    job_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    progress?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type esf7_scan_resultsMinOrderByAggregateInput = {
    job_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    progress?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type esf7_scan_resultsSumOrderByAggregateInput = {
    progress?: Prisma.SortOrder;
};
export type esf7_scan_resultsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    job_id?: boolean;
    school_id?: boolean;
    result?: boolean;
    error?: boolean;
    status?: boolean;
    progress?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["esf7_scan_results"]>;
export type esf7_scan_resultsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    job_id?: boolean;
    school_id?: boolean;
    result?: boolean;
    error?: boolean;
    status?: boolean;
    progress?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["esf7_scan_results"]>;
export type esf7_scan_resultsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    job_id?: boolean;
    school_id?: boolean;
    result?: boolean;
    error?: boolean;
    status?: boolean;
    progress?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["esf7_scan_results"]>;
export type esf7_scan_resultsSelectScalar = {
    job_id?: boolean;
    school_id?: boolean;
    result?: boolean;
    error?: boolean;
    status?: boolean;
    progress?: boolean;
    updated_at?: boolean;
};
export type esf7_scan_resultsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"job_id" | "school_id" | "result" | "error" | "status" | "progress" | "updated_at", ExtArgs["result"]["esf7_scan_results"]>;
export type $esf7_scan_resultsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "esf7_scan_results";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        job_id: string;
        school_id: string | null;
        result: runtime.JsonValue | null;
        error: string | null;
        status: string | null;
        progress: number | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["esf7_scan_results"]>;
    composites: {};
};
export type esf7_scan_resultsGetPayload<S extends boolean | null | undefined | esf7_scan_resultsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$esf7_scan_resultsPayload, S>;
export type esf7_scan_resultsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<esf7_scan_resultsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Esf7_scan_resultsCountAggregateInputType | true;
};
export interface esf7_scan_resultsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['esf7_scan_results'];
        meta: {
            name: 'esf7_scan_results';
        };
    };
    findUnique<T extends esf7_scan_resultsFindUniqueArgs>(args: Prisma.SelectSubset<T, esf7_scan_resultsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__esf7_scan_resultsClient<runtime.Types.Result.GetResult<Prisma.$esf7_scan_resultsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends esf7_scan_resultsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, esf7_scan_resultsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__esf7_scan_resultsClient<runtime.Types.Result.GetResult<Prisma.$esf7_scan_resultsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends esf7_scan_resultsFindFirstArgs>(args?: Prisma.SelectSubset<T, esf7_scan_resultsFindFirstArgs<ExtArgs>>): Prisma.Prisma__esf7_scan_resultsClient<runtime.Types.Result.GetResult<Prisma.$esf7_scan_resultsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends esf7_scan_resultsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, esf7_scan_resultsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__esf7_scan_resultsClient<runtime.Types.Result.GetResult<Prisma.$esf7_scan_resultsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends esf7_scan_resultsFindManyArgs>(args?: Prisma.SelectSubset<T, esf7_scan_resultsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$esf7_scan_resultsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends esf7_scan_resultsCreateArgs>(args: Prisma.SelectSubset<T, esf7_scan_resultsCreateArgs<ExtArgs>>): Prisma.Prisma__esf7_scan_resultsClient<runtime.Types.Result.GetResult<Prisma.$esf7_scan_resultsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends esf7_scan_resultsCreateManyArgs>(args?: Prisma.SelectSubset<T, esf7_scan_resultsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends esf7_scan_resultsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, esf7_scan_resultsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$esf7_scan_resultsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends esf7_scan_resultsDeleteArgs>(args: Prisma.SelectSubset<T, esf7_scan_resultsDeleteArgs<ExtArgs>>): Prisma.Prisma__esf7_scan_resultsClient<runtime.Types.Result.GetResult<Prisma.$esf7_scan_resultsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends esf7_scan_resultsUpdateArgs>(args: Prisma.SelectSubset<T, esf7_scan_resultsUpdateArgs<ExtArgs>>): Prisma.Prisma__esf7_scan_resultsClient<runtime.Types.Result.GetResult<Prisma.$esf7_scan_resultsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends esf7_scan_resultsDeleteManyArgs>(args?: Prisma.SelectSubset<T, esf7_scan_resultsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends esf7_scan_resultsUpdateManyArgs>(args: Prisma.SelectSubset<T, esf7_scan_resultsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends esf7_scan_resultsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, esf7_scan_resultsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$esf7_scan_resultsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends esf7_scan_resultsUpsertArgs>(args: Prisma.SelectSubset<T, esf7_scan_resultsUpsertArgs<ExtArgs>>): Prisma.Prisma__esf7_scan_resultsClient<runtime.Types.Result.GetResult<Prisma.$esf7_scan_resultsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends esf7_scan_resultsCountArgs>(args?: Prisma.Subset<T, esf7_scan_resultsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Esf7_scan_resultsCountAggregateOutputType> : number>;
    aggregate<T extends Esf7_scan_resultsAggregateArgs>(args: Prisma.Subset<T, Esf7_scan_resultsAggregateArgs>): Prisma.PrismaPromise<GetEsf7_scan_resultsAggregateType<T>>;
    groupBy<T extends esf7_scan_resultsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: esf7_scan_resultsGroupByArgs['orderBy'];
    } : {
        orderBy?: esf7_scan_resultsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, esf7_scan_resultsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEsf7_scan_resultsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: esf7_scan_resultsFieldRefs;
}
export interface Prisma__esf7_scan_resultsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface esf7_scan_resultsFieldRefs {
    readonly job_id: Prisma.FieldRef<"esf7_scan_results", 'String'>;
    readonly school_id: Prisma.FieldRef<"esf7_scan_results", 'String'>;
    readonly result: Prisma.FieldRef<"esf7_scan_results", 'Json'>;
    readonly error: Prisma.FieldRef<"esf7_scan_results", 'String'>;
    readonly status: Prisma.FieldRef<"esf7_scan_results", 'String'>;
    readonly progress: Prisma.FieldRef<"esf7_scan_results", 'Int'>;
    readonly updated_at: Prisma.FieldRef<"esf7_scan_results", 'DateTime'>;
}
export type esf7_scan_resultsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_scan_resultsSelect<ExtArgs> | null;
    omit?: Prisma.esf7_scan_resultsOmit<ExtArgs> | null;
    where: Prisma.esf7_scan_resultsWhereUniqueInput;
};
export type esf7_scan_resultsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_scan_resultsSelect<ExtArgs> | null;
    omit?: Prisma.esf7_scan_resultsOmit<ExtArgs> | null;
    where: Prisma.esf7_scan_resultsWhereUniqueInput;
};
export type esf7_scan_resultsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_scan_resultsSelect<ExtArgs> | null;
    omit?: Prisma.esf7_scan_resultsOmit<ExtArgs> | null;
    where?: Prisma.esf7_scan_resultsWhereInput;
    orderBy?: Prisma.esf7_scan_resultsOrderByWithRelationInput | Prisma.esf7_scan_resultsOrderByWithRelationInput[];
    cursor?: Prisma.esf7_scan_resultsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Esf7_scan_resultsScalarFieldEnum | Prisma.Esf7_scan_resultsScalarFieldEnum[];
};
export type esf7_scan_resultsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_scan_resultsSelect<ExtArgs> | null;
    omit?: Prisma.esf7_scan_resultsOmit<ExtArgs> | null;
    where?: Prisma.esf7_scan_resultsWhereInput;
    orderBy?: Prisma.esf7_scan_resultsOrderByWithRelationInput | Prisma.esf7_scan_resultsOrderByWithRelationInput[];
    cursor?: Prisma.esf7_scan_resultsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Esf7_scan_resultsScalarFieldEnum | Prisma.Esf7_scan_resultsScalarFieldEnum[];
};
export type esf7_scan_resultsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_scan_resultsSelect<ExtArgs> | null;
    omit?: Prisma.esf7_scan_resultsOmit<ExtArgs> | null;
    where?: Prisma.esf7_scan_resultsWhereInput;
    orderBy?: Prisma.esf7_scan_resultsOrderByWithRelationInput | Prisma.esf7_scan_resultsOrderByWithRelationInput[];
    cursor?: Prisma.esf7_scan_resultsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Esf7_scan_resultsScalarFieldEnum | Prisma.Esf7_scan_resultsScalarFieldEnum[];
};
export type esf7_scan_resultsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_scan_resultsSelect<ExtArgs> | null;
    omit?: Prisma.esf7_scan_resultsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.esf7_scan_resultsCreateInput, Prisma.esf7_scan_resultsUncheckedCreateInput>;
};
export type esf7_scan_resultsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.esf7_scan_resultsCreateManyInput | Prisma.esf7_scan_resultsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type esf7_scan_resultsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_scan_resultsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.esf7_scan_resultsOmit<ExtArgs> | null;
    data: Prisma.esf7_scan_resultsCreateManyInput | Prisma.esf7_scan_resultsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type esf7_scan_resultsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_scan_resultsSelect<ExtArgs> | null;
    omit?: Prisma.esf7_scan_resultsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.esf7_scan_resultsUpdateInput, Prisma.esf7_scan_resultsUncheckedUpdateInput>;
    where: Prisma.esf7_scan_resultsWhereUniqueInput;
};
export type esf7_scan_resultsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.esf7_scan_resultsUpdateManyMutationInput, Prisma.esf7_scan_resultsUncheckedUpdateManyInput>;
    where?: Prisma.esf7_scan_resultsWhereInput;
    limit?: number;
};
export type esf7_scan_resultsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_scan_resultsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.esf7_scan_resultsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.esf7_scan_resultsUpdateManyMutationInput, Prisma.esf7_scan_resultsUncheckedUpdateManyInput>;
    where?: Prisma.esf7_scan_resultsWhereInput;
    limit?: number;
};
export type esf7_scan_resultsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_scan_resultsSelect<ExtArgs> | null;
    omit?: Prisma.esf7_scan_resultsOmit<ExtArgs> | null;
    where: Prisma.esf7_scan_resultsWhereUniqueInput;
    create: Prisma.XOR<Prisma.esf7_scan_resultsCreateInput, Prisma.esf7_scan_resultsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.esf7_scan_resultsUpdateInput, Prisma.esf7_scan_resultsUncheckedUpdateInput>;
};
export type esf7_scan_resultsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_scan_resultsSelect<ExtArgs> | null;
    omit?: Prisma.esf7_scan_resultsOmit<ExtArgs> | null;
    where: Prisma.esf7_scan_resultsWhereUniqueInput;
};
export type esf7_scan_resultsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.esf7_scan_resultsWhereInput;
    limit?: number;
};
export type esf7_scan_resultsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_scan_resultsSelect<ExtArgs> | null;
    omit?: Prisma.esf7_scan_resultsOmit<ExtArgs> | null;
};
