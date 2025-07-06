// TMDb API Configuration
const API_KEY = 'demo_key'; // Replace with your actual API key from https://www.themoviedb.org/settings/api
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Application State
let currentPage = 1;
let totalPages = 1;
let currentCategory = 'popular';
let currentQuery = '';
let currentGenre = '';
let currentYear = '';
let currentSort = 'popularity.desc';
let allGenres = [];

// DOM Elements
const moviesGrid = document.getElementById('moviesGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterTabs = document.querySelectorAll('.filter-tab');
const genreFilter = document.getElementById('genreFilter');
const yearFilter = document.getElementById('yearFilter');
const sortBy = document.getElementById('sortBy');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentPageSpan = document.getElementById('currentPage');
const totalPagesSpan = document.getElementById('totalPages');
const resultsCount = document.getElementById('resultsCount');
const sectionTitle = document.getElementById('sectionTitle');
const movieModal = document.getElementById('movieModal');
const movieDetails = document.getElementById('movieDetails');
const closeModal = document.querySelector('.close');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Check if API key is configured
    if (API_KEY === 'demo_key') {
        showDemoData();
        return;
    }
    
    initializeApp();
});

// Show demo data when API key is not configured
function showDemoData() {
    const demoMovies = generateDemoMovies();
    displayMovies(demoMovies);
    updatePagination(1, 500); // Simulate 500 pages of demo data
    updateResultsCount(10000); // Simulate 10,000 movies
    
    // Show API key notice
    const notice = document.createElement('div');
    notice.className = 'api-notice';
    notice.innerHTML = `
        <div style="background: rgba(255, 107, 107, 0.1); border: 1px solid #ff6b6b; padding: 1rem; margin: 1rem 0; border-radius: 8px; text-align: center;">
            <p><strong>Demo Mode:</strong> To access real movie data, get your free API key from <a href="https://www.themoviedb.org/settings/api" target="_blank">The Movie Database</a> and replace the API_KEY in script.js</p>
        </div>
    `;
    document.querySelector('.movies-section .container').insertBefore(notice, document.querySelector('.section-header'));
}

// Generate demo movie data
function generateDemoMovies() {
    const movieTitles = [
        'The Shawshank Redemption', 'The Godfather', 'The Dark Knight', 'Pulp Fiction', 'Forrest Gump',
        'Inception', 'The Matrix', 'Goodfellas', 'The Lord of the Rings', 'Fight Club',
        'Avatar', 'Titanic', 'Avengers: Endgame', 'Star Wars', 'Jurassic Park',
        'The Lion King', 'Toy Story', 'Back to the Future', 'Casablanca', 'The Wizard of Oz'
    ];
    
    const genres = ['Action', 'Drama', 'Comedy', 'Thriller', 'Sci-Fi', 'Romance', 'Horror'];
    
    return movieTitles.map((title, index) => ({
        id: index + 1,
        title: title,
        poster_path: `https://via.placeholder.com/300x450/333/fff?text=${encodeURIComponent(title)}`,
        release_date: `${1990 + Math.floor(Math.random() * 30)}-01-01`,
        vote_average: (Math.random() * 4 + 6).toFixed(1),
        overview: `This is a demo movie description for ${title}. In demo mode, you're seeing sample data. To access real movie information from The Movie Database, please configure your API key.`,
        genre_ids: [Math.floor(Math.random() * genres.length)],
        genres: [{ name: genres[Math.floor(Math.random() * genres.length)] }]
    }));
}

// Initialize the application
async function initializeApp() {
    try {
        await loadGenres();
        await loadMovies();
        setupEventListeners();
        setupYearFilter();
    } catch (error) {
        console.error('Error initializing app:', error);
        showError('Failed to load movie data. Please check your API key and internet connection.');
    }
}

// Load genres from API
async function loadGenres() {
    try {
        const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        const data = await response.json();
        allGenres = data.genres;
        populateGenreFilter();
    } catch (error) {
        console.error('Error loading genres:', error);
    }
}

// Populate genre filter dropdown
function populateGenreFilter() {
    genreFilter.innerHTML = '<option value="">All Genres</option>';
    allGenres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreFilter.appendChild(option);
    });
}

