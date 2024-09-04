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

export const registerUser = createAsyncThunk<
  { uid: string; email: string | null; profilePic: string | undefined },
  { email: string; password: string }
>("auth/register", async ({ email, password }, thunkAPI) => {
  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const profilePic = credentials.user.photoURL || undefined;

    await createUserDocument({
      uid: credentials.user.uid,
      email: credentials.user.email || "",
      displayName: "",
      profilePic,
    });

    thunkAPI.dispatch(resetNotes());

    return {
      uid: credentials.user.uid,
      email: credentials.user.email || "",
      profilePic: profilePic,
    };
  } catch (error) {
    let errorMessage = "Failed to register user";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const loginUser = createAsyncThunk<
  { uid: string; email: string | null; profilePic: string | null },
  Omit<User, "uid" | "profilePic" | "displayName">
>("auth/login", async ({ email, password, rememberMe }, thunkAPI) => {
  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const credentials = await signInWithEmailAndPassword(auth, email, password);

    const userDoc = await getDoc(doc(db, "users", credentials.user.uid));
    const profilePic =
      userDoc.exists() && userDoc.data()?.profilePic
        ? userDoc.data()?.profilePic
        : "";

    if (rememberMe) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify({ email }));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }

    return {
      uid: credentials.user.uid,
      email: credentials.user.email || "",
      profilePic,
    };
  } catch (error) {
    let errorMessage = "Failed to login";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
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
      let errorMessage = "Failed to logout";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
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
    const res = await signInWithPopup(auth, googleProvider);

    const userDoc = await getDoc(doc(db, "users", res.user.uid));
    const profilePic =
      userDoc.exists() && userDoc.data()?.profilePic
        ? userDoc.data()?.profilePic
        : res.user.photoURL || "";

    await createUserDocument({
      uid: res.user.uid,
      email: res.user.email || "",
      displayName: res.user.displayName || "",
      profilePic,
    });

    return {
      uid: res.user.uid,
      email: res.user.email || "",
      profilePic,
    };
  } catch (error) {
    let errorMessage = "Failed to authenticate with Google";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
