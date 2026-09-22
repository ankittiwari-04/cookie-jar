'use client';
import { useEffect } from 'react';
import type { TxState } from '../hooks/useTx';
import { txUrl } from '../lib/ui';

const ORDER = ['signing', 'sending', 'confirming', 'finalized'] as const;

const COPY: Record<string, { title: string; detail: string }> = {
  signing: { title: 'Approve in Nightly', detail: 'Check the wallet popup and approve this transaction.' },
  sending: { title: 'Sending to Cookie Chain', detail: 'Your signed transaction is on its way.' },
  confirming: { title: 'Confirming', detail: 'Waiting for the network to confirm it.' },
  finalized: { title: 'Confirmed', detail: '' },
};

export default function TxToast({ tx, onClose }: { tx: TxState; onClose: () => void }) {
  useEffect(() => {
    if (tx.stage !== 'finalized') return;
    const t = setTimeout(onClose, 9000);
    return () => clearTimeout(t);
  }, [tx.stage, onClose]);

  if (tx.stage === 'idle') return null;

  const isErr = tx.stage === 'error';
  const current = ORDER.indexOf(tx.stage as (typeof ORDER)[number]);
  const copy = isErr ? { title: 'Transaction failed', detail: tx.error ?? '' } : COPY[tx.stage];

  return (
    <div className={`toast ${isErr ? 'err' : ''}`} role="status" aria-live="polite">
      <div className="toast-top">
        <div>
          <div className="label">{tx.label}</div>
          <h4>{copy.title}</h4>
        </div>
        <button className="x" onClick={onClose} aria-label="Dismiss">×</button>
      </div>

      <div className="steps" aria-hidden="true">
        {ORDER.map((s, i) => (
          <span key={s} className={`step ${!isErr && i < current ? 'done' : ''} ${!isErr && i === current ? (tx.stage === 'finalized' ? 'done' : 'now') : ''}`} />
        ))}
      </div>

      {copy.detail && <p>{copy.detail}</p>}

      {tx.stage === 'finalized' && tx.signature && (
        <a href={txUrl(tx.signature)} target="_blank" rel="noreferrer">View on CookieScan</a>
      )}
    </div>
  );
}
