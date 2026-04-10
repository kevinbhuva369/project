/* ══════════════════════════════════════════════════════════════════════════
   DIVINE JOURNEY — script.js
   Global JavaScript for ALL pages.

   FEATURES:
   1. Hamburger / Mobile Nav overlay
   2. Scroll-reveal animation (IntersectionObserver)
   3. Animated stat counters (data-target)
   4. Premium Search overlay with live temple search
   5. Sticky nav scroll-shadow
   6. FAQ accordion (learnmore.html)
   7. Smooth active section detection for TOC / section-nav
   8. Page-load progress bar
   9. Back-to-top button
   10. Parallax hero subtle effect
   ════════════════════════════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────────────────────────────────────
   TEMPLE DATABASE  (for search)
   ────────────────────────────────────────────────────────────────────────── */
const TEMPLES = [
  { name: 'Kedarnath Temple',           path: 'viewpage/Kedarnath.html',                   tags: 'shiva jyotirlinga uttarakhand himalaya' },
  { name: 'Somnath Temple',             path: 'viewpage/Somnath Temple.html',              tags: 'shiva jyotirlinga gujarat gir' },
  { name: 'Mahakaleshwar Temple',       path: 'viewpage/Mahakaleshwar.html',               tags: 'shiva jyotirlinga ujjain madhya pradesh' },
  { name: 'Omkareshwar Temple',         path: 'viewpage/Omkareshwar.html',                 tags: 'shiva jyotirlinga madhya pradesh om' },
  { name: 'Bhimashankar Temple',        path: 'viewpage/Bhimashankar.html',                tags: 'shiva jyotirlinga maharashtra sahyadri' },
  { name: 'Kashi Vishwanath Temple',    path: 'viewpage/Kashi Vishwanath.html',            tags: 'shiva jyotirlinga varanasi kashi ganga up' },
  { name: 'Trimbakeshwar Temple',       path: 'viewpage/Trimbakeshwar.html',               tags: 'shiva jyotirlinga nashik godavari kumbh' },
  { name: 'Baidyanath Temple',          path: 'viewpage/Baidyanath.html',                  tags: 'shiva jyotirlinga jharkhand deoghar' },
  { name: 'Nageshwar Temple',           path: 'viewpage/Nageshwar.html',                   tags: 'shiva jyotirlinga dwarka gujarat' },
  { name: 'Ramanathaswamy Temple',      path: 'viewpage/Ramanathaswamy.html',              tags: 'shiva jyotirlinga rameswaram char dham tamil nadu' },
  { name: 'Grishneshwar Temple',        path: 'viewpage/Grishneshwar.html',                tags: 'shiva jyotirlinga aurangabad ellora' },
  { name: 'Mallikarjuna Temple',        path: 'viewpage/Mallikarjuna.html',                tags: 'shiva jyotirlinga srisailam andhra' },
  { name: 'Meenakshi Temple',           path: 'viewpage/Meenakshi Temple.html',            tags: 'parvati madurai tamil nadu dravidian gopuram' },
  { name: 'Tirupati Venkateswara',      path: 'viewpage/Tirupati Venkateswara.html',       tags: 'vishnu tirupati andhra balaji richest' },
  { name: 'Ram Mandir Ayodhya',         path: 'viewpage/Ram Mandir.html',                  tags: 'rama ayodhya uttar pradesh 2024 nagara' },
  { name: 'Vaishno Devi Temple',        path: 'viewpage/Vaishno Devi.html',                tags: 'devi vaishno mata katra jammu kashmir' },
  { name: 'Golden Temple',              path: 'viewpage/Golden Temple.html',               tags: 'sikh amritsar punjab harmandir sahib' },
  { name: 'Badrinath Temple',           path: 'viewpage/Badrinath.html',                   tags: 'vishnu char dham uttarakhand chamoli himalaya' },
  { name: 'Gangotri Temple',            path: 'viewpage/Gangotri.html',                    tags: 'ganga char dham uttarakhand gangotri' },
  { name: 'Yamunotri Temple',           path: 'viewpage/Yamunotri.html',                   tags: 'yamuna char dham uttarakhand' },
  { name: 'Dwarkadhish Temple',         path: 'viewpage/dwarka.html',                      tags: 'krishna dwarka char dham gujarat' },
  { name: 'Puri Jagannath Temple',      path: 'viewpage/Puri Jagannath.html',              tags: 'krishna jagannath char dham puri odisha rath yatra' },
  { name: 'Prem Mandir Vrindavan',      path: 'viewpage/Prem Mandir.html',                 tags: 'krishna radha vrindavan marble mathura up' },
  { name: 'Kamakhya Temple',            path: 'viewpage/Kamakhya Temple.html',             tags: 'devi shakti peetha guwahati assam' },
  { name: 'Siddhivinayak Temple',       path: 'viewpage/Siddhivinayak Temple.html',        tags: 'ganesha mumbai maharashtra' },
  { name: 'Shirdi Sai Baba Temple',     path: 'viewpage/Shirdi Sai Baba Temple.html',      tags: 'sai baba shirdi ahmednagar maharashtra' },
  { name: 'Konark Sun Temple',          path: 'viewpage/Konark Sun Temple.html',           tags: 'surya sun odisha unesco world heritage' },
  { name: 'Thanjavur Brihadeeswara',    path: 'viewpage/Thanjavur Brihadeeswara.html',     tags: 'shiva chola brihadeeswara thanjavur tamil nadu' },
  { name: 'Akshardham Delhi',           path: 'viewpage/Akshardham Delhi.html',            tags: 'swaminarayan akshardham delhi modern' },
  { name: 'Akshardham Gandhinagar',     path: 'viewpage/Akshardham Gandhinagar.html',      tags: 'swaminarayan akshardham gandhinagar gujarat' },
  { name: 'Srirangam Temple',           path: 'viewpage/Srirangam Temple.html',            tags: 'vishnu srirangam tiruchirappalli tamil' },
  { name: 'Lingaraj Temple',            path: 'viewpage/Lingaraj Temple Bhubaneswar.html', tags: 'shiva lingaraj bhubaneswar odisha nagara' },
  { name: 'Trijuginarayan Temple',      path: 'viewpage/Trijuginarayan.html',              tags: 'shiva parvati wedding trijuginarayan uttarakhand' },
  { name: 'Padmanabhaswamy Temple',     path: 'viewpage/Padmanabhaswamy Temple.html',      tags: 'vishnu thiruvananthapuram kerala gold' },
  { name: 'Murudeshwar Temple',         path: 'viewpage/Murudeshwar Temple.html',          tags: 'shiva murudeshwar karnataka sea' },
  { name: 'Omkareshwar Temple',         path: 'viewpage/Omkareshwar.html',                 tags: 'shiva om island madhya pradesh narmada' },
  { name: 'Dakshineswar Kali Temple',   path: 'viewpage/Dakshineswar Kali.html',           tags: 'durga kali dakshineswar kolkata west bengal ramakrishna' },
  { name: 'Kalighat Temple',            path: 'viewpage/Kalighat Temple.html',             tags: 'kali shakti peetha kolkata west bengal' },
  { name: 'Tarapith Temple',            path: 'viewpage/Tarapith Temple.html',             tags: 'tara devi shakti bengal tantra' },
  { name: 'Jakhu Temple',               path: 'viewpage/Jakhu Temple.html',                tags: 'hanuman shimla himachal pradesh' },
  { name: 'Sabarimala Temple',          path: 'viewpage/Sabarimala Temple.html',           tags: 'ayyappa sabarimala kerala pilgrimage' },
  { name: 'Banke Bihari Temple',        path: 'viewpage/Banke Bihari Temple.html',         tags: 'krishna vrindavan up radha' },
  { name: 'ISKCON Vrindavan',           path: 'viewpage/Iskcon Temple Vrindavan.html',     tags: 'krishna iskcon vrindavan modern up' },
  { name: 'ISKCON Bangalore',           path: 'viewpage/Iskcon Bangalore.html',            tags: 'krishna iskcon bangalore karnataka modern' },
  { name: 'Khatu Shyam Ji Temple',      path: 'viewpage/Khatu Shyam Ji.html',              tags: 'khatu shyam rajasthan sikar krishna' },
  { name: 'Karni Mata Temple',          path: 'viewpage/Karni Mata Temple.html',           tags: 'rats karni mata bikaner rajasthan devi' },
  { name: 'Ambaji Temple',              path: 'viewpage/Ambaji Temple.html',               tags: 'devi ambaji banaskantha gujarat shakti' },
  { name: 'Chotila Chamunda Mata',      path: 'viewpage/Chotila Chamunda Mata.html',       tags: 'chamunda devi chotila gujarat rajkot' },
  { name: 'Nathdwara Shrinathji',       path: 'viewpage/Nathdwara Shrinathji.html',        tags: 'krishna shrinathji nathdwara rajasthan pushti' },
  { name: 'Shri Krishna Janmabhoomi',   path: 'viewpage/Shri Krishna Janmabhoomi.html',    tags: 'krishna mathura janmabhoomi birth up' },
  { name: 'Govardhan Hill',             path: 'viewpage/Govardhan Hill.html',              tags: 'krishna govardhan mathura parikrama up' },
  { name: 'Barsana Radha Rani',         path: 'viewpage/Barsana Radha Rani.html',          tags: 'radha barsana holi lathmar up mathura' },
  { name: 'Nandgaon Temple',            path: 'viewpage/Nandgaon Temple.html',             tags: 'krishna nanda baba nandgaon mathura up' },
  { name: 'Lotus Temple',               path: 'viewpage/Lotus Temple.html',                tags: 'bahai lotus new delhi modern' },
  { name: 'Birla Mandir Delhi',         path: 'viewpage/Birla Mandir Delhi.html',          tags: 'birla mandir delhi modern lakshmi narayan' },
  { name: 'Chhatarpur Temple',          path: 'viewpage/Chhatarpur Temple.html',           tags: 'devi chhatarpur delhi south' },
  { name: 'Jhandewalan Temple',         path: 'viewpage/Jhandewalan Temple.html',          tags: 'devi jhandewalan delhi' },
  { name: 'Bahuchar Mata Temple',       path: 'viewpage/Bahuchar Mata Temple.html',        tags: 'devi bahuchar mata mehsana gujarat' },
  { name: 'Umananda Temple',            path: 'viewpage/Umananda Temple.html',             tags: 'shiva umananda guwahati brahmaputra assam' },
  { name: 'Pavagadh Mahakali',          path: 'viewpage/Pavagadh Mahakali.html',           tags: 'devi kali mahakali pavagadh panchmahal gujarat' },
  { name: 'Lepakshi Temple',            path: 'viewpage/Lepakshi Temple.html',             tags: 'shiva virupaksha lepakshi andhra nandi' },
  { name: 'Hampi Virupaksha',           path: 'viewpage/Hampi Virupaksha.html',            tags: 'shiva virupaksha hampi karnataka vijayanagara' },
  { name: 'Kanchipuram Temples',        path: 'viewpage/Kanchipuram Temples.html',         tags: 'kanchipuram silk temples tamil thousand' },
  { name: 'Chidambaram Temple',         path: 'viewpage/Chidambaram.html',                 tags: 'shiva chidambaram nataraja tamil thillai' },
  { name: 'Arunachalesvara Temple',     path: 'viewpage/Arunachalesvara Temple.html',      tags: 'shiva arunachala tiruvannamalai tamil fire' },
  { name: 'Shore Temple Mahabalipuram', path: 'viewpage/Shore Temple Mahabalipuram.html',  tags: 'shiva shore temple mahabalipuram pallava tamil' },
  { name: 'Mehandipur Balaji',          path: 'viewpage/Mehandipur Balaji.html',           tags: 'hanuman balaji mehandipur rajasthan dara' },
  { name: 'Salasar Balaji',             path: 'viewpage/Salasar Balaji.html',              tags: 'hanuman salasar balaji rajasthan churu' },
  { name: 'Hanuman Garhi Ayodhya',      path: 'viewpage/Hanuman Garhi Ayodhya.html',       tags: 'hanuman garhi ayodhya up rama' },
  { name: 'Naimisharanya Temple',       path: 'viewpage/Naimisharanya.html',               tags: 'vishnu naimisharanya sitapur up pilgrimage forest' },
  { name: 'Shree Jagannatha Temple',    path: 'viewpage/Shree Jagannatha Temple.html',     tags: 'jagannath puri char dham krishna odisha' },
  { name: 'Shri Hit Radha Keli Kunj',  path: 'viewpage/Shri Hit Radha Keli Kunj.html',    tags: 'radha vrindavan radhavallabh krishna up' },
  { name: 'Gomateshwara Statue',        path: 'viewpage/Gomateshwara Statue.html',         tags: 'jain gomateshwara bahubali shravanabelagola karnataka' },
  { name: 'Bateshwar Temples',          path: 'viewpage/Bateshwar Temples.html',           tags: 'shiva bateshwar morena madhya pradesh 200 temples' },
];

