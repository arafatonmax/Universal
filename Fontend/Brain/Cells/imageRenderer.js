export function renderImageGallery(images, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  let currentIndex = 0;

  const img = document.createElement('img');
  img.src = images[currentIndex];
  img.alt = 'Product Image';
  container.appendChild(img);

  const next = () => {
    currentIndex = (currentIndex + 1) % images.length;
    img.src = images[currentIndex];
  };

  const prev = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    img.src = images[currentIndex];
  };

  return { next, prev };
}