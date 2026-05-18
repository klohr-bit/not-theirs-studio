'use client';

import { useEffect, useRef, useState } from 'react';
import type { AppState, ResolvedContradiction } from '@/types';
import { saveSignature } from '@/lib/storage';

interface Props {
  state: AppState;
  setState: (updater: (s: AppState) => AppState) => void;
}

export function Loading({ state, setState }: Props) {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const startedRef = useRef(false);

  const messages = [
    'Building your Signature…',
    'Stripping defaults.',
    'Injecting you.',
    ...(state.qualityReference ? ['Setting your quality bar.'] : []),
  ];

  useEffect(() => {
    const t = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length);
    }, 1800);
    return () => clearInterval(t);
  }, [messages.length]);

  useEffect(() => {
    // simulated steady progress — fills over ~18 seconds, asymptotes near 95%
    const t = setInterval(() => {
      setProgress((p) => (p < 95 ? p + Math.max(0.4, (95 - p) * 0.025) : p));
    }, 200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    (async () => {
      try {
        const res = await fetch('/api/signature', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(state),
        });
        const data = await res.json();
        if (!res.ok) {
          const detail = data?.detail ? ` — ${data.detail}` : '';
          setError((data?.error || 'Generation failed') + detail);
          return;
        }

        const signature = {
          voice: data.voice as string,
          tokens: data.tokens as string[],
          signature_prompt: data.signature_prompt as string,
        };
        const contradictions: ResolvedContradiction[] = (data.contradictions || []).map(
          (c: ResolvedContradiction) => ({ ...c, resolved: null })
        );

        saveSignature(state, signature, contradictions);
        setProgress(100);

        setTimeout(() => {
          setState((s) => ({
            ...s,
            signature,
            contradictions,
            savedAt: new Date().toISOString(),
            currentScreen: 'card',
          }));
        }, 350);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
    })();
  }, [state, setState]);

  const retry = () => {
    startedRef.current = false;
    setError(null);
    setProgress(0);
  };

  return (
    <section className="max-w-screen mx-auto">
      <p className="label-eyebrow mb-6">Your Signature</p>

      {error ? (
        <>
          <h1 className="h-section mb-3">Something went sideways.</h1>
          <p className="lede mb-6">{error}</p>
          <div className="flex gap-3 flex-wrap">
            <button type="button" className="btn btn-primary" onClick={retry}>
              Try again
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setState((s) => ({ ...s, currentScreen: 'territory' }))}
            >
              ← Back to territory
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="h-section mb-4">{messages[messageIndex]}</h1>
          <p className="muted text-sm mb-10">This usually takes 10–20 seconds.</p>
          <div
            className="w-full"
            style={{
              height: 3,
              background: 'rgba(242,237,228,0.10)',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'rgb(var(--accent))',
                transition: 'width 250ms ease-out',
              }}
            />
          </div>
        </>
      )}
    </section>
  );
}
