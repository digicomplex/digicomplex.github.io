$(document).ready(function () {
    essentials().init();
});

var essentials = function () {
    return {
        isTablet: function () {
            return ($(window).width() <= 1201)
        },

        isPhone: function () {
            return ($(window).width() <= 992)
        },

        isTabletOrPhone: function () {
            return ($(window).width() <= 1201)
        },

        init: function () {
            essentials().global().init();
        },

        global: function () {
            return {
                init: function () {
                    essentials().global().tooltips();
                },

                tooltips: function () {
                    $('body').tooltip({
                        selector: '[data-toggle=tooltip]'
                    });
                },

                scrollReveal: function () {
                    window.sr = ScrollReveal();
                    sr.reveal('.animated', {
                        duration: 1000,
                        delay: 100,
                        scale: 1
                    });
                }
            }
        },

        getFirstObject: function (object) {
            return object[Object.keys(object)[0]]
        }
    };
};

$.fn.exists = function () {
    return jQuery(this).length > 0;
};

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};


function copy(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        copyFallback(text);
    }
}

function copyFallback(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
    } catch (err) { }

    document.body.removeChild(textArea);
}

function getParam(sParam) {
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
