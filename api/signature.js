const CHOICE_MAP = {
  1: {
    A: 'type and scale alone create all hierarchy — no color blocks, no zone-making',
    B: 'color fields and spatial blocking organize everything — visual impression before words',
  },
  2: {
    A: 'intimate register — one person, quiet, personal, conversational distance',
    B: 'broadcast register — commanding a room, bold declaration, seen from distance',
  },
  3: {
    A: 'radical reduction — only essential elements remain, negative space is active',
    B: 'generous accumulation — complete information, rich detail, nothing withheld',
  },
  4: {
    A: 'legibility absolute — instant comprehension, maximum contrast, nothing atmospheric',
    B: 'atmosphere leads — emotional impression before factual understanding, mood is first',
  },
  5: {
    A: 'strict system — grid logic, consistent spacing, everything aligned to structure',
    B: 'intuitive expression — elements placed by feel, not formula, energy over order',
  },
  6: {
    A: 'extreme scale contrast — one element dominates, everything else steps back',
    B: 'harmonic proportion — all elements balanced, nothing overwhelms, fully resolved',
  },
  7: {
    A: 'screen-born digital precision — flat, exact, pixel-perfect, no material reference',
    B: 'physically-rooted warmth — feels handmade, tactile, human trace, analog reference',
  },
};

const BASE_SYSTEM_PROMPT = `You are a design strategist for the Kimberly Lohr Signature Method. Given 7 design choices, write a personal design signature. Return ONLY a raw JSON object — no markdown, no code fences, no explanation. Exactly three keys:

"voice" — 2-3 warm plain-language sentences describing their design voice. Specific to their exact combination of choices. Never generic.

"tokens" — exactly 5 short strings under 6 words each. Specific to their choices. Not adjectives like clean or bold — describe their actual design behavior.

"signature_prompt" — structured as follows:
Line 1: == YOUR DESIGN SIGNATURE ==
Blank line
DO NOT: followed by 6 specific prohibitions, each on its own line starting with —
Each prohibition must name a specific AI default this person's choices tell us to suppress. Be concrete. Not "avoid decoration" but "do not use paint stroke or brush mark effects behind text."
Blank line
DO: followed by 6 specific requirements, each on its own line starting with —
Each requirement must describe exactly how this person builds their design. Be concrete. Not "use type well" but "use type scale and weight as the only organizational system — no color zones, no icon-led sections."
Blank line
Final line: Build every design decision from these rules. No defaults.`;

const REFERENCE_EXTENSION = `

If reference images are provided, analyze each one using these three extraction briefs and add a third section to the Signature called QUALITY STANDARD.

EXTRACTION BRIEF — Row 1 (craft confidence):
Do not describe style or subject matter.
Ask: Are the decisions in this piece reversible or irreversible? Is the energy of the first decision still present or has it been resolved away? How much evidence of the making process is visible — and is that visibility intentional?
Produce one sentence beginning:
"Execute with the craft confidence of: ___"
The sentence must describe a behavior, not an aesthetic.

EXTRACTION BRIEF — Row 2 (visual register):
Do not describe style or subject matter.
Ask: Who is this speaking to and from what position — authority, peer to peer, or direct? Does this work explain itself or assume the viewer already belongs? What is the time horizon — designed to matter now, in twenty years, or both?
Produce one sentence beginning:
"This work belongs to the world of: ___"
The sentence must describe a relationship between work and audience, not a style category.

EXTRACTION BRIEF — Row 3 (production logic):
Do not describe style or subject matter.
Ask: What making process does this follow — ink on paper, mathematical systems, human hands and eyes, light on screen? What constraints shaped the decisions and are they being fought or embraced? If you removed all color, what would still be doing the organizational work?
Produce one sentence beginning:
"Follow the production logic of: ___"
The sentence must describe a way of making decisions, not a historical period or named style.

The QUALITY STANDARD section appears after DO: in the Signature Prompt. Format it exactly like this:

QUALITY STANDARD:
— [Row 1 sentence]
— [Row 2 sentence]
— [Row 3 sentence]

Hold every design decision to this standard. Rules define the structure. This defines how well and in what spirit.

If no reference images were provided, omit the QUALITY STANDARD section entirely. Do not mention it or explain its absence.`;

