import { fmt, short, txUrl } from '../lib/ui';

export interface Activity {
  id: string;
  who: string;
  jar: string;
  amount: number;
  ago: string;
  signature?: string;
  fresh?: boolean;
}

export default function ActivityFeed({ items, symbol }: { items: Activity[]; symbol: string }) {
  return (
    <div className="receipt-wrap">
      <section className="receipt" aria-label="Recent tips">
        <h3>Live receipt</h3>
        <p className="sub">Latest tips on Cookie Chain</p>

        {items.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '18px 0' }}>No tips yet. Drop the first cookie in a jar.</p>
        ) : (
          <ul className="rows">
            {items.map((a) => (
              <li key={a.id} className={`row ${a.fresh ? 'fresh' : ''}`}>
                <span className="who">
                  {a.signature ? (
                    <a href={txUrl(a.signature)} target="_blank" rel="noreferrer">{short(a.who)}</a>
                  ) : (
                    short(a.who)
                  )}
                  <small>{a.jar} · {a.ago}</small>
                </span>
                <span className="dots" />
                <b>+{fmt(a.amount)}</b>
              </li>
            ))}
          </ul>
        )}

        <p className="foot">All amounts in {symbol}</p>
      </section>
    </div>
  );
}
