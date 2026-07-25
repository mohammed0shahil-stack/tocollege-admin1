import { cn } from '../../utils/cn';

const TONES = {
  open: 'bg-primary-soft text-primary-active',
  closed: 'bg-gray-100 text-ink-secondary',
  upcoming: 'bg-warning-soft text-warning',
  grade: 'bg-gray-100 text-ink font-bold',
  neutral: 'bg-gray-100 text-ink-secondary',
};

const DOT_TONES = {
  open: 'bg-primary',
  closed: 'bg-ink-tertiary',
  upcoming: 'bg-warning',
};

/** Small pill used for status/grade labels. Pass `dot` to show a status dot (badges without a dot, e.g. grade, omit it). */
export default function Badge({ tone = 'neutral', dot = false, className = '', children }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold whitespace-nowrap', TONES[tone], className)}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', DOT_TONES[tone])} />}
      {children}
    </span>
  );
}
