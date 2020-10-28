var complexes = [
    {
        "colony": 718,
        "name": "Prestige Ferns Residency",
        "area": "Harlur",
        "count": 166
    },
    {
        "colony": 344,
        "name": "RBD Stillwaters",
        "area": "Harlur",
        "count": 120
    },
    {
        "colony": 476,
        "name": "Shriram Signia",
        "area": "Electronic City Phase I",
        "count": 93
    },
    {
        "colony": 2127,
        "name": "Purva Seasons",
        "area": "CV Raman Nagar",
        "count": 80
    },
    {
        "colony": 1064,
        "name": "CLPD Suncity Apartments",
        "area": "Sarjapur Road",
        "count": 57
    },
    {
        "colony": 364,
        "name": "Ramky One North",
        "area": "Yelahanka",
        "count": 57
    },
    {
        "colony": 262,
        "name": "Prestige Lakeside Habitat",
        "area": "Varthur",
        "count": 56
    },
    {
        "colony": 484,
        "name": "Sobha Morzaria Grandeur",
        "area": "Bannerghatta Road",
        "count": 49
    },
    {
        "colony": 901,
        "name": "Purva Fairmont",
        "area": "HSR Layout",
        "count": 49
    },
    {
        "colony": 999,
        "name": "Aratt Royal Citadel",
        "area": "Singasandra",
        "count": 47
    },
    {
        "colony": 2356,
        "name": "Oceanus Freesia Enclave",
        "area": "Bellandur",
        "count": 53
    },
    {
        "colony": 9030,
        "name": "White Cloud",
        "area": "Horamavu Agara",
        "count": 39
    },
    {
        "colony": 5150,
        "name": "Sree Utopia",
        "area": "Marathahalli",
        "count": 37
    },
    {
        "colony": 5669,
        "name": "SLV Lake Meadows",
        "area": "Singasandra",
        "count": 36
    },
    {
        "colony": 2216,
        "name": "Radiant Silver Bell II",
        "area": "ITPL Road",
        "count": 34
    },
    {
        "colony": 2225,
        "name": "Prestige Acropolis",
        "area": "Koramangala",
        "count": 33
    },
    {
        "colony": 711,
        "name": "MJR Clique Hercules",
        "area": "Electronic City Phase I",
        "count": 32
    },
    {
        "colony": 13619,
        "name": "Omkar Lake View",
        "area": "Malleshpalya",
        "count": 32
    },
    {
        "colony": 2348,
        "name": "Sobha Ruby",
        "area": "Tumkur Road",
        "count": 31
    },
    {
        "colony": 660,
        "name": "Sobha City Santorini",
        "area": "Thanisandra Main Road",
        "count": 30
    },
    {
        "colony": 7719,
        "name": "Adithi Elite",
        "area": "Marathahalli",
        "count": 29
    },
    {
        "colony": 5204,
        "name": "Vanshee RichFields",
        "area": "Marathahalli",
        "count": 27
    }
];

$(document).ready(function () {
    // Smooth scroll
    if (essentials().isTabletOrPhone()) {
        $('a').smoothScroll({
            speed: 500,
            offset: -90,
        });
    } else {
        $('a').smoothScroll({
            speed: 500,
        });
    }

    // Video playbackRate
    $('video[data-playback]').each(function () {
        $(this).get(0).playbackRate = $(this).data('playback');
    });

    // Menu
    $('.hamburger').on('click', function () {
        $(this).toggleClass('is-active');
        var $body = $("body");
        $body.toggleClass('navigation-toggled');
    });

    // Animate on scroll
    AOS.init({
        offset: 0,
        // disable: essentials().isTablet() || essentials().isPhone()
    });

    // Form submission
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

    // FBQ Tracking
    document.getElementById('submit').addEventListener('click', function () {

    }, false);

    // If society exists
    if (getUrlParameter('society')) {
        $('#aa-search-input').val(getUrlParameter('society')).trigger('change');
    }

    // List of colonies
    function generateColonies() {
        var container = $('.complexes ul');
        for(var i = 0; i < complexes.length; i++) {
            var v = complexes[i];
            var item = $('<li class="list-unstyled d-inline-block"></li>');
            item.html(['<i class="far fa-check text-primary mr-1"></i>', v.name, ', ', v.area, ' <strong class="text-primary">(', (v.count / 25 * 100).toFixed(0), '%', ')</strong>'].join(''));
            container.append(item);
        }
    }
    generateColonies();
});

$(document).scroll(function () {
    // Navbar
    var $body = $("body");
    var navbarHeight = $('.navbar').height();

    $body.toggleClass('scrolled', $(this).scrollTop() > navbarHeight);
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};