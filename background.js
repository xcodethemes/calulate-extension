
chrome.runtime.onInstalled.addListener(() => {
  console.log("✅ Extension installed.");
});

// Auto-reload when changes are detected
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    chrome.runtime.reload();
  });
}