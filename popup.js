const toggle = document.getElementById('toggleRetweets');
const statusLabel = document.getElementById('statusLabel');

chrome.storage.sync.get(['retweetsEnabled'], (result) => {
  const isEnabled = result.retweetsEnabled !== undefined ? result.retweetsEnabled : false;
  toggle.checked = isEnabled;
  updateLabel(isEnabled);
});

toggle.addEventListener('change', (event) => {
  const isEnabled = event.target.checked;
  chrome.storage.sync.set({ retweetsEnabled: isEnabled }, () => {
    updateLabel(isEnabled);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { 
          action: 'updateRetweetFilter',
          enabled: isEnabled 
        });
      }
    });
  });
});

function updateLabel(isEnabled) {
  statusLabel.textContent = isEnabled ? 'On' : 'Off';
  statusLabel.style.color = isEnabled ? '#1da1f2' : '#657786';
}