import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TeacherDashboard from './Components/Dashboard/TeacherDashboard.jsx';
import StudentDashboard from './Components/Dashboard/StudentDashboard.jsx';
import AdminDashboard from './Components/Dashboard/AdminDashboard.jsx';
import LoginPage from './Components/Pages/LoginPage.jsx';
import { Navigate } from 'react-router-dom';
import Courses from './Components/Dashboard/Courses.jsx'
import Exam from './Components/Dashboard/Exam.jsx'

import App from './App.jsx'
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
    element: <Teacher />, // Login page is standalone
  },

  {path:"/teachers/:id", element :<TeacherProfile /> },
  {
    path: '/exam',
    element: <Exam />, // Login page is standalone
  },
  {
    path: '/student',
    element: <Student />, // Login page is standalone
  },

  {
    path: '/login',
    element: <LoginPage />, // Login page is standalone
  },
  {
    path : '/',
    element : <App />

  },
  {
    path : '/courses',
    element : <Courses />

  },
  {
    path: '/teacher',
    element: (
  
        <TeacherDashboard />

    ),
  },
  {
    path: '/student',
    element: (
      
        <StudentDashboard />
      
    ),
  },
  {
    path: '/admin',
    element: (
    
        <AdminDashboard />
    ),
  },
  {
    path: '*', // Catch-all route for undefined paths
    element: <NotFound />, // Show 404 for undefined paths
  },
]);

// Render the router
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
