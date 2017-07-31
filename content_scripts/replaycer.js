function replaycer(request, sender, sendResponse){
  doEverything(request.oldWord, request.newWord);
  browser.runtime.onMessage.removeListener(replaycer);
}

function doEverything(ow, nw) {
  replaceText(document.body, ow, nw);
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const newNode = mutation.addedNodes[i];
          replaceText(newNode, ow, nw);
        }
      }
    });
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}


function replaceText (node, ow, nw) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.parentNode &&
        node.parentNode.nodeName === 'TEXTAREA') {
      return;
    }
    let content = node.textContent;
    content = content.replace(ow, nw);
    content = content.replace(ow.toLowerCase(), nw.toLowerCase())
    node.textContent = content;
  }
  else {
    // This node contains more than just text, call replaceText() on each
    // of its children.
    for (let i = 0; i < node.childNodes.length; i++) {
      replaceText(node.childNodes[i], ow, nw);
    }    
  }
}


browser.runtime.onMessage.addListener(replaycer);
