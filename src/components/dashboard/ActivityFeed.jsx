import { Check, Briefcase, GraduationCap, ClipboardCheck, UserPlus, Pencil } from 'lucide-react';
import Card from '../ui/Card';
import { useToast } from '../../hooks/useToast';

const ICONS = { check: Check, briefcase: Briefcase, graduation: GraduationCap, clipboard: ClipboardCheck, userplus: UserPlus, pencil: Pencil };

/** Recent-activity timeline shown on the Dashboard. */
export default function ActivityFeed({ items }) {
  const { showToast } = useToast();

  return (
    <Card>
      <div className="flex items-center justify-between px-5 pt-[18px] pb-1">
        <h3 className="text-[14.5px] font-semibold">Recent activity</h3>
        <button onClick={() => showToast("You're all caught up")} className="text-xs text-primary font-medium">
          Mark all read
        </button>
      </div>
      <div className="px-5 pb-5 pt-4 flex flex-col">
        {items.map((item, i) => {
          const Icon = ICONS[item.icon] ?? Check;
          return (
            <div key={i} className="flex gap-3 py-2.5 border-b border-border last:border-b-0 last:pb-0">
              <div className="w-7 h-7 rounded-full bg-primary-soft text-primary-active flex items-center justify-center flex-shrink-0">
                <Icon size={14} />
              </div>
              <div>
                <div className="text-[13px] leading-snug">{item.text}</div>
                <div className="text-[11.5px] text-ink-tertiary mt-0.5">{item.time}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
