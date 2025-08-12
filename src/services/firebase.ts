// src/services/firebase.ts

// Import from the single firebase SDK package installed in package.json
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

// Read config from Expo public env (set in app.json -> expo.extra or EAS env)
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
  v => typeof v === 'string' && v.length > 0
);

let firebaseApp: any;
let auth: any;
let db: any;

try {
  if (isFirebaseConfigured) {
    firebaseApp = getApps()[0] ?? initializeApp(cfg as any);
    auth = getAuth(firebaseApp);
    db = getFirestore(firebaseApp);
  } else {
    // Leave undefined so callers can feature-detect and no-op
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

// Re-export common helpers so other files don’t import firebase subpaths
export {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
};
