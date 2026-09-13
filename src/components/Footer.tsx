import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 py-6 px-4 text-center text-xs text-slate-600 dark:text-slate-400 mt-auto">
      <div className="max-w-4xl mx-auto space-y-2">
        <p className="flex items-center justify-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
          Advisory Disclaimer
        </p>
        <p className="max-w-2xl mx-auto leading-relaxed">
          This is an AI-assisted check based on known Pakistani employment fraud patterns, not a guarantee. Job seekers should always independently verify company registration via the Securities &amp; Exchange Commission of Pakistan (SECP) and never pay any fee before or after receiving a job offer. Report fraudulent schemes to FIA Cyber Crime (Helpline: 1991).
        </p>
      </div>
    </footer>
  );
};
