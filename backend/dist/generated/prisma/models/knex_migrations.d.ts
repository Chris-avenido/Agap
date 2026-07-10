import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type knex_migrationsModel = runtime.Types.Result.DefaultSelection<Prisma.$knex_migrationsPayload>;
export type AggregateKnex_migrations = {
    _count: Knex_migrationsCountAggregateOutputType | null;
    _avg: Knex_migrationsAvgAggregateOutputType | null;
    _sum: Knex_migrationsSumAggregateOutputType | null;
    _min: Knex_migrationsMinAggregateOutputType | null;
    _max: Knex_migrationsMaxAggregateOutputType | null;
};
export type Knex_migrationsAvgAggregateOutputType = {
    id: number | null;
    batch: number | null;
};
export type Knex_migrationsSumAggregateOutputType = {
    id: number | null;
    batch: number | null;
};
export type Knex_migrationsMinAggregateOutputType = {
    id: number | null;
    name: string | null;
    batch: number | null;
    migration_time: Date | null;
};
export type Knex_migrationsMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
    batch: number | null;
    migration_time: Date | null;
};
export type Knex_migrationsCountAggregateOutputType = {
    id: number;
    name: number;
    batch: number;
    migration_time: number;
    _all: number;
};
export type Knex_migrationsAvgAggregateInputType = {
    id?: true;
    batch?: true;
};
export type Knex_migrationsSumAggregateInputType = {
    id?: true;
    batch?: true;
};
export type Knex_migrationsMinAggregateInputType = {
    id?: true;
    name?: true;
    batch?: true;
    migration_time?: true;
};
export type Knex_migrationsMaxAggregateInputType = {
    id?: true;
    name?: true;
    batch?: true;
    migration_time?: true;
};
export type Knex_migrationsCountAggregateInputType = {
    id?: true;
    name?: true;
    batch?: true;
    migration_time?: true;
    _all?: true;
};
export type Knex_migrationsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.knex_migrationsWhereInput;
    orderBy?: Prisma.knex_migrationsOrderByWithRelationInput | Prisma.knex_migrationsOrderByWithRelationInput[];
    cursor?: Prisma.knex_migrationsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Knex_migrationsCountAggregateInputType;
    _avg?: Knex_migrationsAvgAggregateInputType;
    _sum?: Knex_migrationsSumAggregateInputType;
    _min?: Knex_migrationsMinAggregateInputType;
    _max?: Knex_migrationsMaxAggregateInputType;
};
export type GetKnex_migrationsAggregateType<T extends Knex_migrationsAggregateArgs> = {
    [P in keyof T & keyof AggregateKnex_migrations]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateKnex_migrations[P]> : Prisma.GetScalarType<T[P], AggregateKnex_migrations[P]>;
};
export type knex_migrationsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.knex_migrationsWhereInput;
    orderBy?: Prisma.knex_migrationsOrderByWithAggregationInput | Prisma.knex_migrationsOrderByWithAggregationInput[];
    by: Prisma.Knex_migrationsScalarFieldEnum[] | Prisma.Knex_migrationsScalarFieldEnum;
    having?: Prisma.knex_migrationsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Knex_migrationsCountAggregateInputType | true;
    _avg?: Knex_migrationsAvgAggregateInputType;
    _sum?: Knex_migrationsSumAggregateInputType;
    _min?: Knex_migrationsMinAggregateInputType;
    _max?: Knex_migrationsMaxAggregateInputType;
};
export type Knex_migrationsGroupByOutputType = {
    id: number;
    name: string | null;
    batch: number | null;
    migration_time: Date | null;
    _count: Knex_migrationsCountAggregateOutputType | null;
    _avg: Knex_migrationsAvgAggregateOutputType | null;
    _sum: Knex_migrationsSumAggregateOutputType | null;
    _min: Knex_migrationsMinAggregateOutputType | null;
    _max: Knex_migrationsMaxAggregateOutputType | null;
};
export type GetKnex_migrationsGroupByPayload<T extends knex_migrationsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Knex_migrationsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Knex_migrationsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Knex_migrationsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Knex_migrationsGroupByOutputType[P]>;
}>>;
export type knex_migrationsWhereInput = {
    AND?: Prisma.knex_migrationsWhereInput | Prisma.knex_migrationsWhereInput[];
    OR?: Prisma.knex_migrationsWhereInput[];
    NOT?: Prisma.knex_migrationsWhereInput | Prisma.knex_migrationsWhereInput[];
    id?: Prisma.IntFilter<"knex_migrations"> | number;
    name?: Prisma.StringNullableFilter<"knex_migrations"> | string | null;
    batch?: Prisma.IntNullableFilter<"knex_migrations"> | number | null;
    migration_time?: Prisma.DateTimeNullableFilter<"knex_migrations"> | Date | string | null;
};
export type knex_migrationsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    batch?: Prisma.SortOrderInput | Prisma.SortOrder;
    migration_time?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type knex_migrationsWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.knex_migrationsWhereInput | Prisma.knex_migrationsWhereInput[];
    OR?: Prisma.knex_migrationsWhereInput[];
    NOT?: Prisma.knex_migrationsWhereInput | Prisma.knex_migrationsWhereInput[];
    name?: Prisma.StringNullableFilter<"knex_migrations"> | string | null;
    batch?: Prisma.IntNullableFilter<"knex_migrations"> | number | null;
    migration_time?: Prisma.DateTimeNullableFilter<"knex_migrations"> | Date | string | null;
}, "id">;
export type knex_migrationsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    batch?: Prisma.SortOrderInput | Prisma.SortOrder;
    migration_time?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.knex_migrationsCountOrderByAggregateInput;
    _avg?: Prisma.knex_migrationsAvgOrderByAggregateInput;
    _max?: Prisma.knex_migrationsMaxOrderByAggregateInput;
    _min?: Prisma.knex_migrationsMinOrderByAggregateInput;
    _sum?: Prisma.knex_migrationsSumOrderByAggregateInput;
};
export type knex_migrationsScalarWhereWithAggregatesInput = {
    AND?: Prisma.knex_migrationsScalarWhereWithAggregatesInput | Prisma.knex_migrationsScalarWhereWithAggregatesInput[];
    OR?: Prisma.knex_migrationsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.knex_migrationsScalarWhereWithAggregatesInput | Prisma.knex_migrationsScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"knex_migrations"> | number;
    name?: Prisma.StringNullableWithAggregatesFilter<"knex_migrations"> | string | null;
    batch?: Prisma.IntNullableWithAggregatesFilter<"knex_migrations"> | number | null;
    migration_time?: Prisma.DateTimeNullableWithAggregatesFilter<"knex_migrations"> | Date | string | null;
};
export type knex_migrationsCreateInput = {
    name?: string | null;
    batch?: number | null;
    migration_time?: Date | string | null;
};
export type knex_migrationsUncheckedCreateInput = {
    id?: number;
    name?: string | null;
    batch?: number | null;
    migration_time?: Date | string | null;
};
export type knex_migrationsUpdateInput = {
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    migration_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type knex_migrationsUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    migration_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type knex_migrationsCreateManyInput = {
    id?: number;
    name?: string | null;
    batch?: number | null;
    migration_time?: Date | string | null;
};
export type knex_migrationsUpdateManyMutationInput = {
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    migration_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type knex_migrationsUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batch?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    migration_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type knex_migrationsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    batch?: Prisma.SortOrder;
    migration_time?: Prisma.SortOrder;
};
export type knex_migrationsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    batch?: Prisma.SortOrder;
};
export type knex_migrationsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    batch?: Prisma.SortOrder;
    migration_time?: Prisma.SortOrder;
};
export type knex_migrationsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    batch?: Prisma.SortOrder;
    migration_time?: Prisma.SortOrder;
};
export type knex_migrationsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    batch?: Prisma.SortOrder;
};
export type knex_migrationsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    batch?: boolean;
    migration_time?: boolean;
}, ExtArgs["result"]["knex_migrations"]>;
export type knex_migrationsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    batch?: boolean;
    migration_time?: boolean;
}, ExtArgs["result"]["knex_migrations"]>;
export type knex_migrationsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    batch?: boolean;
    migration_time?: boolean;
}, ExtArgs["result"]["knex_migrations"]>;
export type knex_migrationsSelectScalar = {
    id?: boolean;
    name?: boolean;
    batch?: boolean;
    migration_time?: boolean;
};
export type knex_migrationsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "batch" | "migration_time", ExtArgs["result"]["knex_migrations"]>;
export type $knex_migrationsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "knex_migrations";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        name: string | null;
        batch: number | null;
        migration_time: Date | null;
    }, ExtArgs["result"]["knex_migrations"]>;
    composites: {};
};
export type knex_migrationsGetPayload<S extends boolean | null | undefined | knex_migrationsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$knex_migrationsPayload, S>;
export type knex_migrationsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<knex_migrationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Knex_migrationsCountAggregateInputType | true;
};
export interface knex_migrationsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['knex_migrations'];
        meta: {
            name: 'knex_migrations';
        };
    };
    findUnique<T extends knex_migrationsFindUniqueArgs>(args: Prisma.SelectSubset<T, knex_migrationsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__knex_migrationsClient<runtime.Types.Result.GetResult<Prisma.$knex_migrationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends knex_migrationsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, knex_migrationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__knex_migrationsClient<runtime.Types.Result.GetResult<Prisma.$knex_migrationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends knex_migrationsFindFirstArgs>(args?: Prisma.SelectSubset<T, knex_migrationsFindFirstArgs<ExtArgs>>): Prisma.Prisma__knex_migrationsClient<runtime.Types.Result.GetResult<Prisma.$knex_migrationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends knex_migrationsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, knex_migrationsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__knex_migrationsClient<runtime.Types.Result.GetResult<Prisma.$knex_migrationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends knex_migrationsFindManyArgs>(args?: Prisma.SelectSubset<T, knex_migrationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$knex_migrationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends knex_migrationsCreateArgs>(args: Prisma.SelectSubset<T, knex_migrationsCreateArgs<ExtArgs>>): Prisma.Prisma__knex_migrationsClient<runtime.Types.Result.GetResult<Prisma.$knex_migrationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends knex_migrationsCreateManyArgs>(args?: Prisma.SelectSubset<T, knex_migrationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends knex_migrationsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, knex_migrationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$knex_migrationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends knex_migrationsDeleteArgs>(args: Prisma.SelectSubset<T, knex_migrationsDeleteArgs<ExtArgs>>): Prisma.Prisma__knex_migrationsClient<runtime.Types.Result.GetResult<Prisma.$knex_migrationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends knex_migrationsUpdateArgs>(args: Prisma.SelectSubset<T, knex_migrationsUpdateArgs<ExtArgs>>): Prisma.Prisma__knex_migrationsClient<runtime.Types.Result.GetResult<Prisma.$knex_migrationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends knex_migrationsDeleteManyArgs>(args?: Prisma.SelectSubset<T, knex_migrationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends knex_migrationsUpdateManyArgs>(args: Prisma.SelectSubset<T, knex_migrationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends knex_migrationsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, knex_migrationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$knex_migrationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends knex_migrationsUpsertArgs>(args: Prisma.SelectSubset<T, knex_migrationsUpsertArgs<ExtArgs>>): Prisma.Prisma__knex_migrationsClient<runtime.Types.Result.GetResult<Prisma.$knex_migrationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends knex_migrationsCountArgs>(args?: Prisma.Subset<T, knex_migrationsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Knex_migrationsCountAggregateOutputType> : number>;
    aggregate<T extends Knex_migrationsAggregateArgs>(args: Prisma.Subset<T, Knex_migrationsAggregateArgs>): Prisma.PrismaPromise<GetKnex_migrationsAggregateType<T>>;
    groupBy<T extends knex_migrationsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: knex_migrationsGroupByArgs['orderBy'];
    } : {
        orderBy?: knex_migrationsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, knex_migrationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKnex_migrationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: knex_migrationsFieldRefs;
}
export interface Prisma__knex_migrationsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface knex_migrationsFieldRefs {
    readonly id: Prisma.FieldRef<"knex_migrations", 'Int'>;
    readonly name: Prisma.FieldRef<"knex_migrations", 'String'>;
    readonly batch: Prisma.FieldRef<"knex_migrations", 'Int'>;
    readonly migration_time: Prisma.FieldRef<"knex_migrations", 'DateTime'>;
}
export type knex_migrationsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrationsSelect<ExtArgs> | null;
    omit?: Prisma.knex_migrationsOmit<ExtArgs> | null;
    where: Prisma.knex_migrationsWhereUniqueInput;
};
export type knex_migrationsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrationsSelect<ExtArgs> | null;
    omit?: Prisma.knex_migrationsOmit<ExtArgs> | null;
    where: Prisma.knex_migrationsWhereUniqueInput;
};
export type knex_migrationsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrationsSelect<ExtArgs> | null;
    omit?: Prisma.knex_migrationsOmit<ExtArgs> | null;
    where?: Prisma.knex_migrationsWhereInput;
    orderBy?: Prisma.knex_migrationsOrderByWithRelationInput | Prisma.knex_migrationsOrderByWithRelationInput[];
    cursor?: Prisma.knex_migrationsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Knex_migrationsScalarFieldEnum | Prisma.Knex_migrationsScalarFieldEnum[];
};
export type knex_migrationsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrationsSelect<ExtArgs> | null;
    omit?: Prisma.knex_migrationsOmit<ExtArgs> | null;
    where?: Prisma.knex_migrationsWhereInput;
    orderBy?: Prisma.knex_migrationsOrderByWithRelationInput | Prisma.knex_migrationsOrderByWithRelationInput[];
    cursor?: Prisma.knex_migrationsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Knex_migrationsScalarFieldEnum | Prisma.Knex_migrationsScalarFieldEnum[];
};
export type knex_migrationsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrationsSelect<ExtArgs> | null;
    omit?: Prisma.knex_migrationsOmit<ExtArgs> | null;
    where?: Prisma.knex_migrationsWhereInput;
    orderBy?: Prisma.knex_migrationsOrderByWithRelationInput | Prisma.knex_migrationsOrderByWithRelationInput[];
    cursor?: Prisma.knex_migrationsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Knex_migrationsScalarFieldEnum | Prisma.Knex_migrationsScalarFieldEnum[];
};
export type knex_migrationsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrationsSelect<ExtArgs> | null;
    omit?: Prisma.knex_migrationsOmit<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.knex_migrationsCreateInput, Prisma.knex_migrationsUncheckedCreateInput>;
};
export type knex_migrationsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.knex_migrationsCreateManyInput | Prisma.knex_migrationsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type knex_migrationsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrationsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.knex_migrationsOmit<ExtArgs> | null;
    data: Prisma.knex_migrationsCreateManyInput | Prisma.knex_migrationsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type knex_migrationsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrationsSelect<ExtArgs> | null;
    omit?: Prisma.knex_migrationsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.knex_migrationsUpdateInput, Prisma.knex_migrationsUncheckedUpdateInput>;
    where: Prisma.knex_migrationsWhereUniqueInput;
};
export type knex_migrationsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.knex_migrationsUpdateManyMutationInput, Prisma.knex_migrationsUncheckedUpdateManyInput>;
    where?: Prisma.knex_migrationsWhereInput;
    limit?: number;
};
export type knex_migrationsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrationsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.knex_migrationsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.knex_migrationsUpdateManyMutationInput, Prisma.knex_migrationsUncheckedUpdateManyInput>;
    where?: Prisma.knex_migrationsWhereInput;
    limit?: number;
};
export type knex_migrationsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrationsSelect<ExtArgs> | null;
    omit?: Prisma.knex_migrationsOmit<ExtArgs> | null;
    where: Prisma.knex_migrationsWhereUniqueInput;
    create: Prisma.XOR<Prisma.knex_migrationsCreateInput, Prisma.knex_migrationsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.knex_migrationsUpdateInput, Prisma.knex_migrationsUncheckedUpdateInput>;
};
export type knex_migrationsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrationsSelect<ExtArgs> | null;
    omit?: Prisma.knex_migrationsOmit<ExtArgs> | null;
    where: Prisma.knex_migrationsWhereUniqueInput;
};
export type knex_migrationsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.knex_migrationsWhereInput;
    limit?: number;
};
export type knex_migrationsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.knex_migrationsSelect<ExtArgs> | null;
    omit?: Prisma.knex_migrationsOmit<ExtArgs> | null;
};
