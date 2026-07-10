import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type notable_achievementsModel = runtime.Types.Result.DefaultSelection<Prisma.$notable_achievementsPayload>;
export type AggregateNotable_achievements = {
    _count: Notable_achievementsCountAggregateOutputType | null;
    _avg: Notable_achievementsAvgAggregateOutputType | null;
    _sum: Notable_achievementsSumAggregateOutputType | null;
    _min: Notable_achievementsMinAggregateOutputType | null;
    _max: Notable_achievementsMaxAggregateOutputType | null;
};
export type Notable_achievementsAvgAggregateOutputType = {
    index_number: number | null;
    delete_flg: number | null;
};
export type Notable_achievementsSumAggregateOutputType = {
    index_number: number | null;
    delete_flg: number | null;
};
export type Notable_achievementsMinAggregateOutputType = {
    index_number: number | null;
    achievement: string | null;
    delete_flg: number | null;
    create_date: Date | null;
    edit_date: Date | null;
};
export type Notable_achievementsMaxAggregateOutputType = {
    index_number: number | null;
    achievement: string | null;
    delete_flg: number | null;
    create_date: Date | null;
    edit_date: Date | null;
};
export type Notable_achievementsCountAggregateOutputType = {
    index_number: number;
    achievement: number;
    delete_flg: number;
    create_date: number;
    edit_date: number;
    _all: number;
};
export type Notable_achievementsAvgAggregateInputType = {
    index_number?: true;
    delete_flg?: true;
};
export type Notable_achievementsSumAggregateInputType = {
    index_number?: true;
    delete_flg?: true;
};
export type Notable_achievementsMinAggregateInputType = {
    index_number?: true;
    achievement?: true;
    delete_flg?: true;
    create_date?: true;
    edit_date?: true;
};
export type Notable_achievementsMaxAggregateInputType = {
    index_number?: true;
    achievement?: true;
    delete_flg?: true;
    create_date?: true;
    edit_date?: true;
};
export type Notable_achievementsCountAggregateInputType = {
    index_number?: true;
    achievement?: true;
    delete_flg?: true;
    create_date?: true;
    edit_date?: true;
    _all?: true;
};
export type Notable_achievementsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.notable_achievementsWhereInput;
    orderBy?: Prisma.notable_achievementsOrderByWithRelationInput | Prisma.notable_achievementsOrderByWithRelationInput[];
    cursor?: Prisma.notable_achievementsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Notable_achievementsCountAggregateInputType;
    _avg?: Notable_achievementsAvgAggregateInputType;
    _sum?: Notable_achievementsSumAggregateInputType;
    _min?: Notable_achievementsMinAggregateInputType;
    _max?: Notable_achievementsMaxAggregateInputType;
};
export type GetNotable_achievementsAggregateType<T extends Notable_achievementsAggregateArgs> = {
    [P in keyof T & keyof AggregateNotable_achievements]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateNotable_achievements[P]> : Prisma.GetScalarType<T[P], AggregateNotable_achievements[P]>;
};
export type notable_achievementsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.notable_achievementsWhereInput;
    orderBy?: Prisma.notable_achievementsOrderByWithAggregationInput | Prisma.notable_achievementsOrderByWithAggregationInput[];
    by: Prisma.Notable_achievementsScalarFieldEnum[] | Prisma.Notable_achievementsScalarFieldEnum;
    having?: Prisma.notable_achievementsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Notable_achievementsCountAggregateInputType | true;
    _avg?: Notable_achievementsAvgAggregateInputType;
    _sum?: Notable_achievementsSumAggregateInputType;
    _min?: Notable_achievementsMinAggregateInputType;
    _max?: Notable_achievementsMaxAggregateInputType;
};
export type Notable_achievementsGroupByOutputType = {
    index_number: number;
    achievement: string;
    delete_flg: number | null;
    create_date: Date | null;
    edit_date: Date | null;
    _count: Notable_achievementsCountAggregateOutputType | null;
    _avg: Notable_achievementsAvgAggregateOutputType | null;
    _sum: Notable_achievementsSumAggregateOutputType | null;
    _min: Notable_achievementsMinAggregateOutputType | null;
    _max: Notable_achievementsMaxAggregateOutputType | null;
};
export type GetNotable_achievementsGroupByPayload<T extends notable_achievementsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Notable_achievementsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Notable_achievementsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Notable_achievementsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Notable_achievementsGroupByOutputType[P]>;
}>>;
export type notable_achievementsWhereInput = {
    AND?: Prisma.notable_achievementsWhereInput | Prisma.notable_achievementsWhereInput[];
    OR?: Prisma.notable_achievementsWhereInput[];
    NOT?: Prisma.notable_achievementsWhereInput | Prisma.notable_achievementsWhereInput[];
    index_number?: Prisma.IntFilter<"notable_achievements"> | number;
    achievement?: Prisma.StringFilter<"notable_achievements"> | string;
    delete_flg?: Prisma.IntNullableFilter<"notable_achievements"> | number | null;
    create_date?: Prisma.DateTimeNullableFilter<"notable_achievements"> | Date | string | null;
    edit_date?: Prisma.DateTimeNullableFilter<"notable_achievements"> | Date | string | null;
};
export type notable_achievementsOrderByWithRelationInput = {
    index_number?: Prisma.SortOrder;
    achievement?: Prisma.SortOrder;
    delete_flg?: Prisma.SortOrderInput | Prisma.SortOrder;
    create_date?: Prisma.SortOrderInput | Prisma.SortOrder;
    edit_date?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type notable_achievementsWhereUniqueInput = Prisma.AtLeast<{
    index_number?: number;
    AND?: Prisma.notable_achievementsWhereInput | Prisma.notable_achievementsWhereInput[];
    OR?: Prisma.notable_achievementsWhereInput[];
    NOT?: Prisma.notable_achievementsWhereInput | Prisma.notable_achievementsWhereInput[];
    achievement?: Prisma.StringFilter<"notable_achievements"> | string;
    delete_flg?: Prisma.IntNullableFilter<"notable_achievements"> | number | null;
    create_date?: Prisma.DateTimeNullableFilter<"notable_achievements"> | Date | string | null;
    edit_date?: Prisma.DateTimeNullableFilter<"notable_achievements"> | Date | string | null;
}, "index_number">;
export type notable_achievementsOrderByWithAggregationInput = {
    index_number?: Prisma.SortOrder;
    achievement?: Prisma.SortOrder;
    delete_flg?: Prisma.SortOrderInput | Prisma.SortOrder;
    create_date?: Prisma.SortOrderInput | Prisma.SortOrder;
    edit_date?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.notable_achievementsCountOrderByAggregateInput;
    _avg?: Prisma.notable_achievementsAvgOrderByAggregateInput;
    _max?: Prisma.notable_achievementsMaxOrderByAggregateInput;
    _min?: Prisma.notable_achievementsMinOrderByAggregateInput;
    _sum?: Prisma.notable_achievementsSumOrderByAggregateInput;
};
export type notable_achievementsScalarWhereWithAggregatesInput = {
    AND?: Prisma.notable_achievementsScalarWhereWithAggregatesInput | Prisma.notable_achievementsScalarWhereWithAggregatesInput[];
    OR?: Prisma.notable_achievementsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.notable_achievementsScalarWhereWithAggregatesInput | Prisma.notable_achievementsScalarWhereWithAggregatesInput[];
    index_number?: Prisma.IntWithAggregatesFilter<"notable_achievements"> | number;
    achievement?: Prisma.StringWithAggregatesFilter<"notable_achievements"> | string;
    delete_flg?: Prisma.IntNullableWithAggregatesFilter<"notable_achievements"> | number | null;
    create_date?: Prisma.DateTimeNullableWithAggregatesFilter<"notable_achievements"> | Date | string | null;
    edit_date?: Prisma.DateTimeNullableWithAggregatesFilter<"notable_achievements"> | Date | string | null;
};
export type notable_achievementsCreateInput = {
    index_number: number;
    achievement: string;
    delete_flg?: number | null;
    create_date?: Date | string | null;
    edit_date?: Date | string | null;
};
export type notable_achievementsUncheckedCreateInput = {
    index_number: number;
    achievement: string;
    delete_flg?: number | null;
    create_date?: Date | string | null;
    edit_date?: Date | string | null;
};
export type notable_achievementsUpdateInput = {
    index_number?: Prisma.IntFieldUpdateOperationsInput | number;
    achievement?: Prisma.StringFieldUpdateOperationsInput | string;
    delete_flg?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    create_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    edit_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type notable_achievementsUncheckedUpdateInput = {
    index_number?: Prisma.IntFieldUpdateOperationsInput | number;
    achievement?: Prisma.StringFieldUpdateOperationsInput | string;
    delete_flg?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    create_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    edit_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type notable_achievementsCreateManyInput = {
    index_number: number;
    achievement: string;
    delete_flg?: number | null;
    create_date?: Date | string | null;
    edit_date?: Date | string | null;
};
export type notable_achievementsUpdateManyMutationInput = {
    index_number?: Prisma.IntFieldUpdateOperationsInput | number;
    achievement?: Prisma.StringFieldUpdateOperationsInput | string;
    delete_flg?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    create_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    edit_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type notable_achievementsUncheckedUpdateManyInput = {
    index_number?: Prisma.IntFieldUpdateOperationsInput | number;
    achievement?: Prisma.StringFieldUpdateOperationsInput | string;
    delete_flg?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    create_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    edit_date?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type notable_achievementsCountOrderByAggregateInput = {
    index_number?: Prisma.SortOrder;
    achievement?: Prisma.SortOrder;
    delete_flg?: Prisma.SortOrder;
    create_date?: Prisma.SortOrder;
    edit_date?: Prisma.SortOrder;
};
export type notable_achievementsAvgOrderByAggregateInput = {
    index_number?: Prisma.SortOrder;
    delete_flg?: Prisma.SortOrder;
};
export type notable_achievementsMaxOrderByAggregateInput = {
    index_number?: Prisma.SortOrder;
    achievement?: Prisma.SortOrder;
    delete_flg?: Prisma.SortOrder;
    create_date?: Prisma.SortOrder;
    edit_date?: Prisma.SortOrder;
};
export type notable_achievementsMinOrderByAggregateInput = {
    index_number?: Prisma.SortOrder;
    achievement?: Prisma.SortOrder;
    delete_flg?: Prisma.SortOrder;
    create_date?: Prisma.SortOrder;
    edit_date?: Prisma.SortOrder;
};
export type notable_achievementsSumOrderByAggregateInput = {
    index_number?: Prisma.SortOrder;
    delete_flg?: Prisma.SortOrder;
};
export type notable_achievementsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    index_number?: boolean;
    achievement?: boolean;
    delete_flg?: boolean;
    create_date?: boolean;
    edit_date?: boolean;
}, ExtArgs["result"]["notable_achievements"]>;
export type notable_achievementsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    index_number?: boolean;
    achievement?: boolean;
    delete_flg?: boolean;
    create_date?: boolean;
    edit_date?: boolean;
}, ExtArgs["result"]["notable_achievements"]>;
export type notable_achievementsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    index_number?: boolean;
    achievement?: boolean;
    delete_flg?: boolean;
    create_date?: boolean;
    edit_date?: boolean;
}, ExtArgs["result"]["notable_achievements"]>;
export type notable_achievementsSelectScalar = {
    index_number?: boolean;
    achievement?: boolean;
    delete_flg?: boolean;
    create_date?: boolean;
    edit_date?: boolean;
};
export type notable_achievementsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"index_number" | "achievement" | "delete_flg" | "create_date" | "edit_date", ExtArgs["result"]["notable_achievements"]>;
export type $notable_achievementsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "notable_achievements";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        index_number: number;
        achievement: string;
        delete_flg: number | null;
        create_date: Date | null;
        edit_date: Date | null;
    }, ExtArgs["result"]["notable_achievements"]>;
    composites: {};
};
export type notable_achievementsGetPayload<S extends boolean | null | undefined | notable_achievementsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$notable_achievementsPayload, S>;
export type notable_achievementsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<notable_achievementsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Notable_achievementsCountAggregateInputType | true;
};
export interface notable_achievementsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['notable_achievements'];
        meta: {
            name: 'notable_achievements';
        };
    };
    findUnique<T extends notable_achievementsFindUniqueArgs>(args: Prisma.SelectSubset<T, notable_achievementsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__notable_achievementsClient<runtime.Types.Result.GetResult<Prisma.$notable_achievementsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends notable_achievementsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, notable_achievementsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__notable_achievementsClient<runtime.Types.Result.GetResult<Prisma.$notable_achievementsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends notable_achievementsFindFirstArgs>(args?: Prisma.SelectSubset<T, notable_achievementsFindFirstArgs<ExtArgs>>): Prisma.Prisma__notable_achievementsClient<runtime.Types.Result.GetResult<Prisma.$notable_achievementsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends notable_achievementsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, notable_achievementsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__notable_achievementsClient<runtime.Types.Result.GetResult<Prisma.$notable_achievementsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends notable_achievementsFindManyArgs>(args?: Prisma.SelectSubset<T, notable_achievementsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$notable_achievementsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends notable_achievementsCreateArgs>(args: Prisma.SelectSubset<T, notable_achievementsCreateArgs<ExtArgs>>): Prisma.Prisma__notable_achievementsClient<runtime.Types.Result.GetResult<Prisma.$notable_achievementsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends notable_achievementsCreateManyArgs>(args?: Prisma.SelectSubset<T, notable_achievementsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends notable_achievementsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, notable_achievementsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$notable_achievementsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends notable_achievementsDeleteArgs>(args: Prisma.SelectSubset<T, notable_achievementsDeleteArgs<ExtArgs>>): Prisma.Prisma__notable_achievementsClient<runtime.Types.Result.GetResult<Prisma.$notable_achievementsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends notable_achievementsUpdateArgs>(args: Prisma.SelectSubset<T, notable_achievementsUpdateArgs<ExtArgs>>): Prisma.Prisma__notable_achievementsClient<runtime.Types.Result.GetResult<Prisma.$notable_achievementsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends notable_achievementsDeleteManyArgs>(args?: Prisma.SelectSubset<T, notable_achievementsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends notable_achievementsUpdateManyArgs>(args: Prisma.SelectSubset<T, notable_achievementsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends notable_achievementsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, notable_achievementsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$notable_achievementsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends notable_achievementsUpsertArgs>(args: Prisma.SelectSubset<T, notable_achievementsUpsertArgs<ExtArgs>>): Prisma.Prisma__notable_achievementsClient<runtime.Types.Result.GetResult<Prisma.$notable_achievementsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends notable_achievementsCountArgs>(args?: Prisma.Subset<T, notable_achievementsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Notable_achievementsCountAggregateOutputType> : number>;
    aggregate<T extends Notable_achievementsAggregateArgs>(args: Prisma.Subset<T, Notable_achievementsAggregateArgs>): Prisma.PrismaPromise<GetNotable_achievementsAggregateType<T>>;
    groupBy<T extends notable_achievementsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: notable_achievementsGroupByArgs['orderBy'];
    } : {
        orderBy?: notable_achievementsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, notable_achievementsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotable_achievementsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: notable_achievementsFieldRefs;
}
export interface Prisma__notable_achievementsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface notable_achievementsFieldRefs {
    readonly index_number: Prisma.FieldRef<"notable_achievements", 'Int'>;
    readonly achievement: Prisma.FieldRef<"notable_achievements", 'String'>;
    readonly delete_flg: Prisma.FieldRef<"notable_achievements", 'Int'>;
    readonly create_date: Prisma.FieldRef<"notable_achievements", 'DateTime'>;
    readonly edit_date: Prisma.FieldRef<"notable_achievements", 'DateTime'>;
}
export type notable_achievementsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notable_achievementsSelect<ExtArgs> | null;
    omit?: Prisma.notable_achievementsOmit<ExtArgs> | null;
    where: Prisma.notable_achievementsWhereUniqueInput;
};
export type notable_achievementsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notable_achievementsSelect<ExtArgs> | null;
    omit?: Prisma.notable_achievementsOmit<ExtArgs> | null;
    where: Prisma.notable_achievementsWhereUniqueInput;
};
export type notable_achievementsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notable_achievementsSelect<ExtArgs> | null;
    omit?: Prisma.notable_achievementsOmit<ExtArgs> | null;
    where?: Prisma.notable_achievementsWhereInput;
    orderBy?: Prisma.notable_achievementsOrderByWithRelationInput | Prisma.notable_achievementsOrderByWithRelationInput[];
    cursor?: Prisma.notable_achievementsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Notable_achievementsScalarFieldEnum | Prisma.Notable_achievementsScalarFieldEnum[];
};
export type notable_achievementsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notable_achievementsSelect<ExtArgs> | null;
    omit?: Prisma.notable_achievementsOmit<ExtArgs> | null;
    where?: Prisma.notable_achievementsWhereInput;
    orderBy?: Prisma.notable_achievementsOrderByWithRelationInput | Prisma.notable_achievementsOrderByWithRelationInput[];
    cursor?: Prisma.notable_achievementsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Notable_achievementsScalarFieldEnum | Prisma.Notable_achievementsScalarFieldEnum[];
};
export type notable_achievementsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notable_achievementsSelect<ExtArgs> | null;
    omit?: Prisma.notable_achievementsOmit<ExtArgs> | null;
    where?: Prisma.notable_achievementsWhereInput;
    orderBy?: Prisma.notable_achievementsOrderByWithRelationInput | Prisma.notable_achievementsOrderByWithRelationInput[];
    cursor?: Prisma.notable_achievementsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Notable_achievementsScalarFieldEnum | Prisma.Notable_achievementsScalarFieldEnum[];
};
export type notable_achievementsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notable_achievementsSelect<ExtArgs> | null;
    omit?: Prisma.notable_achievementsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.notable_achievementsCreateInput, Prisma.notable_achievementsUncheckedCreateInput>;
};
export type notable_achievementsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.notable_achievementsCreateManyInput | Prisma.notable_achievementsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type notable_achievementsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notable_achievementsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.notable_achievementsOmit<ExtArgs> | null;
    data: Prisma.notable_achievementsCreateManyInput | Prisma.notable_achievementsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type notable_achievementsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notable_achievementsSelect<ExtArgs> | null;
    omit?: Prisma.notable_achievementsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.notable_achievementsUpdateInput, Prisma.notable_achievementsUncheckedUpdateInput>;
    where: Prisma.notable_achievementsWhereUniqueInput;
};
export type notable_achievementsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.notable_achievementsUpdateManyMutationInput, Prisma.notable_achievementsUncheckedUpdateManyInput>;
    where?: Prisma.notable_achievementsWhereInput;
    limit?: number;
};
export type notable_achievementsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notable_achievementsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.notable_achievementsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.notable_achievementsUpdateManyMutationInput, Prisma.notable_achievementsUncheckedUpdateManyInput>;
    where?: Prisma.notable_achievementsWhereInput;
    limit?: number;
};
export type notable_achievementsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notable_achievementsSelect<ExtArgs> | null;
    omit?: Prisma.notable_achievementsOmit<ExtArgs> | null;
    where: Prisma.notable_achievementsWhereUniqueInput;
    create: Prisma.XOR<Prisma.notable_achievementsCreateInput, Prisma.notable_achievementsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.notable_achievementsUpdateInput, Prisma.notable_achievementsUncheckedUpdateInput>;
};
export type notable_achievementsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notable_achievementsSelect<ExtArgs> | null;
    omit?: Prisma.notable_achievementsOmit<ExtArgs> | null;
    where: Prisma.notable_achievementsWhereUniqueInput;
};
export type notable_achievementsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.notable_achievementsWhereInput;
    limit?: number;
};
export type notable_achievementsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notable_achievementsSelect<ExtArgs> | null;
    omit?: Prisma.notable_achievementsOmit<ExtArgs> | null;
};
