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

// Utils
function createMovies(movies, containerToCreateMovie){
  containerToCreateMovie.innerHTML = '';

  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.alt = movie.title;
    movieImg.src = IMG_PREVIEW + movie.poster_path;

    movieContainer.appendChild(movieImg);
    containerToCreateMovie.appendChild(movieContainer);
  });;
}
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
}

async function getTrendingMoviesPreview(){
  const {data} = await api('trending/movie/day');
  const movies = data.results;
  createMovies(movies, trendingMoviesPreviewList)
};
async function getCategoriesMoviesPreview(){
  const {data} = await api('genre/movie/list');
  const categories = data.genres;
  createCategories(categories, categoriesPreviewList);
}
async function getMoviesByCategory(id){
    const {data} = await api('discover/movie',{
    params: {
      with_genres: id
    }
  });
  const movies = data.results;
  createMovies(movies, genericSection);
}