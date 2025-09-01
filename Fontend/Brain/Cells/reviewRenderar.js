// Fontend/Brain/Cells/reviewRenderer.js

import { renderStars } from './commonFun.js';

export function renderReviewSection(jsonData, containerId) {
  const container = document.getElementById(containerId);
  if (!container || !jsonData) return;
  console.log("Hello ",jsonData, container);
  injectStyles();

  const { "rating-summary": summary, reviews } = jsonData;
  let currentIndex = 0;
  const batchSize = 5;

  container.innerHTML = `
    <div class="review-header">
      <div class="rating-summary">
        <div class="average">
          <span class="score">${summary.average.toFixed(1)}</span>
          <span class="stars">${renderStars(summary.average)}</span>
          <span class="count">${summary["total-ratings"]} Ratings</span>
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
    </div>
    <div class="review-list"></div>
    <button id="load-more-reviews">More Reviews</button>
  `;

  const list = container.querySelector('.review-list');
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

function injectStyles() {
  if (document.getElementById('review-styles')) return;

  const style = document.createElement('style');
  style.id = 'review-styles';
  style.textContent = `
    #review {
      max-width: 1200px;
      margin: 40px auto;
      border-radius: 12px;
      font-family: Arial, sans-serif;
    }

    .review-header {
      margin-bottom: 30px;
      box-shadow: 3px 4px 12px rgba(0,0,0,0.08);
      padding: 20px;
      border-radius: 15px;
      background: #fff;
    }

    .rating-summary {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
    }

    .average {
      font-size: 18px;
      text-align: left;
    }

    .average .score {
      font-size: 50px;
      font-weight: bold;
      display: block;
      margin-bottom: 4px;
    }

    .average .stars {
      color: #FFD700;
      font-size: 30px;
      display: block;
    }

    .average .count {
      color: #666;
      font-size: 14px;
      margin-top: 4px;
    }

    .distribution {
      flex: 1;
      max-width: 400px;
      margin-left: 20px;
    }

    .bar-row {
      display: flex;
      align-items: center;
      margin: 6px 0;
      font-size: 18px;
    }

    .bar-row span:first-child {
      width: 40px;
    }

    .bar {
      flex: 1;
      height: 12px;
      background: #eee;
      margin: 0 10px;
      border-radius: 10px;
      overflow: hidden;
    }

    .bar div {
      height: 100%;
      background: #FFD700;
    }

    .review-list {
      margin-top: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      padding: 20px;
      background: #fff;
      border-radius: 15px;
    }

    .review-card {
      border-top: 1px solid #eee;
      padding: 20px 0;
    }

    .review-card:first-child {
      border-top: none;
    }

    .reviewer {
      font-weight: bold;
      font-size: 16px;
    }

    .verified {
      color: green;
      font-size: 0.9rem;
      margin-left: 8px;
    }

    .stars {
      color: #FFD700;
      font-size: 1.2rem;
      margin: 6px 0;
    }

    .date {
      font-size: 0.8rem;
      color: #999;
    }

    .text {
      margin: 10px 0;
      font-size: 1rem;
      line-height: 1.5;
    }

    .images {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 10px;
    }

    .images img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 6px;
    }

    .meta {
      font-size: 0.9rem;
      color: #666;
      margin-top: 6px;
    }

    .seller-response {
      background: #f9f9f9;
      padding: 10px;
      border-left: 3px solid #007bff;
      margin-top: 12px;
      font-size: 0.95rem;
    }

    #load-more-reviews {
      display: block;
      margin: 30px auto 0;
      padding: 10px 20px;
      font-size: 1rem;
      background: #007bff;
      color: #fff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    #load-more-reviews:hover {
      background: #0056b3;
    }

    .review-card {
      border-top: 1px solid #eee;
      padding: 20px 0;
    }

    .review-card:first-child {
      border-top: none;
    }

    .reviewer {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 4px;
    }

    .verified {
      color: green;
      font-size: 0.9rem;
      margin-left: 8px;
    }

    .stars {
      color: #FFD700;
      font-size: 1.2rem;
      margin: 6px 0;
    }

    .date {
      font-size: 0.8rem;
      color: #999;
    }

    .text {
      margin: 10px 0;
      font-size: 1rem;
      line-height: 1.5;
    }

    .images {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 10px;
    }

    .images img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 6px;
    }

    .meta {
      font-size: 0.9rem;
      color: #666;
      margin-top: 6px;
    }

    .likes {
      font-size: 0.9rem;
      color: #444;
      margin-top: 6px;
    }

    .seller-response {
      background: #f9f9f9;
      padding: 10px;
      border-left: 3px solid #007bff;
      margin-top: 12px;
      font-size: 0.95rem;
    }
  `;
  document.head.appendChild(style);
}