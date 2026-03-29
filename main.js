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

   /* --- 2. ПОПАП (Улучшенная версия) --- */
const popup = document.getElementById('guidePopup');
const closeBtn = document.getElementById('closePopupBtn');
const guideForm = document.getElementById('popupGuideForm');

if (popup && closeBtn) {
    // ВАЖНО: Пока тестируешь, закомментируй строку с localStorage ниже, 
    // чтобы окно всплывало КАЖДЫЙ раз при обновлении.
    // let shown = localStorage.getItem('guideShown'); 
    let shown = false; // Для тестов ставим false

    const showPopup = () => {
        if (!shown) {
            popup.classList.add('show');
            // localStorage.setItem('guideShown', 'true'); // Включишь, когда всё доделаем
            shown = true; 
        }
    };

    // А) Показать через 5 секунд после загрузки
    setTimeout(showPopup, 5000);

    // Б) Показать при скролле (если пролистали 30% страницы)
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const threshold = document.documentElement.scrollHeight * 0.3; 
        if (scrolled > threshold) {
            showPopup();
        }
    });

    // В) Показать, если мышка уходит вверх (попытка закрыть вкладку)
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
        if (guideForm) {
    guideForm.onsubmit = function(e) {
        e.preventDefault();

        // --- НАСТРОЙКИ (Вставь свои данные) ---
        const token = "8333117641:AAHr9lfejJ5Stss5V0dWbBm9y7Bpy4gz3WE";
        const chatId = "1730787950";
        // ---------------------------------------

        const name = this.userName.value;
        const phone = this.userPhone.value;
        const message = `🚀 Новая заявка на ГАЙД!\n👤 Имя: ${name}\n📞 Телефон: ${phone}`;

        const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

  fetch(url)
.then(response => {
    if (response.ok) {
        // 1. Показываем сообщение об успехе
        alert('Спасибо! Ваш гайд открывается в новой вкладке.');
        
        // 2. АВТОМАТИЧЕСКИЙ ОТКРЫТИЕ ФАЙЛА
        // Убедись, что файл guide.pdf лежит в корне сайта
        window.open('https://yoga34.ru/guide.pdf', '_blank'); 
        
        // 3. Закрываем попап
        popup.classList.remove('show');
        localStorage.setItem('guideShown', 'true');
    }
});
    }
}

    /* --- 3. БУРГЕР-МЕНЮ --- */
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links'); // Проверь, что в HTML именно .nav-links или nav
    if (menuToggle && nav) {
        menuToggle.onclick = () => nav.classList.toggle('active');
    }
});