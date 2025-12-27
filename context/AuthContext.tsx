
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking localStorage session
    const storedUser = localStorage.getItem('oryn_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string) => {
    setIsLoading(true);
    // Simulation of Magic Link flow
    // In production: const magic = new Magic(API_KEY); await magic.auth.loginWithMagicLink({ email });
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: email,
      name: email.split('@')[0],
      role: email === 'admin@oryn.com' ? UserRole.ADMIN : UserRole.USER,
      picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    };
    
    setTimeout(() => {
      setUser(mockUser);
      localStorage.setItem('oryn_user', JSON.stringify(mockUser));
      setIsLoading(false);
    }, 1500);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('oryn_user');
  };

  const isAdmin = user?.role === UserRole.ADMIN;

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
