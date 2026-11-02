import React, { useState } from 'react';
import { Search, X, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { Article, Category } from '../../types';

interface SearchModalProps {
  articles: Article[];
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ articles, onClose, onSelectArticle }) => {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const trendingTopics = [
    'AfCFTA Trade Pact',
    'County Allocation Bill',
    'Silicon Savannah AI',
    'Iten Marathon Prodigies',
    'Olkaria Geothermal',
    'Universal Health Coverage'
  ];

  const results = articles.filter(art => {
    const q = query.toLowerCase().trim();
    const matchCat = categoryFilter === 'All' || art.category === categoryFilter;
    if (!q) return matchCat;
    const matchText = art.title.toLowerCase().includes(q) ||
      art.subtitle.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q) ||
      art.tags.some(t => t.toLowerCase().includes(q));
    return matchCat && matchText;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24">
      <div className="bg-[#FBF9F5] dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-xs shadow-2xl max-w-2xl w-full flex flex-col overflow-hidden max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news, politics, business, investigations, opinions..."
            autoFocus
            className="w-full bg-transparent text-sm sm:text-base text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-stone-400 hover:text-stone-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-900 dark:hover:text-white ml-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Trending Chips */}
        <div className="px-4 py-2.5 bg-stone-100/60 dark:bg-stone-950/60 border-b border-stone-200 dark:border-stone-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="flex items-center gap-1 font-bold text-stone-500 uppercase tracking-wider text-[10px] shrink-0 font-mono">
            <TrendingUp className="w-3 h-3 text-amber-600" />
            <span>Trending:</span>
          </span>
          {trendingTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => setQuery(topic)}
              className="px-2 py-0.5 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded text-[11px] whitespace-nowrap hover:border-amber-600 transition-colors"
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto flex-1 divide-y divide-stone-200 dark:divide-stone-800">
          <div className="text-[11px] uppercase tracking-wider text-stone-500 font-mono mb-2">
            {results.length} Stories Found
          </div>

          {results.map((art) => (
            <div
              key={art.id}
              onClick={() => {
                onSelectArticle(art);
                onClose();
              }}
              className="py-3 flex gap-3.5 items-start cursor-pointer group"
            >
              <div className="w-20 aspect-[4/3] bg-stone-200 dark:bg-stone-800 overflow-hidden shrink-0">
                <img 
                  src={art.featuredImage} 
                  alt={art.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] text-amber-700 dark:text-amber-400 uppercase font-semibold mb-0.5">
                  <span>{art.category}</span>
                  <span className="text-stone-400">·</span>
                  <span className="text-stone-500 font-normal">{art.readTimeMinutes}m read</span>
                </div>

                <h4 className="font-editorial text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 transition-colors line-clamp-1">
                  {art.title}
                </h4>

                <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                  {art.subtitle || art.summary}
                </p>
              </div>
            </div>
          ))}

          {results.length === 0 && (
            <div className="py-12 text-center text-stone-500 text-xs">
              No matching stories found for "{query}". Try searching by broader topics like 'Kenya', 'Parliament', 'Trade', or 'Athletics'.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
