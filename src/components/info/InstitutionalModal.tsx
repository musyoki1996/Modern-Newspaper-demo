import React from 'react';
import { X, ShieldCheck, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';

interface InstitutionalModalProps {
  pageType: 'about' | 'editorial' | 'privacy' | 'terms' | 'advertise' | 'contact' | 'corrections';
  onClose: () => void;
}

export const InstitutionalModal: React.FC<InstitutionalModalProps> = ({ pageType, onClose }) => {
  const titles: { [key: string]: string } = {
    about: 'About The Kenya Chronicle',
    editorial: 'Editorial Standards & Ethics Charter',
    privacy: 'Privacy Policy & Kenya Data Protection Act, 2019',
    terms: 'Terms and Conditions of Service',
    advertise: 'Advertise With The Chronicle & Digital Media Kit',
    contact: 'Newsroom Bureaus & Contact Information',
    corrections: 'Corrections & Editorial Accountability Policy'
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 flex items-center justify-center p-4">
      <div className="bg-[#FBF9F5] dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-xs shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <h3 className="font-editorial text-xl font-bold text-stone-900 dark:text-white">
              {titles[pageType] || 'Institutional Information'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-stone-400 hover:text-stone-900 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
          {pageType === 'about' && (
            <>
              <p className="drop-cap font-sans">
                <strong>The Kenya Chronicle</strong> is East Africa’s authoritative digital news, investigative journalism, politics, business, entertainment, and multimedia broadcasting network. Headquartered in Nairobi with correspondents across Mombasa, Kisumu, Eldoret, Nakuru, Kampala, and Dar es Salaam, our mission is to deliver uncompromising, accurate, and deeply contextualized journalism for over 4 million monthly readers.
              </p>
              <h4 className="font-editorial text-base font-bold text-stone-900 dark:text-white mt-4">Independent & Unbiased</h4>
              <p>
                Founded upon the highest standards of journalistic integrity, The Kenya Chronicle operates free from partisan interference. We champion constitutional governance, devolution transparency, entrepreneurial innovation across the Silicon Savannah, and the rich cultural vibrancy of the African continent.
              </p>
            </>
          )}

          {pageType === 'editorial' && (
            <>
              <p>
                Our editorial policy adheres strictly to the Media Council of Kenya (MCK) Code of Conduct for the Practice of Journalism and international guidelines formulated by the International Fact-Checking Network (IFCN).
              </p>
              <h4 className="font-editorial text-base font-bold text-stone-900 dark:text-white mt-4">Verification & Sources</h4>
              <p>
                We never publish speculative claims as verified news. Every factual report requires corroborated multi-source attribution. When anonymous sourcing is essential to protect whistleblowers, corroborating evidence must be vetted by the Managing Editor before authorization.
              </p>
              <h4 className="font-editorial text-base font-bold text-stone-900 dark:text-white mt-4">Separation of News & Advertising</h4>
              <p>
                Sponsored content, native features, and advertiser partnerships are conspicuously marked with clear labels. Advertising clients exert zero influence over our investigative desks or editorial coverage.
              </p>
            </>
          )}

          {pageType === 'privacy' && (
            <>
              <p>
                The Kenya Chronicle is fully compliant with the <strong>Kenya Data Protection Act, 2019</strong>, and global data privacy regulations. We respect your digital sovereignty and privacy rights.
              </p>
              <h4 className="font-editorial text-base font-bold text-stone-900 dark:text-white mt-4">Information We Collect</h4>
              <p>
                We collect only basic reader engagement data necessary to deliver your personalized newsletter briefings and authenticate bookmarks. We do not sell or monetize personal identifiable information (PII) to third-party data brokers.
              </p>
              <h4 className="font-editorial text-base font-bold text-stone-900 dark:text-white mt-4">Right of Erasure</h4>
              <p>
                You may request immediate erasure of your reader account, email subscription, or reading records at any time by contacting our Data Protection Officer at privacy@kenyachronicle.ke.
              </p>
            </>
          )}

          {pageType === 'corrections' && (
            <>
              <p>
                The Kenya Chronicle believes that accountability is the cornerstone of public trust. When an error of fact or context occurs in our reporting, we correct it promptly and transparently.
              </p>
              <p>
                Corrections are appended with a timestamped editor's note clarifying the error and the accurate facts. If you spot a factual error in any published piece, submit details to corrections@kenyachronicle.ke.
              </p>
            </>
          )}

          {pageType === 'advertise' && (
            <>
              <p>
                Reach Kenya’s most influential audience of C-suite executives, senior policymakers, tech founders, and aspirational young consumers.
              </p>
              <div className="grid grid-cols-2 gap-3 my-4">
                <div className="p-3 bg-stone-100 dark:bg-stone-800">
                  <span className="font-bold text-sm block text-amber-600">4.18M+</span>
                  <span className="text-[11px] text-stone-500">Monthly Unique Readers</span>
                </div>
                <div className="p-3 bg-stone-100 dark:bg-stone-800">
                  <span className="font-bold text-sm block text-amber-600">76%</span>
                  <span className="text-[11px] text-stone-500">Mobile Smartphone Engagement</span>
                </div>
              </div>
              <p>
                Direct advertising placements include Header Leaderboards, In-Article Midpoints, Sponsored Editorial Series, Video Prerolls, and Morning Briefing Newsletter Sponsorships. Email commercial@kenyachronicle.ke for our current rate card.
              </p>
            </>
          )}

          {pageType === 'contact' && (
            <div className="space-y-4">
              <p>Reach out directly to our editorial and commercial desks in Nairobi:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Chronicle Media Tower, 8th Floor, Kimathi Street, Nairobi CBD, Kenya</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>editorial@kenyachronicle.ke · newsroom@kenyachronicle.ke</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>+254 (0) 20 798 4000 · Whistleblower Signal Hotline: +254 712 345 678</span>
                </div>
              </div>
            </div>
          )}

          {pageType === 'terms' && (
            <>
              <p>
                By accessing The Kenya Chronicle website, mobile portals, or RSS feeds, you agree to comply with our Terms of Use. All journalistic content, typography, photographic captures, and video reportage are protected under Kenyan and international copyright laws.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-xs"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
