import React, { useState } from 'react';
import { X, Save, Sparkles, Image, Check, Flame, Star, ShieldCheck, Eye } from 'lucide-react';
import { Article, Category, ArticleStatus } from '../../types';
import { AiEditorialAssistant } from './AiEditorialAssistant';

interface ArticleEditorModalProps {
  article: Article | null;
  onClose: () => void;
  onSave: (articleData: Partial<Article>) => void;
}

const PRESET_IMAGES = [
  { url: '/src/assets/images/hero_lead_summit_1793634830671.jpg', label: 'Pan-African Summit Conference' },
  { url: '/src/assets/images/politics_parliament_1793634831203.jpg', label: 'Kenya Parliament Assembly' },
  { url: '/src/assets/images/tech_silicon_savannah_1793634832657.jpg', label: 'Nairobi Silicon Savannah Tech Hub' },
  { url: '/src/assets/images/culture_lifestyle_1793634832802.jpg', label: 'Nairobi Contemporary Art Exhibition' },
  { url: '/src/assets/images/kenya_athletics_1793634832739.jpg', label: 'Iten High-Altitude Marathon Squad' }
];

const CATEGORIES: Category[] = [
  'Kenya', 'Politics', 'Business', 'Technology', 'Sports',
  'Entertainment', 'Celebrity', 'Lifestyle', 'Health',
  'Education', 'Opinion', 'Investigations', 'World'
];

