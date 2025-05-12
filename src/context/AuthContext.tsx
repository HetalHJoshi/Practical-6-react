import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface User {
  fullName: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  signup: (u: Omit<User, 'password'> & { password: string }) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const signup = async ({ fullName, email, password }: User) => {
    // get existing users
    const raw = localStorage.getItem('users');
    const users: User[] = raw ? JSON.parse(raw) : [];

    // reject duplicates
    if (users.some(u => u.email === email)) {
      return Promise.reject(new Error('Email already registered'));
    }

    // save new
    users.push({ fullName, email, password });
    localStorage.setItem('users', JSON.stringify(users));
  };

  const login = async (email: string, password: string) => {
    const raw = localStorage.getItem('users');
    const users: User[] = raw ? JSON.parse(raw) : [];
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
      return Promise.reject(new Error('Invalid email or password'));
    }
    localStorage.setItem('currentUser', JSON.stringify(found));
    setUser(found);
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
