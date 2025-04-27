const default_settings = {
    theme: {
        mode: 'light',
        icon: 'fa-moon'
    },
    // "language": "pt-br"
};
const settings = JSON.parse(localStorage.getItem('settings')) ?? default_settings;

const saveSettings = (themeMode, themeIcon) => {
    settings.theme.mode = themeMode;
    settings.theme.icon = themeIcon;

    localStorage.setItem('settings', JSON.stringify(settings));
}

export const loadSettings = () => {
    let current_theme = settings.theme.mode;
    let current_icon = settings.theme.icon;

    document.body.setAttribute('data-theme', current_theme);
    document.getElementById('toggle-theme-icon').classList.add(current_icon);
};

export const changeTheme = () => {
    let current_theme = settings.theme.mode === 'light' ? 'dark' : 'light';
    let current_icon = settings.theme.icon === 'fa-moon' ? 'fa-sun' : 'fa-moon';
        
    document.body.setAttribute('data-theme', current_theme);

    const icon = document.getElementById('toggle-theme-icon');
    icon.classList.remove('fa-moon', 'fa-sun');
    icon.classList.add(current_icon);

    saveSettings(current_theme, current_icon);
};

