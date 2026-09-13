import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div
      id="analysis-error-alert"
      role="alert"
      className="w-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/70 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs"
    >
      <div className="flex items-start gap-3">
        <div className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300 flex-shrink-0 mt-0.5">
          <AlertCircle className="w-4 h-4" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-red-900 dark:text-red-200">
            Analysis Request Interrupted
          </h3>
          <p className="text-xs sm:text-sm text-red-700 dark:text-red-300 mt-0.5">
            {message}
          </p>
        </div>
      </div>

      <button
        id="retry-analysis-btn"
        type="button"
        onClick={onRetry}
        className="self-end sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-red-800 dark:text-red-200 bg-white dark:bg-slate-900 hover:bg-red-100/50 dark:hover:bg-red-900/40 border border-red-300 dark:border-red-800 transition-colors shadow-2xs"
      >
        <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Retry Analysis</span>
      </button>
    </div>
  );
};
