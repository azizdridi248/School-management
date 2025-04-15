import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSelector from '../Login/RoleSelector';
import LoginForm from '../Login/LoginForm';
import { authenticate } from '../../auth';

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setError('');
  };

  const handleLogin = async (credentials) => {
    try {
      const user = await authenticate(credentials, selectedRole);
      
      // Redirect based on role
      switch(user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'teacher':
          navigate('/teacher');
          break;
        case 'student':
          navigate('/student');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            School Management System
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please select your role and sign in
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {!selectedRole ? (
          <RoleSelector onSelect={handleRoleSelect} />
        ) : (
          <LoginForm 
            role={selectedRole} 
            onSubmit={handleLogin}
            onBack={() => setSelectedRole(null)}
          />
        )}
      </div>
    </div>
  );
};

export default LoginPage;