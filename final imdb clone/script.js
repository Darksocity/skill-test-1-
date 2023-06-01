const searchInput = document.getElementById('search-input');
const suggestionsContainer = document.getElementById('suggestions-container');
const resultsContainer = document.getElementById('results');
const favoriteMoviesContainer = document.getElementById('favorite-movies');

const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];

searchInput.addEventListener('input', searchMovies);
suggestionsContainer.addEventListener('click', handleSuggestionClick);

function searchMovies() {
  const searchTerm = searchInput.value;

  // Clear previous results
  resultsContainer.innerHTML = '';

  if (searchTerm.length === 0) {
    suggestionsContainer.style.display = 'none';
    return;
  }

  fetch(`https://www.omdbapi.com/?apikey=6ae2c47d&s=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === 'True') {
        suggestionsContainer.style.display = 'block';
        displaySuggestions(data.Search);
        displayMovies(data.Search);
      } else {
        suggestionsContainer.style.display = 'none';
      }
    })
    .catch(error => console.error(error));
}

function displaySuggestions(suggestions) {
  suggestionsContainer.innerHTML = '';

  const ul = document.createElement('ul');

  suggestions.forEach(suggestion => {
    const li = document.createElement('li');
    li.textContent = suggestion.Title;
    ul.appendChild(li);
  });

  suggestionsContainer.appendChild(ul);
}

function handleSuggestionClick(event) {
  if (event.target.tagName === 'LI') {
    const selectedMovieTitle = event.target.textContent;
    searchInput.value = selectedMovieTitle;
    suggestionsContainer.style.display = 'none';
    searchMovies();
  }
}

function displayMovies(movies) {
  movies.forEach(movie => {
    const movieElement = createMovieElement(movie);
    resultsContainer.appendChild(movieElement);
  });
}

function createMovieElement(movie) {
  const movieElement = document.createElement('div');
  movieElement.classList.add('movie');

  const poster = movie.Poster !== 'N/A' ? movie.Poster : 'no-image.png';
  const posterElement = document.createElement('img');
  posterElement.src = poster;

  const titleElement = document.createElement('h2');
  titleElement.classList.add('movie-title');
  titleElement.textContent = movie.Title;

  const yearElement = document.createElement('p');
  yearElement.classList.add('movie-year');
  yearElement.textContent = movie.Year;

  const plotElement = document.createElement('p');
  plotElement.classList.add('movie-plot');
  plotElement.textContent = movie.Plot;

  const favoriteButton = document.createElement('button');
  favoriteButton.classList.add('favorite-button');
  favoriteButton.textContent = 'Add to Favorites';
  favoriteButton.addEventListener('click', () => addToFavorites(movie));

  const movieLink = document.createElement('a');
  movieLink.href = `movie.html?id=${movie.imdbID}`; // Pass the movie ID as a query parameter
  movieLink.appendChild(posterElement);
  movieLink.appendChild(titleElement);
  movieLink.appendChild(yearElement);
  movieLink.appendChild(plotElement);
  movieLink.appendChild(favoriteButton);

  movieElement.appendChild(movieLink);

  return movieElement;
}

function addToFavorites(movie) {
  favoriteMovies.push(movie);
  localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
}

function removeFromFavorites(movieId) {
  const index = favoriteMovies.findIndex(movie => movie.imdbID === movieId);
  if (index !== -1) {
    favoriteMovies.splice(index, 1);
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    displayFavoriteMovies();
  }
}

function displayFavoriteMovies() {
  favoriteMoviesContainer.innerHTML = '';

  favoriteMovies.forEach(movie => {
    const movieElement = createFavoriteMovieElement(movie);
    favoriteMoviesContainer.appendChild(movieElement);
  });
}

function createFavoriteMovieElement(movie) {
  const movieElement = document.createElement('div');
  movieElement.classList.add('favorite-movie');

  const poster = movie.Poster !== 'N/A' ? movie.Poster : 'no-image.png';
  const posterElement = document.createElement('img');
  posterElement.src = poster;

  const titleElement = document.createElement('h2');
  titleElement.classList.add('movie-title');
  titleElement.textContent = movie.Title;

  const yearElement = document.createElement('p');
  yearElement.classList.add('movie-year');
  yearElement.textContent = movie.Year;

  const plotElement = document.createElement('p');
  plotElement.classList.add('movie-plot');
  plotElement.textContent = movie.Plot;

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove-button');
  removeButton.textContent = 'Remove from Favorites';
  removeButton.addEventListener('click', () => removeFromFavorites(movie.imdbID));

  movieElement.appendChild(posterElement);
  movieElement.appendChild(titleElement);
  movieElement.appendChild(yearElement);
  movieElement.appendChild(plotElement);
  movieElement.appendChild(removeButton);

  return movieElement;
}

displayFavoriteMovies();
