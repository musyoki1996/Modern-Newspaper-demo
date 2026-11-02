import React from 'react';
import { ExternalLink } from 'lucide-react';
import { AdCampaign } from '../../types';

interface AdBannerProps {
  slot: 'header_leaderboard' | 'in_article_mid' | 'sidebar_sticky' | 'homepage_billboard' | 'between_stories';
  campaign?: AdCampaign;
}

export const AdBanner: React.FC<AdBannerProps> = ({ slot, campaign }) => {
  const defaultAd = campaign || {
    id: 'ad-def-' + slot,
    title: 'Safaricom 5G Ultra-Fast Enterprise Broadband & Cloud Services',
    advertiser: 'Safaricom PLC',
    slot,
    status: 'active' as const,
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    targetUrl: 'https://www.safaricom.co.ke',
    impressions: 12000,
    clicks: 420,
    startDate: '2026-11-01',
    endDate: '2026-11-30',
    budgetUsd: 1500,
  };

  const handleAdClick = () => {
    fetch(`/api/ads/click/${defaultAd.id}`, { method: 'POST' }).catch(() => {});
    window.open(defaultAd.targetUrl, '_blank', 'noopener,noreferrer');
  };

  if (slot === 'header_leaderboard') {
    return (
      <div className="w-full max-w-6xl mx-auto my-3 px-4">
        <div className="relative group cursor-pointer bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-2 sm:p-3 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:border-stone-300 dark:hover:border-stone-700" onClick={handleAdClick}>
          <div className="absolute top-1 right-2 text-[10px] uppercase tracking-wider text-stone-500 font-medium">
            Advertisement
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2 py-0.5 bg-amber-600 text-white rounded">
              SPONSORED
            </span>
            <span className="text-xs sm:text-sm font-medium text-stone-800 dark:text-stone-200 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
              {defaultAd.title}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 dark:text-stone-400 group-hover:text-stone-900 dark:group-hover:text-white transition-colors shrink-0">
            <span>Learn More</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    );
  }

  if (slot === 'sidebar_sticky') {
    return (
      <div className="w-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 transition-all hover:border-stone-300 dark:hover:border-stone-700 cursor-pointer" onClick={handleAdClick}>
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-stone-500 mb-2 font-mono">
          <span>Sponsored Partner</span>
          <span>{defaultAd.advertiser}</span>
        </div>
        <div className="aspect-[4/3] w-full overflow-hidden bg-stone-200 dark:bg-stone-800 mb-3 relative">
          <img 
            src={defaultAd.imageUrl} 
            alt={defaultAd.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 leading-snug mb-2 hover:text-amber-700 dark:hover:text-amber-400">
          {defaultAd.title}
        </h4>
        <div className="flex items-center justify-between pt-2 border-t border-stone-200 dark:border-stone-800 text-xs text-amber-700 dark:text-amber-400 font-semibold">
          <span>Explore Offer</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 w-full p-4 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 cursor-pointer" onClick={handleAdClick}>
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-stone-500 mb-2">
        <span>Sponsored Editorial Feature</span>
        <span>{defaultAd.advertiser}</span>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-semibold text-stone-900 dark:text-stone-100 mb-1">
            {defaultAd.title}
          </h4>
          <p className="text-xs text-stone-600 dark:text-stone-400">
            Connecting Kenyan businesses with high-speed scalable cloud and financial solutions across the continent.
          </p>
        </div>
        <button className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs font-semibold whitespace-nowrap hover:bg-amber-700 dark:hover:bg-amber-400 transition-colors shrink-0">
          Visit Partner
        </button>
      </div>
    </div>
  );
};
