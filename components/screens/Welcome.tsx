'use client';

import { useRef, useState } from 'react';
import type { AppState } from '@/types';
import { fileToDataUrl } from '@/lib/colors';

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
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const canContinue = state.name.trim().length > 0 && state.purpose !== '';

  const onUpload = async (file: File) => {
    setUploadError(null);
    if (file.size > 6 * 1024 * 1024) {
      setUploadError('Image is larger than 6 MB — please pick a smaller one.');
      return;
    }
    try {
      const dataUrl = await fileToDataUrl(file);
      setState((s) => ({ ...s, qualityReference: dataUrl }));
    } catch {
      setUploadError("Couldn't read that file.");
    }
  };

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
          <p className="label-section">Optional: a reference for quality</p>
          <div
            className="card"
            style={{
              borderStyle: 'dashed',
              borderColor: 'rgba(242,237,228,0.22)',
              background: 'transparent',
            }}
          >
            {state.qualityReference ? (
              <div className="flex items-center gap-4">
                <img
                  src={state.qualityReference}
                  alt="Quality reference"
                  className="h-20 w-20 object-cover rounded-input"
                  style={{ border: '0.5px solid rgba(242,237,228,0.18)' }}
                />
                <div className="flex-1">
                  <p className="body-text text-sm mb-1">Quality reference uploaded.</p>
                  <p className="muted text-xs">This will set the bar the model holds your design to.</p>
                </div>
                <button
                  type="button"
                  className="btn-text"
                  onClick={() => setState((s) => ({ ...s, qualityReference: null }))}
                >
                  Remove
                </button>
              </div>
            ) : (
              <>
                <p className="body-text mb-1">
                  Show us one thing you think is excellently designed.
                </p>
                <p className="muted text-sm mb-4">
                  Anything — a photo, a screenshot, something you walked past. This sets your quality bar.
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) onUpload(f);
                      e.target.value = '';
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => fileRef.current?.click()}
                  >
                    Upload image
                  </button>
                  <span className="muted text-xs">— or —</span>
                  <button
                    type="button"
                    className="btn-text"
                    onClick={() => setState((s) => ({ ...s, qualityReference: null }))}
                  >
                    Skip →
                  </button>
                </div>
                {uploadError && (
                  <p className="muted text-xs mt-2" style={{ color: '#dcb088' }}>
                    {uploadError}
                  </p>
                )}
              </>
            )}
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
