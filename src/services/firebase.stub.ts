/**
 * No-op Firebase implementation used when Firebase is disabled.
 */

import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type {
  Firestore,
  CollectionReference,
  DocumentReference,
  DocumentData,
  SetOptions,
} from 'firebase/firestore';

export const isFirebaseConfigured = false;

export const firebaseApp: FirebaseApp | undefined = undefined;
export const auth: Auth | undefined = undefined;
export const db: Firestore | undefined = undefined;

// Auth helpers
export const onAuthStateChanged = (
  _a: Auth | undefined,
  _cb: (user: any) => void
) => () => {};

export const signInWithEmailAndPassword = async (
  _a: Auth | undefined,
  _email: string,
  _pass: string
) => {};

export const signInAnonymously = async (_a: Auth | undefined) => {};

export const signOut = async (_a: Auth | undefined) => {};

// Firestore helpers
type ColRef = CollectionReference<DocumentData>;
type DocRef = DocumentReference<DocumentData>;

export const collection = (
  _root: Firestore | DocRef,
  _path: string
): ColRef => null as any;

export const doc = (
  _root: Firestore | DocRef | ColRef,
  ..._segments: string[]
): DocRef => null as any;

export const addDoc = async (_col: ColRef, _data: any) => {};

export const setDoc = async (
  _d: DocRef,
  _data: any,
  _opts?: SetOptions
) => {};

export const getDoc = async (_d: DocRef) => undefined;

export const updateDoc = async (_d: DocRef, _data: any) => {};

export const deleteDoc = async (_d: DocRef) => {};

