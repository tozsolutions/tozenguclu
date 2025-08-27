document.addEventListener('DOMContentLoaded', function(){
  const yil = document.getElementById('yil');
  if(yil){ yil.textContent = new Date().getFullYear(); }

  const toggle = document.getElementById('menuToggle');
  const list = document.getElementById('ana-menu');
  if(toggle && list){
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      list.classList.toggle('show');
    });
  }
});

