import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TeacherDashboard from './Components/Dashboard/TeacherDashboard.jsx';
import StudentDashboard from './Components/Dashboard/StudentDashboard.jsx';
import AdminDashboard from './Components/Dashboard/AdminDashboard.jsx';
import LoginPage from './Components/Pages/LoginPage.jsx';
import { Navigate } from 'react-router-dom';
import Courses from './Components/Dashboard/Courses.jsx';
import Exam from './Components/Dashboard/Exam.jsx';
import App from './App.jsx';
import Student from './Components/Dashboard/StudentAdmin.jsx';
import Teacher from './Components/Dashboard/TeacherAdmin.jsx';
import TeacherProfile from './Components/Dashboard/TeacherProfile.jsx';

// PrivateRoute component with role check
const PrivateRoute = ({ children, requiredRole }) => {
  const userRole = localStorage.getItem('userRole');
  const isAuthenticated = !!localStorage.getItem('authToken'); // Check if the user is authenticated

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Fallback route for undefined paths (e.g., 404 page)
const NotFound = () => <h2>404 - Page Not Found</h2>;

// Create router
const router = createBrowserRouter([
  {
    path: '/teachers',
    element: <Teacher />,
  },
  {
    path: '/teachers/:id',
    element: <TeacherProfile />,
  },
  {
    path: '/exam',
    element: <Exam />,
  },
  {
    path: '/student',
    element: <Student />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/courses',
    element: <Courses />,
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute requiredRole="admin">
        <AdminDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: '/teacher',
    element: (
      <PrivateRoute requiredRole="teacher">
        <TeacherDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: '/studentsid',
    element: (
      <PrivateRoute requiredRole="student">
        <StudentDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

// Render the router
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);