import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type system_feedbackModel = runtime.Types.Result.DefaultSelection<Prisma.$system_feedbackPayload>;
export type AggregateSystem_feedback = {
    _count: System_feedbackCountAggregateOutputType | null;
    _avg: System_feedbackAvgAggregateOutputType | null;
    _sum: System_feedbackSumAggregateOutputType | null;
    _min: System_feedbackMinAggregateOutputType | null;
    _max: System_feedbackMaxAggregateOutputType | null;
};
export type System_feedbackAvgAggregateOutputType = {
    id: number | null;
};
export type System_feedbackSumAggregateOutputType = {
    id: number | null;
};
export type System_feedbackMinAggregateOutputType = {
    id: number | null;
    content: string | null;
    user_email: string | null;
    user_uid: string | null;
    created_at: Date | null;
};
export type System_feedbackMaxAggregateOutputType = {
    id: number | null;
    content: string | null;
    user_email: string | null;
    user_uid: string | null;
    created_at: Date | null;
};
export type System_feedbackCountAggregateOutputType = {
    id: number;
    content: number;
    user_email: number;
    user_uid: number;
    created_at: number;
    _all: number;
};
export type System_feedbackAvgAggregateInputType = {
    id?: true;
};
export type System_feedbackSumAggregateInputType = {
    id?: true;
};
export type System_feedbackMinAggregateInputType = {
    id?: true;
    content?: true;
    user_email?: true;
    user_uid?: true;
    created_at?: true;
};
export type System_feedbackMaxAggregateInputType = {
    id?: true;
    content?: true;
    user_email?: true;
    user_uid?: true;
    created_at?: true;
};
export type System_feedbackCountAggregateInputType = {
    id?: true;
    content?: true;
    user_email?: true;
    user_uid?: true;
    created_at?: true;
    _all?: true;
};
export type System_feedbackAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.system_feedbackWhereInput;
    orderBy?: Prisma.system_feedbackOrderByWithRelationInput | Prisma.system_feedbackOrderByWithRelationInput[];
    cursor?: Prisma.system_feedbackWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | System_feedbackCountAggregateInputType;
    _avg?: System_feedbackAvgAggregateInputType;
    _sum?: System_feedbackSumAggregateInputType;
    _min?: System_feedbackMinAggregateInputType;
    _max?: System_feedbackMaxAggregateInputType;
};
export type GetSystem_feedbackAggregateType<T extends System_feedbackAggregateArgs> = {
    [P in keyof T & keyof AggregateSystem_feedback]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSystem_feedback[P]> : Prisma.GetScalarType<T[P], AggregateSystem_feedback[P]>;
};
export type system_feedbackGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.system_feedbackWhereInput;
    orderBy?: Prisma.system_feedbackOrderByWithAggregationInput | Prisma.system_feedbackOrderByWithAggregationInput[];
    by: Prisma.System_feedbackScalarFieldEnum[] | Prisma.System_feedbackScalarFieldEnum;
    having?: Prisma.system_feedbackScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: System_feedbackCountAggregateInputType | true;
    _avg?: System_feedbackAvgAggregateInputType;
    _sum?: System_feedbackSumAggregateInputType;
    _min?: System_feedbackMinAggregateInputType;
    _max?: System_feedbackMaxAggregateInputType;
};
export type System_feedbackGroupByOutputType = {
    id: number;
    content: string;
    user_email: string | null;
    user_uid: string | null;
    created_at: Date | null;
    _count: System_feedbackCountAggregateOutputType | null;
    _avg: System_feedbackAvgAggregateOutputType | null;
    _sum: System_feedbackSumAggregateOutputType | null;
    _min: System_feedbackMinAggregateOutputType | null;
    _max: System_feedbackMaxAggregateOutputType | null;
};
export type GetSystem_feedbackGroupByPayload<T extends system_feedbackGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<System_feedbackGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof System_feedbackGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], System_feedbackGroupByOutputType[P]> : Prisma.GetScalarType<T[P], System_feedbackGroupByOutputType[P]>;
}>>;
export type system_feedbackWhereInput = {
    AND?: Prisma.system_feedbackWhereInput | Prisma.system_feedbackWhereInput[];
    OR?: Prisma.system_feedbackWhereInput[];
    NOT?: Prisma.system_feedbackWhereInput | Prisma.system_feedbackWhereInput[];
    id?: Prisma.IntFilter<"system_feedback"> | number;
    content?: Prisma.StringFilter<"system_feedback"> | string;
    user_email?: Prisma.StringNullableFilter<"system_feedback"> | string | null;
    user_uid?: Prisma.StringNullableFilter<"system_feedback"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"system_feedback"> | Date | string | null;
};
export type system_feedbackOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    user_email?: Prisma.SortOrderInput | Prisma.SortOrder;
    user_uid?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type system_feedbackWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.system_feedbackWhereInput | Prisma.system_feedbackWhereInput[];
    OR?: Prisma.system_feedbackWhereInput[];
    NOT?: Prisma.system_feedbackWhereInput | Prisma.system_feedbackWhereInput[];
    content?: Prisma.StringFilter<"system_feedback"> | string;
    user_email?: Prisma.StringNullableFilter<"system_feedback"> | string | null;
    user_uid?: Prisma.StringNullableFilter<"system_feedback"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"system_feedback"> | Date | string | null;
}, "id">;
export type system_feedbackOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    user_email?: Prisma.SortOrderInput | Prisma.SortOrder;
    user_uid?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.system_feedbackCountOrderByAggregateInput;
    _avg?: Prisma.system_feedbackAvgOrderByAggregateInput;
    _max?: Prisma.system_feedbackMaxOrderByAggregateInput;
    _min?: Prisma.system_feedbackMinOrderByAggregateInput;
    _sum?: Prisma.system_feedbackSumOrderByAggregateInput;
};
export type system_feedbackScalarWhereWithAggregatesInput = {
    AND?: Prisma.system_feedbackScalarWhereWithAggregatesInput | Prisma.system_feedbackScalarWhereWithAggregatesInput[];
    OR?: Prisma.system_feedbackScalarWhereWithAggregatesInput[];
    NOT?: Prisma.system_feedbackScalarWhereWithAggregatesInput | Prisma.system_feedbackScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"system_feedback"> | number;
    content?: Prisma.StringWithAggregatesFilter<"system_feedback"> | string;
    user_email?: Prisma.StringNullableWithAggregatesFilter<"system_feedback"> | string | null;
    user_uid?: Prisma.StringNullableWithAggregatesFilter<"system_feedback"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"system_feedback"> | Date | string | null;
};
export type system_feedbackCreateInput = {
    content: string;
    user_email?: string | null;
    user_uid?: string | null;
    created_at?: Date | string | null;
};
export type system_feedbackUncheckedCreateInput = {
    id?: number;
    content: string;
    user_email?: string | null;
    user_uid?: string | null;
    created_at?: Date | string | null;
};
export type system_feedbackUpdateInput = {
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    user_email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_uid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type system_feedbackUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    user_email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_uid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type system_feedbackCreateManyInput = {
    id?: number;
    content: string;
    user_email?: string | null;
    user_uid?: string | null;
    created_at?: Date | string | null;
};
export type system_feedbackUpdateManyMutationInput = {
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    user_email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_uid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type system_feedbackUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    user_email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_uid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type system_feedbackCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    user_email?: Prisma.SortOrder;
    user_uid?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type system_feedbackAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type system_feedbackMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    user_email?: Prisma.SortOrder;
    user_uid?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type system_feedbackMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    user_email?: Prisma.SortOrder;
    user_uid?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type system_feedbackSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type system_feedbackSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    content?: boolean;
    user_email?: boolean;
    user_uid?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["system_feedback"]>;
export type system_feedbackSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    content?: boolean;
    user_email?: boolean;
    user_uid?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["system_feedback"]>;
export type system_feedbackSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    content?: boolean;
    user_email?: boolean;
    user_uid?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["system_feedback"]>;
export type system_feedbackSelectScalar = {
    id?: boolean;
    content?: boolean;
    user_email?: boolean;
    user_uid?: boolean;
    created_at?: boolean;
};
export type system_feedbackOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "content" | "user_email" | "user_uid" | "created_at", ExtArgs["result"]["system_feedback"]>;
export type $system_feedbackPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "system_feedback";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        content: string;
        user_email: string | null;
        user_uid: string | null;
        created_at: Date | null;
    }, ExtArgs["result"]["system_feedback"]>;
    composites: {};
};
export type system_feedbackGetPayload<S extends boolean | null | undefined | system_feedbackDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$system_feedbackPayload, S>;
export type system_feedbackCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<system_feedbackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: System_feedbackCountAggregateInputType | true;
};
export interface system_feedbackDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['system_feedback'];
        meta: {
            name: 'system_feedback';
        };
    };
    findUnique<T extends system_feedbackFindUniqueArgs>(args: Prisma.SelectSubset<T, system_feedbackFindUniqueArgs<ExtArgs>>): Prisma.Prisma__system_feedbackClient<runtime.Types.Result.GetResult<Prisma.$system_feedbackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends system_feedbackFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, system_feedbackFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__system_feedbackClient<runtime.Types.Result.GetResult<Prisma.$system_feedbackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends system_feedbackFindFirstArgs>(args?: Prisma.SelectSubset<T, system_feedbackFindFirstArgs<ExtArgs>>): Prisma.Prisma__system_feedbackClient<runtime.Types.Result.GetResult<Prisma.$system_feedbackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends system_feedbackFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, system_feedbackFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__system_feedbackClient<runtime.Types.Result.GetResult<Prisma.$system_feedbackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends system_feedbackFindManyArgs>(args?: Prisma.SelectSubset<T, system_feedbackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$system_feedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends system_feedbackCreateArgs>(args: Prisma.SelectSubset<T, system_feedbackCreateArgs<ExtArgs>>): Prisma.Prisma__system_feedbackClient<runtime.Types.Result.GetResult<Prisma.$system_feedbackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends system_feedbackCreateManyArgs>(args?: Prisma.SelectSubset<T, system_feedbackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends system_feedbackCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, system_feedbackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$system_feedbackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends system_feedbackDeleteArgs>(args: Prisma.SelectSubset<T, system_feedbackDeleteArgs<ExtArgs>>): Prisma.Prisma__system_feedbackClient<runtime.Types.Result.GetResult<Prisma.$system_feedbackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends system_feedbackUpdateArgs>(args: Prisma.SelectSubset<T, system_feedbackUpdateArgs<ExtArgs>>): Prisma.Prisma__system_feedbackClient<runtime.Types.Result.GetResult<Prisma.$system_feedbackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends system_feedbackDeleteManyArgs>(args?: Prisma.SelectSubset<T, system_feedbackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends system_feedbackUpdateManyArgs>(args: Prisma.SelectSubset<T, system_feedbackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends system_feedbackUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, system_feedbackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$system_feedbackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends system_feedbackUpsertArgs>(args: Prisma.SelectSubset<T, system_feedbackUpsertArgs<ExtArgs>>): Prisma.Prisma__system_feedbackClient<runtime.Types.Result.GetResult<Prisma.$system_feedbackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends system_feedbackCountArgs>(args?: Prisma.Subset<T, system_feedbackCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], System_feedbackCountAggregateOutputType> : number>;
    aggregate<T extends System_feedbackAggregateArgs>(args: Prisma.Subset<T, System_feedbackAggregateArgs>): Prisma.PrismaPromise<GetSystem_feedbackAggregateType<T>>;
    groupBy<T extends system_feedbackGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: system_feedbackGroupByArgs['orderBy'];
    } : {
        orderBy?: system_feedbackGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, system_feedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystem_feedbackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: system_feedbackFieldRefs;
}
export interface Prisma__system_feedbackClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface system_feedbackFieldRefs {
    readonly id: Prisma.FieldRef<"system_feedback", 'Int'>;
    readonly content: Prisma.FieldRef<"system_feedback", 'String'>;
    readonly user_email: Prisma.FieldRef<"system_feedback", 'String'>;
    readonly user_uid: Prisma.FieldRef<"system_feedback", 'String'>;
    readonly created_at: Prisma.FieldRef<"system_feedback", 'DateTime'>;
}
export type system_feedbackFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.system_feedbackSelect<ExtArgs> | null;
    omit?: Prisma.system_feedbackOmit<ExtArgs> | null;
    where: Prisma.system_feedbackWhereUniqueInput;
};
export type system_feedbackFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.system_feedbackSelect<ExtArgs> | null;
    omit?: Prisma.system_feedbackOmit<ExtArgs> | null;
    where: Prisma.system_feedbackWhereUniqueInput;
};
export type system_feedbackFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.system_feedbackSelect<ExtArgs> | null;
    omit?: Prisma.system_feedbackOmit<ExtArgs> | null;
    where?: Prisma.system_feedbackWhereInput;
    orderBy?: Prisma.system_feedbackOrderByWithRelationInput | Prisma.system_feedbackOrderByWithRelationInput[];
    cursor?: Prisma.system_feedbackWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.System_feedbackScalarFieldEnum | Prisma.System_feedbackScalarFieldEnum[];
};
export type system_feedbackFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.system_feedbackSelect<ExtArgs> | null;
    omit?: Prisma.system_feedbackOmit<ExtArgs> | null;
    where?: Prisma.system_feedbackWhereInput;
    orderBy?: Prisma.system_feedbackOrderByWithRelationInput | Prisma.system_feedbackOrderByWithRelationInput[];
    cursor?: Prisma.system_feedbackWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.System_feedbackScalarFieldEnum | Prisma.System_feedbackScalarFieldEnum[];
};
export type system_feedbackFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.system_feedbackSelect<ExtArgs> | null;
    omit?: Prisma.system_feedbackOmit<ExtArgs> | null;
    where?: Prisma.system_feedbackWhereInput;
    orderBy?: Prisma.system_feedbackOrderByWithRelationInput | Prisma.system_feedbackOrderByWithRelationInput[];
    cursor?: Prisma.system_feedbackWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.System_feedbackScalarFieldEnum | Prisma.System_feedbackScalarFieldEnum[];
};
export type system_feedbackCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.system_feedbackSelect<ExtArgs> | null;
    omit?: Prisma.system_feedbackOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.system_feedbackCreateInput, Prisma.system_feedbackUncheckedCreateInput>;
};
export type system_feedbackCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.system_feedbackCreateManyInput | Prisma.system_feedbackCreateManyInput[];
    skipDuplicates?: boolean;
};
export type system_feedbackCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.system_feedbackSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.system_feedbackOmit<ExtArgs> | null;
    data: Prisma.system_feedbackCreateManyInput | Prisma.system_feedbackCreateManyInput[];
    skipDuplicates?: boolean;
};
export type system_feedbackUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.system_feedbackSelect<ExtArgs> | null;
    omit?: Prisma.system_feedbackOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.system_feedbackUpdateInput, Prisma.system_feedbackUncheckedUpdateInput>;
    where: Prisma.system_feedbackWhereUniqueInput;
};
export type system_feedbackUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.system_feedbackUpdateManyMutationInput, Prisma.system_feedbackUncheckedUpdateManyInput>;
    where?: Prisma.system_feedbackWhereInput;
    limit?: number;
};
export type system_feedbackUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.system_feedbackSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.system_feedbackOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.system_feedbackUpdateManyMutationInput, Prisma.system_feedbackUncheckedUpdateManyInput>;
    where?: Prisma.system_feedbackWhereInput;
    limit?: number;
};
export type system_feedbackUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.system_feedbackSelect<ExtArgs> | null;
    omit?: Prisma.system_feedbackOmit<ExtArgs> | null;
    where: Prisma.system_feedbackWhereUniqueInput;
    create: Prisma.XOR<Prisma.system_feedbackCreateInput, Prisma.system_feedbackUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.system_feedbackUpdateInput, Prisma.system_feedbackUncheckedUpdateInput>;
};
export type system_feedbackDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.system_feedbackSelect<ExtArgs> | null;
    omit?: Prisma.system_feedbackOmit<ExtArgs> | null;
    where: Prisma.system_feedbackWhereUniqueInput;
};
export type system_feedbackDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.system_feedbackWhereInput;
    limit?: number;
};
export type system_feedbackDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.system_feedbackSelect<ExtArgs> | null;
    omit?: Prisma.system_feedbackOmit<ExtArgs> | null;
};
