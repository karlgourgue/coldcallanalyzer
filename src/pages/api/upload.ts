import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { put } from '@vercel/blob';
import { ApiResponse } from '@/types';
import { readFile } from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ uploadUrl: string }>>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    const form = formidable({
      maxFileSize: 25 * 1024 * 1024, // 25MB
      filter: (part) => {
        return part.mimetype?.includes('audio/') || false;
      },
    });

    const [_, files] = await form.parse(req);
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded',
      });
    }

    // Read file buffer and upload to Vercel Blob Storage
    const buffer = await readFile(file.filepath);
    const blob = await put(file.originalFilename || 'audio.mp3', buffer, {
      access: 'public',
      addRandomSuffix: true,
    });

    return res.status(200).json({
      success: true,
      data: {
        uploadUrl: blob.url,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process upload',
    });
  }
} 