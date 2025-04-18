import React, { useEffect, useState } from "react";
import { DateTime, Interval } from "luxon";
import { IoTimeOutline } from "react-icons/io5";

// 🕰️ Define all market sessions
const MARKET_SESSIONS = [
  {
    name: "Block Deal Morning",
    start: { hour: 8, minute: 45 },
    end: { hour: 9, minute: 0 },
  },
  {
    name: "Pre Market",
    start: { hour: 9, minute: 0 },
    end: { hour: 9, minute: 7 },
  },
  {
    name: "Regular Market",
    start: { hour: 9, minute: 15 },
    end: { hour: 15, minute: 30 },
  },
  {
    name: "Closing Session",
    start: { hour: 15, minute: 40 },
    end: { hour: 16, minute: 0 },
  },
  {
    name: "Block Deal Evening",
    start: { hour: 14, minute: 5 },
    end: { hour: 14, minute: 20 },
  },
];

// 🧰 Helper: Convert a time config into a Luxon DateTime today
const getTimeToday = (timeObj) => {
  return DateTime.now().set({ ...timeObj, second: 0, millisecond: 0 });
};

// ⏳ Helper: Format seconds into HH:mm:ss
const formatCountdown = (totalSeconds) => {
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const secs = String(totalSeconds % 60).padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
};

const CountdownTimer = () => {
  const [marketStatus, setMarketStatus] = useState("Market Closed");
  const [countdown, setCountdown] = useState(0);
  const [currentTime, setCurrentTime] = useState("");

  const updateMarketState = () => {
    const now = DateTime.now();
    setCurrentTime(now.toFormat("HH:mm:ss"));

    // 🔍 Check each session
    for (const session of MARKET_SESSIONS) {
      const startTime = getTimeToday(session.start);
      const endTime = getTimeToday(session.end);
      const inSession = Interval.fromDateTimes(startTime, endTime).contains(now);

      if (inSession) {
        setMarketStatus(session.name);
        setCountdown(Math.floor(endTime.diff(now, "seconds").seconds));
        return;
      }
    }

    // ❌ If no session matches
    setMarketStatus("Market Closed");
    setCountdown(0);
  };

  useEffect(() => {
    updateMarketState();
    const interval = setInterval(updateMarketState, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* <p>Current Time: {currentTime}</p> */}
      <div className="flex justify-between items-center">
        <h4>{marketStatus}</h4>
        <div className="text-sm flex items-center gap-2 px-3 py-1 border border-red-500 text-red-600 rounded-md font-semibold">
          <IoTimeOutline size={18} />
          <span>{formatCountdown(countdown)}</span>
        </div>
      </div>
    </>
  );
};

export default CountdownTimer;
