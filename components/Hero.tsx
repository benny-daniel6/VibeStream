import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="text-center mb-12 space-y-4">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-lg animate-pulse">
        VibeStream
      </h1>
      <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
        Your AI curator for the chronically online. Tell us your vibe, and we'll scan the real-time web for the perfect soundtrack.
      </p>
    </div>
  );
};