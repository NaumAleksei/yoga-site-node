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
        // Проверяем, видел ли пользователь окно ранее
        let isPopupShown = localStorage.getItem('guideShown'); 

        const showPopup = () => {
            if (!isPopupShown) {
                popup.classList.add('show');
                isPopupShown = true; // Помечаем как показанное в текущей сессии
            }
        };

        // Условия автоматического показа
        setTimeout(showPopup, 5000); // Через 5 секунд после загрузки

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const threshold = document.documentElement.scrollHeight * 0.3; 
            if (scrolled > threshold) showPopup();
        });

        document.addEventListener('mouseleave', (e) => {
            if (e.clientY < 0) showPopup();
        });

        // Закрытие окна
        closeBtn.onclick = () => {
            popup.classList.remove('show');
            localStorage.setItem('guideShown', 'true');
        };
        
        window.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('show');
                localStorage.setItem('guideShown', 'true');
            }
        });

        // Отправка в Telegram
        if (guideForm) {
            guideForm.onsubmit = function(e) {
                e.preventDefault();

                const token = "8333117641:AAHr9lfejJ5Stss5V0dWbBm9y7Bpy4gz3WE";
                const chatId = "1730787950";

                const name = this.userName ? this.userName.value : 'Не указано';
                const phone = this.userPhone ? this.userPhone.value : 'Не указано';
                
                // Очистка номера для ссылки (оставляем только цифры)
                const cleanPhone = phone.replace(/\D/g, '');

                // Красивый текст сообщения с Markdown
                const message = `🚀 *Новая заявка на ГАЙД!*\n\n👤 *Имя:* ${name}\n📞 *Телефон:* ${phone}`;

                // Кнопка для быстрой связи в Telegram (через поиск по номеру)
                const keyboard = {
                    inline_keyboard: [[
                        { text: "✉️ Написать в Telegram", url: `https://t.me/${cleanPhone.startsWith('7') ? '+' + cleanPhone : cleanPhone}` }
                    ]]
                };

                const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&parse_mode=Markdown&reply_markup=${encodeURIComponent(JSON.stringify(keyboard))}`;

                fetch(url)
                .then(response => {
                    if (response.ok) {
                        alert('Спасибо! Ваш гайд открывается в новой вкладке.');
                        window.open('https://yoga34.ru/guide.pdf', '_blank'); 
                        popup.classList.remove('show');
                        localStorage.setItem('guideShown', 'true');
                    } else {
                        alert('Ошибка отправки. Проверьте бота.');
                    }
                })
                .catch(err => {
                    console.error('Ошибка:', err);
                });
            };
        }
    }

    /* --- 3. БУРГЕР-МЕНЮ --- */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links'); 
    
    if (menuToggle && navLinks) {
        menuToggle.onclick = () => {
            navLinks.classList.toggle('active');
        };
    }
});