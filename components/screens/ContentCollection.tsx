'use client';

import type { AppState } from '@/types';

interface Props {
  state: AppState;
  setState: (updater: (s: AppState) => AppState) => void;
}

export function ContentCollection({ setState }: Props) {
  return (
    <section className="max-w-screen mx-auto">
      <p className="label-eyebrow mb-6">Content</p>
      <h1 className="h-section mb-3">Tell us what&rsquo;s going in the flyer.</h1>
      <p className="lede mb-10">Just the facts. We handle the design.</p>
      <p className="muted text-sm mb-6">[Stub — Commit 2 will add all content fields, visual anchor question, brand color inputs/upload.]</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setState((s) => ({ ...s, currentScreen: 'pairs' }))}
      >
        Now let&rsquo;s find your design voice →
      </button>
    </section>
  );
}
