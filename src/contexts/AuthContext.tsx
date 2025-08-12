import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  auth,
  onAuthStateChanged,
  signOut as fbSignOut,
} from '../services/firebase';

type MinimalUser = { uid: string } | null;

type AuthContextType = {
  user: MinimalUser;
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
  const [user, setUser] = useState<MinimalUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If Firebase isn't configured, skip subscribing
    if (!auth || !onAuthStateChanged) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u: any) => {
      // Store only minimal shape to avoid importing firebase types
      setUser(u ? { uid: u.uid } : null);
      setLoading(false);
    });
    return () => unsub && unsub();
  }, []);

  // Stub: keep app running without pulling in 'firebase/auth'
  // When you’re ready, export signInAnonymously from your firebase wrapper and call it here.
  const signInAnonymously = async () => {
    if (!auth) return; // not configured yet
    // TODO: add `signInAnonymously` export in services/firebase and call it here.
    // For now, this is a no-op to avoid Snack dependency errors.
    return;
  };

  const signOut = async () => {
    if (!auth || !fbSignOut) return; // not configured
    await fbSignOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInAnonymously, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

