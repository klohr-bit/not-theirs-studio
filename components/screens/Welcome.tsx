'use client';

import type { AppState } from '@/types';

interface Props {
  state: AppState;
  setState: (updater: (s: AppState) => AppState) => void;
}

const PURPOSE_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'community_event',  label: 'A community event or announcement' },
  { value: 'local_business',   label: 'A local business or service' },
  { value: 'nonprofit',        label: 'A nonprofit or cause' },
  { value: 'school',           label: 'A school or educational program' },
  { value: 'professional',     label: 'A professional practice' },
  { value: 'creative',         label: 'A creative project or brand' },
  { value: 'other',            label: 'Something else' },
];

const FORMAT_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'print',         label: 'Printed and posted' },
  { value: 'social',        label: 'Shared on social media' },
  { value: 'both',          label: 'Both print and social' },
  { value: 'email_digital', label: 'Email or digital' },
  { value: 'projected',     label: 'Projected on screen' },
];

export function Welcome({ state, setState }: Props) {
  const canContinue = state.name.trim().length > 0 && state.purpose !== '';

  return (
    <section className="max-w-screen mx-auto">
      <p className="label-eyebrow mb-8">Yours, Not Theirs</p>

      <h1 className="h-display mb-6">
        Your Flyer,{' '}
        <span className="italic" style={{ color: 'rgb(var(--accent))' }}>
          Not Theirs
        </span>
        .
      </h1>

      <p className="lede mb-12">
        Seven questions. Your design identity. Everything you make with AI looks like you — not like everyone else.
      </p>

      <div className="space-y-10">
        <div>
          <label htmlFor="name" className="label-section block">What&rsquo;s your name?</label>
          <input
            id="name"
            type="text"
            autoComplete="given-name"
            placeholder="First name"
            value={state.name}
            onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
            className="field"
          />
        </div>

        <div>
          <p className="label-section">What are you making this for?</p>
          <div className="flex flex-wrap gap-2">
            {PURPOSE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setState((s) => ({ ...s, purpose: opt.value }))}
                className={'chip ' + (state.purpose === opt.value ? 'chip-selected' : '')}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="label-section">Where will people see this?</p>
          <div className="flex flex-wrap gap-2">
            {FORMAT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setState((s) => ({ ...s, format: opt.value }))}
                className={'chip ' + (state.format === opt.value ? 'chip-selected' : '')}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <button
            type="button"
            disabled={!canContinue}
            className="btn btn-primary"
            onClick={() => setState((s) => ({ ...s, currentScreen: 'content' }))}
          >
            Start finding my Signature →
          </button>
          <p className="muted text-xs mt-3">5 minutes &middot; Saves automatically</p>
        </div>
      </div>
    </section>
  );
}
