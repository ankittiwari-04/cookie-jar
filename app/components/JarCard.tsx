'use client';
import { useState } from 'react';
import Jar from './Jar';
import { fmt, short } from '../lib/ui';

export interface JarData {
  id: string;
  name: string;
  creator: string;
  goal: number;
  raised: number;
  supporters: number;
}

interface Props {
  jar: JarData;
  symbol: string;
  connected: boolean;
  busy: boolean;
  onTip: (jar: JarData, amount: number) => void;
  onConnect: () => void;
}

const AMOUNTS = [0.001, 0.01, 0.1];

export default function JarCard({ jar, symbol, connected, busy, onTip, onConnect }: Props) {
  const [amount, setAmount] = useState(0.01);
  const pct = Math.min(100, (jar.raised / jar.goal) * 100);
  const full = jar.raised >= jar.goal;

  return (
    <article className="jar-card">
      {full && <div className="stamp">Goal reached</div>}

      <div>
        <Jar fill={pct} />
        <div className="pct">{Math.round(pct)}% full</div>
      </div>

      <div>
        <h3 className="jar-name">{jar.name}</h3>
        <p className="by">by {short(jar.creator)} · {jar.supporters} supporters</p>
        <div className="raised">{fmt(jar.raised)} {symbol}</div>
        <div className="goal">of {fmt(jar.goal)} {symbol} goal</div>

        <div className="amounts" role="group" aria-label="Tip amount">
          {AMOUNTS.map((a) => (
            <button key={a} className="amt" aria-pressed={amount === a} onClick={() => setAmount(a)}>
              {a}
            </button>
          ))}
        </div>

        {connected ? (
          <button className="btn btn-dark btn-block" disabled={busy} onClick={() => onTip(jar, amount)}>
            Tip {amount} {symbol}
          </button>
        ) : (
          <button className="btn btn-block" onClick={onConnect}>
            Connect to tip
          </button>
        )}
      </div>
    </article>
  );
}
