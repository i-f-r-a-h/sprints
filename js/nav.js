/*===============================================================================

    Table of contents for navigation within the site

    1.variables and constants
    2.hamburger menu toggle
    3.menu link toggle
    4.account pop up toggle
    5.nav on scroll change

    IMAGE GALLERY
    6.image slider next button
    7.image slider previous button
    8.image slider autoplay

    PRODUCT SLIDER
    //9.product slider

===============================================================================*/




//1.variables and constants
const a = document.querySelectorAll('a');
const slider = document.querySelector(".slider");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const slides = document.querySelectorAll(".slide");
const slideIcons = document.querySelectorAll(".slide-icon");
const productSlider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;
const numberOfSlides = slides.length;
var playSlider;
var slideNumber = 0;

//2.hamburger menu toggle
$('.js-trigger').click(() => {
  $('.nav').toggleClass('nav-change');
});


//3.menu link toggle
a.forEach(item => {
  item.addEventListener('click', () => {
    navbar.classList.remove('nav-change');
  });
});


//4.account pop up toggle
$('.account-js').click(() => {
  $('.account').toggleClass('account-change');
});

//5.nav on scroll change
window.addEventListener('scroll', function () {
  let logo = document.querySelector('.logo-js');
  logo.classList.toggle('sticky', window.scrollY > 2);
  let header = document.querySelector('header');
  header.classList.toggle('sticky-nav', window.scrollY > 1);
});



//6.image slider next button  
nextBtn.addEventListener("click", () => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slideIcons.forEach((slideIcon) => {
    slideIcon.classList.remove("active");
  });

  slideNumber++;

  if (slideNumber > (numberOfSlides - 1)) {
    slideNumber = 0;
  }

  slides[slideNumber].classList.add("active");
  slideIcons[slideNumber].classList.add("active");
});

//7.image slider previous button
prevBtn.addEventListener("click", () => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slideIcons.forEach((slideIcon) => {
    slideIcon.classList.remove("active");
  });

  slideNumber--;

  if (slideNumber < 0) {
    slideNumber = numberOfSlides - 1;
  }

  slides[slideNumber].classList.add("active");
  slideIcons[slideNumber].classList.add("active");
});

//8.image slider autoplay
var repeater = () => {
  playSlider = setInterval(function () {
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    slideIcons.forEach((slideIcon) => {
      slideIcon.classList.remove("active");
    });

    slideNumber++;

    if (slideNumber > (numberOfSlides - 1)) {
      slideNumber = 0;
    }

    slides[slideNumber].classList.add("active");
    slideIcons[slideNumber].classList.add("active");
  }, 4000);
}
repeater();

//stop the image slider autoplay on mouseover
slider.addEventListener("mouseover", () => {
  clearInterval(playSlider);
});

//start the image slider autoplay again on mouseout
slider.addEventListener("mouseout", () => {
  repeater();
});



//9.product slider
if (productSlider) {
  productSlider.addEventListener('mousedown', (e) => {
    isDown = true;
    productSlider.classList.add('active');
    startX = e.pageX - productSlider.offsetLeft;
    scrollLeft = productSlider.scrollLeft;
  });
  productSlider.addEventListener('mouseleave', () => {
    isDown = false;
    productSlider.classList.remove('active');
  });
  productSlider.addEventListener('mouseup', () => {
    isDown = false;
    productSlider.classList.remove('active');
  });
  productSlider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - productSlider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    productSlider.scrollLeft = scrollLeft - walk;
    console.log(walk);
  });
}