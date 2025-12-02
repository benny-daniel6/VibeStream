import React from 'react';
import { MediaRecommendation } from '../types';

// Icons
const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-500"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.72 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
);
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
);
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-pink-500"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
);
const GenericIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
);

const PlatformIcon = ({ platform }: { platform: string }) => {
  const p = platform.toLowerCase();
  if (p.includes('spotify')) return <SpotifyIcon />;
  if (p.includes('youtube')) return <YouTubeIcon />;
  if (p.includes('tiktok')) return <TikTokIcon />;
  return <GenericIcon />;
};

interface RecommendationCardProps {
  data: MediaRecommendation;
  index: number;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ data, index }) => {
  return (
    <div 
      className="glass-panel rounded-2xl p-6 hover:bg-zinc-800/50 transition duration-300 border-l-4 border-l-transparent hover:border-l-purple-500 group"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
            <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">{data.title}</h3>
            <p className="text-zinc-400 text-sm font-medium uppercase tracking-wide">{data.artist}</p>
        </div>
        <div className="bg-zinc-900 p-2 rounded-full border border-zinc-700">
           <PlatformIcon platform={data.platform} />
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="bg-purple-900/20 p-3 rounded-lg border border-purple-500/20">
            <p className="text-purple-200 text-sm italic">
                "{data.reasoning}"
            </p>
        </div>
        
        <div className="flex items-start gap-2">
            <span className="text-lg">🔥</span>
            <p className="text-zinc-300 text-sm mt-0.5">{data.viralContext}</p>
        </div>
      </div>

      <a 
        href={data.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full text-center py-2.5 rounded-lg bg-zinc-100 text-zinc-900 font-bold text-sm hover:bg-purple-400 hover:text-white transition-colors"
      >
        Play on {data.platform || 'Web'}
      </a>
    </div>
  );
};