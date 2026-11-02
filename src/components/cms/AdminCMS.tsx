import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  BarChart3, 
  DollarSign, 
  Plus, 
  Edit3, 
  Trash2, 
  Flame, 
  Star, 
  CheckCircle, 
  Clock, 
  Search, 
  ArrowLeft,
  Users,
  Eye,
  Sliders,
  Sparkles
} from 'lucide-react';
import { Article, StaffRole, AdCampaign } from '../../types';
import { ArticleEditorModal } from './ArticleEditorModal';
import { AdvertisingManager } from './AdvertisingManager';
import { AnalyticsDashboard } from './AnalyticsDashboard';

interface AdminCMSProps {
  articles: Article[];
  onSaveArticle: (data: Partial<Article>, id?: string) => void;
  onDeleteArticle: (id: string) => void;
  onToggleBreaking: (id: string, currentState: boolean) => void;
  onToggleLead: (id: string) => void;
  campaigns: AdCampaign[];
  onAddCampaign: (campaign: Partial<AdCampaign>) => void;
  onClose: () => void;
  onViewArticle: (article: Article) => void;
}

const STAFF_ROLES: StaffRole[] = [
  'Super Administrator',
  'Publisher',
  'Managing Editor',
  'Editor',
  'Journalist',
  'Reporter',
  'SEO Editor',
  'Moderator',
  'Advertising Manager'
];

