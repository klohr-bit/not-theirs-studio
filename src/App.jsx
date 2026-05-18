import React, { useEffect, useMemo, useRef, useState } from 'react'

// ---------------------------------------------------------------------------
// The Signature Method — Kimberly Lohr
// 7-question reaction test → personal design Signature
// ---------------------------------------------------------------------------
// Specimens live in QUESTIONS[i].specimenA / specimenB as raw HTML strings.
// They are NOT authored here — paste them in one pair at a time. Each
// specimen renders inside an iframe (srcDoc) so its CSS stays isolated from
// the app chrome.
// ---------------------------------------------------------------------------

const QUESTIONS = [
  {
    id: 1,
    question: 'What do you notice first?',
    axis: 'Type hierarchy vs color zone hierarchy',
    analysisA:
      'You read structure through type. Scale and weight do the organizing — no color blocks needed.',
    analysisB:
      'You read structure through color and space. Visual zones land before any word does.',
    specimenA: null,
    specimenB: null,
  },
  {
    id: 2,
    question: 'One person or a room?',
    axis: 'Intimate vs broadcast register',
    analysisA:
      'You speak to one person at conversational distance. Quiet, personal, close.',
    analysisB:
      'You command a room. Bold, declarative, readable from across the street.',
    specimenA: null,
    specimenB: null,
  },
  {
    id: 3,
    question: 'Everything or only what matters?',
    axis: 'Reduction vs accumulation',
    analysisA:
      'You strip until only the essential remains. Negative space is doing work.',
    analysisB:
      'You give the full picture. Detail and information are generosity, not clutter.',
    specimenA: null,
    specimenB: null,
  },
  {
    id: 4,
    question: 'Understand or feel first?',
    axis: 'Legibility vs atmosphere',
    analysisA:
      'You want instant comprehension. Maximum contrast, no mood in the way.',
    analysisB:
      'You lead with feeling. The mood arrives before the facts and sets the terms.',
    specimenA: null,
    specimenB: null,
  },
  {
    id: 5,
    question: 'Rules or gut?',
    axis: 'System vs expression',
    analysisA:
      'You trust the grid. Consistent spacing and structural logic carry the work.',
    analysisB:
      'You trust your hand. Elements land by feel — energy first, formula second.',
    specimenA: null,
    specimenB: null,
  },
  {
    id: 6,
    question: 'One thing dominates or balanced?',
    axis: 'Scale drama vs proportion',
    analysisA:
      'You let one element take the whole room. Everything else steps back on purpose.',
    analysisB:
      'You compose in balance. Nothing overwhelms — the whole thing resolves together.',
    specimenA: null,
    specimenB: null,
  },
  {
    id: 7,
    question: 'Computer or hands?',
    axis: 'Screen-born vs physically rooted',
    analysisA:
      'You work in digital precision. Flat, exact, pixel-true, no material reference.',
    analysisB:
      'You leave a human trace. Tactile, handmade, the analog world is in the work.',
    specimenA: null,
    specimenB: null,
  },
]

const STORAGE_KEY = 'signature_method_v1'

// ---------- helpers ---------------------------------------------------------

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.signature || !parsed?.name) return null
    return parsed
  } catch {
    return null
  }
}

function save(payload) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // ignore quota / disabled storage
  }
}

function clearSaved() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

// ---------- Specimen --------------------------------------------------------

function Specimen({ html, label, selected, onSelect }) {
  const placeholder = !html
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
        {placeholder ? (
          <div className="specimen__placeholder">
            Specimen {label} — awaiting paste
          </div>
        ) : (
          <iframe
            title={`Specimen ${label}`}
            srcDoc={srcDoc}
            sandbox=""
            scrolling="no"
          />
        )}
      </div>
      <div className="specimen__label">
        <span className="specimen__letter">{label}</span>
      </div>
    </button>
  )
}

// ---------- Screens ---------------------------------------------------------

function Welcome({ onStart }) {
  const [name, setName] = useState('')
  const trimmed = name.trim()

  return (
    <section className="screen screen--welcome">
      <p className="eyebrow">The Signature Method</p>
      <h1 className="display">
        Seven choices. <br />
        One design voice that is yours.
      </h1>
      <p className="lede">
        A short reaction test. You will choose between two pieces of the same
        thing — a flyer for a Saturday market in Dillsburg — seven times. From
        your choices, we write your Signature: the prompt that replaces AI
        design defaults with the way you actually see.
      </p>

      <form
        className="welcome__form"
        onSubmit={(e) => {
          e.preventDefault()
          if (trimmed) onStart(trimmed)
        }}
      >
        <label htmlFor="name" className="welcome__label">
          Your name
        </label>
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
          className="btn btn--primary"
        >
          Begin
        </button>
      </form>
    </section>
  )
}

