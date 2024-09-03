import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { MoodForm } from "./redux/mood/slice";
import { User as FireUser } from "./redux/auth/operations";

export interface ExtUser extends FireUser {
  password?: string | undefined;
}

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
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export const createUserDocument = async (user: FireUser) => {
  if (!user) return;

  const userDocRef = doc(db, "users", user.uid);

  try {
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        profilePic: user.profilePic || "",
        displayName: user.displayName || "user",
        password: "",
      });
      console.log("User document created successfully");
    }
  } catch (error) {
    console.error("Error creating user document:", error);
  }
};

function validateMoodForm(note: MoodForm): boolean {
  return !!(note.title && note.dateTime && note.mood && note.description);
}

export const fetchProfilePic = async (): Promise<string | null> => {
  const user = auth.currentUser;
  if (user) {
    try {
      const profilePicRef = ref(storage, `profilePics/${user.uid}.jpg`);
      const url = await getDownloadURL(profilePicRef);
      return url;
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  }
  return null;
};

export const updateProfilePic = async (userId: string, picUrl: string) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, { profilePic: picUrl });
    console.log("Profile picture updated successfully");
  } catch (e) {
    console.error("Error updating profile picture:", e);
  }
};

export const saveNote = async (note: MoodForm) => {
  try {
    if (validateMoodForm(note)) {
      const docRef = await addDoc(collection(db, "notes"), {
        ...note,
        dateTime: note.dateTime.toString(),
      });
      console.log("Document written with ID: ", docRef.id);
    } else {
      console.error("Invalid MoodForm data");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const loadNotes = async (): Promise<MoodForm[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "notes"));
    const notes: MoodForm[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as MoodForm;
      if (data.dateTime) {
        data.dateTime = new Date(data.dateTime).toISOString();
      }
      notes.push(data);
    });
    return notes;
  } catch (e) {
    console.error("Error fetching documents: ", e);
    return [];
  }
};
