import { cn } from '../../utils/cn';

export default function Textarea({ label, required = false, hint, className = '', id, ...props }) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={id} className="text-[12.5px] font-medium text-ink flex gap-1">
          {label}
          {required && <span className="text-destructive">*</span>}
        </label>
      )}
      <textarea
        id={id}
        rows={3}
        className={cn(
          'w-full min-h-[84px] px-3 py-2.5 rounded-sm border border-border-strong bg-white text-ink placeholder:text-ink-tertiary resize-y',
          'transition-colors duration-150 hover:border-ink-tertiary focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary-soft'
        )}
        {...props}
      />
      {hint && <span className="text-xs text-ink-tertiary">{hint}</span>}
    </div>
  );
}
