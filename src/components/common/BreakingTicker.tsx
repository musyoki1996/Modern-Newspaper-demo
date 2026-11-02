import React, { useState } from 'react';
import { Flame, ChevronRight, Pause, Play, X } from 'lucide-react';
import { Article } from '../../types';

interface BreakingTickerProps {
  breakingArticles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({ breakingArticles, onSelectArticle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || breakingArticles.length === 0) return null;

  const currentArticle = breakingArticles[currentIndex] || breakingArticles[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % breakingArticles.length);
  };

  return (
    <div className="w-full bg-stone-900 text-stone-100 border-b border-stone-800 text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Breaking badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-600 text-white font-bold tracking-wider uppercase text-[11px] shrink-0 rounded-xs">
            <Flame className="w-3.5 h-3.5" />
            <span>Breaking</span>
          </div>

          {/* Time & Headline */}
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <span className="text-stone-400 font-mono text-[11px] shrink-0">
              {new Date(currentArticle.publishedAt).toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="text-stone-600" aria-hidden="true">·</span>
            <button
              onClick={() => onSelectArticle(currentArticle)}
              className="text-left font-medium text-stone-100 hover:text-amber-400 transition-colors truncate hover:underline cursor-pointer"
            >
              {currentArticle.title}
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0 text-stone-400">
          {breakingArticles.length > 1 && (
            <button
              onClick={handleNext}
              className="hover:text-white transition-colors p-1"
              title="Next breaking update"
              aria-label="Next breaking update"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="hover:text-white transition-colors p-1 hidden sm:block"
            title={isPaused ? "Resume ticker" : "Pause ticker"}
            aria-label={isPaused ? "Resume ticker" : "Pause ticker"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="hover:text-white transition-colors p-1"
            title="Dismiss ticker"
            aria-label="Dismiss ticker"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
