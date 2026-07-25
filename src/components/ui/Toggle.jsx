import { cn } from '../../utils/cn';

/** iOS-style on/off switch. Controlled: pass `on` and `onToggle`. */
export default function Toggle({ on, onToggle, className = '' }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onToggle(!on)}
      className={cn(
        'relative w-10 h-6 rounded-full flex-shrink-0 transition-colors duration-200',
        on ? 'bg-primary' : 'bg-border-strong',
        className
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200',
          on && 'translate-x-4'
        )}
      />
    </button>
  );
}
