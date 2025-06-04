const apiKey = '67e787b078542d46eed8819f6c9c02e5';
const moviesContainer = document.getElementById('movies-container');
const messageEl = document.getElementById('message');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

async function fetchMovies(url) {
  moviesContainer.innerHTML = '';
  messageEl.textContent = 'Loading...';
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not OK');
    const data = await response.json();

    if (data.results.length === 0) {
      messageEl.textContent = 'No movies found.';
      return;
    }

    messageEl.textContent = '';
    displayMovies(data.results);
  } catch (error) {
    messageEl.textContent = 'Failed to load movies. Try again later.';
    console.error('Error fetching movies:', error);
  }
}

function displayMovies(movies) {
  moviesContainer.innerHTML = ''; // limpiar contenido previo
  movies.forEach(movie => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    const posterUrl = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'https://via.placeholder.com/500x750?text=No+Image';

    // Obtener solo año (4 dígitos) de la fecha de lanzamiento
    const year = movie.release_date ? movie.release_date.substring(0,4) : 'N/A';

    movieEl.innerHTML = `
      <img src="${posterUrl}" alt="${movie.title}" />
      <div class="movie-content">
        <h3 class="movie-title">${movie.title}<span class="movie-year">(${year})</span></h3>
        <p class="movie-overview">${movie.overview.substring(0, 100)}...</p>
      </div>
    `;

    moviesContainer.appendChild(movieEl);
  });
}

// Mostrar películas populares al inicio
function loadPopularMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
  fetchMovies(url);
}

// Buscar películas por texto
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (!query) {
    loadPopularMovies();
    return;
  }
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`;
  fetchMovies(searchUrl);
});

// Carga inicial
loadPopularMovies();
