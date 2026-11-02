import React, { useState } from 'react';
import { DollarSign, BarChart3, Plus, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { AdCampaign } from '../../types';

interface AdvertisingManagerProps {
  campaigns: AdCampaign[];
  onAddCampaign: (campaign: Partial<AdCampaign>) => void;
}

export const AdvertisingManager: React.FC<AdvertisingManagerProps> = ({ campaigns, onAddCampaign }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [advertiser, setAdvertiser] = useState('');
  const [slot, setSlot] = useState<AdCampaign['slot']>('header_leaderboard');
  const [targetUrl, setTargetUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [budgetUsd, setBudgetUsd] = useState(2500);

  const totalImpressions = campaigns.reduce((acc, c) => acc + c.impressions, 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);
  const avgCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';
  const totalRevenue = campaigns.reduce((acc, c) => acc + c.budgetUsd, 0);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !advertiser || !targetUrl) return;

    onAddCampaign({
      title,
      advertiser,
      slot,
      targetUrl,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
      status: 'active',
      impressions: 0,
      clicks: 0,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: '2026-12-31',
      budgetUsd: Number(budgetUsd)
    });

    setShowAddModal(false);
    setTitle('');
    setAdvertiser('');
  };

  return (
    <div className="space-y-6">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <span className="text-[10px] uppercase font-bold text-stone-500 block font-mono">Monthly Ad Revenue</span>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            ${totalRevenue.toLocaleString()}
          </span>
          <span className="text-[11px] text-stone-500 mt-1 block">Active Direct & Programmatic</span>
        </div>

        <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <span className="text-[10px] uppercase font-bold text-stone-500 block font-mono">Total Ad Impressions</span>
          <span className="text-2xl font-black text-stone-900 dark:text-white font-mono">
            {totalImpressions.toLocaleString()}
          </span>
          <span className="text-[11px] text-stone-500 mt-1 block">Audit-verified delivery</span>
        </div>

        <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <span className="text-[10px] uppercase font-bold text-stone-500 block font-mono">Total Click Engagements</span>
          <span className="text-2xl font-black text-stone-900 dark:text-white font-mono">
            {totalClicks.toLocaleString()}
          </span>
          <span className="text-[11px] text-stone-500 mt-1 block">Tracked click-throughs</span>
        </div>

        <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <span className="text-[10px] uppercase font-bold text-stone-500 block font-mono">Average Network CTR</span>
          <span className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">
            {avgCtr}%
          </span>
          <span className="text-[11px] text-stone-500 mt-1 block">Industry benchmark: 1.2%</span>
        </div>
      </div>

      {/* Campaign Inventory Table */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden">
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div>
            <h4 className="font-editorial text-base font-bold text-stone-900 dark:text-white uppercase tracking-tight">
              Active Advertising Campaigns & Placement Inventory
            </h4>
            <p className="text-xs text-stone-500">
              Manage direct sponsor insertions across header, in-article, and sidebar units.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs font-semibold rounded-xs hover:bg-amber-600 dark:hover:bg-amber-400 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Ad Campaign</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100 dark:bg-stone-950 text-stone-500 uppercase tracking-wider font-mono text-[10px] border-b border-stone-200 dark:border-stone-800">
              <tr>
                <th className="p-3">Advertiser & Campaign</th>
                <th className="p-3">Placement Slot</th>
                <th className="p-3">Status</th>
                <th className="p-3">Impressions</th>
                <th className="p-3">Clicks</th>
                <th className="p-3">CTR</th>
                <th className="p-3">Budget</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {campaigns.map((camp) => {
                const ctr = camp.impressions > 0 ? ((camp.clicks / camp.impressions) * 100).toFixed(2) : '0.00';
                return (
                  <tr key={camp.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/40">
                    <td className="p-3">
                      <div className="font-semibold text-stone-900 dark:text-stone-100">{camp.advertiser}</div>
                      <div className="text-stone-500 text-[11px] line-clamp-1">{camp.title}</div>
                    </td>
                    <td className="p-3 font-mono text-stone-600 dark:text-stone-400">
                      {camp.slot.replace(/_/g, ' ')}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                        {camp.status}
                      </span>
                    </td>
                    <td className="p-3 font-mono tabular-nums">{camp.impressions.toLocaleString()}</td>
                    <td className="p-3 font-mono tabular-nums">{camp.clicks.toLocaleString()}</td>
                    <td className="p-3 font-mono tabular-nums text-amber-700 dark:text-amber-400 font-bold">{ctr}%</td>
                    <td className="p-3 font-mono tabular-nums font-semibold">${camp.budgetUsd.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Campaign Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 max-w-md w-full p-6 border border-stone-200 dark:border-stone-800 rounded-xs shadow-xl">
            <h4 className="font-editorial text-lg font-bold text-stone-900 dark:text-white mb-4">
              Create Direct Advertiser Campaign
            </h4>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">Advertiser Name *</label>
                <input
                  type="text"
                  value={advertiser}
                  onChange={(e) => setAdvertiser(e.target.value)}
                  placeholder="e.g. Kenya Airways or Equity Bank"
                  required
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">Campaign Headline *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Non-stop Flights to London & New York"
                  required
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">Placement Slot</label>
                  <select
                    value={slot}
                    onChange={(e) => setSlot(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700"
                  >
                    <option value="header_leaderboard">Header Leaderboard</option>
                    <option value="sidebar_sticky">Sidebar Sticky</option>
                    <option value="in_article_mid">In-Article Mid</option>
                    <option value="homepage_billboard">Homepage Billboard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">Budget ($ USD)</label>
                  <input
                    type="number"
                    value={budgetUsd}
                    onChange={(e) => setBudgetUsd(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">Destination URL *</label>
                <input
                  type="url"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="https://..."
                  required
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-stone-200 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 border border-stone-300 dark:border-stone-700 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xs"
                >
                  Deploy Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
