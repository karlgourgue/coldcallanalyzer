import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { ApiResponse } from '@/types';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

  const { uploadUrl } = req.body;

  if (!uploadUrl) {
    return res.status(400).json({
      success: false,
      error: 'Missing uploadUrl in request body',
    });
  }

  try {
    // In a production environment, you would download the file from uploadUrl
    // For this example, we'll use a mock transcription
    const mockTranscription = `Hi, this is John from Acme Corp. I noticed you're in charge of sales operations 
      at your company. We've developed a new AI-powered sales analytics tool that's helping companies like yours 
      increase their close rates by 35%. Would you be interested in learning more about how it could help your team?`;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return res.status(200).json({
      success: true,
      data: {
        transcription: mockTranscription,
      },
    });

    // Production code would look like this:
    /*
    const response = await openai.audio.transcriptions.create({
      file: await fetch(uploadUrl).then(res => res.blob()),
      model: 'whisper-1',
    });

    return res.status(200).json({
      success: true,
      data: {
        transcription: response.text,
      },
    });
    */
  } catch (error) {
    console.error('Transcription error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to transcribe audio',
    });
  }
} 