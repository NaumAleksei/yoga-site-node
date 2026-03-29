document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const slides = Array.from(track ? track.children : []);

    const popup = document.getElementById('guidePopup');
    const closeBtn = document.getElementById('closePopupBtn');
    let shown = localStorage.getItem('guideShown'); // Проверка, видели ли уже окно

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

    const showPopup = () => {
        if (!shown) {
            popup.classList.add('show');
            localStorage.setItem('guideShown', 'true'); // Больше не показываем
        }
    };

    // 1. Появление при скролле 50%
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrolled > totalHeight / 2) {
            showPopup();
        }
    });

    // 2. Закрытие
    closeBtn.onclick = () => popup.classList.remove('show');
    window.onclick = (e) => { if (e.target == popup) popup.classList.remove('show'); };

    // 3. Отправка формы
    document.getElementById('popupGuideForm').onsubmit = function(e) {
        e.preventDefault();
        alert('Спасибо! Мы отправили гайд в WhatsApp.');
        popup.classList.remove('show');
    };

    // Логика бургер-меню (если нужно)
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    if (menuToggle && nav) {
        menuToggle.onclick = () => nav.classList.toggle('active');
    }
});