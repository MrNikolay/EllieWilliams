<?php
    // этот блок инициализируется после вызова wp_head()

    add_action('wp_enqueue_scripts', 'add_scripts_and_styles');  // подключание скриптов и стилей
    add_action('customize_register', 'mytheme_customize_register');  // Функция конфиг. WP-Customizer
    
    add_theme_support('custom-logo');  // добавляем возможность менять логотип
    add_filter('get_custom_logo', 'custom_logo_with_id_and_link'); # Фильтр для подставления кастомных значений в HTML, который возвращает функция get_custom_logo()

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

    function custom_logo_with_id_and_link($html) {
        $custom_id = 'header-logo';
        $custom_link = '#main-link';
    
        // Изменяем HTML-код логотипа
        $html = str_replace('<img', '<img id="' . esc_attr($custom_id) . '"', $html);
        $html = str_replace('<a href="', '<a href="' . esc_url($custom_link) . '"', $html);
    
        return $html;  // 
    }
    
    /* Настраиваем WordPress Customizer */
    function mytheme_customize_register($wp_customize) {
        // Добавление секции
        $wp_customize->add_section('my_custom_settings', array(
            'title' => __('Custom Settings', 'mytheme'),  // отображаемое название секции
            'priority' => 1,  // порядок отображения секции (чем меньше, тем выше приоритет)
        ));

        // Добавление настройки
        $wp_customize->add_setting('custom_page_title', array(
            'default' => 'Ellie Williams',  // значение по-умолчанию (используется только как подсказка в интерфейсе Customizer!)
            'sanitize_callback' => 'sanitize_text_field',  // очистка данных (функция удалит html-теги и спец. символы)
        ));

        // Добавление элемента управления (связываем настройку с секцией)
        $wp_customize->add_control('custom_page_title', array(
            'label' => __('Page Title', 'mytheme'),  // отображ. название настройки
            'section' => 'my_custom_settings',  // секция, в которую добавляется элемент
            'type' => 'text',  // тип ввода
        ));
    }
?>