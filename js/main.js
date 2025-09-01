document.addEventListener('DOMContentLoaded', function(){
  // Update year in footer
  const yil = document.getElementById('yil');
  if(yil){ 
    yil.textContent = new Date().getFullYear(); 
  }

  // Mobile menu toggle
  const toggle = document.getElementById('menuToggle');
  const list = document.getElementById('ana-menu');
  if(toggle && list){
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      list.classList.toggle('show');
    });
  }

  // Contact form handling
  const contactForm = document.querySelector('.contact-form');
  const formStatus = document.getElementById('form-status');
  
  if(contactForm && formStatus) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Clear previous status
      formStatus.textContent = '';
      formStatus.className = '';
      
      // Get form data
      const formData = new FormData(contactForm);
      
      try {
        // Show loading state
        formStatus.textContent = 'Gönderiliyor...';
        formStatus.className = 'status-loading';
        
        // Submit to Netlify (if available) or show demo message
        if (window.location.hostname.includes('netlify') || window.location.hostname.includes('github.io')) {
          const response = await fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
          });
          
          if (response.ok) {
            formStatus.textContent = 'Mesajınız başarıyla gönderildi! Teşekkürler.';
            formStatus.className = 'status-success';
            contactForm.reset();
          } else {
            throw new Error('Network response was not ok');
          }
        } else {
          // Demo mode for local development
          setTimeout(() => {
            formStatus.textContent = 'Demo modunda - mesaj gönderilmedi. Üretim ortamında çalışacaktır.';
            formStatus.className = 'status-demo';
          }, 1000);
        }
        
      } catch (error) {
        formStatus.textContent = 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
        formStatus.className = 'status-error';
      }
    });
  }

  // Register service worker for PWA functionality
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered successfully:', registration.scope);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  }
});

