//For initialize fade-in animations on page load
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animationPlayState = 'running';
        }, index * 100);
    });
    initializeTheme();
    initStars();
});

//Added subtle hover effects to skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-1px)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

//Social links toggle functionality
const socialToggle = document.getElementById('socialToggle');
const socialLinks = document.getElementById('socialLinks');
let isOpen = false;

if (socialToggle && socialLinks) {
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

    socialToggle.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            socialToggle.click();
        }
    });

    document.addEventListener('click', function(event) {
        if (isOpen && !event.target.closest('.social-section')) {
            isOpen = false;
            socialToggle.textContent = 'Connect';
            socialToggle.classList.remove('active');
            socialLinks.classList.remove('show');
        }
    });
}

//Theme Toggle Functionality
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    if (!themeToggle) return;

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
        }
    });
}

//Smooth scrolling
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

//Starfield Background
function initStars() {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');

    let stars = [];
    const numStars = 120;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        stars = createStars();
    }

    function createStars() {
        const arr = [];
        for (let i = 0; i < numStars; i++) {
            const anchorX = Math.random() * canvas.width;
            const anchorY = Math.random() * canvas.height;
            const orbitRadius = Math.random() * 40 + 20; //for each star to have its own orbit
            const angle = Math.random() * Math.PI * 2;
            const speed = (Math.random() * 0.002) + 0.001; //for slow drifting
            const size = Math.random() * 2;
            arr.push({ anchorX, anchorY, orbitRadius, angle, speed, size });
        }
        return arr;
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        stars.forEach(star => {
            const x = star.anchorX + star.orbitRadius * Math.cos(star.angle);
            const y = star.anchorY + star.orbitRadius * Math.sin(star.angle);
            ctx.beginPath();
            ctx.arc(x, y, star.size, 0, Math.PI * 2);
            ctx.fill();
            star.angle += star.speed;
        });
        requestAnimationFrame(drawStars);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawStars();
}
