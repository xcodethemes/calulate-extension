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
export const handleFillValues = (filledValues, type, id) => {
  console.log("handleFillValues Clicked!!");

  if (typeof chrome !== "undefined" && chrome.tabs) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        console.error("No active tab found.");
        return;
      }

      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        args: [filledValues, type, id],
        function: (filledValues, type, id) => {
          console.log("filledValues in handleFillValues==>", filledValues);
          // const inputs = document?.querySelector(allIds?.stopLoss) || document.querySelector('#tfdSLPrice');
          let qtyInput;
          let limitPriceInput;
          let stopLossInput;
          let targetInput;
          let trailJumpInput;

          if (type === "web") {
            qtyInput = document.querySelector(`[formcontrolname=${id?.qty}]`);
            console.log("qtyInput inn handleFill==>", qtyInput);

            limitPriceInput = document.querySelector(
              `[formcontrolname=${id?.limitPrice}]`
            );
            stopLossInput = document.querySelector(
              `[formcontrolname=${id?.stopLoss}]`
            );
            targetInput = document.querySelector(
              `[formcontrolname=${id?.target}]`
            );
            trailJumpInput = document.querySelector(
              `[formcontrolname=${id?.trailJump}]`
            );
          } else if (type === "tv") {
            qtyInput = document.querySelector(id?.qty);
            limitPriceInput = document.querySelector(id?.limitPrice);
            stopLossInput = document.querySelector(id?.stopLoss);
            targetInput = document.querySelector(id?.target);
            trailJumpInput = document.querySelector(id?.trailJump);
          }

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
            console.log("✅ getAllValues Checking for iframes...");
            // console.log("✅ Checking for getAllValues id...", id);

            if (type === "web") {
              console.log("-----web---------");

              // const qtySelector = document.querySelector(id?.qty)?.value;
              const qtySelector = document.querySelector(
                `[formcontrolname=${id?.qty}]`
              )?.value;

              // const livePriceSelector = document.querySelector(id?.livePrice)?.innerText;
              const livePriceSelector = document.querySelector(id?.livePrice)
                .innerHTML;

              // const limitPriceSelector = document.querySelector(
              //   id?.limitPrice
              // )?.value;

              const limitPriceSelector = document.querySelector(
                `[formcontrolname=${id?.limitPrice}]`
              )?.value;
              console.log('limitPriceSelector in web=>', limitPriceSelector)

              // const trailJumpSelector = document.querySelector(
              //   id?.trailJump
              // )?.value;
              const trailJumpSelector = document.querySelector(
                `[formcontrolname=${id?.trailJump}]`
              )?.value;

              const allValues = {
                qty: qtySelector,
                livePrice: livePriceSelector,
                limitPrice: limitPriceSelector,
                // target: targetSelector|| 101 ,
                // stopLoss: stopLossSelector || 101,
                trailJump: trailJumpSelector || "",
              };
              console.log("allValues in web =>", allValues);
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
                  console.log("allValues in TV =>", allValues);
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
  console.log("handleInstantOpen ID==>", superTab, btnId, checkBoxId);

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
          console.log("✅ Checking for handleInstantOpen iframes...");
          console.log("btnId=>", btnId);

          // Handle iframes
          const iframes = document.querySelectorAll("iframe");
          console.log("iframes length=>", iframes);

          if (iframes.length === 0) {
            console.warn("❌ No iframes found.");
            return;
          }
          console.log("sectionType=>", sectionType);
          console.log(
            "Outside Iframe loop buyBtn=>",
            document.querySelector(btnId)
          );

          if (sectionType === "web") {
            const isBuySellBtn = document.querySelector(btnId);

            if (isBuySellBtn) {
              isBuySellBtn.click();

              setTimeout(() => {
                console.log("goimng in setTiemeout");
                const isShadowRoot =
                  document
                    ?.querySelector("#orderTypeList")
                    ?.shadowRoot?.querySelector(superTab) || "";

                if (isShadowRoot) {
                  console.log("going in shadowRoot???");
                  console.log("super tab btn clicked");
                  isShadowRoot.click();
                }

                // const checkbox = document.querySelector(checkBoxId);
                // const checkbox = document.querySelector(`[name=${checkBoxId}]`);
                const checkbox = document.querySelector(
                  `[name=${checkBoxId}] input[type="checkbox"]`
                );
                console.log("checkbox GETTING? =>", checkbox);

                if (checkbox) {
                  console.log("checkbox clicked");
                  checkbox.click();
                }
              }, 300);
            }
          } else {
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
                      const isShadowRoot =
                        document
                          ?.querySelector("#orderTypeList")
                          ?.shadowRoot?.querySelector(superTab) || "";

                      if (isShadowRoot) {
                        console.log("super tab btn clicked");
                        isShadowRoot?.click();
                      }

                      //  document.querySelector("#tfdEnableTrailJump").click();
                      console.log(
                        "sell trailJumpCheckbox=>",
                        document.querySelector(checkBoxId)
                      );

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

export const handleShow = (show, sectionType, allIds) => {
  console.log("handleShow!! ==>", show);

  if (typeof chrome !== "undefined" && chrome.tabs) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        console.error("No active tab found.");
        return;
      }
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        args: [show, sectionType, allIds],
        function: (show, sectionType, allIds) => {
          // Handle iframes
          const iframes = document.querySelectorAll("iframe");
          //  console.log("iframes handleShow length=>", iframes);

          if (iframes.length === 0) {
            console.warn("❌ No iframes found.");
            return;
          }

          if (sectionType === "web") {
            console.log("Web section");
            console.log("iframes handleShow length=>", iframes);
            console.log('checkinf without', 'chrtBUy=>', show?.chartBuyBtn, 'chartSell', show?.chartSellBtn );
            // In frame only-----------------------
          
            let found = false;
            
            for (const iframe of iframes) {
              try {
                const iframeDoc =
                  iframe.contentDocument || iframe.contentWindow.document;

                const toggleVisibility = (condition, selector) => {
                  const target = iframeDoc.querySelector(selector);
            
                  const target1234 = document.querySelector(selector);
                 console.log("target1234=>", target1234);
                 console.log("target=>", target);
                  if (target) {
                    target.style.display = condition ? "none" : "block";
                  }
                };

                if (show?.chartBuyBtn !== undefined) {
                    console.log(
                      "Toggling Buy Button Visibility:",
                    show.chartBuyBtn , 'allIds?.chartBuyId=>', allIds?.chartBuyId
                  );
                  const here = iframeDoc?.querySelector(selector);
                  console.log('here=>', here);
                  if (here) {
                    here.style.display = condition ? "none" : "block";
                  }
                  // toggleVisibility(show.chartBuyBtn, allIds?.chartBuyId);
                }

                if (show?.chartSellBtn !== undefined) {
                  console.log(
                    "Toggling Sell Button Visibility:",
                    show.chartSellBtn, 'allIds?.chartSellId=>', allIds?.chartSellId
                  );
                  toggleVisibility(show.chartSellBtn, allIds?.chartSellId);
                }
                found = true;
                break;
              } catch (error) {
                console.warn("⚠️ Failed to access iframe:", error);
              }
            }
            if (!found) {
              console.warn('❌ No button found in any iframe.');
            }
          } else {
             const target= document.querySelector('body > div.js-rootresizer__contents.layout-with-border-radius > div.layout__area--center > div.chart-container.top-full-width-chart.active > div.chart-container-border > div.chart-widget.chart-widget--themed-light.chart-widget__top--themed-light.chart-widget__bottom--themed-light > div.chart-markup-table > div:nth-child(1) > div.chart-markup-table.pane > div > div.legend-l31H9iuA.noWrap-l31H9iuA.wrappable-l31H9iuA > div.legendMainSourceWrapper-l31H9iuA > div.container-hw_3o_pb > div > div.apply-common-tooltip.button-hw_3o_pb.sellButton-hw_3o_pb')
             if(target)
             {
              target.style.display='none'
             }

            // let found = false;

            // for (const iframe of iframes) {
            //   try {
            //     const iframeDoc =
            //       iframe.contentDocument || iframe.contentWindow.document;

            //     const toggleVisibility = (condition, selector) => {
            //       const target = iframeDoc.querySelector(selector);
            //       if (target) {
            //         target.style.display = condition ? "none" : "block";
            //       }
            //     };

            //     if (show?.buyBtn !== undefined) {
            //       console.log("Toggling Buy Button Visibility:", show.buyBtn);
            //       toggleVisibility(show.buyBtn, allIds?.buyID);
            //     }

            //     if (show?.sellBtn !== undefined) {
            //       console.log("Toggling Sell Button Visibility:", show.sellBtn);
            //       toggleVisibility(show.sellBtn, allIds?.sellID);
            //     }

            //     if (show?.scalperBtn !== undefined) {
            //       console.log(
            //         "Toggling scalperBtn Button Visibility:",
            //         show.scalperBtn
            //       );
            //       toggleVisibility(show.scalperBtn, allIds?.scalperId);
            //     }
            //   } catch (error) {
            //     console.warn("⚠️ Failed to access iframe:", error);
            //   }
            // }
            // if (!found) {
            //   console.warn('❌ No "buy" button found in any iframe.');
            // }
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
