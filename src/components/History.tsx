import { useState } from 'react';
import type { MoodSession } from '../types';
import MOOD_DATA from '../data/moodData';
import { deleteSession } from '../utils/storage';

interface HistoryProps {
  sessions: MoodSession[];
  onDeleteSession: (id: string) => void;
  onStartNew: () => void;
}

interface SessionCardProps {
  session: MoodSession;
  onDelete: (id: string) => void;
}

function formatDate(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return timestamp;
  }
}

function SessionCard({ session, onDelete }: SessionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const moodInfo = MOOD_DATA[session.moodQuadrant as keyof typeof MOOD_DATA];
  const borderColor = moodInfo?.gradientStart ?? '#6366f1';

  const handleDelete = () => {
    try {
      deleteSession(session.id);
      onDelete(session.id);
    } catch (err) {
      console.error('Failed to delete session:', err);
    }
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderLeft: `4px solid ${borderColor}`,
      }}
      data-testid="history-card"
    >
      {/* Card Header */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {session.selectedEmoji && (
              <span className="text-2xl leading-none flex-shrink-0">{session.selectedEmoji}</span>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span
                  className="font-black text-base"
                  style={{
                    background: `linear-gradient(135deg, ${borderColor}, ${moodInfo?.gradientEnd ?? '#a855f7'})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                  data-testid="history-card-mood-label"
                >
                  {session.moodQuadrant}
                </span>
                <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                  ⚡{session.energyScore} ✨{session.positivityScore}
                </span>
              </div>
              <p className="text-xs text-gray-500" data-testid="history-card-date">
                {formatDate(session.timestamp)}
              </p>
              {session.journalEntry && !expanded && (
                <p className="text-gray-400 text-xs mt-2 leading-relaxed line-clamp-2">
                  {session.journalEntry.substring(0, 120)}
                  {session.journalEntry.length > 120 ? '…' : ''}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-300 hover:bg-white/10 transition-all duration-200 text-sm"
              aria-label={expanded ? 'Collapse' : 'Expand'}
              data-testid="expand-button"
            >
              {expanded ? '▲' : '▼'}
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className="p-2 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 text-sm"
              aria-label="Delete session"
              data-testid="delete-button"
            >
              🗑
            </button>
          </div>
        </div>

        {/* Confirmation Dialog */}
        {showConfirm && (
          <div
            className="mt-3 p-3 rounded-xl"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}
            data-testid="delete-confirm-dialog"
          >
            <p className="text-sm text-red-300 mb-3">
              Delete this mood session? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                className="flex-1 py-2 rounded-lg text-xs font-bold text-white transition-all duration-200 hover:opacity-90"
                style={{ background: '#dc2626' }}
                data-testid="confirm-delete-button"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2 rounded-lg text-xs font-bold text-gray-300 transition-all duration-200 hover:bg-white/10"
                style={{ background: 'rgba(255,255,255,0.08)' }}
                data-testid="cancel-delete-button"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div
          className="px-4 pb-4 space-y-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Playlists */}
          {session.playlistSuggestions.length > 0 && (
            <div className="pt-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                🎵 Playlists
              </p>
              <div className="space-y-1">
                {session.playlistSuggestions.slice(0, 3).map((pl, i) => (
                  <div key={i} className="flex items-center justify-between gap-2 py-1">
                    <span className="text-xs text-gray-400 flex-1 min-w-0 truncate">{pl.name}</span>
                    <a
                      href={pl.spotifySearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: 'rgba(29,185,84,0.15)', color: '#1DB954' }}
                    >
                      ▶
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activities */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
              🎯 Activities
            </p>
            <div className="space-y-1">
              {session.suggestedActivities.map((act, i) => (
                <p key={i} className="text-xs text-gray-400">
                  {act}
                </p>
              ))}
            </div>
          </div>

          {/* Journal */}
          {session.journalEntry && (
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                📓 Journal
              </p>
              <p className="text-xs text-gray-300 leading-relaxed italic">
                &ldquo;{session.journalEntry}&rdquo;
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function History({ sessions, onDeleteSession, onStartNew }: HistoryProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-black text-white">Mood History</h2>
          <p className="text-gray-500 text-sm mt-0.5">Your emotional journey over time</p>
        </div>
        <button
          onClick={onStartNew}
          className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
          data-testid="start-new-button"
        >
          + New Check-In
        </button>
      </div>

      {sessions.length === 0 ? (
        <div
          className="text-center py-20 rounded-3xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          data-testid="empty-history"
        >
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-bold text-white mb-2">No moods logged yet</h3>
          <p className="text-gray-500 text-sm mb-6">
            No moods logged yet — start your first session!
          </p>
          <button
            onClick={onStartNew}
            className="px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
          >
            Start Your First Check-In
          </button>
        </div>
      ) : (
        <div className="space-y-3" data-testid="history-list">
          {sessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onDelete={onDeleteSession}
            />
          ))}
        </div>
      )}
    </div>
  );
}
