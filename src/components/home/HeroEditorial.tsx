import React from 'react';
import { Clock, TrendingUp, Share2, Bookmark, Flame } from 'lucide-react';
import { Article } from '../../types';

interface HeroEditorialProps {
  leadArticle: Article;
  secondaryArticles: Article[];
  trendingArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onBookmarkArticle: (article: Article) => void;
  isBookmarked: (id: string) => boolean;
}

export const HeroEditorial: React.FC<HeroEditorialProps> = ({
  leadArticle,
  secondaryArticles,
  trendingArticles,
  onSelectArticle,
  onBookmarkArticle,
  isBookmarked,
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6 border-b border-stone-200 dark:border-stone-800">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* TIER 1: DOMINANT LEAD STORY (7 COLUMNS) */}
        <div className="lg:col-span-7 flex flex-col justify-between group">
          <div>
            {/* Visual Container */}
            <div 
              className="relative aspect-[16/9] w-full overflow-hidden bg-stone-200 dark:bg-stone-800 cursor-pointer mb-4"
              onClick={() => onSelectArticle(leadArticle)}
            >
              <img 
                src={leadArticle.featuredImage} 
                alt={leadArticle.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              {leadArticle.isBreaking && (
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 flex items-center gap-1 shadow-md">
                  <Flame className="w-3 h-3" />
                  <span>Breaking Story</span>
                </div>
              )}
            </div>

            {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 mb-2 uppercase tracking-wider">
              <span>{leadArticle.category}</span>
              <span className="text-stone-400" aria-hidden="true">·</span>
              <span className="text-stone-500 dark:text-stone-400 normal-case font-normal">
                {new Intl.DateTimeFormat('en-KE', { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }).format(new Date(leadArticle.publishedAt))}
              </span>
              <span className="text-stone-400" aria-hidden="true">·</span>
              <span className="text-stone-500 dark:text-stone-400 normal-case font-normal flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{leadArticle.readTimeMinutes} min read</span>
              </span>
            </div>

            {/* Lead Headline */}
            <h2 
              onClick={() => onSelectArticle(leadArticle)}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-editorial text-stone-900 dark:text-white leading-[1.15] mb-3 cursor-pointer group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors"
            >
              {leadArticle.title}
            </h2>

            {/* Deck / Subtitle */}
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed mb-4 line-clamp-3">
              {leadArticle.subtitle || leadArticle.summary}
            </p>
          </div>

          {/* Byline & Author */}
          <div className="flex items-center justify-between pt-3 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400">
            <div className="flex items-center gap-2.5">
              <img 
                src={leadArticle.author.avatar} 
                alt={leadArticle.author.name}
                className="w-7 h-7 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="font-semibold text-stone-800 dark:text-stone-200 block">
                  By {leadArticle.author.name}
                </span>
                <span className="text-[11px] text-stone-500">
                  {leadArticle.author.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onBookmarkArticle(leadArticle)}
                className={`p-1.5 rounded transition-colors ${
                  isBookmarked(leadArticle.id) 
                    ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/40' 
                    : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
                title="Save article"
                aria-label="Save lead article"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* TIER 2 & TIER 3 (5 COLUMNS: 2 Secondary + 1 Trending Rail) */}
        <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-stone-200 dark:divide-stone-800">
          
          {/* Secondary Featured Stories */}
          <div className="pb-6 space-y-6">
            {secondaryArticles.slice(0, 2).map((art) => (
              <article key={art.id} className="group cursor-pointer flex gap-4 items-start" onClick={() => onSelectArticle(art)}>
                <div className="w-1/3 aspect-[4/3] bg-stone-200 dark:bg-stone-800 overflow-hidden shrink-0">
                  <img 
                    src={art.featuredImage} 
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="w-2/3">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-700 dark:text-amber-400 mb-1 uppercase tracking-wider">
                    <span>{art.category}</span>
                    <span className="text-stone-400">·</span>
                    <span className="text-stone-500 dark:text-stone-400 normal-case font-normal">{art.readTimeMinutes}m</span>
                  </div>
                  <h3 className="font-editorial text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors leading-snug line-clamp-2 mb-1">
                    {art.title}
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 text-xs line-clamp-2 leading-relaxed">
                    {art.subtitle || art.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Trending in Kenya Strip */}
          <div className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-stone-900 dark:text-white">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span>Trending Across Kenya</span>
              </div>
              <span className="text-[11px] text-stone-500 font-mono">Live Reads</span>
            </div>

            <div className="space-y-3.5">
              {trendingArticles.slice(0, 4).map((art, idx) => (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="flex items-start gap-3 group cursor-pointer"
                >
                  <span className="font-editorial text-2xl font-black text-stone-300 dark:text-stone-700 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors w-6 shrink-0 leading-none">
                    0{idx + 1}
                  </span>
                  <div className="flex-1">
                    <h4 className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-stone-500 mt-1">
                      <span>{art.category}</span>
                      <span>·</span>
                      <span>{(art.views).toLocaleString()} reads</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
