import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../auth';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const fileInputRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const pdfFiles = files.filter(file => file.type === 'application/pdf');

    if (pdfFiles.length > 0) {
      setAttachments([...attachments, ...pdfFiles]);
    } else {
      alert('Please select only PDF files.');
    }
  };

  const handleRemoveAttachment = (index) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      message,
      attachments,
      date: new Date().toLocaleString()
    };

    setPosts([newPost, ...posts]);
    setMessage('');
    setAttachments([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
    alert('Message sent successfully!');
  };

  const handleEditPost = (index) => {
    const current = posts[index];
    const newMessage = prompt('Edit message:', current.message);
    if (newMessage !== null) {
      const updatedPosts = [...posts];
      updatedPosts[index].message = newMessage;
      setPosts(updatedPosts);
    }
  };

  const handleDeletePost = (index) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = [...posts];
      updatedPosts.splice(index, 1);
      setPosts(updatedPosts);
    }
  };

  const handleAddStudent = () => {
    const name = prompt("Student name:");
    const email = prompt("Student email:");
    if (name && email) {
      setStudents([...students, { name, email }]);
    }
  };

  const handleDeleteStudent = (index) => {
    if (window.confirm(`Delete ${students[index].name}?`)) {
      const updatedStudents = [...students];
      updatedStudents.splice(index, 1);
      setStudents(updatedStudents);
    }
  };

  const handleSendEmailToClass = () => {
    if (students.length === 0) {
      alert("No students to contact.");
      return;
    }

    const subject = encodeURIComponent("Message from your teacher");
    const body = encodeURIComponent("Hello,\n\nThis is an important message from your teacher.\n\nThank you.");
    const recipientList = students.map(s => s.email).join(',');

    window.location.href = `mailto:${recipientList}?subject=${subject}&body=${body}`;
  };


  
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with larger text */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <svg className="h-10 w-10 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-5 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        </header>
  
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs with larger text */}
          <div className="border-b border-gray-200 mb-10">
            <nav className="-mb-px flex space-x-10">
              <button
                onClick={() => setActiveTab('posts')}
                className={`${activeTab === 'posts' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-5 px-2 border-b-2 font-medium text-xl`}
              >
                Posts
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`${activeTab === 'students' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-5 px-2 border-b-2 font-medium text-xl`}
              >
                Students
              </button>
            </nav>
          </div>
  
          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div className="space-y-10">
              {/* Create Post Card */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-8">
                  <h2 className="text-2xl font-medium text-gray-900 mb-6">Create New Post</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <textarea
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-xl border-gray-300 rounded-md p-4 border"
                        rows={6}
                        placeholder="What would you like to share with your students?"
                        value={message}
                        onChange={handleMessageChange}
                      />
                    </div>
  
                    <div className="mb-6">
                      <label className="block text-xl font-medium text-gray-700 mb-4">Attachments</label>
                      <div className="flex items-center">
                        <label className="cursor-pointer bg-white py-3 px-5 border border-gray-300 rounded-md shadow-sm text-lg leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <span>Select PDFs</span>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,application/pdf"
                            multiple
                            className="sr-only"
                          />
                        </label>
                        <span className="ml-4 text-lg text-gray-500">PDF files only</span>
                      </div>
                    </div>
  
                    {attachments.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-xl font-medium text-gray-700 mb-4">Selected files:</h3>
                        <ul className="space-y-3">
                          {attachments.map((file, index) => (
                            <li key={index} className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-md">
                              <div className="flex items-center">
                                <svg className="flex-shrink-0 h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                </svg>
                                <span className="ml-3 text-lg font-medium text-gray-900 truncate max-w-xs">{file.name}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveAttachment(index)}
                                className="ml-3 text-gray-400 hover:text-gray-500"
                              >
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
  
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={!message && attachments.length === 0}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-xl font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Publish Post
                      </button>
                    </div>
                  </form>
                </div>
              </div>
  
              {/* Recent Posts */}
              <div>
                <h2 className="text-2xl font-medium text-gray-900 mb-6">Recent Posts</h2>
                
                {posts.length === 0 ? (
                  <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="p-16 text-center">
                      <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h3 className="mt-4 text-xl font-medium text-gray-900">No posts yet</h3>
                      <p className="mt-2 text-lg text-gray-500">Create your first post to share with students.</p>
                    </div>
                  </div>
                ) : (
                  <ul className="space-y-6">
                    {posts.map((post, idx) => (
                      <li key={idx} className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="p-8">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <svg className="h-10 w-10 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-xl font-medium text-gray-900">You</p>
                                <p className="text-lg text-gray-500">{post.date}</p>
                              </div>
                            </div>
                            <div className="flex space-x-4">
                              <button
                                onClick={() => handleEditPost(idx)}
                                className="text-gray-400 hover:text-gray-500"
                              >
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeletePost(idx)}
                                className="text-gray-400 hover:text-gray-500"
                              >
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="mt-6">
                            <p className="text-xl text-gray-700 whitespace-pre-line">{post.message}</p>
                          </div>
                          {post.attachments.length > 0 && (
                            <div className="mt-6">
                              <h4 className="text-xl font-medium text-gray-700 mb-4">Attachments:</h4>
                              <ul className="space-y-3">
                                {post.attachments.map((file, i) => {
                                  const fileURL = URL.createObjectURL(file);
                                  return (
                                    <li key={i}>
                                      <a 
                                        href={fileURL} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        download={file.name}
                                        className="inline-flex items-center px-4 py-3 border border-gray-300 shadow-sm text-lg leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                      >
                                        <svg className="flex-shrink-0 h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                        </svg>
                                        <span className="ml-3">{file.name}</span>
                                      </a>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
  
          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="space-y-8">
              {/* Student Management Card */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-8 py-7 border-b border-gray-200">
                  <h3 className="text-2xl font-medium leading-6 text-gray-900">Student Management</h3>
                </div>
                <div className="px-8 py-7">
                  <div className="flex space-x-6">
                    <button
                      onClick={handleAddStudent}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-xl font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg className="-ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                      Add Student
                    </button>
                    <button
                      onClick={handleSendEmailToClass}
                      disabled={students.length === 0}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-xl font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="-ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      Email Class
                    </button>
                  </div>
                </div>
              </div>
  
              {/* Students List */}
              <div>
                <h2 className="text-2xl font-medium text-gray-900 mb-6">Class Roster</h2>
                
                {students.length === 0 ? (
                  <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="p-16 text-center">
                      <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <h3 className="mt-4 text-xl font-medium text-gray-900">No students enrolled</h3>
                      <p className="mt-2 text-lg text-gray-500">Get started by adding students to your class.</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {students.map((student, index) => (
                        <li key={index}>
                          <div className="px-6 py-6 sm:px-8">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                  <svg className="h-7 w-7 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <div className="ml-6">
                                  <div className="text-xl font-medium text-indigo-600 truncate">{student.name}</div>
                                  <div className="text-lg text-gray-500">{student.email}</div>
                                </div>
                              </div>
                              <div className="ml-4 flex-shrink-0 flex">
                                <button
                                  onClick={() => handleDeleteStudent(index)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    );
  };
  
  export default TeacherDashboard;