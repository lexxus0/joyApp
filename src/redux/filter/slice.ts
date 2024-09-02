import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterState = {
  name: string;
  mood: number | null;
  startDate: string | null;
  endDate: string | null;
};

const initialState: FilterState = {
  name: "",
  mood: null,
  startDate: null,
  endDate: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilterName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    changeFilterMood: (state, action: PayloadAction<number | null>) => {
      state.mood = action.payload;
    },
    changeStartDate: (state, action: PayloadAction<string | null>) => {
      state.startDate = action.payload;
    },
    changeEndDate: (state, action: PayloadAction<string | null>) => {
      state.endDate = action.payload;
    },
    clearFilters: (state) => {
      state.name = "";
      state.mood = null;
      state.startDate = null;
      state.endDate = null;
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const {
  changeFilterName,
  changeFilterMood,
  changeStartDate,
  changeEndDate,
  clearFilters,
} = filterSlice.actions;
