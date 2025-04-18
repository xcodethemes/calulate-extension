console.log("Content script loaded!");
// chrome.runtime.sendMessage({
//   type: "UPDATE_LIVE_PRICE",
//   payload: {
//     value: "Fetched Value from Modal",
//   },
// });

// ✅ Use a global event listener for dynamic elements
// document.addEventListener("click", (e) => {
//   console.log('In buy eventlistener e.target.id:', e.target.id)
//   if (e.target && e.target.id) {
//     console.log('Buy Button Clicked in Content js')
//   }
//   setTimeout(()=>{
//     const target= document.querySelector('body > app-root > div.webpage > app-index > div.pageContainer > div > div > div.right_container > app-companypage > div.qoutesContent > div > div:nth-child(4) > div > div.col-xl-6.col-lg-6.col-md-6.left.pl-0 > div.left.pl-0 > div > div.d-flex.mt-3.paddingData.lh-25.pb-2 > div.lowHighBar > div > div.dataBoxForrange')?.innerText;
//     console.log('target=>', target)
//   },2000)

//     const targetNode= document.querySelector('body > app-root > div.webpage > app-index > div.pageContainer > div > div > div.right_container > app-companypage > div.qoutesContent > div > div:nth-child(4) > div > div.col-xl-6.col-lg-6.col-md-6.left.pl-0 > div.left.pl-0 > div > div.d-flex.mt-3.paddingData.lh-25.pb-2 > div.lowHighBar > div > div.dataBoxForrange')?.innerText;
//     console.log('targetNode=>', targetNode)

//     const observer = new MutationObserver(() => {
//       const price = targetNode?.textContent;
//       if (price && price !== lastPrice) {
//         lastPrice = price;

//         chrome.runtime.sendMessage({ type: 'PRICE_UPDATE', price });
//       }
//     });

//     if (targetNode) {
//       observer.observe(targetNode, { childList: true, subtree: true });
//     }

// });

//new

const port = chrome.runtime.connect({ name: "pricePort" });
console.log('port content=>', port)

document.addEventListener("click", (e) => {
  console.log("In buy eventlistener e.target.id:", e.target.id);
  if (e.target && e.target.id) {
    console.log("Buy Button Clicked in Content js");
  }

  const targetElement = document.querySelector(
    "body > app-root > div.webpage > app-index > div.pageContainer > div > div > div.right_container > app-companypage > div.qoutesContent > div > div:nth-child(4) > div > div.col-xl-6.col-lg-6.col-md-6.left.pl-0 > div.left.pl-0 > div > div.d-flex.mt-3.paddingData.lh-25.pb-2 > div.lowHighBar > div > div.dataBoxForrange"
  );

  console.log("targetElement text =>", targetElement, targetElement?.innerText);

  // if (targetElement) {
  //   let lastPrice = targetElement.textContent;
  //   console.log('lastPrice=>', lastPrice)

  //   const observer = new MutationObserver(() => {
  //     const price = targetElement.textContent;
  //     if (price && price !== lastPrice) {
  //       lastPrice = price;
  //       console.log('####  Will Runnn #####')
  //       chrome.runtime.sendMessage({ type: 'PRICE_UPDATE', price });
  //     }
  //   });

  //   observer.observe(targetElement, { childList: true, subtree: true });
  // }
  
 
  
  const observer = new MutationObserver(() => {
    const price = targetElement.textContent;
    if (price && price !== lastPrice) {
      lastPrice = price;
      port.postMessage({ type: "PRICE_UPDATE", price });
    }
  });
});


