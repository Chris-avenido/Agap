import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type notificationsModel = runtime.Types.Result.DefaultSelection<Prisma.$notificationsPayload>;
export type AggregateNotifications = {
    _count: NotificationsCountAggregateOutputType | null;
    _avg: NotificationsAvgAggregateOutputType | null;
    _sum: NotificationsSumAggregateOutputType | null;
    _min: NotificationsMinAggregateOutputType | null;
    _max: NotificationsMaxAggregateOutputType | null;
};
export type NotificationsAvgAggregateOutputType = {
    id: number | null;
};
export type NotificationsSumAggregateOutputType = {
    id: number | null;
};
export type NotificationsMinAggregateOutputType = {
    id: number | null;
    recipient_uid: string | null;
    sender_uid: string | null;
    sender_name: string | null;
    title: string | null;
    message: string | null;
    type: string | null;
    is_read: boolean | null;
    created_at: Date | null;
};
export type NotificationsMaxAggregateOutputType = {
    id: number | null;
    recipient_uid: string | null;
    sender_uid: string | null;
    sender_name: string | null;
    title: string | null;
    message: string | null;
    type: string | null;
    is_read: boolean | null;
    created_at: Date | null;
};
export type NotificationsCountAggregateOutputType = {
    id: number;
    recipient_uid: number;
    sender_uid: number;
    sender_name: number;
    title: number;
    message: number;
    type: number;
    is_read: number;
    created_at: number;
    _all: number;
};
export type NotificationsAvgAggregateInputType = {
    id?: true;
};
export type NotificationsSumAggregateInputType = {
    id?: true;
};
export type NotificationsMinAggregateInputType = {
    id?: true;
    recipient_uid?: true;
    sender_uid?: true;
    sender_name?: true;
    title?: true;
    message?: true;
    type?: true;
    is_read?: true;
    created_at?: true;
};
export type NotificationsMaxAggregateInputType = {
    id?: true;
    recipient_uid?: true;
    sender_uid?: true;
    sender_name?: true;
    title?: true;
    message?: true;
    type?: true;
    is_read?: true;
    created_at?: true;
};
export type NotificationsCountAggregateInputType = {
    id?: true;
    recipient_uid?: true;
    sender_uid?: true;
    sender_name?: true;
    title?: true;
    message?: true;
    type?: true;
    is_read?: true;
    created_at?: true;
    _all?: true;
};
export type NotificationsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.notificationsWhereInput;
    orderBy?: Prisma.notificationsOrderByWithRelationInput | Prisma.notificationsOrderByWithRelationInput[];
    cursor?: Prisma.notificationsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | NotificationsCountAggregateInputType;
    _avg?: NotificationsAvgAggregateInputType;
    _sum?: NotificationsSumAggregateInputType;
    _min?: NotificationsMinAggregateInputType;
    _max?: NotificationsMaxAggregateInputType;
};
export type GetNotificationsAggregateType<T extends NotificationsAggregateArgs> = {
    [P in keyof T & keyof AggregateNotifications]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateNotifications[P]> : Prisma.GetScalarType<T[P], AggregateNotifications[P]>;
};
export type notificationsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.notificationsWhereInput;
    orderBy?: Prisma.notificationsOrderByWithAggregationInput | Prisma.notificationsOrderByWithAggregationInput[];
    by: Prisma.NotificationsScalarFieldEnum[] | Prisma.NotificationsScalarFieldEnum;
    having?: Prisma.notificationsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NotificationsCountAggregateInputType | true;
    _avg?: NotificationsAvgAggregateInputType;
    _sum?: NotificationsSumAggregateInputType;
    _min?: NotificationsMinAggregateInputType;
    _max?: NotificationsMaxAggregateInputType;
};
export type NotificationsGroupByOutputType = {
    id: number;
    recipient_uid: string;
    sender_uid: string | null;
    sender_name: string | null;
    title: string;
    message: string;
    type: string | null;
    is_read: boolean | null;
    created_at: Date | null;
    _count: NotificationsCountAggregateOutputType | null;
    _avg: NotificationsAvgAggregateOutputType | null;
    _sum: NotificationsSumAggregateOutputType | null;
    _min: NotificationsMinAggregateOutputType | null;
    _max: NotificationsMaxAggregateOutputType | null;
};
export type GetNotificationsGroupByPayload<T extends notificationsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<NotificationsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof NotificationsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], NotificationsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], NotificationsGroupByOutputType[P]>;
}>>;
export type notificationsWhereInput = {
    AND?: Prisma.notificationsWhereInput | Prisma.notificationsWhereInput[];
    OR?: Prisma.notificationsWhereInput[];
    NOT?: Prisma.notificationsWhereInput | Prisma.notificationsWhereInput[];
    id?: Prisma.IntFilter<"notifications"> | number;
    recipient_uid?: Prisma.StringFilter<"notifications"> | string;
    sender_uid?: Prisma.StringNullableFilter<"notifications"> | string | null;
    sender_name?: Prisma.StringNullableFilter<"notifications"> | string | null;
    title?: Prisma.StringFilter<"notifications"> | string;
    message?: Prisma.StringFilter<"notifications"> | string;
    type?: Prisma.StringNullableFilter<"notifications"> | string | null;
    is_read?: Prisma.BoolNullableFilter<"notifications"> | boolean | null;
    created_at?: Prisma.DateTimeNullableFilter<"notifications"> | Date | string | null;
};
export type notificationsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    recipient_uid?: Prisma.SortOrder;
    sender_uid?: Prisma.SortOrderInput | Prisma.SortOrder;
    sender_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    type?: Prisma.SortOrderInput | Prisma.SortOrder;
    is_read?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type notificationsWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.notificationsWhereInput | Prisma.notificationsWhereInput[];
    OR?: Prisma.notificationsWhereInput[];
    NOT?: Prisma.notificationsWhereInput | Prisma.notificationsWhereInput[];
    recipient_uid?: Prisma.StringFilter<"notifications"> | string;
    sender_uid?: Prisma.StringNullableFilter<"notifications"> | string | null;
    sender_name?: Prisma.StringNullableFilter<"notifications"> | string | null;
    title?: Prisma.StringFilter<"notifications"> | string;
    message?: Prisma.StringFilter<"notifications"> | string;
    type?: Prisma.StringNullableFilter<"notifications"> | string | null;
    is_read?: Prisma.BoolNullableFilter<"notifications"> | boolean | null;
    created_at?: Prisma.DateTimeNullableFilter<"notifications"> | Date | string | null;
}, "id">;
export type notificationsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    recipient_uid?: Prisma.SortOrder;
    sender_uid?: Prisma.SortOrderInput | Prisma.SortOrder;
    sender_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    type?: Prisma.SortOrderInput | Prisma.SortOrder;
    is_read?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.notificationsCountOrderByAggregateInput;
    _avg?: Prisma.notificationsAvgOrderByAggregateInput;
    _max?: Prisma.notificationsMaxOrderByAggregateInput;
    _min?: Prisma.notificationsMinOrderByAggregateInput;
    _sum?: Prisma.notificationsSumOrderByAggregateInput;
};
export type notificationsScalarWhereWithAggregatesInput = {
    AND?: Prisma.notificationsScalarWhereWithAggregatesInput | Prisma.notificationsScalarWhereWithAggregatesInput[];
    OR?: Prisma.notificationsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.notificationsScalarWhereWithAggregatesInput | Prisma.notificationsScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"notifications"> | number;
    recipient_uid?: Prisma.StringWithAggregatesFilter<"notifications"> | string;
    sender_uid?: Prisma.StringNullableWithAggregatesFilter<"notifications"> | string | null;
    sender_name?: Prisma.StringNullableWithAggregatesFilter<"notifications"> | string | null;
    title?: Prisma.StringWithAggregatesFilter<"notifications"> | string;
    message?: Prisma.StringWithAggregatesFilter<"notifications"> | string;
    type?: Prisma.StringNullableWithAggregatesFilter<"notifications"> | string | null;
    is_read?: Prisma.BoolNullableWithAggregatesFilter<"notifications"> | boolean | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"notifications"> | Date | string | null;
};
export type notificationsCreateInput = {
    recipient_uid: string;
    sender_uid?: string | null;
    sender_name?: string | null;
    title: string;
    message: string;
    type?: string | null;
    is_read?: boolean | null;
    created_at?: Date | string | null;
};
export type notificationsUncheckedCreateInput = {
    id?: number;
    recipient_uid: string;
    sender_uid?: string | null;
    sender_name?: string | null;
    title: string;
    message: string;
    type?: string | null;
    is_read?: boolean | null;
    created_at?: Date | string | null;
};
export type notificationsUpdateInput = {
    recipient_uid?: Prisma.StringFieldUpdateOperationsInput | string;
    sender_uid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sender_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_read?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type notificationsUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    recipient_uid?: Prisma.StringFieldUpdateOperationsInput | string;
    sender_uid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sender_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_read?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type notificationsCreateManyInput = {
    id?: number;
    recipient_uid: string;
    sender_uid?: string | null;
    sender_name?: string | null;
    title: string;
    message: string;
    type?: string | null;
    is_read?: boolean | null;
    created_at?: Date | string | null;
};
export type notificationsUpdateManyMutationInput = {
    recipient_uid?: Prisma.StringFieldUpdateOperationsInput | string;
    sender_uid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sender_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_read?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type notificationsUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    recipient_uid?: Prisma.StringFieldUpdateOperationsInput | string;
    sender_uid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sender_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_read?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type notificationsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    recipient_uid?: Prisma.SortOrder;
    sender_uid?: Prisma.SortOrder;
    sender_name?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    is_read?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type notificationsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type notificationsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    recipient_uid?: Prisma.SortOrder;
    sender_uid?: Prisma.SortOrder;
    sender_name?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    is_read?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type notificationsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    recipient_uid?: Prisma.SortOrder;
    sender_uid?: Prisma.SortOrder;
    sender_name?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    is_read?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type notificationsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type notificationsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    recipient_uid?: boolean;
    sender_uid?: boolean;
    sender_name?: boolean;
    title?: boolean;
    message?: boolean;
    type?: boolean;
    is_read?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["notifications"]>;
export type notificationsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    recipient_uid?: boolean;
    sender_uid?: boolean;
    sender_name?: boolean;
    title?: boolean;
    message?: boolean;
    type?: boolean;
    is_read?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["notifications"]>;
export type notificationsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    recipient_uid?: boolean;
    sender_uid?: boolean;
    sender_name?: boolean;
    title?: boolean;
    message?: boolean;
    type?: boolean;
    is_read?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["notifications"]>;
export type notificationsSelectScalar = {
    id?: boolean;
    recipient_uid?: boolean;
    sender_uid?: boolean;
    sender_name?: boolean;
    title?: boolean;
    message?: boolean;
    type?: boolean;
    is_read?: boolean;
    created_at?: boolean;
};
export type notificationsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "recipient_uid" | "sender_uid" | "sender_name" | "title" | "message" | "type" | "is_read" | "created_at", ExtArgs["result"]["notifications"]>;
export type $notificationsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "notifications";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        recipient_uid: string;
        sender_uid: string | null;
        sender_name: string | null;
        title: string;
        message: string;
        type: string | null;
        is_read: boolean | null;
        created_at: Date | null;
    }, ExtArgs["result"]["notifications"]>;
    composites: {};
};
export type notificationsGetPayload<S extends boolean | null | undefined | notificationsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$notificationsPayload, S>;
export type notificationsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<notificationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: NotificationsCountAggregateInputType | true;
};
export interface notificationsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['notifications'];
        meta: {
            name: 'notifications';
        };
    };
    findUnique<T extends notificationsFindUniqueArgs>(args: Prisma.SelectSubset<T, notificationsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__notificationsClient<runtime.Types.Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends notificationsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, notificationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__notificationsClient<runtime.Types.Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends notificationsFindFirstArgs>(args?: Prisma.SelectSubset<T, notificationsFindFirstArgs<ExtArgs>>): Prisma.Prisma__notificationsClient<runtime.Types.Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends notificationsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, notificationsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__notificationsClient<runtime.Types.Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends notificationsFindManyArgs>(args?: Prisma.SelectSubset<T, notificationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends notificationsCreateArgs>(args: Prisma.SelectSubset<T, notificationsCreateArgs<ExtArgs>>): Prisma.Prisma__notificationsClient<runtime.Types.Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends notificationsCreateManyArgs>(args?: Prisma.SelectSubset<T, notificationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends notificationsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, notificationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends notificationsDeleteArgs>(args: Prisma.SelectSubset<T, notificationsDeleteArgs<ExtArgs>>): Prisma.Prisma__notificationsClient<runtime.Types.Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends notificationsUpdateArgs>(args: Prisma.SelectSubset<T, notificationsUpdateArgs<ExtArgs>>): Prisma.Prisma__notificationsClient<runtime.Types.Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends notificationsDeleteManyArgs>(args?: Prisma.SelectSubset<T, notificationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends notificationsUpdateManyArgs>(args: Prisma.SelectSubset<T, notificationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends notificationsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, notificationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends notificationsUpsertArgs>(args: Prisma.SelectSubset<T, notificationsUpsertArgs<ExtArgs>>): Prisma.Prisma__notificationsClient<runtime.Types.Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends notificationsCountArgs>(args?: Prisma.Subset<T, notificationsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], NotificationsCountAggregateOutputType> : number>;
    aggregate<T extends NotificationsAggregateArgs>(args: Prisma.Subset<T, NotificationsAggregateArgs>): Prisma.PrismaPromise<GetNotificationsAggregateType<T>>;
    groupBy<T extends notificationsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: notificationsGroupByArgs['orderBy'];
    } : {
        orderBy?: notificationsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, notificationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: notificationsFieldRefs;
}
export interface Prisma__notificationsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface notificationsFieldRefs {
    readonly id: Prisma.FieldRef<"notifications", 'Int'>;
    readonly recipient_uid: Prisma.FieldRef<"notifications", 'String'>;
    readonly sender_uid: Prisma.FieldRef<"notifications", 'String'>;
    readonly sender_name: Prisma.FieldRef<"notifications", 'String'>;
    readonly title: Prisma.FieldRef<"notifications", 'String'>;
    readonly message: Prisma.FieldRef<"notifications", 'String'>;
    readonly type: Prisma.FieldRef<"notifications", 'String'>;
    readonly is_read: Prisma.FieldRef<"notifications", 'Boolean'>;
    readonly created_at: Prisma.FieldRef<"notifications", 'DateTime'>;
}
export type notificationsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelect<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
    where: Prisma.notificationsWhereUniqueInput;
};
export type notificationsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelect<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
    where: Prisma.notificationsWhereUniqueInput;
};
export type notificationsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelect<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
    where?: Prisma.notificationsWhereInput;
    orderBy?: Prisma.notificationsOrderByWithRelationInput | Prisma.notificationsOrderByWithRelationInput[];
    cursor?: Prisma.notificationsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationsScalarFieldEnum | Prisma.NotificationsScalarFieldEnum[];
};
export type notificationsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelect<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
    where?: Prisma.notificationsWhereInput;
    orderBy?: Prisma.notificationsOrderByWithRelationInput | Prisma.notificationsOrderByWithRelationInput[];
    cursor?: Prisma.notificationsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationsScalarFieldEnum | Prisma.NotificationsScalarFieldEnum[];
};
export type notificationsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelect<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
    where?: Prisma.notificationsWhereInput;
    orderBy?: Prisma.notificationsOrderByWithRelationInput | Prisma.notificationsOrderByWithRelationInput[];
    cursor?: Prisma.notificationsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationsScalarFieldEnum | Prisma.NotificationsScalarFieldEnum[];
};
export type notificationsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelect<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.notificationsCreateInput, Prisma.notificationsUncheckedCreateInput>;
};
export type notificationsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.notificationsCreateManyInput | Prisma.notificationsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type notificationsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
    data: Prisma.notificationsCreateManyInput | Prisma.notificationsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type notificationsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelect<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.notificationsUpdateInput, Prisma.notificationsUncheckedUpdateInput>;
    where: Prisma.notificationsWhereUniqueInput;
};
export type notificationsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.notificationsUpdateManyMutationInput, Prisma.notificationsUncheckedUpdateManyInput>;
    where?: Prisma.notificationsWhereInput;
    limit?: number;
};
export type notificationsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.notificationsUpdateManyMutationInput, Prisma.notificationsUncheckedUpdateManyInput>;
    where?: Prisma.notificationsWhereInput;
    limit?: number;
};
export type notificationsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelect<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
    where: Prisma.notificationsWhereUniqueInput;
    create: Prisma.XOR<Prisma.notificationsCreateInput, Prisma.notificationsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.notificationsUpdateInput, Prisma.notificationsUncheckedUpdateInput>;
};
export type notificationsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelect<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
    where: Prisma.notificationsWhereUniqueInput;
};
export type notificationsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.notificationsWhereInput;
    limit?: number;
};
export type notificationsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.notificationsSelect<ExtArgs> | null;
    omit?: Prisma.notificationsOmit<ExtArgs> | null;
};