async function fetchImageAsBase64(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`fetch ${url} -> ${r.status}`);
  const ct = (r.headers.get('content-type') || 'image/jpeg').split(';')[0].trim();
  const buf = Buffer.from(await r.arrayBuffer());
  return { mediaType: ct, data: buf.toString('base64') };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
  }

  const { name, choices, references } = req.body || {};

  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'name is required' });
  }
  if (!Array.isArray(choices) || choices.length !== 7) {
    return res.status(400).json({ error: 'choices must be an array of length 7' });
  }
  for (let i = 0; i < 7; i++) {
    if (choices[i] !== 'A' && choices[i] !== 'B') {
      return res.status(400).json({ error: `choices[${i}] must be "A" or "B"` });
    }
  }

  const cleanRefs = Array.isArray(references)
    ? references.filter(r => r && [1, 2, 3].includes(r.row) && typeof r.url === 'string')
    : [];

  let imageFetches = [];
  if (cleanRefs.length > 0) {
    const results = await Promise.allSettled(cleanRefs.map(r => fetchImageAsBase64(r.url)));
    imageFetches = results.map((res, i) => ({
      row: cleanRefs[i].row,
      ok: res.status === 'fulfilled',
      payload: res.status === 'fulfilled' ? res.value : null,
      error: res.status === 'rejected' ? String(res.reason?.message || res.reason) : null,
    }));
  }

  const successfulRefs = imageFetches.filter(f => f.ok);

  const choiceLines = choices
    .map((letter, i) => `${i + 1}. ${CHOICE_MAP[i + 1][letter]}`)
    .join('\n');

  const systemPrompt = successfulRefs.length > 0
    ? BASE_SYSTEM_PROMPT + REFERENCE_EXTENSION
    : BASE_SYSTEM_PROMPT;

  let userContent;
  if (successfulRefs.length === 0) {
    userContent = `Name: ${name.trim()}\nChoices:\n${choiceLines}\n\nGenerate their Signature now.`;
  } else {
    userContent = [
      { type: 'text', text: `Name: ${name.trim()}\nChoices:\n${choiceLines}\n\nReference images (the user picked the following):` },
    ];
    for (const f of successfulRefs.sort((a, b) => a.row - b.row)) {
      userContent.push({ type: 'text', text: `\nRow ${f.row} reference:` });
      userContent.push({
        type: 'image',
        source: { type: 'base64', media_type: f.payload.mediaType, data: f.payload.data },
      });
    }
    userContent.push({ type: 'text', text: '\n\nGenerate their Signature now.' });
  }

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1600,
        system: systemPrompt,
        messages: [{ role: 'user', content: userContent }],
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => '');
      return res.status(upstream.status).json({ error: 'Upstream error', detail: errText });
    }

    const data = await upstream.json();
    const text = data?.content?.[0]?.text?.trim() || '';

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      return res.status(502).json({ error: 'Model returned non-JSON', raw: text });
    }

    if (
      typeof parsed?.voice !== 'string' ||
      !Array.isArray(parsed?.tokens) ||
      parsed.tokens.length !== 5 ||
      typeof parsed?.signature_prompt !== 'string'
    ) {
      return res.status(502).json({ error: 'Model returned malformed Signature', raw: parsed });
    }

    return res.status(200).json({
      ...parsed,
      _meta: {
        usedReferences: successfulRefs.length,
        failedReferences: imageFetches.filter(f => !f.ok).map(f => ({ row: f.row, error: f.error })),
      },
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to reach Anthropic API', detail: err.message });
  }
}
