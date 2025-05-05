import { changeTheme, loadSettings, changeLanguage, revealOnScroll, fetchGithubRepos } from "./functions.js";

document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    revealOnScroll();
    fetchGithubRepos();
});

document.getElementById('toggle-theme').addEventListener('click', changeTheme);

document.getElementById('toggle-language').addEventListener('click', () => changeLanguage());

document.getElementById('toggle-mobile-menu').addEventListener('click', () => {
    const menu = document.getElementById('menu-items');

    let isActive = menu.classList.contains('active');
    menu.classList.toggle('active', !isActive);
});

document.getElementById('load-more').addEventListener('click', () => fetchGithubRepos());
