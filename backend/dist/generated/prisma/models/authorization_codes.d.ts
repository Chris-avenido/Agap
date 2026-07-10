import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type authorization_codesModel = runtime.Types.Result.DefaultSelection<Prisma.$authorization_codesPayload>;
export type AggregateAuthorization_codes = {
    _count: Authorization_codesCountAggregateOutputType | null;
    _avg: Authorization_codesAvgAggregateOutputType | null;
    _sum: Authorization_codesSumAggregateOutputType | null;
    _min: Authorization_codesMinAggregateOutputType | null;
    _max: Authorization_codesMaxAggregateOutputType | null;
};
export type Authorization_codesAvgAggregateOutputType = {
    id: number | null;
};
export type Authorization_codesSumAggregateOutputType = {
    id: number | null;
};
export type Authorization_codesMinAggregateOutputType = {
    id: number | null;
    code: string | null;
    role: string | null;
    is_active: boolean | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Authorization_codesMaxAggregateOutputType = {
    id: number | null;
    code: string | null;
    role: string | null;
    is_active: boolean | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Authorization_codesCountAggregateOutputType = {
    id: number;
    code: number;
    role: number;
    is_active: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Authorization_codesAvgAggregateInputType = {
    id?: true;
};
export type Authorization_codesSumAggregateInputType = {
    id?: true;
};
export type Authorization_codesMinAggregateInputType = {
    id?: true;
    code?: true;
    role?: true;
    is_active?: true;
    created_at?: true;
    updated_at?: true;
};
export type Authorization_codesMaxAggregateInputType = {
    id?: true;
    code?: true;
    role?: true;
    is_active?: true;
    created_at?: true;
    updated_at?: true;
};
export type Authorization_codesCountAggregateInputType = {
    id?: true;
    code?: true;
    role?: true;
    is_active?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Authorization_codesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.authorization_codesWhereInput;
    orderBy?: Prisma.authorization_codesOrderByWithRelationInput | Prisma.authorization_codesOrderByWithRelationInput[];
    cursor?: Prisma.authorization_codesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Authorization_codesCountAggregateInputType;
    _avg?: Authorization_codesAvgAggregateInputType;
    _sum?: Authorization_codesSumAggregateInputType;
    _min?: Authorization_codesMinAggregateInputType;
    _max?: Authorization_codesMaxAggregateInputType;
};
export type GetAuthorization_codesAggregateType<T extends Authorization_codesAggregateArgs> = {
    [P in keyof T & keyof AggregateAuthorization_codes]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAuthorization_codes[P]> : Prisma.GetScalarType<T[P], AggregateAuthorization_codes[P]>;
};
export type authorization_codesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.authorization_codesWhereInput;
    orderBy?: Prisma.authorization_codesOrderByWithAggregationInput | Prisma.authorization_codesOrderByWithAggregationInput[];
    by: Prisma.Authorization_codesScalarFieldEnum[] | Prisma.Authorization_codesScalarFieldEnum;
    having?: Prisma.authorization_codesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Authorization_codesCountAggregateInputType | true;
    _avg?: Authorization_codesAvgAggregateInputType;
    _sum?: Authorization_codesSumAggregateInputType;
    _min?: Authorization_codesMinAggregateInputType;
    _max?: Authorization_codesMaxAggregateInputType;
};
export type Authorization_codesGroupByOutputType = {
    id: number;
    code: string;
    role: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
    _count: Authorization_codesCountAggregateOutputType | null;
    _avg: Authorization_codesAvgAggregateOutputType | null;
    _sum: Authorization_codesSumAggregateOutputType | null;
    _min: Authorization_codesMinAggregateOutputType | null;
    _max: Authorization_codesMaxAggregateOutputType | null;
};
export type GetAuthorization_codesGroupByPayload<T extends authorization_codesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Authorization_codesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Authorization_codesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Authorization_codesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Authorization_codesGroupByOutputType[P]>;
}>>;
export type authorization_codesWhereInput = {
    AND?: Prisma.authorization_codesWhereInput | Prisma.authorization_codesWhereInput[];
    OR?: Prisma.authorization_codesWhereInput[];
    NOT?: Prisma.authorization_codesWhereInput | Prisma.authorization_codesWhereInput[];
    id?: Prisma.IntFilter<"authorization_codes"> | number;
    code?: Prisma.StringFilter<"authorization_codes"> | string;
    role?: Prisma.StringFilter<"authorization_codes"> | string;
    is_active?: Prisma.BoolFilter<"authorization_codes"> | boolean;
    created_at?: Prisma.DateTimeFilter<"authorization_codes"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"authorization_codes"> | Date | string;
};
export type authorization_codesOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    is_active?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type authorization_codesWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    code?: string;
    AND?: Prisma.authorization_codesWhereInput | Prisma.authorization_codesWhereInput[];
    OR?: Prisma.authorization_codesWhereInput[];
    NOT?: Prisma.authorization_codesWhereInput | Prisma.authorization_codesWhereInput[];
    role?: Prisma.StringFilter<"authorization_codes"> | string;
    is_active?: Prisma.BoolFilter<"authorization_codes"> | boolean;
    created_at?: Prisma.DateTimeFilter<"authorization_codes"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"authorization_codes"> | Date | string;
}, "id" | "code">;
export type authorization_codesOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    is_active?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    _count?: Prisma.authorization_codesCountOrderByAggregateInput;
    _avg?: Prisma.authorization_codesAvgOrderByAggregateInput;
    _max?: Prisma.authorization_codesMaxOrderByAggregateInput;
    _min?: Prisma.authorization_codesMinOrderByAggregateInput;
    _sum?: Prisma.authorization_codesSumOrderByAggregateInput;
};
export type authorization_codesScalarWhereWithAggregatesInput = {
    AND?: Prisma.authorization_codesScalarWhereWithAggregatesInput | Prisma.authorization_codesScalarWhereWithAggregatesInput[];
    OR?: Prisma.authorization_codesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.authorization_codesScalarWhereWithAggregatesInput | Prisma.authorization_codesScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"authorization_codes"> | number;
    code?: Prisma.StringWithAggregatesFilter<"authorization_codes"> | string;
    role?: Prisma.StringWithAggregatesFilter<"authorization_codes"> | string;
    is_active?: Prisma.BoolWithAggregatesFilter<"authorization_codes"> | boolean;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"authorization_codes"> | Date | string;
    updated_at?: Prisma.DateTimeWithAggregatesFilter<"authorization_codes"> | Date | string;
};
export type authorization_codesCreateInput = {
    code: string;
    role: string;
    is_active?: boolean;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type authorization_codesUncheckedCreateInput = {
    id?: number;
    code: string;
    role: string;
    is_active?: boolean;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type authorization_codesUpdateInput = {
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    is_active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type authorization_codesUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    is_active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type authorization_codesCreateManyInput = {
    id?: number;
    code: string;
    role: string;
    is_active?: boolean;
    created_at?: Date | string;
    updated_at?: Date | string;
};
export type authorization_codesUpdateManyMutationInput = {
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    is_active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type authorization_codesUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    is_active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type authorization_codesCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    is_active?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type authorization_codesAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type authorization_codesMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    is_active?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type authorization_codesMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    is_active?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type authorization_codesSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type authorization_codesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    role?: boolean;
    is_active?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["authorization_codes"]>;
export type authorization_codesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    role?: boolean;
    is_active?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["authorization_codes"]>;
export type authorization_codesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    role?: boolean;
    is_active?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["authorization_codes"]>;
export type authorization_codesSelectScalar = {
    id?: boolean;
    code?: boolean;
    role?: boolean;
    is_active?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type authorization_codesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "code" | "role" | "is_active" | "created_at" | "updated_at", ExtArgs["result"]["authorization_codes"]>;
export type $authorization_codesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "authorization_codes";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        code: string;
        role: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
    }, ExtArgs["result"]["authorization_codes"]>;
    composites: {};
};
export type authorization_codesGetPayload<S extends boolean | null | undefined | authorization_codesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$authorization_codesPayload, S>;
export type authorization_codesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<authorization_codesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Authorization_codesCountAggregateInputType | true;
};
export interface authorization_codesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['authorization_codes'];
        meta: {
            name: 'authorization_codes';
        };
    };
    findUnique<T extends authorization_codesFindUniqueArgs>(args: Prisma.SelectSubset<T, authorization_codesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__authorization_codesClient<runtime.Types.Result.GetResult<Prisma.$authorization_codesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends authorization_codesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, authorization_codesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__authorization_codesClient<runtime.Types.Result.GetResult<Prisma.$authorization_codesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends authorization_codesFindFirstArgs>(args?: Prisma.SelectSubset<T, authorization_codesFindFirstArgs<ExtArgs>>): Prisma.Prisma__authorization_codesClient<runtime.Types.Result.GetResult<Prisma.$authorization_codesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends authorization_codesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, authorization_codesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__authorization_codesClient<runtime.Types.Result.GetResult<Prisma.$authorization_codesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends authorization_codesFindManyArgs>(args?: Prisma.SelectSubset<T, authorization_codesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$authorization_codesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends authorization_codesCreateArgs>(args: Prisma.SelectSubset<T, authorization_codesCreateArgs<ExtArgs>>): Prisma.Prisma__authorization_codesClient<runtime.Types.Result.GetResult<Prisma.$authorization_codesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends authorization_codesCreateManyArgs>(args?: Prisma.SelectSubset<T, authorization_codesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends authorization_codesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, authorization_codesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$authorization_codesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends authorization_codesDeleteArgs>(args: Prisma.SelectSubset<T, authorization_codesDeleteArgs<ExtArgs>>): Prisma.Prisma__authorization_codesClient<runtime.Types.Result.GetResult<Prisma.$authorization_codesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends authorization_codesUpdateArgs>(args: Prisma.SelectSubset<T, authorization_codesUpdateArgs<ExtArgs>>): Prisma.Prisma__authorization_codesClient<runtime.Types.Result.GetResult<Prisma.$authorization_codesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends authorization_codesDeleteManyArgs>(args?: Prisma.SelectSubset<T, authorization_codesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends authorization_codesUpdateManyArgs>(args: Prisma.SelectSubset<T, authorization_codesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends authorization_codesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, authorization_codesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$authorization_codesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends authorization_codesUpsertArgs>(args: Prisma.SelectSubset<T, authorization_codesUpsertArgs<ExtArgs>>): Prisma.Prisma__authorization_codesClient<runtime.Types.Result.GetResult<Prisma.$authorization_codesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends authorization_codesCountArgs>(args?: Prisma.Subset<T, authorization_codesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Authorization_codesCountAggregateOutputType> : number>;
    aggregate<T extends Authorization_codesAggregateArgs>(args: Prisma.Subset<T, Authorization_codesAggregateArgs>): Prisma.PrismaPromise<GetAuthorization_codesAggregateType<T>>;
    groupBy<T extends authorization_codesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: authorization_codesGroupByArgs['orderBy'];
    } : {
        orderBy?: authorization_codesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, authorization_codesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthorization_codesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: authorization_codesFieldRefs;
}
export interface Prisma__authorization_codesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface authorization_codesFieldRefs {
    readonly id: Prisma.FieldRef<"authorization_codes", 'Int'>;
    readonly code: Prisma.FieldRef<"authorization_codes", 'String'>;
    readonly role: Prisma.FieldRef<"authorization_codes", 'String'>;
    readonly is_active: Prisma.FieldRef<"authorization_codes", 'Boolean'>;
    readonly created_at: Prisma.FieldRef<"authorization_codes", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"authorization_codes", 'DateTime'>;
}
export type authorization_codesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.authorization_codesSelect<ExtArgs> | null;
    omit?: Prisma.authorization_codesOmit<ExtArgs> | null;
    where: Prisma.authorization_codesWhereUniqueInput;
};
export type authorization_codesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.authorization_codesSelect<ExtArgs> | null;
    omit?: Prisma.authorization_codesOmit<ExtArgs> | null;
    where: Prisma.authorization_codesWhereUniqueInput;
};
export type authorization_codesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.authorization_codesSelect<ExtArgs> | null;
    omit?: Prisma.authorization_codesOmit<ExtArgs> | null;
    where?: Prisma.authorization_codesWhereInput;
    orderBy?: Prisma.authorization_codesOrderByWithRelationInput | Prisma.authorization_codesOrderByWithRelationInput[];
    cursor?: Prisma.authorization_codesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Authorization_codesScalarFieldEnum | Prisma.Authorization_codesScalarFieldEnum[];
};
export type authorization_codesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.authorization_codesSelect<ExtArgs> | null;
    omit?: Prisma.authorization_codesOmit<ExtArgs> | null;
    where?: Prisma.authorization_codesWhereInput;
    orderBy?: Prisma.authorization_codesOrderByWithRelationInput | Prisma.authorization_codesOrderByWithRelationInput[];
    cursor?: Prisma.authorization_codesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Authorization_codesScalarFieldEnum | Prisma.Authorization_codesScalarFieldEnum[];
};
export type authorization_codesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.authorization_codesSelect<ExtArgs> | null;
    omit?: Prisma.authorization_codesOmit<ExtArgs> | null;
    where?: Prisma.authorization_codesWhereInput;
    orderBy?: Prisma.authorization_codesOrderByWithRelationInput | Prisma.authorization_codesOrderByWithRelationInput[];
    cursor?: Prisma.authorization_codesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Authorization_codesScalarFieldEnum | Prisma.Authorization_codesScalarFieldEnum[];
};
export type authorization_codesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.authorization_codesSelect<ExtArgs> | null;
    omit?: Prisma.authorization_codesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.authorization_codesCreateInput, Prisma.authorization_codesUncheckedCreateInput>;
};
export type authorization_codesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.authorization_codesCreateManyInput | Prisma.authorization_codesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type authorization_codesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.authorization_codesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.authorization_codesOmit<ExtArgs> | null;
    data: Prisma.authorization_codesCreateManyInput | Prisma.authorization_codesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type authorization_codesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.authorization_codesSelect<ExtArgs> | null;
    omit?: Prisma.authorization_codesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.authorization_codesUpdateInput, Prisma.authorization_codesUncheckedUpdateInput>;
    where: Prisma.authorization_codesWhereUniqueInput;
};
export type authorization_codesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.authorization_codesUpdateManyMutationInput, Prisma.authorization_codesUncheckedUpdateManyInput>;
    where?: Prisma.authorization_codesWhereInput;
    limit?: number;
};
export type authorization_codesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.authorization_codesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.authorization_codesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.authorization_codesUpdateManyMutationInput, Prisma.authorization_codesUncheckedUpdateManyInput>;
    where?: Prisma.authorization_codesWhereInput;
    limit?: number;
};
export type authorization_codesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.authorization_codesSelect<ExtArgs> | null;
    omit?: Prisma.authorization_codesOmit<ExtArgs> | null;
    where: Prisma.authorization_codesWhereUniqueInput;
    create: Prisma.XOR<Prisma.authorization_codesCreateInput, Prisma.authorization_codesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.authorization_codesUpdateInput, Prisma.authorization_codesUncheckedUpdateInput>;
};
export type authorization_codesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.authorization_codesSelect<ExtArgs> | null;
    omit?: Prisma.authorization_codesOmit<ExtArgs> | null;
    where: Prisma.authorization_codesWhereUniqueInput;
};
export type authorization_codesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.authorization_codesWhereInput;
    limit?: number;
};
export type authorization_codesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.authorization_codesSelect<ExtArgs> | null;
    omit?: Prisma.authorization_codesOmit<ExtArgs> | null;
};
