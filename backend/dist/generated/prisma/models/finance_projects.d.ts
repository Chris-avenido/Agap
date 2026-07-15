import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type finance_projectsModel = runtime.Types.Result.DefaultSelection<Prisma.$finance_projectsPayload>;
export type AggregateFinance_projects = {
    _count: Finance_projectsCountAggregateOutputType | null;
    _avg: Finance_projectsAvgAggregateOutputType | null;
    _sum: Finance_projectsSumAggregateOutputType | null;
    _min: Finance_projectsMinAggregateOutputType | null;
    _max: Finance_projectsMaxAggregateOutputType | null;
};
export type Finance_projectsAvgAggregateOutputType = {
    finance_id: number | null;
    total_funds: runtime.Decimal | null;
    fund_released: runtime.Decimal | null;
};
export type Finance_projectsSumAggregateOutputType = {
    finance_id: number | null;
    total_funds: runtime.Decimal | null;
    fund_released: runtime.Decimal | null;
};
export type Finance_projectsMinAggregateOutputType = {
    finance_id: number | null;
    school_id: string | null;
    school_name: string | null;
    project_name: string | null;
    region: string | null;
    division: string | null;
    municipality: string | null;
    district: string | null;
    legislative_district: string | null;
    total_funds: runtime.Decimal | null;
    fund_released: runtime.Decimal | null;
    date_of_release: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
    root_id: string | null;
};
export type Finance_projectsMaxAggregateOutputType = {
    finance_id: number | null;
    school_id: string | null;
    school_name: string | null;
    project_name: string | null;
    region: string | null;
    division: string | null;
    municipality: string | null;
    district: string | null;
    legislative_district: string | null;
    total_funds: runtime.Decimal | null;
    fund_released: runtime.Decimal | null;
    date_of_release: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
    root_id: string | null;
};
export type Finance_projectsCountAggregateOutputType = {
    finance_id: number;
    school_id: number;
    school_name: number;
    project_name: number;
    region: number;
    division: number;
    municipality: number;
    district: number;
    legislative_district: number;
    total_funds: number;
    fund_released: number;
    date_of_release: number;
    created_at: number;
    updated_at: number;
    root_id: number;
    _all: number;
};
export type Finance_projectsAvgAggregateInputType = {
    finance_id?: true;
    total_funds?: true;
    fund_released?: true;
};
export type Finance_projectsSumAggregateInputType = {
    finance_id?: true;
    total_funds?: true;
    fund_released?: true;
};
export type Finance_projectsMinAggregateInputType = {
    finance_id?: true;
    school_id?: true;
    school_name?: true;
    project_name?: true;
    region?: true;
    division?: true;
    municipality?: true;
    district?: true;
    legislative_district?: true;
    total_funds?: true;
    fund_released?: true;
    date_of_release?: true;
    created_at?: true;
    updated_at?: true;
    root_id?: true;
};
export type Finance_projectsMaxAggregateInputType = {
    finance_id?: true;
    school_id?: true;
    school_name?: true;
    project_name?: true;
    region?: true;
    division?: true;
    municipality?: true;
    district?: true;
    legislative_district?: true;
    total_funds?: true;
    fund_released?: true;
    date_of_release?: true;
    created_at?: true;
    updated_at?: true;
    root_id?: true;
};
export type Finance_projectsCountAggregateInputType = {
    finance_id?: true;
    school_id?: true;
    school_name?: true;
    project_name?: true;
    region?: true;
    division?: true;
    municipality?: true;
    district?: true;
    legislative_district?: true;
    total_funds?: true;
    fund_released?: true;
    date_of_release?: true;
    created_at?: true;
    updated_at?: true;
    root_id?: true;
    _all?: true;
};
export type Finance_projectsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.finance_projectsWhereInput;
    orderBy?: Prisma.finance_projectsOrderByWithRelationInput | Prisma.finance_projectsOrderByWithRelationInput[];
    cursor?: Prisma.finance_projectsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Finance_projectsCountAggregateInputType;
    _avg?: Finance_projectsAvgAggregateInputType;
    _sum?: Finance_projectsSumAggregateInputType;
    _min?: Finance_projectsMinAggregateInputType;
    _max?: Finance_projectsMaxAggregateInputType;
};
export type GetFinance_projectsAggregateType<T extends Finance_projectsAggregateArgs> = {
    [P in keyof T & keyof AggregateFinance_projects]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFinance_projects[P]> : Prisma.GetScalarType<T[P], AggregateFinance_projects[P]>;
};
export type finance_projectsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.finance_projectsWhereInput;
    orderBy?: Prisma.finance_projectsOrderByWithAggregationInput | Prisma.finance_projectsOrderByWithAggregationInput[];
    by: Prisma.Finance_projectsScalarFieldEnum[] | Prisma.Finance_projectsScalarFieldEnum;
    having?: Prisma.finance_projectsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Finance_projectsCountAggregateInputType | true;
    _avg?: Finance_projectsAvgAggregateInputType;
    _sum?: Finance_projectsSumAggregateInputType;
    _min?: Finance_projectsMinAggregateInputType;
    _max?: Finance_projectsMaxAggregateInputType;
};
export type Finance_projectsGroupByOutputType = {
    finance_id: number;
    school_id: string;
    school_name: string | null;
    project_name: string | null;
    region: string | null;
    division: string | null;
    municipality: string | null;
    district: string | null;
    legislative_district: string | null;
    total_funds: runtime.Decimal | null;
    fund_released: runtime.Decimal | null;
    date_of_release: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
    root_id: string | null;
    _count: Finance_projectsCountAggregateOutputType | null;
    _avg: Finance_projectsAvgAggregateOutputType | null;
    _sum: Finance_projectsSumAggregateOutputType | null;
    _min: Finance_projectsMinAggregateOutputType | null;
    _max: Finance_projectsMaxAggregateOutputType | null;
};
export type GetFinance_projectsGroupByPayload<T extends finance_projectsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Finance_projectsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Finance_projectsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Finance_projectsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Finance_projectsGroupByOutputType[P]>;
}>>;
export type finance_projectsWhereInput = {
    AND?: Prisma.finance_projectsWhereInput | Prisma.finance_projectsWhereInput[];
    OR?: Prisma.finance_projectsWhereInput[];
    NOT?: Prisma.finance_projectsWhereInput | Prisma.finance_projectsWhereInput[];
    finance_id?: Prisma.IntFilter<"finance_projects"> | number;
    school_id?: Prisma.StringFilter<"finance_projects"> | string;
    school_name?: Prisma.StringNullableFilter<"finance_projects"> | string | null;
    project_name?: Prisma.StringNullableFilter<"finance_projects"> | string | null;
    region?: Prisma.StringNullableFilter<"finance_projects"> | string | null;
    division?: Prisma.StringNullableFilter<"finance_projects"> | string | null;
    municipality?: Prisma.StringNullableFilter<"finance_projects"> | string | null;
    district?: Prisma.StringNullableFilter<"finance_projects"> | string | null;
    legislative_district?: Prisma.StringNullableFilter<"finance_projects"> | string | null;
    total_funds?: Prisma.DecimalNullableFilter<"finance_projects"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fund_released?: Prisma.DecimalNullableFilter<"finance_projects"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    date_of_release?: Prisma.DateTimeNullableFilter<"finance_projects"> | Date | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"finance_projects"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"finance_projects"> | Date | string | null;
    root_id?: Prisma.StringNullableFilter<"finance_projects"> | string | null;
};
export type finance_projectsOrderByWithRelationInput = {
    finance_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    school_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    project_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    region?: Prisma.SortOrderInput | Prisma.SortOrder;
    division?: Prisma.SortOrderInput | Prisma.SortOrder;
    municipality?: Prisma.SortOrderInput | Prisma.SortOrder;
    district?: Prisma.SortOrderInput | Prisma.SortOrder;
    legislative_district?: Prisma.SortOrderInput | Prisma.SortOrder;
    total_funds?: Prisma.SortOrderInput | Prisma.SortOrder;
    fund_released?: Prisma.SortOrderInput | Prisma.SortOrder;
    date_of_release?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    root_id?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type finance_projectsWhereUniqueInput = Prisma.AtLeast<{
    finance_id?: number;
    AND?: Prisma.finance_projectsWhereInput | Prisma.finance_projectsWhereInput[];
    OR?: Prisma.finance_projectsWhereInput[];
    NOT?: Prisma.finance_projectsWhereInput | Prisma.finance_projectsWhereInput[];
    school_id?: Prisma.StringFilter<"finance_projects"> | string;
    school_name?: Prisma.StringNullableFilter<"finance_projects"> | string | null;
    project_name?: Prisma.StringNullableFilter<"finance_projects"> | string | null;
    region?: Prisma.StringNullableFilter<"finance_projects"> | string | null;
    division?: Prisma.StringNullableFilter<"finance_projects"> | string | null;
    municipality?: Prisma.StringNullableFilter<"finance_projects"> | string | null;
    district?: Prisma.StringNullableFilter<"finance_projects"> | string | null;
    legislative_district?: Prisma.StringNullableFilter<"finance_projects"> | string | null;
    total_funds?: Prisma.DecimalNullableFilter<"finance_projects"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fund_released?: Prisma.DecimalNullableFilter<"finance_projects"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    date_of_release?: Prisma.DateTimeNullableFilter<"finance_projects"> | Date | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"finance_projects"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"finance_projects"> | Date | string | null;
    root_id?: Prisma.StringNullableFilter<"finance_projects"> | string | null;
}, "finance_id">;
export type finance_projectsOrderByWithAggregationInput = {
    finance_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    school_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    project_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    region?: Prisma.SortOrderInput | Prisma.SortOrder;
    division?: Prisma.SortOrderInput | Prisma.SortOrder;
    municipality?: Prisma.SortOrderInput | Prisma.SortOrder;
    district?: Prisma.SortOrderInput | Prisma.SortOrder;
    legislative_district?: Prisma.SortOrderInput | Prisma.SortOrder;
    total_funds?: Prisma.SortOrderInput | Prisma.SortOrder;
    fund_released?: Prisma.SortOrderInput | Prisma.SortOrder;
    date_of_release?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    root_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.finance_projectsCountOrderByAggregateInput;
    _avg?: Prisma.finance_projectsAvgOrderByAggregateInput;
    _max?: Prisma.finance_projectsMaxOrderByAggregateInput;
    _min?: Prisma.finance_projectsMinOrderByAggregateInput;
    _sum?: Prisma.finance_projectsSumOrderByAggregateInput;
};
export type finance_projectsScalarWhereWithAggregatesInput = {
    AND?: Prisma.finance_projectsScalarWhereWithAggregatesInput | Prisma.finance_projectsScalarWhereWithAggregatesInput[];
    OR?: Prisma.finance_projectsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.finance_projectsScalarWhereWithAggregatesInput | Prisma.finance_projectsScalarWhereWithAggregatesInput[];
    finance_id?: Prisma.IntWithAggregatesFilter<"finance_projects"> | number;
    school_id?: Prisma.StringWithAggregatesFilter<"finance_projects"> | string;
    school_name?: Prisma.StringNullableWithAggregatesFilter<"finance_projects"> | string | null;
    project_name?: Prisma.StringNullableWithAggregatesFilter<"finance_projects"> | string | null;
    region?: Prisma.StringNullableWithAggregatesFilter<"finance_projects"> | string | null;
    division?: Prisma.StringNullableWithAggregatesFilter<"finance_projects"> | string | null;
    municipality?: Prisma.StringNullableWithAggregatesFilter<"finance_projects"> | string | null;
    district?: Prisma.StringNullableWithAggregatesFilter<"finance_projects"> | string | null;
    legislative_district?: Prisma.StringNullableWithAggregatesFilter<"finance_projects"> | string | null;
    total_funds?: Prisma.DecimalNullableWithAggregatesFilter<"finance_projects"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fund_released?: Prisma.DecimalNullableWithAggregatesFilter<"finance_projects"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    date_of_release?: Prisma.DateTimeNullableWithAggregatesFilter<"finance_projects"> | Date | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"finance_projects"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"finance_projects"> | Date | string | null;
    root_id?: Prisma.StringNullableWithAggregatesFilter<"finance_projects"> | string | null;
};
export type finance_projectsCreateInput = {
    school_id: string;
    school_name?: string | null;
    project_name?: string | null;
    region?: string | null;
    division?: string | null;
    municipality?: string | null;
    district?: string | null;
    legislative_district?: string | null;
    total_funds?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fund_released?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    date_of_release?: Date | string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    root_id?: string | null;
};
export type finance_projectsUncheckedCreateInput = {
    finance_id?: number;
    school_id: string;
    school_name?: string | null;
    project_name?: string | null;
    region?: string | null;
    division?: string | null;
    municipality?: string | null;
    district?: string | null;
    legislative_district?: string | null;
    total_funds?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fund_released?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    date_of_release?: Date | string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    root_id?: string | null;
};
export type finance_projectsUpdateInput = {
    school_id?: Prisma.StringFieldUpdateOperationsInput | string;
    school_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    project_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    municipality?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    legislative_district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    total_funds?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fund_released?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    date_of_release?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    root_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type finance_projectsUncheckedUpdateInput = {
    finance_id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.StringFieldUpdateOperationsInput | string;
    school_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    project_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    municipality?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    legislative_district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    total_funds?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fund_released?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    date_of_release?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    root_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type finance_projectsCreateManyInput = {
    finance_id?: number;
    school_id: string;
    school_name?: string | null;
    project_name?: string | null;
    region?: string | null;
    division?: string | null;
    municipality?: string | null;
    district?: string | null;
    legislative_district?: string | null;
    total_funds?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fund_released?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    date_of_release?: Date | string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    root_id?: string | null;
};
export type finance_projectsUpdateManyMutationInput = {
    school_id?: Prisma.StringFieldUpdateOperationsInput | string;
    school_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    project_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    municipality?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    legislative_district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    total_funds?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fund_released?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    date_of_release?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    root_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type finance_projectsUncheckedUpdateManyInput = {
    finance_id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.StringFieldUpdateOperationsInput | string;
    school_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    project_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    municipality?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    legislative_district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    total_funds?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    fund_released?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    date_of_release?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    root_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type finance_projectsCountOrderByAggregateInput = {
    finance_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    school_name?: Prisma.SortOrder;
    project_name?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    municipality?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    legislative_district?: Prisma.SortOrder;
    total_funds?: Prisma.SortOrder;
    fund_released?: Prisma.SortOrder;
    date_of_release?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    root_id?: Prisma.SortOrder;
};
export type finance_projectsAvgOrderByAggregateInput = {
    finance_id?: Prisma.SortOrder;
    total_funds?: Prisma.SortOrder;
    fund_released?: Prisma.SortOrder;
};
export type finance_projectsMaxOrderByAggregateInput = {
    finance_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    school_name?: Prisma.SortOrder;
    project_name?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    municipality?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    legislative_district?: Prisma.SortOrder;
    total_funds?: Prisma.SortOrder;
    fund_released?: Prisma.SortOrder;
    date_of_release?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    root_id?: Prisma.SortOrder;
};
export type finance_projectsMinOrderByAggregateInput = {
    finance_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    school_name?: Prisma.SortOrder;
    project_name?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    municipality?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    legislative_district?: Prisma.SortOrder;
    total_funds?: Prisma.SortOrder;
    fund_released?: Prisma.SortOrder;
    date_of_release?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    root_id?: Prisma.SortOrder;
};
export type finance_projectsSumOrderByAggregateInput = {
    finance_id?: Prisma.SortOrder;
    total_funds?: Prisma.SortOrder;
    fund_released?: Prisma.SortOrder;
};
export type finance_projectsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    finance_id?: boolean;
    school_id?: boolean;
    school_name?: boolean;
    project_name?: boolean;
    region?: boolean;
    division?: boolean;
    municipality?: boolean;
    district?: boolean;
    legislative_district?: boolean;
    total_funds?: boolean;
    fund_released?: boolean;
    date_of_release?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    root_id?: boolean;
}, ExtArgs["result"]["finance_projects"]>;
export type finance_projectsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    finance_id?: boolean;
    school_id?: boolean;
    school_name?: boolean;
    project_name?: boolean;
    region?: boolean;
    division?: boolean;
    municipality?: boolean;
    district?: boolean;
    legislative_district?: boolean;
    total_funds?: boolean;
    fund_released?: boolean;
    date_of_release?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    root_id?: boolean;
}, ExtArgs["result"]["finance_projects"]>;
export type finance_projectsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    finance_id?: boolean;
    school_id?: boolean;
    school_name?: boolean;
    project_name?: boolean;
    region?: boolean;
    division?: boolean;
    municipality?: boolean;
    district?: boolean;
    legislative_district?: boolean;
    total_funds?: boolean;
    fund_released?: boolean;
    date_of_release?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    root_id?: boolean;
}, ExtArgs["result"]["finance_projects"]>;
export type finance_projectsSelectScalar = {
    finance_id?: boolean;
    school_id?: boolean;
    school_name?: boolean;
    project_name?: boolean;
    region?: boolean;
    division?: boolean;
    municipality?: boolean;
    district?: boolean;
    legislative_district?: boolean;
    total_funds?: boolean;
    fund_released?: boolean;
    date_of_release?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    root_id?: boolean;
};
export type finance_projectsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"finance_id" | "school_id" | "school_name" | "project_name" | "region" | "division" | "municipality" | "district" | "legislative_district" | "total_funds" | "fund_released" | "date_of_release" | "created_at" | "updated_at" | "root_id", ExtArgs["result"]["finance_projects"]>;
export type $finance_projectsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "finance_projects";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        finance_id: number;
        school_id: string;
        school_name: string | null;
        project_name: string | null;
        region: string | null;
        division: string | null;
        municipality: string | null;
        district: string | null;
        legislative_district: string | null;
        total_funds: runtime.Decimal | null;
        fund_released: runtime.Decimal | null;
        date_of_release: Date | null;
        created_at: Date | null;
        updated_at: Date | null;
        root_id: string | null;
    }, ExtArgs["result"]["finance_projects"]>;
    composites: {};
};
export type finance_projectsGetPayload<S extends boolean | null | undefined | finance_projectsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$finance_projectsPayload, S>;
export type finance_projectsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<finance_projectsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Finance_projectsCountAggregateInputType | true;
};
export interface finance_projectsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['finance_projects'];
        meta: {
            name: 'finance_projects';
        };
    };
    findUnique<T extends finance_projectsFindUniqueArgs>(args: Prisma.SelectSubset<T, finance_projectsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__finance_projectsClient<runtime.Types.Result.GetResult<Prisma.$finance_projectsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends finance_projectsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, finance_projectsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__finance_projectsClient<runtime.Types.Result.GetResult<Prisma.$finance_projectsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends finance_projectsFindFirstArgs>(args?: Prisma.SelectSubset<T, finance_projectsFindFirstArgs<ExtArgs>>): Prisma.Prisma__finance_projectsClient<runtime.Types.Result.GetResult<Prisma.$finance_projectsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends finance_projectsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, finance_projectsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__finance_projectsClient<runtime.Types.Result.GetResult<Prisma.$finance_projectsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends finance_projectsFindManyArgs>(args?: Prisma.SelectSubset<T, finance_projectsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$finance_projectsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends finance_projectsCreateArgs>(args: Prisma.SelectSubset<T, finance_projectsCreateArgs<ExtArgs>>): Prisma.Prisma__finance_projectsClient<runtime.Types.Result.GetResult<Prisma.$finance_projectsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends finance_projectsCreateManyArgs>(args?: Prisma.SelectSubset<T, finance_projectsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends finance_projectsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, finance_projectsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$finance_projectsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends finance_projectsDeleteArgs>(args: Prisma.SelectSubset<T, finance_projectsDeleteArgs<ExtArgs>>): Prisma.Prisma__finance_projectsClient<runtime.Types.Result.GetResult<Prisma.$finance_projectsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends finance_projectsUpdateArgs>(args: Prisma.SelectSubset<T, finance_projectsUpdateArgs<ExtArgs>>): Prisma.Prisma__finance_projectsClient<runtime.Types.Result.GetResult<Prisma.$finance_projectsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends finance_projectsDeleteManyArgs>(args?: Prisma.SelectSubset<T, finance_projectsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends finance_projectsUpdateManyArgs>(args: Prisma.SelectSubset<T, finance_projectsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends finance_projectsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, finance_projectsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$finance_projectsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends finance_projectsUpsertArgs>(args: Prisma.SelectSubset<T, finance_projectsUpsertArgs<ExtArgs>>): Prisma.Prisma__finance_projectsClient<runtime.Types.Result.GetResult<Prisma.$finance_projectsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends finance_projectsCountArgs>(args?: Prisma.Subset<T, finance_projectsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Finance_projectsCountAggregateOutputType> : number>;
    aggregate<T extends Finance_projectsAggregateArgs>(args: Prisma.Subset<T, Finance_projectsAggregateArgs>): Prisma.PrismaPromise<GetFinance_projectsAggregateType<T>>;
    groupBy<T extends finance_projectsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: finance_projectsGroupByArgs['orderBy'];
    } : {
        orderBy?: finance_projectsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, finance_projectsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFinance_projectsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: finance_projectsFieldRefs;
}
export interface Prisma__finance_projectsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface finance_projectsFieldRefs {
    readonly finance_id: Prisma.FieldRef<"finance_projects", 'Int'>;
    readonly school_id: Prisma.FieldRef<"finance_projects", 'String'>;
    readonly school_name: Prisma.FieldRef<"finance_projects", 'String'>;
    readonly project_name: Prisma.FieldRef<"finance_projects", 'String'>;
    readonly region: Prisma.FieldRef<"finance_projects", 'String'>;
    readonly division: Prisma.FieldRef<"finance_projects", 'String'>;
    readonly municipality: Prisma.FieldRef<"finance_projects", 'String'>;
    readonly district: Prisma.FieldRef<"finance_projects", 'String'>;
    readonly legislative_district: Prisma.FieldRef<"finance_projects", 'String'>;
    readonly total_funds: Prisma.FieldRef<"finance_projects", 'Decimal'>;
    readonly fund_released: Prisma.FieldRef<"finance_projects", 'Decimal'>;
    readonly date_of_release: Prisma.FieldRef<"finance_projects", 'DateTime'>;
    readonly created_at: Prisma.FieldRef<"finance_projects", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"finance_projects", 'DateTime'>;
    readonly root_id: Prisma.FieldRef<"finance_projects", 'String'>;
}
export type finance_projectsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finance_projectsSelect<ExtArgs> | null;
    omit?: Prisma.finance_projectsOmit<ExtArgs> | null;
    where: Prisma.finance_projectsWhereUniqueInput;
};
export type finance_projectsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finance_projectsSelect<ExtArgs> | null;
    omit?: Prisma.finance_projectsOmit<ExtArgs> | null;
    where: Prisma.finance_projectsWhereUniqueInput;
};
export type finance_projectsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finance_projectsSelect<ExtArgs> | null;
    omit?: Prisma.finance_projectsOmit<ExtArgs> | null;
    where?: Prisma.finance_projectsWhereInput;
    orderBy?: Prisma.finance_projectsOrderByWithRelationInput | Prisma.finance_projectsOrderByWithRelationInput[];
    cursor?: Prisma.finance_projectsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Finance_projectsScalarFieldEnum | Prisma.Finance_projectsScalarFieldEnum[];
};
export type finance_projectsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finance_projectsSelect<ExtArgs> | null;
    omit?: Prisma.finance_projectsOmit<ExtArgs> | null;
    where?: Prisma.finance_projectsWhereInput;
    orderBy?: Prisma.finance_projectsOrderByWithRelationInput | Prisma.finance_projectsOrderByWithRelationInput[];
    cursor?: Prisma.finance_projectsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Finance_projectsScalarFieldEnum | Prisma.Finance_projectsScalarFieldEnum[];
};
export type finance_projectsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finance_projectsSelect<ExtArgs> | null;
    omit?: Prisma.finance_projectsOmit<ExtArgs> | null;
    where?: Prisma.finance_projectsWhereInput;
    orderBy?: Prisma.finance_projectsOrderByWithRelationInput | Prisma.finance_projectsOrderByWithRelationInput[];
    cursor?: Prisma.finance_projectsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Finance_projectsScalarFieldEnum | Prisma.Finance_projectsScalarFieldEnum[];
};
export type finance_projectsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finance_projectsSelect<ExtArgs> | null;
    omit?: Prisma.finance_projectsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.finance_projectsCreateInput, Prisma.finance_projectsUncheckedCreateInput>;
};
export type finance_projectsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.finance_projectsCreateManyInput | Prisma.finance_projectsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type finance_projectsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finance_projectsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.finance_projectsOmit<ExtArgs> | null;
    data: Prisma.finance_projectsCreateManyInput | Prisma.finance_projectsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type finance_projectsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finance_projectsSelect<ExtArgs> | null;
    omit?: Prisma.finance_projectsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.finance_projectsUpdateInput, Prisma.finance_projectsUncheckedUpdateInput>;
    where: Prisma.finance_projectsWhereUniqueInput;
};
export type finance_projectsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.finance_projectsUpdateManyMutationInput, Prisma.finance_projectsUncheckedUpdateManyInput>;
    where?: Prisma.finance_projectsWhereInput;
    limit?: number;
};
export type finance_projectsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finance_projectsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.finance_projectsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.finance_projectsUpdateManyMutationInput, Prisma.finance_projectsUncheckedUpdateManyInput>;
    where?: Prisma.finance_projectsWhereInput;
    limit?: number;
};
export type finance_projectsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finance_projectsSelect<ExtArgs> | null;
    omit?: Prisma.finance_projectsOmit<ExtArgs> | null;
    where: Prisma.finance_projectsWhereUniqueInput;
    create: Prisma.XOR<Prisma.finance_projectsCreateInput, Prisma.finance_projectsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.finance_projectsUpdateInput, Prisma.finance_projectsUncheckedUpdateInput>;
};
export type finance_projectsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finance_projectsSelect<ExtArgs> | null;
    omit?: Prisma.finance_projectsOmit<ExtArgs> | null;
    where: Prisma.finance_projectsWhereUniqueInput;
};
export type finance_projectsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.finance_projectsWhereInput;
    limit?: number;
};
export type finance_projectsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.finance_projectsSelect<ExtArgs> | null;
    omit?: Prisma.finance_projectsOmit<ExtArgs> | null;
};
