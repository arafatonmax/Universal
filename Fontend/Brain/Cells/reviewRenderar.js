// Fontend/Brain/Cells/reviewRenderer.js

export function renderReviewSection(jsonData, containerId = 'review') {
  const container = document.getElementById(containerId);
  if (!container || !jsonData) return;

  const { "rating-summary": summary, reviews } = jsonData;
  let currentIndex = 0;
  const batchSize = 5;

  container.innerHTML = `
    <div class="review-header">
      <h2>Ratings & Reviews</h2>
      <div class="summary-box">
        <div class="average-rating">
          <div class="score">${summary.average.toFixed(1)}</div>
          <div class="stars">${renderStars(summary.average)}</div>
          <div class="count">${summary["total-ratings"]} Ratings</div>
        </div>
        <div class="distribution">
          ${Object.entries(summary.distribution).sort((a, b) => b[0] - a[0]).map(([star, count]) => `
            <div class="bar-row">
              <span>${star} ★</span>
              <div class="bar"><div style="width:${(count / summary["total-ratings"]) * 100}%"></div></div>
              <span>${count}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div id="review-list"></div>
      <button id="load-more-reviews">Load More</button>
    </div>
  `;

  const list = container.querySelector('#review-list');
  const loadBtn = container.querySelector('#load-more-reviews');

  function renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '⯨' : '') + '☆'.repeat(empty);
  }

  function renderReviewCard(review) {
    return `
      <div class="review-card">
        <div class="reviewer">
          ${review["user-name"]}
          ${review.verified ? '<span class="verified">✔ Verified Purchase</span>' : ''}
        </div>
        <div class="stars">${renderStars(review.rating)}</div>
        <div class="date">${formatDate(review.date)}</div>
        <div class="text">${review.text}</div>
        ${review.images?.length ? `
          <div class="images">
            ${review.images.map(img => `<img src="${img}" alt="Review Image">`).join('')}
          </div>` : ''}
        ${review["color-family"] ? `<div class="meta">Color Family: ${review["color-family"]}</div>` : ''}
        ${review.likes ? `<div class="likes">👍 ${review.likes}</div>` : ''}
        ${review["seller-response"] ? `
          <div class="seller-response">
            <strong>Seller Response:</strong> ${review["seller-response"].text}
          </div>` : ''}
      </div>
    `;
  }

  function renderBatch() {
    const endIndex = Math.min(currentIndex + batchSize, reviews.length);
    const batch = reviews.slice(currentIndex, endIndex);
    batch.forEach(review => {
      list.innerHTML += renderReviewCard(review);
    });
    currentIndex = endIndex;

    if (currentIndex >= reviews.length) {
      loadBtn.textContent = "You're all caught up!";
      loadBtn.classList.add('disabled');
      loadBtn.disabled = true;
    }
  }

  renderBatch();

  loadBtn.addEventListener('click', () => {
    if (!loadBtn.disabled) renderBatch();
  });
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}