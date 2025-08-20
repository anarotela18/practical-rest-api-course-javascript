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

  trendingMoviesPreviewList.innerHTML = "";

  movies.forEach(movie =>{
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.alt = movie.title;
    movieImg.src = IMG_PREVIEW + movie.poster_path;

    movieContainer.appendChild(movieImg);
    trendingMoviesPreviewList.appendChild(movieContainer);
  });
};
async function getCategoriesMoviesPreview(){
  const {data} = await api('genre/movie/list');
  const categories = data.genres;

  categoriesPreviewList.innerHTML = "";

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
    categoriesPreviewList.appendChild(divCategoryContainer);
  }); 
}
async function getMoviesByCategory(id){
  console.log('getmovies');
  const {data} = await api('discover/movie',{
    params: {
      with_genres: id
    }
  });
  const categories = data.results;

  genericSection.innerHTML = "";

  categories.forEach(category => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add('movie-container');
    
    const categoryImg = document.createElement("img");
    categoryImg.classList.add('movie-img');
    categoryImg.alt = category.title;
    categoryImg.src = IMG_PREVIEW + category.poster_path;
    
    categoryContainer.appendChild(categoryImg);
    genericSection.appendChild(categoryContainer);
  });
}