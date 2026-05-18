'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { AppState, ResolvedContradiction } from '@/types';
import { INITIAL_STATE } from '@/types';
import { saveSignature, clearSignature } from '@/lib/storage';

interface Props {
  state: AppState;
  setState: (updater: (s: AppState) => AppState) => void;
}

/**
 * Inject the user's resolved tensions as new bullet lines at the end of the
 * ART DIRECTION: section of the Signature Prompt. Each resolution is the
 * full chosen option text, prefixed with — to match the existing bullet
 * formatting.
 *
 * The original signature_prompt is left untouched — this returns a new
 * string with the resolutions inserted. If the section can't be located
 * (model deviated from format), the resolutions are appended as a fallback.
 */
function injectResolutions(prompt: string, resolutions: ResolvedContradiction[]): string {
  const resolved = resolutions.filter((r) => r.resolved === 'A' || r.resolved === 'B');
  if (resolved.length === 0) return prompt;

  const newBullets = resolved
    .map((r) => `— ${r.resolved === 'A' ? r.optionA : r.optionB}`)
    .join('\n');

  // Prefer ART DIRECTION (current format); fall back to DO: (legacy) if needed.
  const sectionHeader = prompt.indexOf('ART DIRECTION:') !== -1
    ? 'ART DIRECTION:'
    : prompt.indexOf('DO:') !== -1
      ? 'DO:'
      : null;

  if (!sectionHeader) {
    return prompt + '\n\nRESOLVED TENSIONS:\n' + newBullets;
  }

  const start = prompt.indexOf(sectionHeader);
  const afterHeader = start + sectionHeader.length;
  // The next section is any ALLCAPS:-style header on its own line, preceded
  // by a blank line, or the "Build every decision" closer / CONTENT BRIEF
  // header.
  const endRe = /\n\s*\n(BASELINE|EXPERT PASS:|VISUAL TERRITORY:|Build every|== CONTENT BRIEF)/i;
  const sliceAfter = prompt.slice(afterHeader);
  const m = sliceAfter.match(endRe);
  const endIdx = m ? afterHeader + (m.index ?? 0) : prompt.length;

  const before = prompt.slice(0, endIdx).replace(/\s*$/, '');
  const after = prompt.slice(endIdx);
  return `${before}\n${newBullets}${after}`;
}

