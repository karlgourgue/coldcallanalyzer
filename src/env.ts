export const env = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  NODE_ENV: process.env.NODE_ENV,
} as const;

if (!env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
} 