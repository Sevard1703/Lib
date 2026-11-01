document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.querySelector('#contactForm');
  const eventForm = document.querySelector('#eventForm');

  function showNotice(form, message, type) {
    const notice = form.querySelector('.notice');
    if (!notice) return;
    notice.className = 'notice ' + type;
    notice.textContent = message;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const emailInput = contactForm.querySelector('input[type="email"]');
      if (emailInput && !emailInput.validity.valid) {
        showNotice(contactForm, 'Elektron pochta manzilini to‘g‘ri kiriting.', 'error');
        return;
      }

      const requiredFields = contactForm.querySelectorAll('[required]');
      const emptyField = Array.from(requiredFields).some((field) => !field.value.trim());
      if (emptyField) {
        showNotice(contactForm, 'Barcha majburiy maydonlarni to‘ldiring.', 'error');
        return;
      }

      showNotice(contactForm, "Ma'lumotlar muvaffaqiyatli yuborildi!", 'success');
      contactForm.reset();
    });
  }

  if (eventForm) {
    eventForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const requiredFields = eventForm.querySelectorAll('[required]');
      const emptyField = Array.from(requiredFields).some((field) => !field.value.trim());
      if (emptyField) {
        showNotice(eventForm, 'Barcha majburiy maydonlarni to‘ldiring.', 'error');
        return;
      }
      showNotice(eventForm, 'Siz muvaffaqiyatli ro‘yxatdan o‘tdingiz!', 'success');
      eventForm.reset();
    });
  }
});
