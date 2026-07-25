import { Trash2 } from 'lucide-react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import IconButton from '../ui/IconButton';

/** One course entry in the wizard's Courses step — name, degree, duration, fee. */
export default function CourseCard({ index, course, onChange, onRemove, removable }) {
  return (
    <Card className="p-5 mb-3">
      <div className="flex items-center justify-between mb-3.5">
        <span className="text-xs font-semibold text-ink-tertiary uppercase tracking-wide">Course {index + 1}</span>
        {removable && <IconButton icon={Trash2} label="Remove course" danger onClick={onRemove} />}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Course name"
          className="sm:col-span-2"
          value={course.name}
          onChange={(e) => onChange({ ...course, name: e.target.value })}
          placeholder="e.g. B.Tech Computer Science"
        />
        <Input
          label="Degree"
          value={course.degree}
          onChange={(e) => onChange({ ...course, degree: e.target.value })}
          placeholder="e.g. B.Tech"
        />
        <Input
          label="Duration"
          value={course.duration}
          onChange={(e) => onChange({ ...course, duration: e.target.value })}
          placeholder="e.g. 4 years"
        />
        <Input
          label="Fee (admin only)"
          type="number"
          className="sm:col-span-2"
          inputClassName="tabular"
          value={course.fee}
          onChange={(e) => onChange({ ...course, fee: e.target.value })}
          placeholder="Annual fee in ₹"
        />
      </div>
    </Card>
  );
}
