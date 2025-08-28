// Data
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },  
  params: {
    'api_key': API_KEY
  }
});
const IMG_PREVIEW = 'http://image.tmdb.org/t/p/w300';

const toggleThemeBtn = document.querySelector("#toggle-theme-btn");
const themeIcon      = document.querySelector("#theme-icon");

if(localStorage.getItem("theme-platzi-movies") === "dark"){
  document.body.classList.add('dark-mode');
  themeIcon.className = "bi bi-sun-fill text-warning";
}
toggleThemeBtn.addEventListener("click",()=>{
  document.body.classList.toggle("dark-mode");

  if(document.body.classList.contains("dark-mode")){
    localStorage.setItem("theme-platzi-movies","dark");
    themeIcon.className = "bi bi-sun-fill text-warning";
  }else{
    localStorage.setItem("theme-plazi-movies","light");
    themeIcon.className = "bi bi-moon-fill text-primary";
  }
});

function likedMoviesList(){
  const item = JSON.parse(localStorage.getItem("liked_movies"));
  let movies;

  if(item && Object.keys(item).length > 0){
    movies = item;
  
  }else{
    movies = {};
  }
  return movies;
};
function likeMovie(movie){
 const likedMovies = likedMoviesList();
 console.log('likemovie: ',likedMovies);

 if(likedMovies[movie.id]){
    delete likedMovies[movie.id];
 }else{
    likedMovies[movie.id] = movie;
 }

 if(Object.keys(likedMovies).length === 0){
    localStorage.removeItem('liked_movies');
 }else{
    localStorage.setItem("liked_movies", JSON.stringify(likedMovies));
 }
};
function getLikedMovies() {
  const likedMovies = likedMoviesList();
  const moviesArray = Object.values(likedMovies).filter(Boolean);

  if(moviesArray.length === 0){
    likedMoviesListArticle.classList.add('inactive');
    likedMoviesMessage.innerText = "Todavía no guardaste como favorita ninguna película";
    likedMoviesMessage.classList.add('liked-header');
    likedMoviesSection.append(likedMoviesMessage);
  }else{
    likedMoviesListArticle.style.display = "block";
    likedMoviesMessage.style.display = "none";
    createMovies(moviesArray, likedMoviesListArticle, {
      lazyLoad: true,
      clean: true,
    });
  }
};
// Utils
const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // console.log(entry);
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute("data-img");
      // console.log(entry.target);
      entry.target.setAttribute("src", url);
    }
  });
});

function createMovies(
  movies, 
  containerToCreateMovie, 
  {
    lazyLoad = false, 
    clean = true
  } = {},
  ){

  if(clean){
    containerToCreateMovie.innerHTML = "";
  }

  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.alt = movie.title;
    movieImg.setAttribute(
      lazyLoad ? 'data-img': 'src', IMG_PREVIEW + movie.poster_path);

    movieImg.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id;
    });  

    if(lazyLoad){
      lazyLoader.observe(movieImg);
    }

    movieImg.addEventListener('error',() =>{
      movieImg.setAttribute('src','https://static.platzi.com/static/images/error/img404.png');
    });

    const movieBtn = document.createElement('button');
    movieBtn.classList.add('movie-btn');
    
    likedMoviesList()[movie.id] && movieBtn.classList.add('movie-btn--liked');

    movieBtn.addEventListener('click',()=>{
      movieBtn.classList.toggle('movie-btn--liked');
      likeMovie(movie);
      getLikedMovies();
    });


    movieContainer.appendChild(movieImg);
    movieContainer.appendChild(movieBtn);
    containerToCreateMovie.appendChild(movieContainer);
  });;
};
function createCategories(categories, containerToCreateCategory){
    containerToCreateCategory.innerHTML = '';

    categories.forEach(category => {
      const divCategoryContainer = document.createElement("div");
      divCategoryContainer.classList.add("category-container");

      const categoryTitle = document.createElement("h3");
      categoryTitle.classList.add("category-title");
      categoryTitle.setAttribute("id","id"+category.id);
      categoryTitle.addEventListener('click',()=>{
        location.hash =`#category=${category.id}-${category.name}`;
      });

      const categoryTitleText = document.createTextNode(category.name);
      
      categoryTitle.appendChild(categoryTitleText);
      divCategoryContainer.appendChild(categoryTitle);
      containerToCreateCategory.appendChild(divCategoryContainer);
    }); 
};
async function getTrendingMoviesPreview(){
  const {data} = await api('trending/movie/day');
  const movies = data.results;
  createMovies(movies, trendingMoviesPreviewList,true);
};
async function getCategoriesMoviesPreview(){
  const {data} = await api('genre/movie/list');
  const categories = data.genres;
  createCategories(categories, categoriesPreviewList);
};
async function getMoviesByCategory(id){
  const {data} = await api('discover/movie',{
    params: {
      with_genres: id
    }
  });
  const movies = data.results;
  maxPage = data.total_pages
  createMovies(movies, genericSection, {lazyLoad: true});
};
async function getMoviesBySearch(query) {
  const {data} = await api('search/movie',{
    params: {
      query,
    }
  });
  const movies = data.results;
  maxPage = data.total_pages;
  console.log(maxPage);

  createMovies(movies, genericSection);
};
function getPaginatedMoviesByCategory(id) {
  return async function () {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
    const pageIsNotMax = page < maxPage;

    if (scrollIsBottom && pageIsNotMax) {
      page++;
      const { data } = await api("discover/movie", {
        params: {
          with_genres: id,
          page
        },
      });
      const movies = data.results;

      createMovies(movies, genericSection, { lazyLoad: true, clean: false });
    }
  };
};
function getPaginatedMoviesBySearch(query) {
 return async function (){
   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

   const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
   const pageIsNotMax = page < maxPage;

   if (scrollIsBottom && pageIsNotMax) {
     page++;
     const { data } = await api("search/movie", {
       params: {
         query,
         page,
       },
     });
     const movies = data.results;

     createMovies(movies, genericSection, { lazyLoad: true, clean: false });
   }
 } 
};
async function getTrendingMovies(){
  const {data} = await api('trending/movie/day');
  const movies = data.results;
  maxPage = data.total_pages;

  createMovies(movies, genericSection, {lazyLoad: true, clean: true});
};
async function getPaginatedTrendingmovies(){
  const {
    scrollTop,
    scrollHeight,
    clientHeight
  } = document.documentElement;

  const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
  const pageIsNotMax = page < maxPage;

  if (scrollIsBottom && pageIsNotMax) {
    page++;
    const { data } = await api("trending/movie/day", {
      params: {
        page,
      },
    });
    const movies = data.results;

    createMovies(movies, genericSection, { lazyLoad: true, clean: false });
  }
};
async function getMovieById(id) {
  const { data: movie } = await api('movie/'+ id);

  const movieImgUrl = "http://image.tmdb.org/t/p/w500" + movie.poster_path;
  headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(${movieImgUrl})`;
  
  movieDetailTitle.textContent       = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent       = movie.vote_average;

  createCategories(movie.genres, movieDetailCategoriesList);

  getRelatedMoviesId(id);
};
async function getRelatedMoviesId(id){
  const { data } = await api(`movie/${id}/recommendations`);
  const relatedMovies = data.results;

  createMovies(relatedMovies, relatedMoviesContainer);
};