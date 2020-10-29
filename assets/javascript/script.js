$(document).ready(function () {
    // set slug in select2
    autoInitiateComplex();

    // Scroll to hyperlink
    if (essentials().isTabletOrPhone()) {
        $("a").smoothScroll({speed: 500, offset: -90});
    } else {
        $("a").smoothScroll({speed: 500, offset: -90});
    }

    // Background video
    $("video[data-playback]").each(function () {
        $(this).get(0).playbackRate = $(this).data("playback");
    });

    // Scroll to reveal
    AOS.init({offset: 0});

    // Menu
    $(".hamburger").on("click", function () {
        $(this).toggleClass("is-active");
        var $body = $("body");
        $body.toggleClass("navigation-toggled");
    });

    $("#aa-search-input").select2({
        placeholder: "Search for your complex...",
        minimumInputLength: 0,
        ajax: {
            delay: 300,
            url: "https://db.getstaxapp.com/v1/graphql",
            type: "POST",


            data: function (params) {
                var data = "%" + (params["term"] || "") + "%";
                var query = JSON.stringify({
                    query: `{
                    complexes(where: {name: {_like: "%${data}%"}}) {
                        name
                        slug
                    }
                    }`,
                });
                return query;
            },
            dataType: "json",
            processResults: function (data) {
                obj = [];
                data.data.complexes.forEach((element) => {
                    obj.push({
                        id: element["slug"],
                        text: element["name"],
                        slug: element["slug"],
                    });
                });
                return {
                    results: obj,
                };
            },
            // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
        },
    });

    $("#aa-search-input").on("select2:select", function (e) {
        var data = e.params.data;
        $("[name='complex_slug']").val(data["slug"]);
        $("[name='complex_name']").val(data["text"]);
    });

    // Sign up
    $("#intent").on("submit", function (e) {
        $("#submit .spinner").removeClass("d-none");
        $("#submit .text").addClass("d-none");
        e.preventDefault();
        console.log("*********************");
        var formData = $(this).serializeArray(),
            dataObj = {},
            complexName = $("[name='complex_name']").val();
        complexSlug = $("[name='complex_slug']").val();
        formData.forEach((element) => {
            dataObj[element["name"]] = element["value"];
        });

        var mutation = `
            mutation insert_single_article($object: [users_insert_input!]!) {
                insert_users(objects: $object) {
                affected_rows
                }
            }`;
        $.ajax({
            url: "https://db.getstaxapp.com/v1/graphql",
            type: "POST",

            data: JSON.stringify({
                query: mutation,
                variables: {
                    object: dataObj,
                },
            }),
            success: function (response) {

                var slug = complexSlug;

                localStorage.setItem("complex", complexName);
                localStorage.setItem("slug", slug);

                $("#submit .text").removeClass("d-none");

                $("#submit .spinner").addClass("d-none");
                // $(".message")
                //     .text("Congratulations! 🙌 You are now a part of DigiComplex!!!")
                //     .addClass("text-success");
                openCompletedModal(complexSlug);
            },
            error: function () {
                $("#submit .text").removeClass("d-none");
                $("#submit .spinner").addClass("d-none");
                $(".message").text("Something went wrong....").addClass("text-danger");
            },
        });
    });

    // Url contains complex
    if (getParam("complex")) {
        $("#aa-search-input").val(getParam("complex")).trigger("change");
    }

    // Share WhatsApp
    $(".share-whatsapp").on("click", function (e) {
        var userCount = (localStorage.getItem('user_count') > 25) ? 0 : (25 - localStorage.getItem('user_count'))
        var complex = localStorage.getItem('complex');
        var slug = localStorage.getItem('slug');
        var message = `https://api.whatsapp.com/send?text=Hi! I just found out that we can have a private social network exclusively for our apartment complex. Interesting right? Check out Digicomplex and let's sign-up to get it activated fast @ https://www.digicomplex.co`
        if (slug) {
            message =
                `https://api.whatsapp.com/send?text=Hey, I just signed up ${complex || ""} for Digicomplex. They will create a private network just for us! We need ${userCount} more registrations before Digicomplex comes to ${complex || "us"}. Go sign up now @ https://www.digicomplex.co?complex=${slug || ""}`
        }
        window.open(
            message
        );

        e.preventDefault();
    });

    // Share Telegram
    $(".share-telegram").on("click", function (e) {
        var userCount = (localStorage.getItem('user_count') > 25) ? 0 : (25 - localStorage.getItem('user_count'))
        var complex = localStorage.getItem('complex');
        var slug = localStorage.getItem('slug');
        var message = `https://telegram.me/share/url?url=https://www.digicomplex.co&text=Hi! I just found out that we can have a private social network exclusively for our apartment complex. Interesting right? Check out Digicomplex and let's sign-up to get it activated fast @ https://www.digicomplex.co`
        if (slug) {
            message =
                `https://telegram.me/share/url?url=https://www.digicomplex.co?complex=${slug || ""} &text=Hey, I just signed up ${complex || ""}  for Digicomplex. They will create a private network just for us! We need ${userCount} more registrations before Digicomplex comes to ${complex || "us"} . Go sign up now @ https://www.digicomplex.co?slug=${slug || ""}`
        }
        window.open(
            message
        );

        e.preventDefault();
    });

    // Share copy
    $(".share-copy").on("click", function (e) {
        var message = `Hi! I just found out that we can have a private social network exclusively for our apartment complex. Interesting right? Check out Digicomplex and let's sign-up to get it activated fast @ https://www.digicomplex.co`
        if (localStorage.getItem('slug')) {
            message =
                `Hey, I just signed up for Digicomplex. They will create a private network just for us! We need just a few more registrations before Digicomplex comes to our complex! Go sign up now @ https://www.digicomplex.co?slug=${localStorage.getItem('slug') || ""} !`
        }
        copy(
            message
        );
        console.log(e);
        $(".share-copy").html(`<i class="fal fa-check-double"></i>`);
        setTimeout(function () {
            $(".share-copy").html(`<i class="fal fa-clipboard"></i>`);
        }, 5000);
        alert("Message copied to clipboard")
        e.preventDefault();
    });
});

