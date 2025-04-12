import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    tvSection: {
      qty: "#tfdQuantity",
      livePrice: "#tfdltp",
      superTab: "#tfdButtons > button:nth-child(4)",
      buyID: "body > div.js-rootresizer__contents.layout-with-border-radius > div.layout__area--top > div > div > div:nth-child(3) > div > div > div > div > div > div:nth-child(14) > div > div",
      sellID: "body > div.js-rootresizer__contents.layout-with-border-radius > div.layout__area--top > div > div > div:nth-child(3) > div > div > div > div > div > div:nth-child(12) > div > div",
      limitPrice: "#tfdPrice",
      target: "#tfdTargetPrice",
      stopLoss: "#tfdSLPrice",
      trailJump: "#tfdEnableTrailJumpValue",
      buyTrailJumpCheckbox: "#tfdEnableTrailJump",
      sellTrailJumpCheckbox: "#tfdEnableTrailJump",
    },
    webSection: {
      qty:"#mat-dialog-0 > app-miniplaceorder > div > div > div.orderSummery.ng-tns-c2870831140-25 > form > div.widget.pl-3.pr-3.pb-3.borderNone.alertContainer.ng-tns-c2870831140-25 > div > div > div > div > div:nth-child(1) > div.numberinputcontainer.mt-4.ng-tns-c2870831140-25 > div > input",
      livePrice: "#watchlist > div:nth-child(1) > div > mat-list-item > span > div > div:nth-child(1) > div:nth-child(1) > span.float-right.list_symbol_ltp.min-width-ltp.greenLtp",
      superTab: "",
      buyID: "body > app-root > div.webpage > app-index > div.pageContainer > div > div > div.right_container > app-companypage > div.qoutesContent > div > div:nth-child(2) > div > div.p-3 > div > div:nth-child(1) > button.btn.buysellbtn.greenBG.mr-2.d-flex.justify-content-center.align-center",
      sellID: "body > app-root > div.webpage > app-index > div.pageContainer > div > div > div.right_container > app-companypage > div.qoutesContent > div > div:nth-child(2) > div > div.p-3 > div > div:nth-child(1) > button.btn.buysellbtn.mr-0.redBG.d-flex.justify-content-center.align-center",
      limitPrice: "#mat-dialog-6 > app-miniplaceorder > div > div > div.orderSummery.ng-tns-c2870831140-37 > form > div.widget.pl-3.pr-3.pb-3.borderNone.alertContainer.ng-tns-c2870831140-37 > div > div > div > div > div:nth-child(1) > div.mt-4.ml16.ng-tns-c2870831140-37 > div > input",
      target: "#mat-dialog-0 > app-miniplaceorder > div > div > div > form > div.widget.pl-3.pr-3.pb-3.borderNone.alertContainer.ng-tns-c2870831140-25 > div > div > div > div > div.d-flex.vtt.ng-tns-c2870831140-25.ng-star-inserted > div:nth-child(1) > input",
      stopLoss: "#mat-dialog-0 > app-miniplaceorder > div > div > div > form > div.widget.pl-3.pr-3.pb-3.borderNone.alertContainer.ng-tns-c2870831140-25 > div > div > div > div > div.d-flex.vtt.ng-tns-c2870831140-25.ng-star-inserted > div:nth-child(2) > input",
      trailJump: "#mat-dialog-0 > app-miniplaceorder > div > div > div > form > div.widget.pl-3.pr-3.pb-3.borderNone.alertContainer.ng-tns-c2870831140-25 > div > div > div > div > div.d-flex.vtt.ng-tns-c2870831140-25.ng-star-inserted > div.position-relative.mt-4.ml16.ng-tns-c2870831140-25.ng-star-inserted > input",
      buyTrailJumpCheckbox:'#mat-checkbox-4-input',
      sellTrailJumpCheckbox:'#mat-checkbox-7-input',
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
  setStopLossPercentage,
  storeQtyValue,
  storeLimitPriceValue,
  storeTargetValue,
  storeStopLossValue,
  setTrailJumpValue,
  setValues,
} = settingsSlice.actions;

export default settingsSlice.reducer;
