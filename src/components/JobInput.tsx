import React from 'react';
import { Sparkles, AlertCircle, ShieldCheck, AlertTriangle, X } from 'lucide-react';
import { SCAM_JOB_EXAMPLE, LEGIT_JOB_EXAMPLE } from '../data/sampleJobs';
import { ImageUploader } from './ImageUploader';
import type { UploadedImage } from '../types';

interface JobInputProps {
  jobText: string;
  onChangeText: (text: string) => void;
  image: UploadedImage | null;
  onImageChange: (image: UploadedImage | null) => void;
  onSubmit: () => void;
  isLoading: boolean;
  validationError: string | null;
  onClearValidation: () => void;
}

export const JobInput: React.FC<JobInputProps> = ({
  jobText,
  onChangeText,
  image,
  onImageChange,
  onSubmit,
  isLoading,
  validationError,
  onClearValidation,
}) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeText(e.target.value);
    if (validationError) {
      onClearValidation();
    }
  };

  const handleSelectScam = () => {
    onChangeText(SCAM_JOB_EXAMPLE);
    if (validationError) onClearValidation();
  };

  const handleSelectLegit = () => {
    onChangeText(LEGIT_JOB_EXAMPLE);
    if (validationError) onClearValidation();
  };

  const handleClear = () => {
    onChangeText('');
    if (validationError) onClearValidation();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label
            htmlFor="job-posting-textarea"
            className="text-sm font-semibold text-slate-800 dark:text-slate-200"
          >
            Job Advertisement Content
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 dark:text-slate-400">
              Quick samples:
            </span>
            <button
              id="try-scam-btn"
              type="button"
              onClick={handleSelectScam}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950/50 dark:hover:bg-red-900/60 dark:text-red-300 border border-red-200 dark:border-red-900 transition-colors disabled:opacity-50"
            >
              <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
              Try scam text
            </button>
            <button
              id="try-legit-btn"
              type="button"
              onClick={handleSelectLegit}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 transition-colors disabled:opacity-50"
            >
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              Try legit text
            </button>
          </div>
        </div>

        <div className="relative">
          <textarea
            id="job-posting-textarea"
            rows={5}
            value={jobText}
            onChange={handleTextChange}
            disabled={isLoading}
            placeholder="Paste the full job posting here (or upload an ad image/poster below)..."
            className={`w-full p-3.5 sm:p-4 text-sm rounded-xl border font-sans text-slate-900 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-950/50 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-slate-950 transition-all resize-y min-h-[130px] ${
              validationError
                ? 'border-red-500 dark:border-red-500 focus:ring-red-400'
                : 'border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20'
            }`}
          />
          {jobText.length > 0 && !isLoading && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear job posting text"
              className="absolute top-3 right-3 p-1.5 rounded-md text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Ad Image / Poster Upload Zone */}
        <ImageUploader
          image={image}
          onImageChange={(newImg) => {
            onImageChange(newImg);
            if (validationError) onClearValidation();
          }}
          disabled={isLoading}
        />

        {/* Validation error message */}
        {validationError && (
          <div
            id="input-validation-msg"
            role="alert"
            className="flex items-center gap-2 text-xs sm:text-sm font-medium text-red-600 dark:text-red-400"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span>{validationError}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <span className="text-xs text-slate-600 dark:text-slate-400 text-center sm:text-left">
            Scans for upfront fee traps, fake WhatsApp interviews, CNIC harvesting &amp; unrealistic salaries.
          </span>

          <button
            id="check-job-ad-btn"
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 cursor-pointer"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Analyzing Opportunity...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>Check this ad</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

