import { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { AnalysisResults } from '@/components/AnalysisResults';
import { uploadAudio, transcribeAudio, analyzeCall } from '@/utils/api';
import { CallAnalysis } from '@/types';
import toast from 'react-hot-toast';

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysis, setAnalysis] = useState<CallAnalysis | null>(null);
  const [currentFile, setCurrentFile] = useState<string>();

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    setAnalysis(null);
    setCurrentFile(file.name);

    try {
      // Step 1: Upload the audio file
      const uploadResult = await uploadAudio(file);
      if (!uploadResult.success || !uploadResult.data) {
        throw new Error(uploadResult.error || 'Failed to upload file');
      }

      // Step 2: Transcribe the audio
      const transcriptionResult = await transcribeAudio(uploadResult.data.uploadUrl);
      if (!transcriptionResult.success || !transcriptionResult.data) {
        throw new Error(transcriptionResult.error || 'Failed to transcribe audio');
      }

      // Step 3: Analyze the transcription
      const analysisResult = await analyzeCall(transcriptionResult.data.transcription);
      if (!analysisResult.success || !analysisResult.data) {
        throw new Error(analysisResult.error || 'Failed to analyze call');
      }

      setAnalysis(analysisResult.data.analysis);
      toast.success('Analysis complete!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
      setCurrentFile(undefined);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 to-dark-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="relative">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400">
              Cold Call Coach
            </h1>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto">
              Upload your cold call recording and get instant, AI-powered feedback to improve your sales game
            </p>
          </div>

          {/* Main Content */}
          <div className="relative z-10 bg-dark-900/50 backdrop-blur-xl rounded-2xl border border-dark-800 shadow-2xl p-6">
            {!analysis ? (
              <div className="space-y-6">
                <FileUpload 
                  onFileSelect={handleFileSelect} 
                  isLoading={isProcessing}
                  currentFile={currentFile}
                />
                {isProcessing && (
                  <div className="text-center text-dark-300 animate-pulse">
                    Analyzing your call...
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => {
                      setAnalysis(null);
                      setCurrentFile(undefined);
                    }}
                    className="text-dark-400 hover:text-dark-300 transition-colors text-sm flex items-center gap-2"
                  >
                    ← Analyze another call
                  </button>
                  <div className="text-dark-400 text-sm">
                    {currentFile}
                  </div>
                </div>
                <AnalysisResults analysis={analysis} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 