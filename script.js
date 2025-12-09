// In-memory movie list
let allMovies = [
    { id: "2", title: "Pulp Fiction", genre: "Crime", year: 1994 },
    { id: "3", title: "Dune", genre: "Sci-Fi", year: 2021 },
    { id: "40c4", title: "Dhurandar", genre: "Spy action thriller", year: 2025 },
    { id: "42a9", title: "Uri The Surgical Strike", genre: "Army Action Thriller", year: 2019 },
    { id: "4af2", title: "Theri", genre: "Action Thriller", year: 2016 }
];

const movieListDiv = document.getElementById('movie-list');
const searchInput = document.getElementById('search-input');
const form = document.getElementById('add-movie-form');

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

// Initial render
renderMovies(allMovies);

// Search functionality
searchInput.addEventListener('input', () => {
    const text = searchInput.value.toLowerCase();
    const filtered = allMovies.filter(m =>
        m.title.toLowerCase().includes(text) ||
        m.genre.toLowerCase().includes(text)
    );
    renderMovies(filtered);
});

// Add movie
form.addEventListener('submit', e => {
    e.preventDefault();

    const newMovie = {
        id: crypto.randomUUID(), // unique string ID
        title: document.getElementById('title').value,
        genre: document.getElementById('genre').value,
        year: parseInt(document.getElementById('year').value)
    };

    allMovies.push(newMovie);
    form.reset();
    renderMovies(allMovies);
});

// Edit movie
function editMoviePrompt(id) {
    const movie = allMovies.find(m => m.id === id);
    if (!movie) return;

    const newTitle = prompt("New Title:", movie.title);
    const newYear = prompt("New Year:", movie.year);
    const newGenre = prompt("New Genre:", movie.genre);

    if (!newTitle || !newYear || !newGenre) return;

    const parsedYear = parseInt(newYear);
    if (isNaN(parsedYear)) {
        alert("Year must be a number");
        return;
    }

    movie.title = newTitle;
    movie.year = parsedYear;
    movie.genre = newGenre;

    renderMovies(allMovies);
}

// Delete movie
function deleteMovie(id) {
    allMovies = allMovies.filter(m => m.id !== id);
    renderMovies(allMovies);
}
