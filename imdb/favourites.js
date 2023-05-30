// Get reference to the results container
const resultsContainer = document.getElementById('results');

// Display the favourite movies
displayFavouriteMovies();

// Function to display favourite movies
function displayFavouriteMovies() {
  const favourites = JSON.parse(localStorage.getItem('favourites')) || [];

  // Clear previous results
  resultsContainer.innerHTML = '';

  if (favourites.length === 0) {
    const noFavouritesElement = document.createElement('p');
    noFavouritesElement.textContent = 'No favourite movies.';
    resultsContainer.appendChild(noFavouritesElement);
  } else {
    favourites.forEach(movie => {
      const movieElement = createMovieElement(movie);

      const removeButton = document.createElement('button');
      removeButton.classList.add('remove-button');
      removeButton.textContent = 'Remove from favourites';

      removeButton.addEventListener('click', () => {
        removeMovieFromFavourites(movie);
        displayFavouriteMovies();
      });

      movieElement.appendChild(removeButton);
      resultsContainer.appendChild(movieElement);
    });
  }
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

  // Plot
  const plotElement = document.createElement('p');
  plotElement.classList.add('movie-plot');
  plotElement.textContent = movie.Plot;
  movieElement.appendChild(plotElement);

  return movieElement;
}

// Function to remove a movie from favourites
function removeMovieFromFavourites(movie) {
  const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
  const updatedFavourites = favourites.filter(favourite => favourite.imdbID !== movie.imdbID);
  localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
}
