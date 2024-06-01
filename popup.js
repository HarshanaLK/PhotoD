document.addEventListener('DOMContentLoaded', () => {
  const imageList = document.getElementById('imageList');
  const refreshButton = document.getElementById('refresh');

  const loadImages = () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'getImages'}, (response) => {
        imageList.innerHTML = ''; // Clear the list before loading new images
        response.images.forEach((url, index) => {
          const li = document.createElement('li');

          const img = document.createElement('img');
          img.src = url;
          img.alt = `Image ${index + 1}`;

          const button = document.createElement('button');
          button.textContent = `Download ${index + 1}`;
          button.addEventListener('click', () => {
            chrome.runtime.sendMessage({
              action: 'downloadImage',
              url: url,
              filename: `image_${index + 1}.jpg`
            });
          });

          li.appendChild(img);
          li.appendChild(button);
          imageList.appendChild(li);
        });
      });
    });
  };

  // Initial load of images
  loadImages();

  // Reload images on refresh button click
  refreshButton.addEventListener('click', loadImages);
});
