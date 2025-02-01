import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '@/types';
import { env } from '@/env';
import OpenAI from 'openai';
import { File } from '@web-std/file';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ transcription: string }>>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    const { uploadUrl } = req.body;

    if (!uploadUrl) {
      return res.status(400).json({
        success: false,
        error: 'No upload URL provided',
      });
    }

    // Download the file from the URL
    const response = await fetch(uploadUrl);
    const blob = await response.blob();
    
    // Create a File object that OpenAI's API can handle
    const file = new File([blob], 'audio.mp3', { type: 'audio/mpeg' });

    const transcription = await openai.audio.transcriptions.create({
      file,
      model: 'whisper-1',
      language: 'en',
    });

    return res.status(200).json({
      success: true,
      data: {
        transcription: transcription.text,
      },
    });
  } catch (error) {
    console.error('Transcription error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to transcribe audio',
    });
  }
} 