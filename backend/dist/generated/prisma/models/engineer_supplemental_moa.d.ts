import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type engineer_supplemental_moaModel = runtime.Types.Result.DefaultSelection<Prisma.$engineer_supplemental_moaPayload>;
export type AggregateEngineer_supplemental_moa = {
    _count: Engineer_supplemental_moaCountAggregateOutputType | null;
    _min: Engineer_supplemental_moaMinAggregateOutputType | null;
    _max: Engineer_supplemental_moaMaxAggregateOutputType | null;
};
export type Engineer_supplemental_moaMinAggregateOutputType = {
    supplemental_id: string | null;
    mother_moa_id: string | null;
    moa_pdf: string | null;
    uploaded_by: string | null;
    created_at: Date | null;
};
export type Engineer_supplemental_moaMaxAggregateOutputType = {
    supplemental_id: string | null;
    mother_moa_id: string | null;
    moa_pdf: string | null;
    uploaded_by: string | null;
    created_at: Date | null;
};
export type Engineer_supplemental_moaCountAggregateOutputType = {
    supplemental_id: number;
    mother_moa_id: number;
    moa_pdf: number;
    ipc_ids: number;
    uploaded_by: number;
    created_at: number;
    _all: number;
};
export type Engineer_supplemental_moaMinAggregateInputType = {
    supplemental_id?: true;
    mother_moa_id?: true;
    moa_pdf?: true;
    uploaded_by?: true;
    created_at?: true;
};
export type Engineer_supplemental_moaMaxAggregateInputType = {
    supplemental_id?: true;
    mother_moa_id?: true;
    moa_pdf?: true;
    uploaded_by?: true;
    created_at?: true;
};
export type Engineer_supplemental_moaCountAggregateInputType = {
    supplemental_id?: true;
    mother_moa_id?: true;
    moa_pdf?: true;
    ipc_ids?: true;
    uploaded_by?: true;
    created_at?: true;
    _all?: true;
};
export type Engineer_supplemental_moaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.engineer_supplemental_moaWhereInput;
    orderBy?: Prisma.engineer_supplemental_moaOrderByWithRelationInput | Prisma.engineer_supplemental_moaOrderByWithRelationInput[];
    cursor?: Prisma.engineer_supplemental_moaWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Engineer_supplemental_moaCountAggregateInputType;
    _min?: Engineer_supplemental_moaMinAggregateInputType;
    _max?: Engineer_supplemental_moaMaxAggregateInputType;
};
export type GetEngineer_supplemental_moaAggregateType<T extends Engineer_supplemental_moaAggregateArgs> = {
    [P in keyof T & keyof AggregateEngineer_supplemental_moa]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEngineer_supplemental_moa[P]> : Prisma.GetScalarType<T[P], AggregateEngineer_supplemental_moa[P]>;
};
export type engineer_supplemental_moaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.engineer_supplemental_moaWhereInput;
    orderBy?: Prisma.engineer_supplemental_moaOrderByWithAggregationInput | Prisma.engineer_supplemental_moaOrderByWithAggregationInput[];
    by: Prisma.Engineer_supplemental_moaScalarFieldEnum[] | Prisma.Engineer_supplemental_moaScalarFieldEnum;
    having?: Prisma.engineer_supplemental_moaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Engineer_supplemental_moaCountAggregateInputType | true;
    _min?: Engineer_supplemental_moaMinAggregateInputType;
    _max?: Engineer_supplemental_moaMaxAggregateInputType;
};
export type Engineer_supplemental_moaGroupByOutputType = {
    supplemental_id: string;
    mother_moa_id: string;
    moa_pdf: string | null;
    ipc_ids: runtime.JsonValue | null;
    uploaded_by: string | null;
    created_at: Date | null;
    _count: Engineer_supplemental_moaCountAggregateOutputType | null;
    _min: Engineer_supplemental_moaMinAggregateOutputType | null;
    _max: Engineer_supplemental_moaMaxAggregateOutputType | null;
};
export type GetEngineer_supplemental_moaGroupByPayload<T extends engineer_supplemental_moaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Engineer_supplemental_moaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Engineer_supplemental_moaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Engineer_supplemental_moaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Engineer_supplemental_moaGroupByOutputType[P]>;
}>>;
export type engineer_supplemental_moaWhereInput = {
    AND?: Prisma.engineer_supplemental_moaWhereInput | Prisma.engineer_supplemental_moaWhereInput[];
    OR?: Prisma.engineer_supplemental_moaWhereInput[];
    NOT?: Prisma.engineer_supplemental_moaWhereInput | Prisma.engineer_supplemental_moaWhereInput[];
    supplemental_id?: Prisma.UuidFilter<"engineer_supplemental_moa"> | string;
    mother_moa_id?: Prisma.StringFilter<"engineer_supplemental_moa"> | string;
    moa_pdf?: Prisma.StringNullableFilter<"engineer_supplemental_moa"> | string | null;
    ipc_ids?: Prisma.JsonNullableFilter<"engineer_supplemental_moa">;
    uploaded_by?: Prisma.StringNullableFilter<"engineer_supplemental_moa"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"engineer_supplemental_moa"> | Date | string | null;
};
export type engineer_supplemental_moaOrderByWithRelationInput = {
    supplemental_id?: Prisma.SortOrder;
    mother_moa_id?: Prisma.SortOrder;
    moa_pdf?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipc_ids?: Prisma.SortOrderInput | Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type engineer_supplemental_moaWhereUniqueInput = Prisma.AtLeast<{
    supplemental_id?: string;
    AND?: Prisma.engineer_supplemental_moaWhereInput | Prisma.engineer_supplemental_moaWhereInput[];
    OR?: Prisma.engineer_supplemental_moaWhereInput[];
    NOT?: Prisma.engineer_supplemental_moaWhereInput | Prisma.engineer_supplemental_moaWhereInput[];
    mother_moa_id?: Prisma.StringFilter<"engineer_supplemental_moa"> | string;
    moa_pdf?: Prisma.StringNullableFilter<"engineer_supplemental_moa"> | string | null;
    ipc_ids?: Prisma.JsonNullableFilter<"engineer_supplemental_moa">;
    uploaded_by?: Prisma.StringNullableFilter<"engineer_supplemental_moa"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"engineer_supplemental_moa"> | Date | string | null;
}, "supplemental_id">;
export type engineer_supplemental_moaOrderByWithAggregationInput = {
    supplemental_id?: Prisma.SortOrder;
    mother_moa_id?: Prisma.SortOrder;
    moa_pdf?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipc_ids?: Prisma.SortOrderInput | Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.engineer_supplemental_moaCountOrderByAggregateInput;
    _max?: Prisma.engineer_supplemental_moaMaxOrderByAggregateInput;
    _min?: Prisma.engineer_supplemental_moaMinOrderByAggregateInput;
};
export type engineer_supplemental_moaScalarWhereWithAggregatesInput = {
    AND?: Prisma.engineer_supplemental_moaScalarWhereWithAggregatesInput | Prisma.engineer_supplemental_moaScalarWhereWithAggregatesInput[];
    OR?: Prisma.engineer_supplemental_moaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.engineer_supplemental_moaScalarWhereWithAggregatesInput | Prisma.engineer_supplemental_moaScalarWhereWithAggregatesInput[];
    supplemental_id?: Prisma.UuidWithAggregatesFilter<"engineer_supplemental_moa"> | string;
    mother_moa_id?: Prisma.StringWithAggregatesFilter<"engineer_supplemental_moa"> | string;
    moa_pdf?: Prisma.StringNullableWithAggregatesFilter<"engineer_supplemental_moa"> | string | null;
    ipc_ids?: Prisma.JsonNullableWithAggregatesFilter<"engineer_supplemental_moa">;
    uploaded_by?: Prisma.StringNullableWithAggregatesFilter<"engineer_supplemental_moa"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"engineer_supplemental_moa"> | Date | string | null;
};
export type engineer_supplemental_moaCreateInput = {
    supplemental_id?: string;
    mother_moa_id: string;
    moa_pdf?: string | null;
    ipc_ids?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uploaded_by?: string | null;
    created_at?: Date | string | null;
};
export type engineer_supplemental_moaUncheckedCreateInput = {
    supplemental_id?: string;
    mother_moa_id: string;
    moa_pdf?: string | null;
    ipc_ids?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uploaded_by?: string | null;
    created_at?: Date | string | null;
};
export type engineer_supplemental_moaUpdateInput = {
    supplemental_id?: Prisma.StringFieldUpdateOperationsInput | string;
    mother_moa_id?: Prisma.StringFieldUpdateOperationsInput | string;
    moa_pdf?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipc_ids?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uploaded_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type engineer_supplemental_moaUncheckedUpdateInput = {
    supplemental_id?: Prisma.StringFieldUpdateOperationsInput | string;
    mother_moa_id?: Prisma.StringFieldUpdateOperationsInput | string;
    moa_pdf?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipc_ids?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uploaded_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type engineer_supplemental_moaCreateManyInput = {
    supplemental_id?: string;
    mother_moa_id: string;
    moa_pdf?: string | null;
    ipc_ids?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uploaded_by?: string | null;
    created_at?: Date | string | null;
};
export type engineer_supplemental_moaUpdateManyMutationInput = {
    supplemental_id?: Prisma.StringFieldUpdateOperationsInput | string;
    mother_moa_id?: Prisma.StringFieldUpdateOperationsInput | string;
    moa_pdf?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipc_ids?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uploaded_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type engineer_supplemental_moaUncheckedUpdateManyInput = {
    supplemental_id?: Prisma.StringFieldUpdateOperationsInput | string;
    mother_moa_id?: Prisma.StringFieldUpdateOperationsInput | string;
    moa_pdf?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipc_ids?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uploaded_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type engineer_supplemental_moaCountOrderByAggregateInput = {
    supplemental_id?: Prisma.SortOrder;
    mother_moa_id?: Prisma.SortOrder;
    moa_pdf?: Prisma.SortOrder;
    ipc_ids?: Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type engineer_supplemental_moaMaxOrderByAggregateInput = {
    supplemental_id?: Prisma.SortOrder;
    mother_moa_id?: Prisma.SortOrder;
    moa_pdf?: Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type engineer_supplemental_moaMinOrderByAggregateInput = {
    supplemental_id?: Prisma.SortOrder;
    mother_moa_id?: Prisma.SortOrder;
    moa_pdf?: Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type engineer_supplemental_moaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    supplemental_id?: boolean;
    mother_moa_id?: boolean;
    moa_pdf?: boolean;
    ipc_ids?: boolean;
    uploaded_by?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["engineer_supplemental_moa"]>;
export type engineer_supplemental_moaSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    supplemental_id?: boolean;
    mother_moa_id?: boolean;
    moa_pdf?: boolean;
    ipc_ids?: boolean;
    uploaded_by?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["engineer_supplemental_moa"]>;
export type engineer_supplemental_moaSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    supplemental_id?: boolean;
    mother_moa_id?: boolean;
    moa_pdf?: boolean;
    ipc_ids?: boolean;
    uploaded_by?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["engineer_supplemental_moa"]>;
export type engineer_supplemental_moaSelectScalar = {
    supplemental_id?: boolean;
    mother_moa_id?: boolean;
    moa_pdf?: boolean;
    ipc_ids?: boolean;
    uploaded_by?: boolean;
    created_at?: boolean;
};
export type engineer_supplemental_moaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"supplemental_id" | "mother_moa_id" | "moa_pdf" | "ipc_ids" | "uploaded_by" | "created_at", ExtArgs["result"]["engineer_supplemental_moa"]>;
export type $engineer_supplemental_moaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "engineer_supplemental_moa";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        supplemental_id: string;
        mother_moa_id: string;
        moa_pdf: string | null;
        ipc_ids: runtime.JsonValue | null;
        uploaded_by: string | null;
        created_at: Date | null;
    }, ExtArgs["result"]["engineer_supplemental_moa"]>;
    composites: {};
};
export type engineer_supplemental_moaGetPayload<S extends boolean | null | undefined | engineer_supplemental_moaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$engineer_supplemental_moaPayload, S>;
export type engineer_supplemental_moaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<engineer_supplemental_moaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Engineer_supplemental_moaCountAggregateInputType | true;
};
export interface engineer_supplemental_moaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['engineer_supplemental_moa'];
        meta: {
            name: 'engineer_supplemental_moa';
        };
    };
    findUnique<T extends engineer_supplemental_moaFindUniqueArgs>(args: Prisma.SelectSubset<T, engineer_supplemental_moaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__engineer_supplemental_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_supplemental_moaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends engineer_supplemental_moaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, engineer_supplemental_moaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__engineer_supplemental_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_supplemental_moaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends engineer_supplemental_moaFindFirstArgs>(args?: Prisma.SelectSubset<T, engineer_supplemental_moaFindFirstArgs<ExtArgs>>): Prisma.Prisma__engineer_supplemental_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_supplemental_moaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends engineer_supplemental_moaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, engineer_supplemental_moaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__engineer_supplemental_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_supplemental_moaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends engineer_supplemental_moaFindManyArgs>(args?: Prisma.SelectSubset<T, engineer_supplemental_moaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$engineer_supplemental_moaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends engineer_supplemental_moaCreateArgs>(args: Prisma.SelectSubset<T, engineer_supplemental_moaCreateArgs<ExtArgs>>): Prisma.Prisma__engineer_supplemental_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_supplemental_moaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends engineer_supplemental_moaCreateManyArgs>(args?: Prisma.SelectSubset<T, engineer_supplemental_moaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends engineer_supplemental_moaCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, engineer_supplemental_moaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$engineer_supplemental_moaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends engineer_supplemental_moaDeleteArgs>(args: Prisma.SelectSubset<T, engineer_supplemental_moaDeleteArgs<ExtArgs>>): Prisma.Prisma__engineer_supplemental_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_supplemental_moaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends engineer_supplemental_moaUpdateArgs>(args: Prisma.SelectSubset<T, engineer_supplemental_moaUpdateArgs<ExtArgs>>): Prisma.Prisma__engineer_supplemental_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_supplemental_moaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends engineer_supplemental_moaDeleteManyArgs>(args?: Prisma.SelectSubset<T, engineer_supplemental_moaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends engineer_supplemental_moaUpdateManyArgs>(args: Prisma.SelectSubset<T, engineer_supplemental_moaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends engineer_supplemental_moaUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, engineer_supplemental_moaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$engineer_supplemental_moaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends engineer_supplemental_moaUpsertArgs>(args: Prisma.SelectSubset<T, engineer_supplemental_moaUpsertArgs<ExtArgs>>): Prisma.Prisma__engineer_supplemental_moaClient<runtime.Types.Result.GetResult<Prisma.$engineer_supplemental_moaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends engineer_supplemental_moaCountArgs>(args?: Prisma.Subset<T, engineer_supplemental_moaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Engineer_supplemental_moaCountAggregateOutputType> : number>;
    aggregate<T extends Engineer_supplemental_moaAggregateArgs>(args: Prisma.Subset<T, Engineer_supplemental_moaAggregateArgs>): Prisma.PrismaPromise<GetEngineer_supplemental_moaAggregateType<T>>;
    groupBy<T extends engineer_supplemental_moaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: engineer_supplemental_moaGroupByArgs['orderBy'];
    } : {
        orderBy?: engineer_supplemental_moaGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, engineer_supplemental_moaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEngineer_supplemental_moaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: engineer_supplemental_moaFieldRefs;
}
export interface Prisma__engineer_supplemental_moaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface engineer_supplemental_moaFieldRefs {
    readonly supplemental_id: Prisma.FieldRef<"engineer_supplemental_moa", 'String'>;
    readonly mother_moa_id: Prisma.FieldRef<"engineer_supplemental_moa", 'String'>;
    readonly moa_pdf: Prisma.FieldRef<"engineer_supplemental_moa", 'String'>;
    readonly ipc_ids: Prisma.FieldRef<"engineer_supplemental_moa", 'Json'>;
    readonly uploaded_by: Prisma.FieldRef<"engineer_supplemental_moa", 'String'>;
    readonly created_at: Prisma.FieldRef<"engineer_supplemental_moa", 'DateTime'>;
}
export type engineer_supplemental_moaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplemental_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_supplemental_moaOmit<ExtArgs> | null;
    where: Prisma.engineer_supplemental_moaWhereUniqueInput;
};
export type engineer_supplemental_moaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplemental_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_supplemental_moaOmit<ExtArgs> | null;
    where: Prisma.engineer_supplemental_moaWhereUniqueInput;
};
export type engineer_supplemental_moaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplemental_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_supplemental_moaOmit<ExtArgs> | null;
    where?: Prisma.engineer_supplemental_moaWhereInput;
    orderBy?: Prisma.engineer_supplemental_moaOrderByWithRelationInput | Prisma.engineer_supplemental_moaOrderByWithRelationInput[];
    cursor?: Prisma.engineer_supplemental_moaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Engineer_supplemental_moaScalarFieldEnum | Prisma.Engineer_supplemental_moaScalarFieldEnum[];
};
export type engineer_supplemental_moaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplemental_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_supplemental_moaOmit<ExtArgs> | null;
    where?: Prisma.engineer_supplemental_moaWhereInput;
    orderBy?: Prisma.engineer_supplemental_moaOrderByWithRelationInput | Prisma.engineer_supplemental_moaOrderByWithRelationInput[];
    cursor?: Prisma.engineer_supplemental_moaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Engineer_supplemental_moaScalarFieldEnum | Prisma.Engineer_supplemental_moaScalarFieldEnum[];
};
export type engineer_supplemental_moaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplemental_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_supplemental_moaOmit<ExtArgs> | null;
    where?: Prisma.engineer_supplemental_moaWhereInput;
    orderBy?: Prisma.engineer_supplemental_moaOrderByWithRelationInput | Prisma.engineer_supplemental_moaOrderByWithRelationInput[];
    cursor?: Prisma.engineer_supplemental_moaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Engineer_supplemental_moaScalarFieldEnum | Prisma.Engineer_supplemental_moaScalarFieldEnum[];
};
export type engineer_supplemental_moaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplemental_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_supplemental_moaOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.engineer_supplemental_moaCreateInput, Prisma.engineer_supplemental_moaUncheckedCreateInput>;
};
export type engineer_supplemental_moaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.engineer_supplemental_moaCreateManyInput | Prisma.engineer_supplemental_moaCreateManyInput[];
    skipDuplicates?: boolean;
};
export type engineer_supplemental_moaCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplemental_moaSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.engineer_supplemental_moaOmit<ExtArgs> | null;
    data: Prisma.engineer_supplemental_moaCreateManyInput | Prisma.engineer_supplemental_moaCreateManyInput[];
    skipDuplicates?: boolean;
};
export type engineer_supplemental_moaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplemental_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_supplemental_moaOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.engineer_supplemental_moaUpdateInput, Prisma.engineer_supplemental_moaUncheckedUpdateInput>;
    where: Prisma.engineer_supplemental_moaWhereUniqueInput;
};
export type engineer_supplemental_moaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.engineer_supplemental_moaUpdateManyMutationInput, Prisma.engineer_supplemental_moaUncheckedUpdateManyInput>;
    where?: Prisma.engineer_supplemental_moaWhereInput;
    limit?: number;
};
export type engineer_supplemental_moaUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplemental_moaSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.engineer_supplemental_moaOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.engineer_supplemental_moaUpdateManyMutationInput, Prisma.engineer_supplemental_moaUncheckedUpdateManyInput>;
    where?: Prisma.engineer_supplemental_moaWhereInput;
    limit?: number;
};
export type engineer_supplemental_moaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplemental_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_supplemental_moaOmit<ExtArgs> | null;
    where: Prisma.engineer_supplemental_moaWhereUniqueInput;
    create: Prisma.XOR<Prisma.engineer_supplemental_moaCreateInput, Prisma.engineer_supplemental_moaUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.engineer_supplemental_moaUpdateInput, Prisma.engineer_supplemental_moaUncheckedUpdateInput>;
};
export type engineer_supplemental_moaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplemental_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_supplemental_moaOmit<ExtArgs> | null;
    where: Prisma.engineer_supplemental_moaWhereUniqueInput;
};
export type engineer_supplemental_moaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.engineer_supplemental_moaWhereInput;
    limit?: number;
};
export type engineer_supplemental_moaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_supplemental_moaSelect<ExtArgs> | null;
    omit?: Prisma.engineer_supplemental_moaOmit<ExtArgs> | null;
};
