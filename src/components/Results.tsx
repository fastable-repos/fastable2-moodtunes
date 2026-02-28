import { useState } from 'react';
import type { MoodSession, PlaylistSuggestion } from '../types';
import MOOD_DATA from '../data/moodData';

interface ResultsProps {
  session: Omit<MoodSession, 'id' | 'timestamp' | 'journalEntry'>;
  journalEntry: string;
  onJournalChange: (entry: string) => void;
  onSave: () => void;
  onReset: () => void;
}

function PlaylistCard({ playlist }: { playlist: PlaylistSuggestion }) {
  return (
    <div
      className="rounded-2xl p-4 bg-white/5 border border-[#1DB954]/25 hover:border-[#1DB954]/60 transition-all duration-200"
      data-testid="playlist-card"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-white text-sm mb-1 truncate">{playlist.name}</h4>
          <p className="text-gray-400 text-xs mb-2 leading-relaxed">{playlist.vibeDescription}</p>
          <div className="flex flex-wrap gap-1">
            {playlist.genres.map((genre) => (
              <span
                key={genre}
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{ background: 'rgba(29,185,84,0.12)', color: '#1DB954' }}
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
        <a
          href={playlist.spotifySearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 flex items-center gap-1 px-3 py-2 rounded-xl text-black text-xs font-bold transition-all duration-200 hover:scale-105"
          style={{ background: '#1DB954' }}
          data-testid="spotify-link"
        >
          <span>▶</span>
          <span className="hidden sm:inline">Open</span>
        </a>
      </div>
    </div>
  );
}

export default function Results({
  session,
  journalEntry,
  onJournalChange,
  onSave,
  onReset,
}: ResultsProps) {
  const [saved, setSaved] = useState(false);
  const moodInfo = MOOD_DATA[session.moodQuadrant as keyof typeof MOOD_DATA];

  const handleSave = () => {
    try {
      onSave();
      setSaved(true);
    } catch (err) {
      console.error('Failed to save session:', err);
    }
  };

  if (!moodInfo) return null;

  return (
    <div className="space-y-6">
      {/* Mood Result Card */}
      <div
        className="rounded-3xl p-6 text-center"
        style={{
          background: `linear-gradient(135deg, ${moodInfo.gradientStart}22, ${moodInfo.gradientEnd}22)`,
          border: `1px solid ${moodInfo.gradientStart}55`,
          backdropFilter: 'blur(12px)',
        }}
        data-testid="mood-result-card"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
          Your Mood
        </p>
        <h2
          className="text-5xl sm:text-6xl font-black mb-3 leading-none"
          style={{
            background: `linear-gradient(135deg, ${moodInfo.gradientStart}, ${moodInfo.gradientEnd})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          data-testid="mood-label"
        >
          {session.moodQuadrant}
        </h2>
        {session.selectedEmoji && (
          <div className="text-5xl mb-3 leading-none">{session.selectedEmoji}</div>
        )}
        <p className="text-gray-300 text-sm leading-relaxed max-w-sm mx-auto">
          {moodInfo.description}
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">
            ⚡ Energy: {session.energyScore}/5
          </span>
          <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">
            ✨ Positivity: {session.positivityScore}/5
          </span>
        </div>
      </div>

      {/* Playlist Suggestions */}
      <section>
        <h3 className="text-xl font-black text-white mb-4">🎵 Your Playlist Vibes</h3>
        <div className="space-y-3" data-testid="playlist-suggestions">
          {session.playlistSuggestions.map((playlist, index) => (
            <PlaylistCard key={index} playlist={playlist} />
          ))}
        </div>
      </section>

      {/* Activities */}
      <section>
        <h3 className="text-xl font-black text-white mb-4">🎯 Try These Activities</h3>
        <div className="space-y-2" data-testid="activities-section">
          {session.suggestedActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
              data-testid={`activity-${index}`}
            >
              <span className="text-white text-sm leading-snug">{activity}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Journal Section */}
      <section>
        <h3 className="text-xl font-black text-white mb-4">📓 Reflect & Journal</h3>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-4">
          <p
            className="text-gray-300 italic text-sm leading-relaxed"
            data-testid="journal-prompt"
          >
            &ldquo;{session.journalPrompt}&rdquo;
          </p>
          <textarea
            value={journalEntry}
            onChange={(e) => onJournalChange(e.target.value)}
            placeholder="Write your thoughts here..."
            rows={5}
            className="w-full rounded-xl p-3 text-gray-200 placeholder-gray-600 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            data-testid="journal-textarea"
          />
          {saved ? (
            <div className="w-full py-3 rounded-xl border text-center font-bold text-sm"
              style={{ background: 'rgba(29,185,84,0.12)', borderColor: 'rgba(29,185,84,0.3)', color: '#1DB954' }}
              data-testid="session-saved-banner"
            >
              ✓ Session Saved!
            </div>
          ) : (
            <button
              onClick={handleSave}
              className="w-full py-3 rounded-xl text-white font-bold transition-all duration-200 hover:scale-[1.01] hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
              data-testid="save-session-button"
            >
              💾 Save Session
            </button>
          )}
        </div>
      </section>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full py-3 rounded-xl text-gray-400 text-sm hover:text-gray-200 transition-all duration-200"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
        data-testid="new-mood-button"
      >
        🔄 Start New Mood Check
      </button>
    </div>
  );
}
