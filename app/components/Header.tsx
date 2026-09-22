'use client';
import { useState } from 'react';
import { fmt, hue, short } from '../lib/ui';

interface Props {
  address: string | null;
  balance: number;
  symbol: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

export default function Header({ address, balance, symbol, onConnect, onDisconnect }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard blocked: ignore */
    }
  };

  return (
    <header className="wrap">
      <nav className="nav">
        <div className="brand">
          <div className="logo" />
          Cookie Jar
        </div>

        <div className="nav-right">
          <div className="net">
            <i /> <span>Cookie Chain</span>
          </div>

          {address ? (
            <div className="wallet">
              <button className="wallet-pill" onClick={copy} title={`${address} (click to copy)`} aria-label="Copy wallet address">
                <span className="avatar" style={{ background: `linear-gradient(135deg, hsl(${hue(address)} 90% 62%), hsl(${(hue(address) + 60) % 360} 90% 55%))` }} />
                {copied ? 'Copied' : short(address)}
                <span className="bal">{fmt(balance)} {symbol}</span>
              </button>
              <button className="link-btn" onClick={onDisconnect}>Disconnect</button>
            </div>
          ) : (
            <button className="btn btn-dark" onClick={onConnect}>Connect Nightly</button>
          )}
        </div>
      </nav>
    </header>
  );
}
