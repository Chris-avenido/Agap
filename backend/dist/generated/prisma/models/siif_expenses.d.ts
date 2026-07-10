import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type siif_expensesModel = runtime.Types.Result.DefaultSelection<Prisma.$siif_expensesPayload>;
export type AggregateSiif_expenses = {
    _count: Siif_expensesCountAggregateOutputType | null;
    _avg: Siif_expensesAvgAggregateOutputType | null;
    _sum: Siif_expensesSumAggregateOutputType | null;
    _min: Siif_expensesMinAggregateOutputType | null;
    _max: Siif_expensesMaxAggregateOutputType | null;
};
export type Siif_expensesAvgAggregateOutputType = {
    id: number | null;
    amount: runtime.Decimal | null;
};
export type Siif_expensesSumAggregateOutputType = {
    id: number | null;
    amount: runtime.Decimal | null;
};
export type Siif_expensesMinAggregateOutputType = {
    id: number | null;
    school_id: string | null;
    description: string | null;
    category: string | null;
    amount: runtime.Decimal | null;
    expense_date: Date | null;
    created_at: Date | null;
};
export type Siif_expensesMaxAggregateOutputType = {
    id: number | null;
    school_id: string | null;
    description: string | null;
    category: string | null;
    amount: runtime.Decimal | null;
    expense_date: Date | null;
    created_at: Date | null;
};
export type Siif_expensesCountAggregateOutputType = {
    id: number;
    school_id: number;
    description: number;
    category: number;
    amount: number;
    expense_date: number;
    created_at: number;
    _all: number;
};
export type Siif_expensesAvgAggregateInputType = {
    id?: true;
    amount?: true;
};
export type Siif_expensesSumAggregateInputType = {
    id?: true;
    amount?: true;
};
export type Siif_expensesMinAggregateInputType = {
    id?: true;
    school_id?: true;
    description?: true;
    category?: true;
    amount?: true;
    expense_date?: true;
    created_at?: true;
};
export type Siif_expensesMaxAggregateInputType = {
    id?: true;
    school_id?: true;
    description?: true;
    category?: true;
    amount?: true;
    expense_date?: true;
    created_at?: true;
};
export type Siif_expensesCountAggregateInputType = {
    id?: true;
    school_id?: true;
    description?: true;
    category?: true;
    amount?: true;
    expense_date?: true;
    created_at?: true;
    _all?: true;
};
export type Siif_expensesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_expensesWhereInput;
    orderBy?: Prisma.siif_expensesOrderByWithRelationInput | Prisma.siif_expensesOrderByWithRelationInput[];
    cursor?: Prisma.siif_expensesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Siif_expensesCountAggregateInputType;
    _avg?: Siif_expensesAvgAggregateInputType;
    _sum?: Siif_expensesSumAggregateInputType;
    _min?: Siif_expensesMinAggregateInputType;
    _max?: Siif_expensesMaxAggregateInputType;
};
export type GetSiif_expensesAggregateType<T extends Siif_expensesAggregateArgs> = {
    [P in keyof T & keyof AggregateSiif_expenses]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSiif_expenses[P]> : Prisma.GetScalarType<T[P], AggregateSiif_expenses[P]>;
};
export type siif_expensesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_expensesWhereInput;
    orderBy?: Prisma.siif_expensesOrderByWithAggregationInput | Prisma.siif_expensesOrderByWithAggregationInput[];
    by: Prisma.Siif_expensesScalarFieldEnum[] | Prisma.Siif_expensesScalarFieldEnum;
    having?: Prisma.siif_expensesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Siif_expensesCountAggregateInputType | true;
    _avg?: Siif_expensesAvgAggregateInputType;
    _sum?: Siif_expensesSumAggregateInputType;
    _min?: Siif_expensesMinAggregateInputType;
    _max?: Siif_expensesMaxAggregateInputType;
};
export type Siif_expensesGroupByOutputType = {
    id: number;
    school_id: string;
    description: string;
    category: string;
    amount: runtime.Decimal;
    expense_date: Date | null;
    created_at: Date | null;
    _count: Siif_expensesCountAggregateOutputType | null;
    _avg: Siif_expensesAvgAggregateOutputType | null;
    _sum: Siif_expensesSumAggregateOutputType | null;
    _min: Siif_expensesMinAggregateOutputType | null;
    _max: Siif_expensesMaxAggregateOutputType | null;
};
export type GetSiif_expensesGroupByPayload<T extends siif_expensesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Siif_expensesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Siif_expensesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Siif_expensesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Siif_expensesGroupByOutputType[P]>;
}>>;
export type siif_expensesWhereInput = {
    AND?: Prisma.siif_expensesWhereInput | Prisma.siif_expensesWhereInput[];
    OR?: Prisma.siif_expensesWhereInput[];
    NOT?: Prisma.siif_expensesWhereInput | Prisma.siif_expensesWhereInput[];
    id?: Prisma.IntFilter<"siif_expenses"> | number;
    school_id?: Prisma.StringFilter<"siif_expenses"> | string;
    description?: Prisma.StringFilter<"siif_expenses"> | string;
    category?: Prisma.StringFilter<"siif_expenses"> | string;
    amount?: Prisma.DecimalFilter<"siif_expenses"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    expense_date?: Prisma.DateTimeNullableFilter<"siif_expenses"> | Date | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"siif_expenses"> | Date | string | null;
};
export type siif_expensesOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    expense_date?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type siif_expensesWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.siif_expensesWhereInput | Prisma.siif_expensesWhereInput[];
    OR?: Prisma.siif_expensesWhereInput[];
    NOT?: Prisma.siif_expensesWhereInput | Prisma.siif_expensesWhereInput[];
    school_id?: Prisma.StringFilter<"siif_expenses"> | string;
    description?: Prisma.StringFilter<"siif_expenses"> | string;
    category?: Prisma.StringFilter<"siif_expenses"> | string;
    amount?: Prisma.DecimalFilter<"siif_expenses"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    expense_date?: Prisma.DateTimeNullableFilter<"siif_expenses"> | Date | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"siif_expenses"> | Date | string | null;
}, "id">;
export type siif_expensesOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    expense_date?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.siif_expensesCountOrderByAggregateInput;
    _avg?: Prisma.siif_expensesAvgOrderByAggregateInput;
    _max?: Prisma.siif_expensesMaxOrderByAggregateInput;
    _min?: Prisma.siif_expensesMinOrderByAggregateInput;
    _sum?: Prisma.siif_expensesSumOrderByAggregateInput;
};
export type siif_expensesScalarWhereWithAggregatesInput = {
    AND?: Prisma.siif_expensesScalarWhereWithAggregatesInput | Prisma.siif_expensesScalarWhereWithAggregatesInput[];
    OR?: Prisma.siif_expensesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.siif_expensesScalarWhereWithAggregatesInput | Prisma.siif_expensesScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"siif_expenses"> | number;
    school_id?: Prisma.StringWithAggregatesFilter<"siif_expenses"> | string;
    description?: Prisma.StringWithAggregatesFilter<"siif_expenses"> | string;
    category?: Prisma.StringWithAggregatesFilter<"siif_expenses"> | string;
    amount?: Prisma.DecimalWithAggregatesFilter<"siif_expenses"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    expense_date?: Prisma.DateTimeNullableWithAggregatesFilter<"siif_expenses"> | Date | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"siif_expenses"> | Date | string | null;
};
export type siif_expensesCreateInput = {
    school_id: string;
    description: string;
    category: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    expense_date?: Date | string | null;
    created_at?: Date | string | null;
};
export type siif_expensesUncheckedCreateInput = {
    id?: number;
    school_id: string;
    description: string;
    category: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    expense_date?: Date | string | null;
    created_at?: Date | string | null;
};
export type siif_expensesUpdateInput = {
    school_id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    expense_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type siif_expensesUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    expense_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type siif_expensesCreateManyInput = {
    id?: number;
    school_id: string;
    description: string;
    category: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    expense_date?: Date | string | null;
    created_at?: Date | string | null;
};
export type siif_expensesUpdateManyMutationInput = {
    school_id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    expense_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type siif_expensesUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    expense_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type siif_expensesCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    expense_date?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type siif_expensesAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type siif_expensesMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    expense_date?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type siif_expensesMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    expense_date?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type siif_expensesSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type siif_expensesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    description?: boolean;
    category?: boolean;
    amount?: boolean;
    expense_date?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["siif_expenses"]>;
export type siif_expensesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    description?: boolean;
    category?: boolean;
    amount?: boolean;
    expense_date?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["siif_expenses"]>;
export type siif_expensesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    school_id?: boolean;
    description?: boolean;
    category?: boolean;
    amount?: boolean;
    expense_date?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["siif_expenses"]>;
export type siif_expensesSelectScalar = {
    id?: boolean;
    school_id?: boolean;
    description?: boolean;
    category?: boolean;
    amount?: boolean;
    expense_date?: boolean;
    created_at?: boolean;
};
export type siif_expensesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "school_id" | "description" | "category" | "amount" | "expense_date" | "created_at", ExtArgs["result"]["siif_expenses"]>;
export type $siif_expensesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "siif_expenses";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        school_id: string;
        description: string;
        category: string;
        amount: runtime.Decimal;
        expense_date: Date | null;
        created_at: Date | null;
    }, ExtArgs["result"]["siif_expenses"]>;
    composites: {};
};
export type siif_expensesGetPayload<S extends boolean | null | undefined | siif_expensesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$siif_expensesPayload, S>;
export type siif_expensesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<siif_expensesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Siif_expensesCountAggregateInputType | true;
};
export interface siif_expensesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['siif_expenses'];
        meta: {
            name: 'siif_expenses';
        };
    };
    findUnique<T extends siif_expensesFindUniqueArgs>(args: Prisma.SelectSubset<T, siif_expensesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__siif_expensesClient<runtime.Types.Result.GetResult<Prisma.$siif_expensesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends siif_expensesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, siif_expensesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__siif_expensesClient<runtime.Types.Result.GetResult<Prisma.$siif_expensesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends siif_expensesFindFirstArgs>(args?: Prisma.SelectSubset<T, siif_expensesFindFirstArgs<ExtArgs>>): Prisma.Prisma__siif_expensesClient<runtime.Types.Result.GetResult<Prisma.$siif_expensesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends siif_expensesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, siif_expensesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__siif_expensesClient<runtime.Types.Result.GetResult<Prisma.$siif_expensesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends siif_expensesFindManyArgs>(args?: Prisma.SelectSubset<T, siif_expensesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_expensesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends siif_expensesCreateArgs>(args: Prisma.SelectSubset<T, siif_expensesCreateArgs<ExtArgs>>): Prisma.Prisma__siif_expensesClient<runtime.Types.Result.GetResult<Prisma.$siif_expensesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends siif_expensesCreateManyArgs>(args?: Prisma.SelectSubset<T, siif_expensesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends siif_expensesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, siif_expensesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_expensesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends siif_expensesDeleteArgs>(args: Prisma.SelectSubset<T, siif_expensesDeleteArgs<ExtArgs>>): Prisma.Prisma__siif_expensesClient<runtime.Types.Result.GetResult<Prisma.$siif_expensesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends siif_expensesUpdateArgs>(args: Prisma.SelectSubset<T, siif_expensesUpdateArgs<ExtArgs>>): Prisma.Prisma__siif_expensesClient<runtime.Types.Result.GetResult<Prisma.$siif_expensesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends siif_expensesDeleteManyArgs>(args?: Prisma.SelectSubset<T, siif_expensesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends siif_expensesUpdateManyArgs>(args: Prisma.SelectSubset<T, siif_expensesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends siif_expensesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, siif_expensesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_expensesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends siif_expensesUpsertArgs>(args: Prisma.SelectSubset<T, siif_expensesUpsertArgs<ExtArgs>>): Prisma.Prisma__siif_expensesClient<runtime.Types.Result.GetResult<Prisma.$siif_expensesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends siif_expensesCountArgs>(args?: Prisma.Subset<T, siif_expensesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Siif_expensesCountAggregateOutputType> : number>;
    aggregate<T extends Siif_expensesAggregateArgs>(args: Prisma.Subset<T, Siif_expensesAggregateArgs>): Prisma.PrismaPromise<GetSiif_expensesAggregateType<T>>;
    groupBy<T extends siif_expensesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: siif_expensesGroupByArgs['orderBy'];
    } : {
        orderBy?: siif_expensesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, siif_expensesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiif_expensesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: siif_expensesFieldRefs;
}
export interface Prisma__siif_expensesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface siif_expensesFieldRefs {
    readonly id: Prisma.FieldRef<"siif_expenses", 'Int'>;
    readonly school_id: Prisma.FieldRef<"siif_expenses", 'String'>;
    readonly description: Prisma.FieldRef<"siif_expenses", 'String'>;
    readonly category: Prisma.FieldRef<"siif_expenses", 'String'>;
    readonly amount: Prisma.FieldRef<"siif_expenses", 'Decimal'>;
    readonly expense_date: Prisma.FieldRef<"siif_expenses", 'DateTime'>;
    readonly created_at: Prisma.FieldRef<"siif_expenses", 'DateTime'>;
}
export type siif_expensesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_expensesSelect<ExtArgs> | null;
    omit?: Prisma.siif_expensesOmit<ExtArgs> | null;
    where: Prisma.siif_expensesWhereUniqueInput;
};
export type siif_expensesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_expensesSelect<ExtArgs> | null;
    omit?: Prisma.siif_expensesOmit<ExtArgs> | null;
    where: Prisma.siif_expensesWhereUniqueInput;
};
export type siif_expensesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_expensesSelect<ExtArgs> | null;
    omit?: Prisma.siif_expensesOmit<ExtArgs> | null;
    where?: Prisma.siif_expensesWhereInput;
    orderBy?: Prisma.siif_expensesOrderByWithRelationInput | Prisma.siif_expensesOrderByWithRelationInput[];
    cursor?: Prisma.siif_expensesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Siif_expensesScalarFieldEnum | Prisma.Siif_expensesScalarFieldEnum[];
};
export type siif_expensesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_expensesSelect<ExtArgs> | null;
    omit?: Prisma.siif_expensesOmit<ExtArgs> | null;
    where?: Prisma.siif_expensesWhereInput;
    orderBy?: Prisma.siif_expensesOrderByWithRelationInput | Prisma.siif_expensesOrderByWithRelationInput[];
    cursor?: Prisma.siif_expensesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Siif_expensesScalarFieldEnum | Prisma.Siif_expensesScalarFieldEnum[];
};
export type siif_expensesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_expensesSelect<ExtArgs> | null;
    omit?: Prisma.siif_expensesOmit<ExtArgs> | null;
    where?: Prisma.siif_expensesWhereInput;
    orderBy?: Prisma.siif_expensesOrderByWithRelationInput | Prisma.siif_expensesOrderByWithRelationInput[];
    cursor?: Prisma.siif_expensesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Siif_expensesScalarFieldEnum | Prisma.Siif_expensesScalarFieldEnum[];
};
export type siif_expensesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_expensesSelect<ExtArgs> | null;
    omit?: Prisma.siif_expensesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.siif_expensesCreateInput, Prisma.siif_expensesUncheckedCreateInput>;
};
export type siif_expensesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.siif_expensesCreateManyInput | Prisma.siif_expensesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type siif_expensesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_expensesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.siif_expensesOmit<ExtArgs> | null;
    data: Prisma.siif_expensesCreateManyInput | Prisma.siif_expensesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type siif_expensesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_expensesSelect<ExtArgs> | null;
    omit?: Prisma.siif_expensesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.siif_expensesUpdateInput, Prisma.siif_expensesUncheckedUpdateInput>;
    where: Prisma.siif_expensesWhereUniqueInput;
};
export type siif_expensesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.siif_expensesUpdateManyMutationInput, Prisma.siif_expensesUncheckedUpdateManyInput>;
    where?: Prisma.siif_expensesWhereInput;
    limit?: number;
};
export type siif_expensesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_expensesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.siif_expensesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.siif_expensesUpdateManyMutationInput, Prisma.siif_expensesUncheckedUpdateManyInput>;
    where?: Prisma.siif_expensesWhereInput;
    limit?: number;
};
export type siif_expensesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_expensesSelect<ExtArgs> | null;
    omit?: Prisma.siif_expensesOmit<ExtArgs> | null;
    where: Prisma.siif_expensesWhereUniqueInput;
    create: Prisma.XOR<Prisma.siif_expensesCreateInput, Prisma.siif_expensesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.siif_expensesUpdateInput, Prisma.siif_expensesUncheckedUpdateInput>;
};
export type siif_expensesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_expensesSelect<ExtArgs> | null;
    omit?: Prisma.siif_expensesOmit<ExtArgs> | null;
    where: Prisma.siif_expensesWhereUniqueInput;
};
export type siif_expensesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_expensesWhereInput;
    limit?: number;
};
export type siif_expensesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_expensesSelect<ExtArgs> | null;
    omit?: Prisma.siif_expensesOmit<ExtArgs> | null;
};
