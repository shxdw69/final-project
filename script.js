const usdToInrRate = 83; 
function convertToINR(usdPrice) {
    return (usdPrice * usdToInrRate).toFixed(0); // round to nearest rupee
}

const games = [
    { id: 1, title: "Cyber Odyssey 2077", price: 59.99, image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400", genre: "RPG", rating: 4.5, featured: true },
    { id: 2, title: "Shadow Legends", price: 49.99, image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400", genre: "Action", rating: 4.8, featured: true },
    { id: 3, title: "Galactic Warfare", price: 39.99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTKfps2BYcm1T7oD3XmKS1DLeOLuNm13f2xQ&s", genre: "FPS", rating: 4.3, featured: true },
    { id: 4, title: "Dragon's Quest X", price: 54.99, image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400", genre: "RPG", rating: 4.7, featured: true },
    { id: 5, title: "Ashphalt 9", price: 44.99, image: "https://images.indianexpress.com/2020/05/Asphalt-9-Legends-759.jpg?w=414", genre: "Racing", rating: 4.2, featured: true },
    { id: 6, title: "Battlefield Elite", price: 59.99, image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400", genre: "FPS", rating: 4.6, featured: false },
    { id: 7, title: "Mystery Island", price: 34.99, image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400", genre: "Adventure", rating: 4.4, featured: false },
    { id: 8, title: "Empire Builder", price: 29.99, image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400", genre: "Strategy", rating: 4.5, featured: false },
    { id: 9, title: "Zombie Survival", price: 24.99, image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400", genre: "Horror", rating: 4.1, featured: false },
    { id: 10, title: "Soccer Champions", price: 49.99, image: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=400", genre: "Sports", rating: 4.3, featured: false },
    { id: 11, title: "Ninja Warriors", price: 39.99, image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400", genre: "Action", rating: 4.6, featured: false },
    { id: 12, title: "Space Explorer", price: 44.99, image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400", genre: "Adventure", rating: 4.7, featured: false },
    { id: 13, title: "Racing Thunder", price: 34.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", genre: "Racing", rating: 4.0, featured: false },
    { id: 14, title: "Dark Souls Reborn", price: 59.99, image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400", genre: "RPG", rating: 4.9, featured: false },
    { id: 15, title: "Stealth Ops", price: 49.99, image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400", genre: "Action", rating: 4.4, featured: false },
    { id: 16, title: "Haunted Manor", price: 29.99, image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400", genre: "Horror", rating: 4.2, featured: false }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let liked = JSON.parse(localStorage.getItem('liked')) || [];
let currentSlide = 0;
let currentGenreFilter = 'All';


document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    renderGameGrids();
    updateBadges();
});


function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateBadges();
}


function updateBadges() {
    document.getElementById('cartCount').textContent = cart.length;
    document.getElementById('wishlistCount').textContent = wishlist.length;
}


function showPage(pageName) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageName + 'Page').classList.add('active');
    
    if (pageName === 'cart') renderCart();
    if (pageName === 'wishlist') renderWishlist();
    if (pageName === 'checkout') renderCheckout();
    
    window.scrollTo(0, 0);
}


function initCarousel() {
    const featuredGames = games.filter(g => g.featured);
    const track = document.getElementById('carouselTrack');
    const dots = document.getElementById('carouselDots');
    
    track.innerHTML = featuredGames.map(game => `
        <div class="carousel-slide">
            <img src="${game.image}" alt="${game.title}">
            <div class="carousel-overlay">
                <h3>${game.title}</h3>
                <p>₹${convertToINR(game.price)}</p>
            </div>
        </div>
    `).join('');
    
    dots.innerHTML = featuredGames.map((_, i) => `
        <div class="carousel-dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></div>
    `).join('');
    

    setInterval(() => moveCarousel(1), 5000);
}

function moveCarousel(direction) {
    const featuredGames = games.filter(g => g.featured);
    currentSlide = (currentSlide + direction + featuredGames.length) % featuredGames.length;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}


function renderGameGrids() {
    const filtered = currentGenreFilter === 'All' 
        ? games 
        : games.filter(g => g.genre === currentGenreFilter);
    

    renderGrid('trendingGrid', filtered.slice(0, 4));
    

    const likedGames = filtered.filter(g => liked.includes(g.id));
    const otherGames = filtered.filter(g => !liked.includes(g.id));
    renderGrid('likedGrid', [...likedGames, ...otherGames].slice(0, 4));
    
 
    const topRated = [...filtered].sort((a, b) => b.rating - a.rating);
    renderGrid('topRatedGrid', topRated.slice(0, 4));
    

    renderGrid('newReleasesGrid', filtered.slice(-4).reverse());
}

function renderGrid(gridId, gameList) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    grid.innerHTML = gameList.map(game => createGameCard(game)).join('');
}

function createGameCard(game) {
    const inCart = cart.includes(game.id);
    const inWishlist = wishlist.includes(game.id);
    const isLiked = liked.includes(game.id);
    
    return `
        <div class="game-card">
            <img src="${game.image}" alt="${game.title}">
            <div class="game-card-content">
                <h3>${game.title}</h3>
                <p class="genre">${game.genre}</p>
                <p class="rating">⭐ ${game.rating.toFixed(1)}</p>
                <p class="price">₹${convertToINR(game.price)}</p>
                <div class="game-card-actions">
                    <button class="action-btn btn-wishlist ${inWishlist ? 'active' : ''}" onclick="toggleWishlist(${game.id})">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                    <button class="action-btn btn-cart ${inCart ? 'added' : ''}" onclick="toggleCart(${game.id})">
                        ${inCart ? '✓ Added' : '<i class="fa-solid fa-cart-shopping"></i> '}
                    </button>
                </div>
            </div>
        </div>
    `;
}


function toggleCart(gameId) {
    const index = cart.indexOf(gameId);
    if (index > -1) {
        cart.splice(index, 1);
    } else {
        cart.push(gameId);
    }
    saveToStorage();
    renderGameGrids();
    renderSearchResults();
}

function removeFromCart(gameId) {
    cart = cart.filter(id => id !== gameId);
    saveToStorage();
    renderCart();
}

function renderCart() {
    const container = document.getElementById('cartItems');
    const summary = document.getElementById('cartSummary');
    
    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>Your cart is empty</h3><p>Add some games to get started!</p></div>';
        summary.innerHTML = '';
        return;
    }
    
    const cartGames = games.filter(g => cart.includes(g.id));
    const total = cartGames.reduce((sum, g) => sum + g.price, 0);
    
    container.innerHTML = cartGames.map(game => `
        <div class="item-card">
            <img src="${game.image}" alt="${game.title}">
            <div class="item-info">
                <h3>${game.title}</h3>
                <p class="price">₹${convertToINR(game.price)}</p>
            </div>
            <div class="item-actions">
                <button class="remove-btn" onclick="removeFromCart(${game.id})">Remove</button>
            </div>
        </div>
    `).join('');
    
    summary.innerHTML = `
        <p class="total">Total: <span>₹${convertToINR(total)}</span></p>
        <button class="checkout-btn" onclick="showPage('checkout')">Proceed to Checkout</button>
    `;
}


function toggleWishlist(gameId) {
    const index = wishlist.indexOf(gameId);
    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(gameId);
    }
    saveToStorage();
    renderGameGrids();
    renderSearchResults();
}

function removeFromWishlist(gameId) {
    wishlist = wishlist.filter(id => id !== gameId);
    saveToStorage();
    renderWishlist();
}

function renderWishlist() {
    const container = document.getElementById('wishlistItems');
    
    if (wishlist.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>Your wishlist is empty</h3><p>Save games you want to buy later!</p></div>';
        return;
    }
    
    const wishlistGames = games.filter(g => wishlist.includes(g.id));
    
    container.innerHTML = wishlistGames.map(game => `
        <div class="item-card">
            <img src="${game.image}" alt="${game.title}">
            <div class="item-info">
                <h3>${game.title}</h3>
                <p class="price">₹${convertToINR(game.price)}</p>
            </div>
            <div class="item-actions">
                <button class="add-cart-btn" onclick="toggleCart(${game.id}); renderWishlist();">Add to Cart</button>
                <button class="remove-btn" onclick="removeFromWishlist(${game.id})">Remove</button>
            </div>
        </div>
    `).join('');
}


function toggleLike(gameId) {
    const index = liked.indexOf(gameId);
    if (index > -1) {
        liked.splice(index, 1);
    } else {
        liked.push(gameId);
    }
    saveToStorage();
    renderGameGrids();
    renderSearchResults();
}

function removeFromLiked(gameId) {
    liked = liked.filter(id => id !== gameId);
    saveToStorage();
    renderLiked();
}

function renderLiked() {
    const container = document.getElementById('likedItems');
    
    if (liked.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>No liked games yet</h3><p>Like games you enjoy!</p></div>';
        return;
    }
    
    const likedGames = games.filter(g => liked.includes(g.id));
    
    container.innerHTML = likedGames.map(game => `
        <div class="item-card">
            <img src="${game.image}" alt="${game.title}">
            <div class="item-info">
                <h3>${game.title}</h3>
                <p class="price">₹${convertToINR(game.price)}</p>
            </div>
            <div class="item-actions">
                <button class="add-cart-btn" onclick="toggleCart(${game.id}); renderLiked();">Add to Cart</button>
                <button class="remove-btn" onclick="removeFromLiked(${game.id})">Unlike</button>
            </div>
        </div>
    `).join('');
}


function searchGames() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const searchSection = document.getElementById('searchResults');
    const searchGrid = document.getElementById('searchGrid');
    
    if (query === '') {
        searchSection.style.display = 'none';
        document.querySelectorAll('.games-section:not(#searchResults)').forEach(s => s.style.display = 'block');
        return;
    }
    
    const results = games.filter(g => 
        g.title.toLowerCase().includes(query) || 
        g.genre.toLowerCase().includes(query)
    );
    
    document.querySelectorAll('.games-section:not(#searchResults)').forEach(s => s.style.display = 'none');
    searchSection.style.display = 'block';
    
    if (results.length === 0) {
        searchGrid.innerHTML = '<div class="empty-state"><h3>No games found</h3><p>Try a different search term</p></div>';
    } else {
        searchGrid.innerHTML = results.map(game => createGameCard(game)).join('');
    }
}

function renderSearchResults() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    if (query !== '') {
        searchGames();
    }
}

function filterByGenre(genre) {
    currentGenreFilter = genre;
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').style.display = 'none';
    document.querySelectorAll('.games-section:not(#searchResults)').forEach(s => s.style.display = 'block');
    renderGameGrids();
    showPage('home');
}


function renderCheckout() {
    const itemsContainer = document.getElementById('checkoutItems');
    const totalContainer = document.getElementById('checkoutTotal');
    
    const cartGames = games.filter(g => cart.includes(g.id));
    const total = cartGames.reduce((sum, g) => sum + g.price, 0);
    
    itemsContainer.innerHTML = cartGames.map(game => `
        <div class="summary-item">
            <span>${game.title}</span>
            <span>₹${convertToINR(game.price)}</span>
        </div>
    `).join('');
    
    totalContainer.innerHTML = `Total: <span>₹${convertToINR(total)}</span>`;
}

function processPayment(event) {
    event.preventDefault();
    
    document.getElementById('successModal').classList.add('active');
    
    cart = [];
    saveToStorage();
}

function closeModal() {
    document.getElementById('successModal').classList.remove('active');
    showPage('home');
}
