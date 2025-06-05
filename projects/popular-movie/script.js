const apiKey = '67e787b078542d46eed8819f6c9c02e5';

const moviesContainer = document.getElementById('movies-container');
const messageEl = document.getElementById('message');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const paginationEl = document.getElementById('pagination');

let genresMap = {};
let currentPage = 1;
let currentQuery = '';
let totalPages = 1;

// Obtener géneros de TMDB y guardarlos como { id: nombre }
async function fetchGenres() {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
    const data = await res.json();
    data.genres.forEach(genre => {
      genresMap[genre.id] = genre.name;
    });
  } catch (error) {
    console.error('Error fetching genres:', error);
  }
}

// Obtener películas desde la API y mostrarlas
async function fetchMovies(url) {
  moviesContainer.innerHTML = '';
  messageEl.textContent = 'Loading...';

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not OK');

    const data = await response.json();

    if (data.results.length === 0) {
      messageEl.textContent = 'No movies found.';
      paginationEl.innerHTML = '';
      return;
    }

    messageEl.textContent = '';
    totalPages = data.total_pages;
    displayMovies(data.results);
    updatePagination();
  } catch (error) {
    messageEl.textContent = 'Failed to load movies. Try again later.';
    console.error('Error fetching movies:', error);
  }
}

// Mostrar las películas en la página
function displayMovies(movies) {
  moviesContainer.innerHTML = '';

  movies.forEach(movie => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'https://via.placeholder.com/500x750?text=No+Image';

    const year = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    const genreNames = movie.genre_ids.map(id => genresMap[id]).filter(Boolean);

    movieEl.innerHTML = `
      <img src="${posterUrl}" alt="${movie.title}" />
      <div class="movie-content">
        <h3 class="movie-title">
          ${movie.title} <span class="movie-year">(${year})</span>
        </h3>
        <p class="movie-rating">⭐ ${rating}/10</p>
        <p class="movie-genres">${genreNames.join(', ')}</p>
        <p class="movie-overview">${movie.overview.substring(0, 100)}...</p>
      </div>
    `;

    moviesContainer.appendChild(movieEl);
  });
}

// Crear y actualizar la paginación
function updatePagination() {
  paginationEl.innerHTML = `
    <button id="prev-btn" ${currentPage === 1 ? 'disabled' : ''}>Anterior</button>
    <span>Página ${currentPage} de ${totalPages}</span>
    <button id="next-btn" ${currentPage === totalPages ? 'disabled' : ''}>Siguiente</button>
  `;

  document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      loadMovies();
    }
  });

  document.getElementById('next-btn').addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      loadMovies();
    }
  });
}

// Lógica para cargar películas (populares o de búsqueda)
function loadMovies() {
  let url;

  if (currentQuery === '') {
    url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${currentPage}`;
  } else {
    url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(currentQuery)}&page=${currentPage}&include_adult=false`;
  }

  fetchMovies(url);
}

// Evento de envío del formulario de búsqueda
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  currentQuery = searchInput.value.trim();
  currentPage = 1;
  loadMovies();
});

// Inicializar la app
async function init() {
  await fetchGenres();
  loadMovies();
}

init();
