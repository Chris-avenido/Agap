import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type esf_linkModel = runtime.Types.Result.DefaultSelection<Prisma.$esf_linkPayload>;
export type AggregateEsf_link = {
    _count: Esf_linkCountAggregateOutputType | null;
    _avg: Esf_linkAvgAggregateOutputType | null;
    _sum: Esf_linkSumAggregateOutputType | null;
    _min: Esf_linkMinAggregateOutputType | null;
    _max: Esf_linkMaxAggregateOutputType | null;
};
export type Esf_linkAvgAggregateOutputType = {
    id: number | null;
    row_count: number | null;
};
export type Esf_linkSumAggregateOutputType = {
    id: number | null;
    row_count: number | null;
};
export type Esf_linkMinAggregateOutputType = {
    id: number | null;
    school_id: string | null;
    link: string | null;
    status: string | null;
    row_count: number | null;
    audit_remarks: string | null;
    updated_at: Date | null;
};
export type Esf_linkMaxAggregateOutputType = {
    id: number | null;
    school_id: string | null;
    link: string | null;
    status: string | null;
    row_count: number | null;
    audit_remarks: string | null;
    updated_at: Date | null;
};
export type Esf_linkCountAggregateOutputType = {
    id: number;
    school_id: number;
    link: number;
    status: number;
    row_count: number;
    summary: number;
    audit_remarks: number;
    updated_at: number;
    _all: number;
};
export type Esf_linkAvgAggregateInputType = {
    id?: true;
    row_count?: true;
};
export type Esf_linkSumAggregateInputType = {
    id?: true;
    row_count?: true;
};
export type Esf_linkMinAggregateInputType = {
    id?: true;
    school_id?: true;
    link?: true;
    status?: true;
    row_count?: true;
    audit_remarks?: true;
    updated_at?: true;
};
export type Esf_linkMaxAggregateInputType = {
    id?: true;
    school_id?: true;
    link?: true;
    status?: true;
    row_count?: true;
    audit_remarks?: true;
    updated_at?: true;
};
export type Esf_linkCountAggregateInputType = {
    id?: true;
    school_id?: true;
    link?: true;
    status?: true;
    row_count?: true;
    summary?: true;
    audit_remarks?: true;
    updated_at?: true;
    _all?: true;
};
export type Esf_linkAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.esf_linkWhereInput;
    orderBy?: Prisma.esf_linkOrderByWithRelationInput | Prisma.esf_linkOrderByWithRelationInput[];
    cursor?: Prisma.esf_linkWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Esf_linkCountAggregateInputType;
    _avg?: Esf_linkAvgAggregateInputType;
    _sum?: Esf_linkSumAggregateInputType;
    _min?: Esf_linkMinAggregateInputType;
    _max?: Esf_linkMaxAggregateInputType;
};
export type GetEsf_linkAggregateType<T extends Esf_linkAggregateArgs> = {
    [P in keyof T & keyof AggregateEsf_link]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEsf_link[P]> : Prisma.GetScalarType<T[P], AggregateEsf_link[P]>;
};
export type esf_linkGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.esf_linkWhereInput;
    orderBy?: Prisma.esf_linkOrderByWithAggregationInput | Prisma.esf_linkOrderByWithAggregationInput[];
    by: Prisma.Esf_linkScalarFieldEnum[] | Prisma.Esf_linkScalarFieldEnum;
    having?: Prisma.esf_linkScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Esf_linkCountAggregateInputType | true;
    _avg?: Esf_linkAvgAggregateInputType;
    _sum?: Esf_linkSumAggregateInputType;
    _min?: Esf_linkMinAggregateInputType;
    _max?: Esf_linkMaxAggregateInputType;
};
export type Esf_linkGroupByOutputType = {
    id: number;
    school_id: string | null;
    link: string | null;
    status: string | null;
    row_count: number | null;
    summary: runtime.JsonValue | null;
    audit_remarks: string | null;
    updated_at: Date | null;
    _count: Esf_linkCountAggregateOutputType | null;
    _avg: Esf_linkAvgAggregateOutputType | null;
    _sum: Esf_linkSumAggregateOutputType | null;
    _min: Esf_linkMinAggregateOutputType | null;
    _max: Esf_linkMaxAggregateOutputType | null;
};
export type GetEsf_linkGroupByPayload<T extends esf_linkGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Esf_linkGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Esf_linkGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Esf_linkGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Esf_linkGroupByOutputType[P]>;
}>>;
export type esf_linkWhereInput = {
    AND?: Prisma.esf_linkWhereInput | Prisma.esf_linkWhereInput[];
    OR?: Prisma.esf_linkWhereInput[];
    NOT?: Prisma.esf_linkWhereInput | Prisma.esf_linkWhereInput[];
    id?: Prisma.IntFilter<"esf_link"> | number;
    school_id?: Prisma.StringNullableFilter<"esf_link"> | string | null;
    link?: Prisma.StringNullableFilter<"esf_link"> | string | null;
    status?: Prisma.StringNullableFilter<"esf_link"> | string | null;
    row_count?: Prisma.IntNullableFilter<"esf_link"> | number | null;
    summary?: Prisma.JsonNullableFilter<"esf_link">;
    audit_remarks?: Prisma.StringNullableFilter<"esf_link"> | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"esf_link"> | Date | string | null;
};
export type esf_linkOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    link?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrderInput | Prisma.SortOrder;
    row_count?: Prisma.SortOrderInput | Prisma.SortOrder;
    summary?: Prisma.SortOrderInput | Prisma.SortOrder;
    audit_remarks?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type esf_linkWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    school_id?: string;
    AND?: Prisma.esf_linkWhereInput | Prisma.esf_linkWhereInput[];
    OR?: Prisma.esf_linkWhereInput[];
    NOT?: Prisma.esf_linkWhereInput | Prisma.esf_linkWhereInput[];
    link?: Prisma.StringNullableFilter<"esf_link"> | string | null;
    status?: Prisma.StringNullableFilter<"esf_link"> | string | null;
    row_count?: Prisma.IntNullableFilter<"esf_link"> | number | null;
    summary?: Prisma.JsonNullableFilter<"esf_link">;
    audit_remarks?: Prisma.StringNullableFilter<"esf_link"> | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"esf_link"> | Date | string | null;
}, "id" | "school_id">;
export type esf_linkOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    link?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrderInput | Prisma.SortOrder;
    row_count?: Prisma.SortOrderInput | Prisma.SortOrder;
    summary?: Prisma.SortOrderInput | Prisma.SortOrder;
    audit_remarks?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.esf_linkCountOrderByAggregateInput;
    _avg?: Prisma.esf_linkAvgOrderByAggregateInput;
    _max?: Prisma.esf_linkMaxOrderByAggregateInput;
    _min?: Prisma.esf_linkMinOrderByAggregateInput;
    _sum?: Prisma.esf_linkSumOrderByAggregateInput;
};
export type esf_linkScalarWhereWithAggregatesInput = {
    AND?: Prisma.esf_linkScalarWhereWithAggregatesInput | Prisma.esf_linkScalarWhereWithAggregatesInput[];
    OR?: Prisma.esf_linkScalarWhereWithAggregatesInput[];
    NOT?: Prisma.esf_linkScalarWhereWithAggregatesInput | Prisma.esf_linkScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"esf_link"> | number;
    school_id?: Prisma.StringNullableWithAggregatesFilter<"esf_link"> | string | null;
    link?: Prisma.StringNullableWithAggregatesFilter<"esf_link"> | string | null;
    status?: Prisma.StringNullableWithAggregatesFilter<"esf_link"> | string | null;
    row_count?: Prisma.IntNullableWithAggregatesFilter<"esf_link"> | number | null;
    summary?: Prisma.JsonNullableWithAggregatesFilter<"esf_link">;
    audit_remarks?: Prisma.StringNullableWithAggregatesFilter<"esf_link"> | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"esf_link"> | Date | string | null;
};
export type esf_linkCreateInput = {
    school_id?: string | null;
    link?: string | null;
    status?: string | null;
    row_count?: number | null;
    summary?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    audit_remarks?: string | null;
    updated_at?: Date | string | null;
};
export type esf_linkUncheckedCreateInput = {
    id?: number;
    school_id?: string | null;
    link?: string | null;
    status?: string | null;
    row_count?: number | null;
    summary?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    audit_remarks?: string | null;
    updated_at?: Date | string | null;
};
export type esf_linkUpdateInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    row_count?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    summary?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    audit_remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type esf_linkUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    row_count?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    summary?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    audit_remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type esf_linkCreateManyInput = {
    id?: number;
    school_id?: string | null;
    link?: string | null;
    status?: string | null;
    row_count?: number | null;
    summary?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    audit_remarks?: string | null;
    updated_at?: Date | string | null;
};
export type esf_linkUpdateManyMutationInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    row_count?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    summary?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    audit_remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type esf_linkUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    row_count?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    summary?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    audit_remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type esf_linkCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    link?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    row_count?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    audit_remarks?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type esf_linkAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    row_count?: Prisma.SortOrder;
};
export type esf_linkMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    link?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    row_count?: Prisma.SortOrder;
    audit_remarks?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type esf_linkMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    link?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    row_count?: Prisma.SortOrder;
    audit_remarks?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type esf_linkSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    row_count?: Prisma.SortOrder;
};
export type esf_linkSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    link?: boolean;
    status?: boolean;
    row_count?: boolean;
    summary?: boolean;
    audit_remarks?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["esf_link"]>;
