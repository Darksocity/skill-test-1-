// Get reference to the movie details container
const movieDetailsContainer = document.getElementById('movie-details');

// Get the movie ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Make API request for the movie details
fetch(`https://www.omdbapi.com/?apikey=6ae2c47d&i=${movieId}`)
  .then(response => response.json())
  .then(movie => {
    // Create the movie details elements
    const titleElement = document.createElement('h2');
    titleElement.classList.add('movie-title');
    titleElement.textContent = movie.Title;

    const posterElement = document.createElement('img');
    posterElement.src = movie.Poster;

    const plotElement = document.createElement('p');
    plotElement.textContent = movie.Plot;

    // Add the movie details elements to the container
    movieDetailsContainer.appendChild(titleElement);
    movieDetailsContainer.appendChild(posterElement);
    movieDetailsContainer.appendChild(plotElement);
  })
  .catch(error => console.error(error));
