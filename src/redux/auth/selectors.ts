import { RootState } from "../store";

export const selectUser = (state: RootState) => state.auth.user || null;
export const selectProfilePic = (state: RootState) =>
  state.auth.user?.profilePic || null;

export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectError = (state: RootState) => state.auth.error;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
