/**
 * Dispatcher that selects the real or stub Firebase implementation
 * based on EXPO_PUBLIC_USE_FIREBASE environment variable.
 */

type FirebaseModule = typeof import('./firebase.real');

const firebase: FirebaseModule =
  process.env.EXPO_PUBLIC_USE_FIREBASE === 'true'
    ? require('./firebase.real')
    : require('./firebase.stub');

export const isFirebaseConfigured = firebase.isFirebaseConfigured;
export const firebaseApp = firebase.firebaseApp;
export const auth = firebase.auth;
export const db = firebase.db;
export const onAuthStateChanged = firebase.onAuthStateChanged;
export const signInWithEmailAndPassword = firebase.signInWithEmailAndPassword;
export const signInAnonymously = firebase.signInAnonymously;
export const signOut = firebase.signOut;
export const collection = firebase.collection;
export const doc = firebase.doc;
export const addDoc = firebase.addDoc;
export const setDoc = firebase.setDoc;
export const getDoc = firebase.getDoc;
export const updateDoc = firebase.updateDoc;
export const deleteDoc = firebase.deleteDoc;

export default firebase;
