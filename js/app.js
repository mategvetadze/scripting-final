const STORAGE_KEYS = {
  theme: 'kiu-theme',
  favorites: 'kiu-favorites',
  visitorName: 'kiu-visitor-name',
  subscribers: 'kiu-subscribers',
};

const CAMPUS_FACILITIES = [
  'State-of-the-art laboratories',
  'Modern libraries and co-working spaces',
  'On-campus student dormitories',
  'Cafeterias and dining facilities',
  'Interactive Learning Management System',
  'Sports and recreation areas',
];

const loadFavorites = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.favorites);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveFavorites = (list) => {
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(list));
};

const loadTheme = () => localStorage.getItem(STORAGE_KEYS.theme) || 'light';

const saveTheme = (theme) => {
  localStorage.setItem(STORAGE_KEYS.theme, theme);
};

const loadVisitorName = () => localStorage.getItem(STORAGE_KEYS.visitorName) || '';

const saveVisitorName = (name) => {
  localStorage.setItem(STORAGE_KEYS.visitorName, name.trim());
};

let allPrograms = [];
let favorites = loadFavorites();

const elements = {
  header: document.getElementById('site-header'),
  navToggle: document.getElementById('nav-toggle'),
  navLinks: document.getElementById('nav-links'),
  themeToggle: document.getElementById('theme-toggle'),
  themeIcon: document.getElementById('theme-icon'),
  exploreBtn: document.getElementById('explore-btn'),
  personalizeBtn: document.getElementById('personalize-btn'),
  heroGreeting: document.getElementById('hero-greeting'),
  programsGrid: document.getElementById('programs-grid'),
  programsStatus: document.getElementById('programs-status'),
  programSearch: document.getElementById('program-search'),
  degreeFilter: document.getElementById('degree-filter'),
  favoritesList: document.getElementById('favorites-list'),
  clearFavoritesBtn: document.getElementById('clear-favorites-btn'),
  weatherWidget: document.getElementById('weather-widget'),
  facilitiesList: document.getElementById('facilities-list'),
  newsletterForm: document.getElementById('newsletter-form'),
  formMessage: document.getElementById('form-message'),
  modalOverlay: document.getElementById('modal-overlay'),
  modalClose: document.getElementById('modal-close'),
  visitorNameInput: document.getElementById('visitor-name-input'),
  saveNameBtn: document.getElementById('save-name-btn'),
  aboutGrid: document.getElementById('about-grid'),
};

const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  elements.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  saveTheme(theme);
};

const toggleTheme = () => {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  applyTheme(next);
};

const simulateNetworkDelay = (callback, delayMs = 600) => {
  setTimeout(() => callback(null), delayMs);
};

