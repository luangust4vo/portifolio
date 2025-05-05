const default_settings = {
    theme: {
        mode: 'light',
        icon: 'fa-moon'
    },
    language: "pt-br"
};
const settings = JSON.parse(localStorage.getItem('settings')) ?? default_settings;
let page = 1;

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
        const lang = res[current_language];

        document.querySelectorAll('[data-lang]').forEach((e) => {
            let attr = e.getAttribute('data-lang');

            if (attr === 'menu') {
                [...e.children].forEach((li) => {
                    const id = li.querySelector('a').getAttribute('href').replace('#', '');
                    li.children[0].innerHTML = lang.menu[id];
                });
            } else if (attr == 'section') {
                const sectionId = e.id;
                const section = lang.section[sectionId];

                e.children[0].innerHTML = section.title;

                const contentContainer = e.children[1];
                contentContainer.innerHTML = '';

                if (sectionId === 'education' && Array.isArray(section.content)) {
                    section.content.forEach((edu) => {
                        const div = document.createElement('div');
                        div.classList.add('education-item');

                        div.innerHTML = `
                            <h3>${edu.course}</h3>
                            <h4>${edu.institution}</h4>
                            <p><strong>${current_language == 'pt-br' ? 'Período' : 'Period'}:</strong> ${edu.period}</p>
                            <p>${edu.description}</p>
                        `;

                        contentContainer.appendChild(div);
                    });
                } else if (Array.isArray(section.content)) {
                    section.content.forEach((item) => {
                        const p = document.createElement('p');
                        p.innerHTML = item;
                        contentContainer.appendChild(p);
                    });
                } else {
                    contentContainer.innerHTML = section.content;
                }
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

export const fetchGithubRepos = () => {
    const container = document.getElementById('projects-list');

    fetch(`https://api.github.com/users/luangust4vo/repos?per_page=6&page=${page}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const filtered = data.filter(repo => {
                const createdAt = new Date(repo.created_at);
                const year = createdAt.getFullYear();
                return !repo.fork && (year === 2024 || year === 2025);
            });

            if (filtered.length === 0) {
                loadMoreBtn.style.display = 'none';
                return;
            }

            filtered.forEach(repo => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'Sem descrição'}</p>
                <p><strong>Criado em:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
                <a href="${repo.html_url}" target="_blank">Ver no GitHub</a>
              `;
                container.appendChild(card);
            });
        });

    page++;
};