document.addEventListener("DOMContentLoaded", function() {
    // 1. Слайдер
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    // 2. Обработка формы
    const yogaForm = document.querySelector('.yoga-form');
    if (yogaForm) {
        yogaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Собираем данные
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries()); // <--- ТЕПЕРЬ DATA ЕСТЬ!

            console.log("Пытаемся отправить данные:", data);

            fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    const modal = document.getElementById('successModal');
                    if (modal) modal.style.display = 'flex';
                    this.reset();
                } else {
                    alert("Ошибка при отправке: " + response.status);
                }
            })
            .catch(error => console.error('Ошибка сети:', error));
        });
    }
});

// Функции закрытия модального окна (вне слушателя событий)
function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) modal.style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('successModal');
    if (event.target == modal) {
        closeModal();
    }
};