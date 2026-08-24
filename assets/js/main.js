// RARITY — interações básicas do esboço

document.addEventListener('DOMContentLoaded', () => {

  // Menu mobile
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Tabs (página de produto)
  const tabButtons = document.querySelectorAll('.tab-headers button');
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab)?.classList.add('active');
    });
  });

  // Quantidade (página de produto)
  const qtyInput = document.querySelector('.qty-box input');
  document.querySelectorAll('.qty-box button').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!qtyInput) return;
      let val = parseInt(qtyInput.value || '1', 10);
      val = btn.dataset.action === 'inc' ? val + 1 : Math.max(1, val - 1);
      qtyInput.value = val;
    });
  });

  // Seleção de tamanho / cor (visual apenas)
  document.querySelectorAll('.size-grid span, .color-grid span').forEach(el => {
    el.addEventListener('click', () => {
      el.parentElement.querySelectorAll('span').forEach(s => s.classList.remove('selected'));
      el.classList.add('selected');
    });
  });

  // Newsletter (placeholder — sem envio real ainda)
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Cadastro de newsletter — conectar a um serviço de e-mail depois.');
    });
  }

  // Formulário de contato (placeholder)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Formulário de contato — conectar a um backend/e-mail depois.');
    });
  }
});
