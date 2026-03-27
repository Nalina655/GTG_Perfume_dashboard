// ===========================
// GTG PERFUMES - MAIN SCRIPT
// VANILLA JAVASCRIPT
// ===========================

// Image Gallery Data
const GALLERY_IMAGES = [
  'assets/images/figma/group-main.png',
  'assets/images/figma/gallery-02.jpg',
  'assets/images/figma/gallery-03.jpg',
  'assets/images/figma/gallery-04.jpg',
  'assets/images/figma/gallery-05.jpg',
  'assets/images/figma/gallery-06.jpg',
  'assets/images/figma/gallery-07.jpg',
  'assets/images/figma/gallery-08.jpg'
];

let currentImageIndex = 0;

// ===========================
// INITIALIZE DOTS
// ===========================


function initDots() {
  const dotsContainer = document.getElementById('dotsContainer');
  if (!dotsContainer) return;
  
  dotsContainer.innerHTML = '';
  GALLERY_IMAGES.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = `dot ${index === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Go to image ${index + 1}`);
    dot.addEventListener('click', () => goToImage(index));
    dotsContainer.appendChild(dot);
  });
}

// ===========================
// UPDATE GALLERY
// ===========================

function updateGallery(index) {
  const mainImage = document.getElementById('mainImage');
  const thumbnails = document.querySelectorAll('.thumbnail');
  const dots = document.querySelectorAll('.dot');

  if (!mainImage) return;

  if (index < 0 || index >= GALLERY_IMAGES.length) return;

  // Update main image with fade transition
  mainImage.style.opacity = '0.7';
  mainImage.src = GALLERY_IMAGES[index];
  mainImage.addEventListener('load', () => {
    mainImage.style.opacity = '1';
  }, { once: true });

  // Update thumbnail active state
  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });

  // Update dot active state
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
    if (i === index) {
      dot.setAttribute('aria-current', 'true');
    } else {
      dot.removeAttribute('aria-current');
    }
  });

  currentImageIndex = index;
}

// ===========================
// NAVIGATE GALLERY
// ===========================

function goToImage(index) {
  updateGallery(index);
}

function nextImage() {
  const nextIndex = (currentImageIndex + 1) % GALLERY_IMAGES.length;
  updateGallery(nextIndex);
}

function prevImage() {
  const prevIndex = (currentImageIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
  updateGallery(prevIndex);
}

// ===========================
// RADIO SELECTIONS
// ===========================

function handleOptionChange() {
  updateAddToCartLink();
  syncTileSelections();
}

function syncTileSelections() {
  document.querySelectorAll('.fragrance-tile, .purchase-tile').forEach((tile) => {
    const input = tile.querySelector('input[type="radio"]');
    tile.classList.toggle('is-selected', Boolean(input?.checked));
  });
}

// ===========================
// SUBSCRIPTION PLAN (EXPANDABLE)
// ===========================

function setActivePlan(planValue) {
  const planCards = document.querySelectorAll('.plan-card');
  const sharedControls = document.getElementById('sharedControls');
  const sharedHost = document.querySelector(`[data-shared-host="${planValue}"]`);
  const bottleCount = document.getElementById('includedBottleCount');

  planCards.forEach(card => {
    const isActive = card.dataset.plan === planValue;
    card.classList.toggle('active', isActive);

    const body = card.querySelector('.plan-body');
    if (!body) return;
    if (isActive) {
      body.removeAttribute('hidden');
    } else {
      body.setAttribute('hidden', '');
    }
  });

  if (sharedControls && sharedHost && !sharedHost.contains(sharedControls)) {
    sharedHost.appendChild(sharedControls);
  }

  if (bottleCount) {
    bottleCount.textContent = planValue === 'double' ? '2 Bottles Shipped Monthly' : '1 Bottle Shipped Monthly';
  }

  updateAddToCartLink();
  syncTileSelections();
}

function handlePlanChange(event) {
  const planValue = event.target.value;
  setActivePlan(planValue);
}

// ===========================
// ADD TO CART LINK (9 VARIATIONS)
// ===========================

function updateAddToCartLink() {
  const link = document.getElementById('addToCartLink');
  if (!link) return;

  const plan = document.querySelector('input[name="plan"]:checked')?.value || 'single';
  const purchase = document.querySelector('input[name="purchase"]:checked')?.value || 'every-30';

  const query = new URLSearchParams({ plan, purchase });

  if (plan === 'double') {
    const fragrance1 = document.querySelector('input[name="fragrance1"]:checked')?.value || 'original';
    const fragrance2 = document.querySelector('input[name="fragrance2"]:checked')?.value || 'original';
    query.set('fragrance1', fragrance1);
    query.set('fragrance2', fragrance2);
    link.setAttribute('aria-label', `Add to cart: ${plan}, ${fragrance1} + ${fragrance2}, ${purchase}`);
  } else {
    const fragrance = document.querySelector('input[name="fragrance"]:checked')?.value || 'original';
    query.set('fragrance', fragrance);
    link.setAttribute('aria-label', `Add to cart: ${plan}, ${fragrance}, ${purchase}`);
  }

  link.href = `https://example.com/add-to-cart?${query.toString()}`;
}

// ===========================
// COUNTING ANIMATION FOR STATS
// ===========================

function animateCounter(element, target, duration = 1800) {
  const startTime = performance.now();
  element.textContent = '0';

  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(progress * target);
    element.textContent = String(value);
    if (progress < 1) requestAnimationFrame(tick);
    else element.textContent = String(target);
  };

  requestAnimationFrame(tick);
}

