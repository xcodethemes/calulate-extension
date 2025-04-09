import React from "react";

const Navbar = ({ setView }) => {
  return (
    <nav className="flex justify-between mb-5">
      <div
        className="text-xl text-gray-800 font-bold cursor-pointer"
        onClick={() => setView("main")}
      >
        TradeX
      </div>

      <div className="flex gap-2.5 items-center">
        <img
          src="icons/setting.png"
          alt="Settings"
          className="icon w-[20px] h-[20px] cursor-pointer"
          onClick={() => setView("settings")}
        />
        <img
          src="icons/notes.png"
          alt="Notes"
          className="icon w-[20px] h-[20px] cursor-pointer"
          onClick={() => setView("notes")}
        />
      </div>
    </nav>
  );
};

export default Navbar;
