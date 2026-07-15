import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type esf7_resubmission_requestModel = runtime.Types.Result.DefaultSelection<Prisma.$esf7_resubmission_requestPayload>;
export type AggregateEsf7_resubmission_request = {
    _count: Esf7_resubmission_requestCountAggregateOutputType | null;
    _avg: Esf7_resubmission_requestAvgAggregateOutputType | null;
    _sum: Esf7_resubmission_requestSumAggregateOutputType | null;
    _min: Esf7_resubmission_requestMinAggregateOutputType | null;
    _max: Esf7_resubmission_requestMaxAggregateOutputType | null;
};
export type Esf7_resubmission_requestAvgAggregateOutputType = {
    id: number | null;
};
export type Esf7_resubmission_requestSumAggregateOutputType = {
    id: number | null;
};
export type Esf7_resubmission_requestMinAggregateOutputType = {
    id: number | null;
    school_id: string | null;
    status: string | null;
    can_resubmit: boolean | null;
    request_reason: string | null;
    updated_at: Date | null;
};
export type Esf7_resubmission_requestMaxAggregateOutputType = {
    id: number | null;
    school_id: string | null;
    status: string | null;
    can_resubmit: boolean | null;
    request_reason: string | null;
    updated_at: Date | null;
};
export type Esf7_resubmission_requestCountAggregateOutputType = {
    id: number;
    school_id: number;
    status: number;
    can_resubmit: number;
    request_reason: number;
    updated_at: number;
    _all: number;
};
export type Esf7_resubmission_requestAvgAggregateInputType = {
    id?: true;
};
export type Esf7_resubmission_requestSumAggregateInputType = {
    id?: true;
};
export type Esf7_resubmission_requestMinAggregateInputType = {
    id?: true;
    school_id?: true;
    status?: true;
    can_resubmit?: true;
    request_reason?: true;
    updated_at?: true;
};
export type Esf7_resubmission_requestMaxAggregateInputType = {
    id?: true;
    school_id?: true;
    status?: true;
    can_resubmit?: true;
    request_reason?: true;
    updated_at?: true;
};
export type Esf7_resubmission_requestCountAggregateInputType = {
    id?: true;
    school_id?: true;
    status?: true;
    can_resubmit?: true;
    request_reason?: true;
    updated_at?: true;
    _all?: true;
};
export type Esf7_resubmission_requestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.esf7_resubmission_requestWhereInput;
    orderBy?: Prisma.esf7_resubmission_requestOrderByWithRelationInput | Prisma.esf7_resubmission_requestOrderByWithRelationInput[];
    cursor?: Prisma.esf7_resubmission_requestWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Esf7_resubmission_requestCountAggregateInputType;
    _avg?: Esf7_resubmission_requestAvgAggregateInputType;
    _sum?: Esf7_resubmission_requestSumAggregateInputType;
    _min?: Esf7_resubmission_requestMinAggregateInputType;
    _max?: Esf7_resubmission_requestMaxAggregateInputType;
};
export type GetEsf7_resubmission_requestAggregateType<T extends Esf7_resubmission_requestAggregateArgs> = {
    [P in keyof T & keyof AggregateEsf7_resubmission_request]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEsf7_resubmission_request[P]> : Prisma.GetScalarType<T[P], AggregateEsf7_resubmission_request[P]>;
};
export type esf7_resubmission_requestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.esf7_resubmission_requestWhereInput;
    orderBy?: Prisma.esf7_resubmission_requestOrderByWithAggregationInput | Prisma.esf7_resubmission_requestOrderByWithAggregationInput[];
    by: Prisma.Esf7_resubmission_requestScalarFieldEnum[] | Prisma.Esf7_resubmission_requestScalarFieldEnum;
    having?: Prisma.esf7_resubmission_requestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Esf7_resubmission_requestCountAggregateInputType | true;
    _avg?: Esf7_resubmission_requestAvgAggregateInputType;
    _sum?: Esf7_resubmission_requestSumAggregateInputType;
    _min?: Esf7_resubmission_requestMinAggregateInputType;
    _max?: Esf7_resubmission_requestMaxAggregateInputType;
};
export type Esf7_resubmission_requestGroupByOutputType = {
    id: number;
    school_id: string | null;
    status: string | null;
    can_resubmit: boolean | null;
    request_reason: string | null;
    updated_at: Date | null;
    _count: Esf7_resubmission_requestCountAggregateOutputType | null;
    _avg: Esf7_resubmission_requestAvgAggregateOutputType | null;
    _sum: Esf7_resubmission_requestSumAggregateOutputType | null;
    _min: Esf7_resubmission_requestMinAggregateOutputType | null;
    _max: Esf7_resubmission_requestMaxAggregateOutputType | null;
};
export type GetEsf7_resubmission_requestGroupByPayload<T extends esf7_resubmission_requestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Esf7_resubmission_requestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Esf7_resubmission_requestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Esf7_resubmission_requestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Esf7_resubmission_requestGroupByOutputType[P]>;
}>>;
export type esf7_resubmission_requestWhereInput = {
    AND?: Prisma.esf7_resubmission_requestWhereInput | Prisma.esf7_resubmission_requestWhereInput[];
    OR?: Prisma.esf7_resubmission_requestWhereInput[];
    NOT?: Prisma.esf7_resubmission_requestWhereInput | Prisma.esf7_resubmission_requestWhereInput[];
    id?: Prisma.IntFilter<"esf7_resubmission_request"> | number;
    school_id?: Prisma.StringNullableFilter<"esf7_resubmission_request"> | string | null;
    status?: Prisma.StringNullableFilter<"esf7_resubmission_request"> | string | null;
    can_resubmit?: Prisma.BoolNullableFilter<"esf7_resubmission_request"> | boolean | null;
    request_reason?: Prisma.StringNullableFilter<"esf7_resubmission_request"> | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"esf7_resubmission_request"> | Date | string | null;
};
export type esf7_resubmission_requestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrderInput | Prisma.SortOrder;
    can_resubmit?: Prisma.SortOrderInput | Prisma.SortOrder;
    request_reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type esf7_resubmission_requestWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    school_id?: string;
    AND?: Prisma.esf7_resubmission_requestWhereInput | Prisma.esf7_resubmission_requestWhereInput[];
    OR?: Prisma.esf7_resubmission_requestWhereInput[];
    NOT?: Prisma.esf7_resubmission_requestWhereInput | Prisma.esf7_resubmission_requestWhereInput[];
    status?: Prisma.StringNullableFilter<"esf7_resubmission_request"> | string | null;
    can_resubmit?: Prisma.BoolNullableFilter<"esf7_resubmission_request"> | boolean | null;
    request_reason?: Prisma.StringNullableFilter<"esf7_resubmission_request"> | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"esf7_resubmission_request"> | Date | string | null;
}, "id" | "school_id">;
export type esf7_resubmission_requestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrderInput | Prisma.SortOrder;
    can_resubmit?: Prisma.SortOrderInput | Prisma.SortOrder;
    request_reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.esf7_resubmission_requestCountOrderByAggregateInput;
    _avg?: Prisma.esf7_resubmission_requestAvgOrderByAggregateInput;
    _max?: Prisma.esf7_resubmission_requestMaxOrderByAggregateInput;
    _min?: Prisma.esf7_resubmission_requestMinOrderByAggregateInput;
    _sum?: Prisma.esf7_resubmission_requestSumOrderByAggregateInput;
};
export type esf7_resubmission_requestScalarWhereWithAggregatesInput = {
    AND?: Prisma.esf7_resubmission_requestScalarWhereWithAggregatesInput | Prisma.esf7_resubmission_requestScalarWhereWithAggregatesInput[];
    OR?: Prisma.esf7_resubmission_requestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.esf7_resubmission_requestScalarWhereWithAggregatesInput | Prisma.esf7_resubmission_requestScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"esf7_resubmission_request"> | number;
    school_id?: Prisma.StringNullableWithAggregatesFilter<"esf7_resubmission_request"> | string | null;
    status?: Prisma.StringNullableWithAggregatesFilter<"esf7_resubmission_request"> | string | null;
    can_resubmit?: Prisma.BoolNullableWithAggregatesFilter<"esf7_resubmission_request"> | boolean | null;
    request_reason?: Prisma.StringNullableWithAggregatesFilter<"esf7_resubmission_request"> | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"esf7_resubmission_request"> | Date | string | null;
};
export type esf7_resubmission_requestCreateInput = {
    school_id?: string | null;
    status?: string | null;
    can_resubmit?: boolean | null;
    request_reason?: string | null;
    updated_at?: Date | string | null;
};
export type esf7_resubmission_requestUncheckedCreateInput = {
    id?: number;
    school_id?: string | null;
    status?: string | null;
    can_resubmit?: boolean | null;
    request_reason?: string | null;
    updated_at?: Date | string | null;
};
export type esf7_resubmission_requestUpdateInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    can_resubmit?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    request_reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type esf7_resubmission_requestUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    can_resubmit?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    request_reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type esf7_resubmission_requestCreateManyInput = {
    id?: number;
    school_id?: string | null;
    status?: string | null;
    can_resubmit?: boolean | null;
    request_reason?: string | null;
    updated_at?: Date | string | null;
};
export type esf7_resubmission_requestUpdateManyMutationInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    can_resubmit?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    request_reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type esf7_resubmission_requestUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    can_resubmit?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    request_reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type esf7_resubmission_requestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    can_resubmit?: Prisma.SortOrder;
    request_reason?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type esf7_resubmission_requestAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type esf7_resubmission_requestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    can_resubmit?: Prisma.SortOrder;
    request_reason?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type esf7_resubmission_requestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    can_resubmit?: Prisma.SortOrder;
    request_reason?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type esf7_resubmission_requestSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type esf7_resubmission_requestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    status?: boolean;
    can_resubmit?: boolean;
    request_reason?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["esf7_resubmission_request"]>;
