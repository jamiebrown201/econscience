function createSetIconAction(path, callback) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var image = new Image();
  image.onload = function() {
    ctx.drawImage(image,0,0,120,120);
    var imageData = ctx.getImageData(0,0,120,120);
    var action = new chrome.declarativeContent.SetIcon({imageData: imageData});
    callback(action);
  }
  image.src = chrome.runtime.getURL(path);
}


chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
  createSetIconAction("icon_active.png", function(setIconAction) {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'buzzfeed.com' },
          })
        ],
        actions    : [ setIconAction ]
      }
    ]);
  });
});
