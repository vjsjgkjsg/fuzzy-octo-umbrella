const categories = [
    { icon: "🩺", title: "Первая помощь", desc: "Базовые алгоритмы, остановка кровотечений", tags: ["первая", "помощь", "кровотечение"] },
    { icon: "🚑", title: "Неотложные состояния", desc: "Расширенные алгоритмы, шкалы", tags: ["неотложка", "шкала", "алгоритм"] },
    { icon: "💊", title: "Лекарственный справочник", desc: "Более 1500 препаратов, дозировки", tags: ["препараты", "лекарства", "дозировка"] },
    { icon: "📋", title: "Клинические протоколы РК", desc: "Актуальные версии, быстрый просмотр", tags: ["протоколы", "мз", "клинические"] },
    { icon: "📖", title: "Приказы МЗ РК", desc: "По категориям, с отметкой действия", tags: ["приказы", "мз", "нормативные"] },
    { icon: "📊", title: "Медицинские калькуляторы", desc: "Шкала Глазго, qSOFA, дозы для детей", tags: ["калькуляторы", "шкала", "расчет"] },
    { icon: "📚", title: "Медицинские шпаргалки", desc: "Схемы, таблицы, нормы лабораторий", tags: ["шпаргалки", "схемы", "нормы"] },
    { icon: "❤️", title: "Кардиология", desc: "ЭКГ-атлас, шкалы, антикоагулянты", tags: ["кардиология", "сердце", "экг"] },
    { icon: "🧠", title: "Неврология", desc: "NIHSS, шкала комы, тромболизис", tags: ["неврология", "мозг", "инсульт"] },
    { icon: "🫁", title: "Пульмонология", desc: "Пикфлоуметрия, ступени терапии БА", tags: ["пульмонология", "легкие", "астма"] },
    { icon: "🦠", title: "Инфекционные болезни", desc: "Антибиотикограммы РК, прививки", tags: ["инфекции", "антибиотики", "прививки"] },
    { icon: "🩹", title: "Травматология", desc: "Иммобилизация, объёмы кровопотери", tags: ["травматология", "перелом", "кровь"] },
    { icon: "👶", title: "Педиатрия", desc: "Дозы по весу, процентили, неотложка", tags: ["педиатрия", "дети", "вес"] },
    { icon: "🤰", title: "Акушерство и гинекология", desc: "Сроки, шкала Апгар, преэклампсия", tags: ["акушерство", "беременность", "роды"] },
    { icon: "🧪", title: "Лабораторная диагностика", desc: "Референсные значения, интерпретация", tags: ["лаборатория", "анализы", "референсы"] },
    { icon: "🏥", title: "Справочник фельдшера", desc: "Тактика на ФАПе, госпитализация", tags: ["фельдшер", "фап", "госпитализация"] },
    { icon: "💉", title: "Инъекции и манипуляции", desc: "Техника с видео, наборы", tags: ["инъекции", "манипуляции", "уколы"] },
    { icon: "🚑", title: "Скорая медицинская помощь", desc: "Укладки, чек-листы, связь с диспетчером", tags: ["скорая", "укладка", "диспетчер"] },
    { icon: "📑", title: "МКБ-10", desc: "Поиск по коду и названию", tags: ["мкб", "код", "диагноз"] },
    { icon: "⭐", title: "Избранное", desc: "Личная подборка", tags: ["избранное", "сохраненное"] }
];

const emergencyStates = [
    { icon: "🫀", name: "СЛР" },
    { icon: "🩸", name: "Анафилактический шок" },
    { icon: "❤️‍🔥", name: "Инфаркт миокарда" },
    { icon: "🧠", name: "Инсульт" },
    { icon: "🫁", name: "Отек легких" },
    { icon: "⚡", name: "Судороги" },
    { icon: "💤", name: "Комы" },
    { icon: "🍬", name: "Гипогликемия" },
    { icon: "💥", name: "Гипертонический криз" },
    { icon: "🤧", name: "Отек Квинке" }
];

let emergencyMode = false;

// Рендер категорий на главном экране
function renderCategories(filterText = "") {
    const grid = document.getElementById('categoryGrid');
    if (!grid) return;
    grid.innerHTML = "";
    const filter = filterText.toLowerCase();
    categories.forEach(cat => {
        const matches = !filter || cat.title.toLowerCase().includes(filter) || cat.tags.some(t => t.includes(filter));
        if (emergencyMode && !["Неотложные состояния", "Лекарственный справочник", "Медицинские калькуляторы", "Первая помощь", "Скорая медицинская помощь"].includes(cat.title)) {
            return;
        }
        const card = document.createElement('div');
        card.className = 'card';
        if (!matches) card.classList.add('hidden');
        card.innerHTML = `<div class="icon">${cat.icon}</div><div class="title">${cat.title}</div><div class="desc">${cat.desc}</div>`;
        card.onclick = () => openCategory(cat.title, cat.tags);
        grid.appendChild(card);
    });
}

// Рендер модального окна экстренной помощи
function renderEmergency() {
    const grid = document.getElementById('emergencyGrid');
    if (!grid) return;
    grid.innerHTML = "";
    emergencyStates.forEach(state => {
        const item = document.createElement('div');
        item.className = 'emergency-item';
        item.innerHTML = `${state.icon} ${state.name}`;
        item.onclick = () => {
            alert(`Открыт алгоритм: ${state.name}`);
            closeEmergencyDirect();
        };
        grid.appendChild(item);
    });
}

