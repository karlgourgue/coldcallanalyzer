const env = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  NODE_ENV: process.env.NODE_ENV,
};

if (!env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is required');
}

export default env; 