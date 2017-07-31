document.querySelector("#submit").addEventListener("click", (e) => {
  let oldText = document.getElementById("oldText").value;
  let newText = document.getElementById("newText").value;
  browser.tabs.executeScript(null, {
    file: "/content_scripts/replaycer.js"
  }).then(() => { // use the Promise prevent "Error: Could not establish connection. Receiving end does not exist."
    browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {oldText, newText});
    });
  });
});
