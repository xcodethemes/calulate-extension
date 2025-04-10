import React, { useEffect, useState } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { IoLockClosedOutline } from "react-icons/io5";
import QuantityInput from "./ui/QuantityInput";
import ToggleBtn from "./ui/ToggleBtn";
import { IoCheckmark } from "react-icons/io5";
import CustomCheckbox from "./ui/CustomCheckbox";
import { useDispatch, useSelector } from "react-redux";
import { addPercentage } from "../utils/constant";
import { calculatePercentageValue, getAllValues } from "../utils/helper";
import {
  setTrailJumpValue,
  storeLimitPriceValue,
  storeQtyValue,
  storeStopLossValue,
  storeTargetValue,
} from "../features/settings/settingsSlice";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const setPercentageValue = useSelector((state) => state?.settings?.setPercentage);

  const [toggleMarketPrice, setToggleMarketPrice] = useState(false);
  const [livePrice, setLivePrice] = useState('');
  const [limitPrice, setLimitPrice] = useState("");
  const [target, setAddTarget] = useState(0);
  const [stopLoss, setStopLoss] = useState(0);
  const [trailJump, setTrailJump] = useState('');
  const [qty, setQty] = useState('');

  const [targerPer, setTargerPer] = useState(setPercentageValue?.setTargetPercentage || '');
  const [stopLossPer, setStopLossPer] = useState(setPercentageValue?.setStopLossPercentage || '');

  const allIds = useSelector((state) => state?.settings?.tvSection);
  console.log("allIds from OrderDetails=>", allIds);

  const handleToggleChange = (value) => {
    setToggleMarketPrice(value);
    console.log("Toggle changed to:", value);
  };


  useEffect(() => {
  
    console.log("UseEffect called OrderDetails");
    console.log("qty =>", qty);
    if(qty) {
      dispatch(storeQtyValue(qty));
    }
    if(limitPrice)
    {
      dispatch(storeLimitPriceValue(limitPrice));
    }
    if(trailJump)
    {

      dispatch(setTrailJumpValue(trailJump));
    }
  }, [qty, limitPrice, trailJump]);

  useEffect(() => {
    console.log("UseEffect called #tfdQuantity");
    // if (!allIds?.livePrice || !allIds?.limitPrice) return;

    getAllValues(allIds)
      .then((price) => {
        console.log("🚀 Live price fetched:", price);
        setQty(price?.qty || '');
        setLivePrice(price?.livePrice);
        setLimitPrice(price?.limitPrice || "");
        setAddTarget(price?.target || "");
        setStopLoss(price?.stopLoss || "");
        setTrailJump(price?.trailJump || "");
      })
      .catch((err) => {
        console.error("❌ Failed to get live price:", err);
      });
  }, []);

  return (
    <div className="mt-9">
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
          <ToggleBtn onToggle={handleToggleChange}/>
          {/* {!toggleMarketPrice ? "Market Price": <QuantityInput value={limitPrice} setValue={setLimitPrice} />} */}
          {/* <QuantityInput value={limitPrice}  setValue={setLimitPrice} /> */}
          {!toggleMarketPrice ? (
      <div className="w-[130px] flex items-center justify-center gap-2 border border-teal-700 rounded py-0.5">

        {/* <div className="w-full  "> */}
        <p className="font-semibold text-teal-700 text-center text-base">Market</p>
        <IoLockClosedOutline className="font-semibold text-teal-700 text-base" />
        {/* </div> */}

    
      </div>
    ) : (
      <QuantityInput value={limitPrice} setValue={setLimitPrice} />
    )}
        </div>
      </div>

      {/* Add Target */}
      <div className="mb-9 rounded-lg max-w-md">
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
          {addPercentage?.map((value, idx) => (
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
            id="myStopLoss"
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
              onClick={() => {
                setStopLossPer(value);

                const addValue = (
                  parseFloat(livePrice) -
                  calculatePercentageValue(livePrice, value)
                ).toFixed(2);

                console.log("see addValue =>", addValue);

                dispatch(storeStopLossValue(addValue));
              }}
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
