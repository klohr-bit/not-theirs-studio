import type { AppState, Contradiction, ContentState } from '@/types';
import { DECISION_MAP } from '@/lib/decisions';

export function buildSystemPrompt(): string {
  return `You are a creative director briefing a designer on a specific piece of work.

You will receive:
— A set of design decisions this person made about how they work
— The content of what they are making
— The visual structures they are drawn to
— Any tensions between their stated choices and their visual instincts

Your job is to write a design brief that makes one specific thing instead of a generic thing.

Do not write a style guide. Do not write a list of rules. Do not write prohibitions.

Write art direction. The difference:

Rules say: "Use type scale as the sole organizational system."
Art direction says: "The word OPEN should behave like architecture, not typography. Its scale should feel slightly irresponsible. The viewer feels its weight before they read it."

Rules say: "Do not use centered layouts."
Art direction says: "The composition has unequal visual mass. Something heavy on one side creates pressure that the eye resolves by moving."

Write the brief so a designer reading it knows exactly what this piece does — how it moves, what it feels like at a glance, what gets discovered slowly, what creates discomfort, what resolves it.

Return ONLY raw valid JSON with no markdown, no code fences:
{
  "voice": "2-3 sentences describing this person's design instinct. Specific to their choices. Sounds like someone who knows them.",
  "tokens": ["exactly 5 short phrases describing how they make — behavior not adjectives"],
  "signature_prompt": "The complete design brief formatted exactly as specified in the user message."
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

// ---------- helpers used by the user-prompt builder ----------

function getAnchorDescription(anchor: ContentState['visualAnchor']): string {
  const map: Record<NonNullable<ContentState['visualAnchor']>, string> = {
    event_name: 'The event name. It stops the eye first and completely.',
    date: 'The date. Large enough to be the visual anchor.',
    organization: 'The organization. It leads because it is why people trust this.',
    feeling: 'The feeling of the piece. Atmosphere stops the eye before information does.',
  };
  return anchor ? map[anchor] : 'the event name';
}

function getIllustrationDesc(style: string | null): string {
  const map: Record<string, string> = {
    A: 'bold and graphic. High contrast. Strong shapes. Screenprint energy. Shapes you could cut as a stencil.',
    B: 'fine line. Observational not decorative. Something noticed rather than arranged. Partial forms. A hand mid-process. Not staged still life.',
    C: 'loose and gestural. Energy of the first mark preserved. Nothing over-resolved.',
    D: 'flat geometric. Pure shape. No texture. No organic edge.',
  };
  return style ? map[style] || map.B : map.B;
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

// ---------- the user prompt ----------

export function buildUserPrompt(
  state: AppState,
  instructions: string[],
  contradictions: Contradiction[]
): string {
  const lines: string[] = [];
  const c = state.content;

  // CONTENT FIRST — read it before making any decisions
  lines.push('== THE CONTENT ==');
  if (c.eventName) lines.push(`Event: ${c.eventName}`);
  if (c.hostedBy) lines.push(`By: ${c.hostedBy}`);
  if (c.date) lines.push(`Date: ${c.date}`);
  if (c.time) lines.push(`Time: ${c.time}`);
  if (c.locationName) lines.push(`Location: ${c.locationName}`);
  if (c.address) lines.push(`Address: ${c.address}`);
  if (c.activities.length > 0) {
    lines.push(`Activities: ${c.activities.join(', ')}`);
  }
  if (c.audience) lines.push(`Audience: ${c.audience}`);
  if (c.contact) lines.push(`Contact: ${c.contact}`);
  if (c.partners.length > 0) lines.push(`Partners: ${c.partners.join(', ')}`);
  if (c.other) lines.push(`Also: ${c.other}`);
  lines.push('');

  // TENSION DETECTION — find what's inherently in conflict in this content
  lines.push('== FIND THE TENSION ==');
  lines.push('Before writing anything, read the content above and identify:');
  lines.push("1. What two things in this content shouldn't comfortably coexist?");
  lines.push('   (Scale difference. Emotional register difference. Institutional vs human. Formal vs intimate.)');
  lines.push('2. What is the most specific and human moment in this content?');
  lines.push('   (The line that sounds like a person, not an announcement.)');
  lines.push('3. What will the AI default to if not directed?');
  lines.push('   (Predict the most likely generic layout for this type of content.)');
  lines.push('   Then build counter-decisions against that default.');
  lines.push('');
  const humanMoment = findHumanMoment(c);
  lines.push(`The human moment is: "${humanMoment ?? 'the most personal line in the content'}"`);
  lines.push(`The visual anchor is: ${getAnchorDescription(c.visualAnchor)}`);
  lines.push('');

  // PERSON'S DECISIONS
  lines.push("== THIS PERSON'S DESIGN DECISIONS ==");
  lines.push('Each line below comes directly from a choice they made.');
  lines.push('Translate these into compositional behavior, not rules.');
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

  // VISUAL IDENTITY
  if (state.territory.energyWords.length > 0) {
    lines.push(`Energy: ${state.territory.energyWords.join(', ')}`);
    lines.push('Translate these as force and pressure, not mood adjectives.');
    lines.push('"Quiet" means restraint under pressure, not absence of energy.');
    lines.push('"Inevitable" means every element feels placed for the only reason it could be there.');
  }

  if (state.colors.provided && state.colors.hex.length > 0) {
    lines.push(
      `Colors: ${state.colors.hex.join(', ')} — these are the only colors. Each one has a structural job.`
    );
  } else if (state.colors.temperature) {
    const tempDesc: Record<NonNullable<AppState['colors']['temperature']>, string> = {
      warm: 'warm — earthy, amber, clay, linen. The color of the material itself, not of warmth as a concept.',
      neutral: 'neutral — near-black, warm white, one accent used once. Maximum contrast.',
      cool: 'cool — deep slate, forest, steel. Considered and precise.',
    };
    lines.push(`Color territory: ${tempDesc[state.colors.temperature]}`);
  }

  // VISUAL DIRECTION
  if (state.territory.visualDirection) {
    const dirDesc: Record<NonNullable<AppState['territory']['visualDirection']>, string> = {
      A: 'Type only. The typographic arrangement IS the image. No illustration.',
      B: 'User photography. Do not generate imagery. Hold space for their photos.',
      C: `Illustration — ${getIllustrationDesc(state.territory.illustrationStyle)}`,
      D: 'One graphic element. Abstract. Structural. Not representational.',
      E: 'Mixed media. Combine type, photo, and graphic element with intent.',
    };
    lines.push(`Visual: ${dirDesc[state.territory.visualDirection]}`);
  }

  // (Physical quality + type character were folded into the decision
  // instructions stream above. No separate section here.)
  lines.push('');

  // CONTRADICTIONS
  if (contradictions.length > 0) {
    lines.push('== TENSIONS BETWEEN CHOICES AND INSTINCTS ==');
    lines.push('These gaps between stated choices and visual preferences are information.');
    lines.push('Build them into the brief as resolved decisions, not as warnings.');
    lines.push('');
    contradictions.forEach((ct) => {
      lines.push(`Gap: ${ct.tension}`);
      lines.push(`Resolved as: ${ct.optionB}`);
      lines.push('');
    });
  }

  // SPECIMEN SIGNALS
  if (state.specimenSelections.length > 0) {
    lines.push('== STRUCTURES THEY RESPOND TO ==');
    state.specimenSelections.forEach((s) => {
      lines.push(`— ${s.label}`);
    });
    lines.push('');
  }

  // FORMAT
  lines.push('== FORMAT ==');
  const formatDesc: Record<string, string> = {
    print: 'Printed and posted. Must read from 10 feet before earning detail up close.',
    social: 'Social media. Must stop a thumb in 0.3 seconds. Reads at thumbnail scale first.',
    both: 'Both print and social. Primary hierarchy works at thumbnail. Detail rewards close reading.',
    email_digital: 'Email or digital. Reads on a screen at desk distance. Must survive auto-loaded preview rendering.',
    projected: 'Projected on screen. Maximum contrast. No thin type. No fine detail.',
  };
  lines.push(formatDesc[state.format] || 'Print and social.');
  lines.push('');

  // OUTPUT FORMAT
  lines.push('== WRITE THE SIGNATURE PROMPT IN THIS EXACT FORMAT ==');
  lines.push('');
  lines.push('== YOUR DESIGN SIGNATURE ==');
  lines.push('');
  lines.push('WHAT THIS PIECE DOES:');
  lines.push('[2-3 sentences. Not what it looks like. What it does. How it moves.');
  lines.push('What the eye does. What happens in the first half second.');
  lines.push('What gets discovered. What creates tension. What resolves it.');
  lines.push('Written as the premise of the design, not a description of it.]');
  lines.push('');
  lines.push('DOMINANCE HIERARCHY:');
  lines.push('Dominant: [one element — what owns the page]');
  lines.push('Subordinate: [what steps back and by how much]');
  lines.push('Anchor: [the emotional landing point — the human moment]');
  lines.push('Discovery: [what gets found slowly — the illustration, the detail, the quiet line]');
  lines.push('Tension: [what two things are in uncomfortable proximity — the productive conflict]');
  lines.push('');
  lines.push('THUMBNAIL EXPERIENCE (0.5 seconds):');
  lines.push('[One sentence. What is felt before anything is read.');
  lines.push('Not what is seen. What is felt. Pressure, scale, mood, energy.]');
  lines.push('');
  lines.push('CLOSE EXPERIENCE (10 seconds):');
  lines.push("[One sentence. What gets discovered that wasn't visible at first glance.");
  lines.push('The detail. The specific line. The thing that makes it personal.]');
  lines.push('');
  lines.push('DEFAULT COLLAPSE — what the AI will try to do:');
  lines.push('[Name the most likely generic behavior for this type of content.');
  lines.push('Then name the specific counter-decision that prevents it.]');
  lines.push('');
  lines.push('ART DIRECTION:');
  lines.push('[6-8 specific directional statements. Each describes behavior, not appearance.');
  lines.push('Written as a creative director speaking to a designer.');
  lines.push('Not rules. Decisions. Not "don\'t center" but "the composition has unequal');
  lines.push('visual mass — something heavy on the left creates pressure the eye resolves');
  lines.push('by moving right."');
  lines.push('The last statement must be:');
  lines.push('"The composition should feel like it was arranged by eye over several hours,');
  lines.push('not generated from a system."]');
  lines.push('');
  lines.push('BASELINE (catastrophic failure modes only):');
  lines.push('— No AI-generated photorealistic people unless real photography provided');
  lines.push('— No gradient backgrounds');
  lines.push('— No decorative sun, star, or sparkle elements');
  lines.push('— No colored bottom banner strip');
  lines.push('— No three-part tagline structure');
  lines.push('— No texture filters or grain overlays to simulate physical quality');
  lines.push('');
  lines.push('EXPERT PASS:');
  lines.push('[Five questions the AI asks itself after completing the design.');
  lines.push("Each question targets a specific failure mode for this person's choices.");
  lines.push('Question 1 names where the AI most likely flinched.');
  lines.push(`Question 5 asks specifically about "${humanMoment ?? 'the most human line in the content'}"`);
  lines.push('— whether it landed as the emotional conclusion or disappeared into the details.]');
  lines.push('');
  lines.push('Build every decision from this brief.');
  lines.push('No defaults. No system behavior. No generated layouts.');
  lines.push('');
  lines.push('== CONTENT BRIEF ==');
  lines.push('Every item below must appear. Nothing added. Nothing omitted.');
  lines.push('');

  // Content brief inside the output
  if (c.eventName) lines.push(`Event: ${c.eventName}`);
  if (c.hostedBy) lines.push(`By: ${c.hostedBy}`);
  if (c.date) lines.push(`Date: ${c.date}`);
  if (c.time) lines.push(`Time: ${c.time}`);
  if (c.locationName) lines.push(`Location: ${c.locationName}`);
  if (c.address) lines.push(`Address: ${c.address}`);
  if (c.activities.length > 0) {
    lines.push('');
    c.activities.forEach((a) => lines.push(`  ${a}`));
  }
  if (c.audience) lines.push(`Audience: ${c.audience}`);
  if (c.contact) lines.push(`Contact: ${c.contact}`);
  if (c.partners.length > 0) lines.push(`Partners: ${c.partners.join(', ')}`);
  if (c.other) lines.push(`  ${c.other}`);
  lines.push('');
  lines.push('Now design the flyer.');

  return lines.join('\n');
}
