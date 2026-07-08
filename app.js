/* Interações globais: menu, ripple, demonstração do produto e acordeão. */
(() => {
  'use strict';

  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  const closeMenu = () => {
    menuButton?.classList.remove('active');
    mobileMenu?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.classList.toggle('active', !isOpen);
    mobileMenu.classList.toggle('open', !isOpen);
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    document.body.classList.toggle('menu-open', !isOpen);
  });

  mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  document.querySelectorAll('.ripple').forEach(element => {
    element.addEventListener('pointerdown', event => {
      const rect = element.getBoundingClientRect();
      const diameter = Math.max(rect.width, rect.height);
      const wave = document.createElement('span');
      wave.className = 'ripple-wave';
      wave.style.width = wave.style.height = `${diameter}px`;
      wave.style.left = `${event.clientX - rect.left - diameter / 2}px`;
      wave.style.top = `${event.clientY - rect.top - diameter / 2}px`;
      element.querySelector('.ripple-wave')?.remove();
      element.appendChild(wave);
    });
  });

  const featureButtons = [...document.querySelectorAll('.feature-item')];
  const demoScreens = [...document.querySelectorAll('.demo-screen')];
  featureButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.screen;
      featureButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      });
      demoScreens.forEach(screen => screen.classList.toggle('active', screen.dataset.demo === target));
    });
  });

  const methodButton = document.querySelector('.method-button');
  const methodDetail = document.querySelector('.method-detail');
  methodButton?.addEventListener('click', () => {
    const open = methodButton.getAttribute('aria-expanded') === 'true';
    methodButton.setAttribute('aria-expanded', String(!open));
    methodDetail?.classList.toggle('open', !open);
  });

  const guide = document.querySelector('.info-guide');
  const guideAvatar = document.querySelector('.info-guide-avatar');
  const guideClose = document.querySelector('.info-guide-close');
  const guideNext = document.querySelector('.info-guide-next');
  const guideMessage = document.querySelector('#guide-message');
  const guidePosition = document.querySelector('#guide-position');
  const guideMessages = [
    'Os números financeiros apresentados nesta página são projeções ilustrativas para discussão com investidores.',
    'A expansão foi planejada cidade a cidade, começando com três a cinco categorias de maior urgência.',
    'O modelo combina assinatura recorrente para profissionais com possibilidades futuras de receitas adicionais.',
    'Use o menu superior para acessar rapidamente produto, mercado, roadmap e detalhes da rodada.'
  ];
  let guideIndex = 0;

  const setGuideOpen = open => {
    guide?.setAttribute('data-open', String(open));
    guideAvatar?.setAttribute('aria-expanded', String(open));
  };

  if (window.matchMedia('(max-width: 640px)').matches) setGuideOpen(false);
  guideAvatar?.addEventListener('click', () => setGuideOpen(guide?.dataset.open !== 'true'));
  guideClose?.addEventListener('click', () => setGuideOpen(false));
  guideNext?.addEventListener('click', () => {
    guideIndex = (guideIndex + 1) % guideMessages.length;
    if (guideMessage) guideMessage.textContent = guideMessages[guideIndex];
    if (guidePosition) guidePosition.textContent = `${guideIndex + 1} de ${guideMessages.length}`;
  });
})();
