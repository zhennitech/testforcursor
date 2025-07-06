# 🎬 CineStream - Movie Selection Website

A modern, responsive movie selection website featuring thousands of movies with advanced search, filtering, and discovery capabilities.

## 🌟 Features

### 🎭 **Browse 10,000+ Movies**
- Access to The Movie Database (TMDb) with hundreds of thousands of movies
- High-quality movie posters and detailed information
- Regular updates with new releases

### 🔍 **Advanced Search & Filtering**
- **Search**: Find movies by title, keyword, or phrase
- **Categories**: Popular, Top Rated, Upcoming, Now Playing
- **Genres**: Action, Drama, Comedy, Thriller, and more
- **Year Filter**: Browse movies from any year (1900-present)
- **Sorting**: By popularity, rating, release date, or title

### 🎨 **Modern UI/UX**
- Dark theme with beautiful gradients and animations
- Responsive design that works on all devices
- Smooth scrolling and hover effects
- Loading animations and error handling

### 🔧 **Interactive Features**
- **Movie Details Modal**: Click any movie for detailed information
- **Favorites**: Save movies to your personal favorites list
- **Pagination**: Navigate through thousands of results
- **Keyboard Shortcuts**: 
  - `Ctrl+F` for quick search
  - `Esc` to close modals

### 📱 **Mobile Responsive**
- Optimized for phones, tablets, and desktops
- Touch-friendly interface
- Adaptive layouts

## 🚀 Quick Start

### Option 1: Demo Mode (Instant)
1. Open `index.html` in your browser
2. The website will show demo data immediately
3. Perfect for testing the interface and features

### Option 2: Live Data (Recommended)
1. **Get a free API key** from [The Movie Database](https://www.themoviedb.org/settings/api)
2. **Replace the API key** in `script.js`:
   ```javascript
   const API_KEY = 'your_api_key_here'; // Replace 'demo_key' with your actual key
   ```
3. **Open `index.html`** in your browser
4. **Enjoy browsing real movie data!**

## 📋 Setup Instructions

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for API calls and CDN resources)

### Installation
1. **Clone or download** this repository
2. **No build process required** - pure HTML, CSS, and JavaScript
3. **Open `index.html`** in any web browser

### Getting Your API Key
1. Go to [The Movie Database](https://www.themoviedb.org/)
2. Create a free account
3. Navigate to [API Settings](https://www.themoviedb.org/settings/api)
4. Request an API key (it's free!)
5. Copy your API key and replace `demo_key` in `script.js`

## 🎯 Usage Guide

### Basic Navigation
- **Home**: Browse popular movies
- **Search**: Use the search bar to find specific movies
- **Filter Tabs**: Switch between Popular, Top Rated, Upcoming, and Now Playing
- **Dropdowns**: Filter by genre, year, or change sorting

### Movie Interaction
- **Click any movie** to view detailed information
- **Use the heart icon** to add/remove from favorites
- **Navigate pages** using Previous/Next buttons

### Search Tips
- Search by movie title, keywords, or phrases
- Use filters to narrow down results
- Combine search with genre and year filters for precise results

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with Flexbox and Grid
- **Vanilla JavaScript**: No frameworks, pure JS
- **The Movie Database API**: Real-time movie data
- **Font Awesome**: Beautiful icons
- **Google Fonts**: Inter font family

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features
- Lazy loading for images
- Efficient API calls with pagination
- Local storage for favorites
- Responsive images with proper sizing

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #ff6b6b;
    --secondary-color: #4ecdc4;
    --background-color: #0c0c0c;
}
```

### Adding New Features
The code is modular and easy to extend:
- Add new filter options in the HTML
- Extend the JavaScript functions
- Customize the movie card layout

## 📊 API Information

### The Movie Database (TMDb)
- **Free tier**: 1,000 requests per day
- **Data**: 700,000+ movies and TV shows
- **Updates**: Daily updates with new content
- **Documentation**: [TMDb API Docs](https://developers.themoviedb.org/3)

### API Endpoints Used
- `/movie/popular` - Popular movies
- `/movie/top_rated` - Top rated movies
- `/movie/upcoming` - Upcoming movies
- `/movie/now_playing` - Now playing movies
- `/search/movie` - Search movies
- `/discover/movie` - Discover with filters
- `/genre/movie/list` - Movie genres

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **The Movie Database (TMDb)** for providing the movie data API
- **Font Awesome** for the beautiful icons
- **Google Fonts** for the Inter font family
- **Community** for inspiration and feedback

## 📞 Support

- **Issues**: Report bugs or request features via GitHub Issues
- **API Problems**: Check [TMDb API Status](https://status.themoviedb.org/)
- **Browser Issues**: Ensure you're using a modern browser

---

**Enjoy exploring thousands of movies with CineStream!** 🍿✨