import { useEffect } from 'react';
import { saveDraft } from '../utils/storage';

interface QuestionnaireProps {
  energyScore: number | null;
  positivityScore: number | null;
  selectedEmoji: string;
  onEnergyChange: (score: number) => void;
  onPositivityChange: (score: number) => void;
  onEmojiSelect: (emoji: string) => void;
  onAnalyze: () => void;
}

const ENERGY_EMOJIS: { emoji: string; label: string }[] = [
  { emoji: '😴', label: 'Drained' },
  { emoji: '🥱', label: 'Tired' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😃', label: 'Lively' },
  { emoji: '⚡', label: 'Electric' },
];

const POSITIVITY_EMOJIS: { emoji: string; label: string }[] = [
  { emoji: '😔', label: 'Down' },
  { emoji: '😕', label: 'Meh' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '🙂', label: 'Good' },
  { emoji: '😄', label: 'Great' },
];

const MOOD_EMOJI_GRID = [
  '😊', '😂', '🥰', '😎', '🤔',
  '😤', '😢', '😱', '🥳', '😴',
  '🤗', '😒', '🙄', '😌', '🤩',
  '😭', '😠', '🥺', '😋', '🤪',
];

export default function Questionnaire({
  energyScore,
  positivityScore,
  selectedEmoji,
  onEnergyChange,
  onPositivityChange,
  onEmojiSelect,
  onAnalyze,
}: QuestionnaireProps) {
  useEffect(() => {
    saveDraft({ energyScore, positivityScore, selectedEmoji });
  }, [energyScore, positivityScore, selectedEmoji]);

  const canAnalyze = energyScore !== null && positivityScore !== null;

  return (
    <div className="space-y-8">
      {/* Energy Level */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white mb-0.5">Energy Level</h2>
          <p className="text-sm text-gray-500">How energized do you feel right now?</p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          {ENERGY_EMOJIS.map(({ emoji, label }, index) => {
            const score = index + 1;
            const isSelected = energyScore === score;
            return (
              <button
                key={score}
                onClick={() => onEnergyChange(score)}
                className={`flex-1 flex flex-col items-center gap-1.5 py-4 px-1 rounded-2xl border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-purple-500 bg-purple-500/20 scale-110 shadow-lg shadow-purple-500/30'
                    : 'border-white/10 bg-white/5 hover:bg-white/10 hover:scale-105 hover:border-white/20'
                }`}
                aria-label={`Energy level ${score} - ${label}`}
                data-testid={`energy-${score}`}
              >
                <span className="text-3xl sm:text-4xl leading-none">{emoji}</span>
                <span className="text-xs text-gray-400 font-medium hidden sm:block">{label}</span>
                <span className="text-xs text-gray-500">{score}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Positivity Level */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white mb-0.5">Positivity Level</h2>
          <p className="text-sm text-gray-500">How positive are you feeling overall?</p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          {POSITIVITY_EMOJIS.map(({ emoji, label }, index) => {
            const score = index + 1;
            const isSelected = positivityScore === score;
            return (
              <button
                key={score}
                onClick={() => onPositivityChange(score)}
                className={`flex-1 flex flex-col items-center gap-1.5 py-4 px-1 rounded-2xl border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500/20 scale-110 shadow-lg shadow-blue-500/30'
                    : 'border-white/10 bg-white/5 hover:bg-white/10 hover:scale-105 hover:border-white/20'
                }`}
                aria-label={`Positivity level ${score} - ${label}`}
                data-testid={`positivity-${score}`}
              >
                <span className="text-3xl sm:text-4xl leading-none">{emoji}</span>
                <span className="text-xs text-gray-400 font-medium hidden sm:block">{label}</span>
                <span className="text-xs text-gray-500">{score}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Emoji Tag Picker */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white mb-0.5">
            Mood Tag{' '}
            <span className="text-gray-500 font-normal text-sm">(optional)</span>
          </h2>
          <p className="text-sm text-gray-500">Pick an emoji that best captures your vibe</p>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {MOOD_EMOJI_GRID.map((emoji) => {
            const isSelected = selectedEmoji === emoji;
            return (
              <button
                key={emoji}
                onClick={() => onEmojiSelect(selectedEmoji === emoji ? '' : emoji)}
                className={`aspect-square flex items-center justify-center text-2xl rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-purple-400 bg-purple-500/25 scale-110 shadow-md shadow-purple-500/30'
                    : 'border-white/10 bg-white/5 hover:bg-white/10 hover:scale-105 hover:border-white/20'
                }`}
                aria-label={`Select emoji ${emoji}`}
                data-testid={`emoji-${emoji}`}
              >
                {emoji}
              </button>
            );
          })}
        </div>
      </section>

      {/* Analyze Button */}
      <button
        onClick={onAnalyze}
        disabled={!canAnalyze}
        className={`w-full py-4 rounded-2xl text-white font-black text-lg tracking-wide transition-all duration-300 ${
          canAnalyze
            ? 'cursor-pointer shadow-xl shadow-purple-500/25 hover:scale-[1.02] hover:shadow-purple-500/40 active:scale-[0.99]'
            : 'cursor-not-allowed opacity-40'
        }`}
        style={
          canAnalyze
            ? { background: 'linear-gradient(135deg, #a855f7, #ec4899)' }
            : { background: '#374151' }
        }
        data-testid="analyze-button"
      >
        ✨ Analyze My Mood
      </button>
    </div>
  );
}
