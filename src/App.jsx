import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import CollegeList from './pages/CollegeManagement/CollegeList';
import AddCollege from './pages/AddCollege/AddCollege';
import Students from './pages/Students/Students';
import Counselors from './pages/Counselors/Counselors';
import Admissions from './pages/Admissions/Admissions';
import Reports from './pages/Reports/Reports';
import Settings from './pages/Settings/Settings';
import Login from './pages/Login/Login';

/**
 * Route map matches the brief exactly:
 *   /dashboard  /colleges  /colleges/add  /students  /counselors  /admissions  /reports  /settings
 *
 * /colleges/add sits outside <DashboardLayout> because AddCollege renders its
 * own full-page takeover (matching the original prototype) and doesn't need
 * the sidebar/topbar mounted underneath it.
 *
 * /login is a bonus addition (see pages/Login) since it was part of the
 * prototype being converted, even though it wasn't in the requested route
 * list — Authentication itself is called out as future scope, so it isn't
 * wired to a real session yet.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/colleges/add" element={<AddCollege />} />

      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/colleges" element={<CollegeList />} />
        <Route path="/students" element={<Students />} />
        <Route path="/counselors" element={<Counselors />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
