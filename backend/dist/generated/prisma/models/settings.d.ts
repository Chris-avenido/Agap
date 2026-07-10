import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type settingsModel = runtime.Types.Result.DefaultSelection<Prisma.$settingsPayload>;
export type AggregateSettings = {
    _count: SettingsCountAggregateOutputType | null;
    _min: SettingsMinAggregateOutputType | null;
    _max: SettingsMaxAggregateOutputType | null;
};
export type SettingsMinAggregateOutputType = {
    key: string | null;
    value: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type SettingsMaxAggregateOutputType = {
    key: string | null;
    value: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type SettingsCountAggregateOutputType = {
    key: number;
    value: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type SettingsMinAggregateInputType = {
    key?: true;
    value?: true;
    created_at?: true;
    updated_at?: true;
};
export type SettingsMaxAggregateInputType = {
    key?: true;
    value?: true;
    created_at?: true;
    updated_at?: true;
};
export type SettingsCountAggregateInputType = {
    key?: true;
    value?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type SettingsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.settingsWhereInput;
    orderBy?: Prisma.settingsOrderByWithRelationInput | Prisma.settingsOrderByWithRelationInput[];
    cursor?: Prisma.settingsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SettingsCountAggregateInputType;
    _min?: SettingsMinAggregateInputType;
    _max?: SettingsMaxAggregateInputType;
};
export type GetSettingsAggregateType<T extends SettingsAggregateArgs> = {
    [P in keyof T & keyof AggregateSettings]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSettings[P]> : Prisma.GetScalarType<T[P], AggregateSettings[P]>;
};
export type settingsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.settingsWhereInput;
    orderBy?: Prisma.settingsOrderByWithAggregationInput | Prisma.settingsOrderByWithAggregationInput[];
    by: Prisma.SettingsScalarFieldEnum[] | Prisma.SettingsScalarFieldEnum;
    having?: Prisma.settingsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SettingsCountAggregateInputType | true;
    _min?: SettingsMinAggregateInputType;
    _max?: SettingsMaxAggregateInputType;
};
export type SettingsGroupByOutputType = {
    key: string;
    value: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    _count: SettingsCountAggregateOutputType | null;
    _min: SettingsMinAggregateOutputType | null;
    _max: SettingsMaxAggregateOutputType | null;
};
export type GetSettingsGroupByPayload<T extends settingsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SettingsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SettingsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SettingsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SettingsGroupByOutputType[P]>;
}>>;
export type settingsWhereInput = {
    AND?: Prisma.settingsWhereInput | Prisma.settingsWhereInput[];
    OR?: Prisma.settingsWhereInput[];
    NOT?: Prisma.settingsWhereInput | Prisma.settingsWhereInput[];
    key?: Prisma.StringFilter<"settings"> | string;
    value?: Prisma.StringNullableFilter<"settings"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"settings"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"settings"> | Date | string | null;
};
export type settingsOrderByWithRelationInput = {
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type settingsWhereUniqueInput = Prisma.AtLeast<{
    key?: string;
    AND?: Prisma.settingsWhereInput | Prisma.settingsWhereInput[];
    OR?: Prisma.settingsWhereInput[];
    NOT?: Prisma.settingsWhereInput | Prisma.settingsWhereInput[];
    value?: Prisma.StringNullableFilter<"settings"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"settings"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"settings"> | Date | string | null;
}, "key">;
export type settingsOrderByWithAggregationInput = {
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.settingsCountOrderByAggregateInput;
    _max?: Prisma.settingsMaxOrderByAggregateInput;
    _min?: Prisma.settingsMinOrderByAggregateInput;
};
export type settingsScalarWhereWithAggregatesInput = {
    AND?: Prisma.settingsScalarWhereWithAggregatesInput | Prisma.settingsScalarWhereWithAggregatesInput[];
    OR?: Prisma.settingsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.settingsScalarWhereWithAggregatesInput | Prisma.settingsScalarWhereWithAggregatesInput[];
    key?: Prisma.StringWithAggregatesFilter<"settings"> | string;
    value?: Prisma.StringNullableWithAggregatesFilter<"settings"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"settings"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"settings"> | Date | string | null;
};
export type settingsCreateInput = {
    key: string;
    value?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type settingsUncheckedCreateInput = {
    key: string;
    value?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type settingsUpdateInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type settingsUncheckedUpdateInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type settingsCreateManyInput = {
    key: string;
    value?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type settingsUpdateManyMutationInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type settingsUncheckedUpdateManyInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type settingsCountOrderByAggregateInput = {
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type settingsMaxOrderByAggregateInput = {
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type settingsMinOrderByAggregateInput = {
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type settingsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    key?: boolean;
    value?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["settings"]>;
export type settingsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    key?: boolean;
    value?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["settings"]>;
export type settingsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    key?: boolean;
    value?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["settings"]>;
export type settingsSelectScalar = {
    key?: boolean;
    value?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type settingsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"key" | "value" | "created_at" | "updated_at", ExtArgs["result"]["settings"]>;
export type $settingsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "settings";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        key: string;
        value: string | null;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["settings"]>;
    composites: {};
};
export type settingsGetPayload<S extends boolean | null | undefined | settingsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$settingsPayload, S>;
export type settingsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<settingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SettingsCountAggregateInputType | true;
};
export interface settingsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['settings'];
        meta: {
            name: 'settings';
        };
    };
    findUnique<T extends settingsFindUniqueArgs>(args: Prisma.SelectSubset<T, settingsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__settingsClient<runtime.Types.Result.GetResult<Prisma.$settingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends settingsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, settingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__settingsClient<runtime.Types.Result.GetResult<Prisma.$settingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends settingsFindFirstArgs>(args?: Prisma.SelectSubset<T, settingsFindFirstArgs<ExtArgs>>): Prisma.Prisma__settingsClient<runtime.Types.Result.GetResult<Prisma.$settingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends settingsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, settingsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__settingsClient<runtime.Types.Result.GetResult<Prisma.$settingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends settingsFindManyArgs>(args?: Prisma.SelectSubset<T, settingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$settingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends settingsCreateArgs>(args: Prisma.SelectSubset<T, settingsCreateArgs<ExtArgs>>): Prisma.Prisma__settingsClient<runtime.Types.Result.GetResult<Prisma.$settingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends settingsCreateManyArgs>(args?: Prisma.SelectSubset<T, settingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends settingsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, settingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$settingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends settingsDeleteArgs>(args: Prisma.SelectSubset<T, settingsDeleteArgs<ExtArgs>>): Prisma.Prisma__settingsClient<runtime.Types.Result.GetResult<Prisma.$settingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends settingsUpdateArgs>(args: Prisma.SelectSubset<T, settingsUpdateArgs<ExtArgs>>): Prisma.Prisma__settingsClient<runtime.Types.Result.GetResult<Prisma.$settingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends settingsDeleteManyArgs>(args?: Prisma.SelectSubset<T, settingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends settingsUpdateManyArgs>(args: Prisma.SelectSubset<T, settingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends settingsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, settingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$settingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends settingsUpsertArgs>(args: Prisma.SelectSubset<T, settingsUpsertArgs<ExtArgs>>): Prisma.Prisma__settingsClient<runtime.Types.Result.GetResult<Prisma.$settingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends settingsCountArgs>(args?: Prisma.Subset<T, settingsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SettingsCountAggregateOutputType> : number>;
    aggregate<T extends SettingsAggregateArgs>(args: Prisma.Subset<T, SettingsAggregateArgs>): Prisma.PrismaPromise<GetSettingsAggregateType<T>>;
    groupBy<T extends settingsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: settingsGroupByArgs['orderBy'];
    } : {
        orderBy?: settingsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, settingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: settingsFieldRefs;
}
export interface Prisma__settingsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface settingsFieldRefs {
    readonly key: Prisma.FieldRef<"settings", 'String'>;
    readonly value: Prisma.FieldRef<"settings", 'String'>;
    readonly created_at: Prisma.FieldRef<"settings", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"settings", 'DateTime'>;
}
export type settingsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.settingsSelect<ExtArgs> | null;
    omit?: Prisma.settingsOmit<ExtArgs> | null;
    where: Prisma.settingsWhereUniqueInput;
};
export type settingsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.settingsSelect<ExtArgs> | null;
    omit?: Prisma.settingsOmit<ExtArgs> | null;
    where: Prisma.settingsWhereUniqueInput;
};
export type settingsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.settingsSelect<ExtArgs> | null;
    omit?: Prisma.settingsOmit<ExtArgs> | null;
    where?: Prisma.settingsWhereInput;
    orderBy?: Prisma.settingsOrderByWithRelationInput | Prisma.settingsOrderByWithRelationInput[];
    cursor?: Prisma.settingsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SettingsScalarFieldEnum | Prisma.SettingsScalarFieldEnum[];
};
export type settingsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.settingsSelect<ExtArgs> | null;
    omit?: Prisma.settingsOmit<ExtArgs> | null;
    where?: Prisma.settingsWhereInput;
    orderBy?: Prisma.settingsOrderByWithRelationInput | Prisma.settingsOrderByWithRelationInput[];
    cursor?: Prisma.settingsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SettingsScalarFieldEnum | Prisma.SettingsScalarFieldEnum[];
};
export type settingsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.settingsSelect<ExtArgs> | null;
    omit?: Prisma.settingsOmit<ExtArgs> | null;
    where?: Prisma.settingsWhereInput;
    orderBy?: Prisma.settingsOrderByWithRelationInput | Prisma.settingsOrderByWithRelationInput[];
    cursor?: Prisma.settingsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SettingsScalarFieldEnum | Prisma.SettingsScalarFieldEnum[];
};
export type settingsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.settingsSelect<ExtArgs> | null;
    omit?: Prisma.settingsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.settingsCreateInput, Prisma.settingsUncheckedCreateInput>;
};
export type settingsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.settingsCreateManyInput | Prisma.settingsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type settingsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.settingsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.settingsOmit<ExtArgs> | null;
    data: Prisma.settingsCreateManyInput | Prisma.settingsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type settingsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.settingsSelect<ExtArgs> | null;
    omit?: Prisma.settingsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.settingsUpdateInput, Prisma.settingsUncheckedUpdateInput>;
    where: Prisma.settingsWhereUniqueInput;
};
export type settingsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.settingsUpdateManyMutationInput, Prisma.settingsUncheckedUpdateManyInput>;
    where?: Prisma.settingsWhereInput;
    limit?: number;
};
export type settingsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.settingsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.settingsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.settingsUpdateManyMutationInput, Prisma.settingsUncheckedUpdateManyInput>;
    where?: Prisma.settingsWhereInput;
    limit?: number;
};
export type settingsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.settingsSelect<ExtArgs> | null;
    omit?: Prisma.settingsOmit<ExtArgs> | null;
    where: Prisma.settingsWhereUniqueInput;
    create: Prisma.XOR<Prisma.settingsCreateInput, Prisma.settingsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.settingsUpdateInput, Prisma.settingsUncheckedUpdateInput>;
};
export type settingsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.settingsSelect<ExtArgs> | null;
    omit?: Prisma.settingsOmit<ExtArgs> | null;
    where: Prisma.settingsWhereUniqueInput;
};
export type settingsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.settingsWhereInput;
    limit?: number;
};
export type settingsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.settingsSelect<ExtArgs> | null;
    omit?: Prisma.settingsOmit<ExtArgs> | null;
};
