chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'downloadImage') {
    chrome.downloads.download({
      url: message.url,
      filename: message.filename
    }, (downloadId) => {
      sendResponse({downloadId: downloadId});
    });
    return true; // Keep the message channel open for sendResponse
  }
});
