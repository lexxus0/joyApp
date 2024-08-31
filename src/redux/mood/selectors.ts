import { RootState } from "../store";

export const selectMoodNotes = (state: RootState) => state.mood.list;
