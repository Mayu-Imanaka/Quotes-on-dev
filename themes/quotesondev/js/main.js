(function () {
    function red_scripts() {
        wp_enqueue_script('jquery');
        wp_enqueue_script('red_api', get_template_directory_uri(). './api.min.js', array('jquery'), false, true);
        wp_localize_script('red_api', 'api_vars', array(
            'nonce' => wp_create_nonce('wp_rest'),
            'success' => 'Thanks, your submission was received!',
            'failure' => 'Your submission could not be processed.',
        ));
    }
    add_action('wp_enqueue_scripts', 'red_scripts');
})();