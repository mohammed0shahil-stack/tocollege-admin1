import { Briefcase, Plus } from 'lucide-react';
import Input from '../../components/ui/Input';
import Toggle from '../../components/ui/Toggle';
import RecruiterCard from '../../components/wizard/RecruiterCard';
import EmptyState from '../../components/ui/EmptyState';

/** Step 4 — writes to `college_placements` and `recruiters`. */
export default function Step4Placements({ wizard }) {
  const { placement, updatePlacement, recruiters, updateRecruiter, addRecruiter, removeRecruiter } = wizard;

  function handleRecruiterLogo(i, file) {
    const reader = new FileReader();
    reader.onload = (e) => updateRecruiter(i, { ...recruiters[i], logo: e.target.result });
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-1">Placements</h2>
      <p className="text-[13.5px] text-ink-secondary mb-8">Placement data is one of the biggest factors students filter by.</p>

      <div className="flex items-center justify-between p-4 px-[18px] bg-white border border-border rounded-md mb-5">
        <div>
          <b className="block text-[13.5px]">Placement cell available</b>
          <span className="text-xs text-ink-tertiary">Turn off if this college doesn't run a placement program</span>
        </div>
        <Toggle on={placement.available} onToggle={(v) => updatePlacement('available', v)} />
      </div>

      {placement.available && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px] mb-2">
          <Input
            label="Highest package (LPA)" type="number" inputClassName="tabular"
            value={placement.highest} onChange={(e) => updatePlacement('highest', e.target.value)}
            placeholder="e.g. 42"
          />
          <Input
            label="Average package (LPA)" type="number" inputClassName="tabular"
            value={placement.average} onChange={(e) => updatePlacement('average', e.target.value)}
            placeholder="e.g. 8.5"
          />
          <Input
            label="Placement percentage" type="number" max={100} inputClassName="tabular"
            value={placement.percentage} onChange={(e) => updatePlacement('percentage', e.target.value)}
            placeholder="e.g. 91"
          />
          <Input
            label="Placement officer"
            value={placement.officer} onChange={(e) => updatePlacement('officer', e.target.value)}
            placeholder="e.g. Neha Kapoor"
          />
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="text-[14.5px] font-semibold">Top recruiters</h4>
        <p className="text-xs text-ink-tertiary mt-0.5 mb-4">Companies that actively hire from this college.</p>

        {recruiters.length === 0 ? (
          <EmptyState
            size="sm"
            icon={Briefcase}
            title="No recruiters added yet"
            description="Showcase companies that hire your students."
          />
        ) : (
          recruiters.map((r, i) => (
            <RecruiterCard
              key={i}
              recruiter={r}
              onChange={(next) => updateRecruiter(i, next)}
              onLogoFile={(file) => handleRecruiterLogo(i, file)}
              onRemove={() => removeRecruiter(i)}
            />
          ))
        )}

        <button
          onClick={addRecruiter}
          className="flex items-center justify-center gap-2 w-full h-11 border-[1.5px] border-dashed border-border-strong rounded-md text-primary font-medium text-[13.5px] hover:bg-primary-soft hover:border-primary transition-colors mt-1"
        >
          <Plus size={16} /> Add recruiter
        </button>
      </div>
    </div>
  );
}
