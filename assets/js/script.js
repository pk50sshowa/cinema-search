var searchBtn = document.querySelector('#searchBtn');
var inputEl = document.querySelector('input');
var apiKey = `24ff6fe5a68abc939b1c55597141819c`;

function handleSearchSubmit() {
    if (!inputEl.value) {
        return;
    }
    var movieName = inputEl.value;
    fetchMovie(movieName);
    inputEl.value = '';
}

// now playing (original_title, overview, poster_path, vote_average, vote_count)
fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=24ff6fe5a68abc939b1c55597141819c&language=en-US&page=1`)
    .then((response) => response.json())
    .then((data) => {

        for (i = 0; i < 20; i++) {
            var originalTitle = data.results[i].original_title;
            var overview = data.results[i].overview;
            var posterPath = data.results[i].poster_path;
            var voteAverage = data.results[i].vote_average;
            var voteCount = data.results[i].vote_count;

            console.log(originalTitle);
            console.log(overview);
            console.log(posterPath);
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

searchBtn.addEventListener('click', handleSearchSubmit);