function dateStamp(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function SignatureCard({ state, setState }: Props) {
  const signature = state.signature;
  const [copied, setCopied] = useState(false);
  const [tensions, setTensions] = useState<ResolvedContradiction[]>(state.contradictions);
  const promptRef = useRef<HTMLPreElement | null>(null);

  // Keep local tensions synced when external state.contradictions changes
  // (e.g., after restoring a saved signature on a return visit).
  useEffect(() => {
    setTensions(state.contradictions);
  }, [state.contradictions]);

  const allResolved = useMemo(
    () => tensions.every((t) => t.resolved === 'A' || t.resolved === 'B'),
    [tensions]
  );

  const displayedPrompt = useMemo(
    () => (signature ? injectResolutions(signature.signature_prompt, tensions) : ''),
    [signature, tensions]
  );

  if (!signature) {
    return (
      <section className="max-w-screen mx-auto">
        <p className="lede">No Signature loaded.</p>
        <button
          type="button"
          className="btn btn-ghost mt-4"
          onClick={() => setState((s) => ({ ...s, currentScreen: 'welcome' }))}
        >
          Start over
        </button>
      </section>
    );
  }

  const resolve = (id: string, choice: 'A' | 'B') => {
    setTensions((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, resolved: choice } : t));
      saveSignature({ ...state, contradictions: next }, signature, next);
      setState((s) => ({ ...s, contradictions: next }));
      return next;
    });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(displayedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      if (promptRef.current) {
        const range = document.createRange();
        range.selectNodeContents(promptRef.current);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
  };

  const download = () => {
    const text = [
      `${state.name}'s Design Signature`,
      'Kimberly Lohr Signature Method',
      `Saved ${dateStamp()}`,
      '',
      'VOICE',
      signature.voice,
      '',
      'DNA',
      ...signature.tokens.map((t) => `  • ${t}`),
      '',
      displayedPrompt,
      '',
    ].join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.name.toLowerCase().replace(/\s+/g, '-')}-Signature-${dateStamp()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openInClaude = () => {
    const url = `https://claude.ai/new?q=${encodeURIComponent(displayedPrompt)}`;
    if (url.length > 7800) {
      copy();
      window.open('https://claude.ai/new', '_blank', 'noopener');
      return;
    }
    window.open(url, '_blank', 'noopener');
  };

  const unresolvedCount = tensions.filter((t) => t.resolved !== 'A' && t.resolved !== 'B').length;

  return (
    <section className="max-w-screen mx-auto">
      <p className="label-eyebrow mb-2" style={{ color: 'rgb(var(--accent))' }}>
        Your Signature is ready
      </p>
      <h1 className="h-display mb-2">
        {state.name ? `${state.name}'s` : 'Your'} Design Signature
      </h1>
      <p className="muted text-sm mb-12">Kimberly Lohr Signature Method</p>

      <section className="mb-12">
        <p className="label-section">Your design voice</p>
        <p className="body-text text-[15px] leading-[1.7]" style={{ maxWidth: '60ch' }}>
          {signature.voice}
        </p>
      </section>

      <section className="mb-12">
        <p className="label-section">Your DNA</p>
        <ul className="flex flex-wrap gap-2">
          {signature.tokens.map((t, i) => (
            <li key={i} className="chip" style={{ pointerEvents: 'none' }}>
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <p className="label-section">Your Signature Prompt</p>
        <pre
          ref={promptRef}
          className="card font-mono text-[11px] leading-[1.7] whitespace-pre-wrap"
          style={{
            maxHeight: 240,
            overflowY: 'auto',
            background: 'rgba(0,0,0,0.35)',
            color: 'rgb(var(--ink))',
          }}
        >
{displayedPrompt}
        </pre>
      </section>

      {tensions.length > 0 && (
        <section className="mb-12">
          <p className="label-section">Resolve before you copy</p>
          <p className="muted text-sm mb-6" style={{ maxWidth: '60ch' }}>
            Before you copy your Signature, resolve these tensions.{' '}
            {unresolvedCount > 0
              ? `${unresolvedCount} left.`
              : 'All resolved — your Signature is ready to use.'}
          </p>
          <ul className="space-y-5">
            {tensions.map((t) => {
              const isResolved = t.resolved === 'A' || t.resolved === 'B';
              if (isResolved) {
                const chosenText = t.resolved === 'A' ? t.optionA : t.optionB;
                return (
                  <li key={t.id} className="card">
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="flex-none flex items-center justify-center rounded-full mt-0.5"
                        style={{
                          width: 22,
                          height: 22,
                          background: 'rgb(var(--accent))',
                          color: 'rgb(var(--bg))',
                        }}
                      >
                        <svg viewBox="0 0 16 16" width="11" height="11">
                          <path
                            d="M3 8.5 L6.5 12 L13 4.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="muted text-[12px] tracking-[0.12em] uppercase mb-1">
                          {t.tension}
                        </p>
                        <p className="body-text text-[14px]" style={{ maxWidth: '60ch' }}>
                          <span className="font-semibold mr-2">Option {t.resolved}:</span>
                          {chosenText}
                        </p>
                        <button
                          type="button"
                          className="btn-text text-xs mt-2"
                          onClick={() =>
                            setTensions((prev) =>
                              prev.map((x) => (x.id === t.id ? { ...x, resolved: null } : x))
                            )
                          }
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  </li>
                );
              }
              return (
                <li key={t.id} className="card">
                  <p className="body-text text-[15px] mb-4" style={{ maxWidth: '60ch' }}>
                    {t.tension}
                  </p>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        className="btn btn-ghost"
                        style={{ minWidth: 56 }}
                        onClick={() => resolve(t.id, 'A')}
                      >
                        A
                      </button>
                      <p className="muted text-sm flex-1" style={{ maxWidth: '60ch' }}>
                        {t.optionA}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        className="btn btn-ghost"
                        style={{ minWidth: 56 }}
                        onClick={() => resolve(t.id, 'B')}
                      >
                        B
                      </button>
                      <p className="muted text-sm flex-1" style={{ maxWidth: '60ch' }}>
                        {t.optionB}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="space-y-8">
        <Action
          n="1"
          title="Copy your complete Signature"
          body={
            !allResolved
              ? `Resolve ${unresolvedCount} ${unresolvedCount === 1 ? 'tension' : 'tensions'} above to unlock.`
              : displayedPrompt.length > 140
              ? displayedPrompt.slice(0, 140) + '…'
              : displayedPrompt
          }
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={copy}
            disabled={!allResolved}
          >
            {copied ? 'Copied to clipboard' : 'Copy prompt →'}
          </button>
        </Action>

        <Action
          n="2"
          title="Download your Signature card"
          body={`Filename: ${state.name.toLowerCase().replace(/\s+/g, '-')}-Signature-${dateStamp()}.txt`}
        >
          <button
            type="button"
            className="btn btn-ghost"
            onClick={download}
            disabled={!allResolved}
          >
            Download .txt →
          </button>
        </Action>

        <Action
          n="3"
          title="Try it now"
          body="Opens a new Claude conversation with your Signature pre-loaded."
        >
          <button
            type="button"
            className="btn btn-ghost"
            onClick={openInClaude}
            disabled={!allResolved}
          >
            Open in Claude →
          </button>
        </Action>
      </section>

      <div className="rule-h my-12" />

      <div className="flex justify-between items-center flex-wrap gap-3">
        <p className="muted text-xs">Saved on this device — your Signature is here when you come back.</p>
        <button
          type="button"
          className="btn-text text-sm"
          onClick={() => {
            clearSignature();
            setState(() => ({ ...INITIAL_STATE, currentScreen: 'welcome' }));
          }}
        >
          Start over
        </button>
      </div>
    </section>
  );
}

function Action({
  n,
  title,
  body,
  children,
}: {
  n: string;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[32px_1fr] gap-4 items-start">
      <span className="muted text-[12px] tracking-[0.14em] uppercase mt-1">{n}</span>
      <div>
        <p className="body-text text-[15px] font-semibold mb-2">{title}</p>
        <p className="muted text-xs mb-3 break-words" style={{ maxWidth: '60ch' }}>
          {body}
        </p>
        {children}
      </div>
    </div>
  );
}
