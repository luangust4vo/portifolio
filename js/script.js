import { changeTheme, loadSettings, changeLanguage } from "./functions.js";

document.addEventListener('DOMContentLoaded', () => loadSettings());

document.getElementById('toggle-theme').addEventListener('click', changeTheme);

document.getElementById('toggle-language').addEventListener('click', () => changeLanguage());

document.getElementById('toggle-mobile-menu').addEventListener('click', () => {
    const menu = document.getElementById('menu-items');

    let isActive = menu.classList.contains('active');
    menu.classList.toggle('active', !isActive);
});