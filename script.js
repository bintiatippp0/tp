// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const typingText = document.querySelector('.typing-text');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Typing Effect
const phrases = [
    'Teknik Komputer dan Jaringan',
    'Web Developer',
    'Network Enthusiast',
    'Problem Solver',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end of phrase
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1000);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(252, 231, 243, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(219, 39, 119, 0.15)';
    } else {
        navbar.style.background = 'rgba(252, 231, 243, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(219, 39, 119, 0.1)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to sections and observe them
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    if (!section.classList.contains('hero')) {
        section.classList.add('fade-in');
        observer.observe(section);
    }
});

// Add fade-in to specific elements
const fadeElements = document.querySelectorAll('.stat-item, .vision-box, .mission-box, .skill-item, .contact-item');
fadeElements.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// Skills progress animation
const skillItems = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.5 });

skillItems.forEach(item => {
    skillObserver.observe(item);
});

// Add hover effects to project table rows
const tableRows = document.querySelectorAll('.projects-table tbody tr');
tableRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
        row.style.transform = 'scale(1.02)';
        row.style.transition = 'all 0.3s ease';
    });
    
    row.addEventListener('mouseleave', () => {
        row.style.transform = 'scale(1)';
    });
});

// Contact links with smooth hover effects
const contactLinks = document.querySelectorAll('.contact-item a');
contactLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(219, 39, 119, 0.3);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        const rect = link.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left - 25) + 'px';
        ripple.style.top = (e.clientY - rect.top - 25) + 'px';
        
        link.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
@keyframes ripple {
    0% {
        transform: scale(0);
        opacity: 1;
    }
    100% {
        transform: scale(2);
        opacity: 0;
    }
}

.skill-item.animate {
    animation: skillPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes skillPop {
    0% {
        transform: scale(0.8) rotate(-10deg);
        opacity: 0;
    }
    50% {
        transform: scale(1.1) rotate(5deg);
    }
    100% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
    }
}
`;
document.head.appendChild(style);

// Easter egg: Konami code for special effect
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Special pink rain effect
        createPinkRain();
        konamiCode = [];
    }
});

function createPinkRain() {
    const colors = ['#fce7f3', '#f472b6', '#ec4899', '#db2777', '#be185d'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const drop = document.createElement('div');
            drop.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}vw;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: fall ${2 + Math.random() * 3}s linear;
            `;
            
            document.body.appendChild(drop);
            
            setTimeout(() => {
                drop.remove();
            }, 5000);
        }, i * 100);
    }
}

// Add fall animation
const fallStyle = document.createElement('style');
fallStyle.textContent = `
@keyframes fall {
    to {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
    }
}
`;
document.head.appendChild(fallStyle);

// Performance optimization: Debounced scroll listener
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = requestAnimationFrame(() => {
        // Update scroll position for any scroll-based animations
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        document.documentElement.style.setProperty('--scroll-percent', scrollPercent);
    });
}, { passive: true });

// Initialize AOS (Animate On Scroll) alternative
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Call on load and scroll
window.addEventListener('load', initScrollAnimations);
window.addEventListener('scroll', initScrollAnimations);

console.log('🌸 Portfolio website by Binti Nur Latif - Developed with love! 🌸');
