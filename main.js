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
    
    // Проверяем наличие трека и кнопок
    if (track && nextButton && prevButton) {
        const slides = Array.from(track.children);
        let currentIndex = 0;

        const updateSlider = (index) => {
            // Двигаем трек
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

        // Автопрокрутка
        setInterval(() => {
            nextButton.click();
        }, 6000);
    }
}); // <--- ВОТ ЭТА СКОБКА БЫЛА ПРОПУЩЕНА!

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

window.addEventListener('click', (event) => {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        closeModal();
    }
});