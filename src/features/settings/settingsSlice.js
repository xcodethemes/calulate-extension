import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    tvSection: {
      livePrice: "",
      superTab: "",
      buyID: "",
      sellID: "",
      limitPrice: "",
      target: "",
      stopLoss: "",
    },
    webSection: {
      livePrice: "",
      superTab: "",
      buyID: "",
      sellID: "",
      limitPrice: "",
      target: "",
      stopLoss: "",
    },
  },
  reducers: {
    setValues: (state, action) => {
      const { section, id, value } = action.payload;
    
      if (section === "tvSection" && id in state.tvSection) {
        state.tvSection[id] = value;
      }
    
      if (section === "webSection" && id in state.webSection) {
        state.webSection[id] = value;
      }
    }
    // setValues: (state, action) => {
    //   const { id, value } = action.payload;
    //   if (id in state.tvSection) {
    //     state.tvSection[id] = value;
    //   }
    // },

    
    // setValues: (state, action) => {
    //   console.log("setValues action.payload=>", action.payload);
    //   alert("setValues action.payload=>", action.payload);

    //   if (action.payload.id === "livePrice") {
    //     state.tvSection.livePrice = action.payload.value;
    //   }
    //   if (action.payload.id === "superTab") {
    //     state.tvSection.superTab = action.payload.value;
    //   }
    //   if (action.payload.id === "buyID") {
    //     state.tvSection.buyID = action.payload.value;
    //   }
    //   if (action.payload.id === "sellID") {
    //     state.tvSection.sellID = action.payload.value;
    //   }
    //   if (action.payload.id === "limitPrice") {
    //     state.tvSection.limitPrice = action.payload.value;
    //   }
    //   if (action.payload.id === "target") {
    //     state.tvSection.target = action.payload.value;
    //   }
    //   if (action.payload.id === "stopLoss") {
    //     state.tvSection.stopLoss = action.payload.value;
    //   }
    // },
  },
});

// Action creators are generated for each case reducer function
export const { setValues } = settingsSlice.actions;

export default settingsSlice.reducer;
