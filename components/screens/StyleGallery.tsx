'use client';

import type { AppState } from '@/types';

interface Props {
  state: AppState;
  setState: (updater: (s: AppState) => AppState) => void;
}

export function StyleGallery({ setState }: Props) {
  return (
    <section className="max-w-wide mx-auto">
      <p className="label-eyebrow mb-6">Your Style</p>
      <h1 className="h-section mb-3">What structures are you drawn to?</h1>
      <p className="lede mb-10">[Stub — Commit 4 will render the 10 image tiles from /public/specimens/ with ring-buffer max-3 selection and the specimen-04 inline note.]</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setState((s) => ({ ...s, currentScreen: 'territory' }))}
      >
        Continue →
      </button>
    </section>
  );
}
