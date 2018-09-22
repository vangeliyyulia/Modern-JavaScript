// variables



// Event Listeners
eventListeners();

function eventListeners() {
    // form submission
    document.querySelector('#form').addEventListener('submit', newTweet);
}

function newTweet(e) {
    e.preventDefault();
    console.log('Form Submitted');
}