// Detect if we're inside the viewpage subdirectory
const isViewPage = window.location.pathname.includes('/viewpage/');
const pathPrefix = isViewPage ? '../' : '';

/* ──────────────────────────────────────────────────────────────────────────
   1. PAGE-LOAD PROGRESS BAR
   ────────────────────────────────────────────────────────────────────────── */
(function initProgressBar() {
  const bar = document.createElement('div');
  bar.id = 'page-progress';
  Object.assign(bar.style, {
    position: 'fixed', top: '0', left: '0', zIndex: '9999',
    height: '3px', width: '0%',
    background: 'linear-gradient(90deg, #D4A017, #FFD700)',
    transition: 'width 0.3s ease',
    borderRadius: '0 2px 2px 0',
    pointerEvents: 'none',
  });
  document.documentElement.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? (scrollY / total * 100) + '%' : '0%';
  }, { passive: true });
})();

/* ──────────────────────────────────────────────────────────────────────────
   2. BACK-TO-TOP BUTTON
   ────────────────────────────────────────────────────────────────────────── */
(function initBackToTop() {
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<i class="fa-solid fa-chevron-up gold-icon"></i>';
  btn.id = 'back-to-top';
  // Minimal inline to ensure flex centering — rest from CSS
  btn.style.cssText = 'display:none;align-items:center;justify-content:center;';


  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    const show = window.scrollY > 400;
    btn.style.display  = show ? 'flex' : 'none';
    btn.style.opacity  = '1';
    btn.style.transform = 'none';
  }, { passive: true });


  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  btn.addEventListener('mouseenter', () => {
    btn.style.background = '#D4A017';
    btn.style.color = '#020C1B';
    btn.style.borderColor = '#D4A017';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.background = 'rgba(2,12,27,0.88)';
    btn.style.color = '#D4A017';
    btn.style.borderColor = 'rgba(212,160,23,0.45)';
  });
})();

