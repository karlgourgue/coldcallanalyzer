import { CallAnalysis } from '@/types';
import { twMerge } from 'tailwind-merge';

interface AnalysisResultsProps {
  analysis: CallAnalysis;
}

function ScoreDisplay({ score }: { score: number }) {
  const getScoreClass = (score: number) => {
    if (score >= 8) return 'score-badge-high';
    if (score >= 6) return 'score-badge-mid';
    return 'score-badge-low';
  };

  return (
    <div className={twMerge('score-badge', getScoreClass(score))}>
      {score.toFixed(1)}/10
    </div>
  );
}

function Section({
  title,
  score,
  feedback,
  improvement,
  bulletPoints,
}: {
  title: string;
  score: number;
  feedback: string[] | string;
  improvement?: string;
  bulletPoints?: string[];
}) {
  const feedbackArray = Array.isArray(feedback) ? feedback : [feedback];
  
  return (
    <div className="relative rounded-xl bg-dark-800/50 backdrop-blur-sm border border-dark-700/50">
      <div className="absolute inset-0 -z-10 rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-800/30 to-dark-700/30 rounded-xl" />
        <div className="absolute inset-0 rounded-xl bg-[url('/grid.svg')] bg-center opacity-10" />
      </div>

      <div className="relative p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
            {title}
          </h3>
          <ScoreDisplay score={score} />
        </div>
        
        {bulletPoints ? (
          <ul className="space-y-3 text-dark-200">
            {bulletPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3 group">
                <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-dark-400 group-hover:bg-dark-300 transition-colors" />
                <span className="group-hover:text-dark-100 transition-colors">{point}</span>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-3 text-dark-200">
            {feedbackArray.map((point, index) => (
              <li key={index} className="flex items-start gap-3 group">
                <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-dark-400 group-hover:bg-dark-300 transition-colors" />
                <span className="group-hover:text-dark-100 transition-colors">{point}</span>
              </li>
            ))}
          </ul>
        )}
        
        {improvement && (
          <div className="mt-6 rounded-xl bg-dark-900/50 border border-dark-800/50 p-4">
            <p className="text-sm text-dark-200">
              <span className="font-medium text-dark-100">Suggested Improvement:</span>{' '}
              <span className="text-dark-300">{improvement}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const {
    overallScore,
    summary,
    sections,
    actionableTakeaways,
  } = analysis;

  return (
    <div className="space-y-6">
      {/* Overall Score and Summary */}
      <div className="relative rounded-xl bg-gradient-to-br from-dark-800 to-dark-700 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
        
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
                Overall Score
              </h2>
              <ScoreDisplay score={overallScore} />
            </div>
          </div>
          <p className="text-dark-200">{summary}</p>
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="space-y-6">
        <Section
          title="Opener Analysis"
          score={sections.opener.score}
          feedback={sections.opener.feedback}
          improvement={sections.opener.improvement}
        />
        <Section
          title="Problem Proposition"
          score={sections.problemProposition.score}
          feedback={sections.problemProposition.feedback}
          improvement={sections.problemProposition.improvement}
        />
        <Section
          title="Objection Handling"
          score={sections.objectionHandling.score}
          feedback={sections.objectionHandling.feedback}
          improvement={sections.objectionHandling.improvement}
        />
        <Section
          title="Engagement & Flow"
          score={sections.engagementAndFlow.score}
          feedback={sections.engagementAndFlow.feedback}
          improvement={sections.engagementAndFlow.improvement}
        />
        <Section
          title="Closing & Next Steps"
          score={sections.closingAndNextSteps.score}
          feedback={sections.closingAndNextSteps.feedback}
          improvement={sections.closingAndNextSteps.improvement}
        />
      </div>

      {/* Actionable Takeaways */}
      <Section
        title="Actionable Takeaways"
        score={10}
        feedback=""
        bulletPoints={[
          ...actionableTakeaways.quickWins,
          `Example Script: ${actionableTakeaways.scriptExample}`,
        ]}
      />
    </div>
  );
} 