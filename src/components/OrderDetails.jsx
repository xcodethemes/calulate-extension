import React from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import QuantityInput from "./ui/QuantityInput";

const OrderDetails = () => {
  return (
    <div>
      <div className="flex justify-center items-center gap-2 mb-4.5">
        <BsFillLightningChargeFill />

        <h2 className="font-bold text-lg">Super Order Details</h2>
      </div>
      <div className="flex justify-between items-center mb-4.5">
        <p className="font-semibold text-lg">Live Market Price</p>
        <input
          id="liveMarketPrice"
          name="liveMarketPrice"
          className="width-[130px] border border-teal-500 text-teal-500 font-bold text-base text-center"
          value={200}
        />
      </div>

      <div>
        <p>Quantity</p>
        <QuantityInput/>
      </div>
    </div>
  );
};

export default OrderDetails;