const fetchProgramsWithPromise = () =>
  new Promise((resolve, reject) => {
    fetch('data/programs.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });

const KUTAISI_COORDS = { latitude: 42.27, longitude: 42.7 };

const fetchKutaisiWeather = async () => {
  const { latitude, longitude } = KUTAISI_COORDS;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=Asia%2FTbilisi`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Weather service unavailable');
  }

  const data = await response.json();
  return data.current;
};

const renderWeather = (current) => {
  const { temperature_2m: temp, weather_code: code } = current;
  const description = getWeatherDescription(code);

  elements.weatherWidget.innerHTML = `
    <div class="weather-content">
      <div>
        <p class="weather-label">Kutaisi Weather</p>
        <span class="weather-temp">${Math.round(temp)}°C</span>
      </div>
      <p>${description}</p>
    </div>
  `;
};

const getWeatherDescription = (code) => {
  const descriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    61: 'Light rain',
    63: 'Moderate rain',
    80: 'Rain showers',
  };
  return descriptions[code] || 'Variable conditions';
};

const loadWeather = async () => {
  try {
    const current = await fetchKutaisiWeather();
    renderWeather(current);
  } catch {
    elements.weatherWidget.innerHTML =
      '<p>Weather data could not be loaded. Please check your internet connection.</p>';
  }
};

const createProgramCard = (program) => {
  const { id, name, degree, duration, language, description, faculty } = program;
  const isFavorite = favorites.includes(id);

  const card = document.createElement('article');
  card.className = 'program-card';
  card.dataset.id = id;

  card.innerHTML = `
    <span class="program-degree">${degree}</span>
    <h3>${name}</h3>
    <div class="program-meta">
      <span>${duration}</span>
      <span>${language}</span>
    </div>
    <p>${description}</p>
    <div class="program-card-footer">
      <small>${faculty}</small>
      <button class="btn btn-favorite ${isFavorite ? 'is-favorite' : ''}" data-id="${id}">
        ${isFavorite ? '★ Saved' : '☆ Save'}
      </button>
    </div>
  `;

  return card;
};

const filterPrograms = (programs, { search, degree }) => {
  const query = search.trim().toLowerCase();

  return programs.filter(({ name, degree: progDegree, description, faculty }) => {
    const matchesSearch =
      !query ||
      [name, description, faculty].some((field) => field.toLowerCase().includes(query));

    const matchesDegree =
      degree === 'all' || progDegree.includes(degree);

    return matchesSearch && matchesDegree;
  });
};

const renderPrograms = (programs) => {
  elements.programsGrid.innerHTML = '';

  if (programs.length === 0) {
    elements.programsStatus.textContent = 'No programs match your search.';
    return;
  }

  elements.programsStatus.textContent = `Showing ${programs.length} program(s)`;

  const fragment = document.createDocumentFragment();
  programs.forEach((program) => fragment.appendChild(createProgramCard(program)));
  elements.programsGrid.appendChild(fragment);
};

const updateProgramDisplay = () => {
  const filters = {
    search: elements.programSearch.value,
    degree: elements.degreeFilter.value,
  };

  const filtered = filterPrograms(allPrograms, filters);
  renderPrograms(filtered);
};

const loadPrograms = () => {
  elements.programsStatus.textContent = 'Loading programs...';
  elements.programsGrid.innerHTML = '';

  simulateNetworkDelay(() => {
    fetchProgramsWithPromise()
      .then((data) => {
        const { programs, university, lastUpdated } = data;
        allPrograms = [...programs];
        updateProgramDisplay();
        elements.programsStatus.textContent = `${university} — updated ${lastUpdated}`;
      })
      .catch(() => {
        elements.programsStatus.textContent = 'Failed to load programs. Please refresh the page.';
      });
  });
};

const toggleFavorite = (programId) => {
  const index = favorites.indexOf(programId);

  if (index === -1) {
    favorites = [...favorites, programId];
  } else {
    favorites = favorites.filter((id) => id !== programId);
  }

  saveFavorites(favorites);
  updateProgramDisplay();
  renderFavoritesList();
};

const renderFavoritesList = () => {
  elements.favoritesList.innerHTML = '';

  if (favorites.length === 0) {
    elements.favoritesList.innerHTML =
      '<li class="favorites-empty">No favorites yet. Save programs from the Programs section.</li>';
    return;
  }

  const savedPrograms = allPrograms.filter(({ id }) => favorites.includes(id));
  const items = savedPrograms.length > 0 ? savedPrograms : favorites.map((id) => ({ id, name: id }));

  items.forEach(({ id, name }) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${name}</span><button class="btn btn-favorite" data-remove="${id}">Remove</button>`;
    elements.favoritesList.appendChild(li);
  });
};

const clearAllFavorites = () => {
  favorites = [];
  saveFavorites(favorites);
  updateProgramDisplay();
  renderFavoritesList();
};

const initCampusTabs = () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.campus-panel');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const { tab } = button.dataset;

      tabButtons.forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });

      panels.forEach((panel) => {
        const isActive = panel.id === `panel-${tab}`;
        panel.classList.toggle('active', isActive);
        panel.hidden = !isActive;
      });

      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
    });
  });

  elements.facilitiesList.innerHTML = CAMPUS_FACILITIES.map(
    (facility) => `<li>${facility}</li>`
  ).join('');
};

