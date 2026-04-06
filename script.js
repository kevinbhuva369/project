// ==========================================
// Divine Preloader Engine
// ==========================================
const isViewPage = window.location.pathname.toLowerCase().includes('/viewpage/') || window.location.href.toLowerCase().includes('/viewpage/');
const loaderPrefix = isViewPage ? '../' : '';

const loaderHtml = `
    <div id="divine-preloader">
        <img src="${loaderPrefix}colorful-arabesque-mandala-pattern-background_492473-352.avif" alt="Divine Mandala" class="preloader-mandala">
        <div class="preloader-text">DIVINE JOURNEY</div>
    </div>
`;
document.body.insertAdjacentHTML('afterbegin', loaderHtml);
document.body.classList.add('loading');

window.addEventListener('load', () => {
    // Premium fast delay
    setTimeout(() => {
        const preloader = document.getElementById('divine-preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            document.body.classList.remove('loading'); 
            setTimeout(() => preloader.remove(), 400);
        }
        
        // Initialize Scroll Reveal after loading
        initScrollReveal();
    }, 50);
});

// ==========================================
// Butter-Smooth Scroll Reveal Engine
// ==========================================
function initScrollReveal() {
    const revealSelectors = [
        '.temple-card', 
        '.divine-title', 
        '.section-title', 
        '.drop-cap-paragraph', 
        '.inline-history-img',
        '.authentic-gallery-item',
        '.about-text',
        '.contact-card',
        '.top-information',
        '.map-container'
    ];
    
    // Auto-inject reveal class
    const elementsToReveal = document.querySelectorAll(revealSelectors.join(', '));
    elementsToReveal.forEach(el => {
        if (!el.classList.contains('scroll-reveal')) {
            el.classList.add('scroll-reveal');
        }
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Observe generated elements
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        revealObserver.observe(el);
    });
}

// ==========================================
// Basic JavaScript & Global Temple Database (50 Perfect Local Static DB)
// ==========================================

const templeDatabase = [
    {
        "name": "Prem Mandir",
        "location": "Vrindavan, UP",
        "image": "images/prem_mandir.png"
    },
    {
        "name": "Shri Hit Radha Keli Kunj",
        "location": "Vrindavan, UP",
        "image": "images/keli_kunj.png"
    },
    {
        "name": "Meenakshi Temple",
        "location": "Tamil Nadu",
        "image": "images/meenakshi_temple.png"
    },
    {
        "name": "Trijuginarayan",
        "location": "Uttarakhand",
        "image": "images/trijuginarayan_temple.png"
    },
    {
        "name": "Kedarnath",
        "location": "Uttarakhand",
        "image": "images/kedarnath_temple.png"
    },
    {
        "name": "Konark Sun Temple",
        "location": "Odisha",
        "image": "images/konark_sun_temple.png"
    },
    {
        "name": "Dwarkadhish Temple",
        "location": "Gujarat",
        "image": "images/dwarka_temple.png",
        "file": "dwarka"
    },
    {
        "name": "Shree Jagannatha Temple",
        "location": "Odisha",
        "image": "images/shree_jagannatha_temple.png"
    },
    {
        "name": "Kashi Vishwanath",
        "location": "Uttar Pradesh",
        "image": "images/kashi_vishwanath_temple.png"
    },
    {
        "name": "Golden Temple",
        "location": "Punjab",
        "image": "images/golden_temple.png"
    },
    {
        "name": "Somnath Temple",
        "location": "Gujarat",
        "image": "images/somnath_temple.png"
    },
    {
        "name": "Brihadeeswarar",
        "location": "Tamil Nadu",
        "image": "images/brihadeeswarar.png"
    },
    {
        "name": "Ram Mandir",
        "location": "Uttar Pradesh",
        "image": "images/ram_mandir.png"
    },
    {
        "name": "Tirupati Balaji",
        "location": "Andhra Pradesh",
        "image": "images/tirupati.png"
    },
    {
        "name": "Vaishno Devi",
        "location": "Jammu & Kashmir",
        "image": "images/vaishno_devi.png"
    },
    {
        "name": "Akshardham",
        "location": "New Delhi",
        "image": "images/akshardham.png"
    },
    {
        "name": "Badrinath",
        "location": "Uttarakhand",
        "image": "images/badrinath.png"
    },
    {
        "name": "Ramanathaswamy",
        "location": "Tamil Nadu",
        "image": "images/rameshwaram.png"
    },
    {
        "name": "Lingaraja",
        "location": "Odisha",
        "image": "images/lingaraja.png"
    },
    {
        "name": "Mahakaleshwar",
        "location": "Madhya Pradesh",
        "image": "images/mahakaleshwar.png"
    },
    {
        "name": "Kamakhya Temple",
        "location": "Assam",
        "image": "images/kamakhya.png"
    },
    {
        "name": "Virupaksha",
        "location": "Karnataka",
        "image": "images/virupaksha.png"
    },
    {
        "name": "Chidambaram",
        "location": "Tamil Nadu",
        "image": "images/chidambaram.png"
    },
    {
        "name": "Jakhu Temple",
        "location": "Himachal Pradesh",
        "image": "images/jakhu_temple.png"
    }
];

