import { changeTheme, loadSettings } from "./functions.js";

document.addEventListener('DOMContentLoaded', () => loadSettings());

document.getElementById('toggle-theme').addEventListener('click', () => changeTheme());

document.getElementById('toggle-mobile-menu').addEventListener('click', () => {
    const menu = document.getElementById('menu-items');

    let isActive = menu.classList.contains('active');
    menu.classList.toggle('active', !isActive);
});