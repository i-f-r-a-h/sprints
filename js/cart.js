   $('#cart-container-close').click(() => {
       $('.cart-container').toggleClass('show-cart-container');
   });



   // check if cart is empty
   $(document).on("click", function () {
       if (!$.isEmptyObject($.find('.cart-item'))) {
           $('.cart-alert').hide();

       } else {
           $('.cart-alert').css({
               "text-align": "center",
               "padding": "100px 0"
           }).show();
       }
   });




   // mouse
   var cursor = $(".cursor"),
       follower = $(".cursor-follower");

   var posX = 0,
       posY = 0,
       mouseX = 0,
       mouseY = 0;

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