/* ──────────────────────────────────────────────────────────────────────────
   3. NAV SCROLL SHADOW
   ────────────────────────────────────────────────────────────────────────── */
(function initNavShadow() {
  const header = document.querySelector('header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 20
      ? '0 4px 30px rgba(0,0,0,0.45)'
      : '0 2px 24px rgba(0,0,0,0.35)';
  }, { passive: true });
})();

/* ──────────────────────────────────────────────────────────────────────────
   4. HAMBURGER / MOBILE NAV
   ────────────────────────────────────────────────────────────────────────── */
(function initHamburger() {
  const btn = document.getElementById('hamburger');
  const overlay = document.getElementById('navOverlay');
  if (!btn || !overlay) return;

  function openMenu() {
    btn.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    btn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    btn.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', () => {
    if (overlay.classList.contains('active')) closeMenu(); else openMenu();
  });

  // Close on overlay link click
  overlay.querySelectorAll('.overlay-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeMenu();
  });

  // Close on outside click (backdrop tap)
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeMenu();
  });
})();

/* ──────────────────────────────────────────────────────────────────────────
   5. SEARCH OVERLAY
   ────────────────────────────────────────────────────────────────────────── */
(function initSearch() {
  const searchBtn = document.getElementById('searchBtn');
  const mobileSearchTrigger = document.getElementById('mobileSearchTrigger');
  const overlayEl = document.getElementById('search-results-overlay');
  if (!searchBtn || !overlayEl) return;

  // Build the search UI inside the overlay
  overlayEl.innerHTML = `
    <div class="search-bar-wrap">
      <div class="search-input-wrap" style="position:relative;flex:1;">
        <i class="fa-solid fa-magnifying-glass search-icon-inside"></i>
        <input type="text" id="globalSearch" placeholder="Search temples, deities, locations…" autocomplete="off" spellcheck="false" style="width:100%;padding:12px 18px 12px 44px;">
      </div>
      <button class="search-close-btn" id="searchCloseBtn" title="Close search"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="search-hint-row">
      <span><i class="fa-solid fa-om" style="color:rgba(212,160,23,0.7);margin-right:6px;"></i>Divine Journey — Search Sacred Temples</span>
      <span>Press <kbd style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:4px;padding:1px 6px;font-family:monospace;font-size:0.85em;">Esc</kbd> to close</span>
    </div>
    <div class="search-results-grid" id="searchResultsGrid"></div>
  `;


  const searchInput = document.getElementById('globalSearch');
  const resultsGrid = document.getElementById('searchResultsGrid');
  const closeBtn    = document.getElementById('searchCloseBtn');
  let isOpen = false;

  function openSearch() {
    overlayEl.style.display = 'block';
    isOpen = true;
    renderResults('');
    setTimeout(() => searchInput && searchInput.focus(), 80);
    searchBtn.querySelector('.search-text-nav') && (searchBtn.querySelector('.search-text-nav').textContent = 'Close');
  }

  function closeSearch() {
    overlayEl.style.display = 'none';
    isOpen = false;
    if (searchInput) searchInput.value = '';
    resultsGrid.innerHTML = '';
    searchBtn.querySelector('.search-text-nav') && (searchBtn.querySelector('.search-text-nav').textContent = 'Search');
  }

  function renderResults(query) {
    const q = query.toLowerCase().trim();
    const matches = q
      ? TEMPLES.filter(t =>
          t.name.toLowerCase().includes(q) ||
          t.tags.includes(q)
        ).slice(0, 20)
      : TEMPLES.slice(0, 20);

    if (!matches.length) {
      resultsGrid.innerHTML = `<p class="search-no-result"><i class="fa-solid fa-magnifying-glass" style="color:var(--gold);margin-right:8px;"></i>No temples found for "<strong style="color:#fff;">${query}</strong>"</p>`;
      return;
    }

    resultsGrid.innerHTML = matches.map(t => `
      <a href="${pathPrefix}${t.path}" class="search-result-item" title="${t.name}">
        <div class="sri-img" style="background-image:url('${pathPrefix}${t.img || 'images/kedarnath_temple.png'}')"></div>
        <div class="sri-info">
          <span class="sri-name">${t.name}</span>
          <span class="sri-tag"><i class="fa-solid fa-gopuram"></i> ${t.tags.split(' ').slice(0,2).join(' · ')}</span>
        </div>
        <i class="fa-solid fa-arrow-right sri-arrow"></i>
      </a>
    `).join('');
  }


  searchBtn.addEventListener('click', () => {
    if (isOpen) closeSearch(); else openSearch();
  });

  if (mobileSearchTrigger) {
    mobileSearchTrigger.addEventListener('click', e => {
      e.preventDefault();
      if (isOpen) closeSearch(); else openSearch();
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeSearch);

  // Live search on input
  if (searchInput) {
    searchInput.addEventListener('input', () => renderResults(searchInput.value));
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeSearch();
      if (e.key === 'Enter') {
        const first = resultsGrid.querySelector('a');
        if (first) { window.location.href = first.href; }
      }
    });
  }

  // Close on outside click
  document.addEventListener('click', e => {
    if (isOpen && !overlayEl.contains(e.target) && e.target !== searchBtn && !searchBtn.contains(e.target)) {
      closeSearch();
    }
  });
})();

