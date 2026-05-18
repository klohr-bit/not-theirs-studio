'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { AppState, ResolvedContradiction } from '@/types';
import { saveSignature, clearSignature } from '@/lib/storage';
import { INITIAL_STATE } from '@/types';

interface Props {
  state: AppState;
  setState: (updater: (s: AppState) => AppState) => void;
}

function composePasteBlock(
  base: string,
  resolutions: ResolvedContradiction[]
): string {
  const resolved = resolutions.filter((r) => r.resolved === 'A' || r.resolved === 'B');
  if (resolved.length === 0) return base;
  const lines = ['', '', '== USER’S RESOLUTIONS =='];
  resolved.forEach((r) => {
    const chosen = r.resolved === 'A' ? r.optionA : r.optionB;
    lines.push(`— Tension: ${r.tension}`);
    lines.push(`  Chosen: Option ${r.resolved} — ${chosen}`);
  });
  return base + lines.join('\n');
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

  const pasteBlock = useMemo(
    () => composePasteBlock(signature.signature_prompt, tensions),
    [signature.signature_prompt, tensions]
  );

  const resolve = (id: string, choice: 'A' | 'B') => {
    setTensions((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, resolved: choice } : t));
      if (signature) saveSignature({ ...state, contradictions: next }, signature, next);
      setState((s) => ({ ...s, contradictions: next }));
      return next;
    });
  };

  // Keep local tensions in sync when external state.contradictions changes
  // (e.g., after restoring a saved signature on a return visit).
  useEffect(() => {
    setTensions(state.contradictions);
  }, [state.contradictions]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pasteBlock);
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
      pasteBlock,
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
    const url = `https://claude.ai/new?q=${encodeURIComponent(pasteBlock)}`;
    if (url.length > 7800) {
      // fall back: copy to clipboard, open Claude empty
      copy();
      window.open('https://claude.ai/new', '_blank', 'noopener');
      return;
    }
    window.open(url, '_blank', 'noopener');
  };

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
{pasteBlock}
        </pre>
      </section>

      {tensions.length > 0 && (
        <section className="mb-12">
          <p className="label-section">Tensions to resolve</p>
          <p className="muted text-sm mb-6" style={{ maxWidth: '60ch' }}>
            Before you use your Signature, resolve these:
          </p>
          <ul className="space-y-6">
            {tensions.map((t) => (
              <li key={t.id} className="card">
                <p className="body-text text-[15px] mb-4" style={{ maxWidth: '60ch' }}>
                  {t.tension}
                </p>
                <div className="space-y-3 mb-4">
                  <p className="muted text-sm">
                    <span className="font-semibold mr-2 muted" style={{ color: 'rgb(var(--ink))' }}>
                      Option A
                    </span>
                    {t.optionA}
                  </p>
                  <p className="muted text-sm">
                    <span className="font-semibold mr-2" style={{ color: 'rgb(var(--ink))' }}>
                      Option B
                    </span>
                    {t.optionB}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="muted text-xs tracking-[0.16em] uppercase">
                    Which feels right?
                  </span>
                  <button
                    type="button"
                    onClick={() => resolve(t.id, 'A')}
                    className={'chip ' + (t.resolved === 'A' ? 'chip-selected' : '')}
                  >
                    A
                  </button>
                  <button
                    type="button"
                    onClick={() => resolve(t.id, 'B')}
                    className={'chip ' + (t.resolved === 'B' ? 'chip-selected' : '')}
                  >
                    B
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="space-y-8">
        <Action
          n="1"
          title="Copy your complete Signature"
          body={pasteBlock.length > 140 ? pasteBlock.slice(0, 140) + '…' : pasteBlock}
        >
          <button type="button" className="btn btn-primary" onClick={copy}>
            {copied ? 'Copied to clipboard' : 'Copy prompt →'}
          </button>
        </Action>

        <Action
          n="2"
          title="Download your Signature card"
          body={`Filename: ${state.name.toLowerCase().replace(/\s+/g, '-')}-Signature-${dateStamp()}.txt`}
        >
          <button type="button" className="btn btn-ghost" onClick={download}>
            Download .txt →
          </button>
        </Action>

        <Action
          n="3"
          title="Try it now"
          body="Opens a new Claude conversation with your Signature pre-loaded."
        >
          <button type="button" className="btn btn-ghost" onClick={openInClaude}>
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
