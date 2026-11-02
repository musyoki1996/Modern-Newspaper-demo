import React, { useState } from 'react';
import { Video, Headphones, Play, Pause, ArrowLeft, Eye, Clock, Download, Share2 } from 'lucide-react';
import { MultimediaItem } from '../../types';

interface MultimediaViewProps {
  items: MultimediaItem[];
  onBack: () => void;
}

export const MultimediaView: React.FC<MultimediaViewProps> = ({ items, onBack }) => {
  const [filter, setFilter] = useState<'all' | 'video' | 'podcast'>('all');
  const [currentPlay, setCurrentPlay] = useState<MultimediaItem>(items[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);

  const filtered = items.filter(i => filter === 'all' || i.type === filter);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Top Header */}
      <div className="pb-6 border-b border-stone-200 dark:border-stone-800 mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Main Edition</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-editorial text-stone-900 dark:text-white uppercase tracking-tight">
              Multimedia Hub & Audio Journalism
            </h1>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
              Investigative video documentaries, podcast interviews, and photojournalism from East Africa.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-stone-200 dark:bg-stone-800 rounded-xs self-start">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xs transition-colors ${
                filter === 'all' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs' : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              All Formats
            </button>
            <button
              onClick={() => setFilter('video')}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xs transition-colors ${
                filter === 'video' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs' : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Video Reports</span>
            </button>
            <button
              onClick={() => setFilter('podcast')}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xs transition-colors ${
                filter === 'podcast' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs' : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Podcasts</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Media Player Stage */}
      {currentPlay && (
        <div className="mb-12 bg-stone-900 text-white p-6 sm:p-8 rounded-xs border border-stone-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/9] w-full bg-stone-950 overflow-hidden">
                <img 
                  src={currentPlay.thumbnailUrl} 
                  alt={currentPlay.title} 
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center transition-transform hover:scale-110 shadow-lg cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-red-600 text-white">
                  {currentPlay.type}
                </span>
                <span className="text-xs text-amber-400 uppercase font-semibold">{currentPlay.category}</span>
                <span className="text-xs text-stone-400 font-mono">· {currentPlay.duration}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-white leading-snug mb-3">
                {currentPlay.title}
              </h2>

              <p className="text-sm text-stone-300 leading-relaxed mb-6">
                {currentPlay.description}
              </p>

              <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                <div>
                  <span className="block text-white font-medium">Produced by {currentPlay.author}</span>
                  <span>{(currentPlay.views).toLocaleString()} audience plays</span>
                </div>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-4 py-2 bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors"
                >
                  {isPlaying ? 'Pause Track' : 'Play Broadcast'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of All Multimedia Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <div
            key={item.id}
            onClick={() => {
              setCurrentPlay(item);
              setIsPlaying(true);
            }}
            className="group cursor-pointer bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden transition-all hover:border-stone-400 dark:hover:border-stone-600"
          >
            <div className="relative aspect-[16/10] bg-stone-200 dark:bg-stone-800 overflow-hidden">
              <img 
                src={item.thumbnailUrl} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-stone-950/80 text-white text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                {item.type === 'video' ? <Video className="w-3 h-3" /> : <Headphones className="w-3 h-3" />}
                <span>{item.type}</span>
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white font-mono text-[10px]">
                {item.duration}
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-400 uppercase font-semibold mb-1">
                <span>{item.category}</span>
                <span>·</span>
                <span className="text-stone-500 normal-case font-normal">{(item.views).toLocaleString()} views</span>
              </div>

              <h3 className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug mb-2">
                {item.title}
              </h3>

              <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
