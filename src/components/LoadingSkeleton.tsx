import React, { useState, useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';

const ANALYSIS_STEPS = [
  'Checking for upfront fee demands & JazzCash / EasyPaisa payment traps...',
  'Verifying company legitimacy and contact channels (WhatsApp vs corporate domain)...',
  'Analyzing salary claims against Pakistani market averages...',
  'Screening for premature CNIC or banking information harvesting...',
  'Finalizing scam risk classification and safety verdict...',
];

export const LoadingSkeleton: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % ANALYSIS_STEPS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="analysis-loading-skeleton"
      aria-label="Analyzing job posting"
      className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6 animate-pulse"
    >
      {/* Top Banner Loader */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-slate-400 dark:text-slate-500 animate-bounce" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="h-3 w-24 bg-slate-100 dark:bg-slate-850 rounded"></div>
          </div>
        </div>
        <div className="h-8 w-28 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
      </div>

      {/* Progress status announcement */}
      <div className="p-3.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
        <p className="text-xs sm:text-sm font-medium text-emerald-800 dark:text-emerald-300 transition-all duration-300">
          {ANALYSIS_STEPS[stepIndex]}
        </p>
      </div>

      {/* Verdict Skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="h-5 w-full bg-slate-100 dark:bg-slate-800 rounded"></div>
        <div className="h-5 w-4/5 bg-slate-100 dark:bg-slate-800 rounded"></div>
      </div>

      {/* Grid of Skeleton Cards for Red & Green Flags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        {/* Red flags skeleton */}
        <div className="p-4 rounded-xl border border-red-100 dark:border-red-950/40 bg-red-50/20 dark:bg-red-950/10 space-y-3">
          <div className="h-4 w-28 bg-red-200/70 dark:bg-red-900/50 rounded"></div>
          <div className="space-y-2">
            <div className="h-14 bg-white/70 dark:bg-slate-900/50 rounded-lg border border-red-100/50 dark:border-red-900/30 p-2.5"></div>
            <div className="h-14 bg-white/70 dark:bg-slate-900/50 rounded-lg border border-red-100/50 dark:border-red-900/30 p-2.5"></div>
          </div>
        </div>

        {/* Green flags skeleton */}
        <div className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-950/40 bg-emerald-50/20 dark:bg-emerald-950/10 space-y-3">
          <div className="h-4 w-28 bg-emerald-200/70 dark:bg-emerald-900/50 rounded"></div>
          <div className="space-y-2">
            <div className="h-10 bg-white/70 dark:bg-slate-900/50 rounded-lg border border-emerald-100/50 dark:border-emerald-900/30 p-2.5"></div>
            <div className="h-10 bg-white/70 dark:bg-slate-900/50 rounded-lg border border-emerald-100/50 dark:border-emerald-900/30 p-2.5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
