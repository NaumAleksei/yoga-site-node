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
        // Для тестов ставим false, чтобы видеть окно всегда. 
        // Когда закончишь — замени на localStorage.getItem('guideShown')
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

                const token = "8333117641:AAHr9lfejJ5Stss5V0dWbBm9y7Bpy4gz3WE";
                const chatId = "1730787950";

                const name = this.userName.value || 'Не указано';
                const phone = this.userPhone.value || 'Не указано';
                const cleanPhone = phone.replace(/\D/g, '');
                const time = new Date().toLocaleTimeString(); // Чтобы видеть, что код обновился

                // Сообщение с Markdown форматированием
                const message = `🔥 *НОВАЯ ЗАЯВКА (в ${time})*\n\n👤 *Имя:* ${name}\n📞 *Телефон:* ${phone}`;

                // Кнопки: Telegram + WhatsApp (на выбор)
                const keyboard = {
                    inline_keyboard: [
                        [
                            { text: "✉️ Написать в TG", url: `https://t.me/+${cleanPhone.startsWith('7') ? cleanPhone : '7' + cleanPhone}` },
                            { text: "💬 В WhatsApp", url: `https://wa.me/${cleanPhone}` }
                        ]
                    ]
                };

                const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&parse_mode=Markdown&reply_markup=${encodeURIComponent(JSON.stringify(keyboard))}`;

                fetch(url)
                .then(response => {
                    if (response.ok) {
                        alert('Спасибо! Ваш гайд открывается.');
                        window.open('https://yoga34.ru/guide.pdf', '_blank'); 
                        popup.classList.remove('show');
                    } else {
                        alert('Ошибка бота. Проверьте консоль.');
                    }
                })
                .catch(err => console.error('Ошибка:', err));
            };
        }
    }

    /* --- 3. БУРГЕР-МЕНЮ --- */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links'); 
    if (menuToggle && navLinks) {
        menuToggle.onclick = () => navLinks.classList.toggle('active');
    }
});