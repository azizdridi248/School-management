import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../auth';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [students, setStudents] = useState([]);
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
      alert('Veuillez sélectionner uniquement des fichiers PDF.');
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
    alert('Message envoyé avec succès!');
  };

  const handleEditPost = (index) => {
    const current = posts[index];
    const newMessage = prompt('Modifier le message:', current.message);
    if (newMessage !== null) {
      const updatedPosts = [...posts];
      updatedPosts[index].message = newMessage;
      setPosts(updatedPosts);
    }
  };

  const handleDeletePost = (index) => {
    if (window.confirm('Voulez-vous supprimer ce message ?')) {
      const updatedPosts = [...posts];
      updatedPosts.splice(index, 1);
      setPosts(updatedPosts);
    }
  };

  const handleAddStudent = () => {
    const name = prompt("Nom de l'étudiant :");
    const email = prompt("Email de l'étudiant :");
    if (name && email) {
      setStudents([...students, { name, email }]);
    }
  };

  const handleDeleteStudent = () => {
    const name = prompt("Nom de l'étudiant à supprimer :");
    if (name) {
      setStudents(students.filter(student => student.name !== name));
    }
  };

  const handleSendEmailToClass = () => {
    if (students.length === 0) {
      alert("Aucun étudiant à contacter.");
      return;
    }

    const subject = encodeURIComponent("Message de l'enseignant");
    const body = encodeURIComponent("Bonjour,\n\nVoici un message important de votre enseignant.\n\nMerci.");
    const recipientList = students.map(s => s.email).join(',');

    window.location.href = `mailto:${recipientList}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-gradient-to-r from-blue-700 to-blue-600 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Tableau de bord Enseignant</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white text-blue-700 font-semibold rounded hover:bg-gray-100"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        {/* Boutons gestion étudiants */}
        <div className="mb-6 flex gap-4 flex-wrap">
          <button
            onClick={handleAddStudent}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            ➕ Ajouter un étudiant
          </button>
          <button
            onClick={handleDeleteStudent}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            🗑️ Supprimer un étudiant
          </button>
          <button
            onClick={handleSendEmailToClass}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            📧 Envoyer un mail à la classe
          </button>
        </div>

        {/* Liste des étudiants */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Étudiants inscrits :</h2>
          {students.length === 0 ? (
            <p className="text-gray-500 italic">Aucun étudiant pour le moment.</p>
          ) : (
            <ul className="list-disc list-inside text-gray-700">
              {students.map((student, i) => (
                <li key={i}>{student.name} ({student.email})</li>
              ))}
            </ul>
          )}
        </div>

        {/* Formulaire de message */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Publier un message</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              rows="4"
              placeholder="Écrivez votre message ici..."
              value={message}
              onChange={handleMessageChange}
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ajouter des documents PDF
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,application/pdf"
                multiple
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {attachments.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Fichiers joints :</h3>
                <ul className="space-y-2">
                  {attachments.map((file, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm text-gray-600 truncate max-w-xs">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAttachment(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={!message && attachments.length === 0}
            >
              Publier
            </button>
          </form>
        </div>

        {/* Section des messages récents */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Messages récents</h2>

          {posts.length === 0 ? (
            <div className="border-4 border-dashed border-blue-200 rounded-lg h-96 flex items-center justify-center">
              <p className="text-center text-lg text-gray-500 italic">
                Aucun message publié pour le moment
              </p>
            </div>
          ) : (
            <ul className="space-y-6">
              {posts.map((post, idx) => (
                <li key={idx} className="border border-blue-100 rounded-lg p-4 bg-blue-50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500 italic">{post.date}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditPost(idx)}
                        className="text-yellow-600 hover:underline"
                      >
                        ✏️ Modifier
                      </button>
                      <button
                        onClick={() => handleDeletePost(idx)}
                        className="text-red-600 hover:underline"
                      >
                        🗑️ Supprimer
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-2">{post.message}</p>
                  {post.attachments.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-medium text-gray-600 mb-1">Fichiers :</h4>
                      <ul className="list-disc list-inside text-sm text-blue-800">
                        {post.attachments.map((file, i) => {
                          const fileURL = URL.createObjectURL(file);
                          return (
                            <li key={i}>
                              <a href={fileURL} target="_blank" rel="noopener noreferrer" download={file.name}>
                                {file.name}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
