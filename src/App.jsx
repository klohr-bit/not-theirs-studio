import React, { useEffect, useMemo, useRef, useState } from 'react'

// ---------------------------------------------------------------------------
// The Signature Method — Kimberly Lohr · Not Theirs Studio
// 7-question reaction test → personal design Signature
// ---------------------------------------------------------------------------
// Specimens live in QUESTIONS[i].specimenA / specimenB as raw HTML strings.
// They are pasted in pair-by-pair. Each renders in an iframe (srcDoc) so the
// specimen CSS stays isolated from the app chrome.
// ---------------------------------------------------------------------------

const QUESTIONS = [
  {
    id: 1,
    question: 'What do you notice first?',
    axis: 'Type hierarchy vs color zone hierarchy',
    sub: 'Same flyer, two ways to organize what you see. Pick the one your eye lands on without arguing.',
    analysisA:
      'You read structure through type. Scale and weight do the organizing — no color blocks needed.',
    analysisB:
      'You read structure through color and space. Visual zones land before any word does.',
    specimenA: `<div style="background:#FAFAF6;min-height:320px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:36px 24px;text-align:center">
<div style="font-family:Georgia,serif;font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:#9C9080;margin-bottom:14px">a curated gathering</div>
<div style="font-family:Georgia,serif;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#9C9080;margin-bottom:3px">The</div>
<div style="font-family:Georgia,serif;font-size:38px;font-weight:400;line-height:1;color:#1A1918">Maker's</div>
<div style="font-family:Georgia,serif;font-size:38px;font-weight:400;line-height:1;color:#1A1918;margin-bottom:14px">Market</div>
<div style="width:20px;height:1px;background:#C8C2B6;margin-bottom:14px"></div>
<div style="font-family:Georgia,serif;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#9C9080;line-height:1.9">Saturday, June 20<br>9am · Dillsburg</div>
</div>`,
    specimenB: `<div style="min-height:320px;display:flex;flex-direction:column">
<div style="background:#1C3829;padding:26px 20px 22px">
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:9px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:#5C8870;margin-bottom:9px">Dillsburg Town Square</div>
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:24px;font-weight:700;line-height:.92;color:#F4EFE4;letter-spacing:-.01em">THE<br>MAKER'S<br>MARKET</div>
</div>
<div style="height:3px;background:#B87333"></div>
<div style="background:#F4EFE4;padding:16px 20px;flex:1">
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;color:#2A2018;margin-bottom:4px">Saturday, June 20th</div>
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#6B5E4E">9am until 3pm</div>
</div>
</div>`,
  },
  {
    id: 2,
    question: 'One person or a room?',
    axis: 'Intimate vs broadcast register',
    sub: 'Same announcement, two volumes. Which one would you make?',
    analysisA: 'You speak to one person at conversational distance. Quiet, personal, close.',
    analysisB: 'You command a room. Bold, declarative, readable from across the street.',
    specimenA: null,
    specimenB: null,
  },
  {
    id: 3,
    question: 'Everything or only what matters?',
    axis: 'Reduction vs accumulation',
    sub: 'One strips to the essential, one gives you the full picture. Both are correct, for different people.',
    analysisA: 'You strip until only the essential remains. Negative space is doing work.',
    analysisB: 'You give the full picture. Detail and information are generosity, not clutter.',
    specimenA: null,
    specimenB: null,
  },
  {
    id: 4,
    question: 'Understand or feel first?',
    axis: 'Legibility vs atmosphere',
    sub: 'Which arrives at the reader first — the facts, or the mood?',
    analysisA: 'You want instant comprehension. Maximum contrast, no mood in the way.',
    analysisB: 'You lead with feeling. The mood arrives before the facts and sets the terms.',
    specimenA: null,
    specimenB: null,
  },
  {
    id: 5,
    question: 'Rules or gut?',
    axis: 'System vs expression',
    sub: 'Same content, organized by grid or organized by feel. Which one is yours?',
    analysisA: 'You trust the grid. Consistent spacing and structural logic carry the work.',
    analysisB: 'You trust your hand. Elements land by feel — energy first, formula second.',
    specimenA: null,
    specimenB: null,
  },
  {
    id: 6,
    question: 'One thing dominates, or balanced?',
    axis: 'Scale drama vs proportion',
    sub: 'Pick the composition that feels right — one element loud, or everything in conversation.',
    analysisA: 'You let one element take the whole room. Everything else steps back on purpose.',
    analysisB: 'You compose in balance. Nothing overwhelms — the whole thing resolves together.',
    specimenA: null,
    specimenB: null,
  },
  {
    id: 7,
    question: 'Computer or hands?',
    axis: 'Screen-born vs physically rooted',
    sub: 'One feels born inside the file. One feels like it passed through someone’s hands.',
    analysisA: 'You work in digital precision. Flat, exact, pixel-true, no material reference.',
    analysisB: 'You leave a human trace. Tactile, handmade, the analog world is in the work.',
    specimenA: null,
    specimenB: null,
  },
]

