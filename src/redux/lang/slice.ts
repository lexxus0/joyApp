import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

export const { changeLang } = langSlice.actions;
export const langReducer = langSlice.reducer;
