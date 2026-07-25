import { cn } from '../../utils/cn';

/** Square icon-only button used for row actions, topbar icons, close buttons, etc. */
export default function IconButton({ icon: Icon, label, danger = false, size = 9, className = '', ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        `w-${size} h-${size} rounded-sm inline-flex items-center justify-center text-ink-secondary`,
        'transition-colors duration-150 hover:bg-gray-100 hover:text-ink',
        danger && 'hover:bg-destructive-soft hover:text-destructive',
        className
      )}
      {...props}
    >
      <Icon size={16} strokeWidth={1.75} />
    </button>
  );
}
