
// src/services/firebase.ts — Firebase v9 modular setup (no Snack compat)

import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged as fbOnAuthStateChanged,
  signInWithEmailAndPassword as fbSignInWithEmailAndPassword,
  signInAnonymously as fbSignInAnonymously,
  signOut as fbSignOut,
  type Auth,
} from 'firebase/auth';
import {
  getFirestore,
  collection as fbCollection,
  doc as fbDoc,
  addDoc as fbAddDoc,
  setDoc as fbSetDoc,
  getDoc as fbGetDoc,
  updateDoc as fbUpdateDoc,
  deleteDoc as fbDeleteDoc,
  type Firestore,
  type CollectionReference,
  type DocumentReference,
  type DocumentData,
  type SetOptions,
} from 'firebase/firestore';
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

let firebaseApp: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

try {
  if (isFirebaseConfigured) {
    firebaseApp = initializeApp(cfg);
    auth = getAuth(firebaseApp);
    db = getFirestore(firebaseApp);
  }
} catch (e) {
  console.warn('Firebase init failed:', e);
  firebaseApp = undefined;
  auth = undefined;
  db = undefined;
}

// Export initialized handles (may be undefined if not configured)
export { firebaseApp, auth, db };

/** ---- Re-exports so app never imports firebase/* directly ---- */

// Auth helpers
export const onAuthStateChanged = (
  a: Auth | undefined,
  cb: (user: any) => void
) => (a ? fbOnAuthStateChanged(a, cb) : () => {});

export const signInWithEmailAndPassword = async (
  a: Auth | undefined,
  email: string,
  pass: string
) => {
  if (a) await fbSignInWithEmailAndPassword(a, email, pass);
};

export const signInAnonymously = async (a: Auth | undefined) => {
  if (a) await fbSignInAnonymously(a);
};

export const signOut = async (a: Auth | undefined) => {
  if (a) await fbSignOut(a);
};

// Firestore helpers
type ColRef = CollectionReference<DocumentData>;
type DocRef = DocumentReference<DocumentData>;

export const collection = (root: Firestore | DocRef, path: string): ColRef => {
  if (!root) throw new Error('Firestore not configured');
  return fbCollection(root as any, path);
};

export const doc = (
  root: Firestore | DocRef | ColRef,
  ...segments: string[]
): DocRef => {
  if (!root) throw new Error('Firestore not configured');
  return fbDoc(root as any, ...segments);
};

export const addDoc = async (col: ColRef, data: any) => fbAddDoc(col, data);

export const setDoc = async (d: DocRef, data: any, opts?: SetOptions) =>
  opts ? fbSetDoc(d, data, opts) : fbSetDoc(d, data);

export const getDoc = async (d: DocRef) => fbGetDoc(d);

export const updateDoc = async (d: DocRef, data: any) => fbUpdateDoc(d, data);

export const deleteDoc = async (d: DocRef) => fbDeleteDoc(d);

