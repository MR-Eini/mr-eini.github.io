// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    /* ============================
       Smooth Scrolling for Anchor Links
       ============================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // If on mobile, close the navbar after clicking a link
            const navbar = document.querySelector('.navbar');
            const navLinks = document.getElementById('nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const hamburger = document.getElementById('hamburger');
                hamburger.classList.remove('active');
            }
        });
    });

    /* ============================
       Responsive Navbar with Hamburger Menu
       ============================ */
    const navbar = document.querySelector('.navbar'); // Select the navbar element
    const hamburger = document.getElementById('hamburger'); // Select the hamburger menu
    const navLinks = document.getElementById('nav-links'); // Select the nav links
    let hideTimeout;

    // Function to hide the navbar (desktop only)
    function hideNavbar() {
        // Only hide navbar on non-mobile devices
        if (window.innerWidth > 768) {
            navbar.classList.add('hidden');
        }
    }

    // Function to show the navbar
    function showNavbar() {
        navbar.classList.remove('hidden');
    }

    // Toggle hamburger menu
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Initially, set a timeout to hide the navbar after 2 seconds (desktop only)
    hideTimeout = setTimeout(hideNavbar, 2000);

    // Event Listener: Show navbar when user hovers near the top 50px of the page (desktop only)
    document.addEventListener('mousemove', function(e) {
        if (window.innerWidth > 768) { // Only apply on desktop
            if (e.clientY < 50) { // If the mouse Y-coordinate is within 50px from the top
                showNavbar(); // Show the navbar
                clearTimeout(hideTimeout); // Clear any existing hide timeout
            } else {
                // If the navbar is visible and the mouse moves away from the top, set a timeout to hide it
                if (!navbar.classList.contains('hidden')) {
                    hideTimeout = setTimeout(hideNavbar, 2000); // Hide after 2 seconds
                }
            }
        }
    });

    // Optional: Show navbar when the user scrolls up (desktop only)
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    window.addEventListener('scroll', function() {
        if (window.innerWidth > 768) { // Only apply on desktop
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop < lastScrollTop) {
                // User scrolled up
                showNavbar();
                clearTimeout(hideTimeout);
                hideTimeout = setTimeout(hideNavbar, 2000); // Hide again after 2 seconds
            } else if (scrollTop > lastScrollTop) {
                // User scrolled down
                hideNavbar();
            }

            lastScrollTop = scrollTop;
        }
    });

    /* ============================
       Modal Functionality
       ============================ */
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    /* ============================
       Scroll To Top Button Functionality
       ============================ */
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // Show the button when the user scrolls down 300px from the top
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    });

    // Scroll to the top of the page when the button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ============================
       Skills Animation Functionality
       ============================ */
    // Function to animate the skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar span');

        skillBars.forEach(skillBar => {
            const targetWidth = skillBar.getAttribute('data-percent'); // Get the target width from data attribute
            let currentWidth = 0;

            function animate() {
                if (currentWidth < targetWidth) {
                    currentWidth += 1; // Increase width incrementally
                    skillBar.style.width = currentWidth + '%';
                    requestAnimationFrame(animate); // Continue animation
                } else {
                    skillBar.style.width = targetWidth + '%'; // Ensure it reaches the final width
                }
            }

            animate(); // Start the animation
        });
    }

    // Function to observe when the skills section enters the viewport
    function observeSkillsSection() {
        const skillsSection = document.querySelector('#skills');
        
        // Create an IntersectionObserver instance
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { // If the section is in view
                    animateSkillBars(); // Trigger the animation
                    observer.unobserve(skillsSection); // Stop observing after animation is triggered
                }
            });
        }, { threshold: 0.1 }); // Trigger when 10% of the section is in view
        
        // Start observing the skills section
        observer.observe(skillsSection);
    }

    // Trigger the observer
    observeSkillsSection();

    /* ============================
       Background Canvas Animation (Optional)
       ============================ */
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');

    // Resize the canvas to fill the window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles(); // Reinitialize particles on resize
    }

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    // Particle Class
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
            if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                this.dx = -this.dx;
            }

            if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;

            this.draw();
        }
    }

    // Initialize Particles
    let particlesArray = [];
    const colorsParticles = ['rgba(26, 188, 156, 0.8)', 'rgba(52, 152, 219, 0.8)', 'rgba(155, 89, 182, 0.8)'];

    function initParticles() {
        particlesArray = [];
        // Adjust number of particles based on screen size for performance
        const numberOfParticles = Math.floor((canvas.width * canvas.height) / 20000); // Reduced density for mobile
        for (let i = 0; i < numberOfParticles; i++) {
            let size = Math.random() * 3 + 1;
            let x = Math.random() * (canvas.width - size * 2) + size;
            let y = Math.random() * (canvas.height - size * 2) + size;
            let dx = (Math.random() - 0.5) * 1;
            let dy = (Math.random() - 0.5) * 1;
            let color = colorsParticles[Math.floor(Math.random() * colorsParticles.length)];
            particlesArray.push(new Particle(x, y, dx, dy, size, color));
        }
    }

    // Animate Particles
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(particle => particle.update());
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
});
