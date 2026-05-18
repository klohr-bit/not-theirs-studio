import type { AppState, GeneratedSignature, ResolvedContradiction } from '@/types';

export const STORAGE_KEY = 'ynt_signature_v1';

export interface SavedSignature {
  name: string;
  savedAt: string;
  voice: string;
  tokens: string[];
  signaturePrompt: string;
  contradictions: ResolvedContradiction[];
  allChoices: {
    pairs: AppState['pairs'];
    territory: AppState['territory'];
    specimenSelections: AppState['specimenSelections'];
    content: AppState['content'];
    colors: AppState['colors'];
  };
}

export function loadSignature(): SavedSignature | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedSignature;
    if (!parsed?.name || !parsed?.signaturePrompt) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveSignature(
  state: AppState,
  signature: GeneratedSignature,
  contradictions: ResolvedContradiction[]
): SavedSignature {
  const payload: SavedSignature = {
    name: state.name,
    savedAt: new Date().toISOString(),
    voice: signature.voice,
    tokens: signature.tokens,
    signaturePrompt: signature.signature_prompt,
    contradictions,
    allChoices: {
      pairs: state.pairs,
      territory: state.territory,
      specimenSelections: state.specimenSelections,
      content: state.content,
      colors: state.colors,
    },
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // quota or disabled — silently ignore
  }
  return payload;
}

export function clearSignature(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function daysSince(iso: string): number {
  const then = new Date(iso).getTime();
  const now = Date.now();
  return Math.max(0, Math.floor((now - then) / (1000 * 60 * 60 * 24)));
}
