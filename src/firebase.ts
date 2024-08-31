import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const apiKey: string = import.meta.env.VITE_API_KEY;
const authDomain: string = import.meta.env.VITE_AUTH_DOMAIN;
const projectId: string = import.meta.env.VITE_PROJECT_ID;
const storageBucket: string = import.meta.env.VITE_STORAGE_BUCKET;
const messagingSenderId: string = import.meta.env.VITE_MESSAGING_SENDER_ID;
const appId: string = import.meta.env.VITE_APP_ID;
const measurementId: string = import.meta.env.VITE_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
}; // .env

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
