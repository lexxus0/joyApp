import { createSlice } from "@reduxjs/toolkit";
import { fetchAchievements, addAchievementAsync } from "./operations";

export interface Achievement {
  id: number;
  title: string;
  description: string;
  condition: {
    notes?: number;
    positiveNotes?: number;
  };
  completed: boolean;
  userId: string;
}

interface AchievementsState {
  achievements: Achievement[];
}

const initialState: AchievementsState = {
  achievements: [],
};

export const achievementsSlice = createSlice({
  name: "achievements",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAchievements.fulfilled, (state, action) => {
        state.achievements = action.payload;
      })
      .addCase(addAchievementAsync.fulfilled, (state, action) => {
        const existingAchievement = state.achievements.find(
          (achievement) => achievement.id === action.payload.id
        );

        if (existingAchievement) {
          existingAchievement.completed = true;
        } else {
          state.achievements.push({ ...action.payload, completed: true });
        }
      });
  },
});

export const achievementsReducer = achievementsSlice.reducer;
