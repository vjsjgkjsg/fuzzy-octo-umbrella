/* ===========================
   BOT DEVELOPER SYSTEM — app.js
=========================== */

/* ---------- Telegram WebApp init ---------- */
const tg = window.Telegram && window.Telegram.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  tg.setHeaderColor('#050505');
  tg.setBackgroundColor('#050505');
}

/* ---------- DATA ---------- */
const SERVICES = [
  { icon: '🤖', name: 'Telegram боты',         desc: 'Боты любой сложности: чат-боты, автоответчики, AI-боты' },
  { icon: '💰', name: 'Магазины в Telegram',   desc: 'Онлайн-магазины с каталогом, корзиной и оплатой' },
  { icon: '📊', name: 'CRM системы',            desc: 'Управление клиентами, заявками и сделками прямо в Telegram' },
  { icon: '📨', name: 'Авто-рассылки',          desc: 'Массовые рассылки, триггерные сообщения, воронки продаж' },
  { icon: '📁', name: 'Парсеры данных',         desc: 'Сбор и обработка данных с любых источников' },
  { icon: '⚡', name: 'Интеграции API',         desc: 'Подключение любых внешних сервисов и платёжных систем' },
  { icon: '📈', name: 'Автоматизация',          desc: 'Автоматизация бизнес-процессов, экономия времени и ресурсов' },
  { icon: '🔧', name: 'Инд. разработка',        desc: 'Нестандартные решения под уникальные требования клиента' },
];

const PORTFOLIO = [
  { emoji: '🛍️', thumb: 'thumb-1', title: 'Магазин товаров',       desc: 'Полноценный интернет-магазин в Telegram с каталогом на 500+ позиций, корзиной, оплатой через Stripe и системой скидок.', tags: ['Python', 'aiogram', 'PostgreSQL'], status: 'done' },
  { emoji: '📅', thumb: 'thumb-2', title: 'Бот записи клиентов',    desc: 'Система онлайн-записи для салона красоты: расписание, напоминания, отмена и перенос записи, уведомления мастерам.', tags: ['Python', 'Redis', 'Google Cal'], status: 'done' },
  { emoji: '🍕', thumb: 'thumb-3', title: 'Бот приёма заказов',     desc: 'Приём заказов для ресторана с меню, кастомизацией блюд, геолокацией для доставки и интеграцией с кухней.', tags: ['Node.js', 'Telegraf', 'MongoDB'], status: 'done' },
  { emoji: '💼', thumb: 'thumb-4', title: 'CRM бот',                desc: 'Корпоративная CRM для B2B-компании: воронка продаж, задачи, KPI сотрудников, аналитика, отчёты в Notion.', tags: ['Python', 'FastAPI', 'Notion API'], status: 'active' },
  { emoji: '🚚', thumb: 'thumb-5', title: 'Бот доставки',           desc: 'Бот для курьерской службы: трекинг заказов, маршрутизация, подтверждения, фото-отчёты, рейтинг курьеров.', tags: ['Python', 'PostgreSQL', 'YMaps'], status: 'done' },
  { emoji: '🤖', thumb: 'thumb-6', title: 'AI помощник',            desc: 'Умный ассистент на базе GPT-4 для tech-компании: ответы на вопросы по документации, генерация кода, Code Review.', tags: ['Python', 'OpenAI', 'Pinecone'], status: 'active' },
];

const REVIEWS = [
  { name: 'Алексей М.',  initials: 'АМ', stars: 5, text: 'Разработал для нас полноценный магазин в Telegram. Работа выполнена быстро, код чистый, всё работает без единого сбоя. Отдельное спасибо за подробную документацию!' },
  { name: 'Марина К.',   initials: 'МК', stars: 5, text: 'Заказывала бота для записи клиентов в мой салон. Результат превзошёл ожидания — запись выросла на 40%. Поддержка после сдачи тоже на высоте.' },
  { name: 'Дмитрий Р.',  initials: 'ДР', stars: 5, text: 'Сделали CRM-бота под нашу специфику. Интеграция с нашей ERP-системой — сложная задача, но справились отлично. Рекомендую!' },
  { name: 'Светлана П.', initials: 'СП', stars: 5, text: 'AI-ассистент для нашей службы поддержки снизил нагрузку на операторов на 60%. Очень доволен качеством работы и соблюдением сроков.' },
  { name: 'Иван Т.',     initials: 'ИТ', stars: 5, text: 'Автоматизация рассылок и воронок продаж дала результат уже в первый месяц. Профессиональный подход, чёткое ТЗ, всё в срок.' },
];

