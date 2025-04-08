import React, { useEffect, useState } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import QuantityInput from "./ui/QuantityInput";
import ToggleBtn from "./ui/ToggleBtn";
import { IoCheckmark } from "react-icons/io5";
import CustomCheckbox from "./ui/CustomCheckbox";
import { useSelector } from "react-redux";
import { addPercentage } from "../utils/constant";
import { calculatePercentageValue } from "../utils/helper";

const OrderDetails = () => {

  const [livePrice, setLivePrice] = useState(0);
  const [limitPrice, setLimitPrice] = useState(0);
  const [target, setAddTarget] = useState(0);
  const [stopLoss, setStopLoss] = useState(0);
  const [trailJump, setTrailJump] = useState(22);
  const [qty, setQty] = useState(1);

  const [targerPer, setTargerPer] = useState(2.0);
  const [stopLossPer, setStopLossPer] = useState(3.0);

  const allIds = useSelector((state) => state?.settings?.tvSection);
  console.log("allIds from OrderDetails=>", allIds);

  useEffect(() => {
    console.log('UseEffect called');
    // if (!allIds?.livePrice || !allIds?.limitPrice) return;

    getAllValues(allIds)
    .then((price) => {
      console.log("🚀 Live price fetched:", price);
      setLivePrice(price?.livePrice);
      setLimitPrice(price?.limitPrice || 0);
      setAddTarget(price?.target || 0);
      setStopLoss(price?.stopLoss || 0);
      setTrailJump(price?.trailJump || 0);
    })
    .catch((err) => {
      console.error("❌ Failed to get live price:", err);
    });
  }, []);

  const getAllValues = (id) => {
    console.log("getAllValues id =>", id);

    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
          console.error("No active tab found.");
          reject("No active tab");
          return;
        }

        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            args: [id],
            func: (id) => {
              console.log("✅ Checking for iframes...");
              console.log("✅ Checking for id...", id);
              const iframes = document.querySelectorAll("iframe");

              if (iframes.length === 0) {
                console.warn("❌ No iframes found.");
                return null;
              }

              for (const iframe of iframes) {
                try {
                  const iframeDoc =
                    iframe.contentDocument || iframe.contentWindow.document;

                  // Make sure selector is properly formatted (as ID)
                  const IframelivePriceSelector = iframeDoc.querySelector(
                    id?.livePrice
                  );
                  console.log('IframelivePriceSelector =>', IframelivePriceSelector);
                  // const livePriceSelector = document.querySelector(id?.livePrice).innerHTML;
                  const livePriceSelector =  document.querySelector(
                    id?.livePrice
                  ).innerHTML ;

                  console.log("🔍 livePriceSelector =>", livePriceSelector);

                  const limitPriceSelector = document.querySelector(
                    id?.limitPrice
                  ).value;

                  // const limitPriceSelector =document.querySelector('#tfdPrice').value || document.querySelector(
                  //   id?.limitPrice
                  // ).value;

                  console.log("🔍 limitPriceSelector =>", limitPriceSelector);
                  // const targetSelector = document.querySelector(id?.target)
                  //   .value;
                  // const stopLossSelector = document.querySelector(id?.stopLoss)
                  //   .value;

                  const trailJumpSelector = document.querySelector(
                    id?.trailJump
                  ).value;

                 
                  // console.log("🔍 targetSelector =>", targetSelector);
                  // console.log("🔍 livePriceSelector124 =>", document.querySelector('#tfdltp').innerHTML);

                  const allValues = {
                    livePrice: livePriceSelector,
                    limitPrice: limitPriceSelector ,
                    // target: targetSelector|| 101 ,
                    // stopLoss: stopLossSelector || 101,
                    trailJump: trailJumpSelector || 101,
                  };
                  console.log("allValues =>", allValues);
                  if (livePriceSelector) {
                    console.log(
                      "✅ Found live price:",
                      livePriceSelector,
                    
                    );
                    return allValues;
                  }
                  // if (limitPriceSelector) {
                  //   console.log("✅ Found limitPrice :", limitPriceSelector);
                  //   return limitPriceSelector;

                  // }
                } catch (error) {
                  console.warn("⚠️ Failed to access iframe:", error);
                }
              }

              return null; // if nothing found
            },
          },
          (results) => {
            if (chrome.runtime.lastError) {
              console.error(
                "⛔ Runtime error:",
                chrome.runtime.lastError.message
              );
              reject(chrome.runtime.lastError.message);
            } else {
              const value = results?.[0]?.result;
              console.log("🎯 Final result from injected script:", value);
              resolve(value);
            }
          }
        );
      });
    });
  };

  return (
    <div className="mt-9">
      <div className="flex justify-center items-center gap-2 mb-4.5">
        <BsFillLightningChargeFill />

        <h2 className="font-bold text-lg">Super Order Details</h2>
      </div>
      <div className="flex justify-between items-center mb-4.5">
        <h4 className="">Live Market Price</h4>

        <input
          id="liveMarketPrice"
          name="liveMarketPrice"
          className="w-[130px] border border-teal-600 rounded text-teal-600 font-bold text-base text-center"
          value={livePrice}
        />
      </div>

      <div className="flex justify-between items-center mb-4.5">
        <h4>Quantity</h4>
        <QuantityInput value={qty} />
      </div>

      <div className="flex justify-between items-center mb-4.5">
        <h4>Limit Price at</h4>
        <div className="flex items-center gap-4">
          <ToggleBtn />
          <QuantityInput value={limitPrice} />
        </div>
      </div>

      {/* Add Target */}
      <div className="mb-9 rounded-lg max-w-md">
        <div className="flex justify-between items-center mb-4">
          <label className="flex items-center gap-2 text-lg font-semibold cursor-pointer">
            {/* Hidden native checkbox to track checked state */}
            {/* <input type="checkbox" className="peer hidden" /> */}
            {/* Custom checkbox box */}
            {/* <div className="w-6 h-6 flex items-center justify-center border-2 border-teal-600 rounded-md bg-white peer-checked:bg-teal-600 peer-checked:border-teal-600 transition-all">
              <IoCheckmark className="text-white text-lg opacity-0 peer-checked:opacity-100 transition-opacity" />
            </div> */}
            Target : {targerPer}%
          </label>

          <QuantityInput
            value={(
              parseFloat(livePrice) +
              calculatePercentageValue(livePrice, targerPer)
            ).toFixed(2)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {addPercentage?.map((value, idx) => (
            <button
              key={idx}
              onClick={(e) => setTargerPer(value)}
              className={`px-3 py-1 text-sm  font-medium ${
                value === targerPer
                  ? "bg-green-500 hover:bg-green-700 text-white text-bold border-green-600"
                  : "text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
            >
              +{value.toFixed(1)}%
            </button>
          ))}
        </div>
      </div>
      {/* Add Target Ends */}

      {/* Add Stop Loss */}
      <div className="mb-9 rounded-lg max-w-md">
        <div className="flex justify-between items-center mb-4">
          <label className="flex items-center gap-2 text-lg font-semibold">
            {/* <input
              type="checkbox"
              className="  text-teal-600 font-bold text-base"
            /> */}
            Stop Loss : {stopLossPer}%
          </label>
          {/* <QuantityInput value={stopLoss} /> */}
          <QuantityInput
            value={(
              parseFloat(livePrice) -
              calculatePercentageValue(livePrice, stopLossPer)
            ).toFixed(2)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {addPercentage?.map((value, idx) => (
            <button
              key={idx}
              onClick={(e) => setStopLossPer(value)}
              className={`px-3 py-1 text-sm  font-medium ${
                value === stopLossPer
                  ? "bg-red-600 hover:bg-red-700 text-white text-bold border-red-600"
                  : "text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
            >
              -{value.toFixed(1)}%
            </button>
          ))}
        </div>
      </div>
      {/* Add Stop Loss */}

      {/* Trail Jump */}
      <div className="flex justify-between items-center mb-4.5">
        <h4>Trail Jump</h4>
        <QuantityInput value={trailJump} />
      </div>
      {/* <div className="mb-9 rounded-lg max-w-md">
        <div className="flex justify-between items-center mb-4">
          <label className="flex items-center gap-2 text-lg font-semibold">
            <input
              type="checkbox"
              className="  text-teal-600 font-bold text-base"
            />
            Trail Jump
          </label>
      
          <QuantityInput value={trailJump} />
        </div>
      </div> */}
      {/* Ends Trail Jump */}
    </div>
  );
};

export default OrderDetails;
