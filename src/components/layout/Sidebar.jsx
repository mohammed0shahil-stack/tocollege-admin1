import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Users, Headset, ClipboardCheck,
  BarChart3, Settings, LogOut, GraduationCap,
} from 'lucide-react';
import { cn } from '../../utils/cn';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'College Management', path: '/colleges', icon: Building2 },
  { label: 'Students', path: '/students', icon: Users },
  { label: 'Counselors', path: '/counselors', icon: Headset },
  { label: 'Admissions', path: '/admissions', icon: ClipboardCheck },
  { label: 'Reports', path: '/reports', icon: BarChart3 },
];

/**
 * Fixed left navigation. Uses NavLink so active-state styling comes from
 * the current route automatically instead of manually tracked state.
 */
export default function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    // TODO: replace with real supabase.auth.signOut() once auth is wired up.
    navigate('/login');
  }

  const linkClasses = ({ isActive }) =>
    cn(
      'flex items-center gap-[11px] h-[38px] px-3 rounded-sm text-[13.5px] font-medium transition-colors duration-150 w-full',
      isActive ? 'bg-primary-soft text-primary-active' : 'text-ink-secondary hover:bg-gray-100 hover:text-ink'
    );

  return (
    <aside className="w-[248px] flex-shrink-0 bg-white border-r border-border flex flex-col fixed top-0 left-0 bottom-0 z-20">
      <div className="h-16 flex items-center gap-2.5 px-5 font-bold text-[15.5px] tracking-tight border-b border-border flex-shrink-0">
        <div className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center flex-shrink-0">
          <GraduationCap size={16} />
        </div>
        <span>ToCollege</span>
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
          <NavLink key={path} to={path} className={linkClasses}>
            <Icon size={18} strokeWidth={1.75} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-border flex flex-col gap-0.5">
        <NavLink to="/settings" className={linkClasses}>
          <Settings size={18} strokeWidth={1.75} />
          <span>Settings</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex items-center gap-[11px] h-[38px] px-3 rounded-sm text-[13.5px] font-medium text-ink-secondary hover:bg-gray-100 hover:text-ink transition-colors duration-150 w-full text-left"
        >
          <LogOut size={18} strokeWidth={1.75} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
