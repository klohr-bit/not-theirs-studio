'use client';

import { useRef, useState } from 'react';
import type { AppState, ContentState, ColorsState } from '@/types';
import { extractColorsFromImage, isValidHex, normalizeHex } from '@/lib/colors';

interface Props {
  state: AppState;
  setState: (updater: (s: AppState) => AppState) => void;
}

const ANCHOR_OPTIONS: Array<{ value: NonNullable<ContentState['visualAnchor']>; label: string }> = [
  { value: 'event_name',   label: 'The event name' },
  { value: 'date',         label: 'The date' },
  { value: 'organization', label: 'The organization' },
  { value: 'feeling',      label: 'The feeling of the thing' },
];

type ColorMode = 'yes' | 'no' | 'unsure' | null;

export function ContentCollection({ state, setState }: Props) {
  const [activitiesText, setActivitiesText] = useState(state.content.activities.join('\n'));
  const [partnersText, setPartnersText] = useState(state.content.partners.join(', '));
  const [colorMode, setColorMode] = useState<ColorMode>(state.colors.provided ? 'yes' : null);
  const [colorFields, setColorFields] = useState<Array<{ hex: string; label: string }>>(
    state.colors.hex.length > 0
      ? state.colors.hex.map((h) => ({ hex: h, label: '' }))
      : [{ hex: '', label: '' }]
  );
  const [extractStatus, setExtractStatus] = useState<string | null>(null);
  const logoRef = useRef<HTMLInputElement | null>(null);

  const canContinue =
    state.content.eventName.trim().length > 0 &&
    state.content.hostedBy.trim().length > 0;

  const setContent = (patch: Partial<ContentState>) =>
    setState((s) => ({ ...s, content: { ...s.content, ...patch } }));

  const setColors = (patch: Partial<ColorsState>) =>
    setState((s) => ({ ...s, colors: { ...s.colors, ...patch } }));

  const commitColors = (rows: Array<{ hex: string; label: string }>, provided: boolean) => {
    const hex = rows.map((r) => r.hex.trim()).filter(isValidHex).map(normalizeHex);
    setColors({ provided, hex });
  };

  const onColorChange = (i: number, hex: string) => {
    const next = colorFields.map((row, idx) => (idx === i ? { ...row, hex } : row));
    setColorFields(next);
    commitColors(next, true);
  };

  const onLabelChange = (i: number, label: string) => {
    const next = colorFields.map((row, idx) => (idx === i ? { ...row, label } : row));
    setColorFields(next);
  };

  const addColorRow = () => {
    if (colorFields.length >= 4) return;
    setColorFields([...colorFields, { hex: '', label: '' }]);
  };

  const removeColorRow = (i: number) => {
    const next = colorFields.filter((_, idx) => idx !== i);
    setColorFields(next.length > 0 ? next : [{ hex: '', label: '' }]);
    commitColors(next, true);
  };

  const onLogoUpload = async (file: File) => {
    setExtractStatus('Extracting colors…');
    try {
      const colors = await extractColorsFromImage(file, 4);
      if (colors.length === 0) {
        setExtractStatus('No dominant colors found — try a different image.');
        return;
      }
      const rows = colors.map((c) => ({ hex: c, label: '' }));
      setColorFields(rows);
      setColors({ provided: true, hex: colors, extractedFromLogo: true });
      setExtractStatus(`Colors found (${colors.length}). Adjust any if needed.`);
    } catch {
      setExtractStatus("Couldn't extract colors from that image.");
    }
  };

  return (
    <section className="max-w-screen mx-auto">
      <p className="label-eyebrow mb-6">Content</p>
      <h1 className="h-section mb-3">Tell us what&rsquo;s going in the flyer.</h1>
      <p className="lede mb-12">Just the facts. We handle the design.</p>

      <div className="space-y-8">
        <Field label="Event or announcement name *" required>
          <input
            type="text"
            className="field"
            value={state.content.eventName}
            onChange={(e) => setContent({ eventName: e.target.value })}
          />
        </Field>

        <Field label="Hosted or presented by *" required>
          <input
            type="text"
            className="field"
            value={state.content.hostedBy}
            onChange={(e) => setContent({ hostedBy: e.target.value })}
          />
        </Field>

        <div className="grid md:grid-cols-2 gap-6">
          <Field label="Date">
            <input
              type="text"
              className="field"
              placeholder="Saturday, June 20th"
              value={state.content.date}
              onChange={(e) => setContent({ date: e.target.value })}
            />
          </Field>
          <Field label="Time">
            <input
              type="text"
              className="field"
              placeholder="9am – 3pm"
              value={state.content.time}
              onChange={(e) => setContent({ time: e.target.value })}
            />
          </Field>
        </div>

        <Field label="Location name">
          <input
            type="text"
            className="field"
            value={state.content.locationName}
            onChange={(e) => setContent({ locationName: e.target.value })}
          />
        </Field>

        <Field label="Address">
          <input
            type="text"
            className="field"
            value={state.content.address}
            onChange={(e) => setContent({ address: e.target.value })}
          />
        </Field>

        <Field label="What's happening there" hint="One item per line.">
          <textarea
            className="field"
            value={activitiesText}
            onChange={(e) => {
              setActivitiesText(e.target.value);
              setContent({
                activities: e.target.value.split('\n').map((l) => l.trim()).filter(Boolean),
              });
            }}
          />
        </Field>

        <Field label="Who should come">
          <input
            type="text"
            className="field"
            placeholder="All ages welcome"
            value={state.content.audience}
            onChange={(e) => setContent({ audience: e.target.value })}
          />
        </Field>

        <Field label="Contact information">
          <input
            type="text"
            className="field"
            value={state.content.contact}
            onChange={(e) => setContent({ contact: e.target.value })}
          />
        </Field>

        <Field
          label="Closing statement"
          hint="Leave blank and we&rsquo;ll write one."
        >
          <input
            type="text"
            className="field"
            value={state.content.closingStatement}
            onChange={(e) => setContent({ closingStatement: e.target.value })}
          />
        </Field>

        <Field
          label="Partners or co-presenters"
          hint="Comma-separated."
        >
          <input
            type="text"
            className="field"
            value={partnersText}
            onChange={(e) => {
              setPartnersText(e.target.value);
              setContent({
                partners: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
              });
            }}
          />
        </Field>

        <Field label="Anything else that must appear">
          <textarea
            className="field"
            value={state.content.other}
            onChange={(e) => setContent({ other: e.target.value })}
          />
        </Field>

        <div className="rule-h" />

        <div>
          <p className="label-section">Visual anchor</p>
          <p className="lede mb-4">
            If someone glances at this for one second, what&rsquo;s the one thing you want them to catch?
          </p>
          <div className="grid grid-cols-2 gap-2">
            {ANCHOR_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setContent({ visualAnchor: opt.value })}
                className={
                  'chip justify-start text-left ' +
                  (state.content.visualAnchor === opt.value ? 'chip-selected' : '')
                }
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rule-h" />

        <div>
          <p className="label-section">Brand colors</p>
          <p className="lede mb-4">Do you have brand colors?</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { v: 'yes', l: 'Yes' },
              { v: 'no', l: 'No' },
              { v: 'unsure', l: 'Not sure' },
            ].map((o) => (
              <button
                key={o.v}
                type="button"
                onClick={() => {
                  setColorMode(o.v as ColorMode);
                  if (o.v === 'yes') {
                    setColors({ provided: true });
                  } else {
                    setColors({ provided: false, hex: [], extractedFromLogo: false });
                    setColorFields([{ hex: '', label: '' }]);
                  }
                }}
                className={'chip ' + (colorMode === o.v ? 'chip-selected' : '')}
              >
                {o.l}
              </button>
            ))}
          </div>

          {colorMode === 'yes' && (
            <div className="card space-y-4">
              {colorFields.map((row, i) => (
                <div key={i} className="grid grid-cols-[44px_1fr_1fr_auto] gap-3 items-center">
                  <input
                    type="color"
                    value={isValidHex(row.hex) ? normalizeHex(row.hex) : '#666666'}
                    onChange={(e) => onColorChange(i, e.target.value.toUpperCase())}
                    className="h-11 w-11 rounded-input border-0 cursor-pointer bg-transparent"
                    style={{ padding: 0 }}
                    aria-label={`Color ${i + 1} swatch`}
                  />
                  <input
                    type="text"
                    placeholder="#RRGGBB"
                    value={row.hex}
                    onChange={(e) => onColorChange(i, e.target.value.toUpperCase())}
                    className="field font-mono text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Label (optional)"
                    value={row.label}
                    onChange={(e) => onLabelChange(i, e.target.value)}
                    className="field text-sm"
                  />
                  {colorFields.length > 1 && (
                    <button
                      type="button"
                      className="btn-text text-xs"
                      onClick={() => removeColorRow(i)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <div className="flex items-center gap-3 flex-wrap">
                {colorFields.length < 4 && (
                  <button type="button" className="btn-text text-xs" onClick={addColorRow}>
                    + Add color
                  </button>
                )}
                <span className="muted text-xs">— or —</span>
                <input
                  ref={logoRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) onLogoUpload(f);
                    e.target.value = '';
                  }}
                />
                <button
                  type="button"
                  className="btn-text text-xs"
                  onClick={() => logoRef.current?.click()}
                >
                  Upload your logo — we&rsquo;ll pull the colors
                </button>
              </div>
              {extractStatus && <p className="muted text-xs">{extractStatus}</p>}
            </div>
          )}

          {colorMode === 'no' && (
            <p className="muted text-sm">
              Skip it. We&rsquo;ll pick a temperature with you on the next screen.
            </p>
          )}
          {colorMode === 'unsure' && (
            <p className="muted text-sm">
              Skip it. We&rsquo;ll pick a temperature with you on the next screen.
            </p>
          )}
        </div>

        <div className="rule-h" />

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            disabled={!canContinue}
            className="btn btn-primary"
            onClick={() => setState((s) => ({ ...s, currentScreen: 'pairs' }))}
          >
            Now let&rsquo;s find your design voice →
          </button>
          <button
            type="button"
            className="btn-text text-sm"
            onClick={() => setState((s) => ({ ...s, currentScreen: 'welcome' }))}
          >
            ← Back
          </button>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="label-section block">
        {label}
        {required && <span className="muted ml-1">required</span>}
      </label>
      {children}
      {hint && <p className="muted text-xs mt-2">{hint}</p>}
    </div>
  );
}
