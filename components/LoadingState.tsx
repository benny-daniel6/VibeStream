import React, { useEffect, useState } from 'react';

export const LoadingState: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const messages = [
    "Analyzing vibe frequencies...",
    "Scanning TikTok trends...",
    "Checking Spotify Viral 50...",
    "Consulting the algorithm...",
    "Found something spicy..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-500/30 rounded-full animate-ping"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-zinc-400 font-mono text-sm animate-pulse">
        {messages[msgIndex]}
      </p>
    </div>
  );
};