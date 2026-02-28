import type { MoodSession } from '../types';

const SESSIONS_KEY = 'moodtunes_sessions';
const DRAFT_KEY = 'moodtunes_current_draft';

export function getSessions(): MoodSession[] {
  try {
    const stored = localStorage.getItem(SESSIONS_KEY);
    return stored ? (JSON.parse(stored) as MoodSession[]) : [];
  } catch (err) {
    console.error('Failed to load sessions from localStorage:', err);
    return [];
  }
}

export function saveSession(session: MoodSession): void {
  try {
    const sessions = getSessions();
    sessions.unshift(session);
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  } catch (err) {
    console.error('Failed to save session to localStorage:', err);
  }
}

export function deleteSession(id: string): void {
  try {
    const sessions = getSessions().filter((s) => s.id !== id);
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  } catch (err) {
    console.error('Failed to delete session from localStorage:', err);
  }
}

export interface DraftState {
  energyScore: number | null;
  positivityScore: number | null;
  selectedEmoji: string;
}

export function getDraft(): DraftState | null {
  try {
    const stored = localStorage.getItem(DRAFT_KEY);
    return stored ? (JSON.parse(stored) as DraftState) : null;
  } catch (err) {
    console.error('Failed to load draft from localStorage:', err);
    return null;
  }
}

export function saveDraft(draft: DraftState): void {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch (err) {
    console.error('Failed to save draft to localStorage:', err);
  }
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch (err) {
    console.error('Failed to clear draft from localStorage:', err);
  }
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
