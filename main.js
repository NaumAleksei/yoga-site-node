document.addEventListener('DOMContentLoaded', () => {
    // 1. Бургер-меню
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.innerHTML = nav.classList.contains('active') ? '&times;' : '&#9776;';
        });

        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.innerHTML = '&#9776;';
            });
        });
    }
});

// 2. Функции модального окна
// Выносим их из DOMContentLoaded, чтобы атрибут onclick="closeModal()" в HTML мог их найти
function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
        // Возвращаем прокрутку страницы, если вы её отключали
        document.body.style.overflow = 'auto'; 
    }
}

// Закрытие по клику на серый фон вокруг окна
window.onclick = function(event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Функция открытия (вызывайте её в обработчике отправки формы)
function openModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'flex'; // Используем flex, чтобы окно было по центру
        document.body.style.overflow = 'hidden'; // Запрещаем прокрутку при открытом окне
    }
}