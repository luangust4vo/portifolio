let current_theme = localStorage.getItem('theme') || 'light';

document.addEventListener('DOMContentLoaded', () => {
    document.body.setAttribute('data-theme', current_theme);
});

document.getElementById('toggle-theme').addEventListener('click', () => {
    current_theme = current_theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', current_theme);

    document.body.setAttribute('data-theme', current_theme);
});

document.getElementById('toggle-mobile-menu').addEventListener('click', () => {
    const menu = document.getElementById('menu-items');

    let isActive = menu.classList.contains('active');
    menu.classList.toggle('active', !isActive);
});