// Content script to modify Blooket pages
console.log("BlooketClientV4 loaded");

// Function to highlight answers
function highlightAnswers() {
  if (!document.querySelector('.answer-option')) return;

  const options = document.querySelectorAll('.answer-option');
  const correctAnswer = document.querySelector('.correct-answer')?.textContent?.trim();
  const isGameActive = document.querySelector('.game-timer') !== null;

  if (!isGameActive) return;

  options.forEach(option => {
    const text = option.textContent?.trim();
    if (text === correctAnswer) {
      option.style.backgroundColor = 'rgba(0, 255, 0, 0.3)';
    } else {
      option.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
    }
  });
}

// Function to show chest contents
function showChestContents() {
  if (!document.querySelector('.chest-container')) return;

  const chests = document.querySelectorAll('.chest-container');
  chests.forEach(chest => {
    const chestText = chest.querySelector('.chest-text');
    if (chestText) {
      chestText.style.color = 'white';
      chestText.style.fontWeight = 'bold';
    }
  });
}

// Function to check and apply settings
function applySettings() {
  chrome.storage.sync.get(['showAnswers', 'showChests'], (result) => {
    if (result.showAnswers) {
      highlightAnswers();
    }

    if (result.showChests) {
      showChestContents();
    }
  });
}

// Run initially
applySettings();

// Set up MutationObserver to watch for dynamic content changes
const observer = new MutationObserver((mutations) => {
  applySettings();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: false,
  characterData: false
});
