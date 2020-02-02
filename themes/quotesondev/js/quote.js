(function ($) {
    $(function () {
        let lastPage = '';
        //1 get request wp/v2/posts
        $('#btn-another').on('click', function (event) {
            event.preventDefault();
            lastPage = document.URL;
            $.ajax({
                method: 'get',
                url:
                    qod_api.rest_url +
                    'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1',
                cache: !1
            })
                .done(function (data) {
                    const newQuote = data.shift();
                    $('.entry-content').html(newQuote.content.rendered);
                    $('.quote-author').html('- ' + newQuote.title.rendered);
                    if (newQuote._qod_quote_source && newQuote._qod_quote_source_url) {
                        $('.quote-source').html(
                            '<div class=\'quote-source\'>, <a href=\'' +
                            newQuote._qod_quote_source_url +
                            '\'>' +
                            newQuote._qod_quote_source +
                            '</a></div>'
                        );
                    } else if (
                        newQuote._qod_quote_source &&
                        !newQuote._qod_quote_source_url
                    ) {
                        $('.quote-source').html(
                            '<div class=\'quote-source\' id=\'source\'>, ' +
                            newQuote._qod_quote_source +
                            '</div>'
                        );
                    } else {
                        $('.quote-source').html('');
                    }

                    //History api to get
                    const slug = newQuote.slug;
                    const url = qod_api.home_url + '/' + slug + '/';
                    history.pushState(null, null, url);
                })

                .fail(function () { });
        });

        //Add history api popstate
        $(window).on('popstate', function () {
            if (1 === window
                .location
                .hash
                .indexOf('qm-overview')) { return !1; }
            window.location.replace(lastPage);
        });

        //2 post request for wp/v2/posts
        $('.wpcf7-form').submit(function (event) {
            const authorVal = $('input[name="quote-author"]').val();
            const quoteVal = $('textarea[name="quote"]').val();
            const sourceVal = $('input[name="source"]').val();
            const sourceURLVal = $('input[name="sourceurl"]').val();

            event.preventDefault();

            $.ajax({
                method: 'post',
                url: qod_api.rest_url + 'wp/v2/posts/',
                data: {
                    title: authorVal,
                    content: quoteVal,
                    post_status: 'publish',
                    _qod_quote_source: sourceVal,
                    _qod_quote_source_url: sourceURLVal,
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-WP-Nonce', qod_api.wpapi_nonce);
                }
            })
                .done(function () {
                    $('.submit-form').slideUp();
                    $('.hidden-message')
                        .slideDown('slow')
                })
                .fail(function () {
                    alert('Submission Failed');
                });
        });
    });
})(jQuery);