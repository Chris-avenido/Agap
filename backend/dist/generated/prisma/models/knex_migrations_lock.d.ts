import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type knex_migrations_lockModel = runtime.Types.Result.DefaultSelection<Prisma.$knex_migrations_lockPayload>;
export type AggregateKnex_migrations_lock = {
    _count: Knex_migrations_lockCountAggregateOutputType | null;
    _avg: Knex_migrations_lockAvgAggregateOutputType | null;
    _sum: Knex_migrations_lockSumAggregateOutputType | null;
    _min: Knex_migrations_lockMinAggregateOutputType | null;
    _max: Knex_migrations_lockMaxAggregateOutputType | null;
};
export type Knex_migrations_lockAvgAggregateOutputType = {
    index: number | null;
    is_locked: number | null;
};
export type Knex_migrations_lockSumAggregateOutputType = {
    index: number | null;
    is_locked: number | null;
};
export type Knex_migrations_lockMinAggregateOutputType = {
    index: number | null;
    is_locked: number | null;
};
export type Knex_migrations_lockMaxAggregateOutputType = {
    index: number | null;
    is_locked: number | null;
};
export type Knex_migrations_lockCountAggregateOutputType = {
    index: number;
    is_locked: number;
    _all: number;
};
export type Knex_migrations_lockAvgAggregateInputType = {
    index?: true;
    is_locked?: true;
};
export type Knex_migrations_lockSumAggregateInputType = {
    index?: true;
    is_locked?: true;
};
export type Knex_migrations_lockMinAggregateInputType = {
    index?: true;
    is_locked?: true;
};
export type Knex_migrations_lockMaxAggregateInputType = {
    index?: true;
    is_locked?: true;
};
export type Knex_migrations_lockCountAggregateInputType = {
    index?: true;
    is_locked?: true;
    _all?: true;
};
export type Knex_migrations_lockAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.knex_migrations_lockWhereInput;
    orderBy?: Prisma.knex_migrations_lockOrderByWithRelationInput | Prisma.knex_migrations_lockOrderByWithRelationInput[];
    cursor?: Prisma.knex_migrations_lockWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Knex_migrations_lockCountAggregateInputType;
    _avg?: Knex_migrations_lockAvgAggregateInputType;
    _sum?: Knex_migrations_lockSumAggregateInputType;
    _min?: Knex_migrations_lockMinAggregateInputType;
    _max?: Knex_migrations_lockMaxAggregateInputType;
};
export type GetKnex_migrations_lockAggregateType<T extends Knex_migrations_lockAggregateArgs> = {
    [P in keyof T & keyof AggregateKnex_migrations_lock]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateKnex_migrations_lock[P]> : Prisma.GetScalarType<T[P], AggregateKnex_migrations_lock[P]>;
};
export type knex_migrations_lockGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.knex_migrations_lockWhereInput;
    orderBy?: Prisma.knex_migrations_lockOrderByWithAggregationInput | Prisma.knex_migrations_lockOrderByWithAggregationInput[];
    by: Prisma.Knex_migrations_lockScalarFieldEnum[] | Prisma.Knex_migrations_lockScalarFieldEnum;
    having?: Prisma.knex_migrations_lockScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Knex_migrations_lockCountAggregateInputType | true;
    _avg?: Knex_migrations_lockAvgAggregateInputType;
    _sum?: Knex_migrations_lockSumAggregateInputType;
    _min?: Knex_migrations_lockMinAggregateInputType;
    _max?: Knex_migrations_lockMaxAggregateInputType;
};
export type Knex_migrations_lockGroupByOutputType = {
    index: number;
    is_locked: number | null;
    _count: Knex_migrations_lockCountAggregateOutputType | null;
    _avg: Knex_migrations_lockAvgAggregateOutputType | null;
    _sum: Knex_migrations_lockSumAggregateOutputType | null;
    _min: Knex_migrations_lockMinAggregateOutputType | null;
    _max: Knex_migrations_lockMaxAggregateOutputType | null;
};
export type GetKnex_migrations_lockGroupByPayload<T extends knex_migrations_lockGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Knex_migrations_lockGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Knex_migrations_lockGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Knex_migrations_lockGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Knex_migrations_lockGroupByOutputType[P]>;
}>>;
export type knex_migrations_lockWhereInput = {
    AND?: Prisma.knex_migrations_lockWhereInput | Prisma.knex_migrations_lockWhereInput[];
    OR?: Prisma.knex_migrations_lockWhereInput[];
    NOT?: Prisma.knex_migrations_lockWhereInput | Prisma.knex_migrations_lockWhereInput[];
    index?: Prisma.IntFilter<"knex_migrations_lock"> | number;
    is_locked?: Prisma.IntNullableFilter<"knex_migrations_lock"> | number | null;
};
export type knex_migrations_lockOrderByWithRelationInput = {
    index?: Prisma.SortOrder;
    is_locked?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type knex_migrations_lockWhereUniqueInput = Prisma.AtLeast<{
    index?: number;
    AND?: Prisma.knex_migrations_lockWhereInput | Prisma.knex_migrations_lockWhereInput[];
    OR?: Prisma.knex_migrations_lockWhereInput[];
    NOT?: Prisma.knex_migrations_lockWhereInput | Prisma.knex_migrations_lockWhereInput[];
    is_locked?: Prisma.IntNullableFilter<"knex_migrations_lock"> | number | null;
}, "index">;
export type knex_migrations_lockOrderByWithAggregationInput = {
    index?: Prisma.SortOrder;
    is_locked?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.knex_migrations_lockCountOrderByAggregateInput;
    _avg?: Prisma.knex_migrations_lockAvgOrderByAggregateInput;
    _max?: Prisma.knex_migrations_lockMaxOrderByAggregateInput;
    _min?: Prisma.knex_migrations_lockMinOrderByAggregateInput;
    _sum?: Prisma.knex_migrations_lockSumOrderByAggregateInput;
};
export type knex_migrations_lockScalarWhereWithAggregatesInput = {
    AND?: Prisma.knex_migrations_lockScalarWhereWithAggregatesInput | Prisma.knex_migrations_lockScalarWhereWithAggregatesInput[];
    OR?: Prisma.knex_migrations_lockScalarWhereWithAggregatesInput[];
    NOT?: Prisma.knex_migrations_lockScalarWhereWithAggregatesInput | Prisma.knex_migrations_lockScalarWhereWithAggregatesInput[];
    index?: Prisma.IntWithAggregatesFilter<"knex_migrations_lock"> | number;
    is_locked?: Prisma.IntNullableWithAggregatesFilter<"knex_migrations_lock"> | number | null;
};
export type knex_migrations_lockCreateInput = {
    is_locked?: number | null;
};
export type knex_migrations_lockUncheckedCreateInput = {
    index?: number;
    is_locked?: number | null;
};
export type knex_migrations_lockUpdateInput = {
    is_locked?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type knex_migrations_lockUncheckedUpdateInput = {
    index?: Prisma.IntFieldUpdateOperationsInput | number;
    is_locked?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type knex_migrations_lockCreateManyInput = {
    index?: number;
    is_locked?: number | null;
};
export type knex_migrations_lockUpdateManyMutationInput = {
    is_locked?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type knex_migrations_lockUncheckedUpdateManyInput = {
    index?: Prisma.IntFieldUpdateOperationsInput | number;
    is_locked?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type knex_migrations_lockCountOrderByAggregateInput = {
    index?: Prisma.SortOrder;
    is_locked?: Prisma.SortOrder;
};
export type knex_migrations_lockAvgOrderByAggregateInput = {
    index?: Prisma.SortOrder;
    is_locked?: Prisma.SortOrder;
};
export type knex_migrations_lockMaxOrderByAggregateInput = {
    index?: Prisma.SortOrder;
    is_locked?: Prisma.SortOrder;
};
export type knex_migrations_lockMinOrderByAggregateInput = {
    index?: Prisma.SortOrder;
    is_locked?: Prisma.SortOrder;
};
export type knex_migrations_lockSumOrderByAggregateInput = {
    index?: Prisma.SortOrder;
    is_locked?: Prisma.SortOrder;
};
export type knex_migrations_lockSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    index?: boolean;
    is_locked?: boolean;
}, ExtArgs["result"]["knex_migrations_lock"]>;
export type knex_migrations_lockSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    index?: boolean;
    is_locked?: boolean;
}, ExtArgs["result"]["knex_migrations_lock"]>;
export type knex_migrations_lockSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    index?: boolean;
    is_locked?: boolean;
}, ExtArgs["result"]["knex_migrations_lock"]>;
export type knex_migrations_lockSelectScalar = {
    index?: boolean;
    is_locked?: boolean;
};
export type knex_migrations_lockOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"index" | "is_locked", ExtArgs["result"]["knex_migrations_lock"]>;
export type $knex_migrations_lockPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "knex_migrations_lock";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        index: number;
        is_locked: number | null;
    }, ExtArgs["result"]["knex_migrations_lock"]>;
    composites: {};
};
export type knex_migrations_lockGetPayload<S extends boolean | null | undefined | knex_migrations_lockDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$knex_migrations_lockPayload, S>;
export type knex_migrations_lockCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<knex_migrations_lockFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Knex_migrations_lockCountAggregateInputType | true;
};
export interface knex_migrations_lockDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['knex_migrations_lock'];
        meta: {
            name: 'knex_migrations_lock';
        };
    };
    findUnique<T extends knex_migrations_lockFindUniqueArgs>(args: Prisma.SelectSubset<T, knex_migrations_lockFindUniqueArgs<ExtArgs>>): Prisma.Prisma__knex_migrations_lockClient<runtime.Types.Result.GetResult<Prisma.$knex_migrations_lockPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends knex_migrations_lockFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, knex_migrations_lockFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__knex_migrations_lockClient<runtime.Types.Result.GetResult<Prisma.$knex_migrations_lockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends knex_migrations_lockFindFirstArgs>(args?: Prisma.SelectSubset<T, knex_migrations_lockFindFirstArgs<ExtArgs>>): Prisma.Prisma__knex_migrations_lockClient<runtime.Types.Result.GetResult<Prisma.$knex_migrations_lockPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends knex_migrations_lockFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, knex_migrations_lockFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__knex_migrations_lockClient<runtime.Types.Result.GetResult<Prisma.$knex_migrations_lockPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends knex_migrations_lockFindManyArgs>(args?: Prisma.SelectSubset<T, knex_migrations_lockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$knex_migrations_lockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends knex_migrations_lockCreateArgs>(args: Prisma.SelectSubset<T, knex_migrations_lockCreateArgs<ExtArgs>>): Prisma.Prisma__knex_migrations_lockClient<runtime.Types.Result.GetResult<Prisma.$knex_migrations_lockPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends knex_migrations_lockCreateManyArgs>(args?: Prisma.SelectSubset<T, knex_migrations_lockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends knex_migrations_lockCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, knex_migrations_lockCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$knex_migrations_lockPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends knex_migrations_lockDeleteArgs>(args: Prisma.SelectSubset<T, knex_migrations_lockDeleteArgs<ExtArgs>>): Prisma.Prisma__knex_migrations_lockClient<runtime.Types.Result.GetResult<Prisma.$knex_migrations_lockPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends knex_migrations_lockUpdateArgs>(args: Prisma.SelectSubset<T, knex_migrations_lockUpdateArgs<ExtArgs>>): Prisma.Prisma__knex_migrations_lockClient<runtime.Types.Result.GetResult<Prisma.$knex_migrations_lockPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends knex_migrations_lockDeleteManyArgs>(args?: Prisma.SelectSubset<T, knex_migrations_lockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends knex_migrations_lockUpdateManyArgs>(args: Prisma.SelectSubset<T, knex_migrations_lockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends knex_migrations_lockUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, knex_migrations_lockUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$knex_migrations_lockPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends knex_migrations_lockUpsertArgs>(args: Prisma.SelectSubset<T, knex_migrations_lockUpsertArgs<ExtArgs>>): Prisma.Prisma__knex_migrations_lockClient<runtime.Types.Result.GetResult<Prisma.$knex_migrations_lockPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends knex_migrations_lockCountArgs>(args?: Prisma.Subset<T, knex_migrations_lockCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Knex_migrations_lockCountAggregateOutputType> : number>;
    aggregate<T extends Knex_migrations_lockAggregateArgs>(args: Prisma.Subset<T, Knex_migrations_lockAggregateArgs>): Prisma.PrismaPromise<GetKnex_migrations_lockAggregateType<T>>;
    groupBy<T extends knex_migrations_lockGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: knex_migrations_lockGroupByArgs['orderBy'];
    } : {
        orderBy?: knex_migrations_lockGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, knex_migrations_lockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKnex_migrations_lockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: knex_migrations_lockFieldRefs;
}
export interface Prisma__knex_migrations_lockClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface knex_migrations_lockFieldRefs {
    readonly index: Prisma.FieldRef<"knex_migrations_lock", 'Int'>;
    readonly is_locked: Prisma.FieldRef<"knex_migrations_lock", 'Int'>;
}
export type knex_migrations_lockFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrations_lockSelect<ExtArgs> | null;
    omit?: Prisma.knex_migrations_lockOmit<ExtArgs> | null;
    where: Prisma.knex_migrations_lockWhereUniqueInput;
};
export type knex_migrations_lockFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrations_lockSelect<ExtArgs> | null;
    omit?: Prisma.knex_migrations_lockOmit<ExtArgs> | null;
    where: Prisma.knex_migrations_lockWhereUniqueInput;
};
export type knex_migrations_lockFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrations_lockSelect<ExtArgs> | null;
    omit?: Prisma.knex_migrations_lockOmit<ExtArgs> | null;
    where?: Prisma.knex_migrations_lockWhereInput;
    orderBy?: Prisma.knex_migrations_lockOrderByWithRelationInput | Prisma.knex_migrations_lockOrderByWithRelationInput[];
    cursor?: Prisma.knex_migrations_lockWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Knex_migrations_lockScalarFieldEnum | Prisma.Knex_migrations_lockScalarFieldEnum[];
};
export type knex_migrations_lockFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrations_lockSelect<ExtArgs> | null;
    omit?: Prisma.knex_migrations_lockOmit<ExtArgs> | null;
    where?: Prisma.knex_migrations_lockWhereInput;
    orderBy?: Prisma.knex_migrations_lockOrderByWithRelationInput | Prisma.knex_migrations_lockOrderByWithRelationInput[];
    cursor?: Prisma.knex_migrations_lockWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Knex_migrations_lockScalarFieldEnum | Prisma.Knex_migrations_lockScalarFieldEnum[];
};
export type knex_migrations_lockFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrations_lockSelect<ExtArgs> | null;
    omit?: Prisma.knex_migrations_lockOmit<ExtArgs> | null;
    where?: Prisma.knex_migrations_lockWhereInput;
    orderBy?: Prisma.knex_migrations_lockOrderByWithRelationInput | Prisma.knex_migrations_lockOrderByWithRelationInput[];
    cursor?: Prisma.knex_migrations_lockWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Knex_migrations_lockScalarFieldEnum | Prisma.Knex_migrations_lockScalarFieldEnum[];
};
export type knex_migrations_lockCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrations_lockSelect<ExtArgs> | null;
    omit?: Prisma.knex_migrations_lockOmit<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.knex_migrations_lockCreateInput, Prisma.knex_migrations_lockUncheckedCreateInput>;
};
export type knex_migrations_lockCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.knex_migrations_lockCreateManyInput | Prisma.knex_migrations_lockCreateManyInput[];
    skipDuplicates?: boolean;
};
export type knex_migrations_lockCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrations_lockSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.knex_migrations_lockOmit<ExtArgs> | null;
    data: Prisma.knex_migrations_lockCreateManyInput | Prisma.knex_migrations_lockCreateManyInput[];
    skipDuplicates?: boolean;
};
export type knex_migrations_lockUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrations_lockSelect<ExtArgs> | null;
    omit?: Prisma.knex_migrations_lockOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.knex_migrations_lockUpdateInput, Prisma.knex_migrations_lockUncheckedUpdateInput>;
    where: Prisma.knex_migrations_lockWhereUniqueInput;
};
export type knex_migrations_lockUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.knex_migrations_lockUpdateManyMutationInput, Prisma.knex_migrations_lockUncheckedUpdateManyInput>;
    where?: Prisma.knex_migrations_lockWhereInput;
    limit?: number;
};
export type knex_migrations_lockUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrations_lockSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.knex_migrations_lockOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.knex_migrations_lockUpdateManyMutationInput, Prisma.knex_migrations_lockUncheckedUpdateManyInput>;
    where?: Prisma.knex_migrations_lockWhereInput;
    limit?: number;
};
export type knex_migrations_lockUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrations_lockSelect<ExtArgs> | null;
    omit?: Prisma.knex_migrations_lockOmit<ExtArgs> | null;
    where: Prisma.knex_migrations_lockWhereUniqueInput;
    create: Prisma.XOR<Prisma.knex_migrations_lockCreateInput, Prisma.knex_migrations_lockUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.knex_migrations_lockUpdateInput, Prisma.knex_migrations_lockUncheckedUpdateInput>;
};
export type knex_migrations_lockDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrations_lockSelect<ExtArgs> | null;
    omit?: Prisma.knex_migrations_lockOmit<ExtArgs> | null;
    where: Prisma.knex_migrations_lockWhereUniqueInput;
};
export type knex_migrations_lockDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.knex_migrations_lockWhereInput;
    limit?: number;
};
export type knex_migrations_lockDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrations_lockSelect<ExtArgs> | null;
    omit?: Prisma.knex_migrations_lockOmit<ExtArgs> | null;
};
