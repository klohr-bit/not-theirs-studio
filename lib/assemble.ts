import type { AppState, Contradiction, ContentState } from '@/types';
import {
  DECISION_MAP,
  BASELINE_RULES,
  ANCHOR_INSTRUCTIONS,
  VISUAL_DIRECTION_INSTRUCTIONS,
  getIllustrationLabel,
} from '@/lib/decisions';

export function buildSystemPrompt(): string {
  return `You are a design strategist for the Kimberly Lohr Signature Method.
You receive a complete set of design decisions that have already been translated
into specific instructions. Your job is to write those instructions into a
personal, owned Signature Prompt that feels specific to this person — not
like a template, not like a style guide, like a voice.

Return ONLY raw valid JSON with no markdown, no code fences:
{
  "voice": "2-3 sentences in warm plain language describing their design voice. Specific to their choices. Sound like a person wrote it.",
  "tokens": ["exactly 5 short plain-language design DNA phrases, specific not generic"],
  "signature_prompt": "The complete Signature Prompt — all sections formatted exactly as specified in the user message."
}`;
}

export function buildPairInstructions(state: AppState): string[] {
  const out: string[] = [];
  for (const id of [1, 2, 3, 4, 5, 6, 7] as const) {
    const choice = state.pairs[id];
    if (choice === 'A' || choice === 'B') {
      out.push(DECISION_MAP.pairs[id][choice]);
    }
  }
  return out;
}

/**
 * Derived physical-quality instruction. Only present when the user chose
 * physically-rooted (pair 7 = B). The user never sees this question — it
 * comes from their material/screen choice in the seven pairs.
 */
export function getPhysicalQualityInstruction(pairs: AppState['pairs']): string | null {
  if (pairs[7] !== 'B') return null;
  return 'Physical quality lives simultaneously in: (1) Stroke weight — type is heavy because it was drawn heavy, not because a filter was applied. Letterforms are clean. (2) Ground warmth — the background is the paper. Warm, slightly tonal, temperature of uncoated stock. No texture added. The warmth is the color itself. (3) Spacing breath — the gaps between elements have the breath of hand-set type. The silence is as considered as the marks.';
}

/**
 * Derived typographic-character instruction. Only present when pair 7 = B
 * (physically-rooted). Refines the typographic register based on the
 * illustration sub-style.
 */
export function getTypographicCharacterInstruction(
  pairs: AppState['pairs'],
  illustrationStyle: string | null
): string | null {
  if (pairs[7] !== 'B') return null;
  if (illustrationStyle === 'B' || illustrationStyle === 'C') {
    return 'Type feels drawn — letterforms feel made by a tool moving through space. Weight reflects the hand. No texture applied. The drawn quality is in the form of the letters themselves.';
  }
  return 'Type is a neutral carrier — clean, even, without material presence. The visual character comes from composition, color, and space.';
}

export function findHumanMoment(content: ContentState): string | null {
  if (content.closingStatement && content.closingStatement.trim().length > 0) {
    return content.closingStatement.trim();
  }
  if (content.other && content.other.trim().length > 0) {
    return content.other.trim();
  }
  const personal = content.activities.find((a) => {
    const l = a.toLowerCase();
    return l.includes('free') || l.includes('welcome') || a.length < 30;
  });
  return personal ?? null;
}

