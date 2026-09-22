'use client';
import { useCallback, useState } from 'react';

export type Stage = 'idle' | 'signing' | 'sending' | 'confirming' | 'finalized' | 'error';

export interface TxState {
  stage: Stage;
  label: string;
  signature?: string;
  error?: string;
}

export function friendlyError(e: unknown, symbol: string): string {
  const msg = e instanceof Error ? e.message : String(e);
  if (/reject|denied|declined|cancel|closed/i.test(msg))
    return 'The Nightly popup was closed before you approved. Try again when you are ready.';
  if (/insufficient|0x1\b|debit an account/i.test(msg))
    return `Your wallet does not have enough ${symbol} for this amount plus the network fee. Add funds or pick a smaller amount.`;
  if (/blockhash|expired|timeout|timed out/i.test(msg))
    return 'The transaction expired before the network confirmed it. Try again.';
  return msg || 'Something went wrong. Try again.';
}

export function useTx(symbol: string) {
  const [tx, setTx] = useState<TxState>({ stage: 'idle', label: '' });

  const run = useCallback(
    async (label: string, fn: (setStage: (s: Stage) => void) => Promise<string>) => {
      setTx({ stage: 'signing', label });
      try {
        const signature = await fn((s) => setTx((t) => ({ ...t, stage: s })));
        setTx({ stage: 'finalized', label, signature });
      } catch (e) {
        setTx({ stage: 'error', label, error: friendlyError(e, symbol) });
      }
    },
    [symbol]
  );

  const dismiss = useCallback(() => setTx({ stage: 'idle', label: '' }), []);
  const busy = tx.stage === 'signing' || tx.stage === 'sending' || tx.stage === 'confirming';

  return { tx, run, dismiss, busy };
}
