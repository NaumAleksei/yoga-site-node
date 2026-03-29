document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const slides = Array.from(track ? track.children : []);

    if (track && nextButton && prevButton && slides.length > 0) {
        let currentIndex = 0;

        // Принудительно задаем ширину слайдам, чтобы текст не тянулся
        const setSlideWidth = () => {
            const width = track.parentElement.getBoundingClientRect().width;
            slides.forEach(slide => {
                slide.style.width = width + 'px';
            });
        };
        
        setSlideWidth();
        window.addEventListener('resize', setSlideWidth);

     const updateSlider = (index) => {
    // Двигаем трек влево на 100% * номер слайда
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
        setInterval(() => nextButton.click(), 5000);
        
        console.log("Карусель готова, слайдов:", slides.length);
    } else {
        console.log("Элементы карусели не найдены. Проверь классы в HTML.");
    }

    // Логика бургер-меню (если нужно)
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    if (menuToggle && nav) {
        menuToggle.onclick = () => nav.classList.toggle('active');
    }
});