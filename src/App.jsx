import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";

import {
  handleBuyClick,
  handleCalculation,
  handleFillValues,
} from "./utils/helper";
import Settings from "./components/Settings";
import Notes from "./components/Notes";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactDetails from "./components/ContactDetails";
import CountdownTimer from "./components/ui/CountdownTimer";
import { IoChatboxEllipsesOutline, IoSettingsOutline } from "react-icons/io5";
import OrderDetails from "./components/OrderDetails";
import { BsFillLightningChargeFill } from "react-icons/bs";
import Pro from "./components/Pro";

const App = () => {
  const filledValues = useSelector((state) => state?.settings?.fillValues);
  console.log("extension value=>", filledValues?.stopLoss);
  const buyID = useSelector((state) => state?.settings?.tvSection?.buyID);
  const sellID = useSelector((state) => state?.settings?.tvSection?.sellID);
  const superTab = useSelector((state) => state?.settings?.tvSection?.superTab);

  const [view, setView] = useState("main"); // 'main', 'settings', 'notes'

  const storedBuyID = localStorage?.getItem("buyID") || "";

  console.log("storedBuyID from Outside=>", storedBuyID);
  console.log("In app buyID from Outside=>", buyID);

  // const handleFillValues = () => {
  //   console.log("handleFillValues Clicked!!");

  //   if (typeof chrome !== "undefined" && chrome.tabs) {
  //     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //       if (tabs.length === 0) {
  //         console.error("No active tab found.");
  //         return;
  //       }

  //       chrome.scripting.executeScript({
  //         target: { tabId: tabs[0].id },
  //         args: [filledValues],
  //         function: (filledValues) => {
  //           // const inputs = document?.querySelector(allIds?.stopLoss) || document.querySelector('#tfdSLPrice');
  //           const qtyInput = document.querySelector("#tfdQuantity");
  //           const limitPriceInput = document.querySelector("#tfdPrice");
  //           const stopLossInput = document.querySelector("#tfdSLPrice");
  //           const targetInput = document.querySelector("#tfdTargetPrice");
  //           const trailJumpInput = document.querySelector(
  //             "#tfdEnableTrailJumpValue"
  //           );

  //           // console.log("Check stop loss inputs==>", inputs);
  //           // if (inputs.length === 0) {
  //           //   console.log("No number inputs found.");
  //           //   return;
  //           // }

  //           console.log("extension obj=>", filledValues);
  //           qtyInput.value = filledValues?.qty;
  //           limitPriceInput.value = filledValues?.limitPrice;
  //           stopLossInput.value = filledValues?.stopLoss;
  //           targetInput.value = filledValues?.target;
  //           trailJumpInput.value = filledValues?.trailJump;

  //           console.log("Fill Values!");
  //         },
  //       });
  //     });
  //   } else {
  //     console.warn(
  //       "Chrome API is not available. Run this as a Chrome extension."
  //     );
  //   }
  // };

  return (
    <div className="p-0">
      {/* <Header /> */}
      <Navbar setView={setView} />

      {/* ✅ Main Section */}
      {view === "main" && (
        <>
          <ContactDetails />

          <div className="flex justify-between items-center mb-9">
            <div className="flex items-center gap-2 ">
              <IoSettingsOutline className="text-teal-600 text-xl" />
              <h2 className="text-lg font-semibold">Quick Settings</h2>
            </div>

            <div className="flex items-center gap-2 ">
              <IoChatboxEllipsesOutline className="text-teal-600 text-xl" />
              <h2 className="text-lg font-semibold"> Send Feedback</h2>
            </div>
          </div>

          <CountdownTimer />

          <OrderDetails />

          <div className="my-3">
            {/* <div className="flex justify-center items-center gap-2"> */}
            <div className="grid grid-cols-2 gap-2 mb-1.5">
              <button
                id="buyBtn"
                name="buyBtn"
                onClick={() => handleBuyClick(buyID, superTab)}
                className="flex gap-2 justify-center items-center bg-green-500 hover:bg-green-700 text-white text-base py-2 px-8 rounded shadow-lg transition-transform transform hover:scale-105"
              >
                <BsFillLightningChargeFill /> Instant Buy
              </button>

              <button
                id="sellBtn"
                name="sellBtn"
                onClick={() => handleBuyClick(sellID, superTab)}
                className="flex gap-2 justify-center items-center bg-red-600 hover:bg-red-700 text-white text-base py-2 px-8 rounded shadow-lg transition-transform transform hover:scale-105"
              >
                <BsFillLightningChargeFill /> Instant Sell
              </button>
            </div>

            <div className="flex justify-center items-center mb-2">
              <button
                id="fillValues"
                name="fillValues"
                onClick={() => {
                  if (
                    filledValues?.trailJump == "Off" ||
                    filledValues?.trailJump == "" ||
                    filledValues?.qty == "" ||
                    filledValues?.limitPrice == "" ||
                    filledValues?.target == "" ||
                    filledValues?.stopLoss == ""
                  ) {
                    alert("Please fill all the values");
                  } else {  
                    handleFillValues(filledValues);
                  }
                }}
                className=" flex gap-2 justify-center items-center bg-blue-500 hover:bg-blue-700 text-white text-base w-full py-2 px-0 rounded shadow-lg transition-transform transform hover:scale-105"
              >
                <BsFillLightningChargeFill /> Fill values
              </button>
            </div>
          </div>
          <Pro />
        </>
      )}

      {/* ✅ Settings Section with buyID Input */}
      {view === "settings" && <Settings setView={setView} />}

      {/* ✅ Notes Section */}
      {view === "notes" && <Notes setView={setView} />}

      <Footer />
    </div>
  );
};

export default App;
