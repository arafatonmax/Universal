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

export function getDiscountedPrice(price, discount) {
    const discounted = price - (price * discount / 100);
    return discounted.toFixed(2);
}

export function renderStars(rating, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ''; // Clear previous

    const starWrapper = document.createElement('div');
    starWrapper.className = 'star-rating';

    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.classList.add('star');

        if (rating >= i) {
            star.classList.add('full');
        } else if (rating >= i - 0.5) {
            star.classList.add('half');
        }

        starWrapper.appendChild(star);
    }

    container.appendChild(starWrapper);
}

export function shortenText(text, maxLength) {
    if (typeof text !== 'string') return '';
    return text.length > maxLength
        ? text.slice(0, maxLength).trim() + '...'
        : text;
}

export const useUrl = () =>{
  const Parse = new URLSearchParams(window.location.search);
  const qures = [...Parse];
  const obj ={};

  qures.forEach((e) => {
    obj[e[0]] = e[1];
  });
  return obj;
}

export function makeURL(e) {
  const BASE_URL = 'http://localhost:3000';
  return `${BASE_URL}${e}`;
}