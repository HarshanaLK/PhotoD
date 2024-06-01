chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getImages') {
    const images = Array.from(document.getElementsByTagName('img')).map(img => img.src);
    sendResponse({images: images});
  }
});
