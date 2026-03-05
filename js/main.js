(() => {
  const root = document.querySelector('.header__nav');
  const burger = root.querySelector('.burger');
  const menu = root.querySelector('.nav');
  const overlay = root.querySelector('.nav-overlay');

  const setMenuTopFromBurger = () => {
    // координаты внутри root (т.к. menu absolute относительно root)
    const top = burger.offsetTop + burger.offsetHeight;
    menu.style.top = `${top}px`;
  };

  const open = () => {
    setMenuTopFromBurger();
    root.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    root.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    overlay.hidden = true;
    document.body.style.overflow = '';
  };

  const isOpen = () => root.classList.contains('is-open');

  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen() ? close() : open();
  });

  overlay.addEventListener('click', close);

  document.addEventListener('click', (e) => {
    if (!isOpen()) return;
    if (!menu.contains(e.target) && !burger.contains(e.target)) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) close();
  });

  // при ресайзе обновляем позицию, и закрываем при уходе на десктоп
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 576) close();
    if (isOpen() && window.innerWidth < 576) setMenuTopFromBurger();
  });

  // (опционально) закрыть при клике на пункт
  menu.addEventListener('click', (e) => {
    if (e.target.closest('.nav__item') && window.innerWidth < 576) close();
  });
})();