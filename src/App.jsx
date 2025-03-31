/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [view, setView] = useState("main"); // 'main', 'settings', 'notes'
  const [buyID, setBuyId] = useState("");
  const [sellID, setSellId] = useState("");
  const [selector, setSelector] = useState("");
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const storedBuyID = localStorage.getItem("buyID") || "";
  const storedSellID = localStorage.getItem("sellBtnId") || "";
  console.log("storedBuyID from Outside=>", storedBuyID);

  useEffect(() => {
    console.log("storedBuyID=>", storedBuyID);
    if (storedBuyID != "") {
      setBuyId(storedBuyID);
    }
    if (storedSellID != "") {
      setSellId(storedSellID);
    }
  }, [storedBuyID, storedSellID]);

  const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];

  useEffect(() => {
    console.log("checkng buyID=>", buyID);
  }, [buyID]);

  const storedSelector = localStorage.getItem("selector") || "";
  // ✅ Load from local storage on mount
  useEffect(() => {
    setNotes(storedNotes);
    setSelector(storedSelector);
  }, []);

  const handleCalculation = () => {
    console.log("Clicked!!");

    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
          console.error("No active tab found.");
          return;
        }

        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: () => {
            const inputs = document.querySelectorAll('input[type="number"]');
            if (inputs.length === 0) {
              console.log("No number inputs found.");
              return;
            }

            inputs.forEach((input) => {
              const value = parseFloat(input.value) || 0;
              input.value = value * 2;
            });

            console.log("All number inputs multiplied by 2!");
          },
        });
      });
    } else {
      console.warn(
        "Chrome API is not available. Run this as a Chrome extension."
      );
    }
  };

  //new
  const handleBuyClick = (type) => {
    console.log("type==>", type);

    if (!buyID.trim() && type === "buy") {
      alert("Please enter a valid BuyID before trading.");
      return;
    }
    if (!sellID.trim() && type === "sell") {
      alert("Please enter a valid Sell ID before trading.");
      return;
    }

    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
          console.error("No active tab found.");
          return;
        }

        // Inject script into the active tab
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          args: [buyID, sellID, type],
          function: (buyID, sellID, type) => {
            console.log("✅ Checking for iframes...");

            // Handle iframes
            const iframes = document.querySelectorAll("iframe");

            if (iframes.length === 0) {
              console.warn("❌ No iframes found.");
              return;
            }

            let found = false;

            for (const iframe of iframes) {
              try {
                const iframeDoc =
                  iframe.contentDocument || iframe.contentWindow.document;

                const btnSelector = type === "buy" ? buyID : sellID;

                const buyBtn = iframeDoc.querySelector(btnSelector);
                // console.log("🔍 Checking iframe:", iframe, "=>", buyBtn);
                console.log("buyBtn=>", buyBtn);

                if (buyBtn) {
                  buyBtn.click();
                  console.log("✅ Button clicked inside iframe!");
                  found = true;
                  break;
                }
              } catch (error) {
                console.warn("⚠️ Failed to access iframe:", error);
              }
            }

            if (!found) {
              console.warn('❌ No "buy" button found in any iframe.');
            }
          },
        });
      });
    } else {
      console.warn(
        "Chrome API is not available. Run this as a Chrome extension."
      );
    }
  };

  // ✅ Load notes from local storage on component mount
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  // ✅ Save notes to local storage
  const saveNotesToLocalStorage = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
    alert("Notes saved!");
  };

  // ✅ Save buyID and Selector to local storage
  const saveSettingsToLocalStorage = (type) => {
    if (type === "buy") {
      localStorage.setItem("buyID", buyID);
    } else if (type === "sell") {
      localStorage.setItem("sellBtnId", sellID);
    } else if (type === "selector") {
      localStorage.setItem("selector", selector);
    }
    // localStorage.setItem("selector", selector);
    alert("Settings saved!");
  };

  // ✅ Add a new note
  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setNewNote("");
    } else {
      alert("Cannot add an empty note!");
    }
  };

  // ✅ Handle copy to clipboard for any input field
  const handleCopy = (value, label) => {
    if (!value.trim()) {
      alert(`${label} field is empty!`);
      return;
    }

    navigator.clipboard
      .writeText(value)
      .then(() => {
        alert(`${label} copied to clipboard!`);
      })
      .catch((err) => {
        console.error(`Failed to copy ${label}: `, err);
      });
  };
  return (
    <div className="p-0">
      <header className="flex justify-between mb-5">
        <div className="text-xl text-gray-800 font-bold ">Trading</div>
        <div className="flex gap-2.5 items-center">
          <img
            src="icons/setting.png"
            alt="Settings"
            className="icon"
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
            onClick={() => setView("settings")}
          />
          <img
            src="icons/notes.png"
            alt="Notes"
            className="icon"
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
            onClick={() => setView("notes")}
          />
        </div>
      </header>

      {/* ✅ Main Section */}
      {view === "main" && (
        <div>
          <div className="flex justify-center items-center gap-2">
            <button
              id="buyBtn"
              name="buyBtn"
              // onClick={buyTrade}
              onClick={() => handleBuyClick("buy")}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              {" "}
              Buy{" "}
            </button>

            <button
              id="sellBtn"
              name="sellBtn"
              onClick={() => handleBuyClick("sell")}
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
      {view === "settings" && (
        <div>
          <h1 className="text-xl font-bold text-gray-700">Settings Page</h1>

          <div className="flex flex-col items-center gap-4 mt-4 w-full">
            {/* 🛠️ buyID Input */}
            <div className="flex gap-2 w-full">
              <label
                htmlFor="buyID"
                className="text-sm font-medium text-gray-600"
              >
                Buy
              </label>
              <input
                id="buyID"
                type="text"
                name="buyID"
                value={buyID}
                onChange={(e) => setBuyId(e.target.value)}
                placeholder="Enter Buy Button ID..."
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={() => handleCopy(buyID, "buyID")}
                className="bg-gray-200 hover:bg-gray-300 p-2 rounded border-none"
                title="Copy buyID"
              >
                📋
              </button>
              <button
                onClick={() => saveSettingsToLocalStorage("buy")}
                className="bg-green-500 hover:bg-green-700 text-white font-bold px-4 rounded"
              >
                Save
              </button>
            </div>

            {/* Sell button */}
            <div className="flex gap-2 w-full">
              <label
                htmlFor="sellID"
                className="text-sm font-medium text-gray-600"
              >
                Sell
              </label>
              <input
                id="sellID"
                type="text"
                name="sellID"
                value={sellID}
                onChange={(e) => setSellId(e.target.value)}
                placeholder="Enter Sell Button ID..."
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={() => handleCopy(sellID, "sellID")}
                className="bg-gray-200 hover:bg-gray-300 p-2 rounded border-none"
                title="Copy buyID"
              >
                📋
              </button>
              <button
                onClick={() => saveSettingsToLocalStorage("sell")}
                className="bg-green-500 hover:bg-green-700 text-white font-bold px-4 rounded"
              >
                Save
              </button>
            </div>

            {/* Sell button */}

            {/* 🔍 Selector Input */}
            <div className="flex gap-2 w-full">
            <label
                htmlFor="Selector"
                className="text-sm font-medium text-gray-600"
              >
                Selector
              </label>
              <input
                type="text"
                name="selector"
                value={selector}
                onChange={(e) => setSelector(e.target.value)}
                placeholder="Enter Selector..."
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={() => handleCopy(selector, "Selector")}
                className="bg-gray-200 hover:bg-gray-300 p-2 rounded border-none"
                title="Copy Selector"
              >
                📋
              </button>
              <button
                onClick={() => saveSettingsToLocalStorage("selector")}
                className="bg-green-500 hover:bg-green-700 text-white font-bold px-4 rounded"
              >
                Save
              </button>
            </div>
          </div>

          <button
            onClick={() => setView("main")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Go Back
          </button>
        </div>
      )}

      {/* ✅ Notes Section */}
      {view === "notes" && (
        <div className="notes-view text-center w-full">
          <h1 className="text-xl font-bold text-gray-700">Notes Section</h1>

          {/* 📝 List of Saved Notes */}
          <div className="mt-4 text-left">
            {notes.length > 0 ? (
              notes.map((note, index) => (
                <div
                  key={index}
                  className="p-2 border border-gray-300 rounded-md mb-2 bg-gray-100"
                >
                  {note}
                </div>
              ))
            ) : (
              <p>No notes added yet.</p>
            )}
          </div>

          {/* 🆕 Add New Note */}
          <textarea
            placeholder="Write your notes here..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mt-4"
            rows="3"
          />

          {/* ✅ Add and Save Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handleAddNote}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Note
            </button>
            <button
              onClick={saveNotesToLocalStorage}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Notes
            </button>
          </div>

          <button
            onClick={() => setView("main")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

////whole new code
