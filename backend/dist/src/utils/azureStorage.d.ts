export declare const uploadToAzure: (fileBuffer: Buffer, fileName: string, mimetype: string) => Promise<string>;
export declare const downloadFromAzure: (blobName: string) => Promise<{
    stream: import("@azure/storage-blob").NodeJSReadableStream | undefined;
    contentType: string | undefined;
}>;
export declare const deleteFromAzure: (blobUrlOrName: string) => Promise<void>;
export declare const getBlobSasUrl: (blobUrlOrName: string) => Promise<string>;
