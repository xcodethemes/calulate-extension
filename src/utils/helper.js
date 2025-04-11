/* eslint-disable no-undef */

//calculate Percentage Value
export const calculatePercentageValue = (value, percentage) => {
  if (isNaN(value) || isNaN(percentage)) {
    return 0;
  }
  return (value * percentage) / 100;
}

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
          console.log("handleCalculation inputs==>", inputs);
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
  console.log("handleBuyClick ID==>", ID);

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

//handle Fill Values
export const handleFillValues = (filledValues) => {
  console.log("handleFillValues Clicked!!");

  if (typeof chrome !== "undefined" && chrome.tabs) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        console.error("No active tab found.");
        return;
      }

      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        args: [filledValues],
        function: (filledValues) => {
          // const inputs = document?.querySelector(allIds?.stopLoss) || document.querySelector('#tfdSLPrice');
          const qtyInput = document.querySelector("#tfdQuantity");
          const limitPriceInput = document.querySelector("#tfdPrice");
          const stopLossInput = document.querySelector("#tfdSLPrice");
          const targetInput = document.querySelector("#tfdTargetPrice");
          const trailJumpInput = document.querySelector(
            "#tfdEnableTrailJumpValue"
          );

          // console.log("Check stop loss inputs==>", inputs);
          // if (inputs.length === 0) {
          //   console.log("No number inputs found.");
          //   return;
          // }

          console.log("extension obj=>", filledValues);
          qtyInput.value = filledValues?.qty;
          limitPriceInput.value = filledValues?.limitPrice;
          stopLossInput.value = filledValues?.stopLoss;
          targetInput.value = filledValues?.target;
          trailJumpInput.value = filledValues?.trailJump;

          console.log("Fill Values!");
        },
      });
    });
  } else {
    console.warn(
      "Chrome API is not available. Run this as a Chrome extension."
    );
  }
};

//handle getAllValues
export const getAllValues = (id) => {
  console.log("getAllValues id =>", id);

  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        console.error("No active tab found.");
        reject("No active tab");
        return;
      }

      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          args: [id],
          func: (id) => {
            console.log("✅ Checking for iframes...");
            console.log("✅ Checking for id...", id);
            const iframes = document.querySelectorAll("iframe");

            if (iframes.length === 0) {
              console.warn("❌ No iframes found.");
              return null;
            }

            for (const iframe of iframes) {
              try {
                const iframeDoc =
                  iframe.contentDocument || iframe.contentWindow.document;

                // Make sure selector is properly formatted (as ID)
                const IframelivePriceSelector = iframeDoc.querySelector(
                  id?.livePrice
                );
                console.log(
                  "IframelivePriceSelector =>",
                  IframelivePriceSelector
                );
                // const livePriceSelector = document.querySelector(id?.livePrice).innerHTML;
                const livePriceSelector = document.querySelector(
                  id?.livePrice
                ).innerHTML;

                console.log("🔍 livePriceSelector =>", livePriceSelector);

                const qtySelector = document.querySelector(id?.qty).value;
                console.log("🔍 qtySelector =>", qtySelector);

                const limitPriceSelector = document.querySelector(
                  id?.limitPrice
                ).value;

                // const limitPriceSelector =document.querySelector('#tfdPrice').value || document.querySelector(
                //   id?.limitPrice
                // ).value;

                console.log("🔍 limitPriceSelector =>", limitPriceSelector);
                // const targetSelector = document.querySelector(id?.target)
                //   .value;
                // const stopLossSelector = document.querySelector(id?.stopLoss)
                //   .value;

                const trailJumpSelector = document.querySelector(
                  id?.trailJump
                ).value;

                // console.log("🔍 targetSelector =>", targetSelector);
                // console.log("🔍 livePriceSelector124 =>", document.querySelector('#tfdltp').innerHTML);

                const allValues = {
                  qty: qtySelector,
                  livePrice: livePriceSelector,
                  limitPrice: limitPriceSelector,
                  // target: targetSelector|| 101 ,
                  // stopLoss: stopLossSelector || 101,
                  trailJump: trailJumpSelector || 101,
                };
                console.log("allValues =>", allValues);
                if (livePriceSelector) {
                  console.log("✅ Found live price:", livePriceSelector);
                  return allValues;
                }
                // if (limitPriceSelector) {
                //   console.log("✅ Found limitPrice :", limitPriceSelector);
                //   return limitPriceSelector;

                // }
              } catch (error) {
                console.warn("⚠️ Failed to access iframe:", error);
              }
            }

            return null; // if nothing found
          },
        },
        (results) => {
          if (chrome.runtime.lastError) {
            console.error(
              "⛔ Runtime error:",
              chrome.runtime.lastError.message
            );
            reject(chrome.runtime.lastError.message);
          } else {
            const value = results?.[0]?.result;
            console.log("🎯 Final result from injected script:", value);
            resolve(value);
          }
        }
      );
    });
  });
};

