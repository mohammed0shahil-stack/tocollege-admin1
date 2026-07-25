import { cn } from '../../utils/cn';

/**
 * Styling wrapper around a native <table>. Pages compose their own
 * <thead>/<tbody> using the Th/Td helpers below, keeping column
 * definitions and row logic local to whichever page needs them.
 */
export function Table({ children, className = '' }) {
  return (
    <div className={cn('bg-white border border-border rounded-md overflow-hidden shadow-xs', className)}>
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}

export function Th({ children, align = 'left', className = '' }) {
  return (
    <th
      className={cn(
        'text-[11.5px] font-semibold text-ink-tertiary uppercase tracking-wide px-[18px] py-3 bg-[#FBFBFA] border-b border-border whitespace-nowrap',
        align === 'right' ? 'text-right' : 'text-left',
        className
      )}
    >
      {children}
    </th>
  );
}

export function Td({ children, align = 'left', className = '' }) {
  return (
    <td className={cn('px-[18px] py-[13px] border-b border-border text-[13.5px] align-middle', align === 'right' && 'text-right', className)}>
      {children}
    </td>
  );
}

export function Tr({ children, className = '' }) {
  return <tr className={cn('transition-colors duration-100 hover:bg-[#FBFCFB] last:[&>td]:border-b-0', className)}>{children}</tr>;
}
