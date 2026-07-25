import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, Settings, LogOut } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

/** Sticky top bar: global search, notifications, and the admin profile menu. */
export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 border-b border-border bg-surface-bg/85 backdrop-blur-sm flex items-center justify-between px-7 sticky top-0 z-[15]">
      <div className="relative w-80">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-tertiary" />
        <input
          type="text"
          placeholder="Search colleges, students, leads..."
          className="w-full h-[38px] pl-9 pr-3.5 rounded-full border border-border bg-[#F3F4F3] text-[13.5px] transition-all duration-150 focus:bg-white focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary-soft"
        />
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => showToast('No new notifications')}
          aria-label="Notifications"
          className="relative w-9 h-9 rounded-sm flex items-center justify-center text-ink-secondary hover:bg-gray-100 hover:text-ink transition-colors"
        >
          <Bell size={18} strokeWidth={1.75} />
          <span className="absolute top-2 right-2 w-[7px] h-[7px] rounded-full bg-destructive border-[1.5px] border-surface-bg" />
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2.5 h-[38px] pl-1 pr-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <div className="w-[30px] h-[30px] rounded-full bg-primary-soft text-primary-active flex items-center justify-center text-xs font-bold flex-shrink-0">
              AK
            </div>
            <div className="text-left">
              <div className="text-[13px] font-medium leading-tight">Aisha Khan</div>
              <div className="text-[11.5px] text-ink-tertiary">Super Admin</div>
            </div>
            <ChevronDown size={15} className="text-ink-tertiary" />
          </button>

          <div
            className={`absolute top-[calc(100%+8px)] right-0 bg-white border border-border rounded-md shadow-md min-w-[190px] p-1.5 transition-all duration-150 z-30 ${
              menuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1.5'
            }`}
          >
            <button
              onClick={() => { setMenuOpen(false); navigate('/settings'); }}
              className="flex items-center gap-2.5 h-9 px-2.5 rounded-md w-full text-[13px] hover:bg-gray-100 transition-colors"
            >
              <Settings size={15} /> Settings
            </button>
            <div className="h-px bg-border my-1.5 mx-1" />
            <button
              onClick={() => { setMenuOpen(false); navigate('/login'); }}
              className="flex items-center gap-2.5 h-9 px-2.5 rounded-md w-full text-[13px] text-destructive hover:bg-gray-100 transition-colors"
            >
              <LogOut size={15} /> Log out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
