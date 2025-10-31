// Movie Database
const movies = [
    { id: 1, title: 'The Shawshank Redemption', year: 1994, rating: 9.3, genre: 'drama', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.' },
    { id: 2, title: 'The Dark Knight', year: 2008, rating: 9.0, genre: 'action', description: 'When the menace known as the Joker wreaks havoc and chaos on Gotham, Batman must accept one of the greatest psychological tests.' },
    { id: 3, title: 'Inception', year: 2010, rating: 8.8, genre: 'scifi', description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.' },
    { id: 4, title: 'Forrest Gump', year: 1994, rating: 8.8, genre: 'drama', description: 'The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold through the perspective of an Alabama man.' },
    { id: 5, title: 'The Matrix', year: 1999, rating: 8.7, genre: 'scifi', description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.' },
    { id: 6, title: 'Pulp Fiction', year: 1994, rating: 8.9, genre: 'drama', description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.' },
    { id: 7, title: 'Good Will Hunting', year: 1997, rating: 8.3, genre: 'drama', description: 'A working-class psychologist helps a brilliant young man come to terms with his troubled past.' },
    { id: 8, title: 'Deadpool', year: 2016, rating: 8.0, genre: 'action', description: 'A wisecracking mercenary gets superpowers after a rogue experiment and hunts down the man who nearly destroyed his life.' },
    { id: 9, title: 'The Ring', year: 2002, rating: 7.1, genre: 'horror', description: 'A journalist must investigate a mysterious videotape which seems to cause the death of anyone in a week of viewing it.' },
    { id: 10, title: 'The Notebook', year: 2004, rating: 7.8, genre: 'romance', description: 'A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom.' },
    { id: 11, title: 'Superbad', year: 2007, rating: 7.6, genre: 'comedy', description: 'Two co-dependent high school seniors are forced to deal with separation when their plan to stage a booze-soaked party goes awry.' },
    { id: 12, title: 'The Conjuring', year: 2013, rating: 7.5, genre: 'horror', description: 'Paranormal investigators work to help a family terrorized by a dark presence in their farmhouse.' }
];

let watchlist = [];
let currentMovie = null;
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    renderMovies(movies);
    setupEventListeners();
    loadWatchlist();
}

function setupEventListeners() {
    // Search
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }
    
    // Modal
    const modal = document.getElementById('movieModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function renderMovies(moviesToRender) {
    const grid = document.getElementById('moviesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    moviesToRender.forEach(movie => {
        const card = createMovieCard(movie);
        grid.appendChild(card);
    });
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
        <div class="movie-poster">🎬</div>
        <div class="movie-info">
            <div class="movie-title">${movie.title}</div>
            <div class="movie-rating">
                <span class="rating-stars">${getStars(movie.rating)}</span>
                <span>${movie.rating}</span>
            </div>
            <div class="movie-year">${movie.year}</div>
        </div>
    `;
    
    card.addEventListener('click', () => openModal(movie));
    return card;
}

function getStars(rating) {
    const stars = Math.round(rating / 2);
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
}

function openModal(movie) {
    currentMovie = movie;
    const modal = document.getElementById('movieModal');
    
    if (!modal) return;
    
    document.getElementById('modalTitle').textContent = movie.title;
    document.getElementById('modalRating').textContent = getStars(movie.rating);
    document.getElementById('modalRatingValue').textContent = movie.rating;
    document.getElementById('modalYear').textContent = movie.year;
    document.getElementById('modalGenre').textContent = movie.genre.charAt(0).toUpperCase() + movie.genre.slice(1);
    document.getElementById('modalDescription').textContent = movie.description;
    document.getElementById('modalPoster').textContent = '🎬';
    
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('movieModal');
    if (modal) modal.style.display = 'none';
}

function addToWatchlist() {
    if (!currentMovie) return;
    
    const exists = watchlist.some(m => m.id === currentMovie.id);
    if (!exists) {
        watchlist.push(currentMovie);
        saveWatchlist();
        updateWatchlist();
        alert(`${currentMovie.title} added to watchlist!`);
    } else {
        alert('Already in watchlist!');
    }
}

function updateWatchlist() {
    const watchlistGrid = document.getElementById('watchlistGrid');
    if (!watchlistGrid) return;
    
    watchlistGrid.innerHTML = '';
    
    if (watchlist.length === 0) {
        watchlistGrid.innerHTML = '<p class="empty-message">Your watchlist is empty. Add movies to get started!</p>';
    } else {
        watchlist.forEach(movie => {
            const card = createMovieCard(movie);
            watchlistGrid.appendChild(card);
        });
    }
}

function saveWatchlist() {
    localStorage.setItem('movieWatchlist', JSON.stringify(watchlist));
}

function loadWatchlist() {
    const saved = localStorage.getItem('movieWatchlist');
    if (saved) {
        watchlist = JSON.parse(saved);
        updateWatchlist();
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) {
        renderMovies(movies);
        return;
    }
    
    const results = movies.filter(movie => 
        movie.title.toLowerCase().includes(query)
    );
    
    renderMovies(results);
}

function filterByGenre(genre) {
    currentFilter = genre;
    const filtered = movies.filter(m => m.genre === genre);
    renderMovies(filtered);
    
    // Scroll to popular section
    const popularSection = document.getElementById('popular');
    if (popularSection) {
        popularSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}
