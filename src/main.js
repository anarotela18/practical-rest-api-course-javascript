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

async function getTrendingMoviesPreview(){
  const {data} = await api('trending/movie/day');
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
};
async function getCategoriesMoviesPreview(){
  const {data} = await api('genre/movie/list');
  const categories = data.genres;
  categories.forEach(category => {
    const categoryContainer = document.querySelector("#categoriesPreview .categoriesPreview-list");
    
    const divCategoryContainer = document.createElement("div");
    divCategoryContainer.classList.add("category-container");

    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");
    categoryTitle.setAttribute("id","id"+category.id);

    const categoryTitleText = document.createTextNode(category.name);
    
    categoryTitle.appendChild(categoryTitleText);
    divCategoryContainer.appendChild(categoryTitle);
    categoryContainer.appendChild(divCategoryContainer);
  }); 
}
getTrendingMoviesPreview();
getCategoriesMoviesPreview();