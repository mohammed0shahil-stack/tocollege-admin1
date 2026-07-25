import { cn } from '../../utils/cn';

/** Circular spinner. Use `size` in px; defaults suit an inline button or a full-panel loading state. */
export default function LoadingSpinner({ size = 38, className = '' }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn('rounded-full border-[3px] border-primary-soft border-t-primary animate-spin', className)}
      style={{ width: size, height: size }}
    />
  );
}
