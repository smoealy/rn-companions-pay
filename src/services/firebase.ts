// src/services/firebase.ts — Firebase v8 wrapper for Snack/Expo

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Read config from Expo env (safe if left empty — wrapper will no-op)
const cfg = {
  apiKey: process.env.EXPO_PUBLIC_FB_API_KEY || '',
  authDomain: process.env.EXPO_PUBLIC_FB_AUTH_DOMAIN || '',
  projectId: process.env.EXPO_PUBLIC_FB_PROJECT_ID || '',
  storageBucket: process.env.EXPO_PUBLIC_FB_STORAGE_BUCKET || '',
  messagingSenderId: process.env.EXPO_PUBLIC_FB_MESSAGING_SENDER_ID || '',
  appId: process.env.EXPO_PUBLIC_FB_APP_ID || '',
};

export const isFirebaseConfigured = Object.values(cfg).every(
  (v) => typeof v === 'string' && v.length > 0
);

let firebaseApp: firebase.app.App | undefined;
let auth: firebase.auth.Auth | undefined;
let db: firebase.firestore.Firestore | undefined;

try {
  if (isFirebaseConfigured) {
    firebaseApp = firebase.apps[0] ?? firebase.initializeApp(cfg);
    auth = firebase.auth();
    db = firebase.firestore();
  } else {
    firebaseApp = undefined;
    auth = undefined;
    db = undefined;
  }
} catch (e) {
  console.warn('Firebase init (v8) failed:', e);
  firebaseApp = undefined;
  auth = undefined;
  db = undefined;
}

// Export initialized handles (may be undefined if not configured)
export { firebaseApp, auth, db };

/** ---- Re-exports & shims so app never imports firebase/* directly ---- */

// Auth helpers
export const onAuthStateChanged = (
  a: firebase.auth.Auth | undefined,
  cb: (user: firebase.User | null) => void
) => (a ? a.onAuthStateChanged(cb) : () => {});

export const signInWithEmailAndPassword = async (
  a: firebase.auth.Auth | undefined,
  email: string,
  pass: string
) => { if (a) await a.signInWithEmailAndPassword(email, pass); };

export const signInAnonymously = async (a: firebase.auth.Auth | undefined) => {
  if (a) await a.signInAnonymously();
};

export const signOut = async (a: firebase.auth.Auth | undefined) => {
  if (a) await a.signOut();
};

// Firestore “modular-like” helpers
type ColRef = firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
type DocRef = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;

export const collection = (database: typeof db, path: string): ColRef => {
  if (!database) throw new Error('Firestore not configured');
  return database.collection(path);
};

export const doc = (database: typeof db, path: string, id?: string): DocRef => {
  if (!database) throw new Error('Firestore not configured');
  return id ? database.collection(path).doc(id) : database.doc(path);
};

export const addDoc = async (col: ColRef, data: any) => col.add(data);

export const setDoc = async (d: DocRef, data: any, opts?: { merge?: boolean }) =>
  d.set(data, opts?.merge ? { merge: true } : undefined);

export const getDoc = async (d: DocRef) => d.get();

export const updateDoc = async (d: DocRef, data: any) => d.update(data);

export const deleteDoc = async (d: DocRef) => d.delete();
