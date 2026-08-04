import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import * as dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const containerName = process.env.AZURE_FOLDER_NAME as string;

let blobServiceClient: BlobServiceClient;
if (connectionString) {
  blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
}

export const uploadToAzure = async (
  fileBuffer: Buffer,
  fileName: string,
  mimetype: string,
): Promise<string> => {
  if (!blobServiceClient) {
    throw new Error('Azure Storage Connection String is missing.');
  }

  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Create container if it does not exist
  await containerClient.createIfNotExists();

  const blockBlobClient: BlockBlobClient =
    containerClient.getBlockBlobClient(fileName);

  await blockBlobClient.uploadData(fileBuffer, {
    blobHTTPHeaders: { blobContentType: mimetype },
  });

  return blockBlobClient.url;
};

export const downloadFromAzure = async (blobName: string) => {
  if (!blobServiceClient) {
    throw new Error('Azure Storage Connection String is missing.');
  }

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient: BlockBlobClient =
    containerClient.getBlockBlobClient(blobName);

  const downloadBlockBlobResponse = await blockBlobClient.download();
  return {
    stream: downloadBlockBlobResponse.readableStreamBody,
    contentType: downloadBlockBlobResponse.contentType,
  };
};

export const getBlobNameFromUrl = (
  blobUrlOrName: string,
  containerName: string,
): string => {
  try {
    const url = new URL(blobUrlOrName);
    const path = decodeURIComponent(url.pathname);
    const prefix = `/${containerName}/`;
    if (path.startsWith(prefix)) {
      return path.substring(prefix.length);
    }
    // Fallback if URL structure is different
    return path.substring(1); // remove leading slash
  } catch {
    // Fallback if it's not a full URL
    return decodeURIComponent(blobUrlOrName);
  }
};

export const deleteFromAzure = async (blobUrlOrName: string) => {
  try {
    if (!blobServiceClient) return;
    const blobName = getBlobNameFromUrl(blobUrlOrName, containerName);
    if (!blobName) return;

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.deleteIfExists();
  } catch (error) {
    console.error('Failed to delete blob from Azure:', error);
  }
};

export const getBlobSasUrl = async (blobUrlOrName: string) => {
  if (!blobServiceClient)
    throw new Error('Azure Storage Connection String is missing.');

  const blobName = getBlobNameFromUrl(blobUrlOrName, containerName);
  if (!blobName) throw new Error('Invalid blob URL');

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // @ts-ignore - generateSasUrl exists if using connection string
  if (blockBlobClient.generateSasUrl) {
    return await blockBlobClient.generateSasUrl({
      // @ts-ignore
      permissions: require('@azure/storage-blob').BlobSASPermissions.parse('r'),
      expiresOn: new Date(new Date().valueOf() + 3600 * 1000), // 1 hour
    });
  }

  throw new Error('generateSasUrl is not supported on this client');
};
