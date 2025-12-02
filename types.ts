export interface MediaRecommendation {
  id: string;
  title: string;
  artist: string;
  reasoning: string;
  viralContext: string;
  link: string;
  platform: 'Spotify' | 'YouTube' | 'TikTok' | 'Instagram' | 'Other';
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface VibeResponse {
  vibeSummary: string;
  recommendations: MediaRecommendation[];
  sources?: GroundingSource[];
}

export type LoadingState = 'idle' | 'analyzing' | 'searching' | 'curating' | 'complete';