export type esf_linkSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    link?: boolean;
    status?: boolean;
    row_count?: boolean;
    summary?: boolean;
    audit_remarks?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["esf_link"]>;
export type esf_linkSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    link?: boolean;
    status?: boolean;
    row_count?: boolean;
    summary?: boolean;
    audit_remarks?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["esf_link"]>;
export type esf_linkSelectScalar = {
    id?: boolean;
    school_id?: boolean;
    link?: boolean;
    status?: boolean;
    row_count?: boolean;
    summary?: boolean;
    audit_remarks?: boolean;
    updated_at?: boolean;
};
export type esf_linkOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "school_id" | "link" | "status" | "row_count" | "summary" | "audit_remarks" | "updated_at", ExtArgs["result"]["esf_link"]>;
export type $esf_linkPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "esf_link";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        school_id: string | null;
        link: string | null;
        status: string | null;
        row_count: number | null;
        summary: runtime.JsonValue | null;
        audit_remarks: string | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["esf_link"]>;
    composites: {};
};
export type esf_linkGetPayload<S extends boolean | null | undefined | esf_linkDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$esf_linkPayload, S>;
export type esf_linkCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<esf_linkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Esf_linkCountAggregateInputType | true;
};
export interface esf_linkDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['esf_link'];
        meta: {
            name: 'esf_link';
        };
    };
    findUnique<T extends esf_linkFindUniqueArgs>(args: Prisma.SelectSubset<T, esf_linkFindUniqueArgs<ExtArgs>>): Prisma.Prisma__esf_linkClient<runtime.Types.Result.GetResult<Prisma.$esf_linkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends esf_linkFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, esf_linkFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__esf_linkClient<runtime.Types.Result.GetResult<Prisma.$esf_linkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends esf_linkFindFirstArgs>(args?: Prisma.SelectSubset<T, esf_linkFindFirstArgs<ExtArgs>>): Prisma.Prisma__esf_linkClient<runtime.Types.Result.GetResult<Prisma.$esf_linkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends esf_linkFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, esf_linkFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__esf_linkClient<runtime.Types.Result.GetResult<Prisma.$esf_linkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends esf_linkFindManyArgs>(args?: Prisma.SelectSubset<T, esf_linkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$esf_linkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends esf_linkCreateArgs>(args: Prisma.SelectSubset<T, esf_linkCreateArgs<ExtArgs>>): Prisma.Prisma__esf_linkClient<runtime.Types.Result.GetResult<Prisma.$esf_linkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends esf_linkCreateManyArgs>(args?: Prisma.SelectSubset<T, esf_linkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends esf_linkCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, esf_linkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$esf_linkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends esf_linkDeleteArgs>(args: Prisma.SelectSubset<T, esf_linkDeleteArgs<ExtArgs>>): Prisma.Prisma__esf_linkClient<runtime.Types.Result.GetResult<Prisma.$esf_linkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends esf_linkUpdateArgs>(args: Prisma.SelectSubset<T, esf_linkUpdateArgs<ExtArgs>>): Prisma.Prisma__esf_linkClient<runtime.Types.Result.GetResult<Prisma.$esf_linkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends esf_linkDeleteManyArgs>(args?: Prisma.SelectSubset<T, esf_linkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends esf_linkUpdateManyArgs>(args: Prisma.SelectSubset<T, esf_linkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends esf_linkUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, esf_linkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$esf_linkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends esf_linkUpsertArgs>(args: Prisma.SelectSubset<T, esf_linkUpsertArgs<ExtArgs>>): Prisma.Prisma__esf_linkClient<runtime.Types.Result.GetResult<Prisma.$esf_linkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends esf_linkCountArgs>(args?: Prisma.Subset<T, esf_linkCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Esf_linkCountAggregateOutputType> : number>;
    aggregate<T extends Esf_linkAggregateArgs>(args: Prisma.Subset<T, Esf_linkAggregateArgs>): Prisma.PrismaPromise<GetEsf_linkAggregateType<T>>;
    groupBy<T extends esf_linkGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: esf_linkGroupByArgs['orderBy'];
    } : {
        orderBy?: esf_linkGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, esf_linkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEsf_linkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: esf_linkFieldRefs;
}
export interface Prisma__esf_linkClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface esf_linkFieldRefs {
    readonly id: Prisma.FieldRef<"esf_link", 'Int'>;
    readonly school_id: Prisma.FieldRef<"esf_link", 'String'>;
    readonly link: Prisma.FieldRef<"esf_link", 'String'>;
    readonly status: Prisma.FieldRef<"esf_link", 'String'>;
    readonly row_count: Prisma.FieldRef<"esf_link", 'Int'>;
    readonly summary: Prisma.FieldRef<"esf_link", 'Json'>;
    readonly audit_remarks: Prisma.FieldRef<"esf_link", 'String'>;
    readonly updated_at: Prisma.FieldRef<"esf_link", 'DateTime'>;
}
export type esf_linkFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf_linkSelect<ExtArgs> | null;
    omit?: Prisma.esf_linkOmit<ExtArgs> | null;
    where: Prisma.esf_linkWhereUniqueInput;
};
export type esf_linkFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf_linkSelect<ExtArgs> | null;
    omit?: Prisma.esf_linkOmit<ExtArgs> | null;
    where: Prisma.esf_linkWhereUniqueInput;
};
export type esf_linkFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf_linkSelect<ExtArgs> | null;
    omit?: Prisma.esf_linkOmit<ExtArgs> | null;
    where?: Prisma.esf_linkWhereInput;
    orderBy?: Prisma.esf_linkOrderByWithRelationInput | Prisma.esf_linkOrderByWithRelationInput[];
    cursor?: Prisma.esf_linkWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Esf_linkScalarFieldEnum | Prisma.Esf_linkScalarFieldEnum[];
};
export type esf_linkFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf_linkSelect<ExtArgs> | null;
    omit?: Prisma.esf_linkOmit<ExtArgs> | null;
    where?: Prisma.esf_linkWhereInput;
    orderBy?: Prisma.esf_linkOrderByWithRelationInput | Prisma.esf_linkOrderByWithRelationInput[];
    cursor?: Prisma.esf_linkWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Esf_linkScalarFieldEnum | Prisma.Esf_linkScalarFieldEnum[];
};
export type esf_linkFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf_linkSelect<ExtArgs> | null;
    omit?: Prisma.esf_linkOmit<ExtArgs> | null;
    where?: Prisma.esf_linkWhereInput;
    orderBy?: Prisma.esf_linkOrderByWithRelationInput | Prisma.esf_linkOrderByWithRelationInput[];
    cursor?: Prisma.esf_linkWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Esf_linkScalarFieldEnum | Prisma.Esf_linkScalarFieldEnum[];
};
export type esf_linkCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf_linkSelect<ExtArgs> | null;
    omit?: Prisma.esf_linkOmit<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.esf_linkCreateInput, Prisma.esf_linkUncheckedCreateInput>;
};
export type esf_linkCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.esf_linkCreateManyInput | Prisma.esf_linkCreateManyInput[];
    skipDuplicates?: boolean;
};
export type esf_linkCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf_linkSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.esf_linkOmit<ExtArgs> | null;
    data: Prisma.esf_linkCreateManyInput | Prisma.esf_linkCreateManyInput[];
    skipDuplicates?: boolean;
};
export type esf_linkUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf_linkSelect<ExtArgs> | null;
    omit?: Prisma.esf_linkOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.esf_linkUpdateInput, Prisma.esf_linkUncheckedUpdateInput>;
    where: Prisma.esf_linkWhereUniqueInput;
};
export type esf_linkUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.esf_linkUpdateManyMutationInput, Prisma.esf_linkUncheckedUpdateManyInput>;
    where?: Prisma.esf_linkWhereInput;
    limit?: number;
};
export type esf_linkUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf_linkSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.esf_linkOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.esf_linkUpdateManyMutationInput, Prisma.esf_linkUncheckedUpdateManyInput>;
    where?: Prisma.esf_linkWhereInput;
    limit?: number;
};
export type esf_linkUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf_linkSelect<ExtArgs> | null;
    omit?: Prisma.esf_linkOmit<ExtArgs> | null;
    where: Prisma.esf_linkWhereUniqueInput;
    create: Prisma.XOR<Prisma.esf_linkCreateInput, Prisma.esf_linkUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.esf_linkUpdateInput, Prisma.esf_linkUncheckedUpdateInput>;
};
export type esf_linkDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf_linkSelect<ExtArgs> | null;
    omit?: Prisma.esf_linkOmit<ExtArgs> | null;
    where: Prisma.esf_linkWhereUniqueInput;
};
export type esf_linkDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.esf_linkWhereInput;
    limit?: number;
};
export type esf_linkDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.esf_linkSelect<ExtArgs> | null;
    omit?: Prisma.esf_linkOmit<ExtArgs> | null;
};
