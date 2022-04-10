$.ajax({
  type: "GET",
  url: "../data/products.json",
  success: function (result) {
    let productHTML = '<div class="items">'
    // this for loops goes through each object
    for (let product in result) {
      productHTML += '<div class="item"><div class="product__image">';
      productHTML += '<img src="assets/images/products/' + result[product].product_img + '" alt="" srcset="">';
      productHTML += '</div><div class="product__desc">';
      productHTML += '<p class="product__title">' + result[product].product_title + '</p>';
      productHTML += '<p class="product__price">£' + result[product].product_price + '</p></div></div>';
    }
    productHTML += '</div>';
    $(".grid-item").html(productHTML);
  }
});