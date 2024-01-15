<?php
/**
 * Plugin Name: Pagecoder Speech
 * Description: A custom text-to-speech plugin 
 * Version: 2.00
 * Author: pagecoder
 */



// Enqueue pagecoder-speech.js
function pagecoder_speech_scripts() {
    wp_enqueue_script('pagecoder-speech-js', plugin_dir_url(__FILE__) . 'pagecoder-speech9.js', array('jquery'), '1.6', true);
       // Register the style
    wp_register_style('pagecoder-speech-style', plugin_dir_url(__FILE__) . 'pagecoder-speech-style9.css', array(), '1.2', 'all');

    // Enqueue the style
    wp_enqueue_style('pagecoder-speech-style');

    if (!wp_style_is('font-awesome', 'enqueued')) {
        // Enqueue Font Awesome
        wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css', array(), '5.15.3');
    }
}

add_action('wp_enqueue_scripts', 'pagecoder_speech_scripts');







function pagecoder_speech_button($atts) {
    $attributes = shortcode_atts(array(
        'breadcrumbs' => 'no'
    ), $atts);

    if ($attributes['breadcrumbs'] === 'yes') {
        // Just return an empty string or a placeholder for JavaScript to target
        return '<div id="pagecoder-speech-placeholder"></div>';
    } else {
        return '<button id="pagecoder-speak-button"><i id="pagecoder-speak-icon" class="fa fa-volume-up"></i><span id="pagecoder-speak-text">Lees voor</span></button>';
    }
}
add_shortcode('pagecoder_speech', 'pagecoder_speech_button');









?>