export function buildUserPrompt(
  state: AppState,
  instructions: string[],
  contradictions: Contradiction[]
): string {
  const lines: string[] = [];

  lines.push(`Name: ${state.name}`);
  lines.push(
    `Making: ${state.content.eventName || '(unspecified)'} — ${state.purpose || '(unspecified)'}`
  );
  if (state.format) lines.push(`Format: ${state.format}`);
  lines.push('');

  // ----- decision instructions -----
  lines.push('== DECISION INSTRUCTIONS ==');
  lines.push('Each instruction below comes directly from a choice this person made.');
  lines.push('Use them exactly — do not interpret or soften them.');
  lines.push('');
  const fullInstructions = [...instructions];
  const physical = getPhysicalQualityInstruction(state.pairs);
  if (physical) fullInstructions.push(physical);
  const typographic = getTypographicCharacterInstruction(
    state.pairs,
    state.territory.illustrationStyle
  );
  if (typographic) fullInstructions.push(typographic);
  fullInstructions.forEach((inst, i) => lines.push(`${i + 1}. ${inst}`));
  lines.push('');

  // ----- visual energy -----
  if (state.territory.energyWords.length > 0) {
    lines.push(`Visual energy: ${state.territory.energyWords.join(', ')}`);
  }
  if (state.colors.provided && state.colors.hex.length > 0) {
    lines.push(
      `Brand colors: ${state.colors.hex.join(', ')} — these are the only colors`
    );
  } else if (state.colors.temperature) {
    lines.push(`Color temperature: ${state.colors.temperature}`);
  }

  // ----- visual direction -----
  if (state.territory.visualDirection) {
    let dirLine =
      VISUAL_DIRECTION_INSTRUCTIONS[state.territory.visualDirection] || '';
    if (state.territory.visualDirection === 'C') {
      dirLine = `Illustration — style: ${getIllustrationLabel(state.territory.illustrationStyle)}.`;
    }
    lines.push(`Visual direction: ${dirLine}`);
  }
  if (state.territory.userPhotos.length > 0) {
    lines.push(
      `User has provided ${state.territory.userPhotos.length} photo${state.territory.userPhotos.length > 1 ? 's' : ''} for integration.`
    );
  }

  // ----- visual anchor -----
  if (state.content.visualAnchor) {
    const inst = ANCHOR_INSTRUCTIONS[state.content.visualAnchor];
    if (inst) lines.push(`Visual anchor: ${inst}`);
  }

  // ----- human moment -----
  const humanMoment = findHumanMoment(state.content);
  if (humanMoment) {
    lines.push(
      `Human moment: "${humanMoment}" — this is the most specific and personal line in the content. It is not a footnote. It is positioned with more intentional space around it than anything else.`
    );
  }
  lines.push('');

  // ----- contradictions (context only — UI resolves them after generation) -----
  if (contradictions.length > 0) {
    lines.push('== DETECTED TENSIONS (CONTEXT ONLY — DO NOT WRITE INTO SIGNATURE) ==');
    lines.push(
      'These tensions were detected between stated choices and visual preferences.'
    );
    lines.push(
      'Do not include a REVEALED TENSIONS section in the signature_prompt. The user will resolve these in the UI after generation and the chosen resolutions will be appended to the DO section then.'
    );
    lines.push('');
    contradictions.forEach((c) => {
      lines.push(`Tension: ${c.tension}`);
      lines.push(`Option A: ${c.optionA}`);
      lines.push(`Option B: ${c.optionB}`);
      lines.push('');
    });
  }

  // ----- specimen signals -----
  if (state.specimenSelections.length > 0) {
    lines.push('== VISUAL STRUCTURES THEY RESPOND TO ==');
    state.specimenSelections.forEach((s) => {
      lines.push(`— ${s.label} (${s.signal})`);
    });
    lines.push('');
  }

  // ----- content brief (as input to the model) -----
  lines.push('== CONTENT BRIEF ==');
  lines.push('Every item below must appear. Nothing omitted. Nothing added.');
  const c = state.content;
  if (c.eventName) lines.push(`Event: ${c.eventName}`);
  if (c.hostedBy) lines.push(`Hosted by: ${c.hostedBy}`);
  if (c.date) lines.push(`Date: ${c.date}`);
  if (c.time) lines.push(`Time: ${c.time}`);
  if (c.locationName) lines.push(`Location: ${c.locationName}`);
  if (c.address) lines.push(`Address: ${c.address}`);
  if (c.activities.length > 0) {
    lines.push('Activities:');
    c.activities.forEach((a) => lines.push(`  ${a}`));
  }
  if (c.audience) lines.push(`Audience: ${c.audience}`);
  if (c.contact) lines.push(`Contact: ${c.contact}`);
  if (c.partners.length > 0) lines.push(`Partners: ${c.partners.join(', ')}`);
  if (c.other) lines.push(`Also include: ${c.other}`);
  lines.push('');

  // ----- signature format (FINAL structure — no REVEALED TENSIONS, no QUALITY STANDARD) -----
  lines.push('== SIGNATURE FORMAT ==');
  lines.push('Write the signature_prompt field using exactly this structure, in this order, with no other sections:');
  lines.push('');
  lines.push('== YOUR DESIGN SIGNATURE ==');
  lines.push('');
  lines.push('CONTEXT:');
  lines.push(
    '[What this is for. Format. Content verification instruction. 2-4 sentences.]'
  );
  lines.push('');
  lines.push('DO NOT:');
  lines.push(
    '[9-12 specific prohibitions. Each on its own line starting with —. Draw from the decision instructions above and the baseline rules below.]'
  );
  lines.push('');
  lines.push('DO:');
  lines.push(
    '[9-12 specific requirements. Each on its own line starting with —. Draw from the decision instructions above.]'
  );
  lines.push('');
  lines.push('VISUAL TERRITORY:');
  lines.push(
    '[Energy words translated to design behavior. Color direction with hex codes if provided, or temperature description if not. Surface quality. Illustration or visual direction specifics. Plain language paragraph form, not bullets.]'
  );
  lines.push('');
  lines.push('EXPERT PASS:');
  lines.push(
    "[Exactly five numbered questions the AI asks itself after completing the design, before delivering it. Questions must be specific to this person's choices — not generic. Question 5 names the human moment by name (quote it directly).]"
  );
  lines.push('');
  lines.push('Build every design decision from these rules.');
  lines.push('No defaults. No assumptions. No compromises.');
  lines.push('');
  lines.push('== CONTENT BRIEF ==');
  lines.push('[Every content item listed clearly, one per line.]');
  lines.push('');
  lines.push('Now design the flyer.');
  lines.push('');
  lines.push('Do not include a REVEALED TENSIONS section. Do not include a QUALITY STANDARD section. Do not invent additional sections. Do not output any markdown fences.');
  lines.push('');

  // ----- baseline rules (informational, the model folds these into DO NOT) -----
  lines.push('== BASELINE RULES ==');
  lines.push('These apply to every Signature regardless of choices and should appear in DO NOT:');
  BASELINE_RULES.forEach((r) => lines.push(`— ${r}`));

  return lines.join('\n');
}
