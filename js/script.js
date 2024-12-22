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


/*
  Логика для открытия изображений на весь экран по нажатию на них
  (only desktop)
*/

currentItem = null;  // Текущее активное изображение (по-умолчанию null)

function handleImageClick(item) {
  // Обработчик нажатия на изображение
  if (item.classList.contains('active')) {
    item.classList.remove('active');
    item.nextElementSibling.remove();
    return;
  }

  // Делаем изображение активным
  currentItem = item;
  item.classList.add('active');

  // Добавляем заглушку
  item.insertAdjacentHTML('afterend', '<div class="portfolio-item"></div>');

  // Начинаем следить за прокручиванием страницы (scroll)
  scrollCounter = 0;
  window.addEventListener('scroll', handleScroll);
};

function handleScroll() {
  /* Обработчик скроллинга сайта. 
  Делает изображение неактивным, если оно заходит за пределы видимой области */
  const rect = currentItem.querySelector('img').getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  // Проверка, находится ли элемент в видимой области
  const isVisible =
    rect.top < windowHeight && // верхняя часть элемента не выходит за верхний край
    rect.bottom > windowHeight / 2 // нижняя часть элемента больше половины окна

  // Делаем текущую выбранную фотографию неактивной (если она заходит за края видимой области)
  if (!isVisible) {
    if (currentItem != null) {
      // имитируем клик по изображению, чтобы его закрыть
      handleImageClick(currentItem);
    }
  
    // Перестаём следить за прокручиванием страницы (оптимизация)
    window.removeEventListener('scroll', handleScroll);
  }
}

// Получаем все изображения внутри .portfolio-container-desktop
const portfolioContainer = document.querySelector('.portfolio-container-desktop');
const portfolioItems = portfolioContainer.getElementsByClassName('portfolio-item');

// Добавляем свой обработчик события для каждого изображения
for (let i = 0; i < portfolioItems.length; i++) {
  const item = portfolioItems[i];
  const image = item.querySelector('img');
  if (image != null) {
    image.addEventListener('click', () => {
      handleImageClick(item);
    });
  }
}