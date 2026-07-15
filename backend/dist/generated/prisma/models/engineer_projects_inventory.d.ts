import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type engineer_projects_inventoryModel = runtime.Types.Result.DefaultSelection<Prisma.$engineer_projects_inventoryPayload>;
export type AggregateEngineer_projects_inventory = {
    _count: Engineer_projects_inventoryCountAggregateOutputType | null;
    _avg: Engineer_projects_inventoryAvgAggregateOutputType | null;
    _sum: Engineer_projects_inventorySumAggregateOutputType | null;
    _min: Engineer_projects_inventoryMinAggregateOutputType | null;
    _max: Engineer_projects_inventoryMaxAggregateOutputType | null;
};
export type Engineer_projects_inventoryAvgAggregateOutputType = {
    funding_year: number | null;
};
export type Engineer_projects_inventorySumAggregateOutputType = {
    funding_year: number | null;
};
export type Engineer_projects_inventoryMinAggregateOutputType = {
    ipc: string | null;
    project_name: string | null;
    school_id: string | null;
    school_name: string | null;
    region: string | null;
    division: string | null;
    province: string | null;
    city: string | null;
    municipality: string | null;
    project_category: string | null;
    funding_year: number | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Engineer_projects_inventoryMaxAggregateOutputType = {
    ipc: string | null;
    project_name: string | null;
    school_id: string | null;
    school_name: string | null;
    region: string | null;
    division: string | null;
    province: string | null;
    city: string | null;
    municipality: string | null;
    project_category: string | null;
    funding_year: number | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Engineer_projects_inventoryCountAggregateOutputType = {
    ipc: number;
    project_name: number;
    school_id: number;
    school_name: number;
    region: number;
    division: number;
    province: number;
    city: number;
    municipality: number;
    project_category: number;
    funding_year: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Engineer_projects_inventoryAvgAggregateInputType = {
    funding_year?: true;
};
export type Engineer_projects_inventorySumAggregateInputType = {
    funding_year?: true;
};
export type Engineer_projects_inventoryMinAggregateInputType = {
    ipc?: true;
    project_name?: true;
    school_id?: true;
    school_name?: true;
    region?: true;
    division?: true;
    province?: true;
    city?: true;
    municipality?: true;
    project_category?: true;
    funding_year?: true;
    created_at?: true;
    updated_at?: true;
};
export type Engineer_projects_inventoryMaxAggregateInputType = {
    ipc?: true;
    project_name?: true;
    school_id?: true;
    school_name?: true;
    region?: true;
    division?: true;
    province?: true;
    city?: true;
    municipality?: true;
    project_category?: true;
    funding_year?: true;
    created_at?: true;
    updated_at?: true;
};
export type Engineer_projects_inventoryCountAggregateInputType = {
    ipc?: true;
    project_name?: true;
    school_id?: true;
    school_name?: true;
    region?: true;
    division?: true;
    province?: true;
    city?: true;
    municipality?: true;
    project_category?: true;
    funding_year?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Engineer_projects_inventoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.engineer_projects_inventoryWhereInput;
    orderBy?: Prisma.engineer_projects_inventoryOrderByWithRelationInput | Prisma.engineer_projects_inventoryOrderByWithRelationInput[];
    cursor?: Prisma.engineer_projects_inventoryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Engineer_projects_inventoryCountAggregateInputType;
    _avg?: Engineer_projects_inventoryAvgAggregateInputType;
    _sum?: Engineer_projects_inventorySumAggregateInputType;
    _min?: Engineer_projects_inventoryMinAggregateInputType;
    _max?: Engineer_projects_inventoryMaxAggregateInputType;
};
export type GetEngineer_projects_inventoryAggregateType<T extends Engineer_projects_inventoryAggregateArgs> = {
    [P in keyof T & keyof AggregateEngineer_projects_inventory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEngineer_projects_inventory[P]> : Prisma.GetScalarType<T[P], AggregateEngineer_projects_inventory[P]>;
};
export type engineer_projects_inventoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.engineer_projects_inventoryWhereInput;
    orderBy?: Prisma.engineer_projects_inventoryOrderByWithAggregationInput | Prisma.engineer_projects_inventoryOrderByWithAggregationInput[];
    by: Prisma.Engineer_projects_inventoryScalarFieldEnum[] | Prisma.Engineer_projects_inventoryScalarFieldEnum;
    having?: Prisma.engineer_projects_inventoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Engineer_projects_inventoryCountAggregateInputType | true;
    _avg?: Engineer_projects_inventoryAvgAggregateInputType;
    _sum?: Engineer_projects_inventorySumAggregateInputType;
    _min?: Engineer_projects_inventoryMinAggregateInputType;
    _max?: Engineer_projects_inventoryMaxAggregateInputType;
};
export type Engineer_projects_inventoryGroupByOutputType = {
    ipc: string;
    project_name: string | null;
    school_id: string | null;
    school_name: string | null;
    region: string | null;
    division: string | null;
    province: string | null;
    city: string | null;
    municipality: string | null;
    project_category: string | null;
    funding_year: number | null;
    created_at: Date | null;
    updated_at: Date | null;
    _count: Engineer_projects_inventoryCountAggregateOutputType | null;
    _avg: Engineer_projects_inventoryAvgAggregateOutputType | null;
    _sum: Engineer_projects_inventorySumAggregateOutputType | null;
    _min: Engineer_projects_inventoryMinAggregateOutputType | null;
    _max: Engineer_projects_inventoryMaxAggregateOutputType | null;
};
export type GetEngineer_projects_inventoryGroupByPayload<T extends engineer_projects_inventoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Engineer_projects_inventoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Engineer_projects_inventoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Engineer_projects_inventoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Engineer_projects_inventoryGroupByOutputType[P]>;
}>>;
export type engineer_projects_inventoryWhereInput = {
    AND?: Prisma.engineer_projects_inventoryWhereInput | Prisma.engineer_projects_inventoryWhereInput[];
    OR?: Prisma.engineer_projects_inventoryWhereInput[];
    NOT?: Prisma.engineer_projects_inventoryWhereInput | Prisma.engineer_projects_inventoryWhereInput[];
    ipc?: Prisma.StringFilter<"engineer_projects_inventory"> | string;
    project_name?: Prisma.StringNullableFilter<"engineer_projects_inventory"> | string | null;
    school_id?: Prisma.StringNullableFilter<"engineer_projects_inventory"> | string | null;
    school_name?: Prisma.StringNullableFilter<"engineer_projects_inventory"> | string | null;
    region?: Prisma.StringNullableFilter<"engineer_projects_inventory"> | string | null;
    division?: Prisma.StringNullableFilter<"engineer_projects_inventory"> | string | null;
    province?: Prisma.StringNullableFilter<"engineer_projects_inventory"> | string | null;
    city?: Prisma.StringNullableFilter<"engineer_projects_inventory"> | string | null;
    municipality?: Prisma.StringNullableFilter<"engineer_projects_inventory"> | string | null;
    project_category?: Prisma.StringNullableFilter<"engineer_projects_inventory"> | string | null;
    funding_year?: Prisma.IntNullableFilter<"engineer_projects_inventory"> | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"engineer_projects_inventory"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"engineer_projects_inventory"> | Date | string | null;
};
export type engineer_projects_inventoryOrderByWithRelationInput = {
    ipc?: Prisma.SortOrder;
    project_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    region?: Prisma.SortOrderInput | Prisma.SortOrder;
    division?: Prisma.SortOrderInput | Prisma.SortOrder;
    province?: Prisma.SortOrderInput | Prisma.SortOrder;
    city?: Prisma.SortOrderInput | Prisma.SortOrder;
    municipality?: Prisma.SortOrderInput | Prisma.SortOrder;
    project_category?: Prisma.SortOrderInput | Prisma.SortOrder;
    funding_year?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type engineer_projects_inventoryWhereUniqueInput = Prisma.AtLeast<{
    ipc?: string;
    AND?: Prisma.engineer_projects_inventoryWhereInput | Prisma.engineer_projects_inventoryWhereInput[];
    OR?: Prisma.engineer_projects_inventoryWhereInput[];
    NOT?: Prisma.engineer_projects_inventoryWhereInput | Prisma.engineer_projects_inventoryWhereInput[];
    project_name?: Prisma.StringNullableFilter<"engineer_projects_inventory"> | string | null;
    school_id?: Prisma.StringNullableFilter<"engineer_projects_inventory"> | string | null;
    school_name?: Prisma.StringNullableFilter<"engineer_projects_inventory"> | string | null;
    region?: Prisma.StringNullableFilter<"engineer_projects_inventory"> | string | null;
    division?: Prisma.StringNullableFilter<"engineer_projects_inventory"> | string | null;
    province?: Prisma.StringNullableFilter<"engineer_projects_inventory"> | string | null;
    city?: Prisma.StringNullableFilter<"engineer_projects_inventory"> | string | null;
    municipality?: Prisma.StringNullableFilter<"engineer_projects_inventory"> | string | null;
    project_category?: Prisma.StringNullableFilter<"engineer_projects_inventory"> | string | null;
    funding_year?: Prisma.IntNullableFilter<"engineer_projects_inventory"> | number | null;
    created_at?: Prisma.DateTimeNullableFilter<"engineer_projects_inventory"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"engineer_projects_inventory"> | Date | string | null;
}, "ipc">;
export type engineer_projects_inventoryOrderByWithAggregationInput = {
    ipc?: Prisma.SortOrder;
    project_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    school_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    region?: Prisma.SortOrderInput | Prisma.SortOrder;
    division?: Prisma.SortOrderInput | Prisma.SortOrder;
    province?: Prisma.SortOrderInput | Prisma.SortOrder;
    city?: Prisma.SortOrderInput | Prisma.SortOrder;
    municipality?: Prisma.SortOrderInput | Prisma.SortOrder;
    project_category?: Prisma.SortOrderInput | Prisma.SortOrder;
    funding_year?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.engineer_projects_inventoryCountOrderByAggregateInput;
    _avg?: Prisma.engineer_projects_inventoryAvgOrderByAggregateInput;
    _max?: Prisma.engineer_projects_inventoryMaxOrderByAggregateInput;
    _min?: Prisma.engineer_projects_inventoryMinOrderByAggregateInput;
    _sum?: Prisma.engineer_projects_inventorySumOrderByAggregateInput;
};
export type engineer_projects_inventoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.engineer_projects_inventoryScalarWhereWithAggregatesInput | Prisma.engineer_projects_inventoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.engineer_projects_inventoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.engineer_projects_inventoryScalarWhereWithAggregatesInput | Prisma.engineer_projects_inventoryScalarWhereWithAggregatesInput[];
    ipc?: Prisma.StringWithAggregatesFilter<"engineer_projects_inventory"> | string;
    project_name?: Prisma.StringNullableWithAggregatesFilter<"engineer_projects_inventory"> | string | null;
    school_id?: Prisma.StringNullableWithAggregatesFilter<"engineer_projects_inventory"> | string | null;
    school_name?: Prisma.StringNullableWithAggregatesFilter<"engineer_projects_inventory"> | string | null;
    region?: Prisma.StringNullableWithAggregatesFilter<"engineer_projects_inventory"> | string | null;
    division?: Prisma.StringNullableWithAggregatesFilter<"engineer_projects_inventory"> | string | null;
    province?: Prisma.StringNullableWithAggregatesFilter<"engineer_projects_inventory"> | string | null;
    city?: Prisma.StringNullableWithAggregatesFilter<"engineer_projects_inventory"> | string | null;
    municipality?: Prisma.StringNullableWithAggregatesFilter<"engineer_projects_inventory"> | string | null;
    project_category?: Prisma.StringNullableWithAggregatesFilter<"engineer_projects_inventory"> | string | null;
    funding_year?: Prisma.IntNullableWithAggregatesFilter<"engineer_projects_inventory"> | number | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"engineer_projects_inventory"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"engineer_projects_inventory"> | Date | string | null;
};
export type engineer_projects_inventoryCreateInput = {
    ipc: string;
    project_name?: string | null;
    school_id?: string | null;
    school_name?: string | null;
    region?: string | null;
    division?: string | null;
    province?: string | null;
    city?: string | null;
    municipality?: string | null;
    project_category?: string | null;
    funding_year?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type engineer_projects_inventoryUncheckedCreateInput = {
    ipc: string;
    project_name?: string | null;
    school_id?: string | null;
    school_name?: string | null;
    region?: string | null;
    division?: string | null;
    province?: string | null;
    city?: string | null;
    municipality?: string | null;
    project_category?: string | null;
    funding_year?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type engineer_projects_inventoryUpdateInput = {
    ipc?: Prisma.StringFieldUpdateOperationsInput | string;
    project_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    province?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    municipality?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    project_category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    funding_year?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type engineer_projects_inventoryUncheckedUpdateInput = {
    ipc?: Prisma.StringFieldUpdateOperationsInput | string;
    project_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    province?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    municipality?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    project_category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    funding_year?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type engineer_projects_inventoryCreateManyInput = {
    ipc: string;
    project_name?: string | null;
    school_id?: string | null;
    school_name?: string | null;
    region?: string | null;
    division?: string | null;
    province?: string | null;
    city?: string | null;
    municipality?: string | null;
    project_category?: string | null;
    funding_year?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type engineer_projects_inventoryUpdateManyMutationInput = {
    ipc?: Prisma.StringFieldUpdateOperationsInput | string;
    project_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    province?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    municipality?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    project_category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    funding_year?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type engineer_projects_inventoryUncheckedUpdateManyInput = {
    ipc?: Prisma.StringFieldUpdateOperationsInput | string;
    project_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    school_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    province?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    municipality?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    project_category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    funding_year?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type engineer_projects_inventoryCountOrderByAggregateInput = {
    ipc?: Prisma.SortOrder;
    project_name?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    school_name?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    province?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    municipality?: Prisma.SortOrder;
    project_category?: Prisma.SortOrder;
    funding_year?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type engineer_projects_inventoryAvgOrderByAggregateInput = {
    funding_year?: Prisma.SortOrder;
};
export type engineer_projects_inventoryMaxOrderByAggregateInput = {
    ipc?: Prisma.SortOrder;
    project_name?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    school_name?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    province?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    municipality?: Prisma.SortOrder;
    project_category?: Prisma.SortOrder;
    funding_year?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type engineer_projects_inventoryMinOrderByAggregateInput = {
    ipc?: Prisma.SortOrder;
    project_name?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    school_name?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    province?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    municipality?: Prisma.SortOrder;
    project_category?: Prisma.SortOrder;
    funding_year?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type engineer_projects_inventorySumOrderByAggregateInput = {
    funding_year?: Prisma.SortOrder;
};
export type engineer_projects_inventorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ipc?: boolean;
    project_name?: boolean;
    school_id?: boolean;
    school_name?: boolean;
    region?: boolean;
    division?: boolean;
    province?: boolean;
    city?: boolean;
    municipality?: boolean;
    project_category?: boolean;
    funding_year?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["engineer_projects_inventory"]>;
export type engineer_projects_inventorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ipc?: boolean;
    project_name?: boolean;
    school_id?: boolean;
    school_name?: boolean;
    region?: boolean;
    division?: boolean;
    province?: boolean;
    city?: boolean;
    municipality?: boolean;
    project_category?: boolean;
    funding_year?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["engineer_projects_inventory"]>;
export type engineer_projects_inventorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ipc?: boolean;
    project_name?: boolean;
    school_id?: boolean;
    school_name?: boolean;
    region?: boolean;
    division?: boolean;
    province?: boolean;
    city?: boolean;
    municipality?: boolean;
    project_category?: boolean;
    funding_year?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["engineer_projects_inventory"]>;
export type engineer_projects_inventorySelectScalar = {
    ipc?: boolean;
    project_name?: boolean;
    school_id?: boolean;
    school_name?: boolean;
    region?: boolean;
    division?: boolean;
    province?: boolean;
    city?: boolean;
    municipality?: boolean;
    project_category?: boolean;
    funding_year?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type engineer_projects_inventoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"ipc" | "project_name" | "school_id" | "school_name" | "region" | "division" | "province" | "city" | "municipality" | "project_category" | "funding_year" | "created_at" | "updated_at", ExtArgs["result"]["engineer_projects_inventory"]>;
export type $engineer_projects_inventoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "engineer_projects_inventory";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        ipc: string;
        project_name: string | null;
        school_id: string | null;
        school_name: string | null;
        region: string | null;
        division: string | null;
        province: string | null;
        city: string | null;
        municipality: string | null;
        project_category: string | null;
        funding_year: number | null;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["engineer_projects_inventory"]>;
    composites: {};
};
export type engineer_projects_inventoryGetPayload<S extends boolean | null | undefined | engineer_projects_inventoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$engineer_projects_inventoryPayload, S>;
export type engineer_projects_inventoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<engineer_projects_inventoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Engineer_projects_inventoryCountAggregateInputType | true;
};
export interface engineer_projects_inventoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['engineer_projects_inventory'];
        meta: {
            name: 'engineer_projects_inventory';
        };
    };
    findUnique<T extends engineer_projects_inventoryFindUniqueArgs>(args: Prisma.SelectSubset<T, engineer_projects_inventoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__engineer_projects_inventoryClient<runtime.Types.Result.GetResult<Prisma.$engineer_projects_inventoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends engineer_projects_inventoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, engineer_projects_inventoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__engineer_projects_inventoryClient<runtime.Types.Result.GetResult<Prisma.$engineer_projects_inventoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends engineer_projects_inventoryFindFirstArgs>(args?: Prisma.SelectSubset<T, engineer_projects_inventoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__engineer_projects_inventoryClient<runtime.Types.Result.GetResult<Prisma.$engineer_projects_inventoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends engineer_projects_inventoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, engineer_projects_inventoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__engineer_projects_inventoryClient<runtime.Types.Result.GetResult<Prisma.$engineer_projects_inventoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends engineer_projects_inventoryFindManyArgs>(args?: Prisma.SelectSubset<T, engineer_projects_inventoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$engineer_projects_inventoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends engineer_projects_inventoryCreateArgs>(args: Prisma.SelectSubset<T, engineer_projects_inventoryCreateArgs<ExtArgs>>): Prisma.Prisma__engineer_projects_inventoryClient<runtime.Types.Result.GetResult<Prisma.$engineer_projects_inventoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends engineer_projects_inventoryCreateManyArgs>(args?: Prisma.SelectSubset<T, engineer_projects_inventoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends engineer_projects_inventoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, engineer_projects_inventoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$engineer_projects_inventoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends engineer_projects_inventoryDeleteArgs>(args: Prisma.SelectSubset<T, engineer_projects_inventoryDeleteArgs<ExtArgs>>): Prisma.Prisma__engineer_projects_inventoryClient<runtime.Types.Result.GetResult<Prisma.$engineer_projects_inventoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends engineer_projects_inventoryUpdateArgs>(args: Prisma.SelectSubset<T, engineer_projects_inventoryUpdateArgs<ExtArgs>>): Prisma.Prisma__engineer_projects_inventoryClient<runtime.Types.Result.GetResult<Prisma.$engineer_projects_inventoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends engineer_projects_inventoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, engineer_projects_inventoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends engineer_projects_inventoryUpdateManyArgs>(args: Prisma.SelectSubset<T, engineer_projects_inventoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends engineer_projects_inventoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, engineer_projects_inventoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$engineer_projects_inventoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends engineer_projects_inventoryUpsertArgs>(args: Prisma.SelectSubset<T, engineer_projects_inventoryUpsertArgs<ExtArgs>>): Prisma.Prisma__engineer_projects_inventoryClient<runtime.Types.Result.GetResult<Prisma.$engineer_projects_inventoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends engineer_projects_inventoryCountArgs>(args?: Prisma.Subset<T, engineer_projects_inventoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Engineer_projects_inventoryCountAggregateOutputType> : number>;
    aggregate<T extends Engineer_projects_inventoryAggregateArgs>(args: Prisma.Subset<T, Engineer_projects_inventoryAggregateArgs>): Prisma.PrismaPromise<GetEngineer_projects_inventoryAggregateType<T>>;
    groupBy<T extends engineer_projects_inventoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: engineer_projects_inventoryGroupByArgs['orderBy'];
    } : {
        orderBy?: engineer_projects_inventoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, engineer_projects_inventoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEngineer_projects_inventoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: engineer_projects_inventoryFieldRefs;
}
export interface Prisma__engineer_projects_inventoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface engineer_projects_inventoryFieldRefs {
    readonly ipc: Prisma.FieldRef<"engineer_projects_inventory", 'String'>;
    readonly project_name: Prisma.FieldRef<"engineer_projects_inventory", 'String'>;
    readonly school_id: Prisma.FieldRef<"engineer_projects_inventory", 'String'>;
    readonly school_name: Prisma.FieldRef<"engineer_projects_inventory", 'String'>;
    readonly region: Prisma.FieldRef<"engineer_projects_inventory", 'String'>;
    readonly division: Prisma.FieldRef<"engineer_projects_inventory", 'String'>;
    readonly province: Prisma.FieldRef<"engineer_projects_inventory", 'String'>;
    readonly city: Prisma.FieldRef<"engineer_projects_inventory", 'String'>;
    readonly municipality: Prisma.FieldRef<"engineer_projects_inventory", 'String'>;
    readonly project_category: Prisma.FieldRef<"engineer_projects_inventory", 'String'>;
    readonly funding_year: Prisma.FieldRef<"engineer_projects_inventory", 'Int'>;
    readonly created_at: Prisma.FieldRef<"engineer_projects_inventory", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"engineer_projects_inventory", 'DateTime'>;
}
export type engineer_projects_inventoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_projects_inventorySelect<ExtArgs> | null;
    omit?: Prisma.engineer_projects_inventoryOmit<ExtArgs> | null;
    where: Prisma.engineer_projects_inventoryWhereUniqueInput;
};
export type engineer_projects_inventoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_projects_inventorySelect<ExtArgs> | null;
    omit?: Prisma.engineer_projects_inventoryOmit<ExtArgs> | null;
    where: Prisma.engineer_projects_inventoryWhereUniqueInput;
};
export type engineer_projects_inventoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_projects_inventorySelect<ExtArgs> | null;
    omit?: Prisma.engineer_projects_inventoryOmit<ExtArgs> | null;
    where?: Prisma.engineer_projects_inventoryWhereInput;
    orderBy?: Prisma.engineer_projects_inventoryOrderByWithRelationInput | Prisma.engineer_projects_inventoryOrderByWithRelationInput[];
    cursor?: Prisma.engineer_projects_inventoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Engineer_projects_inventoryScalarFieldEnum | Prisma.Engineer_projects_inventoryScalarFieldEnum[];
};
export type engineer_projects_inventoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_projects_inventorySelect<ExtArgs> | null;
    omit?: Prisma.engineer_projects_inventoryOmit<ExtArgs> | null;
    where?: Prisma.engineer_projects_inventoryWhereInput;
    orderBy?: Prisma.engineer_projects_inventoryOrderByWithRelationInput | Prisma.engineer_projects_inventoryOrderByWithRelationInput[];
    cursor?: Prisma.engineer_projects_inventoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Engineer_projects_inventoryScalarFieldEnum | Prisma.Engineer_projects_inventoryScalarFieldEnum[];
};
export type engineer_projects_inventoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_projects_inventorySelect<ExtArgs> | null;
    omit?: Prisma.engineer_projects_inventoryOmit<ExtArgs> | null;
    where?: Prisma.engineer_projects_inventoryWhereInput;
    orderBy?: Prisma.engineer_projects_inventoryOrderByWithRelationInput | Prisma.engineer_projects_inventoryOrderByWithRelationInput[];
    cursor?: Prisma.engineer_projects_inventoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Engineer_projects_inventoryScalarFieldEnum | Prisma.Engineer_projects_inventoryScalarFieldEnum[];
};
export type engineer_projects_inventoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_projects_inventorySelect<ExtArgs> | null;
    omit?: Prisma.engineer_projects_inventoryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.engineer_projects_inventoryCreateInput, Prisma.engineer_projects_inventoryUncheckedCreateInput>;
};
export type engineer_projects_inventoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.engineer_projects_inventoryCreateManyInput | Prisma.engineer_projects_inventoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type engineer_projects_inventoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_projects_inventorySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.engineer_projects_inventoryOmit<ExtArgs> | null;
    data: Prisma.engineer_projects_inventoryCreateManyInput | Prisma.engineer_projects_inventoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type engineer_projects_inventoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_projects_inventorySelect<ExtArgs> | null;
    omit?: Prisma.engineer_projects_inventoryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.engineer_projects_inventoryUpdateInput, Prisma.engineer_projects_inventoryUncheckedUpdateInput>;
    where: Prisma.engineer_projects_inventoryWhereUniqueInput;
};
export type engineer_projects_inventoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.engineer_projects_inventoryUpdateManyMutationInput, Prisma.engineer_projects_inventoryUncheckedUpdateManyInput>;
    where?: Prisma.engineer_projects_inventoryWhereInput;
    limit?: number;
};
export type engineer_projects_inventoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_projects_inventorySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.engineer_projects_inventoryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.engineer_projects_inventoryUpdateManyMutationInput, Prisma.engineer_projects_inventoryUncheckedUpdateManyInput>;
    where?: Prisma.engineer_projects_inventoryWhereInput;
    limit?: number;
};
export type engineer_projects_inventoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_projects_inventorySelect<ExtArgs> | null;
    omit?: Prisma.engineer_projects_inventoryOmit<ExtArgs> | null;
    where: Prisma.engineer_projects_inventoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.engineer_projects_inventoryCreateInput, Prisma.engineer_projects_inventoryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.engineer_projects_inventoryUpdateInput, Prisma.engineer_projects_inventoryUncheckedUpdateInput>;
};
export type engineer_projects_inventoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_projects_inventorySelect<ExtArgs> | null;
    omit?: Prisma.engineer_projects_inventoryOmit<ExtArgs> | null;
    where: Prisma.engineer_projects_inventoryWhereUniqueInput;
};
export type engineer_projects_inventoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.engineer_projects_inventoryWhereInput;
    limit?: number;
};
export type engineer_projects_inventoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.engineer_projects_inventorySelect<ExtArgs> | null;
    omit?: Prisma.engineer_projects_inventoryOmit<ExtArgs> | null;
};
