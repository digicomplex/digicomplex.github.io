$(document).ready(function () {
    // Scroll to hyperlink
    if (essentials().isTabletOrPhone()) {
        $('a').smoothScroll({ speed: 500, offset: -90 });
    } else {
        $('a').smoothScroll({ speed: 500, offset: -90 });
    }

    // Background video
    $('video[data-playback]').each(function () {
        $(this).get(0).playbackRate = $(this).data('playback');
    });

    // Scroll to reveal
    AOS.init({ offset: 0 });

    // Menu 
    $('.hamburger').on('click', function () {
        $(this).toggleClass('is-active');
        var $body = $("body");
        $body.toggleClass('navigation-toggled');
    });

    console.log("kkk")
         $("#aa-search-input").select2({
            ajax: {
                delay: 300,
                url: 'https://db.getstaxapp.com/v1/graphql',
                type: 'POST',
                beforeSend: function(request) {
                    request.setRequestHeader("x-hasura-access-key", "bella40deplorel98houston86enfant55house");

                },
                data: function(params){
                    var data = "%"+params['term']+"%"
                    var query = JSON.stringify({ query:`{
                    complexes(where: {name: {_like: "${data}"}}) {
                        id
                        name
                    }
                    }`
                })
                return query
                },
                dataType: 'json',
                processResults: function (data) {
                    obj = []
                    data.data.complexes.forEach(element => {
                        obj.push({"id":element['id'], text: element["name"]})
                    });
                    return {
                        results: obj
                    };
                }
                // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
            },
        
            
        })


    // Sign up
    $('#intent').on('submit', function (e) {
        var c = $.post("https://agricomplex-api.herokuapp.com/api/v1/users", $("#intent")
            .serialize())
            .done(function (data) {
                var complex = data['colony'];
                var number = 25 - data.count - 1;
                var percentage = [((data.count + 1) / 25 * 100).toFixed(0), '%'].join('');
                if (((data.count + 1) / 25 * 100) >= 100) {
                    $('.data-number-of-people').text(data.count);
                    $('.data-progress').text(percentage).css('width', [100, '%'].join(''));
                    $('.data-complex').text([complex.name, complex.area].join(', '));
                    $('#modal-complete').modal('show');

                    // TODO replace with local storage
                    $('.link-replace').each(function () {
                        var href = $(this).attr('href');
                        href = href.replaceAll('#complex#', complex.name);
                        href = href.replaceAll('#number#', data.count);
                        $(this).attr('href', href);
                    });
                } else {
                    $('.data-number-of-people').text(number);
                    $('.data-progress').text(percentage).css('width', percentage);
                    $('.data-complex').text([complex.name, complex.area].join(', '));
                    $('#modal-success').modal('show');

                    // TODO replace with local storage
                    $('.link-replace').each(function () {
                        var href = $(this).attr('href');
                        href = href.replaceAll('#complex#', complex.name);
                        href = href.replaceAll('#number#', number);
                        $(this).attr('href', href);
                    });
                }

                fbq('track', 'CompleteRegistration', {
                    currency: 'inr',
                });
            });

        e.preventDefault();
    });

    // Url contains complex
    if (getParam('complex')) {
        $('#aa-search-input').val(getParam('complex')).trigger('change');
    }

    // Share WhatsApp
    $('.share-whatsapp').on('click', function (e) {
        window.open(
            'https://api.whatsapp.com/send?text=Hey, I just signed up #complex# for Digicomplex. They will create a private network just for us! We need #number# more registrations before Digicomplex comes to #complex#. Go sign up now @ https://www.digicomplex.co?complex=#slug#',
        );

        e.preventDefault();
    });

    // Share Telegram
    $('.share-telegram').on('click', function (e) {
        window.open(
            'https://telegram.me/share/url?url=https://www.digicomplex.co?complex=#slug#&text=Hey, I just signed up #complex# for Digicomplex. They will create a private network just for us! We need #number# more registrations before Digicomplex comes to #complex#. Go sign up now @ https://www.digicomplex.co?slug=#slug#',
        );

        e.preventDefault();
    });

    // Share copy
    $('.share-copy').on('click', function (e) {
        copy('Hey, I just signed up for Digicomplex. They will create a private network just for us! We need just a few more registrations before Digicomplex comes to our complex! Go sign up now @ https://www.digicomplex.co?slug=#slug#!');

        e.preventDefault();
    });

});

// Header opacity
$(document).scroll(function () {
    $("body").toggleClass('scrolled', $(this).scrollTop() > $('.navbar').height());
});

