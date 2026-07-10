import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type siif_ro_coordinationModel = runtime.Types.Result.DefaultSelection<Prisma.$siif_ro_coordinationPayload>;
export type AggregateSiif_ro_coordination = {
    _count: Siif_ro_coordinationCountAggregateOutputType | null;
    _avg: Siif_ro_coordinationAvgAggregateOutputType | null;
    _sum: Siif_ro_coordinationSumAggregateOutputType | null;
    _min: Siif_ro_coordinationMinAggregateOutputType | null;
    _max: Siif_ro_coordinationMaxAggregateOutputType | null;
};
export type Siif_ro_coordinationAvgAggregateOutputType = {
    MID: number | null;
};
export type Siif_ro_coordinationSumAggregateOutputType = {
    MID: number | null;
};
export type Siif_ro_coordinationMinAggregateOutputType = {
    MID: number | null;
    division_name: string | null;
    sender_role: string | null;
    sender_id: string | null;
    sender_name: string | null;
    message: string | null;
    created_at: Date | null;
};
export type Siif_ro_coordinationMaxAggregateOutputType = {
    MID: number | null;
    division_name: string | null;
    sender_role: string | null;
    sender_id: string | null;
    sender_name: string | null;
    message: string | null;
    created_at: Date | null;
};
export type Siif_ro_coordinationCountAggregateOutputType = {
    MID: number;
    division_name: number;
    sender_role: number;
    sender_id: number;
    sender_name: number;
    message: number;
    created_at: number;
    _all: number;
};
export type Siif_ro_coordinationAvgAggregateInputType = {
    MID?: true;
};
export type Siif_ro_coordinationSumAggregateInputType = {
    MID?: true;
};
export type Siif_ro_coordinationMinAggregateInputType = {
    MID?: true;
    division_name?: true;
    sender_role?: true;
    sender_id?: true;
    sender_name?: true;
    message?: true;
    created_at?: true;
};
export type Siif_ro_coordinationMaxAggregateInputType = {
    MID?: true;
    division_name?: true;
    sender_role?: true;
    sender_id?: true;
    sender_name?: true;
    message?: true;
    created_at?: true;
};
export type Siif_ro_coordinationCountAggregateInputType = {
    MID?: true;
    division_name?: true;
    sender_role?: true;
    sender_id?: true;
    sender_name?: true;
    message?: true;
    created_at?: true;
    _all?: true;
};
export type Siif_ro_coordinationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_ro_coordinationWhereInput;
    orderBy?: Prisma.siif_ro_coordinationOrderByWithRelationInput | Prisma.siif_ro_coordinationOrderByWithRelationInput[];
    cursor?: Prisma.siif_ro_coordinationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Siif_ro_coordinationCountAggregateInputType;
    _avg?: Siif_ro_coordinationAvgAggregateInputType;
    _sum?: Siif_ro_coordinationSumAggregateInputType;
    _min?: Siif_ro_coordinationMinAggregateInputType;
    _max?: Siif_ro_coordinationMaxAggregateInputType;
};
export type GetSiif_ro_coordinationAggregateType<T extends Siif_ro_coordinationAggregateArgs> = {
    [P in keyof T & keyof AggregateSiif_ro_coordination]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSiif_ro_coordination[P]> : Prisma.GetScalarType<T[P], AggregateSiif_ro_coordination[P]>;
};
export type siif_ro_coordinationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_ro_coordinationWhereInput;
    orderBy?: Prisma.siif_ro_coordinationOrderByWithAggregationInput | Prisma.siif_ro_coordinationOrderByWithAggregationInput[];
    by: Prisma.Siif_ro_coordinationScalarFieldEnum[] | Prisma.Siif_ro_coordinationScalarFieldEnum;
    having?: Prisma.siif_ro_coordinationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Siif_ro_coordinationCountAggregateInputType | true;
    _avg?: Siif_ro_coordinationAvgAggregateInputType;
    _sum?: Siif_ro_coordinationSumAggregateInputType;
    _min?: Siif_ro_coordinationMinAggregateInputType;
    _max?: Siif_ro_coordinationMaxAggregateInputType;
};
export type Siif_ro_coordinationGroupByOutputType = {
    MID: number;
    division_name: string;
    sender_role: string;
    sender_id: string;
    sender_name: string | null;
    message: string;
    created_at: Date | null;
    _count: Siif_ro_coordinationCountAggregateOutputType | null;
    _avg: Siif_ro_coordinationAvgAggregateOutputType | null;
    _sum: Siif_ro_coordinationSumAggregateOutputType | null;
    _min: Siif_ro_coordinationMinAggregateOutputType | null;
    _max: Siif_ro_coordinationMaxAggregateOutputType | null;
};
export type GetSiif_ro_coordinationGroupByPayload<T extends siif_ro_coordinationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Siif_ro_coordinationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Siif_ro_coordinationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Siif_ro_coordinationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Siif_ro_coordinationGroupByOutputType[P]>;
}>>;
export type siif_ro_coordinationWhereInput = {
    AND?: Prisma.siif_ro_coordinationWhereInput | Prisma.siif_ro_coordinationWhereInput[];
    OR?: Prisma.siif_ro_coordinationWhereInput[];
    NOT?: Prisma.siif_ro_coordinationWhereInput | Prisma.siif_ro_coordinationWhereInput[];
    MID?: Prisma.IntFilter<"siif_ro_coordination"> | number;
    division_name?: Prisma.StringFilter<"siif_ro_coordination"> | string;
    sender_role?: Prisma.StringFilter<"siif_ro_coordination"> | string;
    sender_id?: Prisma.StringFilter<"siif_ro_coordination"> | string;
    sender_name?: Prisma.StringNullableFilter<"siif_ro_coordination"> | string | null;
    message?: Prisma.StringFilter<"siif_ro_coordination"> | string;
    created_at?: Prisma.DateTimeNullableFilter<"siif_ro_coordination"> | Date | string | null;
};
export type siif_ro_coordinationOrderByWithRelationInput = {
    MID?: Prisma.SortOrder;
    division_name?: Prisma.SortOrder;
    sender_role?: Prisma.SortOrder;
    sender_id?: Prisma.SortOrder;
    sender_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    message?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type siif_ro_coordinationWhereUniqueInput = Prisma.AtLeast<{
    MID?: number;
    AND?: Prisma.siif_ro_coordinationWhereInput | Prisma.siif_ro_coordinationWhereInput[];
    OR?: Prisma.siif_ro_coordinationWhereInput[];
    NOT?: Prisma.siif_ro_coordinationWhereInput | Prisma.siif_ro_coordinationWhereInput[];
    division_name?: Prisma.StringFilter<"siif_ro_coordination"> | string;
    sender_role?: Prisma.StringFilter<"siif_ro_coordination"> | string;
    sender_id?: Prisma.StringFilter<"siif_ro_coordination"> | string;
    sender_name?: Prisma.StringNullableFilter<"siif_ro_coordination"> | string | null;
    message?: Prisma.StringFilter<"siif_ro_coordination"> | string;
    created_at?: Prisma.DateTimeNullableFilter<"siif_ro_coordination"> | Date | string | null;
}, "MID">;
export type siif_ro_coordinationOrderByWithAggregationInput = {
    MID?: Prisma.SortOrder;
    division_name?: Prisma.SortOrder;
    sender_role?: Prisma.SortOrder;
    sender_id?: Prisma.SortOrder;
    sender_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    message?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.siif_ro_coordinationCountOrderByAggregateInput;
    _avg?: Prisma.siif_ro_coordinationAvgOrderByAggregateInput;
    _max?: Prisma.siif_ro_coordinationMaxOrderByAggregateInput;
    _min?: Prisma.siif_ro_coordinationMinOrderByAggregateInput;
    _sum?: Prisma.siif_ro_coordinationSumOrderByAggregateInput;
};
export type siif_ro_coordinationScalarWhereWithAggregatesInput = {
    AND?: Prisma.siif_ro_coordinationScalarWhereWithAggregatesInput | Prisma.siif_ro_coordinationScalarWhereWithAggregatesInput[];
    OR?: Prisma.siif_ro_coordinationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.siif_ro_coordinationScalarWhereWithAggregatesInput | Prisma.siif_ro_coordinationScalarWhereWithAggregatesInput[];
    MID?: Prisma.IntWithAggregatesFilter<"siif_ro_coordination"> | number;
    division_name?: Prisma.StringWithAggregatesFilter<"siif_ro_coordination"> | string;
    sender_role?: Prisma.StringWithAggregatesFilter<"siif_ro_coordination"> | string;
    sender_id?: Prisma.StringWithAggregatesFilter<"siif_ro_coordination"> | string;
    sender_name?: Prisma.StringNullableWithAggregatesFilter<"siif_ro_coordination"> | string | null;
    message?: Prisma.StringWithAggregatesFilter<"siif_ro_coordination"> | string;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"siif_ro_coordination"> | Date | string | null;
};
export type siif_ro_coordinationCreateInput = {
    division_name: string;
    sender_role: string;
    sender_id: string;
    sender_name?: string | null;
    message: string;
    created_at?: Date | string | null;
};
export type siif_ro_coordinationUncheckedCreateInput = {
    MID?: number;
    division_name: string;
    sender_role: string;
    sender_id: string;
    sender_name?: string | null;
    message: string;
    created_at?: Date | string | null;
};
export type siif_ro_coordinationUpdateInput = {
    division_name?: Prisma.StringFieldUpdateOperationsInput | string;
    sender_role?: Prisma.StringFieldUpdateOperationsInput | string;
    sender_id?: Prisma.StringFieldUpdateOperationsInput | string;
    sender_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type siif_ro_coordinationUncheckedUpdateInput = {
    MID?: Prisma.IntFieldUpdateOperationsInput | number;
    division_name?: Prisma.StringFieldUpdateOperationsInput | string;
    sender_role?: Prisma.StringFieldUpdateOperationsInput | string;
    sender_id?: Prisma.StringFieldUpdateOperationsInput | string;
    sender_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type siif_ro_coordinationCreateManyInput = {
    MID?: number;
    division_name: string;
    sender_role: string;
    sender_id: string;
    sender_name?: string | null;
    message: string;
    created_at?: Date | string | null;
};
export type siif_ro_coordinationUpdateManyMutationInput = {
    division_name?: Prisma.StringFieldUpdateOperationsInput | string;
    sender_role?: Prisma.StringFieldUpdateOperationsInput | string;
    sender_id?: Prisma.StringFieldUpdateOperationsInput | string;
    sender_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type siif_ro_coordinationUncheckedUpdateManyInput = {
    MID?: Prisma.IntFieldUpdateOperationsInput | number;
    division_name?: Prisma.StringFieldUpdateOperationsInput | string;
    sender_role?: Prisma.StringFieldUpdateOperationsInput | string;
    sender_id?: Prisma.StringFieldUpdateOperationsInput | string;
    sender_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type siif_ro_coordinationCountOrderByAggregateInput = {
    MID?: Prisma.SortOrder;
    division_name?: Prisma.SortOrder;
    sender_role?: Prisma.SortOrder;
    sender_id?: Prisma.SortOrder;
    sender_name?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type siif_ro_coordinationAvgOrderByAggregateInput = {
    MID?: Prisma.SortOrder;
};
export type siif_ro_coordinationMaxOrderByAggregateInput = {
    MID?: Prisma.SortOrder;
    division_name?: Prisma.SortOrder;
    sender_role?: Prisma.SortOrder;
    sender_id?: Prisma.SortOrder;
    sender_name?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type siif_ro_coordinationMinOrderByAggregateInput = {
    MID?: Prisma.SortOrder;
    division_name?: Prisma.SortOrder;
    sender_role?: Prisma.SortOrder;
    sender_id?: Prisma.SortOrder;
    sender_name?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type siif_ro_coordinationSumOrderByAggregateInput = {
    MID?: Prisma.SortOrder;
};
export type siif_ro_coordinationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    MID?: boolean;
    division_name?: boolean;
    sender_role?: boolean;
    sender_id?: boolean;
    sender_name?: boolean;
    message?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["siif_ro_coordination"]>;
export type siif_ro_coordinationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    MID?: boolean;
    division_name?: boolean;
    sender_role?: boolean;
    sender_id?: boolean;
    sender_name?: boolean;
    message?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["siif_ro_coordination"]>;
export type siif_ro_coordinationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    MID?: boolean;
    division_name?: boolean;
    sender_role?: boolean;
    sender_id?: boolean;
    sender_name?: boolean;
    message?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["siif_ro_coordination"]>;
export type siif_ro_coordinationSelectScalar = {
    MID?: boolean;
    division_name?: boolean;
    sender_role?: boolean;
    sender_id?: boolean;
    sender_name?: boolean;
    message?: boolean;
    created_at?: boolean;
};
export type siif_ro_coordinationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"MID" | "division_name" | "sender_role" | "sender_id" | "sender_name" | "message" | "created_at", ExtArgs["result"]["siif_ro_coordination"]>;
export type $siif_ro_coordinationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "siif_ro_coordination";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        MID: number;
        division_name: string;
        sender_role: string;
        sender_id: string;
        sender_name: string | null;
        message: string;
        created_at: Date | null;
    }, ExtArgs["result"]["siif_ro_coordination"]>;
    composites: {};
};
export type siif_ro_coordinationGetPayload<S extends boolean | null | undefined | siif_ro_coordinationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$siif_ro_coordinationPayload, S>;
export type siif_ro_coordinationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<siif_ro_coordinationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Siif_ro_coordinationCountAggregateInputType | true;
};
export interface siif_ro_coordinationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['siif_ro_coordination'];
        meta: {
            name: 'siif_ro_coordination';
        };
    };
    findUnique<T extends siif_ro_coordinationFindUniqueArgs>(args: Prisma.SelectSubset<T, siif_ro_coordinationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__siif_ro_coordinationClient<runtime.Types.Result.GetResult<Prisma.$siif_ro_coordinationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends siif_ro_coordinationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, siif_ro_coordinationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__siif_ro_coordinationClient<runtime.Types.Result.GetResult<Prisma.$siif_ro_coordinationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends siif_ro_coordinationFindFirstArgs>(args?: Prisma.SelectSubset<T, siif_ro_coordinationFindFirstArgs<ExtArgs>>): Prisma.Prisma__siif_ro_coordinationClient<runtime.Types.Result.GetResult<Prisma.$siif_ro_coordinationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends siif_ro_coordinationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, siif_ro_coordinationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__siif_ro_coordinationClient<runtime.Types.Result.GetResult<Prisma.$siif_ro_coordinationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends siif_ro_coordinationFindManyArgs>(args?: Prisma.SelectSubset<T, siif_ro_coordinationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_ro_coordinationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends siif_ro_coordinationCreateArgs>(args: Prisma.SelectSubset<T, siif_ro_coordinationCreateArgs<ExtArgs>>): Prisma.Prisma__siif_ro_coordinationClient<runtime.Types.Result.GetResult<Prisma.$siif_ro_coordinationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends siif_ro_coordinationCreateManyArgs>(args?: Prisma.SelectSubset<T, siif_ro_coordinationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends siif_ro_coordinationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, siif_ro_coordinationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_ro_coordinationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends siif_ro_coordinationDeleteArgs>(args: Prisma.SelectSubset<T, siif_ro_coordinationDeleteArgs<ExtArgs>>): Prisma.Prisma__siif_ro_coordinationClient<runtime.Types.Result.GetResult<Prisma.$siif_ro_coordinationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends siif_ro_coordinationUpdateArgs>(args: Prisma.SelectSubset<T, siif_ro_coordinationUpdateArgs<ExtArgs>>): Prisma.Prisma__siif_ro_coordinationClient<runtime.Types.Result.GetResult<Prisma.$siif_ro_coordinationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends siif_ro_coordinationDeleteManyArgs>(args?: Prisma.SelectSubset<T, siif_ro_coordinationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends siif_ro_coordinationUpdateManyArgs>(args: Prisma.SelectSubset<T, siif_ro_coordinationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends siif_ro_coordinationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, siif_ro_coordinationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_ro_coordinationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends siif_ro_coordinationUpsertArgs>(args: Prisma.SelectSubset<T, siif_ro_coordinationUpsertArgs<ExtArgs>>): Prisma.Prisma__siif_ro_coordinationClient<runtime.Types.Result.GetResult<Prisma.$siif_ro_coordinationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends siif_ro_coordinationCountArgs>(args?: Prisma.Subset<T, siif_ro_coordinationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Siif_ro_coordinationCountAggregateOutputType> : number>;
    aggregate<T extends Siif_ro_coordinationAggregateArgs>(args: Prisma.Subset<T, Siif_ro_coordinationAggregateArgs>): Prisma.PrismaPromise<GetSiif_ro_coordinationAggregateType<T>>;
    groupBy<T extends siif_ro_coordinationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: siif_ro_coordinationGroupByArgs['orderBy'];
    } : {
        orderBy?: siif_ro_coordinationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, siif_ro_coordinationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiif_ro_coordinationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: siif_ro_coordinationFieldRefs;
}
export interface Prisma__siif_ro_coordinationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface siif_ro_coordinationFieldRefs {
    readonly MID: Prisma.FieldRef<"siif_ro_coordination", 'Int'>;
    readonly division_name: Prisma.FieldRef<"siif_ro_coordination", 'String'>;
    readonly sender_role: Prisma.FieldRef<"siif_ro_coordination", 'String'>;
    readonly sender_id: Prisma.FieldRef<"siif_ro_coordination", 'String'>;
    readonly sender_name: Prisma.FieldRef<"siif_ro_coordination", 'String'>;
    readonly message: Prisma.FieldRef<"siif_ro_coordination", 'String'>;
    readonly created_at: Prisma.FieldRef<"siif_ro_coordination", 'DateTime'>;
}
export type siif_ro_coordinationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_ro_coordinationSelect<ExtArgs> | null;
    omit?: Prisma.siif_ro_coordinationOmit<ExtArgs> | null;
    where: Prisma.siif_ro_coordinationWhereUniqueInput;
};
export type siif_ro_coordinationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_ro_coordinationSelect<ExtArgs> | null;
    omit?: Prisma.siif_ro_coordinationOmit<ExtArgs> | null;
    where: Prisma.siif_ro_coordinationWhereUniqueInput;
};
export type siif_ro_coordinationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_ro_coordinationSelect<ExtArgs> | null;
    omit?: Prisma.siif_ro_coordinationOmit<ExtArgs> | null;
    where?: Prisma.siif_ro_coordinationWhereInput;
    orderBy?: Prisma.siif_ro_coordinationOrderByWithRelationInput | Prisma.siif_ro_coordinationOrderByWithRelationInput[];
    cursor?: Prisma.siif_ro_coordinationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Siif_ro_coordinationScalarFieldEnum | Prisma.Siif_ro_coordinationScalarFieldEnum[];
};
export type siif_ro_coordinationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_ro_coordinationSelect<ExtArgs> | null;
    omit?: Prisma.siif_ro_coordinationOmit<ExtArgs> | null;
    where?: Prisma.siif_ro_coordinationWhereInput;
    orderBy?: Prisma.siif_ro_coordinationOrderByWithRelationInput | Prisma.siif_ro_coordinationOrderByWithRelationInput[];
    cursor?: Prisma.siif_ro_coordinationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Siif_ro_coordinationScalarFieldEnum | Prisma.Siif_ro_coordinationScalarFieldEnum[];
};
export type siif_ro_coordinationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_ro_coordinationSelect<ExtArgs> | null;
    omit?: Prisma.siif_ro_coordinationOmit<ExtArgs> | null;
    where?: Prisma.siif_ro_coordinationWhereInput;
    orderBy?: Prisma.siif_ro_coordinationOrderByWithRelationInput | Prisma.siif_ro_coordinationOrderByWithRelationInput[];
    cursor?: Prisma.siif_ro_coordinationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Siif_ro_coordinationScalarFieldEnum | Prisma.Siif_ro_coordinationScalarFieldEnum[];
};
export type siif_ro_coordinationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_ro_coordinationSelect<ExtArgs> | null;
    omit?: Prisma.siif_ro_coordinationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.siif_ro_coordinationCreateInput, Prisma.siif_ro_coordinationUncheckedCreateInput>;
};
export type siif_ro_coordinationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.siif_ro_coordinationCreateManyInput | Prisma.siif_ro_coordinationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type siif_ro_coordinationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_ro_coordinationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.siif_ro_coordinationOmit<ExtArgs> | null;
    data: Prisma.siif_ro_coordinationCreateManyInput | Prisma.siif_ro_coordinationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type siif_ro_coordinationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_ro_coordinationSelect<ExtArgs> | null;
    omit?: Prisma.siif_ro_coordinationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.siif_ro_coordinationUpdateInput, Prisma.siif_ro_coordinationUncheckedUpdateInput>;
    where: Prisma.siif_ro_coordinationWhereUniqueInput;
};
export type siif_ro_coordinationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.siif_ro_coordinationUpdateManyMutationInput, Prisma.siif_ro_coordinationUncheckedUpdateManyInput>;
    where?: Prisma.siif_ro_coordinationWhereInput;
    limit?: number;
};
export type siif_ro_coordinationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_ro_coordinationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.siif_ro_coordinationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.siif_ro_coordinationUpdateManyMutationInput, Prisma.siif_ro_coordinationUncheckedUpdateManyInput>;
    where?: Prisma.siif_ro_coordinationWhereInput;
    limit?: number;
};
export type siif_ro_coordinationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_ro_coordinationSelect<ExtArgs> | null;
    omit?: Prisma.siif_ro_coordinationOmit<ExtArgs> | null;
    where: Prisma.siif_ro_coordinationWhereUniqueInput;
    create: Prisma.XOR<Prisma.siif_ro_coordinationCreateInput, Prisma.siif_ro_coordinationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.siif_ro_coordinationUpdateInput, Prisma.siif_ro_coordinationUncheckedUpdateInput>;
};
export type siif_ro_coordinationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_ro_coordinationSelect<ExtArgs> | null;
    omit?: Prisma.siif_ro_coordinationOmit<ExtArgs> | null;
    where: Prisma.siif_ro_coordinationWhereUniqueInput;
};
export type siif_ro_coordinationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_ro_coordinationWhereInput;
    limit?: number;
};
export type siif_ro_coordinationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_ro_coordinationSelect<ExtArgs> | null;
    omit?: Prisma.siif_ro_coordinationOmit<ExtArgs> | null;
};
