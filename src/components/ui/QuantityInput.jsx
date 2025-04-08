import React, { useState } from "react";

const QuantityInput = ({value}) => {
  
  const [quantity, setQuantity] = useState(value || 1);

  const handleDecrease = () => {
    onChange(Math.max(value - 1, 1));
  };

  const handleIncrease = () => {
    onChange(value + 1);
  };

  const handleChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val > 0) {
      onChange(val);
    }
  };

  // const handleDecrease = (e) => {
  //   setQuantity((prev) => Math.max(prev - 1, 1));
  // };

  // const handleIncrease = (e) => {
  //   setQuantity((prev) => prev + 1);
  // };

  // const handleChange = (e) => {
  //   const value = parseInt(e.target.value, 10);
  //   if (!isNaN(value) && value > 0) {
  //     setQuantity(value);
  //   }
  // };

  return (
    <div className="w-[130px] flex items-center border border-teal-600 rounded overflow-hidden">
      {/* <button
        type="button"
        onClick={handleDecrease}
        className="w-10  flex items-center justify-center text-teal-600 text-xl font-medium hover:bg-teal-50"
      >
        −
      </button> */}

      <input
        type="number"
        value={value}
        onChange={handleChange}
        min="1"
        className="w-full  text-center text-teal-600 font-bold text-base focus:outline-none appearance-none
        [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />

      {/* <button
        type="button"
        onClick={handleIncrease}
        className="w-10  flex items-center justify-center text-teal-600 text-xl font-medium hover:bg-teal-50"
      >
        +
      </button> */}
    </div>
  );
};

export default QuantityInput;
