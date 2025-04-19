import React, { useEffect, useState } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { IoLockClosedOutline } from "react-icons/io5";
import QuantityInput from "./ui/QuantityInput";
import ToggleBtn from "./ui/ToggleBtn";
import { IoCheckmark } from "react-icons/io5";
import CustomCheckbox from "./ui/CustomCheckbox";
import { useDispatch, useSelector } from "react-redux";
import {
  addPercentage,
  stopLossAddPercentage,
  targetAddPercentage,
} from "../utils/constant";
import { calculatePercentageValue, getAllValues } from "../utils/helper";
import {
  setTrailJumpValue,
  storeLimitPriceValue,
  storeQtyValue,
  storeStopLossValue,
  storeTargetValue,
} from "../features/settings/settingsSlice";

const OrderDetails = ({ allIds, type }) => {
  console.log("allIds from OrderDetails=>", allIds, type);
  const dispatch = useDispatch();
  const setPercentageValue = useSelector(
    (state) => state?.settings?.setPercentage
  );

  const [toggleMarketPrice, setToggleMarketPrice] = useState(false);
  const [livePrice, setLivePrice] = useState("");
  const [limitPrice, setLimitPrice] = useState("");
  const [target, setAddTarget] = useState(0);
  const [stopLoss, setStopLoss] = useState(0);
  const [trailJump, setTrailJump] = useState("");
  const [qty, setQty] = useState("");
  const[fetchAllValues, setFetchAllValues]= useState(null)

  const [inputValue, setInputValue] = useState("");


  useEffect(() => {
    // Listen for messages from content script
    const listener = (message, sender, sendResponse) => {
      console.log('Listenerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr message', message)
      if (message.type === 'PRICE_UPDATE') {
        setLivePrice(message.price);
      }
    };

    chrome.runtime.onMessage.addListener(listener);

    return () => chrome.runtime.onMessage.removeListener(listener);
  }, []);


  useEffect(() => {
    console.log('----------------useEffect fetchPrice runiinng---------------------------')
    async function fetchPrice() {
      try {
        const value = await getAllValues(allIds, type);
        console.log('✅ seee Price value33==>:', value);
        setFetchAllValues(value);
      } catch (err) {
        console.error("❌ Failed to get seeThis live price:", err);
      }
    }

    fetchPrice();
  }, [allIds, type]);

  useEffect(()=>{
    if(!fetchAllValues) return;
    console.log('fetchAllValues')
  },[fetchAllValues])

  const [targerPer, setTargerPer] = useState(
    setPercentageValue?.setTargetPercentage || ""
  );
  const [stopLossPer, setStopLossPer] = useState(
    setPercentageValue?.setStopLossPercentage || ""
  );

  const handleToggleChange = (value) => {
    setToggleMarketPrice(value);
    console.log("Toggle changed to:", value);
  };


  useEffect(() => {
    console.log('++++++++++++++ Setting getAllValues+++++++++++++++++++++++++++++++++++++++++++++++++++++')
    console.log("****UseEffect called allIds==>***", allIds);

    if (Object.keys(allIds)?.length === 0) {
        console.log('------allIds object is coming empty------')
      return;
    }

      console.log('---+++ Obj is not empty +++------allIds=>', allIds)

    getAllValues(allIds, type)
      .then((price) => {
        console.log(
          "🚀 Live price fetched:",
          price,
        );
        setQty(price?.qty || 1);
        setLivePrice(price?.livePrice);

        console.log("check999 price?.limitPrice==>", price?.limitPrice);

        // !price?.limitPrice
        //   ? setLimitPrice(price?.livePrice)
        //   : setLimitPrice(price?.limitPrice || "");

        // setLimitPrice(price?.livePrice);
       
        // setLimitPrice(price?.limitPrice || '');

        if(price?.limitPrice)
        {

          console.log('****omgg*****')
          setLimitPrice(price?.limitPrice);

        }
        else{
          console.log('****omgg 12333*****')
          setLimitPrice(price?.livePrice)
        }
        setAddTarget(price?.target || "");
        setStopLoss(price?.stopLoss || "");
        setTrailJump(price?.trailJump || 1);
      })
      .catch((err) => {
        console.error("❌ Failed to get live price:", err);
      });
  }, [allIds, allIds?.limitPrice]);

  useEffect(() => {
    if (!livePrice) return;
    console.log("***see livePrice*** =>", livePrice);
    console.log("***see targerPer*** =>", targerPer);
   
    const targetValue = (
      parseFloat(livePrice) + calculatePercentageValue(livePrice, targerPer)
    )?.toFixed(2);

    console.log("see targetValue =>", targetValue);

    const stopLossValue = (
      parseFloat(livePrice) - calculatePercentageValue(livePrice, stopLossPer)
    ).toFixed(2);

    console.log("see stopLossValue =>", stopLossValue);

    dispatch(storeTargetValue(targetValue));
    dispatch(storeStopLossValue(stopLossValue));
  }, [livePrice]);

  useEffect(() => {
    console.log("UseEffect called when changes qty, limitPrice, trailJump");
    console.log("qty =>", qty);
    if (qty) {
        console.log('dispatching storeQtyValue')
      dispatch(storeQtyValue(qty));
    }
    if (limitPrice) {
      dispatch(storeLimitPriceValue(limitPrice));
    }
    if (trailJump) {
      dispatch(setTrailJumpValue(trailJump));
    }
  }, [qty, limitPrice, trailJump]);

  return (
    <div className="mt-4">
      {/* <p className="text-center text-teal-600 text-base">{inputValue || 'No Values Found'}</p> */}
      <div className="flex justify-center items-center gap-2 mb-4.5 text-lg">
        <BsFillLightningChargeFill />

        <h2 className="font-bold ">Super Order Details</h2>
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
        <QuantityInput id="myQty" value={qty} setValue={setQty} />
      </div>

      <div className="flex justify-between items-center mb-4.5">
        <h4>Limit Price at</h4>
        <div className="flex items-center gap-4">
            {/* <ToggleBtn toggle={setToggleMarketPrice}/> */}
          <ToggleBtn onToggle={handleToggleChange} />
            {/* {!toggleMarketPrice ? "Market Price": <QuantityInput value={limitPrice} setValue={setLimitPrice} />} */}
            {/* <QuantityInput value={limitPrice}  setValue={setLimitPrice} /> */}
            {!toggleMarketPrice ? (
            <div className="w-[130px] flex items-center justify-center gap-2 border border-teal-700 rounded py-0.5">
                {/* <div className="w-full  "> */}
              <p className="font-semibold text-teal-700 text-center text-base">
                Market
              </p>
              <IoLockClosedOutline className="font-semibold text-teal-700 text-base" />
                {/* </div> */}
            </div>  
          ) : (
            <QuantityInput id="myLimitPrice" value={limitPrice} setValue={setLimitPrice} />
            )}
        </div>
      </div>

      {/* Add Target */}
      <div className="mb-5 rounded-lg max-w-md">
        <div className="flex justify-between items-center mb-4">
          <label className="flex items-center gap-2 text-lg font-semibold cursor-pointer">
            Target : {targerPer}%
          </label>

          <QuantityInput
            id="myTarget"
            value={(
              parseFloat(livePrice) +
              calculatePercentageValue(livePrice, targerPer)
            ).toFixed(2)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {targetAddPercentage?.map((value, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                setTargerPer(value);
                const addValue = (
                  parseFloat(livePrice) +
                  calculatePercentageValue(livePrice, value)
                ).toFixed(2);

                console.log("see addValue =>", addValue);

                dispatch(storeTargetValue(addValue));
              }}
              className={`px-3 py-1 text-sm  font-medium cursor-pointer ${
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
      <div className="mb-5 rounded-lg max-w-md">
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
            id="myStopLoss"
            value={(
              parseFloat(livePrice) -
              calculatePercentageValue(livePrice, stopLossPer)
            ).toFixed(2)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {stopLossAddPercentage?.map((value, idx) => (
            <button
              key={idx}
              onClick={() => {
                setStopLossPer(value);

                const addValue = (
                  parseFloat(livePrice) -
                  calculatePercentageValue(livePrice, value)
                ).toFixed(2);

                console.log("see addValue =>", addValue);

                dispatch(storeStopLossValue(addValue));
              }}
              className={`px-3 py-1 text-sm  font-medium cursor-pointer ${
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
        <QuantityInput
          id="myTrailJump"
          value={trailJump}
          setValue={setTrailJump}
        />
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
