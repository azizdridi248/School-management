// Mock authentication service
const users = {
    admin: [
      { username: 'admin1', password: 'admin123', name: 'Admin User' }
    ],
    teacher: [
      { username: 'teacher1', password: 'teacher123', name: 'John Smith' },
      { username: 'teacher2', password: 'teacher123', name: 'Sarah Johnson' }
    ],
    student: [
      { username: 'student1', password: 'student123', name: 'Alex Brown' },
      { username: 'student2', password: 'student123', name: 'Maria Garcia' }
    ]
  };
  
// Simple auth implementation
export const isAuthenticated = () => {
  // Check if authToken exists and hasn't expired
  const token = localStorage.getItem('authToken');
  if (!token) return false;
  
  // You might want to add JWT expiration check here
  return true;
};

// Mock login function - replace with your actual API call
export const authenticate = async (credentials, role) => {
  // In a real app, you would call your authentication API here
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock successful authentication
      localStorage.setItem('authToken', 'mock-token-123');
      localStorage.setItem('userRole', role);
      localStorage.setItem('userData', JSON.stringify({
        username: credentials.username,
        name: `${role} User`
      }));
      resolve(true);
    }, 500);
  });
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userData');
};