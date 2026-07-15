import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type co_financeModel = runtime.Types.Result.DefaultSelection<Prisma.$co_financePayload>;
export type AggregateCo_finance = {
    _count: Co_financeCountAggregateOutputType | null;
    _avg: Co_financeAvgAggregateOutputType | null;
    _sum: Co_financeSumAggregateOutputType | null;
    _min: Co_financeMinAggregateOutputType | null;
    _max: Co_financeMaxAggregateOutputType | null;
};
export type Co_financeAvgAggregateOutputType = {
    finance_id: number | null;
    project_id: number | null;
    tranche_1: runtime.Decimal | null;
    tranche_2: runtime.Decimal | null;
    tranche_3: runtime.Decimal | null;
    liquidated_tranche_1: runtime.Decimal | null;
    liquidated_tranche_2: runtime.Decimal | null;
    liquidated_tranche_3: runtime.Decimal | null;
};
export type Co_financeSumAggregateOutputType = {
    finance_id: number | null;
    project_id: number | null;
    tranche_1: runtime.Decimal | null;
    tranche_2: runtime.Decimal | null;
    tranche_3: runtime.Decimal | null;
    liquidated_tranche_1: runtime.Decimal | null;
    liquidated_tranche_2: runtime.Decimal | null;
    liquidated_tranche_3: runtime.Decimal | null;
};
export type Co_financeMinAggregateOutputType = {
    finance_id: number | null;
    project_id: number | null;
    ipc: string | null;
    tranche_1: runtime.Decimal | null;
    tranche_2: runtime.Decimal | null;
    tranche_3: runtime.Decimal | null;
    liquidated_tranche_1: runtime.Decimal | null;
    liquidated_tranche_2: runtime.Decimal | null;
    liquidated_tranche_3: runtime.Decimal | null;
    updated_at: Date | null;
};
export type Co_financeMaxAggregateOutputType = {
    finance_id: number | null;
    project_id: number | null;
    ipc: string | null;
    tranche_1: runtime.Decimal | null;
    tranche_2: runtime.Decimal | null;
    tranche_3: runtime.Decimal | null;
    liquidated_tranche_1: runtime.Decimal | null;
    liquidated_tranche_2: runtime.Decimal | null;
    liquidated_tranche_3: runtime.Decimal | null;
    updated_at: Date | null;
};
export type Co_financeCountAggregateOutputType = {
    finance_id: number;
    project_id: number;
    ipc: number;
    tranche_1: number;
    tranche_2: number;
    tranche_3: number;
    liquidated_tranche_1: number;
    liquidated_tranche_2: number;
    liquidated_tranche_3: number;
    updated_at: number;
    _all: number;
};
export type Co_financeAvgAggregateInputType = {
    finance_id?: true;
    project_id?: true;
    tranche_1?: true;
    tranche_2?: true;
    tranche_3?: true;
    liquidated_tranche_1?: true;
    liquidated_tranche_2?: true;
    liquidated_tranche_3?: true;
};
export type Co_financeSumAggregateInputType = {
    finance_id?: true;
    project_id?: true;
    tranche_1?: true;
    tranche_2?: true;
    tranche_3?: true;
    liquidated_tranche_1?: true;
    liquidated_tranche_2?: true;
    liquidated_tranche_3?: true;
};
export type Co_financeMinAggregateInputType = {
    finance_id?: true;
    project_id?: true;
    ipc?: true;
    tranche_1?: true;
    tranche_2?: true;
    tranche_3?: true;
    liquidated_tranche_1?: true;
    liquidated_tranche_2?: true;
    liquidated_tranche_3?: true;
    updated_at?: true;
};
export type Co_financeMaxAggregateInputType = {
    finance_id?: true;
    project_id?: true;
    ipc?: true;
    tranche_1?: true;
    tranche_2?: true;
    tranche_3?: true;
    liquidated_tranche_1?: true;
    liquidated_tranche_2?: true;
    liquidated_tranche_3?: true;
    updated_at?: true;
};
export type Co_financeCountAggregateInputType = {
    finance_id?: true;
    project_id?: true;
    ipc?: true;
    tranche_1?: true;
    tranche_2?: true;
    tranche_3?: true;
    liquidated_tranche_1?: true;
    liquidated_tranche_2?: true;
    liquidated_tranche_3?: true;
    updated_at?: true;
    _all?: true;
};
export type Co_financeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.co_financeWhereInput;
    orderBy?: Prisma.co_financeOrderByWithRelationInput | Prisma.co_financeOrderByWithRelationInput[];
    cursor?: Prisma.co_financeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Co_financeCountAggregateInputType;
    _avg?: Co_financeAvgAggregateInputType;
    _sum?: Co_financeSumAggregateInputType;
    _min?: Co_financeMinAggregateInputType;
    _max?: Co_financeMaxAggregateInputType;
};
export type GetCo_financeAggregateType<T extends Co_financeAggregateArgs> = {
    [P in keyof T & keyof AggregateCo_finance]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCo_finance[P]> : Prisma.GetScalarType<T[P], AggregateCo_finance[P]>;
};
export type co_financeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.co_financeWhereInput;
    orderBy?: Prisma.co_financeOrderByWithAggregationInput | Prisma.co_financeOrderByWithAggregationInput[];
    by: Prisma.Co_financeScalarFieldEnum[] | Prisma.Co_financeScalarFieldEnum;
    having?: Prisma.co_financeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Co_financeCountAggregateInputType | true;
    _avg?: Co_financeAvgAggregateInputType;
    _sum?: Co_financeSumAggregateInputType;
    _min?: Co_financeMinAggregateInputType;
    _max?: Co_financeMaxAggregateInputType;
};
export type Co_financeGroupByOutputType = {
    finance_id: number;
    project_id: number;
    ipc: string | null;
    tranche_1: runtime.Decimal | null;
    tranche_2: runtime.Decimal | null;
    tranche_3: runtime.Decimal | null;
    liquidated_tranche_1: runtime.Decimal | null;
    liquidated_tranche_2: runtime.Decimal | null;
    liquidated_tranche_3: runtime.Decimal | null;
    updated_at: Date | null;
    _count: Co_financeCountAggregateOutputType | null;
    _avg: Co_financeAvgAggregateOutputType | null;
    _sum: Co_financeSumAggregateOutputType | null;
    _min: Co_financeMinAggregateOutputType | null;
    _max: Co_financeMaxAggregateOutputType | null;
};
export type GetCo_financeGroupByPayload<T extends co_financeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Co_financeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Co_financeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Co_financeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Co_financeGroupByOutputType[P]>;
}>>;
export type co_financeWhereInput = {
    AND?: Prisma.co_financeWhereInput | Prisma.co_financeWhereInput[];
    OR?: Prisma.co_financeWhereInput[];
    NOT?: Prisma.co_financeWhereInput | Prisma.co_financeWhereInput[];
    finance_id?: Prisma.IntFilter<"co_finance"> | number;
    project_id?: Prisma.IntFilter<"co_finance"> | number;
    ipc?: Prisma.StringNullableFilter<"co_finance"> | string | null;
    tranche_1?: Prisma.DecimalNullableFilter<"co_finance"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tranche_2?: Prisma.DecimalNullableFilter<"co_finance"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tranche_3?: Prisma.DecimalNullableFilter<"co_finance"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_1?: Prisma.DecimalNullableFilter<"co_finance"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_2?: Prisma.DecimalNullableFilter<"co_finance"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_3?: Prisma.DecimalNullableFilter<"co_finance"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"co_finance"> | Date | string | null;
};
export type co_financeOrderByWithRelationInput = {
    finance_id?: Prisma.SortOrder;
    project_id?: Prisma.SortOrder;
    ipc?: Prisma.SortOrderInput | Prisma.SortOrder;
    tranche_1?: Prisma.SortOrderInput | Prisma.SortOrder;
    tranche_2?: Prisma.SortOrderInput | Prisma.SortOrder;
    tranche_3?: Prisma.SortOrderInput | Prisma.SortOrder;
    liquidated_tranche_1?: Prisma.SortOrderInput | Prisma.SortOrder;
    liquidated_tranche_2?: Prisma.SortOrderInput | Prisma.SortOrder;
    liquidated_tranche_3?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type co_financeWhereUniqueInput = Prisma.AtLeast<{
    finance_id?: number;
    project_id?: number;
    AND?: Prisma.co_financeWhereInput | Prisma.co_financeWhereInput[];
    OR?: Prisma.co_financeWhereInput[];
    NOT?: Prisma.co_financeWhereInput | Prisma.co_financeWhereInput[];
    ipc?: Prisma.StringNullableFilter<"co_finance"> | string | null;
    tranche_1?: Prisma.DecimalNullableFilter<"co_finance"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tranche_2?: Prisma.DecimalNullableFilter<"co_finance"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tranche_3?: Prisma.DecimalNullableFilter<"co_finance"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_1?: Prisma.DecimalNullableFilter<"co_finance"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_2?: Prisma.DecimalNullableFilter<"co_finance"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_3?: Prisma.DecimalNullableFilter<"co_finance"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"co_finance"> | Date | string | null;
}, "finance_id" | "project_id">;
export type co_financeOrderByWithAggregationInput = {
    finance_id?: Prisma.SortOrder;
    project_id?: Prisma.SortOrder;
    ipc?: Prisma.SortOrderInput | Prisma.SortOrder;
    tranche_1?: Prisma.SortOrderInput | Prisma.SortOrder;
    tranche_2?: Prisma.SortOrderInput | Prisma.SortOrder;
    tranche_3?: Prisma.SortOrderInput | Prisma.SortOrder;
    liquidated_tranche_1?: Prisma.SortOrderInput | Prisma.SortOrder;
    liquidated_tranche_2?: Prisma.SortOrderInput | Prisma.SortOrder;
    liquidated_tranche_3?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.co_financeCountOrderByAggregateInput;
    _avg?: Prisma.co_financeAvgOrderByAggregateInput;
    _max?: Prisma.co_financeMaxOrderByAggregateInput;
    _min?: Prisma.co_financeMinOrderByAggregateInput;
    _sum?: Prisma.co_financeSumOrderByAggregateInput;
};
export type co_financeScalarWhereWithAggregatesInput = {
    AND?: Prisma.co_financeScalarWhereWithAggregatesInput | Prisma.co_financeScalarWhereWithAggregatesInput[];
    OR?: Prisma.co_financeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.co_financeScalarWhereWithAggregatesInput | Prisma.co_financeScalarWhereWithAggregatesInput[];
    finance_id?: Prisma.IntWithAggregatesFilter<"co_finance"> | number;
    project_id?: Prisma.IntWithAggregatesFilter<"co_finance"> | number;
    ipc?: Prisma.StringNullableWithAggregatesFilter<"co_finance"> | string | null;
    tranche_1?: Prisma.DecimalNullableWithAggregatesFilter<"co_finance"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tranche_2?: Prisma.DecimalNullableWithAggregatesFilter<"co_finance"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tranche_3?: Prisma.DecimalNullableWithAggregatesFilter<"co_finance"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_1?: Prisma.DecimalNullableWithAggregatesFilter<"co_finance"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_2?: Prisma.DecimalNullableWithAggregatesFilter<"co_finance"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_3?: Prisma.DecimalNullableWithAggregatesFilter<"co_finance"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"co_finance"> | Date | string | null;
};
export type co_financeCreateInput = {
    project_id: number;
    ipc?: string | null;
    tranche_1?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tranche_2?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tranche_3?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_1?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_2?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_3?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Date | string | null;
};
export type co_financeUncheckedCreateInput = {
    finance_id?: number;
    project_id: number;
    ipc?: string | null;
    tranche_1?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tranche_2?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tranche_3?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_1?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_2?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_3?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Date | string | null;
};
export type co_financeUpdateInput = {
    project_id?: Prisma.IntFieldUpdateOperationsInput | number;
    ipc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tranche_1?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tranche_2?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tranche_3?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_1?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_2?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_3?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type co_financeUncheckedUpdateInput = {
    finance_id?: Prisma.IntFieldUpdateOperationsInput | number;
    project_id?: Prisma.IntFieldUpdateOperationsInput | number;
    ipc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tranche_1?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tranche_2?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tranche_3?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_1?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_2?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_3?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type co_financeCreateManyInput = {
    finance_id?: number;
    project_id: number;
    ipc?: string | null;
    tranche_1?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tranche_2?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tranche_3?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_1?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_2?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_3?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Date | string | null;
};
export type co_financeUpdateManyMutationInput = {
    project_id?: Prisma.IntFieldUpdateOperationsInput | number;
    ipc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tranche_1?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tranche_2?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tranche_3?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_1?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_2?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_3?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type co_financeUncheckedUpdateManyInput = {
    finance_id?: Prisma.IntFieldUpdateOperationsInput | number;
    project_id?: Prisma.IntFieldUpdateOperationsInput | number;
    ipc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tranche_1?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tranche_2?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tranche_3?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_1?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_2?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    liquidated_tranche_3?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type co_financeCountOrderByAggregateInput = {
    finance_id?: Prisma.SortOrder;
    project_id?: Prisma.SortOrder;
    ipc?: Prisma.SortOrder;
    tranche_1?: Prisma.SortOrder;
    tranche_2?: Prisma.SortOrder;
    tranche_3?: Prisma.SortOrder;
    liquidated_tranche_1?: Prisma.SortOrder;
    liquidated_tranche_2?: Prisma.SortOrder;
    liquidated_tranche_3?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type co_financeAvgOrderByAggregateInput = {
    finance_id?: Prisma.SortOrder;
    project_id?: Prisma.SortOrder;
    tranche_1?: Prisma.SortOrder;
    tranche_2?: Prisma.SortOrder;
    tranche_3?: Prisma.SortOrder;
    liquidated_tranche_1?: Prisma.SortOrder;
    liquidated_tranche_2?: Prisma.SortOrder;
    liquidated_tranche_3?: Prisma.SortOrder;
};
export type co_financeMaxOrderByAggregateInput = {
    finance_id?: Prisma.SortOrder;
    project_id?: Prisma.SortOrder;
    ipc?: Prisma.SortOrder;
    tranche_1?: Prisma.SortOrder;
    tranche_2?: Prisma.SortOrder;
    tranche_3?: Prisma.SortOrder;
    liquidated_tranche_1?: Prisma.SortOrder;
    liquidated_tranche_2?: Prisma.SortOrder;
    liquidated_tranche_3?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type co_financeMinOrderByAggregateInput = {
    finance_id?: Prisma.SortOrder;
    project_id?: Prisma.SortOrder;
    ipc?: Prisma.SortOrder;
    tranche_1?: Prisma.SortOrder;
    tranche_2?: Prisma.SortOrder;
    tranche_3?: Prisma.SortOrder;
    liquidated_tranche_1?: Prisma.SortOrder;
    liquidated_tranche_2?: Prisma.SortOrder;
    liquidated_tranche_3?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type co_financeSumOrderByAggregateInput = {
    finance_id?: Prisma.SortOrder;
    project_id?: Prisma.SortOrder;
    tranche_1?: Prisma.SortOrder;
    tranche_2?: Prisma.SortOrder;
    tranche_3?: Prisma.SortOrder;
    liquidated_tranche_1?: Prisma.SortOrder;
    liquidated_tranche_2?: Prisma.SortOrder;
    liquidated_tranche_3?: Prisma.SortOrder;
};
export type co_financeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    finance_id?: boolean;
    project_id?: boolean;
    ipc?: boolean;
    tranche_1?: boolean;
    tranche_2?: boolean;
    tranche_3?: boolean;
    liquidated_tranche_1?: boolean;
    liquidated_tranche_2?: boolean;
    liquidated_tranche_3?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["co_finance"]>;
export type co_financeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    finance_id?: boolean;
    project_id?: boolean;
    ipc?: boolean;
    tranche_1?: boolean;
    tranche_2?: boolean;
    tranche_3?: boolean;
    liquidated_tranche_1?: boolean;
    liquidated_tranche_2?: boolean;
    liquidated_tranche_3?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["co_finance"]>;
export type co_financeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    finance_id?: boolean;
    project_id?: boolean;
    ipc?: boolean;
    tranche_1?: boolean;
    tranche_2?: boolean;
    tranche_3?: boolean;
    liquidated_tranche_1?: boolean;
    liquidated_tranche_2?: boolean;
    liquidated_tranche_3?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["co_finance"]>;
export type co_financeSelectScalar = {
    finance_id?: boolean;
    project_id?: boolean;
    ipc?: boolean;
    tranche_1?: boolean;
    tranche_2?: boolean;
    tranche_3?: boolean;
    liquidated_tranche_1?: boolean;
    liquidated_tranche_2?: boolean;
    liquidated_tranche_3?: boolean;
    updated_at?: boolean;
};
export type co_financeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"finance_id" | "project_id" | "ipc" | "tranche_1" | "tranche_2" | "tranche_3" | "liquidated_tranche_1" | "liquidated_tranche_2" | "liquidated_tranche_3" | "updated_at", ExtArgs["result"]["co_finance"]>;
export type $co_financePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "co_finance";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        finance_id: number;
        project_id: number;
        ipc: string | null;
        tranche_1: runtime.Decimal | null;
        tranche_2: runtime.Decimal | null;
        tranche_3: runtime.Decimal | null;
        liquidated_tranche_1: runtime.Decimal | null;
        liquidated_tranche_2: runtime.Decimal | null;
        liquidated_tranche_3: runtime.Decimal | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["co_finance"]>;
    composites: {};
};
export type co_financeGetPayload<S extends boolean | null | undefined | co_financeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$co_financePayload, S>;
export type co_financeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<co_financeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Co_financeCountAggregateInputType | true;
};
export interface co_financeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['co_finance'];
        meta: {
            name: 'co_finance';
        };
    };
    findUnique<T extends co_financeFindUniqueArgs>(args: Prisma.SelectSubset<T, co_financeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__co_financeClient<runtime.Types.Result.GetResult<Prisma.$co_financePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends co_financeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, co_financeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__co_financeClient<runtime.Types.Result.GetResult<Prisma.$co_financePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends co_financeFindFirstArgs>(args?: Prisma.SelectSubset<T, co_financeFindFirstArgs<ExtArgs>>): Prisma.Prisma__co_financeClient<runtime.Types.Result.GetResult<Prisma.$co_financePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends co_financeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, co_financeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__co_financeClient<runtime.Types.Result.GetResult<Prisma.$co_financePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends co_financeFindManyArgs>(args?: Prisma.SelectSubset<T, co_financeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$co_financePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends co_financeCreateArgs>(args: Prisma.SelectSubset<T, co_financeCreateArgs<ExtArgs>>): Prisma.Prisma__co_financeClient<runtime.Types.Result.GetResult<Prisma.$co_financePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends co_financeCreateManyArgs>(args?: Prisma.SelectSubset<T, co_financeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends co_financeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, co_financeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$co_financePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends co_financeDeleteArgs>(args: Prisma.SelectSubset<T, co_financeDeleteArgs<ExtArgs>>): Prisma.Prisma__co_financeClient<runtime.Types.Result.GetResult<Prisma.$co_financePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends co_financeUpdateArgs>(args: Prisma.SelectSubset<T, co_financeUpdateArgs<ExtArgs>>): Prisma.Prisma__co_financeClient<runtime.Types.Result.GetResult<Prisma.$co_financePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends co_financeDeleteManyArgs>(args?: Prisma.SelectSubset<T, co_financeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends co_financeUpdateManyArgs>(args: Prisma.SelectSubset<T, co_financeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends co_financeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, co_financeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$co_financePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends co_financeUpsertArgs>(args: Prisma.SelectSubset<T, co_financeUpsertArgs<ExtArgs>>): Prisma.Prisma__co_financeClient<runtime.Types.Result.GetResult<Prisma.$co_financePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends co_financeCountArgs>(args?: Prisma.Subset<T, co_financeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Co_financeCountAggregateOutputType> : number>;
    aggregate<T extends Co_financeAggregateArgs>(args: Prisma.Subset<T, Co_financeAggregateArgs>): Prisma.PrismaPromise<GetCo_financeAggregateType<T>>;
    groupBy<T extends co_financeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: co_financeGroupByArgs['orderBy'];
    } : {
        orderBy?: co_financeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, co_financeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCo_financeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: co_financeFieldRefs;
}
export interface Prisma__co_financeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface co_financeFieldRefs {
    readonly finance_id: Prisma.FieldRef<"co_finance", 'Int'>;
    readonly project_id: Prisma.FieldRef<"co_finance", 'Int'>;
    readonly ipc: Prisma.FieldRef<"co_finance", 'String'>;
    readonly tranche_1: Prisma.FieldRef<"co_finance", 'Decimal'>;
    readonly tranche_2: Prisma.FieldRef<"co_finance", 'Decimal'>;
    readonly tranche_3: Prisma.FieldRef<"co_finance", 'Decimal'>;
    readonly liquidated_tranche_1: Prisma.FieldRef<"co_finance", 'Decimal'>;
    readonly liquidated_tranche_2: Prisma.FieldRef<"co_finance", 'Decimal'>;
    readonly liquidated_tranche_3: Prisma.FieldRef<"co_finance", 'Decimal'>;
    readonly updated_at: Prisma.FieldRef<"co_finance", 'DateTime'>;
}
export type co_financeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.co_financeSelect<ExtArgs> | null;
    omit?: Prisma.co_financeOmit<ExtArgs> | null;
    where: Prisma.co_financeWhereUniqueInput;
};
export type co_financeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.co_financeSelect<ExtArgs> | null;
    omit?: Prisma.co_financeOmit<ExtArgs> | null;
    where: Prisma.co_financeWhereUniqueInput;
};
export type co_financeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.co_financeSelect<ExtArgs> | null;
    omit?: Prisma.co_financeOmit<ExtArgs> | null;
    where?: Prisma.co_financeWhereInput;
    orderBy?: Prisma.co_financeOrderByWithRelationInput | Prisma.co_financeOrderByWithRelationInput[];
    cursor?: Prisma.co_financeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Co_financeScalarFieldEnum | Prisma.Co_financeScalarFieldEnum[];
};
export type co_financeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.co_financeSelect<ExtArgs> | null;
    omit?: Prisma.co_financeOmit<ExtArgs> | null;
    where?: Prisma.co_financeWhereInput;
    orderBy?: Prisma.co_financeOrderByWithRelationInput | Prisma.co_financeOrderByWithRelationInput[];
    cursor?: Prisma.co_financeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Co_financeScalarFieldEnum | Prisma.Co_financeScalarFieldEnum[];
};
export type co_financeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.co_financeSelect<ExtArgs> | null;
    omit?: Prisma.co_financeOmit<ExtArgs> | null;
    where?: Prisma.co_financeWhereInput;
    orderBy?: Prisma.co_financeOrderByWithRelationInput | Prisma.co_financeOrderByWithRelationInput[];
    cursor?: Prisma.co_financeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Co_financeScalarFieldEnum | Prisma.Co_financeScalarFieldEnum[];
};
export type co_financeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.co_financeSelect<ExtArgs> | null;
    omit?: Prisma.co_financeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.co_financeCreateInput, Prisma.co_financeUncheckedCreateInput>;
};
export type co_financeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.co_financeCreateManyInput | Prisma.co_financeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type co_financeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.co_financeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.co_financeOmit<ExtArgs> | null;
    data: Prisma.co_financeCreateManyInput | Prisma.co_financeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type co_financeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.co_financeSelect<ExtArgs> | null;
    omit?: Prisma.co_financeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.co_financeUpdateInput, Prisma.co_financeUncheckedUpdateInput>;
    where: Prisma.co_financeWhereUniqueInput;
};
export type co_financeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.co_financeUpdateManyMutationInput, Prisma.co_financeUncheckedUpdateManyInput>;
    where?: Prisma.co_financeWhereInput;
    limit?: number;
};
export type co_financeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.co_financeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.co_financeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.co_financeUpdateManyMutationInput, Prisma.co_financeUncheckedUpdateManyInput>;
    where?: Prisma.co_financeWhereInput;
    limit?: number;
};
export type co_financeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.co_financeSelect<ExtArgs> | null;
    omit?: Prisma.co_financeOmit<ExtArgs> | null;
    where: Prisma.co_financeWhereUniqueInput;
    create: Prisma.XOR<Prisma.co_financeCreateInput, Prisma.co_financeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.co_financeUpdateInput, Prisma.co_financeUncheckedUpdateInput>;
};
export type co_financeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.co_financeSelect<ExtArgs> | null;
    omit?: Prisma.co_financeOmit<ExtArgs> | null;
    where: Prisma.co_financeWhereUniqueInput;
};
export type co_financeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.co_financeWhereInput;
    limit?: number;
};
export type co_financeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.co_financeSelect<ExtArgs> | null;
    omit?: Prisma.co_financeOmit<ExtArgs> | null;
};
