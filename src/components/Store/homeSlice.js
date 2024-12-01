import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    isOpenHome: true,
  },

  reducers: {
    openHome: (state) => {
      state.isOpenHome = true;
    },
    closeHome: (state) => {
      state.isOpenHome = false;
    },
  },
});

export const { openHome, closeHome } = homeSlice.actions;
export default homeSlice.reducer;
