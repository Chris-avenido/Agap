import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type chatbot_knowledgeModel = runtime.Types.Result.DefaultSelection<Prisma.$chatbot_knowledgePayload>;
export type AggregateChatbot_knowledge = {
    _count: Chatbot_knowledgeCountAggregateOutputType | null;
    _avg: Chatbot_knowledgeAvgAggregateOutputType | null;
    _sum: Chatbot_knowledgeSumAggregateOutputType | null;
    _min: Chatbot_knowledgeMinAggregateOutputType | null;
    _max: Chatbot_knowledgeMaxAggregateOutputType | null;
};
export type Chatbot_knowledgeAvgAggregateOutputType = {
    id: number | null;
};
export type Chatbot_knowledgeSumAggregateOutputType = {
    id: number | null;
};
export type Chatbot_knowledgeMinAggregateOutputType = {
    id: number | null;
    content: string | null;
    created_at: Date | null;
};
export type Chatbot_knowledgeMaxAggregateOutputType = {
    id: number | null;
    content: string | null;
    created_at: Date | null;
};
export type Chatbot_knowledgeCountAggregateOutputType = {
    id: number;
    content: number;
    embedding: number;
    metadata: number;
    created_at: number;
    _all: number;
};
export type Chatbot_knowledgeAvgAggregateInputType = {
    id?: true;
};
export type Chatbot_knowledgeSumAggregateInputType = {
    id?: true;
};
export type Chatbot_knowledgeMinAggregateInputType = {
    id?: true;
    content?: true;
    created_at?: true;
};
export type Chatbot_knowledgeMaxAggregateInputType = {
    id?: true;
    content?: true;
    created_at?: true;
};
export type Chatbot_knowledgeCountAggregateInputType = {
    id?: true;
    content?: true;
    embedding?: true;
    metadata?: true;
    created_at?: true;
    _all?: true;
};
export type Chatbot_knowledgeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.chatbot_knowledgeWhereInput;
    orderBy?: Prisma.chatbot_knowledgeOrderByWithRelationInput | Prisma.chatbot_knowledgeOrderByWithRelationInput[];
    cursor?: Prisma.chatbot_knowledgeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Chatbot_knowledgeCountAggregateInputType;
    _avg?: Chatbot_knowledgeAvgAggregateInputType;
    _sum?: Chatbot_knowledgeSumAggregateInputType;
    _min?: Chatbot_knowledgeMinAggregateInputType;
    _max?: Chatbot_knowledgeMaxAggregateInputType;
};
export type GetChatbot_knowledgeAggregateType<T extends Chatbot_knowledgeAggregateArgs> = {
    [P in keyof T & keyof AggregateChatbot_knowledge]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateChatbot_knowledge[P]> : Prisma.GetScalarType<T[P], AggregateChatbot_knowledge[P]>;
};
export type chatbot_knowledgeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.chatbot_knowledgeWhereInput;
    orderBy?: Prisma.chatbot_knowledgeOrderByWithAggregationInput | Prisma.chatbot_knowledgeOrderByWithAggregationInput[];
    by: Prisma.Chatbot_knowledgeScalarFieldEnum[] | Prisma.Chatbot_knowledgeScalarFieldEnum;
    having?: Prisma.chatbot_knowledgeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Chatbot_knowledgeCountAggregateInputType | true;
    _avg?: Chatbot_knowledgeAvgAggregateInputType;
    _sum?: Chatbot_knowledgeSumAggregateInputType;
    _min?: Chatbot_knowledgeMinAggregateInputType;
    _max?: Chatbot_knowledgeMaxAggregateInputType;
};
export type Chatbot_knowledgeGroupByOutputType = {
    id: number;
    content: string;
    embedding: runtime.JsonValue | null;
    metadata: runtime.JsonValue | null;
    created_at: Date | null;
    _count: Chatbot_knowledgeCountAggregateOutputType | null;
    _avg: Chatbot_knowledgeAvgAggregateOutputType | null;
    _sum: Chatbot_knowledgeSumAggregateOutputType | null;
    _min: Chatbot_knowledgeMinAggregateOutputType | null;
    _max: Chatbot_knowledgeMaxAggregateOutputType | null;
};
export type GetChatbot_knowledgeGroupByPayload<T extends chatbot_knowledgeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Chatbot_knowledgeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Chatbot_knowledgeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Chatbot_knowledgeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Chatbot_knowledgeGroupByOutputType[P]>;
}>>;
export type chatbot_knowledgeWhereInput = {
    AND?: Prisma.chatbot_knowledgeWhereInput | Prisma.chatbot_knowledgeWhereInput[];
    OR?: Prisma.chatbot_knowledgeWhereInput[];
    NOT?: Prisma.chatbot_knowledgeWhereInput | Prisma.chatbot_knowledgeWhereInput[];
    id?: Prisma.IntFilter<"chatbot_knowledge"> | number;
    content?: Prisma.StringFilter<"chatbot_knowledge"> | string;
    embedding?: Prisma.JsonNullableFilter<"chatbot_knowledge">;
    metadata?: Prisma.JsonNullableFilter<"chatbot_knowledge">;
    created_at?: Prisma.DateTimeNullableFilter<"chatbot_knowledge"> | Date | string | null;
};
export type chatbot_knowledgeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    embedding?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type chatbot_knowledgeWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.chatbot_knowledgeWhereInput | Prisma.chatbot_knowledgeWhereInput[];
    OR?: Prisma.chatbot_knowledgeWhereInput[];
    NOT?: Prisma.chatbot_knowledgeWhereInput | Prisma.chatbot_knowledgeWhereInput[];
    content?: Prisma.StringFilter<"chatbot_knowledge"> | string;
    embedding?: Prisma.JsonNullableFilter<"chatbot_knowledge">;
    metadata?: Prisma.JsonNullableFilter<"chatbot_knowledge">;
    created_at?: Prisma.DateTimeNullableFilter<"chatbot_knowledge"> | Date | string | null;
}, "id">;
export type chatbot_knowledgeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    embedding?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.chatbot_knowledgeCountOrderByAggregateInput;
    _avg?: Prisma.chatbot_knowledgeAvgOrderByAggregateInput;
    _max?: Prisma.chatbot_knowledgeMaxOrderByAggregateInput;
    _min?: Prisma.chatbot_knowledgeMinOrderByAggregateInput;
    _sum?: Prisma.chatbot_knowledgeSumOrderByAggregateInput;
};
export type chatbot_knowledgeScalarWhereWithAggregatesInput = {
    AND?: Prisma.chatbot_knowledgeScalarWhereWithAggregatesInput | Prisma.chatbot_knowledgeScalarWhereWithAggregatesInput[];
    OR?: Prisma.chatbot_knowledgeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.chatbot_knowledgeScalarWhereWithAggregatesInput | Prisma.chatbot_knowledgeScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"chatbot_knowledge"> | number;
    content?: Prisma.StringWithAggregatesFilter<"chatbot_knowledge"> | string;
    embedding?: Prisma.JsonNullableWithAggregatesFilter<"chatbot_knowledge">;
    metadata?: Prisma.JsonNullableWithAggregatesFilter<"chatbot_knowledge">;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"chatbot_knowledge"> | Date | string | null;
};
export type chatbot_knowledgeCreateInput = {
    content: string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string | null;
};
export type chatbot_knowledgeUncheckedCreateInput = {
    id?: number;
    content: string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string | null;
};
export type chatbot_knowledgeUpdateInput = {
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type chatbot_knowledgeUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type chatbot_knowledgeCreateManyInput = {
    id?: number;
    content: string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string | null;
};
export type chatbot_knowledgeUpdateManyMutationInput = {
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type chatbot_knowledgeUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type chatbot_knowledgeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    embedding?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type chatbot_knowledgeAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type chatbot_knowledgeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type chatbot_knowledgeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type chatbot_knowledgeSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type chatbot_knowledgeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    content?: boolean;
    embedding?: boolean;
    metadata?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["chatbot_knowledge"]>;
export type chatbot_knowledgeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    content?: boolean;
    embedding?: boolean;
    metadata?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["chatbot_knowledge"]>;
export type chatbot_knowledgeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    content?: boolean;
    embedding?: boolean;
    metadata?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["chatbot_knowledge"]>;
export type chatbot_knowledgeSelectScalar = {
    id?: boolean;
    content?: boolean;
    embedding?: boolean;
    metadata?: boolean;
    created_at?: boolean;
};
export type chatbot_knowledgeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "content" | "embedding" | "metadata" | "created_at", ExtArgs["result"]["chatbot_knowledge"]>;
export type $chatbot_knowledgePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "chatbot_knowledge";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        content: string;
        embedding: runtime.JsonValue | null;
        metadata: runtime.JsonValue | null;
        created_at: Date | null;
    }, ExtArgs["result"]["chatbot_knowledge"]>;
    composites: {};
};
export type chatbot_knowledgeGetPayload<S extends boolean | null | undefined | chatbot_knowledgeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$chatbot_knowledgePayload, S>;
export type chatbot_knowledgeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<chatbot_knowledgeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Chatbot_knowledgeCountAggregateInputType | true;
};
export interface chatbot_knowledgeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['chatbot_knowledge'];
        meta: {
            name: 'chatbot_knowledge';
        };
    };
    findUnique<T extends chatbot_knowledgeFindUniqueArgs>(args: Prisma.SelectSubset<T, chatbot_knowledgeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__chatbot_knowledgeClient<runtime.Types.Result.GetResult<Prisma.$chatbot_knowledgePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends chatbot_knowledgeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, chatbot_knowledgeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__chatbot_knowledgeClient<runtime.Types.Result.GetResult<Prisma.$chatbot_knowledgePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends chatbot_knowledgeFindFirstArgs>(args?: Prisma.SelectSubset<T, chatbot_knowledgeFindFirstArgs<ExtArgs>>): Prisma.Prisma__chatbot_knowledgeClient<runtime.Types.Result.GetResult<Prisma.$chatbot_knowledgePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends chatbot_knowledgeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, chatbot_knowledgeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__chatbot_knowledgeClient<runtime.Types.Result.GetResult<Prisma.$chatbot_knowledgePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends chatbot_knowledgeFindManyArgs>(args?: Prisma.SelectSubset<T, chatbot_knowledgeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$chatbot_knowledgePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends chatbot_knowledgeCreateArgs>(args: Prisma.SelectSubset<T, chatbot_knowledgeCreateArgs<ExtArgs>>): Prisma.Prisma__chatbot_knowledgeClient<runtime.Types.Result.GetResult<Prisma.$chatbot_knowledgePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends chatbot_knowledgeCreateManyArgs>(args?: Prisma.SelectSubset<T, chatbot_knowledgeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends chatbot_knowledgeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, chatbot_knowledgeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$chatbot_knowledgePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends chatbot_knowledgeDeleteArgs>(args: Prisma.SelectSubset<T, chatbot_knowledgeDeleteArgs<ExtArgs>>): Prisma.Prisma__chatbot_knowledgeClient<runtime.Types.Result.GetResult<Prisma.$chatbot_knowledgePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends chatbot_knowledgeUpdateArgs>(args: Prisma.SelectSubset<T, chatbot_knowledgeUpdateArgs<ExtArgs>>): Prisma.Prisma__chatbot_knowledgeClient<runtime.Types.Result.GetResult<Prisma.$chatbot_knowledgePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends chatbot_knowledgeDeleteManyArgs>(args?: Prisma.SelectSubset<T, chatbot_knowledgeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends chatbot_knowledgeUpdateManyArgs>(args: Prisma.SelectSubset<T, chatbot_knowledgeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends chatbot_knowledgeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, chatbot_knowledgeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$chatbot_knowledgePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends chatbot_knowledgeUpsertArgs>(args: Prisma.SelectSubset<T, chatbot_knowledgeUpsertArgs<ExtArgs>>): Prisma.Prisma__chatbot_knowledgeClient<runtime.Types.Result.GetResult<Prisma.$chatbot_knowledgePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends chatbot_knowledgeCountArgs>(args?: Prisma.Subset<T, chatbot_knowledgeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Chatbot_knowledgeCountAggregateOutputType> : number>;
    aggregate<T extends Chatbot_knowledgeAggregateArgs>(args: Prisma.Subset<T, Chatbot_knowledgeAggregateArgs>): Prisma.PrismaPromise<GetChatbot_knowledgeAggregateType<T>>;
    groupBy<T extends chatbot_knowledgeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: chatbot_knowledgeGroupByArgs['orderBy'];
    } : {
        orderBy?: chatbot_knowledgeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, chatbot_knowledgeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatbot_knowledgeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: chatbot_knowledgeFieldRefs;
}
export interface Prisma__chatbot_knowledgeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface chatbot_knowledgeFieldRefs {
    readonly id: Prisma.FieldRef<"chatbot_knowledge", 'Int'>;
    readonly content: Prisma.FieldRef<"chatbot_knowledge", 'String'>;
    readonly embedding: Prisma.FieldRef<"chatbot_knowledge", 'Json'>;
    readonly metadata: Prisma.FieldRef<"chatbot_knowledge", 'Json'>;
    readonly created_at: Prisma.FieldRef<"chatbot_knowledge", 'DateTime'>;
}
export type chatbot_knowledgeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatbot_knowledgeSelect<ExtArgs> | null;
    omit?: Prisma.chatbot_knowledgeOmit<ExtArgs> | null;
    where: Prisma.chatbot_knowledgeWhereUniqueInput;
};
export type chatbot_knowledgeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatbot_knowledgeSelect<ExtArgs> | null;
    omit?: Prisma.chatbot_knowledgeOmit<ExtArgs> | null;
    where: Prisma.chatbot_knowledgeWhereUniqueInput;
};
export type chatbot_knowledgeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatbot_knowledgeSelect<ExtArgs> | null;
    omit?: Prisma.chatbot_knowledgeOmit<ExtArgs> | null;
    where?: Prisma.chatbot_knowledgeWhereInput;
    orderBy?: Prisma.chatbot_knowledgeOrderByWithRelationInput | Prisma.chatbot_knowledgeOrderByWithRelationInput[];
    cursor?: Prisma.chatbot_knowledgeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Chatbot_knowledgeScalarFieldEnum | Prisma.Chatbot_knowledgeScalarFieldEnum[];
};
export type chatbot_knowledgeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatbot_knowledgeSelect<ExtArgs> | null;
    omit?: Prisma.chatbot_knowledgeOmit<ExtArgs> | null;
    where?: Prisma.chatbot_knowledgeWhereInput;
    orderBy?: Prisma.chatbot_knowledgeOrderByWithRelationInput | Prisma.chatbot_knowledgeOrderByWithRelationInput[];
    cursor?: Prisma.chatbot_knowledgeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Chatbot_knowledgeScalarFieldEnum | Prisma.Chatbot_knowledgeScalarFieldEnum[];
};
export type chatbot_knowledgeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatbot_knowledgeSelect<ExtArgs> | null;
    omit?: Prisma.chatbot_knowledgeOmit<ExtArgs> | null;
    where?: Prisma.chatbot_knowledgeWhereInput;
    orderBy?: Prisma.chatbot_knowledgeOrderByWithRelationInput | Prisma.chatbot_knowledgeOrderByWithRelationInput[];
    cursor?: Prisma.chatbot_knowledgeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Chatbot_knowledgeScalarFieldEnum | Prisma.Chatbot_knowledgeScalarFieldEnum[];
};
export type chatbot_knowledgeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatbot_knowledgeSelect<ExtArgs> | null;
    omit?: Prisma.chatbot_knowledgeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.chatbot_knowledgeCreateInput, Prisma.chatbot_knowledgeUncheckedCreateInput>;
};
export type chatbot_knowledgeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.chatbot_knowledgeCreateManyInput | Prisma.chatbot_knowledgeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type chatbot_knowledgeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatbot_knowledgeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.chatbot_knowledgeOmit<ExtArgs> | null;
    data: Prisma.chatbot_knowledgeCreateManyInput | Prisma.chatbot_knowledgeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type chatbot_knowledgeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatbot_knowledgeSelect<ExtArgs> | null;
    omit?: Prisma.chatbot_knowledgeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.chatbot_knowledgeUpdateInput, Prisma.chatbot_knowledgeUncheckedUpdateInput>;
    where: Prisma.chatbot_knowledgeWhereUniqueInput;
};
export type chatbot_knowledgeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.chatbot_knowledgeUpdateManyMutationInput, Prisma.chatbot_knowledgeUncheckedUpdateManyInput>;
    where?: Prisma.chatbot_knowledgeWhereInput;
    limit?: number;
};
export type chatbot_knowledgeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatbot_knowledgeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.chatbot_knowledgeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.chatbot_knowledgeUpdateManyMutationInput, Prisma.chatbot_knowledgeUncheckedUpdateManyInput>;
    where?: Prisma.chatbot_knowledgeWhereInput;
    limit?: number;
};
export type chatbot_knowledgeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatbot_knowledgeSelect<ExtArgs> | null;
    omit?: Prisma.chatbot_knowledgeOmit<ExtArgs> | null;
    where: Prisma.chatbot_knowledgeWhereUniqueInput;
    create: Prisma.XOR<Prisma.chatbot_knowledgeCreateInput, Prisma.chatbot_knowledgeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.chatbot_knowledgeUpdateInput, Prisma.chatbot_knowledgeUncheckedUpdateInput>;
};
export type chatbot_knowledgeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatbot_knowledgeSelect<ExtArgs> | null;
    omit?: Prisma.chatbot_knowledgeOmit<ExtArgs> | null;
    where: Prisma.chatbot_knowledgeWhereUniqueInput;
};
export type chatbot_knowledgeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.chatbot_knowledgeWhereInput;
    limit?: number;
};
export type chatbot_knowledgeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatbot_knowledgeSelect<ExtArgs> | null;
    omit?: Prisma.chatbot_knowledgeOmit<ExtArgs> | null;
};
