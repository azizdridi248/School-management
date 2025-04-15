import React, { useState } from 'react';
import Sidebar from './SideBar';

const Teacher = () => {
  const [users, setUsers] = useState([
    { 
      username: 'teacher123', 
      password: '123456',
      nom: 'teacher',
      prenom: 'teacher',
      dateNaissance: '1995-05-15'
    },
    { 
      username: 'teacher', 
      password: 'abcdef',
      nom: 'teacher',
      prenom: 'teacher',
      dateNaissance: '1998-08-22'
    },
    { 
      username: 'admin', 
      password: 'admin123',
      nom: 'Admin',
      prenom: 'System',
      dateNaissance: '1990-01-01'
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    nom: '',
    prenom: '',
    dateNaissance: ''
  });

  const handleAddStudent = () => {
    setUsers([...users, newUser]);
    setNewUser({
      username: '',
      password: '',
      nom: '',
      prenom: '',
      dateNaissance: ''
    });
    setShowAddForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  return (
    <div className="p-4 ml-64">
        <Sidebar />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">User Credentials</h2>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Teacher
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-3">Add New Student</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={newUser.username}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="text"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                name="nom"
                value={newUser.nom}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                name="prenom"
                value={newUser.prenom}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date of Birth</label>
              <input
                type="date"
                name="dateNaissance"
                value={newUser.dateNaissance}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddStudent}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Password</th>
              <th className="py-2 px-4 border-b">Last Name</th>
              <th className="py-2 px-4 border-b">First Name</th>
              <th className="py-2 px-4 border-b">Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{user.username}</td>
                <td className="py-2 px-4 border-b">{user.password}</td>
                <td className="py-2 px-4 border-b">{user.nom}</td>
                <td className="py-2 px-4 border-b">{user.prenom}</td>
                <td className="py-2 px-4 border-b">{user.dateNaissance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teacher;