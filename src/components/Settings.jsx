import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setStopLossPercentage,
  setTargetPercentage,
  setValues,
} from "../features/settings/settingsSlice";

import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";

import ToggleBtn from "./ui/ToggleBtn";
import { IoMdQrScanner } from "react-icons/io";
import {
  stopLossPercentageDropdown,
  TABS,
  targetPercentageDropdown,
  tvInputFields,
  webInputFields,
} from "../utils/constant";
import Select from "react-select";
import QuantityInput from "./ui/QuantityInput";
import { handleShow } from "../utils/helper";

const Settings = ({ setView, type, allIds }) => {
  const dispatch = useDispatch();
  const { tvSection, webSection, setPercentage } = useSelector(
    (state) => state?.settings
  );
  const [selectedOptions, setSelectedOptions] = useState(setPercentage);
  const [trailJump, setTrailJump] = useState(1);




  const [active, setActive] = useState(TABS.TV_SECTION);
  console.log("active=>", active);

  const [formData, setFormData] = useState({
    livePrice: "",
    superTab: "",
    buyID: "",
    sellID: "",
    limitPrice: "",
    target: "",
    stopLoss: "",
    // trailJump: "",
  });

  const [show, setShow] = useState({
    buyBtn: false,
    sellBtn: false,
    scalperBtn: false,
    chartBuyBtn: false,
    chartSellBtn: false,
  
  });

  useEffect(() => {
    handleShow(show, type, allIds);
   
  }, [show]);

  useEffect(() => {
    console.log("$$$ see active", active);
    if (active === TABS.TV_SECTION) {
      setFormData((prev) => ({
        ...prev,
        ...tvSection,
      }));
    }

    if (active === TABS.WEB_SECTION) {
      console.log("In web section****");
      setFormData((prev) => ({
        ...prev,
        ...webSection,
      }));
    }
  }, [tvSection, webSection, active]);

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

  const topMenu = [
    { heading: "Top Menu" },
    { label: "Show Sell", id: "sellBtn" },
    { label: "Show Buy", id: "buyBtn" },  
    { label: "Show Scalper", id: "scalperBtn" },
  ];

  const chartSettings = [
    { heading: "Chart Settings" },
    { label: "Show Sell", id: "chartSellBtn" },
    { label: "Show Buy", id: "chartBuyBtn" },
  ];

  const targetSettings = [
    { heading: "Target Settings" },
    { label: "Target" },
    { label: "Stop Loss" },
    { label: "Trail Jump" },
  ];

  const handleChangeDrp = (label, option) => {
    console.log("selectedOptions 123=>", selectedOptions, "option=>", option);
    console.log("handleChange label=>", label, option);
    setSelectedOptions((prev) => ({
      ...prev,
      [label]: option,
    }));

    if (label === "Target") {
      console.log("dispatch target percentage=>", option.value);
      dispatch(setTargetPercentage(option.value));
    }
    if (label === "Stop Loss") {
      console.log("dispatch stop loss percentage=>", option.value);
      dispatch(setStopLossPercentage(option.value));
    }
  };

  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = (section, value, id) => {
    console.log("handleSave value=>", value, id);
    const combinedValue = {
      section: section,
      value: value,
      id: id,
    };
    console.log("combinedValue=>", combinedValue);
    dispatch(setValues(combinedValue));
  };

  const inputFields = active === TABS.TV_SECTION ? tvInputFields : webInputFields;

  const handleToggleChange = (id, value) => {
    setShow((prev) => ({
      ...prev,
      [id]: value,
    }));
    console.log(`${id} toggled to:`, value);
  };

  return (
    <div>
      <div className="flex items-center justify-center relative w-full">
        <MdKeyboardArrowLeft
          className="text-[25px] absolute left-0 cursor-pointer"
          onClick={() => setView("main")}
        />
        <div className="text-center">
          <h1 className="text-lg font-bold ">Settings</h1>
          <h2 className="text-link-600 underline mb-2">
            {active === TABS.TV_SECTION ? "https://tv.dhan.co/" : "web dhan"}
          </h2>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="mt-5 mb-6 grid grid-cols-2">
        <div>
          <button
            // onClick={() => setActive(tabs[0].id)}
            onClick={() => setActive(TABS.TV_SECTION)}
            className={`w-full py-2.5 text-base font-medium rounded-md ${
              active === TABS.TV_SECTION
                ? "bg-teal-700 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            TV Dhan
          </button>
        </div>
        <div>
          <button
            onClick={() => setActive(TABS.WEB_SECTION)}
            className={`w-full py-2.5 text-base font-medium rounded-md ${
              active === TABS.WEB_SECTION
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

      <div className="flex justify-end">
        <button className="flex items-center gap-2  bg-teal-700 hover:bg-teal-900 text-white px-4 py-2 rounded-md text-base">
          <IoMdQrScanner className="text-lg" />
          Scan
        </button>
      </div>
      <div className="flex flex-col items-center gap-4  w-full">
        {/* ////map */}
        {inputFields?.map(({ id, label }) => (
          <div key={id} className="flex flex-col gap-2 w-full">
            <label htmlFor={id} className="text-left text-base font-medium">
              {label}
            </label>
            <div className="flex items-center gap-2">
              {/* Input Field */}
              <input
                id={id}
                type="text"
                name={id}
                value={formData[id]}
                // onChange={(e) => setStateValue(e.target.value)}
                onChange={(e) => handleChange(id, e.target.value)}
                placeholder={`Enter ${label}...`}
                className="flex-1 p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              {/* Copy Button */}
              <button
                // onClick={() => handleCopy(value, label)}
                onClick={() => handleCopy(formData[id], label)}
                className="p-2 border border-teal-600 rounded-md text-teal-600 hover:bg-teal-50"
                title="Copy"
              >
                <IoCopyOutline size={20} />
              </button>

              {/* Save Button */}
              <button
                // onClick={() => handleSave(value, id)}
                onClick={() => handleSave(active, formData[id], id)}
                className="bg-teal-600 hover:bg-teal-700 text-white text-base font-medium px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        ))}
        {/* ////map */}
      </div>

      {/* Top Menu */}
      <div className="mt-9">
        {topMenu?.map((item, index) => {
          if (item?.heading) {
            return <h1 className="font-bold text-lg mb-2">{item?.heading}</h1>;
          }
          return (
            <div key={index} className="flex mb-3 items-center justify-between">
              <p className="text-left text-base">{item?.label}</p>
              <ToggleBtn
                onToggle={(val) => handleToggleChange(item?.id, val)}
              />
            </div>
          );
        })}
      </div>

      {/* Chart Settings */}
      <div className="mt-9">
        {chartSettings?.map((item, index) => {
          if (item?.heading) {
            return <h1 className="font-bold text-lg mb-2">{item?.heading}</h1>;
          }

          return (
            <div key={index} className="flex mb-3 items-center justify-between">
              <p className="text-left text-base">{item?.label}</p>
              <ToggleBtn onToggle={(val) => handleToggleChange(item?.id, val)}/>
            </div>
          );
        })}
      </div>

      {/* Set Percentage */}
      <div className="mt-9">
        {targetSettings?.map((item, index) => {
          if (item?.heading) {
            return <h1 className="font-bold text-lg mb-2">{item?.heading}</h1>;
          }
          return (
            <div key={index} className="flex mb-3 items-center justify-between">
              <div>
                <span className="text-left text-base">{item?.label} </span>
                {item?.label != "Trail Jump" && (
                  <span className="w-1/3 text-sm">
                    {selectedOptions[item?.label]
                      ? ` : ${selectedOptions[item?.label]?.label}`
                      : ""}
                  </span>
                )}
              </div>

              {/* <ToggleBtn /> */}
              {item?.label != "Trail Jump" && (
                <Select
                  className="border border-teal-600  text-teal-600 rounded p-0"
                  options={
                    item?.label === "Target"
                      ? targetPercentageDropdown
                      : item?.label === "Stop Loss"
                      ? stopLossPercentageDropdown
                      : []
                  }
                  onChange={(option) => handleChangeDrp(item?.label, option)}
                  value={
                    item?.label === "Target"
                      ? targetPercentageDropdown.find(
                          (opt) =>
                            opt.value === setPercentage?.setTargetPercentage
                        ) ?? selectedOptions[item?.label]
                      : item?.label === "Stop Loss"
                      ? stopLossPercentageDropdown.find(
                          (opt) =>
                            opt.value === setPercentage?.setStopLossPercentage
                        ) ?? selectedOptions[item?.label]
                      : selectedOptions[item?.label]
                  }
                  placeholder="Select percentage"
                  styles={{
                    singleValue: (provided, state) => ({
                      ...provided,
                      color: "#0d9488", // teal-600
                      fontWeight: "600",
                    }),
                  }}
                />
              )}
              {item?.label === "Trail Jump" && (
                <QuantityInput
                  id="settingsTrailJump"
                  value={trailJump}
                  setValue={setTrailJump}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex">
        <button
          onClick={() => setView("main")}
          className="flex gap-3 justify-center items-center bg-teal-700 hover:bg-teal-900 text-base text-white w-full  font-bold py-2   rounded mt-4"
        >
          <FaArrowLeft className=" " />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Settings;
