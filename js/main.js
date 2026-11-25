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

// Load About Me from localStorage
function loadAboutMe() {
    const aboutContent = document.getElementById('aboutContent');
    if (!aboutContent) return;

    const about = localStorage.getItem('userAbout') || 'Hi, I\'m Marian (Aria) Nicole Acosta, an aspiring IT professional with a growing interest in data, technology, and software development. I\'m particularly drawn to the world of data and enjoy exploring how information can be transformed into meaningful insights and solutions.<br><br>Beyond data, I\'m curious about cloud computing, artificial intelligence, and cybersecurity, while also enjoying both front-end and back-end development. I love exploring different areas of technology, experimenting with new ideas, and discovering how different tools and technologies work together.<br><br>I believe that learning never really stops. I approach every opportunity with curiosity, an open mind, and the excitement to learn something new. When I\'m not coding, you\'ll find me running around (marathon dreams), being Soy\'s personal assistant (full-time cat mom duties), exploring new places, professionally napping, and turning random bursts of inspiration into creative projects.';

    aboutContent.innerHTML = about.split('\n').map(p => p.trim()).filter(p => p).map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
}

// Load Skills from localStorage
function loadSkills() {
    const skillsContainer = document.getElementById('skillsContainer');
    if (!skillsContainer) return;

    const skills = JSON.parse(localStorage.getItem('userSkills') || '[]');

    if (skills.length === 0) {
        skillsContainer.innerHTML = '<p style="text-align: center; color: var(--light-text);">No skills added yet.</p>';
        return;
    }

    const grouped = {};
    skills.forEach(skill => {
        if (!grouped[skill.category]) grouped[skill.category] = [];
        grouped[skill.category].push(skill.name);
    });

    skillsContainer.innerHTML = Object.entries(grouped).map(([category, categorySkills]) => `
        <div class="skill-category">
            <h3>${category}</h3>
            <ul class="skills-list">
                ${categorySkills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// Load projects from localStorage
function loadCustomProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    const projects = JSON.parse(localStorage.getItem('userProjects') || '[]');

    if (projects.length > 0) {
        const projectCards = projects.map(project => `
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

        projectsGrid.innerHTML = projectCards;
    }
}

// Load experiences from localStorage
function loadCustomExperiences() {
    const experienceList = document.getElementById('experienceList');
    const experienceContainer = document.getElementById('experienceContainer');
    const noExperience = document.getElementById('noExperience');

    if (!experienceList) return;

    const customExperiences = JSON.parse(localStorage.getItem('userExperiences') || '[]');

    if (customExperiences.length > 0) {
        const experienceCards = customExperiences.map(exp => `
            <div class="experience-item">
                <h3>${exp.expTitle}</h3>
                <div class="experience-meta">
                    <span><strong>${exp.expType}</strong></span>
                    <span>${exp.expOrganization}</span>
                    <span>${exp.expPeriod}</span>
                </div>
                ${exp.expDescription ? `<p>${exp.expDescription}</p>` : ''}
            </div>
        `).join('');

        experienceList.innerHTML = experienceCards;
        experienceContainer.style.display = 'block';
        noExperience.style.display = 'none';
    }
}

// Load custom links for Let's Connect
function loadCustomLinks() {
    const contactLinks = document.getElementById('contactLinks');
    if (!contactLinks) return;

    const customLinks = JSON.parse(localStorage.getItem('userLinks') || '[]');

    if (customLinks.length > 0) {
        const linkButtons = customLinks.map(link => `
            <a href="${link.linkURL}" class="contact-button" target="_blank">${link.linkLabel}</a>
        `).join('');

        contactLinks.innerHTML += linkButtons;
    }
}

// Load all content on page load
document.addEventListener('DOMContentLoaded', () => {
    loadAboutMe();
    loadSkills();
    loadCustomProjects();
    loadCustomExperiences();
    loadCustomLinks();
});

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
