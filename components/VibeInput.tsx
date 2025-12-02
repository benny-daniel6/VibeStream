import React, { useState, useCallback } from 'react';

interface VibeInputProps {
  onSubmit: (vibe: string) => void;
  isLoading: boolean;
}

export const VibeInput: React.FC<VibeInputProps> = ({ onSubmit, isLoading }) => {
  const [vibe, setVibe] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (vibe.trim() && !isLoading) {
      onSubmit(vibe);
    }
  }, [vibe, isLoading, onSubmit]);

  return (
    <div className="w-full max-w-2xl mx-auto mb-16 relative z-10">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-zinc-900 rounded-2xl border border-zinc-800 p-2 shadow-2xl">
          <input
            type="text"
            value={vibe}
            onChange={(e) => setVibe(e.target.value)}
            placeholder="e.g., late night drive, gym villain arc, sunday scaries..."
            className="flex-grow bg-transparent text-white px-6 py-4 text-lg outline-none placeholder-zinc-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !vibe.trim()}
            className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
              isLoading || !vibe.trim()
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'bg-white text-black hover:bg-gray-200 hover:scale-105 active:scale-95'
            }`}
          >
            {isLoading ? 'Scanning...' : 'Stream'}
          </button>
        </div>
      </form>
      
      {/* Quick Chips */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {['Sad Boi Hours', 'Main Character Energy', 'Coding Flow', 'Y2K Nostalgia'].map((chip) => (
          <button
            key={chip}
            onClick={() => {
                setVibe(chip);
                // Optional: Auto submit on chip click? Let's just fill for now.
            }}
            className="px-3 py-1 text-xs md:text-sm rounded-full bg-zinc-800/50 border border-zinc-700 text-zinc-400 hover:text-white hover:border-purple-500 transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
};