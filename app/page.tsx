'use client';

import { useEffect, useMemo, useState } from 'react';
import type { AppState } from '@/types';
import { INITIAL_STATE } from '@/types';
import { loadSignature, SavedSignature } from '@/lib/storage';
import { JourneyIndicator } from '@/components/JourneyIndicator';
import { Welcome } from '@/components/screens/Welcome';
import { ContentCollection } from '@/components/screens/ContentCollection';
import { SevenPairs } from '@/components/screens/SevenPairs';
import { StyleGallery } from '@/components/screens/StyleGallery';
import { VisualTerritory } from '@/components/screens/VisualTerritory';
import { Loading } from '@/components/screens/Loading';
import { SignatureCard } from '@/components/screens/SignatureCard';
import { ReturnVisit } from '@/components/screens/ReturnVisit';

export default function App() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [saved, setSaved] = useState<SavedSignature | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const existing = loadSignature();
    if (existing) {
      setSaved(existing);
      setState((s) => ({ ...s, currentScreen: 'return' }));
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [state.currentScreen]);

  const screen = useMemo(() => {
    if (!hydrated) return null;
    switch (state.currentScreen) {
      case 'welcome':
        return <Welcome state={state} setState={setState} />;
      case 'content':
        return <ContentCollection state={state} setState={setState} />;
      case 'pairs':
        return <SevenPairs state={state} setState={setState} />;
      case 'gallery':
        return <StyleGallery state={state} setState={setState} />;
      case 'territory':
        return <VisualTerritory state={state} setState={setState} />;
      case 'loading':
        return <Loading state={state} setState={setState} />;
      case 'card':
        return <SignatureCard state={state} setState={setState} />;
      case 'return':
        return saved ? (
          <ReturnVisit state={state} setState={setState} saved={saved} />
        ) : (
          <Welcome state={state} setState={setState} />
        );
      default:
        return <Welcome state={state} setState={setState} />;
    }
  }, [hydrated, state, saved]);

  return (
    <main className="min-h-screen flex flex-col">
      <header className="border-b border-[rgba(242,237,228,0.08)]">
        <div className="max-w-wide mx-auto flex items-center justify-between px-6 py-5">
          <span className="text-[12px] font-semibold tracking-[0.04em]">
            Yours, Not Theirs
          </span>
          <JourneyIndicator screen={state.currentScreen} />
        </div>
      </header>
      <div className="flex-1 px-6 py-12 md:py-20">
        {screen}
      </div>
      <footer className="px-6 py-8">
        <p className="muted text-[11px] tracking-[0.12em] uppercase text-center">
          Kimberly Lohr Signature Method
        </p>
      </footer>
    </main>
  );
}
