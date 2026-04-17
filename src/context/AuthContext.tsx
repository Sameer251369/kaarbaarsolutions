import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  password?: string;
  registeredAt?: string;
  avatar?: string; // <--- ADDED THIS LINE
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (userData: User) => User;
  login: (email: string, password: string) => User;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const signup = (userData: User): User => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.some((u: User) => u.email === userData.email)) {
      throw new Error('Email already registered');
    }

    // Add a default avatar if none exists during signup
    const newUser = { 
      ...userData, 
      avatar: userData.avatar || `https://ui-avatars.com/api/?name=${userData.firstName}&background=0D8ABC&color=fff` 
    };

    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    const userToStore = { ...newUser };
    delete userToStore.password;
    setUser(userToStore);
    localStorage.setItem('user', JSON.stringify(userToStore));

    return userToStore;
  };

  const login = (email: string, password: string): User => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: User) => u.email === email && u.password === password);

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const userToStore = { ...foundUser };
    delete userToStore.password;
    setUser(userToStore);
    localStorage.setItem('user', JSON.stringify(userToStore));

    return userToStore;
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('user');
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