export type esf7_resubmission_requestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    status?: boolean;
    can_resubmit?: boolean;
    request_reason?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["esf7_resubmission_request"]>;
export type esf7_resubmission_requestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    status?: boolean;
    can_resubmit?: boolean;
    request_reason?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["esf7_resubmission_request"]>;
export type esf7_resubmission_requestSelectScalar = {
    id?: boolean;
    school_id?: boolean;
    status?: boolean;
    can_resubmit?: boolean;
    request_reason?: boolean;
    updated_at?: boolean;
};
export type esf7_resubmission_requestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "school_id" | "status" | "can_resubmit" | "request_reason" | "updated_at", ExtArgs["result"]["esf7_resubmission_request"]>;
export type $esf7_resubmission_requestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "esf7_resubmission_request";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        school_id: string | null;
        status: string | null;
        can_resubmit: boolean | null;
        request_reason: string | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["esf7_resubmission_request"]>;
    composites: {};
};
export type esf7_resubmission_requestGetPayload<S extends boolean | null | undefined | esf7_resubmission_requestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$esf7_resubmission_requestPayload, S>;
export type esf7_resubmission_requestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<esf7_resubmission_requestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Esf7_resubmission_requestCountAggregateInputType | true;
};
export interface esf7_resubmission_requestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['esf7_resubmission_request'];
        meta: {
            name: 'esf7_resubmission_request';
        };
    };
    findUnique<T extends esf7_resubmission_requestFindUniqueArgs>(args: Prisma.SelectSubset<T, esf7_resubmission_requestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__esf7_resubmission_requestClient<runtime.Types.Result.GetResult<Prisma.$esf7_resubmission_requestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends esf7_resubmission_requestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, esf7_resubmission_requestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__esf7_resubmission_requestClient<runtime.Types.Result.GetResult<Prisma.$esf7_resubmission_requestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends esf7_resubmission_requestFindFirstArgs>(args?: Prisma.SelectSubset<T, esf7_resubmission_requestFindFirstArgs<ExtArgs>>): Prisma.Prisma__esf7_resubmission_requestClient<runtime.Types.Result.GetResult<Prisma.$esf7_resubmission_requestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends esf7_resubmission_requestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, esf7_resubmission_requestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__esf7_resubmission_requestClient<runtime.Types.Result.GetResult<Prisma.$esf7_resubmission_requestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends esf7_resubmission_requestFindManyArgs>(args?: Prisma.SelectSubset<T, esf7_resubmission_requestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$esf7_resubmission_requestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends esf7_resubmission_requestCreateArgs>(args: Prisma.SelectSubset<T, esf7_resubmission_requestCreateArgs<ExtArgs>>): Prisma.Prisma__esf7_resubmission_requestClient<runtime.Types.Result.GetResult<Prisma.$esf7_resubmission_requestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends esf7_resubmission_requestCreateManyArgs>(args?: Prisma.SelectSubset<T, esf7_resubmission_requestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends esf7_resubmission_requestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, esf7_resubmission_requestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$esf7_resubmission_requestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends esf7_resubmission_requestDeleteArgs>(args: Prisma.SelectSubset<T, esf7_resubmission_requestDeleteArgs<ExtArgs>>): Prisma.Prisma__esf7_resubmission_requestClient<runtime.Types.Result.GetResult<Prisma.$esf7_resubmission_requestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends esf7_resubmission_requestUpdateArgs>(args: Prisma.SelectSubset<T, esf7_resubmission_requestUpdateArgs<ExtArgs>>): Prisma.Prisma__esf7_resubmission_requestClient<runtime.Types.Result.GetResult<Prisma.$esf7_resubmission_requestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends esf7_resubmission_requestDeleteManyArgs>(args?: Prisma.SelectSubset<T, esf7_resubmission_requestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends esf7_resubmission_requestUpdateManyArgs>(args: Prisma.SelectSubset<T, esf7_resubmission_requestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends esf7_resubmission_requestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, esf7_resubmission_requestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$esf7_resubmission_requestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends esf7_resubmission_requestUpsertArgs>(args: Prisma.SelectSubset<T, esf7_resubmission_requestUpsertArgs<ExtArgs>>): Prisma.Prisma__esf7_resubmission_requestClient<runtime.Types.Result.GetResult<Prisma.$esf7_resubmission_requestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends esf7_resubmission_requestCountArgs>(args?: Prisma.Subset<T, esf7_resubmission_requestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Esf7_resubmission_requestCountAggregateOutputType> : number>;
    aggregate<T extends Esf7_resubmission_requestAggregateArgs>(args: Prisma.Subset<T, Esf7_resubmission_requestAggregateArgs>): Prisma.PrismaPromise<GetEsf7_resubmission_requestAggregateType<T>>;
    groupBy<T extends esf7_resubmission_requestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: esf7_resubmission_requestGroupByArgs['orderBy'];
    } : {
        orderBy?: esf7_resubmission_requestGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, esf7_resubmission_requestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEsf7_resubmission_requestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: esf7_resubmission_requestFieldRefs;
}
export interface Prisma__esf7_resubmission_requestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface esf7_resubmission_requestFieldRefs {
    readonly id: Prisma.FieldRef<"esf7_resubmission_request", 'Int'>;
    readonly school_id: Prisma.FieldRef<"esf7_resubmission_request", 'String'>;
    readonly status: Prisma.FieldRef<"esf7_resubmission_request", 'String'>;
    readonly can_resubmit: Prisma.FieldRef<"esf7_resubmission_request", 'Boolean'>;
    readonly request_reason: Prisma.FieldRef<"esf7_resubmission_request", 'String'>;
    readonly updated_at: Prisma.FieldRef<"esf7_resubmission_request", 'DateTime'>;
}
export type esf7_resubmission_requestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_resubmission_requestSelect<ExtArgs> | null;
    omit?: Prisma.esf7_resubmission_requestOmit<ExtArgs> | null;
    where: Prisma.esf7_resubmission_requestWhereUniqueInput;
};
export type esf7_resubmission_requestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_resubmission_requestSelect<ExtArgs> | null;
    omit?: Prisma.esf7_resubmission_requestOmit<ExtArgs> | null;
    where: Prisma.esf7_resubmission_requestWhereUniqueInput;
};
export type esf7_resubmission_requestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_resubmission_requestSelect<ExtArgs> | null;
    omit?: Prisma.esf7_resubmission_requestOmit<ExtArgs> | null;
    where?: Prisma.esf7_resubmission_requestWhereInput;
    orderBy?: Prisma.esf7_resubmission_requestOrderByWithRelationInput | Prisma.esf7_resubmission_requestOrderByWithRelationInput[];
    cursor?: Prisma.esf7_resubmission_requestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Esf7_resubmission_requestScalarFieldEnum | Prisma.Esf7_resubmission_requestScalarFieldEnum[];
};
export type esf7_resubmission_requestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_resubmission_requestSelect<ExtArgs> | null;
    omit?: Prisma.esf7_resubmission_requestOmit<ExtArgs> | null;
    where?: Prisma.esf7_resubmission_requestWhereInput;
    orderBy?: Prisma.esf7_resubmission_requestOrderByWithRelationInput | Prisma.esf7_resubmission_requestOrderByWithRelationInput[];
    cursor?: Prisma.esf7_resubmission_requestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Esf7_resubmission_requestScalarFieldEnum | Prisma.Esf7_resubmission_requestScalarFieldEnum[];
};
export type esf7_resubmission_requestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_resubmission_requestSelect<ExtArgs> | null;
    omit?: Prisma.esf7_resubmission_requestOmit<ExtArgs> | null;
    where?: Prisma.esf7_resubmission_requestWhereInput;
    orderBy?: Prisma.esf7_resubmission_requestOrderByWithRelationInput | Prisma.esf7_resubmission_requestOrderByWithRelationInput[];
    cursor?: Prisma.esf7_resubmission_requestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Esf7_resubmission_requestScalarFieldEnum | Prisma.Esf7_resubmission_requestScalarFieldEnum[];
};
export type esf7_resubmission_requestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_resubmission_requestSelect<ExtArgs> | null;
    omit?: Prisma.esf7_resubmission_requestOmit<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.esf7_resubmission_requestCreateInput, Prisma.esf7_resubmission_requestUncheckedCreateInput>;
};
export type esf7_resubmission_requestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.esf7_resubmission_requestCreateManyInput | Prisma.esf7_resubmission_requestCreateManyInput[];
    skipDuplicates?: boolean;
};
export type esf7_resubmission_requestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_resubmission_requestSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.esf7_resubmission_requestOmit<ExtArgs> | null;
    data: Prisma.esf7_resubmission_requestCreateManyInput | Prisma.esf7_resubmission_requestCreateManyInput[];
    skipDuplicates?: boolean;
};
export type esf7_resubmission_requestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_resubmission_requestSelect<ExtArgs> | null;
    omit?: Prisma.esf7_resubmission_requestOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.esf7_resubmission_requestUpdateInput, Prisma.esf7_resubmission_requestUncheckedUpdateInput>;
    where: Prisma.esf7_resubmission_requestWhereUniqueInput;
};
export type esf7_resubmission_requestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.esf7_resubmission_requestUpdateManyMutationInput, Prisma.esf7_resubmission_requestUncheckedUpdateManyInput>;
    where?: Prisma.esf7_resubmission_requestWhereInput;
    limit?: number;
};
export type esf7_resubmission_requestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_resubmission_requestSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.esf7_resubmission_requestOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.esf7_resubmission_requestUpdateManyMutationInput, Prisma.esf7_resubmission_requestUncheckedUpdateManyInput>;
    where?: Prisma.esf7_resubmission_requestWhereInput;
    limit?: number;
};
export type esf7_resubmission_requestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_resubmission_requestSelect<ExtArgs> | null;
    omit?: Prisma.esf7_resubmission_requestOmit<ExtArgs> | null;
    where: Prisma.esf7_resubmission_requestWhereUniqueInput;
    create: Prisma.XOR<Prisma.esf7_resubmission_requestCreateInput, Prisma.esf7_resubmission_requestUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.esf7_resubmission_requestUpdateInput, Prisma.esf7_resubmission_requestUncheckedUpdateInput>;
};
export type esf7_resubmission_requestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_resubmission_requestSelect<ExtArgs> | null;
    omit?: Prisma.esf7_resubmission_requestOmit<ExtArgs> | null;
    where: Prisma.esf7_resubmission_requestWhereUniqueInput;
};
export type esf7_resubmission_requestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.esf7_resubmission_requestWhereInput;
    limit?: number;
};
export type esf7_resubmission_requestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf7_resubmission_requestSelect<ExtArgs> | null;
    omit?: Prisma.esf7_resubmission_requestOmit<ExtArgs> | null;
};
