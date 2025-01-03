<!-- mobile-phone-resolution: 500x860 -->
<!-- до 900px - мобильная версия, больше 900px - ПК-версия -->

<!DOCTYPE html>
<html lang="en">

<head>
    <!-- <meta charset="UTF-8"> -->

    <!-- 25.12 я тут час провозился, пытаясь понять, почему медиа-запросы работают некорректно.
        Оказывается vscode добавляет этот метатег не просто так. Он сообщает браузеру подстроить
        размеры страницы под реальные размеры экрана. Особенно важно здесь "width=device-width".
        Если этого не сделать, то браузер будет отталкиваться от разрешения для больших экранов (1024 и больше), а
        значит и медиа-запросы будут применяться для таких размеров, а не под реальный размер экрана.
         Не совершай моих ошибок, используй этот метатег! -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <?php echo esc_html(get_theme_mod('custom_page_title', 'Ellie Williams')); ?>

    <!-- wp_head() и wp_footer() должны обязательно присутствовать в каждой теме. Иначе многие функции WordPress не будут работать 
     (в том числе, например, не будет отображаться полезная админская шапка, а также многие плагины могут работать некорректно). 
     Также стили и скрипты, зарегистрированные в functions.php, загружаются именно после вызова этих функций. 
     Если их не вызвать, то они не загрузятся. -->
    <?php wp_head(); ?>
</head>

<body>
    <!-- По хорошему бы вынести этот блок в header.php, но на данном сайте всего одна страница.
        Поэтому я поместил всю разметку в один файл index.php -->
    <header>
        <?php the_custom_logo(); ?>
        <!-- <a href="#main-link"><img src="logo.png" id="header-logo"></a> -->
        <nav>
            <ul class="header-menu">
                <li><a href="#about-link">About Me</a></li>
                <li><a href="#portfolio-link">Portfolio</a></li>
                <li><a href="#contact-link">Contact</a></li>
            </ul>
        </nav>
    </header>

    <!-- 
        BLOCK - MAIN PAGE
    -->
    <span id="main-link" class="offset-link-fix"></span>
    <div class="main">
        <div class="main-block">
            <h1><?php echo get_theme_mod('custom_main_title', 'Ellie Williams'); ?></h1>
            <h2><?php echo get_theme_mod('custom_main_description', 'Captured Moments <br> That Last Forever'); ?></h2>
        </div>
        <img src="<?=get_template_directory_uri();?>/assets/img/1.jpg" width="100%" class="main-desktop-photo">
    </div>

    <!-- 
        BLOCK - ABOUT ME
    -->
    <span id="about-link" class="offset-link-fix"></span>
    <div class="about-me">
        <h1 class="title">ABOUT ME</h1>
        <p class="description"><?php echo get_theme_mod('custom_about_description', 'I’m a passionate photographer who specializes in capturing authentic moments. My goal is to make every shot tell a unique story.'); ?></p>
        <?php 
            $page_id = get_the_ID();
            $repeater_data = get_post_meta($page_id, 'about_me_repeater', true);
            if (! empty($repeater_data) ) {
                foreach ( $repeater_data as $item ) {
                    echo '<div class="about-me-block ' . $item['orientation'] . '">';
                    echo '<div class="about-me-topic">' . $item['topic'] . '</div>';
                    echo '<p class="about-me-text">' . $item['description'] . '</p>';
                    echo '</div>';
                }

            } else {
                echo '<h3 style="text-align: center; margin-top:50px;">Данных для отображения нет</h3>';
            }
        ?>
    </div>

    <!-- 
        BLOCK - PORTFOLIO
    -->
    <?php 
        $repeater_data = get_post_meta($page_id, 'portfolio_repeater', true);
    ?>
    <span id="portfolio-link" class="offset-link-fix"></span>
    <div class="portfolio">
        <h1 class="title">PORTFOLIO</h1>
        
        <!-- Слайдер изображений для мобилки -->
        <div class="photo-slider-container">
            <!-- Контейнер для слайдера, скрывающий изображения, выходящие за пределы -->
            <div class="photo-slider">
                <!-- Слайдер, в котором будут находиться изображения -->
                 <?php 
                    if (! empty($repeater_data)) {
                        foreach ( $repeater_data as $image ) {
                            echo '<div class="slider-item">';
                            echo '<img src="' . $image['src'] .'" alt="' . $image['description'] .'">';
                            echo '</div>';
                        }
                    }
                 ?>

                 <!-- Рекламный баннер в конце слайдера -->
                 <div class="slider-item">
                    <div class="ad-promo">
                        Your photo<br>would look great here.
                    </div>
                </div>
            </div>
           
            <button class="prev-btn"><</button>  <!-- Кнопка для предыдущего изображения -->
            <button class="next-btn">></button> <!-- Кнопка для следующего изображения -->
        </div>

        <!-- Доска изображений для десктопа -->
        <div class="portfolio-container-desktop">
            <?php 
                if (! empty($repeater_data)) {
                    foreach ( $repeater_data as $image ) {
                        echo '<div class="portfolio-item">';
                        echo '<img src="' . $image['src'] .'" alt="' . $image['description'] .'">';
                        echo '</div>';
                    }
                }
            ?>

            <!-- Рекламный баннер в конце галереи -->
            <div class="ad-promo portfolio-item">
                Your photo<br>would look great here.
            </div>
        </div>
    </div>

    <!-- 
        BLOCK - CONTACT
    -->
    <span id="contact-link"></span>
    <div class="contact">
        <h1 class="title">CONTACT</h1>
        <p class="description"><?php echo get_theme_mod('custom_contact_description', 'I am always happy to receive your questions and suggestions.'); ?></p>
        <div class="contact-block">
            <form class="contact-form">
                <input type="text" id="name" name="name" placeholder="Name" required>
                <input type="email" id="email" name="email" placeholder="Email" required>
                <textarea id="message" name="message" placeholder="Message" required></textarea>
                <button type="submit" class="submit-button">Отправить</button>
            </form>
        </div>
    </div>

    <?php wp_footer(); ?>
</body>

</html>