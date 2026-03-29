document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const slides = Array.from(track ? track.children : []);

    if (track && nextButton && prevButton && slides.length > 0) {
        let currentIndex = 0;
        let autoPlayTimer;

        const updateSlider = (index) => {
            // Двигаем строго по процентам
            track.style.transform = `translateX(-${index * 100}%)`;
        };

        const showNextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider(currentIndex);
        };

        const showPrevSlide = () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider(currentIndex);
        };

        // Функция перезапуска таймера
        const resetAutoPlay = () => {
            clearInterval(autoPlayTimer);
            autoPlayTimer = setInterval(showNextSlide, 5000); // 5 секунд
        };

        nextButton.addEventListener('click', () => {
            showNextSlide();
            resetAutoPlay(); // Сбрасываем таймер при ручном клике
        });

        prevButton.addEventListener('click', () => {
            showPrevSlide();
            resetAutoPlay(); // Сбрасываем таймер при ручном клике
        });

        // Запуск при загрузке
        resetAutoPlay();

    }

    // Логика бургер-меню (если нужно)
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    if (menuToggle && nav) {
        menuToggle.onclick = () => nav.classList.toggle('active');
    }
});