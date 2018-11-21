chrome.tabs.onCreated.addListener(force_push);
chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    if (info.status == 'complete') force_push(tab);
});

function force_push(tab) {
    var tabUrl = tab.url;
    if (tabUrl && tabUrl.indexOf("https://github.com") != 0) {
        return;
    }

    // chrome.tabs.insertCSS(tab.id, {
    //     file: "celebration.css"
    // });
    chrome.tabs.executeScript(tab.id, {
        file: "celebration.js"
    });
    
}