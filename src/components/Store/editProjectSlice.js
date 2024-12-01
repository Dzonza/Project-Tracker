import { createSlice } from '@reduxjs/toolkit';

const editProjectSlice = createSlice({
  name: 'editProject',
  initialState: {
    isOpenEditProject: null,
  },

  reducers: {
    openEditProject: (state, action) => {
      state.isOpenEditProject = action.payload;
    },
    closeEditProject: (state) => {
      state.isOpenEditProject = null;
    },
  },
});

export const { openEditProject, closeEditProject } = editProjectSlice.actions;
export default editProjectSlice.reducer;
