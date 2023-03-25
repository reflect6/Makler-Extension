let tabsInfo = [];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  chrome.tabs.query({}, function(tabs) {
    tabsInfo = tabs.map(function(tab) {
      const tabUrl = tab.url;
      let mainTabUrl = '';
      try {
        const urlObj = new URL(tabUrl);
        mainTabUrl = urlObj.origin;
      } catch (e) {
        console.error(`Invalid URL: ${tabUrl}`);
      }
      return { id: tab.id, url: mainTabUrl };
    });
  });
  console.log("got message from postlisting ");
  let listing = request.listing;
  if (request.action === 'postListing') {
    chrome.storage.local.get(['websites'], function(result) {
      const selectedWebsites = result.websites;
      console.log("got selected websites from storage");
      console.log(selectedWebsites);
      chrome.storage.local.set({ listing: listing }, () => {
        console.log("Listing saved to storage");
        console.log(listing);
      });

      tabsInfo.forEach(function(tab) {
        if (tab.url && selectedWebsites.includes(tab.url)) {
          chrome.tabs.executeScript(tab.id, { file: 'contentScript.js' }, function() {
            console.log(`Executed content script on tab ${tab.id} on ${tab.url}`);
          });
        }
      });
    });
  };
});


