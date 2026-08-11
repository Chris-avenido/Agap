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

export const findLatestBlob = async (
  targetContainer: string,
  blobName: string,
): Promise<string> => {
  if (!blobServiceClient) return blobName;
  try {
    const containerClient = blobServiceClient.getContainerClient(targetContainer);
    const lastSlashIndex = blobName.lastIndexOf('/');
    if (lastSlashIndex === -1) return blobName;
    const prefix = blobName.substring(0, lastSlashIndex + 1);

    let latestBlobName = blobName;
    let latestModified: Date | null = null;

    for await (const blob of containerClient.listBlobsFlat({ prefix })) {
      if (
        !latestModified ||
        (blob.properties.lastModified && blob.properties.lastModified > latestModified)
      ) {
        latestModified = blob.properties.lastModified || null;
        latestBlobName = blob.name;
      }
    }
    return latestBlobName;
  } catch {
    return blobName;
  }
};

export const downloadFromAzure = async (blobUrlOrName: string) => {
  if (!blobServiceClient) {
    throw new Error('Azure Storage Connection String is missing.');
  }

  let { targetContainer, blobName } = parseBlobUrl(blobUrlOrName, containerName);
  let containerClient = blobServiceClient.getContainerClient(targetContainer);
  let blockBlobClient: BlockBlobClient =
    containerClient.getBlockBlobClient(blobName);

  const exists = await blockBlobClient.exists();
  if (!exists) {
    const latestName = await findLatestBlob(targetContainer, blobName);
    if (latestName !== blobName) {
      blobName = latestName;
      blockBlobClient = containerClient.getBlockBlobClient(blobName);
    }
  }

  const downloadBlockBlobResponse = await blockBlobClient.download();
  return {
    stream: downloadBlockBlobResponse.readableStreamBody,
    contentType: downloadBlockBlobResponse.contentType,
  };
};

export const parseBlobUrl = (
  blobUrlOrName: string,
  defaultContainer: string,
): { targetContainer: string; blobName: string } => {
  try {
    const url = new URL(blobUrlOrName);
    const pathParts = decodeURIComponent(url.pathname).split('/').filter(Boolean);
    if (pathParts.length >= 2) {
      return {
        targetContainer: pathParts[0],
        blobName: pathParts.slice(1).join('/'),
      };
    }
    return {
      targetContainer: defaultContainer,
      blobName: pathParts.join('/'),
    };
  } catch {
    return {
      targetContainer: defaultContainer,
      blobName: decodeURIComponent(blobUrlOrName),
    };
  }
};

export const getBlobNameFromUrl = (
  blobUrlOrName: string,
  defaultContainer: string,
): string => {
  return parseBlobUrl(blobUrlOrName, defaultContainer).blobName;
};

export const deleteFromAzure = async (blobUrlOrName: string) => {
  try {
    if (!blobServiceClient) return;
    const { targetContainer, blobName } = parseBlobUrl(blobUrlOrName, containerName);
    if (!blobName) return;

    const containerClient = blobServiceClient.getContainerClient(targetContainer);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.deleteIfExists();
  } catch (error) {
    console.error('Failed to delete blob from Azure:', error);
  }
};

export const getBlobSasUrl = async (blobUrlOrName: string) => {
  if (!blobServiceClient)
    throw new Error('Azure Storage Connection String is missing.');

  let { targetContainer, blobName } = parseBlobUrl(blobUrlOrName, containerName);
  if (!blobName) throw new Error('Invalid blob URL');

  let containerClient = blobServiceClient.getContainerClient(targetContainer);
  let blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const exists = await blockBlobClient.exists();
  if (!exists) {
    const latestName = await findLatestBlob(targetContainer, blobName);
    if (latestName !== blobName) {
      blobName = latestName;
      blockBlobClient = containerClient.getBlockBlobClient(blobName);
    }
  }

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
