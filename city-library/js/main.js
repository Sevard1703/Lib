document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav-links');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
    });
  }

  const scrollButton = document.querySelector('.scroll-top');
  if (scrollButton) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        scrollButton.classList.add('visible');
      } else {
        scrollButton.classList.remove('visible');
      }
    });

    scrollButton.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const statValues = document.querySelectorAll('.stat-number');
  statValues.forEach(function (item) {
    const target = Number(item.dataset.target || 0);
    let value = 0;
    const increment = Math.ceil(target / 80);
    const timer = setInterval(function () {
      value += increment;
      if (value >= target) {
        value = target;
        clearInterval(timer);
      }
      item.textContent = value + (item.dataset.suffix || '');
    }, 20);
  });

  const forms = document.querySelectorAll('form[data-form]');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const notice = form.querySelector('.notice');
      if (notice) {
        notice.className = 'notice success';
        notice.textContent = 'Ma`lumotlar muvaffaqiyatli yuborildi!';
      }
      form.reset();
    });
  });
});
