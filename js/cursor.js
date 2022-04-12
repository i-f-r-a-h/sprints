/*===============================================================================

    Table of contents

    1.variables and constants
    2.cursor change
    3.animate gallery image on hover
    4.page loader

===============================================================================*/



// 1.variables and constants
var cursor = $(".cursor"),
    follower = $(".cursor-follower");

var posX = 0,
    posY = 0,
    mouseX = 0,
    mouseY = 0;


// 2. cursor change
TweenMax.to({}, 0.016, {
    repeat: -1,
    onRepeat: function () {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;

        TweenMax.set(follower, {
            css: {
                left: posX - 20,
                top: posY - 20
            }
        });

        TweenMax.set(cursor, {
            css: {
                left: mouseX,
                top: mouseY
            }
        });
    }
});

$(document).on("mousemove", function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

$(".banner img").on("mouseenter", function () {
    cursor.addClass("active-mouse");
    follower.addClass("active-mouse");
});

$(".banner img").on("mouseleave", function () {
    cursor.removeClass("active-mouse");
    follower.removeClass("active-mouse");
});


//3.animate gallery image on hover
animteHover();

function animteHover() {
    var $img = $(".slide__image");

    $img.mousemove(function (e) {
        var xPos = $(this).data("xPos");
        var yPos = $(this).data("yPos");
        var mouseX = e.pageX;
        var mouseY = e.pageY;
        var left = mouseX - xPos;
        var top = mouseY - yPos;
        var origin = "center center -300";
        var xPerc =
            ((left - $(this).data("itemWidth") / 2) / $(this).data("itemWidth")) * 200;
        var yPerc =
            ((top - $(this).data("itemHeight") / 2) / $(this).data("itemHeight")) * 200;

        TweenMax.to($(this).data("imgOuter"), 3, {
            rotationX: 0.1 * yPerc,
            rotationY: -0.1 * xPerc,
            transformOrigin: origin,
            ease: Expo.easeOut,
        });
    });

    $img.each(function () {
        $(this).data("xPos", $(this).offset().left);
        $(this).data("yPos", $(this).offset().top);
        $(this).data("itemWidth", $(this).width());
        $(this).data("itemHeight", $(this).height());
        $(this).data("imgOuter", $(this).find(".slide__image--inner"));
    });

    $img.on("mouseleave", function () {
        TweenMax.to($(this).data("imgOuter"), 3, {
            rotationX: 0,
            rotationY: 0,
            transformOrigin: origin,
            ease: Expo.easeOut,
        });
    });
}


//4.page loader
setTimeout(function () {
    $('.text-wrapper').css('display', 'none');
}, 4000);