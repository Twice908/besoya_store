import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { AuthService } from '../services/authService';
import type { AuthResponse } from '../services/authService';

interface AuthContextType {
  user: AuthResponse['user'] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    const currentUser = AuthService.getCurrentUser();
    const isAuth = AuthService.isAuthenticated();

    setUser(currentUser);
    setIsAuthenticated(isAuth);
    setIsLoading(false);

    return isAuth;
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await AuthService.login({ email, password });
      checkAuth(); // Refresh user data
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
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