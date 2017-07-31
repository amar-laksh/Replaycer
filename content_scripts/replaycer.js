// Use var to avoid "Error: redeclaration of const replacer" for now
// TODO: Closure / typeof and avoiding repetitive loading is right practice.
var replacer = (request, sender, sendResponse) => {
  replaceAndWatch(request.oldText, request.newText);
  browser.runtime.onMessage.removeListener(replacer);
}

var replaceAndWatch = (ow, nw) => {
  replaceText(document.body, ow, nw);
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        for (let newNode of mutation.addedNodes) {
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


var replaceText = (node, ow, nw) => {
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
    for (let childNode of node.childNodes) {
      replaceText(childNode, ow, nw);
    }
  }
}


browser.runtime.onMessage.addListener(replacer);