// Фильтрация карточек при поиске
function filterCards() {
    const input = document.getElementById('mainSearch');
    if (input) renderCategories(input.value);
}

// Переключение темы
function toggleTheme() {
    document.body.classList.toggle('dark');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}

// Режим скорой
function toggleEmergencyMode() {
    emergencyMode = !emergencyMode;
    const btn = document.getElementById('emergencyModeBtn');
    if (btn) {
        if (emergencyMode) {
            btn.classList.add('active-action');
            btn.innerHTML = '⚡ Режим скорой (вкл)';
        } else {
            btn.classList.remove('active-action');
            btn.innerHTML = '⚡ Режим скорой';
        }
    }
    const searchInput = document.getElementById('mainSearch');
    renderCategories(searchInput ? searchInput.value : "");
}

// Навигация по табам
function switchTab(tab) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));

    const screenMap = {
        home: 'homeScreen',
        search: 'searchScreen',
        favorites: 'favoritesScreen',
        profile: 'profileScreen'
    };
    const targetScreen = document.getElementById(screenMap[tab]);
    if (targetScreen) targetScreen.classList.add('active');

    document.querySelectorAll('.tab-item').forEach(item => {
        if (item.dataset.tab === tab) item.classList.add('active');
    });
}

// Открытие категории: для готовых разделов – переход на отдельную страницу,
// для остальных – временная заглушка внутри приложения
function openCategory(title, tags) {
    // Готовые разделы с отдельными HTML
    if (title === "Неотложные состояния") {
        window.location.href = "emergency.html";
        return;
    }
    if (title === "Первая помощь") {
        window.location.href = "first_aid.html";
        return;
    }
    // Избранное ведёт на соответствующий таб
    if (title === "Избранное") {
        switchTab('favorites');
        return;
    }

    // Остальные разделы – заглушка
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const categoryScreen = document.getElementById('categoryScreen');
    const titleEl = document.getElementById('categoryTitle');
    const contentEl = document.getElementById('categoryContent');
    
    if (titleEl) titleEl.textContent = title;
    if (contentEl) {
        contentEl.innerHTML = `<div class="placeholder">Раздел «${title}» в разработке</div>`;
    }
    if (categoryScreen) categoryScreen.classList.add('active');
    
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
}

// Закрытие категории (кнопка "Назад") – возврат на главную
function closeCategory() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('homeScreen').classList.add('active');
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    const homeTab = document.querySelector('.tab-item[data-tab="home"]');
    if (homeTab) homeTab.classList.add('active');
    const searchInput = document.getElementById('mainSearch');
    if (searchInput) searchInput.value = '';
    renderCategories();
}

// Модальное окно экстренной помощи
function openEmergency() {
    document.getElementById('emergencyModal').classList.add('open');
}
function closeEmergency(e) {
    if (e.target === document.getElementById('emergencyModal')) {
        document.getElementById('emergencyModal').classList.remove('open');
    }
}
function closeEmergencyDirect() {
    document.getElementById('emergencyModal').classList.remove('open');
}

// Имитация вызова скорой
function callAmbulance() {
    alert('Вызов 103... (имитация)');
}

// Заглушка микрофона
function toggleMic() {
    const overlay = document.getElementById('micOverlay');
    overlay.classList.toggle('active');
    if (overlay.classList.contains('active')) {
        setTimeout(() => {
            overlay.classList.remove('active');
            const searchInput = document.getElementById('mainSearch');
            if (searchInput) {
                searchInput.value = "например, анафилаксия";
                filterCards();
            }
        }, 2000);
    }
}

// Привязка обработчиков после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Кнопка экстренной помощи
    const emergencyBtn = document.getElementById('emergencyButton');
    if (emergencyBtn) emergencyBtn.addEventListener('click', openEmergency);

    // Закрытие модального окна
    const modal = document.getElementById('emergencyModal');
    if (modal) modal.addEventListener('click', closeEmergency);
    const closeBtn = document.getElementById('closeEmergencyModal');
    if (closeBtn) closeBtn.addEventListener('click', closeEmergencyDirect);

    // Кнопка вызова скорой
    const callBtn = document.getElementById('callAmbulanceBtn');
    if (callBtn) callBtn.addEventListener('click', callAmbulance);

    // Поиск на главной
    const searchInput = document.getElementById('mainSearch');
    if (searchInput) searchInput.addEventListener('input', filterCards);

    // Микрофон
    const micBtn = document.getElementById('micButton');
    if (micBtn) micBtn.addEventListener('click', toggleMic);

    // Переключатель темы
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    // Режим скорой
    const emergencyModeBtn = document.getElementById('emergencyModeBtn');
    if (emergencyModeBtn) emergencyModeBtn.addEventListener('click', toggleEmergencyMode);

    // Таб-бар
    document.querySelectorAll('.tab-item').forEach(item => {
        item.addEventListener('click', () => {
            const tab = item.dataset.tab;
            if (tab) switchTab(tab);
        });
    });

    // Быстрые действия (горизонтальный скролл)
    document.querySelectorAll('.quick-action').forEach(action => {
        action.addEventListener('click', () => {
            const category = action.dataset.category;
            if (category) {
                openCategory(category, []);
            }
        });
    });

    // Кнопка "Назад" из внутреннего экрана категории
    const backBtn = document.getElementById('backFromCategory');
    if (backBtn) backBtn.addEventListener('click', closeCategory);

    // Первоначальный рендер
    renderCategories();
    renderEmergency();
});
