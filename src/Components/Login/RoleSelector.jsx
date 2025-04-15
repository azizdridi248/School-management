import React from 'react';

const RoleSelector = ({ onSelect }) => {
  const roles = [
    { id: 'admin', name: 'Administrator', description: 'Manage system settings and users' },
    { id: 'teacher', name: 'Teacher', description: 'Manage courses and student grades' },
    { id: 'student', name: 'Student', description: 'Access courses and view grades' }
  ];

  return (
    <div className="mt-8 space-y-6">
      <div className="grid gap-4">
        {roles.map((role) => (
            <button
  type="button"
  aria-label={`Select ${role.name} role`}
  key={role.id}
  onClick={() => onSelect(role.id)}
  className="group relative w-full flex justify-between items-center py-4 px-6 border border-gray-300 rounded-lg shadow-sm hover:bg-blue-50 active:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <div className="text-left">
    <span className="block text-lg font-medium text-gray-900">{role.name}</span>
    <span className="block text-sm text-gray-500">{role.description}</span>
  </div>
  <svg className="h-5 w-5 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
</button>

        ))}
      </div>
    </div>
  );
};

export default RoleSelector;