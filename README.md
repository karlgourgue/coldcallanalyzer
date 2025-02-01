# Cold Call Analyzer

## Overview
A sleek React web app that lets you upload a .wav cold call recording, transcribes it using OpenAI’s Whisper, then generates detailed call feedback using o3-mini. Designed to deliver tactical insights for improving cold calls.

## Features
- **Audio Upload:** Accepts only .wav files (validate type & size).
- **Transcription:** Uses Whisper-1 API to transcribe audio.
- **Feedback Analysis:** Sends transcript to AI with a structured prompt covering:
  - **Overall Score & Summary** (Score: X; 2-3 sentence overview)
  - **Opener Analysis** (Score: X; alternative opener if needed)
  - **Problem Proposition** (Score: X; improved proposition suggestion)
  - **Objection Handling** (Score: X; alternative framework)
  - **Engagement & Flow** (Score: X; tactical recommendations)
  - **Closing & Next Steps** (Score: X; alternative closing)
  - **Actionable Takeaways** (3 quick wins + a script example)
- **Robust Parsing:** Custom utilities to extract and cache feedback sections.
- **Error Handling & Security:** API key checks, obscured logging, graceful error responses.
- **Modular Architecture:** Clean separation between FE (React) and BE (Express/Serverless).

## Detailed Requirements
1. **File Upload & Validation:**
   - Accept only `.wav` files.
   - Provide immediate client-side feedback for invalid file types/sizes.
2. **Transcription Workflow:**
   - Trigger transcription via OpenAI’s Whisper API.
   - Log start and end (log only a snippet of the API key).
3. **Feedback Generation:**
   - Build clear system/user prompts per section requirements.
   - Use the AI API (o3-mini/GPT-4) to generate structured feedback.
   - Parse returned text into defined sections using utility functions.
4. **Error Handling:**
   - Throw errors if essential environment variables (e.g., `OPENAI_API_KEY`) are missing.
   - Handle API or processing errors gracefully, with clear messages.
5. **Performance & Caching:**
   - Cache outputs from parsing functions to prevent duplicate computation.
6. **Security:**
   - Ensure sensitive info (like API keys) is never fully logged.
7. **Deployment:**
   - Ready for serverless deployment on Vercel (or equivalent).
   - BE must be adapted (e.g., Next.js API routes or discrete serverless functions) to suit the hosting platform.

## File Structure
.
├── src/                    # Frontend (React)
│   ├── components/         # UI components
│   ├── utils/              # Shared utilities (e.g., feedback parsing)
│   └── config/             # Frontend configuration
├── api/                    # Backend (Express/Serverless)
│   ├── server.ts           # API entry point
│   ├── middleware/         # Error handling middleware
│   ├── routes/             # API endpoints
│   └── services/           # Business logic (audio analysis)
├── public/                 # Static assets
└── package.json            # Project config and scripts

## Setup
1. **Clone the repo** and install dependencies (`npm install` in the root or relevant directories).
2. **Set Environment Variables:**  
   - `OPENAI_API_KEY` (and any others needed).
3. **Run Locally:**
   - Use `vercel dev` or `npm run dev` to spin up both frontend and backend.
   - Test the file upload and processing with sample .wav recordings.

## Deployment
- **Vercel:** Adapt backend endpoints to serverless functions if necessary.
- **Monitor Logs:** Verify that API keys are obfuscated and errors are handled gracefully.

## Tech Stack
- **Frontend:**  
  - React (or Next.js if you fancy built-in API routes)  
  - TypeScript  
  - Tailwind CSS (for rapid, responsive styling)
- **Backend:**  
  - Node.js with Express (or Next.js API routes for serverless deployments)  
  - TypeScript  
- **API Integration:**  
  - OpenAI’s Whisper for transcription  
  - GPT-4 / o3-mini for call feedback analysis
- **Testing & Quality:**  
  - Jest & React Testing Library  
  - ESLint & Prettier
- **Deployment:**  
  - Vercel (with serverless functions if needed)
- **Environment:**  
  - dotenv for environment variable management