// Setup year filter
function setupYearFilter() {
    const currentYear = new Date().getFullYear();
    yearFilter.innerHTML = '<option value="">All Years</option>';
    
    for (let year = currentYear; year >= 1900; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            setActiveTab(e.target);
            currentCategory = filter;
            currentPage = 1;
            currentQuery = '';
            searchInput.value = '';
            loadMovies();
        });
    });
    
    // Filter controls
    genreFilter.addEventListener('change', handleFilterChange);
    yearFilter.addEventListener('change', handleFilterChange);
    sortBy.addEventListener('change', handleFilterChange);
    
    // Pagination
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadMovies();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            loadMovies();
        }
    });
    
    // Modal
    closeModal.addEventListener('click', closeMovieModal);
    window.addEventListener('click', (e) => {
        if (e.target === movieModal) {
            closeMovieModal();
        }
    });
}

// Handle search
function handleSearch() {
    currentQuery = searchInput.value.trim();
    if (currentQuery) {
        currentPage = 1;
        currentCategory = 'search';
        setActiveTab(null);
        loadMovies();
    } else {
        currentCategory = 'popular';
        currentPage = 1;
        setActiveTab(document.querySelector('[data-filter="popular"]'));
        loadMovies();
    }
}

// Handle filter changes
function handleFilterChange() {
    currentGenre = genreFilter.value;
    currentYear = yearFilter.value;
    currentSort = sortBy.value;
    currentPage = 1;
    
    if (currentQuery) {
        loadMovies();
    } else {
        currentCategory = 'discover';
        loadMovies();
    }
}

// Set active tab
function setActiveTab(activeTab) {
    filterTabs.forEach(tab => tab.classList.remove('active'));
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

// Load movies from API
async function loadMovies() {
    showLoading();
    
    try {
        let url = '';
        const params = new URLSearchParams({
            api_key: API_KEY,
            page: currentPage
        });
        
        if (currentQuery) {
            url = `${BASE_URL}/search/movie`;
            params.append('query', currentQuery);
        } else if (currentCategory === 'discover' || currentGenre || currentYear || currentSort !== 'popularity.desc') {
            url = `${BASE_URL}/discover/movie`;
            if (currentGenre) params.append('with_genres', currentGenre);
            if (currentYear) params.append('year', currentYear);
            params.append('sort_by', currentSort);
        } else {
            url = `${BASE_URL}/movie/${currentCategory}`;
        }
        
        const response = await fetch(`${url}?${params}`);
        const data = await response.json();
        
        if (data.results) {
            displayMovies(data.results);
            updatePagination(data.page, data.total_pages);
            updateResultsCount(data.total_results);
            updateSectionTitle();
        } else {
            showError('No movies found');
        }
    } catch (error) {
        console.error('Error loading movies:', error);
        showError('Failed to load movies. Please try again.');
    }
}

// Display movies in the grid
function displayMovies(movies) {
    moviesGrid.innerHTML = '';
    
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesGrid.appendChild(movieCard);
    });
}

// Create movie card element
function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.addEventListener('click', () => openMovieModal(movie.id));
    
    const posterPath = movie.poster_path 
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : 'https://via.placeholder.com/300x450/333/fff?text=No+Image';
    
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    
    movieCard.innerHTML = `
        <img src="${posterPath}" alt="${movie.title}" class="movie-poster">
        <div class="movie-info">
            <h4 class="movie-title">${movie.title}</h4>
            <p class="movie-year">${year}</p>
            <div class="movie-rating">
                <i class="fas fa-star"></i>
                <span>${rating}</span>
            </div>
        </div>
    `;
    
    // Add favorite button
    addFavoriteButton(movieCard, movie.id);
    
    return movieCard;
}

