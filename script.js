// ---------- Theme toggle ----------
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const themeLabel = document.getElementById('themeLabel');
  const themeIcon = document.getElementById('themeIcon');

  const sunIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>';
  const moonIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

  function applyTheme(theme){
    body.setAttribute('data-theme', theme);
    if(theme === 'dark'){
      themeLabel.textContent = 'Dark';
      themeIcon.innerHTML = moonIcon;
    } else {
      themeLabel.textContent = 'Light';
      themeIcon.innerHTML = sunIcon;
    }
  }

  let saved = 'dark';
  try { saved = window.localStorage ? (localStorage.getItem('theme') || 'dark') : 'dark'; } catch(e) {}
  applyTheme(saved);

  themeToggle.addEventListener('click', () => {
    const current = body.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch(e) {}
  });

  // ---------- Brand / Home scroll-to-top ----------
  const brandHome = document.getElementById('brandHome');
  brandHome.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---------- Mobile menu ----------
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  // ---------- Animated skill bars ----------
  const skillItems = document.querySelectorAll('.skill-item');
  const animated = new Set();

  function animateCount(el, target, duration){
    let start = null;
    function step(ts){
      if(!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value + '%';
      if(progress < 1) requestAnimationFrame(step);
      else el.textContent = target + '%';
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting && !animated.has(entry.target)){
        animated.add(entry.target);
        const item = entry.target;
        const fill = item.querySelector('.bar-fill');
        const percentEl = item.querySelector('.skill-percent');
        const percent = parseInt(fill.dataset.percent, 10);
        requestAnimationFrame(() => { fill.style.width = percent + '%'; });
        animateCount(percentEl, percent, 1200);
      }
    });
  }, { threshold: 0.4 });

  skillItems.forEach(item => observer.observe(item));