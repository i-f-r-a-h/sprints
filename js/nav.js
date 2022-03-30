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