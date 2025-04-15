"use client";
import React, { useState } from "react";
import {
  FaLock,
  FaMobileAlt,
  FaChartBar,
  FaRecycle,
  FaAndroid,
  FaLaptopCode,
  FaProjectDiagram,
  FaBusinessTime,
  FaCode,
  FaSyncAlt,
  FaDatabase,
  FaComments,
  FaArrowLeft,
} from "react-icons/fa";
import Sidebar from "./SideBar";

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

export default function CategoryGrid() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  const handleCategoryClick = (index) => {
    setSelectedCategory(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="p-6 md:p-10 ml-0 md:ml-64">
        {selectedCategory === null ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Course Categories</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryClick(index)}
                  className="group flex flex-col items-center p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  aria-label={`View ${category.title} courses`}
                >
                  <div className="text-4xl text-blue-600 mb-3 group-hover:text-blue-700 transition-colors">
                    {category.icon}
                  </div>
                  <h2 className="font-semibold text-gray-800 group-hover:text-blue-700 mb-1">
                    {category.title}
                  </h2>
                  <p className="text-sm text-gray-500 group-hover:text-gray-600">
                    {category.courses} courses
                  </p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            <button
              onClick={handleBackClick}
              className="flex items-center px-4 py-2 mb-8 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              aria-label="Back to categories"
            >
              <FaArrowLeft className="mr-2" />
              Back to Categories
            </button>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex flex-col items-center mb-8">
                <div className="text-5xl text-teal-500 mb-4">
                  {categories[selectedCategory].icon}
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                  {categories[selectedCategory].title}
                </h1>
                <p className="text-gray-600 mb-6">
                  {categories[selectedCategory].courses} courses available
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  About {categories[selectedCategory].title}
                </h2>
                <p className="text-gray-700">
                  Welcome to the <strong>{categories[selectedCategory].title}</strong> course page.
                  Here you can browse and manage all related courses.
                </p>
                <div className="mt-6">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    View All Courses
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}