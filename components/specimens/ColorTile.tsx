'use client';

import type { ContentState } from '@/types';

interface Props {
  arrangement: 'A' | 'B' | 'C';
  hexes: string[]; // 1-4 hexes
  content: ContentState;
  temperature?: 'warm' | 'neutral' | 'cool' | null;
  selected: boolean;
  onSelect: () => void;
}

// Three deterministic compositions of the user's content using their colors.
// A — primary dominant, accent sparse.
// B — colors balanced across the layout.
// C — relationship inverted: accent becomes ground.
//
// When no brand hex is provided, falls back to a temperature palette.

const TEMP_PALETTES: Record<NonNullable<Props['temperature']>, string[]> = {
  warm:    ['#E6CFB0', '#B87333', '#2A1F14'],
  neutral: ['#F4F2EE', '#1A1A18', '#7A7670'],
  cool:    ['#1F2A33', '#5A7388', '#E5EBF0'],
};

function palette(hexes: string[], temperature: Props['temperature']): string[] {
  if (hexes.length > 0) return hexes;
  if (temperature) return TEMP_PALETTES[temperature];
  return ['#F2EDE4', '#B87333', '#1A1A18'];
}

function pickRoles(p: string[], arrangement: 'A' | 'B' | 'C') {
  const primary = p[0] ?? '#1A1A18';
  const accent  = p[1] ?? p[0] ?? '#B87333';
  const ground  = p[2] ?? '#F4F2EE';
  if (arrangement === 'A') {
    return { bg: ground, headline: primary, accent, body: primary };
  }
  if (arrangement === 'B') {
    return { bg: ground, headline: primary, accent, body: '#3a3a36' };
  }
  // C — invert: accent becomes ground
  return { bg: accent, headline: ground, accent: primary, body: ground };
}

export function ColorTile({ arrangement, hexes, content, temperature, selected, onSelect }: Props) {
  const roles = pickRoles(palette(hexes, temperature), arrangement);
  const event = content.eventName || "Maker's Market";
  const date = content.date || 'Saturday, June 20th';
  const time = content.time || '9am – 3pm';
  const location = content.locationName || content.address || 'Dillsburg Town Square';

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={'tile w-full ' + (selected ? 'tile-selected' : '')}
    >
      <div
        className="relative w-full"
        style={{ aspectRatio: '4 / 5', background: roles.bg }}
      >
        {/* arrangement A: primary dominant — large headline in primary, thin accent rule */}
        {arrangement === 'A' && (
          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, lineHeight: 1.05, color: roles.headline, letterSpacing: '-0.01em' }}>
                {event}
              </div>
              <div style={{ width: 24, height: 2, background: roles.accent, marginTop: 14 }} />
            </div>
            <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: 11, color: roles.body, lineHeight: 1.6 }}>
              {date}<br />{time}<br />{location}
            </div>
          </div>
        )}

        {/* arrangement B: balanced — type and accent in conversation */}
        {arrangement === 'B' && (
          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ fontFamily: 'system-ui', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: roles.accent, marginBottom: 10 }}>
              {date}
            </div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 24, lineHeight: 1.05, color: roles.headline, marginBottom: 12 }}>
              {event}
            </div>
            <div style={{ width: 16, height: 1, background: roles.accent, marginBottom: 12 }} />
            <div style={{ fontFamily: 'system-ui', fontSize: 11, color: roles.body, lineHeight: 1.7 }}>
              {time}<br />{location}
            </div>
          </div>
        )}

        {/* arrangement C: inverted — accent is ground, primary becomes accent */}
        {arrangement === 'C' && (
          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: 'system-ui', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: roles.body, opacity: 0.85 }}>
              {location}
            </div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 26, lineHeight: 1.05, color: roles.headline, fontStyle: 'italic' }}>
              {event}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'system-ui', fontSize: 10, color: roles.body, opacity: 0.9, letterSpacing: '0.06em' }}>
              <span>{date}</span>
              <span>{time}</span>
            </div>
          </div>
        )}
      </div>
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderTop: '0.5px solid rgba(242,237,228,0.12)' }}
      >
        <span className="text-[13px] font-semibold">{arrangement}</span>
        {selected && (
          <span
            className="text-[10px] tracking-[0.16em] uppercase font-semibold"
            style={{ color: 'rgb(var(--accent))' }}
          >
            Selected
          </span>
        )}
      </div>
    </button>
  );
}
