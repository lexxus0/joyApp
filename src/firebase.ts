import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  updateDoc,
  doc,
  getDoc,
  where,
  query,
} from "firebase/firestore";
import { AppDispatch } from "./redux/store";
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { MoodForm } from "./redux/mood/slice";
import { User as FireUser } from "./redux/auth/operations";
import { fetchNotesFromFirestore } from "./redux/mood/slice";

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
      console.error( error);
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
    console.error( e);
  }
};

export const saveNote = async (note: MoodForm, dispatch: AppDispatch) => {
  const user = auth.currentUser;
  if (!auth.currentUser) {
    console.error("User is not authenticated");
    return;
  }
  if (user) {
    try {
      if (validateMoodForm(note)) {
        const docRef = await addDoc(collection(db, "notes"), {
          ...note,
          userId: user.uid,
          dateTime: note.dateTime.toString(),
        });
        console.log(docRef.id);

        dispatch(fetchNotesFromFirestore());
      } 
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } else {
    console.error("User is not authenticated");
  }
};

export const loadNotes = async (): Promise<MoodForm[]> => {
  const user = auth.currentUser;
  if (!user) {
    return [];
  }

  try {
    const notesQuery = query(
      collection(db, "notes"),
      where("userId", "==", user.uid)
    );

    const querySnapshot = await getDocs(notesQuery);
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
    console.error(e);
    return [];
  }
};
