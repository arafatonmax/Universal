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