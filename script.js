/* 
  РЕАЛИЗАЦИЯ КАРУСЕЛИ ФОТОГРАФИЙ (СЛАЙДЕРА) В БЛОКЕ "PORTFOLIO"
*/

// Первоначальное объявление ссылок на элементы слайдера и инициализация переменных
const photoSlider = document.querySelector('.photo-slider');

const prevBtn = document.querySelector('button.prev-btn');
const nextBtn = document.querySelector('button.next-btn');

const sliderItems = document.getElementsByClassName('slider-item');

let currentIndex = 5;  // по-умолчанию показываем фото прекрасной девушки
updateSlider();

function updateSlider() {
  /* На основе текущего индекса фотографии делаем сдвиг слайдера влево (перемещаемся направо)
    таким образом, чтобы достичь нужной фотографии */

  // Вычисляем это значение динамически, так как размер изображения может измениться (если напр. пользователь изменит ширину окна)
  const photoSliderStyles = window.getComputedStyle(photoSlider);
  const slideElement = photoSlider.querySelector('.slider-item');
  const gap = parseFloat(photoSliderStyles.gap || 0); // Получаем значение gap или 0
  const slideWidth = slideElement.offsetWidth + gap;
  
  // Зацикливание индекса (эффект бесконечной прокрутки)
  if (currentIndex < 0) {
      currentIndex = sliderItems.length - 1;
  } else if (currentIndex >= sliderItems.length) {
      currentIndex = 0;
  }

  // выделяем текущее фото, делая его активным
  sliderItems[currentIndex].classList.add('active');

  // фикс поломки слайдера при увеличении ширины экрана (больше 500 пикс.)
  let k = 0;
  if(window.innerWidth > 500) {
    k = 0.5 * (window.innerWidth - 500);
  }

  // делаем прокрутку к нужному изображению
  const shiftAmount = -currentIndex * slideWidth + 110 + k;
  photoSlider.style.transform = `translateX(${shiftAmount}px)`;
}

prevBtn.addEventListener('click', function() {
  sliderItems[currentIndex].classList.remove('active');
  currentIndex--;
  updateSlider();
});

nextBtn.addEventListener('click', function() {
  sliderItems[currentIndex].classList.remove('active');
  currentIndex++;
  updateSlider();
});

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