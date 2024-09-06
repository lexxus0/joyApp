import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { MoodForm } from "./slice";
import { saveNote } from "../../firebase";
import { addAchievementAsync } from "../achievements/operations";
import { AppDispatch } from "../store";
import { Achievement } from "../achievements/slice";
import { loadNotes } from "../../firebase";

export const achievements: Achievement[] = [
  {
    id: 1,
    title: "First Step",
    description: "Complete your first note",
    condition: { notes: 1 },
    completed: false,
    userId: "",
  },
  {
    id: 2,
    title: "Starting Out",
    description: "Complete 5 notes",
    condition: { notes: 5 },
    completed: false,
    userId: "",
  },
  {
    id: 3,
    title: "Getting the Hang",
    description: "Complete 10 notes",
    condition: { notes: 10 },
    completed: false,
    userId: "",
  },
  {
    id: 4,
    title: "Consistency",
    description: "Complete 20 notes",
    condition: { notes: 20 },
    completed: false,
    userId: "",
  },
  {
    id: 5,
    title: "Mood Master",
    description: "Complete 50 notes",
    condition: { notes: 50 },
    completed: false,
    userId: "",
  },
  {
    id: 6,
    title: "First Smile",
    description: "Add a positive note",
    condition: { positiveNotes: 1 },
    completed: false,
    userId: "",
  },
  {
    id: 7,
    title: "Smiling More",
    description: "Add 5 positive notes",
    condition: { positiveNotes: 5 },
    completed: false,
    userId: "",
  },
  {
    id: 8,
    title: "Mood Lifter",
    description: "Add 10 positive notes",
    condition: { positiveNotes: 10 },
    completed: false,
    userId: "",
  },
  {
    id: 9,
    title: "Positive Vibes",
    description: "Add 20 positive notes",
    condition: { positiveNotes: 20 },
    completed: false,
    userId: "",
  },
  {
    id: 10,
    title: "Mood Hero",
    description: "Add 50 positive notes",
    condition: { positiveNotes: 50 },
    completed: false,
    userId: "",
  },
];

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
>("mood/addNoteAsync", async (note: MoodForm, { dispatch, getState }) => {
  await saveNote(note, dispatch);

  await dispatch(fetchNotesFromFirestore());

  const state = getState() as RootState;
  const notes = state.mood.list;
  const positiveNotes = notes.filter((n) => n.mood > 3).length;

  achievements.forEach((achievement) => {
    if (
      achievement.condition.notes &&
      notes.length === achievement.condition.notes
    ) {
      dispatch(addAchievementAsync(achievement));
    } else if (
      achievement.condition.positiveNotes &&
      positiveNotes === achievement.condition.positiveNotes
    ) {
      dispatch(addAchievementAsync(achievement));
    }
  });
});
