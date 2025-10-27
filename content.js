let isEnabled = false;

chrome.storage.sync.get(['retweetsEnabled'], (result) => {
  isEnabled = result.retweetsEnabled !== undefined ? result.retweetsEnabled : false;
  if (isEnabled) { init(); }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateRetweetFilter') {
    isEnabled = request.enabled;
    if (isEnabled) { init(); removeRetweets(); } 
    else { showRetweets(); }
  }
});

function init() { if (isOnTwitter()) { removeRetweets(); observeNewTweets(); } }

function isOnTwitter() {
  const url = window.location.href;
  return url.includes('twitter.com') || url.includes('x.com');
}

function isOnListPage() {
  const url = window.location.href;
  return url.includes('/lists/') || url.includes('/i/lists/');
}

function removeRetweets() {
  if (!isEnabled) {return;}
  const tweets = document.querySelectorAll('article[data-testid="tweet"]');
  tweets.forEach((tweet) => {
    if (tweet.hasAttribute('data-betterlist-processed')) {return;}
    tweet.setAttribute('data-betterlist-processed', 'true');
    if (isRetweet(tweet)) {
      tweet.style.display = 'none';
      tweet.setAttribute('data-betterlist-hidden', 'true');
    }
  });
}

function showRetweets() {
  const hiddenTweets = document.querySelectorAll('[data-betterlist-hidden="true"]');
  hiddenTweets.forEach((tweet) => {
    tweet.style.display = '';
    tweet.removeAttribute('data-betterlist-hidden');
    tweet.removeAttribute('data-betterlist-processed');
  });
}

function isRetweet(tweetElement) {
  const socialContext = tweetElement.querySelector('[data-testid="socialContext"]');
  if (!socialContext) { return false; }
  const contextText = socialContext.innerText || socialContext.textContent || '';
  const lowerText = contextText.toLowerCase().trim();
  if (lowerText.includes('reposted') || lowerText.includes('retweeted')) { return true; }
  const parent = socialContext.closest('.css-175oi2r');
  if (parent) {
    const retweetSvg = parent.querySelector('svg path[d*="4.75 3.79"], svg path[d*="4.5 3.88"], svg path[d*="4.603 4.3"]');
    if (retweetSvg) { return true; }
  }
  return false;
}

function observeNewTweets() {
  if (!isEnabled) {return;}
  const observer = new MutationObserver((mutations) => {
    if (isEnabled) {
      clearTimeout(observer.timeoutId);
      observer.timeoutId = setTimeout(() => { removeRetweets(); }, 100);
    }
  });
  const timeline = document.querySelector('[data-testid="primaryColumn"]') || document.body;
  observer.observe(timeline, { childList: true, subtree: true });
  window.betterListObserver = observer;
}

let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    if (isEnabled) { setTimeout(() => { removeRetweets(); }, 500); }
  }
}).observe(document.body, { subtree: true, childList: true });

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }