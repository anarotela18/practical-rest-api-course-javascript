let maxPage;
let page = 1;
let infiniteScroll;


searchFormBtn.addEventListener("click", () => {
  location.hash = "#search=" + searchFormInput.value;
});

trendingBtn.addEventListener("click", () => {
  location.hash = "#trends";
});

arrowBtn.addEventListener("click", () => {
  if (window.history.length <= 2) {
    location.hash = "#home";
  } else {
    location.hash = window.history.back();
  }
});

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);
window.addEventListener("scroll", infiniteScroll, false);

function navigator() {
  console.log({ location });

  if(infiniteScroll){
    window.removeEventListener('scroll',infiniteScroll, {passive: false});
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
    homePage();
  }
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  if(infiniteScroll){
    window.addEventListener('scroll',infiniteScroll, false);
  }
}
function homePage() {
  console.log("Estas en HOME");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.add("inactive");
  arrowBtn.classList.remove("header-arrow-white");

  headerTitle.classList.remove("inactive");
  headerCategoryTitle.classList.add("inactive");

  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.remove("inactive");
  likedMoviesSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");


  getTrendingMoviesPreview();
  getCategoriesMoviesPreview();
  getLikedMovies();
}
function categoriesPage() {
  console.log("Estas en CATEGORIES");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow-white");

  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  //location.hash.split('=') => ['#category','id-name']
  const [_, categoryData] = location.hash.split("=");
  const [categoryId, categoryName] = categoryData.split("-");
  headerCategoryTitle.innerHTML = decodeURIComponent(categoryName);
  getMoviesByCategory(categoryId);

  infiniteScroll = getPaginatedMoviesByCategory(categoryId);
}
function movieDetailsPage() {
  console.log("Estas en MOVIES");

  headerSection.classList.add("header-container--long");
  //headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");

  // ['#movie','123456']
  const [_, movieId] = location.hash.split("=");
  getMovieById(movieId);
}
function searchPage() {
  console.log("Estas en SEARCH");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow-white");

  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  // ['#search','loquehayabuscado']
  const [_, query] = location.hash.split("=");
  getMoviesBySearch(decodeURI(query));

  infiniteScroll = getPaginatedMoviesBySearch(query);
}
function trendsPage() {
  console.log("Estas en TRENDS");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow-white");

  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  headerCategoryTitle.innerHTML = "Tendencias";

  getTrendingMovies();

  infiniteScroll = getPaginatedTrendingMovies;
}