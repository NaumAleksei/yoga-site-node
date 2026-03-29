document.addEventListener('DOMContentLoaded', () => {
    // 1. Бургер-меню
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.innerHTML = nav.classList.contains('active') ? '&times;' : '&#9776;';
        });
    }

    // 2. Карусель (Логика)
    const track = document.querySelector('.carousel-track');
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    
    if (track && nextButton && prevButton) {
        const slides = Array.from(track.children);
        let currentIndex = 0;

        const updateSlider = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
        };

        nextButton.addEventListener('click', () => {
            currentIndex++;
            if (currentIndex >= slides.length) currentIndex = 0;
            updateSlider(currentIndex);
        });

        prevButton.addEventListener('click', () => {
            currentIndex--;
            if (currentIndex < 0) currentIndex = slides.length - 1;
            updateSlider(currentIndex);
        });

        // Автопрокрутка
        setInterval(() => {
            nextButton.click();
        }, 5000);
    }
});

// Глобальные функции для модалки (вне DOMContentLoaded)
function openModal() {
    const modal = document.getElementById('successModal');
    if (modal) modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) modal.style.display = 'none';
}