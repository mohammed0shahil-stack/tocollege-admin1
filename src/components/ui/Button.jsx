import { cn } from '../../utils/cn';

const VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  secondary: 'bg-white text-ink border border-border-strong hover:bg-gray-50 hover:border-ink-tertiary',
  ghost: 'bg-transparent text-ink-secondary hover:bg-gray-100 hover:text-ink',
  destructive: 'bg-destructive text-white hover:bg-destructive-hover',
};

const SIZES = {
  sm: 'h-8 px-3 text-[12.5px]',
  md: 'h-[38px] px-4 text-[13.5px]',
};

/**
 * Base button used everywhere in the app. Compose variant + size rather
 * than creating one-off buttons per page.
 */
export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  children,
  ...props
}) {
  return (
    <Component
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-sm font-medium whitespace-nowrap',
        'transition-colors duration-150 active:translate-y-px',
        VARIANTS[variant],
        SIZES[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
