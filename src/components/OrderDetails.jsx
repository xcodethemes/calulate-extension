import React, { useEffect, useState } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import QuantityInput from "./ui/QuantityInput";
import ToggleBtn from "./ui/ToggleBtn";
import { IoCheckmark } from "react-icons/io5";
import CustomCheckbox from "./ui/CustomCheckbox";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const [livePrice, setLivePrice] = useState(0);
  const [limitPrice, setLimitPrice] = useState(0);
  const [target, setAddTarget] = useState(0);
  const [stopLoss, setStopLoss] = useState(0);
  const [qty, setQty] = useState(1);

  const allIds = useSelector((state) => state?.settings?.tvSection);
  console.log("allIds from OrderDetails=>", allIds);

  useEffect(() => {
    if (!allIds?.livePrice || !allIds?.limitPrice) return;

    getAllValues(allIds)
      .then((price) => {
        console.log("🚀 Live price fetched:", price);
        setLivePrice(price?.livePrice);
        setLimitPrice(price?.limitPrice);
        setAddTarget(price?.target);
        setStopLoss(price?.stopLoss);
      })
      .catch((err) => {
        console.error("❌ Failed to get live price:", err);
      });
  }, [allIds]);

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
                  // const livePriceSelector = iframeDoc.querySelector(
                  //   id?.livePrice
                  // );
                  // const livePriceSelector = document.querySelector(id?.livePrice).innerHTML;
                  const livePriceSelector = document.querySelector(id?.livePrice).innerHTML;
                  const limitPriceSelector = document.querySelector(id?.limitPrice).value;
                  const targetSelector = document.querySelector(id?.target).value;
                  const stopLossSelector = document.querySelector(id?.stopLoss).value;

                  console.log("🔍 livePriceSelector =>", livePriceSelector);
                  console.log("🔍 targetSelector =>", targetSelector);
                  // console.log("🔍 livePriceSelector124 =>", document.querySelector('#tfdltp').innerHTML);

                const allValues={
                  livePrice: livePriceSelector,
                  limitPrice: limitPriceSelector,
                  target: targetSelector,
                  stopLoss: stopLossSelector,
                }
                  if (livePriceSelector || limitPriceSelector) {
                    console.log("✅ Found live price:", livePriceSelector, 'limitPriceSelector:', limitPriceSelector);
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
          <QuantityInput  value={limitPrice}  />
        </div>
      </div>

      {/* Add Target */}
      <div className="mb-9 rounded-lg max-w-md">
        <div className="flex justify-between items-center mb-4">
          <label className="flex items-center gap-2 text-lg font-semibold cursor-pointer">
            {/* Hidden native checkbox to track checked state */}
            <input type="checkbox" className="peer hidden" />
            {/* Custom checkbox box */}
            <div className="w-6 h-6 flex items-center justify-center border-2 border-teal-600 rounded-md bg-white peer-checked:bg-teal-600 peer-checked:border-teal-600 transition-all">
              <IoCheckmark className="text-white text-lg opacity-0 peer-checked:opacity-100 transition-opacity" />
            </div>
            Add Target
          </label>

          <QuantityInput value={target} />
        </div>

        <div className="flex flex-wrap gap-2">
          {[0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 10.0, 20.0].map(
            (value, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 text-sm  font-medium ${
                  value === 1.0
                    ? "bg-teal-100 text-teal-700 border-teal-600"
                    : "text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
              >
                +{value.toFixed(1)}%
              </button>
            )
          )}
        </div>
      </div>
      {/* Add Target Ends */}

      {/* Add Stop Loss */}
      <div className="mb-9 rounded-lg max-w-md">
        <div className="flex justify-between items-center mb-4">
          <label className="flex items-center gap-2 text-lg font-semibold">
            <input
              type="checkbox"
              className="  text-teal-600 font-bold text-base"
            />
            Add Stop Loss
          </label>
          <QuantityInput value={stopLoss} />
        </div>

        <div className="flex flex-wrap gap-2">
          {[0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 10.0, 20.0].map(
            (value, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 text-sm  font-medium ${
                  value === 1.0
                    ? "bg-teal-100 text-teal-700 border-teal-600"
                    : "text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
              >
                +{value.toFixed(1)}%
              </button>
            )
          )}
        </div>
      </div>
      {/* Add Stop Loss */}
    </div>
  );
};

export default OrderDetails;
