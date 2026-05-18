'use client';

import type { AppState } from '@/types';

interface Props {
  state: AppState;
  setState: (updater: (s: AppState) => AppState) => void;
}

export function SevenPairs({ setState }: Props) {
  return (
    <section className="max-w-wide mx-auto">
      <p className="label-eyebrow mb-6">Your Voice</p>
      <h1 className="h-section mb-3">Seven pairs. React, don&rsquo;t deliberate.</h1>
      <p className="lede mb-10">[Stub — Commit 3 will migrate the 14 specimen HTML blocks into PairSpecimen.tsx and wire the A/B choice flow with the existing analysis copy.]</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setState((s) => ({ ...s, currentScreen: 'gallery' }))}
      >
        Continue →
      </button>
    </section>
  );
}
