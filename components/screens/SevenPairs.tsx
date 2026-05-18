'use client';

import { useState } from 'react';
import type { AppState, Pair } from '@/types';
import { QUESTIONS } from '@/lib/pairs';
import { PairSpecimen } from '@/components/specimens/PairSpecimen';

interface Props {
  state: AppState;
  setState: (updater: (s: AppState) => AppState) => void;
}

type PairId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export function SevenPairs({ state, setState }: Props) {
  const [index, setIndex] = useState(0);
  const q = QUESTIONS[index];
  const pairId = q.id as PairId;
  const selected: Pair = state.pairs[pairId];
  const analysis = selected === 'A' ? q.analysisA : selected === 'B' ? q.analysisB : null;

  const choose = (letter: 'A' | 'B') =>
    setState((s) => ({ ...s, pairs: { ...s.pairs, [pairId]: letter } }));

  const next = () => {
    if (index < QUESTIONS.length - 1) {
      setIndex(index + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setState((s) => ({ ...s, currentScreen: 'gallery' }));
    }
  };

  const back = () => {
    if (index > 0) {
      setIndex(index - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setState((s) => ({ ...s, currentScreen: 'content' }));
    }
  };

  return (
    <section className="max-w-wide mx-auto">
      <div className="flex items-center justify-between mb-6">
        <p className="label-eyebrow">Your Voice</p>
        <p className="muted text-[11px] tracking-[0.14em] uppercase">
          Pair {String(index + 1).padStart(2, '0')} of 07
        </p>
      </div>

      <div className="rule-h mb-8" />

      <p className="muted text-[13px] italic mb-3">{q.axis}</p>
      <h2 className="h-section mb-3">{q.question}</h2>
      <p className="lede mb-10">{q.sub}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <PairSpecimen
          html={q.specimenA}
          label="A"
          selected={selected === 'A'}
          onSelect={() => choose('A')}
        />
        <PairSpecimen
          html={q.specimenB}
          label="B"
          selected={selected === 'B'}
          onSelect={() => choose('B')}
        />
      </div>

      <div
        className="card mb-8 transition-opacity duration-300"
        style={{ opacity: analysis ? 1 : 0.35 }}
      >
        <p className="label-eyebrow mb-2">What that says about you</p>
        <p className="body-text">
          {analysis || 'Pick A or B to see what it says about how you organize design.'}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button type="button" className="btn btn-ghost" onClick={back}>
          ← Back
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={next}
          disabled={!selected}
        >
          {index === QUESTIONS.length - 1 ? 'Continue to style' : 'Next pair'} →
        </button>
      </div>
    </section>
  );
}
