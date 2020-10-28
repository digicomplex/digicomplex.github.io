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
                    // essentials().global().scrollReveal();
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

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}