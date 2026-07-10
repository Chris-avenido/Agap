import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type app_feedbackModel = runtime.Types.Result.DefaultSelection<Prisma.$app_feedbackPayload>;
export type AggregateApp_feedback = {
    _count: App_feedbackCountAggregateOutputType | null;
    _avg: App_feedbackAvgAggregateOutputType | null;
    _sum: App_feedbackSumAggregateOutputType | null;
    _min: App_feedbackMinAggregateOutputType | null;
    _max: App_feedbackMaxAggregateOutputType | null;
};
export type App_feedbackAvgAggregateOutputType = {
    id: number | null;
    ease_of_use: number | null;
    aesthetics: number | null;
    functionality: number | null;
};
export type App_feedbackSumAggregateOutputType = {
    id: number | null;
    ease_of_use: number | null;
    aesthetics: number | null;
    functionality: number | null;
};
export type App_feedbackMinAggregateOutputType = {
    id: number | null;
    user_id: string | null;
    user_name: string | null;
    role: string | null;
    ease_of_use: number | null;
    aesthetics: number | null;
    functionality: number | null;
    comment: string | null;
    app_version: string | null;
    created_at: Date | null;
};
export type App_feedbackMaxAggregateOutputType = {
    id: number | null;
    user_id: string | null;
    user_name: string | null;
    role: string | null;
    ease_of_use: number | null;
    aesthetics: number | null;
    functionality: number | null;
    comment: string | null;
    app_version: string | null;
    created_at: Date | null;
};
export type App_feedbackCountAggregateOutputType = {
    id: number;
    user_id: number;
    user_name: number;
    role: number;
    ease_of_use: number;
    aesthetics: number;
    functionality: number;
    comment: number;
    app_version: number;
    created_at: number;
    _all: number;
};
export type App_feedbackAvgAggregateInputType = {
    id?: true;
    ease_of_use?: true;
    aesthetics?: true;
    functionality?: true;
};
export type App_feedbackSumAggregateInputType = {
    id?: true;
    ease_of_use?: true;
    aesthetics?: true;
    functionality?: true;
};
export type App_feedbackMinAggregateInputType = {
    id?: true;
    user_id?: true;
    user_name?: true;
    role?: true;
    ease_of_use?: true;
    aesthetics?: true;
    functionality?: true;
    comment?: true;
    app_version?: true;
    created_at?: true;
};
export type App_feedbackMaxAggregateInputType = {
    id?: true;
    user_id?: true;
    user_name?: true;
    role?: true;
    ease_of_use?: true;
    aesthetics?: true;
    functionality?: true;
    comment?: true;
    app_version?: true;
    created_at?: true;
};
export type App_feedbackCountAggregateInputType = {
    id?: true;
    user_id?: true;
    user_name?: true;
    role?: true;
    ease_of_use?: true;
    aesthetics?: true;
    functionality?: true;
    comment?: true;
    app_version?: true;
    created_at?: true;
    _all?: true;
};
export type App_feedbackAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.app_feedbackWhereInput;
    orderBy?: Prisma.app_feedbackOrderByWithRelationInput | Prisma.app_feedbackOrderByWithRelationInput[];
    cursor?: Prisma.app_feedbackWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | App_feedbackCountAggregateInputType;
    _avg?: App_feedbackAvgAggregateInputType;
    _sum?: App_feedbackSumAggregateInputType;
    _min?: App_feedbackMinAggregateInputType;
    _max?: App_feedbackMaxAggregateInputType;
};
export type GetApp_feedbackAggregateType<T extends App_feedbackAggregateArgs> = {
    [P in keyof T & keyof AggregateApp_feedback]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateApp_feedback[P]> : Prisma.GetScalarType<T[P], AggregateApp_feedback[P]>;
};
export type app_feedbackGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.app_feedbackWhereInput;
    orderBy?: Prisma.app_feedbackOrderByWithAggregationInput | Prisma.app_feedbackOrderByWithAggregationInput[];
    by: Prisma.App_feedbackScalarFieldEnum[] | Prisma.App_feedbackScalarFieldEnum;
    having?: Prisma.app_feedbackScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: App_feedbackCountAggregateInputType | true;
    _avg?: App_feedbackAvgAggregateInputType;
    _sum?: App_feedbackSumAggregateInputType;
    _min?: App_feedbackMinAggregateInputType;
    _max?: App_feedbackMaxAggregateInputType;
};
export type App_feedbackGroupByOutputType = {
    id: number;
    user_id: string | null;
    user_name: string | null;
    role: string | null;
    ease_of_use: number | null;
    aesthetics: number | null;
    functionality: number | null;
    comment: string | null;
    app_version: string | null;
    created_at: Date | null;
    _count: App_feedbackCountAggregateOutputType | null;
    _avg: App_feedbackAvgAggregateOutputType | null;
    _sum: App_feedbackSumAggregateOutputType | null;
    _min: App_feedbackMinAggregateOutputType | null;
    _max: App_feedbackMaxAggregateOutputType | null;
};
export type GetApp_feedbackGroupByPayload<T extends app_feedbackGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<App_feedbackGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof App_feedbackGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], App_feedbackGroupByOutputType[P]> : Prisma.GetScalarType<T[P], App_feedbackGroupByOutputType[P]>;
}>>;
export type app_feedbackWhereInput = {
    AND?: Prisma.app_feedbackWhereInput | Prisma.app_feedbackWhereInput[];
    OR?: Prisma.app_feedbackWhereInput[];
    NOT?: Prisma.app_feedbackWhereInput | Prisma.app_feedbackWhereInput[];
    id?: Prisma.IntFilter<"app_feedback"> | number;
    user_id?: Prisma.StringNullableFilter<"app_feedback"> | string | null;
    user_name?: Prisma.StringNullableFilter<"app_feedback"> | string | null;
    role?: Prisma.StringNullableFilter<"app_feedback"> | string | null;
    ease_of_use?: Prisma.IntNullableFilter<"app_feedback"> | number | null;
    aesthetics?: Prisma.IntNullableFilter<"app_feedback"> | number | null;
    functionality?: Prisma.IntNullableFilter<"app_feedback"> | number | null;
    comment?: Prisma.StringNullableFilter<"app_feedback"> | string | null;
    app_version?: Prisma.StringNullableFilter<"app_feedback"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"app_feedback"> | Date | string | null;
};
export type app_feedbackOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    user_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrderInput | Prisma.SortOrder;
    ease_of_use?: Prisma.SortOrderInput | Prisma.SortOrder;
    aesthetics?: Prisma.SortOrderInput | Prisma.SortOrder;
    functionality?: Prisma.SortOrderInput | Prisma.SortOrder;
    comment?: Prisma.SortOrderInput | Prisma.SortOrder;
    app_version?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type app_feedbackWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.app_feedbackWhereInput | Prisma.app_feedbackWhereInput[];
    OR?: Prisma.app_feedbackWhereInput[];
    NOT?: Prisma.app_feedbackWhereInput | Prisma.app_feedbackWhereInput[];
    user_id?: Prisma.StringNullableFilter<"app_feedback"> | string | null;
    user_name?: Prisma.StringNullableFilter<"app_feedback"> | string | null;
    role?: Prisma.StringNullableFilter<"app_feedback"> | string | null;
    ease_of_use?: Prisma.IntNullableFilter<"app_feedback"> | number | null;
    aesthetics?: Prisma.IntNullableFilter<"app_feedback"> | number | null;
    functionality?: Prisma.IntNullableFilter<"app_feedback"> | number | null;
    comment?: Prisma.StringNullableFilter<"app_feedback"> | string | null;
    app_version?: Prisma.StringNullableFilter<"app_feedback"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"app_feedback"> | Date | string | null;
}, "id">;
export type app_feedbackOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    user_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrderInput | Prisma.SortOrder;
    ease_of_use?: Prisma.SortOrderInput | Prisma.SortOrder;
    aesthetics?: Prisma.SortOrderInput | Prisma.SortOrder;
    functionality?: Prisma.SortOrderInput | Prisma.SortOrder;
    comment?: Prisma.SortOrderInput | Prisma.SortOrder;
    app_version?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.app_feedbackCountOrderByAggregateInput;
    _avg?: Prisma.app_feedbackAvgOrderByAggregateInput;
    _max?: Prisma.app_feedbackMaxOrderByAggregateInput;
    _min?: Prisma.app_feedbackMinOrderByAggregateInput;
    _sum?: Prisma.app_feedbackSumOrderByAggregateInput;
};
export type app_feedbackScalarWhereWithAggregatesInput = {
    AND?: Prisma.app_feedbackScalarWhereWithAggregatesInput | Prisma.app_feedbackScalarWhereWithAggregatesInput[];
    OR?: Prisma.app_feedbackScalarWhereWithAggregatesInput[];
    NOT?: Prisma.app_feedbackScalarWhereWithAggregatesInput | Prisma.app_feedbackScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"app_feedback"> | number;
    user_id?: Prisma.StringNullableWithAggregatesFilter<"app_feedback"> | string | null;
    user_name?: Prisma.StringNullableWithAggregatesFilter<"app_feedback"> | string | null;
    role?: Prisma.StringNullableWithAggregatesFilter<"app_feedback"> | string | null;
    ease_of_use?: Prisma.IntNullableWithAggregatesFilter<"app_feedback"> | number | null;
    aesthetics?: Prisma.IntNullableWithAggregatesFilter<"app_feedback"> | number | null;
    functionality?: Prisma.IntNullableWithAggregatesFilter<"app_feedback"> | number | null;
    comment?: Prisma.StringNullableWithAggregatesFilter<"app_feedback"> | string | null;
    app_version?: Prisma.StringNullableWithAggregatesFilter<"app_feedback"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"app_feedback"> | Date | string | null;
};
export type app_feedbackCreateInput = {
    user_id?: string | null;
    user_name?: string | null;
    role?: string | null;
    ease_of_use?: number | null;
    aesthetics?: number | null;
    functionality?: number | null;
    comment?: string | null;
    app_version?: string | null;
    created_at?: Date | string | null;
};
export type app_feedbackUncheckedCreateInput = {
    id?: number;
    user_id?: string | null;
    user_name?: string | null;
    role?: string | null;
    ease_of_use?: number | null;
    aesthetics?: number | null;
    functionality?: number | null;
    comment?: string | null;
    app_version?: string | null;
    created_at?: Date | string | null;
};
export type app_feedbackUpdateInput = {
    user_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ease_of_use?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    aesthetics?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    functionality?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    app_version?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type app_feedbackUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    user_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ease_of_use?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    aesthetics?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    functionality?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    app_version?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type app_feedbackCreateManyInput = {
    id?: number;
    user_id?: string | null;
    user_name?: string | null;
    role?: string | null;
    ease_of_use?: number | null;
    aesthetics?: number | null;
    functionality?: number | null;
    comment?: string | null;
    app_version?: string | null;
    created_at?: Date | string | null;
};
export type app_feedbackUpdateManyMutationInput = {
    user_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ease_of_use?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    aesthetics?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    functionality?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    app_version?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type app_feedbackUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    user_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ease_of_use?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    aesthetics?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    functionality?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    app_version?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type app_feedbackCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    user_name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    ease_of_use?: Prisma.SortOrder;
    aesthetics?: Prisma.SortOrder;
    functionality?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    app_version?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type app_feedbackAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ease_of_use?: Prisma.SortOrder;
    aesthetics?: Prisma.SortOrder;
    functionality?: Prisma.SortOrder;
};
export type app_feedbackMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    user_name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    ease_of_use?: Prisma.SortOrder;
    aesthetics?: Prisma.SortOrder;
    functionality?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    app_version?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type app_feedbackMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    user_name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    ease_of_use?: Prisma.SortOrder;
    aesthetics?: Prisma.SortOrder;
    functionality?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    app_version?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type app_feedbackSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ease_of_use?: Prisma.SortOrder;
    aesthetics?: Prisma.SortOrder;
    functionality?: Prisma.SortOrder;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type app_feedbackSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    user_name?: boolean;
    role?: boolean;
    ease_of_use?: boolean;
    aesthetics?: boolean;
    functionality?: boolean;
    comment?: boolean;
    app_version?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["app_feedback"]>;
export type app_feedbackSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    user_name?: boolean;
    role?: boolean;
    ease_of_use?: boolean;
    aesthetics?: boolean;
    functionality?: boolean;
    comment?: boolean;
    app_version?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["app_feedback"]>;
export type app_feedbackSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    user_id?: boolean;
    user_name?: boolean;
    role?: boolean;
    ease_of_use?: boolean;
    aesthetics?: boolean;
    functionality?: boolean;
    comment?: boolean;
    app_version?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["app_feedback"]>;
export type app_feedbackSelectScalar = {
    id?: boolean;
    user_id?: boolean;
    user_name?: boolean;
    role?: boolean;
    ease_of_use?: boolean;
    aesthetics?: boolean;
    functionality?: boolean;
    comment?: boolean;
    app_version?: boolean;
    created_at?: boolean;
};
export type app_feedbackOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "user_id" | "user_name" | "role" | "ease_of_use" | "aesthetics" | "functionality" | "comment" | "app_version" | "created_at", ExtArgs["result"]["app_feedback"]>;
export type $app_feedbackPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "app_feedback";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        user_id: string | null;
        user_name: string | null;
        role: string | null;
        ease_of_use: number | null;
        aesthetics: number | null;
        functionality: number | null;
        comment: string | null;
        app_version: string | null;
        created_at: Date | null;
    }, ExtArgs["result"]["app_feedback"]>;
    composites: {};
};
export type app_feedbackGetPayload<S extends boolean | null | undefined | app_feedbackDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$app_feedbackPayload, S>;
export type app_feedbackCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<app_feedbackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: App_feedbackCountAggregateInputType | true;
};
export interface app_feedbackDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['app_feedback'];
        meta: {
            name: 'app_feedback';
        };
    };
    findUnique<T extends app_feedbackFindUniqueArgs>(args: Prisma.SelectSubset<T, app_feedbackFindUniqueArgs<ExtArgs>>): Prisma.Prisma__app_feedbackClient<runtime.Types.Result.GetResult<Prisma.$app_feedbackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends app_feedbackFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, app_feedbackFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__app_feedbackClient<runtime.Types.Result.GetResult<Prisma.$app_feedbackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends app_feedbackFindFirstArgs>(args?: Prisma.SelectSubset<T, app_feedbackFindFirstArgs<ExtArgs>>): Prisma.Prisma__app_feedbackClient<runtime.Types.Result.GetResult<Prisma.$app_feedbackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends app_feedbackFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, app_feedbackFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__app_feedbackClient<runtime.Types.Result.GetResult<Prisma.$app_feedbackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends app_feedbackFindManyArgs>(args?: Prisma.SelectSubset<T, app_feedbackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$app_feedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends app_feedbackCreateArgs>(args: Prisma.SelectSubset<T, app_feedbackCreateArgs<ExtArgs>>): Prisma.Prisma__app_feedbackClient<runtime.Types.Result.GetResult<Prisma.$app_feedbackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends app_feedbackCreateManyArgs>(args?: Prisma.SelectSubset<T, app_feedbackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends app_feedbackCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, app_feedbackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$app_feedbackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends app_feedbackDeleteArgs>(args: Prisma.SelectSubset<T, app_feedbackDeleteArgs<ExtArgs>>): Prisma.Prisma__app_feedbackClient<runtime.Types.Result.GetResult<Prisma.$app_feedbackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends app_feedbackUpdateArgs>(args: Prisma.SelectSubset<T, app_feedbackUpdateArgs<ExtArgs>>): Prisma.Prisma__app_feedbackClient<runtime.Types.Result.GetResult<Prisma.$app_feedbackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends app_feedbackDeleteManyArgs>(args?: Prisma.SelectSubset<T, app_feedbackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends app_feedbackUpdateManyArgs>(args: Prisma.SelectSubset<T, app_feedbackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends app_feedbackUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, app_feedbackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$app_feedbackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends app_feedbackUpsertArgs>(args: Prisma.SelectSubset<T, app_feedbackUpsertArgs<ExtArgs>>): Prisma.Prisma__app_feedbackClient<runtime.Types.Result.GetResult<Prisma.$app_feedbackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends app_feedbackCountArgs>(args?: Prisma.Subset<T, app_feedbackCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], App_feedbackCountAggregateOutputType> : number>;
    aggregate<T extends App_feedbackAggregateArgs>(args: Prisma.Subset<T, App_feedbackAggregateArgs>): Prisma.PrismaPromise<GetApp_feedbackAggregateType<T>>;
    groupBy<T extends app_feedbackGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: app_feedbackGroupByArgs['orderBy'];
    } : {
        orderBy?: app_feedbackGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, app_feedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApp_feedbackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: app_feedbackFieldRefs;
}
export interface Prisma__app_feedbackClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface app_feedbackFieldRefs {
    readonly id: Prisma.FieldRef<"app_feedback", 'Int'>;
    readonly user_id: Prisma.FieldRef<"app_feedback", 'String'>;
    readonly user_name: Prisma.FieldRef<"app_feedback", 'String'>;
    readonly role: Prisma.FieldRef<"app_feedback", 'String'>;
    readonly ease_of_use: Prisma.FieldRef<"app_feedback", 'Int'>;
    readonly aesthetics: Prisma.FieldRef<"app_feedback", 'Int'>;
    readonly functionality: Prisma.FieldRef<"app_feedback", 'Int'>;
    readonly comment: Prisma.FieldRef<"app_feedback", 'String'>;
    readonly app_version: Prisma.FieldRef<"app_feedback", 'String'>;
    readonly created_at: Prisma.FieldRef<"app_feedback", 'DateTime'>;
}
export type app_feedbackFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.app_feedbackSelect<ExtArgs> | null;
    omit?: Prisma.app_feedbackOmit<ExtArgs> | null;
    where: Prisma.app_feedbackWhereUniqueInput;
};
export type app_feedbackFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.app_feedbackSelect<ExtArgs> | null;
    omit?: Prisma.app_feedbackOmit<ExtArgs> | null;
    where: Prisma.app_feedbackWhereUniqueInput;
};
export type app_feedbackFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.app_feedbackSelect<ExtArgs> | null;
    omit?: Prisma.app_feedbackOmit<ExtArgs> | null;
    where?: Prisma.app_feedbackWhereInput;
    orderBy?: Prisma.app_feedbackOrderByWithRelationInput | Prisma.app_feedbackOrderByWithRelationInput[];
    cursor?: Prisma.app_feedbackWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.App_feedbackScalarFieldEnum | Prisma.App_feedbackScalarFieldEnum[];
};
export type app_feedbackFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.app_feedbackSelect<ExtArgs> | null;
    omit?: Prisma.app_feedbackOmit<ExtArgs> | null;
    where?: Prisma.app_feedbackWhereInput;
    orderBy?: Prisma.app_feedbackOrderByWithRelationInput | Prisma.app_feedbackOrderByWithRelationInput[];
    cursor?: Prisma.app_feedbackWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.App_feedbackScalarFieldEnum | Prisma.App_feedbackScalarFieldEnum[];
};
export type app_feedbackFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.app_feedbackSelect<ExtArgs> | null;
    omit?: Prisma.app_feedbackOmit<ExtArgs> | null;
    where?: Prisma.app_feedbackWhereInput;
    orderBy?: Prisma.app_feedbackOrderByWithRelationInput | Prisma.app_feedbackOrderByWithRelationInput[];
    cursor?: Prisma.app_feedbackWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.App_feedbackScalarFieldEnum | Prisma.App_feedbackScalarFieldEnum[];
};
export type app_feedbackCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.app_feedbackSelect<ExtArgs> | null;
    omit?: Prisma.app_feedbackOmit<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.app_feedbackCreateInput, Prisma.app_feedbackUncheckedCreateInput>;
};
export type app_feedbackCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.app_feedbackCreateManyInput | Prisma.app_feedbackCreateManyInput[];
    skipDuplicates?: boolean;
};
export type app_feedbackCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.app_feedbackSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.app_feedbackOmit<ExtArgs> | null;
    data: Prisma.app_feedbackCreateManyInput | Prisma.app_feedbackCreateManyInput[];
    skipDuplicates?: boolean;
};
export type app_feedbackUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.app_feedbackSelect<ExtArgs> | null;
    omit?: Prisma.app_feedbackOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.app_feedbackUpdateInput, Prisma.app_feedbackUncheckedUpdateInput>;
    where: Prisma.app_feedbackWhereUniqueInput;
};
export type app_feedbackUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.app_feedbackUpdateManyMutationInput, Prisma.app_feedbackUncheckedUpdateManyInput>;
    where?: Prisma.app_feedbackWhereInput;
    limit?: number;
};
export type app_feedbackUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.app_feedbackSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.app_feedbackOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.app_feedbackUpdateManyMutationInput, Prisma.app_feedbackUncheckedUpdateManyInput>;
    where?: Prisma.app_feedbackWhereInput;
    limit?: number;
};
export type app_feedbackUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.app_feedbackSelect<ExtArgs> | null;
    omit?: Prisma.app_feedbackOmit<ExtArgs> | null;
    where: Prisma.app_feedbackWhereUniqueInput;
    create: Prisma.XOR<Prisma.app_feedbackCreateInput, Prisma.app_feedbackUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.app_feedbackUpdateInput, Prisma.app_feedbackUncheckedUpdateInput>;
};
export type app_feedbackDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.app_feedbackSelect<ExtArgs> | null;
    omit?: Prisma.app_feedbackOmit<ExtArgs> | null;
    where: Prisma.app_feedbackWhereUniqueInput;
};
export type app_feedbackDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.app_feedbackWhereInput;
    limit?: number;
};
export type app_feedbackDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.app_feedbackSelect<ExtArgs> | null;
    omit?: Prisma.app_feedbackOmit<ExtArgs> | null;
};
