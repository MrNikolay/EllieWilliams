<?php
    // этот блок инициализируется после вызова wp_head()

    /* 
       ------------------------------------------
       ( Динамически подключаем стили и скрипты )
       ------------------------------------------
    */

    add_action('wp_enqueue_scripts', 'add_scripts_and_styles');  // регистрируем функцию, которая будет ответственна за подключение скриптов и стилей

    /* Здесь мы динамически подключаем стили и скрипты */
    function add_scripts_and_styles() {
        # Подключаем main.js перед закрывающим тегом </body>
        // имя (исп. для зависимостей), путь, зависимости, версия, загружать ли в конце (до </body>) или в <head>
        wp_enqueue_script('main', get_template_directory_uri() . '/assets/js/main.js', false, null, true);

        # Подключаем стили
        // wp_enqueue_style('main', get_stylesheet_uri());  - подключить стили темы (/main-theme/style.css)
        wp_enqueue_style('main', get_template_directory_uri() . '/assets/css/style.css');
        wp_enqueue_style('media-queries', get_template_directory_uri() . '/assets/css/media-queries.css');
        wp_enqueue_style('animations', get_template_directory_uri() . '/assets/css/animations.css');
    }

    /* 
       ---------------------------
       ( Настраиваем Custom Logo )
       ---------------------------
    */

    add_theme_support('custom-logo');  // добавляем возможность менять логотип
    add_filter('get_custom_logo', 'custom_logo_with_id_and_link'); # Фильтр для подставления кастомных значений в HTML, который возвращает функция get_custom_logo()

    /* Фильтр для custom_logo, чтобы определить ссылку и id */
    function custom_logo_with_id_and_link($html) {
        $custom_id = 'header-logo';
        $custom_link = '#main-link';
    
        // Изменяем HTML-код логотипа
        $html = str_replace('<img', '<img id="' . esc_attr($custom_id) . '"', $html);
        $html = str_replace('<a href="', '<a href="' . esc_url($custom_link) . '"', $html);
    
        return $html;  // 
    }
    
    /* 
       ------------------------------------
       ( Настраиваем WordPress Customizer )
       ------------------------------------
    */

    add_action('customize_register', 'mytheme_customize_register');  // функция, ответственная за настройку WordPress Customizer

    function mytheme_customize_register($wp_customize) {
        // Добавление секции "Custom Settings"
        $wp_customize->add_section('my_custom_settings', array(
            'title' => __('General Custom Settings', 'mytheme'),  // отображаемое название секции
            'priority' => 1,  // порядок отображения секции (чем меньше, тем выше приоритет)
        ));

        /* Добавление настройки Page Title */
        $wp_customize->add_setting('custom_page_title', array(
            'default' => 'Ellie Williams',  // значение по-умолчанию (используется только как подсказка в интерфейсе Customizer!)
            'sanitize_callback' => 'sanitize_text_field',  // очистка данных (функция удалит html-теги и спец. символы)
        ));

        $wp_customize->add_control('custom_page_title', array(
            'label' => 'Page Title',  // отображ. название настройки
            'section' => 'my_custom_settings',  // секция, в которую добавляется элемент
            'type' => 'text',  // тип ввода
        ));

        /* Добавление настройки Main Title */
        $wp_customize->add_setting('custom_main_title', array(
            'default' => 'Ellie Williams',
            'sanitize_callback' => 'sanitize_text_field',
        ));

        $wp_customize->add_control('custom_main_title', array(
            'label' => 'Main Preview Title',
            'section' => 'my_custom_settings',
            'type' => 'text',
        ));

        /* Добавление настройки Main Description */
        $wp_customize->add_setting('custom_main_description', array(
            'default' => 'Captured Moments<br>That Last Forever',
            'sanitize_callback' => 'sanitize_br_tags_only',
        ));

        $wp_customize->add_control('custom_main_description', array(
            'label' => 'Main Preview Description',
            'section' => 'my_custom_settings',
            'type' => 'text',
        ));

        /* Добавление настройки About Description */
        $wp_customize->add_setting('custom_about_description', array(
            'default' => 'I’m a passionate photographer who specializes in capturing authentic moments. My goal is to make every shot tell a unique story.',
            'sanitize_callback' => 'sanitize_text_field',
        ));

        $wp_customize->add_control('custom_about_description', array(
            'label' => 'About-Me Description',
            'section' => 'my_custom_settings',
            'type' => 'text',
        ));

        /* Добавление настройки Contact Description */
        $wp_customize->add_setting('custom_contact_description', array(
            'default' => 'I am always happy to receive your questions and suggestions.',
            'sanitize_callback' => 'sanitize_text_field',
        ));

        $wp_customize->add_control('custom_contact_description', array(
            'label' => 'Contact Description',
            'section' => 'my_custom_settings',
            'type' => 'text',
        ));
    }

    /* Функция очистки для кастомного поля custom_main_description */
    function sanitize_br_tags_only( $input ) {
        return wp_kses( $input, array(
            'br' => array() // Разрешаем только <br> теги
        ));
    }

    /* 
       ------------------------------------------------
       ( Настраиваем плагин CMB2 для функции Repeater )
       ------------------------------------------------
    */

    add_action( 'cmb2_admin_init', 'register_repeater_metabox' );

    function register_repeater_metabox() {
        $cmb = new_cmb2_box( array(
            'id'           => 'repeater_metabox',
            'title'        => 'Повторитель',
            'object_types' => array('page'),
        ) );

        $group_field_id = $cmb->add_field(array(
            'id'          => 'custom_repeater',
            'type'        => 'group',
            'description' => 'Добавьте несколько элементов',
            'options'     => array(
                'group_title'   => 'Элемент {#}', // Название для каждого повторяющегося элемента
                'add_button'    => 'Добавить элемент',
                'remove_button' => 'Удалить элемент',
                'sortable'      => true, // Возможность менять порядок элементов
            ),
        ));

        // Поля внутри повторителя
        $cmb->add_group_field( $group_field_id, array(
            'name' => 'Topic',
            'id'   => 'topic_field',
            'type' => 'text',
        ) );

        $cmb->add_group_field( $group_field_id, array(
            'name' => 'Description',
            'id'   => 'description_field',
            'type' => 'textarea_small',
        ) );

        $cmb->add_group_field( $group_field_id, array(
            'name' => 'Orientation (left or right)',
            'id'   => 'orientation_field',
            'type' => 'textarea_small',
        ) );

        // Также есть типы: textarea, text_url, text_email, text_date, text_time, colorpicker, file, image и др.
    }
?>