import type { Screen } from '@/types';

const PHASES: Array<{ key: string; label: string; screens: Screen[] }> = [
  { key: 'content',   label: 'Content',       screens: ['welcome', 'content'] },
  { key: 'voice',     label: 'Your Voice',    screens: ['pairs'] },
  { key: 'style',     label: 'Your Style',    screens: ['gallery', 'territory'] },
  { key: 'signature', label: 'Your Signature', screens: ['loading', 'card'] },
];

export function JourneyIndicator({ screen }: { screen: Screen }) {
  if (screen === 'return') return null;
  const currentPhaseIndex = PHASES.findIndex((p) => p.screens.includes(screen));
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        {PHASES.map((p, i) => (
          <span
            key={p.key}
            className={
              'journey-dot ' +
              (i < currentPhaseIndex ? 'journey-dot-done ' : '') +
              (i === currentPhaseIndex ? 'journey-dot-current ' : '')
            }
          />
        ))}
      </div>
      <div className="flex items-center gap-2 text-[10px] tracking-[0.16em] uppercase muted">
        {PHASES.map((p, i) => (
          <span key={p.key} className={i === currentPhaseIndex ? 'text-ink' : ''}>
            {p.label}
            {i < PHASES.length - 1 && <span className="ml-2 opacity-40">/</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
