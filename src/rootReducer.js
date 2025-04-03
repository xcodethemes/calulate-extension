import { combineReducers } from "@reduxjs/toolkit";
import settingsRedcer from "./features/settings/settingsSlice";
import notesReducer from "./features/notes/notesSlice";

const rootReducer = combineReducers({
  settings: settingsRedcer,
  notes: notesReducer,
});

export default rootReducer;
