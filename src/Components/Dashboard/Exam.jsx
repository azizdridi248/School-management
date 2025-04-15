import React, { useState } from "react";
import Sidebar from "./SideBar";

const Exam = () => {
  const years = Array.from({ length: 2025 - 2013 }, (_, i) => 2025 - i);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [examType, setExamType] = useState("sujet");
  const [exams, setExams] = useState({});

  const subjects = [
    "Systèmes Embarqués",
    "Intelligence Artificielle",
    "Plateformes De Dev",
    "Business English",
    "TLA & Compilation",
    "Routage Des Rx",
    "Sécurité Informatique",
    "Développement Mobile",
    "Analyse Des Données",
    "Management De Projet",
    "Comm. En Entreprise"
  ];

  const examTypes = [
    "Examen Principal",
    "Examen Controle",
    "DS",
    "TP",
    "Projet"
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const newExams = { ...exams };
      if (!newExams[selectedYear]) newExams[selectedYear] = {};
      if (!newExams[selectedYear][selectedSubject]) newExams[selectedYear][selectedSubject] = {};
      
      newExams[selectedYear][selectedSubject][examType] = {
        name: file.name,
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toLocaleDateString()
      };
      
      setExams(newExams);
      setShowAddModal(false);
      // Reset selections
      setSelectedYear("");
      setSelectedSubject("");
      setExamType("sujet");
    } else {
      alert("Veuillez télécharger un fichier PDF");
    }
  };

  const openPdf = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Compact Sidebar */}
      <div className="w-20 md:w-64">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Gestion des Examens</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-1 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm md:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden md:inline">Ajouter Document</span>
            <span className="md:hidden">+ Doc</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Année
                  </th>
                  <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Matière
                  </th>
                  <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sujet
                  </th>
                  <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Corrigé
                  </th>
                  <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {years.flatMap(year => 
                  subjects.map(subject => (
                    <tr key={`${year}-${subject}`} className="hover:bg-gray-50">
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {year}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
                        {subject}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
                        {exams[year]?.[subject]?.type || "-"}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
                        {exams[year]?.[subject]?.sujet ? (
                          <button
                            onClick={() => openPdf(exams[year][subject].sujet.url)}
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 md:h-5 md:w-5 mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="truncate max-w-xs md:max-w-md">
                              {exams[year][subject].sujet.name}
                            </span>
                          </button>
                        ) : (
                          <span className="text-gray-400">Non disponible</span>
                        )}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
                        {exams[year]?.[subject]?.corrige ? (
                          <button
                            onClick={() => openPdf(exams[year][subject].corrige.url)}
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 md:h-5 md:w-5 mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="truncate max-w-xs md:max-w-md">
                              {exams[year][subject].corrige.name}
                            </span>
                          </button>
                        ) : (
                          <span className="text-gray-400">Non disponible</span>
                        )}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => {
                            setSelectedYear(year);
                            setSelectedSubject(subject);
                            setShowAddModal(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Exam Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-4 md:p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Ajouter Document</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Année
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                  required
                >
                  <option value="">Sélectionner une année</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Matière
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                  required
                >
                  <option value="">Sélectionner une matière</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type d'examen
                </label>
                <select
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                >
                  {examTypes.map((type) => (
                    <option key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type de document
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-blue-600"
                      name="docType"
                      value="sujet"
                      checked={examType === "sujet"}
                      onChange={() => setExamType("sujet")}
                    />
                    <span className="ml-2">Sujet</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-blue-600"
                      name="docType"
                      value="corrige"
                      checked={examType === "corrige"}
                      onChange={() => setExamType("corrige")}
                    />
                    <span className="ml-2">Corrigé</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fichier PDF
                </label>
                <div className="mt-1 flex justify-center px-4 pt-4 pb-5 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                      >
                        <span>Téléverser un fichier</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept=".pdf"
                          className="sr-only"
                          onChange={handleFileUpload}
                          required
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF jusqu'à 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exam;