/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { JobInput } from './components/JobInput';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { ResultCard } from './components/ResultCard';
import { EmptyState } from './components/EmptyState';
import { ErrorMessage } from './components/ErrorMessage';
import { Footer } from './components/Footer';
import { SCAM_JOB_EXAMPLE, LEGIT_JOB_EXAMPLE } from './data/sampleJobs';
import { createSampleScamPoster } from './data/samplePoster';
import { ArrowLeft } from 'lucide-react';
import type { JobAnalysisResult, ThemeMode, UploadedImage, ActiveTab } from './types';

export default function App() {
  // Navigation tab: 'home' or 'detector'
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // Theme state: initialized from system preference and kept in-memory (no localStorage)
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark';
    }
    return 'light';
  });

  // Apply dark mode class to document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Job text, ad image, and analysis state
  const [jobText, setJobText] = useState('');
  const [image, setImage] = useState<UploadedImage | null>(null);
  const [analyzedImage, setAnalyzedImage] = useState<UploadedImage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<JobAnalysisResult | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async () => {
    const trimmed = jobText.trim();
    const hasImage = image !== null && Boolean(image.base64);

    // Validate that either text or image is supplied
    if (!trimmed && !hasImage) {
      setValidationError('Please paste a job posting or upload an ad poster/image before running the check.');
      return;
    }
    if (!hasImage && trimmed.length < 15) {
      setValidationError('The job posting text is too short. Please provide the full job description or attach an ad poster.');
      return;
    }

    setValidationError(null);
    setApiError(null);
    setIsLoading(true);

    // Scroll to results area smoothly
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);

    try {
      const response = await fetch('/api/analyze-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobText: trimmed,
          image: hasImage
            ? {
                mimeType: image.mimeType,
                base64: image.base64,
              }
            : null,
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      let data: any = null;

      if (contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (jsonErr) {
          console.warn('Could not parse response as JSON:', jsonErr);
        }
      }

      if (!response.ok) {
        if (data && data.error) {
          throw new Error(data.error);
        }

        if (response.status === 404) {
          throw new Error(
            'The job analysis service endpoint was not found (404 Not Found). Please verify your deployed backend service is active and listening.'
          );
        }

        if (response.status === 502 || response.status === 503 || response.status === 504) {
          throw new Error(
            `The analysis server is temporarily starting up (Status ${response.status}). Please wait 5-10 seconds and click Retry Analysis.`
          );
        }

        throw new Error(
          `Analysis request failed with status ${response.status} (${response.statusText || 'Error'}). Please retry.`
        );
      }

      if (!data) {
        throw new Error(
          'Received an invalid response format from the server. Please wait a moment and try again.'
        );
      }

      setAnalysisResult(data);
      setAnalyzedImage(image);
    } catch (err: any) {
      console.error('Job analysis error:', err);
      setApiError(
        err.message || 'Unable to complete the analysis at this moment. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setAnalyzedImage(null);
    setApiError(null);
    setValidationError(null);
    setJobText('');
    setImage(null);
  };

  const navigateToScanner = () => {
    setActiveTab('detector');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadScamText = () => {
    setJobText(SCAM_JOB_EXAMPLE);
    setImage(null);
    setValidationError(null);
    setApiError(null);
    setAnalysisResult(null);
    navigateToScanner();
  };

  const handleLoadScamPoster = () => {
    setImage(createSampleScamPoster());
    setJobText('');
    setValidationError(null);
    setApiError(null);
    setAnalysisResult(null);
    navigateToScanner();
  };

  const handleLoadLegitJob = () => {
    setJobText(LEGIT_JOB_EXAMPLE);
    setImage(null);
    setValidationError(null);
    setApiError(null);
    setAnalysisResult(null);
    navigateToScanner();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {activeTab === 'home' ? (
          <HomePage
            onStartScanner={navigateToScanner}
            onLoadScamText={handleLoadScamText}
            onLoadScamPoster={handleLoadScamPoster}
            onLoadLegitJob={handleLoadLegitJob}
          />
        ) : (
          <div className="space-y-6 animate-fadeIn">
            {/* Back button to Home */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Overview &amp; Guide</span>
              </button>

              <span className="text-2xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                AI Detector
              </span>
            </div>

            {/* Main Job Input Section */}
            <section aria-labelledby="job-input-heading">
              <h2 id="job-input-heading" className="sr-only">
                Analyze Job Advertisement
              </h2>
              <JobInput
                jobText={jobText}
                onChangeText={(text) => {
                  setJobText(text);
                  if (apiError) setApiError(null);
                }}
                image={image}
                onImageChange={(newImg) => {
                  setImage(newImg);
                  if (apiError) setApiError(null);
                }}
                onSubmit={handleAnalyze}
                isLoading={isLoading}
                validationError={validationError}
                onClearValidation={() => setValidationError(null)}
              />
            </section>

            {/* Dynamic Analysis Area with aria-live for screen readers */}
            <section
              ref={resultsRef}
              id="analysis-output-section"
              aria-live="polite"
              aria-atomic="true"
              className="w-full space-y-6"
            >
              {/* Inline Error State */}
              {apiError && (
                <ErrorMessage
                  message={apiError}
                  onRetry={handleAnalyze}
                />
              )}

              {/* Loading Skeleton */}
              {isLoading && <LoadingSkeleton />}

              {/* Result Card when complete */}
              {!isLoading && analysisResult && (
                <ResultCard
                  result={analysisResult}
                  analyzedImage={analyzedImage}
                  onReset={handleReset}
                />
              )}

              {/* Empty state when no analysis is active */}
              {!isLoading && !analysisResult && !apiError && (
                <EmptyState
                  onSelectScam={() => {
                    setJobText(SCAM_JOB_EXAMPLE);
                    setImage(null);
                    setValidationError(null);
                    setApiError(null);
                  }}
                  onSelectLegit={() => {
                    setJobText(LEGIT_JOB_EXAMPLE);
                    setImage(null);
                    setValidationError(null);
                    setApiError(null);
                  }}
                  onSelectSamplePoster={() => {
                    setImage(createSampleScamPoster());
                    setValidationError(null);
                    setApiError(null);
                  }}
                />
              )}
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
