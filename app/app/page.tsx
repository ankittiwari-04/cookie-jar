'use client';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Jar from '../components/Jar';
import JarCard, { JarData } from '../components/JarCard';
import ActivityFeed, { Activity } from '../components/ActivityFeed';
import TxToast from '../components/TxToast';
import CountUp from '../components/CountUp';
import { useTx } from '../hooks/useTx';
import { SYMBOL } from '../lib/ui';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const SEED_JARS: JarData[] = [
  { id: '1', name: 'Ship the mobile app', creator: 'Cke7xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9Pus', goal: 20, raised: 13.6, supporters: 42 },
  { id: '2', name: 'Meme artist starter pack', creator: 'M3meAr7ist5GpQ8oLwT2nBxYd4KfHcVu9RsZeJ1aXo6', goal: 10, raised: 10, supporters: 87 },
  { id: '3', name: 'Cookiebox translation crew', creator: 'Tr4nsL8Cr3wPq2VnMx7HdKfWbYs5GeJuA9oRz1LcTk0', goal: 15, raised: 4.2, supporters: 19 },
  { id: '4', name: 'Late-night dev fund', creator: 'D3vFund9NightQw7ErTy2UiOp5AsDf8GhJk1LzXcVb4', goal: 8, raised: 2.1, supporters: 11 },
];
const SEED_ACTIVITY: Activity[] = [
  { id: 'a1', who: 'Ab3xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9Pus', jar: 'Meme artist starter pack', amount: 1, ago: '2m' },
  { id: 'a2', who: 'Kp9zLwT2nBxYd4KfHcVu9RsZeJ1aXo6M3meAr7ist5', jar: 'Ship the mobile app', amount: 0.5, ago: '6m' },
  { id: 'a3', who: 'Zx1cVb4D3vFund9NightQw7ErTy2UiOp5AsDf8GhJk', jar: 'Late-night dev fund', amount: 0.1, ago: '11m' },
];

export default function Home() {
  /* WALLET: replace this block with your existing Nightly wallet code */
  const [address, setAddress] = useState<string | null>(null);
  const wallet = {
    address,
    balance: 12.48,
    connect: () => setAddress('N1ghtLy7xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9'),
    disconnect: () => setAddress(null),
  };
  const connected = !!wallet.address;

  const [jars, setJars] = useState(SEED_JARS);
  const [activity, setActivity] = useState(SEED_ACTIVITY);
  const [tipsToday, setTipsToday] = useState(128);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('10');
  const { tx, run, dismiss, busy } = useTx(SYMBOL);

  const totalTipped = jars.reduce((s, j) => s + j.raised, 0);
  const supporters = jars.reduce((s, j) => s + j.supporters, 0);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setModal(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal]);

  /* TIP: replace the marked block with your real transaction */
  const handleTip = (jar: JarData, amount: number) =>
    run(`Tip ${amount} ${SYMBOL} to ${jar.name}`, async (stage) => {
      // REAL VERSION: build the transfer/instruction, have Nightly sign and send it,
      // call stage('sending') once signed and stage('confirming') once sent,
      // await connection.confirmTransaction(signature) and return the signature string.
      stage('sending');
      await sleep(900);
      stage('confirming');
      await sleep(1100);
      const signature = `demo${Date.now()}`;

      setJars((js) => js.map((j) => (j.id === jar.id ? { ...j, raised: j.raised + amount, supporters: j.supporters + 1 } : j)));
      setTipsToday((n) => n + 1);
      setActivity((a) => [{ id: signature, who: wallet.address!, jar: jar.name, amount, ago: 'now', signature, fresh: true }, ...a.map((x) => ({ ...x, fresh: false }))].slice(0, 7));
      return signature;
    });

  const handleCreate = async () => {
    const goalNum = parseFloat(goal);
    if (!name.trim() || !(goalNum > 0)) return;
    setModal(false);
    await run(`Create "${name.trim()}"`, async (stage) => {
      stage('sending');
      await sleep(900);
      stage('confirming');
      await sleep(1000);
      const signature = `demo${Date.now()}`;
      setJars((js) => [{ id: signature, name: name.trim(), creator: wallet.address!, goal: goalNum, raised: 0, supporters: 0 }, ...js]);
      return signature;
    });
    setName('');
    setGoal('10');
  };

  return (
    <>
      <Header address={wallet.address} balance={wallet.balance} symbol={SYMBOL} onConnect={wallet.connect} onDisconnect={wallet.disconnect} />

      <main className="wrap">
        <section className="hero">
          <div>
            <h1>
              Fill a jar.
              <br />
              Tip a creator.
            </h1>
            <p>
              Start a cookie jar for whatever you are building. Anyone can drop {SYMBOL} in, and every tip settles on Cookie Chain in under a second.
            </p>
            <div className="hero-actions">
              {connected ? (
                <button className="btn btn-lg" onClick={() => setModal(true)}>Start a jar</button>
              ) : (
                <button className="btn btn-lg" onClick={wallet.connect}>Connect Nightly</button>
              )}
              <span className="hero-note">Tiny fees. No sign-up. Just your wallet.</span>
            </div>
          </div>
          <div className="hero-jar">
            <Jar size="xl" fill={62} rain />
          </div>
        </section>

        <section className="stats" aria-label="Totals">
          <div className="stat"><b><CountUp to={totalTipped} decimals={1} /></b><span>{SYMBOL} tipped</span></div>
          <div className="stat"><b><CountUp to={jars.length} /></b><span>Open jars</span></div>
          <div className="stat"><b><CountUp to={supporters} /></b><span>Supporters</span></div>
          <div className="stat"><b><CountUp to={tipsToday} /></b><span>Tips today</span></div>
        </section>

        <div className="main">
          <section>
            <div className="sec-head">
              <h2 className="h2">Open jars</h2>
              {connected && <button className="btn" onClick={() => setModal(true)}>Start a jar</button>}
            </div>
            <div className="jars">
              {jars.map((j) => (
                <JarCard key={j.id} jar={j} symbol={SYMBOL} connected={connected} busy={busy} onTip={handleTip} onConnect={wallet.connect} />
              ))}
            </div>
          </section>

          <ActivityFeed items={activity} symbol={SYMBOL} />
        </div>
      </main>

      <TxToast tx={tx} onClose={dismiss} />

      {modal && (
        <div className="scrim" onClick={() => setModal(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="new-jar" onClick={(e) => e.stopPropagation()}>
            <h3 id="new-jar">Start a jar</h3>
            <p className="hint">Name it, set a goal, and share the link. Tips go straight to your wallet.</p>
            <label className="field">
              Jar name
              <input autoFocus value={name} maxLength={40} onChange={(e) => setName(e.target.value)} placeholder="Ship the mobile app" />
            </label>
            <label className="field">
              Goal ({SYMBOL})
              <input inputMode="decimal" value={goal} onChange={(e) => setGoal(e.target.value)} />
            </label>
            <div className="modal-actions">
              <button className="btn" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn btn-dark" onClick={handleCreate} disabled={!name.trim() || !(parseFloat(goal) > 0)}>Create jar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
