import { useState, useEffect } from 'react';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';
import History from './components/History';
import type { AppScreen, MoodSession } from './types';
import MOOD_DATA from './data/moodData';
import { getMoodQuadrant } from './utils/moodEngine';
import {
  getSessions,
  saveSession,
  getDraft,
  clearDraft,
  generateId,
} from './utils/storage';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('questionnaire');

  // Questionnaire state - restored from draft on mount
  const [energyScore, setEnergyScore] = useState<number | null>(null);
  const [positivityScore, setPositivityScore] = useState<number | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string>('');

  // Results state
  const [currentSession, setCurrentSession] = useState<Omit<
    MoodSession,
    'id' | 'timestamp' | 'journalEntry'
  > | null>(null);
  const [journalEntry, setJournalEntry] = useState<string>('');

  // History state
  const [sessions, setSessions] = useState<MoodSession[]>([]);

  // Restore draft on mount
  useEffect(() => {
    try {
      const draft = getDraft();
      if (draft) {
        if (draft.energyScore !== null) setEnergyScore(draft.energyScore);
        if (draft.positivityScore !== null) setPositivityScore(draft.positivityScore);
        if (draft.selectedEmoji) setSelectedEmoji(draft.selectedEmoji);
      }
    } catch (err) {
      console.error('Failed to restore draft:', err);
    }
  }, []);

  // Load sessions when switching to history
  useEffect(() => {
    if (screen === 'history') {
      try {
        setSessions(getSessions());
      } catch (err) {
        console.error('Failed to load sessions:', err);
      }
    }
  }, [screen]);

  const handleAnalyze = () => {
    if (energyScore === null || positivityScore === null) return;
    try {
      const quadrant = getMoodQuadrant(energyScore, positivityScore);
      const moodInfo = MOOD_DATA[quadrant];
      const session: Omit<MoodSession, 'id' | 'timestamp' | 'journalEntry'> = {
        energyScore,
        positivityScore,
        selectedEmoji,
        moodQuadrant: quadrant,
        moodLabel: moodInfo.label,
        playlistSuggestions: moodInfo.playlists,
        suggestedActivities: moodInfo.activities,
        journalPrompt: moodInfo.journalPrompt,
      };
      setCurrentSession(session);
      setJournalEntry('');
      setScreen('results');
    } catch (err) {
      console.error('Failed to analyze mood:', err);
    }
  };

  const handleSaveSession = () => {
    if (!currentSession) return;
    try {
      const session: MoodSession = {
        ...currentSession,
        id: generateId(),
        timestamp: new Date().toISOString(),
        journalEntry,
      };
      saveSession(session);
      clearDraft();
    } catch (err) {
      console.error('Failed to save session:', err);
    }
  };

  const handleReset = () => {
    setEnergyScore(null);
    setPositivityScore(null);
    setSelectedEmoji('');
    setCurrentSession(null);
    setJournalEntry('');
    setScreen('questionnaire');
  };

  const handleDeleteSession = (id: string) => {
    try {
      setSessions((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error('Failed to delete session from state:', err);
    }
  };

  const navItems: { id: AppScreen; label: string; icon: string }[] = [
    { id: 'questionnaire', label: 'Check In', icon: '🎭' },
    { id: 'history', label: 'History', icon: '📖' },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: '#1a1a2e' }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: 'rgba(22,33,62,0.95)',
          borderColor: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎵</span>
            <div>
              <h1 className="text-lg font-black text-white leading-none tracking-tight">
                MoodTunes
              </h1>
              <p className="text-xs text-gray-500 leading-none">Your mood, your music</p>
            </div>
          </div>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'questionnaire' && screen === 'results') {
                    // go back to questionnaire, keep state
                    setScreen('questionnaire');
                  } else {
                    setScreen(item.id);
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  screen === item.id ||
                  (item.id === 'questionnaire' && screen === 'results')
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
                style={
                  screen === item.id ||
                  (item.id === 'questionnaire' && screen === 'results')
                    ? { background: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.3)' }
                    : {}
                }
                data-testid={`nav-${item.id}`}
              >
                <span>{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {screen === 'questionnaire' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-white mb-2">
                How are you feeling?
              </h2>
              <p className="text-gray-400 text-sm">
                Answer a few quick questions to discover your mood soundtrack
              </p>
            </div>
            <Questionnaire
              energyScore={energyScore}
              positivityScore={positivityScore}
              selectedEmoji={selectedEmoji}
              onEnergyChange={setEnergyScore}
              onPositivityChange={setPositivityScore}
              onEmojiSelect={setSelectedEmoji}
              onAnalyze={handleAnalyze}
            />
          </div>
        )}

        {screen === 'results' && currentSession && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-3xl font-black text-white mb-2">Your Mood Results</h2>
              <p className="text-gray-400 text-sm">Here&apos;s what your vibe says about you today</p>
            </div>
            <Results
              session={currentSession}
              journalEntry={journalEntry}
              onJournalChange={setJournalEntry}
              onSave={handleSaveSession}
              onReset={handleReset}
            />
          </div>
        )}

        {screen === 'history' && (
          <History
            sessions={sessions}
            onDeleteSession={handleDeleteSession}
            onStartNew={() => setScreen('questionnaire')}
          />
        )}
      </main>
    </div>
  );
}
