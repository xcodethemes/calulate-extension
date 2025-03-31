/* eslint-disable no-undef */
chrome.runtime.onInstalled.addListener(() => {
  console.log("✅ Extension installed.");
});

// chrome.tabs.onActivated.addListener((activeInfo) => {
//   chrome.scripting.executeScript({
//     target: { tabId: activeInfo.tabId },
//     files: ["content.js"]
//   }, () => {
//     console.log("✅ Content script injected on tab activation.");
//   });  
// });

// chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
//   if (changeInfo.status === "complete") {
//     chrome.scripting.executeScript({
//       target: { tabId },
//       files: ["content.js"]
//     }, () => {
//       console.log("✅ Content script injected on page update.");
//     });
//   }
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log("📩 Received message:", message);

//   if (message.type === "ATTACH_LISTENER") {
//     chrome.storage.local.set({ xpath: message.xpath });

//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       if (tabs.length > 0) {
//         const tabId = tabs[0].id;

//         // ✅ Add delay to ensure content script injection
//         setTimeout(() => {
//           chrome.scripting.executeScript({
//             target: { tabId },
//             files: ["content.js"]
//           }, () => {
//             console.log("✅ Content script re-injected.");
            
//             chrome.tabs.sendMessage(tabId, message, (response) => {
//               if (chrome.runtime.lastError) {
//                 console.error("❌ Error sending message:", chrome.runtime.lastError);
//               } else {
//                 console.log("📩 Message sent successfully:", response);
//               }
//             });
//           });
//         }, 300);  // Delay of 300ms
//       }
//     });

//     sendResponse({ success: true });
//   } else {
//     console.warn("❌ Unknown message type:", message.type);
//     sendResponse({ success: false, message: "Unknown message type" });
//   }

//   return true;  // ✅ Keep message channel open for async responses
// });
