import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ph_migrationsModel = runtime.Types.Result.DefaultSelection<Prisma.$ph_migrationsPayload>;
export type AggregatePh_migrations = {
    _count: Ph_migrationsCountAggregateOutputType | null;
    _avg: Ph_migrationsAvgAggregateOutputType | null;
    _sum: Ph_migrationsSumAggregateOutputType | null;
    _min: Ph_migrationsMinAggregateOutputType | null;
    _max: Ph_migrationsMaxAggregateOutputType | null;
};
export type Ph_migrationsAvgAggregateOutputType = {
    id: number | null;
};
export type Ph_migrationsSumAggregateOutputType = {
    id: number | null;
};
export type Ph_migrationsMinAggregateOutputType = {
    id: number | null;
    migration_name: string | null;
    executed_at: Date | null;
};
export type Ph_migrationsMaxAggregateOutputType = {
    id: number | null;
    migration_name: string | null;
    executed_at: Date | null;
};
export type Ph_migrationsCountAggregateOutputType = {
    id: number;
    migration_name: number;
    executed_at: number;
    _all: number;
};
export type Ph_migrationsAvgAggregateInputType = {
    id?: true;
};
export type Ph_migrationsSumAggregateInputType = {
    id?: true;
};
export type Ph_migrationsMinAggregateInputType = {
    id?: true;
    migration_name?: true;
    executed_at?: true;
};
export type Ph_migrationsMaxAggregateInputType = {
    id?: true;
    migration_name?: true;
    executed_at?: true;
};
export type Ph_migrationsCountAggregateInputType = {
    id?: true;
    migration_name?: true;
    executed_at?: true;
    _all?: true;
};
export type Ph_migrationsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ph_migrationsWhereInput;
    orderBy?: Prisma.ph_migrationsOrderByWithRelationInput | Prisma.ph_migrationsOrderByWithRelationInput[];
    cursor?: Prisma.ph_migrationsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Ph_migrationsCountAggregateInputType;
    _avg?: Ph_migrationsAvgAggregateInputType;
    _sum?: Ph_migrationsSumAggregateInputType;
    _min?: Ph_migrationsMinAggregateInputType;
    _max?: Ph_migrationsMaxAggregateInputType;
};
export type GetPh_migrationsAggregateType<T extends Ph_migrationsAggregateArgs> = {
    [P in keyof T & keyof AggregatePh_migrations]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePh_migrations[P]> : Prisma.GetScalarType<T[P], AggregatePh_migrations[P]>;
};
export type ph_migrationsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ph_migrationsWhereInput;
    orderBy?: Prisma.ph_migrationsOrderByWithAggregationInput | Prisma.ph_migrationsOrderByWithAggregationInput[];
    by: Prisma.Ph_migrationsScalarFieldEnum[] | Prisma.Ph_migrationsScalarFieldEnum;
    having?: Prisma.ph_migrationsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Ph_migrationsCountAggregateInputType | true;
    _avg?: Ph_migrationsAvgAggregateInputType;
    _sum?: Ph_migrationsSumAggregateInputType;
    _min?: Ph_migrationsMinAggregateInputType;
    _max?: Ph_migrationsMaxAggregateInputType;
};
export type Ph_migrationsGroupByOutputType = {
    id: number;
    migration_name: string;
    executed_at: Date | null;
    _count: Ph_migrationsCountAggregateOutputType | null;
    _avg: Ph_migrationsAvgAggregateOutputType | null;
    _sum: Ph_migrationsSumAggregateOutputType | null;
    _min: Ph_migrationsMinAggregateOutputType | null;
    _max: Ph_migrationsMaxAggregateOutputType | null;
};
export type GetPh_migrationsGroupByPayload<T extends ph_migrationsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Ph_migrationsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Ph_migrationsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Ph_migrationsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Ph_migrationsGroupByOutputType[P]>;
}>>;
export type ph_migrationsWhereInput = {
    AND?: Prisma.ph_migrationsWhereInput | Prisma.ph_migrationsWhereInput[];
    OR?: Prisma.ph_migrationsWhereInput[];
    NOT?: Prisma.ph_migrationsWhereInput | Prisma.ph_migrationsWhereInput[];
    id?: Prisma.IntFilter<"ph_migrations"> | number;
    migration_name?: Prisma.StringFilter<"ph_migrations"> | string;
    executed_at?: Prisma.DateTimeNullableFilter<"ph_migrations"> | Date | string | null;
};
export type ph_migrationsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    migration_name?: Prisma.SortOrder;
    executed_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type ph_migrationsWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    migration_name?: string;
    AND?: Prisma.ph_migrationsWhereInput | Prisma.ph_migrationsWhereInput[];
    OR?: Prisma.ph_migrationsWhereInput[];
    NOT?: Prisma.ph_migrationsWhereInput | Prisma.ph_migrationsWhereInput[];
    executed_at?: Prisma.DateTimeNullableFilter<"ph_migrations"> | Date | string | null;
}, "id" | "migration_name">;
export type ph_migrationsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    migration_name?: Prisma.SortOrder;
    executed_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ph_migrationsCountOrderByAggregateInput;
    _avg?: Prisma.ph_migrationsAvgOrderByAggregateInput;
    _max?: Prisma.ph_migrationsMaxOrderByAggregateInput;
    _min?: Prisma.ph_migrationsMinOrderByAggregateInput;
    _sum?: Prisma.ph_migrationsSumOrderByAggregateInput;
};
export type ph_migrationsScalarWhereWithAggregatesInput = {
    AND?: Prisma.ph_migrationsScalarWhereWithAggregatesInput | Prisma.ph_migrationsScalarWhereWithAggregatesInput[];
    OR?: Prisma.ph_migrationsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ph_migrationsScalarWhereWithAggregatesInput | Prisma.ph_migrationsScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"ph_migrations"> | number;
    migration_name?: Prisma.StringWithAggregatesFilter<"ph_migrations"> | string;
    executed_at?: Prisma.DateTimeNullableWithAggregatesFilter<"ph_migrations"> | Date | string | null;
};
export type ph_migrationsCreateInput = {
    migration_name: string;
    executed_at?: Date | string | null;
};
export type ph_migrationsUncheckedCreateInput = {
    id?: number;
    migration_name: string;
    executed_at?: Date | string | null;
};
export type ph_migrationsUpdateInput = {
    migration_name?: Prisma.StringFieldUpdateOperationsInput | string;
    executed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ph_migrationsUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    migration_name?: Prisma.StringFieldUpdateOperationsInput | string;
    executed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ph_migrationsCreateManyInput = {
    id?: number;
    migration_name: string;
    executed_at?: Date | string | null;
};
export type ph_migrationsUpdateManyMutationInput = {
    migration_name?: Prisma.StringFieldUpdateOperationsInput | string;
    executed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ph_migrationsUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    migration_name?: Prisma.StringFieldUpdateOperationsInput | string;
    executed_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ph_migrationsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    migration_name?: Prisma.SortOrder;
    executed_at?: Prisma.SortOrder;
};
export type ph_migrationsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type ph_migrationsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    migration_name?: Prisma.SortOrder;
    executed_at?: Prisma.SortOrder;
};
export type ph_migrationsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    migration_name?: Prisma.SortOrder;
    executed_at?: Prisma.SortOrder;
};
export type ph_migrationsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type ph_migrationsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    migration_name?: boolean;
    executed_at?: boolean;
}, ExtArgs["result"]["ph_migrations"]>;
export type ph_migrationsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    migration_name?: boolean;
    executed_at?: boolean;
}, ExtArgs["result"]["ph_migrations"]>;
export type ph_migrationsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    migration_name?: boolean;
    executed_at?: boolean;
}, ExtArgs["result"]["ph_migrations"]>;
export type ph_migrationsSelectScalar = {
    id?: boolean;
    migration_name?: boolean;
    executed_at?: boolean;
};
export type ph_migrationsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "migration_name" | "executed_at", ExtArgs["result"]["ph_migrations"]>;
export type $ph_migrationsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ph_migrations";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        migration_name: string;
        executed_at: Date | null;
    }, ExtArgs["result"]["ph_migrations"]>;
    composites: {};
};
export type ph_migrationsGetPayload<S extends boolean | null | undefined | ph_migrationsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ph_migrationsPayload, S>;
export type ph_migrationsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ph_migrationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Ph_migrationsCountAggregateInputType | true;
};
export interface ph_migrationsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ph_migrations'];
        meta: {
            name: 'ph_migrations';
        };
    };
    findUnique<T extends ph_migrationsFindUniqueArgs>(args: Prisma.SelectSubset<T, ph_migrationsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ph_migrationsClient<runtime.Types.Result.GetResult<Prisma.$ph_migrationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ph_migrationsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ph_migrationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ph_migrationsClient<runtime.Types.Result.GetResult<Prisma.$ph_migrationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ph_migrationsFindFirstArgs>(args?: Prisma.SelectSubset<T, ph_migrationsFindFirstArgs<ExtArgs>>): Prisma.Prisma__ph_migrationsClient<runtime.Types.Result.GetResult<Prisma.$ph_migrationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ph_migrationsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ph_migrationsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ph_migrationsClient<runtime.Types.Result.GetResult<Prisma.$ph_migrationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ph_migrationsFindManyArgs>(args?: Prisma.SelectSubset<T, ph_migrationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ph_migrationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ph_migrationsCreateArgs>(args: Prisma.SelectSubset<T, ph_migrationsCreateArgs<ExtArgs>>): Prisma.Prisma__ph_migrationsClient<runtime.Types.Result.GetResult<Prisma.$ph_migrationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ph_migrationsCreateManyArgs>(args?: Prisma.SelectSubset<T, ph_migrationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ph_migrationsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ph_migrationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ph_migrationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ph_migrationsDeleteArgs>(args: Prisma.SelectSubset<T, ph_migrationsDeleteArgs<ExtArgs>>): Prisma.Prisma__ph_migrationsClient<runtime.Types.Result.GetResult<Prisma.$ph_migrationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ph_migrationsUpdateArgs>(args: Prisma.SelectSubset<T, ph_migrationsUpdateArgs<ExtArgs>>): Prisma.Prisma__ph_migrationsClient<runtime.Types.Result.GetResult<Prisma.$ph_migrationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ph_migrationsDeleteManyArgs>(args?: Prisma.SelectSubset<T, ph_migrationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ph_migrationsUpdateManyArgs>(args: Prisma.SelectSubset<T, ph_migrationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ph_migrationsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ph_migrationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ph_migrationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ph_migrationsUpsertArgs>(args: Prisma.SelectSubset<T, ph_migrationsUpsertArgs<ExtArgs>>): Prisma.Prisma__ph_migrationsClient<runtime.Types.Result.GetResult<Prisma.$ph_migrationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ph_migrationsCountArgs>(args?: Prisma.Subset<T, ph_migrationsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Ph_migrationsCountAggregateOutputType> : number>;
    aggregate<T extends Ph_migrationsAggregateArgs>(args: Prisma.Subset<T, Ph_migrationsAggregateArgs>): Prisma.PrismaPromise<GetPh_migrationsAggregateType<T>>;
    groupBy<T extends ph_migrationsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ph_migrationsGroupByArgs['orderBy'];
    } : {
        orderBy?: ph_migrationsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ph_migrationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPh_migrationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ph_migrationsFieldRefs;
}
export interface Prisma__ph_migrationsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ph_migrationsFieldRefs {
    readonly id: Prisma.FieldRef<"ph_migrations", 'Int'>;
    readonly migration_name: Prisma.FieldRef<"ph_migrations", 'String'>;
    readonly executed_at: Prisma.FieldRef<"ph_migrations", 'DateTime'>;
}
export type ph_migrationsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_migrationsSelect<ExtArgs> | null;
    omit?: Prisma.ph_migrationsOmit<ExtArgs> | null;
    where: Prisma.ph_migrationsWhereUniqueInput;
};
export type ph_migrationsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_migrationsSelect<ExtArgs> | null;
    omit?: Prisma.ph_migrationsOmit<ExtArgs> | null;
    where: Prisma.ph_migrationsWhereUniqueInput;
};
export type ph_migrationsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_migrationsSelect<ExtArgs> | null;
    omit?: Prisma.ph_migrationsOmit<ExtArgs> | null;
    where?: Prisma.ph_migrationsWhereInput;
    orderBy?: Prisma.ph_migrationsOrderByWithRelationInput | Prisma.ph_migrationsOrderByWithRelationInput[];
    cursor?: Prisma.ph_migrationsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Ph_migrationsScalarFieldEnum | Prisma.Ph_migrationsScalarFieldEnum[];
};
export type ph_migrationsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_migrationsSelect<ExtArgs> | null;
    omit?: Prisma.ph_migrationsOmit<ExtArgs> | null;
    where?: Prisma.ph_migrationsWhereInput;
    orderBy?: Prisma.ph_migrationsOrderByWithRelationInput | Prisma.ph_migrationsOrderByWithRelationInput[];
    cursor?: Prisma.ph_migrationsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Ph_migrationsScalarFieldEnum | Prisma.Ph_migrationsScalarFieldEnum[];
};
export type ph_migrationsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_migrationsSelect<ExtArgs> | null;
    omit?: Prisma.ph_migrationsOmit<ExtArgs> | null;
    where?: Prisma.ph_migrationsWhereInput;
    orderBy?: Prisma.ph_migrationsOrderByWithRelationInput | Prisma.ph_migrationsOrderByWithRelationInput[];
    cursor?: Prisma.ph_migrationsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Ph_migrationsScalarFieldEnum | Prisma.Ph_migrationsScalarFieldEnum[];
};
export type ph_migrationsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_migrationsSelect<ExtArgs> | null;
    omit?: Prisma.ph_migrationsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ph_migrationsCreateInput, Prisma.ph_migrationsUncheckedCreateInput>;
};
export type ph_migrationsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ph_migrationsCreateManyInput | Prisma.ph_migrationsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ph_migrationsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_migrationsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ph_migrationsOmit<ExtArgs> | null;
    data: Prisma.ph_migrationsCreateManyInput | Prisma.ph_migrationsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ph_migrationsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_migrationsSelect<ExtArgs> | null;
    omit?: Prisma.ph_migrationsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ph_migrationsUpdateInput, Prisma.ph_migrationsUncheckedUpdateInput>;
    where: Prisma.ph_migrationsWhereUniqueInput;
};
export type ph_migrationsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ph_migrationsUpdateManyMutationInput, Prisma.ph_migrationsUncheckedUpdateManyInput>;
    where?: Prisma.ph_migrationsWhereInput;
    limit?: number;
};
export type ph_migrationsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_migrationsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ph_migrationsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ph_migrationsUpdateManyMutationInput, Prisma.ph_migrationsUncheckedUpdateManyInput>;
    where?: Prisma.ph_migrationsWhereInput;
    limit?: number;
};
export type ph_migrationsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_migrationsSelect<ExtArgs> | null;
    omit?: Prisma.ph_migrationsOmit<ExtArgs> | null;
    where: Prisma.ph_migrationsWhereUniqueInput;
    create: Prisma.XOR<Prisma.ph_migrationsCreateInput, Prisma.ph_migrationsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ph_migrationsUpdateInput, Prisma.ph_migrationsUncheckedUpdateInput>;
};
export type ph_migrationsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_migrationsSelect<ExtArgs> | null;
    omit?: Prisma.ph_migrationsOmit<ExtArgs> | null;
    where: Prisma.ph_migrationsWhereUniqueInput;
};
export type ph_migrationsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ph_migrationsWhereInput;
    limit?: number;
};
export type ph_migrationsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ph_migrationsSelect<ExtArgs> | null;
    omit?: Prisma.ph_migrationsOmit<ExtArgs> | null;
};
