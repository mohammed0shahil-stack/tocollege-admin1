import { useEffect, useState } from 'react';
import Card from '../ui/Card';

/** Small-multiples column chart for course popularity, animated in on mount. */
export default function PopularCoursesChart({ data }) {
  const [animated, setAnimated] = useState(false);
  const max = Math.max(...data.map(([, val]) => val));

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <Card className="mt-4">
      <div className="flex items-center justify-between px-5 pt-[18px] pb-1">
        <h3 className="text-[14.5px] font-semibold">Most popular courses</h3>
        <span className="text-xs text-primary font-medium">By enrolment</span>
      </div>
      <div className="px-5 pb-5 pt-6">
        <div className="flex items-end gap-3.5 h-[150px]">
          {data.map(([name, value]) => (
            <div key={name} className="flex-1 flex flex-col items-center justify-end gap-2 h-full">
              <div className="relative w-full max-w-[34px] mx-auto flex-1 flex items-end">
                <div
                  className="w-full rounded-t-md rounded-b-[3px] bg-gradient-to-b from-[#1C9265] to-primary transition-all duration-1000 ease-out relative"
                  style={{ height: animated ? `${(value / max) * 100}%` : '0%' }}
                >
                  <span className="absolute -top-[18px] left-1/2 -translate-x-1/2 text-[11px] font-semibold whitespace-nowrap">
                    {value}
                  </span>
                </div>
              </div>
              <div className="text-[10.5px] text-ink-tertiary text-center leading-tight h-7">{name}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
