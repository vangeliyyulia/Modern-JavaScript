// variables
const tweetList = document.getElementById('tweet-list');


// Event Listeners
eventListeners();

function eventListeners() {
    // form submission
    document.querySelector('#form').addEventListener('submit', newTweet);

    // remove tweet from the list
    tweetList.addEventListener('click', removeTweet);

    // document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

function newTweet(e) {
    e.preventDefault();
    // read the textarea value
    const tweet = document.getElementById('tweet').value;

    //create a remove button 
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';

    // create a li element
    const li = document.createElement('li');
    li.textContent = tweet;
    tweetList.appendChild(li);

    // add a remove button to each tweet
    li.appendChild(removeBtn);

    // add to the list
    tweetList.appendChild(li);

    // add to the local storage
    addTweetLocalStorage(tweet);

    // alert
    alert('Tweet Added!');
    this.reset();
}

// removes the tweets from the DOM
function removeTweet(e) {
    if(e.target.classList.contains('remove-tweet')) {
        e.target.parentElement.remove();
    }

    // remove from the storage
    removeTweetLocalStorage(e.target.parentElement.textContent);
}

// adds tweets to the local storage 
function addTweetLocalStorage(tweet) {
    let tweets = getTweetsFromStorage();
    // add the tweet into the array
    tweets.push(tweet);

    //convert tweet aray into String
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getTweetsFromStorage() {
    let tweets;
    const tweetsLS = localStorage.getItem('tweets');
    // get the values, if null is returned we create an empty array
    if(tweetsLS === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(tweetsLS);
    }
    return tweets;
}

//print local storage tweets on load
function localStorageOnLoad() {
    let tweets = getTweetsFromStorage();

    // loop throug a storage and print the value
    tweets.forEach(function(tweet) {
        //create a remove button 
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';

        // create a li element
        const li = document.createElement('li');
        li.textContent = tweet;
        tweetList.appendChild(li);

        // add a remove button to each tweet
        li.appendChild(removeBtn);

        // add to the list
        tweetList.appendChild(li);
    });
}

// remove tweet from Local Storage
function removeTweetLocalStorage(tweet) {
    let tweets = getTweetsFromStorage();

    // remove the X from the tweet
    const tweetDelete = tweet.substring(0, tweet.length -1);
    
    // loop through the tweets and remove the tweet that equal
    tweets.forEach(function(tweetLS, index) {
        if(tweetDelete === tweetLS) {
            tweets.splice(index, 1)
        }
    });

    // save the data
    localStorage.setItem('tweets', JSON.stringify(tweets));
}