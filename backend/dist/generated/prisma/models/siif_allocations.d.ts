import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type siif_allocationsModel = runtime.Types.Result.DefaultSelection<Prisma.$siif_allocationsPayload>;
export type AggregateSiif_allocations = {
    _count: Siif_allocationsCountAggregateOutputType | null;
    _avg: Siif_allocationsAvgAggregateOutputType | null;
    _sum: Siif_allocationsSumAggregateOutputType | null;
    _min: Siif_allocationsMinAggregateOutputType | null;
    _max: Siif_allocationsMaxAggregateOutputType | null;
};
export type Siif_allocationsAvgAggregateOutputType = {
    siif_allocation_id: number | null;
    masterlist_no: number | null;
    fiscal_year: number | null;
    allocation_amount: runtime.Decimal | null;
    spent_amount: runtime.Decimal | null;
};
export type Siif_allocationsSumAggregateOutputType = {
    siif_allocation_id: number | null;
    masterlist_no: number | null;
    fiscal_year: number | null;
    allocation_amount: runtime.Decimal | null;
    spent_amount: runtime.Decimal | null;
};
export type Siif_allocationsMinAggregateOutputType = {
    siif_allocation_id: number | null;
    masterlist_no: number | null;
    region: string | null;
    division: string | null;
    district: string | null;
    school_id: string | null;
    school_name: string | null;
    fiscal_year: number | null;
    allocation_amount: runtime.Decimal | null;
    spent_amount: runtime.Decimal | null;
    remarks: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Siif_allocationsMaxAggregateOutputType = {
    siif_allocation_id: number | null;
    masterlist_no: number | null;
    region: string | null;
    division: string | null;
    district: string | null;
    school_id: string | null;
    school_name: string | null;
    fiscal_year: number | null;
    allocation_amount: runtime.Decimal | null;
    spent_amount: runtime.Decimal | null;
    remarks: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Siif_allocationsCountAggregateOutputType = {
    siif_allocation_id: number;
    masterlist_no: number;
    region: number;
    division: number;
    district: number;
    school_id: number;
    school_name: number;
    fiscal_year: number;
    allocation_amount: number;
    spent_amount: number;
    remarks: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Siif_allocationsAvgAggregateInputType = {
    siif_allocation_id?: true;
    masterlist_no?: true;
    fiscal_year?: true;
    allocation_amount?: true;
    spent_amount?: true;
};
export type Siif_allocationsSumAggregateInputType = {
    siif_allocation_id?: true;
    masterlist_no?: true;
    fiscal_year?: true;
    allocation_amount?: true;
    spent_amount?: true;
};
export type Siif_allocationsMinAggregateInputType = {
    siif_allocation_id?: true;
    masterlist_no?: true;
    region?: true;
    division?: true;
    district?: true;
    school_id?: true;
    school_name?: true;
    fiscal_year?: true;
    allocation_amount?: true;
    spent_amount?: true;
    remarks?: true;
    created_at?: true;
    updated_at?: true;
};
export type Siif_allocationsMaxAggregateInputType = {
    siif_allocation_id?: true;
    masterlist_no?: true;
    region?: true;
    division?: true;
    district?: true;
    school_id?: true;
    school_name?: true;
    fiscal_year?: true;
    allocation_amount?: true;
    spent_amount?: true;
    remarks?: true;
    created_at?: true;
    updated_at?: true;
};
export type Siif_allocationsCountAggregateInputType = {
    siif_allocation_id?: true;
    masterlist_no?: true;
    region?: true;
    division?: true;
    district?: true;
    school_id?: true;
    school_name?: true;
    fiscal_year?: true;
    allocation_amount?: true;
    spent_amount?: true;
    remarks?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Siif_allocationsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_allocationsWhereInput;
    orderBy?: Prisma.siif_allocationsOrderByWithRelationInput | Prisma.siif_allocationsOrderByWithRelationInput[];
    cursor?: Prisma.siif_allocationsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Siif_allocationsCountAggregateInputType;
    _avg?: Siif_allocationsAvgAggregateInputType;
    _sum?: Siif_allocationsSumAggregateInputType;
    _min?: Siif_allocationsMinAggregateInputType;
    _max?: Siif_allocationsMaxAggregateInputType;
};
export type GetSiif_allocationsAggregateType<T extends Siif_allocationsAggregateArgs> = {
    [P in keyof T & keyof AggregateSiif_allocations]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSiif_allocations[P]> : Prisma.GetScalarType<T[P], AggregateSiif_allocations[P]>;
};
export type siif_allocationsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_allocationsWhereInput;
    orderBy?: Prisma.siif_allocationsOrderByWithAggregationInput | Prisma.siif_allocationsOrderByWithAggregationInput[];
    by: Prisma.Siif_allocationsScalarFieldEnum[] | Prisma.Siif_allocationsScalarFieldEnum;
    having?: Prisma.siif_allocationsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Siif_allocationsCountAggregateInputType | true;
    _avg?: Siif_allocationsAvgAggregateInputType;
    _sum?: Siif_allocationsSumAggregateInputType;
    _min?: Siif_allocationsMinAggregateInputType;
    _max?: Siif_allocationsMaxAggregateInputType;
};
export type Siif_allocationsGroupByOutputType = {
    siif_allocation_id: number;
    masterlist_no: number | null;
    region: string | null;
    division: string | null;
    district: string | null;
    school_id: string;
    school_name: string | null;
    fiscal_year: number;
    allocation_amount: runtime.Decimal | null;
    spent_amount: runtime.Decimal | null;
    remarks: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    _count: Siif_allocationsCountAggregateOutputType | null;
    _avg: Siif_allocationsAvgAggregateOutputType | null;
    _sum: Siif_allocationsSumAggregateOutputType | null;
    _min: Siif_allocationsMinAggregateOutputType | null;
    _max: Siif_allocationsMaxAggregateOutputType | null;
};
export type GetSiif_allocationsGroupByPayload<T extends siif_allocationsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Siif_allocationsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Siif_allocationsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Siif_allocationsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Siif_allocationsGroupByOutputType[P]>;
}>>;
export type siif_allocationsWhereInput = {
    AND?: Prisma.siif_allocationsWhereInput | Prisma.siif_allocationsWhereInput[];
    OR?: Prisma.siif_allocationsWhereInput[];
    NOT?: Prisma.siif_allocationsWhereInput | Prisma.siif_allocationsWhereInput[];
    siif_allocation_id?: Prisma.IntFilter<"siif_allocations"> | number;
    masterlist_no?: Prisma.IntNullableFilter<"siif_allocations"> | number | null;
    region?: Prisma.StringNullableFilter<"siif_allocations"> | string | null;
    division?: Prisma.StringNullableFilter<"siif_allocations"> | string | null;
    district?: Prisma.StringNullableFilter<"siif_allocations"> | string | null;
    school_id?: Prisma.StringFilter<"siif_allocations"> | string;
    school_name?: Prisma.StringNullableFilter<"siif_allocations"> | string | null;
    fiscal_year?: Prisma.IntFilter<"siif_allocations"> | number;
    allocation_amount?: Prisma.DecimalNullableFilter<"siif_allocations"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    spent_amount?: Prisma.DecimalNullableFilter<"siif_allocations"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    remarks?: Prisma.StringNullableFilter<"siif_allocations"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"siif_allocations"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"siif_allocations"> | Date | string | null;
};
export type siif_allocationsOrderByWithRelationInput = {
    siif_allocation_id?: Prisma.SortOrder;
    masterlist_no?: Prisma.SortOrderInput | Prisma.SortOrder;
    region?: Prisma.SortOrderInput | Prisma.SortOrder;
    division?: Prisma.SortOrderInput | Prisma.SortOrder;
    district?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    school_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    fiscal_year?: Prisma.SortOrder;
    allocation_amount?: Prisma.SortOrderInput | Prisma.SortOrder;
    spent_amount?: Prisma.SortOrderInput | Prisma.SortOrder;
    remarks?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type siif_allocationsWhereUniqueInput = Prisma.AtLeast<{
    siif_allocation_id?: number;
    school_id_fiscal_year?: Prisma.siif_allocationsSchool_idFiscal_yearCompoundUniqueInput;
    AND?: Prisma.siif_allocationsWhereInput | Prisma.siif_allocationsWhereInput[];
    OR?: Prisma.siif_allocationsWhereInput[];
    NOT?: Prisma.siif_allocationsWhereInput | Prisma.siif_allocationsWhereInput[];
    masterlist_no?: Prisma.IntNullableFilter<"siif_allocations"> | number | null;
    region?: Prisma.StringNullableFilter<"siif_allocations"> | string | null;
    division?: Prisma.StringNullableFilter<"siif_allocations"> | string | null;
    district?: Prisma.StringNullableFilter<"siif_allocations"> | string | null;
    school_id?: Prisma.StringFilter<"siif_allocations"> | string;
    school_name?: Prisma.StringNullableFilter<"siif_allocations"> | string | null;
    fiscal_year?: Prisma.IntFilter<"siif_allocations"> | number;
    allocation_amount?: Prisma.DecimalNullableFilter<"siif_allocations"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    spent_amount?: Prisma.DecimalNullableFilter<"siif_allocations"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    remarks?: Prisma.StringNullableFilter<"siif_allocations"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"siif_allocations"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"siif_allocations"> | Date | string | null;
}, "siif_allocation_id" | "school_id_fiscal_year">;
export type siif_allocationsOrderByWithAggregationInput = {
    siif_allocation_id?: Prisma.SortOrder;
    masterlist_no?: Prisma.SortOrderInput | Prisma.SortOrder;
    region?: Prisma.SortOrderInput | Prisma.SortOrder;
    division?: Prisma.SortOrderInput | Prisma.SortOrder;
    district?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    school_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    fiscal_year?: Prisma.SortOrder;
    allocation_amount?: Prisma.SortOrderInput | Prisma.SortOrder;
    spent_amount?: Prisma.SortOrderInput | Prisma.SortOrder;
    remarks?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.siif_allocationsCountOrderByAggregateInput;
    _avg?: Prisma.siif_allocationsAvgOrderByAggregateInput;
    _max?: Prisma.siif_allocationsMaxOrderByAggregateInput;
    _min?: Prisma.siif_allocationsMinOrderByAggregateInput;
    _sum?: Prisma.siif_allocationsSumOrderByAggregateInput;
};
export type siif_allocationsScalarWhereWithAggregatesInput = {
    AND?: Prisma.siif_allocationsScalarWhereWithAggregatesInput | Prisma.siif_allocationsScalarWhereWithAggregatesInput[];
    OR?: Prisma.siif_allocationsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.siif_allocationsScalarWhereWithAggregatesInput | Prisma.siif_allocationsScalarWhereWithAggregatesInput[];
    siif_allocation_id?: Prisma.IntWithAggregatesFilter<"siif_allocations"> | number;
    masterlist_no?: Prisma.IntNullableWithAggregatesFilter<"siif_allocations"> | number | null;
    region?: Prisma.StringNullableWithAggregatesFilter<"siif_allocations"> | string | null;
    division?: Prisma.StringNullableWithAggregatesFilter<"siif_allocations"> | string | null;
    district?: Prisma.StringNullableWithAggregatesFilter<"siif_allocations"> | string | null;
    school_id?: Prisma.StringWithAggregatesFilter<"siif_allocations"> | string;
    school_name?: Prisma.StringNullableWithAggregatesFilter<"siif_allocations"> | string | null;
    fiscal_year?: Prisma.IntWithAggregatesFilter<"siif_allocations"> | number;
    allocation_amount?: Prisma.DecimalNullableWithAggregatesFilter<"siif_allocations"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    spent_amount?: Prisma.DecimalNullableWithAggregatesFilter<"siif_allocations"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    remarks?: Prisma.StringNullableWithAggregatesFilter<"siif_allocations"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"siif_allocations"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"siif_allocations"> | Date | string | null;
};
export type siif_allocationsCreateInput = {
    masterlist_no?: number | null;
    region?: string | null;
    division?: string | null;
    district?: string | null;
    school_id: string;
    school_name?: string | null;
    fiscal_year: number;
    allocation_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    spent_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    remarks?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type siif_allocationsUncheckedCreateInput = {
    siif_allocation_id?: number;
    masterlist_no?: number | null;
    region?: string | null;
    division?: string | null;
    district?: string | null;
    school_id: string;
    school_name?: string | null;
    fiscal_year: number;
    allocation_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    spent_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    remarks?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type siif_allocationsUpdateInput = {
    masterlist_no?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_id?: Prisma.StringFieldUpdateOperationsInput | string;
    school_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fiscal_year?: Prisma.IntFieldUpdateOperationsInput | number;
    allocation_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    spent_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type siif_allocationsUncheckedUpdateInput = {
    siif_allocation_id?: Prisma.IntFieldUpdateOperationsInput | number;
    masterlist_no?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_id?: Prisma.StringFieldUpdateOperationsInput | string;
    school_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fiscal_year?: Prisma.IntFieldUpdateOperationsInput | number;
    allocation_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    spent_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type siif_allocationsCreateManyInput = {
    siif_allocation_id?: number;
    masterlist_no?: number | null;
    region?: string | null;
    division?: string | null;
    district?: string | null;
    school_id: string;
    school_name?: string | null;
    fiscal_year: number;
    allocation_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    spent_amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    remarks?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type siif_allocationsUpdateManyMutationInput = {
    masterlist_no?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_id?: Prisma.StringFieldUpdateOperationsInput | string;
    school_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fiscal_year?: Prisma.IntFieldUpdateOperationsInput | number;
    allocation_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    spent_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type siif_allocationsUncheckedUpdateManyInput = {
    siif_allocation_id?: Prisma.IntFieldUpdateOperationsInput | number;
    masterlist_no?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    district?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_id?: Prisma.StringFieldUpdateOperationsInput | string;
    school_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fiscal_year?: Prisma.IntFieldUpdateOperationsInput | number;
    allocation_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    spent_amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type siif_allocationsSchool_idFiscal_yearCompoundUniqueInput = {
    school_id: string;
    fiscal_year: number;
};
export type siif_allocationsCountOrderByAggregateInput = {
    siif_allocation_id?: Prisma.SortOrder;
    masterlist_no?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    school_name?: Prisma.SortOrder;
    fiscal_year?: Prisma.SortOrder;
    allocation_amount?: Prisma.SortOrder;
    spent_amount?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type siif_allocationsAvgOrderByAggregateInput = {
    siif_allocation_id?: Prisma.SortOrder;
    masterlist_no?: Prisma.SortOrder;
    fiscal_year?: Prisma.SortOrder;
    allocation_amount?: Prisma.SortOrder;
    spent_amount?: Prisma.SortOrder;
};
export type siif_allocationsMaxOrderByAggregateInput = {
    siif_allocation_id?: Prisma.SortOrder;
    masterlist_no?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    school_name?: Prisma.SortOrder;
    fiscal_year?: Prisma.SortOrder;
    allocation_amount?: Prisma.SortOrder;
    spent_amount?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type siif_allocationsMinOrderByAggregateInput = {
    siif_allocation_id?: Prisma.SortOrder;
    masterlist_no?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    school_name?: Prisma.SortOrder;
    fiscal_year?: Prisma.SortOrder;
    allocation_amount?: Prisma.SortOrder;
    spent_amount?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type siif_allocationsSumOrderByAggregateInput = {
    siif_allocation_id?: Prisma.SortOrder;
    masterlist_no?: Prisma.SortOrder;
    fiscal_year?: Prisma.SortOrder;
    allocation_amount?: Prisma.SortOrder;
    spent_amount?: Prisma.SortOrder;
};
export type siif_allocationsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    siif_allocation_id?: boolean;
    masterlist_no?: boolean;
    region?: boolean;
    division?: boolean;
    district?: boolean;
    school_id?: boolean;
    school_name?: boolean;
    fiscal_year?: boolean;
    allocation_amount?: boolean;
    spent_amount?: boolean;
    remarks?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["siif_allocations"]>;
export type siif_allocationsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    siif_allocation_id?: boolean;
    masterlist_no?: boolean;
    region?: boolean;
    division?: boolean;
    district?: boolean;
    school_id?: boolean;
    school_name?: boolean;
    fiscal_year?: boolean;
    allocation_amount?: boolean;
    spent_amount?: boolean;
    remarks?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["siif_allocations"]>;
export type siif_allocationsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    siif_allocation_id?: boolean;
    masterlist_no?: boolean;
    region?: boolean;
    division?: boolean;
    district?: boolean;
    school_id?: boolean;
    school_name?: boolean;
    fiscal_year?: boolean;
    allocation_amount?: boolean;
    spent_amount?: boolean;
    remarks?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["siif_allocations"]>;
export type siif_allocationsSelectScalar = {
    siif_allocation_id?: boolean;
    masterlist_no?: boolean;
    region?: boolean;
    division?: boolean;
    district?: boolean;
    school_id?: boolean;
    school_name?: boolean;
    fiscal_year?: boolean;
    allocation_amount?: boolean;
    spent_amount?: boolean;
    remarks?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type siif_allocationsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"siif_allocation_id" | "masterlist_no" | "region" | "division" | "district" | "school_id" | "school_name" | "fiscal_year" | "allocation_amount" | "spent_amount" | "remarks" | "created_at" | "updated_at", ExtArgs["result"]["siif_allocations"]>;
export type $siif_allocationsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "siif_allocations";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        siif_allocation_id: number;
        masterlist_no: number | null;
        region: string | null;
        division: string | null;
        district: string | null;
        school_id: string;
        school_name: string | null;
        fiscal_year: number;
        allocation_amount: runtime.Decimal | null;
        spent_amount: runtime.Decimal | null;
        remarks: string | null;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["siif_allocations"]>;
    composites: {};
};
export type siif_allocationsGetPayload<S extends boolean | null | undefined | siif_allocationsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$siif_allocationsPayload, S>;
export type siif_allocationsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<siif_allocationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Siif_allocationsCountAggregateInputType | true;
};
export interface siif_allocationsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['siif_allocations'];
        meta: {
            name: 'siif_allocations';
        };
    };
    findUnique<T extends siif_allocationsFindUniqueArgs>(args: Prisma.SelectSubset<T, siif_allocationsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__siif_allocationsClient<runtime.Types.Result.GetResult<Prisma.$siif_allocationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends siif_allocationsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, siif_allocationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__siif_allocationsClient<runtime.Types.Result.GetResult<Prisma.$siif_allocationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends siif_allocationsFindFirstArgs>(args?: Prisma.SelectSubset<T, siif_allocationsFindFirstArgs<ExtArgs>>): Prisma.Prisma__siif_allocationsClient<runtime.Types.Result.GetResult<Prisma.$siif_allocationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends siif_allocationsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, siif_allocationsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__siif_allocationsClient<runtime.Types.Result.GetResult<Prisma.$siif_allocationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends siif_allocationsFindManyArgs>(args?: Prisma.SelectSubset<T, siif_allocationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_allocationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends siif_allocationsCreateArgs>(args: Prisma.SelectSubset<T, siif_allocationsCreateArgs<ExtArgs>>): Prisma.Prisma__siif_allocationsClient<runtime.Types.Result.GetResult<Prisma.$siif_allocationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends siif_allocationsCreateManyArgs>(args?: Prisma.SelectSubset<T, siif_allocationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends siif_allocationsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, siif_allocationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_allocationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends siif_allocationsDeleteArgs>(args: Prisma.SelectSubset<T, siif_allocationsDeleteArgs<ExtArgs>>): Prisma.Prisma__siif_allocationsClient<runtime.Types.Result.GetResult<Prisma.$siif_allocationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends siif_allocationsUpdateArgs>(args: Prisma.SelectSubset<T, siif_allocationsUpdateArgs<ExtArgs>>): Prisma.Prisma__siif_allocationsClient<runtime.Types.Result.GetResult<Prisma.$siif_allocationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends siif_allocationsDeleteManyArgs>(args?: Prisma.SelectSubset<T, siif_allocationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends siif_allocationsUpdateManyArgs>(args: Prisma.SelectSubset<T, siif_allocationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends siif_allocationsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, siif_allocationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$siif_allocationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends siif_allocationsUpsertArgs>(args: Prisma.SelectSubset<T, siif_allocationsUpsertArgs<ExtArgs>>): Prisma.Prisma__siif_allocationsClient<runtime.Types.Result.GetResult<Prisma.$siif_allocationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends siif_allocationsCountArgs>(args?: Prisma.Subset<T, siif_allocationsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Siif_allocationsCountAggregateOutputType> : number>;
    aggregate<T extends Siif_allocationsAggregateArgs>(args: Prisma.Subset<T, Siif_allocationsAggregateArgs>): Prisma.PrismaPromise<GetSiif_allocationsAggregateType<T>>;
    groupBy<T extends siif_allocationsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: siif_allocationsGroupByArgs['orderBy'];
    } : {
        orderBy?: siif_allocationsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, siif_allocationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiif_allocationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: siif_allocationsFieldRefs;
}
export interface Prisma__siif_allocationsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface siif_allocationsFieldRefs {
    readonly siif_allocation_id: Prisma.FieldRef<"siif_allocations", 'Int'>;
    readonly masterlist_no: Prisma.FieldRef<"siif_allocations", 'Int'>;
    readonly region: Prisma.FieldRef<"siif_allocations", 'String'>;
    readonly division: Prisma.FieldRef<"siif_allocations", 'String'>;
    readonly district: Prisma.FieldRef<"siif_allocations", 'String'>;
    readonly school_id: Prisma.FieldRef<"siif_allocations", 'String'>;
    readonly school_name: Prisma.FieldRef<"siif_allocations", 'String'>;
    readonly fiscal_year: Prisma.FieldRef<"siif_allocations", 'Int'>;
    readonly allocation_amount: Prisma.FieldRef<"siif_allocations", 'Decimal'>;
    readonly spent_amount: Prisma.FieldRef<"siif_allocations", 'Decimal'>;
    readonly remarks: Prisma.FieldRef<"siif_allocations", 'String'>;
    readonly created_at: Prisma.FieldRef<"siif_allocations", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"siif_allocations", 'DateTime'>;
}
export type siif_allocationsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_allocationsSelect<ExtArgs> | null;
    omit?: Prisma.siif_allocationsOmit<ExtArgs> | null;
    where: Prisma.siif_allocationsWhereUniqueInput;
};
export type siif_allocationsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_allocationsSelect<ExtArgs> | null;
    omit?: Prisma.siif_allocationsOmit<ExtArgs> | null;
    where: Prisma.siif_allocationsWhereUniqueInput;
};
export type siif_allocationsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_allocationsSelect<ExtArgs> | null;
    omit?: Prisma.siif_allocationsOmit<ExtArgs> | null;
    where?: Prisma.siif_allocationsWhereInput;
    orderBy?: Prisma.siif_allocationsOrderByWithRelationInput | Prisma.siif_allocationsOrderByWithRelationInput[];
    cursor?: Prisma.siif_allocationsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Siif_allocationsScalarFieldEnum | Prisma.Siif_allocationsScalarFieldEnum[];
};
export type siif_allocationsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_allocationsSelect<ExtArgs> | null;
    omit?: Prisma.siif_allocationsOmit<ExtArgs> | null;
    where?: Prisma.siif_allocationsWhereInput;
    orderBy?: Prisma.siif_allocationsOrderByWithRelationInput | Prisma.siif_allocationsOrderByWithRelationInput[];
    cursor?: Prisma.siif_allocationsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Siif_allocationsScalarFieldEnum | Prisma.Siif_allocationsScalarFieldEnum[];
};
export type siif_allocationsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_allocationsSelect<ExtArgs> | null;
    omit?: Prisma.siif_allocationsOmit<ExtArgs> | null;
    where?: Prisma.siif_allocationsWhereInput;
    orderBy?: Prisma.siif_allocationsOrderByWithRelationInput | Prisma.siif_allocationsOrderByWithRelationInput[];
    cursor?: Prisma.siif_allocationsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Siif_allocationsScalarFieldEnum | Prisma.Siif_allocationsScalarFieldEnum[];
};
export type siif_allocationsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_allocationsSelect<ExtArgs> | null;
    omit?: Prisma.siif_allocationsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.siif_allocationsCreateInput, Prisma.siif_allocationsUncheckedCreateInput>;
};
export type siif_allocationsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.siif_allocationsCreateManyInput | Prisma.siif_allocationsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type siif_allocationsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_allocationsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.siif_allocationsOmit<ExtArgs> | null;
    data: Prisma.siif_allocationsCreateManyInput | Prisma.siif_allocationsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type siif_allocationsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_allocationsSelect<ExtArgs> | null;
    omit?: Prisma.siif_allocationsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.siif_allocationsUpdateInput, Prisma.siif_allocationsUncheckedUpdateInput>;
    where: Prisma.siif_allocationsWhereUniqueInput;
};
export type siif_allocationsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.siif_allocationsUpdateManyMutationInput, Prisma.siif_allocationsUncheckedUpdateManyInput>;
    where?: Prisma.siif_allocationsWhereInput;
    limit?: number;
};
export type siif_allocationsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_allocationsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.siif_allocationsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.siif_allocationsUpdateManyMutationInput, Prisma.siif_allocationsUncheckedUpdateManyInput>;
    where?: Prisma.siif_allocationsWhereInput;
    limit?: number;
};
export type siif_allocationsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_allocationsSelect<ExtArgs> | null;
    omit?: Prisma.siif_allocationsOmit<ExtArgs> | null;
    where: Prisma.siif_allocationsWhereUniqueInput;
    create: Prisma.XOR<Prisma.siif_allocationsCreateInput, Prisma.siif_allocationsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.siif_allocationsUpdateInput, Prisma.siif_allocationsUncheckedUpdateInput>;
};
export type siif_allocationsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_allocationsSelect<ExtArgs> | null;
    omit?: Prisma.siif_allocationsOmit<ExtArgs> | null;
    where: Prisma.siif_allocationsWhereUniqueInput;
};
export type siif_allocationsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.siif_allocationsWhereInput;
    limit?: number;
};
export type siif_allocationsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.siif_allocationsSelect<ExtArgs> | null;
    omit?: Prisma.siif_allocationsOmit<ExtArgs> | null;
};
