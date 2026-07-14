const revealTargets = document.querySelectorAll(
  '.section-pill, .offer-card, .media-card, footer'
);

revealTargets.forEach((element, index) => {
  element.classList.add('reveal');
  element.style.setProperty('--delay', `${Math.min(index % 3, 2) * 90}ms`);
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.13, rootMargin: '0px 0px -40px' });

  revealTargets.forEach((element) => observer.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add('is-visible'));
}

const heroImage = document.querySelector('.hero-image');
let ticking = false;

function updateHeroParallax() {
  const scrollY = Math.min(window.scrollY, 700);
  if (heroImage && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    heroImage.style.transform = `translate3d(0, ${scrollY * 0.09}px, 0) scale(1.04)`;
  }
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateHeroParallax);
    ticking = true;
  }
}, { passive: true });

const cards = document.querySelectorAll('.offer-card');
cards.forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
  });
});

const copyButton = document.querySelector('[data-copy-link]');
const toast = document.getElementById('toast');

copyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    toast.textContent = 'Lien copié';
  } catch {
    toast.textContent = 'Copie impossible';
  }
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
});
