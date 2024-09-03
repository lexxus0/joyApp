import { configureStore } from "@reduxjs/toolkit";
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
import { authReducer } from "./auth/slice";
import { moodReducer } from "./mood/slice";
import { langReducer } from "./lang/slice";
import { filterReducer } from "./filter/slice";
import { themeReducer } from "./theme/slice";

const persistConfig = {
  key: "conf",
  storage,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    mood: persistReducer(persistConfig, moodReducer),
    lang: persistReducer(persistConfig, langReducer),
    filter: persistReducer(persistConfig, filterReducer),
    theme: persistReducer(persistConfig, themeReducer),
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
