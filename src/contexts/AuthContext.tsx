import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockAuth } from '@/data/mockData';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  fullName: string;
  avatar: string;
  lastLogin: string;
  status: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('gad_user');
    const storedToken = localStorage.getItem('gad_token');
    
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('gad_user');
        localStorage.removeItem('gad_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockAuth.users.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      const token = `mock_token_${foundUser.id}_${Date.now()}`;
      
      setUser(userWithoutPassword);
      localStorage.setItem('gad_user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('gad_token', token);
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gad_user');
    localStorage.removeItem('gad_token');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};