document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar'); // Select the navbar element
    let hideTimeout;

    // Function to hide the navbar
    function hideNavbar() {
        navbar.classList.add('hidden');
    }

    // Function to show the navbar
    function showNavbar() {
        navbar.classList.remove('hidden');
    }

    // Initially, set a timeout to hide the navbar after 2 seconds
    hideTimeout = setTimeout(hideNavbar, 2000);

    // Event Listener: Show navbar when user hovers near the top 50px of the page
    document.addEventListener('mousemove', function(e) {
        if (e.clientY < 50) { // If the mouse Y-coordinate is within 50px from the top
            showNavbar(); // Show the navbar
            clearTimeout(hideTimeout); // Clear any existing hide timeout
        } else {
            // If the navbar is visible and the mouse moves away from the top, set a timeout to hide it
            if (!navbar.classList.contains('hidden')) {
                hideTimeout = setTimeout(hideNavbar, 2000); // Hide after 2 seconds
            }
        }
    });

    // Optional: Show navbar when the user scrolls up
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    window.addEventListener('scroll', function() {
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
    });
});
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

// Trigger the observer when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', observeSkillsSection);
