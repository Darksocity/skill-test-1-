// Get reference to HTML element
const movieDetailsContainer = document.getElementById('movie-details');

// Get the movie ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Make API request to get movie details
fetch(`https://www.omdbapi.com/?apikey=6ae2c47d&i=${movieId}`)
  .then(response => response.json())
  .then(data => {
    if (data.Response === 'True') {
      const movieDetails = createMovieDetails(data);
      movieDetailsContainer.appendChild(movieDetails);
    } else {
      const errorElement = document.createElement('div');
      errorElement.classList.add('error');
      errorElement.textContent = data.Error;
      movieDetailsContainer.appendChild(errorElement);
    }
  })
  .catch(error => console.error(error));

function createMovieDetails(movie) {
  const movieElement = document.createElement('div');
  movieElement.classList.add('movie-details');

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

  movieElement.appendChild(posterElement);
  movieElement.appendChild(titleElement);
  movieElement.appendChild(yearElement);
  movieElement.appendChild(plotElement);

  return movieElement;
}
