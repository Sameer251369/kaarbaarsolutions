import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuthToken, getCurrentUser, loginUser, setAuthToken, signupUser } from '../lib/trackingApi';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
  registeredAt?: string;
  lastLoginAt?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      const token = getAuthToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser();
        if (mounted) setUser(response.user);
      } catch (_error) {
        setAuthToken('');
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadSession();
    return () => {
      mounted = false;
    };
  }, []);

  const signup = async (userData: Omit<User, 'id'> & { password: string }): Promise<User> => {
    const response = await signupUser({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone || '',
      company: userData.company || '',
      password: userData.password,
    });
    setAuthToken(response.token);
    setUser(response.user);
    return response.user;
  };

  const login = async (email: string, password: string): Promise<User> => {
    const response = await loginUser(email, password);
    setAuthToken(response.token);
    setUser(response.user);
    return response.user;
  };

  const logout = (): void => {
    setUser(null);
    setAuthToken('');
  };

  const isAuthenticated = (): boolean => {
    return user !== null;
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signup,
      login,
      logout,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
