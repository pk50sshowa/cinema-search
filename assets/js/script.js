// Global variables to be used throughout the application
var inputEl = document.querySelector('input');
var inputBtn = document.querySelector('#inputBtn');
var apiKey = `24ff6fe5a68abc939b1c55597141819c`;
var apiKeyShowtimes = `xbdfr3jgxxxncz3jxd7nryvn`;
var zipCodeArr = [];

// This function receives a ZIP code from the user, but does not accept any other type of data
function inputZipCode() {
    if (!inputEl.value) {
        return;
    }
    var zipCode = inputEl.value;
    localStorage.setItem(zipCode, inputEl.value);
    zipCodeHistory(zipCode);
    getTheaters(zipCode);
    inputEl.value = '';
}

// This function takes the input ZIP code from the user and uses it to fetch a list of nearby theaters
function getTheaters(zipCode) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f8581c80ccmshc607c592930e00dp1d82a7jsnaac71f7b412c',
            'X-RapidAPI-Host': 'flixster.p.rapidapi.com'
        }
    };

    // This fetch call gets all theaters within a 5-mile radius of the input ZIP code and passes it to the displayTheaters function
    fetch(`https://flixster.p.rapidapi.com/theaters/list?zipCode=${zipCode}&radius=5`, options)
        .then(response => response.json())
        .then(response => {
            displayTheaters(response.data.theaters);
            console.log(response)
        })
        .catch(err => console.error(err));
}

// Displays nearby theaters in a 5-mile radius from the input ZIP code
function displayTheaters(theaters) {
    document.querySelector('.menu-list').innerHTML = '';
    document.getElementById('movienamelist').innerHTML = '';
    for (i = 0; i < theaters.length; i++) {
        var theaterName = theaters[i].name;
        console.log(theaterName);
        var theaterNameEl = document.createElement('li');
        var theaterLink = document.createElement('a');
        theaterLink.setAttribute('href', `https://www.google.com/search?q=${theaterName}`);
        theaterLink.setAttribute('target', '_blank');
        theaterLink.setAttribute('data-id', theaters[i].id);
        console.log(theaterNameEl);
        theaterLink.textContent = (theaterName);
        theaterNameEl.appendChild(theaterLink);
        document.querySelector('.menu-list').appendChild(theaterNameEl);
    }
}

function displayHistory () {
    localStorage.getItem('zipCode');
}

// A fetch call to show movies that are now playing and dynamically prints their movie posters with associated links to pages about each movie (original_title, overview, poster_path, vote_average, vote_count)
fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=24ff6fe5a68abc939b1c55597141819c&language=en-US&page=1`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        for (i = 0; i < 20; i++) {
            var posterURL = `https://www.themoviedb.org/t/p//w600_and_h900_bestv2`;
            var movieURL = `https://www.themoviedb.org/movie`;
            var originalTitle = data.results[i].original_title;
            var overview = data.results[i].overview;
            var posterPath = data.results[i].poster_path;
            var voteAverage = data.results[i].vote_average;
            var voteCount = data.results[i].vote_count;
            var movieID = data.results[i].id;

            console.log(originalTitle);
            console.log(overview);
            console.log(posterPath);
            posterURL = posterURL + posterPath;
            movieURL = movieURL + '/' + movieID;
            console.log(movieURL);

            var posterLink = document.createElement('a');
            posterLink.setAttribute('href', movieURL);
            posterLink.setAttribute('target', '_blank');
            var posterEl = document.createElement('img');
            posterEl.setAttribute('src', posterURL);
            posterEl.setAttribute('width', '25%');
            posterEl.setAttribute('height', '25%');
            posterLink.appendChild(posterEl);
            document.getElementById('movieposter').appendChild(posterLink);
            console.log(posterURL);
            console.log(voteAverage);
            console.log(voteCount);
        }

    });

// // reviews
// fetch(`https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=24ff6fe5a68abc939b1c55597141819c&language=en-US&page=1`)
//     .then((response) => response.json())
//     .then((data) => console.log(data));

// // images
// fetch(`https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=24ff6fe5a68abc939b1c55597141819c&language=en-US`)
//     .then((response) => response.json())
//     .then((data) => console.log(data));

// // release dates
// fetch(`https://api.themoviedb.org/3/movie/{movie_id}/release_dates?api_key=24ff6fe5a68abc939b1c55597141819c`)
//     .then((response) => response.json())
//     .then((data) => console.log(data));

// Event listeners for user input

inputBtn.addEventListener('click', inputZipCode);
document.getElementById('theaterList').addEventListener('click', function (event) {
    // event.preventDefault(); commented for future edits
    if (event.target.matches('a')) {
        var now_playing = event.target.dataset.id;
        console.log(now_playing);
        // displayNowPlaying (now_playing);
    }
});