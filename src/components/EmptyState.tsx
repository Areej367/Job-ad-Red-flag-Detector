import React from 'react';
import {
  CreditCard,
  PhoneCall,
  FileBadge,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

interface EmptyStateProps {
  onSelectScam: () => void;
  onSelectLegit: () => void;
  onSelectSamplePoster: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onSelectScam,
  onSelectLegit,
  onSelectSamplePoster,
}) => {
  return (
    <div
      id="empty-state-card"
      className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6"
    >
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 mb-1">
          <Sparkles className="w-6 h-6" aria-hidden="true" />
        </div>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          How This Tool Protects Pakistani Job Seekers
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Paste any job description from Facebook groups, WhatsApp forwards, LinkedIn, or Rozee.pk to detect predatory recruitment tricks before you share your data or send money.
        </p>
      </div>

      {/* 4 Warning Pillars in Pakistan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/40 space-y-1.5">
          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold text-xs sm:text-sm">
            <CreditCard className="w-4 h-4 text-red-500" />
            <span>Upfront Registration / Courier Fees</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
            Asking for security deposits via JazzCash, EasyPaisa, or Raast before sending work. Legitimate companies never charge fees to hire.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/40 space-y-1.5">
          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Unrealistic Typing / SMS Salaries</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
            Promising PKR 80,000 to 150,000+ per month for copy-pasting SMS or basic captcha typing with "no qualification needed".
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/40 space-y-1.5">
          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold text-xs sm:text-sm">
            <PhoneCall className="w-4 h-4 text-indigo-500" />
            <span>WhatsApp-Only & Anonymous Hiring</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
            Zero company email domain, no physical office address in Karachi/Lahore/Islamabad, and instant chat-only selection.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/40 space-y-1.5">
          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold text-xs sm:text-sm">
            <FileBadge className="w-4 h-4 text-emerald-500" />
            <span>Premature CNIC & Bank Harvesting</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
            Demanding original CNIC front/back copies or bank account details prior to any verified interview or legal employment contract.
          </p>
        </div>
      </div>

      {/* Prompt to try */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 text-xs text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
          Not sure where to start?
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={onSelectScam}
            className="text-red-600 dark:text-red-400 font-medium hover:underline cursor-pointer"
          >
            Sample scam text
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={onSelectSamplePoster}
            className="text-amber-600 dark:text-amber-400 font-medium hover:underline cursor-pointer"
          >
            Sample scam ad poster
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={onSelectLegit}
            className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline cursor-pointer"
          >
            Sample legitimate job
          </button>
        </div>
      </div>
    </div>
  );
};
