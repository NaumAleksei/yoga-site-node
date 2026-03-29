document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const slides = Array.from(track ? track.children : []);

    if (track && nextButton && prevButton && slides.length > 0) {
        let currentIndex = 0;

        const moveSlide = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
        };

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            moveSlide(currentIndex);
            console.log('Клик вперед, индекс:', currentIndex);
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            moveSlide(currentIndex);
            console.log('Клик назад, индекс:', currentIndex);
        });

        // Автоплей
        setInterval(() => {
            nextButton.click();
        }, 5000);
    } else {
        console.error("Карусель не найдена! Проверь классы в HTML.");
    }

    // Бургер (если есть)
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    if (menuToggle && nav) {
        menuToggle.onclick = () => {
            nav.classList.toggle('active');
        };
    }
});