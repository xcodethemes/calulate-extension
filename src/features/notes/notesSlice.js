import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
  name: "notes",
  initialState:{
    savedNotes: [],
  },
  reducers: {
    saveNotes: (state, action) => {
      console.log("addNOtes action.payload=>", action.payload);
      state.savedNotes.push(action.payload);
    },

  },
});

// Action creators are generated for each case reducer function
export const { saveNotes } = notesSlice.actions;

export default notesSlice.reducer;
