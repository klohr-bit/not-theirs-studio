import type { AppState, Contradiction } from '@/types';

/**
 * Detects structural contradictions between the user's stated pair choices
 * and their visual preferences. Runs client-side before the API call so
 * detected tensions can be passed in as authoritative input.
 */
export function detectContradictions(state: AppState): Contradiction[] {
  const tensions: Contradiction[] = [];
  const { pairs, specimenSelections, territory } = state;
  const signals = specimenSelections.map((s) => s.signal);

  // CT01 — Atmosphere vs type-only hierarchy
  if (pairs[4] === 'B' && pairs[1] === 'A' && territory.visualDirection !== 'A') {
    tensions.push({
      id: 'CT01',
      tension:
        'You want people to feel this before they read it — but you said type carries all the hierarchy. Those two things want different things.',
      optionA:
        'Let the illustration or visual element create the atmosphere. Type handles the information beneath that moment.',
      optionB:
        'Type IS the atmospheric moment. "OPEN" at a scale that fills the upper field and crops at the edge — the scale drama creates the feeling before anything is read.',
    });
  }

  // CT02 — Type-only vs image-dominant specimens
  if (
    pairs[1] === 'A' &&
    signals.some((s) => ['full_bleed_image', 'color_block_photo'].includes(s))
  ) {
    tensions.push({
      id: 'CT02',
      tension:
        "You said type carries all hierarchy — but the designs you're drawn to have a visual element that lands before any type is read.",
      optionA:
        'Let the visual element lead and have type organize the information beneath it.',
      optionB:
        'Keep type dominant but push the scale so dramatically that it creates the same visual impact as an image would.',
    });
  }

  // CT03 — Intimate register vs broadcast structure
  if (
    pairs[2] === 'A' &&
    signals.some((s) => ['full_bleed_image', 'diagonal_dynamic', 'color_block'].includes(s))
  ) {
    tensions.push({
      id: 'CT03',
      tension:
        "You said this should speak to one person — but the structures you're drawn to are designed to command a room.",
      optionA:
        'Use the bold structure at intimate scale — the drama is in the detail, not the distance.',
      optionB:
        'Reconsider the register — perhaps this piece wants to announce more than you first thought.',
    });
  }

  // CT04 — Reduction vs dense specimens
  if (
    pairs[3] === 'A' &&
    signals.some((s) => ['information_dense', 'illustrated_grid'].includes(s))
  ) {
    tensions.push({
      id: 'CT04',
      tension:
        "You said only what matters most — but you're drawn to designs that give you everything.",
      optionA:
        'Apply reduction discipline to a dense structure — include everything but organize it so ruthlessly that nothing feels like clutter.',
      optionB:
        "Trust the reduction — what feels sparse in the abstract will feel right when it's your actual content.",
    });
  }

  // CT05 — Digital precision vs collage/organic
  if (
    pairs[7] === 'A' &&
    signals.some((s) => ['collage_layered', 'organic_casual'].includes(s))
  ) {
    tensions.push({
      id: 'CT05',
      tension:
        "You said digital precision — but you're drawn to designs that feel assembled by hand.",
      optionA:
        'Achieve the layered quality through careful digital construction — precise overlaps, exact positioning, the appearance of collage without the accident.',
      optionB:
        'Allow one element to break the digital precision — a single handmade quality in an otherwise precise design.',
    });
  }

  // CT06 — System vs diagonal
  if (pairs[5] === 'A' && signals.includes('diagonal_dynamic')) {
    tensions.push({
      id: 'CT06',
      tension:
        "You said follow the rules — but you're drawn to a design that deliberately breaks the grid.",
      optionA: 'One calculated grid break within an otherwise strict system.',
      optionB: 'The diagonal IS a system. Define the angle, commit to it, apply it consistently.',
    });
  }

  // CT07 — Type dominance vs frame contained
  if (signals.includes('typographic_dominance') && signals.includes('framed_contained')) {
    tensions.push({
      id: 'CT07',
      tension:
        'You selected type-bleeds-off-the-edge and frame-contains-everything — those two structures are direct opposites.',
      optionA:
        'Type dominates within the frame — the boundary is present but the type pushes against it with tension.',
      optionB:
        'Choose one: the frame or the bleed. Both in the same design will fight each other.',
    });
  }

  return tensions;
}
