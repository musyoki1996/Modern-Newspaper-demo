import React, { useState } from 'react';
import { Radio, RefreshCw, Send, ShieldAlert, ArrowLeft, Clock, Share2, Check } from 'lucide-react';
import { LiveBlogEntry } from '../../types';

interface LiveBlogViewProps {
  entries: LiveBlogEntry[];
  onAddEntry: (entry: { title: string; content: string; badge: any; author: string }) => void;
  onBack: () => void;
  isStaff: boolean;
}

export const LiveBlogView: React.FC<LiveBlogViewProps> = ({
  entries,
  onAddEntry,
  onBack,
  isStaff,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newBadge, setNewBadge] = useState<'BREAKING' | 'KEY TAKEAWAY' | 'DEVELOPING' | 'OFFICIAL' | 'ANALYSIS'>('BREAKING');
  const [newAuthor, setNewAuthor] = useState('Newsroom Bureau');
  const [isPosting, setIsPosting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCreateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    setIsPosting(true);
    onAddEntry({
      title: newTitle.trim(),
      content: newContent.trim(),
      badge: newBadge,
      author: newAuthor.trim() || 'Newsroom Live Desk'
    });
    setNewTitle('');
    setNewContent('');
    setIsPosting(false);
  };

  const copyEntryLink = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/#live-${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-stone-200 dark:border-stone-800">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Main Edition</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider rounded-xs">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>Live Blog</span>
              </span>
              <span className="text-xs text-stone-500">Continuous 24/7 Updates</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-editorial text-stone-900 dark:text-white">
              East Africa Rolling Live Coverage: Governance, Silicon Savannah & Markets
            </h1>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-stone-300 dark:border-stone-700 text-xs font-semibold rounded-xs hover:bg-stone-100 dark:hover:bg-stone-900 shrink-0 self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Feed</span>
          </button>
        </div>
      </div>

      {/* Reporter Quick Post Module (when staff mode is toggled) */}
      <div className="mb-8 p-4 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-red-600" />
            <span>Fast Live Update Dispatch (Editorial Desk)</span>
          </span>
          <span className="text-[10px] text-amber-600 font-mono">Live Stream Direct Broadcast</span>
        </div>

        <form onSubmit={handleCreateEntry} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Headline / Update summary"
              required
              className="sm:col-span-2 px-3 py-2 text-xs bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 focus:outline-none"
            />
            <select
              value={newBadge}
              onChange={(e) => setNewBadge(e.target.value as any)}
              className="px-2 py-2 text-xs bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 focus:outline-none"
            >
              <option value="BREAKING">BREAKING</option>
              <option value="OFFICIAL">OFFICIAL</option>
              <option value="KEY TAKEAWAY">KEY TAKEAWAY</option>
              <option value="DEVELOPING">DEVELOPING</option>
              <option value="ANALYSIS">ANALYSIS</option>
            </select>
          </div>

          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Live report body text, key facts, statements, quote attribution..."
            rows={2}
            required
            className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 focus:outline-none"
          />

          <div className="flex items-center justify-between">
            <input
              type="text"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              placeholder="Reporter attribution (e.g. David Ochieng, Parliamentary Bureau)"
              className="px-3 py-1 text-xs bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 w-64"
            />
            <button
              type="submit"
              disabled={isPosting}
              className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Live</span>
            </button>
          </div>
        </form>
      </div>

      {/* Live Timeline Entries */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-stone-300 dark:border-stone-800 space-y-8">
        {entries.map((item) => (
          <div key={item.id} id={`live-${item.id}`} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-red-600 ring-4 ring-[#FBF9F5] dark:ring-stone-950" />

            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 shadow-xs transition-all group-hover:border-stone-400 dark:group-hover:border-stone-700">
              {/* Badge & Timestamp */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-400">
                    {item.timestamp}
                  </span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 uppercase tracking-wider rounded-xs border border-stone-200 dark:border-stone-700">
                      {item.badge}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => copyEntryLink(item.id)}
                  className="p-1 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
                  title="Copy permanent link to this update"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Title */}
              <h3 className="font-editorial text-lg sm:text-xl font-bold text-stone-900 dark:text-white leading-snug mb-2">
                {item.title}
              </h3>

              {/* Body */}
              <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed mb-3">
                {item.content}
              </p>

              {/* Byline */}
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500 flex items-center justify-between">
                <span>Reported by: <strong className="text-stone-800 dark:text-stone-200">{item.author}</strong></span>
                <span className="font-mono text-[11px]">Verified Source</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
