import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const selectAchievements = (state: RootState) =>
  state.achievements.achievements;

export const selectCompletedAchievements = createSelector(
  selectAchievements,
  (achievements) => achievements.filter((achievement) => achievement.completed)
);
