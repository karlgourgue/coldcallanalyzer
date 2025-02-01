import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { createReadStream } from 'fs';
import { ApiResponse } from '@/types';

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
        return part.mimetype?.includes('audio/wav') || false;
      },
    });

    const [fields, files] = await form.parse(req);
    const file = files.file?.[0];

    if (!file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded',
      });
    }

    // In a production environment, you would upload this to a cloud storage service
    // For this example, we'll just return a mock URL
    const mockUploadUrl = `https://storage.example.com/${file.originalFilename}`;

    return res.status(200).json({
      success: true,
      data: {
        uploadUrl: mockUploadUrl,
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