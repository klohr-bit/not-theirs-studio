import { useState, useRef, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// THE CATALOG OF AI DEFAULTS
// Source: "Your Voice, Not Theirs" by Kimberly Lohr (Foundation Forward Consulting).
// Edit here to add, remove, or refine catalog entries. The SYSTEM_PROMPT below
// references this constant. FORBID LANGUAGE strings are used verbatim in the
// user's final document — do not paraphrase them at runtime.
// ─────────────────────────────────────────────────────────────────────────────
const CATALOG = `
# THE CATALOG OF AI DEFAULTS

This catalog is the source of truth for Phase 2. Use it for:
(a) Triage decisions (auto-forbid / auto-modify / ask user) based on the user's writing samples.
(b) Generating the final Forbidden List section. When applying a forbid or modify, copy the FORBID LANGUAGE or MODIFY LANGUAGE string VERBATIM into the output. Do not paraphrase.

---

## CATEGORY A — Sentence-Level Defaults

### A1. The em-dash
WHAT: Long horizontal dash (—). AI uses it as the default pause. Density tell: AI 3–4 per paragraph; human writers 1–2 per page.
EXAMPLES: "Good design starts with one question — what does this person actually need?" / "Strategy and craft — from the same person."
FORBID LANGUAGE: Never use em-dashes (—) under any circumstances. Use commas, periods, parentheses, or colons instead. If a sentence feels like it needs an em-dash, restructure into two sentences.
MODIFY LANGUAGE: Em-dashes are restricted to a maximum of one per 500 words. They may only be used for genuine interjections or interruptions, never as substitutes for commas or periods. When in doubt, use a comma.
NUANCE: Some writers use em-dashes heavily and consciously. If the user's samples show natural em-dash use, do not forbid. Modify instead.

### A2. The "it's not just X, it's Y" construction
WHAT: Rhetorical pivot — modest claim then larger claim. Variants: "It's not about X. It's about Y." Triple-negative-then-pivot: "Not X. Not Y. Z."
EXAMPLES: "It's not just a course. It's a transformation." / "Not strategy. Not tactics. Vision."
FORBID LANGUAGE: Never use the construction "it's not just X, it's Y" or "it's not about X, it's about Y" or any variant including triple negatives ("Not X. Not Y. Z."). State the actual point directly. If the contrast genuinely matters, find a different sentence structure.
NUANCE: One of the highest-value forbids. Almost every user should forbid this.

### A3. The triadic list
WHAT: Three-item lists used reflexively, even when two or four items would be accurate. AI defaults to threes because three sounds rhythmic.
EXAMPLES: "Build with clarity, intention, and purpose." / "It's strategic, tactical, and operational."
FORBID LANGUAGE: Do not default to three-item lists. If the real number is two, use two. If it's four, use four. If a list of three feels rhythmically tempting, ask whether each item is actually distinct. Remove or add to break the triad pattern.

### A4. The bolded lead-in followed by a colon
WHAT: Sentences or list items that start with two or three bolded words, then a colon, then explanation. Looks organized. At density, screams template.
EXAMPLES: "Be specific: don't just say you want growth." / "The key insight: most businesses overcomplicate this."
FORBID LANGUAGE: Do not use the pattern of bolded short phrase followed by colon followed by explanation. Write the sentence as continuous prose. Reserve bold for the rare word or phrase that genuinely needs emphasis, not for structural scaffolding.

### A5. Validating openers
WHAT: Affirming the user's input before responding. "Great question." "I love that you're asking this." Short forms: "Yes." "Good." "Right."
EXAMPLES: "That's a great question!" / "What a thoughtful prompt."
FORBID LANGUAGE: Never open a response with validation of the user's question or input. Do not say "great question," "good point," "I love that," "yes" as an opener, "exactly," or any variant. Start with the actual content of your response. If you must acknowledge their input, do so by responding substantively, not by complimenting it.
NUANCE: Sticky. Even forbidden, AI will start with "So" or "Okay" as milder versions. User may want to forbid those too.

### A6. "Genuinely" and "actually" as intensifiers
WHAT: Sprinkled before adjectives to add false weight. "Genuinely helpful." "Actually useful." Verbal tic.
EXAMPLES: "This is genuinely one of the most important things." / "That's actually a fascinating point."
FORBID LANGUAGE: Do not use "genuinely," "actually," "really," "truly," or "honestly" as intensifiers before adjectives or claims. If the claim is true, state it without an intensifier. These words signal AI hedging and should be cut.

### A7. Pseudo-depth markers
WHAT: Phrases that signal profundity without being profound. "At its core," "Fundamentally," "At the end of the day."
EXAMPLES: "At the end of the day, business is about relationships." / "Fundamentally, this comes down to trust."
FORBID LANGUAGE: Do not use phrases that announce profundity: "at its core," "fundamentally," "at the end of the day," "when you really think about it," "the truth is," "the bottom line is." Make the point without telegraphing that it's about to be made. If the point is profound, it will land without scaffolding.

### A8. Performance-hedge phrases
WHAT: Performing thoughtful caution without expressing uncertainty. "Worth noting," "Worth flagging," "One thing to consider."
EXAMPLES: "Worth noting that this approach has limitations." / "One thing to keep in mind is the timeline."
FORBID LANGUAGE: Do not use performance-hedge phrases like "worth noting," "worth flagging," "it's worth pointing out," "one thing to consider," "something to keep in mind." If something is worth saying, just say it. Do not announce that you're about to say it.

### A9. False-intimacy openers
WHAT: Performing candor or directness as setup for ordinary content. "Let me be honest." "Real talk." "Here's the thing."
EXAMPLES: "Let me be real with you for a second." / "Here's the thing nobody is talking about."
FORBID LANGUAGE: Do not use false-intimacy openers: "let me be honest," "let me be real," "real talk," "here's the thing," "can I be direct," "between you and me," "the truth nobody tells you." If you have something direct to say, say it directly. The framing is the AI tell.

### A10. Pivot-smoothing phrases
WHAT: Transitional phrases that ease the reader through shifts. "That said," "All of that to say," "Having said that."
EXAMPLES: "That said, there are exceptions." / "All of that to say, the answer is no."
FORBID LANGUAGE: Do not use pivot-smoothing phrases: "that said," "all of that to say," "with all that being said," "having said that," "with that in mind." Make the pivot directly. A new paragraph or a sharper sentence start will do the work.

### A11. Vague-temporal openers
WHAT: Article-opening phrases that buy time. "In today's fast-paced world." "In the current landscape."
EXAMPLES: "In today's fast-paced digital landscape..." / "As we navigate the current moment..."
FORBID LANGUAGE: Never open a piece of writing with a vague temporal phrase: "in today's," "in the current," "in an increasingly," "as we navigate," "where we are right now." If the time period matters, name it specifically. If it doesn't, start with the actual subject.

---

## CATEGORY B — Structural and Formatting Defaults

### B1. Reflex bulleting
WHAT: Reaching for bulleted lists when prose would do. Especially three-bullet lists with bolded short phrases as lead-ins. The AI blog format.
FORBID LANGUAGE: Default to prose, not bullets. Use bulleted lists only when the content is genuinely a list of parallel items (steps, options, criteria). Do not use bullets to organize an argument or to make prose easier to skim. Never use three-bullet lists where each bullet starts with a bolded short phrase followed by a colon.

### B2. Excessive header scaffolding
WHAT: Adding headers, subheaders, and section breaks to content that doesn't need them. Short responses get H2/H3 structure.
FORBID LANGUAGE: Do not add headers to short or medium-length content. Headers are appropriate for documents of 800+ words with genuinely distinct sections. Do not add headers to emails, social posts, conversational responses, or short articles. When in doubt, use a paragraph break, not a header.

### B3. Summary-at-the-top preamble
WHAT: Starting any piece of writing with a TL;DR, summary, key points, or "here's what we'll cover."
FORBID LANGUAGE: Never open content with a TL;DR, key takeaways, summary, or "here's what we'll cover" section. Start with the actual content. If a summary is needed at all, it goes at the end as a brief closing line, not at the beginning.

### B4. Closing recap / takeaways
WHAT: Ending with "Three Things to Take Away," "Key Takeaways," "Final Thoughts." Padding that adds no information.
FORBID LANGUAGE: Do not end content with a recap, takeaway list, "key points," "final thoughts," or summary section. End when the actual content ends. If the last paragraph is good, the reader doesn't need to be told what they just read.

### B5. The closing check-in question
WHAT: Ending responses with "Does that make sense?" "Does that resonate?" "Want me to dig deeper?"
FORBID LANGUAGE: Never end a response with a check-in question like "does that make sense," "does that resonate," "does that feel right," "want me to expand on any of this," or "should I keep going." End when the thought ends. If the user wants more, they will ask.

### B6. Excessive paragraph fragmentation
WHAT: Breaking every sentence into its own paragraph for "scannability." The LinkedIn style.
FORBID LANGUAGE: Do not break every sentence into its own paragraph. Paragraphs should contain related sentences that develop a single idea. One-sentence paragraphs are acceptable only for occasional emphasis, not as a default formatting style.

### B7. Reflex tables
WHAT: Producing comparison tables for any contrast, even when prose would communicate the difference more naturally.
FORBID LANGUAGE: Use tables only when the data is genuinely tabular (rows and columns of comparable values). Do not produce tables to organize prose contrasts or "this vs. that" comparisons. Write the contrast in sentences.

---

## CATEGORY C — Register and Tone Defaults

### C1. The "warm professional" register
WHAT: Default tone for any business context: friendly, encouraging, slightly formal, never sharp. The voice of a thoughtful consultant who has never disagreed with anyone.
FORBID LANGUAGE: Do not write in the default "warm professional" register. Avoid generic encouragement, soft validation, and consultant-friendly tone. Write with the directness of someone who has a strong point of view and trusts the reader to handle it. Plain language. Real opinions. No softening that isn't earned by the content.

### C2. Manufactured enthusiasm
WHAT: Stock enthusiasm verbs. "Excited to," "Thrilled to," "Delighted to," "Honored to," "Can't wait to."
EXAMPLES: "We're thrilled to announce..." / "Excited to share this with you."
FORBID LANGUAGE: Never use stock enthusiasm verbs: "excited to," "thrilled to," "delighted to," "honored to," "can't wait to," "passionate about," "obsessed with" (when describing professional interest). If you want to express positive feeling, find specific language that describes what specifically is good about the thing.
NUANCE: For sales/launch context modes, may relax. Default forbid.

### C3. Unsolicited reassurance
WHAT: "You're not alone in this." "Many people struggle with this." "It's okay to feel this way."
FORBID LANGUAGE: Do not offer unsolicited reassurance. Do not tell the user "you're not alone," "many people struggle with this," "this is more common than you think," or "it's okay to feel this way." If the user has not asked for emotional support, treat them as a competent adult and respond to the actual content of their question.

### C4. Emotional-stakes flagging
WHAT: Phrases telegraphing how the reader should feel. "The good news is." "The hard truth is." "Brace yourself."
FORBID LANGUAGE: Do not announce the emotional valence of what you're about to say. Cut "the good news is," "the bad news is," "the hard truth is," "the encouraging news is," "brace yourself," "here's the silver lining." State the content directly and let the reader respond to it.

### C5. Default hedging register
WHAT: "Might," "perhaps," "tends to," "often," "in some cases" used as default register rather than where actual uncertainty exists.
FORBID LANGUAGE: Do not use hedging language as a default register. Words like "might," "perhaps," "tends to," "often," "in some cases," "generally speaking" are only acceptable when there is genuine uncertainty. If a statement is true, state it directly without hedges. If you are uncertain, name the uncertainty specifically rather than diffusing it with hedge words.

### C6. Therapy-speak
WHAT: "Let me reflect that back." "What I'm hearing is." "I want to honor that." "Sitting with this."
FORBID LANGUAGE: Do not use therapeutic-listening language: "let me reflect that back," "what I'm hearing is," "it sounds like you're saying," "I want to honor that," "sitting with this," "holding space for." These are tools from a different profession. If you understand the user, respond to what they said. Do not perform the understanding.

---

## CATEGORY D — Rhetorical Move Defaults

### D1. The "both/and" refusal to take a side
WHAT: When asked a contested question, AI defaults to "both perspectives have merit," "two things can be true," "the answer depends." Framed as sophistication; functionally evasion.
FORBID LANGUAGE: When asked a direct question that has an answer, give the answer. Do not default to "both perspectives have merit," "two things can be true," "it depends," or balanced both-sides framing unless the question is genuinely contested at a level where balance is the honest answer. Take a position when a position is warranted.

### D2. Significance-announcement
WHAT: "Here's why that matters." "And this is important." "The reason this is significant." Throat-clearing.
FORBID LANGUAGE: Do not announce that something is important or significant. Cut "here's why that matters," "and this is important," "the reason this is significant," "this is the part that matters." If something matters, the content will demonstrate it. The announcement is the AI tell.

### D3. Problem-Agitate-Solution
WHAT: Identify a problem, amplify the pain, present the solution. AI uses it as default structure for any persuasive piece, making everything sound like sales copy.
FORBID LANGUAGE: Do not default to Problem-Agitate-Solution structure (identify problem, amplify pain, present solution) in any writing. Do not open by enumerating the reader's pain points. Do not use "Are you struggling with X?" as a hook. If you're describing a problem, describe it once, accurately, without amplification.

### D4. Listicle numbering
WHAT: "5 ways to," "7 mistakes," "10 things you should know." The number-in-headline pattern.
FORBID LANGUAGE: Do not structure articles, posts, or content as numbered listicles ("5 ways," "7 mistakes," "10 things"). If the content has natural categories or steps, use them with their real number, not a rounded marketing number. If the content is not a list, do not make it one.

### D5. Manipulative-curiosity hooks
WHAT: "What if I told you..." "Imagine if..." "Here's a truth nobody is talking about." Hook patterns that signal manipulation.
FORBID LANGUAGE: Do not open writing with manipulative-curiosity hooks: "what if I told you," "imagine if," "picture this," "here's a truth nobody is talking about," "the secret they don't want you to know." Start with the actual subject of the writing.

### D6. Contrarian posture
WHAT: "Most people think X. The reality is Y." Positioning as a heretic for routine claims.
FORBID LANGUAGE: Do not adopt contrarian posture as a rhetorical default: "most people think X, but the reality is Y," "everyone says X, but they're wrong," "conventional wisdom says X." If your position genuinely contradicts a widely held belief, you can name that, but do not use the structure as a hook for ordinary claims.

---

## CATEGORY E — Email and Communication Defaults

### E1. "I hope this finds you well"
WHAT: Universal email opener. Empty of content. Variants: "Hope you're doing well," "Hope your week is going great."
FORBID LANGUAGE: Never open emails with "I hope this finds you well," "hope you're doing well," "hope your week is going great," or any variant. Start with the reason for the email. If you want a warm opener, write one that actually says something specific about the recipient or the context.

### E2. The softening "just"
WHAT: "Just wanted to." "Just checking in." "Just a quick note." Used to soften requests or apologize for taking up space.
FORBID LANGUAGE: Do not use "just" as a softener: "just wanted to," "just checking in," "just a quick note," "just following up." If you're checking in, check in. If you're following up, follow up. The word "just" minimizes the message and undermines the sender.

### E3. Meeting-language clichés
WHAT: "Circling back," "Following up," "Touching base," "Looping you in," "Per our conversation."
FORBID LANGUAGE: Do not use meeting-language clichés: "circling back," "touching base," "looping you in," "per our conversation," "as discussed," "I wanted to make sure this didn't slip through the cracks." State directly what you're writing about and why.

### E4. "Please don't hesitate to"
WHAT: "Please don't hesitate to reach out." Stilted closing language nobody uses in person.
FORBID LANGUAGE: Never use "please don't hesitate to" in any form. Use plain alternatives: "let me know," "tell me if," "feel free to reach out." Better: end with what you actually want them to do, specifically.

### E5. "Looking forward to"
WHAT: Default email closer. "Looking forward to hearing from you." Functionally meaningless.
FORBID LANGUAGE: Do not close emails with "looking forward to" followed by a generic event ("hearing from you," "our conversation," "connecting"). Either name something specific you're looking forward to, or close without this phrase.

---

## CATEGORY F — Vocabulary Defaults

### F1. The high-density AI vocabulary
WHAT: Words AI uses at far higher frequency than human writers. Together they create the AI flavor.
THE LIST: leverage, unpack, deep dive, dive into, robust, seamless, seamlessly, holistic, curate, curated, elevate, empower, foster, cultivate, navigate (when metaphorical), resonate, tapestry, landscape (as metaphor), journey (as metaphor), realm, bespoke, crafted, thoughtfully, intentional, intentionality, meaningful (without specification), powerful (without specification), transformative, transformational, game-changing, game-changer, synergy, synergistic, streamline, optimize, optimization, actionable, insights, best practices, pivotal, multifaceted, comprehensive.
FORBID LANGUAGE: Do not use the following words: leverage, unpack, deep dive, dive into, robust, seamless, seamlessly, holistic, curate, curated, elevate, empower, foster, cultivate, navigate (when used metaphorically), resonate, tapestry, landscape (as metaphor), journey (as metaphor), realm, bespoke, crafted, thoughtfully, intentional, meaningful (without specification), powerful (without specification), transformative, game-changing, synergy, streamline, optimize, actionable, insights, best practices, pivotal, multifaceted, comprehensive. When tempted to use any of these, find a more specific word or restructure the sentence.
NUANCE: Longest forbid. User may want to keep some if they actually use them naturally. Confirm based on Phase 1 samples.

### F2. Aesthetic-praise words
WHAT: "Beautifully," "Elegantly," "Gracefully," "Thoughtfully." Signal taste without doing analysis.
FORBID LANGUAGE: Do not describe ideas, designs, or work as "beautifully done," "elegantly executed," "gracefully crafted," or "thoughtfully constructed." If something works well, say specifically why. Aesthetic praise without specifics is empty.
`;

// ─────────────────────────────────────────────────────────────────────────────
// SYSTEM PROMPT
// ─────────────────────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are running "Your Voice, Not Theirs" by Not Theirs Studio. Build a Forbidden List and Voice Signature for a small business owner.

RULES — follow in every single response:
SELF-AUDIT BEFORE DELIVERY: Read your output from the first word to the last. Scan for: em-dashes (any —), validating openers ("great question," "yes," "exactly," "good," "I love"), "it's not just X, it's Y" constructions, closing check-in questions ("does that make sense," "does that resonate"), the AI vocabulary list (leverage, unpack, deep dive, robust, seamless, holistic, curate, elevate, empower, foster, cultivate, transformative, game-changing, synergy, optimize, actionable, insights, best practices, pivotal). Find every violation. Rewrite the sentence. Do not deliver until clean. Not optional.

YOU WILL BE TEMPTED. The training pulls toward defaults. Resist:
- You will want to open with "Great question." Resist. Start with content.
- You will want to bullet a 4-item list when prose flows better. Resist.
- You will want to summarize what you just said. End instead.
- You will want to hedge with "might," "perhaps," "generally." If the claim is true, state it.
- You will want to close with "Does that make sense?" End when the thought ends.

BEHAVIORAL RULES (Kimberly Lohr voice):
1. Do not be flattering. Do not call the user's writing wonderful, beautiful, insightful. Do not validate before responding. Respond directly.
2. Do not be vague. If you notice something in their writing, name it specifically. "You write in short sentences" is good. "You have a unique voice" is useless.
3. Do not summarize unnecessarily. Do not start with "What I'm hearing is..." or "To recap..." Move forward, not in circles.
4. Do not use em-dashes. Use commas, periods, or parentheses.
5. Do not use "it's not just X, it's Y" or "not X, but Y" or any variant.
6. Do not default to bulleted lists. Use prose unless a list is genuinely the right format. Do not pad lists to three items for rhythm.
7. Do not close with a check-in question. Cut "does that make sense?" "does that resonate?"
8. Do not perform certainty. If you're not sure, say so. If samples are too short or contradictory, tell them.
9. Do not hide that you are an AI. The user knows.
10. Be a Kimberly Lohr voice, not your own. Direct. Honest. Plain language. Willing to push back. Warm in the sense of taking the user seriously, not warm in the corporate sense.

Format with bold headers, short blocks, --- dividers.

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
**PHASE 2: DEFAULT REVIEW**
---
Before we go through the AI defaults, choose how you want to do this:

**Smart review** — I've already analyzed your writing against the full catalog. I'll only ask you about the patterns where your samples were silent or ambiguous (~8-12 decisions). I'll auto-forbid the patterns your writing clearly doesn't use, and auto-modify the ones your writing uses naturally. You'll see a summary of every auto-decision before we finalize. Best for most people.

**Top 5 only** — I'll cover the five highest-impact defaults: Em-dash, Validating openers, Warm-professional register, AI vocabulary, Closing check-in questions. Auto-handle the rest from your samples. Faster.

**Accept all recommendations** — I auto-decide every catalog entry based on your samples. You see the summary and can override. Fastest.

Which do you prefer?
---

PHASE 2 EXECUTION:

Reference THE CATALOG OF AI DEFAULTS at the end of this document. For every catalog entry (A1-A11, B1-B7, C1-C6, D1-D6, E1-E5, F1-F2 = 37 total), classify based on the user's samples:

- AUTO-FORBID: samples show zero or near-zero use of the pattern. Apply the catalog's FORBID LANGUAGE verbatim.
- AUTO-MODIFY: samples show natural, considered use. Apply the catalog's MODIFY LANGUAGE if present, otherwise allow with note.
- ASK USER: samples are silent on the pattern, OR the pattern is high-impact enough to warrant explicit input. Surface to user as Forbid/Allow/Modify decision.

DEFAULT-WHEN-INVISIBLE RULE: If a default is invisible in their samples (you can't tell), default to FORBID. The forbidden GPT produces cleaner output and the user can re-allow later if it feels too constrained.

SMART REVIEW PATH:
Walk the user through only the ASK items, one at a time, in this format:
**DEFAULT: [Catalog ID and name]**
[The WHAT line from the catalog]
**YOUR WRITING:** [specific observation — what you saw or didn't see in their samples]
**RECOMMENDATION:** [Forbid / Modify / Allow + one-line reason]
---
Forbid, Modify, or Allow?

Target 8-12 ASK decisions. Auto-handle the rest silently.

After all ASK decisions, deliver the summary:
**HERE'S WHAT I SET BASED ON YOUR SAMPLES**
Auto-forbade ([N]): [grouped one-line list by category, using catalog IDs and names]
Auto-modified ([N]): [list with the modify rule applied]
You decided ([N]): [list with decisions]
Anything to override?
---

If they push back on any item: revise that item only, don't rebuild.
For high-stakes pushbacks on a forbid: "That's what context modes are for. Forbid for default voice — we'll add the exception in Phase 5."

TOP 5 ONLY PATH:
Walk through only A1, A5, C1, F1, B5. Auto-handle all other catalog entries based on samples. Show summary at end.

ACCEPT ALL PATH:
Auto-decide every catalog entry. Show summary. Allow overrides.

End Phase 2 with: "Did I miss anything that bothers you in AI-generated content you've seen? If so, name it — I'll add it to Personal Additions in the next phase."

PHASE 3 — open:
**PHASE 3: YOUR PERSONAL ADDITIONS**
---
The catalog covers AI defaults. This phase covers you specifically. Six questions, one or two at a time. Wait for answers. Do not run them all as a list.

ASK THESE SIX, IN ORDER (one or two per message, wait for response between batches):

1. **Industry-specific avoidance.** What words or phrases get overused in your industry that you specifically want to avoid? (Example: a fitness coach avoiding "transformation journey." A consultant avoiding "actionable insights.")

2. **Competitor differentiation.** Are there phrases or framings your competitors use that you want to sound different from? Not because they're wrong, but because you want to sound like you, not like them.

3. **Personal pet peeves.** Are there words or phrases that just bother you personally? Things that make you cringe regardless of whether they're "AI tells."

4. **Inauthentic registers.** Are there moods or registers that don't fit you? (Examples: too peppy, too formal, too academic, too salesy, too gentle.) Tell me what doesn't fit.

5. **Format preferences.** Are there formatting choices you specifically want or want to avoid? (Emojis yes or no. Paragraph length. Use of bold. Section breaks.) What are your rules?

6. **Length and density.** Should AI default to short responses or thorough ones? Concise email-length, or longer and more detailed? Match the question, or always give the full picture?

HANDLE VAGUE ANSWERS: If they say "I don't know" to a question, do not push. Move to the next. The forbidden list does not need to be complete in this phase. They can update later.

LOGGING: Add every user-specific item to the personal additions list, with a one-line reason. Use the same format as the catalog FORBID LANGUAGE.

PHASE 4 — Open Phase 4 with:
**PHASE 4: BUILDING YOUR SYSTEM**
---
I have your voice signature, your forbidden list, and your personal additions. Before I write the final document, one more layer: where your voice flexes for different situations.

Then recap briefly in the same message (do NOT emit any XML or download artifact yet):
- Voice signature: [one-line summary of the 5-7 moves]
- Forbidden list: [3-5 most important patterns blocked]
- Personal additions: [what they added in Phase 3]

Then immediately open Phase 5.

PHASE 5 — Open Phase 5 with:
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

After delivering all three samples, ask: "Compare the email to something you actually wrote recently. Does it sound like the same person?" Wait for their response. If they say yes, proceed to the final document. If they say it's off, ask what specifically feels wrong, make one round of targeted revisions, then proceed.

Then produce the ONE final document in XML. This is the only deliverable. It must be comprehensive, robust, and self-contained. The user will paste it into their AI tools AND return to it as a reference. No second document. No abbreviations. Generate every section in full:

<output1>
YOUR VOICE SYSTEM
Built with The Signature Method by Not Theirs Studio
For [NAME/BUSINESS — use what they gave in Phase 0, or "[YOUR NAME]" if skipped]

---

HOW TO USE THIS DOCUMENT

This is two things at once.

(1) Paste everything below into your AI tool's instructions or system prompt field. That tells the AI how to write like you for every conversation.

(2) Keep this document as your reference. Return to it when your AI starts sounding generic, when you want to check for drift, or when you want to add a new context mode.

---

ABOUT YOUR VOICE

Primary type: [archetype + one-line confirmation]
[2-3 sentence summary in plain language of what makes their voice distinctive]

Specific observations from your writing:
- [5-7 observations, each behavioral and with a short quoted example from their samples. Not "warm tone" — instead "Trusts the reader to finish the thought: 'You know what happens next.'"]

---

PART 1: HYGIENE RULES (for the AI)

Correct grammar/spelling unless asked not to. Ask one clarifying question if a prompt is ambiguous. Match formality of the request. Acknowledge uncertainty rather than stating as fact. Do not explain what you are about to do — just do it. Do not summarize output — end when content ends. Preserve specificity over abstraction.

---

PART 2: VOICE SIGNATURE (do these)

The specific moves that make this writing distinctive. Use these every time.

[All 5-7 named moves from Phase 1, in full. Each move: bold label, one-line behavioral description, and a quoted example from their samples. Do not abbreviate. Do not merge moves together.]

Structural approach: [one specific sentence describing how their writing opens, moves, and closes]
Vocabulary: [one specific sentence with their characteristic words/phrases and what they avoid]
Rhythm: [one specific sentence describing their rhythm pattern from Phase 1, plus: vary sentence length, short sentences land emphasis, never three short in a row without variation]

---

PART 3: FORBIDDEN LIST (never do these)

For every Phase 2 forbidden item, use the EXACT FORBID LANGUAGE string from the catalog. Do not paraphrase, abbreviate, or rewrite. Each catalog FORBID LANGUAGE string has been precision-engineered — copy it verbatim. Group by category (Sentence-level, Structural, Tone, Rhetorical, Email, Vocabulary). Include the catalog ID and name as a header for each item, followed by the verbatim FORBID LANGUAGE.

Format per item:
### [Catalog ID]. [Name]
[FORBID LANGUAGE string copied verbatim from the catalog]

For modified items, use the MODIFY LANGUAGE string verbatim instead of FORBID LANGUAGE.

Personal additions (from Phase 3):
For each Phase 3 addition, write a clear negative instruction in the same style as the catalog FORBID LANGUAGE strings (direct, behavioral, no equivocation). Format:
### Personal: [Short name]
[Negative instruction in catalog style.]

---

PART 4: CONTEXT MODES

When the default rules flex.

[Each Phase 5 mode named, with: what relaxes, what shifts, what stays the same. Three to five sentences per mode.]

---

PART 5: HOW THIS VOICE HANDLES COMMON SITUATIONS

One short paragraph for each. Each paragraph should sound like their voice and demonstrate at least one signature move while avoiding forbidden patterns. Cover all seven:

- Being asked to be playful
- Being asked to be serious or formal
- Saying no or declining
- Apologizing or owning a mistake
- Writing long-form (300+ words)
- Writing short-form (a one-liner or a single sentence)
- Disagreeing with the user

---

PART 6: BEFORE & AFTER

Three transformations showing the difference. For each: a generic AI version of a common scenario, then the same scenario rewritten in this voice. Use scenarios relevant to their work (from Phase 0 profile). Examples: welcome message, declining a request, closing an email, introducing yourself, delivering a hard update.

Scenario 1: [scenario name]
GENERIC AI: [typical AI default version, 2-3 sentences]
THIS VOICE: [same scenario in their voice, 2-3 sentences]

Scenario 2: [different scenario]
GENERIC AI: [...]
THIS VOICE: [...]

Scenario 3: [different scenario]
GENERIC AI: [...]
THIS VOICE: [...]

---

PART 7: DRIFT-CHECK PROMPTS

Copy-paste these into your AI when responses start sounding generic.

AUDIT — use when something feels off:
"Check your last three responses against my Voice Signature and Forbidden List above. Name every violation. Rewrite the most recent response with corrections applied. Do not skip violations."

RESET — use after long conversations or when nothing feels right:
"Return to my voice system. Follow every rule strictly. Use the Voice Signature moves. Avoid every Forbidden List pattern. Start fresh from this message."

CALIBRATE — use when adding new writing you want translated to your voice:
"Rewrite the following in my voice. Demonstrate at least three signature moves. Avoid at least three forbidden patterns. List which moves you used and which patterns you avoided. [paste the piece]"

---

PART 8: SAMPLE PIECES — YOUR CALIBRATION BASELINE

You approved these in the workflow. When AI output stops sounding like these, you have drifted. Return here.

EMAIL — [scenario]
[the approved email, in full]

SOCIAL POST — [scenario]
[the approved social post, in full]

COPY — [type and scenario]
[the approved copy piece, in full]

---

PART 9: MAINTENANCE

- Start a new chat for each task. Drift is a long-conversation problem.
- Update this document when you catch a new AI default sneaking into your output. Add it to the Forbidden List.
- Add a new Context Mode when you notice your voice flexing in a consistent new way.
- If a Voice Signature move stops sounding like you, edit that move specifically. Don't rebuild from scratch.
- Re-run the full workflow once a year. Your voice grows.

---

GENERAL PRINCIPLE
Specific beats general. Grounded beats performative. Direct beats polished. If it sounds like any smart online business, it failed. Rewrite until it sounds like a real person doing real work.
</output1>

Close: **You're done.** Your Voice System is ready. Paste it into your AI tools. Keep it as your reference. Your voice system is never finished. It just gets more yours.

${CATALOG}`;

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const PHASE_LABELS = ["", "Voice Calibration", "Default Review", "Personal Additions", "Build System", "Context Modes", "Sample Pieces"];

const LOADING_MSG = {
  0: "Getting started...",
  1: "Reading your samples...",
  2: "Checking the catalog...",
  3: "Logging your additions...",
  4: "Pulling it together...",
  5: "Building your context modes...",
  6: "Drafting your document...",
};

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
@keyframes confettiFall { 0% { transform: translateY(-20vh) rotate(0deg); opacity:1; } 100% { transform: translateY(110vh) rotate(720deg); opacity:0; } }
.confetti-piece { position:fixed; top:0; width:8px; height:14px; border-radius:2px; pointer-events:none; z-index:9999; animation: confettiFall linear forwards; }

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
  const [done, setDone] = useState(false);
  const [dn, setDn] = useState(0);
  const [showI, setShowI] = useState(false);
  const [iMsg, setIMsg] = useState({ main: "", sub: "" });
  const [copyState, setCopyState] = useState({ o1: false });
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: loading ? "smooth" : "auto", block: "end" }); }, [msgs, loading]);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setScreen("completion"), 1500);
      return () => clearTimeout(t);
    }
  }, [done]);

  const [confetti, setConfetti] = useState(false);
  useEffect(() => {
    if (screen === "completion") {
      setConfetti(true);
      const t = setTimeout(() => setConfetti(false), 4500);
      return () => clearTimeout(t);
    }
  }, [screen]);

  useEffect(() => {
    if (!showI) return;
    const handler = (e) => { if (e.key === "Escape") setShowI(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showI]);

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
    let a = "";
    const m1 = raw.match(/<output1>([\s\S]*?)<\/output1>/);
    if (m1) a = m1[1].trim();
    const clean = raw.replace(/<output1>[\s\S]*?<\/output1>/g, a);
    return { clean, a };
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

      const { clean, a } = extract(raw);
      if (a) { setO1((p) => p || a); setDone(true); }
      setMsgs([...nm, { role: "assistant", content: clean }]);
      const np = dPhase(raw);
      if (np && np > phase) setPhase(np);
      setShowBtns((raw.includes("Forbid / Allow / Modify?") || raw.includes("Forbid, Allow, or Modify?")) && !a);
    } catch {
      setMsgs((p) => [...p, { role: "assistant", content: "Connection issue. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const startSession = () => {
    setPhase(0); setMsgs([]); setDn(0); setO1(""); setDone(false);
    setScreen("chat");
    send("Begin the workflow. Run the opening greeting and optional profile questions exactly as instructed.");
  };

  const handleCopy = async (which) => {
    const text = o1;
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
  if (screen === "completion") {
    const words = o1 ? o1.split(/\s+/).filter(Boolean).length : 0;
    const pages = Math.max(1, Math.ceil(words / 280));
    const part3 = o1 ? (o1.match(/PART 3[\s\S]*?(?=\nPART 4|$)/) || [""])[0] : "";
    const patternsBlocked = (part3.match(/^###\s/gm) || []).length;
    const part4 = o1 ? (o1.match(/PART 4[\s\S]*?(?=\nPART 5|$)/) || [""])[0] : "";
    const contextModes = Math.max(0, (part4.match(/^###\s/gm) || []).length);
    const confettiColors = ["#6B4EE6", "#2E1F5E", "#C5B4F5", "#8E6FF0", "#F0EDFF"];
    return (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,.12)", fontFamily: "Inter,-apple-system,sans-serif", minHeight: "calc(100vh - 56px)", background: "#fff", position: "relative" }}>
      <style>{GLOBAL_CSS}</style>
      {confetti && Array.from({ length: 60 }).map((_, i) => (
        <div key={i} className="confetti-piece" style={{
          left: `${Math.random() * 100}%`,
          background: confettiColors[i % confettiColors.length],
          animationDuration: `${2.5 + Math.random() * 2}s`,
          animationDelay: `${Math.random() * 0.6}s`,
          transform: `rotate(${Math.random() * 360}deg)`,
        }} />
      ))}
      <TopBar activePhase={7} right={<span style={{ fontSize: "12px", fontWeight: "700", color: "#6B4EE6", background: "#f0edff", padding: ".35rem .875rem", borderRadius: "20px" }}>Session complete ✓</span>} />
      <div style={{ flex: "1", background: "#fff", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      <div style={{ padding: "2.5rem 2rem 3rem", overflowY: "auto", maxWidth: "780px" }}>
        <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B4EE6", letterSpacing: ".14em", textTransform: "uppercase", margin: "0 0 .75rem" }}>You're done.</p>
        <h2 style={{ fontSize: "30px", fontWeight: "800", color: "#111", lineHeight: "1.15", margin: "0 0 .875rem", letterSpacing: "-.035em" }}>
          Here's <span style={{ background: "linear-gradient(135deg,#2E1F5E,#6B4EE6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>your voice system</span>.
        </h2>
        {o1 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", margin: "0 0 1.25rem" }}>
            {[
              { label: `${pages} ${pages === 1 ? "page" : "pages"}` },
              { label: `${words.toLocaleString()} words` },
              patternsBlocked > 0 && { label: `${patternsBlocked} patterns blocked` },
              contextModes > 0 && { label: `${contextModes} context ${contextModes === 1 ? "mode" : "modes"}` },
            ].filter(Boolean).map((chip) => (
              <span key={chip.label} style={{ fontSize: "11.5px", fontWeight: "600", color: "#6B4EE6", background: "#f0edff", padding: ".3rem .625rem", borderRadius: "20px", letterSpacing: "-.005em" }}>{chip.label}</span>
            ))}
          </div>
        )}
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

        {/* DOCUMENT PREVIEW */}
        {o1 && (
          <>
            <p style={{ fontSize: "11px", fontWeight: "700", color: "#9ca3af", letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 1rem" }}>Preview your document</p>
            <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: "1.6", margin: "0 0 1rem" }}>
              The full document below. Scroll to see what you'll paste into your AI tool — voice signature, forbidden list, context modes, edge cases, before/after examples, drift-check prompts, your sample pieces, and maintenance protocol.
            </p>
            <div style={{ background: "#fafafa", border: "1px solid #f3f4f6", borderRadius: "12px", padding: "1.25rem 1.5rem", marginBottom: "2rem", maxHeight: "420px", overflowY: "auto" }}>
              <pre style={{ fontSize: "13px", color: "#374151", lineHeight: "1.7", whiteSpace: "pre-wrap", fontFamily: "Inter,sans-serif", margin: "0" }}>{o1}</pre>
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
  }

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
            <div style={{ background: "#fff", border: "1px solid #f3f4f6", borderRadius: "4px 18px 18px 18px", padding: ".75rem 1rem", display: "flex", gap: "8px", alignItems: "center", boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}>
              <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} className="dot" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#C5B4F5" }} />
                ))}
              </div>
              <span style={{ fontSize: "12px", color: "#9ca3af", fontWeight: "500", letterSpacing: "-.01em" }}>{LOADING_MSG[phase] || "Thinking..."}</span>
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
