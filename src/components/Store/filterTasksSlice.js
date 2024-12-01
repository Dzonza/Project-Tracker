import { createSlice } from '@reduxjs/toolkit';

const filterTasksSlice = createSlice({
  name: 'filterTasks',
  initialState: {
    toFilter: true,
  },

  reducers: {
    startFilterTasks: (state) => {
      state.toFilter = true;
    },
    stopFilterTasks: (state) => {
      state.toFilter = false;
    },
  },
});

export const { startFilterTasks, stopFilterTasks } = filterTasksSlice.actions;
export default filterTasksSlice.reducer;
