// Fontend/Brain/Cells/productRenderer.js

import { getDiscountedPrice } from './commonFun.js';

export function renderProductDetails(product, containerId, { onAddToCart, onToggleWishlist, isWishlisted }) {
  const container = document.getElementById(containerId);
  const images = product.details['d-images'].map(img => img['d-image']);
  const currentPrice = getDiscountedPrice(product.price, product.discount);
  console.log(container, images, currentPrice);

  const HtmlCode = 
  `
    <div class="product-gallery">
      <div class="main-img">
        <button class="image-nav-btn left-btn">←</button>
        <img id="main-image" src="${images[0]}" alt="Main Product Image" />
        <button class="image-nav-btn right-btn">→</button>
        <div class="wishlist-icon">${isWishlisted ? '💔' : '❤️'}</div>
      </div>
      <div class="thumbnails">
        ${images.map(img => `<img src="${img}" alt="Thumbnail">`).join('')}
      </div>
    </div>

    <div class="product-details">
      <h2 id="product-name">${product.name}</h2>
      ${product.details['brand-status'] ? `<p class="brand">Brand: <span id="brand-name">${product.details.brand}</span></p>` : ''}
      <p class="price">
        <span class="current">৳${currentPrice}</span>
        <span class="old">৳${product.price}</span>
        <span class="discount">-${product.discount}%</span>
      </p>

      ${product.details['color-status'] ? `
        <p class="color">Color:</p>
        <div class="color-thumbnails">
          ${Object.entries(product.details.color).map(([color, url]) => `<img src="${url}" alt="${color}">`).join('')}
        </div>` : ''}

      ${product.details['size-status'] ? `
        <p class="size">Size:</p>
        <div class="size-options">
          ${product.details.size.map((size, i) => `<span class="size-option ${i === 0 ? 'size-option-active' : ''}">${size}</span>`).join('')}
        </div>` : ''}

      <div class="quantity">
        <button class="qty-btn" onclick="decreaseQty()">-</button>
        <input type="text" id="quantity" value="1" />
        <button class="qty-btn" onclick="increaseQty()">+</button>
      </div>

      <div class="buttons">
        <button class="buy">Buy Now</button>
        <button class="cart">Add to Cart</button>
      </div>

      <div class="delivery">
        <p><strong>Delivery:</strong> Standard Delivery (${getDeliveryRange(product.details['d-time'])})</p>
        <p><strong>Cash on Delivery:</strong> ${product.details['cash-on-delivery'] ? 'Available' : 'Not Available'}</p>
        ${product.details.returnable?.status ? `
          <p><strong>Returns:</strong> ${product.details.returnable.time} ${product.details.returnable.type}</p>
          <p><strong>Condition:</strong> ${product.details.returnable.condition.details}</p>
        ` : `<p><strong>Returns:</strong> Not Returnable</p>`}
        ${product.details.warranty?.status ? `
          <p><strong>Warranty:</strong> ${product.details.warranty.time} ${product.details.warranty.type}</p>
        ` : `<p><strong>Warranty:</strong> No Warranty</p>`}
      </div>
    </div>
  `;

  container.innerHTML = HtmlCode;

  // Image navigation
  let currentIndex = 0;
  const mainImg = container.querySelector('#main-image');
  const leftBtn = container.querySelector('.left-btn');
  const rightBtn = container.querySelector('.right-btn');

  if (!mainImg) {
    console.error('Main image element not found in container:', containerId);
    return;
  }
  
  // ensure initial src
  mainImg.src = images[0] ?? '';

  const showImage = (index) => {
    currentIndex = (index + images.length) % images.length;
    mainImg.src = images[currentIndex];
  };

  if (leftBtn) leftBtn.addEventListener('click', () => showImage(currentIndex - 1));
  if (rightBtn) rightBtn.addEventListener('click', () => showImage(currentIndex + 1));

  // Thumbnail click
  container.querySelectorAll('.thumbnails img').forEach((thumb, i) => {
    thumb.addEventListener('click', () => showImage(i));
  });

  // Wishlist toggle
  const wishlistIcon = container.querySelector('.wishlist-icon');
  if (wishlistIcon) {
    wishlistIcon.addEventListener('click', () => {
      onToggleWishlist();
      renderProductDetails(product, containerId, {
        onAddToCart,
        onToggleWishlist,
        isWishlisted: !isWishlisted
      });
    });
  }

  // Cart button
  const cartBtn = container.querySelector('.cart');
  if (cartBtn) cartBtn.addEventListener('click', onAddToCart);

  // Buy Now button
  const buyBtn = container.querySelector('.buy');
  if (buyBtn) buyBtn.addEventListener('click', () => {
    window.location.href = `/checkout.html?id=${product['_id']}`;
  });

}

function getDeliveryRange(days) {
  const today = new Date();
  const start = new Date(today.getTime() + days * 86400000);
  const end = new Date(today.getTime() + (days + 4) * 86400000);
  const options = { day: 'numeric', month: 'short' };
  return `${start.toLocaleDateString('en-US', options)}–${end.toLocaleDateString('en-US', options)}`;
}