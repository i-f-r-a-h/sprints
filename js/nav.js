const menuIcon = document.querySelector('.js-trigger');
const navbar = document.querySelector('.nav');
const menuLink = document.querySelector('.nav__list-item');
const a = document.querySelectorAll('a');

//when the hamburger is clicked, menu opens
menuIcon.addEventListener('click', () => {
  navbar.classList.toggle('nav-change');
});
//when a link is clicked, menu closes
a.forEach(item => {
  item.addEventListener('click', () => {
    navbar.classList.remove('nav-change');
  });
});

//account
const account = document.querySelector('.account-js');
const displayAccount = document.querySelector('.account')
account.addEventListener('click', () => {
  displayAccount.classList.toggle('account-change');
});

//nav on scroll change
window.addEventListener('scroll', function () {
  let logo = document.querySelector('.logo-js');
  logo.classList.toggle('sticky', window.scrollY > 2);

  let header = document.querySelector('header');
  header.classList.toggle('sticky-nav', window.scrollY > 1);
  // when the user scrolls past 400 the colour changes of the header.
});


//gallery

const slider = document.querySelector(".slider");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const slides = document.querySelectorAll(".slide");
const slideIcons = document.querySelectorAll(".slide-icon");
const numberOfSlides = slides.length;
var slideNumber = 0;

//image slider next button  
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

//image slider previous button
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

//image slider autoplay
var playSlider;

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



// slider
const productSlider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;
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







setTimeout(function () {
  $('.text-wrapper').css('display', 'none');
}, 4000);



//gallery
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