import React from 'react';
import { useParams, Link } from 'react-router-dom';

const TeacherProfile = () => {
  const { id } = useParams();

  // Example static teacher data — can later be fetched by ID
  const teacher = {
    id: 1,
    name: "Haykel Ben Salem",
    status: "active",
    about: "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.",
    age: 34,
    gender: "Male",
    class: "TLA ,SGBD",
    sameClassTeachers: "Classe B et C" 
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <nav className="space-y-4">
          <Link to="/teachers" className="block p-2 rounded hover:bg-gray-100">Teachers</Link>
          <Link to="/students" className="block p-2 rounded hover:bg-gray-100">Students / Classes</Link>
          <Link to="/settings" className="block p-2 rounded hover:bg-gray-100">Settings & Profile</Link>
          <Link to="/exams" className="block p-2 rounded hover:bg-gray-100">Exams</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Teacher Profile</h1>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Add filter</span>
            <input type="checkbox" className="form-checkbox" />
          </label>
        </div>

        <section className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">{teacher.name}</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${teacher.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {teacher.status}
            </span>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg font-medium mb-1">About</h3>
            <p className="text-gray-600">{teacher.about}</p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-1">Age</h4>
              <p>{teacher.age}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-1">Gender</h4>
              <p>{teacher.gender}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-1">Class</h4>
              <p>{teacher.class}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-1">Class Number</h4>
              <p className="italic text-gray-600">{teacher.sameClassTeachers} more</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TeacherProfile;
