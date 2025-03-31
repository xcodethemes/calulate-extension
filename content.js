console.log("Content script loaded!");

// ✅ Use a global event listener for dynamic elements
document.addEventListener("click", (e) => {
  console.log('In buy eventlistener e.target.id:', e.target.id)
  if (e.target && e.target.id) {
    console.log('Buy Button Clicked')
  }
});
