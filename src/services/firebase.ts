// src/services/firebase.ts

import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut,
  type Auth,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  type Firestore,
} from 'firebase/firestore';

// Read config from Expo public env (set in app.json -> expo.extra or via EAS env)
const cfg = {
  apiKey: process.env.EXPO_PUBLIC_FB_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FB_APP_ID,
};

// All keys must be non-empty strings to initialize
export const isFirebaseConfigured = Object.values(cfg).every(
  (v) => typeof v === 'string' && v.length > 0
);

let firebaseApp: ReturnType<typeof initializeApp> | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

try {
  if (isFirebaseConfigured) {
    firebaseApp = getApps()[0] ?? initializeApp(cfg as any);
    auth = getAuth(firebaseApp);
    db = getFirestore(firebaseApp);
  } else {
    firebaseApp = undefined;
    auth = undefined;
    db = undefined;
  }
} catch (e) {
  console.warn('Firebase init failed:', e);
  firebaseApp = undefined;
  auth = undefined;
  db = undefined;
}

// Export initialized handles (may be undefined if not configured)
export { firebaseApp, auth, db };

// Re-export common helpers so app code never imports firebase/* directly
export {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
};
