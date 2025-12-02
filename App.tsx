import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { VibeInput } from './components/VibeInput';
import { RecommendationCard } from './components/RecommendationCard';
import { LoadingState } from './components/LoadingState';
import { getVibeRecommendations } from './services/geminiService';
import { VibeResponse } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<VibeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVibeSubmit = async (vibe: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await getVibeRecommendations(vibe);
      setData(result);
    } catch (err) {
      setError("The vibes were too strong (or the API key is missing). Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black overflow-x-hidden selection:bg-purple-500 selection:text-white pb-20">
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] bg-purple-900/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 pt-20 relative z-10">
        <Hero />
        
        <VibeInput onSubmit={handleVibeSubmit} isLoading={isLoading} />

        {error && (
          <div className="text-center p-4 bg-red-900/20 border border-red-800 text-red-200 rounded-xl max-w-md mx-auto mb-10">
            {error}
          </div>
        )}

        {isLoading && <LoadingState />}

        {!isLoading && data && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-center gap-3 mb-12">
                <span className="text-2xl">🎧</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Vibe Match: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{data.vibeSummary}</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {data.recommendations.map((rec, index) => (
                <RecommendationCard key={rec.id} data={rec} index={index} />
              ))}
            </div>
            
            {/* Grounding Sources */}
            {data.sources && data.sources.length > 0 && (
              <div className="max-w-4xl mx-auto border-t border-zinc-800 pt-8">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Trend Verification Sources</h4>
                <div className="flex flex-wrap gap-2">
                  {data.sources.map((source, i) => (
                    <a 
                      key={i} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-400 hover:text-purple-400 transition-colors underline decoration-zinc-700 hover:decoration-purple-400 truncate max-w-xs"
                    >
                      {source.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;