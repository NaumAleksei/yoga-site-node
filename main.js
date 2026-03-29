document.addEventListener('DOMContentLoaded', () => {
    // === 1. БУРГЕР-МЕНЮ ===
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.innerHTML = nav.classList.contains('active') ? '&times;' : '&#9776;';
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.innerHTML = '&#9776;';
            });
        });
    }

    // === 2. КАРУСЕЛЬ ОТЗЫВОВ ===
    const track = document.querySelector('.carousel-track');
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');

    // Проверяем, существуют ли элементы карусели на странице
    if (track && nextButton && prevButton) {
        const slides = Array.from(track.children);
        let currentIndex = 0;

        const updateSlider = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
        };

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider(currentIndex);
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider(currentIndex);
        });

        // Автоматическая прокрутка каждые 5 секунд
        let autoPlay = setInterval(() => {
            nextButton.click();
        }, 5000);

        // Остановка автоплея при взаимодействии
        const stopAutoPlay = () => clearInterval(autoPlay);
        nextButton.addEventListener('mouseenter', stopAutoPlay);
        prevButton.addEventListener('mouseenter', stopAutoPlay);
    }
});

// === 3. МОДАЛЬНОЕ ОКНО (Глобальные функции) ===
function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    }
}

function openModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Закрытие по клику на фон
window.addEventListener('click', (event) => {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        closeModal();
    }
});