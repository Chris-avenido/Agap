import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type command_center_userModel = runtime.Types.Result.DefaultSelection<Prisma.$command_center_userPayload>;
export type AggregateCommand_center_user = {
    _count: Command_center_userCountAggregateOutputType | null;
    _min: Command_center_userMinAggregateOutputType | null;
    _max: Command_center_userMaxAggregateOutputType | null;
};
export type Command_center_userMinAggregateOutputType = {
    uid: string | null;
    name: string | null;
    designation: string | null;
    role: string | null;
    created_at: Date | null;
};
export type Command_center_userMaxAggregateOutputType = {
    uid: string | null;
    name: string | null;
    designation: string | null;
    role: string | null;
    created_at: Date | null;
};
export type Command_center_userCountAggregateOutputType = {
    uid: number;
    name: number;
    designation: number;
    role: number;
    created_at: number;
    _all: number;
};
export type Command_center_userMinAggregateInputType = {
    uid?: true;
    name?: true;
    designation?: true;
    role?: true;
    created_at?: true;
};
export type Command_center_userMaxAggregateInputType = {
    uid?: true;
    name?: true;
    designation?: true;
    role?: true;
    created_at?: true;
};
export type Command_center_userCountAggregateInputType = {
    uid?: true;
    name?: true;
    designation?: true;
    role?: true;
    created_at?: true;
    _all?: true;
};
export type Command_center_userAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.command_center_userWhereInput;
    orderBy?: Prisma.command_center_userOrderByWithRelationInput | Prisma.command_center_userOrderByWithRelationInput[];
    cursor?: Prisma.command_center_userWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Command_center_userCountAggregateInputType;
    _min?: Command_center_userMinAggregateInputType;
    _max?: Command_center_userMaxAggregateInputType;
};
export type GetCommand_center_userAggregateType<T extends Command_center_userAggregateArgs> = {
    [P in keyof T & keyof AggregateCommand_center_user]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCommand_center_user[P]> : Prisma.GetScalarType<T[P], AggregateCommand_center_user[P]>;
};
export type command_center_userGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.command_center_userWhereInput;
    orderBy?: Prisma.command_center_userOrderByWithAggregationInput | Prisma.command_center_userOrderByWithAggregationInput[];
    by: Prisma.Command_center_userScalarFieldEnum[] | Prisma.Command_center_userScalarFieldEnum;
    having?: Prisma.command_center_userScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Command_center_userCountAggregateInputType | true;
    _min?: Command_center_userMinAggregateInputType;
    _max?: Command_center_userMaxAggregateInputType;
};
export type Command_center_userGroupByOutputType = {
    uid: string;
    name: string;
    designation: string | null;
    role: string | null;
    created_at: Date | null;
    _count: Command_center_userCountAggregateOutputType | null;
    _min: Command_center_userMinAggregateOutputType | null;
    _max: Command_center_userMaxAggregateOutputType | null;
};
export type GetCommand_center_userGroupByPayload<T extends command_center_userGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Command_center_userGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Command_center_userGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Command_center_userGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Command_center_userGroupByOutputType[P]>;
}>>;
export type command_center_userWhereInput = {
    AND?: Prisma.command_center_userWhereInput | Prisma.command_center_userWhereInput[];
    OR?: Prisma.command_center_userWhereInput[];
    NOT?: Prisma.command_center_userWhereInput | Prisma.command_center_userWhereInput[];
    uid?: Prisma.StringFilter<"command_center_user"> | string;
    name?: Prisma.StringFilter<"command_center_user"> | string;
    designation?: Prisma.StringNullableFilter<"command_center_user"> | string | null;
    role?: Prisma.StringNullableFilter<"command_center_user"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"command_center_user"> | Date | string | null;
};
export type command_center_userOrderByWithRelationInput = {
    uid?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    designation?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type command_center_userWhereUniqueInput = Prisma.AtLeast<{
    uid?: string;
    AND?: Prisma.command_center_userWhereInput | Prisma.command_center_userWhereInput[];
    OR?: Prisma.command_center_userWhereInput[];
    NOT?: Prisma.command_center_userWhereInput | Prisma.command_center_userWhereInput[];
    name?: Prisma.StringFilter<"command_center_user"> | string;
    designation?: Prisma.StringNullableFilter<"command_center_user"> | string | null;
    role?: Prisma.StringNullableFilter<"command_center_user"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"command_center_user"> | Date | string | null;
}, "uid">;
export type command_center_userOrderByWithAggregationInput = {
    uid?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    designation?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.command_center_userCountOrderByAggregateInput;
    _max?: Prisma.command_center_userMaxOrderByAggregateInput;
    _min?: Prisma.command_center_userMinOrderByAggregateInput;
};
export type command_center_userScalarWhereWithAggregatesInput = {
    AND?: Prisma.command_center_userScalarWhereWithAggregatesInput | Prisma.command_center_userScalarWhereWithAggregatesInput[];
    OR?: Prisma.command_center_userScalarWhereWithAggregatesInput[];
    NOT?: Prisma.command_center_userScalarWhereWithAggregatesInput | Prisma.command_center_userScalarWhereWithAggregatesInput[];
    uid?: Prisma.StringWithAggregatesFilter<"command_center_user"> | string;
    name?: Prisma.StringWithAggregatesFilter<"command_center_user"> | string;
    designation?: Prisma.StringNullableWithAggregatesFilter<"command_center_user"> | string | null;
    role?: Prisma.StringNullableWithAggregatesFilter<"command_center_user"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"command_center_user"> | Date | string | null;
};
export type command_center_userCreateInput = {
    uid: string;
    name: string;
    designation?: string | null;
    role?: string | null;
    created_at?: Date | string | null;
};
export type command_center_userUncheckedCreateInput = {
    uid: string;
    name: string;
    designation?: string | null;
    role?: string | null;
    created_at?: Date | string | null;
};
export type command_center_userUpdateInput = {
    uid?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    designation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type command_center_userUncheckedUpdateInput = {
    uid?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    designation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type command_center_userCreateManyInput = {
    uid: string;
    name: string;
    designation?: string | null;
    role?: string | null;
    created_at?: Date | string | null;
};
export type command_center_userUpdateManyMutationInput = {
    uid?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    designation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type command_center_userUncheckedUpdateManyInput = {
    uid?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    designation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type command_center_userCountOrderByAggregateInput = {
    uid?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    designation?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type command_center_userMaxOrderByAggregateInput = {
    uid?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    designation?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type command_center_userMinOrderByAggregateInput = {
    uid?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    designation?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type command_center_userSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    uid?: boolean;
    name?: boolean;
    designation?: boolean;
    role?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["command_center_user"]>;
export type command_center_userSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    uid?: boolean;
    name?: boolean;
    designation?: boolean;
    role?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["command_center_user"]>;
export type command_center_userSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    uid?: boolean;
    name?: boolean;
    designation?: boolean;
    role?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["command_center_user"]>;
export type command_center_userSelectScalar = {
    uid?: boolean;
    name?: boolean;
    designation?: boolean;
    role?: boolean;
    created_at?: boolean;
};
export type command_center_userOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"uid" | "name" | "designation" | "role" | "created_at", ExtArgs["result"]["command_center_user"]>;
export type $command_center_userPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "command_center_user";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        uid: string;
        name: string;
        designation: string | null;
        role: string | null;
        created_at: Date | null;
    }, ExtArgs["result"]["command_center_user"]>;
    composites: {};
};
export type command_center_userGetPayload<S extends boolean | null | undefined | command_center_userDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$command_center_userPayload, S>;
export type command_center_userCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<command_center_userFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Command_center_userCountAggregateInputType | true;
};
export interface command_center_userDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['command_center_user'];
        meta: {
            name: 'command_center_user';
        };
    };
    findUnique<T extends command_center_userFindUniqueArgs>(args: Prisma.SelectSubset<T, command_center_userFindUniqueArgs<ExtArgs>>): Prisma.Prisma__command_center_userClient<runtime.Types.Result.GetResult<Prisma.$command_center_userPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends command_center_userFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, command_center_userFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__command_center_userClient<runtime.Types.Result.GetResult<Prisma.$command_center_userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends command_center_userFindFirstArgs>(args?: Prisma.SelectSubset<T, command_center_userFindFirstArgs<ExtArgs>>): Prisma.Prisma__command_center_userClient<runtime.Types.Result.GetResult<Prisma.$command_center_userPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends command_center_userFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, command_center_userFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__command_center_userClient<runtime.Types.Result.GetResult<Prisma.$command_center_userPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends command_center_userFindManyArgs>(args?: Prisma.SelectSubset<T, command_center_userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$command_center_userPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends command_center_userCreateArgs>(args: Prisma.SelectSubset<T, command_center_userCreateArgs<ExtArgs>>): Prisma.Prisma__command_center_userClient<runtime.Types.Result.GetResult<Prisma.$command_center_userPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends command_center_userCreateManyArgs>(args?: Prisma.SelectSubset<T, command_center_userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends command_center_userCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, command_center_userCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$command_center_userPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends command_center_userDeleteArgs>(args: Prisma.SelectSubset<T, command_center_userDeleteArgs<ExtArgs>>): Prisma.Prisma__command_center_userClient<runtime.Types.Result.GetResult<Prisma.$command_center_userPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends command_center_userUpdateArgs>(args: Prisma.SelectSubset<T, command_center_userUpdateArgs<ExtArgs>>): Prisma.Prisma__command_center_userClient<runtime.Types.Result.GetResult<Prisma.$command_center_userPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends command_center_userDeleteManyArgs>(args?: Prisma.SelectSubset<T, command_center_userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends command_center_userUpdateManyArgs>(args: Prisma.SelectSubset<T, command_center_userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends command_center_userUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, command_center_userUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$command_center_userPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends command_center_userUpsertArgs>(args: Prisma.SelectSubset<T, command_center_userUpsertArgs<ExtArgs>>): Prisma.Prisma__command_center_userClient<runtime.Types.Result.GetResult<Prisma.$command_center_userPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends command_center_userCountArgs>(args?: Prisma.Subset<T, command_center_userCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Command_center_userCountAggregateOutputType> : number>;
    aggregate<T extends Command_center_userAggregateArgs>(args: Prisma.Subset<T, Command_center_userAggregateArgs>): Prisma.PrismaPromise<GetCommand_center_userAggregateType<T>>;
    groupBy<T extends command_center_userGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: command_center_userGroupByArgs['orderBy'];
    } : {
        orderBy?: command_center_userGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, command_center_userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommand_center_userGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: command_center_userFieldRefs;
}
export interface Prisma__command_center_userClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface command_center_userFieldRefs {
    readonly uid: Prisma.FieldRef<"command_center_user", 'String'>;
    readonly name: Prisma.FieldRef<"command_center_user", 'String'>;
    readonly designation: Prisma.FieldRef<"command_center_user", 'String'>;
    readonly role: Prisma.FieldRef<"command_center_user", 'String'>;
    readonly created_at: Prisma.FieldRef<"command_center_user", 'DateTime'>;
}
export type command_center_userFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.command_center_userSelect<ExtArgs> | null;
    omit?: Prisma.command_center_userOmit<ExtArgs> | null;
    where: Prisma.command_center_userWhereUniqueInput;
};
export type command_center_userFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.command_center_userSelect<ExtArgs> | null;
    omit?: Prisma.command_center_userOmit<ExtArgs> | null;
    where: Prisma.command_center_userWhereUniqueInput;
};
export type command_center_userFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.command_center_userSelect<ExtArgs> | null;
    omit?: Prisma.command_center_userOmit<ExtArgs> | null;
    where?: Prisma.command_center_userWhereInput;
    orderBy?: Prisma.command_center_userOrderByWithRelationInput | Prisma.command_center_userOrderByWithRelationInput[];
    cursor?: Prisma.command_center_userWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Command_center_userScalarFieldEnum | Prisma.Command_center_userScalarFieldEnum[];
};
export type command_center_userFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.command_center_userSelect<ExtArgs> | null;
    omit?: Prisma.command_center_userOmit<ExtArgs> | null;
    where?: Prisma.command_center_userWhereInput;
    orderBy?: Prisma.command_center_userOrderByWithRelationInput | Prisma.command_center_userOrderByWithRelationInput[];
    cursor?: Prisma.command_center_userWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Command_center_userScalarFieldEnum | Prisma.Command_center_userScalarFieldEnum[];
};
export type command_center_userFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.command_center_userSelect<ExtArgs> | null;
    omit?: Prisma.command_center_userOmit<ExtArgs> | null;
    where?: Prisma.command_center_userWhereInput;
    orderBy?: Prisma.command_center_userOrderByWithRelationInput | Prisma.command_center_userOrderByWithRelationInput[];
    cursor?: Prisma.command_center_userWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Command_center_userScalarFieldEnum | Prisma.Command_center_userScalarFieldEnum[];
};
export type command_center_userCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.command_center_userSelect<ExtArgs> | null;
    omit?: Prisma.command_center_userOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.command_center_userCreateInput, Prisma.command_center_userUncheckedCreateInput>;
};
export type command_center_userCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.command_center_userCreateManyInput | Prisma.command_center_userCreateManyInput[];
    skipDuplicates?: boolean;
};
export type command_center_userCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.command_center_userSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.command_center_userOmit<ExtArgs> | null;
    data: Prisma.command_center_userCreateManyInput | Prisma.command_center_userCreateManyInput[];
    skipDuplicates?: boolean;
};
export type command_center_userUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.command_center_userSelect<ExtArgs> | null;
    omit?: Prisma.command_center_userOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.command_center_userUpdateInput, Prisma.command_center_userUncheckedUpdateInput>;
    where: Prisma.command_center_userWhereUniqueInput;
};
export type command_center_userUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.command_center_userUpdateManyMutationInput, Prisma.command_center_userUncheckedUpdateManyInput>;
    where?: Prisma.command_center_userWhereInput;
    limit?: number;
};
export type command_center_userUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.command_center_userSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.command_center_userOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.command_center_userUpdateManyMutationInput, Prisma.command_center_userUncheckedUpdateManyInput>;
    where?: Prisma.command_center_userWhereInput;
    limit?: number;
};
export type command_center_userUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.command_center_userSelect<ExtArgs> | null;
    omit?: Prisma.command_center_userOmit<ExtArgs> | null;
    where: Prisma.command_center_userWhereUniqueInput;
    create: Prisma.XOR<Prisma.command_center_userCreateInput, Prisma.command_center_userUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.command_center_userUpdateInput, Prisma.command_center_userUncheckedUpdateInput>;
};
export type command_center_userDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.command_center_userSelect<ExtArgs> | null;
    omit?: Prisma.command_center_userOmit<ExtArgs> | null;
    where: Prisma.command_center_userWhereUniqueInput;
};
export type command_center_userDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.command_center_userWhereInput;
    limit?: number;
};
export type command_center_userDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.command_center_userSelect<ExtArgs> | null;
    omit?: Prisma.command_center_userOmit<ExtArgs> | null;
};
