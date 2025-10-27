# BetterLists - Remove Retweets from Twitter Lists
A simple Chrome extension that removes retweets from your Twitter/X lists for a cleaner, more focused feed experience.

## Features
- Removes retweets from your entire Twitter/X feed
- Simple on/off toggle
- Works on home page (pinned lists), list pages, and timelines
- Handles infinite scroll and dynamic content

## Installation
1. **Download or clone this repository** to your local machine
2. **Open Chrome Extensions page**:
   - Go to `chrome://extensions/`
   - Or click the three dots menu → More Tools → Extensions
3. **Enable Developer Mode**:
   - Toggle the "Developer mode" switch in the top-right corner
4. **Load the extension**:
   - Click "Load unpacked"
   - Select the `betterlists` folder
   - The extension should now appear in your extensions list

## Usage
1. Navigate to Twitter/X (home page, lists, or any timeline)
2. Click the BetterLists extension icon in your toolbar
3. Toggle the switch to "On" to hide retweets
4. The page will automatically hide all retweets across Twitter/X
5. Toggle "Off" to see retweets again

**Works everywhere:**
- Home page with pinned lists
- Dedicated list pages (`/lists/123456789`)
- Main timeline
- Profile feeds

## How It Works
- When enabled, the extension works on all Twitter/X pages
- It scans tweets for the `socialContext` element that indicates retweets
- Retweets are hidden using CSS (`display: none`)
- A MutationObserver watches for new tweets as you scroll
- Your on/off preference is saved using Chrome's storage API
- Precise detection ensures only actual retweets are hidden

## Compatibility
- Works on both `twitter.com` and `x.com` domains
- Compatible with Chrome and Chromium-based browsers (Edge, Brave, etc.)
- Requires Manifest V3 support

## Privacy
This extension:
- Runs only on Twitter/X pages
- Stores only your on/off preference locally
- Does not collect or transmit any data
- Does not require account access
- Is completely free and open source

## Troubleshooting
**Extension not working?**
- Check that the extension is enabled (toggle is "On")
- Try refreshing the page
- Make sure you're on twitter.com or x.com
- Check the browser console for errors (F12 → Console)
**Still seeing retweets?**
- Some tweets with quotes or embedded retweets may appear (these are technically quote tweets)
- Try toggling the extension off and on again
- Reload the extension in chrome://extensions/
**Icons not showing?**
- Create icon files or temporarily comment out icon references in `manifest.json`
- Reload the extension after adding icons

## License
MIT License - feel free to modify and distribute!

## Contributing
Found a bug or want to improve the extension? Feel free to submit issues or pull requests.
