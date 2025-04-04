import React, { useState } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";

const ToggleBtn = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="flex cursor-pointer select-none items-center">
      <div className="relative w-12 h-6">
        {/* Hidden Checkbox */}
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="sr-only"
        />

        {/* Toggle Track */}
        <div
          className={`absolute top-0 left-0 w-full h-full rounded-full transition duration-300 ${
            isChecked ? "bg-teal-700" : "bg-gray-300"
          }`}
        ></div>

        {/* Toggle Knob with Tick Icon */}
        <div
          className={`absolute top-1 left-1 flex items-center justify-center h-4 w-4 rounded-full bg-white transition-all duration-300 ${
            isChecked ? "translate-x-6 bg-teal-700" : ""
          }`}
        >
          {isChecked && <IoCheckmarkSharp size={12} className="text-teal-700 text-bold" />}
        </div>
      </div>
    </label>
  );
};

export default ToggleBtn;
