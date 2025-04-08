import React, { useState } from "react";

const CustomCheckbox = () => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <label className="flex items-center gap-2 text-lg font-semibold cursor-pointer">
        {/* Hidden native checkbox to track checked state */}
        <input type="checkbox" className="peer hidden" />
        {/* Custom checkbox box */}
        <div className="w-6 h-6 flex items-center justify-center border-2 border-teal-600 rounded-md bg-white peer-checked:bg-teal-600 peer-checked:border-teal-600 transition-all">
          <IoCheckmark className="text-white text-lg opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
        Add Target
      </label>
    </>
  );
};

export default CustomCheckbox;
