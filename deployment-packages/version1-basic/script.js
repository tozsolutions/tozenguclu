// Modern Website JavaScript
// Author: Professional Web Solutions
// Version: 1.0.0

'use strict';

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('back-to-top');
const loadingScreen = document.getElementById('loading-screen');
const contactForm = document.getElementById('contact-form');
const portfolioFilters = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const statNumbers = document.querySelectorAll('.stat-number');

// Utility Functions
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
};

const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

const isElementPartiallyInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
};

// Loading Screen
const hideLoadingScreen = () => {
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);
};

// Navigation Functions
const toggleMobileMenu = () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
};

const closeMobileMenu = () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
};

const handleNavScroll = throttle(() => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

const updateActiveNavLink = throttle(() => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
        
        if (scrollPos >= top && scrollPos <= bottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}, 10);

// Smooth Scroll
const smoothScroll = (target) => {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
};

// Back to Top Button
const handleBackToTop = throttle(() => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}, 10);

// Counter Animation
const animateCounters = () => {
    statNumbers.forEach(counter => {
        if (isElementPartiallyInViewport(counter) && !counter.classList.contains('animated')) {
            counter.classList.add('animated');
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                } else {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                }
            };
            
            updateCounter();
        }
    });
};

// Portfolio Filter
const filterPortfolio = (filter) => {
    portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 100);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
};

// Form Validation
const validateForm = (form) => {
    const formData = new FormData(form);
    const errors = [];
    
    // Name validation
    const name = formData.get('name').trim();
    if (name.length < 2) {
        errors.push('Ad en az 2 karakter olmalıdır.');
    }
    
    // Email validation
    const email = formData.get('email').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push('Geçerli bir e-posta adresi giriniz.');
    }
    
    // Subject validation
    const subject = formData.get('subject').trim();
    if (subject.length < 3) {
        errors.push('Konu en az 3 karakter olmalıdır.');
    }
    
    // Message validation
    const message = formData.get('message').trim();
    if (message.length < 10) {
        errors.push('Mesaj en az 10 karakter olmalıdır.');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors,
        data: {
            name: name,
            email: email,
            subject: subject,
            message: message
        }
    };
};

// Show Notification
const showNotification = (message, type = 'success') => {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : '#f56565'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
};

// Handle Form Submission
const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateForm(contactForm);
    
    if (!validation.isValid) {
        showNotification(`Hata: ${validation.errors.join(' ')}`, 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
    submitBtn.disabled = true;
    
    try {
        // Netlify form submission
        const formData = new FormData(contactForm);
        
        const response = await fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        });
        
        if (response.ok) {
            // Success - redirect to thank you page
            window.location.href = '/thank-you.html';
        } else {
            throw new Error('Form submission failed');
        }
        
    } catch (error) {
        showNotification('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.', 'error');
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
};

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(animateOnScroll, observerOptions);

// Initialize animations
const initScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .contact-item, .about-text, .about-stats');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// Lazy Loading for Images
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Keyboard Navigation
const handleKeyboardNavigation = (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
    
    if (e.key === 'Tab') {
        // Ensure focus is visible
        document.body.classList.add('keyboard-nav');
    }
};

// Mouse Navigation
const handleMouseNavigation = () => {
    document.body.classList.remove('keyboard-nav');
};

// Performance Optimization
const preloadCriticalResources = () => {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
};

// Error Handling
const handleGlobalErrors = () => {
    window.addEventListener('error', (e) => {
        console.error('Global error:', e.error);
        // Could send to error tracking service
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
        // Could send to error tracking service
    });
};

// Service Worker Registration
const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('ServiceWorker registration successful:', registration);
        } catch (error) {
            console.log('ServiceWorker registration failed:', error);
        }
    }
};

// Initialize Analytics (placeholder)
const initAnalytics = () => {
    // Google Analytics or other analytics service
    // gtag('config', 'GA_MEASUREMENT_ID');
    console.log('Analytics initialized (placeholder)');
};

// Event Listeners
const addEventListeners = () => {
    // Navigation
    navToggle?.addEventListener('click', toggleMobileMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target);
            closeMobileMenu();
        });
    });
    
    // Scroll events
    window.addEventListener('scroll', () => {
        handleNavScroll();
        updateActiveNavLink();
        handleBackToTop();
        animateCounters();
    });
    
    // Back to top
    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Portfolio filters
    portfolioFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active filter
            portfolioFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter portfolio
            filterPortfolio(filter);
        });
    });
    
    // Contact form
    contactForm?.addEventListener('submit', handleFormSubmit);
    
    // Keyboard and mouse navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    document.addEventListener('mousedown', handleMouseNavigation);
    
    // Window events
    window.addEventListener('load', hideLoadingScreen);
    window.addEventListener('resize', debounce(() => {
        // Handle responsive changes
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }, 250));
};

// Page Visibility API
const handleVisibilityChange = () => {
    if (document.hidden) {
        // Page is hidden - pause animations, videos, etc.
        console.log('Page hidden');
    } else {
        // Page is visible - resume activities
        console.log('Page visible');
    }
};

// Initialize Application
const init = () => {
    // Performance optimizations
    preloadCriticalResources();
    
    // Error handling
    handleGlobalErrors();
    
    // Event listeners
    addEventListeners();
    
    // Animations
    initScrollAnimations();
    
    // Lazy loading
    lazyLoadImages();
    
    // Analytics
    initAnalytics();
    
    // Service worker
    registerServiceWorker();
    
    // Page visibility
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Initial calls
    handleNavScroll();
    updateActiveNavLink();
    handleBackToTop();
    
    console.log('Website initialized successfully');
};

// DOM Content Loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        init,
        smoothScroll,
        showNotification,
        validateForm
    };
}