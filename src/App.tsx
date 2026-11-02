import React, { useState, useEffect } from 'react';
import { 
  Header, 
  CATEGORIES 
} from './components/common/Header';
import { BreakingTicker } from './components/common/BreakingTicker';
import { HeroEditorial } from './components/home/HeroEditorial';
import { CategorySection } from './components/home/CategorySection';
import { MultimediaHub } from './components/home/MultimediaHub';
import { NewsletterSection } from './components/home/NewsletterSection';
import { Footer } from './components/common/Footer';
import { AdBanner } from './components/common/AdBanner';
import { ArticleDetail } from './components/article/ArticleDetail';
import { LiveBlogView } from './components/live/LiveBlogView';
import { MultimediaView } from './components/multimedia/MultimediaView';
import { AdminCMS } from './components/cms/AdminCMS';
import { SearchModal } from './components/common/SearchModal';
import { ReaderProfileModal } from './components/reader/ReaderProfileModal';
import { InstitutionalModal } from './components/info/InstitutionalModal';
import { Article, Category, ReaderUser, AdCampaign, LiveBlogEntry, MultimediaItem } from './types';
import { INITIAL_ARTICLES, INITIAL_ADS, INITIAL_LIVE_BLOG, INITIAL_MULTIMEDIA } from './data/initialArticles';