export const ArticleEditorModal: React.FC<ArticleEditorModalProps> = ({
  article,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(article?.title || '');
  const [subtitle, setSubtitle] = useState(article?.subtitle || '');
  const [category, setCategory] = useState<Category>(article?.category || 'Kenya');
  const [tags, setTags] = useState(article?.tags.join(', ') || 'Kenya News, Policy');
  const [featuredImage, setFeaturedImage] = useState(article?.featuredImage || PRESET_IMAGES[0].url);
  const [imageCaption, setImageCaption] = useState(article?.imageCaption || '');
  const [imageCredit, setImageCredit] = useState(article?.imageCredit || 'The Kenya Chronicle Staff');
  const [content, setContent] = useState(article?.content || '<p class="drop-cap">Write your article lead paragraph here...</p>');
  const [status, setStatus] = useState<ArticleStatus>(article?.status || 'draft');
  const [isBreaking, setIsBreaking] = useState(article?.isBreaking || false);
  const [isLead, setIsLead] = useState(article?.isLead || false);
  const [seoTitle, setSeoTitle] = useState(article?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(article?.seoDescription || '');
  const [revisionNote, setRevisionNote] = useState('');
  const [showAiAssistant, setShowAiAssistant] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSave({
      title: title.trim(),
      subtitle: subtitle.trim(),
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      featuredImage,
      imageCaption,
      imageCredit,
      content,
      status,
      isBreaking,
      isLead,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || subtitle,
      summary: subtitle || title,
      ...(revisionNote ? { revisionNote } : {})
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#FBF9F5] dark:bg-stone-900 w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-xs shadow-2xl border border-stone-300 dark:border-stone-800 flex flex-col">
        
        {/* Modal Top Header */}
        <div className="sticky top-0 z-20 bg-[#FBF9F5] dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="font-editorial text-lg sm:text-xl font-bold text-stone-900 dark:text-white">
                {article ? 'Edit Article: ' + article.title.slice(0, 45) + '...' : 'Create New Newsroom Article'}
              </h3>
              <p className="text-xs text-stone-500 font-sans">
                Full editorial workflow: Draft → Review → Approval → Immediate or Scheduled Publishing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAiAssistant(!showAiAssistant)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xs border transition-colors ${
                showAiAssistant 
                  ? 'bg-amber-500 border-amber-500 text-stone-950 font-bold' 
                  : 'bg-stone-900 dark:bg-stone-800 border-stone-700 text-amber-400 hover:bg-stone-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{showAiAssistant ? 'Hide AI Assistant' : 'AI Assistant'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Edit Form (Left / Center) */}
          <form id="article-form" onSubmit={handleSubmit} className={`${showAiAssistant ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-6`}>
            
            {/* Title & Deck */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Article Headline *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter high-impact, journalistic headline..."
                  required
                  className="w-full px-4 py-2.5 text-base font-editorial font-bold bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Standfirst / Subheadline Deck
                </label>
                <textarea
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Summarize the core premise, key context, and impact..."
                  rows={2}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Category & Tags Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Editorial Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none"
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Search & Topic Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g. Parliament, Devolution, KRA"
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>
            </div>

            {/* Featured Image Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                Featured Photography
              </label>

              {/* Presets */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {PRESET_IMAGES.map((img) => (
                  <div
                    key={img.url}
                    onClick={() => setFeaturedImage(img.url)}
                    className={`cursor-pointer aspect-[16/10] overflow-hidden border-2 transition-all relative ${
                      featuredImage === img.url ? 'border-amber-600 ring-2 ring-amber-400' : 'border-stone-300 dark:border-stone-700'
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    {featuredImage === img.url && (
                      <div className="absolute top-1 right-1 bg-amber-600 text-white p-0.5 rounded-full">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="Image caption description..."
                  className="px-3 py-1.5 text-xs bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 focus:outline-none"
                />
                <input
                  type="text"
                  value={imageCredit}
                  onChange={(e) => setImageCredit(e.target.value)}
                  placeholder="Photo credit (e.g. Kenya Chronicle Photo Pool)"
                  className="px-3 py-1.5 text-xs bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 focus:outline-none"
                />
              </div>
            </div>

            {/* Body Content Editor */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                Article Rich Body HTML / Text *
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                required
                className="w-full px-4 py-3 font-mono text-xs bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500 leading-relaxed"
              />
              <span className="text-[11px] text-stone-500 mt-1 block">
                Supports standard HTML: &lt;p&gt;, &lt;h2&gt;, &lt;blockquote&gt;, &lt;ul&gt;, etc.
              </span>
            </div>

            {/* Publication Settings & Editorial Toggles */}
            <div className="p-4 bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-4">
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Editorial Workflow Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ArticleStatus)}
                    className="px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 font-semibold"
                  >
                    <option value="draft">Draft (Reporter)</option>
                    <option value="in_review">In Review (Editor)</option>
                    <option value="approved">Approved (Managing Editor)</option>
                    <option value="published">Published (Live to Millions)</option>
                    <option value="scheduled">Scheduled for Embargo</option>
                  </select>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <label className="flex items-center gap-2 text-xs font-semibold text-stone-800 dark:text-stone-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isBreaking}
                      onChange={(e) => setIsBreaking(e.target.checked)}
                      className="rounded text-red-600 focus:ring-red-500"
                    />
                    <Flame className="w-3.5 h-3.5 text-red-600" />
                    <span>Breaking News Ticker</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-semibold text-stone-800 dark:text-stone-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isLead}
                      onChange={(e) => setIsLead(e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <Star className="w-3.5 h-3.5 text-amber-600" />
                    <span>Homepage Lead Feature</span>
                  </label>
                </div>
              </div>

              {article && (
                <div>
                  <label className="block text-[11px] font-semibold text-stone-500 mb-1">
                    Add Revision / Editorial Note:
                  </label>
                  <input
                    type="text"
                    value={revisionNote}
                    onChange={(e) => setRevisionNote(e.target.value)}
                    placeholder="e.g. Updated quote attribution per Senior Editor request"
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700"
                  />
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200 dark:border-stone-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-stone-300 dark:border-stone-700 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs font-bold uppercase tracking-wider hover:bg-amber-600 dark:hover:bg-amber-400 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save & Commit to Newsroom</span>
              </button>
            </div>

          </form>

          {/* AI Editorial Assistant Panel (Right Column when open) */}
          {showAiAssistant && (
            <div className="lg:col-span-5 sticky top-20">
              <AiEditorialAssistant
                currentTitle={title}
                currentContent={content}
                category={category}
                onApplyTitle={(t) => setTitle(t)}
                onApplySeo={(seoT, seoDesc, suggTags) => {
                  setSeoTitle(seoT);
                  setSeoDescription(seoDesc);
                  if (suggTags.length > 0) setTags(suggTags.join(', '));
                }}
                onApplySummary={(s) => setSubtitle(s)}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
