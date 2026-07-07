/* Movimento e navegação: reveal, parallax leve, navbar e seção ativa. */
(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const navbar = document.querySelector('.navbar');
  const revealElements = document.querySelectorAll('.reveal');
  const navLinks = document.querySelectorAll('.desktop-nav a');
  const sections = [...navLinks].map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

  revealElements.forEach(element => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55%', threshold: 0 });
  sections.forEach(section => sectionObserver.observe(section));

  let ticking = false;
  const updateScroll = () => {
    const y = window.scrollY;
    navbar?.classList.toggle('scrolled', y > 24);
    if (!reduceMotion && window.innerWidth > 700) {
      document.querySelectorAll('.parallax').forEach(element => {
        const speed = Number(element.dataset.speed || 0);
        element.style.translate = `0 ${Math.round(y * speed)}px`;
      });
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateScroll); ticking = true; }
  }, { passive: true });
  updateScroll();
})();
