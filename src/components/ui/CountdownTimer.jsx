import React from "react";
import { useEffect, useState } from "react";
import { IoTimeOutline } from "react-icons/io5";

const CountdownTimer = () => {
  const [time, setTime] = useState(0); // 9 hours, 59 minutes, 36 seconds
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  };

  return (
    <div className="flex justify-between items-center ">
      <h4>Countdown timer</h4>
      <div className="text-sm flex items-center gap-2 px-3 py-1 border border-teal-500 text-teal-600 rounded-md font-semibold">
        <IoTimeOutline size={18} />
        <span>{formatTime(time)}</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
