import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type super_userModel = runtime.Types.Result.DefaultSelection<Prisma.$super_userPayload>;
export type AggregateSuper_user = {
    _count: Super_userCountAggregateOutputType | null;
    _avg: Super_userAvgAggregateOutputType | null;
    _sum: Super_userSumAggregateOutputType | null;
    _min: Super_userMinAggregateOutputType | null;
    _max: Super_userMaxAggregateOutputType | null;
};
export type Super_userAvgAggregateOutputType = {
    id: number | null;
};
export type Super_userSumAggregateOutputType = {
    id: number | null;
};
export type Super_userMinAggregateOutputType = {
    id: number | null;
    email: string | null;
    password: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Super_userMaxAggregateOutputType = {
    id: number | null;
    email: string | null;
    password: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Super_userCountAggregateOutputType = {
    id: number;
    email: number;
    password: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Super_userAvgAggregateInputType = {
    id?: true;
};
export type Super_userSumAggregateInputType = {
    id?: true;
};
export type Super_userMinAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    created_at?: true;
    updated_at?: true;
};
export type Super_userMaxAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    created_at?: true;
    updated_at?: true;
};
export type Super_userCountAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Super_userAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.super_userWhereInput;
    orderBy?: Prisma.super_userOrderByWithRelationInput | Prisma.super_userOrderByWithRelationInput[];
    cursor?: Prisma.super_userWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Super_userCountAggregateInputType;
    _avg?: Super_userAvgAggregateInputType;
    _sum?: Super_userSumAggregateInputType;
    _min?: Super_userMinAggregateInputType;
    _max?: Super_userMaxAggregateInputType;
};
export type GetSuper_userAggregateType<T extends Super_userAggregateArgs> = {
    [P in keyof T & keyof AggregateSuper_user]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSuper_user[P]> : Prisma.GetScalarType<T[P], AggregateSuper_user[P]>;
};
export type super_userGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.super_userWhereInput;
    orderBy?: Prisma.super_userOrderByWithAggregationInput | Prisma.super_userOrderByWithAggregationInput[];
    by: Prisma.Super_userScalarFieldEnum[] | Prisma.Super_userScalarFieldEnum;
    having?: Prisma.super_userScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Super_userCountAggregateInputType | true;
    _avg?: Super_userAvgAggregateInputType;
    _sum?: Super_userSumAggregateInputType;
    _min?: Super_userMinAggregateInputType;
    _max?: Super_userMaxAggregateInputType;
};
export type Super_userGroupByOutputType = {
    id: number;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    _count: Super_userCountAggregateOutputType | null;
    _avg: Super_userAvgAggregateOutputType | null;
    _sum: Super_userSumAggregateOutputType | null;
    _min: Super_userMinAggregateOutputType | null;
    _max: Super_userMaxAggregateOutputType | null;
};
export type GetSuper_userGroupByPayload<T extends super_userGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Super_userGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Super_userGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Super_userGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Super_userGroupByOutputType[P]>;
}>>;
export type super_userWhereInput = {
    AND?: Prisma.super_userWhereInput | Prisma.super_userWhereInput[];
    OR?: Prisma.super_userWhereInput[];
    NOT?: Prisma.super_userWhereInput | Prisma.super_userWhereInput[];
    id?: Prisma.IntFilter<"super_user"> | number;
    email?: Prisma.StringFilter<"super_user"> | string;
    password?: Prisma.StringFilter<"super_user"> | string;
    created_at?: Prisma.DateTimeFilter<"super_user"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"super_user"> | Date | string;
};
export type super_userOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type super_userWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    email?: string;
    AND?: Prisma.super_userWhereInput | Prisma.super_userWhereInput[];
    OR?: Prisma.super_userWhereInput[];
    NOT?: Prisma.super_userWhereInput | Prisma.super_userWhereInput[];
    password?: Prisma.StringFilter<"super_user"> | string;
    created_at?: Prisma.DateTimeFilter<"super_user"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"super_user"> | Date | string;
}, "id" | "email">;
export type super_userOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    _count?: Prisma.super_userCountOrderByAggregateInput;
    _avg?: Prisma.super_userAvgOrderByAggregateInput;
    _max?: Prisma.super_userMaxOrderByAggregateInput;
    _min?: Prisma.super_userMinOrderByAggregateInput;
    _sum?: Prisma.super_userSumOrderByAggregateInput;
};
export type super_userScalarWhereWithAggregatesInput = {
    AND?: Prisma.super_userScalarWhereWithAggregatesInput | Prisma.super_userScalarWhereWithAggregatesInput[];
    OR?: Prisma.super_userScalarWhereWithAggregatesInput[];
    NOT?: Prisma.super_userScalarWhereWithAggregatesInput | Prisma.super_userScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"super_user"> | number;
    email?: Prisma.StringWithAggregatesFilter<"super_user"> | string;
    password?: Prisma.StringWithAggregatesFilter<"super_user"> | string;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"super_user"> | Date | string;
    updated_at?: Prisma.DateTimeWithAggregatesFilter<"super_user"> | Date | string;
};
export type super_userCreateInput = {
    email: string;
    password: string;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type super_userUncheckedCreateInput = {
    id?: number;
    email: string;
    password: string;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type super_userUpdateInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type super_userUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type super_userCreateManyInput = {
    id?: number;
    email: string;
    password: string;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type super_userUpdateManyMutationInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type super_userUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type super_userCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type super_userAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type super_userMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type super_userMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type super_userSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type super_userSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["super_user"]>;
export type super_userSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["super_user"]>;
export type super_userSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["super_user"]>;
export type super_userSelectScalar = {
    id?: boolean;
    email?: boolean;
    password?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type super_userOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "password" | "created_at" | "updated_at", ExtArgs["result"]["super_user"]>;
export type $super_userPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "super_user";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        email: string;
        password: string;
        created_at: Date;
        updated_at: Date;
    }, ExtArgs["result"]["super_user"]>;
    composites: {};
};
export type super_userGetPayload<S extends boolean | null | undefined | super_userDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$super_userPayload, S>;
export type super_userCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<super_userFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Super_userCountAggregateInputType | true;
};
export interface super_userDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['super_user'];
        meta: {
            name: 'super_user';
        };
    };
    findUnique<T extends super_userFindUniqueArgs>(args: Prisma.SelectSubset<T, super_userFindUniqueArgs<ExtArgs>>): Prisma.Prisma__super_userClient<runtime.Types.Result.GetResult<Prisma.$super_userPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends super_userFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, super_userFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__super_userClient<runtime.Types.Result.GetResult<Prisma.$super_userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends super_userFindFirstArgs>(args?: Prisma.SelectSubset<T, super_userFindFirstArgs<ExtArgs>>): Prisma.Prisma__super_userClient<runtime.Types.Result.GetResult<Prisma.$super_userPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends super_userFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, super_userFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__super_userClient<runtime.Types.Result.GetResult<Prisma.$super_userPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends super_userFindManyArgs>(args?: Prisma.SelectSubset<T, super_userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$super_userPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends super_userCreateArgs>(args: Prisma.SelectSubset<T, super_userCreateArgs<ExtArgs>>): Prisma.Prisma__super_userClient<runtime.Types.Result.GetResult<Prisma.$super_userPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends super_userCreateManyArgs>(args?: Prisma.SelectSubset<T, super_userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends super_userCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, super_userCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$super_userPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends super_userDeleteArgs>(args: Prisma.SelectSubset<T, super_userDeleteArgs<ExtArgs>>): Prisma.Prisma__super_userClient<runtime.Types.Result.GetResult<Prisma.$super_userPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends super_userUpdateArgs>(args: Prisma.SelectSubset<T, super_userUpdateArgs<ExtArgs>>): Prisma.Prisma__super_userClient<runtime.Types.Result.GetResult<Prisma.$super_userPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends super_userDeleteManyArgs>(args?: Prisma.SelectSubset<T, super_userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends super_userUpdateManyArgs>(args: Prisma.SelectSubset<T, super_userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends super_userUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, super_userUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$super_userPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends super_userUpsertArgs>(args: Prisma.SelectSubset<T, super_userUpsertArgs<ExtArgs>>): Prisma.Prisma__super_userClient<runtime.Types.Result.GetResult<Prisma.$super_userPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends super_userCountArgs>(args?: Prisma.Subset<T, super_userCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Super_userCountAggregateOutputType> : number>;
    aggregate<T extends Super_userAggregateArgs>(args: Prisma.Subset<T, Super_userAggregateArgs>): Prisma.PrismaPromise<GetSuper_userAggregateType<T>>;
    groupBy<T extends super_userGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: super_userGroupByArgs['orderBy'];
    } : {
        orderBy?: super_userGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, super_userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSuper_userGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: super_userFieldRefs;
}
export interface Prisma__super_userClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface super_userFieldRefs {
    readonly id: Prisma.FieldRef<"super_user", 'Int'>;
    readonly email: Prisma.FieldRef<"super_user", 'String'>;
    readonly password: Prisma.FieldRef<"super_user", 'String'>;
    readonly created_at: Prisma.FieldRef<"super_user", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"super_user", 'DateTime'>;
}
export type super_userFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.super_userSelect<ExtArgs> | null;
    omit?: Prisma.super_userOmit<ExtArgs> | null;
    where: Prisma.super_userWhereUniqueInput;
};
export type super_userFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.super_userSelect<ExtArgs> | null;
    omit?: Prisma.super_userOmit<ExtArgs> | null;
    where: Prisma.super_userWhereUniqueInput;
};
export type super_userFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.super_userSelect<ExtArgs> | null;
    omit?: Prisma.super_userOmit<ExtArgs> | null;
    where?: Prisma.super_userWhereInput;
    orderBy?: Prisma.super_userOrderByWithRelationInput | Prisma.super_userOrderByWithRelationInput[];
    cursor?: Prisma.super_userWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Super_userScalarFieldEnum | Prisma.Super_userScalarFieldEnum[];
};
export type super_userFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.super_userSelect<ExtArgs> | null;
    omit?: Prisma.super_userOmit<ExtArgs> | null;
    where?: Prisma.super_userWhereInput;
    orderBy?: Prisma.super_userOrderByWithRelationInput | Prisma.super_userOrderByWithRelationInput[];
    cursor?: Prisma.super_userWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Super_userScalarFieldEnum | Prisma.Super_userScalarFieldEnum[];
};
export type super_userFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.super_userSelect<ExtArgs> | null;
    omit?: Prisma.super_userOmit<ExtArgs> | null;
    where?: Prisma.super_userWhereInput;
    orderBy?: Prisma.super_userOrderByWithRelationInput | Prisma.super_userOrderByWithRelationInput[];
    cursor?: Prisma.super_userWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Super_userScalarFieldEnum | Prisma.Super_userScalarFieldEnum[];
};
export type super_userCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.super_userSelect<ExtArgs> | null;
    omit?: Prisma.super_userOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.super_userCreateInput, Prisma.super_userUncheckedCreateInput>;
};
export type super_userCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.super_userCreateManyInput | Prisma.super_userCreateManyInput[];
    skipDuplicates?: boolean;
};
export type super_userCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.super_userSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.super_userOmit<ExtArgs> | null;
    data: Prisma.super_userCreateManyInput | Prisma.super_userCreateManyInput[];
    skipDuplicates?: boolean;
};
export type super_userUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.super_userSelect<ExtArgs> | null;
    omit?: Prisma.super_userOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.super_userUpdateInput, Prisma.super_userUncheckedUpdateInput>;
    where: Prisma.super_userWhereUniqueInput;
};
export type super_userUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.super_userUpdateManyMutationInput, Prisma.super_userUncheckedUpdateManyInput>;
    where?: Prisma.super_userWhereInput;
    limit?: number;
};
export type super_userUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.super_userSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.super_userOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.super_userUpdateManyMutationInput, Prisma.super_userUncheckedUpdateManyInput>;
    where?: Prisma.super_userWhereInput;
    limit?: number;
};
export type super_userUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.super_userSelect<ExtArgs> | null;
    omit?: Prisma.super_userOmit<ExtArgs> | null;
    where: Prisma.super_userWhereUniqueInput;
    create: Prisma.XOR<Prisma.super_userCreateInput, Prisma.super_userUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.super_userUpdateInput, Prisma.super_userUncheckedUpdateInput>;
};
export type super_userDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.super_userSelect<ExtArgs> | null;
    omit?: Prisma.super_userOmit<ExtArgs> | null;
    where: Prisma.super_userWhereUniqueInput;
};
export type super_userDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.super_userWhereInput;
    limit?: number;
};
export type super_userDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.super_userSelect<ExtArgs> | null;
    omit?: Prisma.super_userOmit<ExtArgs> | null;
};
