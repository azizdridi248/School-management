import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';

// Import components
import TeacherDashboard from './Components/Dashboard/TeacherDashboard.jsx';
import StudentDashboard from './Components/Dashboard/StudentDashboard.jsx';
import AdminDashboard from './Components/Dashboard/AdminDashboard.jsx';
import LoginPage from './Components/Pages/LoginPage.jsx';
import Courses from './Components/Dashboard/Courses.jsx';
import Exam from './Components/Dashboard/Exam.jsx';
import App from './App.jsx';
import Student from './Components/Dashboard/StudentAdmin.jsx';
import TeacherAdmin from './Components/Dashboard/TeacherAdmin.jsx';
import TeacherProfile from './Components/Dashboard/TeacherProfile.jsx';
import TeacherList from './Components/Dashboard/TeacherList.jsx';
import CourseList from './Components/Dashboard/CourseList.jsx';
import ExamList from './Components/Dashboard/ExamList.jsx';

// Layout components
const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 w-full">
      <Outlet />
    </div>
  );
};

// PrivateRoute component with role check
const PrivateRoute = ({ children, requiredRole }) => {
  const userRole = localStorage.getItem('userRole');
  const isAuthenticated = !!localStorage.getItem('authToken');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Fallback route
const NotFound = () => <h2>404 - Page Not Found</h2>;

// Create router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  // Admin routes
  {
    path: '/admin',
    element: (
      <PrivateRoute requiredRole="admin">
        <AdminDashboard />
      </PrivateRoute>
    ),
  },
  // Teacher routes
  {
    path: '/teacher',
    element: (
      <PrivateRoute requiredRole="teacher">
        <TeacherDashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <TeacherDashboard />,
      },
      {
        path: 'profile',
        element: <TeacherProfile />,
      },
      {
        path: 'students',
        element: <Student />,
      },
    ],
  },
  // Student routes
  {
    path: '/student',
    element: (
      <PrivateRoute requiredRole="student">
        <StudentDashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <StudentDashboard />,
      },
      {
        path: 'teachers',
        element: <TeacherList />,
      },
      {
        path: 'courses',
        element: <CourseList />,
      },
      {
        path: 'exam',
        element: <ExamList />,
      },
    ],
  },
  // Public routes
  {
    path: '/teachers',
    element: <TeacherAdmin />,
  },
  {
    path: '/teachers/:id',
    element: <TeacherProfile />,
  },
  {
    path: '/courses',
    element: <Courses />,
  },
  {
    path: '/exam',
    element: <Exam />,
  },
  {
    path: '/students',
    element: <Student />,
  },
  // Fallback route
  {
    path: '*',
    element: <NotFound />,
  },
]);

// Ensure createRoot is called only once
const rootElement = document.getElementById('root');
let root;

if (!rootElement._reactRootContainer) {
  root = ReactDOM.createRoot(rootElement);
  rootElement._reactRootContainer = root;
} else {
  root = rootElement._reactRootContainer;
}

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);