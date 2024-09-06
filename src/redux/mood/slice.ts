import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchNotesFromFirestore } from "./operations";

export interface MoodForm {
  title: string;
  dateTime: string;
  mood: number;
  description: string;
  drawing?: string;
  profilePic?: string;
}

interface MoodState {
  list: MoodForm[];
}

const initialState: MoodState = {
  list: [],
};

const moodSlice = createSlice({
  name: "mood",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<MoodForm>) => {
      state.list.push(action.payload);
    },
    resetNotes: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchNotesFromFirestore.fulfilled,
      (state, action: PayloadAction<MoodForm[]>) => {
        if (action.payload.length > 0) {
          state.list = action.payload;
        }
      }
    );
  },
});

export const { addNote, resetNotes } = moodSlice.actions;
export const moodReducer = moodSlice.reducer;
