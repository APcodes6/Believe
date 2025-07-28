// Loading screen logic
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingText = document.querySelector('.loading-text');
    const loadingMessages = [
        "Manifesting Dreams...",
        "Gathering Cosmic Energy...",
        "Connecting Dreamers...",
        "Ready to Imagine..."
    ];
    
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
        messageIndex++;
        if (messageIndex < loadingMessages.length) {
            loadingText.textContent = loadingMessages[messageIndex];
        }
        if (messageIndex >= loadingMessages.length - 1) {
            clearInterval(messageInterval);
        }
    }, 750);
    
    // Create loading particles
    const particlesContainer = document.querySelector('.loading-particles');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'loading-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 4 + 's';
        particle.style.animationDuration = (Math.random() * 2 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
    
    // Fade out loading screen after 3.5 seconds
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        // Remove loading screen from DOM after fade
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000);
    }, 3500);
});

// Dream submission function with enhanced effects
function submitDream() {
    const input = document.getElementById('dreamInput');
    const dream = input.value.trim();
    
    if (dream) {
        createFloatingDream(dream);
        createDreamConstellation();
        input.value = '';
        
        // Pulse effect on submit
        const portal = document.querySelector('.dream-portal');
        portal.style.animation = 'portalPulse 0.5s ease';
        setTimeout(() => {
            portal.style.animation = '';
        }, 500);
        
        showToast('Dream launched into the cosmos! ✨');
    }
}

// Create enhanced floating dream bubble
function createFloatingDream(text) {
    const container = document.getElementById('floatingDreams');
    const dream = document.createElement('div');
    dream.className = 'floating-dream';
    dream.textContent = text;
    dream.style.left = 40 + Math.random() * 20 + '%';
    
    // Add random drift
    const drift = (Math.random() - 0.5) * 100;
    dream.style.setProperty('--drift', drift + 'px');
    
    container.appendChild(dream);
    
    setTimeout(() => {
        dream.remove();
    }, 10000);
}

// Create constellation effect when submitting dream
function createDreamConstellation() {
    const svg = document.querySelector('.dream-constellation svg');
    const centerX = 300;
    const centerY = 150;
    
    for (let i = 0; i < 5; i++) {
        const star = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const angle = (i / 5) * Math.PI * 2;
        const radius = 50 + Math.random() * 50;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        star.setAttribute('cx', x);
        star.setAttribute('cy', y);
        star.setAttribute('r', '3');
        star.setAttribute('fill', 'url(#starGradient)');
        star.style.opacity = '0';
        star.style.animation = 'constellationAppear 2s ease forwards';
        star.style.animationDelay = (i * 0.1) + 's';
        
        svg.appendChild(star);
        
        setTimeout(() => {
            star.remove();
        }, 3000);
    }
}

// Enter key support for dream input
document.addEventListener('DOMContentLoaded', function() {
    const dreamInput = document.getElementById('dreamInput');
    if (dreamInput) {
        dreamInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitDream();
            }
        });
    }
    
    // Add pulsing effect to contract address on hover
    const contractAddress = document.getElementById('contractAddress');
    contractAddress.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.8)';
    });
    contractAddress.addEventListener('mouseleave', function() {
        this.style.textShadow = 'none';
    });
    
    // Create background constellation effect
    createConstellation();
    
    // Animate stats on scroll
    animateStatsOnScroll();
});

// Create constellation background
function createConstellation() {
    const starsContainer = document.querySelector('.stars-bg');
    const constellationStars = [];
    
    // Create constellation points
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('div');
        star.className = 'constellation-star';
        star.style.left = 20 + (i * 15) + '%';
        star.style.top = 20 + (Math.sin(i) * 10) + '%';
        starsContainer.appendChild(star);
        constellationStars.push(star);
    }
    
    // Connect stars with lines
    for (let i = 0; i < constellationStars.length - 1; i++) {
        const line = document.createElement('div');
        line.className = 'constellation-line';
        const star1 = constellationStars[i];
        const star2 = constellationStars[i + 1];
        
        const x1 = parseFloat(star1.style.left);
        const y1 = parseFloat(star1.style.top);
        const x2 = parseFloat(star2.style.left);
        const y2 = parseFloat(star2.style.top);
        
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        line.style.width = length + '%';
        line.style.left = x1 + '%';
        line.style.top = y1 + '%';
        line.style.transform = `rotate(${angle}deg)`;
        line.style.transformOrigin = '0 50%';
        
        starsContainer.appendChild(line);
    }
}

// Animate stats when they come into view
function animateStatsOnScroll() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-number');
            }
        });
    });
    
    stats.forEach(stat => observer.observe(stat));
}

// Copy contract address function
function copyContract() {
    const address = document.getElementById('contractAddress').textContent;
    navigator.clipboard.writeText(address).then(() => {
        showToast('Contract address copied!');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = address;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Contract address copied!');
    });
}

// Toast notification function
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Add interactive star generation on click
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.crypto-badge')) return;
    
    const star = document.createElement('div');
    star.className = 'star';
    star.style.width = Math.random() * 8 + 4 + 'px';
    star.style.height = star.style.width;
    star.style.left = e.clientX + 'px';
    star.style.top = e.clientY + 'px';
    star.style.position = 'fixed';
    star.style.zIndex = '100';
    star.style.animation = 'twinkle 2s ease-in-out';
    
    document.body.appendChild(star);
    
    setTimeout(() => {
        star.remove();
    }, 2000);
});

// Mouse trail effect
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.9) { // Only create trail 10% of the time for performance
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.left = e.clientX - 10 + 'px';
        trail.style.top = e.clientY - 10 + 'px';
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 1000);
    }
});

// Parallax effect on scroll
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.star, .orb, .particle');
    
    parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});