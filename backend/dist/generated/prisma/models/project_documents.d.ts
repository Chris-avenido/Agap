import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type project_documentsModel = runtime.Types.Result.DefaultSelection<Prisma.$project_documentsPayload>;
export type AggregateProject_documents = {
    _count: Project_documentsCountAggregateOutputType | null;
    _avg: Project_documentsAvgAggregateOutputType | null;
    _sum: Project_documentsSumAggregateOutputType | null;
    _min: Project_documentsMinAggregateOutputType | null;
    _max: Project_documentsMaxAggregateOutputType | null;
};
export type Project_documentsAvgAggregateOutputType = {
    id: number | null;
    project_id: number | null;
};
export type Project_documentsSumAggregateOutputType = {
    id: number | null;
    project_id: number | null;
};
export type Project_documentsMinAggregateOutputType = {
    id: number | null;
    project_id: number | null;
    doc_type: string | null;
    file_data: string | null;
    created_at: Date | null;
};
export type Project_documentsMaxAggregateOutputType = {
    id: number | null;
    project_id: number | null;
    doc_type: string | null;
    file_data: string | null;
    created_at: Date | null;
};
export type Project_documentsCountAggregateOutputType = {
    id: number;
    project_id: number;
    doc_type: number;
    file_data: number;
    created_at: number;
    _all: number;
};
export type Project_documentsAvgAggregateInputType = {
    id?: true;
    project_id?: true;
};
export type Project_documentsSumAggregateInputType = {
    id?: true;
    project_id?: true;
};
export type Project_documentsMinAggregateInputType = {
    id?: true;
    project_id?: true;
    doc_type?: true;
    file_data?: true;
    created_at?: true;
};
export type Project_documentsMaxAggregateInputType = {
    id?: true;
    project_id?: true;
    doc_type?: true;
    file_data?: true;
    created_at?: true;
};
export type Project_documentsCountAggregateInputType = {
    id?: true;
    project_id?: true;
    doc_type?: true;
    file_data?: true;
    created_at?: true;
    _all?: true;
};
export type Project_documentsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.project_documentsWhereInput;
    orderBy?: Prisma.project_documentsOrderByWithRelationInput | Prisma.project_documentsOrderByWithRelationInput[];
    cursor?: Prisma.project_documentsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Project_documentsCountAggregateInputType;
    _avg?: Project_documentsAvgAggregateInputType;
    _sum?: Project_documentsSumAggregateInputType;
    _min?: Project_documentsMinAggregateInputType;
    _max?: Project_documentsMaxAggregateInputType;
};
export type GetProject_documentsAggregateType<T extends Project_documentsAggregateArgs> = {
    [P in keyof T & keyof AggregateProject_documents]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProject_documents[P]> : Prisma.GetScalarType<T[P], AggregateProject_documents[P]>;
};
export type project_documentsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.project_documentsWhereInput;
    orderBy?: Prisma.project_documentsOrderByWithAggregationInput | Prisma.project_documentsOrderByWithAggregationInput[];
    by: Prisma.Project_documentsScalarFieldEnum[] | Prisma.Project_documentsScalarFieldEnum;
    having?: Prisma.project_documentsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Project_documentsCountAggregateInputType | true;
    _avg?: Project_documentsAvgAggregateInputType;
    _sum?: Project_documentsSumAggregateInputType;
    _min?: Project_documentsMinAggregateInputType;
    _max?: Project_documentsMaxAggregateInputType;
};
export type Project_documentsGroupByOutputType = {
    id: number;
    project_id: number | null;
    doc_type: string;
    file_data: string | null;
    created_at: Date | null;
    _count: Project_documentsCountAggregateOutputType | null;
    _avg: Project_documentsAvgAggregateOutputType | null;
    _sum: Project_documentsSumAggregateOutputType | null;
    _min: Project_documentsMinAggregateOutputType | null;
    _max: Project_documentsMaxAggregateOutputType | null;
};
export type GetProject_documentsGroupByPayload<T extends project_documentsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Project_documentsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Project_documentsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Project_documentsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Project_documentsGroupByOutputType[P]>;
}>>;
export type project_documentsWhereInput = {
    AND?: Prisma.project_documentsWhereInput | Prisma.project_documentsWhereInput[];
    OR?: Prisma.project_documentsWhereInput[];
    NOT?: Prisma.project_documentsWhereInput | Prisma.project_documentsWhereInput[];
    id?: Prisma.IntFilter<"project_documents"> | number;
    project_id?: Prisma.IntNullableFilter<"project_documents"> | number | null;
    doc_type?: Prisma.StringFilter<"project_documents"> | string;
    file_data?: Prisma.StringNullableFilter<"project_documents"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"project_documents"> | Date | string | null;
};
export type project_documentsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    project_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    doc_type?: Prisma.SortOrder;
    file_data?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type project_documentsWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.project_documentsWhereInput | Prisma.project_documentsWhereInput[];
    OR?: Prisma.project_documentsWhereInput[];
    NOT?: Prisma.project_documentsWhereInput | Prisma.project_documentsWhereInput[];
    project_id?: Prisma.IntNullableFilter<"project_documents"> | number | null;
    doc_type?: Prisma.StringFilter<"project_documents"> | string;
    file_data?: Prisma.StringNullableFilter<"project_documents"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"project_documents"> | Date | string | null;
}, "id">;
export type project_documentsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    project_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    doc_type?: Prisma.SortOrder;
    file_data?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.project_documentsCountOrderByAggregateInput;
    _avg?: Prisma.project_documentsAvgOrderByAggregateInput;
    _max?: Prisma.project_documentsMaxOrderByAggregateInput;
    _min?: Prisma.project_documentsMinOrderByAggregateInput;
    _sum?: Prisma.project_documentsSumOrderByAggregateInput;
};
export type project_documentsScalarWhereWithAggregatesInput = {
    AND?: Prisma.project_documentsScalarWhereWithAggregatesInput | Prisma.project_documentsScalarWhereWithAggregatesInput[];
    OR?: Prisma.project_documentsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.project_documentsScalarWhereWithAggregatesInput | Prisma.project_documentsScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"project_documents"> | number;
    project_id?: Prisma.IntNullableWithAggregatesFilter<"project_documents"> | number | null;
    doc_type?: Prisma.StringWithAggregatesFilter<"project_documents"> | string;
    file_data?: Prisma.StringNullableWithAggregatesFilter<"project_documents"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"project_documents"> | Date | string | null;
};
export type project_documentsCreateInput = {
    project_id?: number | null;
    doc_type: string;
    file_data?: string | null;
    created_at?: Date | string | null;
};
export type project_documentsUncheckedCreateInput = {
    id?: number;
    project_id?: number | null;
    doc_type: string;
    file_data?: string | null;
    created_at?: Date | string | null;
};
export type project_documentsUpdateInput = {
    project_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    doc_type?: Prisma.StringFieldUpdateOperationsInput | string;
    file_data?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type project_documentsUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    project_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    doc_type?: Prisma.StringFieldUpdateOperationsInput | string;
    file_data?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type project_documentsCreateManyInput = {
    id?: number;
    project_id?: number | null;
    doc_type: string;
    file_data?: string | null;
    created_at?: Date | string | null;
};
export type project_documentsUpdateManyMutationInput = {
    project_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    doc_type?: Prisma.StringFieldUpdateOperationsInput | string;
    file_data?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type project_documentsUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    project_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    doc_type?: Prisma.StringFieldUpdateOperationsInput | string;
    file_data?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type project_documentsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    project_id?: Prisma.SortOrder;
    doc_type?: Prisma.SortOrder;
    file_data?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type project_documentsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    project_id?: Prisma.SortOrder;
};
export type project_documentsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    project_id?: Prisma.SortOrder;
    doc_type?: Prisma.SortOrder;
    file_data?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type project_documentsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    project_id?: Prisma.SortOrder;
    doc_type?: Prisma.SortOrder;
    file_data?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type project_documentsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    project_id?: Prisma.SortOrder;
};
export type project_documentsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    project_id?: boolean;
    doc_type?: boolean;
    file_data?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["project_documents"]>;
