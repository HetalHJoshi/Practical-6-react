import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { getFromLocalStorage } from '../../utils/storageUtils';
import type { User } from '../../types/User/types';

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const userData = getFromLocalStorage<User>('currentUser');

  const [user, setUser] = useState<User | null>(userData);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
