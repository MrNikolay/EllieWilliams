<?php
    // этот блок инициализируется после вызова wp_head()
    add_action('wp_enqueue_scripts', 'add_scripts_and_styles');

    function add_scripts_and_styles() {
        /* Здесь мы динамически подключаем стили и скрипты */

        # Подключаем main.js перед закрывающим тегом </body>
        // имя (исп. для зависимостей), путь, зависимости, версия, загружать ли в конце (до </body>) или в <head>
        wp_enqueue_script('main', get_template_directory_uri() . '/assets/js/main.js', false, null, true);

        # Подключаем стили
        // wp_enqueue_style('main', get_stylesheet_uri());  - подключить стили темы (/main-theme/style.css)
        wp_enqueue_style('main', get_template_directory_uri() . '/assets/css/style.css');
        wp_enqueue_style('media-queries', get_template_directory_uri() . '/assets/css/media-queries.css');
        wp_enqueue_style('animations', get_template_directory_uri() . '/assets/css/animations.css');
    }
?>