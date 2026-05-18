'use client';

import { useRef, useState } from 'react';
import type { AppState, ColorsState, TerritoryState } from '@/types';
import {
  ENERGY_WORDS,
  VISUAL_DIRECTIONS,
  ILLUSTRATION_STYLES,
  chooseVisualDirection,
  type VisualDirection,
  type IllustrationStyle,
} from '@/lib/territory';
import { fileToDataUrl } from '@/lib/colors';

interface Props {
  state: AppState;
  setState: (updater: (s: AppState) => AppState) => void;
}

type Part = 1 | 2 | 3;

export function VisualTerritory({ state, setState }: Props) {
  const [part, setPart] = useState<Part>(1);

  const setTerritory = (patch: Partial<TerritoryState>) =>
    setState((s) => ({ ...s, territory: { ...s.territory, ...patch } }));

  const setColors = (patch: Partial<ColorsState>) =>
    setState((s) => ({ ...s, colors: { ...s.colors, ...patch } }));

  const goNext = () => {
    if (part < 3) setPart(((part + 1) as Part));
    else setState((s) => ({ ...s, currentScreen: 'loading' }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (part > 1) setPart(((part - 1) as Part));
    else setState((s) => ({ ...s, currentScreen: 'gallery' }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="max-w-screen mx-auto">
      <div className="flex items-center justify-between mb-6">
        <p className="label-eyebrow">Your Style &middot; Visual territory</p>
        <p className="muted text-[11px] tracking-[0.14em] uppercase">Part {part} of 3</p>
      </div>

      <div className="rule-h mb-8" />

      {part === 1 && (
        <EnergyWords state={state} setTerritory={setTerritory} onNext={goNext} onBack={goBack} />
      )}
      {part === 2 && (
        <ColorDirection
          state={state}
          setColors={setColors}
          setTerritory={setTerritory}
          onNext={goNext}
          onBack={goBack}
        />
      )}
      {part === 3 && (
        <VisualDirectionPart
          state={state}
          setTerritory={setTerritory}
          onSubmit={() => setState((s) => ({ ...s, currentScreen: 'loading' }))}
          onSkip={() => setState((s) => ({ ...s, currentScreen: 'loading' }))}
          onBack={goBack}
        />
      )}
    </section>
  );
}

// ---------- Part 1: Energy words ------------------------------------------

function EnergyWords({
  state,
  setTerritory,
  onNext,
  onBack,
}: {
  state: AppState;
  setTerritory: (patch: Partial<TerritoryState>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const selected = state.territory.energyWords;

  const toggle = (word: string) => {
    const exists = selected.includes(word);
    if (exists) {
      setTerritory({ energyWords: selected.filter((w) => w !== word) });
      return;
    }
    if (selected.length >= 3) return; // hard cap
    setTerritory({ energyWords: [...selected, word] });
  };

  return (
    <>
      <h1 className="h-section mb-3">How should this feel?</h1>
      <p className="lede mb-2">Pick up to three words. Go with instinct.</p>
      <p className="muted text-sm mb-8">{selected.length} of 3 selected</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-10">
        {ENERGY_WORDS.map((word) => {
          const isSelected = selected.includes(word);
          const isLocked = !isSelected && selected.length >= 3;
          return (
            <button
              key={word}
              type="button"
              onClick={() => toggle(word)}
              disabled={isLocked}
              className={
                'chip justify-center ' +
                (isSelected ? 'chip-selected ' : '') +
                (isLocked ? 'chip-disabled' : '')
              }
            >
              {word}
            </button>
          );
        })}
      </div>

      <Footer
        onBack={onBack}
        primary={{ label: 'Continue →', onClick: onNext, disabled: selected.length === 0 }}
        skipLabel="Skip this step →"
        onSkip={onNext}
      />
    </>
  );
}

// ---------- Part 2: Color direction ---------------------------------------

const BRAND_ARRANGEMENTS: Array<{
  value: 'A' | 'B' | 'C';
  label: string;
  blurb: string;
  ratios: [number, number]; // primary fraction, accent fraction
  swap: boolean; // C inverts roles
}> = [
  { value: 'A', label: 'Primary leads', blurb: 'Your main color owns most of the space. Accent used once, for the single most important element.', ratios: [0.7, 0.3], swap: false },
  { value: 'B', label: 'Balanced',      blurb: 'Colors share the space. Neither dominates. The layout feels complete and even.', ratios: [0.5, 0.5], swap: false },
  { value: 'C', label: 'Inverted',      blurb: 'The relationship flips. What was accent becomes the ground. Creates surprise.', ratios: [0.3, 0.7], swap: true },
];

const TEMPERATURE_CARDS: Array<{
  value: 'A' | 'B' | 'C';
  temp: 'warm' | 'neutral' | 'cool';
  label: string;
  blurb: string;
  hexes: [string, string];
}> = [
  { value: 'A', temp: 'warm',    label: 'Warm',    blurb: 'Earthy tones — terracotta, amber, cream. Nothing clinical. Nothing cool.',     hexes: ['#8B4A2B', '#F4EFE6'] },
  { value: 'B', temp: 'neutral', label: 'Neutral', blurb: 'Black, white, one restrained accent. Maximum contrast is the aesthetic.',     hexes: ['#1A1918', '#FAFAF6'] },
  { value: 'C', temp: 'cool',    label: 'Cool',    blurb: 'Deep slate, forest, steel. Considered and precise.',                            hexes: ['#1C3829', '#8B95A8'] },
];

function ColorDirection({
  state,
  setColors,
  setTerritory,
  onNext,
  onBack,
}: {
  state: AppState;
  setColors: (patch: Partial<ColorsState>) => void;
  setTerritory: (patch: Partial<TerritoryState>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const hasBrand = state.colors.provided && state.colors.hex.length > 0;
  const selectedDirection = state.territory.colorDirection;

  const primary = state.colors.hex[0] || '#1A1A18';
  const accent = state.colors.hex[1] || state.colors.hex[0] || '#B87333';

  const setBrand = (dir: 'A' | 'B' | 'C') => setTerritory({ colorDirection: dir });
  const setTemp = (dir: 'A' | 'B' | 'C', temp: 'warm' | 'neutral' | 'cool') => {
    setColors({ temperature: temp });
    setTerritory({ colorDirection: dir });
  };

  return (
    <>
      <h1 className="h-section mb-3">
        {hasBrand
          ? 'How should your colors be arranged?'
          : 'What temperature should this run at?'}
      </h1>
      <p className="lede mb-8">
        {hasBrand
          ? 'Pick the relationship that feels right.'
          : 'Pick the one that fits the feeling you want.'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {hasBrand
          ? BRAND_ARRANGEMENTS.map((opt) => {
              const isSel = selectedDirection === opt.value;
              const ground = opt.swap ? accent : primary;
              const mark = opt.swap ? primary : accent;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setBrand(opt.value)}
                  aria-pressed={isSel}
                  className={'tile w-full ' + (isSel ? 'tile-selected' : '')}
                >
                  <div
                    className="w-full"
                    style={{
                      aspectRatio: '4 / 5',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div style={{ background: ground, flex: opt.ratios[opt.swap ? 1 : 0] }} />
                    <div style={{ background: mark, flex: opt.ratios[opt.swap ? 0 : 1] }} />
                  </div>
                  <div
                    className="px-4 py-3"
                    style={{ borderTop: '0.5px solid rgba(242,237,228,0.12)' }}
                  >
                    <p className="text-[13px] font-semibold mb-1">{opt.label}</p>
                    <p className="muted text-[12px] leading-[1.5]">{opt.blurb}</p>
                  </div>
                </button>
              );
            })
          : TEMPERATURE_CARDS.map((opt) => {
              const isSel = selectedDirection === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setTemp(opt.value, opt.temp)}
                  aria-pressed={isSel}
                  className={'tile w-full ' + (isSel ? 'tile-selected' : '')}
                >
                  <div className="w-full" style={{ aspectRatio: '4 / 5', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ background: opt.hexes[0], flex: 1 }} />
                    <div style={{ background: opt.hexes[1], flex: 1 }} />
                  </div>
                  <div
                    className="px-4 py-3"
                    style={{ borderTop: '0.5px solid rgba(242,237,228,0.12)' }}
                  >
                    <p className="text-[13px] font-semibold mb-1">{opt.label}</p>
                    <p className="muted text-[12px] leading-[1.5]">{opt.blurb}</p>
                  </div>
                </button>
              );
            })}
      </div>

      <Footer
        onBack={onBack}
        primary={{ label: 'Continue →', onClick: onNext, disabled: !selectedDirection }}
        skipLabel="Skip this step →"
        onSkip={onNext}
      />
    </>
  );
}

// ---------- Part 3: Visual direction --------------------------------------

function VisualDirectionPart({
  state,
  setTerritory,
  onSubmit,
  onSkip,
  onBack,
}: {
  state: AppState;
  setTerritory: (patch: Partial<TerritoryState>) => void;
  onSubmit: () => void;
  onSkip: () => void;
  onBack: () => void;
}) {
  const dir = state.territory.visualDirection;
  const ill = state.territory.illustrationStyle;
  const [autoSelected, setAutoSelected] = useState(false);
  const photoRef = useRef<HTMLInputElement | null>(null);

  const onChoose = (value: VisualDirection) => {
    setTerritory({ visualDirection: value, ...(value !== 'C' ? { illustrationStyle: null } : {}) });
    setAutoSelected(false);
  };

  const onChooseForMe = () => {
    const auto = chooseVisualDirection(state);
    setTerritory({
      visualDirection: auto.visualDirection,
      illustrationStyle: auto.illustrationStyle,
    });
    setAutoSelected(true);
  };

  const onPhotoUpload = async (files: FileList) => {
    const arr: string[] = [];
    for (const file of Array.from(files).slice(0, 3 - state.territory.userPhotos.length)) {
      if (file.size > 6 * 1024 * 1024) continue;
      arr.push(await fileToDataUrl(file));
    }
    setTerritory({ userPhotos: [...state.territory.userPhotos, ...arr].slice(0, 3) });
  };

  return (
    <>
      <h1 className="h-section mb-3">What&rsquo;s going in this design visually?</h1>
      <p className="lede mb-10">Pick one. You can change it.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {VISUAL_DIRECTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChoose(opt.value)}
            aria-pressed={dir === opt.value}
            className={'tile p-5 text-left rounded-input ' + (dir === opt.value ? 'tile-selected' : '')}
            style={{ borderRadius: 8 }}
          >
            <div className="flex items-baseline gap-3">
              <span className="text-[11px] tracking-[0.18em] uppercase muted">{opt.letter}</span>
              <span className="text-[16px] font-semibold">{opt.title}</span>
            </div>
            <p className="muted text-sm mt-2">{opt.body}</p>
          </button>
        ))}
      </div>

      <div className="mb-10">
        <button type="button" className="btn-text text-sm" onClick={onChooseForMe}>
          Not sure — choose for me →
        </button>
        {autoSelected && dir && (
          <p className="muted text-xs mt-2">
            We picked option {dir} based on your pair choices and energy words. Change it if it&rsquo;s wrong.
          </p>
        )}
      </div>

      {dir === 'C' && (
        <div className="mb-10">
          <p className="label-section">What should the illustration feel like?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ILLUSTRATION_STYLES.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setTerritory({ illustrationStyle: opt.value as IllustrationStyle })}
                aria-pressed={ill === opt.value}
                className={'tile p-5 text-left ' + (ill === opt.value ? 'tile-selected' : '')}
                style={{ borderRadius: 8 }}
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-[11px] tracking-[0.18em] uppercase muted">{opt.letter}</span>
                  <span className="text-[16px] font-semibold">{opt.title}</span>
                </div>
                <p className="muted text-sm mt-2">{opt.body}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {dir === 'B' && (
        <div className="mb-10">
          <p className="label-section">Upload your photos</p>
          <p className="muted text-sm mb-3">Up to 3. Photos will be integrated into the layout — not just dropped in.</p>
          <div className="flex flex-wrap gap-3 items-center">
            {state.territory.userPhotos.map((src, i) => (
              <div key={i} className="relative">
                <img
                  src={src}
                  alt=""
                  className="h-20 w-20 object-cover rounded-input"
                  style={{ border: '0.5px solid rgba(242,237,228,0.18)' }}
                />
                <button
                  type="button"
                  aria-label="Remove photo"
                  onClick={() =>
                    setTerritory({
                      userPhotos: state.territory.userPhotos.filter((_, idx) => idx !== i),
                    })
                  }
                  className="absolute -top-2 -right-2 rounded-full px-2 text-xs"
                  style={{
                    background: 'rgb(var(--bg))',
                    color: 'rgb(var(--ink))',
                    border: '0.5px solid rgba(242,237,228,0.32)',
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            {state.territory.userPhotos.length < 3 && (
              <>
                <input
                  ref={photoRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) onPhotoUpload(e.target.files);
                    e.target.value = '';
                  }}
                />
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => photoRef.current?.click()}
                >
                  Add photo
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <Footer
        onBack={onBack}
        primary={{ label: 'Build my Signature →', onClick: onSubmit, disabled: !dir }}
        skipLabel="Skip this step →"
        onSkip={onSkip}
      />
    </>
  );
}

// ---------- footer (back / continue / skip) -------------------------------

function Footer({
  onBack,
  primary,
  skipLabel,
  onSkip,
}: {
  onBack: () => void;
  primary: { label: string; onClick: () => void; disabled?: boolean };
  skipLabel: string;
  onSkip: () => void;
}) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      <button type="button" className="btn btn-ghost" onClick={onBack}>
        ← Back
      </button>
      <div className="flex items-center gap-3">
        <button type="button" className="btn-text text-sm" onClick={onSkip}>
          {skipLabel}
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={primary.onClick}
          disabled={primary.disabled}
        >
          {primary.label}
        </button>
      </div>
    </div>
  );
}
