import { configureStore, Reducer } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer, AuthState } from "./auth/slice";
import { moodReducer } from "./mood/slice";
import { langReducer } from "./lang/slice";
import { filterReducer } from "./filter/slice";
import { themeReducer } from "./theme/slice";
import { PersistPartial } from "redux-persist/es/persistReducer";

const authPersistConfig = {
  key: "auth",
  storage,
};

const moodPersistConfig = {
  key: "mood",
  storage,
};

const langPersistConfig = {
  key: "lang",
  storage,
};

const themePersistConfig = {
  key: "theme",
  storage,
};

type PersistedAuthState = AuthState & PersistPartial;

const persistedAuthReducer = persistReducer<PersistedAuthState>(
  authPersistConfig,
  authReducer as unknown as Reducer<PersistedAuthState>
);

const persistedMoodReducer = persistReducer(moodPersistConfig, moodReducer);

const persistedLangReducer = persistReducer(langPersistConfig, langReducer);

const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    mood: persistedMoodReducer,
    lang: persistedLangReducer,
    theme: persistedThemeReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
