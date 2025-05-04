import React from 'react';
import { FaLaptopCode, FaAndroid, FaCode, FaChartBar, FaSyncAlt, FaRecycle, FaLock, FaMobileAlt, FaDatabase, FaProjectDiagram, FaComments } from 'react-icons/fa';

const CourseList = () => {
  const categories = [
    { title: "Systèmes Embarqués", icon: <FaLaptopCode />, courses: 38 },
    { title: "Intelligence Artificielle", icon: <FaAndroid />, courses: 38 },
    { title: "Plateformes De Dev", icon: <FaCode />, courses: 38 },
    { title: "Business English", icon: <FaChartBar />, courses: 38 },
    { title: "TLA & Compilation", icon: <FaSyncAlt />, courses: 38 },
    { title: "Routage Des Rx", icon: <FaRecycle />, courses: 38 },
    { title: "Sécurité Informatique", icon: <FaLock />, courses: 38 },
    { title: "Développement Mobile", icon: <FaMobileAlt />, courses: 38 },
    { title: "Analyse Des Données", icon: <FaDatabase />, courses: 38 },
    { title: "Management De Projet", icon: <FaProjectDiagram />, courses: 38 },
    { title: "Comm. En Entreprise", icon: <FaComments />, courses: 38 },
  ];

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow flex items-start">
            <div className="flex-shrink-0 mr-4 text-3xl text-blue-600">
              {category.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-blue-700">{category.title}</h3>
              <div className="mt-4 text-gray-600">
                <p><span className="font-medium">Courses Available:</span> {category.courses}</p>
              </div>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;