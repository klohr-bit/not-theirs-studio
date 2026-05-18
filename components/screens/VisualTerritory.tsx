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
import { ColorTile } from '@/components/specimens/ColorTile';
import { fileToDataUrl, isValidHex, normalizeHex } from '@/lib/colors';

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
  const [showColorEditor, setShowColorEditor] = useState(false);
  const selectedDirection = state.territory.colorDirection;

  const setSelection = (dir: 'A' | 'B' | 'C') => {
    if (hasBrand) {
      setTerritory({ colorDirection: dir });
    } else {
      const temp = dir === 'A' ? 'warm' : dir === 'B' ? 'neutral' : 'cool';
      setColors({ temperature: temp });
      setTerritory({ colorDirection: dir });
    }
  };

  return (
    <>
      <h1 className="h-section mb-3">
        {hasBrand
          ? 'Here&rsquo;s your content in three color arrangements.'
          : 'What temperature should this run at?'}
      </h1>
      <p className="lede mb-8">
        {hasBrand
          ? 'Pick the one that feels most like you.'
          : 'Pick the one that fits the feeling you want.'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <ColorTile
          arrangement="A"
          hexes={hasBrand ? state.colors.hex : []}
          content={state.content}
          temperature={hasBrand ? null : 'warm'}
          selected={selectedDirection === 'A'}
          onSelect={() => setSelection('A')}
        />
        <ColorTile
          arrangement="B"
          hexes={hasBrand ? state.colors.hex : []}
          content={state.content}
          temperature={hasBrand ? null : 'neutral'}
          selected={selectedDirection === 'B'}
          onSelect={() => setSelection('B')}
        />
        <ColorTile
          arrangement="C"
          hexes={hasBrand ? state.colors.hex : []}
          content={state.content}
          temperature={hasBrand ? null : 'cool'}
          selected={selectedDirection === 'C'}
          onSelect={() => setSelection('C')}
        />
      </div>

      <details
        open={showColorEditor}
        onToggle={(e) => setShowColorEditor((e.target as HTMLDetailsElement).open)}
        className="mb-10"
      >
        <summary className="cursor-pointer btn-text text-sm inline-flex items-center gap-1">
          {hasBrand ? 'Want to adjust the colors?' : 'Want to provide specific colors?'} ▸
        </summary>
        <div className="card mt-3">
          <BrandColorEditor state={state} setColors={setColors} />
        </div>
      </details>

      <Footer
        onBack={onBack}
        primary={{ label: 'Continue →', onClick: onNext, disabled: !selectedDirection }}
        skipLabel="Skip this step →"
        onSkip={onNext}
      />
    </>
  );
}

function BrandColorEditor({
  state,
  setColors,
}: {
  state: AppState;
  setColors: (patch: Partial<ColorsState>) => void;
}) {
  const [rows, setRows] = useState<string[]>(
    state.colors.hex.length > 0 ? state.colors.hex : ['']
  );

  const commit = (next: string[]) => {
    setRows(next);
    const cleaned = next.map((h) => h.trim()).filter(isValidHex).map(normalizeHex);
    setColors({ provided: cleaned.length > 0, hex: cleaned });
  };

  return (
    <div className="space-y-3">
      {rows.map((hex, i) => (
        <div key={i} className="flex items-center gap-3">
          <input
            type="color"
            value={isValidHex(hex) ? normalizeHex(hex) : '#666666'}
            onChange={(e) =>
              commit(rows.map((v, idx) => (idx === i ? e.target.value.toUpperCase() : v)))
            }
            className="h-11 w-11 rounded-input border-0 cursor-pointer bg-transparent"
            style={{ padding: 0 }}
            aria-label={`Color ${i + 1} swatch`}
          />
          <input
            type="text"
            placeholder="#RRGGBB"
            value={hex}
            onChange={(e) => commit(rows.map((v, idx) => (idx === i ? e.target.value.toUpperCase() : v)))}
            className="field font-mono text-sm"
          />
          {rows.length > 1 && (
            <button
              type="button"
              className="btn-text text-xs"
              onClick={() => commit(rows.filter((_, idx) => idx !== i))}
            >
              Remove
            </button>
          )}
        </div>
      ))}
      {rows.length < 4 && (
        <button type="button" className="btn-text text-xs" onClick={() => commit([...rows, ''])}>
          + Add color
        </button>
      )}
    </div>
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
