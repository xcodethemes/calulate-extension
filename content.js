console.log("Content script loaded!");

// ✅ Use a global event listener for dynamic elements
document.addEventListener("click", (e) => {
  console.log("In buy eventlistener e.target.id:", e.target.id);
  if (e.target && e.target.id) {
    console.log("Buy Button Clicked in Content js");
  }

  const targetNode = document.querySelector(
    "body > app-root > div.webpage > app-index > div.pageContainer > div > div > div.right_container > app-companypage > div.qoutesContent > div > div:nth-child(4) > div > div.col-xl-6.col-lg-6.col-md-6.left.pl-0 > div.left.pl-0 > div > div.d-flex.mt-3.paddingData.lh-25.pb-2 > div.lowHighBar > div > div.dataBoxForrange"
  )?.innerText;
  console.log("targetNode onclick=>", targetNode);
});

//new

// Define the handler function
function handleClick(e) {
  console.log("🖱️ In click listener, e.target.id:", e.target.id);

  setTimeout(() => {
    const targetElement = document.querySelector(
      "body > app-root > div.webpage > app-index > div.pageContainer > div > div > div.right_container > app-companypage > div.qoutesContent > div > div:nth-child(4) > div > div.col-xl-6.col-lg-6.col-md-6.left.pl-0 > div.left.pl-0 > div > div.d-flex.mt-3.paddingData.lh-25.pb-2 > div.lowHighBar > div > div.dataBoxForrange"
    );

    console.log("⏳ setTimeout handleClick targetElement =>", targetElement);

    if (!targetElement) {
      console.warn("⚠️ targetElement not found");
      return;
    }

    let lastPrice = targetElement.textContent.trim();
    console.log("💰 Initial price =>", lastPrice);

    // ✅ MutationObserver for real-time updates
    const observer = new MutationObserver(() => {
      const price = targetElement.textContent.trim();
      console.log("👁️ In observer price =>", price, " | last =>", lastPrice);
      if (price && price !== lastPrice) {
        lastPrice = price;
        console.log("📈 Price updated (observer):", price);
        chrome.runtime.sendMessage({ type: "PRICE_UPDATE", price });
      }
    });

    observer.observe(targetElement, {
      characterData: true,
      childList: true,
      subtree: true,
    });

    console.log("👀 MutationObserver attached");

    // 🕒 Fallback polling every 1s in case mutation doesn't trigger
    const pollingInterval = setInterval(() => {
      const price = targetElement.textContent.trim();
      if (price && price !== lastPrice) {
        lastPrice = price;
        console.log("📈 Price updated (polling):", price);
        chrome.runtime.sendMessage({ type: "PRICE_UPDATE", price });
      }
    }, 1000);

    // Optional: stop polling after some time (e.g. 5 minutes)
    setTimeout(() => clearInterval(pollingInterval), 5 * 60 * 1000);
  }, 500);
}

// 🕵️ Wait for target element before attaching click handler
const waitForTarget = setInterval(() => {
  const target = document.querySelector(
    "body > app-root > div.webpage > app-index > div.pageContainer > div > div > div.right_container > app-companypage > div.qoutesContent > div > div:nth-child(4) > div > div.col-xl-6.col-lg-6.col-md-6.left.pl-0 > div.left.pl-0 > div > div.d-flex.mt-3.paddingData.lh-25.pb-2 > div.lowHighBar > div > div.dataBoxForrange"
  );

  console.log("⏳ waitForTarget target =>", target);

  if (target) {
    console.log("🎯 Target element found:", target);
    document.addEventListener("click", handleClick);
    clearInterval(waitForTarget);
  }
}, 1500);
