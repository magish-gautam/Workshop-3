const API_URL = "http://localhost:3000/movies";

let allMovies = [];

const movieListDiv = document.getElementById('movie-list');
const searchInput = document.getElementById('search-input');
const form = document.getElementById('add-movie-form');


// Fetch movies from JSON Server
function loadMovies() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            allMovies = data;
            renderMovies(allMovies);
        })
        .catch(err => console.error("Error loading movies:", err));
}


// Render movies to page
function renderMovies(moviesToDisplay) {
    movieListDiv.innerHTML = '';

    if (moviesToDisplay.length === 0) {
        movieListDiv.innerHTML = '<p>No movies found.</p>';
        return;
    }

    moviesToDisplay.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.innerHTML = `
            <strong>${movie.title}</strong> (${movie.year}) - ${movie.genre}
            <button onclick="editMoviePrompt('${movie.id}')">Edit</button>
            <button onclick="deleteMovie('${movie.id}')">Delete</button>
        `;
        movieListDiv.appendChild(movieElement);
    });
}


// Search functionality
searchInput.addEventListener('input', () => {
    const text = searchInput.value.toLowerCase();
    const filtered = allMovies.filter(m =>
        m.title.toLowerCase().includes(text) ||
        m.genre.toLowerCase().includes(text)
    );
    renderMovies(filtered);
});


// Add movie to JSON Server
form.addEventListener('submit', e => {
    e.preventDefault();

    const newMovie = {
        title: document.getElementById('title').value,
        genre: document.getElementById('genre').value,
        year: parseInt(document.getElementById('year').value)
    };

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie)
    })
    .then(() => {
        form.reset();
        loadMovies();
    });
});


// Edit movie
function editMoviePrompt(id) {
    const movie = allMovies.find(m => m.id == id);
    if (!movie) return;

    const newTitle = prompt("New Title:", movie.title);
    const newYear = prompt("New Year:", movie.year);
    const newGenre = prompt("New Genre:", movie.genre);

    if (!newTitle || !newYear || !newGenre) return;

    const updatedMovie = {
        title: newTitle,
        year: parseInt(newYear),
        genre: newGenre
    };

    fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMovie)
    })
    .then(() => loadMovies());
}


// Delete movie
function deleteMovie(id) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(() => loadMovies());
}


// Load movies on page start
loadMovies();
