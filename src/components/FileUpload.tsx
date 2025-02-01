import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import toast from 'react-hot-toast';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
  currentFile?: string;
}

export function FileUpload({ onFileSelect, isLoading = false, currentFile }: FileUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      if (!file.type.includes('audio/')) {
        toast.error('Please upload an audio file');
        return;
      }

      if (file.size > 25 * 1024 * 1024) { // 25MB limit
        toast.error('File size must be less than 25MB');
        return;
      }

      onFileSelect(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.wav', '.mp3', '.m4a'],
    },
    maxFiles: 1,
    multiple: false,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    disabled: isLoading,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={twMerge(
          'relative rounded-xl border-2 border-dashed transition-all',
          'group hover:border-dark-400 hover:bg-dark-800/30',
          'p-12 text-center cursor-pointer',
          isDragActive ? 'border-dark-400 bg-dark-800/30' : 'border-dark-600',
          isLoading && 'opacity-50 cursor-not-allowed pointer-events-none'
        )}
      >
        <input {...getInputProps()} />
        
        <div className="absolute inset-0 -z-10 rounded-xl transition-opacity opacity-0 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-r from-dark-800/50 to-dark-700/50 rounded-xl" />
          <div className="absolute inset-0 rounded-xl bg-[url('/grid.svg')] bg-center opacity-20" />
        </div>

        <div className="relative">
          <div className="mx-auto w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center mb-4 group-hover:bg-dark-700 transition-colors">
            <ArrowUpTrayIcon className="w-6 h-6 text-dark-300" />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-dark-200">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-dark-400">
              Audio files (WAV, MP3, etc.) up to 25MB
            </p>
          </div>
        </div>
      </div>
      
      {currentFile && !isLoading && (
        <div className="text-sm text-dark-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-dark-500 animate-pulse" />
          Processing: {currentFile}
        </div>
      )}
    </div>
  );
} 