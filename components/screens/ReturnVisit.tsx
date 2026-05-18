'use client';

import type { AppState } from '@/types';
import type { SavedSignature } from '@/lib/storage';
import { clearSignature, daysSince } from '@/lib/storage';

interface Props {
  state: AppState;
  setState: (updater: (s: AppState) => AppState) => void;
  saved: SavedSignature;
}

export function ReturnVisit({ saved, setState }: Props) {
  const days = daysSince(saved.savedAt);
  const when =
    days === 0 ? 'today' : days === 1 ? 'yesterday' : `${days} days ago`;

  return (
    <section className="max-w-screen mx-auto">
      <p className="label-eyebrow mb-6">Welcome back</p>
      <h1 className="h-display mb-4">Welcome back, {saved.name}.</h1>
      <p className="lede mb-10">Your Signature was saved {when}.</p>
      <div className="flex gap-3 flex-wrap">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            setState((s) => ({
              ...s,
              name: saved.name,
              signature: {
                voice: saved.voice,
                tokens: saved.tokens,
                signature_prompt: saved.signaturePrompt,
              },
              contradictions: saved.contradictions.map((c) => ({ ...c })),
              currentScreen: 'card',
            }))
          }
        >
          View my Signature →
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            clearSignature();
            setState((s) => ({ ...s, currentScreen: 'welcome' }));
          }}
        >
          Start fresh →
        </button>
      </div>
    </section>
  );
}