// Header opacity
$(document).scroll(function () {
    $("body").toggleClass(
        "scrolled",
        $(this).scrollTop() > $(".navbar").height()
    );
});

// Button hide on bottom
var $window = $(window),
    $document = $(document),
    button = $(".btned");

button.css({
    opacity: 1,
});

$window.on("scroll", function () {
    if ($window.scrollTop() + $window.height() == $document.height()) {
        button.stop(true).animate(
            {
                opacity: 0,
            },
            450
        );
    } else {
        button.stop(true).animate(
            {
                opacity: 1,
            },
            450
        );
    }
});

function openCompletedModal(complexSlug) {
    var query = `
        query aggregate_user_count($input: String!) {
            complexes(where: {slug: {_eq: $input}}) {
                users_count
            }
        }`;
    $.ajax({
        url: "https://db.getstaxapp.com/v1/graphql",
        type: "POST",
        data: JSON.stringify({
            query: query,
            variables: {
                input: complexSlug,
            },
        }),
        success: function (data) {
            var count = data.data.complexes[0].users_count;
            $(".data-number-of-people").text(
                data.data.complexes[0].users_count
            );
            localStorage.setItem("user_count", JSON.stringify(count));

            if (parseFloat(count) && parseFloat(count) / 25.0 > 0) {
                var ratio = parseFloat(count) / 25.0
                var width = ratio * 100
                if (ratio > 1) {
                    width = 100;
                }
                $('.progress-bar.progress-bar-striped').css('width', `${width}%`)
            }

            if (Math.random() < 0.5) {
                $("#modal-complete").modal("show");
            } else {
                $("#modal-success").modal("show");
            }


        },
    });
}

function autoInitiateComplex() {
    var urlParams = new URLSearchParams(location.search),
        params = null;
    for (const [key, value] of urlParams) {
        params = value
    }
    if (urlParams.has('slug')) {
        var query = `
        query MyQuery($input: String!) {
            complexes(where: {slug: {_eq: $input}}) {
            id
            name
            slug
        }
      }`,
            slug = '';
        $.ajax({
            url: "https://db.getstaxapp.com/v1/graphql",
            type: "POST",
            headers: {
                "x-hasura-access-key": "bella40deplorel98houston86enfant55house",
            },
            data: JSON.stringify({
                query: query,
                variables: {
                    input: params,
                },
            }),
            success: function (data) {
                if (data.data.complexes.length > 0) {
                    var appendData = data.data.complexes[0]

                    var newOption = new Option(appendData.name, appendData.id, false, false);
                    $("#aa-search-input").append(newOption).trigger('change');
                }
            },
        });

    }
}

// Header Change Color on Scroll
$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar-fixed-top");
        $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    });
});
