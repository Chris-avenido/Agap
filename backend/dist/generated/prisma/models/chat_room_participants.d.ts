import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type chat_room_participantsModel = runtime.Types.Result.DefaultSelection<Prisma.$chat_room_participantsPayload>;
export type AggregateChat_room_participants = {
    _count: Chat_room_participantsCountAggregateOutputType | null;
    _min: Chat_room_participantsMinAggregateOutputType | null;
    _max: Chat_room_participantsMaxAggregateOutputType | null;
};
export type Chat_room_participantsMinAggregateOutputType = {
    room_id: string | null;
    user_uid: string | null;
    user_role: string | null;
    joined_at: Date | null;
};
export type Chat_room_participantsMaxAggregateOutputType = {
    room_id: string | null;
    user_uid: string | null;
    user_role: string | null;
    joined_at: Date | null;
};
export type Chat_room_participantsCountAggregateOutputType = {
    room_id: number;
    user_uid: number;
    user_role: number;
    joined_at: number;
    _all: number;
};
export type Chat_room_participantsMinAggregateInputType = {
    room_id?: true;
    user_uid?: true;
    user_role?: true;
    joined_at?: true;
};
export type Chat_room_participantsMaxAggregateInputType = {
    room_id?: true;
    user_uid?: true;
    user_role?: true;
    joined_at?: true;
};
export type Chat_room_participantsCountAggregateInputType = {
    room_id?: true;
    user_uid?: true;
    user_role?: true;
    joined_at?: true;
    _all?: true;
};
export type Chat_room_participantsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.chat_room_participantsWhereInput;
    orderBy?: Prisma.chat_room_participantsOrderByWithRelationInput | Prisma.chat_room_participantsOrderByWithRelationInput[];
    cursor?: Prisma.chat_room_participantsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Chat_room_participantsCountAggregateInputType;
    _min?: Chat_room_participantsMinAggregateInputType;
    _max?: Chat_room_participantsMaxAggregateInputType;
};
export type GetChat_room_participantsAggregateType<T extends Chat_room_participantsAggregateArgs> = {
    [P in keyof T & keyof AggregateChat_room_participants]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateChat_room_participants[P]> : Prisma.GetScalarType<T[P], AggregateChat_room_participants[P]>;
};
export type chat_room_participantsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.chat_room_participantsWhereInput;
    orderBy?: Prisma.chat_room_participantsOrderByWithAggregationInput | Prisma.chat_room_participantsOrderByWithAggregationInput[];
    by: Prisma.Chat_room_participantsScalarFieldEnum[] | Prisma.Chat_room_participantsScalarFieldEnum;
    having?: Prisma.chat_room_participantsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Chat_room_participantsCountAggregateInputType | true;
    _min?: Chat_room_participantsMinAggregateInputType;
    _max?: Chat_room_participantsMaxAggregateInputType;
};
export type Chat_room_participantsGroupByOutputType = {
    room_id: string;
    user_uid: string;
    user_role: string;
    joined_at: Date | null;
    _count: Chat_room_participantsCountAggregateOutputType | null;
    _min: Chat_room_participantsMinAggregateOutputType | null;
    _max: Chat_room_participantsMaxAggregateOutputType | null;
};
export type GetChat_room_participantsGroupByPayload<T extends chat_room_participantsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Chat_room_participantsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Chat_room_participantsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Chat_room_participantsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Chat_room_participantsGroupByOutputType[P]>;
}>>;
export type chat_room_participantsWhereInput = {
    AND?: Prisma.chat_room_participantsWhereInput | Prisma.chat_room_participantsWhereInput[];
    OR?: Prisma.chat_room_participantsWhereInput[];
    NOT?: Prisma.chat_room_participantsWhereInput | Prisma.chat_room_participantsWhereInput[];
    room_id?: Prisma.UuidFilter<"chat_room_participants"> | string;
    user_uid?: Prisma.StringFilter<"chat_room_participants"> | string;
    user_role?: Prisma.StringFilter<"chat_room_participants"> | string;
    joined_at?: Prisma.DateTimeNullableFilter<"chat_room_participants"> | Date | string | null;
    chat_rooms?: Prisma.XOR<Prisma.Chat_roomsScalarRelationFilter, Prisma.chat_roomsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type chat_room_participantsOrderByWithRelationInput = {
    room_id?: Prisma.SortOrder;
    user_uid?: Prisma.SortOrder;
    user_role?: Prisma.SortOrder;
    joined_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    chat_rooms?: Prisma.chat_roomsOrderByWithRelationInput;
    users?: Prisma.usersOrderByWithRelationInput;
};
export type chat_room_participantsWhereUniqueInput = Prisma.AtLeast<{
    room_id_user_uid?: Prisma.chat_room_participantsRoom_idUser_uidCompoundUniqueInput;
    AND?: Prisma.chat_room_participantsWhereInput | Prisma.chat_room_participantsWhereInput[];
    OR?: Prisma.chat_room_participantsWhereInput[];
    NOT?: Prisma.chat_room_participantsWhereInput | Prisma.chat_room_participantsWhereInput[];
    room_id?: Prisma.UuidFilter<"chat_room_participants"> | string;
    user_uid?: Prisma.StringFilter<"chat_room_participants"> | string;
    user_role?: Prisma.StringFilter<"chat_room_participants"> | string;
    joined_at?: Prisma.DateTimeNullableFilter<"chat_room_participants"> | Date | string | null;
    chat_rooms?: Prisma.XOR<Prisma.Chat_roomsScalarRelationFilter, Prisma.chat_roomsWhereInput>;
    users?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "room_id_user_uid">;
export type chat_room_participantsOrderByWithAggregationInput = {
    room_id?: Prisma.SortOrder;
    user_uid?: Prisma.SortOrder;
    user_role?: Prisma.SortOrder;
    joined_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.chat_room_participantsCountOrderByAggregateInput;
    _max?: Prisma.chat_room_participantsMaxOrderByAggregateInput;
    _min?: Prisma.chat_room_participantsMinOrderByAggregateInput;
};
export type chat_room_participantsScalarWhereWithAggregatesInput = {
    AND?: Prisma.chat_room_participantsScalarWhereWithAggregatesInput | Prisma.chat_room_participantsScalarWhereWithAggregatesInput[];
    OR?: Prisma.chat_room_participantsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.chat_room_participantsScalarWhereWithAggregatesInput | Prisma.chat_room_participantsScalarWhereWithAggregatesInput[];
    room_id?: Prisma.UuidWithAggregatesFilter<"chat_room_participants"> | string;
    user_uid?: Prisma.StringWithAggregatesFilter<"chat_room_participants"> | string;
    user_role?: Prisma.StringWithAggregatesFilter<"chat_room_participants"> | string;
    joined_at?: Prisma.DateTimeNullableWithAggregatesFilter<"chat_room_participants"> | Date | string | null;
};
export type chat_room_participantsCreateInput = {
    user_role: string;
    joined_at?: Date | string | null;
    chat_rooms: Prisma.chat_roomsCreateNestedOneWithoutChat_room_participantsInput;
    users: Prisma.usersCreateNestedOneWithoutChat_room_participantsInput;
};
export type chat_room_participantsUncheckedCreateInput = {
    room_id: string;
    user_uid: string;
    user_role: string;
    joined_at?: Date | string | null;
};
export type chat_room_participantsUpdateInput = {
    user_role?: Prisma.StringFieldUpdateOperationsInput | string;
    joined_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    chat_rooms?: Prisma.chat_roomsUpdateOneRequiredWithoutChat_room_participantsNestedInput;
    users?: Prisma.usersUpdateOneRequiredWithoutChat_room_participantsNestedInput;
};
export type chat_room_participantsUncheckedUpdateInput = {
    room_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_uid?: Prisma.StringFieldUpdateOperationsInput | string;
    user_role?: Prisma.StringFieldUpdateOperationsInput | string;
    joined_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type chat_room_participantsCreateManyInput = {
    room_id: string;
    user_uid: string;
    user_role: string;
    joined_at?: Date | string | null;
};
export type chat_room_participantsUpdateManyMutationInput = {
    user_role?: Prisma.StringFieldUpdateOperationsInput | string;
    joined_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type chat_room_participantsUncheckedUpdateManyInput = {
    room_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_uid?: Prisma.StringFieldUpdateOperationsInput | string;
    user_role?: Prisma.StringFieldUpdateOperationsInput | string;
    joined_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type chat_room_participantsRoom_idUser_uidCompoundUniqueInput = {
    room_id: string;
    user_uid: string;
};
export type chat_room_participantsCountOrderByAggregateInput = {
    room_id?: Prisma.SortOrder;
    user_uid?: Prisma.SortOrder;
    user_role?: Prisma.SortOrder;
    joined_at?: Prisma.SortOrder;
};
export type chat_room_participantsMaxOrderByAggregateInput = {
    room_id?: Prisma.SortOrder;
    user_uid?: Prisma.SortOrder;
    user_role?: Prisma.SortOrder;
    joined_at?: Prisma.SortOrder;
};
export type chat_room_participantsMinOrderByAggregateInput = {
    room_id?: Prisma.SortOrder;
    user_uid?: Prisma.SortOrder;
    user_role?: Prisma.SortOrder;
    joined_at?: Prisma.SortOrder;
};
export type Chat_room_participantsListRelationFilter = {
    every?: Prisma.chat_room_participantsWhereInput;
    some?: Prisma.chat_room_participantsWhereInput;
    none?: Prisma.chat_room_participantsWhereInput;
};
export type chat_room_participantsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type chat_room_participantsCreateNestedManyWithoutChat_roomsInput = {
    create?: Prisma.XOR<Prisma.chat_room_participantsCreateWithoutChat_roomsInput, Prisma.chat_room_participantsUncheckedCreateWithoutChat_roomsInput> | Prisma.chat_room_participantsCreateWithoutChat_roomsInput[] | Prisma.chat_room_participantsUncheckedCreateWithoutChat_roomsInput[];
    connectOrCreate?: Prisma.chat_room_participantsCreateOrConnectWithoutChat_roomsInput | Prisma.chat_room_participantsCreateOrConnectWithoutChat_roomsInput[];
    createMany?: Prisma.chat_room_participantsCreateManyChat_roomsInputEnvelope;
    connect?: Prisma.chat_room_participantsWhereUniqueInput | Prisma.chat_room_participantsWhereUniqueInput[];
};
export type chat_room_participantsUncheckedCreateNestedManyWithoutChat_roomsInput = {
    create?: Prisma.XOR<Prisma.chat_room_participantsCreateWithoutChat_roomsInput, Prisma.chat_room_participantsUncheckedCreateWithoutChat_roomsInput> | Prisma.chat_room_participantsCreateWithoutChat_roomsInput[] | Prisma.chat_room_participantsUncheckedCreateWithoutChat_roomsInput[];
    connectOrCreate?: Prisma.chat_room_participantsCreateOrConnectWithoutChat_roomsInput | Prisma.chat_room_participantsCreateOrConnectWithoutChat_roomsInput[];
    createMany?: Prisma.chat_room_participantsCreateManyChat_roomsInputEnvelope;
    connect?: Prisma.chat_room_participantsWhereUniqueInput | Prisma.chat_room_participantsWhereUniqueInput[];
};
export type chat_room_participantsUpdateManyWithoutChat_roomsNestedInput = {
    create?: Prisma.XOR<Prisma.chat_room_participantsCreateWithoutChat_roomsInput, Prisma.chat_room_participantsUncheckedCreateWithoutChat_roomsInput> | Prisma.chat_room_participantsCreateWithoutChat_roomsInput[] | Prisma.chat_room_participantsUncheckedCreateWithoutChat_roomsInput[];
    connectOrCreate?: Prisma.chat_room_participantsCreateOrConnectWithoutChat_roomsInput | Prisma.chat_room_participantsCreateOrConnectWithoutChat_roomsInput[];
    upsert?: Prisma.chat_room_participantsUpsertWithWhereUniqueWithoutChat_roomsInput | Prisma.chat_room_participantsUpsertWithWhereUniqueWithoutChat_roomsInput[];
    createMany?: Prisma.chat_room_participantsCreateManyChat_roomsInputEnvelope;
    set?: Prisma.chat_room_participantsWhereUniqueInput | Prisma.chat_room_participantsWhereUniqueInput[];
    disconnect?: Prisma.chat_room_participantsWhereUniqueInput | Prisma.chat_room_participantsWhereUniqueInput[];
    delete?: Prisma.chat_room_participantsWhereUniqueInput | Prisma.chat_room_participantsWhereUniqueInput[];
    connect?: Prisma.chat_room_participantsWhereUniqueInput | Prisma.chat_room_participantsWhereUniqueInput[];
    update?: Prisma.chat_room_participantsUpdateWithWhereUniqueWithoutChat_roomsInput | Prisma.chat_room_participantsUpdateWithWhereUniqueWithoutChat_roomsInput[];
    updateMany?: Prisma.chat_room_participantsUpdateManyWithWhereWithoutChat_roomsInput | Prisma.chat_room_participantsUpdateManyWithWhereWithoutChat_roomsInput[];
    deleteMany?: Prisma.chat_room_participantsScalarWhereInput | Prisma.chat_room_participantsScalarWhereInput[];
};
export type chat_room_participantsUncheckedUpdateManyWithoutChat_roomsNestedInput = {
    create?: Prisma.XOR<Prisma.chat_room_participantsCreateWithoutChat_roomsInput, Prisma.chat_room_participantsUncheckedCreateWithoutChat_roomsInput> | Prisma.chat_room_participantsCreateWithoutChat_roomsInput[] | Prisma.chat_room_participantsUncheckedCreateWithoutChat_roomsInput[];
    connectOrCreate?: Prisma.chat_room_participantsCreateOrConnectWithoutChat_roomsInput | Prisma.chat_room_participantsCreateOrConnectWithoutChat_roomsInput[];
    upsert?: Prisma.chat_room_participantsUpsertWithWhereUniqueWithoutChat_roomsInput | Prisma.chat_room_participantsUpsertWithWhereUniqueWithoutChat_roomsInput[];
    createMany?: Prisma.chat_room_participantsCreateManyChat_roomsInputEnvelope;
    set?: Prisma.chat_room_participantsWhereUniqueInput | Prisma.chat_room_participantsWhereUniqueInput[];
    disconnect?: Prisma.chat_room_participantsWhereUniqueInput | Prisma.chat_room_participantsWhereUniqueInput[];
    delete?: Prisma.chat_room_participantsWhereUniqueInput | Prisma.chat_room_participantsWhereUniqueInput[];
    connect?: Prisma.chat_room_participantsWhereUniqueInput | Prisma.chat_room_participantsWhereUniqueInput[];
    update?: Prisma.chat_room_participantsUpdateWithWhereUniqueWithoutChat_roomsInput | Prisma.chat_room_participantsUpdateWithWhereUniqueWithoutChat_roomsInput[];
    updateMany?: Prisma.chat_room_participantsUpdateManyWithWhereWithoutChat_roomsInput | Prisma.chat_room_participantsUpdateManyWithWhereWithoutChat_roomsInput[];
    deleteMany?: Prisma.chat_room_participantsScalarWhereInput | Prisma.chat_room_participantsScalarWhereInput[];
};
export type chat_room_participantsCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.chat_room_participantsCreateWithoutUsersInput, Prisma.chat_room_participantsUncheckedCreateWithoutUsersInput> | Prisma.chat_room_participantsCreateWithoutUsersInput[] | Prisma.chat_room_participantsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.chat_room_participantsCreateOrConnectWithoutUsersInput | Prisma.chat_room_participantsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.chat_room_participantsCreateManyUsersInputEnvelope;
    connect?: Prisma.chat_room_participantsWhereUniqueInput | Prisma.chat_room_participantsWhereUniqueInput[];
};
export type chat_room_participantsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.chat_room_participantsCreateWithoutUsersInput, Prisma.chat_room_participantsUncheckedCreateWithoutUsersInput> | Prisma.chat_room_participantsCreateWithoutUsersInput[] | Prisma.chat_room_participantsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.chat_room_participantsCreateOrConnectWithoutUsersInput | Prisma.chat_room_participantsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.chat_room_participantsCreateManyUsersInputEnvelope;
    connect?: Prisma.chat_room_participantsWhereUniqueInput | Prisma.chat_room_participantsWhereUniqueInput[];
};
export type chat_room_participantsUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.chat_room_participantsCreateWithoutUsersInput, Prisma.chat_room_participantsUncheckedCreateWithoutUsersInput> | Prisma.chat_room_participantsCreateWithoutUsersInput[] | Prisma.chat_room_participantsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.chat_room_participantsCreateOrConnectWithoutUsersInput | Prisma.chat_room_participantsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.chat_room_participantsUpsertWithWhereUniqueWithoutUsersInput | Prisma.chat_room_participantsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.chat_room_participantsCreateManyUsersInputEnvelope;
    set?: Prisma.chat_room_participantsWhereUniqueInput | Prisma.chat_room_participantsWhereUniqueInput[];
    disconnect?: Prisma.chat_room_participantsWhereUniqueInput | Prisma.chat_room_participantsWhereUniqueInput[];
    delete?: Prisma.chat_room_participantsWhereUniqueInput | Prisma.chat_room_participantsWhereUniqueInput[];
    connect?: Prisma.chat_room_participantsWhereUniqueInput | Prisma.chat_room_participantsWhereUniqueInput[];
    update?: Prisma.chat_room_participantsUpdateWithWhereUniqueWithoutUsersInput | Prisma.chat_room_participantsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.chat_room_participantsUpdateManyWithWhereWithoutUsersInput | Prisma.chat_room_participantsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.chat_room_participantsScalarWhereInput | Prisma.chat_room_participantsScalarWhereInput[];
};
export type chat_room_participantsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.chat_room_participantsCreateWithoutUsersInput, Prisma.chat_room_participantsUncheckedCreateWithoutUsersInput> | Prisma.chat_room_participantsCreateWithoutUsersInput[] | Prisma.chat_room_participantsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.chat_room_participantsCreateOrConnectWithoutUsersInput | Prisma.chat_room_participantsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.chat_room_participantsUpsertWithWhereUniqueWithoutUsersInput | Prisma.chat_room_participantsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.chat_room_participantsCreateManyUsersInputEnvelope;
    set?: Prisma.chat_room_participantsWhereUniqueInput | Prisma.chat_room_participantsWhereUniqueInput[];
    disconnect?: Prisma.chat_room_participantsWhereUniqueInput | Prisma.chat_room_participantsWhereUniqueInput[];
    delete?: Prisma.chat_room_participantsWhereUniqueInput | Prisma.chat_room_participantsWhereUniqueInput[];
    connect?: Prisma.chat_room_participantsWhereUniqueInput | Prisma.chat_room_participantsWhereUniqueInput[];
    update?: Prisma.chat_room_participantsUpdateWithWhereUniqueWithoutUsersInput | Prisma.chat_room_participantsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.chat_room_participantsUpdateManyWithWhereWithoutUsersInput | Prisma.chat_room_participantsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.chat_room_participantsScalarWhereInput | Prisma.chat_room_participantsScalarWhereInput[];
};
export type chat_room_participantsCreateWithoutChat_roomsInput = {
    user_role: string;
    joined_at?: Date | string | null;
    users: Prisma.usersCreateNestedOneWithoutChat_room_participantsInput;
};
export type chat_room_participantsUncheckedCreateWithoutChat_roomsInput = {
    user_uid: string;
    user_role: string;
    joined_at?: Date | string | null;
};
export type chat_room_participantsCreateOrConnectWithoutChat_roomsInput = {
    where: Prisma.chat_room_participantsWhereUniqueInput;
    create: Prisma.XOR<Prisma.chat_room_participantsCreateWithoutChat_roomsInput, Prisma.chat_room_participantsUncheckedCreateWithoutChat_roomsInput>;
};
export type chat_room_participantsCreateManyChat_roomsInputEnvelope = {
    data: Prisma.chat_room_participantsCreateManyChat_roomsInput | Prisma.chat_room_participantsCreateManyChat_roomsInput[];
    skipDuplicates?: boolean;
};
export type chat_room_participantsUpsertWithWhereUniqueWithoutChat_roomsInput = {
    where: Prisma.chat_room_participantsWhereUniqueInput;
    update: Prisma.XOR<Prisma.chat_room_participantsUpdateWithoutChat_roomsInput, Prisma.chat_room_participantsUncheckedUpdateWithoutChat_roomsInput>;
    create: Prisma.XOR<Prisma.chat_room_participantsCreateWithoutChat_roomsInput, Prisma.chat_room_participantsUncheckedCreateWithoutChat_roomsInput>;
};
export type chat_room_participantsUpdateWithWhereUniqueWithoutChat_roomsInput = {
    where: Prisma.chat_room_participantsWhereUniqueInput;
    data: Prisma.XOR<Prisma.chat_room_participantsUpdateWithoutChat_roomsInput, Prisma.chat_room_participantsUncheckedUpdateWithoutChat_roomsInput>;
};
export type chat_room_participantsUpdateManyWithWhereWithoutChat_roomsInput = {
    where: Prisma.chat_room_participantsScalarWhereInput;
    data: Prisma.XOR<Prisma.chat_room_participantsUpdateManyMutationInput, Prisma.chat_room_participantsUncheckedUpdateManyWithoutChat_roomsInput>;
};
export type chat_room_participantsScalarWhereInput = {
    AND?: Prisma.chat_room_participantsScalarWhereInput | Prisma.chat_room_participantsScalarWhereInput[];
    OR?: Prisma.chat_room_participantsScalarWhereInput[];
    NOT?: Prisma.chat_room_participantsScalarWhereInput | Prisma.chat_room_participantsScalarWhereInput[];
    room_id?: Prisma.UuidFilter<"chat_room_participants"> | string;
    user_uid?: Prisma.StringFilter<"chat_room_participants"> | string;
    user_role?: Prisma.StringFilter<"chat_room_participants"> | string;
    joined_at?: Prisma.DateTimeNullableFilter<"chat_room_participants"> | Date | string | null;
};
export type chat_room_participantsCreateWithoutUsersInput = {
    user_role: string;
    joined_at?: Date | string | null;
    chat_rooms: Prisma.chat_roomsCreateNestedOneWithoutChat_room_participantsInput;
};
export type chat_room_participantsUncheckedCreateWithoutUsersInput = {
    room_id: string;
    user_role: string;
    joined_at?: Date | string | null;
};
export type chat_room_participantsCreateOrConnectWithoutUsersInput = {
    where: Prisma.chat_room_participantsWhereUniqueInput;
    create: Prisma.XOR<Prisma.chat_room_participantsCreateWithoutUsersInput, Prisma.chat_room_participantsUncheckedCreateWithoutUsersInput>;
};
export type chat_room_participantsCreateManyUsersInputEnvelope = {
    data: Prisma.chat_room_participantsCreateManyUsersInput | Prisma.chat_room_participantsCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type chat_room_participantsUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.chat_room_participantsWhereUniqueInput;
    update: Prisma.XOR<Prisma.chat_room_participantsUpdateWithoutUsersInput, Prisma.chat_room_participantsUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.chat_room_participantsCreateWithoutUsersInput, Prisma.chat_room_participantsUncheckedCreateWithoutUsersInput>;
};
export type chat_room_participantsUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.chat_room_participantsWhereUniqueInput;
    data: Prisma.XOR<Prisma.chat_room_participantsUpdateWithoutUsersInput, Prisma.chat_room_participantsUncheckedUpdateWithoutUsersInput>;
};
export type chat_room_participantsUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.chat_room_participantsScalarWhereInput;
    data: Prisma.XOR<Prisma.chat_room_participantsUpdateManyMutationInput, Prisma.chat_room_participantsUncheckedUpdateManyWithoutUsersInput>;
};
export type chat_room_participantsCreateManyChat_roomsInput = {
    user_uid: string;
    user_role: string;
    joined_at?: Date | string | null;
};
export type chat_room_participantsUpdateWithoutChat_roomsInput = {
    user_role?: Prisma.StringFieldUpdateOperationsInput | string;
    joined_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    users?: Prisma.usersUpdateOneRequiredWithoutChat_room_participantsNestedInput;
};
export type chat_room_participantsUncheckedUpdateWithoutChat_roomsInput = {
    user_uid?: Prisma.StringFieldUpdateOperationsInput | string;
    user_role?: Prisma.StringFieldUpdateOperationsInput | string;
    joined_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type chat_room_participantsUncheckedUpdateManyWithoutChat_roomsInput = {
    user_uid?: Prisma.StringFieldUpdateOperationsInput | string;
    user_role?: Prisma.StringFieldUpdateOperationsInput | string;
    joined_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type chat_room_participantsCreateManyUsersInput = {
    room_id: string;
    user_role: string;
    joined_at?: Date | string | null;
};
export type chat_room_participantsUpdateWithoutUsersInput = {
    user_role?: Prisma.StringFieldUpdateOperationsInput | string;
    joined_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    chat_rooms?: Prisma.chat_roomsUpdateOneRequiredWithoutChat_room_participantsNestedInput;
};
export type chat_room_participantsUncheckedUpdateWithoutUsersInput = {
    room_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_role?: Prisma.StringFieldUpdateOperationsInput | string;
    joined_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type chat_room_participantsUncheckedUpdateManyWithoutUsersInput = {
    room_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_role?: Prisma.StringFieldUpdateOperationsInput | string;
    joined_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type chat_room_participantsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    room_id?: boolean;
    user_uid?: boolean;
    user_role?: boolean;
    joined_at?: boolean;
    chat_rooms?: boolean | Prisma.chat_roomsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["chat_room_participants"]>;
export type chat_room_participantsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    room_id?: boolean;
    user_uid?: boolean;
    user_role?: boolean;
    joined_at?: boolean;
    chat_rooms?: boolean | Prisma.chat_roomsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["chat_room_participants"]>;
export type chat_room_participantsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    room_id?: boolean;
    user_uid?: boolean;
    user_role?: boolean;
    joined_at?: boolean;
    chat_rooms?: boolean | Prisma.chat_roomsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["chat_room_participants"]>;
export type chat_room_participantsSelectScalar = {
    room_id?: boolean;
    user_uid?: boolean;
    user_role?: boolean;
    joined_at?: boolean;
};
export type chat_room_participantsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"room_id" | "user_uid" | "user_role" | "joined_at", ExtArgs["result"]["chat_room_participants"]>;
export type chat_room_participantsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    chat_rooms?: boolean | Prisma.chat_roomsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type chat_room_participantsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    chat_rooms?: boolean | Prisma.chat_roomsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type chat_room_participantsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    chat_rooms?: boolean | Prisma.chat_roomsDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $chat_room_participantsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "chat_room_participants";
    objects: {
        chat_rooms: Prisma.$chat_roomsPayload<ExtArgs>;
        users: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        room_id: string;
        user_uid: string;
        user_role: string;
        joined_at: Date | null;
    }, ExtArgs["result"]["chat_room_participants"]>;
    composites: {};
};
export type chat_room_participantsGetPayload<S extends boolean | null | undefined | chat_room_participantsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$chat_room_participantsPayload, S>;
export type chat_room_participantsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<chat_room_participantsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Chat_room_participantsCountAggregateInputType | true;
};
export interface chat_room_participantsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['chat_room_participants'];
        meta: {
            name: 'chat_room_participants';
        };
    };
    findUnique<T extends chat_room_participantsFindUniqueArgs>(args: Prisma.SelectSubset<T, chat_room_participantsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__chat_room_participantsClient<runtime.Types.Result.GetResult<Prisma.$chat_room_participantsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends chat_room_participantsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, chat_room_participantsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__chat_room_participantsClient<runtime.Types.Result.GetResult<Prisma.$chat_room_participantsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends chat_room_participantsFindFirstArgs>(args?: Prisma.SelectSubset<T, chat_room_participantsFindFirstArgs<ExtArgs>>): Prisma.Prisma__chat_room_participantsClient<runtime.Types.Result.GetResult<Prisma.$chat_room_participantsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends chat_room_participantsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, chat_room_participantsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__chat_room_participantsClient<runtime.Types.Result.GetResult<Prisma.$chat_room_participantsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends chat_room_participantsFindManyArgs>(args?: Prisma.SelectSubset<T, chat_room_participantsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$chat_room_participantsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends chat_room_participantsCreateArgs>(args: Prisma.SelectSubset<T, chat_room_participantsCreateArgs<ExtArgs>>): Prisma.Prisma__chat_room_participantsClient<runtime.Types.Result.GetResult<Prisma.$chat_room_participantsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends chat_room_participantsCreateManyArgs>(args?: Prisma.SelectSubset<T, chat_room_participantsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends chat_room_participantsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, chat_room_participantsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$chat_room_participantsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends chat_room_participantsDeleteArgs>(args: Prisma.SelectSubset<T, chat_room_participantsDeleteArgs<ExtArgs>>): Prisma.Prisma__chat_room_participantsClient<runtime.Types.Result.GetResult<Prisma.$chat_room_participantsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends chat_room_participantsUpdateArgs>(args: Prisma.SelectSubset<T, chat_room_participantsUpdateArgs<ExtArgs>>): Prisma.Prisma__chat_room_participantsClient<runtime.Types.Result.GetResult<Prisma.$chat_room_participantsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends chat_room_participantsDeleteManyArgs>(args?: Prisma.SelectSubset<T, chat_room_participantsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends chat_room_participantsUpdateManyArgs>(args: Prisma.SelectSubset<T, chat_room_participantsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends chat_room_participantsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, chat_room_participantsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$chat_room_participantsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends chat_room_participantsUpsertArgs>(args: Prisma.SelectSubset<T, chat_room_participantsUpsertArgs<ExtArgs>>): Prisma.Prisma__chat_room_participantsClient<runtime.Types.Result.GetResult<Prisma.$chat_room_participantsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends chat_room_participantsCountArgs>(args?: Prisma.Subset<T, chat_room_participantsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Chat_room_participantsCountAggregateOutputType> : number>;
    aggregate<T extends Chat_room_participantsAggregateArgs>(args: Prisma.Subset<T, Chat_room_participantsAggregateArgs>): Prisma.PrismaPromise<GetChat_room_participantsAggregateType<T>>;
    groupBy<T extends chat_room_participantsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: chat_room_participantsGroupByArgs['orderBy'];
    } : {
        orderBy?: chat_room_participantsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, chat_room_participantsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChat_room_participantsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: chat_room_participantsFieldRefs;
}
export interface Prisma__chat_room_participantsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    chat_rooms<T extends Prisma.chat_roomsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.chat_roomsDefaultArgs<ExtArgs>>): Prisma.Prisma__chat_roomsClient<runtime.Types.Result.GetResult<Prisma.$chat_roomsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    users<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface chat_room_participantsFieldRefs {
    readonly room_id: Prisma.FieldRef<"chat_room_participants", 'String'>;
    readonly user_uid: Prisma.FieldRef<"chat_room_participants", 'String'>;
    readonly user_role: Prisma.FieldRef<"chat_room_participants", 'String'>;
    readonly joined_at: Prisma.FieldRef<"chat_room_participants", 'DateTime'>;
}
export type chat_room_participantsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_room_participantsSelect<ExtArgs> | null;
    omit?: Prisma.chat_room_participantsOmit<ExtArgs> | null;
    include?: Prisma.chat_room_participantsInclude<ExtArgs> | null;
    where: Prisma.chat_room_participantsWhereUniqueInput;
};
export type chat_room_participantsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_room_participantsSelect<ExtArgs> | null;
    omit?: Prisma.chat_room_participantsOmit<ExtArgs> | null;
    include?: Prisma.chat_room_participantsInclude<ExtArgs> | null;
    where: Prisma.chat_room_participantsWhereUniqueInput;
};
export type chat_room_participantsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_room_participantsSelect<ExtArgs> | null;
    omit?: Prisma.chat_room_participantsOmit<ExtArgs> | null;
    include?: Prisma.chat_room_participantsInclude<ExtArgs> | null;
    where?: Prisma.chat_room_participantsWhereInput;
    orderBy?: Prisma.chat_room_participantsOrderByWithRelationInput | Prisma.chat_room_participantsOrderByWithRelationInput[];
    cursor?: Prisma.chat_room_participantsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Chat_room_participantsScalarFieldEnum | Prisma.Chat_room_participantsScalarFieldEnum[];
};
export type chat_room_participantsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_room_participantsSelect<ExtArgs> | null;
    omit?: Prisma.chat_room_participantsOmit<ExtArgs> | null;
    include?: Prisma.chat_room_participantsInclude<ExtArgs> | null;
    where?: Prisma.chat_room_participantsWhereInput;
    orderBy?: Prisma.chat_room_participantsOrderByWithRelationInput | Prisma.chat_room_participantsOrderByWithRelationInput[];
    cursor?: Prisma.chat_room_participantsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Chat_room_participantsScalarFieldEnum | Prisma.Chat_room_participantsScalarFieldEnum[];
};
export type chat_room_participantsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_room_participantsSelect<ExtArgs> | null;
    omit?: Prisma.chat_room_participantsOmit<ExtArgs> | null;
    include?: Prisma.chat_room_participantsInclude<ExtArgs> | null;
    where?: Prisma.chat_room_participantsWhereInput;
    orderBy?: Prisma.chat_room_participantsOrderByWithRelationInput | Prisma.chat_room_participantsOrderByWithRelationInput[];
    cursor?: Prisma.chat_room_participantsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Chat_room_participantsScalarFieldEnum | Prisma.Chat_room_participantsScalarFieldEnum[];
};
export type chat_room_participantsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_room_participantsSelect<ExtArgs> | null;
    omit?: Prisma.chat_room_participantsOmit<ExtArgs> | null;
    include?: Prisma.chat_room_participantsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.chat_room_participantsCreateInput, Prisma.chat_room_participantsUncheckedCreateInput>;
};
export type chat_room_participantsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.chat_room_participantsCreateManyInput | Prisma.chat_room_participantsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type chat_room_participantsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_room_participantsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.chat_room_participantsOmit<ExtArgs> | null;
    data: Prisma.chat_room_participantsCreateManyInput | Prisma.chat_room_participantsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.chat_room_participantsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type chat_room_participantsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_room_participantsSelect<ExtArgs> | null;
    omit?: Prisma.chat_room_participantsOmit<ExtArgs> | null;
    include?: Prisma.chat_room_participantsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.chat_room_participantsUpdateInput, Prisma.chat_room_participantsUncheckedUpdateInput>;
    where: Prisma.chat_room_participantsWhereUniqueInput;
};
export type chat_room_participantsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.chat_room_participantsUpdateManyMutationInput, Prisma.chat_room_participantsUncheckedUpdateManyInput>;
    where?: Prisma.chat_room_participantsWhereInput;
    limit?: number;
};
export type chat_room_participantsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_room_participantsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.chat_room_participantsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.chat_room_participantsUpdateManyMutationInput, Prisma.chat_room_participantsUncheckedUpdateManyInput>;
    where?: Prisma.chat_room_participantsWhereInput;
    limit?: number;
    include?: Prisma.chat_room_participantsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type chat_room_participantsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_room_participantsSelect<ExtArgs> | null;
    omit?: Prisma.chat_room_participantsOmit<ExtArgs> | null;
    include?: Prisma.chat_room_participantsInclude<ExtArgs> | null;
    where: Prisma.chat_room_participantsWhereUniqueInput;
    create: Prisma.XOR<Prisma.chat_room_participantsCreateInput, Prisma.chat_room_participantsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.chat_room_participantsUpdateInput, Prisma.chat_room_participantsUncheckedUpdateInput>;
};
export type chat_room_participantsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_room_participantsSelect<ExtArgs> | null;
    omit?: Prisma.chat_room_participantsOmit<ExtArgs> | null;
    include?: Prisma.chat_room_participantsInclude<ExtArgs> | null;
    where: Prisma.chat_room_participantsWhereUniqueInput;
};
export type chat_room_participantsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.chat_room_participantsWhereInput;
    limit?: number;
};
export type chat_room_participantsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_room_participantsSelect<ExtArgs> | null;
    omit?: Prisma.chat_room_participantsOmit<ExtArgs> | null;
    include?: Prisma.chat_room_participantsInclude<ExtArgs> | null;
};
