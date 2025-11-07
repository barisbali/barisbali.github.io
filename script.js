// --- Theme Toggle Logic (Reused from Portfolio) ---
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}


// --- NEW: Drawer System Logic ---

// 1. Get all the drawer toggle buttons
const allToggles = document.querySelectorAll('.drawer-toggle');

// 2. Loop over each button
allToggles.forEach(toggle => {
    
    // 3. Add a click event listener
    toggle.addEventListener('click', () => {
        
        // 4. Find the parent card, then the drawer *inside* that card
        //    This is much safer and fixes the "all drawers open" bug.
        const card = toggle.closest('.project-card');
        const drawer = card.querySelector('.project-drawer');
        
        // 5. Find the text span (Read More / Show Less)
        const toggleText = toggle.querySelector('.drawer-toggle-text');

        // 6. Check if the drawer is already open
        const isActive = drawer.classList.contains('active');

        // 7. Toggle the 'active' class on the button and drawer
        toggle.classList.toggle('active');
        drawer.classList.toggle('active');

        // 8. Update the button text
        if (isActive) {
            toggleText.textContent = 'Read More';
        } else {
            toggleText.textContent = 'Show Less';
        }
    });
});