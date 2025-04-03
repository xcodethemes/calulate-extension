/* eslint-disable no-undef */

//handle Calculations
export const handleCalculation = () => {
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

//handle Buy Click
export const handleBuyClick = (ID) => {
  console.log("ID==>", ID);

  if (!ID.trim()) {
    alert("Please enter a valid ID before trading.");
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

        args: [ID],

        function: (ID) => {
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

              const btnSelector = ID;

              const buyBtn = iframeDoc.querySelector(btnSelector);
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
//     console.log("type==>", type);

//     if (!buyID.trim() && type === "buy") {
//       alert("Please enter a valid BuyID before trading.");
//       return;
//     }
//     // if (!sellID.trim() && type === "sell") {
//     //   alert("Please enter a valid Sell ID before trading.");
//     //   return;
//     // }

//     if (typeof chrome !== "undefined" && chrome.tabs) {
//       chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         if (tabs.length === 0) {
//           console.error("No active tab found.");
//           return;
//         }

//         // Inject script into the active tab
//         chrome.scripting.executeScript({
//           target: { tabId: tabs[0].id },
//           args: [buyID, sellID, type],
//           // args: [buyID, type],
//           function: (buyID, sellID, type) => {
//           // function: (buyID, type) => {
//             console.log("✅ Checking for iframes...");

//             // Handle iframes
//             const iframes = document.querySelectorAll("iframe");

//             if (iframes.length === 0) {
//               console.warn("❌ No iframes found.");
//               return;
//             }

//             let found = false;

//             for (const iframe of iframes) {
//               try {
//                 const iframeDoc =
//                   iframe.contentDocument || iframe.contentWindow.document;

//                 const btnSelector = type === "buy" ? buyID : sellID;
//                 // const btnSelector = type === "buy" ? buyID : '';

//                 const buyBtn = iframeDoc.querySelector(btnSelector);
//                 // console.log("🔍 Checking iframe:", iframe, "=>", buyBtn);
//                 console.log("buyBtn=>", buyBtn);

//                 if (buyBtn) {
//                   buyBtn.click();
//                   console.log("✅ Button clicked inside iframe!");
//                   found = true;
//                   break;
//                 }
//               } catch (error) {
//                 console.warn("⚠️ Failed to access iframe:", error);
//               }
//             }

//             if (!found) {
//               console.warn('❌ No "buy" button found in any iframe.');
//             }
//           },
//         });
//       });
//     } else {
//       console.warn(
//         "Chrome API is not available. Run this as a Chrome extension."
//       );
//     }
//   };
