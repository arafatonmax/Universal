function initSlider() {
    const slider = document.getElementById('slider');
    const url = 'http://localhost:3000/sliders';

    fetch(url)
        .then(res => res.json())
        .then(images => {
            let currentIndex = 0;
            let timer;

            slider.querySelectorAll('img').forEach(img => img.remove());

            images.forEach((item, i) => {
                const img = document.createElement('img');
                img.src = item.path;
                img.classList.add('slider-img');
                if (i === 0) img.classList.add('active');
                slider.appendChild(img);
            });

            const imgElements = slider.querySelectorAll('.slider-img');

            const dotsContainer = slider.querySelector('.slider-dots');
            dotsContainer.innerHTML = '';
            images.forEach((_, i) => {
                const dot = document.createElement('span');
                dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
                dot.addEventListener('click', () => {
                    slideTo(i);
                    resetTimer();
                });
                dotsContainer.appendChild(dot);
            });

            const dotElements = dotsContainer.querySelectorAll('.slider-dot');

            function updateSlider(newIndex) {
                imgElements[currentIndex].classList.remove('active');
                dotElements[currentIndex].classList.remove('active');

                currentIndex = newIndex;

                imgElements[currentIndex].classList.add('active');
                dotElements[currentIndex].classList.add('active');
            }

            function slideNext() {
                const nextIndex = (currentIndex + 1) % images.length;
                updateSlider(nextIndex);
            }

            function slidePrev() {
                const prevIndex = (currentIndex - 1 + images.length) % images.length;
                updateSlider(prevIndex);
            }

            function slideTo(index) {
                if (index === currentIndex) return;
                updateSlider(index);
            }

            function resetTimer() {
                clearInterval(timer);
                timer = setInterval(slideNext, 5000);
            }

            // Button events
            slider.querySelector('.slider-btn-left').onclick = () => {
                slidePrev();
                resetTimer();
            };
            slider.querySelector('.slider-btn-right').onclick = () => {
                slideNext();
                resetTimer();
            };

            timer = setInterval(slideNext, 5000);
        })
        .catch(err => console.error('Slider load error:', err));
}

initSlider();