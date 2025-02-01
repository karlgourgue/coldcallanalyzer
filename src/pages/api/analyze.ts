import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { type ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { ApiResponse, CallAnalysis, FeedbackResult } from '@/types';
import env from '@/config/env';
import { extractSection, parseSectionFeedback } from '@/utils/feedbackParser';

// Debug logging (only first 10 chars for security)
console.log('Initializing OpenAI client with key:', env.OPENAI_API_KEY?.slice(0, 10) + '...');

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `Analyze the following cold call transcript and provide a structured assessment based on the framework from Cold Calling Sucks (And That's Why It Works) by Armand Farrokh and Nick Cegelski. 

Context: The caller represents Opus Training, a mobile-first learning management system (LMS) designed for deskless workers in industries like hospitality, retail, and manufacturing. Opus Training helps businesses streamline onboarding, upskill employees, and ensure compliance through bite-sized, easy-to-access training modules delivered directly to workers' phones. The platform emphasizes simplicity, speed, and real-time tracking to meet the unique needs of frontline teams, driving productivity and reducing turnover.

Break down the analysis into the following sections. For each section, start with "SCORE: X" on its own line where X is the score out of 10:

1. Overall Score & Summary
SCORE: X
• Brief summary of the call's strengths and weaknesses in 2-3 sentences.

2. Opener Analysis
SCORE: X
• Did the rep establish context and credibility quickly?
• Was the opening question engaging, or did it lead to immediate resistance?
• Suggest a stronger alternative opener if needed.

3. Problem Proposition
SCORE: X
• Did the rep introduce a compelling problem that resonates with the prospect?
• Was the problem framed in a way that made the solution feel necessary and urgent?
• Provide a more effective problem proposition statement if applicable.

4. Objection Handling
SCORE: X
• Did the rep acknowledge, explore, and reframe objections effectively?
• Were objections handled with curiosity and control, or did the conversation stall?
• Suggest a better response framework for any missed objections.

5. Engagement & Flow
SCORE: X
• Did the prospect actively engage, or did they shut down quickly?
• Were there moments of rapport-building or did the call feel transactional?
• Recommend ways to make the call more conversational and prospect-driven.

6. Closing & Next Steps
SCORE: X
• Did the rep secure a clear next step (e.g., meeting, follow-up, interest confirmation)?
• Was there a sense of urgency and value in the ask?
• Suggest a stronger closing statement if needed.

7. Actionable Takeaways
• Provide three concise recommendations the rep can implement immediately.
• Offer one alternative script example for a key section that needs improvement.

Be direct, tactical, and specific. Focus on actionable feedback rather than generic advice. The caller's name is Karl, and you should refer to him as Karl and you in your notes. When suggesting alternatives, make sure they specifically reference Opus Training's unique value propositions around mobile-first learning, bite-sized modules, and real-time tracking for frontline teams.

Format your response with clear section headings and bullet points for easy parsing. Remember to start each scored section with "SCORE: X" on its own line.`;

function convertFeedbackToAnalysis(feedback: FeedbackResult): CallAnalysis {
  return {
    overallScore: feedback.overallScore.score || 0,
    summary: feedback.overallScore.summary,
    sections: {
      opener: {
        score: feedback.openerAnalysis.score || 0,
        feedback: feedback.openerAnalysis.feedback,
        improvement: feedback.openerAnalysis.alternativeOpener,
      },
      problemProposition: {
        score: feedback.problemProposition.score || 0,
        feedback: feedback.problemProposition.feedback,
        improvement: feedback.problemProposition.alternativeProposition,
      },
      objectionHandling: {
        score: feedback.objectionHandling.score || 0,
        feedback: feedback.objectionHandling.feedback,
        improvement: feedback.objectionHandling.alternativeFramework,
      },
      engagementAndFlow: {
        score: feedback.engagementAndFlow.score || 0,
        feedback: feedback.engagementAndFlow.recommendations,
      },
      closingAndNextSteps: {
        score: feedback.closingAndNextSteps.score || 0,
        feedback: feedback.closingAndNextSteps.feedback,
        improvement: feedback.closingAndNextSteps.alternativeClosing,
      },
    },
    actionableTakeaways: {
      quickWins: feedback.actionableTakeaways.improvements,
      scriptExample: feedback.actionableTakeaways.scriptExample,
    },
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ analysis: CallAnalysis }>>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  const { transcription } = req.body;

  if (!transcription) {
    return res.status(400).json({
      success: false,
      error: 'Missing transcription in request body',
    });
  }

  try {
    console.log('Starting analysis with GPT-4...');
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Please analyze this cold call transcription:\n\n${transcription}` },
      ],
      temperature: 0.7,
    });

    const analysis = completion.choices[0]?.message?.content;
    if (!analysis) throw new Error('No analysis generated');

    console.log('Analysis complete. Parsing feedback...');
    
    // Extract and parse each section
    const overallSection = extractSection(analysis, '1. Overall Score', '2.');
    const openerSection = extractSection(analysis, '2. Opener Analysis', '3.');
    const propositionSection = extractSection(analysis, '3. Problem Proposition', '4.');
    const objectionSection = extractSection(analysis, '4. Objection Handling', '5.');
    const engagementSection = extractSection(analysis, '5. Engagement & Flow', '6.');
    const closingSection = extractSection(analysis, '6. Closing & Next Steps', '7.');
    const takeawaysSection = extractSection(analysis, '7. Actionable Takeaways');

    const feedback: FeedbackResult = {
      overallScore: {
        ...parseSectionFeedback(overallSection, true),
        summary: overallSection,
      },
      openerAnalysis: {
        ...parseSectionFeedback(openerSection),
        alternativeOpener: parseSectionFeedback(openerSection).alternative,
      },
      problemProposition: {
        ...parseSectionFeedback(propositionSection),
        alternativeProposition: parseSectionFeedback(propositionSection).alternative,
      },
      objectionHandling: {
        ...parseSectionFeedback(objectionSection),
        alternativeFramework: parseSectionFeedback(objectionSection).alternative,
      },
      engagementAndFlow: {
        ...parseSectionFeedback(engagementSection),
        recommendations: parseSectionFeedback(engagementSection).feedback,
      },
      closingAndNextSteps: {
        ...parseSectionFeedback(closingSection),
        alternativeClosing: parseSectionFeedback(closingSection).alternative,
      },
      actionableTakeaways: {
        improvements: parseSectionFeedback(takeawaysSection, false).feedback,
        scriptExample: extractSection(takeawaysSection, 'Example Script:'),
      },
    };

    const callAnalysis = convertFeedbackToAnalysis(feedback);

    return res.status(200).json({
      success: true,
      data: {
        analysis: callAnalysis,
      },
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to analyze call',
    });
  }
} 