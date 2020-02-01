(function ($) {
    $(function () {
        let lastPage = document.URL;
        //1 get request wp/v2/posts
        $('#btn-another').on('click', function (event) {
            event.preventDefault();
            lastPage = document.URL;
            $.ajax({
                method: 'get',
                url:
                    qod_api.rest_url +
                    'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
            })
                .done(function (data) {
                    const newQuote = data[0];
                    $('.entry-content').html(newQuote.content.rendered);
                    $('.quote-author').html('ー ' + newQuote.title.rendered);
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
                            '<div class=\'source\' id=\'source\'>, ' +
                            newQuote._qod_quote_source +
                            '</div>'
                        );
                    } else {
                        $('.quote-source').html('');
                    }

                    //History api to get
                    const slug = newQuote.slug;
                    console.log(slug);
                    const url = qod_api.home_url + '/' + slug + '/';
                    console.log(url);
                    history.pushState(null, null, url);
                })

                .fail(function () { });
        });

        //Add history api popstate to forward and back buttons
        $(window).on('popstate', function () {
            window.location.replace(lastPage);
        });

        //2 post request for wp/v2/posts
        $('.').on('submit', function (event) {
            const authorVal = $('.quote-author').val();
            const quoteVal = $('.quote').val();
            const sourceVal = $('.source').val();
            const sourceURLVal = $('.sourceurl').val();

            event.preventDefault();

            $.ajax({
                method: 'post',
                url: qod_api.rest_url + 'wp/v2/posts/',
                data: {
                    title: authorVal,
                    content: quoteVal,
                    _qod_quote_source: sourceVal,
                    _qod_quote_source_url: sourceURLVal
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-WP-Nonce', qod_api.wpapi_nonce);
                }
            })
                .done(function () {
                    $('.submit-form').slideUp();
                    $('.hidden-message')
                        .slideDown()
                        .delay(1800);
                })
                .fail(function () {
                    alert('Submission Failed');
                });
        });
    });
})(jQuery);