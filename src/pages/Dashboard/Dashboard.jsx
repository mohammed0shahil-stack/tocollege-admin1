import { useEffect, useState } from 'react';
import { Building2, ClipboardCheck, GraduationCap, Users, UserPlus } from 'lucide-react';
import { getColleges } from '../../services/collegeService';
import { mockStateAdmissions, mockPopularCourses, mockActivity } from '../../utils/mockData';
import StatCard from '../../components/dashboard/StatCard';
import AdmissionsByStateChart from '../../components/dashboard/AdmissionsByStateChart';
import PopularCoursesChart from '../../components/dashboard/PopularCoursesChart';
import ActivityFeed from '../../components/dashboard/ActivityFeed';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function Dashboard() {
  const [colleges, setColleges] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getColleges().then((data) => {
      if (!cancelled) setColleges(data);
    });
    return () => { cancelled = true; };
  }, []);

  if (!colleges) {
    return (
      <div className="flex items-center justify-center py-24">
        <LoadingSpinner />
      </div>
    );
  }

  const stats = [
    { label: 'Total colleges', value: colleges.length, delta: '+6 this month', icon: Building2 },
    { label: 'Admission open', value: colleges.filter((c) => c.status === 'Open').length, delta: '+3 this month', icon: ClipboardCheck },
    { label: 'Total courses', value: colleges.reduce((sum, c) => sum + c.courses.length, 0) + 594, delta: '+18 this month', icon: GraduationCap },
    { label: 'Students', value: 45280, delta: '+2.1K this month', icon: Users, format: (v) => (v / 1000).toFixed(1) + 'K' },
    { label: 'Leads', value: 1284, delta: '+142 this week', icon: UserPlus },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold">Dashboard</h1>
        <p className="text-[13.5px] text-ink-secondary mt-0.5">Here's what's happening across ToCollege today.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_1fr] gap-4 items-start">
        <AdmissionsByStateChart data={mockStateAdmissions} />
        <ActivityFeed items={mockActivity} />
      </div>

      <PopularCoursesChart data={mockPopularCourses} />
    </div>
  );
}
