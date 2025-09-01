document.addEventListener('DOMContentLoaded', function(){
  // Set current year
  const yil = document.getElementById('yil');
  if(yil){ yil.textContent = new Date().getFullYear(); }

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
  const contactForm = document.getElementById('contact-form');
  if(contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => clearError(input));
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

// Form validation functions
function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  let isValid = true;
  let errorMessage = '';

  // Clear previous error
  clearError(field);

  // Required field validation
  if (field.required && !value) {
    errorMessage = 'Bu alan gereklidir.';
    isValid = false;
  }
  
  // Email validation
  else if (fieldName === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errorMessage = 'Geçerli bir e-posta adresi girin.';
      isValid = false;
    }
  }
  
  // Name validation
  else if (fieldName === 'name' && value && value.length < 2) {
    errorMessage = 'Ad soyad en az 2 karakter olmalıdır.';
    isValid = false;
  }
  
  // Message validation
  else if (fieldName === 'message' && value && value.length < 10) {
    errorMessage = 'Mesaj en az 10 karakter olmalıdır.';
    isValid = false;
  }

  if (!isValid) {
    showError(field, errorMessage);
  }

  return isValid;
}

function showError(field, message) {
  const errorElement = document.getElementById(field.name + '-error');
  if (errorElement) {
    errorElement.textContent = message;
    field.setAttribute('aria-invalid', 'true');
    field.style.borderColor = '#ef4444';
  }
}

function clearError(field) {
  const errorElement = document.getElementById(field.name + '-error');
  if (errorElement) {
    errorElement.textContent = '';
    field.setAttribute('aria-invalid', 'false');
    field.style.borderColor = '';
  }
}

function showFormStatus(message, type = 'success') {
  const statusElement = document.getElementById('form-status');
  if (statusElement) {
    statusElement.textContent = message;
    statusElement.className = `form-status ${type}`;
    statusElement.hidden = false;
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        statusElement.hidden = true;
      }, 5000);
    }
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  
  // Validate all fields
  const inputs = form.querySelectorAll('input, textarea');
  let isFormValid = true;
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      isFormValid = false;
    }
  });
  
  if (!isFormValid) {
    showFormStatus('Lütfen hataları düzeltin ve tekrar deneyin.', 'error');
    return;
  }
  
  // Show loading state
  submitBtn.disabled = true;
  btnText.hidden = true;
  btnLoading.hidden = false;
  
  try {
    // For now, simulate form submission
    // In production, replace with actual Formspree endpoint or other service
    await simulateFormSubmission(new FormData(form));
    
    showFormStatus('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
    form.reset();
    
  } catch (error) {
    console.error('Form submission error:', error);
    showFormStatus('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.', 'error');
  } finally {
    // Reset button state
    submitBtn.disabled = false;
    btnText.hidden = false;
    btnLoading.hidden = true;
  }
}

// Simulate form submission - replace with actual implementation
async function simulateFormSubmission(formData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 90% success rate
      if (Math.random() > 0.1) {
        resolve();
      } else {
        reject(new Error('Simulated error'));
      }
    }, 2000);
  });
}

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    // Log Core Web Vitals (for development)
    const perfEntries = performance.getEntriesByType('navigation');
    if (perfEntries.length > 0) {
      const navEntry = perfEntries[0];
      console.log('Page Load Time:', navEntry.loadEventEnd - navEntry.fetchStart, 'ms');
    }
  });
}

