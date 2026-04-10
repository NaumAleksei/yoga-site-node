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

                fetch('/api/send-telegram', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, phone, time, type: '🎁 ГАЙД' })
                })
                .then(response => {
                    if (response.ok) {
                        if (typeof ym !== 'undefined') {
                            ym(108172717, 'reachGoal', 'GIFT_ORDER');
                        }
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
        }
    }

    /* --- 8. МОДАЛЬНОЕ ОКНО: ОБРАТНЫЙ ЗВОНОК --- */
    const callbackModal = document.getElementById('callback-modal');
    // Ищем все кнопки с классом .open-callback (для десктопа и мобилки)
    const openCallbackBtns = document.querySelectorAll('.open-callback'); 
    const closeCallback = document.getElementById('close-callback');
    const callbackForm = document.getElementById('callback-form');

    if (callbackModal && openCallbackBtns.length > 0) {
        openCallbackBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                callbackModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        const hideModal = () => {
            callbackModal.style.display = 'none';
            document.body.style.overflow = '';
        };

        closeCallback?.addEventListener('click', hideModal);
        
        window.addEventListener('click', (e) => {
            if (e.target === callbackModal) hideModal();
        });
    }

    if (callbackForm) {
        callbackForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = callbackForm.querySelector('.cta-button');
            const originalBtnText = submitBtn.innerText;
            
            // Визуальный фидбек
            submitBtn.innerText = 'Отправка...';
            submitBtn.disabled = true;

            const data = {
                name: document.getElementById('callback-name').value,
                phone: document.getElementById('callback-phone').value,
                time: new Date().toLocaleTimeString(),
                type: '📞 ЗАКАЗ ЗВОНКА'
            };

            try {
                const response = await fetch('/api/send-telegram', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Заявка отправлена! Свяжусь с вами в ближайшее время.');
                    callbackForm.reset();
                    callbackModal.style.display = 'none';
                    document.body.style.overflow = '';
                } else {
                    throw new Error('Server Error');
                }
            } catch (err) {
                console.error('Ошибка:', err);
                alert('Произошла ошибка. Напишите нам в Telegram напрямую.');
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
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