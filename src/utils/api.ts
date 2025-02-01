import { ApiResponse } from '@/types';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function handleApiResponse<T>(
  promise: Promise<Response>
): Promise<ApiResponse<T>> {
  try {
    const response = await promise;
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error || 'An unexpected error occurred',
        response.status,
        data
      );
    }

    return {
      success: true,
      data: data as T,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function uploadAudio(file: File): Promise<ApiResponse<{ uploadUrl: string }>> {
  const formData = new FormData();
  formData.append('file', file);

  return handleApiResponse(
    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
  );
}

export async function transcribeAudio(
  uploadUrl: string
): Promise<ApiResponse<{ transcription: string }>> {
  return handleApiResponse(
    fetch('/api/transcribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uploadUrl }),
    })
  );
}

export async function analyzeCall(
  transcription: string
): Promise<ApiResponse<{ analysis: any }>> {
  return handleApiResponse(
    fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transcription }),
    })
  );
} 