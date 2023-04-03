var inputEl = document.querySelector('input');
var inputBtn = document.querySelector('#inputBtn');
var apiKey = `24ff6fe5a68abc939b1c55597141819c`;
var zipCode;

function inputZipCode () {
    if(!inputEl.value) {
        return;
    }
    var zipCode = inputEl.value;
    localStorage.setItem (zipCode, inputEl.value);
    console.log(zipCode);
    inputEl.value = '';
}

// now playing (original_title, overview, poster_path, vote_average, vote_count)
fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=24ff6fe5a68abc939b1c55597141819c&language=en-US&page=1`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        for (i = 0; i < 20; i++) {
            var posterURL = `https://www.themoviedb.org/t/p/w1280`;
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
            // var posterLink;
            // posterLink.setAttribute ('href', movieURL);
            // document.getElementbyID('movielink').appendchild(movieURL);
            var posterEl = document.createElement('img');
            posterEl.setAttribute ('src', posterURL);
            posterEl.setAttribute ('width', '25%');
            posterEl.setAttribute ('height', '25%');
            document.getElementById('movieposter').appendChild(posterEl);
            console.log (posterURL);
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

inputBtn.addEventListener('click', inputZipCode);