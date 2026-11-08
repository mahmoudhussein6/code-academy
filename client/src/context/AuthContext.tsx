import React, { createContext, useContext, useState, useEffect } from 'react';
import { IUser } from '../types';
import { apiService } from '../lib/api';

interface AuthContextType {
  user: IUser | null;
  isLoading: boolean;
  login: (token: string, user: IUser) => void;
  logout: () => Promise<void>;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await apiService.getMe();
        setUser(data.user);
      } catch {
        // If not logged in, load or create a guest session for testing
        const savedGuest = localStorage.getItem('code_academy_guest');
        if (savedGuest) {
          setUser(JSON.parse(savedGuest));
        } else {
          const guest: IUser = {
            id: 'guest_user',
            name: 'طالب زائر',
            email: 'guest@codeacademy.dev',
            role: 'student',
            avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=student',
          };
          localStorage.setItem('code_academy_guest', JSON.stringify(guest));
          setUser(guest);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (token: string, newUser: IUser) => {
    localStorage.setItem('code_academy_token', token);
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch {
      // Ignore
    }
    localStorage.removeItem('code_academy_token');
    // Keep guest session
    const guest: IUser = {
      id: 'guest_user',
      name: 'طالب زائر',
      email: 'guest@codeacademy.dev',
      role: 'student',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=guest',
    };
    setUser(guest);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

