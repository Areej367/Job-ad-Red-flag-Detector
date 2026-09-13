import React from 'react';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  UploadCloud,
  FileText,
  CreditCard,
  Building2,
  Lock,
  ExternalLink,
  Sparkles,
  Phone,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye,
  AlertOctagon,
} from 'lucide-react';

interface HomePageProps {
  onStartScanner: () => void;
  onLoadScamText: () => void;
  onLoadScamPoster: () => void;
  onLoadLegitJob: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartScanner,
  onLoadScamText,
  onLoadScamPoster,
  onLoadLegitJob,
}) => {
  return (
    <div className="space-y-12 sm:space-y-16 py-2">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-emerald-50/70 via-white to-slate-50/50 dark:from-emerald-950/20 dark:via-slate-900/60 dark:to-slate-900/40 border border-emerald-100 dark:border-emerald-900/40 p-6 sm:p-10 text-center shadow-xs">
        <div className="max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <Shield className="w-3.5 h-3.5" />
            <span>Dedicated Anti-Scam Intelligence for Pakistan</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-slate-50 leading-tight">
            Protect Yourself from <br className="hidden sm:inline" />
            <span className="text-emerald-700 dark:text-emerald-400">
              Fake Job Ads &amp; Recruitment Scams
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Thousands of Pakistani youth lose hard-earned cash to JazzCash/EasyPaisa registration
            fees, fake overseas promises, and CNIC identity theft. Our AI scans job postings,
            WhatsApp flyers, and newspaper ads before you apply.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              id="hero-scan-btn"
              type="button"
              onClick={onStartScanner}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <span>Scan a Job Posting or Poster</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-try-sample-btn"
              type="button"
              onClick={onLoadScamText}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-2xs transition-all cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span>Try Scam Text Demo</span>
            </button>

            <button
              id="hero-try-poster-btn"
              type="button"
              onClick={onLoadScamPoster}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-2xs transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Try Poster Scan Demo</span>
            </button>
          </div>

          {/* Quick Stats / Highlights */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left border-t border-slate-200/60 dark:border-slate-800/80">
            <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Fee Policy</span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                Zero Upfront Rule
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Input Format</span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mt-0.5">
                <UploadCloud className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                Text &amp; Ad Images
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">ID Protection</span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mt-0.5">
                <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                CNIC Safeguard
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Speed</span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mt-0.5">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                Instant AI Verdict
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            How The Detector Protects You
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Analyze any suspicious employment ad in three straightforward steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center text-base">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Paste Text or Drop Poster
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Copy the job posting text from Facebook, LinkedIn, Rozee, or OLX — or directly upload a screenshot of a WhatsApp flyer or Urdu newspaper ad.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center text-base">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Pakistani Scam Pattern Engine
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Gemini scans for known local red flags: EasyPaisa/JazzCash fee deposits, unrealistic SMS typing wages, burner phone numbers, and premature CNIC requests.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center text-base">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Actionable Risk Report
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Receive a color-coded Low, Medium, or High Risk verdict, along with itemized red flags, reassuring signals, and verification advice before you respond.
            </p>
          </div>
        </div>
      </section>

      {/* 3. COMMON JOB SCAMS IN PAKISTAN */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400">
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>Know the Tactics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Top 5 Job Scams Targeting Pakistanis
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
            Scammers exploit economic pressure and youth unemployment with predictable fraud patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Scam 1 */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/70 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                1. Upfront "Security Deposit" or Courier Fee
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>The Trap:</strong> Demands Rs. 1,500 to Rs. 4,500 sent via EasyPaisa or JazzCash for "work materials, ID card printing, or courier delivery." They promise it is 100% refundable on first paycheck.
            </p>
            <div className="text-2xs font-semibold text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/40 px-2.5 py-1.5 rounded-lg border border-red-200/60 dark:border-red-900/60">
              Golden Rule: Real companies never charge candidates money to start work.
            </div>
          </div>

          {/* Scam 2 */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                2. Fake Home-Based SMS &amp; Typing Jobs
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>The Trap:</strong> Offers PKR 90,000 to PKR 160,000 per month for typing SMS or captcha codes 1-2 hours a day. Targeted at housewives, matric students, and fresh graduates.
            </p>
            <div className="text-2xs font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1.5 rounded-lg border border-amber-200/60 dark:border-amber-900/60">
              Red Flag: Unrealistic compensation with zero experience or skills required.
            </div>
          </div>

          {/* Scam 3 */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                3. Premature CNIC &amp; Bank Account Harvesting
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>The Trap:</strong> Requests color photos of your original CNIC (front and back) and OTP verification codes before any interview. Scammers use these to register fraudulent SIM cards or open mule bank accounts.
            </p>
            <div className="text-2xs font-semibold text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 px-2.5 py-1.5 rounded-lg border border-purple-200/60 dark:border-purple-900/60">
              Defense: Never share clear CNIC copies or SMS OTPs with unverified WhatsApp contacts.
            </div>
          </div>

          {/* Scam 4 */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                4. WhatsApp-Only "Multinational" Recruiters
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>The Trap:</strong> Claims to represent famous brands (like Amazon, Daraz, Unilever) but communicates strictly through personal WhatsApp numbers or free Gmail addresses without an official company domain.
            </p>
            <div className="text-2xs font-semibold text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1.5 rounded-lg border border-blue-200/60 dark:border-blue-900/60">
              Check: Authentic corporate recruiters use official domain emails (e.g. hr@company.com).
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPARISON: RED FLAGS VS GREEN FLAGS */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Quick Comparison: Scam vs. Legitimate
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Keep this mental checklist whenever reading an employment posting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Red Flags Column */}
          <div className="p-6 rounded-2xl bg-red-50/40 dark:bg-red-950/20 border border-red-200/70 dark:border-red-900/40 space-y-4">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-bold text-base">
              <XCircle className="w-5 h-5" />
              <span>Red Flags (Scam Indicators)</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Requires payment before work allotment (EasyPaisa, JazzCash, Raast).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Unrealistic salary: PKR 100k+ for elementary copy-paste tasks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Contact is solely a personal WhatsApp number with no physical address.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Demands original CNIC photographs before conducting an interview.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Urgency tactics: "Only 2 seats remaining, pay within 30 minutes".</span>
              </li>
            </ul>
          </div>

          {/* Green Flags Column */}
          <div className="p-6 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-900/40 space-y-4">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-base">
              <CheckCircle2 className="w-5 h-5" />
              <span>Green Flags (Legitimate Hiring)</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>Explicitly states "No application or interview fees are charged".</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>Transparent salary ranges commensurate with Pakistani market rates.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>Official company domain email (e.g. careers@company.pk).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>Clear physical business address (e.g. Gulberg Lahore, I.I. Chundrigar Karachi).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>Structured hiring process with HR screening and technical test.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. VERIFICATION & REPORTING DIRECTORY */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <Building2 className="w-3.5 h-3.5" />
            <span>Official Pakistani Verification Channels</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
            Where to Verify &amp; Report Scams in Pakistan
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              SECP Company Registry
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Verify if the hiring firm is an officially registered Private Limited (Pvt Ltd) company in Pakistan.
            </p>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 inline-block">
              secp.gov.pk
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Bureau of Emigration (BEOE)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Always verify overseas recruiting promoters and visa permissions before paying any agent.
            </p>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 inline-block">
              beoe.gov.pk
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              FIA Cyber Crime Wing (1991)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              If scammed of money or CNIC information, file an immediate complaint with the FIA Cyber Crime helpline.
            </p>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 inline-block">
              Helpline: 1991 • complaint.fia.gov.pk
            </span>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA BANNER */}
      <section className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-center space-y-4 shadow-sm">
        <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
          Unsure About a Job Offer or WhatsApp Message?
        </h3>
        <p className="text-sm sm:text-base text-emerald-100 max-w-xl mx-auto">
          Paste the job text or upload an ad screenshot right now. It takes less than 5 seconds to safeguard your money and identity.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onStartScanner}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 text-sm font-bold shadow transition-all cursor-pointer"
          >
            <span>Open Job Ad Detector</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onLoadLegitJob}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-800/80 hover:bg-emerald-800 text-white text-sm font-semibold border border-emerald-500/40 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Test Legitimate Job Posting</span>
          </button>
        </div>
      </section>
    </div>
  );
};
