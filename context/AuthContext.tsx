
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginWithGithub: () => void;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GITHUB_CLIENT_ID = "Ov23li0p73NXvUGvyU1Z";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('oryn_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Check for GitHub callback code in URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      handleGithubCallback(code);
    }

    setIsLoading(false);
  }, []);

  const loginWithGithub = () => {
    // Redirect to GitHub OAuth
    const redirectUri = window.location.origin + window.location.pathname;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email&redirect_uri=${encodeURIComponent(redirectUri)}`;
  };

  const handleGithubCallback = async (code: string) => {
    // In a real production app, you would exchange this code for a token via your backend.
    // For this static deployment demo, we simulate the success and profile fetching.
    console.log("GitHub Auth Code received:", code);
    
    // Simulating a successful profile fetch
    const githubUser: User = {
      id: "gh-" + Math.random().toString(36).substr(2, 9),
      email: "github-user@oryn.com",
      name: "GitHub Creator",
      role: UserRole.USER,
      picture: "https://github.com/github.png"
    };

    setUser(githubUser);
    localStorage.setItem('oryn_user', JSON.stringify(githubUser));
    
    // Clean URL
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('oryn_user');
  };

  const isAdmin = user?.role === UserRole.ADMIN || user?.email === 'admin@oryn.com';

  return (
    <AuthContext.Provider value={{ user, isLoading, loginWithGithub, logout, isAdmin }}>
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
