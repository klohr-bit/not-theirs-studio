// Client-side helpers for hex parsing, hex validation, and dominant-color
// extraction from an uploaded image (no third-party dependency).

export function isValidHex(s: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(s.trim());
}

export function normalizeHex(s: string): string {
  let h = s.trim().toUpperCase();
  if (!h.startsWith('#')) h = '#' + h;
  if (h.length === 4) {
    // expand #RGB to #RRGGBB
    h = '#' + h.slice(1).split('').map((c) => c + c).join('');
  }
  return h;
}

export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(new Error('file read failed'));
    r.readAsDataURL(file);
  });
}

interface Bucket {
  r: number;
  g: number;
  b: number;
  n: number;
}

function hexFromRgb(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
}

function rgbDistance(a: string, b: string): number {
  const pa = parseHex(a);
  const pb = parseHex(b);
  if (!pa || !pb) return Number.POSITIVE_INFINITY;
  return Math.abs(pa.r - pb.r) + Math.abs(pa.g - pb.g) + Math.abs(pa.b - pb.b);
}

function parseHex(hex: string): { r: number; g: number; b: number } | null {
  if (!isValidHex(hex)) return null;
  const h = normalizeHex(hex);
  return {
    r: parseInt(h.slice(1, 3), 16),
    g: parseInt(h.slice(3, 5), 16),
    b: parseInt(h.slice(5, 7), 16),
  };
}

export async function extractColorsFromImage(
  source: File | string,
  count = 4
): Promise<string[]> {
  const url = typeof source === 'string' ? source : URL.createObjectURL(source);
  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('image load failed'));
    });

    const W = 140;
    const H = Math.max(40, Math.floor((140 * img.height) / Math.max(1, img.width)));
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('canvas context unavailable');
    ctx.drawImage(img, 0, 0, W, H);
    const { data } = ctx.getImageData(0, 0, W, H);

    const buckets = new Map<string, Bucket>();
    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha < 200) continue;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const lum = (r + g + b) / 3;
      // skip near-pure-white and near-pure-black so background doesn't dominate
      if (lum < 18 || lum > 245) continue;
      const key = `${r >> 4},${g >> 4},${b >> 4}`;
      const entry = buckets.get(key);
      if (entry) {
        entry.r += r;
        entry.g += g;
        entry.b += b;
        entry.n++;
      } else {
        buckets.set(key, { r, g, b, n: 1 });
      }
    }

    const sorted = [...buckets.values()].sort((a, b) => b.n - a.n);
    const out: string[] = [];
    for (const e of sorted) {
      const hex = hexFromRgb(e.r / e.n, e.g / e.n, e.b / e.n);
      if (out.some((prev) => rgbDistance(prev, hex) < 72)) continue;
      out.push(hex);
      if (out.length >= count) break;
    }
    return out;
  } finally {
    if (typeof source !== 'string') URL.revokeObjectURL(url);
  }
}
