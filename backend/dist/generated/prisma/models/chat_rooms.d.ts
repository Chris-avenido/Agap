import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type chat_roomsModel = runtime.Types.Result.DefaultSelection<Prisma.$chat_roomsPayload>;
export type AggregateChat_rooms = {
    _count: Chat_roomsCountAggregateOutputType | null;
    _min: Chat_roomsMinAggregateOutputType | null;
    _max: Chat_roomsMaxAggregateOutputType | null;
};
export type Chat_roomsMinAggregateOutputType = {
    id: string | null;
    room_type: string | null;
    region: string | null;
    division: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Chat_roomsMaxAggregateOutputType = {
    id: string | null;
    room_type: string | null;
    region: string | null;
    division: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};
export type Chat_roomsCountAggregateOutputType = {
    id: number;
    room_type: number;
    region: number;
    division: number;
    created_at: number;
    updated_at: number;
    _all: number;
};
export type Chat_roomsMinAggregateInputType = {
    id?: true;
    room_type?: true;
    region?: true;
    division?: true;
    created_at?: true;
    updated_at?: true;
};
export type Chat_roomsMaxAggregateInputType = {
    id?: true;
    room_type?: true;
    region?: true;
    division?: true;
    created_at?: true;
    updated_at?: true;
};
export type Chat_roomsCountAggregateInputType = {
    id?: true;
    room_type?: true;
    region?: true;
    division?: true;
    created_at?: true;
    updated_at?: true;
    _all?: true;
};
export type Chat_roomsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.chat_roomsWhereInput;
    orderBy?: Prisma.chat_roomsOrderByWithRelationInput | Prisma.chat_roomsOrderByWithRelationInput[];
    cursor?: Prisma.chat_roomsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Chat_roomsCountAggregateInputType;
    _min?: Chat_roomsMinAggregateInputType;
    _max?: Chat_roomsMaxAggregateInputType;
};
export type GetChat_roomsAggregateType<T extends Chat_roomsAggregateArgs> = {
    [P in keyof T & keyof AggregateChat_rooms]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateChat_rooms[P]> : Prisma.GetScalarType<T[P], AggregateChat_rooms[P]>;
};
export type chat_roomsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.chat_roomsWhereInput;
    orderBy?: Prisma.chat_roomsOrderByWithAggregationInput | Prisma.chat_roomsOrderByWithAggregationInput[];
    by: Prisma.Chat_roomsScalarFieldEnum[] | Prisma.Chat_roomsScalarFieldEnum;
    having?: Prisma.chat_roomsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Chat_roomsCountAggregateInputType | true;
    _min?: Chat_roomsMinAggregateInputType;
    _max?: Chat_roomsMaxAggregateInputType;
};
export type Chat_roomsGroupByOutputType = {
    id: string;
    room_type: string;
    region: string | null;
    division: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    _count: Chat_roomsCountAggregateOutputType | null;
    _min: Chat_roomsMinAggregateOutputType | null;
    _max: Chat_roomsMaxAggregateOutputType | null;
};
export type GetChat_roomsGroupByPayload<T extends chat_roomsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Chat_roomsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Chat_roomsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Chat_roomsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Chat_roomsGroupByOutputType[P]>;
}>>;
export type chat_roomsWhereInput = {
    AND?: Prisma.chat_roomsWhereInput | Prisma.chat_roomsWhereInput[];
    OR?: Prisma.chat_roomsWhereInput[];
    NOT?: Prisma.chat_roomsWhereInput | Prisma.chat_roomsWhereInput[];
    id?: Prisma.UuidFilter<"chat_rooms"> | string;
    room_type?: Prisma.StringFilter<"chat_rooms"> | string;
    region?: Prisma.StringNullableFilter<"chat_rooms"> | string | null;
    division?: Prisma.StringNullableFilter<"chat_rooms"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"chat_rooms"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"chat_rooms"> | Date | string | null;
    chat_messages?: Prisma.Chat_messagesListRelationFilter;
    chat_room_participants?: Prisma.Chat_room_participantsListRelationFilter;
};
export type chat_roomsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    room_type?: Prisma.SortOrder;
    region?: Prisma.SortOrderInput | Prisma.SortOrder;
    division?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    chat_messages?: Prisma.chat_messagesOrderByRelationAggregateInput;
    chat_room_participants?: Prisma.chat_room_participantsOrderByRelationAggregateInput;
};
export type chat_roomsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.chat_roomsWhereInput | Prisma.chat_roomsWhereInput[];
    OR?: Prisma.chat_roomsWhereInput[];
    NOT?: Prisma.chat_roomsWhereInput | Prisma.chat_roomsWhereInput[];
    room_type?: Prisma.StringFilter<"chat_rooms"> | string;
    region?: Prisma.StringNullableFilter<"chat_rooms"> | string | null;
    division?: Prisma.StringNullableFilter<"chat_rooms"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"chat_rooms"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableFilter<"chat_rooms"> | Date | string | null;
    chat_messages?: Prisma.Chat_messagesListRelationFilter;
    chat_room_participants?: Prisma.Chat_room_participantsListRelationFilter;
}, "id">;
export type chat_roomsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    room_type?: Prisma.SortOrder;
    region?: Prisma.SortOrderInput | Prisma.SortOrder;
    division?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.chat_roomsCountOrderByAggregateInput;
    _max?: Prisma.chat_roomsMaxOrderByAggregateInput;
    _min?: Prisma.chat_roomsMinOrderByAggregateInput;
};
export type chat_roomsScalarWhereWithAggregatesInput = {
    AND?: Prisma.chat_roomsScalarWhereWithAggregatesInput | Prisma.chat_roomsScalarWhereWithAggregatesInput[];
    OR?: Prisma.chat_roomsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.chat_roomsScalarWhereWithAggregatesInput | Prisma.chat_roomsScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"chat_rooms"> | string;
    room_type?: Prisma.StringWithAggregatesFilter<"chat_rooms"> | string;
    region?: Prisma.StringNullableWithAggregatesFilter<"chat_rooms"> | string | null;
    division?: Prisma.StringNullableWithAggregatesFilter<"chat_rooms"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"chat_rooms"> | Date | string | null;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"chat_rooms"> | Date | string | null;
};
export type chat_roomsCreateInput = {
    id?: string;
    room_type?: string;
    region?: string | null;
    division?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    chat_messages?: Prisma.chat_messagesCreateNestedManyWithoutChat_roomsInput;
    chat_room_participants?: Prisma.chat_room_participantsCreateNestedManyWithoutChat_roomsInput;
};
export type chat_roomsUncheckedCreateInput = {
    id?: string;
    room_type?: string;
    region?: string | null;
    division?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    chat_messages?: Prisma.chat_messagesUncheckedCreateNestedManyWithoutChat_roomsInput;
    chat_room_participants?: Prisma.chat_room_participantsUncheckedCreateNestedManyWithoutChat_roomsInput;
};
export type chat_roomsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    room_type?: Prisma.StringFieldUpdateOperationsInput | string;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    chat_messages?: Prisma.chat_messagesUpdateManyWithoutChat_roomsNestedInput;
    chat_room_participants?: Prisma.chat_room_participantsUpdateManyWithoutChat_roomsNestedInput;
};
export type chat_roomsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    room_type?: Prisma.StringFieldUpdateOperationsInput | string;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    chat_messages?: Prisma.chat_messagesUncheckedUpdateManyWithoutChat_roomsNestedInput;
    chat_room_participants?: Prisma.chat_room_participantsUncheckedUpdateManyWithoutChat_roomsNestedInput;
};
export type chat_roomsCreateManyInput = {
    id?: string;
    room_type?: string;
    region?: string | null;
    division?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
};
export type chat_roomsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    room_type?: Prisma.StringFieldUpdateOperationsInput | string;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type chat_roomsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    room_type?: Prisma.StringFieldUpdateOperationsInput | string;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type Chat_roomsNullableScalarRelationFilter = {
    is?: Prisma.chat_roomsWhereInput | null;
    isNot?: Prisma.chat_roomsWhereInput | null;
};
export type Chat_roomsScalarRelationFilter = {
    is?: Prisma.chat_roomsWhereInput;
    isNot?: Prisma.chat_roomsWhereInput;
};
export type chat_roomsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    room_type?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type chat_roomsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    room_type?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type chat_roomsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    room_type?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    division?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
};
export type chat_roomsCreateNestedOneWithoutChat_messagesInput = {
    create?: Prisma.XOR<Prisma.chat_roomsCreateWithoutChat_messagesInput, Prisma.chat_roomsUncheckedCreateWithoutChat_messagesInput>;
    connectOrCreate?: Prisma.chat_roomsCreateOrConnectWithoutChat_messagesInput;
    connect?: Prisma.chat_roomsWhereUniqueInput;
};
export type chat_roomsUpdateOneWithoutChat_messagesNestedInput = {
    create?: Prisma.XOR<Prisma.chat_roomsCreateWithoutChat_messagesInput, Prisma.chat_roomsUncheckedCreateWithoutChat_messagesInput>;
    connectOrCreate?: Prisma.chat_roomsCreateOrConnectWithoutChat_messagesInput;
    upsert?: Prisma.chat_roomsUpsertWithoutChat_messagesInput;
    disconnect?: Prisma.chat_roomsWhereInput | boolean;
    delete?: Prisma.chat_roomsWhereInput | boolean;
    connect?: Prisma.chat_roomsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.chat_roomsUpdateToOneWithWhereWithoutChat_messagesInput, Prisma.chat_roomsUpdateWithoutChat_messagesInput>, Prisma.chat_roomsUncheckedUpdateWithoutChat_messagesInput>;
};
export type chat_roomsCreateNestedOneWithoutChat_room_participantsInput = {
    create?: Prisma.XOR<Prisma.chat_roomsCreateWithoutChat_room_participantsInput, Prisma.chat_roomsUncheckedCreateWithoutChat_room_participantsInput>;
    connectOrCreate?: Prisma.chat_roomsCreateOrConnectWithoutChat_room_participantsInput;
    connect?: Prisma.chat_roomsWhereUniqueInput;
};
export type chat_roomsUpdateOneRequiredWithoutChat_room_participantsNestedInput = {
    create?: Prisma.XOR<Prisma.chat_roomsCreateWithoutChat_room_participantsInput, Prisma.chat_roomsUncheckedCreateWithoutChat_room_participantsInput>;
    connectOrCreate?: Prisma.chat_roomsCreateOrConnectWithoutChat_room_participantsInput;
    upsert?: Prisma.chat_roomsUpsertWithoutChat_room_participantsInput;
    connect?: Prisma.chat_roomsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.chat_roomsUpdateToOneWithWhereWithoutChat_room_participantsInput, Prisma.chat_roomsUpdateWithoutChat_room_participantsInput>, Prisma.chat_roomsUncheckedUpdateWithoutChat_room_participantsInput>;
};
export type chat_roomsCreateWithoutChat_messagesInput = {
    id?: string;
    room_type?: string;
    region?: string | null;
    division?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    chat_room_participants?: Prisma.chat_room_participantsCreateNestedManyWithoutChat_roomsInput;
};
export type chat_roomsUncheckedCreateWithoutChat_messagesInput = {
    id?: string;
    room_type?: string;
    region?: string | null;
    division?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    chat_room_participants?: Prisma.chat_room_participantsUncheckedCreateNestedManyWithoutChat_roomsInput;
};
export type chat_roomsCreateOrConnectWithoutChat_messagesInput = {
    where: Prisma.chat_roomsWhereUniqueInput;
    create: Prisma.XOR<Prisma.chat_roomsCreateWithoutChat_messagesInput, Prisma.chat_roomsUncheckedCreateWithoutChat_messagesInput>;
};
export type chat_roomsUpsertWithoutChat_messagesInput = {
    update: Prisma.XOR<Prisma.chat_roomsUpdateWithoutChat_messagesInput, Prisma.chat_roomsUncheckedUpdateWithoutChat_messagesInput>;
    create: Prisma.XOR<Prisma.chat_roomsCreateWithoutChat_messagesInput, Prisma.chat_roomsUncheckedCreateWithoutChat_messagesInput>;
    where?: Prisma.chat_roomsWhereInput;
};
export type chat_roomsUpdateToOneWithWhereWithoutChat_messagesInput = {
    where?: Prisma.chat_roomsWhereInput;
    data: Prisma.XOR<Prisma.chat_roomsUpdateWithoutChat_messagesInput, Prisma.chat_roomsUncheckedUpdateWithoutChat_messagesInput>;
};
export type chat_roomsUpdateWithoutChat_messagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    room_type?: Prisma.StringFieldUpdateOperationsInput | string;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    chat_room_participants?: Prisma.chat_room_participantsUpdateManyWithoutChat_roomsNestedInput;
};
export type chat_roomsUncheckedUpdateWithoutChat_messagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    room_type?: Prisma.StringFieldUpdateOperationsInput | string;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    chat_room_participants?: Prisma.chat_room_participantsUncheckedUpdateManyWithoutChat_roomsNestedInput;
};
export type chat_roomsCreateWithoutChat_room_participantsInput = {
    id?: string;
    room_type?: string;
    region?: string | null;
    division?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    chat_messages?: Prisma.chat_messagesCreateNestedManyWithoutChat_roomsInput;
};
export type chat_roomsUncheckedCreateWithoutChat_room_participantsInput = {
    id?: string;
    room_type?: string;
    region?: string | null;
    division?: string | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    chat_messages?: Prisma.chat_messagesUncheckedCreateNestedManyWithoutChat_roomsInput;
};
export type chat_roomsCreateOrConnectWithoutChat_room_participantsInput = {
    where: Prisma.chat_roomsWhereUniqueInput;
    create: Prisma.XOR<Prisma.chat_roomsCreateWithoutChat_room_participantsInput, Prisma.chat_roomsUncheckedCreateWithoutChat_room_participantsInput>;
};
export type chat_roomsUpsertWithoutChat_room_participantsInput = {
    update: Prisma.XOR<Prisma.chat_roomsUpdateWithoutChat_room_participantsInput, Prisma.chat_roomsUncheckedUpdateWithoutChat_room_participantsInput>;
    create: Prisma.XOR<Prisma.chat_roomsCreateWithoutChat_room_participantsInput, Prisma.chat_roomsUncheckedCreateWithoutChat_room_participantsInput>;
    where?: Prisma.chat_roomsWhereInput;
};
export type chat_roomsUpdateToOneWithWhereWithoutChat_room_participantsInput = {
    where?: Prisma.chat_roomsWhereInput;
    data: Prisma.XOR<Prisma.chat_roomsUpdateWithoutChat_room_participantsInput, Prisma.chat_roomsUncheckedUpdateWithoutChat_room_participantsInput>;
};
export type chat_roomsUpdateWithoutChat_room_participantsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    room_type?: Prisma.StringFieldUpdateOperationsInput | string;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    chat_messages?: Prisma.chat_messagesUpdateManyWithoutChat_roomsNestedInput;
};
export type chat_roomsUncheckedUpdateWithoutChat_room_participantsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    room_type?: Prisma.StringFieldUpdateOperationsInput | string;
    region?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    division?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    chat_messages?: Prisma.chat_messagesUncheckedUpdateManyWithoutChat_roomsNestedInput;
};
export type Chat_roomsCountOutputType = {
    chat_messages: number;
    chat_room_participants: number;
};
export type Chat_roomsCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    chat_messages?: boolean | Chat_roomsCountOutputTypeCountChat_messagesArgs;
    chat_room_participants?: boolean | Chat_roomsCountOutputTypeCountChat_room_participantsArgs;
};
export type Chat_roomsCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.Chat_roomsCountOutputTypeSelect<ExtArgs> | null;
};
export type Chat_roomsCountOutputTypeCountChat_messagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.chat_messagesWhereInput;
};
export type Chat_roomsCountOutputTypeCountChat_room_participantsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.chat_room_participantsWhereInput;
};
export type chat_roomsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    room_type?: boolean;
    region?: boolean;
    division?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    chat_messages?: boolean | Prisma.chat_rooms$chat_messagesArgs<ExtArgs>;
    chat_room_participants?: boolean | Prisma.chat_rooms$chat_room_participantsArgs<ExtArgs>;
    _count?: boolean | Prisma.Chat_roomsCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["chat_rooms"]>;
