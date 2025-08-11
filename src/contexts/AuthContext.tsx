import React, { createContext, useContext, useEffect, useState } from 'react';

type User = { uid: string; email?: string | null } | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  signInAnonymously: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInAnonymously: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // Stubbed: replace with Firebase onAuthStateChanged later
  useEffect(() => {
    const t = setTimeout(() => { setUser({ uid: 'dev-user' }); setLoading(false); }, 300);
    return () => clearTimeout(t);
  }, []);

  const signInAnonymously = async () => setUser({ uid: 'dev-user' });
  const signOut = async () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loading, signInAnonymously, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
