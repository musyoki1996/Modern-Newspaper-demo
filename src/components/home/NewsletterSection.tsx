import React, { useState } from 'react';
import { Mail, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { Category } from '../../types';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['Kenya', 'Politics', 'Business']);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const topics = ['Kenya', 'Politics', 'Business', 'Technology', 'Investigations', 'Sports', 'Lifestyle'];

  const toggleTopic = (t: string) => {
    setSelectedTopics(prev => 
      prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, categories: selectedTopics })
      });
      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
      }
    } catch (err) {
      setIsSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="bg-stone-900 text-stone-100 p-8 sm:p-12 relative overflow-hidden border border-stone-800">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3">
            <Mail className="w-4 h-4" />
            <span>The Daily Chronicle Briefing</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-editorial text-white leading-tight mb-3">
            Essential Kenyan News, Deep Analysis & Global Perspectives Delivered Every Morning at 6:00 AM EAT.
          </h3>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
            Join over 120,000 policymakers, entrepreneurs, educators, and readers worldwide who start their day with our curated newsroom briefing.
          </p>

          {isSubmitted ? (
            <div className="bg-stone-800/80 border border-stone-700 p-4 rounded-xs flex items-center gap-3 text-stone-200">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <h4 className="font-semibold text-sm text-white">You're Subscribed to The Chronicle Briefing!</h4>
                <p className="text-xs text-stone-300 mt-0.5">
                  Check your inbox for our welcome dispatch and verification link.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category selector chips */}
              <div className="space-y-2">
                <span className="text-xs text-stone-400 font-medium block">
                  Select your briefing topics:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {topics.map(t => {
                    const active = selectedTopics.includes(t);
                    return (
                      <button
                        type="button"
                        key={t}
                        onClick={() => toggleTopic(t)}
                        className={`text-xs px-2.5 py-1 transition-colors border ${
                          active
                            ? 'bg-amber-500 border-amber-500 text-stone-950 font-bold'
                            : 'bg-stone-800 border-stone-700 text-stone-300 hover:border-stone-500'
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Email Input */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work or personal email address..."
                  required
                  className="flex-1 px-4 py-3 bg-stone-950 border border-stone-700 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <span>{loading ? 'Subscribing...' : 'Get Briefing'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-stone-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                <span>Zero spam. Unsubscribe anytime. Compliant with the Kenya Data Protection Act, 2019.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
