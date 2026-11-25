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
    // Smooth easing towards cursor with scaling
    capyX += (mouseX - capyX) * 0.15;
    capyY += (mouseY - capyY) * 0.15;

    // Scale from 3 (large) down to small as it chases cursor
    const distance = Math.sqrt(Math.pow(mouseX - capyX, 2) + Math.pow(mouseY - capyY, 2));
    const scale = Math.max(0.6, 3 - (distance / 100));

    floatingCapybara.style.left = capyX + 'px';
    floatingCapybara.style.top = capyY + 'px';
    floatingCapybara.style.transform = `translate(-50%, -50%) scale(${scale})`;

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
