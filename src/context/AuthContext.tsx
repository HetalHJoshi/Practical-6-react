// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, type ReactNode, useEffect } from 'react';

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
  updateProfile: (data: { fullName: string; email: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  // keep localStorage in sync if user changes
  useEffect(() => {
    if (user) localStorage.setItem('currentUser', JSON.stringify(user));
  }, [user]);

  const signup = async ({ fullName, email, password }: User) => {
    const raw = localStorage.getItem('users');
    const users: User[] = raw ? JSON.parse(raw) : [];
    if (users.some(u => u.email === email)) {
      return Promise.reject(new Error('Email already registered'));
    }
    users.push({ fullName, email, password });
    localStorage.setItem('users', JSON.stringify(users));
  };

  const login = async (email: string, password: string) => {
    const raw = localStorage.getItem('users');
    const users: User[] = raw ? JSON.parse(raw) : [];
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return Promise.reject(new Error('Invalid email or password'));
    setUser(found);
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const updateProfile = async ({ fullName, email }: { fullName: string; email: string }) => {
    if (!user) return Promise.reject(new Error('No user logged in'));
    // update in users array
    const raw = localStorage.getItem('users');
    const users: User[] = raw ? JSON.parse(raw) : [];
    const idx = users.findIndex(u => u.email === user.email);
    if (idx === -1) return Promise.reject(new Error('User not found'));
    users[idx] = { ...users[idx], fullName, email };
    localStorage.setItem('users', JSON.stringify(users));
    // update currentUser
    setUser({ ...users[idx] });
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
