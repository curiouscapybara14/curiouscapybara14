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

    // Scale from 1.5 (small-medium) down to small as it chases cursor
    const distance = Math.sqrt(Math.pow(mouseX - capyX, 2) + Math.pow(mouseY - capyY, 2));
    const scale = Math.max(0.7, 1.5 - (distance / 150));

    floatingCapybara.style.left = capyX + 'px';
    floatingCapybara.style.top = capyY + 'px';
    floatingCapybara.style.transform = `translate(-50%, -50%) scale(${scale})`;

    requestAnimationFrame(animateCapybara);
}

animateCapybara();

// Load custom projects from localStorage
function loadCustomProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    const customProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');

    if (customProjects.length > 0) {
        const projectCards = customProjects.map(project => `
            <div class="project-card">
                <div class="project-header">
                    <h3>${project.title}</h3>
                    <p class="project-date">${project.year}</p>
                </div>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.split(',').map(tag => `<span>${tag.trim()}</span>`).join('')}
                </div>
            </div>
        `).join('');

        projectsGrid.innerHTML += projectCards;
    }
}

// Load projects on page load
document.addEventListener('DOMContentLoaded', loadCustomProjects);

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
