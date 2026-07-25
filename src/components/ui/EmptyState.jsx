import { cn } from '../../utils/cn';

/** Centered icon + heading + body + optional action, used for empty tables/lists across the app. */
export default function EmptyState({ icon: Icon, title, description, action, size = 'md', className = '' }) {
  const compact = size === 'sm';
  return (
    <div className={cn('flex flex-col items-center justify-center text-center', compact ? 'py-9 px-6' : 'py-16 px-6', className)}>
      {Icon && (
        <Icon
          size={compact ? 44 : 72}
          strokeWidth={1.3}
          className="text-border-strong mb-3.5"
        />
      )}
      <h3 className={cn('font-semibold', compact ? 'text-[13.5px]' : 'text-[15px]')}>{title}</h3>
      {description && <p className={cn('text-ink-secondary mt-1 max-w-xs', compact ? 'text-xs mb-3.5' : 'text-[13px] mb-4.5')}>{description}</p>}
      {action}
    </div>
  );
}
