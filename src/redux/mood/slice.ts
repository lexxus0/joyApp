import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { saveNote, loadNotes } from "../../firebase";
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

export const fetchNotesFromFirestore = createAsyncThunk(
  "mood/fetchNotesFromFirestore",
  async () => {
    const notes = await loadNotes();
    return notes;
  }
);

const moodSlice = createSlice({
  name: "mood",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<MoodForm>) => {
      state.list.push(action.payload);
      saveNote(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchNotesFromFirestore.fulfilled,
      (state, action: PayloadAction<MoodForm[]>) => {
        state.list = action.payload;
      }
    );
  },
});

export const { addNote } = moodSlice.actions;
export const moodReducer = moodSlice.reducer;
