import { GoogleGenAI } from "@google/genai";
import { VibeResponse, MediaRecommendation, GroundingSource } from "../types";

// Helper to generate a unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

export const getVibeRecommendations = async (userVibe: string): Promise<VibeResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemPrompt = `
    You are "VibeStream," an expert AI media curator.
    Your goal is to translate abstract human "vibes" into currently trending media (Songs, Reels, TikToks).
    
    INSTRUCTIONS:
    1. Decode the Vibe: Analyze the user's input.
    2. Find Real-Time Trends: Use Google Search to find data from the last 7 days. Look for Viral 50 charts, trending audio, and challenges.
    3. Output Format: You must return the answer as a JSON object wrapped in a markdown code block.
    
    The JSON structure must be:
    {
      "vibeSummary": "2-3 word summary",
      "recommendations": [
        {
          "title": "Song or Trend Title",
          "artist": "Artist or Creator Name",
          "reasoning": "Why it fits the vibe",
          "viralContext": "e.g. 'Used in 500k videos for gym transformations'",
          "link": "A direct URL to the media if found, otherwise a search query url",
          "platform": "Spotify, YouTube, TikTok, or Instagram"
        }
      ]
    }
    
    Make sure to find at least 3 distinct recommendations.
    Tone: Cool, concise, chronic online behavior.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `User Vibe: "${userVibe}". Find trending media now.`,
      config: {
        systemInstruction: systemPrompt,
        tools: [{ googleSearch: {} }],
        // responseMimeType is NOT allowed with googleSearch
        // responseSchema is NOT allowed with googleSearch
      },
    });

    const text = response.text || "";
    
    // Extract JSON from markdown code block
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```([\s\S]*?)```/);
    let parsedData: Partial<VibeResponse> = {};
    
    if (jsonMatch && jsonMatch[1]) {
      try {
        parsedData = JSON.parse(jsonMatch[1]);
      } catch (e) {
        console.error("Failed to parse JSON from model response", e);
        // Fallback: If parsing fails, we might just return empty or partial structure
        // In a real app, we might retry or use a looser parser
      }
    }

    // Extract grounding sources to display verification links
    const sources: GroundingSource[] = [];
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (groundingChunks) {
      groundingChunks.forEach((chunk: any) => {
        if (chunk.web && chunk.web.uri && chunk.web.title) {
          sources.push({
            title: chunk.web.title,
            uri: chunk.web.uri
          });
        }
      });
    }

    // Sanitize and structure the return data
    return {
      vibeSummary: parsedData.vibeSummary || "Unknown Vibe",
      recommendations: (parsedData.recommendations || []).map(rec => ({
        ...rec,
        id: generateId(),
        // Fallback for missing links if the model didn't hallucinate one or find one
        link: rec.link || `https://www.youtube.com/results?search_query=${encodeURIComponent(rec.title + " " + rec.artist)}`
      })),
      sources: sources
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
