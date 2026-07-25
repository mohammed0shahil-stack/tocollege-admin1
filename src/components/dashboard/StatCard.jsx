import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import Card from '../ui/Card';

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Animates 0 -> value on mount using an eased requestAnimationFrame loop. */
function useCountUp(target, format) {
  const [display, setDisplay] = useState(prefersReducedMotion ? format(target) : format(0));
  const started = useRef(false);

  useEffect(() => {
    if (started.current || prefersReducedMotion) return;
    started.current = true;
    const duration = 900;
    const start = performance.now();
    let frame;
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(format(target * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, format]);

  return display;
}

/** Single stat card: label, animated value, delta indicator, and an icon chip. */
export default function StatCard({ label, value, delta, icon: Icon, format = (v) => Math.round(v).toLocaleString('en-IN') }) {
  const display = useCountUp(value, format);

  return (
    <Card className="p-[18px] px-5">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[12.5px] text-ink-secondary font-medium">{label}</span>
        <div className="w-[30px] h-[30px] rounded-lg bg-primary-soft text-primary-active flex items-center justify-center">
          <Icon size={16} />
        </div>
      </div>
      <div className="text-[26px] font-bold tracking-tight tabular">{display}</div>
      {delta && (
        <div className="text-xs font-medium flex items-center gap-1 mt-1.5 text-primary">
          <ArrowUp size={12} />
          {delta}
        </div>
      )}
    </Card>
  );
}
