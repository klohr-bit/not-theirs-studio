'use client';

import { useEffect } from 'react';
import type { AppState } from '@/types';

interface Props {
  state: AppState;
  setState: (updater: (s: AppState) => AppState) => void;
}

export function Loading({ setState }: Props) {
  useEffect(() => {
    // Commit 8 will replace this auto-advance with the real /api/signature call.
    const t = setTimeout(() => {
      setState((s) => ({ ...s, currentScreen: 'card' }));
    }, 900);
    return () => clearTimeout(t);
  }, [setState]);

  return (
    <section className="max-w-screen mx-auto">
      <p className="label-eyebrow mb-6">Your Signature</p>
      <h1 className="h-section mb-3">Building your Signature…</h1>
      <p className="lede mb-2">Stripping defaults.</p>
      <p className="lede">Injecting you.</p>
    </section>
  );
}
