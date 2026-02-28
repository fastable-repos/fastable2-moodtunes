import type { MoodQuadrantName } from '../types';

export function getMoodQuadrant(
  energyScore: number,
  positivityScore: number
): MoodQuadrantName {
  const energy =
    energyScore <= 2 ? 'low' : energyScore >= 4 ? 'high' : 'medium';
  const positivity =
    positivityScore <= 2
      ? 'negative'
      : positivityScore >= 4
      ? 'positive'
      : 'neutral';

  if (energy === 'high' && positivity === 'positive') return 'Euphoric';
  if (energy === 'high' && positivity === 'neutral') return 'Excited';
  if (energy === 'high' && positivity === 'negative') return 'Anxious';
  if (energy === 'medium' && positivity === 'positive') return 'Content';
  if (energy === 'medium' && positivity === 'neutral') return 'Calm';
  if (energy === 'medium' && positivity === 'negative') return 'Frustrated';
  if (energy === 'low' && positivity === 'positive') return 'Peaceful';
  if (energy === 'low' && positivity === 'neutral') return 'Melancholic';
  return 'Depleted';
}
