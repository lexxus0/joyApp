import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { loadNotes } from "../../firebase";
import { saveNote } from "../../firebase";
import { AppDispatch, RootState } from "../store";
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
export const addNoteAsync = createAsyncThunk<
  void,
  MoodForm,
  { dispatch: AppDispatch; state: RootState }
>("mood/addNoteAsync", async (note: MoodForm, { dispatch }) => {
  await saveNote(note, dispatch);
});

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
