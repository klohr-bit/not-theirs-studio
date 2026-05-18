'use client';

import type { AppState } from '@/types';

interface Props {
  state: AppState;
  setState: (updater: (s: AppState) => AppState) => void;
}

export function SignatureCard({ state, setState }: Props) {
  return (
    <section className="max-w-screen mx-auto">
      <p className="label-eyebrow mb-6" style={{ color: 'rgb(var(--accent))' }}>Your Signature is ready</p>
      <h1 className="h-display mb-2">{state.name ? `${state.name}'s` : 'Your'} Design Signature</h1>
      <p className="muted text-sm mb-10">Kimberly Lohr Signature Method</p>
      <p className="muted text-sm mb-6">[Stub — Commits 7 and 8 will populate voice, tokens, signature_prompt, contradiction resolution, and the three action buttons.]</p>
      <button
        type="button"
        className="btn btn-ghost"
        onClick={() => setState((s) => ({ ...s, currentScreen: 'welcome' }))}
      >
        Start over
      </button>
    </section>
  );
}
