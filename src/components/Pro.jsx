import React from "react";
import { FaStar } from "react-icons/fa";

const Pro = () => {
  return (
    <div className="  border border-gray-300  mt-4 mb-2">
      <button className="flex gap-1.5 justify-center items-center bg-pro w-full py-2 text-base">
        {" "}
        <FaStar className="text-lg" /> Get Pro
      </button>
    </div>
  );
};

export default Pro;
