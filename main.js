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

        nextButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Чтобы клик не "проваливался"
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
        // Пока тестируем, shown всегда false. Потом вернешь localStorage.
        let shown = false; 

        const showPopup = () => {
            if (!shown) {
                popup.classList.add('show');
                shown = true; 
            }
        };

        // Показ через 5 сек
        setTimeout(showPopup, 5000);

        // Показ при скролле 30%
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const threshold = document.documentElement.scrollHeight * 0.3; 
            if (scrolled > threshold) showPopup();
        });

        // Показ при уходе с вкладки
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY < 0) showPopup();
        });

        // Закрытие
        closeBtn.onclick = () => popup.classList.remove('show');
        window.addEventListener('click', (e) => {
            if (e.target === popup) popup.classList.remove('show');
        });

        // Отправка в Telegram
        if (guideForm) {
            guideForm.onsubmit = function(e) {
                e.preventDefault();

                const token = "8333117641:AAHr9lfejJ5Stss5V0dWbBm9y7Bpy4gz3WE";
                const chatId = "1730787950";

                const name = this.userName.value;
                const phone = this.userPhone.value;
                const message = `🚀 Новая заявка на ГАЙД!\n👤 Имя: ${name}\n📞 Телефон: ${phone}`;

                const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

                fetch(url)
                    .then(response => {
                        if (response.ok) {
                            alert('Спасибо! Ваш гайд открывается в новой вкладке.');
                            window.open('https://yoga34.ru/guide.pdf', '_blank'); 
                            popup.classList.remove('show');
                            localStorage.setItem('guideShown', 'true');
                        } else {
                            alert('Ошибка отправки в Telegram. Проверьте настройки бота.');
                        }
                    })
                    .catch(err => console.error('Ошибка сети:', err));
            };
        }
    }

    /* --- 3. БУРГЕР-МЕНЮ --- */