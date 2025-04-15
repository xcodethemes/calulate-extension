import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";

import {
  handleBuyClick,
  handleCalculation,
  handleFillValues,
  handleInstantOpen,
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
import { use } from "react";

const App = () => {
  const [url, setUrl] = useState("");
  const [sectionType, setSectionType] = useState("");
  const [sectionData, setSectionData] = useState({});

  const filledValues = useSelector((state) => state?.settings?.fillValues);
  console.log("extension value=>", filledValues?.stopLoss);

  const tvSection = useSelector((state) => state?.settings?.tvSection);
  const webSection = useSelector((state) => state?.settings?.webSection);

  const buyID = useSelector((state) => state?.settings?.tvSection?.buyID);
  const sellID = useSelector((state) => state?.settings?.tvSection?.sellID);
  const superTab = useSelector((state) => state?.settings?.tvSection?.superTab);

  const [view, setView] = useState("main"); // 'main', 'settings', 'notes'

  useEffect(() => {
    console.log("URL in useEffect=>>");
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          setUrl(tabs[0].url || "");
        }
      });
    }
  }, [url]);

  console.log("check url=>>", url);

  useEffect(() => {
    setSectionType(url?.includes("web") ? "web" : "tv");
    setSectionData(url?.includes("web") ? webSection : tvSection);
  }, [sectionType, url, sectionData]);

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

          <OrderDetails allIds={sectionData} type={sectionType} />

          <div className="my-3">
            {/* <div className="flex justify-center items-center gap-2"> */}
            <div className="grid grid-cols-2 gap-2 mb-1.5">
              <button
                id="buyBtn"
                name="buyBtn"
                onClick={() =>
                  handleInstantOpen(
                    sectionData?.superTab,
                    sectionData?.buyID,
                    sectionData?.buyTrailJumpCheckbox,
                    sectionType
                  )
                }
                className="flex gap-2 justify-center items-center bg-green-500 hover:bg-green-700 text-white text-base py-2 px-8 rounded shadow-lg transition-transform transform hover:scale-105"
              >
                <BsFillLightningChargeFill /> Instant Buy
              </button>

              <button
                id="sellBtn"
                name="sellBtn"
                onClick={() =>
                  handleInstantOpen(
                    sectionData?.superTab,
                    sectionData?.sellID,
                    sectionData?.sellTrailJumpCheckbox,
                    sectionType
                  )
                }
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
                  console.log('filledValues==>', filledValues)
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
                    handleFillValues(filledValues, sectionType, sectionData);
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
      {view === "settings" && <Settings setView={setView} type={sectionType} allIds={sectionData} />}

      {/* ✅ Notes Section */}
      {view === "notes" && <Notes setView={setView} />}

      <Footer />
    </div>
  );
};

export default App;
