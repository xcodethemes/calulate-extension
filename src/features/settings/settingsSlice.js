import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    tvSection: {
      chartBuyId:'body > div.js-rootresizer__contents.layout-with-border-radius > div.layout__area--center > div.chart-container.top-full-width-chart.active > div.chart-container-border > div.chart-widget.chart-widget--themed-light.chart-widget__top--themed-light.chart-widget__bottom--themed-light > div.chart-markup-table > div:nth-child(1) > div.chart-markup-table.pane > div > div.legend-l31H9iuA.noWrap-l31H9iuA.wrappable-l31H9iuA > div.legendMainSourceWrapper-l31H9iuA > div.container-hw_3o_pb > div > div.apply-common-tooltip.button-hw_3o_pb.buyButton-hw_3o_pb',
      chartSellId:'body > div.js-rootresizer__contents.layout-with-border-radius > div.layout__area--center > div.chart-container.top-full-width-chart.active > div.chart-container-border > div.chart-widget.chart-widget--themed-light.chart-widget__top--themed-light.chart-widget__bottom--themed-light > div.chart-markup-table > div:nth-child(1) > div.chart-markup-table.pane > div > div.legend-l31H9iuA.noWrap-l31H9iuA.wrappable-l31H9iuA > div.legendMainSourceWrapper-l31H9iuA > div.container-hw_3o_pb > div > div.apply-common-tooltip.button-hw_3o_pb.sellButton-hw_3o_pb',
      scalperId:"body > div.js-rootresizer__contents.layout-with-border-radius > div.layout__area--top > div > div > div:nth-child(3) > div > div > div > div > div > div:nth-child(16) > div > div",
      buyID: "body > div.js-rootresizer__contents.layout-with-border-radius > div.layout__area--top > div > div > div:nth-child(3) > div > div > div > div > div > div:nth-child(14) > div > div",
      sellID: "body > div.js-rootresizer__contents.layout-with-border-radius > div.layout__area--top > div > div > div:nth-child(3) > div > div > div > div > div > div:nth-child(12) > div > div",
      qty: "#tfdQuantity",
      livePrice: "#tfdltp",
      superTab: "#tfdButtons > button:nth-child(4)",
      limitPrice: "#tfdPrice",
      target: "#tfdTargetPrice",
      stopLoss: "#tfdSLPrice",
      trailJump: "#tfdEnableTrailJumpValue",
      buyTrailJumpCheckbox: "#tfdEnableTrailJump",
      sellTrailJumpCheckbox: "#tfdEnableTrailJump",
    },
    webSection: {
      chartBuyId:"body > div.js-rootresizer__contents.layout-with-border-radius > div.layout__area--center.no-border-bottom-left-radius.no-border-bottom-right-radius > div.chart-container.top-full-width-chart.active > div.chart-container-border > div.chart-widget.chart-widget--themed-light.chart-widget__top--themed-light.chart-widget__bottom--themed-light > div.chart-markup-table > div:nth-child(1) > div.chart-markup-table.pane > div > div.legend-l31H9iuA.noWrap-l31H9iuA.wrappable-l31H9iuA.directionColumn-l31H9iuA > div.legendMainSourceWrapper-l31H9iuA > div.container-hw_3o_pb > div > div.apply-common-tooltip.button-hw_3o_pb.buyButton-hw_3o_pb",
      chartSellId:"body > div.js-rootresizer__contents.layout-with-border-radius > div.layout__area--center.no-border-bottom-left-radius.no-border-bottom-right-radius > div.chart-container.top-full-width-chart.active > div.chart-container-border > div.chart-widget.chart-widget--themed-light.chart-widget__top--themed-light.chart-widget__bottom--themed-light > div.chart-markup-table > div:nth-child(1) > div.chart-markup-table.pane > div > div.legend-l31H9iuA.noWrap-l31H9iuA.wrappable-l31H9iuA.directionColumn-l31H9iuA > div.legendMainSourceWrapper-l31H9iuA > div.container-hw_3o_pb > div > div.apply-common-tooltip.button-hw_3o_pb.sellButton-hw_3o_pb",
      qty:"Quantity",
      livePrice: "body > app-root > div.webpage > app-index > div.pageContainer > div > div > div.right_container > app-companypage > div.qoutesContent > div > div:nth-child(4) > div > div.col-xl-6.col-lg-6.col-md-6.left.pl-0 > div.left.pl-0 > div > div.d-flex.mt-3.paddingData.lh-25.pb-2 > div.lowHighBar > div > div.dataBoxForrange",
      superTab: "",
      buyID: "body > app-root > div.webpage > app-index > div.pageContainer > div > div > div.right_container > app-companypage > div.qoutesContent > div > div:nth-child(2) > div > div.p-3 > div > div:nth-child(1) > button.btn.buysellbtn.greenBG.mr-2.d-flex.justify-content-center.align-center",
      sellID: "body > app-root > div.webpage > app-index > div.pageContainer > div > div > div.right_container > app-companypage > div.qoutesContent > div > div:nth-child(2) > div > div.p-3 > div > div:nth-child(1) > button.btn.buysellbtn.mr-0.redBG.d-flex.justify-content-center.align-center",
      limitPrice: "Price",
      target: "vt_target",
      stopLoss: "vt_stoploss",
      trailJump: "trailing_jump",
      buyTrailJumpCheckbox:'showTrailingJump',
      sellTrailJumpCheckbox:'showTrailingJump',
    },
    fillValues: {
      qty: "",
      limitPrice: "",
      target: "",
      stopLoss: "",
      trailJump: "",
    },
    setPercentage: {
      setTargetPercentage: 2,
      setStopLossPercentage: 0.5,
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
