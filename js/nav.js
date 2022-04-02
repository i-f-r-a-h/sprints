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

      if(slideNumber > (numberOfSlides - 1)){
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

      if(slideNumber < 0){
        slideNumber = numberOfSlides - 1;
      }

      slides[slideNumber].classList.add("active");
      slideIcons[slideNumber].classList.add("active");
    });

    //image slider autoplay
    var playSlider;

    var repeater = () => {
      playSlider = setInterval(function(){
        slides.forEach((slide) => {
          slide.classList.remove("active");
        });
        slideIcons.forEach((slideIcon) => {
          slideIcon.classList.remove("active");
        });

        slideNumber++;

        if(slideNumber > (numberOfSlides - 1)){
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
/*
let delay = 3000; //ms

const slides = document.querySelector(".slides");
const slidesCount = slides.childElementCount;
const maxLeft = (slidesCount - 1) * 100 * -1;

let current = 0;

function changeSlide(next = true) {
  if (next) {
    current += current > maxLeft ? -100 : current * -1;
  } else {
    current = current < 0 ? current + 100 : maxLeft;
  }

  slides.style.left = current + "%";
  //add animation here
  // slides.style.opacity = "0.2";
}

let autoChange = setInterval(changeSlide, delay);
const restart = function () {
  clearInterval(autoChange);
  autoChange = setInterval(changeSlide, delay);
};


const stop = () => { 
  clearInterval(autoChange);
}

// Controls
document.querySelector(".next-slide").addEventListener("click", function () {
  changeSlide();
  restart();
});

document.querySelector(".prev-slide").addEventListener("click", function () {
  changeSlide(false);
  restart();
});

document.querySelector(".play-btn").addEventListener("click", function () {
  changeSlide();
  restart();
});

document.querySelector(".stop-btn").addEventListener("click", function () {
  stop();
});

document.querySelector(".timer-btn").addEventListener("click", function () {
   delay = 1000; //ms
}); 
*/