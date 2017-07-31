
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("submit")) {
    var oldText = document.getElementById("oldText").value;
    var newText = document.getElementById("newText").value;
    browser.tabs.executeScript(null, {
      file: "/content_scripts/replaycer.js"
    });
    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {oldWord: oldText, newWord: newText});
    });
  }
});