export type chat_roomsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    room_type?: boolean;
    region?: boolean;
    division?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["chat_rooms"]>;
export type chat_roomsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    room_type?: boolean;
    region?: boolean;
    division?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
}, ExtArgs["result"]["chat_rooms"]>;
export type chat_roomsSelectScalar = {
    id?: boolean;
    room_type?: boolean;
    region?: boolean;
    division?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
};
export type chat_roomsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "room_type" | "region" | "division" | "created_at" | "updated_at", ExtArgs["result"]["chat_rooms"]>;
export type chat_roomsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    chat_messages?: boolean | Prisma.chat_rooms$chat_messagesArgs<ExtArgs>;
    chat_room_participants?: boolean | Prisma.chat_rooms$chat_room_participantsArgs<ExtArgs>;
    _count?: boolean | Prisma.Chat_roomsCountOutputTypeDefaultArgs<ExtArgs>;
};
export type chat_roomsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type chat_roomsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $chat_roomsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "chat_rooms";
    objects: {
        chat_messages: Prisma.$chat_messagesPayload<ExtArgs>[];
        chat_room_participants: Prisma.$chat_room_participantsPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        room_type: string;
        region: string | null;
        division: string | null;
        created_at: Date | null;
        updated_at: Date | null;
    }, ExtArgs["result"]["chat_rooms"]>;
    composites: {};
};
export type chat_roomsGetPayload<S extends boolean | null | undefined | chat_roomsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$chat_roomsPayload, S>;
export type chat_roomsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<chat_roomsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Chat_roomsCountAggregateInputType | true;
};
export interface chat_roomsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['chat_rooms'];
        meta: {
            name: 'chat_rooms';
        };
    };
    findUnique<T extends chat_roomsFindUniqueArgs>(args: Prisma.SelectSubset<T, chat_roomsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__chat_roomsClient<runtime.Types.Result.GetResult<Prisma.$chat_roomsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends chat_roomsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, chat_roomsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__chat_roomsClient<runtime.Types.Result.GetResult<Prisma.$chat_roomsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends chat_roomsFindFirstArgs>(args?: Prisma.SelectSubset<T, chat_roomsFindFirstArgs<ExtArgs>>): Prisma.Prisma__chat_roomsClient<runtime.Types.Result.GetResult<Prisma.$chat_roomsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends chat_roomsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, chat_roomsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__chat_roomsClient<runtime.Types.Result.GetResult<Prisma.$chat_roomsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends chat_roomsFindManyArgs>(args?: Prisma.SelectSubset<T, chat_roomsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$chat_roomsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends chat_roomsCreateArgs>(args: Prisma.SelectSubset<T, chat_roomsCreateArgs<ExtArgs>>): Prisma.Prisma__chat_roomsClient<runtime.Types.Result.GetResult<Prisma.$chat_roomsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends chat_roomsCreateManyArgs>(args?: Prisma.SelectSubset<T, chat_roomsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends chat_roomsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, chat_roomsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$chat_roomsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends chat_roomsDeleteArgs>(args: Prisma.SelectSubset<T, chat_roomsDeleteArgs<ExtArgs>>): Prisma.Prisma__chat_roomsClient<runtime.Types.Result.GetResult<Prisma.$chat_roomsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends chat_roomsUpdateArgs>(args: Prisma.SelectSubset<T, chat_roomsUpdateArgs<ExtArgs>>): Prisma.Prisma__chat_roomsClient<runtime.Types.Result.GetResult<Prisma.$chat_roomsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends chat_roomsDeleteManyArgs>(args?: Prisma.SelectSubset<T, chat_roomsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends chat_roomsUpdateManyArgs>(args: Prisma.SelectSubset<T, chat_roomsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends chat_roomsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, chat_roomsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$chat_roomsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends chat_roomsUpsertArgs>(args: Prisma.SelectSubset<T, chat_roomsUpsertArgs<ExtArgs>>): Prisma.Prisma__chat_roomsClient<runtime.Types.Result.GetResult<Prisma.$chat_roomsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends chat_roomsCountArgs>(args?: Prisma.Subset<T, chat_roomsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Chat_roomsCountAggregateOutputType> : number>;
    aggregate<T extends Chat_roomsAggregateArgs>(args: Prisma.Subset<T, Chat_roomsAggregateArgs>): Prisma.PrismaPromise<GetChat_roomsAggregateType<T>>;
    groupBy<T extends chat_roomsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: chat_roomsGroupByArgs['orderBy'];
    } : {
        orderBy?: chat_roomsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, chat_roomsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChat_roomsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: chat_roomsFieldRefs;
}
export interface Prisma__chat_roomsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    chat_messages<T extends Prisma.chat_rooms$chat_messagesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.chat_rooms$chat_messagesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$chat_messagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    chat_room_participants<T extends Prisma.chat_rooms$chat_room_participantsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.chat_rooms$chat_room_participantsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$chat_room_participantsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface chat_roomsFieldRefs {
    readonly id: Prisma.FieldRef<"chat_rooms", 'String'>;
    readonly room_type: Prisma.FieldRef<"chat_rooms", 'String'>;
    readonly region: Prisma.FieldRef<"chat_rooms", 'String'>;
    readonly division: Prisma.FieldRef<"chat_rooms", 'String'>;
    readonly created_at: Prisma.FieldRef<"chat_rooms", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"chat_rooms", 'DateTime'>;
}
export type chat_roomsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_roomsSelect<ExtArgs> | null;
    omit?: Prisma.chat_roomsOmit<ExtArgs> | null;
    include?: Prisma.chat_roomsInclude<ExtArgs> | null;
    where: Prisma.chat_roomsWhereUniqueInput;
};
export type chat_roomsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_roomsSelect<ExtArgs> | null;
    omit?: Prisma.chat_roomsOmit<ExtArgs> | null;
    include?: Prisma.chat_roomsInclude<ExtArgs> | null;
    where: Prisma.chat_roomsWhereUniqueInput;
};
export type chat_roomsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_roomsSelect<ExtArgs> | null;
    omit?: Prisma.chat_roomsOmit<ExtArgs> | null;
    include?: Prisma.chat_roomsInclude<ExtArgs> | null;
    where?: Prisma.chat_roomsWhereInput;
    orderBy?: Prisma.chat_roomsOrderByWithRelationInput | Prisma.chat_roomsOrderByWithRelationInput[];
    cursor?: Prisma.chat_roomsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Chat_roomsScalarFieldEnum | Prisma.Chat_roomsScalarFieldEnum[];
};
export type chat_roomsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_roomsSelect<ExtArgs> | null;
    omit?: Prisma.chat_roomsOmit<ExtArgs> | null;
    include?: Prisma.chat_roomsInclude<ExtArgs> | null;
    where?: Prisma.chat_roomsWhereInput;
    orderBy?: Prisma.chat_roomsOrderByWithRelationInput | Prisma.chat_roomsOrderByWithRelationInput[];
    cursor?: Prisma.chat_roomsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Chat_roomsScalarFieldEnum | Prisma.Chat_roomsScalarFieldEnum[];
};
export type chat_roomsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_roomsSelect<ExtArgs> | null;
    omit?: Prisma.chat_roomsOmit<ExtArgs> | null;
    include?: Prisma.chat_roomsInclude<ExtArgs> | null;
    where?: Prisma.chat_roomsWhereInput;
    orderBy?: Prisma.chat_roomsOrderByWithRelationInput | Prisma.chat_roomsOrderByWithRelationInput[];
    cursor?: Prisma.chat_roomsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Chat_roomsScalarFieldEnum | Prisma.Chat_roomsScalarFieldEnum[];
};
export type chat_roomsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_roomsSelect<ExtArgs> | null;
    omit?: Prisma.chat_roomsOmit<ExtArgs> | null;
    include?: Prisma.chat_roomsInclude<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.chat_roomsCreateInput, Prisma.chat_roomsUncheckedCreateInput>;
};
export type chat_roomsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.chat_roomsCreateManyInput | Prisma.chat_roomsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type chat_roomsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_roomsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.chat_roomsOmit<ExtArgs> | null;
    data: Prisma.chat_roomsCreateManyInput | Prisma.chat_roomsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type chat_roomsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_roomsSelect<ExtArgs> | null;
    omit?: Prisma.chat_roomsOmit<ExtArgs> | null;
    include?: Prisma.chat_roomsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.chat_roomsUpdateInput, Prisma.chat_roomsUncheckedUpdateInput>;
    where: Prisma.chat_roomsWhereUniqueInput;
};
export type chat_roomsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.chat_roomsUpdateManyMutationInput, Prisma.chat_roomsUncheckedUpdateManyInput>;
    where?: Prisma.chat_roomsWhereInput;
    limit?: number;
};
export type chat_roomsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_roomsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.chat_roomsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.chat_roomsUpdateManyMutationInput, Prisma.chat_roomsUncheckedUpdateManyInput>;
    where?: Prisma.chat_roomsWhereInput;
    limit?: number;
};
export type chat_roomsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_roomsSelect<ExtArgs> | null;
    omit?: Prisma.chat_roomsOmit<ExtArgs> | null;
    include?: Prisma.chat_roomsInclude<ExtArgs> | null;
    where: Prisma.chat_roomsWhereUniqueInput;
    create: Prisma.XOR<Prisma.chat_roomsCreateInput, Prisma.chat_roomsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.chat_roomsUpdateInput, Prisma.chat_roomsUncheckedUpdateInput>;
};
export type chat_roomsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_roomsSelect<ExtArgs> | null;
    omit?: Prisma.chat_roomsOmit<ExtArgs> | null;
    include?: Prisma.chat_roomsInclude<ExtArgs> | null;
    where: Prisma.chat_roomsWhereUniqueInput;
};
export type chat_roomsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.chat_roomsWhereInput;
    limit?: number;
};
export type chat_rooms$chat_messagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type chat_rooms$chat_room_participantsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type chat_roomsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chat_roomsSelect<ExtArgs> | null;
    omit?: Prisma.chat_roomsOmit<ExtArgs> | null;
    include?: Prisma.chat_roomsInclude<ExtArgs> | null;
};
