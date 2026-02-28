export interface PlaylistSuggestion {
  name: string;
  genres: string[];
  vibeDescription: string;
  spotifySearchUrl: string;
}

export interface MoodSession {
  id: string;
  timestamp: string;
  energyScore: number;
  positivityScore: number;
  selectedEmoji: string;
  moodQuadrant: string;
  moodLabel: string;
  playlistSuggestions: PlaylistSuggestion[];
  suggestedActivities: string[];
  journalPrompt: string;
  journalEntry: string;
}

export type AppScreen = 'questionnaire' | 'results' | 'history';

export type MoodQuadrantName =
  | 'Euphoric'
  | 'Excited'
  | 'Anxious'
  | 'Content'
  | 'Calm'
  | 'Frustrated'
  | 'Peaceful'
  | 'Melancholic'
  | 'Depleted';

export interface MoodQuadrantInfo {
  label: string;
  description: string;
  gradientStart: string;
  gradientEnd: string;
  playlists: PlaylistSuggestion[];
  activities: string[];
  journalPrompt: string;
}
