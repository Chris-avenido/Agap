import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type chat_messagesModel = runtime.Types.Result.DefaultSelection<Prisma.$chat_messagesPayload>;
export type AggregateChat_messages = {
    _count: Chat_messagesCountAggregateOutputType | null;
    _min: Chat_messagesMinAggregateOutputType | null;
    _max: Chat_messagesMaxAggregateOutputType | null;
};
export type Chat_messagesMinAggregateOutputType = {
    id: string | null;
    room_id: string | null;
    sender_uid: string | null;
    message_text: string | null;
    message_type: string | null;
    attachment_url: string | null;
    is_read: boolean | null;
    created_at: Date | null;
};
export type Chat_messagesMaxAggregateOutputType = {
    id: string | null;
    room_id: string | null;
    sender_uid: string | null;
    message_text: string | null;
    message_type: string | null;
    attachment_url: string | null;
    is_read: boolean | null;
    created_at: Date | null;
};
export type Chat_messagesCountAggregateOutputType = {
    id: number;
    room_id: number;
    sender_uid: number;
    message_text: number;
    message_type: number;
    attachment_url: number;
    attachment_metadata: number;
    is_read: number;
    created_at: number;
    _all: number;
};
export type Chat_messagesMinAggregateInputType = {
    id?: true;
    room_id?: true;
    sender_uid?: true;
    message_text?: true;
    message_type?: true;
    attachment_url?: true;
    is_read?: true;
    created_at?: true;
};
export type Chat_messagesMaxAggregateInputType = {
    id?: true;
    room_id?: true;
    sender_uid?: true;
    message_text?: true;
    message_type?: true;
    attachment_url?: true;
    is_read?: true;
    created_at?: true;
};
export type Chat_messagesCountAggregateInputType = {
    id?: true;
    room_id?: true;
    sender_uid?: true;
    message_text?: true;
    message_type?: true;
    attachment_url?: true;
    attachment_metadata?: true;
    is_read?: true;
    created_at?: true;
    _all?: true;
};
export type Chat_messagesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.chat_messagesWhereInput;
    orderBy?: Prisma.chat_messagesOrderByWithRelationInput | Prisma.chat_messagesOrderByWithRelationInput[];
    cursor?: Prisma.chat_messagesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Chat_messagesCountAggregateInputType;
    _min?: Chat_messagesMinAggregateInputType;
    _max?: Chat_messagesMaxAggregateInputType;
};
export type GetChat_messagesAggregateType<T extends Chat_messagesAggregateArgs> = {
    [P in keyof T & keyof AggregateChat_messages]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateChat_messages[P]> : Prisma.GetScalarType<T[P], AggregateChat_messages[P]>;
};
export type chat_messagesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.chat_messagesWhereInput;
    orderBy?: Prisma.chat_messagesOrderByWithAggregationInput | Prisma.chat_messagesOrderByWithAggregationInput[];
    by: Prisma.Chat_messagesScalarFieldEnum[] | Prisma.Chat_messagesScalarFieldEnum;
    having?: Prisma.chat_messagesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Chat_messagesCountAggregateInputType | true;
    _min?: Chat_messagesMinAggregateInputType;
    _max?: Chat_messagesMaxAggregateInputType;
};
export type Chat_messagesGroupByOutputType = {
    id: string;
    room_id: string | null;
    sender_uid: string | null;
    message_text: string | null;
    message_type: string;
    attachment_url: string | null;
    attachment_metadata: runtime.JsonValue | null;
    is_read: boolean;
    created_at: Date | null;
    _count: Chat_messagesCountAggregateOutputType | null;
    _min: Chat_messagesMinAggregateOutputType | null;
    _max: Chat_messagesMaxAggregateOutputType | null;
};
export type GetChat_messagesGroupByPayload<T extends chat_messagesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Chat_messagesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Chat_messagesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Chat_messagesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Chat_messagesGroupByOutputType[P]>;
}>>;
export type chat_messagesWhereInput = {
    AND?: Prisma.chat_messagesWhereInput | Prisma.chat_messagesWhereInput[];
    OR?: Prisma.chat_messagesWhereInput[];
    NOT?: Prisma.chat_messagesWhereInput | Prisma.chat_messagesWhereInput[];
    id?: Prisma.UuidFilter<"chat_messages"> | string;
    room_id?: Prisma.UuidNullableFilter<"chat_messages"> | string | null;
    sender_uid?: Prisma.StringNullableFilter<"chat_messages"> | string | null;
    message_text?: Prisma.StringNullableFilter<"chat_messages"> | string | null;
    message_type?: Prisma.StringFilter<"chat_messages"> | string;
    attachment_url?: Prisma.StringNullableFilter<"chat_messages"> | string | null;
    attachment_metadata?: Prisma.JsonNullableFilter<"chat_messages">;
    is_read?: Prisma.BoolFilter<"chat_messages"> | boolean;
    created_at?: Prisma.DateTimeNullableFilter<"chat_messages"> | Date | string | null;
    chat_rooms?: Prisma.XOR<Prisma.Chat_roomsNullableScalarRelationFilter, Prisma.chat_roomsWhereInput> | null;
    users?: Prisma.XOR<Prisma.UsersNullableScalarRelationFilter, Prisma.usersWhereInput> | null;
};
export type chat_messagesOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    room_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    sender_uid?: Prisma.SortOrderInput | Prisma.SortOrder;
    message_text?: Prisma.SortOrderInput | Prisma.SortOrder;
    message_type?: Prisma.SortOrder;
    attachment_url?: Prisma.SortOrderInput | Prisma.SortOrder;
    attachment_metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    is_read?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    chat_rooms?: Prisma.chat_roomsOrderByWithRelationInput;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type chat_messagesWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.chat_messagesWhereInput | Prisma.chat_messagesWhereInput[];
    OR?: Prisma.chat_messagesWhereInput[];
    NOT?: Prisma.chat_messagesWhereInput | Prisma.chat_messagesWhereInput[];
    room_id?: Prisma.UuidNullableFilter<"chat_messages"> | string | null;
    sender_uid?: Prisma.StringNullableFilter<"chat_messages"> | string | null;
    message_text?: Prisma.StringNullableFilter<"chat_messages"> | string | null;
    message_type?: Prisma.StringFilter<"chat_messages"> | string;
    attachment_url?: Prisma.StringNullableFilter<"chat_messages"> | string | null;
    attachment_metadata?: Prisma.JsonNullableFilter<"chat_messages">;
    is_read?: Prisma.BoolFilter<"chat_messages"> | boolean;
    created_at?: Prisma.DateTimeNullableFilter<"chat_messages"> | Date | string | null;
    chat_rooms?: Prisma.XOR<Prisma.Chat_roomsNullableScalarRelationFilter, Prisma.chat_roomsWhereInput> | null;
    users?: Prisma.XOR<Prisma.UsersNullableScalarRelationFilter, Prisma.usersWhereInput> | null;
}, "id">;
export type chat_messagesOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    room_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    sender_uid?: Prisma.SortOrderInput | Prisma.SortOrder;
    message_text?: Prisma.SortOrderInput | Prisma.SortOrder;
    message_type?: Prisma.SortOrder;
    attachment_url?: Prisma.SortOrderInput | Prisma.SortOrder;
    attachment_metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    is_read?: Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.chat_messagesCountOrderByAggregateInput;
    _max?: Prisma.chat_messagesMaxOrderByAggregateInput;
    _min?: Prisma.chat_messagesMinOrderByAggregateInput;
};
export type chat_messagesScalarWhereWithAggregatesInput = {
    AND?: Prisma.chat_messagesScalarWhereWithAggregatesInput | Prisma.chat_messagesScalarWhereWithAggregatesInput[];
    OR?: Prisma.chat_messagesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.chat_messagesScalarWhereWithAggregatesInput | Prisma.chat_messagesScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"chat_messages"> | string;
    room_id?: Prisma.UuidNullableWithAggregatesFilter<"chat_messages"> | string | null;
    sender_uid?: Prisma.StringNullableWithAggregatesFilter<"chat_messages"> | string | null;
    message_text?: Prisma.StringNullableWithAggregatesFilter<"chat_messages"> | string | null;
    message_type?: Prisma.StringWithAggregatesFilter<"chat_messages"> | string;
    attachment_url?: Prisma.StringNullableWithAggregatesFilter<"chat_messages"> | string | null;
    attachment_metadata?: Prisma.JsonNullableWithAggregatesFilter<"chat_messages">;
    is_read?: Prisma.BoolWithAggregatesFilter<"chat_messages"> | boolean;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"chat_messages"> | Date | string | null;
};
export type chat_messagesCreateInput = {
    id?: string;
    message_text?: string | null;
    message_type?: string;
    attachment_url?: string | null;
    attachment_metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    is_read?: boolean;
    created_at?: Date | string | null;
    chat_rooms?: Prisma.chat_roomsCreateNestedOneWithoutChat_messagesInput;
    users?: Prisma.usersCreateNestedOneWithoutChat_messagesInput;
};
export type chat_messagesUncheckedCreateInput = {
    id?: string;
    room_id?: string | null;
    sender_uid?: string | null;
    message_text?: string | null;
    message_type?: string;
    attachment_url?: string | null;
    attachment_metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    is_read?: boolean;
    created_at?: Date | string | null;
};
export type chat_messagesUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message_text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message_type?: Prisma.StringFieldUpdateOperationsInput | string;
    attachment_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attachment_metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    is_read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    chat_rooms?: Prisma.chat_roomsUpdateOneWithoutChat_messagesNestedInput;
    users?: Prisma.usersUpdateOneWithoutChat_messagesNestedInput;
};
export type chat_messagesUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    room_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sender_uid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message_text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message_type?: Prisma.StringFieldUpdateOperationsInput | string;
    attachment_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attachment_metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    is_read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type chat_messagesCreateManyInput = {
    id?: string;
    room_id?: string | null;
    sender_uid?: string | null;
    message_text?: string | null;
    message_type?: string;
    attachment_url?: string | null;
    attachment_metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    is_read?: boolean;
    created_at?: Date | string | null;
};
export type chat_messagesUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message_text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message_type?: Prisma.StringFieldUpdateOperationsInput | string;
    attachment_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attachment_metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    is_read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type chat_messagesUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    room_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sender_uid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message_text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message_type?: Prisma.StringFieldUpdateOperationsInput | string;
    attachment_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attachment_metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    is_read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type chat_messagesCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    room_id?: Prisma.SortOrder;
    sender_uid?: Prisma.SortOrder;
    message_text?: Prisma.SortOrder;
    message_type?: Prisma.SortOrder;
    attachment_url?: Prisma.SortOrder;
    attachment_metadata?: Prisma.SortOrder;
    is_read?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type chat_messagesMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    room_id?: Prisma.SortOrder;
    sender_uid?: Prisma.SortOrder;
    message_text?: Prisma.SortOrder;
    message_type?: Prisma.SortOrder;
    attachment_url?: Prisma.SortOrder;
    is_read?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type chat_messagesMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    room_id?: Prisma.SortOrder;
    sender_uid?: Prisma.SortOrder;
    message_text?: Prisma.SortOrder;
    message_type?: Prisma.SortOrder;
    attachment_url?: Prisma.SortOrder;
    is_read?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type Chat_messagesListRelationFilter = {
    every?: Prisma.chat_messagesWhereInput;
    some?: Prisma.chat_messagesWhereInput;
    none?: Prisma.chat_messagesWhereInput;
};
export type chat_messagesOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type chat_messagesCreateNestedManyWithoutChat_roomsInput = {
    create?: Prisma.XOR<Prisma.chat_messagesCreateWithoutChat_roomsInput, Prisma.chat_messagesUncheckedCreateWithoutChat_roomsInput> | Prisma.chat_messagesCreateWithoutChat_roomsInput[] | Prisma.chat_messagesUncheckedCreateWithoutChat_roomsInput[];
    connectOrCreate?: Prisma.chat_messagesCreateOrConnectWithoutChat_roomsInput | Prisma.chat_messagesCreateOrConnectWithoutChat_roomsInput[];
    createMany?: Prisma.chat_messagesCreateManyChat_roomsInputEnvelope;
    connect?: Prisma.chat_messagesWhereUniqueInput | Prisma.chat_messagesWhereUniqueInput[];
};
export type chat_messagesUncheckedCreateNestedManyWithoutChat_roomsInput = {
    create?: Prisma.XOR<Prisma.chat_messagesCreateWithoutChat_roomsInput, Prisma.chat_messagesUncheckedCreateWithoutChat_roomsInput> | Prisma.chat_messagesCreateWithoutChat_roomsInput[] | Prisma.chat_messagesUncheckedCreateWithoutChat_roomsInput[];
    connectOrCreate?: Prisma.chat_messagesCreateOrConnectWithoutChat_roomsInput | Prisma.chat_messagesCreateOrConnectWithoutChat_roomsInput[];
    createMany?: Prisma.chat_messagesCreateManyChat_roomsInputEnvelope;
    connect?: Prisma.chat_messagesWhereUniqueInput | Prisma.chat_messagesWhereUniqueInput[];
};
export type chat_messagesUpdateManyWithoutChat_roomsNestedInput = {
    create?: Prisma.XOR<Prisma.chat_messagesCreateWithoutChat_roomsInput, Prisma.chat_messagesUncheckedCreateWithoutChat_roomsInput> | Prisma.chat_messagesCreateWithoutChat_roomsInput[] | Prisma.chat_messagesUncheckedCreateWithoutChat_roomsInput[];
    connectOrCreate?: Prisma.chat_messagesCreateOrConnectWithoutChat_roomsInput | Prisma.chat_messagesCreateOrConnectWithoutChat_roomsInput[];
    upsert?: Prisma.chat_messagesUpsertWithWhereUniqueWithoutChat_roomsInput | Prisma.chat_messagesUpsertWithWhereUniqueWithoutChat_roomsInput[];
    createMany?: Prisma.chat_messagesCreateManyChat_roomsInputEnvelope;
    set?: Prisma.chat_messagesWhereUniqueInput | Prisma.chat_messagesWhereUniqueInput[];
    disconnect?: Prisma.chat_messagesWhereUniqueInput | Prisma.chat_messagesWhereUniqueInput[];
    delete?: Prisma.chat_messagesWhereUniqueInput | Prisma.chat_messagesWhereUniqueInput[];
    connect?: Prisma.chat_messagesWhereUniqueInput | Prisma.chat_messagesWhereUniqueInput[];
    update?: Prisma.chat_messagesUpdateWithWhereUniqueWithoutChat_roomsInput | Prisma.chat_messagesUpdateWithWhereUniqueWithoutChat_roomsInput[];
    updateMany?: Prisma.chat_messagesUpdateManyWithWhereWithoutChat_roomsInput | Prisma.chat_messagesUpdateManyWithWhereWithoutChat_roomsInput[];
    deleteMany?: Prisma.chat_messagesScalarWhereInput | Prisma.chat_messagesScalarWhereInput[];
};
export type chat_messagesUncheckedUpdateManyWithoutChat_roomsNestedInput = {
    create?: Prisma.XOR<Prisma.chat_messagesCreateWithoutChat_roomsInput, Prisma.chat_messagesUncheckedCreateWithoutChat_roomsInput> | Prisma.chat_messagesCreateWithoutChat_roomsInput[] | Prisma.chat_messagesUncheckedCreateWithoutChat_roomsInput[];
    connectOrCreate?: Prisma.chat_messagesCreateOrConnectWithoutChat_roomsInput | Prisma.chat_messagesCreateOrConnectWithoutChat_roomsInput[];
    upsert?: Prisma.chat_messagesUpsertWithWhereUniqueWithoutChat_roomsInput | Prisma.chat_messagesUpsertWithWhereUniqueWithoutChat_roomsInput[];
    createMany?: Prisma.chat_messagesCreateManyChat_roomsInputEnvelope;
    set?: Prisma.chat_messagesWhereUniqueInput | Prisma.chat_messagesWhereUniqueInput[];
    disconnect?: Prisma.chat_messagesWhereUniqueInput | Prisma.chat_messagesWhereUniqueInput[];
    delete?: Prisma.chat_messagesWhereUniqueInput | Prisma.chat_messagesWhereUniqueInput[];
    connect?: Prisma.chat_messagesWhereUniqueInput | Prisma.chat_messagesWhereUniqueInput[];
    update?: Prisma.chat_messagesUpdateWithWhereUniqueWithoutChat_roomsInput | Prisma.chat_messagesUpdateWithWhereUniqueWithoutChat_roomsInput[];
    updateMany?: Prisma.chat_messagesUpdateManyWithWhereWithoutChat_roomsInput | Prisma.chat_messagesUpdateManyWithWhereWithoutChat_roomsInput[];
    deleteMany?: Prisma.chat_messagesScalarWhereInput | Prisma.chat_messagesScalarWhereInput[];
};
export type chat_messagesCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.chat_messagesCreateWithoutUsersInput, Prisma.chat_messagesUncheckedCreateWithoutUsersInput> | Prisma.chat_messagesCreateWithoutUsersInput[] | Prisma.chat_messagesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.chat_messagesCreateOrConnectWithoutUsersInput | Prisma.chat_messagesCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.chat_messagesCreateManyUsersInputEnvelope;
    connect?: Prisma.chat_messagesWhereUniqueInput | Prisma.chat_messagesWhereUniqueInput[];
};
export type chat_messagesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.chat_messagesCreateWithoutUsersInput, Prisma.chat_messagesUncheckedCreateWithoutUsersInput> | Prisma.chat_messagesCreateWithoutUsersInput[] | Prisma.chat_messagesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.chat_messagesCreateOrConnectWithoutUsersInput | Prisma.chat_messagesCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.chat_messagesCreateManyUsersInputEnvelope;
    connect?: Prisma.chat_messagesWhereUniqueInput | Prisma.chat_messagesWhereUniqueInput[];
};
export type chat_messagesUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.chat_messagesCreateWithoutUsersInput, Prisma.chat_messagesUncheckedCreateWithoutUsersInput> | Prisma.chat_messagesCreateWithoutUsersInput[] | Prisma.chat_messagesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.chat_messagesCreateOrConnectWithoutUsersInput | Prisma.chat_messagesCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.chat_messagesUpsertWithWhereUniqueWithoutUsersInput | Prisma.chat_messagesUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.chat_messagesCreateManyUsersInputEnvelope;
    set?: Prisma.chat_messagesWhereUniqueInput | Prisma.chat_messagesWhereUniqueInput[];
    disconnect?: Prisma.chat_messagesWhereUniqueInput | Prisma.chat_messagesWhereUniqueInput[];
    delete?: Prisma.chat_messagesWhereUniqueInput | Prisma.chat_messagesWhereUniqueInput[];
    connect?: Prisma.chat_messagesWhereUniqueInput | Prisma.chat_messagesWhereUniqueInput[];
    update?: Prisma.chat_messagesUpdateWithWhereUniqueWithoutUsersInput | Prisma.chat_messagesUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.chat_messagesUpdateManyWithWhereWithoutUsersInput | Prisma.chat_messagesUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.chat_messagesScalarWhereInput | Prisma.chat_messagesScalarWhereInput[];
};
export type chat_messagesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.chat_messagesCreateWithoutUsersInput, Prisma.chat_messagesUncheckedCreateWithoutUsersInput> | Prisma.chat_messagesCreateWithoutUsersInput[] | Prisma.chat_messagesUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.chat_messagesCreateOrConnectWithoutUsersInput | Prisma.chat_messagesCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.chat_messagesUpsertWithWhereUniqueWithoutUsersInput | Prisma.chat_messagesUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.chat_messagesCreateManyUsersInputEnvelope;
    set?: Prisma.chat_messagesWhereUniqueInput | Prisma.chat_messagesWhereUniqueInput[];
    disconnect?: Prisma.chat_messagesWhereUniqueInput | Prisma.chat_messagesWhereUniqueInput[];
    delete?: Prisma.chat_messagesWhereUniqueInput | Prisma.chat_messagesWhereUniqueInput[];
    connect?: Prisma.chat_messagesWhereUniqueInput | Prisma.chat_messagesWhereUniqueInput[];
    update?: Prisma.chat_messagesUpdateWithWhereUniqueWithoutUsersInput | Prisma.chat_messagesUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.chat_messagesUpdateManyWithWhereWithoutUsersInput | Prisma.chat_messagesUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.chat_messagesScalarWhereInput | Prisma.chat_messagesScalarWhereInput[];
};
export type chat_messagesCreateWithoutChat_roomsInput = {
    id?: string;
    message_text?: string | null;
    message_type?: string;
    attachment_url?: string | null;
    attachment_metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    is_read?: boolean;
    created_at?: Date | string | null;
    users?: Prisma.usersCreateNestedOneWithoutChat_messagesInput;
};
export type chat_messagesUncheckedCreateWithoutChat_roomsInput = {
    id?: string;
    sender_uid?: string | null;
    message_text?: string | null;
    message_type?: string;
    attachment_url?: string | null;
    attachment_metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    is_read?: boolean;
    created_at?: Date | string | null;
};
export type chat_messagesCreateOrConnectWithoutChat_roomsInput = {
    where: Prisma.chat_messagesWhereUniqueInput;
    create: Prisma.XOR<Prisma.chat_messagesCreateWithoutChat_roomsInput, Prisma.chat_messagesUncheckedCreateWithoutChat_roomsInput>;
};
export type chat_messagesCreateManyChat_roomsInputEnvelope = {
    data: Prisma.chat_messagesCreateManyChat_roomsInput | Prisma.chat_messagesCreateManyChat_roomsInput[];
    skipDuplicates?: boolean;
};
export type chat_messagesUpsertWithWhereUniqueWithoutChat_roomsInput = {
    where: Prisma.chat_messagesWhereUniqueInput;
    update: Prisma.XOR<Prisma.chat_messagesUpdateWithoutChat_roomsInput, Prisma.chat_messagesUncheckedUpdateWithoutChat_roomsInput>;
    create: Prisma.XOR<Prisma.chat_messagesCreateWithoutChat_roomsInput, Prisma.chat_messagesUncheckedCreateWithoutChat_roomsInput>;
};
export type chat_messagesUpdateWithWhereUniqueWithoutChat_roomsInput = {
    where: Prisma.chat_messagesWhereUniqueInput;
    data: Prisma.XOR<Prisma.chat_messagesUpdateWithoutChat_roomsInput, Prisma.chat_messagesUncheckedUpdateWithoutChat_roomsInput>;
};
export type chat_messagesUpdateManyWithWhereWithoutChat_roomsInput = {
    where: Prisma.chat_messagesScalarWhereInput;
    data: Prisma.XOR<Prisma.chat_messagesUpdateManyMutationInput, Prisma.chat_messagesUncheckedUpdateManyWithoutChat_roomsInput>;
};
export type chat_messagesScalarWhereInput = {
    AND?: Prisma.chat_messagesScalarWhereInput | Prisma.chat_messagesScalarWhereInput[];
    OR?: Prisma.chat_messagesScalarWhereInput[];
    NOT?: Prisma.chat_messagesScalarWhereInput | Prisma.chat_messagesScalarWhereInput[];
    id?: Prisma.UuidFilter<"chat_messages"> | string;
    room_id?: Prisma.UuidNullableFilter<"chat_messages"> | string | null;
    sender_uid?: Prisma.StringNullableFilter<"chat_messages"> | string | null;
    message_text?: Prisma.StringNullableFilter<"chat_messages"> | string | null;
    message_type?: Prisma.StringFilter<"chat_messages"> | string;
    attachment_url?: Prisma.StringNullableFilter<"chat_messages"> | string | null;
    attachment_metadata?: Prisma.JsonNullableFilter<"chat_messages">;
    is_read?: Prisma.BoolFilter<"chat_messages"> | boolean;
    created_at?: Prisma.DateTimeNullableFilter<"chat_messages"> | Date | string | null;
};
export type chat_messagesCreateWithoutUsersInput = {
    id?: string;
    message_text?: string | null;
    message_type?: string;
    attachment_url?: string | null;
    attachment_metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    is_read?: boolean;
    created_at?: Date | string | null;
    chat_rooms?: Prisma.chat_roomsCreateNestedOneWithoutChat_messagesInput;
};
export type chat_messagesUncheckedCreateWithoutUsersInput = {
    id?: string;
    room_id?: string | null;
    message_text?: string | null;
    message_type?: string;
    attachment_url?: string | null;
    attachment_metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    is_read?: boolean;
    created_at?: Date | string | null;
};
export type chat_messagesCreateOrConnectWithoutUsersInput = {
    where: Prisma.chat_messagesWhereUniqueInput;
    create: Prisma.XOR<Prisma.chat_messagesCreateWithoutUsersInput, Prisma.chat_messagesUncheckedCreateWithoutUsersInput>;
};
export type chat_messagesCreateManyUsersInputEnvelope = {
    data: Prisma.chat_messagesCreateManyUsersInput | Prisma.chat_messagesCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type chat_messagesUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.chat_messagesWhereUniqueInput;
    update: Prisma.XOR<Prisma.chat_messagesUpdateWithoutUsersInput, Prisma.chat_messagesUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.chat_messagesCreateWithoutUsersInput, Prisma.chat_messagesUncheckedCreateWithoutUsersInput>;
};
export type chat_messagesUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.chat_messagesWhereUniqueInput;
    data: Prisma.XOR<Prisma.chat_messagesUpdateWithoutUsersInput, Prisma.chat_messagesUncheckedUpdateWithoutUsersInput>;
};
export type chat_messagesUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.chat_messagesScalarWhereInput;
    data: Prisma.XOR<Prisma.chat_messagesUpdateManyMutationInput, Prisma.chat_messagesUncheckedUpdateManyWithoutUsersInput>;
};
export type chat_messagesCreateManyChat_roomsInput = {
    id?: string;
    sender_uid?: string | null;
    message_text?: string | null;
    message_type?: string;
    attachment_url?: string | null;
    attachment_metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    is_read?: boolean;
    created_at?: Date | string | null;
};
export type chat_messagesUpdateWithoutChat_roomsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message_text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message_type?: Prisma.StringFieldUpdateOperationsInput | string;
    attachment_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attachment_metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    is_read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    users?: Prisma.usersUpdateOneWithoutChat_messagesNestedInput;
};
export type chat_messagesUncheckedUpdateWithoutChat_roomsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sender_uid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message_text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message_type?: Prisma.StringFieldUpdateOperationsInput | string;
    attachment_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attachment_metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    is_read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type chat_messagesUncheckedUpdateManyWithoutChat_roomsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sender_uid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message_text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message_type?: Prisma.StringFieldUpdateOperationsInput | string;
    attachment_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attachment_metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    is_read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type chat_messagesCreateManyUsersInput = {
    id?: string;
    room_id?: string | null;
    message_text?: string | null;
    message_type?: string;
    attachment_url?: string | null;
    attachment_metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    is_read?: boolean;
    created_at?: Date | string | null;
};
export type chat_messagesUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message_text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message_type?: Prisma.StringFieldUpdateOperationsInput | string;
    attachment_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attachment_metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    is_read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    chat_rooms?: Prisma.chat_roomsUpdateOneWithoutChat_messagesNestedInput;
};
export type chat_messagesUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    room_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message_text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message_type?: Prisma.StringFieldUpdateOperationsInput | string;
    attachment_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attachment_metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    is_read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type chat_messagesUncheckedUpdateManyWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    room_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message_text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message_type?: Prisma.StringFieldUpdateOperationsInput | string;
    attachment_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attachment_metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    is_read?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type chat_messagesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    room_id?: boolean;
    sender_uid?: boolean;
    message_text?: boolean;
    message_type?: boolean;
    attachment_url?: boolean;
    attachment_metadata?: boolean;
    is_read?: boolean;
    created_at?: boolean;
    chat_rooms?: boolean | Prisma.chat_messages$chat_roomsArgs<ExtArgs>;
    users?: boolean | Prisma.chat_messages$usersArgs<ExtArgs>;
}, ExtArgs["result"]["chat_messages"]>;
export type chat_messagesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    room_id?: boolean;
    sender_uid?: boolean;
    message_text?: boolean;
    message_type?: boolean;
    attachment_url?: boolean;
    attachment_metadata?: boolean;
    is_read?: boolean;
    created_at?: boolean;
    chat_rooms?: boolean | Prisma.chat_messages$chat_roomsArgs<ExtArgs>;
    users?: boolean | Prisma.chat_messages$usersArgs<ExtArgs>;
}, ExtArgs["result"]["chat_messages"]>;
export type chat_messagesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    room_id?: boolean;
    sender_uid?: boolean;
    message_text?: boolean;
    message_type?: boolean;
    attachment_url?: boolean;
    attachment_metadata?: boolean;
    is_read?: boolean;
    created_at?: boolean;
    chat_rooms?: boolean | Prisma.chat_messages$chat_roomsArgs<ExtArgs>;
    users?: boolean | Prisma.chat_messages$usersArgs<ExtArgs>;
}, ExtArgs["result"]["chat_messages"]>;
export type chat_messagesSelectScalar = {
    id?: boolean;
    room_id?: boolean;
    sender_uid?: boolean;
    message_text?: boolean;
    message_type?: boolean;
    attachment_url?: boolean;
    attachment_metadata?: boolean;
    is_read?: boolean;
    created_at?: boolean;
};
export type chat_messagesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "room_id" | "sender_uid" | "message_text" | "message_type" | "attachment_url" | "attachment_metadata" | "is_read" | "created_at", ExtArgs["result"]["chat_messages"]>;
export type chat_messagesInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    chat_rooms?: boolean | Prisma.chat_messages$chat_roomsArgs<ExtArgs>;
    users?: boolean | Prisma.chat_messages$usersArgs<ExtArgs>;
};
export type chat_messagesIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    chat_rooms?: boolean | Prisma.chat_messages$chat_roomsArgs<ExtArgs>;
    users?: boolean | Prisma.chat_messages$usersArgs<ExtArgs>;
};
export type chat_messagesIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    chat_rooms?: boolean | Prisma.chat_messages$chat_roomsArgs<ExtArgs>;
    users?: boolean | Prisma.chat_messages$usersArgs<ExtArgs>;
};
export type $chat_messagesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "chat_messages";
    objects: {
        chat_rooms: Prisma.$chat_roomsPayload<ExtArgs> | null;
        users: Prisma.$usersPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        room_id: string | null;
        sender_uid: string | null;
        message_text: string | null;
        message_type: string;
        attachment_url: string | null;
        attachment_metadata: runtime.JsonValue | null;
        is_read: boolean;
        created_at: Date | null;
    }, ExtArgs["result"]["chat_messages"]>;
    composites: {};
};
export type chat_messagesGetPayload<S extends boolean | null | undefined | chat_messagesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$chat_messagesPayload, S>;
export type chat_messagesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<chat_messagesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Chat_messagesCountAggregateInputType | true;
};
export interface chat_messagesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['chat_messages'];
        meta: {
            name: 'chat_messages';
        };
    };
    findUnique<T extends chat_messagesFindUniqueArgs>(args: Prisma.SelectSubset<T, chat_messagesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__chat_messagesClient<runtime.Types.Result.GetResult<Prisma.$chat_messagesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends chat_messagesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, chat_messagesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__chat_messagesClient<runtime.Types.Result.GetResult<Prisma.$chat_messagesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends chat_messagesFindFirstArgs>(args?: Prisma.SelectSubset<T, chat_messagesFindFirstArgs<ExtArgs>>): Prisma.Prisma__chat_messagesClient<runtime.Types.Result.GetResult<Prisma.$chat_messagesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends chat_messagesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, chat_messagesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__chat_messagesClient<runtime.Types.Result.GetResult<Prisma.$chat_messagesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends chat_messagesFindManyArgs>(args?: Prisma.SelectSubset<T, chat_messagesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$chat_messagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends chat_messagesCreateArgs>(args: Prisma.SelectSubset<T, chat_messagesCreateArgs<ExtArgs>>): Prisma.Prisma__chat_messagesClient<runtime.Types.Result.GetResult<Prisma.$chat_messagesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends chat_messagesCreateManyArgs>(args?: Prisma.SelectSubset<T, chat_messagesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends chat_messagesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, chat_messagesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$chat_messagesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends chat_messagesDeleteArgs>(args: Prisma.SelectSubset<T, chat_messagesDeleteArgs<ExtArgs>>): Prisma.Prisma__chat_messagesClient<runtime.Types.Result.GetResult<Prisma.$chat_messagesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends chat_messagesUpdateArgs>(args: Prisma.SelectSubset<T, chat_messagesUpdateArgs<ExtArgs>>): Prisma.Prisma__chat_messagesClient<runtime.Types.Result.GetResult<Prisma.$chat_messagesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends chat_messagesDeleteManyArgs>(args?: Prisma.SelectSubset<T, chat_messagesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends chat_messagesUpdateManyArgs>(args: Prisma.SelectSubset<T, chat_messagesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends chat_messagesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, chat_messagesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$chat_messagesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends chat_messagesUpsertArgs>(args: Prisma.SelectSubset<T, chat_messagesUpsertArgs<ExtArgs>>): Prisma.Prisma__chat_messagesClient<runtime.Types.Result.GetResult<Prisma.$chat_messagesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends chat_messagesCountArgs>(args?: Prisma.Subset<T, chat_messagesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Chat_messagesCountAggregateOutputType> : number>;
    aggregate<T extends Chat_messagesAggregateArgs>(args: Prisma.Subset<T, Chat_messagesAggregateArgs>): Prisma.PrismaPromise<GetChat_messagesAggregateType<T>>;
    groupBy<T extends chat_messagesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: chat_messagesGroupByArgs['orderBy'];
    } : {
        orderBy?: chat_messagesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, chat_messagesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChat_messagesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: chat_messagesFieldRefs;
}
export interface Prisma__chat_messagesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    chat_rooms<T extends Prisma.chat_messages$chat_roomsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.chat_messages$chat_roomsArgs<ExtArgs>>): Prisma.Prisma__chat_roomsClient<runtime.Types.Result.GetResult<Prisma.$chat_roomsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    users<T extends Prisma.chat_messages$usersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.chat_messages$usersArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface chat_messagesFieldRefs {
    readonly id: Prisma.FieldRef<"chat_messages", 'String'>;
    readonly room_id: Prisma.FieldRef<"chat_messages", 'String'>;
    readonly sender_uid: Prisma.FieldRef<"chat_messages", 'String'>;
    readonly message_text: Prisma.FieldRef<"chat_messages", 'String'>;
    readonly message_type: Prisma.FieldRef<"chat_messages", 'String'>;
    readonly attachment_url: Prisma.FieldRef<"chat_messages", 'String'>;
    readonly attachment_metadata: Prisma.FieldRef<"chat_messages", 'Json'>;
    readonly is_read: Prisma.FieldRef<"chat_messages", 'Boolean'>;
    readonly created_at: Prisma.FieldRef<"chat_messages", 'DateTime'>;
}
export type chat_messagesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_messagesSelect<ExtArgs> | null;
    omit?: Prisma.chat_messagesOmit<ExtArgs> | null;
    include?: Prisma.chat_messagesInclude<ExtArgs> | null;
    where: Prisma.chat_messagesWhereUniqueInput;
};
export type chat_messagesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_messagesSelect<ExtArgs> | null;
    omit?: Prisma.chat_messagesOmit<ExtArgs> | null;
    include?: Prisma.chat_messagesInclude<ExtArgs> | null;
    where: Prisma.chat_messagesWhereUniqueInput;
};
export type chat_messagesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_messagesSelect<ExtArgs> | null;
    omit?: Prisma.chat_messagesOmit<ExtArgs> | null;
    include?: Prisma.chat_messagesInclude<ExtArgs> | null;
    where?: Prisma.chat_messagesWhereInput;
    orderBy?: Prisma.chat_messagesOrderByWithRelationInput | Prisma.chat_messagesOrderByWithRelationInput[];
    cursor?: Prisma.chat_messagesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Chat_messagesScalarFieldEnum | Prisma.Chat_messagesScalarFieldEnum[];
};
export type chat_messagesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_messagesSelect<ExtArgs> | null;
    omit?: Prisma.chat_messagesOmit<ExtArgs> | null;
    include?: Prisma.chat_messagesInclude<ExtArgs> | null;
    where?: Prisma.chat_messagesWhereInput;
    orderBy?: Prisma.chat_messagesOrderByWithRelationInput | Prisma.chat_messagesOrderByWithRelationInput[];
    cursor?: Prisma.chat_messagesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Chat_messagesScalarFieldEnum | Prisma.Chat_messagesScalarFieldEnum[];
};
export type chat_messagesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_messagesSelect<ExtArgs> | null;
    omit?: Prisma.chat_messagesOmit<ExtArgs> | null;
    include?: Prisma.chat_messagesInclude<ExtArgs> | null;
    where?: Prisma.chat_messagesWhereInput;
    orderBy?: Prisma.chat_messagesOrderByWithRelationInput | Prisma.chat_messagesOrderByWithRelationInput[];
    cursor?: Prisma.chat_messagesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Chat_messagesScalarFieldEnum | Prisma.Chat_messagesScalarFieldEnum[];
};
export type chat_messagesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_messagesSelect<ExtArgs> | null;
    omit?: Prisma.chat_messagesOmit<ExtArgs> | null;
    include?: Prisma.chat_messagesInclude<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.chat_messagesCreateInput, Prisma.chat_messagesUncheckedCreateInput>;
};
export type chat_messagesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.chat_messagesCreateManyInput | Prisma.chat_messagesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type chat_messagesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_messagesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.chat_messagesOmit<ExtArgs> | null;
    data: Prisma.chat_messagesCreateManyInput | Prisma.chat_messagesCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.chat_messagesIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type chat_messagesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_messagesSelect<ExtArgs> | null;
    omit?: Prisma.chat_messagesOmit<ExtArgs> | null;
    include?: Prisma.chat_messagesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.chat_messagesUpdateInput, Prisma.chat_messagesUncheckedUpdateInput>;
    where: Prisma.chat_messagesWhereUniqueInput;
};
export type chat_messagesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.chat_messagesUpdateManyMutationInput, Prisma.chat_messagesUncheckedUpdateManyInput>;
    where?: Prisma.chat_messagesWhereInput;
    limit?: number;
};
export type chat_messagesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_messagesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.chat_messagesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.chat_messagesUpdateManyMutationInput, Prisma.chat_messagesUncheckedUpdateManyInput>;
    where?: Prisma.chat_messagesWhereInput;
    limit?: number;
    include?: Prisma.chat_messagesIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type chat_messagesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_messagesSelect<ExtArgs> | null;
    omit?: Prisma.chat_messagesOmit<ExtArgs> | null;
    include?: Prisma.chat_messagesInclude<ExtArgs> | null;
    where: Prisma.chat_messagesWhereUniqueInput;
    create: Prisma.XOR<Prisma.chat_messagesCreateInput, Prisma.chat_messagesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.chat_messagesUpdateInput, Prisma.chat_messagesUncheckedUpdateInput>;
};
export type chat_messagesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_messagesSelect<ExtArgs> | null;
    omit?: Prisma.chat_messagesOmit<ExtArgs> | null;
    include?: Prisma.chat_messagesInclude<ExtArgs> | null;
    where: Prisma.chat_messagesWhereUniqueInput;
};
export type chat_messagesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.chat_messagesWhereInput;
    limit?: number;
};
export type chat_messages$chat_roomsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_roomsSelect<ExtArgs> | null;
    omit?: Prisma.chat_roomsOmit<ExtArgs> | null;
    include?: Prisma.chat_roomsInclude<ExtArgs> | null;
    where?: Prisma.chat_roomsWhereInput;
};
export type chat_messages$usersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usersSelect<ExtArgs> | null;
    omit?: Prisma.usersOmit<ExtArgs> | null;
    include?: Prisma.usersInclude<ExtArgs> | null;
    where?: Prisma.usersWhereInput;
};
export type chat_messagesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_messagesSelect<ExtArgs> | null;
    omit?: Prisma.chat_messagesOmit<ExtArgs> | null;
    include?: Prisma.chat_messagesInclude<ExtArgs> | null;
};
