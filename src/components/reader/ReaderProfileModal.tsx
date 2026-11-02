import React, { useState } from 'react';
import { X, Bookmark, User, Bell, Check, Trash2, ArrowRight } from 'lucide-react';
import { Article, ReaderUser, Category } from '../../types';

interface ReaderProfileModalProps {
  user: ReaderUser | null;
  savedArticles: Article[];
  onClose: () => void;
  onRemoveBookmark: (articleId: string) => void;
  onSelectArticle: (article: Article) => void;
  onUpdatePreferences: (topics: Category[], notifications: any) => void;
}

export const ReaderProfileModal: React.FC<ReaderProfileModalProps> = ({
  user,
  savedArticles,
  onClose,
  onRemoveBookmark,
  onSelectArticle,
  onUpdatePreferences,
}) => {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'preferences'>('bookmarks');
  const [topics, setTopics] = useState<Category[]>(user?.categoryPreferences || ['Kenya', 'Politics', 'Business']);
  const [notifications, setNotifications] = useState(user?.notificationPreferences || {
    breaking: true,
    politics: true,
    business: true,
    sports: false,
    entertainment: true,
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const allCategories: Category[] = [
    'Kenya', 'Politics', 'Business', 'Technology', 'Sports',
    'Entertainment', 'Lifestyle', 'Health', 'Investigations', 'Opinion'
  ];

  const handleToggleTopic = (c: Category) => {
    setTopics(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  const handleSavePrefs = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePreferences(topics, notifications);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-[#FBF9F5] dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-xs shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-sm">
              {user ? user.name[0] : 'R'}
            </div>
            <div>
              <h3 className="font-editorial text-lg font-bold text-stone-900 dark:text-white">
                {user ? user.name : 'Reader Account & Reading List'}
              </h3>
              <p className="text-xs text-stone-500">
                {user ? user.email : 'Personalized News Feed & Saved Stories'}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-stone-400 hover:text-stone-900 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 px-6 gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`py-3 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'bookmarks'
                ? 'border-amber-600 text-amber-700 dark:text-amber-400 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Stories ({savedArticles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            className={`py-3 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'preferences'
                ? 'border-amber-600 text-amber-700 dark:text-amber-400 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Topics & Alert Preferences</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'bookmarks' && (
            <div>
              {savedArticles.length === 0 ? (
                <div className="text-center py-12 text-stone-500">
                  <Bookmark className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm font-medium">No saved stories yet</p>
                  <p className="text-xs text-stone-400 mt-1">
                    Click the bookmark icon on any article to save it for offline or later reading.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-stone-200 dark:divide-stone-800">
                  {savedArticles.map((art) => (
                    <div key={art.id} className="py-3.5 flex items-center justify-between gap-4 group">
                      <div 
                        className="cursor-pointer flex-1"
                        onClick={() => {
                          onSelectArticle(art);
                          onClose();
                        }}
                      >
                        <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider block mb-0.5">
                          {art.category} · {art.readTimeMinutes} min read
                        </span>
                        <h4 className="font-editorial text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 transition-colors line-clamp-1">
                          {art.title}
                        </h4>
                      </div>

                      <button
                        onClick={() => onRemoveBookmark(art.id)}
                        className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'preferences' && (
            <form onSubmit={handleSavePrefs} className="space-y-6 text-xs">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                  My Preferred Editorial Topics
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {allCategories.map((cat) => {
                    const active = topics.includes(cat);
                    return (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => handleToggleTopic(cat)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-xs border transition-colors ${
                          active
                            ? 'bg-amber-600 border-amber-600 text-white font-bold'
                            : 'bg-white dark:bg-stone-950 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                  Real-Time Notification Alerts
                </label>
                
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.breaking}
                      onChange={(e) => setNotifications(prev => ({ ...prev, breaking: e.target.checked }))}
                      className="rounded text-amber-600"
                    />
                    <span className="font-medium text-stone-800 dark:text-stone-200">Breaking news alerts</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.politics}
                      onChange={(e) => setNotifications(prev => ({ ...prev, politics: e.target.checked }))}
                      className="rounded text-amber-600"
                    />
                    <span className="font-medium text-stone-800 dark:text-stone-200">Parliament & governance alerts</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.business}
                      onChange={(e) => setNotifications(prev => ({ ...prev, business: e.target.checked }))}
                      className="rounded text-amber-600"
                    />
                    <span className="font-medium text-stone-800 dark:text-stone-200">Silicon Savannah & markets briefing</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                {savedSuccess ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>Preferences Updated!</span>
                  </span>
                ) : <span />}

                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 font-semibold uppercase tracking-wider rounded-xs hover:bg-amber-600 dark:hover:bg-amber-400"
                >
                  Save Preferences
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
