import React, { useState } from 'react';
import { Play, Pause, Headphones, Video, Camera, Volume2, ArrowRight } from 'lucide-react';
import { MultimediaItem } from '../../types';

interface MultimediaHubProps {
  items: MultimediaItem[];
  onOpenMultimediaPage: () => void;
}

export const MultimediaHub: React.FC<MultimediaHubProps> = ({ items, onOpenMultimediaPage }) => {
  const [activeMedia, setActiveMedia] = useState<MultimediaItem>(items[0] || null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const videoItems = items.filter(i => i.type === 'video');
  const podcastItems = items.filter(i => i.type === 'podcast');

  return (
    <section className="w-full bg-stone-900 text-stone-100 py-10 my-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-3 mb-8 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-red-600 animate-pulse"></span>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-editorial text-white uppercase tracking-tight">
                Chronicle Multimedia Hub
              </h3>
              <p className="text-xs text-stone-400 font-sans mt-0.5">
                Video Documentaries, Podcasts, and Photojournalism from Across Kenya & Africa
              </p>
            </div>
          </div>
          <button
            onClick={onOpenMultimediaPage}
            className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>Explore All Media</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Media Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Stage (7 Cols) */}
          <div className="lg:col-span-7">
            {activeMedia && (
              <div>
                <div className="relative aspect-[16/9] w-full bg-stone-950 overflow-hidden group">
                  <img 
                    src={activeMedia.thumbnailUrl} 
                    alt={activeMedia.title}
                    className="w-full h-full object-cover opacity-85 group-hover:scale-102 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent flex flex-col justify-end p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-red-600 text-white rounded-xs flex items-center gap-1">
                        {activeMedia.type === 'video' ? <Video className="w-3 h-3" /> : <Headphones className="w-3 h-3" />}
                        {activeMedia.type.toUpperCase()}
                      </span>
                      <span className="text-xs text-stone-300 font-mono">{activeMedia.duration}</span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-bold font-editorial text-white leading-snug mb-2">
                      {activeMedia.title}
                    </h4>
                    <p className="text-stone-300 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {activeMedia.description}
                    </p>

                    {/* Interactive Play Bar */}
                    <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                          className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center transition-transform hover:scale-105 shadow-md cursor-pointer"
                          aria-label={isPlayingAudio ? "Pause" : "Play"}
                        >
                          {isPlayingAudio ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                        </button>
                        <div>
                          <span className="text-xs font-semibold block text-white">
                            {isPlayingAudio ? 'Now Streaming Audio Track...' : 'Listen / Watch Preview'}
                          </span>
                          <span className="text-[11px] text-stone-400">
                            Narrated by {activeMedia.author}
                          </span>
                        </div>
                      </div>

                      {isPlayingAudio && (
                        <div className="flex items-center gap-1.5 text-amber-400">
                          <Volume2 className="w-4 h-4 animate-pulse" />
                          <div className="flex items-end gap-0.5 h-3">
                            <span className="w-1 h-2 bg-amber-400 animate-bounce"></span>
                            <span className="w-1 h-3 bg-amber-400 animate-bounce [animation-delay:0.15s]"></span>
                            <span className="w-1 h-1.5 bg-amber-400 animate-bounce [animation-delay:0.3s]"></span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Playlist & Audio Queue (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-stone-800">
            <h5 className="text-xs uppercase tracking-widest font-semibold text-stone-400 mb-2">
              Featured Episodes & Video Reports
            </h5>

            {items.map((item) => {
              const isSelected = activeMedia?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveMedia(item)}
                  className={`py-3.5 flex gap-3.5 items-center cursor-pointer group transition-colors ${
                    isSelected ? 'bg-stone-800/60 px-3 -mx-3 rounded-xs' : 'hover:bg-stone-800/30'
                  }`}
                >
                  <div className="relative w-24 aspect-[16/10] bg-stone-800 overflow-hidden shrink-0">
                    <img 
                      src={item.thumbnailUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      {item.type === 'video' ? (
                        <Play className="w-4 h-4 text-white" />
                      ) : (
                        <Headphones className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] text-stone-400 mb-1">
                      <span className="uppercase font-semibold text-amber-400">{item.category}</span>
                      <span>·</span>
                      <span className="font-mono">{item.duration}</span>
                    </div>
                    <h6 className="font-editorial text-sm font-bold text-stone-100 group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h6>
                    <span className="text-[11px] text-stone-400 mt-0.5 block">
                      {(item.views).toLocaleString()} views
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