const STORAGE_KEY = 'signature_method_v1'

// ---------- localStorage helpers -------------------------------------------

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.signature || !parsed?.name) return null
    return parsed
  } catch { return null }
}

function save(payload) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(payload)) } catch {}
}

function clearSaved() {
  try { localStorage.removeItem(STORAGE_KEY) } catch {}
}

// ---------- shared header --------------------------------------------------

function PageHeader({ stage, index, total }) {
  let subtitle = 'Getting started'
  let count = `0 of ${total}`
  if (stage === 'questions') {
    subtitle = `Question ${index + 1}`
    count = `${index + 1} of ${total}`
  } else if (stage === 'loading') {
    subtitle = 'Building Signature'
    count = 'Almost there'
  } else if (stage === 'signature') {
    subtitle = 'Your Signature'
    count = 'Complete'
  } else if (stage === 'returning') {
    subtitle = 'Welcome back'
    count = 'Saved'
  }

  const filledThrough =
    stage === 'welcome' || stage === 'returning' ? -1 :
    stage === 'questions' ? index :
    total - 1

  return (
    <header className="pageheader">
      <div className="pageheader__brand">
        <span className="pageheader__wordmark">Not Theirs Studio</span>
        <span className="pageheader__subtitle">{subtitle}</span>
      </div>
      <div className="pageheader__progress" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={
              'pageheader__segment ' +
              (i <= filledThrough ? 'pageheader__segment--filled' : '')
            }
          />
        ))}
      </div>
      <div className="pageheader__count">{count}</div>
    </header>
  )
}

// ---------- specimen -------------------------------------------------------

function Specimen({ html, label, selected, onSelect }) {
  const srcDoc = html
    ? `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:#fff;font-family:Inter,system-ui,sans-serif;}</style></head><body>${html}</body></html>`
    : null

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`specimen ${selected ? 'specimen--selected' : ''}`}
    >
      <div className="specimen__frame">
        {html ? (
          <iframe title={`Specimen ${label}`} srcDoc={srcDoc} sandbox="" scrolling="no" />
        ) : (
          <div className="specimen__placeholder">Specimen {label} — awaiting paste</div>
        )}
      </div>
      <div className="specimen__foot">
        <span className="specimen__letter">{label}</span>
        <span className="specimen__chip">Selected</span>
      </div>
    </button>
  )
}

// ---------- welcome --------------------------------------------------------

