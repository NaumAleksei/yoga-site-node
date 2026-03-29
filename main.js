document.addEventListener('DOMContentLoaded', () => {
    /* --- 1. КАРУСЕЛЬ --- */
    const track = document.querySelector('.carousel-track');
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const slides = Array.from(track ? track.children : []);

    if (track && nextButton && prevButton && slides.length > 0) {
        let currentIndex = 0;
        let autoPlayTimer;

        const updateSlider = (index) => {
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

        const resetAutoPlay = () => {
            clearInterval(autoPlayTimer);
            autoPlayTimer = setInterval(showNextSlide, 5000);
        };

        nextButton.addEventListener('click', () => {
            showNextSlide();
            resetAutoPlay();
        });

        prevButton.addEventListener('click', () => {
            showPrevSlide();
            resetAutoPlay();
        });

        resetAutoPlay();
    }

    /* --- 2. ПОПАП (Безопасный блок) --- */
    const popup = document.getElementById('guidePopup');
    const closeBtn = document.getElementById('closePopupBtn');
    const guideForm = document.getElementById('popupGuideForm');

    // Проверяем наличие попапа перед тем, как вешать события
    if (popup && closeBtn) {
        let shown = localStorage.getItem('guideShown');

        const showPopup = () => {
            if (!shown) {
                popup.classList.add('show');
                // localStorage.setItem('guideShown', 'true'); // Раскомментируй это, чтобы скрыть после 1-го показа
            }
        };

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            // Показываем, если пролистали больше половины
            if (scrolled > totalHeight / 2) {
                showPopup();
            }
        });

        closeBtn.onclick = () => {
            popup.classList.remove('show');
            localStorage.setItem('guideShown', 'true'); // Считаем "просмотренным" при закрытии
        };

        window.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('show');
                localStorage.setItem('guideShown', 'true');
            }
        });

        if (guideForm) {
            guideForm.onsubmit = function(e) {
                e.preventDefault();
                alert('Спасибо! Мы отправили гайд в WhatsApp.');
                popup.classList.remove('show');
                localStorage.setItem('guideShown', 'true');
            };
        }
    }

    /* --- 3. БУРГЕР-МЕНЮ --- */
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links'); // Проверь, что в HTML именно .nav-links или nav
    if (menuToggle && nav) {
        menuToggle.onclick = () => nav.classList.toggle('active');
    }
});