/* ──────────────────────────────────────────────────────────────────────────
   6. SCROLL-REVEAL (IntersectionObserver)
   ────────────────────────────────────────────────────────────────────────── */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.scroll-reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || '0s';
        el.style.transitionDelay = delay;
        el.classList.add('revealed');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
})();

/* ──────────────────────────────────────────────────────────────────────────
   7. ANIMATED STAT COUNTERS
   ────────────────────────────────────────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  function animateCounter(el) {
    const target  = parseInt(el.dataset.target, 10);
    const suffix  = el.dataset.suffix || '';
    const duration = Math.max(800, Math.min(2200, target * 12));
    const start  = performance.now();
    const from   = 0;

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(from + (target - from) * eased);
      el.textContent = current.toLocaleString('en-IN') + (progress === 1 ? suffix : '');
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(el => observer.observe(el));
})();

/* ──────────────────────────────────────────────────────────────────────────
   8. FAQ ACCORDION (learnmore.html)
   ────────────────────────────────────────────────────────────────────────── */
(function initFaq() {
  const faqItems = document.querySelectorAll('.lm-faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const q = item.querySelector('.lm-faq-q');
    if (!q) return;

    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      faqItems.forEach(i => i.classList.remove('open'));

      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });
})();

/* ──────────────────────────────────────────────────────────────────────────
   9. ACTIVE SECTION DETECTION (TOC strip / section-nav)
   ────────────────────────────────────────────────────────────────────────── */
