import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

/** Custom-styled checkbox. Controlled: pass `checked` and `onChange(nextChecked)`. */
export default function Checkbox({ checked, onChange, label, className = '' }) {
  return (
    <label className={cn('flex items-center gap-2.5 cursor-pointer select-none', className)}>
      <span className="relative inline-flex">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer absolute inset-0 opacity-0 w-[18px] h-[18px] cursor-pointer"
        />
        <span
          className={cn(
            'w-[18px] h-[18px] rounded-[5px] border-[1.5px] flex items-center justify-center transition-colors duration-150',
            checked ? 'bg-primary border-primary' : 'bg-white border-border-strong',
            'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-primary peer-focus-visible:outline-offset-2'
          )}
        >
          <Check size={12} strokeWidth={3} className={cn('text-white transition-all duration-150', checked ? 'opacity-100 scale-100' : 'opacity-0 scale-50')} />
        </span>
      </span>
      {label && <span className="text-[13.5px]">{label}</span>}
    </label>
  );
}