function Welcome({ onStart, saved, onResume, onDiscardSaved }) {
  const [name, setName] = useState('')
  const trimmed = name.trim()

  return (
    <section className="screen screen--welcome two-col">
      <div>
        <p className="eyebrow">
          THE SIGNATURE METHOD
          <span className="eyebrow__dot">·</span>
          NOT THEIRS STUDIO
          <span className="eyebrow__dot">·</span>
          VOLUME 2: DESIGN
        </p>

        <span className="chip">7 reaction pairs · same flyer, 14 ways</span>

        <h1 className="display">
          Seven choices. <br />
          One design voice that is <em>yours</em>.
        </h1>

        <p className="lede">
          Most AI design prompts inherit the model&rsquo;s defaults: editorial serif, sparkle
          icons, color-blocked sections, the same six moves. The Signature Method runs you
          through seven reaction pairs &mdash; you choose without thinking &mdash; and from those
          choices writes the prompt that replaces those defaults with how you actually see.
        </p>

        <p className="section-heading">How it works</p>
        <ol className="steps">
          <li className="step">
            <span className="step__num">1</span>
            <div>
              <div className="step__title">Choose your name</div>
              <div className="step__body">Your Signature will be addressed to you and saved on this device.</div>
            </div>
          </li>
          <li className="step">
            <span className="step__num">2</span>
            <div>
              <div className="step__title">React, don&rsquo;t deliberate</div>
              <div className="step__body">Seven pairs of the same flyer, A or B. Pick the one your eye lands on first.</div>
            </div>
          </li>
          <li className="step">
            <span className="step__num">3</span>
            <div>
              <div className="step__title">Get your Signature</div>
              <div className="step__body">A voice paragraph, five DNA tokens, and a prompt block you paste into any AI design tool.</div>
            </div>
          </li>
        </ol>

        {saved && (
          <div className="saved-banner">
            <div className="saved-banner__title">You have a saved Signature</div>
            <div className="saved-banner__body">
              You took the method already as <strong>{saved.name}</strong>. Open it, or start over with a new name.
            </div>
            <div className="saved-banner__row">
              <button type="button" className="btn btn--primary btn--small" onClick={onResume}>
                Open my Signature
              </button>
              <button type="button" className="btn btn--ghost btn--small" onClick={onDiscardSaved}>
                Start over
              </button>
            </div>
          </div>
        )}

        <form
          className="welcome__name"
          onSubmit={(e) => {
            e.preventDefault()
            if (trimmed) onStart(trimmed)
          }}
        >
          <label htmlFor="name" className="welcome__label">Your name</label>
          <input
            id="name"
            type="text"
            autoComplete="given-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Kimberly"
            className="welcome__input"
          />
          <button
            type="submit"
            disabled={!trimmed}
            className="btn btn--primary welcome__cta"
          >
            Begin the Signature Method <span className="btn__arrow">→</span>
          </button>
        </form>
      </div>

      <aside>
        <p className="section-heading">What you walk away with</p>
        <h2 className="h2-bold">A prompt that strips defaults and injects you.</h2>
        <p className="lede" style={{ marginBottom: 24 }}>
          The Signature is yours to paste at the top of any AI design conversation. Here is the shape of what gets generated.
        </p>

        <div className="panel panel--accent">
          <div className="panel__head">
            <span className="panel__title">A sample Signature</span>
            <span className="panel__meta">Voice · Tokens · Prompt</span>
          </div>

          <div className="preview-row">
            <span className="preview-row__label">Voice</span>
            <div>
              <div className="preview-row__title">2&ndash;3 sentences</div>
              <div className="preview-row__sample">
                &ldquo;You work in restraint &mdash; type does all the structural work, color stays out of the way&hellip;&rdquo;
              </div>
            </div>
          </div>

          <div className="preview-row">
            <span className="preview-row__label">Tokens</span>
            <div>
              <div className="preview-row__title">5 DNA tokens</div>
              <div className="preview-row__sample">
                &ldquo;type-only hierarchy&rdquo; &middot; &ldquo;active negative space&rdquo; &middot; &ldquo;conversational scale&rdquo;&hellip;
              </div>
            </div>
          </div>

          <div className="preview-row">
            <span className="preview-row__label">Prompt</span>
            <div>
              <div className="preview-row__title">DO / DO NOT</div>
              <div className="preview-row__sample">
                &ldquo;Do not use color blocks for hierarchy. Use type scale and weight as the only organizational system&hellip;&rdquo;
              </div>
            </div>
          </div>
        </div>

        <div className="panel panel--alert">
          <div className="panel__head">
            <span className="panel__title">&times; What it replaces</span>
            <span className="panel__meta">AI design defaults</span>
          </div>
          <div className="preview-row" style={{ borderTopColor: 'transparent' }}>
            <span className="preview-row__label" style={{ borderColor: 'var(--red-tint-strong)', color: 'var(--red)' }}>Color</span>
            <div>
              <div className="preview-row__title">Color-blocked sections</div>
              <div className="preview-row__sample">Hero, value-prop, CTA, footer &mdash; each in its own tinted band.</div>
            </div>
          </div>
          <div className="preview-row" style={{ borderTopColor: 'var(--red-tint-strong)' }}>
            <span className="preview-row__label" style={{ borderColor: 'var(--red-tint-strong)', color: 'var(--red)' }}>Icons</span>
            <div>
              <div className="preview-row__title">Sparkles &amp; checkmarks</div>
              <div className="preview-row__sample">Decorative emoji and three-bullet lists with leading symbols.</div>
            </div>
          </div>
          <div className="preview-row" style={{ borderTopColor: 'var(--red-tint-strong)' }}>
            <span className="preview-row__label" style={{ borderColor: 'var(--red-tint-strong)', color: 'var(--red)' }}>Voice</span>
            <div>
              <div className="preview-row__title">&ldquo;Empower your journey&rdquo;</div>
              <div className="preview-row__sample">Tricolon taglines, ornamental adjectives, hollow imperatives.</div>
            </div>
          </div>
        </div>
      </aside>
    </section>
  )
}

