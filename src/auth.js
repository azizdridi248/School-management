const users = {
  admin: [{ username: 'admin1', password: 'admin123', name: 'Admin User' }],
  teacher: [
    { username: 'teacher1', password: 'teacher123', name: 'John Smith' },
    { username: 'teacher2', password: 'teacher123', name: 'Sarah Johnson' }
  ],
  student: [
    { username: 'student1', password: 'student123', name: 'Alex Brown' },
    { username: 'student2', password: 'student123', name: 'Maria Garcia' }
  ]
};

export const authenticate = async (credentials, role) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userList = users[role] || [];
      const user = userList.find(u => 
        u.username === credentials.username && 
        u.password === credentials.password
      );
      
      if (user) {
        resolve({ ...user, role });
      } else {
        reject(new Error('Invalid credentials. Please try again.'));
      }
    }, 500);
  });
};

export const isAuthenticated = () => {
  return localStorage.getItem('authToken') !== null;
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userData');
};