$.ajax({
  type: "GET",
  url: "../data/products.json",
  success: function (result) {
    let productHTML = '<div class="items">'
    // this for loops goes through each object
    for (let product in result) {
      productHTML +=
        `<div class="item">
                <div class="product__image">
                    <img src="assets/images/products/${result[product].product_img}" alt="" srcset="">
                    <button class="add-to-cart">Quick add</button> 
                </div> 
                <div class="product__desc">
                            <p class="product__title">${result[product].product_title}</p>
                            <p class="product__price">£${result[product].product_price}</p>
                </div>
            </div>`;
    }
    productHTML += '</div>';
    $(".grid-item").html(productHTML);


    // add to cart
    // $('.add-to-cart').click(function (e) {
    //   if (e.target) {
    //     for (let i in result) {
    //       if (result.hasOwnProperty(i)) {
    //         console.log(` <li> The first name is:${Object.keys(result[i].product_stock)}`);
    //       }
    //     }
    //   }
    // });
  }
});