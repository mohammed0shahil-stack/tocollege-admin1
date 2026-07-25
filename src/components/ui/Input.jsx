import { AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Labeled text input with built-in error state. Pass `error` as a string
 * to show the red border + inline message; omit it when the field is valid.
 */
export default function Input({ label, required = false, error, hint, className = '', inputClassName = '', id, ...props }) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={id} className="text-[12.5px] font-medium text-ink flex gap-1">
          {label}
          {required && <span className="text-destructive">*</span>}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'w-full h-10 px-3 rounded-sm border bg-white text-ink placeholder:text-ink-tertiary',
          'transition-colors duration-150 focus:outline-none',
          error
            ? 'border-destructive focus:ring-[3px] focus:ring-destructive-soft'
            : 'border-border-strong hover:border-ink-tertiary focus:border-primary focus:ring-[3px] focus:ring-primary-soft',
          inputClassName
        )}
        {...props}
      />
      {hint && !error && <span className="text-xs text-ink-tertiary">{hint}</span>}
      {error && (
        <span className="text-xs text-destructive flex items-center gap-1">
          <AlertCircle size={13} />{error}
        </span>
      )}
    </div>
  );
}
