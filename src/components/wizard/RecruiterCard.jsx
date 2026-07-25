import { Briefcase, Trash2 } from 'lucide-react';
import IconButton from '../ui/IconButton';

/** One recruiter row in the Placements step — logo upload + name + remove. */
export default function RecruiterCard({ recruiter, onChange, onLogoFile, onRemove }) {
  return (
    <div className="flex items-center gap-3.5 bg-white border border-border rounded-md p-3 mb-2.5">
      <label className="relative w-11 h-11 rounded-[10px] bg-gray-100 border border-dashed border-border-strong flex items-center justify-center text-ink-tertiary overflow-hidden cursor-pointer flex-shrink-0">
        {recruiter.logo ? (
          <img src={recruiter.logo} alt="" className="w-full h-full object-cover" />
        ) : (
          <Briefcase size={16} />
        )}
        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files[0] && onLogoFile(e.target.files[0])} />
      </label>
      <input
        value={recruiter.name}
        onChange={(e) => onChange({ ...recruiter, name: e.target.value })}
        placeholder="Recruiter name"
        className="flex-1 h-10 px-3 rounded-sm border border-border-strong text-[13.5px] focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary-soft"
      />
      <IconButton icon={Trash2} label="Remove recruiter" danger onClick={onRemove} />
    </div>
  );
}