// ===========================
// STATS COUNT-UP ON VIEW
// ===========================

function initStatCounters() {
  const statValues = document.querySelectorAll('.stat-value[data-target]');
  if (!statValues.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target, 10);
        if (Number.isFinite(target)) animateCounter(entry.target, target);
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  statValues.forEach(el => observer.observe(el));
}

// ===========================
// MOBILE HAMBURGER MENU
// ===========================

function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active') ? 'true' : 'false');
  });

  // Close menu when link clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===========================
// THUMBNAIL CLICK HANDLERS
// ===========================

function initThumbnailListeners() {
  const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      updateGallery(index);
    });
  });
}

// ===========================
// GALLERY BUTTON HANDLERS
// ===========================

function initGalleryControls() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (prevBtn) {
    prevBtn.addEventListener('click', prevImage);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', nextImage);
  }
}

// ===========================
// KEYBOARD NAVIGATION
// ===========================

function initKeyboardNavigation() {
  document.addEventListener('keydown', (event) => {
    const activeTag = document.activeElement?.tagName;
    if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

    const productSection = document.getElementById('products');
    if (productSection) {
      const rect = productSection.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
    }

    if (event.key === 'ArrowLeft') {
      prevImage();
    } else if (event.key === 'ArrowRight') {
      nextImage();
    }
  });
}

// ===========================
// FORM SUBMISSION
// ===========================

function handleNewsletterSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.querySelector('input[type="email"]')?.value?.trim();
  
  if (email) {
    form.reset();
  }
}

// ===========================
// SMOOTH SCROLL LINKS
// ===========================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ===========================
// HEADER SCROLL BACKDROP
// ===========================

function initHeaderScrollState() {
  const header = document.querySelector('.header');
  if (!header) return;

  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
}

// ===========================
// SEARCH OVERLAY
// ===========================

function initSearchOverlay() {
  const openBtn = document.getElementById('searchBtn');
  const overlay = document.getElementById('searchOverlay');
  const closeBtn = document.getElementById('searchClose');
  const input = document.getElementById('searchInput');
  if (!openBtn || !overlay || !closeBtn || !input) return;

  const open = () => {
    overlay.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input.focus(), 0);
  };

  const close = () => {
    overlay.setAttribute('hidden', '');
    document.body.style.overflow = '';
    openBtn.focus();
  };

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', (e) => {
    if (overlay.hasAttribute('hidden')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'Enter' && document.activeElement === input) {
      input.value = '';
      close();
    }
  });
}

// ===========================
// COLLECTION ACCORDION
// ===========================

function initCollectionAccordion() {
  const accordion = document.getElementById('collectionAccordion');
  if (!accordion) return;

  const items = accordion.querySelectorAll('.accordion-item');
  const closeAll = () => {
    items.forEach(item => {
      const trigger = item.querySelector('.accordion-trigger');
      const panel = item.querySelector('.accordion-panel');
      const icon = item.querySelector('.accordion-icon');
      if (!trigger || !panel) return;
      trigger.setAttribute('aria-expanded', 'false');
      panel.setAttribute('hidden', '');
      if (icon) icon.textContent = '+';
    });
  };

  items.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');
    const icon = item.querySelector('.accordion-icon');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      closeAll();
      if (!isExpanded) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.removeAttribute('hidden');
        if (icon) icon.textContent = '−';
      }
    });
  });
}

// ===========================
// INITIALIZE ALL FUNCTIONALITY
// ===========================

function initializeApp() {
  // Gallery
  initDots();
  updateGallery(currentImageIndex);
  initThumbnailListeners();
  initGalleryControls();
  initKeyboardNavigation();

  // Plan + Options (delegated)
  document.addEventListener('change', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.type !== 'radio') return;

    if (target.name === 'plan') {
      handlePlanChange(event);
      return;
    }

    if (target.name === 'purchase' || target.name === 'fragrance' || target.name === 'fragrance1' || target.name === 'fragrance2') {
      handleOptionChange();
    }
  });

  // Ensure initial plan expansion and add-to-cart link is correct
  setActivePlan(document.querySelector('input[name="plan"]:checked')?.value || 'single');
  syncTileSelections();

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }

  // Mobile Menu
  initHamburgerMenu();

  // Scroll Animations
  initStatCounters();

  // Smooth Scroll
  initSmoothScroll();

  // Header backdrop on scroll
  initHeaderScrollState();

  // Our Collection accordion
  initCollectionAccordion();

  // Search overlay
  initSearchOverlay();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

