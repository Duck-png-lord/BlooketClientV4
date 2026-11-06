document.addEventListener('DOMContentLoaded', () => {
  const showAnswersToggle = document.getElementById('showAnswersToggle');
  const showChestsToggle = document.getElementById('showChestsToggle');

  // Load saved settings
  chrome.storage.sync.get(['showAnswers', 'showChests'], (result) => {
    showAnswersToggle.checked = result.showAnswers !== false;
    showChestsToggle.checked = result.showChests !== false;
  });

  // Save settings when toggled
  showAnswersToggle.addEventListener('change', () => {
    chrome.storage.sync.set({ showAnswers: showAnswersToggle.checked });
  });

  showChestsToggle.addEventListener('change', () => {
    chrome.storage.sync.set({ showChests: showChestsToggle.checked });
  });
});
