import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import Input from '../../components/ui/Input';
import Checkbox from '../../components/ui/Checkbox';
import Button from '../../components/ui/Button';

/**
 * Bonus page, not in the originally requested route list — included because
 * it was part of the prototype being converted. Not wired to Supabase Auth
 * yet (see Authentication in the roadmap); submitting just navigates to
 * /dashboard. Swap handleSubmit for a real supabase.auth.signInWithPassword
 * call once auth is built.
 */
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@tocollege.com');
  const [password, setPassword] = useState('password');
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // TODO: replace with supabase.auth.signInWithPassword({ email, password })
    setTimeout(() => navigate('/dashboard'), 500);
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex flex-1 flex-col justify-between p-14 relative overflow-hidden text-white bg-[linear-gradient(160deg,#0B4A32,#0E6B47_55%,#137C54)]">
        <div
          className="absolute inset-0 opacity-50"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,.14) 1px, transparent 0)', backgroundSize: '22px 22px' }}
        />
        <div className="relative flex items-center gap-2.5 font-bold text-[17px] tracking-tight">
          <div className="w-8 h-8 rounded-[9px] bg-white/15 flex items-center justify-center">
            <GraduationCap size={18} />
          </div>
          ToCollege
        </div>
        <div className="relative max-w-[440px]">
          <h1 className="text-[34px] leading-[1.2] font-bold tracking-tight mb-3.5">
            Every college your team manages, in one calm place.
          </h1>
          <p className="text-[15px] leading-relaxed text-white/80">
            Courses, media, placements and recruiters — structured, searchable, and ready to publish in minutes.
          </p>
        </div>
        <div className="relative flex gap-9">
          <div><b className="block text-2xl font-bold tabular">128</b><span className="text-xs text-white/70">Colleges managed</span></div>
          <div><b className="block text-2xl font-bold tabular">45.2K</b><span className="text-xs text-white/70">Students placed</span></div>
          <div><b className="block text-2xl font-bold tabular">612</b><span className="text-xs text-white/70">Courses listed</span></div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-[360px]">
          <h2 className="text-[22px] font-semibold mb-1.5">Welcome back</h2>
          <p className="text-[13.5px] text-ink-secondary mb-7">Sign in to your admin workspace</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
            <Input label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <div className="flex items-center justify-between text-[13px]">
              <Checkbox label="Remember me" checked={remember} onChange={setRemember} />
              <a href="#" onClick={(e) => e.preventDefault()} className="text-primary font-medium hover:underline">Forgot password?</a>
            </div>
            <Button type="submit" fullWidth className="h-[42px]" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
          <p className="text-center text-xs text-ink-tertiary mt-[22px]">Demo workspace — any email &amp; password works</p>
        </div>
      </div>
    </div>
  );
}
