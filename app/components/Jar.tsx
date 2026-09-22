import type { CSSProperties } from 'react';

interface Props {
  fill: number;
  size?: 'sm' | 'xl';
  rain?: boolean;
}

const DROPS = [22, 38, 54, 70, 30, 62, 46, 78];

export default function Jar({ fill, size = 'sm', rain = false }: Props) {
  const style = { '--fill': `${Math.max(4, Math.min(100, fill))}%` } as CSSProperties;
  return (
    <div className={`jar ${size === 'xl' ? 'jar-xl' : ''} ${rain ? 'open' : ''}`} style={style} aria-hidden="true">
      <div className="jar-lid" />
      <div className="jar-glass">
        <div className="pile" />
      </div>
      {rain &&
        DROPS.map((x, i) => (
          <span key={i} className="drop" style={{ '--x': x, '--d': `${(i * 0.4).toFixed(1)}s` } as CSSProperties} />
        ))}
    </div>
  );
}
