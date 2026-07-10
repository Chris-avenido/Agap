import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type teaching_personnelModel = runtime.Types.Result.DefaultSelection<Prisma.$teaching_personnelPayload>;
export type AggregateTeaching_personnel = {
    _count: Teaching_personnelCountAggregateOutputType | null;
    _min: Teaching_personnelMinAggregateOutputType | null;
    _max: Teaching_personnelMaxAggregateOutputType | null;
};
export type Teaching_personnelMinAggregateOutputType = {
    school_id: string | null;
    updated_at: Date | null;
};
export type Teaching_personnelMaxAggregateOutputType = {
    school_id: string | null;
    updated_at: Date | null;
};
export type Teaching_personnelCountAggregateOutputType = {
    school_id: number;
    updated_at: number;
    _all: number;
};
export type Teaching_personnelMinAggregateInputType = {
    school_id?: true;
    updated_at?: true;
};
export type Teaching_personnelMaxAggregateInputType = {
    school_id?: true;
    updated_at?: true;
};
export type Teaching_personnelCountAggregateInputType = {
    school_id?: true;
    updated_at?: true;
    _all?: true;
};
export type Teaching_personnelAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.teaching_personnelWhereInput;
    orderBy?: Prisma.teaching_personnelOrderByWithRelationInput | Prisma.teaching_personnelOrderByWithRelationInput[];
    cursor?: Prisma.teaching_personnelWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Teaching_personnelCountAggregateInputType;
    _min?: Teaching_personnelMinAggregateInputType;
    _max?: Teaching_personnelMaxAggregateInputType;
};
export type GetTeaching_personnelAggregateType<T extends Teaching_personnelAggregateArgs> = {
    [P in keyof T & keyof AggregateTeaching_personnel]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTeaching_personnel[P]> : Prisma.GetScalarType<T[P], AggregateTeaching_personnel[P]>;
};
export type teaching_personnelGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.teaching_personnelWhereInput;
    orderBy?: Prisma.teaching_personnelOrderByWithAggregationInput | Prisma.teaching_personnelOrderByWithAggregationInput[];
    by: Prisma.Teaching_personnelScalarFieldEnum[] | Prisma.Teaching_personnelScalarFieldEnum;
    having?: Prisma.teaching_personnelScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Teaching_personnelCountAggregateInputType | true;
    _min?: Teaching_personnelMinAggregateInputType;
    _max?: Teaching_personnelMaxAggregateInputType;
};
export type Teaching_personnelGroupByOutputType = {
    school_id: string;
    updated_at: Date | null;
    _count: Teaching_personnelCountAggregateOutputType | null;
    _min: Teaching_personnelMinAggregateOutputType | null;
    _max: Teaching_personnelMaxAggregateOutputType | null;
};
export type GetTeaching_personnelGroupByPayload<T extends teaching_personnelGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Teaching_personnelGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Teaching_personnelGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Teaching_personnelGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Teaching_personnelGroupByOutputType[P]>;
}>>;
export type teaching_personnelWhereInput = {
    AND?: Prisma.teaching_personnelWhereInput | Prisma.teaching_personnelWhereInput[];
    OR?: Prisma.teaching_personnelWhereInput[];
    NOT?: Prisma.teaching_personnelWhereInput | Prisma.teaching_personnelWhereInput[];
    school_id?: Prisma.StringFilter<"teaching_personnel"> | string;
    updated_at?: Prisma.DateTimeNullableFilter<"teaching_personnel"> | Date | string | null;
};
export type teaching_personnelOrderByWithRelationInput = {
    school_id?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type teaching_personnelWhereUniqueInput = Prisma.AtLeast<{
    school_id?: string;
    AND?: Prisma.teaching_personnelWhereInput | Prisma.teaching_personnelWhereInput[];
    OR?: Prisma.teaching_personnelWhereInput[];
    NOT?: Prisma.teaching_personnelWhereInput | Prisma.teaching_personnelWhereInput[];
    updated_at?: Prisma.DateTimeNullableFilter<"teaching_personnel"> | Date | string | null;
}, "school_id">;
export type teaching_personnelOrderByWithAggregationInput = {
    school_id?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.teaching_personnelCountOrderByAggregateInput;
    _max?: Prisma.teaching_personnelMaxOrderByAggregateInput;
    _min?: Prisma.teaching_personnelMinOrderByAggregateInput;
};
export type teaching_personnelScalarWhereWithAggregatesInput = {
    AND?: Prisma.teaching_personnelScalarWhereWithAggregatesInput | Prisma.teaching_personnelScalarWhereWithAggregatesInput[];
    OR?: Prisma.teaching_personnelScalarWhereWithAggregatesInput[];
    NOT?: Prisma.teaching_personnelScalarWhereWithAggregatesInput | Prisma.teaching_personnelScalarWhereWithAggregatesInput[];
    school_id?: Prisma.StringWithAggregatesFilter<"teaching_personnel"> | string;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"teaching_personnel"> | Date | string | null;
};
export type teaching_personnelCreateInput = {
    school_id: string;
    updated_at?: Date | string | null;
};
export type teaching_personnelUncheckedCreateInput = {
    school_id: string;
    updated_at?: Date | string | null;
};
export type teaching_personnelUpdateInput = {
    school_id?: Prisma.StringFieldUpdateOperationsInput | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type teaching_personnelUncheckedUpdateInput = {
    school_id?: Prisma.StringFieldUpdateOperationsInput | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type teaching_personnelCreateManyInput = {
    school_id: string;
    updated_at?: Date | string | null;
};
export type teaching_personnelUpdateManyMutationInput = {
    school_id?: Prisma.StringFieldUpdateOperationsInput | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type teaching_personnelUncheckedUpdateManyInput = {
    school_id?: Prisma.StringFieldUpdateOperationsInput | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type teaching_personnelCountOrderByAggregateInput = {
    school_id?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type teaching_personnelMaxOrderByAggregateInput = {
    school_id?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type teaching_personnelMinOrderByAggregateInput = {
    school_id?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type teaching_personnelSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    school_id?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["teaching_personnel"]>;
export type teaching_personnelSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    school_id?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["teaching_personnel"]>;
export type teaching_personnelSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    school_id?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["teaching_personnel"]>;
export type teaching_personnelSelectScalar = {
    school_id?: boolean;
    updated_at?: boolean;
};
export type teaching_personnelOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"school_id" | "updated_at", ExtArgs["result"]["teaching_personnel"]>;
export type $teaching_personnelPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "teaching_personnel";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        school_id: string;
        updated_at: Date | null;
    }, ExtArgs["result"]["teaching_personnel"]>;
    composites: {};
};
export type teaching_personnelGetPayload<S extends boolean | null | undefined | teaching_personnelDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$teaching_personnelPayload, S>;
export type teaching_personnelCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<teaching_personnelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Teaching_personnelCountAggregateInputType | true;
};
export interface teaching_personnelDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['teaching_personnel'];
        meta: {
            name: 'teaching_personnel';
        };
    };
    findUnique<T extends teaching_personnelFindUniqueArgs>(args: Prisma.SelectSubset<T, teaching_personnelFindUniqueArgs<ExtArgs>>): Prisma.Prisma__teaching_personnelClient<runtime.Types.Result.GetResult<Prisma.$teaching_personnelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends teaching_personnelFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, teaching_personnelFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__teaching_personnelClient<runtime.Types.Result.GetResult<Prisma.$teaching_personnelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends teaching_personnelFindFirstArgs>(args?: Prisma.SelectSubset<T, teaching_personnelFindFirstArgs<ExtArgs>>): Prisma.Prisma__teaching_personnelClient<runtime.Types.Result.GetResult<Prisma.$teaching_personnelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends teaching_personnelFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, teaching_personnelFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__teaching_personnelClient<runtime.Types.Result.GetResult<Prisma.$teaching_personnelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends teaching_personnelFindManyArgs>(args?: Prisma.SelectSubset<T, teaching_personnelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$teaching_personnelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends teaching_personnelCreateArgs>(args: Prisma.SelectSubset<T, teaching_personnelCreateArgs<ExtArgs>>): Prisma.Prisma__teaching_personnelClient<runtime.Types.Result.GetResult<Prisma.$teaching_personnelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends teaching_personnelCreateManyArgs>(args?: Prisma.SelectSubset<T, teaching_personnelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends teaching_personnelCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, teaching_personnelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$teaching_personnelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends teaching_personnelDeleteArgs>(args: Prisma.SelectSubset<T, teaching_personnelDeleteArgs<ExtArgs>>): Prisma.Prisma__teaching_personnelClient<runtime.Types.Result.GetResult<Prisma.$teaching_personnelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends teaching_personnelUpdateArgs>(args: Prisma.SelectSubset<T, teaching_personnelUpdateArgs<ExtArgs>>): Prisma.Prisma__teaching_personnelClient<runtime.Types.Result.GetResult<Prisma.$teaching_personnelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends teaching_personnelDeleteManyArgs>(args?: Prisma.SelectSubset<T, teaching_personnelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends teaching_personnelUpdateManyArgs>(args: Prisma.SelectSubset<T, teaching_personnelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends teaching_personnelUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, teaching_personnelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$teaching_personnelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends teaching_personnelUpsertArgs>(args: Prisma.SelectSubset<T, teaching_personnelUpsertArgs<ExtArgs>>): Prisma.Prisma__teaching_personnelClient<runtime.Types.Result.GetResult<Prisma.$teaching_personnelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends teaching_personnelCountArgs>(args?: Prisma.Subset<T, teaching_personnelCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Teaching_personnelCountAggregateOutputType> : number>;
    aggregate<T extends Teaching_personnelAggregateArgs>(args: Prisma.Subset<T, Teaching_personnelAggregateArgs>): Prisma.PrismaPromise<GetTeaching_personnelAggregateType<T>>;
    groupBy<T extends teaching_personnelGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: teaching_personnelGroupByArgs['orderBy'];
    } : {
        orderBy?: teaching_personnelGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, teaching_personnelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeaching_personnelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: teaching_personnelFieldRefs;
}
export interface Prisma__teaching_personnelClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface teaching_personnelFieldRefs {
    readonly school_id: Prisma.FieldRef<"teaching_personnel", 'String'>;
    readonly updated_at: Prisma.FieldRef<"teaching_personnel", 'DateTime'>;
}
export type teaching_personnelFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teaching_personnelSelect<ExtArgs> | null;
    omit?: Prisma.teaching_personnelOmit<ExtArgs> | null;
    where: Prisma.teaching_personnelWhereUniqueInput;
};
export type teaching_personnelFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teaching_personnelSelect<ExtArgs> | null;
    omit?: Prisma.teaching_personnelOmit<ExtArgs> | null;
    where: Prisma.teaching_personnelWhereUniqueInput;
};
export type teaching_personnelFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teaching_personnelSelect<ExtArgs> | null;
    omit?: Prisma.teaching_personnelOmit<ExtArgs> | null;
    where?: Prisma.teaching_personnelWhereInput;
    orderBy?: Prisma.teaching_personnelOrderByWithRelationInput | Prisma.teaching_personnelOrderByWithRelationInput[];
    cursor?: Prisma.teaching_personnelWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Teaching_personnelScalarFieldEnum | Prisma.Teaching_personnelScalarFieldEnum[];
};
export type teaching_personnelFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teaching_personnelSelect<ExtArgs> | null;
    omit?: Prisma.teaching_personnelOmit<ExtArgs> | null;
    where?: Prisma.teaching_personnelWhereInput;
    orderBy?: Prisma.teaching_personnelOrderByWithRelationInput | Prisma.teaching_personnelOrderByWithRelationInput[];
    cursor?: Prisma.teaching_personnelWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Teaching_personnelScalarFieldEnum | Prisma.Teaching_personnelScalarFieldEnum[];
};
export type teaching_personnelFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teaching_personnelSelect<ExtArgs> | null;
    omit?: Prisma.teaching_personnelOmit<ExtArgs> | null;
    where?: Prisma.teaching_personnelWhereInput;
    orderBy?: Prisma.teaching_personnelOrderByWithRelationInput | Prisma.teaching_personnelOrderByWithRelationInput[];
    cursor?: Prisma.teaching_personnelWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Teaching_personnelScalarFieldEnum | Prisma.Teaching_personnelScalarFieldEnum[];
};
export type teaching_personnelCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teaching_personnelSelect<ExtArgs> | null;
    omit?: Prisma.teaching_personnelOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.teaching_personnelCreateInput, Prisma.teaching_personnelUncheckedCreateInput>;
};
export type teaching_personnelCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.teaching_personnelCreateManyInput | Prisma.teaching_personnelCreateManyInput[];
    skipDuplicates?: boolean;
};
export type teaching_personnelCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teaching_personnelSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.teaching_personnelOmit<ExtArgs> | null;
    data: Prisma.teaching_personnelCreateManyInput | Prisma.teaching_personnelCreateManyInput[];
    skipDuplicates?: boolean;
};
export type teaching_personnelUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teaching_personnelSelect<ExtArgs> | null;
    omit?: Prisma.teaching_personnelOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.teaching_personnelUpdateInput, Prisma.teaching_personnelUncheckedUpdateInput>;
    where: Prisma.teaching_personnelWhereUniqueInput;
};
export type teaching_personnelUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.teaching_personnelUpdateManyMutationInput, Prisma.teaching_personnelUncheckedUpdateManyInput>;
    where?: Prisma.teaching_personnelWhereInput;
    limit?: number;
};
export type teaching_personnelUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teaching_personnelSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.teaching_personnelOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.teaching_personnelUpdateManyMutationInput, Prisma.teaching_personnelUncheckedUpdateManyInput>;
    where?: Prisma.teaching_personnelWhereInput;
    limit?: number;
};
export type teaching_personnelUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teaching_personnelSelect<ExtArgs> | null;
    omit?: Prisma.teaching_personnelOmit<ExtArgs> | null;
    where: Prisma.teaching_personnelWhereUniqueInput;
    create: Prisma.XOR<Prisma.teaching_personnelCreateInput, Prisma.teaching_personnelUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.teaching_personnelUpdateInput, Prisma.teaching_personnelUncheckedUpdateInput>;
};
export type teaching_personnelDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teaching_personnelSelect<ExtArgs> | null;
    omit?: Prisma.teaching_personnelOmit<ExtArgs> | null;
    where: Prisma.teaching_personnelWhereUniqueInput;
};
export type teaching_personnelDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.teaching_personnelWhereInput;
    limit?: number;
};
export type teaching_personnelDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.teaching_personnelSelect<ExtArgs> | null;
    omit?: Prisma.teaching_personnelOmit<ExtArgs> | null;
};