// Open movie modal
async function openMovieModal(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`);
        const movie = await response.json();
        
        displayMovieDetails(movie);
        movieModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error('Error loading movie details:', error);
        showError('Failed to load movie details');
    }
}

// Display movie details in modal
function displayMovieDetails(movie) {
    const backdropPath = movie.backdrop_path 
        ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
        : `${IMAGE_BASE_URL}${movie.poster_path}`;
    
    const posterPath = movie.poster_path 
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : 'https://via.placeholder.com/300x450/333/fff?text=No+Image';
    
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
    const runtime = movie.runtime ? `${movie.runtime} min` : 'N/A';
    const budget = movie.budget ? `$${(movie.budget / 1000000).toFixed(1)}M` : 'N/A';
    const revenue = movie.revenue ? `$${(movie.revenue / 1000000).toFixed(1)}M` : 'N/A';
    
    const genres = movie.genres ? movie.genres.map(genre => 
        `<span class="genre-tag">${genre.name}</span>`
    ).join('') : '';
    
    movieDetails.innerHTML = `
        <div class="movie-header">
            <img src="${posterPath}" alt="${movie.title}" class="movie-backdrop">
            <div class="movie-meta">
                <h2>${movie.title}</h2>
                ${movie.tagline ? `<p class="tagline">"${movie.tagline}"</p>` : ''}
                
                <div class="movie-stats">
                    <div class="stat">
                        <div class="stat-value">${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</div>
                        <div class="stat-label">Rating</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${year}</div>
                        <div class="stat-label">Year</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${runtime}</div>
                        <div class="stat-label">Runtime</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${budget}</div>
                        <div class="stat-label">Budget</div>
                    </div>
                </div>
                
                <div class="movie-genres">
                    ${genres}
                </div>
            </div>
        </div>
        
        <div class="movie-overview">
            <h3>Overview</h3>
            <p>${movie.overview || 'No overview available.'}</p>
        </div>
    `;
}

// Close movie modal
function closeMovieModal() {
    movieModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Update pagination
function updatePagination(page, totalPgs) {
    currentPage = page;
    totalPages = totalPgs;
    
    currentPageSpan.textContent = currentPage;
    totalPagesSpan.textContent = totalPages;
    
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;
}

// Update results count
function updateResultsCount(count) {
    resultsCount.textContent = `${count.toLocaleString()} movies found`;
}

// Update section title
function updateSectionTitle() {
    let title = '';
    
    if (currentQuery) {
        title = `Search Results for "${currentQuery}"`;
    } else if (currentCategory === 'discover') {
        title = 'Filtered Movies';
    } else {
        switch (currentCategory) {
            case 'popular':
                title = 'Popular Movies';
                break;
            case 'top_rated':
                title = 'Top Rated Movies';
                break;
            case 'upcoming':
                title = 'Upcoming Movies';
                break;
            case 'now_playing':
                title = 'Now Playing';
                break;
            default:
                title = 'Movies';
        }
    }
    
    sectionTitle.textContent = title;
}

// Show loading state
function showLoading() {
    moviesGrid.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Loading movies...</p>
        </div>
    `;
}

// Show error message
function showError(message) {
    moviesGrid.innerHTML = `
        <div class="loading">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ff6b6b; margin-bottom: 1rem;"></i>
            <p>${message}</p>
        </div>
    `;
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some interactive features
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape' && movieModal.style.display === 'block') {
        closeMovieModal();
    }
    
    // Quick search with Ctrl+F
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        searchInput.focus();
    }
});

// Add favorites functionality (using localStorage)
let favorites = JSON.parse(localStorage.getItem('movieFavorites')) || [];

function toggleFavorite(movieId) {
    const index = favorites.indexOf(movieId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(movieId);
    }
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
    updateFavoriteButtons();
}

function updateFavoriteButtons() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const movieId = parseInt(btn.dataset.movieId);
        const isFavorite = favorites.includes(movieId);
        btn.innerHTML = isFavorite ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
        btn.classList.toggle('favorite', isFavorite);
    });
}

// Add to movie card creation
function addFavoriteButton(movieCard, movieId) {
    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'favorite-btn';
    favoriteBtn.dataset.movieId = movieId;
    favoriteBtn.innerHTML = favorites.includes(movieId) ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(movieId);
    });
    
    movieCard.appendChild(favoriteBtn);
}

// Initialize favorites when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateFavoriteButtons();
});