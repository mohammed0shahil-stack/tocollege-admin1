import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Styled native <select>. Using a real <select> (rather than a hand-rolled
 * listbox) keeps keyboard/screen-reader behaviour correct for free.
 * `options` accepts strings or { label, value } objects.
 */
export default function Dropdown({ label, required = false, options = [], placeholder = 'Select', className = '', id, ...props }) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={id} className="text-[12.5px] font-medium text-ink flex gap-1">
          {label}
          {required && <span className="text-destructive">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className={cn(
            'w-full h-10 pl-3 pr-8 rounded-sm border border-border-strong bg-white text-ink appearance-none',
            'transition-colors duration-150 hover:border-ink-tertiary focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary-soft'
          )}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => {
            const value = typeof opt === 'string' ? opt : opt.value;
            const optLabel = typeof opt === 'string' ? opt : opt.label;
            return <option key={value} value={value}>{optLabel}</option>;
          })}
        </select>
        <ChevronDown size={16} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-tertiary pointer-events-none" />
      </div>
    </div>
  );
}
