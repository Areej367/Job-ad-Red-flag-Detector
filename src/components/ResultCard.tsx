import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Info,
} from 'lucide-react';
import type { JobAnalysisResult, RiskLevel, UploadedImage } from '../types';

interface ResultCardProps {
  result: JobAnalysisResult;
  analyzedImage?: UploadedImage | null;
  onReset: () => void;
}

interface RiskConfig {
  label: string;
  badgeClass: string;
  cardBorder: string;
  headerBg: string;
  icon: React.ReactNode;
  description: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, analyzedImage, onReset }) => {
  const [copied, setCopied] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);

  const getRiskConfig = (level: RiskLevel): RiskConfig => {
    switch (level) {
      case 'high':
        return {
          label: 'High Scam Risk',
          badgeClass:
            'bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-200 border-red-300 dark:border-red-800',
          cardBorder: 'border-red-200 dark:border-red-900/60',
          headerBg: 'bg-red-50/70 dark:bg-red-950/30',
          icon: <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400" aria-hidden="true" />,
          description: 'Strong danger signs detected. Do not send money, CNIC, or personal credentials.',
        };
      case 'medium':
        return {
          label: 'Moderate / Suspicious Risk',
          badgeClass:
            'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-200 border-amber-300 dark:border-amber-800',
          cardBorder: 'border-amber-200 dark:border-amber-900/60',
          headerBg: 'bg-amber-50/70 dark:bg-amber-950/30',
          icon: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />,
          description: 'Contains questionable claims or missing verifiable details. Verify before proceeding.',
        };
      case 'low':
      default:
        return {
          label: 'Low Risk / Likely Legitimate',
          badgeClass:
            'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800',
          cardBorder: 'border-emerald-200 dark:border-emerald-900/60',
          headerBg: 'bg-emerald-50/70 dark:bg-emerald-950/30',
          icon: <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />,
          description: 'Follows standard professional recruitment practices. Standard diligence still advised.',
        };
    }
  };

  const riskConfig = getRiskConfig(result.risk_level);

  const handleCopy = async () => {
    const summaryText = `Job Ad Analysis [${riskConfig.label}]
Verdict: ${result.verdict}
${
  result.red_flags.length > 0
    ? `\nRed Flags:\n${result.red_flags.map((rf) => `• ${rf.flag}: ${rf.why}`).join('\n')}`
    : ''
}
${
  result.green_flags.length > 0
    ? `\nGreen Flags:\n${result.green_flags.map((gf) => `• ${gf}`).join('\n')}`
    : ''
}`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard write may fail in sandbox
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`w-full bg-white dark:bg-slate-900 rounded-xl border ${riskConfig.cardBorder} shadow-sm overflow-hidden`}
      id="analysis-result-card"
    >
      {/* Result Card Header with Risk Badge */}
      <div className={`p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 ${riskConfig.headerBg}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-xs border border-slate-200 dark:border-slate-700">
              {riskConfig.icon}
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Evaluation Assessment
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                {riskConfig.label}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${riskConfig.badgeClass}`}
            >
              {result.risk_level.toUpperCase()} RISK
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors shadow-xs"
              title="Copy analysis summary to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Report</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Verdict Statement */}
        <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
          <p className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
            {result.verdict}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            {riskConfig.description}
          </p>

          {analyzedImage && (
            <div className="mt-3.5 pt-3 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-wrap items-center gap-3">
              <div
                onClick={() => setShowFullImage(!showFullImage)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-2xs"
              >
                <img
                  src={analyzedImage.dataUrl}
                  alt="Scanned ad poster thumbnail"
                  className="w-7 h-7 rounded object-cover border border-slate-200 dark:border-slate-700"
                  referrerPolicy="no-referrer"
                />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                  {analyzedImage.name}
                </span>
                <span className="text-2xs text-emerald-600 dark:text-emerald-400 font-medium">
                  {showFullImage ? '(Hide Poster)' : '(View Poster)'}
                </span>
              </div>
            </div>
          )}

          {analyzedImage && showFullImage && (
            <div className="mt-3 p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
              <img
                src={analyzedImage.dataUrl}
                alt="Full scanned ad poster"
                className="max-h-96 rounded-lg object-contain border border-slate-200 dark:border-slate-800 shadow-xs"
                referrerPolicy="no-referrer"
              />
              <span className="text-2xs text-slate-500 dark:text-slate-400 mt-2">
                Poster scanned and cross-referenced by AI model
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Flags Grid */}
      <div className="p-5 sm:p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Red Flags Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                Red Flags Detected ({result.red_flags.length})
              </h3>
              {result.red_flags.length > 0 && (
                <span className="text-xs font-medium text-red-600 dark:text-red-400">
                  Critical warning signs
                </span>
              )}
            </div>

            {result.red_flags.length === 0 ? (
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  No explicit red flags or known Pakistani recruitment scam patterns were identified in this text.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {result.red_flags.map((item, index) => (
                  <div
                    key={index}
                    className="p-3.5 rounded-xl border border-red-200 dark:border-red-950/60 bg-red-50/40 dark:bg-red-950/20 text-slate-800 dark:text-slate-200"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="p-1 rounded-md bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300 mt-0.5 flex-shrink-0">
                        <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-red-900 dark:text-red-200">
                          {item.flag}
                        </h4>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-normal">
                          {item.why}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Green Flags Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Green Flags Found ({result.green_flags.length})
              </h3>
              {result.green_flags.length > 0 && (
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  Reassuring signals
                </span>
              )}
            </div>

            {result.green_flags.length === 0 ? (
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex items-start gap-3">
                <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Few reassuring signals found. The posting lacks standard company credentials, benefits, or professional application protocols.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {result.green_flags.map((flagText, index) => (
                  <div
                    key={index}
                    className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-950/60 bg-emerald-50/40 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-200"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="p-1 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 mt-0.5 flex-shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-normal">
                        {flagText}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action button to test another */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <span>Analyze another posting</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
