import { createSlice } from '@reduxjs/toolkit';

const filterResultsSlice = createSlice({
  name: 'filterResults',
  initialState: {
    isFiltered: true,
  },

  reducers: {
    filter: (state) => {
      state.isFiltered = true;
    },
    stopFilter: (state) => {
      state.isFiltered = false;
    },
  },
});

export const { filter, stopFilter } = filterResultsSlice.actions;

export default filterResultsSlice.reducer;
