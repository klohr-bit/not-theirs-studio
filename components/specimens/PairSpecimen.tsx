'use client';

interface Props {
  html: string;
  label: 'A' | 'B';
  selected: boolean;
  onSelect: () => void;
}

export function PairSpecimen({ html, label, selected, onSelect }: Props) {
  const srcDoc = `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:#fff;font-family:Inter,system-ui,sans-serif;}</style></head><body>${html}</body></html>`;
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={'tile w-full ' + (selected ? 'tile-selected' : '')}
    >
      <div className="relative w-full" style={{ aspectRatio: '4 / 5', background: '#fff' }}>
        <iframe
          title={`Specimen ${label}`}
          srcDoc={srcDoc}
          sandbox=""
          scrolling="no"
          className="absolute inset-0 w-full h-full border-0 block"
        />
      </div>
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderTop: '0.5px solid rgba(242,237,228,0.12)' }}
      >
        <span className="text-[13px] font-semibold">{label}</span>
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
