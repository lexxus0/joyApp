import { RootState } from "../store";
import { selectMoodNotes } from "../mood/selectors";
import { createSelector } from "@reduxjs/toolkit";
import { MoodForm } from "../mood/slice";

export const selectNameFilter = (state: RootState) => state.filter.name || "";
export const selectMoodFilter = (state: RootState) => state.filter.mood;
export const selectStartDate = (state: RootState) => state.filter.startDate;
export const selectEndDate = (state: RootState) => state.filter.endDate;

export const selectFilteredMood = createSelector(
  [
    selectMoodNotes,
    selectNameFilter,
    selectMoodFilter,
    selectStartDate,
    selectEndDate,
  ],
  (
    mood: MoodForm[],
    nameFilter: string,
    moodFilter: number | null,
    startDate: string | null,
    endDate: string | null
  ) => {
    const newFilter = nameFilter.toLowerCase();

    return mood.filter((m: MoodForm) => {
      const matchesName = m.title?.toLowerCase().includes(newFilter);
      const matchesMood = moodFilter === null || m.mood === moodFilter;
      const matchesStartDate =
        !startDate || new Date(m.date) >= new Date(startDate);
      const matchesEndDate = !endDate || new Date(m.date) <= new Date(endDate);

      return matchesName && matchesMood && matchesStartDate && matchesEndDate;
    });
  }
);
