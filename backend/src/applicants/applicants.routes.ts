import { Router } from 'express';

const router = Router();
import { downloadFromAzure } from '../utils/azureStorage';

router.get('/proxy-blob', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url || typeof url !== 'string') {
      return res.status(400).send('URL is required');
    }

    const { stream, contentType } = await downloadFromAzure(url);

    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }

    if (stream) {
      stream.pipe(res);
    } else {
      res.status(404).send('Stream not found');
    }
  } catch (error: any) {
    console.error('Error proxying blob:', error);
    res.status(500).send('Error proxying blob');
  }
});

router.get('/get-sas-url', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url || typeof url !== 'string') {
      return res.status(400).send('URL is required');
    }

    // Import dynamically if needed or it's already exported from azureStorage
    const { getBlobSasUrl } = require('../utils/azureStorage');
    const sasUrl = await getBlobSasUrl(url);

    // Redirect the browser to the secure SAS URL
    res.redirect(sasUrl);
  } catch (error: any) {
    console.error('Error generating SAS URL:', error);
    res.status(500).send('Error generating secure download link');
  }
});

export default router;
