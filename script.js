document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav-links');
  if (menu && nav) menu.addEventListener('click', () => nav.classList.toggle('show'));

  const navInner = document.querySelector('.nav-inner');
  if (navInner && !navInner.querySelector('.theme-toggle')) {
    const themeToggle = document.createElement('button');
    themeToggle.type = 'button';
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle dark and light mode');
    themeToggle.innerHTML = '<span class="toggle-icon">☀</span>';
    navInner.appendChild(themeToggle);

    const applyTheme = (theme) => {
      document.body.classList.toggle('light-theme', theme === 'light');
      const icon = themeToggle.querySelector('.toggle-icon');
      if (icon) icon.textContent = theme === 'light' ? '☾' : '☀';
      themeToggle.setAttribute('aria-pressed', String(theme === 'light'));
      localStorage.setItem('portfolio-theme', theme);
    };

    const savedTheme = localStorage.getItem('portfolio-theme');
    const preferredTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    applyTheme(savedTheme || preferredTheme);

    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light-theme');
      applyTheme(isLight ? 'dark' : 'light');
    });
  }

  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current) a.classList.add('active');
    a.addEventListener('click', () => nav?.classList.remove('show'));
  });

  const glow = document.querySelector('.glow');
  if (glow) window.addEventListener('pointermove', e => {
    glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  document.querySelectorAll('[data-cert]').forEach(img => {
    img.addEventListener('click', () => {
      const modal = document.querySelector('#certModal');
      const modalImg = document.querySelector('#modalImg');
      if(modal && modalImg){ modalImg.src = img.dataset.cert; modal.classList.add('open'); }
    });
  });
  const modal = document.querySelector('#certModal');
  const close = document.querySelector('.close');
  close?.addEventListener('click', () => modal.classList.remove('open'));
  modal?.addEventListener('click', e => { if(e.target === modal) modal.classList.remove('open'); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') modal?.classList.remove('open'); });

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
});
