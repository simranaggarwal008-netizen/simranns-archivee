// Photo files
const photoFiles = [
    'IMG_20260705_174921.jpg',
    'IMG_20260708_155055.jpg',
    'IMG_20260714_114451_692.webp',
    'Snapchat-1091864137.jpg',
    'Snapchat-137769405.jpg',
    'Snapchat-1814060360.jpg',
    'Snapchat-1845960362.jpg',
    'Screenshot_2026_0702_123209.png'
];

// Video files
const videoFiles = [
    'VID_20260713_092954_659_bsl.mp4',
    'video_20260705_193029.mp4'
];

// Load gallery
function loadGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    
    photoFiles.forEach((photo, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        galleryItem.innerHTML = `
            <div class="photo-placeholder">
                <img src="assets/photos/${photo}" alt="Photo ${index + 1}" 
                     onerror="this.parentElement.style.background='linear-gradient(135deg, #e8495a, #d4a5a5)'; this.style.display='none';">
            </div>
        `;
        
        galleryGrid.appendChild(galleryItem);
    });
}

// Load reels
function loadReels() {
    const reelsGrid = document.getElementById('reels-grid');
    
    videoFiles.forEach((video, index) => {
        const reelItem = document.createElement('div');
        reelItem.className = 'reel-item';
        
        reelItem.innerHTML = `
            <div class="reel-container">
                <video controls style="width:100%; height:100%; object-fit:cover;">
                    <source src="assets/photos/${video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        `;
        
        reelsGrid.appendChild(reelItem);
    });
}

// Smooth scroll for navigation
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

// Scroll animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Load content on page load
window.addEventListener('load', () => {
    loadGallery();
    loadReels();
    
    // Animate cards on scroll
    setTimeout(() => {
        document.querySelectorAll('.project-card, .skill-category').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
    }, 100);
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.style.color = 'var(--text-dark)';
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.style.color = 'var(--cherry-red)';
        }
    });
});

console.log('✨ Welcome to Simrann\'s Portfolio! ✨');