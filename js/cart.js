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