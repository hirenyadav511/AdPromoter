import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Axios interceptor to attach the ADMIN token
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('adpromoter_admin_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => axios.interceptors.request.eject(interceptor);
  }, []);

  const checkUser = async () => {
    const token = localStorage.getItem('adpromoter_admin_token');
    
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get('/api/auth/me');
      // Strictly enforce role isolated check
      if (data && data.role === 'admin') {
        setUser(data);
      } else {
        logoutLocally();
      }
    } catch (error) {
      console.error('Admin session validation failed');
      logoutLocally();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post('/api/auth/login', { email, password });
    
    if (data.role !== 'admin') {
      throw new Error('Not authorized as an admin');
    }

    if (data.token) {
      localStorage.setItem('adpromoter_admin_token', data.token);
    }
    
    setUser(data);
    return data;
  };

  const logoutLocally = () => {
    localStorage.removeItem('adpromoter_admin_token');
    setUser(null);
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (error) {
      console.error('Server logout failed, clearing local session anyway');
    } finally {
      logoutLocally();
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