/* ---------- CANVAS BACKGROUND ---------- */
function initCanvas() {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = (Math.random() - 0.5) * 0.25;
      this.r  = Math.random() * 1.5 + 0.4;
      this.a  = Math.random() * 0.4 + 0.1;
      this.color = Math.random() > 0.5 ? '0,255,136' : '0,217,255';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.a})`;
      ctx.fill();
    }
  }

  function makeParticles(n) {
    particles = [];
    for (let i = 0; i < n; i++) particles.push(new Particle());
  }

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.003;

    // grid
    const gs = 48;
    ctx.strokeStyle = 'rgba(0,255,136,0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += gs) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
    for (let y = 0; y < H; y += gs) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

    // scan line
    const scanY = ((t * 60) % (H + 40)) - 20;
    const grad = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
    grad.addColorStop(0,   'rgba(0,255,136,0)');
    grad.addColorStop(0.5, 'rgba(0,255,136,0.04)');
    grad.addColorStop(1,   'rgba(0,255,136,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, scanY - 20, W, 40);

    // particles
    particles.forEach(p => { p.update(); p.draw(); });

    // connecting lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 90) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,217,255,${0.06 * (1 - dist/90)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    animId = requestAnimationFrame(draw);
  }

  resize();
  makeParticles(55);
  draw();
  window.addEventListener('resize', () => { resize(); });
}

/* ---------- LOADER ---------- */
function runLoader() {
  const bar   = document.querySelector('.loader-bar');
  const status = document.getElementById('loaderStatus');
  const msgs  = [
    'Initializing system...',
    'Loading modules...',
    'Connecting to Telegram API...',
    'Rendering interface...',
    'System ready.',
  ];
  let pct = 0, idx = 0;
  const step = () => {
    pct += Math.random() * 22 + 8;
    if (pct > 100) pct = 100;
    bar.style.width = pct + '%';
    if (idx < msgs.length) { status.textContent = msgs[idx++]; }
    if (pct < 100) {
      setTimeout(step, 280 + Math.random() * 200);
    } else {
      setTimeout(showApp, 400);
    }
  };
  step();
}

function showApp() {
  const loader = document.getElementById('loader');
  loader.style.opacity = '0';
  loader.style.transition = 'opacity 0.5s';
  setTimeout(() => {
    loader.style.display = 'none';
    const app = document.getElementById('app');
    app.classList.remove('hidden');
    initAnimations();
  }, 500);
}

/* ---------- NAVIGATION ---------- */
function nav(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');
  const navBtn = document.querySelector(`.nav-item[data-page="${pageId}"]`);
  if (navBtn) navBtn.classList.add('active');
}

document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => nav(btn.dataset.page));
});

/* ---------- RENDER SERVICES ---------- */
function renderServices() {
  const grid = document.getElementById('servicesGrid');
  grid.innerHTML = SERVICES.map((s, i) => `
    <div class="service-card" style="animation-delay:${i*0.06}s">
      <div class="service-top">
        <span class="service-icon">${s.icon}</span>
        <span class="service-name">${s.name}</span>
      </div>
      <div class="service-desc">${s.desc}</div>
      <button class="service-btn" onclick="openModal('${s.name}')">Заказать →</button>
    </div>
  `).join('');
}

/* ---------- RENDER PORTFOLIO ---------- */
function renderPortfolio() {
  const list = document.getElementById('portfolioList');
  list.innerHTML = PORTFOLIO.map(p => `
    <div class="portfolio-card">
      <div class="portfolio-thumb ${p.thumb}">
        <span style="position:relative;z-index:1;filter:drop-shadow(0 0 8px rgba(0,255,136,0.5))">${p.emoji}</span>
      </div>
      <div class="portfolio-body">
        <div class="portfolio-title">${p.title}</div>
        <div class="portfolio-desc">${p.desc}</div>
        <div class="portfolio-footer">
          <div class="portfolio-tags">${p.tags.map(t=>`<span class="p-tag">${t}</span>`).join('')}</div>
          <span class="p-status ${p.status}">${p.status === 'done' ? '✓ Завершён' : '● Активный'}</span>
        </div>
      </div>
    </div>
  `).join('');
}

/* ---------- RENDER REVIEWS ---------- */
function renderReviews() {
  const list = document.getElementById('reviewsList');
  list.innerHTML = REVIEWS.map((r, i) => `
    <div class="review-card" style="animation-delay:${i*0.12}s">
      <div class="review-top">
        <div class="review-avatar">${r.initials}</div>
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</div>
        </div>
      </div>
      <div class="review-quote">"</div>
      <div class="review-text">${r.text}</div>
    </div>
  `).join('');
}

/* ---------- ANIMATED COUNTERS ---------- */
function animateCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.dataset.target);
    const dur = 1600;
    const step = 16;
    const inc = target / (dur / step);
    let cur = 0;
    const timer = setInterval(() => {
      cur += inc;
      if (cur >= target) { cur = target; clearInterval(timer); }
      el.textContent = Math.floor(cur) + '+';
    }, step);
  });
}

/* ---------- STAT BAR FILL ---------- */
function animateBars() {
  setTimeout(() => {
    document.querySelectorAll('.stat-bar-fill').forEach(el => {
      const w = el.style.width;
      el.style.width = '0%';
      setTimeout(() => { el.style.width = w; }, 100);
    });
  }, 200);
}

/* ---------- TYPING EFFECT ---------- */
function typeText(el, text, speed = 38) {
  let i = 0;
  el.textContent = '';
  const timer = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) clearInterval(timer);
  }, speed);
}

/* ---------- MODAL ---------- */
function openModal(serviceType) {
  const overlay = document.getElementById('modalOverlay');
  const sel = document.getElementById('fType');
  if (sel && serviceType !== 'general') {
    for (let opt of sel.options) {
      if (opt.text.toLowerCase().includes(serviceType.toLowerCase().slice(0, 6))) {
        opt.selected = true; break;
      }
    }
  }
  // Pre-fill TG username from Telegram WebApp if available
  if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
    const u = tg.initDataUnsafe.user;
    const nameEl = document.getElementById('fName');
    const tgEl   = document.getElementById('fTg');
    if (nameEl && !nameEl.value) nameEl.value = (u.first_name + (u.last_name ? ' ' + u.last_name : '')).trim();
    if (tgEl  && !tgEl.value && u.username) tgEl.value = '@' + u.username;
  }
  overlay.classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

/* ---------- FORM SUBMIT ---------- */
function submitForm(e) {
  e.preventDefault();
  const data = {
    name:    document.getElementById('fName').value,
    tg:      document.getElementById('fTg').value,
    type:    document.getElementById('fType').value,
    desc:    document.getElementById('fDesc').value,
    budget:  document.getElementById('fBudget').value,
  };

  // Telegram.WebApp.sendData (if in Telegram context)
  if (tg && tg.sendData) {
    try { tg.sendData(JSON.stringify(data)); } catch(_) {}
  }

  closeModal();
  showToast('Заявка успешно отправлена');
  document.getElementById('orderForm').reset();
}

/* ---------- TOAST ---------- */
function showToast(msg) {
  const toast = document.getElementById('successToast');
  toast.querySelector('span:last-child').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ---------- INIT ---------- */
function initAnimations() {
  animateCounters();
  animateBars();

  const sub = document.getElementById('typedSub');
  if (sub) {
    typeText(sub, 'Разработка Telegram-ботов, автоматизация бизнеса, интеграции и индивидуальные решения.', 32);
  }
}

/* ---------- BOOT ---------- */
window.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  renderServices();
  renderPortfolio();
  renderReviews();
  runLoader();
});
