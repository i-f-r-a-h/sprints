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
        if (email.value == '') {
            displayError('email', 'blank: please enter an email');
        } else if (!email.value.match(validation)) {
            displayError('email', 'Invalid: incorrect formatting. Include @ and .domain');
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

        // checkbox
        if (checkbox.checked) {
            success('check');
        } else {
            displayError('check', 'You must accept the exchange policy to purchase tickets');
        }


        //only runs animation when all inputs are valid
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

/*
function checkStrength(password) {
    let strength = 0;

    //If password contains both lower and uppercase characters
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
        strength += 1;
        lowUpperCase.classList.remove('fa-circle');
        lowUpperCase.classList.add('fa-check');
    }
    //If it has numbers and characters
    if (password.match(/([0-9])/)) {
        strength += 1;
    }
    //If it has one special character
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
        strength += 1;
    }
    //If password is greater than 7
    if (password.length > 7) {
        strength += 1;
    }

    // If value is less than 2
    if (strength < 2) {
        passwordStrength.classList.remove('progress-bar-warning');
        passwordStrength.classList.remove('progress-bar-success');
        passwordStrength.classList.add('progress-bar-danger');
        passwordStrength.style = 'width: 10%';
    } else if (strength == 3) {
        passwordStrength.classList.remove('progress-bar-success');
        passwordStrength.classList.remove('progress-bar-danger');
        passwordStrength.classList.add('progress-bar-warning');
        passwordStrength.style = 'width: 60%';
    } else if (strength == 4) {
        passwordStrength.classList.remove('progress-bar-warning');
        passwordStrength.classList.remove('progress-bar-danger');
        passwordStrength.classList.add('progress-bar-success');
        passwordStrength.style = 'width: 100%';
    }
}
*/