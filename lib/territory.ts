import type { AppState, TerritoryState } from '@/types';

export const ENERGY_WORDS = [
  'Commanding', 'Quiet',      'Urgent',     'Considered',
  'Generous',   'Spare',      'Warm',       'Precise',
  'Playful',    'Serious',    'Raw',        'Resolved',
  'Bold',       'Intimate',   'Historic',   'Forward',
  'Honest',     'Confident',  'Surprising', 'Inevitable',
] as const;

export type EnergyWord = (typeof ENERGY_WORDS)[number];

export type VisualDirection = NonNullable<TerritoryState['visualDirection']>;
export type IllustrationStyle = NonNullable<TerritoryState['illustrationStyle']>;

interface AutoDirectionResult {
  visualDirection: VisualDirection;
  illustrationStyle: IllustrationStyle | null;
}

/**
 * "Choose for me" — derives a visual direction from the user's pair choices
 * and selected energy words. Implements the mapping in the brief.
 */
export function chooseVisualDirection(state: AppState): AutoDirectionResult {
  const pairs = state.pairs;
  const words = state.territory.energyWords.map((w) => w.toLowerCase());

  if (pairs[7] === 'B' && (words.includes('commanding') || words.includes('bold'))) {
    return { visualDirection: 'C', illustrationStyle: 'A' };
  }
  if (pairs[7] === 'B' && (words.includes('quiet') || words.includes('considered'))) {
    return { visualDirection: 'C', illustrationStyle: 'B' };
  }
  if (pairs[7] === 'B' && (words.includes('raw') || words.includes('surprising'))) {
    return { visualDirection: 'C', illustrationStyle: 'C' };
  }
  if (pairs[7] === 'A' && (words.includes('precise') || words.includes('inevitable'))) {
    return { visualDirection: 'D', illustrationStyle: null };
  }
  if (pairs[2] === 'B' && pairs[6] === 'A' && pairs[7] === 'A') {
    return { visualDirection: 'A', illustrationStyle: null };
  }
  return { visualDirection: 'C', illustrationStyle: 'B' };
}

export const VISUAL_DIRECTIONS: Array<{
  value: VisualDirection;
  letter: string;
  title: string;
  body: string;
}> = [
  { value: 'A', letter: 'A', title: 'Type only',         body: 'The words are the visual. Nothing else needed.' },
  { value: 'B', letter: 'B', title: 'I have photos',     body: 'Upload up to 3 photos to use in the design.' },
  { value: 'C', letter: 'C', title: 'Illustration',      body: 'A graphic interpretation.' },
  { value: 'D', letter: 'D', title: 'A graphic element', body: 'A shape, a form, a mark.' },
];

export const ILLUSTRATION_STYLES: Array<{
  value: IllustrationStyle;
  letter: string;
  title: string;
  body: string;
}> = [
  { value: 'A', letter: 'A', title: 'Bold and graphic',     body: 'High contrast, strong shapes, screenprint energy.' },
  { value: 'B', letter: 'B', title: 'Fine and detailed',    body: 'Line drawing, careful, hand-rendered.' },
  { value: 'C', letter: 'C', title: 'Loose and gestural',   body: 'Brush marks, expressive, sketch energy.' },
  { value: 'D', letter: 'D', title: 'Flat and geometric',   body: 'Clean shapes, modern, no texture.' },
];
