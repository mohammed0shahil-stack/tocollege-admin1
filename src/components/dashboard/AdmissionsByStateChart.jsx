import { useEffect, useState } from 'react';
import Card from '../ui/Card';

/**
 * Horizontal bar list. Hand-rolled with flex/width percentages rather than
 * a charting library — the data is simple enough that a dependency isn't
 * worth it, and it keeps full control over the premium look.
 */
export default function AdmissionsByStateChart({ data }) {
  const [animated, setAnimated] = useState(false);
  const max = Math.max(...data.map(([, val]) => val));

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <Card>
      <div className="flex items-center justify-between px-5 pt-[18px] pb-1">
        <h3 className="text-[14.5px] font-semibold">Admissions by state</h3>
        <span className="text-xs text-primary font-medium">This month</span>
      </div>
      <div className="px-5 pb-5 pt-4">
        {data.map(([name, value]) => (
          <div key={name} className="flex items-center gap-3 mb-3.5 last:mb-0">
            <span className="w-24 text-xs text-ink-secondary flex-shrink-0">{name}</span>
            <div className="flex-1 h-[9px] bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-[#1C9265] transition-all duration-1000 ease-out"
                style={{ width: animated ? `${(value / max) * 100}%` : '0%' }}
              />
            </div>
            <span className="w-10 text-right text-xs font-semibold tabular flex-shrink-0">{value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
