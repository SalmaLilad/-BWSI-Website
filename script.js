// =======================
// 🌗 Theme Toggle
// =======================
const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');

// Apply saved theme on load
if (saved) {
  root.setAttribute('data-theme', saved);
}

// Toggle theme on click
themeBtn.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// =======================
// 🗓️ Year Auto-Update
// =======================
document.getElementById('year').textContent = new Date().getFullYear();

// =======================
// ⌨️ Typewriter Animation
// =======================
const phrases = [
  'useful things with code',
  'Arduino prototypes that blink & think',
  'ML models that explain themselves',
  'web apps that feel fast',
  'data stories that matter'
];
let idx = 0, ptr = 0, rev = false;
const tw = document.getElementById('typewriter');

function tick() {
  const text = phrases[idx];
  if (!rev) {
    ptr++;
    if (ptr === text.length + 6) rev = true;
  } else {
    ptr--;
    if (ptr <= 0) {
      rev = false;
      idx = (idx + 1) % phrases.length;
    }
  }
  tw.textContent = text.slice(0, Math.max(0, Math.min(ptr, text.length)));
  setTimeout(tick, rev ? 50 : 80);
}
tick();
// =======================
// 🧪 Projects Data
// =======================
const projects = [
  {
    title: 'Oil Slick Classifier',
    desc: 'Satellite imagery (Sentinel-2) classification mini-pipeline with data preprocessing & model evaluation.',
    tags: ['ai', 'data', 'web'],
    link: '#',
    call: 'Open Notebook',
    thumb: '🛰️'
  },
  {
    title: 'Arduino Smart Sensor',
    desc: 'Tinkercad circuit + code for reading temperature & light, streaming to a simple web dashboard.',
    tags: ['hw', 'web'],
    link: '#',
    call: 'View Circuit',
    thumb: '🔌'
  },
  {
    title: 'Air Quality Explorer',
    desc: 'Colab + JS map visualizing PM2.5 trends with interactive charts and tooltips.',
    tags: ['data', 'web', 'ai'],
    link: '#',
    call: 'Launch Demo',
    thumb: '🌫️'
  },
  {
    title: 'Micro-blog Engine',
    desc: 'Static site blog with Markdown posts, tags, and search — deployable on GitHub Pages.',
    tags: ['web'],
    link: '#',
    call: 'Read Posts',
    thumb: '📝'
  },
  {
    title: 'Explainable KNN',
    desc: 'Interactive KNN visualizer for classification regions and nearest neighbor inspection.',
    tags: ['ai', 'data'],
    link: '#',
    call: 'Try KNN',
    thumb: '📊'
  },
  {
    title: 'Sensor Logger App',
    desc: 'PWA that logs accelerometer & gyroscope data for quick experiments and CSV export.',
    tags: ['web', 'data'],
    link: '#',
    call: 'Open App',
    thumb: '📱'
  }
];

// =======================
// 🧩 Render Projects
// =======================
const grid = document.getElementById('projectsGrid');

function render(list) {
  grid.innerHTML = '';
  list.forEach(p => {
    const el = document.createElement('article');
    el.className = 'proj fade-in';
    el.innerHTML = `
      <div class="thumb" aria-hidden="true" style="font-size:40px">${p.thumb}</div>
      <div class="proj-body">
        <h3 style="margin:0 0 6px; font-size:18px">${p.title}</h3>
        <p style="margin:0 0 10px; color:var(--muted)">${p.desc}</p>
        <div class="tags">${p.tags.map(t => `<span class="tag">#${t}</span>`).join('')}</div>
        <a class="btn" href="${p.link}" target="_blank" rel="noopener">${p.call} →</a>
      </div>`;
    grid.appendChild(el);
  });
}
render(projects);

// =======================
// 🧭 Filters
// =======================
const chips = Array.from(document.querySelectorAll('.chip'));
chips.forEach(ch => ch.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  ch.classList.add('active');
  const f = ch.dataset.filter;
  render(f === 'all' ? projects : projects.filter(p => p.tags.includes(f)));
}));
