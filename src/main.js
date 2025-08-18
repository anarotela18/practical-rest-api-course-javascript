const IMG_PREVIEW = 'http://image.tmdb.org/t/p/w300';

async function getTrendingMoviesPreview(){
  const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key='+API_KEY);
  const data = await res.json();
  const movies = data.results;
  movies.forEach(movie =>{
    const trendingPreviewMoviesContainer = document.querySelector("#trendingPreview .trendingPreview-movieList");
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.alt = movie.title;
    movieImg.src = IMG_PREVIEW + movie.poster_path;

    movieContainer.appendChild(movieImg);
    trendingPreviewMoviesContainer.appendChild(movieContainer);
  });
  console.log(movies);
};
getTrendingMoviesPreview();