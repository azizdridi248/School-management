import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authenticate } from '../../auth';
import RoleSelector from '../Login/RoleSelector';
import LoginForm from '../Login/LoginForm';

const SchoolIllustration = () => (
  <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="#4F46E5" fillOpacity="0.1" />
    <path d="M100 150C100 122.386 122.386 100 150 100H250C277.614 100 300 122.386 300 150V250C300 277.614 277.614 300 250 300H150C122.386 300 100 277.614 100 250V150Z" fill="#4F46E5" fillOpacity="0.2" />
    <path d="M150 100H250C277.614 100 300 122.386 300 150V180H100V150C100 122.386 122.386 100 150 100Z" fill="#4F46E5" fillOpacity="0.4" />
    <rect x="120" y="130" width="40" height="40" rx="5" fill="white" />
    <rect x="180" y="130" width="40" height="40" rx="5" fill="white" />
    <rect x="240" y="130" width="40" height="40" rx="5" fill="white" />
    <rect x="120" y="190" width="40" height="40" rx="5" fill="white" />
    <rect x="180" y="190" width="40" height="40" rx="5" fill="white" />
    <rect x="240" y="190" width="40" height="40" rx="5" fill="white" />
    <path d="M50 50H350V80H50V50Z" fill="#4F46E5" />
    <path d="M80 80H320V110H80V80Z" fill="#4F46E5" fillOpacity="0.7" />
    <circle cx="200" cy="70" r="10" fill="white" />
  </svg>
);

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    console.log('Selected role:', role);
    setSelectedRole(role);
    setError('');
  };

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    setError('');
    
    try {
      console.log('Attempting authentication with:', { credentials, role: selectedRole });
      const user = await authenticate(credentials, selectedRole);
      console.log('Authenticated user:', user);
      console.log('Selected role:', selectedRole);
      console.log('User role vs Selected role:', { userRole: user?.role, selectedRole, isMatch: user?.role === selectedRole });
      
      // Validate user object
      if (!user || !user.role || user.role !== selectedRole) {
        throw new Error(`Invalid user role returned from authentication. Expected: ${selectedRole}, Got: ${user?.role || 'undefined'}`);
      }
  
      // Set localStorage
      localStorage.setItem('authToken', `token-${user.role}-${Date.now()}`);
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userData', JSON.stringify({ username: user.username, name: user.name }));
      console.log('localStorage set:', {
        authToken: localStorage.getItem('authToken'),
        userRole: localStorage.getItem('userRole'),
        userData: localStorage.getItem('userData')
      });
      
      setIsLoading(false);
  
      // Navigate based on role
      switch (user.role) {
        case 'admin':
          console.log('Navigating to /admin');
          navigate('/admin', { replace: true });
          break;
        case 'teacher':
          console.log('Navigating to /teacher');
          navigate('/teacher', { replace: true });
          break;
        case 'student':
          console.log('Navigating to /student');
          navigate('/student', { replace: true });
          break;
        default:
          console.log('Navigating to /');
          navigate('/', { replace: true });
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.message || 'Authentication failed');
      console.error('Authentication error:', err.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-indigo-50">
      <motion.div 
        className="hidden md:flex flex-1 items-center justify-center p-12 bg-indigo-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-lg">
          <SchoolIllustration />
          <motion.h2 
            className="mt-8 text-2xl font-bold text-white text-center"
            variants={itemVariants}
          >
            Welcome to Our School Community
          </motion.h2>
          <motion.p 
            className="mt-4 text-indigo-100 text-center"
            variants={itemVariants}
          >
            A modern platform for students, teachers, and administrators to connect and collaborate.
          </motion.p>
        </div>
      </motion.div>

      <motion.div 
        className="flex-1 flex items-center justify-center p-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden"
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
          <div className="bg-indigo-700 p-6 text-center">
            <h1 className="text-2xl font-bold text-white">School Management System</h1>
            <p className="text-indigo-200 mt-1">
              {selectedRole ? `Sign in as ${selectedRole}` : 'Select your role to continue'}
            </p>
          </div>

          <div className="p-8">
            {error && (
              <motion.div 
                className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-sm text-red-700">{error}</span>
                </div>
              </motion.div>
            )}

            {!selectedRole ? (
              <RoleSelector onSelect={handleRoleSelect} />
            ) : (
              <LoginForm 
                role={selectedRole} 
                onSubmit={handleLogin}
                onBack={() => setSelectedRole(null)}
                isLoading={isLoading}
              />
            )}

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <div className="text-sm text-gray-600">
                <a href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
                <span className="mx-2">·</span>
                <a href="/contact-support" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Need help?
                </a>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                © {new Date().getFullYear()} School Management System. All rights reserved.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;