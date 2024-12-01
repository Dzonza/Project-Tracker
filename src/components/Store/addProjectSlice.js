import { createSlice } from '@reduxjs/toolkit';

const addProjectSlice = createSlice({
  name: 'addProject',
  initialState: {
    isOpenAddProject: false,
  },

  reducers: {
    openAddProject: (state) => {
      state.isOpenAddProject = true;
    },
    closeAddProject: (state) => {
      state.isOpenAddProject = false;
    },
  },
});

export const { openAddProject, closeAddProject } = addProjectSlice.actions;
export default addProjectSlice.reducer;