export default function App() {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [campaigns, setCampaigns] = useState<AdCampaign[]>(INITIAL_ADS);
  const [liveEntries, setLiveEntries] = useState<LiveBlogEntry[]>(INITIAL_LIVE_BLOG);
  const [multimediaItems, setMultimediaItems] = useState<MultimediaItem[]>(INITIAL_MULTIMEDIA);
  
  // Navigation & View State
  const [currentCategory, setCurrentCategory] = useState<string>('Home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [viewMode, setViewMode] = useState<'home' | 'category' | 'article' | 'live' | 'multimedia' | 'cms'>('home');

  // Modals
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [institutionalPage, setInstitutionalPage] = useState<'about' | 'editorial' | 'privacy' | 'terms' | 'advertise' | 'contact' | 'corrections' | null>(null);

  // User & Preferences
  const [darkMode, setDarkMode] = useState(false);
  const [edition, setEdition] = useState<'Kenya' | 'Global Africa'>('Kenya');
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(['art-lead-1', 'art-tech-1']);
  const [currentUser, setCurrentUser] = useState<ReaderUser>({
    id: 'user-1',
    name: 'Musa Kiprono',
    email: 'musa.kiprono@nairobi.ke',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80',
    role: 'subscriber',
    savedArticleIds: ['art-lead-1', 'art-tech-1'],
    readingHistory: [],
    categoryPreferences: ['Kenya', 'Politics', 'Business', 'Technology'],
    newsletterOptIn: true,
    notificationPreferences: {
      breaking: true,
      politics: true,
      business: true,
      sports: false,
      entertainment: true,
    }
  });

  // Fetch initial live articles from server
  useEffect(() => {
    fetch('/api/articles?includeAll=true')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setArticles(data.data);
        }
      })
      .catch(() => {});

    fetch('/api/ads')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setCampaigns(data.data);
        }
      })
      .catch(() => {});

    fetch('/api/live-blog')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setLiveEntries(data.data);
        }
      })
      .catch(() => {});
  }, []);

  // Theme synchronization
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Derived datasets
  const breakingArticles = articles.filter(a => a.isBreaking && a.status === 'published');
  const leadArticle = articles.find(a => a.isLead && a.status === 'published') || articles[0];
  const secondaryArticles = articles.filter(a => a.id !== leadArticle?.id && a.status === 'published');
  const trendingArticles = [...articles].filter(a => a.status === 'published').sort((a, b) => b.views - a.views);

  // Category specific articles
  const getCategoryArticles = (cat: string) => {
    return articles.filter(a => a.category.toLowerCase() === cat.toLowerCase() && a.status === 'published');
  };

  // Bookmark handlers
  const handleToggleBookmark = (article: Article) => {
    setSavedArticleIds(prev => {
      const exists = prev.includes(article.id);
      const updated = exists ? prev.filter(id => id !== article.id) : [...prev, article.id];
      return updated;
    });
  };

  const isBookmarked = (id: string) => savedArticleIds.includes(id);

  // Article selection handler
  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setViewMode('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryNav = (cat: string) => {
    setCurrentCategory(cat);
    if (cat === 'Home') {
      setViewMode('home');
    } else {
      setViewMode('category');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // CMS Article Operations
  const handleSaveArticle = async (data: Partial<Article>, id?: string) => {
    try {
      if (id) {
        const res = await fetch(`/api/articles/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const resData = await res.json();
        if (resData.success && resData.data) {
          setArticles(prev => prev.map(a => a.id === id ? resData.data : a));
        }
      } else {
        const res = await fetch('/api/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const resData = await res.json();
        if (resData.success && resData.data) {
          setArticles(prev => [resData.data, ...prev]);
        }
      }
    } catch (err) {
      console.error('Error saving article:', err);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    try {
      await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      setArticles(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error('Error deleting article:', err);
    }
  };

  const handleToggleBreaking = async (id: string, currentState: boolean) => {
    try {
      await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isBreaking: !currentState })
      });
      setArticles(prev => prev.map(a => a.id === id ? { ...a, isBreaking: !currentState } : a));
    } catch (err) {}
  };

  const handleToggleLead = async (id: string) => {
    try {
      await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isLead: true })
      });
      setArticles(prev => prev.map(a => ({ ...a, isLead: a.id === id })));
    } catch (err) {}
  };

  const handleAddLiveEntry = async (entry: any) => {
    try {
      const res = await fetch('/api/live-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
      const data = await res.json();
      if (data.success && data.data) {
        setLiveEntries(prev => [data.data, ...prev]);
      }
    } catch (err) {}
  };

  const handleAddAdCampaign = (camp: Partial<AdCampaign>) => {
    const newCamp: AdCampaign = {
      id: 'ad-' + Date.now(),
      title: camp.title || '',
      advertiser: camp.advertiser || '',
      slot: camp.slot || 'header_leaderboard',
      status: 'active',
      imageUrl: camp.imageUrl || '',
      targetUrl: camp.targetUrl || '',
      impressions: 0,
      clicks: 0,
      startDate: camp.startDate || new Date().toISOString().slice(0, 10),
      endDate: camp.endDate || '2026-12-31',
      budgetUsd: camp.budgetUsd || 2000
    };
    setCampaigns(prev => [newCamp, ...prev]);
  };

  // Keyboard shortcut for Cmd+K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF9F5] dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans selection:bg-amber-100 selection:text-stone-950">
      
      {/* 1. Breaking News Ticker Bar */}
      <BreakingTicker
        breakingArticles={breakingArticles}
        onSelectArticle={handleSelectArticle}
      />

      {/* 2. Top Header Leaderboard Ad Banner */}
      <AdBanner slot="header_leaderboard" campaign={campaigns.find(c => c.slot === 'header_leaderboard')} />

      {/* 3. Main Master Header */}
      <Header
        currentCategory={currentCategory}
        onSelectCategory={handleCategoryNav}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenReaderProfile={() => setProfileOpen(true)}
        onOpenCMS={() => setViewMode('cms')}
        onOpenLiveBlog={() => setViewMode('live')}
        onOpenMultimedia={() => setViewMode('multimedia')}
        onOpenBookmarks={() => setProfileOpen(true)}
        savedCount={savedArticleIds.length}
        user={currentUser}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        edition={edition}
        onToggleEdition={() => setEdition(edition === 'Kenya' ? 'Global Africa' : 'Kenya')}
      />

      {/* 4. MAIN ROUTER VIEWPORT */}
      <main className="flex-1 w-full">
        {/* VIEW A: CMS NEWSROOM DASHBOARD */}
        {viewMode === 'cms' && (
          <AdminCMS
            articles={articles}
            onSaveArticle={handleSaveArticle}
            onDeleteArticle={handleDeleteArticle}
            onToggleBreaking={handleToggleBreaking}
            onToggleLead={handleToggleLead}
            campaigns={campaigns}
            onAddCampaign={handleAddAdCampaign}
            onClose={() => setViewMode('home')}
            onViewArticle={(art) => {
              setSelectedArticle(art);
              setViewMode('article');
            }}
          />
        )}

        {/* VIEW B: ARTICLE DETAIL READING VIEW */}
        {viewMode === 'article' && selectedArticle && (
          <ArticleDetail
            article={selectedArticle}
            relatedArticles={articles.filter(a => a.id !== selectedArticle.id && a.category === selectedArticle.category)}
            onSelectArticle={handleSelectArticle}
            onBack={() => setViewMode('home')}
            onBookmark={handleToggleBookmark}
            isBookmarked={isBookmarked(selectedArticle.id)}
          />
        )}

        {/* VIEW C: LIVE BLOG ROLLING VIEW */}
        {viewMode === 'live' && (
          <LiveBlogView
            entries={liveEntries}
            onAddEntry={handleAddLiveEntry}
            onBack={() => setViewMode('home')}
            isStaff={true}
          />
        )}

        {/* VIEW D: MULTIMEDIA CATALOG VIEW */}
        {viewMode === 'multimedia' && (
          <MultimediaView
            items={multimediaItems}
            onBack={() => setViewMode('home')}
          />
        )}

        {/* VIEW E: DYNAMIC CATEGORY ARCHIVE VIEW */}
        {viewMode === 'category' && (
          <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8 pb-4 border-b-2 border-stone-900 dark:border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Chronicle Department
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold font-editorial text-stone-900 dark:text-white uppercase tracking-tight">
                  {currentCategory} News
                </h1>
              </div>
              <span className="text-xs text-stone-500 font-mono">
                {getCategoryArticles(currentCategory).length} Published Stories
              </span>
            </div>

            {getCategoryArticles(currentCategory).length === 0 ? (
              <div className="py-16 text-center text-stone-500 text-sm">
                No articles published under {currentCategory} yet. Visit our CMS to compose stories for this department.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getCategoryArticles(currentCategory).map(art => (
                  <article
                    key={art.id}
                    onClick={() => handleSelectArticle(art)}
                    className="group cursor-pointer bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[16/10] bg-stone-200 dark:bg-stone-800 overflow-hidden">
                        <img 
                          src={art.featuredImage} 
                          alt={art.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-400 uppercase font-semibold mb-1">
                          <span>{art.category}</span>
                          <span>·</span>
                          <span>{art.readTimeMinutes}m read</span>
                        </div>
                        <h2 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors leading-snug line-clamp-2 mb-2">
                          {art.title}
                        </h2>
                        <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                          {art.subtitle || art.summary}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 py-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500 flex items-center justify-between">
                      <span>By {art.author.name}</span>
                      <span>{new Intl.DateTimeFormat('en-KE', { month: 'short', day: 'numeric' }).format(new Date(art.publishedAt))}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW F: DEFAULT HOMEPAGE ARCHITECTURE */}
        {viewMode === 'home' && leadArticle && (
          <>
            {/* Lead Editorial Hero Section */}
            <HeroEditorial
              leadArticle={leadArticle}
              secondaryArticles={secondaryArticles}
              trendingArticles={trendingArticles}
              onSelectArticle={handleSelectArticle}
              onBookmarkArticle={handleToggleBookmark}
              isBookmarked={isBookmarked}
            />

            {/* Department 1: Kenya News & Politics */}
            <CategorySection
              category="Politics"
              articles={getCategoryArticles('Politics')}
              onSelectArticle={handleSelectArticle}
              onSelectCategory={handleCategoryNav}
              onBookmarkArticle={handleToggleBookmark}
              isBookmarked={isBookmarked}
            />

            {/* Department 2: Business & Silicon Savannah */}
            <CategorySection
              category="Technology"
              articles={getCategoryArticles('Technology')}
              onSelectArticle={handleSelectArticle}
              onSelectCategory={handleCategoryNav}
              onBookmarkArticle={handleToggleBookmark}
              isBookmarked={isBookmarked}
            />

            {/* Multimedia Hub Strip */}
            <MultimediaHub
              items={multimediaItems}
              onOpenMultimediaPage={() => setViewMode('multimedia')}
            />

            {/* Department 3: Sports & Athletics */}
            <CategorySection
              category="Sports"
              articles={getCategoryArticles('Sports')}
              onSelectArticle={handleSelectArticle}
              onSelectCategory={handleCategoryNav}
              onBookmarkArticle={handleToggleBookmark}
              isBookmarked={isBookmarked}
            />

            {/* Department 4: Contemporary Lifestyle & Culture */}
            <CategorySection
              category="Lifestyle"
              articles={getCategoryArticles('Lifestyle')}
              onSelectArticle={handleSelectArticle}
              onSelectCategory={handleCategoryNav}
              onBookmarkArticle={handleToggleBookmark}
              isBookmarked={isBookmarked}
            />

            {/* Department 5: Investigations */}
            <CategorySection
              category="Investigations"
              articles={getCategoryArticles('Investigations')}
              onSelectArticle={handleSelectArticle}
              onSelectCategory={handleCategoryNav}
              onBookmarkArticle={handleToggleBookmark}
              isBookmarked={isBookmarked}
            />

            {/* Newsletter Capture Section */}
            <NewsletterSection />
          </>
        )}
      </main>

      {/* 5. Master Footer */}
      <Footer
        onOpenPage={(type) => setInstitutionalPage(type)}
        onSelectCategory={handleCategoryNav}
      />

      {/* Search Modal */}
      {searchOpen && (
        <SearchModal
          articles={articles}
          onClose={() => setSearchOpen(false)}
          onSelectArticle={handleSelectArticle}
        />
      )}

      {/* Reader Profile & Bookmarks Modal */}
      {profileOpen && (
        <ReaderProfileModal
          user={currentUser}
          savedArticles={articles.filter(a => savedArticleIds.includes(a.id))}
          onClose={() => setProfileOpen(false)}
          onRemoveBookmark={(id) => setSavedArticleIds(prev => prev.filter(x => x !== id))}
          onSelectArticle={handleSelectArticle}
          onUpdatePreferences={(prefTopics, prefNotifications) => {
            setCurrentUser(prev => ({
              ...prev,
              categoryPreferences: prefTopics,
              notificationPreferences: prefNotifications,
            }));
          }}
        />
      )}

      {/* Institutional Legal & Policy Modal */}
      {institutionalPage && (
        <InstitutionalModal
          pageType={institutionalPage}
          onClose={() => setInstitutionalPage(null)}
        />
      )}

    </div>
  );
}
