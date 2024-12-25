/* Отключаем автоматическое восстановление прокрутки
    (при обновлении страницы мы всегда будем видеть верхнюю часть */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}


/*
    ПЛАВНОЕ ПОЯВЛЕНИЕ ТЕКСТА В ABOUT-ME ПО МЕРЕ ПРОКРУТКИ
      СТРАНИЦЫ ЧЕРЕЗ ТРИГГЕРЫ
*/

function scrollHandler2() {
  const blocks = document.querySelectorAll('.about-me-block'); // Все блоки
  let allVisible = true;

  blocks.forEach((block, index) => {
    const isVisible = block.classList.contains('visible');
    const trigger = block.getBoundingClientRect().top < window.innerHeight * 0.8;

    // Если блок еще не виден и он в зоне видимости
    if (trigger && !isVisible) {
      block.classList.add('visible');
    }

    // Если хотя бы один блок не виден, продолжаем слушать scroll
    if (!block.classList.contains('visible')) {
      allVisible = false;
    }
  });

  // Если все блоки видны, убираем обработчик прокрутки
  if (allVisible) {
    document.removeEventListener('scroll', scrollHandler);
  }
}

document.addEventListener('scroll', scrollHandler2);



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
  ЛОГИКА ОТКРЫТИЯ ФОТО-КАРТОЧЕК НА ВЕСЬ ЭКРАН ПО НАЖАТИЮ НА НИХ
    (ТОЛЬКО DESKTOP)
*/

currentItem = null;  // Текущее активное изображение (по-умолчанию null)

// Обработчик нажатия на изображение
function handleImageClick(item) {
  if (item.classList.contains('active')) {
    item.classList.remove('active');
    item.nextElementSibling.remove();  // убираем "заглушку"
    currentItem = null;
    return;
  }

  // Делаем изображение активным
  currentItem = item;
  item.classList.add('active');

  // Добавляем заглушку
  item.insertAdjacentHTML('afterend', '<div class="portfolio-item"></div>');

  scrollCounter = 0;
  window.addEventListener('scroll', handleScroll);

  // Начинаем следить за скроллингом
  // setTimeout(() => {
  //   window.addEventListener('scroll', handleScroll);
  // }, 500);
};


scrollCounter = 0;  // счётчик нужен, чтобы допустить пользователю определённое кол-во скроллов
function handleScroll() {
  /* Обработчик события scroll для window
      Его задача - закрыть активное изображение в момент прокрутки страницы пользователем */
  scrollCounter++;

  if (scrollCounter >= 42) {
    if(currentItem && currentItem.classList.contains('active')) {
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