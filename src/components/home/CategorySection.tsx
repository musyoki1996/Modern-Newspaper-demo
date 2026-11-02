import React from 'react';
import { ArrowRight, Clock, Bookmark } from 'lucide-react';
import { Article, Category } from '../../types';

interface CategorySectionProps {
  category: Category;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onSelectCategory: (cat: string) => void;
  onBookmarkArticle: (article: Article) => void;
  isBookmarked: (id: string) => boolean;
  layout?: 'grid' | 'split' | 'magazine';
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  articles,
  onSelectArticle,
  onSelectCategory,
  onBookmarkArticle,
  isBookmarked,
  layout = 'split',
}) => {
  if (articles.length === 0) return null;

  const featured = articles[0];
  const listItems = articles.slice(1, 4);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 border-b border-stone-200 dark:border-stone-800">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-stone-900 dark:border-stone-100">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-amber-600"></span>
          <h3 className="text-xl sm:text-2xl font-bold font-editorial text-stone-900 dark:text-white uppercase tracking-tight">
            {category}
          </h3>
        </div>
        <button
          onClick={() => onSelectCategory(category)}
          className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
        >
          <span>View All in {category}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Editorial Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Category Featured Story (7 Cols) */}
        <div className="lg:col-span-7 group cursor-pointer" onClick={() => onSelectArticle(featured)}>
          <div className="aspect-[16/10] w-full overflow-hidden bg-stone-200 dark:bg-stone-800 mb-4 relative">
            <img 
              src={featured.featuredImage} 
              alt={featured.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2 font-medium">
            <span className="text-amber-700 dark:text-amber-400 uppercase tracking-wider font-semibold">{featured.category}</span>
            <span>·</span>
            <span>{new Intl.DateTimeFormat('en-KE', { month: 'short', day: 'numeric' }).format(new Date(featured.publishedAt))}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{featured.readTimeMinutes} min</span>
            </span>
          </div>

          <h4 className="text-xl sm:text-2xl font-bold font-editorial text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors leading-snug mb-2">
            {featured.title}
          </h4>

          <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed line-clamp-3 mb-4">
            {featured.subtitle || featured.summary}
          </p>

          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>By {featured.author.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmarkArticle(featured);
              }}
              className="p-1 text-stone-400 hover:text-amber-600"
              title="Save article"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked(featured.id) ? 'fill-amber-600 text-amber-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Side Stacked Stories (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col divide-y divide-stone-200 dark:divide-stone-800">
          {listItems.map((art) => (
            <article 
              key={art.id} 
              className="py-4 first:pt-0 last:pb-0 group cursor-pointer flex gap-4 items-center"
              onClick={() => onSelectArticle(art)}
            >
              <div className="w-28 sm:w-32 aspect-[4/3] bg-stone-200 dark:bg-stone-800 overflow-hidden shrink-0">
                <img 
                  src={art.featuredImage} 
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-[11px] text-stone-500 mb-1">
                  <span>{new Intl.DateTimeFormat('en-KE', { month: 'short', day: 'numeric' }).format(new Date(art.publishedAt))}</span>
                  <span>·</span>
                  <span>{art.readTimeMinutes}m</span>
                </div>
                <h5 className="font-editorial text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
                  {art.title}
                </h5>
                <span className="text-xs text-stone-500 mt-1 block">
                  By {art.author.name}
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
