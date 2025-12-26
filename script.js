// ===== LOADING SCREEN =====
window.addEventListener('load', function () {
    setTimeout(function () {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 1500); // Loading screen selama 1.5 detik
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in').forEach(el => {
    observer.observe(el);
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('header');
window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function () {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Offset untuk navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ANIMATE HERO ON LOAD =====
window.addEventListener('load', function () {
    setTimeout(function () {
        document.querySelectorAll('.hero .fade-in, .hero .scale-in').forEach(el => {
            el.classList.add('visible');
        });
    }, 1600); // Setelah loading screen hilang
});

// ===== PRODUCT SLIDER =====
const productTrack = document.getElementById('productTrack');
const prevProductBtn = document.getElementById('prevProductBtn');
const nextProductBtn = document.getElementById('nextProductBtn');

if (productTrack && prevProductBtn && nextProductBtn) {
    let currentProductSlide = 0;

    // Function to determine visible slides based on window width
    function getVisibleSlides() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 900) return 2;
        if (window.innerWidth <= 1200) return 3;
        return 4;
    }

    function updateProductSlider() {
        const cards = document.querySelectorAll('.product-slider-track .product-card');
        const totalProductSlides = cards.length;
        const visibleSlides = getVisibleSlides();

        let maxIndex = totalProductSlides - visibleSlides;
        if (maxIndex < 0) maxIndex = 0;

        if (currentProductSlide > maxIndex) currentProductSlide = 0;
        if (currentProductSlide < 0) currentProductSlide = maxIndex;

        // Use pixel-based translation for accuracy
        let cardWidth = 0;
        let gap = 30; // Default gap from CSS

        if (cards.length > 0) {
            cardWidth = cards[0].offsetWidth;
            // Try to get computed gap
            const trackStyle = window.getComputedStyle(productTrack);
            const computedGap = parseFloat(trackStyle.gap);
            if (!isNaN(computedGap)) gap = computedGap;
        }

        const moveAmount = (cardWidth + gap) * currentProductSlide;
        productTrack.style.transform = `translateX(-${moveAmount}px)`;
    }

    nextProductBtn.addEventListener('click', () => {
        const visibleSlides = getVisibleSlides();
        const cards = document.querySelectorAll('.product-slider-track .product-card');
        const maxIndex = cards.length - visibleSlides;

        if (currentProductSlide < maxIndex) {
            currentProductSlide++;
        } else {
            currentProductSlide = 0;
        }
        updateProductSlider();
    });

    prevProductBtn.addEventListener('click', () => {
        const visibleSlides = getVisibleSlides();
        const cards = document.querySelectorAll('.product-slider-track .product-card');
        const maxIndex = cards.length - visibleSlides;

        if (currentProductSlide > 0) {
            currentProductSlide--;
        } else {
            currentProductSlide = maxIndex;
        }
        updateProductSlider();
    });

    // Reset on resize to avoid alignment issues
    window.addEventListener('resize', () => {
        currentProductSlide = 0;
        updateProductSlider();
    });
}

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');
const navLinksLi = document.querySelectorAll('.nav-links li');

if (hamburger && navLinksContainer) {
    hamburger.addEventListener('click', () => {
        // Toggle Nav
        navLinksContainer.classList.toggle('nav-active');

        // Burger Animation
        hamburger.classList.toggle('toggle');

        // Animate Links
        navLinksLi.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close menu when clicking a link
    navLinksLi.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('nav-active');
            hamburger.classList.remove('toggle');

            // Reset animations
            navLinksLi.forEach(link => {
                link.style.animation = '';
            });
        });
    });
}