// ---------- question -------------------------------------------------------

function Question({ index, total, data, selected, onSelect, onNext, onBack }) {
  const analysis =
    selected === 'A' ? data.analysisA : selected === 'B' ? data.analysisB : null

  return (
    <section className="screen screen--question">
      <div className="qbreadcrumb">
        <span className="qbreadcrumb__step">
          Step {String(index + 1).padStart(2, '0')} of {String(total).padStart(2, '0')}
        </span>
        <span className="qbreadcrumb__axis">{data.axis}</span>
      </div>

      <h2 className="qprompt">{data.question}</h2>
      {data.sub && <p className="qsub">{data.sub}</p>}

      <div className="specimens">
        <Specimen
          html={data.specimenA}
          label="A"
          selected={selected === 'A'}
          onSelect={() => onSelect('A')}
        />
        <Specimen
          html={data.specimenB}
          label="B"
          selected={selected === 'B'}
          onSelect={() => onSelect('B')}
        />
      </div>

      <div className={'analysis ' + (analysis ? 'analysis--shown' : '')}>
        <div className="analysis__title">What that says about you</div>
        <div className="analysis__body">
          {analysis || 'Pick A or B to see what it says about how you organize design.'}
        </div>
      </div>

      <div className="qfooter">
        <button type="button" onClick={onBack} disabled={index === 0} className="btn btn--ghost">
          ← Back
        </button>
        <button type="button" onClick={onNext} disabled={!selected} className="btn btn--primary">
          {index === total - 1 ? 'Build my Signature' : 'Next'} <span className="btn__arrow">→</span>
        </button>
      </div>
    </section>
  )
}

// ---------- loading --------------------------------------------------------

function Loading() {
  return (
    <section className="screen screen--loading">
      <div className="loading__inner">
        <h2 className="loading__head">
          Building your Signature. <br />
          <em>Stripping defaults. Injecting you.</em>
        </h2>
        <p className="loading__sub">
          Reading your seven choices and writing the prompt that replaces AI defaults with how you see.
        </p>
        <div className="loading__bar" />
      </div>
    </section>
  )
}

// ---------- signature card -------------------------------------------------

