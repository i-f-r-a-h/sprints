/*===============================================================================

    Table of contents

    1.variables and constants
    2.function:display error
    3.function:display success

    FORM
    4.email validation
    5.password validation
    6.confirm password validation
    7.age verification
    8.checkbox verification
    9.success/error animation

===============================================================================*/



window.addEventListener("DOMContentLoaded", function () {

    //1.variables and constants
    const submit = document.querySelector('input[type="button"]');
    let checkbox = document.querySelector('input[type="checkbox"]');
    let password = document.querySelector('#pwd');
    let email = document.querySelector('#email');
    let confirmPwd = document.querySelector('#confirmPwd');
    var age = document.querySelector('.age');
    let validation = /^([a-zA-Z0-9\._-]+)@([a-zA-Z0-9\._-]+).([a-z]{2,10})$/;


    //2.function:display error
    function displayError(id, message) {
        document.querySelector(`.error--${id}`).style.display = 'block';
        document.querySelector(`.error--${id}`).style.transition = '5s ease-in';
        document.querySelector(`.error--${id}`).textContent = `${message}`;
    }


    //3.function:display success
    function success(target) {
        document.querySelector(`.error--${target}`).style.display = 'none';
        document.querySelector(`#${target}`).className += " success";
    }




    submit.addEventListener('click', (e) => {
        //4.email validation
        if (email.value == '') {
            displayError('email', 'blank: please enter an email');
        } else if (!email.value.match(validation)) {
            displayError('email', 'Invalid: incorrect formatting. Include @ and .domain');
        } else {
            success('email');
        }

        //5.password validation
        if (password.value == '' || password.value == null || password.value.indexOf(' ') >= 0) {
            displayError('pwd', 'blank: please enter a password without any blanks');
        } else if (password.value.length > 0 && password.value.length < 8) {
            displayError('pwd', 'length: password should be more than 8 characters');
        } else {
            success('pwd');
        }

        //6.confirm password validation
        if (confirmPwd.value == '') {
            displayError('confirmPwd', 'confirm pwd should not be blank');
        } else if (password.value !== confirmPwd.value) {
            displayError('confirmPwd', 'please confirm your password');
        } else {
            success('confirmPwd');
        }

        //7.age verification
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
        } else {
            displayError('age', 'invalid age');
        }

        //8.checkbox verification
        if (checkbox.checked) {
            success('check');
        } else {
            displayError('check', 'You must accept the exchange policy to purchase tickets');
        }


        //9.success animation
        if ($('.success').length > 0) {
            $(submit).addClass('send');
            $(submit).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                function (e) {
                    // code to execute after animation ends
                    $(submit).removeClass('send');
                });


            //redirect to confirmation
            $.ajax({
                type: "GET",
                url: "confirmation.html",
                success: function (result) {
                    $(".form__container").html(result);
                }
            });

        } else {
            $(submit).addClass('wobble');
            $(submit).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                function (e) {
                    // code to execute after animation ends
                    $(submit).removeClass('wobble');
                });

        }
    });

});