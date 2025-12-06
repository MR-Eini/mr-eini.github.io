const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const navLinks = document.getElementById('nav-links');
const hamburger = document.getElementById('hamburger');
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function bindSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            const href = anchor.getAttribute('href');
            if (!href || href === '#') return;
            event.preventDefault();
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
}

function bindScrollTop() {
    window.addEventListener('scroll', () => {
        const shouldShow = document.documentElement.scrollTop > 300;
        scrollToTopBtn.style.display = shouldShow ? 'inline-flex' : 'none';
    });
    scrollToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function bindMobileNav() {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

function animateSkills() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill-bar span').forEach(bar => {
                    const percent = bar.getAttribute('data-percent');
                    requestAnimationFrame(() => (bar.style.width = `${percent}%`));
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) observer.observe(skillsSection);
}

class Particle {
    constructor(x, y, dx, dy, size, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) this.dx = -this.dx;
        if (this.y + this.size > canvas.height || this.y - this.size < 0) this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

let particles = [];
const colors = ['rgba(34,211,238,0.6)', 'rgba(52,211,153,0.55)', 'rgba(99,102,241,0.4)'];

function initParticles() {
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 22000);
    for (let i = 0; i < count; i++) {
        const size = Math.random() * 3 + 1;
        const x = Math.random() * (canvas.width - size * 2) + size;
        const y = Math.random() * (canvas.height - size * 2) + size;
        const dx = (Math.random() - 0.5) * 0.8;
        const dy = (Math.random() - 0.5) * 0.8;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, dx, dy, size, color));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => p.update());
    requestAnimationFrame(animateParticles);
}

function init() {
    setCanvasSize();
    bindSmoothScroll();
    bindScrollTop();
    bindMobileNav();
    animateSkills();
    initParticles();
    animateParticles();
    window.addEventListener('resize', () => {
        setCanvasSize();
        initParticles();
    });
}

document.addEventListener('DOMContentLoaded', init);
