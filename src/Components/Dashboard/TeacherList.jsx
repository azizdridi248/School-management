import React from 'react';
import { NavLink } from 'react-router-dom';

const TeacherList = () => {
  const teachers = [
    { id: 1, name: "Mme Olfa Lamouchi", subject: "Mobile", email: "olfalamouchi@enicar.edu" },
    { id: 2, name: "Prof. Haykel", subject: "TLA", email: "haykel@univ.edu" },
    
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Teachers</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{teacher.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherList;