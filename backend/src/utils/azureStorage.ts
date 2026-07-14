import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import * as dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const containerName = process.env.AZURE_FOLDER_NAME as string;

let blobServiceClient: BlobServiceClient;
if (connectionString) {
  blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
}

export const uploadToAzure = async (fileBuffer: Buffer, fileName: string, mimetype: string): Promise<string> => {
  if (!blobServiceClient) {
    throw new Error('Azure Storage Connection String is missing.');
  }

  const containerClient = blobServiceClient.getContainerClient(containerName);
  
  // Create container if it does not exist
  await containerClient.createIfNotExists();

  const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(fileName);

  await blockBlobClient.uploadData(fileBuffer, {
    blobHTTPHeaders: { blobContentType: mimetype }
  });

  return blockBlobClient.url;
};

export const downloadFromAzure = async (blobName: string) => {
  if (!blobServiceClient) {
    throw new Error('Azure Storage Connection String is missing.');
  }

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(blobName);

  const downloadBlockBlobResponse = await blockBlobClient.download();
  return {
    stream: downloadBlockBlobResponse.readableStreamBody,
    contentType: downloadBlockBlobResponse.contentType
  };
};

export const deleteFromAzure = async (blobUrlOrName: string) => {
  try {
    if (!blobServiceClient) return;
    const blobName = decodeURIComponent(blobUrlOrName.split('/').pop() || '');
    if (!blobName) return;

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    
    await blockBlobClient.deleteIfExists();
  } catch (error) {
    console.error("Failed to delete blob from Azure:", error);
  }
};
