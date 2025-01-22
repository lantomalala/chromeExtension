# Multi Link Chrome Extension

## Description
This Chrome extension allows users to input a list of links separated by `<!LIST!>` and automatically processes them to open each link in a new tab. The extension is designed for efficiency and user convenience, handling a large number of URLs with custom limits and intervals.

## Features
- Accepts links in a specific format, separated by `<!LIST!>`
- Validates each link to ensure it is properly formatted
- Opens valid links in new tabs while skipping invalid entries
- Configurable options for:
  - Maximum number of links to open
  - Time intervals between opening tabs
- Logs processed links with success and error messages

## Installation
1. Clone or download this repository to your local machine
2. Open Google Chrome and navigate to `chrome://extensions/`
3. Enable **Developer Mode** (toggle switch in the top-right corner)
4. Click on **Load unpacked** and select the project folder

## Usage
1. Open the extension by clicking its icon in the Chrome toolbar
2. Paste a list of URLs into the input field in the format:
   ```
   https://example1.com<!LIST!>https://example2.com<!LIST!>https://example3.com
   ```
3. Click the process button to start opening the links in new tabs
4. View the log area to monitor the progress and status of each link

## File Structure
```
MultiLinkExtension/
├── popup.js           # Core logic for processing and opening links
├── generalUtil.js     # Utility functions for options, logging, and DOM manipulation
├── manifest.json      # Chrome extension configuration
├── popup.html         # User interface of the extension
├── styles.css         # Styling for the popup UI
```

## Configuration Options
- **Maximum Links**: Set the limit for the number of links to process in one session. Configured via `defaultLinksLimit` in `generalUtil.js`.
- **Interval Time**: Adjust the delay (in milliseconds) between opening tabs. Configured via `defaultIntervalTime` in `generalUtil.js`.

## Developer Guide
### Adding New Features
- Extend `popup.js` for new functionalities related to link processing
- Use `generalUtil.js` for common utility functions
- Update `manifest.json` to include additional permissions or scripts if needed

### Debugging
- Use Chrome's Developer Tools (`Ctrl+Shift+I` or `Cmd+Option+I`) to inspect the console and debug the extension

## License
This project is licensed under the MIT License. Feel free to use and modify it as needed.