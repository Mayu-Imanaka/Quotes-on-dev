(function ($) {
    $('#close-comments').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            method: 'post',
            url: red_vars.ajax_url,
            data: {
                action: 'red_comment_ajax',
                security: red_vars.comment_nonce,
                the_post_id: red_vars.post_id
            }
        }).done(function (response) {
            alert('Success! Comments are closed for this post.');
        });
    });

    function red_comment_ajax() {
        check_ajax_referer('red_comment_status', 'security');
        if (!current_user_can('edit_posts')) {
            exit;
        }
        $id = $_POST['the_post_id'];
        if (isset($id) && is_numeric($id)) {
            $the_post = array(
                'ID' => $id,
                'comment_status' => 'closed'
            );
            wp_update_post($the_post);
        }
        exit;
    }
    add_action('wp_ajax_red_comment_ajax', 'red_comment_ajax');
})(jQuery);
 // add_action( 'wp_ajax_nopriv_red_comment_ajax', 'red_comment_ajax' );