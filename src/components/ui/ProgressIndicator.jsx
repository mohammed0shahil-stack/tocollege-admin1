import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Horizontal numbered stepper with an animated fill line between steps.
 * Generic over any ordered list of step labels — not wizard-specific —
 * so it could equally drive onboarding flows elsewhere in the app.
 */
export default function ProgressIndicator({ steps, currentStep }) {
  return (
    <div className="flex items-center">
      {steps.map((label, i) => {
        const n = i + 1;
        const done = n < currentStep;
        const active = n === currentStep;
        return (
          <div key={label} className="flex items-center">
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-[12.5px] font-semibold flex-shrink-0 transition-all duration-300',
                  done && 'bg-primary text-primary',
                  active && 'bg-primary text-white shadow-[0_0_0_4px_rgba(14,107,71,0.12)]',
                  !done && !active && 'bg-gray-100 text-ink-tertiary'
                )}
              >
                {done ? <Check size={14} className="text-white" /> : n}
              </div>
              <span
                className={cn(
                  'text-[12.5px] font-medium hidden sm:inline transition-colors duration-200',
                  active ? 'text-ink font-semibold' : done ? 'text-ink-secondary' : 'text-ink-tertiary'
                )}
              >
                {label}
              </span>
            </div>
            {n < steps.length && (
              <div className="w-8 sm:w-[52px] h-[1.5px] bg-border-strong mx-2.5 sm:mx-3.5 relative overflow-hidden">
                <div
                  className={cn(
                    'absolute inset-0 bg-primary origin-left transition-transform duration-350',
                    done ? 'scale-x-100' : 'scale-x-0'
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
