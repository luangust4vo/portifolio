const default_settings = {
    theme: {
        mode: 'light',
        icon: 'fa-moon'
    },
    language: "pt-br"
};
const settings = JSON.parse(localStorage.getItem('settings')) ?? default_settings;

const saveSettings = ({ themeMode, themeIcon, language }) => {
    if (typeof themeMode !== 'undefined') settings.theme.mode = themeMode;
    if (typeof themeIcon !== 'undefined') settings.theme.icon = themeIcon;
    if (typeof language !== 'undefined') settings.language = language;

    localStorage.setItem('settings', JSON.stringify(settings));
}

export const loadSettings = () => {
    document.body.setAttribute('data-theme', settings.theme.mode);
    document.getElementById('toggle-theme-icon').classList.add(settings.theme.icon);
    changeLanguage(settings.language);
};

export const changeTheme = () => {
    let current_theme = settings.theme.mode === 'light' ? 'dark' : 'light';
    let current_icon = settings.theme.icon === 'fa-moon' ? 'fa-sun' : 'fa-moon';

    document.body.setAttribute('data-theme', current_theme);

    const icon = document.getElementById('toggle-theme-icon');
    icon.classList.remove('fa-moon', 'fa-sun');
    icon.classList.add(current_icon);

    saveSettings({ themeMode: current_theme, themeIcon: current_icon });
};

export const changeLanguage = (current_language = null) => {
    if (!current_language) {
        current_language = settings.language === 'pt-br' ? 'en' : 'pt-br';
    }

    fetch(`../assets/json/lang.json`).then(res => res.json()).then(res => {
        let lang = res[current_language];

        document.querySelectorAll('[data-lang]').forEach((e) => {
            let attr = e.getAttribute('data-lang');
            if (attr === 'menu') {
                [...e.children].forEach((li) => {
                    const id = li.querySelector('a').getAttribute('href').replace('#', '');
                    li.children[0].innerHTML = lang.menu[id];
                });
            } else if (attr == 'section') {
                e.children[0].innerHTML = lang.section[e.id].title;
                e.children[1].innerHTML = lang.section[e.id].content;
            } else if (attr == 'alt') {
                e.setAttribute('alt', lang.alt[e.id]);
            } else {
                e.innerHTML = lang[attr];
            }
        });
    });

    saveSettings({ language: current_language });
};

export const revealOnScroll = () => {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');

            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, {
        threshold: 0.3
    });

    sections.forEach(section => observer.observe(section));
};