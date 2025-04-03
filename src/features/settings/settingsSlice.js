import { createSlice } from "@reduxjs/toolkit";



export const settingsSlice = createSlice({
  name: "settings",
  initialState:{
    buyID:'',
    sellID:'',
    // selector:'',
    // target:'',
    value: 0,

  },
  reducers: {
    setValues: (state, action) => {
      console.log('setValues action.payload=>', action.payload);
      state.buyID = action.payload;
     
    },
    setSellValues: (state, action) => {
      console.log('setSellValues action.payload=>', action.payload);
      state.sellID = action.payload;
    },
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, setValues, setSellValues } = settingsSlice.actions;

export default settingsSlice.reducer;
