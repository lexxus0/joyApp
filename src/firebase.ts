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
  password?: string;
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
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
    }
  } catch (error) {
    console.error(error);
  }
};

const validateMoodForm = (note: MoodForm): boolean =>
  Boolean(note.title && note.dateTime && note.mood && note.description);

export const fetchProfilePic = async (): Promise<string | null> => {
  const user = auth.currentUser;
  if (user) {
    try {
      const profilePicRef = ref(storage, `profilePics/${user.uid}.jpg`);
      return await getDownloadURL(profilePicRef);
    } catch (error) {
      console.error(error);
    }
  }
  return null;
};

export const updateProfilePic = async (userId: string, picUrl: string) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, { profilePic: picUrl });
  } catch (error) {
    console.error(error);
  }
};

export const saveNote = async (note: MoodForm, dispatch: AppDispatch) => {
  const user = auth.currentUser;
  if (!user || !validateMoodForm(note)) return;

  try {
    const docRef = await addDoc(collection(db, "notes"), {
      ...note,
      userId: user.uid,
      dateTime: note.dateTime.toString(),
    });
    console.log(docRef.id);

    dispatch(fetchNotesFromFirestore());
  } catch (error) {
    console.error(error);
  }
};

export const loadNotes = async (): Promise<MoodForm[]> => {
  const user = auth.currentUser;
  if (!user) return [];

  try {
    const notesQuery = query(
      collection(db, "notes"),
      where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(notesQuery);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as MoodForm;
      return { ...data, dateTime: new Date(data.dateTime).toISOString() };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};
