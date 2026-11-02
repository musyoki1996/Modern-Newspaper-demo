import React, { useState } from 'react';
import { 
  Search, 
  Bookmark, 
  User, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Radio, 
  SlidersHorizontal,
  CloudSun,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { Category, ReaderUser } from '../../types';

interface HeaderProps {
  currentCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenSearch: () => void;
  onOpenReaderProfile: () => void;
  onOpenCMS: () => void;
  onOpenLiveBlog: () => void;
  onOpenMultimedia: () => void;
  onOpenBookmarks: () => void;
  savedCount: number;
  user: ReaderUser | null;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  edition: 'Kenya' | 'Global Africa';
  onToggleEdition: () => void;
}

export const CATEGORIES: { label: string; value: Category | 'Home' | 'Live' | 'Multimedia' }[] = [
  { label: 'Home', value: 'Home' },
  { label: 'Kenya News', value: 'Kenya' },
  { label: 'Politics', value: 'Politics' },
  { label: 'Business', value: 'Business' },
  { label: 'Technology', value: 'Technology' },
  { label: 'Sports', value: 'Sports' },
  { label: 'Entertainment', value: 'Entertainment' },
  { label: 'Investigations', value: 'Investigations' },
  { label: 'Lifestyle', value: 'Lifestyle' },
  { label: 'Health', value: 'Health' },
  { label: 'Opinion', value: 'Opinion' },
  { label: 'Multimedia', value: 'Multimedia' },
  { label: 'Live Blog', value: 'Live' },
];

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenSearch,
  onOpenReaderProfile,
  onOpenCMS,
  onOpenLiveBlog,
  onOpenMultimedia,
  onOpenBookmarks,
  savedCount,
  user,
  darkMode,
  onToggleDarkMode,
  edition,
  onToggleEdition,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const todayStr = new Intl.DateTimeFormat('en-KE', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }).format(new Date());

  const handleNavClick = (val: string) => {
    setMobileMenuOpen(false);
    if (val === 'Live') {
      onOpenLiveBlog();
    } else if (val === 'Multimedia') {
      onOpenMultimedia();
    } else {
      onSelectCategory(val);
    }
  };

  return (
    <header className="w-full bg-[#FBF9F5] dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors border-b border-stone-200 dark:border-stone-800">
      {/* 1. TOP UTILITY BAR */}
      <div className="w-full border-b border-stone-200 dark:border-stone-800 text-xs py-1.5 px-4 bg-stone-100/70 dark:bg-stone-900/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Date, Weather, FX */}
          <div className="flex items-center gap-4 text-stone-600 dark:text-stone-400">
            <span className="font-medium">{todayStr}</span>
            <span className="hidden md:inline" aria-hidden="true">·</span>
            <div className="hidden md:flex items-center gap-1.5">
              <CloudSun className="w-3.5 h-3.5 text-amber-600" />
              <span>Nairobi 24°C / 75°F</span>
            </div>
            <span className="hidden lg:inline" aria-hidden="true">·</span>
            <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-stone-500">
              <span>USD/KES 129.40</span>
              <span>GBP/KES 167.20</span>
            </div>
          </div>

          {/* Right: Edition, Bookmarks, CMS, Reader Account, Theme */}
          <div className="flex items-center gap-3">
            {/* Edition Toggle */}
            <button
              onClick={onToggleEdition}
              className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded border border-stone-300 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors font-medium"
              title="Switch Regional Edition"
            >
              {edition}
            </button>

            {/* Saved Bookmarks */}
            <button
              onClick={onOpenBookmarks}
              className="relative p-1.5 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              title="Saved Articles"
              aria-label="View saved articles"
            >
              <Bookmark className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Editorial CMS Access */}
            <button
              onClick={onOpenCMS}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-stone-800 dark:bg-stone-800 hover:bg-stone-900 text-white rounded-xs transition-colors"
              title="Open Newsroom Editorial CMS"
            >
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              <span>Newsroom CMS</span>
            </button>

            {/* Reader Account */}
            <button
              onClick={onOpenReaderProfile}
              className="flex items-center gap-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
              title="Reader Profile"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{user ? user.name.split(' ')[0] : 'Sign In'}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-1.5 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN BRAND MASTHEAD */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Sub-Action / Search Trigger */}
        <div className="w-full md:w-1/4 flex items-center justify-between md:justify-start gap-3 order-2 md:order-1">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xs border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900 text-stone-500 dark:text-stone-400 text-xs hover:border-stone-400 dark:hover:border-stone-600 transition-all w-full sm:w-auto"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search Kenya & World news...</span>
            <kbd className="hidden lg:inline font-mono text-[10px] bg-stone-100 dark:bg-stone-800 px-1 rounded">⌘K</kbd>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Center Masthead Logo */}
        <div className="text-center order-1 md:order-2">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('Home');
            }}
            className="inline-block group"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-editorial tracking-tight text-stone-900 dark:text-white group-hover:text-stone-800 transition-colors uppercase">
              The Kenya Chronicle
            </h1>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-stone-500 dark:text-stone-400 font-medium mt-1">
              The Independent Voice of East Africa · Verified Journalism
            </p>
          </a>
        </div>

        {/* Right CTA / Live Indicator */}
        <div className="hidden md:flex items-center justify-end gap-3 w-1/4 order-3">
          <button
            onClick={onOpenLiveBlog}
            className="flex items-center gap-2 px-3 py-1.5 bg-red-600/10 dark:bg-red-950/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-xs text-xs font-semibold hover:bg-red-600 hover:text-white transition-all"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse text-red-600" />
            <span>Live Coverage</span>
          </button>

          <button
            onClick={onOpenReaderProfile}
            className="px-3.5 py-1.5 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs font-semibold rounded-xs hover:bg-amber-600 dark:hover:bg-amber-500 dark:hover:text-stone-950 transition-colors shadow-xs"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* 3. STICKY CATEGORY NAVIGATION RAIL */}
      <nav className="w-full border-t border-b border-stone-200 dark:border-stone-800 bg-[#FBF9F5] dark:bg-stone-950 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden md:flex items-center justify-between overflow-x-auto no-scrollbar py-2.5 gap-6 text-xs uppercase tracking-wider font-semibold">
            {CATEGORIES.map((cat) => {
              const isActive = (cat.value === 'Home' && currentCategory === 'Home') || (currentCategory === cat.value);
              return (
                <button
                  key={cat.value}
                  onClick={() => handleNavClick(cat.value)}
                  className={`whitespace-nowrap transition-colors relative py-1 hover:text-amber-700 dark:hover:text-amber-400 ${
                    isActive
                      ? 'text-amber-700 dark:text-amber-400 font-bold border-b-2 border-amber-700 dark:border-amber-400'
                      : 'text-stone-700 dark:text-stone-300'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-[#FBF9F5] dark:bg-stone-950 px-4 py-4 shadow-lg animate-in fade-in">
            <div className="grid grid-cols-2 gap-2 text-sm font-medium mb-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleNavClick(cat.value)}
                  className={`text-left py-2 px-3 rounded-xs transition-colors ${
                    currentCategory === cat.value
                      ? 'bg-amber-600 text-white font-bold'
                      : 'text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenCMS(); }}
                className="w-full py-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold text-xs rounded-xs flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Open Editorial CMS</span>
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenLiveBlog(); }}
                className="w-full py-2 border border-red-500 text-red-600 dark:text-red-400 font-semibold text-xs rounded-xs flex items-center justify-center gap-2"
              >
                <Radio className="w-4 h-4" />
                <span>Live Blog Coverage</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
