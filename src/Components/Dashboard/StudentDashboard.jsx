import React from 'react';
import { useNavigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import { logout } from '../../auth';
import { FaChalkboardTeacher, FaBookOpen, FaFileAlt, FaSignOutAlt, FaHome, FaUser } from 'react-icons/fa';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const sidebarLinks = [
    { name: 'Dashboard', icon: <FaHome className="mr-3" />, path: '/tudentss' },
    { name: 'Teachers', icon: <FaChalkboardTeacher className="mr-3" />, path: 'teachers' },
    { name: 'Courses', icon: <FaBookOpen className="mr-3" />, path: 'courses' },
    { name: 'Exams', icon: <FaFileAlt className="mr-3" />, path: 'exam' },
    { name: 'Profile', icon: <FaUser className="mr-3" />, path: 'profile' },
  ];

  // Check if current route is active
  const isActiveRoute = (path) => {
    return location.pathname === `/student${path !== '/student' ? `/${path}` : ''}`;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-700">Student Portal</h2>
          <p className="text-sm text-gray-500">Welcome back!</p>
        </div>

        <nav className="flex-1 space-y-2">
          {sidebarLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-colors ${
                  isActive || isActiveRoute(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                }`
              }
            >
              <span className="text-lg">
                {item.icon}
              </span>
              <span className="ml-3 font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <FaSignOutAlt className="mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-6 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;