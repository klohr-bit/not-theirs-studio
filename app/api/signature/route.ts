import Anthropic from '@anthropic-ai/sdk';
import type { AppState } from '@/types';
import { buildPairInstructions, buildSystemPrompt, buildUserPrompt } from '@/lib/assemble';
import { detectContradictions } from '@/lib/contradictions';

const MODEL = 'claude-sonnet-4-6';

function parseDataUrl(dataUrl: string): { mediaType: string; data: string } | null {
  const match = dataUrl.match(/^data:([^;,]+);base64,(.+)$/);
  if (!match) return null;
  const mediaType = match[1];
  const data = match[2];
  const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowed.includes(mediaType)) return null;
  return { mediaType, data };
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 });
  }

  let state: AppState;
  try {
    state = (await request.json()) as AppState;
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!state?.name?.trim()) {
    return Response.json({ error: 'name is required' }, { status: 400 });
  }

  const instructions = buildPairInstructions(state);
  const contradictions = detectContradictions(state);
  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(state, instructions, contradictions);

  const client = new Anthropic();

  // Build the user message, including the quality-reference image if uploaded.
  const messages: Anthropic.MessageParam[] = [];
  if (state.qualityReference) {
    const parsed = parseDataUrl(state.qualityReference);
    if (parsed) {
      messages.push({
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: parsed.mediaType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp', data: parsed.data },
          },
          {
            type: 'text',
            text:
              'This image sets the quality bar. Extract: craft confidence level, audience relationship, production logic. Then:\n\n' +
              userPrompt,
          },
        ],
      });
    } else {
      messages.push({ role: 'user', content: userPrompt });
    }
  } else {
    messages.push({ role: 'user', content: userPrompt });
  }

  let response: Anthropic.Message;
  try {
    response = await client.messages.create({
      model: MODEL,
      max_tokens: 2000,
      system: systemPrompt,
      messages,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return Response.json({ error: 'Upstream error', detail: msg }, { status: 502 });
  }

  // Extract text from the first content block.
  const first = response.content[0];
  const text = first && first.type === 'text' ? first.text : '';
  const cleaned = text
    .trim()
    .replace(/^```json\n?/i, '')
    .replace(/^```\n?/, '')
    .replace(/\n?```$/, '');

  // Be tolerant of stray text around the JSON.
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return Response.json(
      { error: 'Model returned no JSON', raw: text },
      { status: 502 }
    );
  }

  let parsed: { voice?: unknown; tokens?: unknown; signature_prompt?: unknown };
  try {
    parsed = JSON.parse(jsonMatch[0]);
  } catch {
    return Response.json(
      { error: 'Model returned invalid JSON', raw: jsonMatch[0] },
      { status: 502 }
    );
  }

  if (
    typeof parsed.voice !== 'string' ||
    !Array.isArray(parsed.tokens) ||
    parsed.tokens.some((t) => typeof t !== 'string') ||
    typeof parsed.signature_prompt !== 'string'
  ) {
    return Response.json(
      { error: 'Model returned malformed Signature', raw: parsed },
      { status: 502 }
    );
  }

  return Response.json({
    voice: parsed.voice,
    tokens: parsed.tokens,
    signature_prompt: parsed.signature_prompt,
    contradictions,
    _meta: {
      qualityReferenceUsed: !!state.qualityReference,
      contradictionsCount: contradictions.length,
      instructionsCount: instructions.length,
    },
  });
}
