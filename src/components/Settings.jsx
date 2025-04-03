import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSellValues, setValues } from "../features/settings/settingsSlice";

import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import CountdownTimer from "./CountdownTimer";

const Settings = ({ setView }) => {
  const dispatch = useDispatch();
  const getBuyId = useSelector((state) => state?.settings?.buyID);
  const getSellId = useSelector((state) => state?.settings?.sellID);

  const [active, setActive] = useState("TV Dhan");

  const [livePrice, setLivePrice] = useState("");
  const [buyID, setBuyId] = useState("");
  const [sellID, setSellId] = useState("");
  const [selector, setSelector] = useState("");

  useEffect(() => {
    console.log("getBuyId=>", getBuyId);
    if (getBuyId != "") {
      setBuyId(getBuyId);
    }
    if (getSellId != "") {
      setSellId(getSellId);
    }
  }, [getBuyId]);

  // ✅ Handle copy to clipboard for any input field
  const handleCopy = (value, label) => {
    if (!value.trim()) {
      alert(`${label} field is empty!`);
      return;
    }

    navigator.clipboard
      .writeText(value)
      .then(() => {
        alert(`${label} copied to clipboard!`);
      })
      .catch((err) => {
        console.error(`Failed to copy ${label}: `, err);
      });
  };

  // ✅ Save buyID and Selector to local storage
  const saveSettingsToLocalStorage = (type) => {
    if (type === "buy") {
      // localStorage.setItem("buyID", buyID);
    } else if (type === "sell") {
      // localStorage.setItem("sellBtnId", sellID);
    } else if (type === "selector") {
      // localStorage.setItem("selector", selector);
    }
    // localStorage.setItem("selector", selector);
    alert("Settings saved!");
  };

  const selectors = [
    {
      id: "livePrice",
      label: "Live Price Selector",
      value: livePrice,
      setValue: setValues.livePrice,
    },
    {
      id: "buyID",
      label: "Buy Selector",
      value: buyID,
      setValue: setValues.buyID,
    },
    {
      id: "sellID",
      label: "Sell Selector",
      value: sellID,
      setValue: setValues.sellID,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-center relative w-full">
        <MdKeyboardArrowLeft className="text-[25px] absolute left-0" />
        <div className="text-center">
          <h1 className="text-lg font-bold ">Settings</h1>
          <h2 className="text-blue-600 underline mb-2">https://tv.dhan.co/</h2>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="mt-5 mb-6 grid grid-cols-2">
        <div>
          <button
            onClick={() => setActive("TV Dhan")}
            className={`w-full py-3 text-base font-medium rounded-md ${
              active === "TV Dhan"
                ? "bg-teal-700 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            TV Dhan
          </button>
        </div>
        <div>
          <button
            onClick={() => setActive("Web Dhan")}
            className={`w-full py-3 text-base font-medium rounded-md ${
              active === "Web Dhan"
                ? "bg-teal-700 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            Web Dhan
          </button>
        </div>
      </div>
      {/* Toggle Buttons */}

      {/* 🛠️ buyID Input */}
      <div className="flex flex-col items-center gap-4 mt-4 w-full">
        {/* ////map */}
        {selectors.map(({ id, label, value, setValue }) => (
          <div key={id} className="flex flex-col gap-2 w-full">
            <label
              htmlFor={id}
              className="text-left text-base font-medium text-gray-800"
            >
              {label}
            </label>
            <div className="flex items-center gap-2">
              {/* Input Field */}
              <input
                id={id}
                type="text"
                name={id}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={`Enter ${label}...`}
                className="flex-1 p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              {/* Copy Button */}
              <button
                onClick={() => handleCopy(value, id)}
                className="p-2 border border-teal-600 rounded-md text-teal-600 hover:bg-teal-50"
                title="Copy"
              >
                <IoCopyOutline size={20} />
              </button>

              {/* Save Button */}
              <button
                onClick={() => dispatch(setValue(value))}
                className="bg-teal-600 hover:bg-teal-700 text-white text-base font-medium px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        ))}
        {/* ////map */}

        {/* Buy Selector */}
        {/* <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="buyID"
              className="text-left text-base font-medium text-gray-800"
            >
              Buy Selector
            </label>
            <div className="flex items-center gap-2">
              <input
                id="buyID"
                type="text"
                name="buyID"
                value={buyID}
                onChange={(e) => setBuyId(e.target.value)}
                placeholder="Enter Buy Selector..."
                className="flex-1 p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                onClick={() => handleCopy(buyID, "buyID")}
                className="p-2 border border-teal-600 rounded-md text-teal-600 hover:bg-teal-50"
                title="Copy"
              >
                <IoCopyOutline size={20} />
              </button>
              <button
                onClick={() => dispatch(setValues(buyID))}
                className="bg-teal-600 hover:bg-teal-700 text-white text-base font-medium px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </div> */}

        {/* Buy Selector Ends */}

        {/* Sell button */}
        {/* <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="sellID"
              className="text-left text-base font-medium text-gray-800"
            >
              Sell Selector
            </label>
            <div className="flex items-center gap-2">
              <input
                id="sellID"
                type="text"
                name="sellID"
                value={sellID}
                onChange={(e) => setSellId(e.target.value)}
                placeholder="Enter Buy Selector..."
                className="flex-1 p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                onClick={() => handleCopy(buyID, "buyID")}
                className="p-2 border border-teal-600 rounded-md text-teal-600 hover:bg-teal-50"
                title="Copy"
              >
                <IoCopyOutline size={20} />
              </button>
              <button
                onClick={() => dispatch(setValues(sellID))}
                className="bg-teal-600 hover:bg-teal-700 text-white text-base font-medium px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </div> */}

        {/* // */}

        {/* Sell button */}
      </div>

      <div className="mt-9">
        <h1 className="font-bold text-lg">Top Menu</h1>
        <p className="text-left text-base">Show Sell</p>
        <p className="text-left text-base">Show Buy</p>
        <p className="text-left text-base">Show Scalper</p>
      </div>

      <div className="mt-9">
        <h1 className="font-bold text-lg">Chart Settings</h1>
        <p className="text-left text-base">Show Scalper</p>
        <p className="text-left text-base">Show Buy</p>
      </div>

      <div className="mt-9">
        <h1 className="font-bold text-lg">Target Settings</h1>
        <p className="text-left text-base">Targer</p>
        <p className="text-left text-base">Stop Loss</p>
        <p className="text-left text-base">Trail Jump</p>
      </div>

      {/* <div className="mt-9 flex justify-between items-center">
        <CountdownTimer />
      </div> */}

      <div className="mt-6">
        <button
          onClick={() => setView("main")}
          className="bg-teal-700 hover:bg-teal-900 text-white w-full  font-bold py-2   rounded mt-4"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Settings;
