import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type verification_codesModel = runtime.Types.Result.DefaultSelection<Prisma.$verification_codesPayload>;
export type AggregateVerification_codes = {
    _count: Verification_codesCountAggregateOutputType | null;
    _min: Verification_codesMinAggregateOutputType | null;
    _max: Verification_codesMaxAggregateOutputType | null;
};
export type Verification_codesMinAggregateOutputType = {
    email: string | null;
    code: string | null;
    expires_at: Date | null;
};
export type Verification_codesMaxAggregateOutputType = {
    email: string | null;
    code: string | null;
    expires_at: Date | null;
};
export type Verification_codesCountAggregateOutputType = {
    email: number;
    code: number;
    expires_at: number;
    _all: number;
};
export type Verification_codesMinAggregateInputType = {
    email?: true;
    code?: true;
    expires_at?: true;
};
export type Verification_codesMaxAggregateInputType = {
    email?: true;
    code?: true;
    expires_at?: true;
};
export type Verification_codesCountAggregateInputType = {
    email?: true;
    code?: true;
    expires_at?: true;
    _all?: true;
};
export type Verification_codesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.verification_codesWhereInput;
    orderBy?: Prisma.verification_codesOrderByWithRelationInput | Prisma.verification_codesOrderByWithRelationInput[];
    cursor?: Prisma.verification_codesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Verification_codesCountAggregateInputType;
    _min?: Verification_codesMinAggregateInputType;
    _max?: Verification_codesMaxAggregateInputType;
};
export type GetVerification_codesAggregateType<T extends Verification_codesAggregateArgs> = {
    [P in keyof T & keyof AggregateVerification_codes]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVerification_codes[P]> : Prisma.GetScalarType<T[P], AggregateVerification_codes[P]>;
};
export type verification_codesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.verification_codesWhereInput;
    orderBy?: Prisma.verification_codesOrderByWithAggregationInput | Prisma.verification_codesOrderByWithAggregationInput[];
    by: Prisma.Verification_codesScalarFieldEnum[] | Prisma.Verification_codesScalarFieldEnum;
    having?: Prisma.verification_codesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Verification_codesCountAggregateInputType | true;
    _min?: Verification_codesMinAggregateInputType;
    _max?: Verification_codesMaxAggregateInputType;
};
export type Verification_codesGroupByOutputType = {
    email: string;
    code: string;
    expires_at: Date | null;
    _count: Verification_codesCountAggregateOutputType | null;
    _min: Verification_codesMinAggregateOutputType | null;
    _max: Verification_codesMaxAggregateOutputType | null;
};
export type GetVerification_codesGroupByPayload<T extends verification_codesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Verification_codesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Verification_codesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Verification_codesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Verification_codesGroupByOutputType[P]>;
}>>;
export type verification_codesWhereInput = {
    AND?: Prisma.verification_codesWhereInput | Prisma.verification_codesWhereInput[];
    OR?: Prisma.verification_codesWhereInput[];
    NOT?: Prisma.verification_codesWhereInput | Prisma.verification_codesWhereInput[];
    email?: Prisma.StringFilter<"verification_codes"> | string;
    code?: Prisma.StringFilter<"verification_codes"> | string;
    expires_at?: Prisma.DateTimeNullableFilter<"verification_codes"> | Date | string | null;
};
export type verification_codesOrderByWithRelationInput = {
    email?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    expires_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type verification_codesWhereUniqueInput = Prisma.AtLeast<{
    email?: string;
    AND?: Prisma.verification_codesWhereInput | Prisma.verification_codesWhereInput[];
    OR?: Prisma.verification_codesWhereInput[];
    NOT?: Prisma.verification_codesWhereInput | Prisma.verification_codesWhereInput[];
    code?: Prisma.StringFilter<"verification_codes"> | string;
    expires_at?: Prisma.DateTimeNullableFilter<"verification_codes"> | Date | string | null;
}, "email">;
export type verification_codesOrderByWithAggregationInput = {
    email?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    expires_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.verification_codesCountOrderByAggregateInput;
    _max?: Prisma.verification_codesMaxOrderByAggregateInput;
    _min?: Prisma.verification_codesMinOrderByAggregateInput;
};
export type verification_codesScalarWhereWithAggregatesInput = {
    AND?: Prisma.verification_codesScalarWhereWithAggregatesInput | Prisma.verification_codesScalarWhereWithAggregatesInput[];
    OR?: Prisma.verification_codesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.verification_codesScalarWhereWithAggregatesInput | Prisma.verification_codesScalarWhereWithAggregatesInput[];
    email?: Prisma.StringWithAggregatesFilter<"verification_codes"> | string;
    code?: Prisma.StringWithAggregatesFilter<"verification_codes"> | string;
    expires_at?: Prisma.DateTimeNullableWithAggregatesFilter<"verification_codes"> | Date | string | null;
};
export type verification_codesCreateInput = {
    email: string;
    code: string;
    expires_at?: Date | string | null;
};
export type verification_codesUncheckedCreateInput = {
    email: string;
    code: string;
    expires_at?: Date | string | null;
};
export type verification_codesUpdateInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expires_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type verification_codesUncheckedUpdateInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expires_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type verification_codesCreateManyInput = {
    email: string;
    code: string;
    expires_at?: Date | string | null;
};
export type verification_codesUpdateManyMutationInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expires_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type verification_codesUncheckedUpdateManyInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    expires_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type verification_codesCountOrderByAggregateInput = {
    email?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    expires_at?: Prisma.SortOrder;
};
export type verification_codesMaxOrderByAggregateInput = {
    email?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    expires_at?: Prisma.SortOrder;
};
export type verification_codesMinOrderByAggregateInput = {
    email?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    expires_at?: Prisma.SortOrder;
};
export type verification_codesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    email?: boolean;
    code?: boolean;
    expires_at?: boolean;
}, ExtArgs["result"]["verification_codes"]>;
export type verification_codesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    email?: boolean;
    code?: boolean;
    expires_at?: boolean;
}, ExtArgs["result"]["verification_codes"]>;
export type verification_codesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    email?: boolean;
    code?: boolean;
    expires_at?: boolean;
}, ExtArgs["result"]["verification_codes"]>;
export type verification_codesSelectScalar = {
    email?: boolean;
    code?: boolean;
    expires_at?: boolean;
};
export type verification_codesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"email" | "code" | "expires_at", ExtArgs["result"]["verification_codes"]>;
export type $verification_codesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "verification_codes";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        email: string;
        code: string;
        expires_at: Date | null;
    }, ExtArgs["result"]["verification_codes"]>;
    composites: {};
};
export type verification_codesGetPayload<S extends boolean | null | undefined | verification_codesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$verification_codesPayload, S>;
export type verification_codesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<verification_codesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Verification_codesCountAggregateInputType | true;
};
export interface verification_codesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['verification_codes'];
        meta: {
            name: 'verification_codes';
        };
    };
    findUnique<T extends verification_codesFindUniqueArgs>(args: Prisma.SelectSubset<T, verification_codesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__verification_codesClient<runtime.Types.Result.GetResult<Prisma.$verification_codesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends verification_codesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, verification_codesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__verification_codesClient<runtime.Types.Result.GetResult<Prisma.$verification_codesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends verification_codesFindFirstArgs>(args?: Prisma.SelectSubset<T, verification_codesFindFirstArgs<ExtArgs>>): Prisma.Prisma__verification_codesClient<runtime.Types.Result.GetResult<Prisma.$verification_codesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends verification_codesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, verification_codesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__verification_codesClient<runtime.Types.Result.GetResult<Prisma.$verification_codesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends verification_codesFindManyArgs>(args?: Prisma.SelectSubset<T, verification_codesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$verification_codesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends verification_codesCreateArgs>(args: Prisma.SelectSubset<T, verification_codesCreateArgs<ExtArgs>>): Prisma.Prisma__verification_codesClient<runtime.Types.Result.GetResult<Prisma.$verification_codesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends verification_codesCreateManyArgs>(args?: Prisma.SelectSubset<T, verification_codesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends verification_codesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, verification_codesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$verification_codesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends verification_codesDeleteArgs>(args: Prisma.SelectSubset<T, verification_codesDeleteArgs<ExtArgs>>): Prisma.Prisma__verification_codesClient<runtime.Types.Result.GetResult<Prisma.$verification_codesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends verification_codesUpdateArgs>(args: Prisma.SelectSubset<T, verification_codesUpdateArgs<ExtArgs>>): Prisma.Prisma__verification_codesClient<runtime.Types.Result.GetResult<Prisma.$verification_codesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends verification_codesDeleteManyArgs>(args?: Prisma.SelectSubset<T, verification_codesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends verification_codesUpdateManyArgs>(args: Prisma.SelectSubset<T, verification_codesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends verification_codesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, verification_codesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$verification_codesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends verification_codesUpsertArgs>(args: Prisma.SelectSubset<T, verification_codesUpsertArgs<ExtArgs>>): Prisma.Prisma__verification_codesClient<runtime.Types.Result.GetResult<Prisma.$verification_codesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends verification_codesCountArgs>(args?: Prisma.Subset<T, verification_codesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Verification_codesCountAggregateOutputType> : number>;
    aggregate<T extends Verification_codesAggregateArgs>(args: Prisma.Subset<T, Verification_codesAggregateArgs>): Prisma.PrismaPromise<GetVerification_codesAggregateType<T>>;
    groupBy<T extends verification_codesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: verification_codesGroupByArgs['orderBy'];
    } : {
        orderBy?: verification_codesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, verification_codesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerification_codesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: verification_codesFieldRefs;
}
export interface Prisma__verification_codesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface verification_codesFieldRefs {
    readonly email: Prisma.FieldRef<"verification_codes", 'String'>;
    readonly code: Prisma.FieldRef<"verification_codes", 'String'>;
    readonly expires_at: Prisma.FieldRef<"verification_codes", 'DateTime'>;
}
export type verification_codesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.verification_codesSelect<ExtArgs> | null;
    omit?: Prisma.verification_codesOmit<ExtArgs> | null;
    where: Prisma.verification_codesWhereUniqueInput;
};
export type verification_codesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.verification_codesSelect<ExtArgs> | null;
    omit?: Prisma.verification_codesOmit<ExtArgs> | null;
    where: Prisma.verification_codesWhereUniqueInput;
};
export type verification_codesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.verification_codesSelect<ExtArgs> | null;
    omit?: Prisma.verification_codesOmit<ExtArgs> | null;
    where?: Prisma.verification_codesWhereInput;
    orderBy?: Prisma.verification_codesOrderByWithRelationInput | Prisma.verification_codesOrderByWithRelationInput[];
    cursor?: Prisma.verification_codesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Verification_codesScalarFieldEnum | Prisma.Verification_codesScalarFieldEnum[];
};
export type verification_codesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.verification_codesSelect<ExtArgs> | null;
    omit?: Prisma.verification_codesOmit<ExtArgs> | null;
    where?: Prisma.verification_codesWhereInput;
    orderBy?: Prisma.verification_codesOrderByWithRelationInput | Prisma.verification_codesOrderByWithRelationInput[];
    cursor?: Prisma.verification_codesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Verification_codesScalarFieldEnum | Prisma.Verification_codesScalarFieldEnum[];
};
export type verification_codesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.verification_codesSelect<ExtArgs> | null;
    omit?: Prisma.verification_codesOmit<ExtArgs> | null;
    where?: Prisma.verification_codesWhereInput;
    orderBy?: Prisma.verification_codesOrderByWithRelationInput | Prisma.verification_codesOrderByWithRelationInput[];
    cursor?: Prisma.verification_codesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Verification_codesScalarFieldEnum | Prisma.Verification_codesScalarFieldEnum[];
};
export type verification_codesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.verification_codesSelect<ExtArgs> | null;
    omit?: Prisma.verification_codesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.verification_codesCreateInput, Prisma.verification_codesUncheckedCreateInput>;
};
export type verification_codesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.verification_codesCreateManyInput | Prisma.verification_codesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type verification_codesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.verification_codesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.verification_codesOmit<ExtArgs> | null;
    data: Prisma.verification_codesCreateManyInput | Prisma.verification_codesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type verification_codesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.verification_codesSelect<ExtArgs> | null;
    omit?: Prisma.verification_codesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.verification_codesUpdateInput, Prisma.verification_codesUncheckedUpdateInput>;
    where: Prisma.verification_codesWhereUniqueInput;
};
export type verification_codesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.verification_codesUpdateManyMutationInput, Prisma.verification_codesUncheckedUpdateManyInput>;
    where?: Prisma.verification_codesWhereInput;
    limit?: number;
};
export type verification_codesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.verification_codesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.verification_codesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.verification_codesUpdateManyMutationInput, Prisma.verification_codesUncheckedUpdateManyInput>;
    where?: Prisma.verification_codesWhereInput;
    limit?: number;
};
export type verification_codesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.verification_codesSelect<ExtArgs> | null;
    omit?: Prisma.verification_codesOmit<ExtArgs> | null;
    where: Prisma.verification_codesWhereUniqueInput;
    create: Prisma.XOR<Prisma.verification_codesCreateInput, Prisma.verification_codesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.verification_codesUpdateInput, Prisma.verification_codesUncheckedUpdateInput>;
};
export type verification_codesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.verification_codesSelect<ExtArgs> | null;
    omit?: Prisma.verification_codesOmit<ExtArgs> | null;
    where: Prisma.verification_codesWhereUniqueInput;
};
export type verification_codesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.verification_codesWhereInput;
    limit?: number;
};
export type verification_codesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.verification_codesSelect<ExtArgs> | null;
    omit?: Prisma.verification_codesOmit<ExtArgs> | null;
};
