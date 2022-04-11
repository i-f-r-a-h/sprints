window.addEventListener("DOMContentLoaded", function () {

    //variables
    const submit = document.querySelector('input[type="button"]');
    let checkbox = document.querySelector('input[type="checkbox"]');
    let password = document.querySelector('#pwd');
    let email = document.querySelector('#email');
    let confirmPwd = document.querySelector('#confirmPwd');
    var age = document.querySelector('.age');
    let validation = /^([a-zA-Z0-9\._-]+)@([a-zA-Z0-9\._-]+).([a-z]{2,10})$/;


    //function to display an error
    function displayError(id, message) {
        document.querySelector(`.error--${id}`).style.display = 'block';
        document.querySelector(`.error--${id}`).style.transition = '5s ease-in';
        document.querySelector(`.error--${id}`).textContent = `${message}`;
    }


    //function to hide error and display success
    function success(target) {
        document.querySelector(`.error--${target}`).style.display = 'none';
        document.querySelector(`#${target}`).className += " success";
    }




    submit.addEventListener('click', (e) => {
        //email
        if (!email.value.match(validation)) {
            displayError('email', 'Invalid:include @ symbol in your email');
        } else if (email.value == '') {
            displayError('email', 'blank: please enter an email');
        } else {
            success('email');
        }

        //password
        if (password.value == '' || password.value == null || password.value.indexOf(' ') >= 0) {
            displayError('pwd', 'blank: please enter a password without any blanks');
        } else if (password.value.length > 0 && password.value.length < 8) {
            displayError('pwd', 'length: password should be more than 8 characters');
        } else {
            success('pwd');
        }

        //confirm password
        if (confirmPwd.value == '') {
            displayError('confirmPwd', 'confirm pwd should not be blank');
        } else if (password.value !== confirmPwd.value) {
            displayError('confirmPwd', 'please confirm your password');
        } else {
            success('confirmPwd');
        }

        //age
        //age checker
        var today = new Date();
        var birthDate = new Date(age.value);
        var userAge = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || m === 0 && today.getDate() < birthDate.getDate()) {
            userAge--;
            if (userAge < 2) {
                displayError('age', 'you are still a baby!');
            } else if (userAge < 18) {
                let ageLeft = 18 - userAge;
                displayError('age', 'Sorry, ' + ageLeft + ' years left before you can join! (Must be 18+ to join)');
            } else {
                success('age');
            }
        } else if (age.value == '') {
            displayError('age', 'age should not be blank');
        }

        // checkbox
        if (checkbox.checked) {
            success('check');
        } else {
            displayError('check', 'You must accept the exchange policy to purchase tickets');
        }


        //only runs animation when all inputs are valid
        if (checkbox.className == ' success' &&
            age.className == ' success' &&
            confirmPwd.className == ' success' &&
            password.className == ' success' &&
            email.className == ' success') {
            submit.className += 'send';
        } else {
            submit.className += 'wobble';

        }
    });

});