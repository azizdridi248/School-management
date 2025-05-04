import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { logout } from '../../auth';
import { FaChalkboardTeacher, FaBookOpen, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarLinks = [
    { name: 'Teacher', icon: <FaChalkboardTeacher className="mr-3" />, path: '/teachers' },
    { name: 'Cours', icon: <FaBookOpen className="mr-3" />, path: '/courses' },
    { name: 'Exam', icon: <FaFileAlt className="mr-3" />, path: '/exam' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Menu</h2>
        <nav className="space-y-3">
          {sidebarLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center w-full text-left p-2 rounded-md transition ${
                  isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center text-red-600 hover:text-red-800 mt-10"
        >
          <FaSignOutAlt className="mr-2" />
          Déconnexion
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
        </header>
        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
          <p className="text-xl text-gray-500">Bienvenue sur votre espace étudiant</p>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
