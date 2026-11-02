import React from 'react';
import { ShieldCheck, Mail, ArrowUp } from 'lucide-react';
import { CATEGORIES } from './Header';

interface FooterProps {
  onOpenPage: (type: 'about' | 'editorial' | 'privacy' | 'terms' | 'advertise' | 'contact' | 'corrections') => void;
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPage, onSelectCategory }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-stone-950 text-stone-300 pt-16 pb-12 border-t-4 border-amber-600">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Top Masthead & Back to top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-10 border-b border-stone-800">
          <div>
            <h3 className="font-editorial text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              The Kenya Chronicle
            </h3>
            <p className="text-xs uppercase tracking-widest text-stone-400 mt-1">
              East Africa's Premier Digital News & Multimedia Publishing Network
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-2 bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold rounded-xs border border-stone-800 transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4-Column Directory Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-stone-800 text-xs">
          
          {/* News Desks */}
          <div className="space-y-3">
            <h4 className="font-editorial text-sm font-bold text-white uppercase tracking-wider">
              Editorial Desks
            </h4>
            <ul className="space-y-2 text-stone-400">
              {['Kenya', 'Politics', 'Business', 'Technology', 'Investigations', 'World'].map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => onSelectCategory(cat)}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {cat} News
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Life, Arts & Sports */}
          <div className="space-y-3">
            <h4 className="font-editorial text-sm font-bold text-white uppercase tracking-wider">
              Culture & Sport
            </h4>
            <ul className="space-y-2 text-stone-400">
              {['Sports', 'Entertainment', 'Celebrity', 'Lifestyle', 'Health', 'Opinion'].map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => onSelectCategory(cat)}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Multimedia & Feeds */}
          <div className="space-y-3">
            <h4 className="font-editorial text-sm font-bold text-white uppercase tracking-wider">
              Multimedia Hub
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a href="/api/rss.xml" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">
                  RSS News Syndication
                </a>
              </li>
              <li>
                <a href="/api/sitemap.xml" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">
                  Google News XML Sitemap
                </a>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Multimedia')} className="hover:text-amber-400 transition-colors">
                  Documentary Video Hub
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Multimedia')} className="hover:text-amber-400 transition-colors">
                  The Nairobi Exchange Podcast
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Live')} className="hover:text-amber-400 transition-colors">
                  Live Rolling Updates
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional Policies */}
          <div className="space-y-3">
            <h4 className="font-editorial text-sm font-bold text-white uppercase tracking-wider">
              Standards & Transparency
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => onOpenPage('about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPage('editorial')} className="hover:text-white transition-colors">
                  Editorial Ethics Charter
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPage('corrections')} className="hover:text-white transition-colors">
                  Corrections Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPage('advertise')} className="hover:text-white transition-colors">
                  Advertise With Us
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPage('privacy')} className="hover:text-white transition-colors">
                  Privacy & Data Protection
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPage('terms')} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPage('contact')} className="hover:text-white transition-colors">
                  Contact Newsroom Bureaus
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-mono">
          <div>
            © {new Date().getFullYear()} The Kenya Chronicle Publishing Group PLC. All rights reserved. Registered under Kenya Media Council Act.
          </div>
          <div className="flex items-center gap-2 text-stone-400">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>Compliant with Kenya Data Protection Act, 2019</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
