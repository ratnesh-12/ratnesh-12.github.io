// Initialize fade-in animations on page load
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animationPlayState = 'running';
        }, index * 100);
    });

    // Initialize theme
    initializeTheme();
});

// Add subtle hover effects to skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-1px)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Social links toggle functionality (guarded in case elements don't exist)
const socialToggle = document.getElementById('socialToggle');
const socialLinks = document.getElementById('socialLinks');
let isOpen = false;

if (socialToggle && socialLinks) {
    // Toggle social links visibility
    socialToggle.addEventListener('click', function() {
        isOpen = !isOpen;
        
        if (isOpen) {
            socialToggle.textContent = 'Hide';
            socialToggle.classList.add('active');
            socialLinks.classList.add('show');
        } else {
            socialToggle.textContent = 'Connect';
            socialToggle.classList.remove('active');
            socialLinks.classList.remove('show');
        }
    });

    // Add keyboard support for social toggle (accessibility)
    socialToggle.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            socialToggle.click();
        }
    });

    // Close social links when clicking outside the social section
    document.addEventListener('click', function(event) {
        if (isOpen && !event.target.closest('.social-section')) {
            isOpen = false;
            socialToggle.textContent = 'Connect';
            socialToggle.classList.remove('active');
            socialLinks.classList.remove('show');
        }
    });
}

// Theme Toggle Functionality
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    if (!themeToggle) return;

    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add a little animation effect
        themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

// Detect system theme preference
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
        }
    });
}

// Optional: Add smooth scrolling for any internal links (if added in future)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else if (this.getAttribute('href') === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});