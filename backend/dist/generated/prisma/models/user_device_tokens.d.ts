import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type user_device_tokensModel = runtime.Types.Result.DefaultSelection<Prisma.$user_device_tokensPayload>;
export type AggregateUser_device_tokens = {
    _count: User_device_tokensCountAggregateOutputType | null;
    _min: User_device_tokensMinAggregateOutputType | null;
    _max: User_device_tokensMaxAggregateOutputType | null;
};
export type User_device_tokensMinAggregateOutputType = {
    uid: string | null;
    fcm_token: string | null;
    updated_at: Date | null;
};
export type User_device_tokensMaxAggregateOutputType = {
    uid: string | null;
    fcm_token: string | null;
    updated_at: Date | null;
};
export type User_device_tokensCountAggregateOutputType = {
    uid: number;
    fcm_token: number;
    updated_at: number;
    _all: number;
};
export type User_device_tokensMinAggregateInputType = {
    uid?: true;
    fcm_token?: true;
    updated_at?: true;
};
export type User_device_tokensMaxAggregateInputType = {
    uid?: true;
    fcm_token?: true;
    updated_at?: true;
};
export type User_device_tokensCountAggregateInputType = {
    uid?: true;
    fcm_token?: true;
    updated_at?: true;
    _all?: true;
};
export type User_device_tokensAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.user_device_tokensWhereInput;
    orderBy?: Prisma.user_device_tokensOrderByWithRelationInput | Prisma.user_device_tokensOrderByWithRelationInput[];
    cursor?: Prisma.user_device_tokensWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | User_device_tokensCountAggregateInputType;
    _min?: User_device_tokensMinAggregateInputType;
    _max?: User_device_tokensMaxAggregateInputType;
};
export type GetUser_device_tokensAggregateType<T extends User_device_tokensAggregateArgs> = {
    [P in keyof T & keyof AggregateUser_device_tokens]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser_device_tokens[P]> : Prisma.GetScalarType<T[P], AggregateUser_device_tokens[P]>;
};
export type user_device_tokensGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.user_device_tokensWhereInput;
    orderBy?: Prisma.user_device_tokensOrderByWithAggregationInput | Prisma.user_device_tokensOrderByWithAggregationInput[];
    by: Prisma.User_device_tokensScalarFieldEnum[] | Prisma.User_device_tokensScalarFieldEnum;
    having?: Prisma.user_device_tokensScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: User_device_tokensCountAggregateInputType | true;
    _min?: User_device_tokensMinAggregateInputType;
    _max?: User_device_tokensMaxAggregateInputType;
};
export type User_device_tokensGroupByOutputType = {
    uid: string;
    fcm_token: string;
    updated_at: Date | null;
    _count: User_device_tokensCountAggregateOutputType | null;
    _min: User_device_tokensMinAggregateOutputType | null;
    _max: User_device_tokensMaxAggregateOutputType | null;
};
export type GetUser_device_tokensGroupByPayload<T extends user_device_tokensGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<User_device_tokensGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof User_device_tokensGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], User_device_tokensGroupByOutputType[P]> : Prisma.GetScalarType<T[P], User_device_tokensGroupByOutputType[P]>;
}>>;
export type user_device_tokensWhereInput = {
    AND?: Prisma.user_device_tokensWhereInput | Prisma.user_device_tokensWhereInput[];
    OR?: Prisma.user_device_tokensWhereInput[];
    NOT?: Prisma.user_device_tokensWhereInput | Prisma.user_device_tokensWhereInput[];
    uid?: Prisma.StringFilter<"user_device_tokens"> | string;
    fcm_token?: Prisma.StringFilter<"user_device_tokens"> | string;
    updated_at?: Prisma.DateTimeNullableFilter<"user_device_tokens"> | Date | string | null;
};
export type user_device_tokensOrderByWithRelationInput = {
    uid?: Prisma.SortOrder;
    fcm_token?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type user_device_tokensWhereUniqueInput = Prisma.AtLeast<{
    uid?: string;
    AND?: Prisma.user_device_tokensWhereInput | Prisma.user_device_tokensWhereInput[];
    OR?: Prisma.user_device_tokensWhereInput[];
    NOT?: Prisma.user_device_tokensWhereInput | Prisma.user_device_tokensWhereInput[];
    fcm_token?: Prisma.StringFilter<"user_device_tokens"> | string;
    updated_at?: Prisma.DateTimeNullableFilter<"user_device_tokens"> | Date | string | null;
}, "uid">;
export type user_device_tokensOrderByWithAggregationInput = {
    uid?: Prisma.SortOrder;
    fcm_token?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.user_device_tokensCountOrderByAggregateInput;
    _max?: Prisma.user_device_tokensMaxOrderByAggregateInput;
    _min?: Prisma.user_device_tokensMinOrderByAggregateInput;
};
export type user_device_tokensScalarWhereWithAggregatesInput = {
    AND?: Prisma.user_device_tokensScalarWhereWithAggregatesInput | Prisma.user_device_tokensScalarWhereWithAggregatesInput[];
    OR?: Prisma.user_device_tokensScalarWhereWithAggregatesInput[];
    NOT?: Prisma.user_device_tokensScalarWhereWithAggregatesInput | Prisma.user_device_tokensScalarWhereWithAggregatesInput[];
    uid?: Prisma.StringWithAggregatesFilter<"user_device_tokens"> | string;
    fcm_token?: Prisma.StringWithAggregatesFilter<"user_device_tokens"> | string;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"user_device_tokens"> | Date | string | null;
};
export type user_device_tokensCreateInput = {
    uid: string;
    fcm_token: string;
    updated_at?: Date | string | null;
};
export type user_device_tokensUncheckedCreateInput = {
    uid: string;
    fcm_token: string;
    updated_at?: Date | string | null;
};
export type user_device_tokensUpdateInput = {
    uid?: Prisma.StringFieldUpdateOperationsInput | string;
    fcm_token?: Prisma.StringFieldUpdateOperationsInput | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type user_device_tokensUncheckedUpdateInput = {
    uid?: Prisma.StringFieldUpdateOperationsInput | string;
    fcm_token?: Prisma.StringFieldUpdateOperationsInput | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type user_device_tokensCreateManyInput = {
    uid: string;
    fcm_token: string;
    updated_at?: Date | string | null;
};
export type user_device_tokensUpdateManyMutationInput = {
    uid?: Prisma.StringFieldUpdateOperationsInput | string;
    fcm_token?: Prisma.StringFieldUpdateOperationsInput | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type user_device_tokensUncheckedUpdateManyInput = {
    uid?: Prisma.StringFieldUpdateOperationsInput | string;
    fcm_token?: Prisma.StringFieldUpdateOperationsInput | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type user_device_tokensCountOrderByAggregateInput = {
    uid?: Prisma.SortOrder;
    fcm_token?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type user_device_tokensMaxOrderByAggregateInput = {
    uid?: Prisma.SortOrder;
    fcm_token?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type user_device_tokensMinOrderByAggregateInput = {
    uid?: Prisma.SortOrder;
    fcm_token?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type user_device_tokensSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    uid?: boolean;
    fcm_token?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["user_device_tokens"]>;
export type user_device_tokensSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    uid?: boolean;
    fcm_token?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["user_device_tokens"]>;
export type user_device_tokensSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    uid?: boolean;
    fcm_token?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["user_device_tokens"]>;
export type user_device_tokensSelectScalar = {
    uid?: boolean;
    fcm_token?: boolean;
    updated_at?: boolean;
};
export type user_device_tokensOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"uid" | "fcm_token" | "updated_at", ExtArgs["result"]["user_device_tokens"]>;
export type $user_device_tokensPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "user_device_tokens";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        uid: string;
        fcm_token: string;
        updated_at: Date | null;
    }, ExtArgs["result"]["user_device_tokens"]>;
    composites: {};
};
export type user_device_tokensGetPayload<S extends boolean | null | undefined | user_device_tokensDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$user_device_tokensPayload, S>;
export type user_device_tokensCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<user_device_tokensFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: User_device_tokensCountAggregateInputType | true;
};
export interface user_device_tokensDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['user_device_tokens'];
        meta: {
            name: 'user_device_tokens';
        };
    };
    findUnique<T extends user_device_tokensFindUniqueArgs>(args: Prisma.SelectSubset<T, user_device_tokensFindUniqueArgs<ExtArgs>>): Prisma.Prisma__user_device_tokensClient<runtime.Types.Result.GetResult<Prisma.$user_device_tokensPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends user_device_tokensFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, user_device_tokensFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__user_device_tokensClient<runtime.Types.Result.GetResult<Prisma.$user_device_tokensPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends user_device_tokensFindFirstArgs>(args?: Prisma.SelectSubset<T, user_device_tokensFindFirstArgs<ExtArgs>>): Prisma.Prisma__user_device_tokensClient<runtime.Types.Result.GetResult<Prisma.$user_device_tokensPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends user_device_tokensFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, user_device_tokensFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__user_device_tokensClient<runtime.Types.Result.GetResult<Prisma.$user_device_tokensPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends user_device_tokensFindManyArgs>(args?: Prisma.SelectSubset<T, user_device_tokensFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$user_device_tokensPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends user_device_tokensCreateArgs>(args: Prisma.SelectSubset<T, user_device_tokensCreateArgs<ExtArgs>>): Prisma.Prisma__user_device_tokensClient<runtime.Types.Result.GetResult<Prisma.$user_device_tokensPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends user_device_tokensCreateManyArgs>(args?: Prisma.SelectSubset<T, user_device_tokensCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends user_device_tokensCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, user_device_tokensCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$user_device_tokensPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends user_device_tokensDeleteArgs>(args: Prisma.SelectSubset<T, user_device_tokensDeleteArgs<ExtArgs>>): Prisma.Prisma__user_device_tokensClient<runtime.Types.Result.GetResult<Prisma.$user_device_tokensPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends user_device_tokensUpdateArgs>(args: Prisma.SelectSubset<T, user_device_tokensUpdateArgs<ExtArgs>>): Prisma.Prisma__user_device_tokensClient<runtime.Types.Result.GetResult<Prisma.$user_device_tokensPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends user_device_tokensDeleteManyArgs>(args?: Prisma.SelectSubset<T, user_device_tokensDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends user_device_tokensUpdateManyArgs>(args: Prisma.SelectSubset<T, user_device_tokensUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends user_device_tokensUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, user_device_tokensUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$user_device_tokensPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends user_device_tokensUpsertArgs>(args: Prisma.SelectSubset<T, user_device_tokensUpsertArgs<ExtArgs>>): Prisma.Prisma__user_device_tokensClient<runtime.Types.Result.GetResult<Prisma.$user_device_tokensPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends user_device_tokensCountArgs>(args?: Prisma.Subset<T, user_device_tokensCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], User_device_tokensCountAggregateOutputType> : number>;
    aggregate<T extends User_device_tokensAggregateArgs>(args: Prisma.Subset<T, User_device_tokensAggregateArgs>): Prisma.PrismaPromise<GetUser_device_tokensAggregateType<T>>;
    groupBy<T extends user_device_tokensGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: user_device_tokensGroupByArgs['orderBy'];
    } : {
        orderBy?: user_device_tokensGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, user_device_tokensGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_device_tokensGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: user_device_tokensFieldRefs;
}
export interface Prisma__user_device_tokensClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface user_device_tokensFieldRefs {
    readonly uid: Prisma.FieldRef<"user_device_tokens", 'String'>;
    readonly fcm_token: Prisma.FieldRef<"user_device_tokens", 'String'>;
    readonly updated_at: Prisma.FieldRef<"user_device_tokens", 'DateTime'>;
}
export type user_device_tokensFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_device_tokensSelect<ExtArgs> | null;
    omit?: Prisma.user_device_tokensOmit<ExtArgs> | null;
    where: Prisma.user_device_tokensWhereUniqueInput;
};
export type user_device_tokensFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_device_tokensSelect<ExtArgs> | null;
    omit?: Prisma.user_device_tokensOmit<ExtArgs> | null;
    where: Prisma.user_device_tokensWhereUniqueInput;
};
export type user_device_tokensFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_device_tokensSelect<ExtArgs> | null;
    omit?: Prisma.user_device_tokensOmit<ExtArgs> | null;
    where?: Prisma.user_device_tokensWhereInput;
    orderBy?: Prisma.user_device_tokensOrderByWithRelationInput | Prisma.user_device_tokensOrderByWithRelationInput[];
    cursor?: Prisma.user_device_tokensWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.User_device_tokensScalarFieldEnum | Prisma.User_device_tokensScalarFieldEnum[];
};
export type user_device_tokensFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_device_tokensSelect<ExtArgs> | null;
    omit?: Prisma.user_device_tokensOmit<ExtArgs> | null;
    where?: Prisma.user_device_tokensWhereInput;
    orderBy?: Prisma.user_device_tokensOrderByWithRelationInput | Prisma.user_device_tokensOrderByWithRelationInput[];
    cursor?: Prisma.user_device_tokensWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.User_device_tokensScalarFieldEnum | Prisma.User_device_tokensScalarFieldEnum[];
};
export type user_device_tokensFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_device_tokensSelect<ExtArgs> | null;
    omit?: Prisma.user_device_tokensOmit<ExtArgs> | null;
    where?: Prisma.user_device_tokensWhereInput;
    orderBy?: Prisma.user_device_tokensOrderByWithRelationInput | Prisma.user_device_tokensOrderByWithRelationInput[];
    cursor?: Prisma.user_device_tokensWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.User_device_tokensScalarFieldEnum | Prisma.User_device_tokensScalarFieldEnum[];
};
export type user_device_tokensCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_device_tokensSelect<ExtArgs> | null;
    omit?: Prisma.user_device_tokensOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.user_device_tokensCreateInput, Prisma.user_device_tokensUncheckedCreateInput>;
};
export type user_device_tokensCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.user_device_tokensCreateManyInput | Prisma.user_device_tokensCreateManyInput[];
    skipDuplicates?: boolean;
};
export type user_device_tokensCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_device_tokensSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.user_device_tokensOmit<ExtArgs> | null;
    data: Prisma.user_device_tokensCreateManyInput | Prisma.user_device_tokensCreateManyInput[];
    skipDuplicates?: boolean;
};
export type user_device_tokensUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_device_tokensSelect<ExtArgs> | null;
    omit?: Prisma.user_device_tokensOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.user_device_tokensUpdateInput, Prisma.user_device_tokensUncheckedUpdateInput>;
    where: Prisma.user_device_tokensWhereUniqueInput;
};
export type user_device_tokensUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.user_device_tokensUpdateManyMutationInput, Prisma.user_device_tokensUncheckedUpdateManyInput>;
    where?: Prisma.user_device_tokensWhereInput;
    limit?: number;
};
export type user_device_tokensUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_device_tokensSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.user_device_tokensOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.user_device_tokensUpdateManyMutationInput, Prisma.user_device_tokensUncheckedUpdateManyInput>;
    where?: Prisma.user_device_tokensWhereInput;
    limit?: number;
};
export type user_device_tokensUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_device_tokensSelect<ExtArgs> | null;
    omit?: Prisma.user_device_tokensOmit<ExtArgs> | null;
    where: Prisma.user_device_tokensWhereUniqueInput;
    create: Prisma.XOR<Prisma.user_device_tokensCreateInput, Prisma.user_device_tokensUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.user_device_tokensUpdateInput, Prisma.user_device_tokensUncheckedUpdateInput>;
};
export type user_device_tokensDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_device_tokensSelect<ExtArgs> | null;
    omit?: Prisma.user_device_tokensOmit<ExtArgs> | null;
    where: Prisma.user_device_tokensWhereUniqueInput;
};
export type user_device_tokensDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.user_device_tokensWhereInput;
    limit?: number;
};
export type user_device_tokensDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_device_tokensSelect<ExtArgs> | null;
    omit?: Prisma.user_device_tokensOmit<ExtArgs> | null;
};
