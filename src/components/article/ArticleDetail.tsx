import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Bookmark, 
  Share2, 
  Printer, 
  Copy, 
  Heart, 
  Check, 
  ArrowLeft, 
  Type, 
  Eye, 
  Sparkles, 
  MessageCircle,
  Twitter,
  Linkedin,
  Facebook,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Article, Comment } from '../../types';
import { CommentsSection } from './CommentsSection';
import { AdBanner } from '../common/AdBanner';

interface ArticleDetailProps {
  article: Article;
  relatedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onBack: () => void;
  onBookmark: (article: Article) => void;
  isBookmarked: boolean;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({
  article,
  relatedArticles,
  onSelectArticle,
  onBack,
  onBookmark,
  isBookmarked,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');
  const [readingTheme, setReadingTheme] = useState<'paper' | 'sepia' | 'dark'>('paper');
  const [copied, setCopied] = useState(false);
  const [reactions, setReactions] = useState(article.reactions);
  const [userReacted, setUserReacted] = useState<{ [key: string]: boolean }>({});
  const [comments, setComments] = useState<Comment[]>([]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch comments for article
  useEffect(() => {
    fetch(`/api/articles/${article.id}/comments`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setComments(data.data);
        }
      })
      .catch(() => {});
  }, [article.id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReaction = async (type: 'love' | 'applaud' | 'insightful' | 'surprised') => {
    if (userReacted[type]) return;

    setUserReacted(prev => ({ ...prev, [type]: true }));
    setReactions(prev => ({ ...prev, [type]: prev[type] + 1 }));

    try {
      await fetch(`/api/articles/${article.id}/react`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
    } catch (err) {}
  };

  const handleAddComment = async (content: string, authorName: string) => {
    try {
      const res = await fetch(`/api/articles/${article.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, authorName })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setComments(prev => [data.data, ...prev]);
      }
    } catch (err) {}
  };

  const handleLikeComment = async (commentId: string) => {
    try {
      await fetch(`/api/comments/${commentId}/like`, { method: 'POST' });
      setComments(prev => prev.map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c));
    } catch (err) {}
  };

  const handleReplyComment = async (commentId: string, content: string, authorName: string) => {
    try {
      const res = await fetch(`/api/comments/${commentId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, authorName })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setComments(prev => prev.map(c => {
          if (c.id === commentId) {
            return { ...c, replies: [...(c.replies || []), data.data] };
          }
          return c;
        }));
      }
    } catch (err) {}
  };

  const shareOnSocial = (platform: 'twitter' | 'whatsapp' | 'facebook' | 'linkedin') => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(article.title);
    let target = '';

    if (platform === 'twitter') target = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    if (platform === 'whatsapp') target = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    if (platform === 'facebook') target = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    if (platform === 'linkedin') target = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

    window.open(target, '_blank', 'noopener,noreferrer');
    fetch(`/api/articles/${article.id}/share`, { method: 'POST' }).catch(() => {});
  };

  // Theme styling for article reading canvas
  let canvasBg = 'bg-[#FBF9F5] dark:bg-stone-950 text-stone-900 dark:text-stone-100';
  if (readingTheme === 'sepia') {
    canvasBg = 'bg-[#F4ECD8] text-[#3E342B]';
  } else if (readingTheme === 'dark') {
    canvasBg = 'bg-[#121212] text-[#E0E0E0]';
  }

  // Font size classes
  let proseSize = 'text-base leading-relaxed';
  if (fontSize === 'large') proseSize = 'text-lg leading-loose';
  if (fontSize === 'xl') proseSize = 'text-xl leading-loose';

  return (
    <article className={`w-full min-h-screen transition-colors duration-300 ${canvasBg}`}>
      {/* Sticky Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-stone-200 dark:bg-stone-800 z-50">
        <div 
          className="h-full bg-amber-600 transition-all duration-150" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between pb-6 border-b border-stone-200 dark:border-stone-800 text-xs text-stone-500 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 font-medium hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Edition</span>
          </button>

          <div className="flex items-center gap-1.5 overflow-hidden">
            <span>Home</span>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="font-semibold text-stone-700 dark:text-stone-300">{article.category}</span>
          </div>
        </div>

        {/* Category & Metadata Line (Zero-Pill Discipline) */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 mb-3 uppercase tracking-wider">
          <span>{article.category}</span>
          <span className="text-stone-400" aria-hidden="true">·</span>
          <span className="text-stone-500 dark:text-stone-400 normal-case font-normal">
            Published {new Intl.DateTimeFormat('en-KE', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }).format(new Date(article.publishedAt))}
          </span>
          <span className="text-stone-400" aria-hidden="true">·</span>
          <span className="text-stone-500 dark:text-stone-400 normal-case font-normal flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTimeMinutes} min read</span>
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-editorial leading-[1.12] mb-4 text-stone-950 dark:text-white">
          {article.title}
        </h1>

        {/* Deck / Subheadline */}
        <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-300 leading-relaxed font-light mb-8">
          {article.subtitle || article.summary}
        </p>

        {/* Author Bio & Engagement Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-t border-b border-stone-200 dark:border-stone-800 mb-8">
          <div className="flex items-center gap-3">
            <img 
              src={article.author.avatar} 
              alt={article.author.name}
              className="w-11 h-11 rounded-full object-cover border border-stone-300 dark:border-stone-700"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                  {article.author.name}
                </span>
                {article.author.twitter && (
                  <span className="text-xs text-amber-600 font-mono">
                    {article.author.twitter}
                  </span>
                )}
              </div>
              <span className="text-xs text-stone-500 block">
                {article.author.role} · The Kenya Chronicle Newsroom
              </span>
            </div>
          </div>

          {/* Reader Preferences Bar */}
          <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300">
            {/* Font size toggles */}
            <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-xs p-0.5 text-xs">
              <button 
                onClick={() => setFontSize('normal')} 
                className={`px-2 py-0.5 ${fontSize === 'normal' ? 'bg-stone-300 dark:bg-stone-700 font-bold' : ''}`}
                title="Normal text size"
              >
                A
              </button>
              <button 
                onClick={() => setFontSize('large')} 
                className={`px-2 py-0.5 ${fontSize === 'large' ? 'bg-stone-300 dark:bg-stone-700 font-bold text-sm' : ''}`}
                title="Large text size"
              >
                A+
              </button>
              <button 
                onClick={() => setFontSize('xl')} 
                className={`px-2 py-0.5 ${fontSize === 'xl' ? 'bg-stone-300 dark:bg-stone-700 font-bold text-base' : ''}`}
                title="Extra large text size"
              >
                A++
              </button>
            </div>

            {/* Reading Theme */}
            <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-xs p-0.5 text-xs">
              <button 
                onClick={() => setReadingTheme('paper')}
                className={`w-5 h-5 rounded-xs bg-[#FBF9F5] border border-stone-300 mr-0.5 ${readingTheme === 'paper' ? 'ring-2 ring-amber-500' : ''}`}
                title="Clean Paper Mode"
              />
              <button 
                onClick={() => setReadingTheme('sepia')}
                className={`w-5 h-5 rounded-xs bg-[#F4ECD8] border border-amber-300 mr-0.5 ${readingTheme === 'sepia' ? 'ring-2 ring-amber-500' : ''}`}
                title="Warm Sepia Mode"
              />
              <button 
                onClick={() => setReadingTheme('dark')}
                className={`w-5 h-5 rounded-xs bg-[#1a1a1a] border border-stone-700 ${readingTheme === 'dark' ? 'ring-2 ring-amber-500' : ''}`}
                title="Night Reading Mode"
              />
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onBookmark(article)}
              className={`p-2 rounded-xs border border-stone-300 dark:border-stone-700 hover:text-amber-600 transition-colors ${
                isBookmarked ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/40' : ''
              }`}
              title={isBookmarked ? "Remove bookmark" : "Save article"}
              aria-label="Bookmark article"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xs border border-stone-300 dark:border-stone-700 hover:text-stone-950 dark:hover:text-white transition-colors relative"
              title="Copy article link"
              aria-label="Copy article link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Print */}
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xs border border-stone-300 dark:border-stone-700 hover:text-stone-950 dark:hover:text-white transition-colors hidden sm:block"
              title="Print article"
              aria-label="Print article"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Image with Caption & Credit */}
        <figure className="mb-8">
          <div className="aspect-[16/9] w-full overflow-hidden bg-stone-200 dark:bg-stone-800">
            <img 
              src={article.featuredImage} 
              alt={article.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {(article.imageCaption || article.imageCredit) && (
            <figcaption className="text-xs text-stone-500 dark:text-stone-400 mt-2 px-1 flex flex-col sm:flex-row justify-between gap-1 italic">
              <span>{article.imageCaption}</span>
              <span className="not-italic text-stone-400 font-medium shrink-0">Photo: {article.imageCredit}</span>
            </figcaption>
          )}
        </figure>

        {/* Share buttons row */}
        <div className="flex items-center gap-2 mb-8 pb-4 border-b border-stone-200 dark:border-stone-800 text-xs">
          <span className="font-semibold text-stone-500 uppercase tracking-wider mr-2">Share Story:</span>
          <button 
            onClick={() => shareOnSocial('whatsapp')} 
            className="px-3 py-1.5 bg-[#25D366] text-white font-medium rounded-xs hover:opacity-90 transition-opacity"
          >
            WhatsApp
          </button>
          <button 
            onClick={() => shareOnSocial('twitter')} 
            className="px-3 py-1.5 bg-stone-900 text-white font-medium rounded-xs hover:bg-stone-800 transition-colors"
          >
            X (Twitter)
          </button>
          <button 
            onClick={() => shareOnSocial('linkedin')} 
            className="px-3 py-1.5 bg-[#0077b5] text-white font-medium rounded-xs hover:opacity-90 transition-opacity"
          >
            LinkedIn
          </button>
          <button 
            onClick={() => shareOnSocial('facebook')} 
            className="px-3 py-1.5 bg-[#1877F2] text-white font-medium rounded-xs hover:opacity-90 transition-opacity"
          >
            Facebook
          </button>
        </div>

        {/* Article Body Content */}
        <div 
          className={`max-w-prose mx-auto prose prose-stone dark:prose-invert ${proseSize} [&>p]:mb-6 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:font-editorial [&>h2]:mt-8 [&>h2]:mb-4 [&>blockquote]:text-xl [&>blockquote]:font-editorial [&>blockquote]:italic [&>blockquote]:my-8 [&>blockquote]:py-4 [&>blockquote]:border-y [&>blockquote]:border-stone-300 dark:[&>blockquote]:border-stone-700`}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* In-Article Advertisement Slot */}
        <AdBanner slot="in_article_mid" />

        {/* Tags */}
        <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 mr-2">Filed Under:</span>
          {article.tags.map(tag => (
            <span 
              key={tag}
              className="text-xs text-stone-700 dark:text-stone-300 hover:text-amber-600 transition-colors underline decoration-stone-300 dark:decoration-stone-700 underline-offset-4 cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Reader Reactions Bar */}
        <div className="my-10 p-6 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <div className="text-center mb-4">
            <h4 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100">
              How does this story resonate with you?
            </h4>
            <p className="text-xs text-stone-500">
              Share your instant reader reaction with the newsroom.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
            <button
              onClick={() => handleReaction('love')}
              className={`p-3 text-center border transition-all ${
                userReacted.love 
                  ? 'border-red-500 bg-red-50 dark:bg-red-950/40' 
                  : 'border-stone-200 dark:border-stone-800 hover:border-red-400 bg-white dark:bg-stone-950'
              }`}
            >
              <span className="text-2xl block mb-1">❤️</span>
              <span className="text-xs font-semibold block text-stone-800 dark:text-stone-200">Inspiring</span>
              <span className="text-[11px] text-stone-500 font-mono">{reactions.love}</span>
            </button>

            <button
              onClick={() => handleReaction('applaud')}
              className={`p-3 text-center border transition-all ${
                userReacted.applaud 
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40' 
                  : 'border-stone-200 dark:border-stone-800 hover:border-amber-400 bg-white dark:bg-stone-950'
              }`}
            >
              <span className="text-2xl block mb-1">👏</span>
              <span className="text-xs font-semibold block text-stone-800 dark:text-stone-200">Applaud</span>
              <span className="text-[11px] text-stone-500 font-mono">{reactions.applaud}</span>
            </button>

            <button
              onClick={() => handleReaction('insightful')}
              className={`p-3 text-center border transition-all ${
                userReacted.insightful 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40' 
                  : 'border-stone-200 dark:border-stone-800 hover:border-blue-400 bg-white dark:bg-stone-950'
              }`}
            >
              <span className="text-2xl block mb-1">💡</span>
              <span className="text-xs font-semibold block text-stone-800 dark:text-stone-200">Insightful</span>
              <span className="text-[11px] text-stone-500 font-mono">{reactions.insightful}</span>
            </button>

            <button
              onClick={() => handleReaction('surprised')}
              className={`p-3 text-center border transition-all ${
                userReacted.surprised 
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/40' 
                  : 'border-stone-200 dark:border-stone-800 hover:border-purple-400 bg-white dark:bg-stone-950'
              }`}
            >
              <span className="text-2xl block mb-1">😮</span>
              <span className="text-xs font-semibold block text-stone-800 dark:text-stone-200">Surprised</span>
              <span className="text-[11px] text-stone-500 font-mono">{reactions.surprised}</span>
            </button>
          </div>
        </div>

        {/* Reader Comments */}
        <CommentsSection
          articleId={article.id}
          comments={comments}
          onAddComment={handleAddComment}
          onLikeComment={handleLikeComment}
          onReplyComment={handleReplyComment}
        />

        {/* Related Articles Carousel / Grid */}
        <div className="mt-16 pt-8 border-t-2 border-stone-900 dark:border-stone-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-stone-900 dark:text-white">
              More Stories in {article.category}
            </h3>
            <span className="text-xs text-stone-500">Recommended for you</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedArticles.slice(0, 3).map((rel) => (
              <div 
                key={rel.id} 
                className="group cursor-pointer"
                onClick={() => onSelectArticle(rel)}
              >
                <div className="aspect-[16/10] bg-stone-200 dark:bg-stone-800 overflow-hidden mb-3">
                  <img 
                    src={rel.featuredImage} 
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mb-1">
                  <span className="font-semibold text-amber-700 dark:text-amber-400 uppercase">{rel.category}</span>
                  <span>·</span>
                  <span>{rel.readTimeMinutes}m read</span>
                </div>
                <h4 className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                  {rel.title}
                </h4>
              </div>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
};
