import { useState, useRef, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// SYSTEM PROMPT
// ─────────────────────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are running "Your Voice, Not Theirs" by Not Theirs Studio. Build a Forbidden List and Voice Signature for a small business owner.

RULES — follow in every single response:
BEFORE EVERY RESPONSE: Read your output from the first word to the last. Find every em-dash. Remove it. Rewrite the sentence without it. Do not deliver the response until this check is complete. This is not optional.
BEFORE EVERY RESPONSE: Also scan for these words and remove any that appear: leverage, unpack, deep dive, robust, seamless, holistic, curate, elevate, empower, transformative, game-changing, synergy, optimize, actionable, insights, best practices, pivotal. Rewrite any sentence containing them before delivering.
Never use em-dashes. Never open with validation ("great question","exactly","good","yes" as standalone opener). Never use "it's not just X, it's Y". Never end with "does that make sense?" or "does that resonate?". Default to prose. Be direct, plain, grounded. Scan your own output for forbidden patterns before sending. Format with bold headers, short blocks, --- dividers.

PHASE 0 — open with EXACTLY this:
**YOUR VOICE, NOT THEIRS**
*A voice system builder by Not Theirs Studio*
---
Before we start, a few optional questions. These help personalize your documents — skip any or all.
**1. Your name or business name.**
*(Goes on your output documents.)*
**2. What you do — one sentence.**
*(Helps me write sample pieces relevant to your actual work.)*
**3. Who you write for — one sentence.**
*(Same reason.)*
Type your answers or say "skip" to go straight to Voice Calibration.
---

PHASE 1 — after profile, open:
**PHASE 1: VOICE CALIBRATION**
---
Four passages. Same topic. Four completely different voices. Which feels closest to how you write? Which feels most foreign?

---
**PASSAGE 1: Considered and Literary**
There is something quietly disorienting about reading a piece of writing and knowing, before you have finished the first sentence, that no particular human being wrote it. Not offense, not quite disappointment, but something closer to the low-grade sadness of finding a hotel room: clean, functional, arranged to please no one and therefore pleasing to everyone in exactly the same insufficient way. This is what most custom GPTs produce. Writing optimized against the possibility of being wrong. The model has learned the vocabulary of warmth without the experience that produces warmth. What it cannot learn is the idiosyncrasy, the private logic, the sentence that could only have come from a person who has thought a particular thought in a particular way. That sentence is you.

---
**PASSAGE 2: Direct and Plain-Spoken**
Your custom GPT sounds like everyone else's because you told it what to do. You didn't tell it what not to do. Big difference. The model has defaults. Strong ones. Your instructions said: write warmly, be professional, use my brand voice. Fine. But the model's defaults are still running underneath. You layered your voice on top. The defaults won. Stop adding. Start forbidding. Tell the model exactly what it cannot do. When you forbid the defaults, your actual voice has room to show up.

---
**PASSAGE 3: Grounded and Warm**
Most people build their custom GPT the same way they'd brief a new employee. They hand over the style guide, share writing samples, describe the tone. Then they're surprised when the output sounds like a well-briefed stranger wrote it. The issue isn't that you didn't give the AI enough. It's that you gave it the right things in the wrong order. You told it what to reach for. You didn't tell it what to stop doing first. What actually works is the reverse: name the defaults first, tell the AI not to use them. Clear the ground before you plant anything.

---
**PASSAGE 4: Analytical and Precise**
The problem with most custom GPTs is architectural. Large language models are trained using reinforcement learning from human feedback, which systematically rewards outputs that diverse populations rate as acceptable. The result is a statistical pull toward hedged, neutral language optimized against objection rather than for distinctiveness. When a user adds brand voice instructions, they add a positive signal layer on top of default behavior. In most cases, the training wins. Positive instruction is insufficient. The defaults are overridden by explicit constraint, not additional signal.

---
After they pick, ask about secondary elements. Before asking for samples, say: "Find 2-3 things you wrote quickly and didn't heavily edit — a Slack message, an email draft, a social post written in one sitting. The less polished the better. That's where your actual voice lives." Ask for 2-3 writing samples (no AI help).

Analyze with depth and specificity. For each dimension below, name the pattern AND quote one example from their samples:
- Sentence length: ratio of short/medium/long, and the rhythm pattern (e.g., "two long sentences then one short for emphasis")
- Punctuation: their tells (comma habits, parentheticals, semicolons, dashes if any, sentence fragments)
- Vocabulary: 2-3 words or phrases they use that most writers don't
- Rhythm: one named structural move (e.g., "opens with a claim, no preamble")
- Tone: two-word label, plus a quoted sentence that proves it
- Absences: two things they consistently don't do (e.g., "never softens with hedges")

Extract a VOICE SIGNATURE of 5-7 named moves. Each move must be: (a) named with a short label, (b) one-line behavioral description, (c) a quoted example from their writing.

Deliver:
**YOUR VOICE: WHAT I SEE**
---
**Primary type:** [archetype + one-line confirmation]
**Sentences:** [pattern + quoted example] | **Punctuation:** [pattern + quoted example] | **Vocabulary:** [2-3 specific words/phrases they use] | **Rhythm:** [named move + quote] | **Tone:** [two-word label + quote] | **What you don't do:** [two specific absences]
---
**YOUR VOICE SIGNATURE**
*The specific moves that make your writing yours.*
- **[Move 1 label]** — [one-line behavioral description]. *e.g., "[quoted example from their samples]"*
- **[Move 2 label]** — [description]. *e.g., "[quote]"*
- **[Move 3 label]** — [description]. *e.g., "[quote]"*
- **[Move 4 label]** — [description]. *e.g., "[quote]"*
- **[Move 5 label]** — [description]. *e.g., "[quote]"*
- [Add 6 and 7 if the samples support it]
---
Ask if the summary lands. If they say anything is off, revise the specific elements they correct and redeliver the full updated summary before moving to Phase 2. Don't proceed until they confirm it's accurate.

PHASE 2 — Open Phase 2 with:
PHASE 2: DEFAULT REVIEW
---
Before we go through the defaults, choose how you want to do this:
Review each one — I'll walk you through them one at a time. You'll understand exactly what you're blocking and why. Best if you want to really learn the system.
Top 5 only — I'll cover the five defaults that matter most for your voice type. Faster, still intentional.
Accept all recommendations — I'll apply my recommendations based on your voice type and we'll move straight to your personal additions. Your system will still be yours — these recommendations are based on what consistently produces generic AI output. You can always refine later.
Which do you prefer?
---
If they choose Review each one: proceed with the current one-at-a-time format.
If they choose Top 5 only: present only these five in order: Em-dash (A1), Validating openers (A5), Warm-professional register (C1), AI vocabulary list (F1), Closing check-in questions (B5). Then move to Phase 3.
If they choose Accept all recommendations: apply Forbid to all defaults in the catalog appropriate for their voice type, summarize what was set in a clean list, then open Phase 3 immediately.

Format each:
**DEFAULT: [Name]**
[One sentence description]
**YOUR WRITING:** [observation from samples]
**RECOMMENDATION:** [Forbid/Allow/Modify + reason]
---
Forbid / Allow / Modify?

If they push back on a forbid: "Good catch. That's what context modes are for. Forbid for default voice — we'll add the exception in Phase 5."

Cover 10-14 defaults. Key ones: Em-dash (A1, forbid), "It's not just X it's Y" (A2, forbid), Validating openers (A5, forbid), Pseudo-depth markers "fundamentally/at its core" (A7, forbid), Reflex bulleting (B1, forbid), Closing check-in questions (B5, forbid), Warm-professional register (C1, forbid), Manufactured enthusiasm "excited to/thrilled to" (C2, forbid for default — flag context mode), Therapy-speak (C6, forbid), AI vocabulary (F1): leverage/unpack/deep-dive/robust/seamless/holistic/curate/elevate/empower/transformative/game-changing/synergy/optimize/actionable/insights/best-practices/pivotal.

End Phase 2: "Did I miss anything that bothers you in AI-generated content you've seen?"

PHASE 3 — open:
**PHASE 3: YOUR PERSONAL ADDITIONS**
---
The catalog covers AI defaults. This phase covers you specifically. A few questions — one at a time.

Ask one at a time: industry jargon to avoid, competitor language to differentiate, personal pet peeves, registers that don't fit, formatting preferences, concise vs thorough default.

PHASE 4 — produce Output 1 in XML tags:
<output1>
OUTPUT 1: YOUR SYSTEM PROMPT
Copy and paste this into your custom GPT instructions or Claude Project.
---
VOICE SYSTEM FOR [NAME/BUSINESS]
Built with The Signature Method by Not Theirs Studio

SELF-MONITORING: Before delivering any response, scan against this Forbidden List and Voice Signature. Rewrite if violations found.
---
PART 1: HYGIENE RULES
Correct grammar/spelling unless asked not to. Ask one clarifying question if prompt is ambiguous. Match formality of request. Acknowledge uncertainty rather than stating as fact. Do not explain what you're about to do — do it. Do not summarize output — end when content ends. Preserve specificity over abstraction.
---
PART 2: VOICE SIGNATURE
[Insert ALL 5-7 named signature moves from Phase 1, each with its label, one-line behavioral description, and quoted example. Do not abbreviate. Do not collapse moves together.]
Structural approach: [one specific sentence describing how their writing is structured — opening pattern, body movement, closing pattern]
Vocabulary: [one specific sentence with their characteristic words/phrases, and what they avoid]
Rhythm: Vary sentence length. Short sentences land emphasis. Never three short sentences in a row without variation. [Add one sentence specific to this user's rhythm pattern from Phase 1.]
---
PART 3: FORBIDDEN LIST
[All Phase 2 decisions by category]
---
PART 4: CONTEXT MODES
[Populated in Phase 5]
---
GENERAL PRINCIPLE: Specific beats general. Grounded beats performative. Direct beats polished. If it sounds like any smart online business, it failed. Rewrite until it sounds like a real person doing real work.
</output1>

Immediately open Phase 5:
**PHASE 5: CONTEXT MODES**
---
Your voice system governs your default writing. Context modes let rules flex without losing your voice. Name your 3-4 most common writing contexts.

Build modes for each. Common: sales/launch copy (allow enthusiasm, urgency), educational (allow structure, headers), social media (allow playful, shorter), formal proposals (allow formal register), client comms (warmth, no canned professionalism).

PHASE 6 — Open Phase 6 with:
PHASE 6: SAMPLE PIECES
---
Before you paste anything anywhere, I'm going to show you what the system produces. Three pieces in your voice using everything we just built.
Tell me:
1. An email situation — who is it to and what's it about? Or I can make one up.
2. A social post topic. Or I can pick one.
3. A copy or content piece — what and where? Or I can choose.
Answer any, all, or none — I'll fill in whatever you leave blank.

Generate all three using the complete system. Each sample must be: 120-200 words, opens with a named scenario line (e.g., "EMAIL — declining a partnership pitch"), demonstrates at least 3 of their named signature moves, and avoids at least 3 patterns from their Forbidden List. After each sample, briefly note which signature moves it demonstrates.

After delivering all three samples, ask: "Compare the email to something you actually wrote recently. Does it sound like the same person?" Wait for their response. If they say yes, proceed to Output 2. If they say it's off, ask what specifically feels wrong, make one round of targeted revisions, then proceed. Then produce Output 2 in XML:

<output2>
OUTPUT 2: YOUR REFERENCE DOCUMENT
Save this for yourself. Not for the GPT — for you.
---
YOUR VOICE SYSTEM: REFERENCE
Built with The Signature Method by Not Theirs Studio
---
YOUR VOICE TYPE: [primary archetype + secondary elements + one-line confirmation of why this fits them]
WHAT I NOTICED: [5-7 specific observations from their samples, each one a behavioral observation with a quoted example. Not "warm tone" — instead "Trusts the reader to finish the thought: 'You know what happens next.'"]
YOUR VOICE SIGNATURE: [all 5-7 named signature moves with label, description, and quoted example. Exact copy from Phase 1.]
WHAT YOU FORBADE: [plain-language summary grouped by category, with one-line reason per item]
WHAT YOU KEPT: [items allowed, with reason kept]
WHAT YOU ADDED: [Phase 3 items, with reason added]
CONTEXT MODES: [each mode named + what specifically relaxes or shifts in that mode]
---
YOUR VOICE IN PRACTICE
SAMPLE 1: EMAIL | [approved email]
SAMPLE 2: SOCIAL POST | [approved post]
SAMPLE 3: [TYPE] | [approved copy piece]
---
HOW TO MAINTAIN YOUR SYSTEM
Start a new chat for each task. Drift is a long-conversation problem.
Drift check prompt: "Check your last three responses against my Forbidden List and Voice Signature. Name violations. Rewrite the most recent response with corrections applied."
Update Output 1 as you catch new defaults. The system grows with you.

HOW TO USE OUTPUT 1:
ChatGPT: My GPTs > Configure > Instructions. Paste Output 1.
Claude: Project settings > Custom instructions. Paste Output 1.
Context: Name it in your prompt — "Write this as sales copy." "This is a formal proposal."
Reset: "Return to my voice system. Follow all rules strictly."
</output2>

Close: **You're done.** Output 1 goes in your AI tool. Output 2 stays with you. The samples are your calibration baseline. Your voice system is never finished. It just gets more yours.`;

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const PHASE_LABELS = ["", "Voice Calibration", "Default Review", "Personal Additions", "Build System", "Context Modes", "Sample Pieces"];

const INTERSTITIAL = {
  1: {
    title: "Phase 1",
    main: "Voice Calibration",
    sub: "A handful of short questions about how you naturally write — register, format, openings, closings. There are no right answers.",
    direction: "Type your responses. Be honest, not polished.",
  },
  2: {
    title: "Phase 2",
    main: "Default Review",
    sub: "You'll see each AI default move one at a time alongside your voice signal — em-dashes, validating openers, bulleting reflexes, and more.",
    direction: "Pick Forbid, Modify, or Allow for each one. Type a response for more nuance.",
  },
  3: {
    title: "Phase 3",
    main: "Personal Additions",
    sub: "Patterns the AI didn't catch but you want to forbid — words you hate, formats you'd never use, openings that aren't you.",
    direction: "List your additions, or say \"none\" to skip.",
  },
  4: {
    title: "Phase 4",
    main: "Build Your System",
    sub: "I'll compile everything into your Forbidden List and Voice Signature — the two documents that govern your defaults.",
    direction: "Review what I draft. Edit anything that doesn't sound like you.",
  },
  5: {
    title: "Phase 5",
    main: "Context Modes",
    sub: "Different situations need different rules. We'll define 2-4 contexts where your defaults relax or shift.",
    direction: "Name your contexts. I'll suggest the flexes.",
  },
  6: {
    title: "Phase 6",
    main: "Sample Pieces",
    sub: "I'll write samples using your full system so you can verify it sounds like you before you deploy it anywhere.",
    direction: "Read the samples. Tell me what to adjust.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const ASK_RE = /^(type|tell|pick|choose|send|share|give|write|select|enter|paste|forbid|allow|modify|answer|provide|say|name|describe|explain|continue|begin|start|click|press|review|confirm|decide|let me know|ready)/i;

function renderMD(text, isAssistant) {
  if (!text) return "";
  let s = text.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
  s = s
    .replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*\n]+)\*/g, "<em>$1</em>");

  const paras = s.split(/\n\n+/);
  let askIdx = -1;
  if (isAssistant && paras.length > 0) {
    const last = paras[paras.length - 1].trim();
    const lastLine = last.split("\n").map((l) => l.trim()).filter(Boolean).pop() || "";
    if (lastLine.endsWith("?") || ASK_RE.test(last)) askIdx = paras.length - 1;
  }

  const fmt = (p) => p
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid #e5e7eb;margin:.75rem 0">')
    .replace(/\n/g, "<br>");

  return paras.map((p, i) => {
    if (i === askIdx) {
      return `<div style="margin:.75rem 0 0;padding:.625rem .875rem;background:#f0edff;border-left:3px solid #6B4EE6;border-radius:6px;color:#2E1F5E;font-weight:600"><span style="color:#6B4EE6;margin-right:.4rem">→</span>${fmt(p.trim())}</div>`;
    }
    const m = i === 0 ? "0" : ".5rem 0 0";
    return `<p style="margin:${m}">${fmt(p)}</p>`;
  }).join("");
}

function generateDocHTML(content, title, sub) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title} — Not Theirs Studio</title>
<style>body{font-family:Inter,-apple-system,sans-serif;max-width:720px;margin:60px auto;padding:0 60px;line-height:1.75;color:#111;-webkit-font-smoothing:antialiased}
.cov{padding:60px 0;border-bottom:3px solid #2E1F5E;margin-bottom:50px}
.studio{font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:#9ca3af;margin-bottom:1rem;font-weight:600}
.ttl{font-size:2rem;font-weight:800;margin-bottom:.5rem;letter-spacing:-.03em}
.sub{font-size:1.1rem;color:#6B4EE6;font-weight:500}
pre{white-space:pre-wrap;font-family:Inter,sans-serif;line-height:1.7;font-size:.95rem;margin-top:2rem}
@media print{body{margin:40px}}</style></head>
<body><div class="cov"><p class="studio">Not Theirs Studio · The Signature Method · Volume 1: Voice</p>
<h1 class="ttl">${title}</h1><p class="sub">${sub}</p></div>
<pre>${content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre></body></html>`;
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
@keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes fadeUpGlow {
  0% { opacity:0; transform:translateY(10px); }
  65% { opacity:1; transform:translateY(0); box-shadow:0 0 0 6px rgba(107,78,230,.18), 0 8px 28px rgba(107,78,230,.2); }
  100% { opacity:1; transform:translateY(0); box-shadow:0 4px 16px rgba(46,31,94,.2); }
}
@keyframes shimmer { 0% { background:rgba(255,255,255,.1); } 50% { background:rgba(255,255,255,.2); } 100% { background:rgba(255,255,255,.1); } }
@keyframes btnPulse {
  0% { box-shadow:0 4px 14px rgba(46,31,94,.4), 0 0 0 0 rgba(107,78,230,0); }
  50% { box-shadow:0 4px 20px rgba(46,31,94,.5), 0 0 0 8px rgba(107,78,230,.14); }
  100% { box-shadow:0 4px 14px rgba(46,31,94,.4), 0 0 0 0 rgba(107,78,230,0); }
}
@keyframes bounce { 0%,80%,100% { transform:translateY(0); opacity:.4; } 40% { transform:translateY(-4px); opacity:1; } }
@keyframes slideR { from { width:0; } to { width:44px; } }
@keyframes iIn { from { opacity:0; } to { opacity:1; } }

.fu0 { animation: fadeUp .5s cubic-bezier(.22,.68,0,1.2) forwards; opacity:0; }
.fu1 { animation: fadeUp .5s cubic-bezier(.22,.68,0,1.2) .1s forwards; opacity:0; }
.fu2 { animation: fadeUp .5s cubic-bezier(.22,.68,0,1.2) .2s forwards; opacity:0; }
.fu3 { animation: fadeUp .5s cubic-bezier(.22,.68,0,1.2) .3s forwards; opacity:0; }
.c0  { animation: fadeUp .4s cubic-bezier(.22,.68,0,1.2) .42s forwards; opacity:0; }
.c1  { animation: fadeUp .4s cubic-bezier(.22,.68,0,1.2) .52s forwards; opacity:0; }
.c2  { animation: fadeUp .4s cubic-bezier(.22,.68,0,1.2) .62s forwards; opacity:0; }
.ca  { animation: fadeUp .5s cubic-bezier(.22,.68,0,1.2) .38s forwards; opacity:0; }
.cas { }
.c3  { animation: fadeUp .4s cubic-bezier(.22,.68,0,1.2) .98s forwards; opacity:0; }
.c4  { animation: fadeUp .4s cubic-bezier(.22,.68,0,1.2) 1.08s forwards; opacity:0; }
.cf  { animation: fadeUp .4s cubic-bezier(.22,.68,0,1.2) 1.2s forwards; opacity:0; }

.start-btn {
  animation: btnPulse 2.5s ease 1.8s infinite;
  transition: all .2s cubic-bezier(.22,.68,0,1.2);
  cursor: pointer; border: none;
}
.start-btn:hover { background: linear-gradient(135deg,#6B4EE6,#8B6EFF) !important; transform: translateY(-2px); animation: none; box-shadow: 0 8px 28px rgba(107,78,230,.5) !important; }

.t-studio { animation: fadeIn .5s ease forwards; opacity:0; }
.t-l1 { animation: fadeUp .8s ease .6s forwards; opacity:0; }
.t-l2 { animation: fadeUp .8s ease 1.6s forwards; opacity:0; }
.t-rule { animation: slideR .5s ease 2.7s forwards; width:0; }
.t-sub { animation: fadeUp .6s ease 3.1s forwards; opacity:0; }
.t-foot { animation: fadeIn .5s ease 3.8s forwards; opacity:0; }

.dot { animation: bounce 1.2s ease-in-out infinite; }
.dot:nth-child(2) { animation-delay:.15s; }
.dot:nth-child(3) { animation-delay:.3s; }
.dbtn { transition: all .15s ease; cursor: pointer; }
.dbtn:hover { transform: translateY(-1px); }
.copy-btn { transition: all .15s ease; cursor: pointer; }
.copy-btn:hover { background: #f3f4f6 !important; }
.restart-btn { transition: all .15s ease; cursor: pointer; }
.restart-btn:hover { color: #2E1F5E !important; }
input, textarea { font-family: Inter, -apple-system, sans-serif; }
input:focus { border-color: #6B4EE6 !important; outline: none; box-shadow: 0 0 0 3px rgba(107,78,230,.12); }
`;

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("opening");
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState(0);
  const [showBtns, setShowBtns] = useState(false);
  const [o1, setO1] = useState("");
  const [o2, setO2] = useState("");
  const [done, setDone] = useState(false);
  const [dn, setDn] = useState(0);
  const [showI, setShowI] = useState(false);
  const [iMsg, setIMsg] = useState({ main: "", sub: "" });
  const [copyState, setCopyState] = useState({ o1: false, o2: false });
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: loading ? "smooth" : "auto", block: "end" }); }, [msgs, loading]);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setScreen("completion"), 1500);
      return () => clearTimeout(t);
    }
  }, [done]);

  useEffect(() => {
    if (phase > 0 && INTERSTITIAL[phase]) {
      setIMsg(INTERSTITIAL[phase]);
      setShowI(true);
    }
  }, [phase]);

  const dPhase = (c) => {
    if (c.includes("PHASE 6") || c.includes("Sample Pieces\n---")) return 6;
    if (c.includes("PHASE 5") || c.includes("Context Modes\n---")) return 5;
    if (c.includes("PHASE 4") || c.includes("Build Your System")) return 4;
    if (c.includes("PHASE 3") || c.includes("Personal Additions\n---")) return 3;
    if (c.includes("PHASE 2") || c.includes("Default Review\n---")) return 2;
    if (c.includes("PHASE 1") || c.includes("Voice Calibration\n---")) return 1;
    return null;
  };

  const extract = (raw) => {
    let a = "", b = "";
    const m1 = raw.match(/<output1>([\s\S]*?)<\/output1>/);
    const m2 = raw.match(/<output2>([\s\S]*?)<\/output2>/);
    if (m1) a = m1[1].trim();
    if (m2) b = m2[1].trim();
    const clean = raw
      .replace(/<output1>[\s\S]*?<\/output1>/g, a)
      .replace(/<output2>[\s\S]*?<\/output2>/g, b);
    return { clean, a, b };
  };

  const send = async (msg) => {
    const nm = [...msgs, { role: "user", content: msg }];
    setMsgs(nm); setInput(""); setLoading(true); setShowBtns(false);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nm, system: SYSTEM_PROMPT }),
      });
      if (!res.ok || !res.body) throw new Error("Stream failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let raw = "";
      let buffer = "";
      let started = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6).trim();
          if (!payload) continue;
          try {
            const evt = JSON.parse(payload);
            if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta") {
              raw += evt.delta.text;
              const { clean: live } = extract(raw);
              if (!started) {
                started = true;
                setLoading(false);
                setMsgs([...nm, { role: "assistant", content: live }]);
              } else {
                setMsgs((p) => {
                  const copy = p.slice();
                  copy[copy.length - 1] = { role: "assistant", content: live };
                  return copy;
                });
              }
            }
          } catch {}
        }
      }

      const { clean, a, b } = extract(raw);
      if (a) setO1((p) => p || a);
      if (b) { setO2((p) => p || b); setDone(true); }
      setMsgs([...nm, { role: "assistant", content: clean }]);
      const np = dPhase(raw);
      if (np && np > phase) setPhase(np);
      setShowBtns((raw.includes("Forbid / Allow / Modify?") || raw.includes("Forbid, Allow, or Modify?")) && !b);
    } catch {
      setMsgs((p) => [...p, { role: "assistant", content: "Connection issue. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const startSession = () => {
    setPhase(0); setMsgs([]); setDn(0); setO1(""); setO2(""); setDone(false);
    setScreen("chat");
    send("Begin the workflow. Run the opening greeting and optional profile questions exactly as instructed.");
  };

  const handleCopy = async (which) => {
    const text = which === "o1" ? o1 : o2;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopyState((p) => ({ ...p, [which]: true }));
      setTimeout(() => setCopyState((p) => ({ ...p, [which]: false })), 2000);
    }
  };

  const dlPDF = (content, title, sub) => {
    if (!content) { alert("Complete the full workflow first."); return; }
    const html = generateDocHTML(content, title, sub);
    const win = window.open("", "_blank");
    if (!win) { alert("Pop-up blocked. Allow pop-ups for this site and try again."); return; }
    win.document.write(html);
    win.document.close();
    win.onload = () => { try { win.focus(); win.print(); } catch {} };
  };

  const dlDoc = (content, fname, title, sub) => {
    if (!content) { alert("Complete the full workflow first."); return; }
    const html = generateDocHTML(content, title, sub);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = fname;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // ── TOP BAR ────────────────────────────────────────────────────────────────
  const TopBar = ({ activePhase = 0, decisions = 0, right = null, showRestart = false }) => {
    const allDone = activePhase > 6;
    const overallPct = allDone ? 100 : Math.max(0, ((activePhase - 1) / 6) * 100);
    const phaseName = activePhase > 0 && activePhase <= 6 ? PHASE_LABELS[activePhase] : "";
    const subProgress = activePhase === 2 ? Math.min(100, (decisions / 14) * 100) : 0;
    return (
      <div style={{ padding: ".875rem 1.25rem", display: "flex", alignItems: "center", gap: "1.25rem", borderBottom: "1px solid #e5e7eb", background: "#fff", flexShrink: 0 }}>
        <span style={{ fontSize: "13px", fontWeight: "800", color: "#111", letterSpacing: "-.02em", flexShrink: 0 }}>Not Theirs Studio</span>
        {activePhase > 0 && !allDone && (
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem", flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#6B4EE6", letterSpacing: "-.01em", whiteSpace: "nowrap", flexShrink: 0 }}>{phaseName}</span>
            <div style={{ flex: 1, maxWidth: "260px", height: "4px", background: "#f3f4f6", borderRadius: "2px", overflow: "hidden", position: "relative" }}>
              <div style={{ height: "100%", width: `${overallPct}%`, background: "linear-gradient(90deg,#2E1F5E,#6B4EE6)", borderRadius: "2px", transition: "width .4s ease" }} />
              {activePhase === 2 && (
                <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${(1/6)*subProgress}%`, background: "rgba(107,78,230,.35)", borderRadius: "2px", transition: "width .4s ease" }} />
              )}
            </div>
            <span style={{ fontSize: "11.5px", fontWeight: "600", color: "#9ca3af", whiteSpace: "nowrap", flexShrink: 0 }}>
              Step {Math.min(activePhase, 6)} of 6{activePhase === 2 ? ` · ${Math.min(decisions, 14)}/14` : ""}
            </span>
          </div>
        )}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: ".75rem", flexShrink: 0 }}>
          {right}
          {showRestart && (
            <button onClick={startSession} title="Start over" style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: "6px", padding: ".35rem .625rem", color: "#9ca3af", fontSize: "13px", cursor: "pointer" }}>↺</button>
          )}
        </div>
      </div>
    );
  };


  // ── OPENING SCREEN ─────────────────────────────────────────────────────────
  if (screen === "opening") return (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,.12)", fontFamily: "Inter,-apple-system,sans-serif", minHeight: "calc(100vh - 56px)", background: "#fff" }}>
      <style>{GLOBAL_CSS}</style>
      <TopBar />
      <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "3rem 3rem 2.5rem", flex: "1", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "640px" }}>

          <h1 style={{ fontSize: "34px", fontWeight: "800", color: "#111", lineHeight: "1.1", margin: "0 0 .875rem", letterSpacing: "-.035em" }}>
            Your voice, <span style={{ background: "linear-gradient(135deg,#2E1F5E,#6B4EE6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>not theirs.</span>
          </h1>
          <p style={{ fontSize: "16px", color: "#4b5563", lineHeight: "1.55", margin: "0 0 2.25rem", maxWidth: "520px" }}>
            A short walkthrough that gives any AI tool your actual writing voice. Built once, paste anywhere.
          </p>

          <p style={{ fontSize: "11px", fontWeight: "700", color: "#9ca3af", letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 1rem" }}>How it works</p>
          <div style={{ display: "flex", flexDirection: "column", gap: ".875rem", marginBottom: "2rem" }}>
            {[
              { n: 1, title: "Tell me about your writing", desc: "A few questions about your style plus 2-3 samples you've already written." },
              { n: 2, title: "Decide what to block", desc: "I'll walk you through the AI patterns that make writing sound generic. You pick what stays out." },
              { n: 3, title: "Get your two documents", desc: "A Forbidden List and a Voice Signature. Paste them into ChatGPT, Claude, or any AI tool. Your voice goes wherever you go." },
            ].map((s) => (
              <div key={s.n} style={{ display: "flex", alignItems: "flex-start", gap: ".875rem" }}>
                <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#f0edff", color: "#6B4EE6", fontSize: "13px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>{s.n}</div>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: "700", color: "#111", margin: "0 0 .2rem", letterSpacing: "-.01em" }}>{s.title}</p>
                  <p style={{ fontSize: "13.5px", color: "#6b7280", margin: "0", lineHeight: "1.55" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button className="start-btn" onClick={startSession} style={{ background: "linear-gradient(135deg,#2E1F5E,#6B4EE6)", borderRadius: "10px", padding: ".75rem 1.5rem", color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer", border: "none", letterSpacing: "-.01em", boxShadow: "0 4px 14px rgba(46,31,94,.35)" }}>
              Start
            </button>
            <span style={{ fontSize: "12.5px", color: "#9ca3af" }}>About 10 minutes. Nothing is saved.</span>
          </div>
        </div>
      </div>
    </div>
  );

  // ── TRANSITION SCREEN ──────────────────────────────────────────────────────
  if (screen === "transition") return (
    <div style={{ background: "#2E1F5E", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,.15)", minHeight: "440px", display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "Inter,-apple-system,sans-serif" }}>
      <style>{GLOBAL_CSS}</style>

      <div className="t-studio" style={{ padding: "1.5rem 2rem", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <span style={{ fontSize: "15px", fontWeight: "800", color: "rgba(255,255,255,.4)", letterSpacing: "-.03em" }}>Not Theirs Studio</span>
      </div>

      <div style={{ padding: "3rem 2.5rem", flex: "1", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <p className="t-l1" style={{ fontSize: "32px", fontWeight: "800", color: "#fff", lineHeight: "1.15", margin: "0 0 1.25rem", letterSpacing: "-.04em" }}>
          Every AI has defaults.
        </p>
        <p className="t-l2" style={{ fontSize: "28px", fontWeight: "700", color: "#C5B4F5", lineHeight: "1.2", margin: "0 0 2.5rem", letterSpacing: "-.03em" }}>
          Most people don't know what theirs are yet.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div className="t-rule" style={{ height: "2px", background: "rgba(255,255,255,.2)", flexShrink: "0", borderRadius: "2px" }} />
          <p className="t-sub" style={{ fontSize: "15px", fontWeight: "500", color: "rgba(255,255,255,.45)", margin: "0", lineHeight: "1.5", letterSpacing: "-.01em" }}>
            You're about to do it differently.
          </p>
        </div>
      </div>

      <div className="t-foot" style={{ padding: "1.5rem 2rem", borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "11px", fontWeight: "600", color: "rgba(255,255,255,.25)", letterSpacing: ".1em", textTransform: "uppercase" }}>The Signature Method · Voice</span>
        <div style={{ display: "flex", gap: "5px" }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: "5px", height: "5px", borderRadius: "50%", background: i === 1 ? "rgba(255,255,255,.6)" : "rgba(255,255,255,.2)" }} />
          ))}
        </div>
      </div>
    </div>
  );

  // ── COMPLETION SCREEN ──────────────────────────────────────────────────────
  if (screen === "completion") return (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,.12)", fontFamily: "Inter,-apple-system,sans-serif", minHeight: "calc(100vh - 56px)", background: "#fff" }}>
      <style>{GLOBAL_CSS}</style>
      <TopBar activePhase={7} right={<span style={{ fontSize: "12px", fontWeight: "700", color: "#6B4EE6", background: "#f0edff", padding: ".35rem .875rem", borderRadius: "20px" }}>Session complete ✓</span>} />
      <div style={{ flex: "1", background: "#fff", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      <div style={{ padding: "2.5rem 2rem 3rem", overflowY: "auto", maxWidth: "780px" }}>
        <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B4EE6", letterSpacing: ".14em", textTransform: "uppercase", margin: "0 0 .75rem" }}>You're done.</p>
        <h2 style={{ fontSize: "30px", fontWeight: "800", color: "#111", lineHeight: "1.15", margin: "0 0 .75rem", letterSpacing: "-.035em" }}>
          Here's <span style={{ background: "linear-gradient(135deg,#2E1F5E,#6B4EE6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>your voice system</span>.
        </h2>
        <p style={{ fontSize: "15px", color: "#4b5563", lineHeight: "1.6", margin: "0 0 2rem", maxWidth: "580px" }}>
          One document. Everything that makes your writing yours, written as instructions an AI can follow. Save it. Then load it into whatever AI tool you use.
        </p>

        {/* THE DELIVERABLE */}
        <div style={{ background: "linear-gradient(135deg,#2E1F5E,#3a2877)", borderRadius: "16px", padding: "1.75rem", marginBottom: "2.25rem", boxShadow: "0 8px 28px rgba(46,31,94,.3)" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1.25rem" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: "700", color: "#C5B4F5", letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 .4rem" }}>Your file</p>
              <p style={{ fontSize: "22px", fontWeight: "800", color: "#fff", margin: "0 0 .3rem", letterSpacing: "-.02em" }}>Your Voice System</p>
              <p style={{ fontSize: "13px", color: "rgba(197,180,245,.85)", margin: "0", fontFamily: "ui-monospace,SFMono-Regular,Menlo,monospace" }}>your-voice-system.pdf</p>
            </div>
            <div style={{ fontSize: "32px", lineHeight: "1", flexShrink: 0 }}>📄</div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              className="copy-btn"
              onClick={() => handleCopy("o1")}
              style={{ flex: 1, background: copyState.o1 ? "rgba(107,78,230,.5)" : "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.25)", borderRadius: "10px", padding: ".75rem", color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer", letterSpacing: "-.01em" }}
            >
              {copyState.o1 ? "Copied ✓" : "📋  Copy text"}
            </button>
            <button
              onClick={() => dlPDF(o1, "Your Voice System", "Built with The Signature Method by Not Theirs Studio")}
              style={{ flex: 1, background: "#fff", border: "none", borderRadius: "10px", padding: ".75rem", color: "#2E1F5E", fontSize: "14px", fontWeight: "700", cursor: "pointer", letterSpacing: "-.01em", boxShadow: "0 2px 8px rgba(0,0,0,.15)" }}
            >
              ⬇  Download PDF
            </button>
          </div>
          <p style={{ fontSize: "11.5px", color: "rgba(197,180,245,.65)", margin: ".875rem 0 0", lineHeight: "1.5" }}>
            Tip: when the print window opens, choose "Save as PDF" as your destination.
          </p>
        </div>

        {/* HOW TO USE IT */}
        <p style={{ fontSize: "11px", fontWeight: "700", color: "#9ca3af", letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 1rem" }}>How to use it</p>
        <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: "1.6", margin: "0 0 1rem" }}>
          Never done this before? Don't worry. Pick the tool you use most. The "instructions" or "system prompt" field is where this goes — that's the spot where you tell the AI how to behave for every conversation.
        </p>
        <div style={{ display: "grid", gap: ".75rem", marginBottom: "2.25rem" }}>
          {[
            { name: "ChatGPT", how: "If you have a Custom GPT, click Configure → paste into Instructions. Otherwise, in any chat, open Settings → Customize ChatGPT → paste into \"How would you like ChatGPT to respond?\"" },
            { name: "Claude", how: "Open or create a Project → Project Settings → Custom Instructions → paste in. Or upload the PDF to the project's knowledge files." },
            { name: "Cursor / Windsurf", how: "Add the contents as a .cursorrules file at the root of your project, or paste into the assistant's system prompt setting." },
            { name: "Anything else", how: "Look for \"system prompt,\" \"instructions,\" \"persona,\" or \"behavior\" in the AI tool's settings. Paste it there. If there's no such field, paste it as the first message in any new chat." },
          ].map((t) => (
            <div key={t.name} style={{ background: "#fafafa", border: "1px solid #f3f4f6", borderRadius: "10px", padding: "1rem 1.125rem" }}>
              <p style={{ fontSize: "13.5px", fontWeight: "700", color: "#111", margin: "0 0 .35rem", letterSpacing: "-.01em" }}>{t.name}</p>
              <p style={{ fontSize: "13px", color: "#6b7280", margin: "0", lineHeight: "1.55" }}>{t.how}</p>
            </div>
          ))}
        </div>

        {/* YOUR VOICE PROFILE (reference content inline) */}
        {o2 && (
          <>
            <p style={{ fontSize: "11px", fontWeight: "700", color: "#9ca3af", letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 1rem" }}>Your voice profile</p>
            <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: "1.6", margin: "0 0 1rem" }}>
              For you, not the AI. This is the analysis behind what's in your document. Keep it as your calibration baseline. When your AI starts drifting, compare what it produces against this.
            </p>
            <div style={{ background: "#fafafa", border: "1px solid #f3f4f6", borderRadius: "12px", padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
              <pre style={{ fontSize: "13px", color: "#374151", lineHeight: "1.7", whiteSpace: "pre-wrap", fontFamily: "Inter,sans-serif", margin: "0" }}>{o2}</pre>
            </div>
            <div style={{ display: "flex", gap: "10px", marginBottom: "2rem" }}>
              <button
                className="copy-btn"
                onClick={() => handleCopy("o2")}
                style={{ background: copyState.o2 ? "#f0edff" : "#fff", border: `1px solid ${copyState.o2 ? "#6B4EE6" : "#e5e7eb"}`, borderRadius: "8px", padding: ".55rem 1rem", color: copyState.o2 ? "#6B4EE6" : "#374151", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
              >
                {copyState.o2 ? "Copied ✓" : "Copy profile"}
              </button>
              <button
                onClick={() => dlPDF(o2, "Your Voice Profile", "Reference document by Not Theirs Studio")}
                style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: ".55rem 1rem", color: "#374151", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
              >
                Save profile as PDF
              </button>
            </div>
          </>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "1.5rem", borderTop: "1px solid #f3f4f6" }}>
          <span style={{ fontSize: "12px", color: "#9ca3af", fontWeight: "500" }}>Built with The Signature Method · Not Theirs Studio</span>
          <button className="restart-btn" onClick={startSession} style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: "8px", padding: ".5rem 1rem", color: "#6b7280", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
            Start a new session
          </button>
        </div>
      </div>
      </div>
    </div>
  );

  // ── CHAT SCREEN ────────────────────────────────────────────────────────────
  return (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,.12)", height: "calc(100vh - 56px)", minHeight: "560px", fontFamily: "Inter,-apple-system,sans-serif", background: "#fff" }}>
      <style>{GLOBAL_CSS}</style>
      <TopBar activePhase={phase} decisions={dn} showRestart={true} />

      <div style={{ flex: "1", background: "#fff", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Messages */}
      <div style={{ flex: "1", overflowY: "auto", padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem", background: "#f9fafb", position: "relative" }}>

        {/* Phase interstitial */}
        {showI && (
          <div style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center", zIndex: "10", background: "rgba(46,31,94,.94)", backdropFilter: "blur(6px)", animation: "iIn .35s ease forwards", padding: "1.5rem" }}>
            <div style={{ textAlign: "center", padding: "2rem 2.25rem", maxWidth: "440px", width: "100%" }}>
              <p style={{ fontSize: "11px", fontWeight: "700", color: "#C5B4F5", letterSpacing: ".18em", textTransform: "uppercase", margin: "0 0 .875rem" }}>{iMsg.title || "Next up"}</p>
              <p style={{ fontSize: "28px", fontWeight: "800", color: "#fff", margin: "0 0 1rem", lineHeight: "1.15", letterSpacing: "-.03em" }}>{iMsg.main}</p>
              <p style={{ fontSize: "14px", fontWeight: "500", color: "rgba(255,255,255,.78)", margin: "0 0 1.25rem", lineHeight: "1.6" }}>{iMsg.sub}</p>
              {iMsg.direction && (
                <div style={{ background: "rgba(107,78,230,.22)", border: "1px solid rgba(197,180,245,.3)", borderRadius: "10px", padding: ".75rem 1rem", margin: "0 0 1.5rem", display: "flex", alignItems: "flex-start", gap: ".5rem", textAlign: "left" }}>
                  <span style={{ color: "#C5B4F5", fontSize: "14px", fontWeight: "800", flexShrink: 0 }}>→</span>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#fff", lineHeight: "1.5" }}>{iMsg.direction}</span>
                </div>
              )}
              <button
                onClick={() => setShowI(false)}
                style={{ background: "rgba(255,255,255,.95)", color: "#2E1F5E", border: "none", borderRadius: "10px", padding: ".625rem 1.5rem", fontSize: "14px", fontWeight: "700", cursor: "pointer", letterSpacing: "-.01em", boxShadow: "0 4px 14px rgba(0,0,0,.2)" }}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {msgs.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: "8px" }}>
            {msg.role === "assistant" && (
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg,#2E1F5E,#6B4EE6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>
                <span style={{ fontSize: "10px", color: "#fff", fontWeight: "800" }}>NS</span>
              </div>
            )}
            <div style={{
              maxWidth: "80%",
              background: msg.role === "user" ? "linear-gradient(135deg,#2E1F5E,#6B4EE6)" : "#fff",
              borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "4px 18px 18px 18px",
              padding: ".75rem 1rem",
              fontSize: "14px",
              color: msg.role === "user" ? "#fff" : "#111",
              lineHeight: "1.65",
              boxShadow: msg.role === "user" ? "0 2px 8px rgba(46,31,94,.25)" : "0 1px 4px rgba(0,0,0,.06)",
              border: msg.role === "assistant" ? "1px solid #f3f4f6" : "none",
            }}>
              <div style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: renderMD(msg.content, msg.role === "assistant") }} />
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg,#2E1F5E,#6B4EE6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "10px", color: "#fff", fontWeight: "800" }}>NS</span>
            </div>
            <div style={{ background: "#fff", border: "1px solid #f3f4f6", borderRadius: "4px 18px 18px 18px", padding: ".75rem 1rem", display: "flex", gap: "5px", alignItems: "center", boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} className="dot" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#C5B4F5" }} />
              ))}
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Decision buttons */}
      {showBtns && !loading && (
        <div style={{ padding: ".75rem 1.5rem", borderTop: "1px solid #f3f4f6", background: "#fff", flexShrink: "0" }}>
          {phase === 2 && (
            <div style={{ marginBottom: ".625rem", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "11px", fontWeight: "600", color: "#9ca3af" }}>Default review · {dn} decisions made</span>
              <div style={{ flex: "1", height: "3px", background: "#f3f4f6", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.min((dn / 14) * 100, 100)}%`, background: "linear-gradient(90deg,#2E1F5E,#6B4EE6)", borderRadius: "3px", transition: "width .4s ease" }} />
              </div>
            </div>
          )}
          <div style={{ display: "flex", gap: "8px" }}>
            {[
              { label: "Forbid", bg: "linear-gradient(135deg,#2E1F5E,#6B4EE6)", color: "#fff", shadow: "0 2px 8px rgba(46,31,94,.25)" },
              { label: "Modify", bg: "#f3f0ff", color: "#2E1F5E" },
              { label: "Allow", bg: "#f3f4f6", color: "#4b5563" },
            ].map((btn) => (
              <button
                key={btn.label}
                className="dbtn"
                onClick={() => { if (phase === 2) setDn((p) => p + 1); send(btn.label); }}
                style={{ background: btn.bg, border: "1px solid transparent", borderRadius: "10px", padding: ".55rem 1.25rem", fontSize: "14px", color: btn.color, fontWeight: "600", letterSpacing: "-.01em", boxShadow: btn.shadow || "none" }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input row */}
      <div style={{ padding: ".875rem 1.5rem", borderTop: showBtns ? "none" : "1px solid #f3f4f6", display: "flex", gap: "8px", flexShrink: "0", background: "#fff", alignItems: "center" }}>
        <button
          className="restart-btn"
          onClick={startSession}
          title="Start over"
          style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: "8px", padding: ".5rem .625rem", color: "#9ca3af", fontSize: "14px", cursor: "pointer", flexShrink: "0" }}
        >
          ↺
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey && input.trim() && !loading) { e.preventDefault(); send(input.trim()); } }}
          placeholder={showBtns ? "Or type your own response..." : "Type your response..."}
          disabled={loading}
          style={{ flex: "1", border: "1.5px solid #e5e7eb", borderRadius: "10px", padding: ".75rem 1rem", fontSize: "14px", color: "#111", background: "#fafafa", fontWeight: "500", transition: "all .15s" }}
        />
        <button
          onClick={() => input.trim() && !loading && send(input.trim())}
          disabled={loading || !input.trim()}
          style={{ background: input.trim() && !loading ? "linear-gradient(135deg,#2E1F5E,#6B4EE6)" : "#f3f4f6", border: "none", borderRadius: "10px", padding: ".75rem 1.125rem", color: input.trim() && !loading ? "#fff" : "#9ca3af", fontSize: "16px", cursor: input.trim() && !loading ? "pointer" : "default", transition: "all .15s", flexShrink: "0", boxShadow: input.trim() && !loading ? "0 2px 8px rgba(46,31,94,.25)" : "none" }}
        >
          →
        </button>
      </div>
      </div>
    </div>
  );
}
