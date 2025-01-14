
import { useRouter } from 'next/router';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    // Check for existing session on initial load
    const checkAuth = async () => {
      try {
        // Check local storage for token
        const token = localStorage.getItem('token');
        console.log('Token from local storage:', token); // Debugging log
        if (!token) {
          console.log('No token found, redirecting to login.');
          router.push('/login'); // Redirect to login page
          setUser(null)
          setLoading(false);
          return;
        }
        if (token) {
          const response = await fetch('/api/auth/session', {
            headers: {
              'Authorization': `Bearer ${token}` // Send token in Authorization header
            }
          });
           


          const data = await response.json();
          console.log('Session data received:', data); // Debugging log
          if (data.user) {
            setUser(data.user);
            console.log('User state set:', data.user); // Debugging log
          }
        }
      } catch (error) {

        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log('Login response:', data); // Debugging log
      if (data.user) {
        // Store token in local storage
        localStorage.setItem('token', data.user.token);
        setUser(data.user);
        console.log('User state after login:', data.user); // Debugging log
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('token'); // Remove token from local storage
      setUser(null);
      router.push("/login")
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
