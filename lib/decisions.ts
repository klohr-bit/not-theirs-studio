/**
 * Decision registry: pair-choice -> pre-written instruction string.
 *
 * These instructions are the SOURCE OF TRUTH. The API doesn't interpret
 * choices — it receives these strings already assembled and only writes
 * the natural-language wrapper around them.
 */

export const DECISION_MAP = {
  pairs: {
    1: {
      A: 'Type scale and weight create all hierarchy. Color is used only as ground — it does not organize, separate, or signal. Every typographic decision must stand without color support.',
      B: 'Color fields and spatial blocking are the primary organizational system. Color zones define sections before type does. Every color must have a structural job: ground, zone, or signal. Color used purely as decoration is removed.',
    },
    2: {
      A: 'This design speaks at intimate distance — one person, close range, conversational. Type sizes, spacing, and tone are calibrated for close reading not distance viewing. Nothing shouts.',
      B: 'This design declares to a room. Every element must read from distance before it earns detail at close range. The largest type commands space before the smallest type is legible. Bold, direct, impossible to miss.',
    },
    3: {
      A: 'Include only essential information. Every element must justify its presence. If an element does not change what the viewer does or understands, remove it. Negative space is an active design element.',
      B: 'Include complete information. Nothing is withheld for aesthetic lightness. Rich, thorough, generous. Organize density through strict grid logic so nothing feels overwhelming.',
    },
    4: {
      A: 'Communication clarity is the design. Hierarchy is readable in under two seconds. Maximum contrast. Nothing atmospheric, nothing decorative, nothing that slows comprehension.',
      B: 'Emotional register arrives before factual content. The feeling of the piece is the first communication. Information is present and complete but accessed after the atmosphere is established.',
    },
    5: {
      A: 'Every element is positioned on a strict grid. Spacing increments are consistent and locked. Nothing is eyeballed. Alignment is exact. The system is visible in the result.',
      B: 'Elements are placed by deliberate intuition — where they feel right compositionally, not where a grid dictates. The placement should feel alive and considered, not arbitrary.',
    },
    6: {
      A: 'One element dominates the entire composition. Everything else is subordinate. The scale difference must feel almost uncomfortably extreme — if it does not feel dramatic, it is not dramatic enough.',
      B: 'All elements exist in harmonic proportion. Nothing overwhelms. Size relationships feel inevitable and resolved. The design is complete — nothing fights and nothing disappears.',
    },
    7: {
      A: 'Digital precision throughout. Flat color, exact edges, pixel-perfect alignment. No texture, no grain, no material reference. Honest to its medium. Do not simulate physical processes through filters or overlays.',
      B: 'Physical production logic governs all decisions. Ink weight, press constraints, paper stock awareness. Warmth through proportion and material reference — not through texture filters or grain overlays. The physical quality lives in stroke weight, ground color temperature, and spacing breath.',
    },
  },
} as const;

export const BASELINE_RULES: string[] = [
  'Do not place decorative sun or sunshine elements anywhere.',
  'Do not use drop shadows to simulate depth or lift.',
  'Do not use gradient backgrounds.',
  'Do not default to blue when no color direction is established.',
  'Do not add a colored bottom banner strip to restate the headline.',
  'Exclamation points are earned not defaulted. One maximum.',
  'Do not use stars as decorative or organizational elements.',
  'Do not generate photorealistic human figures unless real photography provided.',
  'Do not use centered composition as a default. Commit to an axis.',
  'Do not simulate physical processes through texture filters or grain overlays.',
];

export const ANCHOR_INSTRUCTIONS: Record<string, string> = {
  event_name:
    'The event name stops the eye. It receives the dominant scale treatment.',
  date:
    'The date stops the eye. It receives the dominant scale treatment.',
  organization:
    'The organization name stops the eye. It leads.',
  feeling:
    'The feeling of the piece stops the eye. Atmosphere receives more space than any single piece of information.',
};

export const VISUAL_DIRECTION_INSTRUCTIONS: Record<string, string> = {
  A: 'Type only — no imagery of any kind.',
  B: 'User photography — do not generate imagery. Integrate provided photos into the layout, not dropped in.',
  C: 'Illustration as the visual.',
  D: 'A single graphic element — abstract, structural, not representational.',
  E: 'Mixed media — combine type, photo, and graphic element with intent.',
};

export function getIllustrationLabel(style: string | null): string {
  const map: Record<string, string> = {
    A: 'bold and graphic — high contrast, screenprint energy',
    B: 'fine and detailed — line drawing, hand-rendered quality',
    C: 'loose and gestural — brush marks, expressive',
    D: 'flat and geometric — clean shapes, no texture',
  };
  return style ? map[style] || 'fine and detailed' : 'fine and detailed';
}
