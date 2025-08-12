// src/services/firebase.ts
// Conditionally load Firebase only when explicitly enabled
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

const useFirebase = process.env.EXPO_PUBLIC_USE_FIREBASE === 'true';

let initializeApp: undefined | typeof import('firebase/app').initializeApp;
let getApps: undefined | typeof import('firebase/app').getApps;
let getAuth: undefined | typeof import('firebase/auth').getAuth;
let onAuthStateChanged: undefined | typeof import('firebase/auth').onAuthStateChanged;
let signOut: undefined | typeof import('firebase/auth').signOut;
let signInAnonymously: undefined | typeof import('firebase/auth').signInAnonymously;
let getFirestore: undefined | typeof import('firebase/firestore').getFirestore;

if (useFirebase) {
  ({ initializeApp, getApps } = require('firebase/app'));
  ({ getAuth, onAuthStateChanged, signOut, signInAnonymously } = require('firebase/auth'));
  ({ getFirestore } = require('firebase/firestore'));
}

// Read config from Expo public env (set in app.json -> expo.extra or EAS env)
const cfg = {
  apiKey: process.env.EXPO_PUBLIC_FB_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FB_APP_ID,
};

export const isFirebaseConfigured =
  useFirebase && Object.values(cfg).every((v) => typeof v === 'string' && v.length > 0);

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

try {
  if (
    isFirebaseConfigured &&
    initializeApp &&
    getApps &&
    getAuth &&
    getFirestore
  ) {
    app = getApps()[0] ?? initializeApp(cfg as any);
    auth = getAuth(app);
    db = getFirestore(app);
  }
} catch (e) {
  console.warn('Firebase init failed:', e);
  app = undefined;
  auth = undefined;
  db = undefined;
}

export { app as firebaseApp, auth, db, onAuthStateChanged, signOut, signInAnonymously };
