import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type user_web_push_subscriptionsModel = runtime.Types.Result.DefaultSelection<Prisma.$user_web_push_subscriptionsPayload>;
export type AggregateUser_web_push_subscriptions = {
    _count: User_web_push_subscriptionsCountAggregateOutputType | null;
    _avg: User_web_push_subscriptionsAvgAggregateOutputType | null;
    _sum: User_web_push_subscriptionsSumAggregateOutputType | null;
    _min: User_web_push_subscriptionsMinAggregateOutputType | null;
    _max: User_web_push_subscriptionsMaxAggregateOutputType | null;
};
export type User_web_push_subscriptionsAvgAggregateOutputType = {
    id: number | null;
};
export type User_web_push_subscriptionsSumAggregateOutputType = {
    id: number | null;
};
export type User_web_push_subscriptionsMinAggregateOutputType = {
    id: number | null;
    uid: string | null;
    device_info: string | null;
    created_at: Date | null;
};
export type User_web_push_subscriptionsMaxAggregateOutputType = {
    id: number | null;
    uid: string | null;
    device_info: string | null;
    created_at: Date | null;
};
export type User_web_push_subscriptionsCountAggregateOutputType = {
    id: number;
    uid: number;
    subscription_json: number;
    device_info: number;
    created_at: number;
    _all: number;
};
export type User_web_push_subscriptionsAvgAggregateInputType = {
    id?: true;
};
export type User_web_push_subscriptionsSumAggregateInputType = {
    id?: true;
};
export type User_web_push_subscriptionsMinAggregateInputType = {
    id?: true;
    uid?: true;
    device_info?: true;
    created_at?: true;
};
export type User_web_push_subscriptionsMaxAggregateInputType = {
    id?: true;
    uid?: true;
    device_info?: true;
    created_at?: true;
};
export type User_web_push_subscriptionsCountAggregateInputType = {
    id?: true;
    uid?: true;
    subscription_json?: true;
    device_info?: true;
    created_at?: true;
    _all?: true;
};
export type User_web_push_subscriptionsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.user_web_push_subscriptionsWhereInput;
    orderBy?: Prisma.user_web_push_subscriptionsOrderByWithRelationInput | Prisma.user_web_push_subscriptionsOrderByWithRelationInput[];
    cursor?: Prisma.user_web_push_subscriptionsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | User_web_push_subscriptionsCountAggregateInputType;
    _avg?: User_web_push_subscriptionsAvgAggregateInputType;
    _sum?: User_web_push_subscriptionsSumAggregateInputType;
    _min?: User_web_push_subscriptionsMinAggregateInputType;
    _max?: User_web_push_subscriptionsMaxAggregateInputType;
};
export type GetUser_web_push_subscriptionsAggregateType<T extends User_web_push_subscriptionsAggregateArgs> = {
    [P in keyof T & keyof AggregateUser_web_push_subscriptions]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser_web_push_subscriptions[P]> : Prisma.GetScalarType<T[P], AggregateUser_web_push_subscriptions[P]>;
};
export type user_web_push_subscriptionsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.user_web_push_subscriptionsWhereInput;
    orderBy?: Prisma.user_web_push_subscriptionsOrderByWithAggregationInput | Prisma.user_web_push_subscriptionsOrderByWithAggregationInput[];
    by: Prisma.User_web_push_subscriptionsScalarFieldEnum[] | Prisma.User_web_push_subscriptionsScalarFieldEnum;
    having?: Prisma.user_web_push_subscriptionsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: User_web_push_subscriptionsCountAggregateInputType | true;
    _avg?: User_web_push_subscriptionsAvgAggregateInputType;
    _sum?: User_web_push_subscriptionsSumAggregateInputType;
    _min?: User_web_push_subscriptionsMinAggregateInputType;
    _max?: User_web_push_subscriptionsMaxAggregateInputType;
};
export type User_web_push_subscriptionsGroupByOutputType = {
    id: number;
    uid: string;
    subscription_json: runtime.JsonValue;
    device_info: string | null;
    created_at: Date | null;
    _count: User_web_push_subscriptionsCountAggregateOutputType | null;
    _avg: User_web_push_subscriptionsAvgAggregateOutputType | null;
    _sum: User_web_push_subscriptionsSumAggregateOutputType | null;
    _min: User_web_push_subscriptionsMinAggregateOutputType | null;
    _max: User_web_push_subscriptionsMaxAggregateOutputType | null;
};
export type GetUser_web_push_subscriptionsGroupByPayload<T extends user_web_push_subscriptionsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<User_web_push_subscriptionsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof User_web_push_subscriptionsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], User_web_push_subscriptionsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], User_web_push_subscriptionsGroupByOutputType[P]>;
}>>;
export type user_web_push_subscriptionsWhereInput = {
    AND?: Prisma.user_web_push_subscriptionsWhereInput | Prisma.user_web_push_subscriptionsWhereInput[];
    OR?: Prisma.user_web_push_subscriptionsWhereInput[];
    NOT?: Prisma.user_web_push_subscriptionsWhereInput | Prisma.user_web_push_subscriptionsWhereInput[];
    id?: Prisma.IntFilter<"user_web_push_subscriptions"> | number;
    uid?: Prisma.StringFilter<"user_web_push_subscriptions"> | string;
    subscription_json?: Prisma.JsonFilter<"user_web_push_subscriptions">;
    device_info?: Prisma.StringNullableFilter<"user_web_push_subscriptions"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"user_web_push_subscriptions"> | Date | string | null;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type user_web_push_subscriptionsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    uid?: Prisma.SortOrder;
    subscription_json?: Prisma.SortOrder;
    device_info?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type user_web_push_subscriptionsWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    uid_subscription_json?: Prisma.user_web_push_subscriptionsUidSubscription_jsonCompoundUniqueInput;
    AND?: Prisma.user_web_push_subscriptionsWhereInput | Prisma.user_web_push_subscriptionsWhereInput[];
    OR?: Prisma.user_web_push_subscriptionsWhereInput[];
    NOT?: Prisma.user_web_push_subscriptionsWhereInput | Prisma.user_web_push_subscriptionsWhereInput[];
    uid?: Prisma.StringFilter<"user_web_push_subscriptions"> | string;
    subscription_json?: Prisma.JsonFilter<"user_web_push_subscriptions">;
    device_info?: Prisma.StringNullableFilter<"user_web_push_subscriptions"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"user_web_push_subscriptions"> | Date | string | null;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id" | "uid_subscription_json">;
export type user_web_push_subscriptionsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    uid?: Prisma.SortOrder;
    subscription_json?: Prisma.SortOrder;
    device_info?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.user_web_push_subscriptionsCountOrderByAggregateInput;
    _avg?: Prisma.user_web_push_subscriptionsAvgOrderByAggregateInput;
    _max?: Prisma.user_web_push_subscriptionsMaxOrderByAggregateInput;
    _min?: Prisma.user_web_push_subscriptionsMinOrderByAggregateInput;
    _sum?: Prisma.user_web_push_subscriptionsSumOrderByAggregateInput;
};
export type user_web_push_subscriptionsScalarWhereWithAggregatesInput = {
    AND?: Prisma.user_web_push_subscriptionsScalarWhereWithAggregatesInput | Prisma.user_web_push_subscriptionsScalarWhereWithAggregatesInput[];
    OR?: Prisma.user_web_push_subscriptionsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.user_web_push_subscriptionsScalarWhereWithAggregatesInput | Prisma.user_web_push_subscriptionsScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"user_web_push_subscriptions"> | number;
    uid?: Prisma.StringWithAggregatesFilter<"user_web_push_subscriptions"> | string;
    subscription_json?: Prisma.JsonWithAggregatesFilter<"user_web_push_subscriptions">;
    device_info?: Prisma.StringNullableWithAggregatesFilter<"user_web_push_subscriptions"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"user_web_push_subscriptions"> | Date | string | null;
};
export type user_web_push_subscriptionsCreateInput = {
    subscription_json: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    device_info?: string | null;
    created_at?: Date | string | null;
    users: Prisma.usersCreateNestedOneWithoutUser_web_push_subscriptionsInput;
};
export type user_web_push_subscriptionsUncheckedCreateInput = {
    id?: number;
    uid: string;
    subscription_json: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    device_info?: string | null;
    created_at?: Date | string | null;
};
export type user_web_push_subscriptionsUpdateInput = {
    subscription_json?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    device_info?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    users?: Prisma.usersUpdateOneRequiredWithoutUser_web_push_subscriptionsNestedInput;
};
export type user_web_push_subscriptionsUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    uid?: Prisma.StringFieldUpdateOperationsInput | string;
    subscription_json?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    device_info?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type user_web_push_subscriptionsCreateManyInput = {
    id?: number;
    uid: string;
    subscription_json: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    device_info?: string | null;
    created_at?: Date | string | null;
};
export type user_web_push_subscriptionsUpdateManyMutationInput = {
    subscription_json?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    device_info?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type user_web_push_subscriptionsUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    uid?: Prisma.StringFieldUpdateOperationsInput | string;
    subscription_json?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    device_info?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type user_web_push_subscriptionsUidSubscription_jsonCompoundUniqueInput = {
    uid: string;
    subscription_json: runtime.InputJsonValue;
};
export type user_web_push_subscriptionsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    uid?: Prisma.SortOrder;
    subscription_json?: Prisma.SortOrder;
    device_info?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type user_web_push_subscriptionsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type user_web_push_subscriptionsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    uid?: Prisma.SortOrder;
    device_info?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type user_web_push_subscriptionsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    uid?: Prisma.SortOrder;
    device_info?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type user_web_push_subscriptionsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type User_web_push_subscriptionsListRelationFilter = {
    every?: Prisma.user_web_push_subscriptionsWhereInput;
    some?: Prisma.user_web_push_subscriptionsWhereInput;
    none?: Prisma.user_web_push_subscriptionsWhereInput;
};
export type user_web_push_subscriptionsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type user_web_push_subscriptionsCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.user_web_push_subscriptionsCreateWithoutUsersInput, Prisma.user_web_push_subscriptionsUncheckedCreateWithoutUsersInput> | Prisma.user_web_push_subscriptionsCreateWithoutUsersInput[] | Prisma.user_web_push_subscriptionsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.user_web_push_subscriptionsCreateOrConnectWithoutUsersInput | Prisma.user_web_push_subscriptionsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.user_web_push_subscriptionsCreateManyUsersInputEnvelope;
    connect?: Prisma.user_web_push_subscriptionsWhereUniqueInput | Prisma.user_web_push_subscriptionsWhereUniqueInput[];
};
export type user_web_push_subscriptionsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.user_web_push_subscriptionsCreateWithoutUsersInput, Prisma.user_web_push_subscriptionsUncheckedCreateWithoutUsersInput> | Prisma.user_web_push_subscriptionsCreateWithoutUsersInput[] | Prisma.user_web_push_subscriptionsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.user_web_push_subscriptionsCreateOrConnectWithoutUsersInput | Prisma.user_web_push_subscriptionsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.user_web_push_subscriptionsCreateManyUsersInputEnvelope;
    connect?: Prisma.user_web_push_subscriptionsWhereUniqueInput | Prisma.user_web_push_subscriptionsWhereUniqueInput[];
};
export type user_web_push_subscriptionsUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.user_web_push_subscriptionsCreateWithoutUsersInput, Prisma.user_web_push_subscriptionsUncheckedCreateWithoutUsersInput> | Prisma.user_web_push_subscriptionsCreateWithoutUsersInput[] | Prisma.user_web_push_subscriptionsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.user_web_push_subscriptionsCreateOrConnectWithoutUsersInput | Prisma.user_web_push_subscriptionsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.user_web_push_subscriptionsUpsertWithWhereUniqueWithoutUsersInput | Prisma.user_web_push_subscriptionsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.user_web_push_subscriptionsCreateManyUsersInputEnvelope;
    set?: Prisma.user_web_push_subscriptionsWhereUniqueInput | Prisma.user_web_push_subscriptionsWhereUniqueInput[];
    disconnect?: Prisma.user_web_push_subscriptionsWhereUniqueInput | Prisma.user_web_push_subscriptionsWhereUniqueInput[];
    delete?: Prisma.user_web_push_subscriptionsWhereUniqueInput | Prisma.user_web_push_subscriptionsWhereUniqueInput[];
    connect?: Prisma.user_web_push_subscriptionsWhereUniqueInput | Prisma.user_web_push_subscriptionsWhereUniqueInput[];
    update?: Prisma.user_web_push_subscriptionsUpdateWithWhereUniqueWithoutUsersInput | Prisma.user_web_push_subscriptionsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.user_web_push_subscriptionsUpdateManyWithWhereWithoutUsersInput | Prisma.user_web_push_subscriptionsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.user_web_push_subscriptionsScalarWhereInput | Prisma.user_web_push_subscriptionsScalarWhereInput[];
};
export type user_web_push_subscriptionsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.user_web_push_subscriptionsCreateWithoutUsersInput, Prisma.user_web_push_subscriptionsUncheckedCreateWithoutUsersInput> | Prisma.user_web_push_subscriptionsCreateWithoutUsersInput[] | Prisma.user_web_push_subscriptionsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.user_web_push_subscriptionsCreateOrConnectWithoutUsersInput | Prisma.user_web_push_subscriptionsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.user_web_push_subscriptionsUpsertWithWhereUniqueWithoutUsersInput | Prisma.user_web_push_subscriptionsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.user_web_push_subscriptionsCreateManyUsersInputEnvelope;
    set?: Prisma.user_web_push_subscriptionsWhereUniqueInput | Prisma.user_web_push_subscriptionsWhereUniqueInput[];
    disconnect?: Prisma.user_web_push_subscriptionsWhereUniqueInput | Prisma.user_web_push_subscriptionsWhereUniqueInput[];
    delete?: Prisma.user_web_push_subscriptionsWhereUniqueInput | Prisma.user_web_push_subscriptionsWhereUniqueInput[];
    connect?: Prisma.user_web_push_subscriptionsWhereUniqueInput | Prisma.user_web_push_subscriptionsWhereUniqueInput[];
    update?: Prisma.user_web_push_subscriptionsUpdateWithWhereUniqueWithoutUsersInput | Prisma.user_web_push_subscriptionsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.user_web_push_subscriptionsUpdateManyWithWhereWithoutUsersInput | Prisma.user_web_push_subscriptionsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.user_web_push_subscriptionsScalarWhereInput | Prisma.user_web_push_subscriptionsScalarWhereInput[];
};
export type user_web_push_subscriptionsCreateWithoutUsersInput = {
    subscription_json: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    device_info?: string | null;
    created_at?: Date | string | null;
};
export type user_web_push_subscriptionsUncheckedCreateWithoutUsersInput = {
    id?: number;
    subscription_json: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    device_info?: string | null;
    created_at?: Date | string | null;
};
export type user_web_push_subscriptionsCreateOrConnectWithoutUsersInput = {
    where: Prisma.user_web_push_subscriptionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.user_web_push_subscriptionsCreateWithoutUsersInput, Prisma.user_web_push_subscriptionsUncheckedCreateWithoutUsersInput>;
};
export type user_web_push_subscriptionsCreateManyUsersInputEnvelope = {
    data: Prisma.user_web_push_subscriptionsCreateManyUsersInput | Prisma.user_web_push_subscriptionsCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type user_web_push_subscriptionsUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.user_web_push_subscriptionsWhereUniqueInput;
    update: Prisma.XOR<Prisma.user_web_push_subscriptionsUpdateWithoutUsersInput, Prisma.user_web_push_subscriptionsUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.user_web_push_subscriptionsCreateWithoutUsersInput, Prisma.user_web_push_subscriptionsUncheckedCreateWithoutUsersInput>;
};
export type user_web_push_subscriptionsUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.user_web_push_subscriptionsWhereUniqueInput;
    data: Prisma.XOR<Prisma.user_web_push_subscriptionsUpdateWithoutUsersInput, Prisma.user_web_push_subscriptionsUncheckedUpdateWithoutUsersInput>;
};
export type user_web_push_subscriptionsUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.user_web_push_subscriptionsScalarWhereInput;
    data: Prisma.XOR<Prisma.user_web_push_subscriptionsUpdateManyMutationInput, Prisma.user_web_push_subscriptionsUncheckedUpdateManyWithoutUsersInput>;
};
export type user_web_push_subscriptionsScalarWhereInput = {
    AND?: Prisma.user_web_push_subscriptionsScalarWhereInput | Prisma.user_web_push_subscriptionsScalarWhereInput[];
    OR?: Prisma.user_web_push_subscriptionsScalarWhereInput[];
    NOT?: Prisma.user_web_push_subscriptionsScalarWhereInput | Prisma.user_web_push_subscriptionsScalarWhereInput[];
    id?: Prisma.IntFilter<"user_web_push_subscriptions"> | number;
    uid?: Prisma.StringFilter<"user_web_push_subscriptions"> | string;
    subscription_json?: Prisma.JsonFilter<"user_web_push_subscriptions">;
    device_info?: Prisma.StringNullableFilter<"user_web_push_subscriptions"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"user_web_push_subscriptions"> | Date | string | null;
};
export type user_web_push_subscriptionsCreateManyUsersInput = {
    id?: number;
    subscription_json: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    device_info?: string | null;
    created_at?: Date | string | null;
};
export type user_web_push_subscriptionsUpdateWithoutUsersInput = {
    subscription_json?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    device_info?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type user_web_push_subscriptionsUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    subscription_json?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    device_info?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type user_web_push_subscriptionsUncheckedUpdateManyWithoutUsersInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    subscription_json?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    device_info?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type user_web_push_subscriptionsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    uid?: boolean;
    subscription_json?: boolean;
    device_info?: boolean;
    created_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user_web_push_subscriptions"]>;
export type user_web_push_subscriptionsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    uid?: boolean;
    subscription_json?: boolean;
    device_info?: boolean;
    created_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user_web_push_subscriptions"]>;
export type user_web_push_subscriptionsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    uid?: boolean;
    subscription_json?: boolean;
    device_info?: boolean;
    created_at?: boolean;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user_web_push_subscriptions"]>;
export type user_web_push_subscriptionsSelectScalar = {
    id?: boolean;
    uid?: boolean;
    subscription_json?: boolean;
    device_info?: boolean;
    created_at?: boolean;
};
export type user_web_push_subscriptionsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "uid" | "subscription_json" | "device_info" | "created_at", ExtArgs["result"]["user_web_push_subscriptions"]>;
export type user_web_push_subscriptionsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type user_web_push_subscriptionsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type user_web_push_subscriptionsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $user_web_push_subscriptionsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "user_web_push_subscriptions";
    objects: {
        users: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        uid: string;
        subscription_json: runtime.JsonValue;
        device_info: string | null;
        created_at: Date | null;
    }, ExtArgs["result"]["user_web_push_subscriptions"]>;
    composites: {};
};
export type user_web_push_subscriptionsGetPayload<S extends boolean | null | undefined | user_web_push_subscriptionsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$user_web_push_subscriptionsPayload, S>;
export type user_web_push_subscriptionsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<user_web_push_subscriptionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: User_web_push_subscriptionsCountAggregateInputType | true;
};
export interface user_web_push_subscriptionsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['user_web_push_subscriptions'];
        meta: {
            name: 'user_web_push_subscriptions';
        };
    };
    findUnique<T extends user_web_push_subscriptionsFindUniqueArgs>(args: Prisma.SelectSubset<T, user_web_push_subscriptionsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__user_web_push_subscriptionsClient<runtime.Types.Result.GetResult<Prisma.$user_web_push_subscriptionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends user_web_push_subscriptionsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, user_web_push_subscriptionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__user_web_push_subscriptionsClient<runtime.Types.Result.GetResult<Prisma.$user_web_push_subscriptionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends user_web_push_subscriptionsFindFirstArgs>(args?: Prisma.SelectSubset<T, user_web_push_subscriptionsFindFirstArgs<ExtArgs>>): Prisma.Prisma__user_web_push_subscriptionsClient<runtime.Types.Result.GetResult<Prisma.$user_web_push_subscriptionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends user_web_push_subscriptionsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, user_web_push_subscriptionsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__user_web_push_subscriptionsClient<runtime.Types.Result.GetResult<Prisma.$user_web_push_subscriptionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends user_web_push_subscriptionsFindManyArgs>(args?: Prisma.SelectSubset<T, user_web_push_subscriptionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$user_web_push_subscriptionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends user_web_push_subscriptionsCreateArgs>(args: Prisma.SelectSubset<T, user_web_push_subscriptionsCreateArgs<ExtArgs>>): Prisma.Prisma__user_web_push_subscriptionsClient<runtime.Types.Result.GetResult<Prisma.$user_web_push_subscriptionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends user_web_push_subscriptionsCreateManyArgs>(args?: Prisma.SelectSubset<T, user_web_push_subscriptionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends user_web_push_subscriptionsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, user_web_push_subscriptionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$user_web_push_subscriptionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends user_web_push_subscriptionsDeleteArgs>(args: Prisma.SelectSubset<T, user_web_push_subscriptionsDeleteArgs<ExtArgs>>): Prisma.Prisma__user_web_push_subscriptionsClient<runtime.Types.Result.GetResult<Prisma.$user_web_push_subscriptionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends user_web_push_subscriptionsUpdateArgs>(args: Prisma.SelectSubset<T, user_web_push_subscriptionsUpdateArgs<ExtArgs>>): Prisma.Prisma__user_web_push_subscriptionsClient<runtime.Types.Result.GetResult<Prisma.$user_web_push_subscriptionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends user_web_push_subscriptionsDeleteManyArgs>(args?: Prisma.SelectSubset<T, user_web_push_subscriptionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends user_web_push_subscriptionsUpdateManyArgs>(args: Prisma.SelectSubset<T, user_web_push_subscriptionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends user_web_push_subscriptionsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, user_web_push_subscriptionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$user_web_push_subscriptionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends user_web_push_subscriptionsUpsertArgs>(args: Prisma.SelectSubset<T, user_web_push_subscriptionsUpsertArgs<ExtArgs>>): Prisma.Prisma__user_web_push_subscriptionsClient<runtime.Types.Result.GetResult<Prisma.$user_web_push_subscriptionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends user_web_push_subscriptionsCountArgs>(args?: Prisma.Subset<T, user_web_push_subscriptionsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], User_web_push_subscriptionsCountAggregateOutputType> : number>;
    aggregate<T extends User_web_push_subscriptionsAggregateArgs>(args: Prisma.Subset<T, User_web_push_subscriptionsAggregateArgs>): Prisma.PrismaPromise<GetUser_web_push_subscriptionsAggregateType<T>>;
    groupBy<T extends user_web_push_subscriptionsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: user_web_push_subscriptionsGroupByArgs['orderBy'];
    } : {
        orderBy?: user_web_push_subscriptionsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, user_web_push_subscriptionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_web_push_subscriptionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: user_web_push_subscriptionsFieldRefs;
}
export interface Prisma__user_web_push_subscriptionsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface user_web_push_subscriptionsFieldRefs {
    readonly id: Prisma.FieldRef<"user_web_push_subscriptions", 'Int'>;
    readonly uid: Prisma.FieldRef<"user_web_push_subscriptions", 'String'>;
    readonly subscription_json: Prisma.FieldRef<"user_web_push_subscriptions", 'Json'>;
    readonly device_info: Prisma.FieldRef<"user_web_push_subscriptions", 'String'>;
    readonly created_at: Prisma.FieldRef<"user_web_push_subscriptions", 'DateTime'>;
}
export type user_web_push_subscriptionsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_web_push_subscriptionsSelect<ExtArgs> | null;
    omit?: Prisma.user_web_push_subscriptionsOmit<ExtArgs> | null;
    include?: Prisma.user_web_push_subscriptionsInclude<ExtArgs> | null;
    where: Prisma.user_web_push_subscriptionsWhereUniqueInput;
};
export type user_web_push_subscriptionsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_web_push_subscriptionsSelect<ExtArgs> | null;
    omit?: Prisma.user_web_push_subscriptionsOmit<ExtArgs> | null;
    include?: Prisma.user_web_push_subscriptionsInclude<ExtArgs> | null;
    where: Prisma.user_web_push_subscriptionsWhereUniqueInput;
};
export type user_web_push_subscriptionsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_web_push_subscriptionsSelect<ExtArgs> | null;
    omit?: Prisma.user_web_push_subscriptionsOmit<ExtArgs> | null;
    include?: Prisma.user_web_push_subscriptionsInclude<ExtArgs> | null;
    where?: Prisma.user_web_push_subscriptionsWhereInput;
    orderBy?: Prisma.user_web_push_subscriptionsOrderByWithRelationInput | Prisma.user_web_push_subscriptionsOrderByWithRelationInput[];
    cursor?: Prisma.user_web_push_subscriptionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.User_web_push_subscriptionsScalarFieldEnum | Prisma.User_web_push_subscriptionsScalarFieldEnum[];
};
export type user_web_push_subscriptionsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_web_push_subscriptionsSelect<ExtArgs> | null;
    omit?: Prisma.user_web_push_subscriptionsOmit<ExtArgs> | null;
    include?: Prisma.user_web_push_subscriptionsInclude<ExtArgs> | null;
    where?: Prisma.user_web_push_subscriptionsWhereInput;
    orderBy?: Prisma.user_web_push_subscriptionsOrderByWithRelationInput | Prisma.user_web_push_subscriptionsOrderByWithRelationInput[];
    cursor?: Prisma.user_web_push_subscriptionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.User_web_push_subscriptionsScalarFieldEnum | Prisma.User_web_push_subscriptionsScalarFieldEnum[];
};
export type user_web_push_subscriptionsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_web_push_subscriptionsSelect<ExtArgs> | null;
    omit?: Prisma.user_web_push_subscriptionsOmit<ExtArgs> | null;
    include?: Prisma.user_web_push_subscriptionsInclude<ExtArgs> | null;
    where?: Prisma.user_web_push_subscriptionsWhereInput;
    orderBy?: Prisma.user_web_push_subscriptionsOrderByWithRelationInput | Prisma.user_web_push_subscriptionsOrderByWithRelationInput[];
    cursor?: Prisma.user_web_push_subscriptionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.User_web_push_subscriptionsScalarFieldEnum | Prisma.User_web_push_subscriptionsScalarFieldEnum[];
};
export type user_web_push_subscriptionsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_web_push_subscriptionsSelect<ExtArgs> | null;
    omit?: Prisma.user_web_push_subscriptionsOmit<ExtArgs> | null;
    include?: Prisma.user_web_push_subscriptionsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.user_web_push_subscriptionsCreateInput, Prisma.user_web_push_subscriptionsUncheckedCreateInput>;
};
export type user_web_push_subscriptionsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.user_web_push_subscriptionsCreateManyInput | Prisma.user_web_push_subscriptionsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type user_web_push_subscriptionsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_web_push_subscriptionsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.user_web_push_subscriptionsOmit<ExtArgs> | null;
    data: Prisma.user_web_push_subscriptionsCreateManyInput | Prisma.user_web_push_subscriptionsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.user_web_push_subscriptionsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type user_web_push_subscriptionsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_web_push_subscriptionsSelect<ExtArgs> | null;
    omit?: Prisma.user_web_push_subscriptionsOmit<ExtArgs> | null;
    include?: Prisma.user_web_push_subscriptionsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.user_web_push_subscriptionsUpdateInput, Prisma.user_web_push_subscriptionsUncheckedUpdateInput>;
    where: Prisma.user_web_push_subscriptionsWhereUniqueInput;
};
export type user_web_push_subscriptionsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.user_web_push_subscriptionsUpdateManyMutationInput, Prisma.user_web_push_subscriptionsUncheckedUpdateManyInput>;
    where?: Prisma.user_web_push_subscriptionsWhereInput;
    limit?: number;
};
export type user_web_push_subscriptionsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_web_push_subscriptionsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.user_web_push_subscriptionsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.user_web_push_subscriptionsUpdateManyMutationInput, Prisma.user_web_push_subscriptionsUncheckedUpdateManyInput>;
    where?: Prisma.user_web_push_subscriptionsWhereInput;
    limit?: number;
    include?: Prisma.user_web_push_subscriptionsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type user_web_push_subscriptionsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_web_push_subscriptionsSelect<ExtArgs> | null;
    omit?: Prisma.user_web_push_subscriptionsOmit<ExtArgs> | null;
    include?: Prisma.user_web_push_subscriptionsInclude<ExtArgs> | null;
    where: Prisma.user_web_push_subscriptionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.user_web_push_subscriptionsCreateInput, Prisma.user_web_push_subscriptionsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.user_web_push_subscriptionsUpdateInput, Prisma.user_web_push_subscriptionsUncheckedUpdateInput>;
};
export type user_web_push_subscriptionsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_web_push_subscriptionsSelect<ExtArgs> | null;
    omit?: Prisma.user_web_push_subscriptionsOmit<ExtArgs> | null;
    include?: Prisma.user_web_push_subscriptionsInclude<ExtArgs> | null;
    where: Prisma.user_web_push_subscriptionsWhereUniqueInput;
};
export type user_web_push_subscriptionsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.user_web_push_subscriptionsWhereInput;
    limit?: number;
};
export type user_web_push_subscriptionsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.user_web_push_subscriptionsSelect<ExtArgs> | null;
    omit?: Prisma.user_web_push_subscriptionsOmit<ExtArgs> | null;
    include?: Prisma.user_web_push_subscriptionsInclude<ExtArgs> | null;
};
