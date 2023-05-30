const apiKey = '6ae2c47d';
const searchInput = document.getElementById('search-input');
const suggestionsContainer = document.getElementById('suggestions-container');
const resultsContainer = document.getElementById('results-container');
const favouritesContainer = document.getElementById('favourites-container');

// Event listener for search input
searchInput.addEventListener('input', () => {
  if (searchInput.value.trim() === '') {
    suggestionsContainer.innerHTML = '';
  } else {
    fetch(`https://www.omdbapi.com/?apikey=6ae2c47d&s=${searchInput.value}`)
      .then(response => response.json())
      .then(data => {
        if (data.Response === 'True') {
          const movies = data.Search;
          suggestionsContainer.innerHTML = '';
          movies.forEach(movie => {
            const suggestionElement = createSuggestionElement(movie);
            suggestionsContainer.appendChild(suggestionElement);
          });
        } else {
          suggestionsContainer.innerHTML = `<p class="error">${data.Error}</p>`;
        }
      })
      .catch(error => console.error(error));
  }
});

// Function to create suggestion element
function createSuggestionElement(movie) {
  const suggestionElement = document.createElement('div');
  suggestionElement.classList.add('suggestion');
  suggestionElement.textContent = movie.Title;

  suggestionElement.addEventListener('click', () => {
    searchInput.value = movie.Title;
    searchMovies();
  });

  return suggestionElement;
}

// Function to search movies
function searchMovies() {
  const searchTerm = searchInput.value.trim();

  // Clear previous suggestions and results
  suggestionsContainer.innerHTML = '';
  resultsContainer.innerHTML = '';

  if (searchTerm === '') {
    return;
  }

  fetch(`https://www.omdbapi.com/?apikey=6ae2c47d&s=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === 'True') {
        data.Search.forEach(movie => {
          const movieElement = createMovieElement(movie);
          resultsContainer.appendChild(movieElement);
        });
      } else {
        const errorElement = document.createElement('p');
        errorElement.classList.add('error');
        errorElement.textContent = data.Error;
        resultsContainer.appendChild(errorElement);
      }
    })
    .catch(error => console.error(error));
}

// Function to create a movie element
function createMovieElement(movie) {
  const movieElement = document.createElement('div');
  movieElement.classList.add('movie');

  // Poster image
  if (movie.Poster && movie.Poster !== 'N/A') {
    const posterElement = document.createElement('img');
    posterElement.src = movie.Poster;
    movieElement.appendChild(posterElement);
  }

  // Title
  const titleElement = document.createElement('h2');
  titleElement.classList.add('movie-title');
  titleElement.textContent = movie.Title;
  movieElement.appendChild(titleElement);

  // Year
  const yearElement = document.createElement('p');
  yearElement.classList.add('movie-year');
  yearElement.textContent = movie.Year;
  movieElement.appendChild(yearElement);

  // Add to favorites button
  const addToFavoritesButton = document.createElement('button');
  addToFavoritesButton.classList.add('add-to-favorites-button');
  addToFavoritesButton.textContent = 'Add to Favorites';

  addToFavoritesButton.addEventListener('click', () => {
    addMovieToFavorites(movie);
  });

  movieElement.appendChild(addToFavoritesButton);

  // Click event to open movie details page
  movieElement.addEventListener('click', () => {
    window.location.href = `movie.html?id=${movie.imdbID}`;
  });

  return movieElement;
}

// Function to add a movie to favorites
function addMovieToFavorites(movie) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.push(movie);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Display the favorite movies on the page
function displayFavoriteMovies() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.length === 0) {
    favouritesContainer.innerHTML = '<p>No favorite movies.</p>';
  } else {
    favouritesContainer.innerHTML = '';
    favorites.forEach(movie => {
      const movieElement = createMovieElement(movie);
      const removeButton = document.createElement('button');
      removeButton.classList.add('remove-from-favorites-button');
      removeButton.textContent = 'Remove from Favorites';

      removeButton.addEventListener('click', () => {
        removeMovieFromFavorites(movie);
      });

      movieElement.appendChild(removeButton);
      favouritesContainer.appendChild(movieElement);
    });
  }
}

// Function to remove a movie from favorites
function removeMovieFromFavorites(movie) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const updatedFavorites = favorites.filter(favorite => favorite.imdbID !== movie.imdbID);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  displayFavoriteMovies();
}

// Call the displayFavoriteMovies function when the page loads
displayFavoriteMovies();
