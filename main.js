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

   // 1. Карусель
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track ? track.children : []);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    
    if (track && slides.length > 0) {
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

        // Автопрокрутка
        setInterval(() => nextButton.click(), 6000);
    }
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