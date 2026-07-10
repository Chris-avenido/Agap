import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type buildable_spacesModel = runtime.Types.Result.DefaultSelection<Prisma.$buildable_spacesPayload>;
export type AggregateBuildable_spaces = {
    _count: Buildable_spacesCountAggregateOutputType | null;
    _avg: Buildable_spacesAvgAggregateOutputType | null;
    _sum: Buildable_spacesSumAggregateOutputType | null;
    _min: Buildable_spacesMinAggregateOutputType | null;
    _max: Buildable_spacesMaxAggregateOutputType | null;
};
export type Buildable_spacesAvgAggregateOutputType = {
    space_id: number | null;
    space_number: number | null;
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
    length: runtime.Decimal | null;
    width: runtime.Decimal | null;
    total_area: runtime.Decimal | null;
};
export type Buildable_spacesSumAggregateOutputType = {
    space_id: number | null;
    space_number: number | null;
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
    length: runtime.Decimal | null;
    width: runtime.Decimal | null;
    total_area: runtime.Decimal | null;
};
export type Buildable_spacesMinAggregateOutputType = {
    space_id: number | null;
    school_id: string | null;
    iern: string | null;
    space_number: number | null;
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
    length: runtime.Decimal | null;
    width: runtime.Decimal | null;
    total_area: runtime.Decimal | null;
    created_at: Date | null;
};
export type Buildable_spacesMaxAggregateOutputType = {
    space_id: number | null;
    school_id: string | null;
    iern: string | null;
    space_number: number | null;
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
    length: runtime.Decimal | null;
    width: runtime.Decimal | null;
    total_area: runtime.Decimal | null;
    created_at: Date | null;
};
export type Buildable_spacesCountAggregateOutputType = {
    space_id: number;
    school_id: number;
    iern: number;
    space_number: number;
    latitude: number;
    longitude: number;
    length: number;
    width: number;
    total_area: number;
    created_at: number;
    _all: number;
};
export type Buildable_spacesAvgAggregateInputType = {
    space_id?: true;
    space_number?: true;
    latitude?: true;
    longitude?: true;
    length?: true;
    width?: true;
    total_area?: true;
};
export type Buildable_spacesSumAggregateInputType = {
    space_id?: true;
    space_number?: true;
    latitude?: true;
    longitude?: true;
    length?: true;
    width?: true;
    total_area?: true;
};
export type Buildable_spacesMinAggregateInputType = {
    space_id?: true;
    school_id?: true;
    iern?: true;
    space_number?: true;
    latitude?: true;
    longitude?: true;
    length?: true;
    width?: true;
    total_area?: true;
    created_at?: true;
};
export type Buildable_spacesMaxAggregateInputType = {
    space_id?: true;
    school_id?: true;
    iern?: true;
    space_number?: true;
    latitude?: true;
    longitude?: true;
    length?: true;
    width?: true;
    total_area?: true;
    created_at?: true;
};
export type Buildable_spacesCountAggregateInputType = {
    space_id?: true;
    school_id?: true;
    iern?: true;
    space_number?: true;
    latitude?: true;
    longitude?: true;
    length?: true;
    width?: true;
    total_area?: true;
    created_at?: true;
    _all?: true;
};
export type Buildable_spacesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.buildable_spacesWhereInput;
    orderBy?: Prisma.buildable_spacesOrderByWithRelationInput | Prisma.buildable_spacesOrderByWithRelationInput[];
    cursor?: Prisma.buildable_spacesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Buildable_spacesCountAggregateInputType;
    _avg?: Buildable_spacesAvgAggregateInputType;
    _sum?: Buildable_spacesSumAggregateInputType;
    _min?: Buildable_spacesMinAggregateInputType;
    _max?: Buildable_spacesMaxAggregateInputType;
};
export type GetBuildable_spacesAggregateType<T extends Buildable_spacesAggregateArgs> = {
    [P in keyof T & keyof AggregateBuildable_spaces]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBuildable_spaces[P]> : Prisma.GetScalarType<T[P], AggregateBuildable_spaces[P]>;
};
export type buildable_spacesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.buildable_spacesWhereInput;
    orderBy?: Prisma.buildable_spacesOrderByWithAggregationInput | Prisma.buildable_spacesOrderByWithAggregationInput[];
    by: Prisma.Buildable_spacesScalarFieldEnum[] | Prisma.Buildable_spacesScalarFieldEnum;
    having?: Prisma.buildable_spacesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Buildable_spacesCountAggregateInputType | true;
    _avg?: Buildable_spacesAvgAggregateInputType;
    _sum?: Buildable_spacesSumAggregateInputType;
    _min?: Buildable_spacesMinAggregateInputType;
    _max?: Buildable_spacesMaxAggregateInputType;
};
export type Buildable_spacesGroupByOutputType = {
    space_id: number;
    school_id: string | null;
    iern: string | null;
    space_number: number | null;
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
    length: runtime.Decimal | null;
    width: runtime.Decimal | null;
    total_area: runtime.Decimal | null;
    created_at: Date | null;
    _count: Buildable_spacesCountAggregateOutputType | null;
    _avg: Buildable_spacesAvgAggregateOutputType | null;
    _sum: Buildable_spacesSumAggregateOutputType | null;
    _min: Buildable_spacesMinAggregateOutputType | null;
    _max: Buildable_spacesMaxAggregateOutputType | null;
};
export type GetBuildable_spacesGroupByPayload<T extends buildable_spacesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Buildable_spacesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Buildable_spacesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Buildable_spacesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Buildable_spacesGroupByOutputType[P]>;
}>>;
export type buildable_spacesWhereInput = {
    AND?: Prisma.buildable_spacesWhereInput | Prisma.buildable_spacesWhereInput[];
    OR?: Prisma.buildable_spacesWhereInput[];
    NOT?: Prisma.buildable_spacesWhereInput | Prisma.buildable_spacesWhereInput[];
    space_id?: Prisma.IntFilter<"buildable_spaces"> | number;
    school_id?: Prisma.StringNullableFilter<"buildable_spaces"> | string | null;
    iern?: Prisma.StringNullableFilter<"buildable_spaces"> | string | null;
    space_number?: Prisma.IntNullableFilter<"buildable_spaces"> | number | null;
    latitude?: Prisma.DecimalNullableFilter<"buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.DecimalNullableFilter<"buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.DecimalNullableFilter<"buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.DecimalNullableFilter<"buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total_area?: Prisma.DecimalNullableFilter<"buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"buildable_spaces"> | Date | string | null;
};
export type buildable_spacesOrderByWithRelationInput = {
    space_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    iern?: Prisma.SortOrderInput | Prisma.SortOrder;
    space_number?: Prisma.SortOrderInput | Prisma.SortOrder;
    latitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    longitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    length?: Prisma.SortOrderInput | Prisma.SortOrder;
    width?: Prisma.SortOrderInput | Prisma.SortOrder;
    total_area?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type buildable_spacesWhereUniqueInput = Prisma.AtLeast<{
    space_id?: number;
    AND?: Prisma.buildable_spacesWhereInput | Prisma.buildable_spacesWhereInput[];
    OR?: Prisma.buildable_spacesWhereInput[];
    NOT?: Prisma.buildable_spacesWhereInput | Prisma.buildable_spacesWhereInput[];
    school_id?: Prisma.StringNullableFilter<"buildable_spaces"> | string | null;
    iern?: Prisma.StringNullableFilter<"buildable_spaces"> | string | null;
    space_number?: Prisma.IntNullableFilter<"buildable_spaces"> | number | null;
    latitude?: Prisma.DecimalNullableFilter<"buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.DecimalNullableFilter<"buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.DecimalNullableFilter<"buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.DecimalNullableFilter<"buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total_area?: Prisma.DecimalNullableFilter<"buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"buildable_spaces"> | Date | string | null;
}, "space_id">;
export type buildable_spacesOrderByWithAggregationInput = {
    space_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    iern?: Prisma.SortOrderInput | Prisma.SortOrder;
    space_number?: Prisma.SortOrderInput | Prisma.SortOrder;
    latitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    longitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    length?: Prisma.SortOrderInput | Prisma.SortOrder;
    width?: Prisma.SortOrderInput | Prisma.SortOrder;
    total_area?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.buildable_spacesCountOrderByAggregateInput;
    _avg?: Prisma.buildable_spacesAvgOrderByAggregateInput;
    _max?: Prisma.buildable_spacesMaxOrderByAggregateInput;
    _min?: Prisma.buildable_spacesMinOrderByAggregateInput;
    _sum?: Prisma.buildable_spacesSumOrderByAggregateInput;
};
export type buildable_spacesScalarWhereWithAggregatesInput = {
    AND?: Prisma.buildable_spacesScalarWhereWithAggregatesInput | Prisma.buildable_spacesScalarWhereWithAggregatesInput[];
    OR?: Prisma.buildable_spacesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.buildable_spacesScalarWhereWithAggregatesInput | Prisma.buildable_spacesScalarWhereWithAggregatesInput[];
    space_id?: Prisma.IntWithAggregatesFilter<"buildable_spaces"> | number;
    school_id?: Prisma.StringNullableWithAggregatesFilter<"buildable_spaces"> | string | null;
    iern?: Prisma.StringNullableWithAggregatesFilter<"buildable_spaces"> | string | null;
    space_number?: Prisma.IntNullableWithAggregatesFilter<"buildable_spaces"> | number | null;
    latitude?: Prisma.DecimalNullableWithAggregatesFilter<"buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.DecimalNullableWithAggregatesFilter<"buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.DecimalNullableWithAggregatesFilter<"buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.DecimalNullableWithAggregatesFilter<"buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total_area?: Prisma.DecimalNullableWithAggregatesFilter<"buildable_spaces"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"buildable_spaces"> | Date | string | null;
};
export type buildable_spacesCreateInput = {
    school_id?: string | null;
    iern?: string | null;
    space_number?: number | null;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total_area?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Date | string | null;
};
export type buildable_spacesUncheckedCreateInput = {
    space_id?: number;
    school_id?: string | null;
    iern?: string | null;
    space_number?: number | null;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total_area?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Date | string | null;
};
export type buildable_spacesUpdateInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    space_number?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total_area?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type buildable_spacesUncheckedUpdateInput = {
    space_id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    space_number?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total_area?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type buildable_spacesCreateManyInput = {
    space_id?: number;
    school_id?: string | null;
    iern?: string | null;
    space_number?: number | null;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total_area?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Date | string | null;
};
export type buildable_spacesUpdateManyMutationInput = {
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    space_number?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total_area?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type buildable_spacesUncheckedUpdateManyInput = {
    space_id?: Prisma.IntFieldUpdateOperationsInput | number;
    school_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    iern?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    space_number?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total_area?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type buildable_spacesCountOrderByAggregateInput = {
    space_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    space_number?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    length?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    total_area?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type buildable_spacesAvgOrderByAggregateInput = {
    space_id?: Prisma.SortOrder;
    space_number?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    length?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    total_area?: Prisma.SortOrder;
};
export type buildable_spacesMaxOrderByAggregateInput = {
    space_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    space_number?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    length?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    total_area?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type buildable_spacesMinOrderByAggregateInput = {
    space_id?: Prisma.SortOrder;
    school_id?: Prisma.SortOrder;
    iern?: Prisma.SortOrder;
    space_number?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    length?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    total_area?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type buildable_spacesSumOrderByAggregateInput = {
    space_id?: Prisma.SortOrder;
    space_number?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    length?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    total_area?: Prisma.SortOrder;
};
export type NullableDecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type buildable_spacesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    space_id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    space_number?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    length?: boolean;
    width?: boolean;
    total_area?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["buildable_spaces"]>;
export type buildable_spacesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    space_id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    space_number?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    length?: boolean;
    width?: boolean;
    total_area?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["buildable_spaces"]>;
export type buildable_spacesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    space_id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    space_number?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    length?: boolean;
    width?: boolean;
    total_area?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["buildable_spaces"]>;
export type buildable_spacesSelectScalar = {
    space_id?: boolean;
    school_id?: boolean;
    iern?: boolean;
    space_number?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    length?: boolean;
    width?: boolean;
    total_area?: boolean;
    created_at?: boolean;
};
export type buildable_spacesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"space_id" | "school_id" | "iern" | "space_number" | "latitude" | "longitude" | "length" | "width" | "total_area" | "created_at", ExtArgs["result"]["buildable_spaces"]>;
export type $buildable_spacesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "buildable_spaces";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        space_id: number;
        school_id: string | null;
        iern: string | null;
        space_number: number | null;
        latitude: runtime.Decimal | null;
        longitude: runtime.Decimal | null;
        length: runtime.Decimal | null;
        width: runtime.Decimal | null;
        total_area: runtime.Decimal | null;
        created_at: Date | null;
    }, ExtArgs["result"]["buildable_spaces"]>;
    composites: {};
};
export type buildable_spacesGetPayload<S extends boolean | null | undefined | buildable_spacesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$buildable_spacesPayload, S>;
export type buildable_spacesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<buildable_spacesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Buildable_spacesCountAggregateInputType | true;
};
export interface buildable_spacesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['buildable_spaces'];
        meta: {
            name: 'buildable_spaces';
        };
    };
    findUnique<T extends buildable_spacesFindUniqueArgs>(args: Prisma.SelectSubset<T, buildable_spacesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__buildable_spacesClient<runtime.Types.Result.GetResult<Prisma.$buildable_spacesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends buildable_spacesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, buildable_spacesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__buildable_spacesClient<runtime.Types.Result.GetResult<Prisma.$buildable_spacesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends buildable_spacesFindFirstArgs>(args?: Prisma.SelectSubset<T, buildable_spacesFindFirstArgs<ExtArgs>>): Prisma.Prisma__buildable_spacesClient<runtime.Types.Result.GetResult<Prisma.$buildable_spacesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends buildable_spacesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, buildable_spacesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__buildable_spacesClient<runtime.Types.Result.GetResult<Prisma.$buildable_spacesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends buildable_spacesFindManyArgs>(args?: Prisma.SelectSubset<T, buildable_spacesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$buildable_spacesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends buildable_spacesCreateArgs>(args: Prisma.SelectSubset<T, buildable_spacesCreateArgs<ExtArgs>>): Prisma.Prisma__buildable_spacesClient<runtime.Types.Result.GetResult<Prisma.$buildable_spacesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends buildable_spacesCreateManyArgs>(args?: Prisma.SelectSubset<T, buildable_spacesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends buildable_spacesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, buildable_spacesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$buildable_spacesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends buildable_spacesDeleteArgs>(args: Prisma.SelectSubset<T, buildable_spacesDeleteArgs<ExtArgs>>): Prisma.Prisma__buildable_spacesClient<runtime.Types.Result.GetResult<Prisma.$buildable_spacesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends buildable_spacesUpdateArgs>(args: Prisma.SelectSubset<T, buildable_spacesUpdateArgs<ExtArgs>>): Prisma.Prisma__buildable_spacesClient<runtime.Types.Result.GetResult<Prisma.$buildable_spacesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends buildable_spacesDeleteManyArgs>(args?: Prisma.SelectSubset<T, buildable_spacesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends buildable_spacesUpdateManyArgs>(args: Prisma.SelectSubset<T, buildable_spacesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends buildable_spacesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, buildable_spacesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$buildable_spacesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends buildable_spacesUpsertArgs>(args: Prisma.SelectSubset<T, buildable_spacesUpsertArgs<ExtArgs>>): Prisma.Prisma__buildable_spacesClient<runtime.Types.Result.GetResult<Prisma.$buildable_spacesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends buildable_spacesCountArgs>(args?: Prisma.Subset<T, buildable_spacesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Buildable_spacesCountAggregateOutputType> : number>;
    aggregate<T extends Buildable_spacesAggregateArgs>(args: Prisma.Subset<T, Buildable_spacesAggregateArgs>): Prisma.PrismaPromise<GetBuildable_spacesAggregateType<T>>;
    groupBy<T extends buildable_spacesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: buildable_spacesGroupByArgs['orderBy'];
    } : {
        orderBy?: buildable_spacesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, buildable_spacesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBuildable_spacesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: buildable_spacesFieldRefs;
}
export interface Prisma__buildable_spacesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface buildable_spacesFieldRefs {
    readonly space_id: Prisma.FieldRef<"buildable_spaces", 'Int'>;
    readonly school_id: Prisma.FieldRef<"buildable_spaces", 'String'>;
    readonly iern: Prisma.FieldRef<"buildable_spaces", 'String'>;
    readonly space_number: Prisma.FieldRef<"buildable_spaces", 'Int'>;
    readonly latitude: Prisma.FieldRef<"buildable_spaces", 'Decimal'>;
    readonly longitude: Prisma.FieldRef<"buildable_spaces", 'Decimal'>;
    readonly length: Prisma.FieldRef<"buildable_spaces", 'Decimal'>;
    readonly width: Prisma.FieldRef<"buildable_spaces", 'Decimal'>;
    readonly total_area: Prisma.FieldRef<"buildable_spaces", 'Decimal'>;
    readonly created_at: Prisma.FieldRef<"buildable_spaces", 'DateTime'>;
}
export type buildable_spacesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.buildable_spacesSelect<ExtArgs> | null;
    omit?: Prisma.buildable_spacesOmit<ExtArgs> | null;
    where: Prisma.buildable_spacesWhereUniqueInput;
};
export type buildable_spacesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.buildable_spacesSelect<ExtArgs> | null;
    omit?: Prisma.buildable_spacesOmit<ExtArgs> | null;
    where: Prisma.buildable_spacesWhereUniqueInput;
};
export type buildable_spacesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.buildable_spacesSelect<ExtArgs> | null;
    omit?: Prisma.buildable_spacesOmit<ExtArgs> | null;
    where?: Prisma.buildable_spacesWhereInput;
    orderBy?: Prisma.buildable_spacesOrderByWithRelationInput | Prisma.buildable_spacesOrderByWithRelationInput[];
    cursor?: Prisma.buildable_spacesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Buildable_spacesScalarFieldEnum | Prisma.Buildable_spacesScalarFieldEnum[];
};
export type buildable_spacesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.buildable_spacesSelect<ExtArgs> | null;
    omit?: Prisma.buildable_spacesOmit<ExtArgs> | null;
    where?: Prisma.buildable_spacesWhereInput;
    orderBy?: Prisma.buildable_spacesOrderByWithRelationInput | Prisma.buildable_spacesOrderByWithRelationInput[];
    cursor?: Prisma.buildable_spacesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Buildable_spacesScalarFieldEnum | Prisma.Buildable_spacesScalarFieldEnum[];
};
export type buildable_spacesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.buildable_spacesSelect<ExtArgs> | null;
    omit?: Prisma.buildable_spacesOmit<ExtArgs> | null;
    where?: Prisma.buildable_spacesWhereInput;
    orderBy?: Prisma.buildable_spacesOrderByWithRelationInput | Prisma.buildable_spacesOrderByWithRelationInput[];
    cursor?: Prisma.buildable_spacesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Buildable_spacesScalarFieldEnum | Prisma.Buildable_spacesScalarFieldEnum[];
};
export type buildable_spacesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.buildable_spacesSelect<ExtArgs> | null;
    omit?: Prisma.buildable_spacesOmit<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.buildable_spacesCreateInput, Prisma.buildable_spacesUncheckedCreateInput>;
};
export type buildable_spacesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.buildable_spacesCreateManyInput | Prisma.buildable_spacesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type buildable_spacesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.buildable_spacesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.buildable_spacesOmit<ExtArgs> | null;
    data: Prisma.buildable_spacesCreateManyInput | Prisma.buildable_spacesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type buildable_spacesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.buildable_spacesSelect<ExtArgs> | null;
    omit?: Prisma.buildable_spacesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.buildable_spacesUpdateInput, Prisma.buildable_spacesUncheckedUpdateInput>;
    where: Prisma.buildable_spacesWhereUniqueInput;
};
export type buildable_spacesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.buildable_spacesUpdateManyMutationInput, Prisma.buildable_spacesUncheckedUpdateManyInput>;
    where?: Prisma.buildable_spacesWhereInput;
    limit?: number;
};
export type buildable_spacesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.buildable_spacesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.buildable_spacesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.buildable_spacesUpdateManyMutationInput, Prisma.buildable_spacesUncheckedUpdateManyInput>;
    where?: Prisma.buildable_spacesWhereInput;
    limit?: number;
};
export type buildable_spacesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.buildable_spacesSelect<ExtArgs> | null;
    omit?: Prisma.buildable_spacesOmit<ExtArgs> | null;
    where: Prisma.buildable_spacesWhereUniqueInput;
    create: Prisma.XOR<Prisma.buildable_spacesCreateInput, Prisma.buildable_spacesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.buildable_spacesUpdateInput, Prisma.buildable_spacesUncheckedUpdateInput>;
};
export type buildable_spacesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.buildable_spacesSelect<ExtArgs> | null;
    omit?: Prisma.buildable_spacesOmit<ExtArgs> | null;
    where: Prisma.buildable_spacesWhereUniqueInput;
};
export type buildable_spacesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.buildable_spacesWhereInput;
    limit?: number;
};
export type buildable_spacesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.buildable_spacesSelect<ExtArgs> | null;
    omit?: Prisma.buildable_spacesOmit<ExtArgs> | null;
};