export type project_documentsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    project_id?: boolean;
    doc_type?: boolean;
    file_data?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["project_documents"]>;
export type project_documentsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    project_id?: boolean;
    doc_type?: boolean;
    file_data?: boolean;
    created_at?: boolean;
}, ExtArgs["result"]["project_documents"]>;
export type project_documentsSelectScalar = {
    id?: boolean;
    project_id?: boolean;
    doc_type?: boolean;
    file_data?: boolean;
    created_at?: boolean;
};
export type project_documentsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "project_id" | "doc_type" | "file_data" | "created_at", ExtArgs["result"]["project_documents"]>;
export type $project_documentsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "project_documents";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        project_id: number | null;
        doc_type: string;
        file_data: string | null;
        created_at: Date | null;
    }, ExtArgs["result"]["project_documents"]>;
    composites: {};
};
export type project_documentsGetPayload<S extends boolean | null | undefined | project_documentsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$project_documentsPayload, S>;
export type project_documentsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<project_documentsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Project_documentsCountAggregateInputType | true;
};
export interface project_documentsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['project_documents'];
        meta: {
            name: 'project_documents';
        };
    };
    findUnique<T extends project_documentsFindUniqueArgs>(args: Prisma.SelectSubset<T, project_documentsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__project_documentsClient<runtime.Types.Result.GetResult<Prisma.$project_documentsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends project_documentsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, project_documentsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__project_documentsClient<runtime.Types.Result.GetResult<Prisma.$project_documentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends project_documentsFindFirstArgs>(args?: Prisma.SelectSubset<T, project_documentsFindFirstArgs<ExtArgs>>): Prisma.Prisma__project_documentsClient<runtime.Types.Result.GetResult<Prisma.$project_documentsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends project_documentsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, project_documentsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__project_documentsClient<runtime.Types.Result.GetResult<Prisma.$project_documentsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends project_documentsFindManyArgs>(args?: Prisma.SelectSubset<T, project_documentsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$project_documentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends project_documentsCreateArgs>(args: Prisma.SelectSubset<T, project_documentsCreateArgs<ExtArgs>>): Prisma.Prisma__project_documentsClient<runtime.Types.Result.GetResult<Prisma.$project_documentsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends project_documentsCreateManyArgs>(args?: Prisma.SelectSubset<T, project_documentsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends project_documentsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, project_documentsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$project_documentsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends project_documentsDeleteArgs>(args: Prisma.SelectSubset<T, project_documentsDeleteArgs<ExtArgs>>): Prisma.Prisma__project_documentsClient<runtime.Types.Result.GetResult<Prisma.$project_documentsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends project_documentsUpdateArgs>(args: Prisma.SelectSubset<T, project_documentsUpdateArgs<ExtArgs>>): Prisma.Prisma__project_documentsClient<runtime.Types.Result.GetResult<Prisma.$project_documentsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends project_documentsDeleteManyArgs>(args?: Prisma.SelectSubset<T, project_documentsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends project_documentsUpdateManyArgs>(args: Prisma.SelectSubset<T, project_documentsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends project_documentsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, project_documentsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$project_documentsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends project_documentsUpsertArgs>(args: Prisma.SelectSubset<T, project_documentsUpsertArgs<ExtArgs>>): Prisma.Prisma__project_documentsClient<runtime.Types.Result.GetResult<Prisma.$project_documentsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends project_documentsCountArgs>(args?: Prisma.Subset<T, project_documentsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Project_documentsCountAggregateOutputType> : number>;
    aggregate<T extends Project_documentsAggregateArgs>(args: Prisma.Subset<T, Project_documentsAggregateArgs>): Prisma.PrismaPromise<GetProject_documentsAggregateType<T>>;
    groupBy<T extends project_documentsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: project_documentsGroupByArgs['orderBy'];
    } : {
        orderBy?: project_documentsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, project_documentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProject_documentsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: project_documentsFieldRefs;
}
export interface Prisma__project_documentsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface project_documentsFieldRefs {
    readonly id: Prisma.FieldRef<"project_documents", 'Int'>;
    readonly project_id: Prisma.FieldRef<"project_documents", 'Int'>;
    readonly doc_type: Prisma.FieldRef<"project_documents", 'String'>;
    readonly file_data: Prisma.FieldRef<"project_documents", 'String'>;
    readonly created_at: Prisma.FieldRef<"project_documents", 'DateTime'>;
}
export type project_documentsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.project_documentsSelect<ExtArgs> | null;
    omit?: Prisma.project_documentsOmit<ExtArgs> | null;
    where: Prisma.project_documentsWhereUniqueInput;
};
export type project_documentsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.project_documentsSelect<ExtArgs> | null;
    omit?: Prisma.project_documentsOmit<ExtArgs> | null;
    where: Prisma.project_documentsWhereUniqueInput;
};
export type project_documentsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.project_documentsSelect<ExtArgs> | null;
    omit?: Prisma.project_documentsOmit<ExtArgs> | null;
    where?: Prisma.project_documentsWhereInput;
    orderBy?: Prisma.project_documentsOrderByWithRelationInput | Prisma.project_documentsOrderByWithRelationInput[];
    cursor?: Prisma.project_documentsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Project_documentsScalarFieldEnum | Prisma.Project_documentsScalarFieldEnum[];
};
export type project_documentsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.project_documentsSelect<ExtArgs> | null;
    omit?: Prisma.project_documentsOmit<ExtArgs> | null;
    where?: Prisma.project_documentsWhereInput;
    orderBy?: Prisma.project_documentsOrderByWithRelationInput | Prisma.project_documentsOrderByWithRelationInput[];
    cursor?: Prisma.project_documentsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Project_documentsScalarFieldEnum | Prisma.Project_documentsScalarFieldEnum[];
};
export type project_documentsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.project_documentsSelect<ExtArgs> | null;
    omit?: Prisma.project_documentsOmit<ExtArgs> | null;
    where?: Prisma.project_documentsWhereInput;
    orderBy?: Prisma.project_documentsOrderByWithRelationInput | Prisma.project_documentsOrderByWithRelationInput[];
    cursor?: Prisma.project_documentsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Project_documentsScalarFieldEnum | Prisma.Project_documentsScalarFieldEnum[];
};
export type project_documentsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.project_documentsSelect<ExtArgs> | null;
    omit?: Prisma.project_documentsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.project_documentsCreateInput, Prisma.project_documentsUncheckedCreateInput>;
};
export type project_documentsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.project_documentsCreateManyInput | Prisma.project_documentsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type project_documentsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.project_documentsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.project_documentsOmit<ExtArgs> | null;
    data: Prisma.project_documentsCreateManyInput | Prisma.project_documentsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type project_documentsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.project_documentsSelect<ExtArgs> | null;
    omit?: Prisma.project_documentsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.project_documentsUpdateInput, Prisma.project_documentsUncheckedUpdateInput>;
    where: Prisma.project_documentsWhereUniqueInput;
};
export type project_documentsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.project_documentsUpdateManyMutationInput, Prisma.project_documentsUncheckedUpdateManyInput>;
    where?: Prisma.project_documentsWhereInput;
    limit?: number;
};
export type project_documentsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.project_documentsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.project_documentsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.project_documentsUpdateManyMutationInput, Prisma.project_documentsUncheckedUpdateManyInput>;
    where?: Prisma.project_documentsWhereInput;
    limit?: number;
};
export type project_documentsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.project_documentsSelect<ExtArgs> | null;
    omit?: Prisma.project_documentsOmit<ExtArgs> | null;
    where: Prisma.project_documentsWhereUniqueInput;
    create: Prisma.XOR<Prisma.project_documentsCreateInput, Prisma.project_documentsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.project_documentsUpdateInput, Prisma.project_documentsUncheckedUpdateInput>;
};
export type project_documentsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.project_documentsSelect<ExtArgs> | null;
    omit?: Prisma.project_documentsOmit<ExtArgs> | null;
    where: Prisma.project_documentsWhereUniqueInput;
};
export type project_documentsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.project_documentsWhereInput;
    limit?: number;
};
export type project_documentsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.project_documentsSelect<ExtArgs> | null;
    omit?: Prisma.project_documentsOmit<ExtArgs> | null;
};
