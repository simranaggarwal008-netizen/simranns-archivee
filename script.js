const stickers = ['✨', '📸', '🌹', '💭', '🌺', '✨'];

const photoNames = [
    'IMG_20260705_174921.jpg',
    'Snapchat-1091864137.jpg',
    'Snapchat-1845960362.jpg',
    'Snapchat-852128112.jpg',
    'Screenshot_2026_0702_123209.png',
    'VID_20260713_092954_659_bsl.mp4'
];

function loadGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    
    photoNames.forEach((photoName, i) => {
        const photoPath = `assets/photos/${photoName}`;
        const sticker = stickers[i % stickers.length];
        
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        if (photoName.endsWith('.mp4')) {
            galleryItem.innerHTML = `
                <div class="photo-placeholder">
                    <video controls style="width:100%; height:100%; object-fit:cover;">
                        <source src="${photoPath}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class="photo-sticker">${sticker}</div>
            `;
        } else {
            galleryItem.innerHTML = `
                <div class="photo-placeholder">
                    <img src="${photoPath}" alt="Photo ${i + 1}" onerror="this.parentElement.style.background='linear-gradient(135deg, #e8495a, #d4a5a5)'; this.style.display='none';">
                </div>
                <div class="photo-sticker">${sticker}</div>
            `;
        }
        
        galleryGrid.appendChild(galleryItem);
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }
});

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

window.addEventListener('load', () => {
    loadGallery();
    
    setTimeout(() => {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
    }, 100);
});

const stickerElements = document.querySelectorAll('.sticker');
stickerElements.forEach(sticker => {
    const randomRotate = Math.random() * 20 - 10;
    sticker.style.transform = `rotate(${randomRotate}deg)`;
});

console.log('✨ Welcome to Simrann\'s Archive! ✨');