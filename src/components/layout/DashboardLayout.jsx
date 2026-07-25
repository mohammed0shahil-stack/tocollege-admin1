import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';

/**
 * Shell used by every authenticated route: fixed sidebar + sticky topbar +
 * routed page content + footer. Individual pages render via <Outlet />,
 * so adding a new section only means adding a route, not touching this file.
 */
export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-[248px] flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-7 max-w-[1400px] w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
