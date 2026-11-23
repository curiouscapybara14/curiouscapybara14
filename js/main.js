// Main JavaScript file
console.log('Portfolio loaded');

// Floating Capybara that follows cursor
const floatingCapybara = document.querySelector('.floating-capybara');
let mouseX = 0;
let mouseY = 0;
let capyX = 0;
let capyY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCapybara() {
    // Smooth easing towards cursor
    capyX += (mouseX - capyX) * 0.1;
    capyY += (mouseY - capyY) * 0.1;

    floatingCapybara.style.left = capyX + 'px';
    floatingCapybara.style.top = capyY + 'px';
    floatingCapybara.style.transform = 'translate(-50%, -50%)';

    requestAnimationFrame(animateCapybara);
}

animateCapybara();

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
