import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  username: string;
  avatar?: string;
  balance: number;
  purchases: number[];
  joinDate: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateBalance: (amount: number) => void;
  addPurchase: (scriptId: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = user !== null;

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === "test@example.com" && password === "password") {
      const mockUser: User = {
        id: 1,
        email: email,
        username: "TestUser",
        avatar: "/img/678ed511-631e-48e9-b4b1-4b896787a686.jpg",
        balance: 1500,
        purchases: [1, 3],
        joinDate: "2024-01-01"
      };
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const register = async (email: string, username: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Math.random(),
      email: email,
      username: username,
      balance: 0,
      purchases: [],
      joinDate: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateBalance = (amount: number) => {
    if (user) {
      setUser({ ...user, balance: user.balance + amount });
    }
  };

  const addPurchase = (scriptId: number) => {
    if (user) {
      setUser({ 
        ...user, 
        purchases: [...user.purchases, scriptId]
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout,
      updateBalance,
      addPurchase
    }}>
      {children}
    </AuthContext.Provider>
  );
};