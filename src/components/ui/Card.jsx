import { cn } from '../../utils/cn';

/** Generic white surface card used for panels, stat cards, and grouped content. */
export default function Card({ className = '', children, ...props }) {
  return (
    <div
      className={cn('bg-white border border-border rounded-md shadow-xs', className)}
      {...props}
    >
      {children}
    </div>
  );
}
