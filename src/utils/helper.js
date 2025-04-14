/* eslint-disable no-undef */

//calculate Percentage Value
export const calculatePercentageValue = (value, percentage) => {
  if (isNaN(value) || isNaN(percentage)) {
    return 0;
  }
  return (value * percentage) / 100;
};

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
export const getAllValues = (id, type) => {
  console.log("getAllValues id =>", id, type);

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
          args: [id, type],
          func: (id, type) => {
            console.log("✅ Checking for iframes...");
            console.log("✅ Checking for getAllValues id...", id);
           
            if (type === "web") {
              console.log("-----web---------");

              const qtySelector = document.querySelector(id?.qty)?.value;
              console.log('document.querySelector(id?.qty)?.value=>', document.querySelector(id?.qty)?.value)

              const livePriceSelector = document.querySelector(id?.livePrice)?.innerText;

              const limitPriceSelector = document.querySelector(
                id?.limitPrice
              )?.value;

              const trailJumpSelector = document.querySelector(
                id?.trailJump
              )?.value;


              const allValues = {
                qty: qtySelector,
                livePrice: livePriceSelector,
                limitPrice: limitPriceSelector,
                // target: targetSelector|| 101 ,
                // stopLoss: stopLossSelector || 101,
                trailJump: trailJumpSelector || '',
              };
              console.log("allValues =>", allValues);
              if (livePriceSelector) {
                console.log("✅ Found live price:", livePriceSelector);
                return allValues;
              }
             

            } else if (type === "tv") {
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
                  ).innerText;

                  console.log("🔍 livePriceSelector =>", livePriceSelector);

                  const qtySelector = document.querySelector(id?.qty).value;
                  console.log("🔍 qtySelector =>", qtySelector);

                  const limitPriceSelector = document.querySelector(
                    id?.limitPrice
                  ).value;

                  console.log("🔍 limitPriceSelector =>", limitPriceSelector);

                  const trailJumpSelector = document.querySelector(
                    id?.trailJump
                  ).value;

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
                } catch (error) {
                  console.warn("⚠️ Failed to access iframe:", error);
                }
              }

              return null; // if nothing found
            }
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


export const handleInstantOpen = (superTab, btnId, checkBoxId, sectionType) => {
  console.log("handleInstantSell ID==>", superTab, btnId, checkBoxId);

  // if (!ID) {
  //   alert("Please enter a valid ID before trading.");
  //   return;
  // }

  if (typeof chrome !== "undefined" && chrome.tabs) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        console.error("No active tab found.");
        return;
      }

      // Inject script into the active tab
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },

        args: [superTab, btnId, checkBoxId, sectionType],

        function: (superTab, btnId, checkBoxId, sectionType) => {
          console.log("✅ Checking for handleInstantSell iframes...");
          console.log('btnId=>', btnId);

          // Handle iframes
          const iframes = document.querySelectorAll("iframe");
          console.log('iframes length=>', iframes);

          if (iframes.length === 0) {
            console.warn("❌ No iframes found.");
            return;
          }
          console.log('sectionType=>', sectionType)
          console.log("Outside Iframe loop buyBtn=>", document.querySelector(btnId));

         if(sectionType === 'web') {

          const isBuySellBtn = document.querySelector(btnId);

          if (isBuySellBtn) {
            isBuySellBtn.click();

            setTimeout(() => {
              console.log('goimng in setTiemeout');
              const isShadowRoot =
                document
                  ?.querySelector("#orderTypeList")
                  ?.shadowRoot?.querySelector(superTab) || "";

              if (isShadowRoot) {
                console.log('going in shadowRoot???');
                console.log("super tab btn clicked");
                isShadowRoot.click();
              }

              const checkbox = document.querySelector(checkBoxId);
              console.log(
                "checkbox GETTING? =>",
                checkbox
              );

              if (checkbox) 
                {
                console.log("checkbox clicked");
                  checkbox.click();
                }
            }, 300);
          }

         }
         else{
          let found = false;

          for (const iframe of iframes) {
            try {
              const iframeDoc =
                iframe.contentDocument || iframe.contentWindow.document;

              const btnSelector = btnId;

              const buyBtn = iframeDoc.querySelector(btnSelector);
              console.log("Inside Ifram loop buyBtn=>", buyBtn);
              const superTabBtn = iframeDoc.querySelector(superTab);
              console.log("superTabBtn=>", superTabBtn);

              if (buyBtn) {
                buyBtn.click();
                // superTabBtn.click();
                setTimeout(() => {
                  {
                    const isShadowRoot = document
                      ?.querySelector("#orderTypeList")
                      ?.shadowRoot?.querySelector(superTab) || '';

                    if (isShadowRoot) {
                      console.log("super tab btn clicked");
                      isShadowRoot?.click();
                    }

                    //  document.querySelector("#tfdEnableTrailJump").click();
                    console.log('sell trailJumpCheckbox=>', document.querySelector(checkBoxId));
            
                    document.querySelector(checkBoxId).click();
                  }
                }, 300);
                console.log("✅ Instant Sell Button clicked inside iframe!");
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