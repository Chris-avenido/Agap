"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlobSasUrl = exports.deleteFromAzure = exports.downloadFromAzure = exports.uploadToAzure = void 0;
const storage_blob_1 = require("@azure/storage-blob");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const containerName = process.env.AZURE_FOLDER_NAME;
let blobServiceClient;
if (connectionString) {
    blobServiceClient = storage_blob_1.BlobServiceClient.fromConnectionString(connectionString);
}
const uploadToAzure = async (fileBuffer, fileName, mimetype) => {
    if (!blobServiceClient) {
        throw new Error('Azure Storage Connection String is missing.');
    }
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.createIfNotExists();
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.uploadData(fileBuffer, {
        blobHTTPHeaders: { blobContentType: mimetype }
    });
    return blockBlobClient.url;
};
exports.uploadToAzure = uploadToAzure;
const downloadFromAzure = async (blobName) => {
    if (!blobServiceClient) {
        throw new Error('Azure Storage Connection String is missing.');
    }
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const downloadBlockBlobResponse = await blockBlobClient.download();
    return {
        stream: downloadBlockBlobResponse.readableStreamBody,
        contentType: downloadBlockBlobResponse.contentType
    };
};
exports.downloadFromAzure = downloadFromAzure;
const deleteFromAzure = async (blobUrlOrName) => {
    try {
        if (!blobServiceClient)
            return;
        const blobName = decodeURIComponent(blobUrlOrName.split('/').pop() || '');
        if (!blobName)
            return;
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.deleteIfExists();
    }
    catch (error) {
        console.error("Failed to delete blob from Azure:", error);
    }
};
exports.deleteFromAzure = deleteFromAzure;
const getBlobSasUrl = async (blobUrlOrName) => {
    if (!blobServiceClient)
        throw new Error('Azure Storage Connection String is missing.');
    const blobName = decodeURIComponent(blobUrlOrName.split('/').pop() || '');
    if (!blobName)
        throw new Error('Invalid blob URL');
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    if (blockBlobClient.generateSasUrl) {
        return await blockBlobClient.generateSasUrl({
            permissions: require('@azure/storage-blob').BlobSASPermissions.parse("r"),
            expiresOn: new Date(new Date().valueOf() + 3600 * 1000)
        });
    }
    throw new Error('generateSasUrl is not supported on this client');
};
exports.getBlobSasUrl = getBlobSasUrl;
//# sourceMappingURL=azureStorage.js.map