import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Setup basic Axios defaults using environment variables
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  // Axios interceptor to attach token to every request
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('adpromoter_user_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => axios.interceptors.request.eject(interceptor);
  }, []);

  const refreshUser = async () => {
    const token = localStorage.getItem('adpromoter_user_token');
    
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get('/auth/me');
      if (data) {
        setUser(data);
      } else {
        // Token might be invalid or expired
        logoutLocally();
      }
    } catch (error) {
      console.error('Failed to fetch user session:', error);
      logoutLocally();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post('/auth/login', { email, password });
    if (data.token) {
      localStorage.setItem('adpromoter_user_token', data.token);
    }
    setUser(data);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await axios.post('/auth/register', { name, email, password });
    if (data.token) {
      localStorage.setItem('adpromoter_user_token', data.token);
    }
    setUser(data);
    return data;
  };

  const logoutLocally = () => {
    localStorage.removeItem('adpromoter_user_token');
    setUser(null);
  };

  const logout = async () => {
    try {
      await axios.post('/auth/logout');
    } catch (err) {
      console.error('Server logout failed, but clearing local session anyway');
    } finally {
      logoutLocally();
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
