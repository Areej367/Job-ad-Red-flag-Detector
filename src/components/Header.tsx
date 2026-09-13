import React from 'react';
import { Shield, Sun, Moon, Home, ScanSearch } from 'lucide-react';
import type { ThemeMode, ActiveTab } from '../types';

interface HeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  activeTab,
  onSelectTab,
}) => {
  return (
    <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <button
          type="button"
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
            <Shield className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Job Ad Red Flag Detector
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-2xs font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Pakistan
              </span>
            </div>
            <p className="text-2xs sm:text-xs text-slate-500 dark:text-slate-400">
              Scam &amp; fraud verification tool
            </p>
          </div>
        </button>

        {/* Right side controls: Navigation tabs + Theme toggle */}
        <div className="flex items-center gap-2">
          <nav className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <button
              id="nav-home-btn"
              type="button"
              onClick={() => onSelectTab('home')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>

            <button
              id="nav-scanner-btn"
              type="button"
              onClick={() => onSelectTab('detector')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'detector'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <ScanSearch className="w-3.5 h-3.5" />
              <span>Scan Ad</span>
            </button>
          </nav>

          {/* Theme toggle button */}
          <button
            id="theme-toggle-btn"
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

