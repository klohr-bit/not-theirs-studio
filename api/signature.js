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

const SYSTEM_PROMPT = `You are a design strategist for the Kimberly Lohr Signature Method. Given 7 design choices, write a personal design signature. Return ONLY a raw JSON object — no markdown, no code fences, no explanation. Exactly three keys:

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

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
  }

  const { name, choices } = req.body || {};

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

  const choiceLines = choices
    .map((letter, i) => `${i + 1}. ${CHOICE_MAP[i + 1][letter]}`)
    .join('\n');

  const userMessage = `Name: ${name.trim()}\nChoices:\n${choiceLines}\n\nGenerate their Signature now.`;

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1200,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userMessage }],
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

    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to reach Anthropic API', detail: err.message });
  }
}
