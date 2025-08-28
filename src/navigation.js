let maxPage;
let page = 1;
let infiniteScroll;

searchFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (searchFormInput.value === "") {
    searchMessage.classList.remove("inactive");
    searchMessage.classList.add('mt-3');
    searchMessage.innerText = "Ingrese el nombre de la película para buscar";
    headerSection.append(searchMessage);
  }else{
    searchMessage.innerText = "";
    searchMessage.classList.add('inactive');
    location.hash = "#search=" + searchFormInput.value;
  }
});
trendingBtn.addEventListener("click", () => {
  location.hash = "#trends";
});
arrowBtn.addEventListener("click", () => {
  history.back();
});

window.addEventListener("DOMContentLoaded", navigatorFunction, false);
window.addEventListener("hashchange", navigatorFunction, false);
window.addEventListener("scroll", infiniteScroll, { passive: false });

function navigatorFunction() {
  searchMessage.innerText = "";
  searchMessage.classList.add("inactive");

  if(infiniteScroll){
    window.removeEventListener('scroll',infiniteScroll,{passive:false});
    infiniteScroll = undefined;
  }

  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage();
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage();
  } else {
    searchFormInput.value = "";
    homePage();
  }
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  if(infiniteScroll){
    window.addEventListener("scroll", infiniteScroll, { passive: false });
  }
}
function homePage() {
  console.log("HOME!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.add("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.remove("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.remove("inactive");
  likedMoviesSection.classList.remove('inactive');

  categoriesPreviewSection.classList.remove("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");

  getTrendingMoviesPreview();
  getCategoriesMoviesPreview();

  getLikedMovies();
}
function categoriesPage() {
  console.log("CATEGORIES!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive");

  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  const [_, categoryData] = location.hash.split("="); // ["#category","id-name"];
  const [categoryId, categoryName] = categoryData.split("-");

  headerCategoryTitle.innerHTML = categoryName;

  getMoviesByCategory(categoryId);

  infiniteScroll = getPaginatedMoviesByCategory(categoryId);
}
function movieDetailsPage() {
  console.log("MOVIE!!");

  headerSection.classList.add("header-container--long");
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");

  // ['#movie','234567']
  const [_, movieId] = location.hash.split("=");
  getMovieById(movieId);
}
function searchPage() {
  console.log("SEARCH333!!");
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive");

  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  const [_, query] = location.hash.split("="); // ["#search","platzi"];
  getMoviesBySearch(query);
  infiniteScroll = getPaginatedMoviesBySearch(query);
}
function trendsPage() {
  console.log("TRENDS!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  headerCategoryTitle.innerHTML = "Tendencias";
  getTrendingMovies();

  infiniteScroll = getPaginatedTrendingmovies;
}
