/* 
  РЕАЛИЗАЦИЯ КАРУСЕЛИ ФОТОГРАФИЙ В БЛОКЕ "PORTFOLIO"
*/
let currentIndex = 0; // Начальный индекс
const items = document.querySelectorAll('.carousel-item');
const carousel = document.querySelector('.carousel');

// Вычисляем длину сдвига, чтобы дойти до определенного изображения
function updateCarousel() {
  const itemWidth = items[0].offsetWidth;
  const offset = -currentIndex * itemWidth; // Сдвигаем на ширину одного элемента
  carousel.style.transform = `translateX(${offset}px)`; 

  // Обновляем стиль для каждого изображения
  items.forEach((item, index) => {
    if (index === currentIndex) {
      item.style.transform = 'scale(1.2)';
      item.style.opacity = '1';
    } else {
      item.style.transform = 'scale(0.7)';
      item.style.opacity = '0.6';
    }
  });
}

function updateCarousel() {
  // Смещение на основе текущего индекса
  const offset = -currentIndex * items[0].offsetWidth; // Умножаем на ширину первого элемента
  carousel.style.transform = `translateX(${offset})`; // Применяем сдвиг

  // Обновляем стиль для каждого изображения
  items.forEach((item, index) => {
    if (index === currentIndex) {
      item.style.transform = 'scale(1.2)';
      item.style.opacity = '1';
    } else {
      item.style.transform = 'scale(0.7)';
      item.style.opacity = '0.6';
    }
  });
}
  
function moveCarousel(direction) {
  currentIndex += direction;

  // Зацикливаем индекс для переходов
  if (currentIndex < 0) {
    currentIndex = items.length - 1; // Переходим на последнюю фотографию
  } else if (currentIndex >= items.length) {
    currentIndex = 0; // Переходим на первую фотографию
  }
  updateCarousel();
}
  
// Инициализация карусели при загрузке страницы
window.addEventListener('resize', updateCarousel); // Пересчёт при изменении размеров окна
updateCarousel();


/*
  ПРОСТОЙ ОБРАБОТЧИК ОТПРАВКИ ФОРМЫ
*/
document.querySelector('.contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Получаем значения полей
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Простейшая проверка на заполнение полей
  if (name && email && message) {
    alert('Thank you for your message! I will contact you shortly.');
    document.querySelector('.contact-form').reset(); // Очищаем форму
  } else {
    alert('Please fill in all fields of the form.');
  }
});