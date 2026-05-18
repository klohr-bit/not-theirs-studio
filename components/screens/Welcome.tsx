'use client';

import type { AppState } from '@/types';

interface Props {
  state: AppState;
  setState: (updater: (s: AppState) => AppState) => void;
}

export function Welcome({ state, setState }: Props) {
  return (
    <section className="max-w-screen mx-auto">
      <p className="label-eyebrow mb-8">Yours, Not Theirs</p>
      <h1 className="h-display mb-6">Your Flyer, <span className="italic" style={{ color: 'rgb(var(--accent))' }}>Not Theirs</span>.</h1>
      <p className="lede mb-10">
        Seven questions. Your design identity. Everything you make with AI looks like you — not like everyone else.
      </p>
      <p className="muted text-sm mb-3">[Stub — Commit 2 will wire name, purpose, format, optional quality reference upload.]</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setState((s) => ({ ...s, currentScreen: 'content' }))}
      >
        Start finding my Signature →
      </button>
      <p className="muted text-xs mt-3">5 minutes · Saves automatically</p>
    </section>
  );
}