// End Database

document.addEventListener("DOMContentLoaded", function () {
    console.log("🌸 Welcome to Divine Journey! 🌸");
    console.log("Experience the Divine Essence of Ancient India. Have a peaceful day!");
    
    // Inject Search Overlay
    const overlayHtml = `
        <div class="search-overlay" id="searchOverlay">
            <button class="close-overlay" id="closeOverlay">&times;</button>
            <h2>Temple Search Results</h2>
            <div class="search-results-grid" id="searchResultsGrid"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', overlayHtml);
    
    const globalSearchInputs = document.querySelectorAll("#globalSearch");
    const searchOverlay = document.getElementById("searchOverlay");
    const closeOverlay = document.getElementById("closeOverlay");
    const searchResultsGrid = document.getElementById("searchResultsGrid");

    if (closeOverlay) {
        closeOverlay.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scroll
            globalSearchInputs.forEach(input => input.value = ''); // Clear search box
        });
    }

    globalSearchInputs.forEach(input => {
        // Handle typing in search bar
        input.addEventListener('input', function(e) {
            const term = e.target.value.toLowerCase().trim();
            if (term.length > 0) {
                searchOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
                renderResults(term);
            } else {
                searchOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Handle focus back on search bar if they click it later
        input.addEventListener('focus', function(e) {
            if (e.target.value.trim().length > 0) {
                searchOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });

        // Search button click handler
        const searchBtn = input.nextElementSibling;
        if (searchBtn && searchBtn.tagName === 'BUTTON') {
            searchBtn.addEventListener('click', () => {
                const term = input.value.toLowerCase().trim();
                if (term.length > 0) {
                    searchOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    renderResults(term);
                }
            });
        }
    });

    function renderResults(term) {
        searchResultsGrid.innerHTML = '';
        
        const inViewPage = window.location.pathname.toLowerCase().includes('/viewpage/') || window.location.href.toLowerCase().includes('/viewpage/');
        const prefix = inViewPage ? '../' : '';
        
        let foundCount = 0;
        templeDatabase.forEach(temple => {
            const matchQuery = temple.name.toLowerCase().includes(term) || temple.location.toLowerCase().includes(term);
            if (matchQuery) {
                foundCount++;

                // Highlight function
                const regex = new RegExp(`(${term})`, 'gi');
                const highlightedName = temple.name.replace(regex, '<span class="search-highlight">$1</span>');
                const highlightedLoc = temple.location.replace(regex, '<span class="search-highlight">$1</span>');

                const card = document.createElement('div');
                card.className = 'temple-card';
                card.innerHTML = `
                    <div class="card-img" style="background-image: url('${prefix}${temple.image}');"></div>
                    <div class="card-body">
                        <h3>${highlightedName}</h3>
                        <p>📍 ${highlightedLoc}</p>
                        <div class="btn">
                            <button onclick="window.location.href='${prefix}viewpage/${temple.file || temple.name}.html'">View More</button>
                        </div>
                    </div>
                `;
                searchResultsGrid.appendChild(card);
            }
        });

        if (foundCount === 0) {
            searchResultsGrid.innerHTML = `<div style="text-align: center; width: 100%; grid-column: 1 / -1;">
                <h3 style="color: var(--deep-maroon);">🙏 Temple not found!</h3>
            </div>`;
        }
    }

});