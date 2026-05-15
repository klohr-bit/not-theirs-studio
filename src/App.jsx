import { useState, useRef, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// SYSTEM PROMPT
// ─────────────────────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are running "Your Voice, Not Theirs" by Not Theirs Studio. Build a Forbidden List and Voice Signature for a small business owner.

RULES — follow in every single response:
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
After they pick, ask about secondary elements. Before asking for samples, say: "Find 2-3 things you wrote quickly and didn't heavily edit — a Slack message, an email draft, a social post written in one sitting. The less polished the better. That's where your actual voice lives." Ask for 2-3 writing samples (no AI help). Analyze: sentence length, punctuation, vocabulary, rhythm, tone, absences. Extract VOICE SIGNATURE — specific positive moves.

Deliver:
**YOUR VOICE: WHAT I SEE**
---
**Primary type:** [archetype + one-line confirmation]
**Sentences:** [observation] | **Punctuation:** [observation] | **Vocabulary:** [observation] | **Rhythm:** [observation] | **Tone:** [observation] | **What you don't do:** [absence]
---
**YOUR VOICE SIGNATURE**
*The specific moves that make your writing yours.*
- [move 1 — specific and named]
- [move 2]
- [move 3]
- [move 4]
---
Ask if the summary lands. If they say anything is off, revise the specific elements they correct and redelivery the full updated summary before moving to Phase 2. Don't proceed until they confirm it's accurate.

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
[Insert the 4-5 signature moves from Phase 1]
Structural approach: [one sentence]
Vocabulary: [one sentence]
Rhythm: Vary sentence length. Short sentences land emphasis. Never three short sentences in a row without variation.
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

PHASE 6 — open:
**PHASE 6: SAMPLE PIECES**
---
Before you paste anything anywhere, I'm going to show you what the system produces. Three pieces in your voice using everything we just built.

Tell me: 1. An email situation — who and what? 2. A social post topic. 3. A copy or content piece — what and where?

Generate all three using the complete system. After delivering all three samples, ask: "Compare the email to something you actually wrote recently. Does it sound like the same person?" Wait for their response. If they say yes, proceed to Output 2. If they say it's off, ask what specifically feels wrong, make one round of targeted revisions, then proceed. Then produce Output 2 in XML:

<output2>
OUTPUT 2: YOUR REFERENCE DOCUMENT
Save this for yourself. Not for the GPT — for you.
---
YOUR VOICE SYSTEM: REFERENCE
Built with The Signature Method by Not Theirs Studio
---
YOUR VOICE TYPE: [primary + secondary elements]
WHAT I NOTICED: [4-6 specific observations]
YOUR VOICE SIGNATURE: [the named signature moves]
WHAT YOU FORBADE: [plain-language summary]
WHAT YOU KEPT: [items allowed]
WHAT YOU ADDED: [Phase 3 items]
CONTEXT MODES: [each mode and what it changes]
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
  const [previewTab, setPreviewTab] = useState("o1");
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
    setScreen("transition"); setPhase(0); setMsgs([]); setDn(0); setO1(""); setO2(""); setDone(false);
    setTimeout(() => {
      setScreen("chat");
      send("Begin the workflow. Run the opening greeting and optional profile questions exactly as instructed.");
    }, 5500);
  };

  const handleCopy = async (which) => {
    const text = which === "o1" ? o1 : o2;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopyState((p) => ({ ...p, [which]: true }));
      setTimeout(() => setCopyState((p) => ({ ...p, [which]: false })), 2000);
    }
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

  // ── SHARED HEADER ──────────────────────────────────────────────────────────
  const Header = ({ right }) => (
    <div style={{ background: "#fff", padding: ".875rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e5e7eb" }}>
      <span style={{ fontSize: "15px", fontWeight: "800", color: "#111", letterSpacing: "-.03em" }}>Not Theirs Studio</span>
      {right}
    </div>
  );

  // ── PHASE BAR ──────────────────────────────────────────────────────────────
  const Sidebar = ({ activePhase = 0, decisions = 0 }) => {
    const steps = [
      [1, "Voice Calibration", null],
      [2, "Default Review", { current: decisions, total: 14 }],
      [3, "Personal Additions", null],
      [4, "Build Your System", null],
      [5, "Context Modes", null],
      [6, "Sample Pieces", null],
    ];
    const allDone = activePhase > 6;
    const stepsDone = Math.max(0, Math.min(6, activePhase - 1));
    const overallPct = allDone ? 100 : (stepsDone / 6) * 100;
    return (
    <div style={{ width: "224px", minWidth: "224px", background: "#1e2130", display: "flex", flexDirection: "column", flexShrink: "0" }}>
      <div style={{ padding: "1.25rem 1.125rem 1rem", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <p style={{ fontSize: "14px", fontWeight: "800", color: "#fff", margin: "0", letterSpacing: "-.02em" }}>Not Theirs Studio</p>
      </div>
      <div style={{ padding: ".875rem 1rem", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ background: "rgba(107,78,230,.3)", borderRadius: "8px", padding: ".625rem .875rem", border: "1px solid rgba(107,78,230,.4)" }}>
          <p style={{ fontSize: "13px", fontWeight: "700", color: "#fff", margin: "0", letterSpacing: "-.01em" }}>Your Voice, Not Theirs</p>
        </div>
      </div>
      <div style={{ padding: ".875rem 1rem", flex: "1" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "0 0 .5rem" }}>
          <p style={{ fontSize: "10px", fontWeight: "700", color: "rgba(255,255,255,.3)", letterSpacing: ".1em", textTransform: "uppercase", margin: "0" }}>Phases</p>
          <span style={{ fontSize: "10px", fontWeight: "600", color: "rgba(255,255,255,.4)", letterSpacing: "-.01em" }}>
            {allDone ? "Done" : activePhase > 0 ? `${Math.min(activePhase, 6)} of 6` : "Not started"}
          </span>
        </div>
        <div style={{ height: "3px", background: "rgba(255,255,255,.08)", borderRadius: "3px", overflow: "hidden", margin: "0 0 .875rem" }}>
          <div style={{ height: "100%", width: `${overallPct}%`, background: "linear-gradient(90deg,#6B4EE6,#8E6FF0)", borderRadius: "3px", transition: "width .5s ease" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          {steps.map(([n, label, sub]) => {
            const isActive = n === activePhase;
            const isDone = n < activePhase || allDone;
            const subPct = sub && isActive ? Math.min(100, (sub.current / sub.total) * 100) : 0;
            return (
              <div key={n}>
                <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: ".45rem .5rem .45rem calc(.5rem - 2px)", borderRadius: "7px", background: isActive ? "rgba(107,78,230,.22)" : "transparent", borderLeft: isActive ? "3px solid #6B4EE6" : "3px solid transparent", borderTop: isActive ? "1px solid rgba(107,78,230,.3)" : "1px solid transparent", borderRight: isActive ? "1px solid rgba(107,78,230,.3)" : "1px solid transparent", borderBottom: isActive ? "1px solid rgba(107,78,230,.3)" : "1px solid transparent", transition: "background .2s ease" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "5px", background: isActive ? "#6B4EE6" : isDone ? "rgba(107,78,230,.4)" : "rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0", boxShadow: isActive ? "0 0 0 3px rgba(107,78,230,.18)" : "none", transition: "box-shadow .2s ease" }}>
                    <span style={{ fontSize: "10px", fontWeight: "800", color: isDone || isActive ? "#fff" : "rgba(255,255,255,.6)" }}>{isDone ? "✓" : n}</span>
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: isActive ? "700" : "500", color: isActive ? "#fff" : isDone ? "rgba(255,255,255,.85)" : "rgba(255,255,255,.55)" }}>{label}</span>
                </div>
                {sub && isActive && (
                  <div style={{ margin: ".3rem .5rem 0 2.1875rem", display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ flex: 1, height: "2px", background: "rgba(255,255,255,.1)", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${subPct}%`, background: "linear-gradient(90deg,#6B4EE6,#8E6FF0)", borderRadius: "2px", transition: "width .4s ease" }} />
                    </div>
                    <span style={{ fontSize: "9px", fontWeight: "700", color: "rgba(197,180,245,.7)", letterSpacing: "-.01em", flexShrink: 0 }}>{Math.min(sub.current, sub.total)}/{sub.total}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ padding: ".875rem 1rem", borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", flexDirection: "column", gap: "4px" }}>
        <button onClick={startSession} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: ".375rem .5rem", borderRadius: "6px", display: "flex", alignItems: "center", gap: "7px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,.35)" }}>↺</span>
          <span style={{ fontSize: "12px", fontWeight: "500", color: "rgba(255,255,255,.35)" }}>Start over</span>
        </button>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,.2)", margin: "0 0 0 .5rem", fontWeight: "500" }}>nottheirsstudio.com</p>
      </div>
    </div>
    );
  };

  const PhaseBar = () => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {phase > 0 && (
        <span style={{ fontSize: "12px", fontWeight: "600", color: "#6B4EE6", letterSpacing: "-.01em" }}>
          {PHASE_LABELS[phase]}
        </span>
      )}
      <div style={{ display: "flex", gap: "4px" }}>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} style={{ width: "20px", height: "3px", borderRadius: "3px", background: n < phase ? "#2E1F5E" : n === phase ? "#6B4EE6" : "#e5e7eb", transition: "background .4s ease" }} />
        ))}
      </div>
    </div>
  );

  // ── OPENING SCREEN ─────────────────────────────────────────────────────────
  if (screen === "opening") return (
    <div style={{ display: "flex", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,.12)", fontFamily: "Inter,-apple-system,sans-serif", minHeight: "calc(100vh - 56px)" }}>
      <style>{GLOBAL_CSS}</style>

      {/* SIDEBAR */}
      <div style={{ width: "224px", minWidth: "224px", background: "#1e2130", display: "flex", flexDirection: "column", flexShrink: "0" }}>

        <div style={{ padding: "1.25rem 1.125rem 1rem", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
          <p style={{ fontSize: "14px", fontWeight: "800", color: "#fff", margin: "0", letterSpacing: "-.02em" }}>Not Theirs Studio</p>
        </div>

        <div style={{ padding: ".875rem 1rem", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
          <div style={{ background: "rgba(107,78,230,.3)", borderRadius: "8px", padding: ".625rem .875rem", border: "1px solid rgba(107,78,230,.4)" }}>
            <p style={{ fontSize: "13px", fontWeight: "700", color: "#fff", margin: "0", letterSpacing: "-.01em" }}>Your Voice, Not Theirs</p>
          </div>
        </div>

        <div style={{ padding: ".875rem 1rem", flex: "1" }}>
          <p style={{ fontSize: "10px", fontWeight: "700", color: "rgba(255,255,255,.3)", letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 .75rem" }}>Phases</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {[
              [1, "Voice Calibration", false],
              [2, "Default Review", false],
              [3, "Personal Additions", false],
              [4, "Build Your System", true],
              [5, "Context Modes", false],
              [6, "Sample Pieces", false],
            ].map(([n, label, anchor]) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: "9px", padding: ".45rem .5rem", borderRadius: "7px", background: anchor ? "rgba(107,78,230,.2)" : "transparent", border: anchor ? "1px solid rgba(107,78,230,.3)" : "1px solid transparent" }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "5px", background: anchor ? "#6B4EE6" : "rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>
                  <span style={{ fontSize: "10px", fontWeight: "800", color: anchor ? "#fff" : "rgba(255,255,255,.6)" }}>{n}</span>
                </div>
                <span style={{ fontSize: "12px", fontWeight: anchor ? "700" : "500", color: anchor ? "#C5B4F5" : "rgba(255,255,255,.7)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: ".875rem 1rem", borderTop: "1px solid rgba(255,255,255,.08)" }}>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,.25)", margin: "0", fontWeight: "500" }}>nottheirsstudio.com</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: "1", background: "#fff", display: "flex", flexDirection: "column" }}>

        <div style={{ padding: ".75rem 1.5rem", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <span style={{ fontSize: "11px", fontWeight: "600", color: "#d1d5db", letterSpacing: ".06em", textTransform: "uppercase" }}>The Signature Method</span>
        </div>

        <div style={{ padding: "2rem 1.75rem", flex: "1", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "700px" }}>

          <h1 className="fu0" style={{ fontSize: "32px", fontWeight: "800", color: "#111", lineHeight: "1.1", margin: "0 0 .75rem", letterSpacing: "-.04em" }}>
            Your Voice,<br />
            <span style={{ background: "linear-gradient(135deg,#2E1F5E,#6B4EE6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Not Theirs.</span>
          </h1>
          <p className="fu1" style={{ fontSize: "14px", color: "#6b7280", lineHeight: "1.65", margin: "0 0 1.5rem", maxWidth: "340px" }}>
            Every other brand voice tool keeps your voice locked inside their platform. This builds something you own and can take anywhere.
          </p>

          {/* Deliverable card — light, no flash */}
          <div className="ca" style={{ background: "#fff", borderRadius: "12px", padding: "1rem", marginBottom: "1.25rem", border: "1.5px solid #e5e7eb", boxShadow: "0 2px 12px rgba(0,0,0,.06)" }}>
            <p style={{ fontSize: "11px", fontWeight: "700", color: "#9ca3af", letterSpacing: ".08em", textTransform: "uppercase", margin: "0 0 .75rem" }}>What you'll build</p>
            <div style={{ display: "flex", gap: "8px" }}>
              {[
                { name: "Forbidden List", desc: "The AI defaults your writing doesn't use. Blocked.", color: "#2E1F5E" },
                { name: "Voice Signature", desc: "The specific moves that make your writing yours.", color: "#6B4EE6" },
              ].map((item) => (
                <div key={item.name} style={{ flex: 1, background: "#f0edff", borderRadius: "9px", padding: ".75rem", border: "1px solid rgba(107,78,230,.15)" }}>
                  <p style={{ fontSize: "12px", fontWeight: "700", color: item.color, margin: "0 0 .2rem" }}>{item.name}</p>
                  <p style={{ fontSize: "11.5px", color: "#6b7280", margin: "0", lineHeight: "1.4" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="cf" style={{ display: "flex", alignItems: "center", gap: "1rem", background: "#fafafa", borderRadius: "12px", padding: ".875rem 1.125rem", border: "1px solid #f3f4f6" }}>
            <p style={{ fontSize: "13px", color: "#9ca3af", margin: "0", lineHeight: "1.5", flex: "1" }}>
              Two documents at the end. One for your AI tool. One for you.
            </p>
            <button className="start-btn" onClick={startSession} style={{ background: "linear-gradient(135deg,#2E1F5E,#6B4EE6)", borderRadius: "10px", padding: ".75rem 1.375rem", color: "#fff", fontSize: "14px", fontWeight: "700", whiteSpace: "nowrap", flexShrink: "0", boxShadow: "0 4px 14px rgba(46,31,94,.4)", cursor: "pointer", border: "none" }}>
              Start →
            </button>
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
    <div style={{ display: "flex", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,.12)", fontFamily: "Inter,-apple-system,sans-serif", minHeight: "calc(100vh - 56px)" }}>
      <style>{GLOBAL_CSS}</style>
      <Sidebar activePhase={7} />
      <div style={{ flex: "1", background: "#fff", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Header right={<span style={{ fontSize: "12px", fontWeight: "700", color: "#6B4EE6", background: "#f0edff", padding: ".35rem .875rem", borderRadius: "20px" }}>Session complete ✓</span>} />

      <div style={{ padding: "2rem 1.75rem", overflowY: "auto" }}>
        <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B4EE6", letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 .75rem" }}>Your voice system is built.</p>
        <h2 style={{ fontSize: "26px", fontWeight: "800", color: "#111", lineHeight: "1.2", margin: "0 0 1.75rem", letterSpacing: "-.03em" }}>
          Your <span style={{ color: "#2E1F5E" }}>Forbidden List</span> and <span style={{ color: "#6B4EE6" }}>Voice Signature</span> are ready.
        </h2>

        {/* In-app preview tabs */}
        <div style={{ background: "#f9fafb", borderRadius: "12px", overflow: "hidden", border: "1px solid #e5e7eb", marginBottom: "1.25rem" }}>
          <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb" }}>
            {[{ key: "o1", label: "Output 1: System Prompt" }, { key: "o2", label: "Output 2: Reference Doc" }].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setPreviewTab(tab.key)}
                style={{ flex: 1, padding: ".75rem 1rem", fontSize: "13px", fontWeight: previewTab === tab.key ? "700" : "500", color: previewTab === tab.key ? "#2E1F5E" : "#9ca3af", background: previewTab === tab.key ? "#fff" : "transparent", border: "none", cursor: "pointer", borderBottom: previewTab === tab.key ? "2px solid #2E1F5E" : "2px solid transparent", transition: "all .15s", letterSpacing: "-.01em" }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div style={{ padding: "1rem", maxHeight: "200px", overflowY: "auto" }}>
            <pre style={{ fontSize: "12px", color: "#374151", lineHeight: "1.6", whiteSpace: "pre-wrap", fontFamily: "Inter,sans-serif", margin: "0" }}>
              {previewTab === "o1" ? (o1 || "Complete the workflow to generate Output 1.") : (o2 || "Complete the workflow to generate Output 2.")}
            </pre>
          </div>
        </div>

        {/* Action cards */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "1.25rem" }}>
          {/* Output 1 */}
          <div style={{ flex: 1, background: "#2E1F5E", borderRadius: "12px", padding: "1.25rem", boxShadow: "0 4px 16px rgba(46,31,94,.25)" }}>
            <p style={{ fontSize: "11px", fontWeight: "700", color: "#C5B4F5", letterSpacing: ".08em", textTransform: "uppercase", margin: "0 0 .3rem" }}>Output 1</p>
            <p style={{ fontSize: "14px", fontWeight: "700", color: "#fff", margin: "0 0 .2rem", letterSpacing: "-.01em" }}>System Prompt</p>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,.5)", margin: "0 0 1rem", lineHeight: "1.4" }}>Paste into your AI tool.</p>
            <div style={{ display: "flex", gap: "6px" }}>
              <button
                className="copy-btn"
                onClick={() => handleCopy("o1")}
                style={{ flex: 1, background: copyState.o1 ? "rgba(107,78,230,.4)" : "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", borderRadius: "8px", padding: ".5rem", color: "#fff", fontSize: "12px", fontWeight: "600" }}
              >
                {copyState.o1 ? "Copied ✓" : "Copy"}
              </button>
              <button
                onClick={() => dlDoc(o1, "system-prompt.html", "Your System Prompt", "Paste this into your custom GPT or Claude Project")}
                style={{ flex: 1, background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", borderRadius: "8px", padding: ".5rem", color: "#fff", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
              >
                Download
              </button>
            </div>
          </div>

          {/* Output 2 */}
          <div style={{ flex: 1, background: "#fafafa", borderRadius: "12px", padding: "1.25rem", border: "1px solid #e5e7eb" }}>
            <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B4EE6", letterSpacing: ".08em", textTransform: "uppercase", margin: "0 0 .3rem" }}>Output 2</p>
            <p style={{ fontSize: "14px", fontWeight: "700", color: "#111", margin: "0 0 .2rem", letterSpacing: "-.01em" }}>Reference Document</p>
            <p style={{ fontSize: "12px", color: "#9ca3af", margin: "0 0 1rem", lineHeight: "1.4" }}>This one stays with you.</p>
            <div style={{ display: "flex", gap: "6px" }}>
              <button
                className="copy-btn"
                onClick={() => handleCopy("o2")}
                style={{ flex: 1, background: copyState.o2 ? "#f0edff" : "#fff", border: `1px solid ${copyState.o2 ? "#6B4EE6" : "#e5e7eb"}`, borderRadius: "8px", padding: ".5rem", color: copyState.o2 ? "#6B4EE6" : "#374151", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
              >
                {copyState.o2 ? "Copied ✓" : "Copy"}
              </button>
              <button
                onClick={() => dlDoc(o2, "reference-document.html", "Your Reference Document", "Your voice type, decisions, sample pieces, and maintenance guide")}
                style={{ flex: 1, background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: ".5rem", color: "#374151", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
              >
                Download
              </button>
            </div>
          </div>
        </div>

        <p style={{ fontSize: "13px", color: "#9ca3af", margin: "0 0 1.25rem", lineHeight: "1.6" }}>
          The samples in your Reference Document are your calibration baseline. When your AI starts drifting, compare what it produces to those.
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "1rem", borderTop: "1px solid #f3f4f6" }}>
          <span style={{ fontSize: "12px", color: "#d1d5db", fontWeight: "500" }}>Built with The Signature Method · Not Theirs Studio</span>
          <button className="restart-btn" onClick={startSession} style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: "8px", padding: ".5rem 1rem", color: "#9ca3af", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
            Start a new session
          </button>
        </div>
      </div>
      </div>
    </div>
  );

  // ── CHAT SCREEN ────────────────────────────────────────────────────────────
  return (
    <div style={{ display: "flex", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,.12)", height: "calc(100vh - 56px)", minHeight: "560px", fontFamily: "Inter,-apple-system,sans-serif" }}>
      <style>{GLOBAL_CSS}</style>
      <Sidebar activePhase={phase} decisions={dn} />

      <div style={{ flex: "1", background: "#fff", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Header right={<PhaseBar />} />

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
                style={{ background: "#fff", color: "#2E1F5E", border: "none", borderRadius: "10px", padding: ".625rem 1.5rem", fontSize: "14px", fontWeight: "700", cursor: "pointer", letterSpacing: "-.01em", boxShadow: "0 4px 14px rgba(0,0,0,.25)" }}
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
              { label: "Forbid", bg: "linear-gradient(135deg,#2E1F5E,#6B4EE6)", color: "#fff", border: "none" },
              { label: "Modify", bg: "#fff", color: "#2E1F5E", border: "2px solid #2E1F5E" },
              { label: "Allow", bg: "#fff", color: "#6b7280", border: "1px solid #e5e7eb" },
            ].map((btn) => (
              <button
                key={btn.label}
                className="dbtn"
                onClick={() => { if (phase === 2) setDn((p) => p + 1); send(btn.label); }}
                style={{ background: btn.bg, border: btn.border, borderRadius: "10px", padding: ".5rem 1.25rem", fontSize: "14px", color: btn.color, fontWeight: "700", letterSpacing: "-.01em", boxShadow: btn.label === "Forbid" ? "0 2px 8px rgba(46,31,94,.25)" : "none" }}
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
