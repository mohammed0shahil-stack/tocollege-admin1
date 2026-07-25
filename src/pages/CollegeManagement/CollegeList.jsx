import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { getColleges, deleteCollege } from '../../services/collegeService';
import CollegeTable from '../../components/colleges/CollegeTable';
import DeleteCollegeModal from '../../components/colleges/DeleteCollegeModal';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useToast } from '../../hooks/useToast';

export default function CollegeList() {
  const [colleges, setColleges] = useState(null);
  const [query, setQuery] = useState('');
  const [pendingDelete, setPendingDelete] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    getColleges().then(setColleges);
  }, []);

  if (!colleges) {
    return (
      <div className="flex items-center justify-center py-24">
        <LoadingSpinner />
      </div>
    );
  }

  const q = query.trim().toLowerCase();
  const filtered = colleges.filter(
    (c) => !q || c.name.toLowerCase().includes(q) || c.state.toLowerCase().includes(q) || c.city.toLowerCase().includes(q)
  );

  async function handleConfirmDelete(college) {
    setPendingDelete(null);
    await deleteCollege(college.id);
    setColleges((prev) => prev.filter((c) => c.id !== college.id));
    showToast('College deleted');
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-semibold">College management</h1>
          <p className="text-[13.5px] text-ink-secondary mt-0.5">{colleges.length} colleges</p>
        </div>
        <Button onClick={() => navigate('/colleges/add')}>
          <Plus size={16} /> Add college
        </Button>
      </div>

      <div className="relative w-[280px] mb-3.5">
        <Search size={15} className="absolute left-[11px] top-1/2 -translate-y-1/2 text-ink-tertiary" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, state or city..."
          className="w-full h-9 pl-[34px] pr-3 rounded-sm border border-border-strong text-[13px] focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary-soft"
        />
      </div>

      <CollegeTable
        colleges={filtered}
        isFiltered={!!q}
        onClearSearch={() => setQuery('')}
        onView={(c) => showToast(`${c.name} — view page coming soon`)}
        onEdit={(c) => navigate('/colleges/add', { state: { editId: c.id } })}
        onDelete={setPendingDelete}
      />

      <DeleteCollegeModal college={pendingDelete} onCancel={() => setPendingDelete(null)} onConfirm={handleConfirmDelete} />
    </div>
  );
}
