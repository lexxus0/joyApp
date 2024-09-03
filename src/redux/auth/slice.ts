import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  registerUser,
  loginUser,
  logoutUser,
  checkUserAuth,
  loginUserWithGoogle,
} from "./operations";

export interface AuthState {
  user: { uid: string; email: string | null; profilePic: string | null } | null;
  isLoading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        uid: string;
        email: string | null;
        profilePic: string | null;
      }>
    ) => {
      state.user = {
        uid: action.payload.uid,
        email: action.payload.email,
        profilePic: action.payload.profilePic,
      };
      state.isLoggedIn = action.payload.email !== null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          uid: action.payload.uid,
          email: action.payload.email,
          profilePic: action.payload.profilePic || null,
        };
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            uid: string;
            email: string | null;
            profilePic: string | null;
          }>
        ) => {
          state.isLoading = false;
          state.user = {
            uid: action.payload.uid,
            email: action.payload.email,
            profilePic: action.payload.profilePic,
          };
          state.isLoggedIn = true;
        }
      )
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(
        checkUserAuth.fulfilled,
        (
          state,
          action: PayloadAction<{
            uid: string;
            email: string | null;
            profilePic: string | null;
          } | null>
        ) => {
          if (action.payload) {
            state.user = {
              uid: action.payload.uid,
              email: action.payload.email,
              profilePic: action.payload.profilePic,
            };
            state.isLoggedIn = true;
          } else {
            state.user = null;
            state.isLoggedIn = false;
          }
        }
      )
      .addCase(
        loginUserWithGoogle.fulfilled,
        (
          state,
          action: PayloadAction<{
            uid: string;
            email: string | null;
            profilePic: string | null;
          }>
        ) => {
          state.isLoading = false;
          state.user = {
            uid: action.payload.uid,
            email: action.payload.email,
            profilePic: action.payload.profilePic,
          };
          state.isLoggedIn = true;
        }
      )
      .addCase(loginUserWithGoogle.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