function SignatureCard({ name, signature, onRestart }) {
  const [copied, setCopied] = useState(false)
  const promptRef = useRef(null)

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(signature.signature_prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      if (promptRef.current) {
        const range = document.createRange()
        range.selectNodeContents(promptRef.current)
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
      }
    }
  }

  const downloadCard = () => {
    const text = [
      `THE SIGNATURE METHOD — ${name}`,
      '',
      'VOICE',
      signature.voice,
      '',
      'DNA TOKENS',
      ...signature.tokens.map((t) => `· ${t}`),
      '',
      signature.signature_prompt,
      '',
    ].join('\n')
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `signature-${name.toLowerCase().replace(/\s+/g, '-')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <section className="screen screen--signature">
      <p className="eyebrow">
        THE SIGNATURE METHOD
        <span className="eyebrow__dot">·</span>
        GENERATED FOR {name.toUpperCase()}
      </p>

      <h1 className="display display--small">
        <em>{name}</em>&rsquo;s design voice.
      </h1>

      <p className="section-heading">Voice</p>
      <p className="sig__voice">{signature.voice}</p>

      <div className="sig__tokens-block">
        <p className="section-heading">DNA tokens</p>
        <ul className="tokens">
          {signature.tokens.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </div>

      <div className="sig__prompt-panel">
        <div className="sig__prompt-head">
          <p className="section-heading" style={{ marginBottom: 0 }}>Signature prompt</p>
          <button type="button" className="btn btn--ghost btn--small" onClick={copyPrompt}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <pre ref={promptRef} className="sig__prompt-block">
{signature.signature_prompt}
        </pre>
      </div>

      <div className="next-steps">
        <p className="section-heading">What now</p>
        <ol className="steps">
          <li className="step">
            <span className="step__num">1</span>
            <div>
              <div className="step__title">Paste at the top of any AI design prompt</div>
              <div className="step__body">Claude, ChatGPT, Midjourney prefaces &mdash; anywhere AI is helping you design.</div>
            </div>
          </li>
          <li className="step">
            <span className="step__num">2</span>
            <div>
              <div className="step__title">
                <button type="button" className="linklike" onClick={downloadCard}>
                  Download your Signature card
                </button>
              </div>
              <div className="step__body">A plain-text file you can keep where you work.</div>
            </div>
          </li>
          <li className="step">
            <span className="step__num">3</span>
            <div>
              <div className="step__title">Come back anytime</div>
              <div className="step__body">Your Signature is saved on this device. Closing the tab is fine.</div>
            </div>
          </li>
        </ol>
      </div>

      <div className="sig__footer">
        <span style={{ fontSize: 13, color: 'var(--ink-faint)' }}>
          Saved on this device. To take it again, start over.
        </span>
        <button type="button" className="btn btn--ghost" onClick={onRestart}>
          Start over
        </button>
      </div>
    </section>
  )
}

// ---------- returning ------------------------------------------------------

function Returning({ saved, onView, onRestart }) {
  return (
    <section className="screen screen--returning">
      <p className="eyebrow">
        THE SIGNATURE METHOD
        <span className="eyebrow__dot">·</span>
        WELCOME BACK, {saved.name.toUpperCase()}
      </p>

      <h1 className="display">
        Your Signature is <em>here</em>.
      </h1>

      <p className="lede">
        You took the method already &mdash; we kept your Signature on this device. Open it, or start fresh.
      </p>

      <div className="returning__row">
        <button type="button" className="btn btn--primary" onClick={onView}>
          Open my Signature <span className="btn__arrow">→</span>
        </button>
        <button type="button" className="btn btn--ghost" onClick={onRestart}>
          Start over
        </button>
      </div>
    </section>
  )
}

// ---------- app ------------------------------------------------------------

export default function App() {
  const initialSaved = useMemo(() => loadSaved(), [])
  const [savedState, setSavedState] = useState(initialSaved)
  const [stage, setStage] = useState(initialSaved ? 'returning' : 'welcome')
  const [name, setName] = useState(initialSaved?.name || '')
  const [choices, setChoices] = useState(
    initialSaved?.choices || Array(QUESTIONS.length).fill(null)
  )
  const [index, setIndex] = useState(0)
  const [signature, setSignature] = useState(initialSaved?.signature || null)
  const [error, setError] = useState(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [stage, index])

  const begin = (n) => {
    setName(n)
    setChoices(Array(QUESTIONS.length).fill(null))
    setIndex(0)
    setError(null)
    setStage('questions')
  }

  const restart = () => {
    clearSaved()
    setSavedState(null)
    setName('')
    setChoices(Array(QUESTIONS.length).fill(null))
    setIndex(0)
    setSignature(null)
    setError(null)
    setStage('welcome')
  }

  const openSaved = () => {
    if (!savedState) return
    setName(savedState.name)
    setSignature(savedState.signature)
    setStage('signature')
  }

  const select = (letter) => {
    setChoices((prev) => {
      const next = [...prev]
      next[index] = letter
      return next
    })
  }

  const next = async () => {
    if (index < QUESTIONS.length - 1) {
      setIndex(index + 1)
      return
    }
    setStage('loading')
    setError(null)
    try {
      const res = await fetch('/api/signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, choices }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Generation failed')
      const payload = { name, choices, signature: data, created: Date.now() }
      save(payload)
      setSavedState(payload)
      setSignature(data)
      setStage('signature')
    } catch (err) {
      setError(err.message || String(err))
      setStage('questions')
    }
  }

  const back = () => { if (index > 0) setIndex(index - 1) }

  return (
    <main className="app">
      <PageHeader stage={stage} index={index} total={QUESTIONS.length} />

      {error && <div className="error" role="alert">{error}</div>}

      {stage === 'returning' && savedState && (
        <Returning saved={savedState} onView={openSaved} onRestart={restart} />
      )}

      {stage === 'welcome' && (
        <Welcome
          onStart={begin}
          saved={savedState}
          onResume={openSaved}
          onDiscardSaved={restart}
        />
      )}

      {stage === 'questions' && (
        <Question
          index={index}
          total={QUESTIONS.length}
          data={QUESTIONS[index]}
          selected={choices[index]}
          onSelect={select}
          onNext={next}
          onBack={back}
        />
      )}

      {stage === 'loading' && <Loading />}

      {stage === 'signature' && signature && (
        <SignatureCard name={name} signature={signature} onRestart={restart} />
      )}
    </main>
  )
}
