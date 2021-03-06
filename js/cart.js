/*===============================================================================

    Table of contents

    1.variables and constants
    2.all event listeners
    3.update cart info
    4.load products from JSON file
    5.purchase product
    6.get product info in cart
    7.add to cart
    8.save the product in the local storage
    9.retrieve product from storage
    10.load product in cart
    11.calculate total price
    12.delete from cart
    13.display cart
    14.check if cart is empty

===============================================================================*/




// 1.variables and constants
const cartContainer = document.querySelector('.cart-container');
const productList = document.querySelector('.grid-item');
const productLists = document.querySelector('.items');
const cartList = document.querySelector('.cart-list');
const cartTotalValue = document.getElementById('cart-total-value');
const cartCountInfo = document.getElementById('cart-count-info');
let cartItemID = 1;

eventListeners();

// 2.all event listeners
function eventListeners() {
    window.addEventListener('DOMContentLoaded', () => {
        loadJSON();
        loadCart();
    });

    // show/hide cart container
    document.getElementById('cart-btn').addEventListener('click', () => {
        cartContainer.classList.toggle('show-cart-container');
    });

    // add to cart
    productList.addEventListener('click', purchaseProduct);

    // delete from cart
    cartList.addEventListener('click', deleteProduct);
}

// 3.update cart info
function updateCartInfo() {
    let cartInfo = findCartInfo();
    cartCountInfo.textContent = cartInfo.productCount;
    cartTotalValue.textContent = `£${cartInfo.total}`;
}

// 4.load products from JSON file
function loadJSON() {
    fetch('../data/products.json')
        .then(response => response.json())
        .then(data => {
            let html = '';
            data.forEach(product => {
                html += `
                <div class = "item" id="buyItems">
                    <div class = "product-img">
                        <img src = "${product.imgSrc}" alt = "product image">
                          <img class="image-hover" src="${product.imgSrc2}">
                        <button type = "button" class = "add-to-cart-btn">
                            <i class = "fas fa-shopping-cart"></i>Add To Cart
                        </button>
                    </div>

                    <div class = "product-content">
                                <div class = "product-content-left">
                        <h3 class = "product-name">${product.name}</h3>
                             <p class = "product-price">$${product.price}</p>
                               </div>
                                 <span class = "product-category">size:${product.category}</span>
                    </div>
                </div>
            `;
            });
            productLists.innerHTML = html;
        })
        .catch(error => {
            alert(`Error: Use live server or local server to load JSON data`);
        })
}


// 5.purchase product
function purchaseProduct(e) {
    if (e.target.classList.contains('add-to-cart-btn')) {
        let product = e.target.parentElement.parentElement;
        getProductInfo(product);
    }
}

// 6.get product info in cart
function getProductInfo(product) {
    let productInfo = {
        id: cartItemID,
        imgSrc: product.querySelector('.product-img img').src,
        name: product.querySelector('.product-name').textContent,
        category: product.querySelector('.product-category').textContent,
        price: product.querySelector('.product-price').textContent
    }
    cartItemID++;
    addToCartList(productInfo);
    saveProductInStorage(productInfo);
}

// 7.add to cart
function addToCartList(product) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-id', `${product.id}`);
    cartItem.innerHTML = `
   <img src = "${product.imgSrc}" alt = "product image">
        <div class = "cart-item-info">
            <p class ="cart-item-name">${product.name}</p>
            <span class ="cart-item-category">Size:<b>${product.category}</b></span>
            <span class ="cart-item-price">${product.price}</span>
        </div>

        <span class="cart-edit-link">edit order</span>

       <button type = "button" class="cart-item-del-btn">
            <i class="fa-solid fa-trash-can"></i>
        </button>
    `;
    cartList.appendChild(cartItem);
}

// 8.save the product in the local storage
function saveProductInStorage(item) {
    let products = getProductFromStorage();
    products.push(item);
    localStorage.setItem('products', JSON.stringify(products));
    updateCartInfo();
}

// 9.retrieve product from storage
function getProductFromStorage() {
    return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    // returns empty array if there isn't any product info
}

// 10.load product in cart
function loadCart() {
    let products = getProductFromStorage();
    if (products.length < 1) {
        cartItemID = 1; // if there is no any product in the local storage
    } else {
        cartItemID = products[products.length - 1].id;
        cartItemID++;
        // else get the id of the last product and increase it by 1
    }
    products.forEach(product => addToCartList(product));

    // calculate and update UI of cart info 
    updateCartInfo();

}

// 11.calculate total price
function findCartInfo() {
    let products = getProductFromStorage();
    let total = products.reduce((acc, product) => {
        let price = parseFloat(product.price.substr(1)); // removing dollar sign
        return acc += price;
    }, 0); // adding all the prices

    return {
        total: total.toFixed(2),
        productCount: products.length
    }
}

// 12.delete from cart
function deleteProduct(e) {
    let cartItem;
    if (e.target.tagName === "BUTTON") {
        cartItem = e.target.parentElement;
        cartItem.remove(); // this removes from the DOM only
    } else if (e.target.tagName === "I") {
        cartItem = e.target.parentElement.parentElement;
        cartItem.remove(); // this removes from the DOM only
    }

    let products = getProductFromStorage();
    let updatedProducts = products.filter(product => {
        return product.id !== parseInt(cartItem.dataset.id);
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts)); // updating the product list after the deletion
    updateCartInfo();
}


// 13.display cart
$('#cart-container-close').click(() => {
    $('.cart-container').toggleClass('show-cart-container');
});


// 14.check if cart is empty
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