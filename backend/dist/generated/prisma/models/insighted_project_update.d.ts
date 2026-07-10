import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type insighted_project_updateModel = runtime.Types.Result.DefaultSelection<Prisma.$insighted_project_updatePayload>;
export type AggregateInsighted_project_update = {
    _count: Insighted_project_updateCountAggregateOutputType | null;
    _avg: Insighted_project_updateAvgAggregateOutputType | null;
    _sum: Insighted_project_updateSumAggregateOutputType | null;
    _min: Insighted_project_updateMinAggregateOutputType | null;
    _max: Insighted_project_updateMaxAggregateOutputType | null;
};
export type Insighted_project_updateAvgAggregateOutputType = {
    approved_budget_for_contract: runtime.Decimal | null;
    number_of_classrooms: number | null;
    number_of_sites: number | null;
    funding_year: number | null;
};
export type Insighted_project_updateSumAggregateOutputType = {
    approved_budget_for_contract: runtime.Decimal | null;
    number_of_classrooms: number | null;
    number_of_sites: number | null;
    funding_year: number | null;
};
export type Insighted_project_updateMinAggregateOutputType = {
    ipc: string | null;
    approved_budget_for_contract: runtime.Decimal | null;
    batch_of_funds: string | null;
    project_category: string | null;
    number_of_classrooms: number | null;
    number_of_sites: number | null;
    implementing_agency: string | null;
    school_id: string | null;
    region: string | null;
    division: string | null;
    scope_of_work: string | null;
    legislative_district: string | null;
    funding_year: number | null;
};
export type Insighted_project_updateMaxAggregateOutputType = {
    ipc: string | null;
    approved_budget_for_contract: runtime.Decimal | null;
    batch_of_funds: string | null;
    project_category: string | null;
    number_of_classrooms: number | null;
    number_of_sites: number | null;
    implementing_agency: string | null;
    school_id: string | null;
    region: string | null;
    division: string | null;
    scope_of_work: string | null;
    legislative_district: string | null;
    funding_year: number | null;
};
export type Insighted_project_updateCountAggregateOutputType = {
    ipc: number;
    approved_budget_for_contract: number;
    batch_of_funds: number;
    project_category: number;
    number_of_classrooms: number;
    number_of_sites: number;
    implementing_agency: number;
    school_id: number;
    region: number;
    division: number;
    scope_of_work: number;
    legislative_district: number;
    funding_year: number;
    _all: number;
};
export type Insighted_project_updateAvgAggregateInputType = {
    approved_budget_for_contract?: true;
    number_of_classrooms?: true;
    number_of_sites?: true;
    funding_year?: true;
};
export type Insighted_project_updateSumAggregateInputType = {
    approved_budget_for_contract?: true;
    number_of_classrooms?: true;
    number_of_sites?: true;
    funding_year?: true;
};
export type Insighted_project_updateMinAggregateInputType = {
    ipc?: true;
    approved_budget_for_contract?: true;
    batch_of_funds?: true;
    project_category?: true;
    number_of_classrooms?: true;
    number_of_sites?: true;
    implementing_agency?: true;
    school_id?: true;
    region?: true;
    division?: true;
    scope_of_work?: true;
    legislative_district?: true;
    funding_year?: true;
};
export type Insighted_project_updateMaxAggregateInputType = {
    ipc?: true;
    approved_budget_for_contract?: true;
    batch_of_funds?: true;
    project_category?: true;
    number_of_classrooms?: true;
    number_of_sites?: true;
    implementing_agency?: true;
    school_id?: true;
    region?: true;
    division?: true;
    scope_of_work?: true;
    legislative_district?: true;
    funding_year?: true;
};
export type Insighted_project_updateCountAggregateInputType = {
    ipc?: true;
    approved_budget_for_contract?: true;
    batch_of_funds?: true;
    project_category?: true;
    number_of_classrooms?: true;
    number_of_sites?: true;
    implementing_agency?: true;
    school_id?: true;
    region?: true;
    division?: true;
    scope_of_work?: true;
    legislative_district?: true;
    funding_year?: true;
    _all?: true;
};
export type Insighted_project_updateAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.insighted_project_updateWhereInput;
    orderBy?: Prisma.insighted_project_updateOrderByWithRelationInput | Prisma.insighted_project_updateOrderByWithRelationInput[];
    cursor?: Prisma.insighted_project_updateWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Insighted_project_updateCountAggregateInputType;
    _avg?: Insighted_project_updateAvgAggregateInputType;
    _sum?: Insighted_project_updateSumAggregateInputType;
    _min?: Insighted_project_updateMinAggregateInputType;
    _max?: Insighted_project_updateMaxAggregateInputType;
};
export type GetInsighted_project_updateAggregateType<T extends Insighted_project_updateAggregateArgs> = {
    [P in keyof T & keyof AggregateInsighted_project_update]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInsighted_project_update[P]> : Prisma.GetScalarType<T[P], AggregateInsighted_project_update[P]>;
};
export type insighted_project_updateGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.insighted_project_updateWhereInput;
    orderBy?: Prisma.insighted_project_updateOrderByWithAggregationInput | Prisma.insighted_project_updateOrderByWithAggregationInput[];
    by: Prisma.Insighted_project_updateScalarFieldEnum[] | Prisma.Insighted_project_updateScalarFieldEnum;
    having?: Prisma.insighted_project_updateScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Insighted_project_updateCountAggregateInputType | true;
    _avg?: Insighted_project_updateAvgAggregateInputType;
    _sum?: Insighted_project_updateSumAggregateInputType;
    _min?: Insighted_project_updateMinAggregateInputType;
    _max?: Insighted_project_updateMaxAggregateInputType;
};
export type Insighted_project_updateGroupByOutputType = {
    ipc: string;
    approved_budget_for_contract: runtime.Decimal | null;
    batch_of_funds: string | null;
    project_category: string | null;
    number_of_classrooms: number | null;
    number_of_sites: number | null;
    implementing_agency: string | null;
    school_id: string | null;
    region: string | null;
    division: string | null;
    scope_of_work: string | null;
    legislative_district: string | null;
    funding_year: number | null;
    _count: Insighted_project_updateCountAggregateOutputType | null;
    _avg: Insighted_project_updateAvgAggregateOutputType | null;
    _sum: Insighted_project_updateSumAggregateOutputType | null;
    _min: Insighted_project_updateMinAggregateOutputType | null;
    _max: Insighted_project_updateMaxAggregateOutputType | null;
};
export type GetInsighted_project_updateGroupByPayload<T extends insighted_project_updateGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Insighted_project_updateGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Insighted_project_updateGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Insighted_project_updateGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Insighted_project_updateGroupByOutputType[P]>;
}>>;
export type insighted_project_updateWhereInput = {
    AND?: Prisma.insighted_project_updateWhereInput | Prisma.insighted_project_updateWhereInput[];
    OR?: Prisma.insighted_project_updateWhereInput[];
    NOT?: Prisma.insighted_project_updateWhereInput | Prisma.insighted_project_updateWhereInput[];
    ipc?: Prisma.StringFilter<"insighted_project_update"> | string;
    approved_budget_for_contract?: Prisma.DecimalNullableFilter<"insighted_project_update"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    batch_of_funds?: Prisma.StringNullableFilter<"insighted_project_update"> | string | null;
    project_category?: Prisma.StringNullableFilter<"insighted_project_update"> | string | null;
    number_of_classrooms?: Prisma.IntNullableFilter<"insighted_project_update"> | number | null;
    number_of_sites?: Prisma.IntNullableFilter<"insighted_project_update"> | number | null;
    implementing_agency?: Prisma.StringNullableFilter<"insighted_project_update"> | string | null;
    school_id?: Prisma.StringNullableFilter<"insighted_project_update"> | string | null;
    region?: Prisma.StringNullableFilter<"insighted_project_update"> | string | null;
    division?: Prisma.StringNullableFilter<"insighted_project_update"> | string | null;
    scope_of_work?: Prisma.StringNullableFilter<"insighted_project_update"> | string | null;
    legislative_district?: Prisma.StringNullableFilter<"insighted_project_update"> | string | null;
    funding_year?: Prisma.IntNullableFilter<"insighted_project_update"> | number | null;
};
export type insighted_project_updateOrderByWithRelationInput = {
    ipc?: Prisma.SortOrder;
    approved_budget_for_contract?: Prisma.SortOrderInput | Prisma.SortOrder;
    batch_of_funds?: Prisma.SortOrderInput | Prisma.SortOrder;
    project_category?: Prisma.SortOrderInput | Prisma.SortOrder;
    number_of_classrooms?: Prisma.SortOrderInput | Prisma.SortOrder;
    number_of_sites?: Prisma.SortOrderInput | Prisma.SortOrder;
    implementing_agency?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    region?: Prisma.SortOrderInput | Prisma.SortOrder;
    division?: Prisma.SortOrderInput | Prisma.SortOrder;
    scope_of_work?: Prisma.SortOrderInput | Prisma.SortOrder;
    legislative_district?: Prisma.SortOrderInput | Prisma.SortOrder;
    funding_year?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type insighted_project_updateWhereUniqueInput = Prisma.AtLeast<{
    ipc?: string;
    AND?: Prisma.insighted_project_updateWhereInput | Prisma.insighted_project_updateWhereInput[];
    OR?: Prisma.insighted_project_updateWhereInput[];
    NOT?: Prisma.insighted_project_updateWhereInput | Prisma.insighted_project_updateWhereInput[];
    approved_budget_for_contract?: Prisma.DecimalNullableFilter<"insighted_project_update"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    batch_of_funds?: Prisma.StringNullableFilter<"insighted_project_update"> | string | null;
    project_category?: Prisma.StringNullableFilter<"insighted_project_update"> | string | null;
    number_of_classrooms?: Prisma.IntNullableFilter<"insighted_project_update"> | number | null;
    number_of_sites?: Prisma.IntNullableFilter<"insighted_project_update"> | number | null;
    implementing_agency?: Prisma.StringNullableFilter<"insighted_project_update"> | string | null;
    school_id?: Prisma.StringNullableFilter<"insighted_project_update"> | string | null;
    region?: Prisma.StringNullableFilter<"insighted_project_update"> | string | null;
    division?: Prisma.StringNullableFilter<"insighted_project_update"> | string | null;
    scope_of_work?: Prisma.StringNullableFilter<"insighted_project_update"> | string | null;
    legislative_district?: Prisma.StringNullableFilter<"insighted_project_update"> | string | null;
    funding_year?: Prisma.IntNullableFilter<"insighted_project_update"> | number | null;
}, "ipc">;
export type insighted_project_updateOrderByWithAggregationInput = {
    ipc?: Prisma.SortOrder;
    approved_budget_for_contract?: Prisma.SortOrderInput | Prisma.SortOrder;
    batch_of_funds?: Prisma.SortOrderInput | Prisma.SortOrder;
    project_category?: Prisma.SortOrderInput | Prisma.SortOrder;
    number_of_classrooms?: Prisma.SortOrderInput | Prisma.SortOrder;
    number_of_sites?: Prisma.SortOrderInput | Prisma.SortOrder;
    implementing_agency?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    region?: Prisma.SortOrderInput | Prisma.SortOrder;
    division?: Prisma.SortOrderInput | Prisma.SortOrder;
    scope_of_work?: Prisma.SortOrderInput | Prisma.SortOrder;
    legislative_district?: Prisma.SortOrderInput | Prisma.SortOrder;
    funding_year?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.insighted_project_updateCountOrderByAggregateInput;
    _avg?: Prisma.insighted_project_updateAvgOrderByAggregateInput;
    _max?: Prisma.insighted_project_updateMaxOrderByAggregateInput;
    _min?: Prisma.insighted_project_updateMinOrderByAggregateInput;
    _sum?: Prisma.insighted_project_updateSumOrderByAggregateInput;
};
export type insighted_project_updateScalarWhereWithAggregatesInput = {
    AND?: Prisma.insighted_project_updateScalarWhereWithAggregatesInput | Prisma.insighted_project_updateScalarWhereWithAggregatesInput[];
    OR?: Prisma.insighted_project_updateScalarWhereWithAggregatesInput[];
    NOT?: Prisma.insighted_project_updateScalarWhereWithAggregatesInput | Prisma.insighted_project_updateScalarWhereWithAggregatesInput[];
    ipc?: Prisma.StringWithAggregatesFilter<"insighted_project_update"> | string;
    approved_budget_for_contract?: Prisma.DecimalNullableWithAggregatesFilter<"insighted_project_update"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    batch_of_funds?: Prisma.StringNullableWithAggregatesFilter<"insighted_project_update"> | string | null;
    project_category?: Prisma.StringNullableWithAggregatesFilter<"insighted_project_update"> | string | null;
    number_of_classrooms?: Prisma.IntNullableWithAggregatesFilter<"insighted_project_update"> | number | null;
    number_of_sites?: Prisma.IntNullableWithAggregatesFilter<"insighted_project_update"> | number | null;
    implementing_agency?: Prisma.StringNullableWithAggregatesFilter<"insighted_project_update"> | string | null;
    school_id?: Prisma.StringNullableWithAggregatesFilter<"insighted_project_update"> | string | null;
    region?: Prisma.StringNullableWithAggregatesFilter<"insighted_project_update"> | string | null;
    division?: Prisma.StringNullableWithAggregatesFilter<"insighted_project_update"> | string | null;
    scope_of_work?: Prisma.StringNullableWithAggregatesFilter<"insighted_project_update"> | string | null;
    legislative_district?: Prisma.StringNullableWithAggregatesFilter<"insighted_project_update"> | string | null;
    funding_year?: Prisma.IntNullableWithAggregatesFilter<"insighted_project_update"> | number | null;
};
export type insighted_project_updateCreateInput = {
    ipc: string;
    approved_budget_for_contract?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    batch_of_funds?: string | null;
    project_category?: string | null;
    number_of_classrooms?: number | null;
    number_of_sites?: number | null;
    implementing_agency?: string | null;
    school_id?: string | null;
    region?: string | null;
    division?: string | null;
    scope_of_work?: string | null;
    legislative_district?: string | null;
    funding_year?: number | null;
};
export type insighted_project_updateUncheckedCreateInput = {
    ipc: string;
    approved_budget_for_contract?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    batch_of_funds?: string | null;
    project_category?: string | null;
    number_of_classrooms?: number | null;
    number_of_sites?: number | null;
    implementing_agency?: string | null;
    school_id?: string | null;
    region?: string | null;
    division?: string | null;
    scope_of_work?: string | null;
    legislative_district?: string | null;
    funding_year?: number | null;
};
export type insighted_project_updateUpdateInput = {
    ipc?: Prisma.StringFieldUpdateOperationsInput | string;
    approved_budget_for_contract?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    batch_of_funds?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    project_category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    number_of_classrooms?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    number_of_sites?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    implementing_agency?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scope_of_work?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    legislative_district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    funding_year?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type insighted_project_updateUncheckedUpdateInput = {
    ipc?: Prisma.StringFieldUpdateOperationsInput | string;
    approved_budget_for_contract?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    batch_of_funds?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    project_category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    number_of_classrooms?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    number_of_sites?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    implementing_agency?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scope_of_work?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    legislative_district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    funding_year?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type insighted_project_updateCreateManyInput = {
    ipc: string;
    approved_budget_for_contract?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    batch_of_funds?: string | null;
    project_category?: string | null;
    number_of_classrooms?: number | null;
    number_of_sites?: number | null;
    implementing_agency?: string | null;
    school_id?: string | null;
    region?: string | null;
    division?: string | null;
    scope_of_work?: string | null;
    legislative_district?: string | null;
    funding_year?: number | null;
};
export type insighted_project_updateUpdateManyMutationInput = {
    ipc?: Prisma.StringFieldUpdateOperationsInput | string;
    approved_budget_for_contract?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    batch_of_funds?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    project_category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    number_of_classrooms?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    number_of_sites?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    implementing_agency?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scope_of_work?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    legislative_district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    funding_year?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type insighted_project_updateUncheckedUpdateManyInput = {
    ipc?: Prisma.StringFieldUpdateOperationsInput | string;
    approved_budget_for_contract?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    batch_of_funds?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    project_category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    number_of_classrooms?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    number_of_sites?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    implementing_agency?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scope_of_work?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    legislative_district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    funding_year?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type insighted_project_updateCountOrderByAggregateInput = {
    ipc?: Prisma.SortOrder;
    approved_budget_for_contract?: Prisma.SortOrder;
    batch_of_funds?: Prisma.SortOrder;
    project_category?: Prisma.SortOrder;
    number_of_classrooms?: Prisma.SortOrder;
    number_of_sites?: Prisma.SortOrder;
    implementing_agency?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    scope_of_work?: Prisma.SortOrder;
    legislative_district?: Prisma.SortOrder;
    funding_year?: Prisma.SortOrder;
};
export type insighted_project_updateAvgOrderByAggregateInput = {
    approved_budget_for_contract?: Prisma.SortOrder;
    number_of_classrooms?: Prisma.SortOrder;
    number_of_sites?: Prisma.SortOrder;
    funding_year?: Prisma.SortOrder;
};
export type insighted_project_updateMaxOrderByAggregateInput = {
    ipc?: Prisma.SortOrder;
    approved_budget_for_contract?: Prisma.SortOrder;
    batch_of_funds?: Prisma.SortOrder;
    project_category?: Prisma.SortOrder;
    number_of_classrooms?: Prisma.SortOrder;
    number_of_sites?: Prisma.SortOrder;
    implementing_agency?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    scope_of_work?: Prisma.SortOrder;
    legislative_district?: Prisma.SortOrder;
    funding_year?: Prisma.SortOrder;
};
export type insighted_project_updateMinOrderByAggregateInput = {
    ipc?: Prisma.SortOrder;
    approved_budget_for_contract?: Prisma.SortOrder;
    batch_of_funds?: Prisma.SortOrder;
    project_category?: Prisma.SortOrder;
    number_of_classrooms?: Prisma.SortOrder;
    number_of_sites?: Prisma.SortOrder;
    implementing_agency?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    scope_of_work?: Prisma.SortOrder;
    legislative_district?: Prisma.SortOrder;
    funding_year?: Prisma.SortOrder;
};
export type insighted_project_updateSumOrderByAggregateInput = {
    approved_budget_for_contract?: Prisma.SortOrder;
    number_of_classrooms?: Prisma.SortOrder;
    number_of_sites?: Prisma.SortOrder;
    funding_year?: Prisma.SortOrder;
};
export type insighted_project_updateSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ipc?: boolean;
    approved_budget_for_contract?: boolean;
    batch_of_funds?: boolean;
    project_category?: boolean;
    number_of_classrooms?: boolean;
    number_of_sites?: boolean;
    implementing_agency?: boolean;
    school_id?: boolean;
    region?: boolean;
    division?: boolean;
    scope_of_work?: boolean;
    legislative_district?: boolean;
    funding_year?: boolean;
}, ExtArgs["result"]["insighted_project_update"]>;
export type insighted_project_updateSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ipc?: boolean;
    approved_budget_for_contract?: boolean;
    batch_of_funds?: boolean;
    project_category?: boolean;
    number_of_classrooms?: boolean;
    number_of_sites?: boolean;
    implementing_agency?: boolean;
    school_id?: boolean;
    region?: boolean;
    division?: boolean;
    scope_of_work?: boolean;
    legislative_district?: boolean;
    funding_year?: boolean;
}, ExtArgs["result"]["insighted_project_update"]>;
export type insighted_project_updateSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ipc?: boolean;
    approved_budget_for_contract?: boolean;
    batch_of_funds?: boolean;
    project_category?: boolean;
    number_of_classrooms?: boolean;
    number_of_sites?: boolean;
    implementing_agency?: boolean;
    school_id?: boolean;
    region?: boolean;
    division?: boolean;
    scope_of_work?: boolean;
    legislative_district?: boolean;
    funding_year?: boolean;
}, ExtArgs["result"]["insighted_project_update"]>;
export type insighted_project_updateSelectScalar = {
    ipc?: boolean;
    approved_budget_for_contract?: boolean;
    batch_of_funds?: boolean;
    project_category?: boolean;
    number_of_classrooms?: boolean;
    number_of_sites?: boolean;
    implementing_agency?: boolean;
    school_id?: boolean;
    region?: boolean;
    division?: boolean;
    scope_of_work?: boolean;
    legislative_district?: boolean;
    funding_year?: boolean;
};
export type insighted_project_updateOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"ipc" | "approved_budget_for_contract" | "batch_of_funds" | "project_category" | "number_of_classrooms" | "number_of_sites" | "implementing_agency" | "school_id" | "region" | "division" | "scope_of_work" | "legislative_district" | "funding_year", ExtArgs["result"]["insighted_project_update"]>;
export type $insighted_project_updatePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "insighted_project_update";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        ipc: string;
        approved_budget_for_contract: runtime.Decimal | null;
        batch_of_funds: string | null;
        project_category: string | null;
        number_of_classrooms: number | null;
        number_of_sites: number | null;
        implementing_agency: string | null;
        school_id: string | null;
        region: string | null;
        division: string | null;
        scope_of_work: string | null;
        legislative_district: string | null;
        funding_year: number | null;
    }, ExtArgs["result"]["insighted_project_update"]>;
    composites: {};
};
export type insighted_project_updateGetPayload<S extends boolean | null | undefined | insighted_project_updateDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$insighted_project_updatePayload, S>;
export type insighted_project_updateCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<insighted_project_updateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Insighted_project_updateCountAggregateInputType | true;
};
export interface insighted_project_updateDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['insighted_project_update'];
        meta: {
            name: 'insighted_project_update';
        };
    };
    findUnique<T extends insighted_project_updateFindUniqueArgs>(args: Prisma.SelectSubset<T, insighted_project_updateFindUniqueArgs<ExtArgs>>): Prisma.Prisma__insighted_project_updateClient<runtime.Types.Result.GetResult<Prisma.$insighted_project_updatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends insighted_project_updateFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, insighted_project_updateFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__insighted_project_updateClient<runtime.Types.Result.GetResult<Prisma.$insighted_project_updatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends insighted_project_updateFindFirstArgs>(args?: Prisma.SelectSubset<T, insighted_project_updateFindFirstArgs<ExtArgs>>): Prisma.Prisma__insighted_project_updateClient<runtime.Types.Result.GetResult<Prisma.$insighted_project_updatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends insighted_project_updateFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, insighted_project_updateFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__insighted_project_updateClient<runtime.Types.Result.GetResult<Prisma.$insighted_project_updatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends insighted_project_updateFindManyArgs>(args?: Prisma.SelectSubset<T, insighted_project_updateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$insighted_project_updatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends insighted_project_updateCreateArgs>(args: Prisma.SelectSubset<T, insighted_project_updateCreateArgs<ExtArgs>>): Prisma.Prisma__insighted_project_updateClient<runtime.Types.Result.GetResult<Prisma.$insighted_project_updatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends insighted_project_updateCreateManyArgs>(args?: Prisma.SelectSubset<T, insighted_project_updateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends insighted_project_updateCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, insighted_project_updateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$insighted_project_updatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends insighted_project_updateDeleteArgs>(args: Prisma.SelectSubset<T, insighted_project_updateDeleteArgs<ExtArgs>>): Prisma.Prisma__insighted_project_updateClient<runtime.Types.Result.GetResult<Prisma.$insighted_project_updatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends insighted_project_updateUpdateArgs>(args: Prisma.SelectSubset<T, insighted_project_updateUpdateArgs<ExtArgs>>): Prisma.Prisma__insighted_project_updateClient<runtime.Types.Result.GetResult<Prisma.$insighted_project_updatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends insighted_project_updateDeleteManyArgs>(args?: Prisma.SelectSubset<T, insighted_project_updateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends insighted_project_updateUpdateManyArgs>(args: Prisma.SelectSubset<T, insighted_project_updateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends insighted_project_updateUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, insighted_project_updateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$insighted_project_updatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends insighted_project_updateUpsertArgs>(args: Prisma.SelectSubset<T, insighted_project_updateUpsertArgs<ExtArgs>>): Prisma.Prisma__insighted_project_updateClient<runtime.Types.Result.GetResult<Prisma.$insighted_project_updatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends insighted_project_updateCountArgs>(args?: Prisma.Subset<T, insighted_project_updateCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Insighted_project_updateCountAggregateOutputType> : number>;
    aggregate<T extends Insighted_project_updateAggregateArgs>(args: Prisma.Subset<T, Insighted_project_updateAggregateArgs>): Prisma.PrismaPromise<GetInsighted_project_updateAggregateType<T>>;
    groupBy<T extends insighted_project_updateGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: insighted_project_updateGroupByArgs['orderBy'];
    } : {
        orderBy?: insighted_project_updateGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, insighted_project_updateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInsighted_project_updateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: insighted_project_updateFieldRefs;
}
export interface Prisma__insighted_project_updateClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface insighted_project_updateFieldRefs {
    readonly ipc: Prisma.FieldRef<"insighted_project_update", 'String'>;
    readonly approved_budget_for_contract: Prisma.FieldRef<"insighted_project_update", 'Decimal'>;
    readonly batch_of_funds: Prisma.FieldRef<"insighted_project_update", 'String'>;
    readonly project_category: Prisma.FieldRef<"insighted_project_update", 'String'>;
    readonly number_of_classrooms: Prisma.FieldRef<"insighted_project_update", 'Int'>;
    readonly number_of_sites: Prisma.FieldRef<"insighted_project_update", 'Int'>;
    readonly implementing_agency: Prisma.FieldRef<"insighted_project_update", 'String'>;
    readonly school_id: Prisma.FieldRef<"insighted_project_update", 'String'>;
    readonly region: Prisma.FieldRef<"insighted_project_update", 'String'>;
    readonly division: Prisma.FieldRef<"insighted_project_update", 'String'>;
    readonly scope_of_work: Prisma.FieldRef<"insighted_project_update", 'String'>;
    readonly legislative_district: Prisma.FieldRef<"insighted_project_update", 'String'>;
    readonly funding_year: Prisma.FieldRef<"insighted_project_update", 'Int'>;
}
export type insighted_project_updateFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.insighted_project_updateSelect<ExtArgs> | null;
    omit?: Prisma.insighted_project_updateOmit<ExtArgs> | null;
    where: Prisma.insighted_project_updateWhereUniqueInput;
};
export type insighted_project_updateFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.insighted_project_updateSelect<ExtArgs> | null;
    omit?: Prisma.insighted_project_updateOmit<ExtArgs> | null;
    where: Prisma.insighted_project_updateWhereUniqueInput;
};
export type insighted_project_updateFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.insighted_project_updateSelect<ExtArgs> | null;
    omit?: Prisma.insighted_project_updateOmit<ExtArgs> | null;
    where?: Prisma.insighted_project_updateWhereInput;
    orderBy?: Prisma.insighted_project_updateOrderByWithRelationInput | Prisma.insighted_project_updateOrderByWithRelationInput[];
    cursor?: Prisma.insighted_project_updateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Insighted_project_updateScalarFieldEnum | Prisma.Insighted_project_updateScalarFieldEnum[];
};
export type insighted_project_updateFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.insighted_project_updateSelect<ExtArgs> | null;
    omit?: Prisma.insighted_project_updateOmit<ExtArgs> | null;
    where?: Prisma.insighted_project_updateWhereInput;
    orderBy?: Prisma.insighted_project_updateOrderByWithRelationInput | Prisma.insighted_project_updateOrderByWithRelationInput[];
    cursor?: Prisma.insighted_project_updateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Insighted_project_updateScalarFieldEnum | Prisma.Insighted_project_updateScalarFieldEnum[];
};
export type insighted_project_updateFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.insighted_project_updateSelect<ExtArgs> | null;
    omit?: Prisma.insighted_project_updateOmit<ExtArgs> | null;
    where?: Prisma.insighted_project_updateWhereInput;
    orderBy?: Prisma.insighted_project_updateOrderByWithRelationInput | Prisma.insighted_project_updateOrderByWithRelationInput[];
    cursor?: Prisma.insighted_project_updateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Insighted_project_updateScalarFieldEnum | Prisma.Insighted_project_updateScalarFieldEnum[];
};
export type insighted_project_updateCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.insighted_project_updateSelect<ExtArgs> | null;
    omit?: Prisma.insighted_project_updateOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.insighted_project_updateCreateInput, Prisma.insighted_project_updateUncheckedCreateInput>;
};
export type insighted_project_updateCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.insighted_project_updateCreateManyInput | Prisma.insighted_project_updateCreateManyInput[];
    skipDuplicates?: boolean;
};
export type insighted_project_updateCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.insighted_project_updateSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.insighted_project_updateOmit<ExtArgs> | null;
    data: Prisma.insighted_project_updateCreateManyInput | Prisma.insighted_project_updateCreateManyInput[];
    skipDuplicates?: boolean;
};
export type insighted_project_updateUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.insighted_project_updateSelect<ExtArgs> | null;
    omit?: Prisma.insighted_project_updateOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.insighted_project_updateUpdateInput, Prisma.insighted_project_updateUncheckedUpdateInput>;
    where: Prisma.insighted_project_updateWhereUniqueInput;
};
export type insighted_project_updateUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.insighted_project_updateUpdateManyMutationInput, Prisma.insighted_project_updateUncheckedUpdateManyInput>;
    where?: Prisma.insighted_project_updateWhereInput;
    limit?: number;
};
export type insighted_project_updateUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.insighted_project_updateSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.insighted_project_updateOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.insighted_project_updateUpdateManyMutationInput, Prisma.insighted_project_updateUncheckedUpdateManyInput>;
    where?: Prisma.insighted_project_updateWhereInput;
    limit?: number;
};
export type insighted_project_updateUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.insighted_project_updateSelect<ExtArgs> | null;
    omit?: Prisma.insighted_project_updateOmit<ExtArgs> | null;
    where: Prisma.insighted_project_updateWhereUniqueInput;
    create: Prisma.XOR<Prisma.insighted_project_updateCreateInput, Prisma.insighted_project_updateUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.insighted_project_updateUpdateInput, Prisma.insighted_project_updateUncheckedUpdateInput>;
};
export type insighted_project_updateDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.insighted_project_updateSelect<ExtArgs> | null;
    omit?: Prisma.insighted_project_updateOmit<ExtArgs> | null;
    where: Prisma.insighted_project_updateWhereUniqueInput;
};
export type insighted_project_updateDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.insighted_project_updateWhereInput;
    limit?: number;
};
export type insighted_project_updateDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.insighted_project_updateSelect<ExtArgs> | null;
    omit?: Prisma.insighted_project_updateOmit<ExtArgs> | null;
};
