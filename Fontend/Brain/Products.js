import { getDiscountedPrice } from './Cells/price.js';
import { shortenText } from './Cells/titel.js';
import { renderStars } from './Cells/rating.js';

function loadProducts() {
    const container = document.querySelector('.product-container');
    const loadBtn = document.getElementById('load-more-btn'); // Updated selector
    const url = 'http://localhost:3000/api/products'; // Adjust path if needed

    let products = [];
    let currentIndex = 0;
    const batchSize = 20;

    // Fetch product data
    fetch(url)
        .then(res => res.json())
        .then(data => {
            products = data;
            renderBatch(); // Initial load
        })
        .catch(err => console.error('Failed to load products:', err));

    function renderBatch() {
        const endIndex = Math.min(currentIndex + batchSize, products.length);
        const batch = products.slice(currentIndex, endIndex);

        batch.forEach((product, index) => {
            const discountedPrice = getDiscountedPrice(product.price, product.discount);
            const shortenedName = shortenText(product.name, 30);
            const ratingId = `rating-${currentIndex + index}`; // Unique ID

            const card = document.createElement('div');
            card.className = 'product-item';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${shortenedName}</h3>
                <p>৳${discountedPrice} <span> -${product.discount}%</span></p>
                <div id="${ratingId}"></div>
            `;
            container.appendChild(card);

            // Render stars in the correct container
            renderStars(product.rating, ratingId);
        });

        currentIndex = endIndex;

        if (currentIndex >= products.length) {
            finishLoading();
        }
    }

    function finishLoading() {
        loadBtn.textContent = "You're all caught up!";
        loadBtn.disabled = true;
        loadBtn.style.backgroundColor = '#ccc';
        loadBtn.style.cursor = 'default';
    }

    // Button click event
    loadBtn.addEventListener('click', () => {
        if (currentIndex < products.length) {
            renderBatch();
        }
    });
}

loadProducts();