(function initActiveSection() {
  const navLinks = document.querySelectorAll('.toc-item, .snav-link');
  if (!navLinks.length) return;

  const sections = [];
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) sections.push({ el, link });
    }
  });

  if (!sections.length) return;

  function update() {
    const scrollY = window.scrollY + 160;
    let active = sections[0];

    sections.forEach(s => {
      if (s.el.offsetTop <= scrollY) active = s;
    });

    navLinks.forEach(l => l.classList.remove('active'));
    if (active) active.link.classList.add('active');
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ──────────────────────────────────────────────────────────────────────────
   10. SUBTLE PARALLAX ON HERO SECTIONS
   ────────────────────────────────────────────────────────────────────────── */
(function initParallax() {
  const heroes = document.querySelectorAll(
    '.hero-section, .learnmore-hero, .temple-hero-section, .about-hero, .jyotir-cta'
  );
  if (!heroes.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function onScroll() {
    const scrollY = window.scrollY;
    heroes.forEach(hero => {
      // Only parallax if partially visible
      const rect = hero.getBoundingClientRect();
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        const offset = scrollY * 0.24;
        hero.style.backgroundPositionY = `calc(center + ${offset}px)`;
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ──────────────────────────────────────────────────────────────────────────
   11. TEMPLE CARD HOVER RIPPLE EFFECT
   ────────────────────────────────────────────────────────────────────────── */
(function initCardRipple() {
  const cards = document.querySelectorAll('.temple-card, .gallery-item, .feature-card, .value-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
      const ripple = document.createElement('span');
      ripple.className = 'card-ripple';
      Object.assign(ripple.style, {
        position: 'absolute',
        borderRadius: '50%',
        width: '4px', height: '4px',
        background: 'rgba(212,160,23,0.18)',
        transform: 'scale(0)',
        animation: 'rippleExpand 0.6s ease-out forwards',
        pointerEvents: 'none',
        zIndex: '0',
        left: '50%', top: '50%',
        marginLeft: '-2px', marginTop: '-2px',
      });

      if (getComputedStyle(card).position === 'static') {
        card.style.position = 'relative';
      }
      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // Inject keyframe once
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      @keyframes rippleExpand {
        to { transform: scale(200); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
})();

/* ──────────────────────────────────────────────────────────────────────────
   12. SMOOTH INTERNAL LINK SCROLL (with nav offset)
   ────────────────────────────────────────────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 70;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 10;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ──────────────────────────────────────────────────────────────────────────
   13. GALLERY ITEM LAZY LOADING ENHANCEMENT
   ────────────────────────────────────────────────────────────────────────── */
(function initLazyImages() {
  // Add loading="lazy" to all gallery images that don't already have it
  document.querySelectorAll('.gallery-item img, .card-img-container img').forEach(img => {
    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
  });
})();

/* ──────────────────────────────────────────────────────────────────────────
   14. FOOTER STAT NUMBERS — trigger on footer visibility
   ────────────────────────────────────────────────────────────────────────── */
// Already handled by #7 IntersectionObserver for all .stat-number elements

/* ──────────────────────────────────────────────────────────────────────────
   15. ACTIVE NAV LINK DETECTION (highlight current page)
   ────────────────────────────────────────────────────────────────────────── */
(function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links-desktop a, .overlay-link').forEach(link => {
    const linkPath = link.getAttribute('href').split('/').pop();
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });
})();


const APP_VERSION = '1.0.1'; // Matches version.json

/* ──────────────────────────────────────────────────────────────────────────
   16. PWA SERVICE WORKER & UPDATE LOGIC (Live Update API)
   ────────────────────────────────────────────────────────────────────────── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then(reg => {
      console.log('✦ SW Registered');

      // 1. Browser-level update detection
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            showUpdateToast();
          }
        });
      });

      // 2. Custom Live Update API Check (Version API)
      checkUpdateAPI();

    }).catch(err => console.error('SW Registration Failed', err));
  });

  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      window.location.reload();
      refreshing = true;
    }
  });
}

async function checkUpdateAPI() {
  try {
    const res = await fetch('version.json?t=' + Date.now());
    const data = await res.json();
    if (data.version !== APP_VERSION) {
      console.log('✦ Live Update: New version detected via API');
      showUpdateToast();
    }
  } catch (e) {
    console.warn('✦ Update API Check Failed', e);
  }
}

function showUpdateToast() {
  const toast = document.getElementById('pwa-update-toast');
  if (toast) toast.classList.add('show');
}

// Handle Update Button click
document.addEventListener('DOMContentLoaded', () => {
  const refreshBtn = document.getElementById('pwa-refresh-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      navigator.serviceWorker.getRegistration().then(reg => {
        if (reg && reg.waiting) {
          reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      });
    });
  }

  // PWA Install Logic
  let deferredPrompt;
  const installLink = document.getElementById('installLink');
  const mobileInstallLink = document.getElementById('mobileInstallLink');
  const heroInstallBtn = document.getElementById('heroInstallBtn');
  const heroKnowledgeLink = document.getElementById('heroKnowledgeLink');

  const androidInstallBtn = document.getElementById('androidInstallBtn');
  const pcInstallBtn = document.getElementById('pcInstallBtn');
  const footerInstallBtn = document.getElementById('footerInstallBtn');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // High-priority Hub buttons
    if (androidInstallBtn) androidInstallBtn.style.display = 'inline-block';
    if (pcInstallBtn) pcInstallBtn.style.display = 'inline-block';
    if (footerInstallBtn) footerInstallBtn.style.display = 'flex';
    
    if (heroInstallBtn) {
      heroInstallBtn.style.display = 'inline-block';
    }
  });

  const triggerInstall = async (e) => {
    if (!deferredPrompt) {
      console.log('✦ One-click install not triggered yet');
      return;
    }
    e.preventDefault();
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`✦ Install Choice: ${outcome}`);
    if (outcome === 'accepted') {
      deferredPrompt = null;
      if (heroInstallBtn) heroInstallBtn.style.display = 'none';
      if (androidInstallBtn) androidInstallBtn.style.display = 'none';
      if (pcInstallBtn) pcInstallBtn.style.display = 'none';
      if (footerInstallBtn) footerInstallBtn.style.display = 'none';
    }
  };

  if (heroInstallBtn) heroInstallBtn.addEventListener('click', triggerInstall);
  if (androidInstallBtn) androidInstallBtn.addEventListener('click', triggerInstall);
  if (pcInstallBtn) pcInstallBtn.addEventListener('click', triggerInstall);
  if (footerInstallBtn) footerInstallBtn.addEventListener('click', triggerInstall);

  // Detect if running as PWA (standalone)
  if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
    const webLink = document.getElementById('heroWebLink');
    if (webLink) webLink.style.display = 'inline-block';
    if (heroInstallBtn) heroInstallBtn.style.display = 'none';
  }
});

/* ──────────────────────────────────────────────────────────────────────────
   INIT COMPLETE
   ────────────────────────────────────────────────────────────────────────── */
console.log('%c✦ Divine Journey — Loaded', 'color:#D4A017;font-weight:bold;font-size:14px;');
