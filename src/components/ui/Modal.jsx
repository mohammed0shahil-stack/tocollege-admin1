import { cn } from '../../utils/cn';

/**
 * Centered overlay modal. Renders nothing when `open` is false, so it's
 * safe to always mount and just toggle the `open` prop from the parent.
 */
export default function Modal({ open, onClose, children, maxWidth = 'max-w-[380px]', dismissible = true }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-ink/45 z-[300] flex items-center justify-center"
      onClick={() => dismissible && onClose?.()}
    >
      <div
        className={cn('bg-white rounded-lg shadow-lg w-full mx-4', maxWidth)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
