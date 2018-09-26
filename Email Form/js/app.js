// variables
const sendBtn = document.getElementById('sendBtn'),
      email = document.getElementById('email'),
      subject = document.getElementById('subject'),
      message = document.getElementById('message'),
      resetBtn = document.getElementById('resetBtn'),
      sendEmailForm = document.getElementById('email-form');


// event listeners
eventListeners();

function eventListeners() {
    // app init
    document.addEventListener('DOMContentLoaded', appInit);

    // validate the form
    email.addEventListener('blur', validateField);
    subject.addEventListener('blur', validateField);
    message.addEventListener('blur', validateField);

    // send email & reset form
    sendEmailForm.addEventListener('submit', sendEmail);
    resetBtn.addEventListener('click', resetForm);
}


// functions

// app initialization
function appInit() {
    // disable button on load
    sendBtn.disabled = true;
}

function sendEmail(e) {
    e.preventDefault();

    // show the spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'block';

    // show the image
    const sendEmailImg = document.createElement('img');
    sendEmailImg.src = 'img/mail.gif';
    sendEmailImg.style.display = 'block';

    // hide spinner then show the send email image
    setTimeout(function() {
        // hide the spinner
        spinner.style.display = 'none';
        // show the image
        document.querySelector('#loaders').appendChild(sendEmailImg);

        // after 5 sec hide the img and reset the form
        setTimeout(function() {
            sendEmailForm.reset();
            sendEmailImg.remove();
        }, 5000);
    }, 3000);
}

// validate the field
function validateField() {
    let errors;
    // validate the length of the field
    validateLength(this);

    // validate the email
    if(this.type === 'email') {
        validateEmail(this);
    }

    // both will return errors, then check if here's any errors
    errors = document.querySelectorAll('.error');

    // check that hte inputs are not empty
    if(email.value !== '' && subject.value !== '' && message.value !== '') {
        if(errors.length === 0) {
            // the button should be enabled
            sendBtn.disabled = false;
        }
    }
}

// validate the length of the fields
function validateLength(field) {
    if(field.value.length > 0) {
        field.style.borderBottomColor = 'green';
        field.classList.remove('error');
    } else {
        field.style.borderBottomColor = 'red';
        field.classList.add('error');
    }
}

// validate email (@ sign)
function validateEmail(field) {
    let emailText = field.value;
    // check if the email contains the @ sign
    if(emailText.indexOf('@') !== -1) {
        field.style.borderBottomColor = 'green';
        field.classList.remove('error');
    } else {
        field.style.borderBottomColor = 'red';
        field.classList.add('error');
    }
}

// reset form
function resetForm() {
    sendEmailForm.reset();
}