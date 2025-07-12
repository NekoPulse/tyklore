// Sample comic data
const comicsData = [
    {
        id: 1,
        title: "La Leyenda del Jinete sin Cabeza",
        author: "María González",
        image: "https://via.placeholder.com/100x130",
        likes: 128,
        views: 2450,
        chapters: 12,
        isNew: true,
        isPopular: true
    },
    {
        id: 2,
        title: "El Secreto de la Montaña",
        author: "Carlos Méndez",
        image: "https://via.placeholder.com/100x130",
        likes: 98,
        views: 1870,
        chapters: 8,
        isNew: false,
        isPopular: true
    },
    {
        id: 3,
        title: "Caminos de Luna",
        author: "Ana Ramírez",
        image: "https://via.placeholder.com/100x130",
        likes: 76,
        views: 1540,
        chapters: 15,
        isNew: true,
        isPopular: false
    },
    {
        id: 4,
        title: "El Último Canto",
        author: "Jorge Silva",
        image: "https://via.placeholder.com/100x130",
        likes: 210,
        views: 4320,
        chapters: 22,
        isNew: false,
        isPopular: true
    },
    {
        id: 5,
        title: "Raíces Perdidas",
        author: "Laura Torres",
        image: "https://via.placeholder.com/100x130",
        likes: 65,
        views: 980,
        chapters: 5,
        isNew: true,
        isPopular: false
    },
    {
        id: 6,
        title: "El Espejo del Tiempo",
        author: "Diego Mendoza",
        image: "https://via.placeholder.com/100x130",
        likes: 178,
        views: 3210,
        chapters: 18,
        isNew: false,
        isPopular: true
    }
];

// DOM Elements
const comicsContainer = document.getElementById('comics-container');
const searchInput = document.getElementById('search-input');

// Create comic card HTML
function createComicCard(comic) {
    const card = document.createElement('div');
    card.className = 'comic-card';
    
    const isNewBadge = comic.isNew ? '<span class="badge new">Nuevo</span>' : '';
    const isPopularBadge = comic.isPopular ? '<span class="badge popular">Popular</span>' : '';
    
    card.innerHTML = `
        <img src="${comic.image}" alt="${comic.title}" class="comic-image">
        <div class="comic-info">
            <div class="comic-title-author">
                <h3 class="comic-title">${comic.title}</h3>
                <span class="title-separator">•</span>
                <span class="comic-author">${comic.author}</span>
                ${isNewBadge}
                ${isPopularBadge}
            </div>
            <div class="comic-stats">
                <div class="stat-item">
                    <i class="fas fa-eye"></i>
                    <span>${comic.views.toLocaleString()}</span>
                </div>
                <div class="stat-item">
                    <i class="fas fa-book"></i>
                    <span>${comic.chapters} capítulos</span>
                </div>
            </div>
            <div class="comic-actions">
                <button class="action-btn like-btn" onclick="toggleLike(this)">
                    <i class="fas fa-heart"></i>
                    <span>${comic.likes}</span>
                </button>
                <a href="#" class="action-btn">
                    <i class="fas fa-book-open"></i>
                    <span>Leer</span>
                </a>
            </div>
        </div>
    `;
    
    return card;
}

// Load comics into the grid
function loadComics(append = false) {
    if (!append) {
        comicsContainer.innerHTML = '';
    }
    
    const searchTerm = searchInput.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter;
    
    const filteredComics = comicsData.filter(comic => {
        const matchesSearch = comic.title.toLowerCase().includes(searchTerm) || 
                            comic.author.toLowerCase().includes(searchTerm);
        
        let matchesFilter = true;
        if (activeFilter === 'new') {
            matchesFilter = comic.isNew;
        } else if (activeFilter === 'popular') {
            matchesFilter = comic.isPopular;
        }
        
        return matchesSearch && matchesFilter;
    });
    
    if (filteredComics.length === 0) {
        const noResults = document.createElement('p');
        noResults.textContent = 'No se encontraron cómics que coincidan con la búsqueda.';
        noResults.style.gridColumn = '1 / -1';
        noResults.style.textAlign = 'center';
        noResults.style.padding = '40px 0';
        noResults.style.color = '#6b7280';
        comicsContainer.appendChild(noResults);
        return;
    }
    
    filteredComics.forEach(comic => {
        const card = createComicCard(comic);
        comicsContainer.appendChild(card);
    });
}

// Toggle like button
function toggleLike(button) {
    button.classList.toggle('liked');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Load initial comics
    loadComics();
    
    // Search functionality
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            loadComics();
        }, 300);
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadComics();
        });
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
});
