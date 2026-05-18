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
  instructions.forEach((inst, i) => lines.push(`${i + 1}. ${inst}`));
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

  // ----- contradictions -----
  if (contradictions.length > 0) {
    lines.push('== CONTRADICTIONS TO RESOLVE ==');
    lines.push(
      'These tensions were detected between stated choices and visual preferences.'
    );
    lines.push(
      'For each tension, present both resolution options in the REVEALED TENSIONS section.'
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

  // ----- signature format -----
  lines.push('== SIGNATURE FORMAT ==');
  lines.push('Write the signature_prompt field using exactly this structure:');
  lines.push('');
  lines.push('== YOUR DESIGN SIGNATURE ==');
  lines.push('');
  lines.push('CONTEXT:');
  lines.push(
    '[What this is for. Format and where people see it. Content verification instruction.]'
  );
  lines.push('');
  lines.push('DO NOT:');
  lines.push(
    '[9-12 specific prohibitions. Each starts with —. From the decision instructions above plus the baseline rules below.]'
  );
  lines.push('');
  lines.push('DO:');
  lines.push(
    '[9-12 specific requirements. Each starts with —. From the decision instructions above.]'
  );
  lines.push('');
  lines.push('VISUAL TERRITORY:');
  lines.push(
    '[Energy words translated to design behavior. Color direction with hex codes if provided. Surface quality. Illustration or visual direction specifics.]'
  );
  lines.push('');
  if (contradictions.length > 0) {
    lines.push('REVEALED TENSIONS:');
    lines.push(
      '[Each tension with both resolution options. User resolves before designing.]'
    );
    lines.push('');
  }
  lines.push('EXPERT PASS:');
  lines.push(
    "[Five questions the AI asks itself after completing the design, before delivering it. Questions must be specific to this person's choices — not generic. The fifth question names the human moment specifically.]"
  );
  lines.push('');
  lines.push(
    'Build every design decision from these rules. No defaults. No assumptions. No compromises.'
  );
  lines.push('');
  lines.push('== CONTENT BRIEF ==');
  lines.push('[Every content item listed clearly. Ends with: Now design the flyer.]');
  lines.push('');

  // ----- baseline rules (informational, the model folds these into DO NOT) -----
  lines.push('== BASELINE RULES ==');
  lines.push('These apply to every Signature regardless of choices:');
  BASELINE_RULES.forEach((r) => lines.push(`— ${r}`));

  return lines.join('\n');
}
