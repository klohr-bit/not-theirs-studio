'use client';

import type { AppState } from '@/types';
import { SPECIMEN_GALLERY } from '@/lib/specimens';

interface Props {
  state: AppState;
  setState: (updater: (s: AppState) => AppState) => void;
}

export function StyleGallery({ state, setState }: Props) {
  const selectedIds = state.specimenSelections.map((s) => s.id);
  const has04 = selectedIds.includes(4);

  const toggle = (id: number) => {
    setState((s) => {
      const current = s.specimenSelections;
      const exists = current.some((x) => x.id === id);
      if (exists) {
        // clicking a selected tile always deselects
        return { ...s, specimenSelections: current.filter((x) => x.id !== id) };
      }
      // not selected — only add if we have room. No ring buffer, no toast.
      if (current.length >= 3) return s;
      const item = SPECIMEN_GALLERY.find((x) => x.id === id);
      if (!item) return s;
      return {
        ...s,
        specimenSelections: [...current, { id: item.id, label: item.label, signal: item.signal }],
      };
    });
  };

  const atCap = selectedIds.length >= 3;

  const goNext = () => setState((s) => ({ ...s, currentScreen: 'territory' }));
  const skip = () => setState((s) => ({ ...s, specimenSelections: [], currentScreen: 'territory' }));

  return (
    <section className="max-w-wide mx-auto">
      <p className="label-eyebrow mb-6">Your Style</p>
      <h1 className="h-section mb-3">What structures are you drawn to?</h1>
      <p className="lede mb-2">Pick up to three. You don&rsquo;t need to explain why.</p>
      <p className="muted text-sm mb-10 max-w-[60ch]">
        These are real designs &mdash; you&rsquo;re reacting to how they&rsquo;re organized, not what they&rsquo;re about.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {SPECIMEN_GALLERY.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          const isLocked = !isSelected && atCap;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              aria-pressed={isSelected}
              aria-disabled={isLocked}
              title={isLocked ? 'Deselect one to choose this' : undefined}
              className={
                'tile w-full transition-opacity ' +
                (isSelected ? 'tile-selected ' : '') +
                (isLocked ? 'opacity-40 cursor-not-allowed' : '')
              }
            >
              <div className="relative w-full" style={{ aspectRatio: '1 / 1' }}>
                <img
                  src={item.src}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: 'top' }}
                />
                {isSelected && (
                  <span
                    aria-hidden="true"
                    className="absolute top-3 right-3 flex items-center justify-center rounded-full"
                    style={{
                      width: 28,
                      height: 28,
                      background: 'rgb(var(--accent))',
                      color: 'rgb(var(--bg))',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
                    }}
                  >
                    <svg viewBox="0 0 16 16" width="14" height="14">
                      <path
                        d="M3 8.5 L6.5 12 L13 4.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
                {isLocked && (
                  <div
                    className="absolute inset-0 flex items-end p-3"
                    style={{ pointerEvents: 'none' }}
                  >
                    <span
                      className="text-[10px] tracking-[0.12em] uppercase font-semibold"
                      style={{
                        background: 'rgba(15,15,14,0.85)',
                        color: 'rgb(var(--ink))',
                        padding: '4px 8px',
                        borderRadius: 4,
                      }}
                    >
                      Deselect one to choose this
                    </span>
                  </div>
                )}
              </div>
              <div
                className="px-4 py-3"
                style={{ borderTop: '0.5px solid rgba(242,237,228,0.12)' }}
              >
                <span className="text-[11px] muted">{item.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {has04 && (
        <div className="card mb-8" style={{ maxWidth: '70ch' }}>
          <p className="body-text text-sm">
            One of your selections uses several common AI design defaults &mdash; color
            bottom banner, icon trio, bullet lists, stock photography. We&rsquo;ll use
            your selection to understand what appeals to you in that structure,
            then achieve it without the defaults.
          </p>
        </div>
      )}

      <div className="flex flex-col items-start gap-3">
        <button
          type="button"
          className="btn btn-primary"
          disabled={selectedIds.length === 0}
          onClick={goNext}
        >
          Use these to sharpen my Signature →
        </button>
        <button type="button" className="btn-text text-sm" onClick={skip}>
          Skip this step →
        </button>
      </div>
    </section>
  );
}
