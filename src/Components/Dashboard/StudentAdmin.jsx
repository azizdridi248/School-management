import React, { useState } from 'react';
import Sidebar from './SideBar';

const Student = () => {
  const [users, setUsers] = useState([
    { 
      id: 1,
      username: 'azizdr', 
      password: '123456',
      nom: 'Dridi',
      prenom: 'Aziz',
      dateNaissance: '2001-05-15',
      email: 'aziz.dridi@example.com',
      classe: '2 eme  Info',
      status: 'active'
    },
    { 
      id: 2,
      username: 'mariem_dr', 
      password: 'abcdef',
      nom: 'Dridi',
      prenom: 'Mariem',
      dateNaissance: '2003-08-22',
      email: 'mariem.dridi@example.com',
      classe: '1 eme MECA',
      status: 'active'
    },
    { 
      id: 3,
      username: 'mohamed', 
      password: 'aziz',
      nom: 'mohamed',
      prenom: 'aziz',
      dateNaissance: '2001-01-01',
      email: 'azizdr@exemple.com',
      classe: '2eme MECA',
      status: 'inactive'
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    nom: '',
    prenom: '',
    dateNaissance: '',
    email: '',
    classe: '',
    status: 'active'
  });

  const filteredUsers = users.filter(user =>
    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = () => {
    if (editUserId) {
      setUsers(users.map(user => 
        user.id === editUserId ? { ...newUser, id: editUserId } : user
      ));
      setEditUserId(null);
    } else {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
    }
    resetForm();
  };

  const handleEdit = (user) => {
    setNewUser(user);
    setEditUserId(user.id);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setUsers(users.map(user =>
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const resetForm = () => {
    setNewUser({
      username: '',
      password: '',
      nom: '',
      prenom: '',
      dateNaissance: '',
      email: '',
      classe: '',
      status: 'active'
    });
    setShowAddForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-30 pl-96">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Students Management</h1>
          <button 
            onClick={() => {
              resetForm();
              setShowAddForm(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {editUserId ? 'Edit Student' : 'Add New Student'}
          </button>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-6">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search by name or username..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4 border-b pb-2">
              {editUserId ? 'Edit Student' : 'Add New Student'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Username*</label>
                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password*</label>
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name*</label>
                <input
                  type="text"
                  name="nom"
                  value={newUser.nom}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">First Name*</label>
                <input
                  type="text"
                  name="prenom"
                  value={newUser.prenom}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date of Birth*</label>
                <input
                  type="date"
                  name="dateNaissance"
                  value={newUser.dateNaissance}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Class*</label>
                <select
                  name="classe"
                  value={newUser.classe}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Class</option>
                  <option value="4ème Science">4ème Science</option>
                  <option value="4ème Lettre">4ème Lettre</option>
                  <option value="3ème Science">3ème Science</option>
                  <option value="3ème Lettre">3ème Lettre</option>
                  <option value="2ème Science">2ème Science</option>
                  <option value="2ème Lettre">2ème Lettre</option>
                  <option value="1ère Science">1ère Science</option>
                  <option value="1ère Lettre">1ère Lettre</option>
                  <option value="Bac Science">Bac Science</option>
                  <option value="Bac Lettre">Bac Lettre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status*</label>
                <select
                  name="status"
                  value={newUser.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddStudent}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                {editUserId ? 'Update Student' : 'Add Student'}
              </button>
            </div>
          </div>
        )}

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credentials</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                          {user.prenom.charAt(0)}{user.nom.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.prenom} {user.nom}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-sm text-gray-500">{user.dateNaissance}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <span className="font-medium">Username:</span> {user.username}
                      </div>
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Password:</span> {user.password}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.classe}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-2 py-1 text-xs rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                      >
                        {user.status}
                      </span>
                      <button 
                        onClick={() => toggleStatus(user.id)}
                        className="ml-2 text-xs text-blue-600 hover:text-blue-800"
                      >
                        (toggle)
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(user)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No students found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Student;