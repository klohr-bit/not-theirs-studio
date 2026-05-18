'use client';

import type { AppState } from '@/types';

interface Props {
  state: AppState;
  setState: (updater: (s: AppState) => AppState) => void;
}

export function VisualTerritory({ setState }: Props) {
  return (
    <section className="max-w-screen mx-auto">
      <p className="label-eyebrow mb-6">Your Style — Visual territory</p>
      <h1 className="h-section mb-3">Energy. Color. Visual direction.</h1>
      <p className="lede mb-10">[Stub — Commit 5 will build the three-part flow: 20-word energy tap grid (max 3), three color tiles rendered by /api/tiles, and the visual direction tiles with "choose for me" logic.]</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setState((s) => ({ ...s, currentScreen: 'loading' }))}
      >
        Build my Signature →
      </button>
    </section>
  );
}
