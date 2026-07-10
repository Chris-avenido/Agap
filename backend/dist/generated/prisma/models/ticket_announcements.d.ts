import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ticket_announcementsModel = runtime.Types.Result.DefaultSelection<Prisma.$ticket_announcementsPayload>;
export type AggregateTicket_announcements = {
    _count: Ticket_announcementsCountAggregateOutputType | null;
    _avg: Ticket_announcementsAvgAggregateOutputType | null;
    _sum: Ticket_announcementsSumAggregateOutputType | null;
    _min: Ticket_announcementsMinAggregateOutputType | null;
    _max: Ticket_announcementsMaxAggregateOutputType | null;
};
export type Ticket_announcementsAvgAggregateOutputType = {
    id: number | null;
};
export type Ticket_announcementsSumAggregateOutputType = {
    id: number | null;
};
export type Ticket_announcementsMinAggregateOutputType = {
    id: number | null;
    content: string | null;
    is_deleted: boolean | null;
    created_at: Date | null;
    updated_at: Date | null;
    type: string | null;
};
export type Ticket_announcementsMaxAggregateOutputType = {
    id: number | null;
    content: string | null;
    is_deleted: boolean | null;
    created_at: Date | null;
    updated_at: Date | null;
    type: string | null;
};
export type Ticket_announcementsCountAggregateOutputType = {
    id: number;
    content: number;
    is_deleted: number;
    created_at: number;
    updated_at: number;
    type: number;
    _all: number;
};
export type Ticket_announcementsAvgAggregateInputType = {
    id?: true;
};
export type Ticket_announcementsSumAggregateInputType = {
    id?: true;
};
export type Ticket_announcementsMinAggregateInputType = {
    id?: true;
    content?: true;
    is_deleted?: true;
    created_at?: true;
    updated_at?: true;
    type?: true;
};
export type Ticket_announcementsMaxAggregateInputType = {
    id?: true;
    content?: true;
    is_deleted?: true;
    created_at?: true;
    updated_at?: true;
    type?: true;
};
export type Ticket_announcementsCountAggregateInputType = {
    id?: true;
    content?: true;
    is_deleted?: true;
    created_at?: true;
    updated_at?: true;
    type?: true;
    _all?: true;
};
export type Ticket_announcementsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ticket_announcementsWhereInput;
    orderBy?: Prisma.ticket_announcementsOrderByWithRelationInput | Prisma.ticket_announcementsOrderByWithRelationInput[];
    cursor?: Prisma.ticket_announcementsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Ticket_announcementsCountAggregateInputType;
    _avg?: Ticket_announcementsAvgAggregateInputType;
    _sum?: Ticket_announcementsSumAggregateInputType;
    _min?: Ticket_announcementsMinAggregateInputType;
    _max?: Ticket_announcementsMaxAggregateInputType;
};
export type GetTicket_announcementsAggregateType<T extends Ticket_announcementsAggregateArgs> = {
    [P in keyof T & keyof AggregateTicket_announcements]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTicket_announcements[P]> : Prisma.GetScalarType<T[P], AggregateTicket_announcements[P]>;
};
export type ticket_announcementsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ticket_announcementsWhereInput;
    orderBy?: Prisma.ticket_announcementsOrderByWithAggregationInput | Prisma.ticket_announcementsOrderByWithAggregationInput[];
    by: Prisma.Ticket_announcementsScalarFieldEnum[] | Prisma.Ticket_announcementsScalarFieldEnum;
    having?: Prisma.ticket_announcementsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Ticket_announcementsCountAggregateInputType | true;
    _avg?: Ticket_announcementsAvgAggregateInputType;
    _sum?: Ticket_announcementsSumAggregateInputType;
    _min?: Ticket_announcementsMinAggregateInputType;
    _max?: Ticket_announcementsMaxAggregateInputType;
};
export type Ticket_announcementsGroupByOutputType = {
    id: number;
    content: string;
    is_deleted: boolean | null;
    created_at: Date | null;
    updated_at: Date | null;
    type: string | null;
    _count: Ticket_announcementsCountAggregateOutputType | null;
    _avg: Ticket_announcementsAvgAggregateOutputType | null;
    _sum: Ticket_announcementsSumAggregateOutputType | null;
    _min: Ticket_announcementsMinAggregateOutputType | null;
    _max: Ticket_announcementsMaxAggregateOutputType | null;
};
export type GetTicket_announcementsGroupByPayload<T extends ticket_announcementsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Ticket_announcementsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Ticket_announcementsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Ticket_announcementsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Ticket_announcementsGroupByOutputType[P]>;
}>>;
export type ticket_announcementsWhereInput = {
    AND?: Prisma.ticket_announcementsWhereInput | Prisma.ticket_announcementsWhereInput[];
    OR?: Prisma.ticket_announcementsWhereInput[];
    NOT?: Prisma.ticket_announcementsWhereInput | Prisma.ticket_announcementsWhereInput[];
    id?: Prisma.IntFilter<"ticket_announcements"> | number;
    content?: Prisma.StringFilter<"ticket_announcements"> | string;
    is_deleted?: Prisma.BoolNullableFilter<"ticket_announcements"> | boolean | null;
    created_at?: Prisma.DateTimeNullableFilter<"ticket_announcements"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"ticket_announcements"> | Date | string | null;
    type?: Prisma.StringNullableFilter<"ticket_announcements"> | string | null;
};
export type ticket_announcementsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    is_deleted?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    type?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type ticket_announcementsWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.ticket_announcementsWhereInput | Prisma.ticket_announcementsWhereInput[];
    OR?: Prisma.ticket_announcementsWhereInput[];
    NOT?: Prisma.ticket_announcementsWhereInput | Prisma.ticket_announcementsWhereInput[];
    content?: Prisma.StringFilter<"ticket_announcements"> | string;
    is_deleted?: Prisma.BoolNullableFilter<"ticket_announcements"> | boolean | null;
    created_at?: Prisma.DateTimeNullableFilter<"ticket_announcements"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"ticket_announcements"> | Date | string | null;
    type?: Prisma.StringNullableFilter<"ticket_announcements"> | string | null;
}, "id">;
export type ticket_announcementsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    is_deleted?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    type?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ticket_announcementsCountOrderByAggregateInput;
    _avg?: Prisma.ticket_announcementsAvgOrderByAggregateInput;
    _max?: Prisma.ticket_announcementsMaxOrderByAggregateInput;
    _min?: Prisma.ticket_announcementsMinOrderByAggregateInput;
    _sum?: Prisma.ticket_announcementsSumOrderByAggregateInput;
};
export type ticket_announcementsScalarWhereWithAggregatesInput = {
    AND?: Prisma.ticket_announcementsScalarWhereWithAggregatesInput | Prisma.ticket_announcementsScalarWhereWithAggregatesInput[];
    OR?: Prisma.ticket_announcementsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ticket_announcementsScalarWhereWithAggregatesInput | Prisma.ticket_announcementsScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"ticket_announcements"> | number;
    content?: Prisma.StringWithAggregatesFilter<"ticket_announcements"> | string;
    is_deleted?: Prisma.BoolNullableWithAggregatesFilter<"ticket_announcements"> | boolean | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"ticket_announcements"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"ticket_announcements"> | Date | string | null;
    type?: Prisma.StringNullableWithAggregatesFilter<"ticket_announcements"> | string | null;
};
export type ticket_announcementsCreateInput = {
    content: string;
    is_deleted?: boolean | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    type?: string | null;
};
export type ticket_announcementsUncheckedCreateInput = {
    id?: number;
    content: string;
    is_deleted?: boolean | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    type?: string | null;
};
export type ticket_announcementsUpdateInput = {
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    is_deleted?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ticket_announcementsUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    is_deleted?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ticket_announcementsCreateManyInput = {
    id?: number;
    content: string;
    is_deleted?: boolean | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    type?: string | null;
};
export type ticket_announcementsUpdateManyMutationInput = {
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    is_deleted?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ticket_announcementsUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    is_deleted?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ticket_announcementsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    is_deleted?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
};
export type ticket_announcementsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type ticket_announcementsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    is_deleted?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
};
export type ticket_announcementsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    is_deleted?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
};
export type ticket_announcementsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type ticket_announcementsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    content?: boolean;
    is_deleted?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    type?: boolean;
}, ExtArgs["result"]["ticket_announcements"]>;
export type ticket_announcementsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    content?: boolean;
    is_deleted?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    type?: boolean;
}, ExtArgs["result"]["ticket_announcements"]>;
export type ticket_announcementsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    content?: boolean;
    is_deleted?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    type?: boolean;
}, ExtArgs["result"]["ticket_announcements"]>;
export type ticket_announcementsSelectScalar = {
    id?: boolean;
    content?: boolean;
    is_deleted?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    type?: boolean;
};
export type ticket_announcementsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "content" | "is_deleted" | "created_at" | "updated_at" | "type", ExtArgs["result"]["ticket_announcements"]>;
export type $ticket_announcementsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ticket_announcements";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        content: string;
        is_deleted: boolean | null;
        created_at: Date | null;
        updated_at: Date | null;
        type: string | null;
    }, ExtArgs["result"]["ticket_announcements"]>;
    composites: {};
};
export type ticket_announcementsGetPayload<S extends boolean | null | undefined | ticket_announcementsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ticket_announcementsPayload, S>;
export type ticket_announcementsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ticket_announcementsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Ticket_announcementsCountAggregateInputType | true;
};
export interface ticket_announcementsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ticket_announcements'];
        meta: {
            name: 'ticket_announcements';
        };
    };
    findUnique<T extends ticket_announcementsFindUniqueArgs>(args: Prisma.SelectSubset<T, ticket_announcementsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ticket_announcementsClient<runtime.Types.Result.GetResult<Prisma.$ticket_announcementsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ticket_announcementsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ticket_announcementsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ticket_announcementsClient<runtime.Types.Result.GetResult<Prisma.$ticket_announcementsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ticket_announcementsFindFirstArgs>(args?: Prisma.SelectSubset<T, ticket_announcementsFindFirstArgs<ExtArgs>>): Prisma.Prisma__ticket_announcementsClient<runtime.Types.Result.GetResult<Prisma.$ticket_announcementsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ticket_announcementsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ticket_announcementsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ticket_announcementsClient<runtime.Types.Result.GetResult<Prisma.$ticket_announcementsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ticket_announcementsFindManyArgs>(args?: Prisma.SelectSubset<T, ticket_announcementsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ticket_announcementsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ticket_announcementsCreateArgs>(args: Prisma.SelectSubset<T, ticket_announcementsCreateArgs<ExtArgs>>): Prisma.Prisma__ticket_announcementsClient<runtime.Types.Result.GetResult<Prisma.$ticket_announcementsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ticket_announcementsCreateManyArgs>(args?: Prisma.SelectSubset<T, ticket_announcementsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ticket_announcementsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ticket_announcementsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ticket_announcementsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ticket_announcementsDeleteArgs>(args: Prisma.SelectSubset<T, ticket_announcementsDeleteArgs<ExtArgs>>): Prisma.Prisma__ticket_announcementsClient<runtime.Types.Result.GetResult<Prisma.$ticket_announcementsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ticket_announcementsUpdateArgs>(args: Prisma.SelectSubset<T, ticket_announcementsUpdateArgs<ExtArgs>>): Prisma.Prisma__ticket_announcementsClient<runtime.Types.Result.GetResult<Prisma.$ticket_announcementsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ticket_announcementsDeleteManyArgs>(args?: Prisma.SelectSubset<T, ticket_announcementsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ticket_announcementsUpdateManyArgs>(args: Prisma.SelectSubset<T, ticket_announcementsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ticket_announcementsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ticket_announcementsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ticket_announcementsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ticket_announcementsUpsertArgs>(args: Prisma.SelectSubset<T, ticket_announcementsUpsertArgs<ExtArgs>>): Prisma.Prisma__ticket_announcementsClient<runtime.Types.Result.GetResult<Prisma.$ticket_announcementsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ticket_announcementsCountArgs>(args?: Prisma.Subset<T, ticket_announcementsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Ticket_announcementsCountAggregateOutputType> : number>;
    aggregate<T extends Ticket_announcementsAggregateArgs>(args: Prisma.Subset<T, Ticket_announcementsAggregateArgs>): Prisma.PrismaPromise<GetTicket_announcementsAggregateType<T>>;
    groupBy<T extends ticket_announcementsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ticket_announcementsGroupByArgs['orderBy'];
    } : {
        orderBy?: ticket_announcementsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ticket_announcementsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTicket_announcementsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ticket_announcementsFieldRefs;
}
export interface Prisma__ticket_announcementsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ticket_announcementsFieldRefs {
    readonly id: Prisma.FieldRef<"ticket_announcements", 'Int'>;
    readonly content: Prisma.FieldRef<"ticket_announcements", 'String'>;
    readonly is_deleted: Prisma.FieldRef<"ticket_announcements", 'Boolean'>;
    readonly created_at: Prisma.FieldRef<"ticket_announcements", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"ticket_announcements", 'DateTime'>;
    readonly type: Prisma.FieldRef<"ticket_announcements", 'String'>;
}
export type ticket_announcementsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ticket_announcementsSelect<ExtArgs> | null;
    omit?: Prisma.ticket_announcementsOmit<ExtArgs> | null;
    where: Prisma.ticket_announcementsWhereUniqueInput;
};
export type ticket_announcementsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ticket_announcementsSelect<ExtArgs> | null;
    omit?: Prisma.ticket_announcementsOmit<ExtArgs> | null;
    where: Prisma.ticket_announcementsWhereUniqueInput;
};
export type ticket_announcementsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ticket_announcementsSelect<ExtArgs> | null;
    omit?: Prisma.ticket_announcementsOmit<ExtArgs> | null;
    where?: Prisma.ticket_announcementsWhereInput;
    orderBy?: Prisma.ticket_announcementsOrderByWithRelationInput | Prisma.ticket_announcementsOrderByWithRelationInput[];
    cursor?: Prisma.ticket_announcementsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Ticket_announcementsScalarFieldEnum | Prisma.Ticket_announcementsScalarFieldEnum[];
};
export type ticket_announcementsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ticket_announcementsSelect<ExtArgs> | null;
    omit?: Prisma.ticket_announcementsOmit<ExtArgs> | null;
    where?: Prisma.ticket_announcementsWhereInput;
    orderBy?: Prisma.ticket_announcementsOrderByWithRelationInput | Prisma.ticket_announcementsOrderByWithRelationInput[];
    cursor?: Prisma.ticket_announcementsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Ticket_announcementsScalarFieldEnum | Prisma.Ticket_announcementsScalarFieldEnum[];
};
export type ticket_announcementsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ticket_announcementsSelect<ExtArgs> | null;
    omit?: Prisma.ticket_announcementsOmit<ExtArgs> | null;
    where?: Prisma.ticket_announcementsWhereInput;
    orderBy?: Prisma.ticket_announcementsOrderByWithRelationInput | Prisma.ticket_announcementsOrderByWithRelationInput[];
    cursor?: Prisma.ticket_announcementsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Ticket_announcementsScalarFieldEnum | Prisma.Ticket_announcementsScalarFieldEnum[];
};
export type ticket_announcementsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ticket_announcementsSelect<ExtArgs> | null;
    omit?: Prisma.ticket_announcementsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ticket_announcementsCreateInput, Prisma.ticket_announcementsUncheckedCreateInput>;
};
export type ticket_announcementsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ticket_announcementsCreateManyInput | Prisma.ticket_announcementsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ticket_announcementsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ticket_announcementsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ticket_announcementsOmit<ExtArgs> | null;
    data: Prisma.ticket_announcementsCreateManyInput | Prisma.ticket_announcementsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ticket_announcementsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ticket_announcementsSelect<ExtArgs> | null;
    omit?: Prisma.ticket_announcementsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ticket_announcementsUpdateInput, Prisma.ticket_announcementsUncheckedUpdateInput>;
    where: Prisma.ticket_announcementsWhereUniqueInput;
};
export type ticket_announcementsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ticket_announcementsUpdateManyMutationInput, Prisma.ticket_announcementsUncheckedUpdateManyInput>;
    where?: Prisma.ticket_announcementsWhereInput;
    limit?: number;
};
export type ticket_announcementsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ticket_announcementsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ticket_announcementsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ticket_announcementsUpdateManyMutationInput, Prisma.ticket_announcementsUncheckedUpdateManyInput>;
    where?: Prisma.ticket_announcementsWhereInput;
    limit?: number;
};
export type ticket_announcementsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ticket_announcementsSelect<ExtArgs> | null;
    omit?: Prisma.ticket_announcementsOmit<ExtArgs> | null;
    where: Prisma.ticket_announcementsWhereUniqueInput;
    create: Prisma.XOR<Prisma.ticket_announcementsCreateInput, Prisma.ticket_announcementsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ticket_announcementsUpdateInput, Prisma.ticket_announcementsUncheckedUpdateInput>;
};
export type ticket_announcementsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ticket_announcementsSelect<ExtArgs> | null;
    omit?: Prisma.ticket_announcementsOmit<ExtArgs> | null;
    where: Prisma.ticket_announcementsWhereUniqueInput;
};
export type ticket_announcementsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ticket_announcementsWhereInput;
    limit?: number;
};
export type ticket_announcementsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ticket_announcementsSelect<ExtArgs> | null;
    omit?: Prisma.ticket_announcementsOmit<ExtArgs> | null;
};
