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
        // Когда закончишь тесты, замени false на localStorage.getItem('guideShown')
        let isPopupShown = localStorage.getItem('guideShown'); 

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

                // Отправляем данные через твой защищенный API в Vercel
                fetch('/api/send-telegram', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, phone, time })
                })
                .then(response => {
                    if (response.ok) {
                        // 1. ОТПРАВЛЯЕМ ЦЕЛЬ В МЕТРИКУ
                        if (typeof ym !== 'undefined') {
                            ym(108172717, 'reachGoal', 'GIFT_ORDER');
                        }
                        
                        // 2. СОХРАНЯЕМ СОСТОЯНИЕ И РЕДИРЕКТИМ
                        localStorage.setItem('guideShown', 'true');
                        alert('Спасибо! Сейчас откроется ваш гайд.');
                        window.location.assign('https://yoga34.ru/guide.pdf');
                    } else {
                        alert('Ошибка отправки. Попробуйте позже.');
                    }
                })
                .catch(err => {
                    console.error('Ошибка:', err);
                    // Даже если ошибка сети, даем скачать файл
                    window.location.assign('https://yoga34.ru/guide.pdf');
                });
            }; // Конец onsubmit
        } // Конец if guideForm
    } // Конец if popup

    // 8. МОДАЛЬНОЕ ОКНО: ОБРАТНЫЙ ЗВОНОК
    const callbackModal = document.getElementById('callback-modal');
    const openCallback = document.getElementById('open-callback');
    const closeCallback = document.getElementById('close-callback');
    const callbackForm = document.getElementById('callback-form');

    if (openCallback && callbackModal) {
        openCallback.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            callbackModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        closeCallback?.addEventListener('click', () => {
            callbackModal.style.display = 'none';
            document.body.style.overflow = '';
        });

        callbackModal.addEventListener('click', (e) => {
            if (e.target === callbackModal) {
                callbackModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    if (callbackForm) {
        callbackForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const data = {
                name: document.getElementById('callback-name').value,
                phone: document.getElementById('callback-phone').value,
                type: '📞 Запрос обратного звонка'
            };

            const success = await sendToTelegram(data);

            if (success) {
                alert('Заявка отправлена! Свяжусь с вами в ближайшее время.');
                callbackForm.reset();
                callbackModal.style.display = 'none';
                document.body.style.overflow = '';
            } else {
                alert('Произошла ошибка. Напишите нам в Telegram напрямую.');
            }
        });



    /* --- 3. БУРГЕР-МЕНЮ --- */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links'); 
    if (menuToggle && navLinks) {
        menuToggle.onclick = () => {
            navLinks.classList.toggle('active');
        };
    }
});