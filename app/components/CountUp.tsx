'use client';
import { useEffect, useRef, useState } from 'react';

export default function CountUp({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const [value, setValue] = useState(0);
  const from = useRef(0);

  useEffect(() => {
    const start = from.current;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / 1100, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = start + (to - start) * eased;
      setValue(v);
      from.current = v;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);

  return <>{value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</>;
}
