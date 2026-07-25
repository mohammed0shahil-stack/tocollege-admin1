import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

/** Renders whatever message was last passed to showToast(), auto-dismissing after ~2.6s. Mount once near the root. */
export default function Toast() {
  const { toast } = useToast();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!toast) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[400] flex items-center gap-2.5 bg-ink text-white px-5 py-3 rounded-sm text-[13.5px] font-medium shadow-lg transition-all duration-250 pointer-events-none ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
      {toast.message}
    </div>
  );
}
