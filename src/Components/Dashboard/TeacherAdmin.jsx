import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './SideBar';

const Teacher = () => {
  // Sample teacher data with more details
  const initialTeachers = [
    { 
      id: 1, 
      name: 'Haykel Ben Salem', 
      subject: 'TLA', 
      status: 'active',
      email: 'haykel@school.edu',
      phone: '99999999',
      joinDate: '2020-05-15',
      classes: ['Info ', 'MECA'],
      qualifications: ['PhD in Mathematics']
    },
    { 
      id: 2, 
      name: 'Lamouchi Olfa', 
      subject: 'SGBD', 
      status: 'inactive',
      email: 'olfa@school.edu',
      phone: '99999999',
      joinDate: '2019-08-22',
      classes: ['INFO', 'MECA'],
      qualifications: ['PHD Data']
    },
    { 
      id: 3, 
      name: 'Feriel ben Naser', 
      subject: 'analyse de donnees', 
      status: 'active',
      email: 'feriel@school.edu',
      phone: '90000000',
      joinDate: '2021-01-10',
      classes: ['2 eme INFO'],
      qualifications: ['PhD in DATA']
    },
  ];

  const [teachers, setTeachers] = useState(initialTeachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter teachers based on search term
  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(teachers.filter(teacher => teacher.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setTeachers(teachers.map(teacher =>
      teacher.id === id 
        ? { ...teacher, status: teacher.status === 'active' ? 'inactive' : 'active' }
        : teacher
    ));
  };

  const viewDetails = (teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTeacher(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-16 pl-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Teachers Management</h1>
          <Link 
            to="/teachers/add" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add New Teacher
          </Link>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-6 flex justify-between items-center">
          <div className="w-1/2">
            <input
              type="text"
              placeholder="Search by name or subject..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button 
              className={`px-4 py-2 rounded ${teachers.filter(t => t.status === 'active').length === filteredTeachers.length ? 'bg-blue-100 text-blue-800' : 'bg-gray-200'}`}
              onClick={() => setSearchTerm('')}
            >
              All ({teachers.length})
            </button>
            <button 
              className={`px-4 py-2 rounded ${teachers.filter(t => t.status === 'active').length === filteredTeachers.length ? 'bg-green-100 text-green-800' : 'bg-gray-200'}`}
              onClick={() => setSearchTerm('active')}
            >
              Active ({teachers.filter(t => t.status === 'active').length})
            </button>
            <button 
              className={`px-4 py-2 rounded ${teachers.filter(t => t.status === 'inactive').length === filteredTeachers.length ? 'bg-red-100 text-red-800' : 'bg-gray-200'}`}
              onClick={() => setSearchTerm('inactive')}
            >
              Inactive ({teachers.filter(t => t.status === 'inactive').length})
            </button>
          </div>
        </div>

        {/* Teachers Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map(teacher => (
                  <tr key={teacher.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                          {teacher.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <Link 
                            to={`/teachers/${teacher.id}`} 
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            {teacher.name}
                          </Link>
                          <div className="text-sm text-gray-500">{teacher.joinDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{teacher.subject}</div>
                      <div className="text-sm text-gray-500">
                        {teacher.classes.join(', ')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{teacher.email}</div>
                      <div className="text-sm text-gray-500">{teacher.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-2 py-1 text-xs rounded-full ${teacher.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                      >
                        {teacher.status}
                      </span>
                      <button 
                        onClick={() => toggleStatus(teacher.id)}
                        className="ml-2 text-xs text-blue-600 hover:text-blue-800"
                      >
                        (toggle)
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => viewDetails(teacher)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        View
                      </button>
                      <Link 
                        to={`/teachers/edit/${teacher.id}`}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(teacher.id)}
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
                    No teachers found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Teacher Details Modal */}
        {isModalOpen && selectedTeacher && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedTeacher.name}</h2>
                    <p className="text-gray-600">{selectedTeacher.subject} Teacher</p>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Contact Information</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-gray-500 w-24">Email:</span>
                        <span>{selectedTeacher.email}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-500 w-24">Phone:</span>
                        <span>{selectedTeacher.phone}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-500 w-24">Status:</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${selectedTeacher.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {selectedTeacher.status}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Professional Details</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-gray-500 w-24">Joined:</span>
                        <span>{selectedTeacher.joinDate}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-500 w-24">Classes:</span>
                        <span>{selectedTeacher.classes.join(', ')}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Qualifications</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedTeacher.qualifications.map((qualification, index) => (
                        <li key={index}>{qualification}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <Link
                    to={`/teachers/edit/${selectedTeacher.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teacher;