let activeTabId = null;
let activeStartTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const now = Date.now();
  if (activeTabId && activeStartTime) {
    const duration = now - activeStartTime;
    const tab = await chrome.tabs.get(activeTabId);
    const url = new URL(tab.url);
    const domain = url.hostname;

    chrome.storage.local.get([domain], (result) => {
      const total = result[domain] || 0;
      chrome.storage.local.set({ [domain]: total + duration });
    });
  }
  activeTabId = activeInfo.tabId;
  activeStartTime = now;
});
