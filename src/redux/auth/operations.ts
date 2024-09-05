import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, createUserDocument, googleProvider } from "../../firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetNotes } from "../mood/slice";
import { getDoc, doc } from "firebase/firestore";

const AUTH_USER_KEY = "authUser";

export type User = {
  uid: string;
  profilePic?: string;
  displayName?: string;
  email: string;
  password?: string;
  rememberMe?: boolean;
};

const handleError = (error: unknown, defaultMessage: string) => {
  return error instanceof Error ? error.message : defaultMessage;
};

export const registerUser = createAsyncThunk<
  { uid: string; email: string | null; profilePic: string | undefined },
  { email: string; password: string }
>("auth/register", async ({ email, password }, thunkAPI) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const profilePic = user.photoURL || undefined;

    await createUserDocument({
      uid: user.uid,
      email: user.email || "",
      displayName: "",
      profilePic,
    });

    thunkAPI.dispatch(resetNotes());

    return { uid: user.uid, email: user.email || "", profilePic };
  } catch (error) {
    return thunkAPI.rejectWithValue(handleError(error, "Failed to register"));
  }
});

export const loginUser = createAsyncThunk<
  { uid: string; email: string | null; profilePic: string | null },
  Omit<User, "uid" | "profilePic" | "displayName">
>("auth/login", async ({ email, password }, thunkAPI) => {
  try {
    if (!email || !password) throw new Error("Required");

    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const profilePic = userDoc.exists() ? userDoc.data()?.profilePic || "" : "";

    return { uid: user.uid, email: user.email || "", profilePic };
  } catch (error) {
    return thunkAPI.rejectWithValue(handleError(error, "Failed to login"));
  }
});

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      localStorage.removeItem(AUTH_USER_KEY);
      return "Logout successful";
    } catch (error) {
      return thunkAPI.rejectWithValue(handleError(error, "Failed to logout"));
    }
  }
);

export const checkUserAuth = createAsyncThunk<{
  uid: string;
  email: string | null;
  profilePic: string | null;
} | null>("auth/checkAuth", async () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.exists() ? userDoc.data() : null;

        resolve({
          uid: user.uid,
          email: user.email || null,
          profilePic: userData?.profilePic || "",
        });
      } else {
        resolve(null);
      }
    });
  });
});

export const loginUserWithGoogle = createAsyncThunk<{
  uid: string;
  email: string | null;
  profilePic: string | null;
}>("auth/loginUserWithGoogle", async (_, thunkAPI) => {
  try {
    const { user } = await signInWithPopup(auth, googleProvider);
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const profilePic = userDoc.exists()
      ? userDoc.data()?.profilePic || user.photoURL || ""
      : user.photoURL || "";

    await createUserDocument({
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || "",
      profilePic,
    });

    return { uid: user.uid, email: user.email || "", profilePic };
  } catch (error) {
    return thunkAPI.rejectWithValue(
      handleError(error, "Failed to authenticate with Google")
    );
  }
});
