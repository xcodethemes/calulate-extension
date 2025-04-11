import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    tvSection: {
      qty: "#tfdQuantity",
      livePrice: "#tfdltp",
      superTab: "",
      buyID: "",
      sellID: "",
      limitPrice: "#tfdPrice",
      target: "",
      stopLoss: "",
      trailJump: "#tfdEnableTrailJumpValue",
    },
    webSection: {
      livePrice: "",
      superTab: "",
      buyID: "",
      sellID: "",
      limitPrice: "",
      target: "",
      stopLoss: "",
      trailJump: "",
    },
    fillValues: {
      qty: "",
      limitPrice: "",
      target: "",
      stopLoss: "",
      trailJump: "",
    },
    setPercentage: {
      setTargetPercentage: "",
      setStopLossPercentage: "",
    },
  },
  reducers: {
    setTargetPercentage: (state, action) => {
      state.setPercentage.setTargetPercentage = action.payload;
    },
    setStopLossPercentage: (state, action) => {
      state.setPercentage.setStopLossPercentage = action.payload;
    },
    storeQtyValue: (state, action) => {
      state.fillValues.qty = action.payload;
    },
    storeLimitPriceValue: (state, action) => {
      state.fillValues.limitPrice = action.payload;
    },
    storeTargetValue: (state, action) => {
      state.fillValues.target = action.payload;
    },
    storeStopLossValue: (state, action) => {
      state.fillValues.stopLoss = action.payload;
    },
    setTrailJumpValue: (state, action) => {
      state.fillValues.trailJump = action.payload;
    },
    setValues: (state, action) => {
      const { section, id, value } = action.payload;

      if (section === "tvSection" && id in state.tvSection) {
        state.tvSection[id] = value;
      }

      if (section === "webSection" && id in state.webSection) {
        state.webSection[id] = value;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTargetPercentage,
  storeQtyValue,
  storeLimitPriceValue,
  storeTargetValue,
  storeStopLossValue,
  setTrailJumpValue,
  setValues,
} = settingsSlice.actions;

export default settingsSlice.reducer;
