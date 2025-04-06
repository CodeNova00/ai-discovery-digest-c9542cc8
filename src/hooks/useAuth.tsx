
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  displayName: string;
  subscriptionTier: 'free' | 'pro' | 'pro+';
  subscriptionEndDate?: Date;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithProvider: (provider: 'google' | 'github') => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // Mock user for demonstration
  const mockUser: User = {
    id: '1',
    email: 'johndoe@example.com',
    displayName: 'John Doe',
    subscriptionTier: 'free',
  };

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('aigen_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      if (email && password) {
        setUser(mockUser);
        setIsLoggedIn(true);
        localStorage.setItem('aigen_user', JSON.stringify(mockUser));
        toast.success('Login successful!');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error(error.message || 'Login failed');
      throw error;
    }
  };

  const loginWithProvider = async (provider: 'google' | 'github') => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      setUser({
        ...mockUser,
        displayName: provider === 'google' ? 'John Doe (Google)' : 'John Doe (GitHub)'
      });
      setIsLoggedIn(true);
      localStorage.setItem('aigen_user', JSON.stringify(mockUser));
      toast.success(`Login with ${provider} successful!`);
    } catch (error) {
      toast.error(error.message || `Login with ${provider} failed`);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      if (email && password && name) {
        const newUser = {
          ...mockUser,
          email,
          displayName: name
        };
        setUser(newUser);
        setIsLoggedIn(true);
        localStorage.setItem('aigen_user', JSON.stringify(newUser));
        toast.success('Registration successful!');
      } else {
        throw new Error('Invalid registration details');
      }
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('aigen_user');
    toast.success('Logged out successfully');
  };

  const value = {
    isLoggedIn,
    user,
    login,
    loginWithProvider,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
