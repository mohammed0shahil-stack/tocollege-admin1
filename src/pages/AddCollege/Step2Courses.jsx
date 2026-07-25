import { Plus } from 'lucide-react';
import CourseCard from '../../components/wizard/CourseCard';

/** Step 2 — writes to the `college_courses` table. Unlimited course cards. */
export default function Step2Courses({ wizard }) {
  const { courses, updateCourse, addCourse, removeCourse } = wizard;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-1">Courses</h2>
      <p className="text-[13.5px] text-ink-secondary mb-8">Add every course this college offers. You can add as many as you need.</p>

      {courses.map((course, i) => (
        <CourseCard
          key={i}
          index={i}
          course={course}
          removable={courses.length > 1}
          onChange={(next) => updateCourse(i, next)}
          onRemove={() => removeCourse(i)}
        />
      ))}

      <button
        onClick={addCourse}
        className="flex items-center justify-center gap-2 w-full h-11 border-[1.5px] border-dashed border-border-strong rounded-md text-primary font-medium text-[13.5px] hover:bg-primary-soft hover:border-primary transition-colors"
      >
        <Plus size={16} /> Add another course
      </button>
    </div>
  );
}
