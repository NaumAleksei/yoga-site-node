document.addEventListener('DOMContentLoaded', () => {
    /* --- 1. КАРУСЕЛЬ ОТЗЫВОВ --- */
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

        nextButton.addEventListener('click', (e) => {
            e.stopPropagation();
            showNextSlide();
            resetAutoPlay();
        });

        prevButton.addEventListener('click', (e) => {
            e.stopPropagation();
            showPrevSlide();
            resetAutoPlay();
        });

        resetAutoPlay();
    }

    /* --- 2. ПОПАП ГАЙДА --- */
    const popup = document.getElementById('guidePopup');
    const closeBtn = document.getElementById('closePopupBtn');
    const guideForm = document.getElementById('popupGuideForm');

    if (popup && closeBtn) {
        // Замени на localStorage.getItem('guideShown'), когда закончишь тесты
        let isPopupShown = false; 

        const showPopup = () => {
            if (!isPopupShown) {
                popup.classList.add('show');
                isPopupShown = true; 
            }
        };

        setTimeout(showPopup, 5000);
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) showPopup();
        });

        closeBtn.onclick = () => popup.classList.remove('show');
        window.onclick = (e) => { if (e.target === popup) popup.classList.remove('show'); };

        if (guideForm) {
            guideForm.onsubmit = function(e) {
    e.preventDefault();

    const name = this.userName.value || 'Не указано';
    const phone = this.userPhone.value || 'Не указано';
    const time = new Date().toLocaleTimeString();

    // Отправляем данные не в Телеграм напрямую, а на наш сервер в Vercel
    fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, time })
    })
    .then(response => {
        if (response.ok) {
            localStorage.setItem('guideShown', 'true');
            alert('Спасибо! Сейчас откроется ваш гайд.');
            window.location.assign('https://yoga34.ru/guide.pdf');
        } else {
            alert('Ошибка отправки. Попробуйте позже.');
        }
    })
    .catch(err => {
        console.error('Ошибка:', err);
        window.location.assign('https://yoga34.ru/guide.pdf');
    });
};

                const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&parse_mode=Markdown&reply_markup=${encodeURIComponent(JSON.stringify(keyboard))}`;

                fetch(url)
                    .then(response => {
                        if (response.ok) {
                            localStorage.setItem('guideShown', 'true');
                            alert('Спасибо! Сейчас откроется ваш гайд.');
                            // Редирект для iPhone (открывает в той же вкладке)
                            window.location.assign('https://yoga34.ru/guide.pdf');
                        } else {
                            alert('Ошибка отправки формы.');
                        }
                    })
                    .catch(err => {
                        console.error('Ошибка:', err);
                        // Даже если телеграм упал, даем скачать файл
                        window.location.assign('https://yoga34.ru/guide.pdf');
                    });
            }; // Конец onsubmit
        } // Конец if guideForm
    } // Конец if popup

    /* --- 3. БУРГЕР-МЕНЮ --- */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links'); 
    if (menuToggle && navLinks) {
        menuToggle.onclick = () => {
            navLinks.classList.toggle('active');
        };
    }
});