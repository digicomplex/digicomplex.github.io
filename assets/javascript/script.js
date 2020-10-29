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


    $("#aa-search-input").select2({
        ajax: {
            delay: 300,
            placeholder: "Search for your complex...",
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
                        slug
                    }
                    }`
                })
                return query
            },
            dataType: 'json',
            processResults: function (data) {
                obj = []
                data.data.complexes.forEach(element => {
                    obj.push({"id":element['id'], text: element["name"],slug: element["slug"]})
                });
                return {
                    results: obj
                };
            }
                // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
        },
    })

    $('#aa-search-input').on('select2:select', function (e) {
        var data = e.params.data;
       $("[name='complex_slug']").val(data["slug"])
    });

    
    // Sign up
    $('#intent').on('submit', function (e) {
        $("#submit .spinner").removeClass('d-none')
        $("#submit .text").addClass('d-none')
        e.preventDefault();
        console.log('*********************')
        var formData = $( this ).serializeArray()
        data_obj ={}
        formData.forEach(element => {
            data_obj[element['name']] = element['value'] 
        });
        console.log(data_obj)
        // data_obj = {
        //     mobile: "9869925100",
        //     complex_slug: "saiven-siesta"
        // }
        // console.log(data_obj)
        var mutation = `
            mutation insert_single_article($object: users_insert_input!) {
                insert_users_one(object: $object) {
                id
                created_at
                complex_slug
                mobile
                }
            }`;
        $.ajax({
            url: 'https://db.getstaxapp.com/v1/graphql',
            type: 'POST',
            headers: {
                "x-hasura-access-key": "bella40deplorel98houston86enfant55house"

            },
            data:  JSON.stringify({
                    query: mutation,
                    variables: {
                        object: data_obj
                      
                    },
                  }),
            success: function(data){
                localStorage.setItem("user", data.data.insert_users_one.id);
                localStorage.setItem("slug", data.data.insert_users_one.complex_slug);
                $("#submit .text").removeClass('d-none')
                $("#submit .spinner").addClass('d-none')
                $(".message").text("You succeccfully signed in.....").addClass('text-success')
                
            },
            error: function(){
                $("#submit .text").removeClass('d-none')
                $("#submit .spinner").addClass('d-none')
                $(".message").text("Something went wrong").addClass('text-danger')
            }      
          }).done(function(data) {
            localStorage.setItem("user", data.data.insert_users_one.id);
            localStorage.setItem("slug", data.data.insert_users_one.complex_slug);

        });
       
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

// Button hide on bottom
var $window = $(window),
    $document = $(document),
    button = $('.btned');

button.css({
    opacity: 1
});

$window.on('scroll', function () {
    if (($window.scrollTop() + $window.height()) == $document.height()) {
        button.stop(true).animate({
            opacity: 0
        }, 450);
    } else {
        button.stop(true).animate({
            opacity: 1
        }, 450);
    }
});

// Header Change Color on Scroll
$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar-fixed-top");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
      });
  });