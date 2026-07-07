/* Animações de dados executadas somente quando os gráficos entram na tela. */
(() => {
  'use strict';

  const formatNumber = value => new Intl.NumberFormat('pt-BR').format(value);
  const animateCounter = element => {
    const target = Number(element.dataset.counter);
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    const duration = 1100;
    const start = performance.now();
    const frame = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = `${prefix}${formatNumber(Math.round(target * eased))}${suffix}`;
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  const dataObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      if (element.matches('[data-counter]')) animateCounter(element);
      if (element.id === 'revenue-chart') {
        element.querySelectorAll('.bar').forEach(bar => { bar.style.height = `${bar.dataset.height}%`; });
      }
      if (element.id === 'timeline') element.classList.add('animated');
      if (element.classList.contains('steps-line')) element.classList.add('animated');
      if (element.classList.contains('allocation')) {
        element.querySelectorAll('[data-width]').forEach(bar => { bar.style.width = `${bar.dataset.width}%`; });
      }
      dataObserver.unobserve(element);
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('[data-counter], #revenue-chart, #timeline, .steps-line, .allocation').forEach(element => dataObserver.observe(element));
})();
