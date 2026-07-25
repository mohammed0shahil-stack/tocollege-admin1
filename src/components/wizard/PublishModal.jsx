import { useEffect, useState } from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';
import Button from '../ui/Button';

/**
 * Full publish sequence: Uploading -> Saving -> animated checkmark -> success
 * actions. The actual save (onPerformSave) runs during the "Saving" phase so
 * the visual sequence and the real async work land in the same place.
 */
export default function PublishModal({ open, collegeName, onPerformSave, onViewCollege, onAddAnother }) {
  const [phase, setPhase] = useState('uploading');
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (!open) {
      setPhase('uploading');
      return;
    }
    setPhase('uploading');
    let t2;
    const t1 = setTimeout(() => {
      setPhase('saving');
      t2 = setTimeout(async () => {
        await onPerformSave?.();
        setAnimKey((k) => k + 1);
        setPhase('success');
      }, 900);
    }, 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-[200] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[400px] max-w-[92vw] px-9 py-11 text-center">
        {phase !== 'success' ? (
          <>
            <LoadingSpinner className="mx-auto mb-5" />
            <div className="text-[14.5px] font-medium">{phase === 'uploading' ? 'Uploading...' : 'Saving...'}</div>
            <div className="text-xs text-ink-tertiary mt-1">Please don't close this window</div>
          </>
        ) : (
          <>
            <svg key={animKey} className="success-check w-16 h-16 mx-auto mb-5" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="26.5" />
              <path d="M18 31l8 8 16-17" />
            </svg>
            <div className="text-[17px] font-semibold mb-1.5">College published successfully</div>
            <div className="text-[13px] text-ink-secondary mb-6">{collegeName} is now live on ToCollege.</div>
            <div className="flex flex-col gap-2.5">
              <Button fullWidth onClick={onViewCollege}>View college</Button>
              <Button fullWidth variant="secondary" onClick={onAddAnother}>Add another college</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
