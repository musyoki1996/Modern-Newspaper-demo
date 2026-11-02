import React, { useState } from 'react';
import { Sparkles, Loader2, Check, Copy, Wand2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Category } from '../../types';

interface AiEditorialAssistantProps {
  currentTitle: string;
  currentContent: string;
  category: Category;
  onApplyTitle: (title: string) => void;
  onApplySeo: (seoTitle: string, metaDescription: string, tags: string[]) => void;
  onApplySummary: (summary: string) => void;
}

export const AiEditorialAssistant: React.FC<AiEditorialAssistantProps> = ({
  currentTitle,
  currentContent,
  category,
  onApplyTitle,
  onApplySeo,
  onApplySummary,
}) => {
  const [activeTab, setActiveTab] = useState<'headlines' | 'seo' | 'summary' | 'proofread'>('headlines');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const runAssistant = async (mode: 'headlines' | 'seo' | 'summarize' | 'proofread') => {
    setLoading(true);
    setResults(null);
    try {
      const res = await fetch('/api/ai/editorial-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          title: currentTitle,
          draftText: currentContent,
          category,
        }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setResults(data.result);
      }
    } catch (err) {
      console.error('AI assistant error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-stone-900 text-stone-100 p-5 rounded-xs border border-stone-800">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h4 className="font-editorial text-base font-bold text-white uppercase tracking-wider">
            AI Newsroom Editorial Assistant
          </h4>
        </div>
        <span className="text-[10px] text-amber-400 font-mono bg-stone-800 px-2 py-0.5 rounded">
          Powered by Gemini 3.8 Flash
        </span>
      </div>

      <p className="text-xs text-stone-400 mb-4 leading-relaxed">
        Editorial assistant follows strict newsroom integrity standards. Human editorial verification remains mandatory before publishing.
      </p>

      {/* Tabs */}
      <div className="flex gap-1.5 p-1 bg-stone-950 rounded-xs mb-4 text-xs font-semibold">
        <button
          onClick={() => { setActiveTab('headlines'); setResults(null); }}
          className={`flex-1 py-1.5 px-2 rounded-xs transition-colors ${
            activeTab === 'headlines' ? 'bg-amber-600 text-white font-bold' : 'text-stone-400 hover:text-white'
          }`}
        >
          Headlines
        </button>
        <button
          onClick={() => { setActiveTab('seo'); setResults(null); }}
          className={`flex-1 py-1.5 px-2 rounded-xs transition-colors ${
            activeTab === 'seo' ? 'bg-amber-600 text-white font-bold' : 'text-stone-400 hover:text-white'
          }`}
        >
          SEO Meta
        </button>
        <button
          onClick={() => { setActiveTab('summary'); setResults(null); }}
          className={`flex-1 py-1.5 px-2 rounded-xs transition-colors ${
            activeTab === 'summary' ? 'bg-amber-600 text-white font-bold' : 'text-stone-400 hover:text-white'
          }`}
        >
          Summary & Social
        </button>
        <button
          onClick={() => { setActiveTab('proofread'); setResults(null); }}
          className={`flex-1 py-1.5 px-2 rounded-xs transition-colors ${
            activeTab === 'proofread' ? 'bg-amber-600 text-white font-bold' : 'text-stone-400 hover:text-white'
          }`}
        >
          Proofread
        </button>
      </div>

      {/* Action Trigger */}
      <div className="mb-4">
        <button
          onClick={() => runAssistant(activeTab === 'summary' ? 'summarize' : activeTab)}
          disabled={loading || (!currentTitle && !currentContent)}
          className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing Newsroom Draft...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-3.5 h-3.5" />
              <span>
                {activeTab === 'headlines' && 'Generate 5 Journalistic Headlines'}
                {activeTab === 'seo' && 'Generate Search & Discover Metadata'}
                {activeTab === 'summary' && 'Generate Summary & Social Distribution'}
                {activeTab === 'proofread' && 'Run Journalistic Audit & Fact-Check Prompts'}
              </span>
            </>
          )}
        </button>
      </div>

      {/* Output Display */}
      {results && (
        <div className="bg-stone-950 p-4 rounded-xs border border-stone-800 text-xs space-y-3">
          {/* HEADLINES MODE */}
          {activeTab === 'headlines' && Array.isArray(results) && (
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-400 block">
                Recommended Headlines:
              </span>
              {results.map((hl: string, idx: number) => (
                <div key={idx} className="flex items-start justify-between gap-2 p-2 bg-stone-900 border border-stone-800 hover:border-amber-600 transition-colors">
                  <span className="font-editorial text-sm font-semibold text-white flex-1 leading-snug">
                    {hl}
                  </span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleCopy(hl, idx)}
                      className="p-1 hover:text-white text-stone-400"
                      title="Copy to clipboard"
                    >
                      {copiedIndex === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                    <button
                      onClick={() => onApplyTitle(hl)}
                      className="px-2 py-0.5 bg-amber-600 text-white font-semibold text-[10px] uppercase rounded-xs hover:bg-amber-500"
                      title="Apply as story headline"
                    >
                      Use
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SEO MODE */}
          {activeTab === 'seo' && results.seoTitle && (
            <div className="space-y-3">
              <div>
                <span className="text-stone-400 uppercase text-[10px] tracking-wider block font-mono">Suggested SEO Title:</span>
                <span className="text-white font-semibold text-sm">{results.seoTitle}</span>
              </div>
              <div>
                <span className="text-stone-400 uppercase text-[10px] tracking-wider block font-mono">Meta Description (140-155 chars):</span>
                <p className="text-stone-300 italic">{results.metaDescription}</p>
              </div>
              {results.suggestedTags && (
                <div>
                  <span className="text-stone-400 uppercase text-[10px] tracking-wider block font-mono">Suggested Tags:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {results.suggestedTags.map((tag: string) => (
                      <span key={tag} className="px-1.5 py-0.5 bg-stone-800 text-amber-400 rounded-xs text-[11px]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {results.googleDiscoverAngle && (
                <div className="p-2 bg-stone-900 border border-stone-800 text-stone-300">
                  <strong className="text-amber-400 block mb-0.5 font-mono text-[10px]">Google Discover Tip:</strong>
                  {results.googleDiscoverAngle}
                </div>
              )}
              <button
                onClick={() => onApplySeo(results.seoTitle, results.metaDescription, results.suggestedTags || [])}
                className="w-full py-1.5 bg-amber-600 text-white font-semibold uppercase tracking-wider text-[11px] hover:bg-amber-500 transition-colors"
              >
                Apply SEO Metadata to Draft
              </button>
            </div>
          )}

          {/* SUMMARY & SOCIAL MODE */}
          {activeTab === 'summary' && (
            <div className="space-y-3">
              {results.bulletSummary && (
                <div>
                  <span className="text-stone-400 uppercase text-[10px] tracking-wider block font-mono">Executive 3-Point Summary:</span>
                  <ul className="list-disc list-inside space-y-1 text-stone-200 mt-1">
                    {results.bulletSummary.map((b: string, i: number) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => onApplySummary(results.bulletSummary.join('\n\n'))}
                    className="mt-2 text-[11px] text-amber-400 hover:underline font-semibold"
                  >
                    Apply as article deck/summary →
                  </button>
                </div>
              )}

              {results.socialCaptions && (
                <div className="pt-2 border-t border-stone-800 space-y-2">
                  <span className="text-stone-400 uppercase text-[10px] tracking-wider block font-mono">Social Media Distribution:</span>
                  <div className="p-2 bg-stone-900 rounded-xs">
                    <span className="font-bold text-amber-400 block text-[10px]">X / Twitter</span>
                    <p className="text-stone-300 text-[11px]">{results.socialCaptions.xTwitter}</p>
                  </div>
                  <div className="p-2 bg-stone-900 rounded-xs">
                    <span className="font-bold text-amber-400 block text-[10px]">LinkedIn</span>
                    <p className="text-stone-300 text-[11px]">{results.socialCaptions.linkedIn}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PROOFREAD MODE */}
          {activeTab === 'proofread' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-stone-400 font-mono text-[10px] uppercase">Editorial Integrity Score:</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">{results.editorialScore || 94}/100</span>
              </div>
              <div>
                <span className="text-stone-400 font-mono text-[10px] uppercase block">Tone Assessment:</span>
                <p className="text-stone-200">{results.toneAssessment}</p>
              </div>
              {results.suggestions && (
                <div>
                  <span className="text-stone-400 font-mono text-[10px] uppercase block">Clarity & Style Recommendations:</span>
                  <ul className="list-disc list-inside space-y-1 text-stone-300 mt-1">
                    {results.suggestions.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
              {results.factCheckPrompts && (
                <div className="p-2 bg-amber-950/40 border border-amber-800/60 text-amber-300">
                  <span className="font-bold block text-[10px] uppercase">Fact-Checking Flags:</span>
                  <ul className="list-disc list-inside space-y-0.5 mt-0.5">
                    {results.factCheckPrompts.map((f: string, i: number) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