const initAboutCards = () => {
  const cards = elements.aboutGrid.querySelectorAll('.about-card');

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      cards.forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });
};

const initNavigation = () => {
  elements.navToggle.addEventListener('click', () => {
    const isOpen = elements.navLinks.classList.toggle('open');
    elements.navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      elements.navLinks.classList.remove('open');
      elements.navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  elements.exploreBtn.addEventListener('click', () => {
    document.getElementById('programs').scrollIntoView({ behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    elements.header.classList.toggle('scrolled', window.scrollY > 20);
  });
};

const openModal = () => {
  elements.modalOverlay.hidden = false;
  elements.visitorNameInput.value = loadVisitorName();
  elements.visitorNameInput.focus();
};

const closeModal = () => {
  elements.modalOverlay.hidden = true;
};

const updateGreeting = () => {
  const name = loadVisitorName();

  if (name) {
    elements.heroGreeting.hidden = false;
    elements.heroGreeting.textContent = `Welcome back, ${name}!`;
  } else {
    elements.heroGreeting.hidden = true;
  }
};

const initModal = () => {
  elements.personalizeBtn.addEventListener('click', openModal);
  elements.modalClose.addEventListener('click', closeModal);

  elements.modalOverlay.addEventListener('click', (event) => {
    if (event.target === elements.modalOverlay) closeModal();
  });

  elements.saveNameBtn.addEventListener('click', () => {
    const name = elements.visitorNameInput.value.trim();

    if (name) {
      saveVisitorName(name);
      updateGreeting();
      closeModal();
    }
  });
};

const appendSubscribers = (existing, ...entries) => [...existing, ...entries];

const handleNewsletterSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(elements.newsletterForm);
  const { 'subscriber-name': name, 'subscriber-email': email } = Object.fromEntries(formData);

  if (!name || !email) {
    elements.formMessage.textContent = 'Please fill in all fields.';
    elements.formMessage.className = 'form-message error';
    return;
  }

  const subscribers = JSON.parse(localStorage.getItem(STORAGE_KEYS.subscribers) || '[]');
  const newSubscriber = { name, email, date: new Date().toISOString() };

  localStorage.setItem(
    STORAGE_KEYS.subscribers,
    JSON.stringify(appendSubscribers(subscribers, newSubscriber))
  );

  sessionStorage.setItem('kiu-subscribed', 'true');

  elements.formMessage.textContent = `Thank you, ${name}! You are subscribed.`;
  elements.formMessage.className = 'form-message success';
  elements.newsletterForm.reset();
};

const initEventDelegation = () => {
  elements.programsGrid.addEventListener('click', (event) => {
    const button = event.target.closest('.btn-favorite');
    if (button?.dataset.id) {
      toggleFavorite(button.dataset.id);
    }
  });

  elements.favoritesList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-remove]');
    if (button) {
      toggleFavorite(button.dataset.remove);
    }
  });
};

const initApp = () => {
  applyTheme(loadTheme());
  updateGreeting();
  initNavigation();
  initCampusTabs();
  initAboutCards();
  initModal();
  initEventDelegation();
  renderFavoritesList();
  loadPrograms();
  loadWeather();

  elements.themeToggle.addEventListener('click', toggleTheme);
  elements.programSearch.addEventListener('input', updateProgramDisplay);
  elements.degreeFilter.addEventListener('change', updateProgramDisplay);
  elements.clearFavoritesBtn.addEventListener('click', clearAllFavorites);
  elements.newsletterForm.addEventListener('submit', handleNewsletterSubmit);
};

document.addEventListener('DOMContentLoaded', initApp);
