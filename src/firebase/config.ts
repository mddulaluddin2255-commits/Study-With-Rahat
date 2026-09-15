import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB4RDILW_jwJejGLjebxs46EljlNDTXqcE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "study-with-rahat-pvt.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "study-with-rahat-pvt",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "study-with-rahat-pvt.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "48961855211",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:48961855211:web:5da87efe0628374b5168ae"
};

// Initialize Firebase safely
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const db = getFirestore(app);
export const storage = getStorage(app);

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
