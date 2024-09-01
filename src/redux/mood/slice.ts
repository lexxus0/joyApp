import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MoodForm {
  date: string;
  time: string;
  mood: number;
  description: string;
  drawing: string;
}

interface MoodState {
  list: MoodForm[];
}

const initialState: MoodState = {
  list: [],
};

const moodSlice = createSlice({
  name: "m00d",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<MoodForm>) => {
      state.list.push(action.payload);
    },
    loadNote: (state, action: PayloadAction<MoodForm[]>) => {
      state.list = action.payload;
    },
  },
});

export const { addNote, loadNote } = moodSlice.actions;

export const moodReducer = moodSlice.reducer;
