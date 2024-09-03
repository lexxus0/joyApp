import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { useAppSelector } from "../hooks";
import { translations } from "./translations";

export type Lang = "en" | "uk";

interface LangState {
  language: Lang;
}

const initialState: LangState = {
  language: "en",
};

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    changeLang: (state, action: PayloadAction<Lang>) => {
      state.language = action.payload;
    },
  },
});

export const useTranslation = () => {
  const language = useAppSelector((state: RootState) => state.lang.language);

  const t = (key: keyof (typeof translations)["en"]): string => {
    return translations[language as Lang][key];
  };

  return { t };
};

export const { changeLang } = langSlice.actions;
export const langReducer = langSlice.reducer;
