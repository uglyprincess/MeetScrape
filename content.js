keys = ["slide", "market", "present", "presentation", "product", "but", "attendance", "name"];

var mutationObserver = new MutationObserver(function(mutations) {
  mutations.forEach(mutation => {
    if (mutation.target.nodeName=="SPAN"){
      mutation.addedNodes.forEach(addedNode => {
        if (addedNode.nodeName=="SPAN"){
          let currentText = addedNode.innerText.toLowerCase();
          console.log("added: ", currentText);

          keys.forEach(key => {
            if (currentText.includes(key)) {
              console.log("found");
              chrome.runtime.sendMessage('', {
                type: 'notification',
                options: {
                  title: key,
                  message: currentText,
                  iconUrl: '/icon.png',
                  type: 'basic'
                }
              });
            }
          });
        }
      })
      mutation.removedNodes.forEach(removedNode => {
        if (removedNode.nodeName=="SPAN"){
          console.log("removed: ", removedNode.innerText);
        }
      })
    }
  })
});

function addObserverIfDesiredNodeAvailable() {
  console.log("checking to add")
  var composeBox = document.querySelector(".a4cQT");
  if (!composeBox) {
      window.setTimeout(addObserverIfDesiredNodeAvailable,500);
      return;
  }
  var config = {childList: true};
  console.log("added")
  document.querySelectorAll(".cS7aqe").forEach(element => {
    console.log(element);
  });
  mutationObserver.observe(document.querySelector(".a4cQT"), {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
  });   
}

addObserverIfDesiredNodeAvailable();


