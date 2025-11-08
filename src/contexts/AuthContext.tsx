import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/domain/services';
import type { Usuario } from '@/domain/models/types';

interface AuthContextType {
  user: Usuario | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
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
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('gad_user');
    
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        // Verify user still exists
        authService.getUsuario(userData.id).then((usuario) => {
          if (usuario) {
            setUser(usuario);
          } else {
            localStorage.removeItem('gad_user');
          }
          setLoading(false);
        });
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('gad_user');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      const usuario = await authService.login(email, password);
      
      if (usuario) {
        setUser(usuario);
        localStorage.setItem('gad_user', JSON.stringify(usuario));
        setLoading(false);
        return true;
      }
      
      setLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gad_user');
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