import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";

import { handleBuyClick, handleCalculation } from "./utils/helper";
import Settings from "./components/Settings";
import Notes from "./components/Notes";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactDetails from "./components/ContactDetails";
import CountdownTimer from "./components/ui/CountdownTimer";
import { IoChatboxEllipsesOutline, IoSettingsOutline } from "react-icons/io5";
import OrderDetails from "./components/OrderDetails";

const App = () => {
  const buyID = useSelector((state) => state?.settings?.buyID);
  const sellID = useSelector((state) => state?.settings?.sellID);

  const [view, setView] = useState("main"); // 'main', 'settings', 'notes'

  const storedBuyID = localStorage?.getItem("buyID") || "";

  console.log("storedBuyID from Outside=>", storedBuyID);
  console.log("In app buyID from Outside=>", buyID);

  return (
    <div className="p-0">
      <Header />
      {/* <Navbar setView={setView} /> */}

      <ContactDetails />

      

      <div className="flex justify-between items-center mb-9">
        <div className="flex items-center gap-2 ">
          <IoSettingsOutline className="text-teal-600 text-xl" />
          <h2 className="text-lg font-semibold">Quick Settings</h2>
        </div>

        <div className="flex items-center gap-2 ">
          <IoChatboxEllipsesOutline className="text-teal-600 text-xl" />
          <h2 className="text-lg font-semibold"> Send Feedback</h2>
        </div>
      </div>

      <OrderDetails/>

      {/* ✅ Main Section */}
      {view === "main" && (
        <div>
          <div className="flex justify-center items-center gap-2">
            <button
              id="buyBtn"
              name="buyBtn"
              onClick={() => handleBuyClick(buyID)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              {" "}
              Buy{" "}
            </button>

            <button
              id="sellBtn"
              name="sellBtn"
              onClick={() => handleBuyClick(sellID)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              Sell
            </button>
          </div>
          <h1 className="text-xl font-bold text-gray-700">
            Perform Calculations
          </h1>
          <button
            onClick={() => handleCalculation()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Do Calculation
          </button>
        </div>
      )}

      {/* ✅ Settings Section with buyID Input */}
      {view === "settings" && <Settings setView={setView} />}

      {/* ✅ Notes Section */}
      {view === "notes" && <Notes setView={setView} />}
      <Footer />
    </div>
  );
};

export default App;
