import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

// Read from Expo public env (configure in app.json -> expo.extra or via EAS env)
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FB_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FB_APP_ID,
};

// Minimal validity check (all fields must be non-empty strings)
const isValid = Object.values(firebaseConfig).every(v => typeof v === 'string' && v.length > 0);

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

try {
  if (isValid) {
    app = getApps()[0] ?? initializeApp(firebaseConfig as any);
    auth = getAuth(app);
    db = getFirestore(app);
  } else {
    // not configured yet – keep undefined so callers can guard
    app = undefined;
  }
} catch (e) {
  // If anything goes wrong during init, fail safe (don’t crash Expo Go/Snack)
  console.warn('Firebase init failed:', e);
  app = undefined;
  auth = undefined;
  db = undefined;
}

export { app as firebaseApp, auth, db };