export const AdminCMS: React.FC<AdminCMSProps> = ({
  articles,
  onSaveArticle,
  onDeleteArticle,
  onToggleBreaking,
  onToggleLead,
  campaigns,
  onAddCampaign,
  onClose,
  onViewArticle,
}) => {
  const [currentRole, setCurrentRole] = useState<StaffRole>('Managing Editor');
  const [activeTab, setActiveTab] = useState<'articles' | 'advertising' | 'analytics'>('articles');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Filtered articles
  const filteredArticles = articles.filter((art) => {
    const matchesStatus = statusFilter === 'all' || art.status === statusFilter;
    const matchesSearch = !searchQuery || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const publishedCount = articles.filter(a => a.status === 'published').length;
  const draftCount = articles.filter(a => a.status === 'draft').length;
  const inReviewCount = articles.filter(a => a.status === 'in_review').length;
  const approvedCount = articles.filter(a => a.status === 'approved').length;
  const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);

  const handleSaveModal = (data: Partial<Article>) => {
    if (editingArticle) {
      onSaveArticle(data, editingArticle.id);
    } else {
      onSaveArticle(data);
    }
    setEditingArticle(null);
    setIsCreating(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F4EE] dark:bg-stone-950 text-stone-900 dark:text-stone-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Newsroom Control Header */}
        <div className="bg-stone-900 text-white p-6 rounded-xs border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xs transition-colors"
              title="Return to Public Site"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                <h2 className="font-editorial text-2xl font-black uppercase tracking-tight text-white">
                  The Kenya Chronicle Newsroom CMS
                </h2>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Multi-Role Editorial Administration, Content Pipeline & Digital Monetization
              </p>
            </div>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-400 font-semibold uppercase font-mono">Operating Role:</span>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as StaffRole)}
              className="px-3 py-1.5 bg-stone-800 text-amber-400 font-semibold text-xs border border-stone-700 rounded-xs focus:outline-none"
            >
              {STAFF_ROLES.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>

        {/* CMS High-Level Metric Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <span className="text-[10px] uppercase font-bold text-stone-500 font-mono block">Published Stories</span>
            <span className="text-2xl font-black text-stone-900 dark:text-white font-mono">{publishedCount}</span>
            <span className="text-[11px] text-stone-500 block mt-1">Live to audience</span>
          </div>

          <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <span className="text-[10px] uppercase font-bold text-stone-500 font-mono block">Pending Review</span>
            <span className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">{inReviewCount}</span>
            <span className="text-[11px] text-stone-500 block mt-1">Editor desk queue</span>
          </div>

          <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <span className="text-[10px] uppercase font-bold text-stone-500 font-mono block">Approved</span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{approvedCount}</span>
            <span className="text-[11px] text-stone-500 block mt-1">Ready for publishing</span>
          </div>

          <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <span className="text-[10px] uppercase font-bold text-stone-500 font-mono block">Drafts In Progress</span>
            <span className="text-2xl font-black text-stone-600 dark:text-stone-300 font-mono">{draftCount}</span>
            <span className="text-[11px] text-stone-500 block mt-1">Reporter working copies</span>
          </div>

          <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-stone-500 font-mono block">Aggregate Views</span>
            <span className="text-2xl font-black text-stone-900 dark:text-white font-mono">{(totalViews).toLocaleString()}</span>
            <span className="text-[11px] text-stone-500 block mt-1">Audit-tracked page reads</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-stone-300 dark:border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('articles')}
              className={`flex items-center gap-2 px-4 py-2 font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors ${
                activeTab === 'articles' 
                  ? 'bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 font-bold' 
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Articles & Pipeline ({articles.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('advertising')}
              className={`flex items-center gap-2 px-4 py-2 font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors ${
                activeTab === 'advertising' 
                  ? 'bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 font-bold' 
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Monetization & Ad Engine</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-4 py-2 font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors ${
                activeTab === 'analytics' 
                  ? 'bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 font-bold' 
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Audience Intelligence</span>
            </button>
          </div>

          {activeTab === 'articles' && (
            <button
              onClick={() => { setEditingArticle(null); setIsCreating(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider rounded-xs transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Compose Article</span>
            </button>
          )}
        </div>

        {/* TAB 1: ARTICLES MANAGEMENT */}
        {activeTab === 'articles' && (
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            {/* Filter & Search Bar */}
            <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 w-full sm:w-80">
                <div className="relative w-full">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, author, or category..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 focus:outline-none"
                  />
                </div>
              </div>

              {/* Status Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
                {['all', 'published', 'approved', 'in_review', 'draft'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 uppercase tracking-wider text-[11px] rounded-xs transition-colors ${
                      statusFilter === st 
                        ? 'bg-amber-600 text-white font-bold' 
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100 dark:bg-stone-950 text-stone-500 uppercase font-mono text-[10px] tracking-wider border-b border-stone-200 dark:border-stone-800">
                  <tr>
                    <th className="p-3">Story Headline</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Author</th>
                    <th className="p-3">Workflow Status</th>
                    <th className="p-3">Reads</th>
                    <th className="p-3">Breaking Ticker</th>
                    <th className="p-3">Lead Feature</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                  {filteredArticles.map((art) => (
                    <tr key={art.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors">
                      <td className="p-3 max-w-sm">
                        <div className="flex items-start gap-3">
                          <img 
                            src={art.featuredImage} 
                            alt="" 
                            className="w-12 h-9 object-cover shrink-0 bg-stone-200" 
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span 
                              onClick={() => onViewArticle(art)}
                              className="font-bold text-stone-900 dark:text-stone-100 hover:text-amber-600 cursor-pointer line-clamp-1 text-xs"
                            >
                              {art.title}
                            </span>
                            <span className="text-[10px] text-stone-500 block font-mono">
                              Slug: /{art.slug.slice(0, 30)}...
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-3 font-semibold text-stone-700 dark:text-stone-300">
                        {art.category}
                      </td>

                      <td className="p-3 text-stone-600 dark:text-stone-400">
                        {art.author.name}
                      </td>

                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          art.status === 'published' 
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : art.status === 'approved'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                            : art.status === 'in_review'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                            : 'bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
                        }`}>
                          {art.status.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="p-3 font-mono tabular-nums text-stone-600 dark:text-stone-400">
                        {art.views.toLocaleString()}
                      </td>

                      <td className="p-3">
                        <button
                          onClick={() => onToggleBreaking(art.id, art.isBreaking)}
                          className={`p-1.5 rounded transition-colors ${
                            art.isBreaking 
                              ? 'bg-red-600 text-white' 
                              : 'text-stone-400 hover:text-stone-600 bg-stone-100 dark:bg-stone-800'
                          }`}
                          title="Toggle breaking news ticker"
                        >
                          <Flame className="w-3.5 h-3.5" />
                        </button>
                      </td>

                      <td className="p-3">
                        <button
                          onClick={() => onToggleLead(art.id)}
                          className={`p-1.5 rounded transition-colors ${
                            art.isLead 
                              ? 'bg-amber-500 text-stone-950 font-bold' 
                              : 'text-stone-400 hover:text-stone-600 bg-stone-100 dark:bg-stone-800'
                          }`}
                          title="Toggle homepage lead story"
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>
                      </td>

                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onViewArticle(art)}
                            className="p-1.5 text-stone-400 hover:text-stone-900 dark:hover:text-white"
                            title="Preview Story in Reader Mode"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => { setEditingArticle(art); setIsCreating(false); }}
                            className="p-1.5 text-stone-400 hover:text-amber-600 transition-colors"
                            title="Edit Article"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(art.id)}
                            className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                            title="Delete Article"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ADVERTISING MANAGER */}
        {activeTab === 'advertising' && (
          <AdvertisingManager
            campaigns={campaigns}
            onAddCampaign={onAddCampaign}
          />
        )}

        {/* TAB 3: AUDIENCE ANALYTICS */}
        {activeTab === 'analytics' && (
          <AnalyticsDashboard />
        )}

      </div>

      {/* Article Compose / Edit Modal */}
      {(isCreating || editingArticle) && (
        <ArticleEditorModal
          article={editingArticle}
          onClose={() => { setEditingArticle(null); setIsCreating(false); }}
          onSave={handleSaveModal}
        />
      )}

      {/* Delete Confirmation Safeguard Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 p-6 max-w-sm w-full border border-stone-200 dark:border-stone-800 rounded-xs shadow-xl text-center">
            <h4 className="font-editorial text-lg font-bold text-stone-900 dark:text-white mb-2">
              Confirm Story Deletion
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 mb-6 leading-relaxed">
              Are you sure you want to delete this article? This action cannot be reversed and will remove it from the digital archives.
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-1.5 border border-stone-300 dark:border-stone-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteArticle(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
              >
                Delete Story
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
