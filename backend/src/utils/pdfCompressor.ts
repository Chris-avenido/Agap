import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';

/**
 * Compresses a PDF buffer using the Python PyMuPDF script.
 * @param inputBuffer The original PDF buffer
 * @param dpi The DPI to use for compression (default 150)
 * @returns A Promise resolving to the compressed PDF buffer, or the original buffer if compression failed or didn't improve size.
 */
export const compressPdf = async (
  inputBuffer: Buffer,
  dpi: number = 150,
): Promise<Buffer> => {
  const sessionId = crypto.randomUUID();
  const tempDir = os.tmpdir();
  const inputPath = path.join(tempDir, `input_${sessionId}.pdf`);
  const outputPath = path.join(tempDir, `output_${sessionId}.pdf`);

  // Resolve the absolute path to the Python script
  const scriptPath = path.join(__dirname, '../../scripts/compress_pdf.py');

  try {
    // 1. Write the incoming buffer to a temporary file
    await fs.writeFile(inputPath, inputBuffer);

    // 2. Execute the Python script
    await new Promise<void>((resolve, reject) => {
      // Assuming 'python' or 'python3' is in the system PATH
      const pythonExecutable = os.platform() === 'win32' ? 'python' : 'python3';

      const pythonProcess = spawn(pythonExecutable, [
        scriptPath,
        inputPath,
        outputPath,
        dpi.toString(),
      ]);

      let errorOutput = '';

      pythonProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          reject(
            new Error(
              `Python script exited with code ${code}. Stderr: ${errorOutput}`,
            ),
          );
        } else {
          resolve();
        }
      });

      pythonProcess.on('error', (err) => {
        reject(err);
      });
    });

    // 3. Read the compressed output file
    // The Python script saves the best result to output_target (outputPath)
    const outputBuffer = await fs.readFile(outputPath);

    // Safety check: ensure it actually shrunk
    if (outputBuffer.length < inputBuffer.length) {
      console.log(
        `[PDF Compression] Shrunk from ${inputBuffer.length} to ${outputBuffer.length} bytes`,
      );
      return outputBuffer;
    } else {
      console.log(
        `[PDF Compression] Compression did not reduce size. Keeping original.`,
      );
      return inputBuffer;
    }
  } catch (error) {
    console.error('[PDF Compression Error]:', error);
    // On any error (e.g., Python not installed, script crashed), gracefully fallback to the original buffer
    return inputBuffer;
  } finally {
    // 4. Cleanup temporary files
    try {
      if (
        await fs
          .stat(inputPath)
          .then(() => true)
          .catch(() => false)
      ) {
        await fs.unlink(inputPath);
      }
      if (
        await fs
          .stat(outputPath)
          .then(() => true)
          .catch(() => false)
      ) {
        await fs.unlink(outputPath);
      }
    } catch (cleanupError) {
      console.error('[PDF Cleanup Error]:', cleanupError);
    }
  }
};
