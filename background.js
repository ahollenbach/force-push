chrome.tabs.onCreated.addListener(force_push);
chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
  if (info.status == 'complete') force_push(tab);
});
chrome.browserAction.onClicked.addListener(toggle);

function force_push(tab) {
  if (!isValidUrl(tab)) return;

  // Track here too so we can change the icon
  window.BACKGROUND_STOP_CONFETTI = false;

  // Default on for any valid URL path!
  chrome.browserAction.setIcon({
    path: "icon_32.png",
    tabId: tab.id
  });

  chrome.tabs.executeScript(tab.id, {
    file: "celebration.js"
  });
}

function toggle(tab) {
  if (!isValidUrl(tab)) return;

  var icon_path = "icon_32.png"
  if (!window.STOP_CONFETTI) {
    window.STOP_CONFETTI = true;
    icon_path = "icon_gray_32.png";
  } else {
    window.STOP_CONFETTI = false;
  }

  chrome.browserAction.setIcon({
    path: icon_path,
    tabId: tab.id
  });

  chrome.tabs.executeScript(tab.id, {
    file: "toggle.js"
  });
}

function isValidUrl(tab) {
  var tabUrl = tab.url;
  if (tabUrl && tabUrl.indexOf("https://github.com") != 0) {
    chrome.browserAction.disable(tab.id);
    return false;
  }
  return true;
}