function Question({ index, total, data, selected, onSelect, onNext, onBack }) {
  const progress = ((index + 1) / total) * 100
  const analysis =
    selected === 'A' ? data.analysisA : selected === 'B' ? data.analysisB : null

  return (
    <section className="screen screen--question">
      <header className="qheader">
        <div className="qheader__row">
          <span className="qcount">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span className="qaxis">{data.axis}</span>
        </div>
        <div className="progress">
          <div className="progress__bar" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <h2 className="qprompt">{data.question}</h2>

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

      <div className={`analysis ${analysis ? 'analysis--shown' : ''}`}>
        {analysis && <p>{analysis}</p>}
      </div>

      <div className="qfooter">
        <button
          type="button"
          onClick={onBack}
          disabled={index === 0}
          className="btn btn--ghost"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!selected}
          className="btn btn--primary"
        >
          {index === total - 1 ? 'Build my Signature' : 'Next'}
        </button>
      </div>
    </section>
  )
}

function Loading() {
  return (
    <section className="screen screen--loading">
      <div className="loading__pulse" aria-hidden="true" />
      <h2 className="loading__title">Building your Signature…</h2>
      <p className="loading__sub">Stripping defaults. Injecting you.</p>
    </section>
  )
}

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
      <p className="eyebrow">Your Signature</p>
      <h1 className="display display--small">{name}</h1>

      <div className="sig__voice">
        <h3 className="sig__heading">Voice</h3>
        <p>{signature.voice}</p>
      </div>

      <div className="sig__tokens">
        <h3 className="sig__heading">DNA tokens</h3>
        <ul>
          {signature.tokens.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>

      <div className="sig__prompt">
        <div className="sig__prompt-head">
          <h3 className="sig__heading">Signature prompt</h3>
          <button type="button" className="btn btn--ghost btn--small" onClick={copyPrompt}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <pre ref={promptRef} className="sig__prompt-block">
          {signature.signature_prompt}
        </pre>
      </div>

      <div className="next">
        <h3 className="sig__heading">What now</h3>
        <ol>
          <li>Paste your Signature at the top of any AI design prompt — Claude, ChatGPT, Midjourney prefaces, whatever you use.</li>
          <li>
            <button type="button" className="linklike" onClick={downloadCard}>
              Download your Signature card
            </button>{' '}
            and keep it where you work.
          </li>
          <li>Return anytime — your Signature is saved on this device.</li>
        </ol>
      </div>

      <div className="sig__footer">
        <button type="button" className="btn btn--ghost" onClick={onRestart}>
          Start over
        </button>
      </div>
    </section>
  )
}

function Returning({ saved, onView, onRestart }) {
  return (
    <section className="screen screen--returning">
      <p className="eyebrow">Welcome back, {saved.name}</p>
      <h1 className="display">Your Signature is here.</h1>
      <p className="lede">
        You took the method already. We kept your Signature on this device.
        Open it, or start fresh.
      </p>
      <div className="returning__actions">
        <button type="button" className="btn btn--primary" onClick={onView}>
          View my Signature
        </button>
        <button type="button" className="btn btn--ghost" onClick={onRestart}>
          Start over
        </button>
      </div>
    </section>
  )
}

// ---------- App -------------------------------------------------------------

export default function App() {
  const saved = useMemo(() => loadSaved(), [])
  const [stage, setStage] = useState(saved ? 'returning' : 'welcome')
  const [name, setName] = useState(saved?.name || '')
  const [choices, setChoices] = useState(
    saved?.choices || Array(QUESTIONS.length).fill(null)
  )
  const [index, setIndex] = useState(0)
  const [signature, setSignature] = useState(saved?.signature || null)
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
    setName('')
    setChoices(Array(QUESTIONS.length).fill(null))
    setIndex(0)
    setSignature(null)
    setError(null)
    setStage('welcome')
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
      if (!res.ok) {
        throw new Error(data?.error || 'Generation failed')
      }
      const payload = { name, choices, signature: data, created: Date.now() }
      save(payload)
      setSignature(data)
      setStage('signature')
    } catch (err) {
      setError(err.message || String(err))
      setStage('questions')
    }
  }

  const back = () => {
    if (index > 0) setIndex(index - 1)
  }

  return (
    <main className="app">
      {error && (
        <div className="error" role="alert">
          {error}
        </div>
      )}

      {stage === 'returning' && saved && (
        <Returning
          saved={saved}
          onView={() => {
            setSignature(saved.signature)
            setName(saved.name)
            setStage('signature')
          }}
          onRestart={restart}
        />
      )}

      {stage === 'welcome' && <Welcome onStart={begin} />}

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
