// Background script for the extension
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    showAnswers: true,
    showChests: true
  });
});
