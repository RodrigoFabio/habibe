/* ============================================
   HABIBE ESFIHARIA — main.js
   ============================================ */

// Footer year
document.querySelectorAll('#footerYear').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// ============================================
// HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav when a link is clicked
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
}

// ============================================
// FADE-IN ON SCROLL (IntersectionObserver)
// ============================================
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.fade-in').forEach(el => {
  fadeObserver.observe(el);
});

// ============================================
// MARQUEE ANIMATION (requestAnimationFrame)
// ============================================
const marqueeTrack = document.getElementById('marqueeTrack');

if (marqueeTrack) {
  let x = 0;
  let animFrameId = null;
  const speed = 0.8; // pixels per frame

  function getHalfWidth() {
    return marqueeTrack.scrollWidth / 2;
  }

  function animateMarquee() {
    x -= speed;
    const half = getHalfWidth();
    if (Math.abs(x) >= half) {
      x = 0;
    }
    marqueeTrack.style.transform = `translateX(${x}px)`;
    animFrameId = requestAnimationFrame(animateMarquee);
  }

  // Start after images have had a chance to load dimensions
  window.addEventListener('load', () => {
    animFrameId = requestAnimationFrame(animateMarquee);
  });

  // Pause on hover
  marqueeTrack.addEventListener('mouseenter', () => {
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
  });

  marqueeTrack.addEventListener('mouseleave', () => {
    if (!animFrameId) {
      animFrameId = requestAnimationFrame(animateMarquee);
    }
  });
}

// ============================================
// SMOOTH SCROLL (anchor links)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================
// STAGGERED FADE-IN for grids
// ============================================
// Give grid children a staggered delay
const staggerContainers = document.querySelectorAll(
  '.grid-quick-info, .grid-testimonials, .menu-grid, .values-grid, .localizacoes-grid, .how-grid'
);

staggerContainers.forEach(container => {
  const children = container.querySelectorAll('.fade-in');
  children.forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.08}s`;
  });
});

// ============================================
// NAVBAR: hide/show on scroll (optional polish)
// ============================================
let lastScroll = 0;
const fixedNavbar = document.querySelector('.fixed-navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  // Add subtle shadow when page is scrolled
  if (fixedNavbar) {
    if (currentScroll > 80) {
      fixedNavbar.style.filter = 'drop-shadow(0 8px 32px rgba(178,33,42,0.15))';
    } else {
      fixedNavbar.style.filter = 'none';
    }
  }
  lastScroll = currentScroll;
}, { passive: true });
