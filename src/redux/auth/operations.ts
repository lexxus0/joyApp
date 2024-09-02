import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase";

import { createAsyncThunk } from "@reduxjs/toolkit";

type User = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password, rememberMe }: User, thunkAPI) => {
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (rememberMe) {
        localStorage.setItem("authUser", JSON.stringify({ email }));
      } else {
        localStorage.removeItem("authUser");
      }
      return credentials.user.email;
    } catch (error) {
      let errorMessage = "Failed to do something exceptional";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password, rememberMe }: User, thunkAPI) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (rememberMe) {
        localStorage.setItem("authUser", JSON.stringify({ email }));
      } else {
        localStorage.removeItem("authUser");
      }
      return credentials.user.email;
    } catch (error) {
      let errorMessage = "Failed to do something exceptional";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      localStorage.removeItem("authUser");
      return "Logging out was successful";
    } catch (error) {
      let errorMessage = "Failed to log out";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const checkUserAuth = createAsyncThunk("auth/checkAuth", async () => {
  return new Promise<string | null>((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.email);
      } else {
        resolve(null);
      }
    });
  });
});

export const loginUserWithGoogle = createAsyncThunk(
  "auth/loginUserWithGoogle",
  async (_, thunkAPI) => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      return res.user.email;
    } catch (error) {
      let errorMessage = "Failed to authenticate with Google";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
