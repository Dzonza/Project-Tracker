import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './homeSlice.js';
import addProjectReducer from './addProjectSlice.js';
import filterResultsReducer from './filterResultsSlice.js';
import editProjectReducer from './editProjectSlice.js';
import filterTasksReducer from './filterTasksSlice.js';
const store = configureStore({
  reducer: {
    home: homeReducer,
    addProject: addProjectReducer,
    filterResults: filterResultsReducer,
    editProject: editProjectReducer,
    filterTasks: filterTasksReducer,
  },
});

export default store;
