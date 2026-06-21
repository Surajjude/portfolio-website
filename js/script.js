/* ============================================
   PORTFOLIO WEBSITE — SHARED JAVASCRIPT
   Author: Suraj Jude
   ============================================ */

(function () {
  'use strict';

  // EmailJS Configuration
  const EMAILJS_SERVICE_ID = 'service_vz663yp';
  const EMAILJS_TEMPLATE_ID = 'template_u838fia';
  const EMAILJS_PUBLIC_KEY = '4xQJ92efHSihtMWsW';

  // Initialize EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  // ---------- Theme Toggle ----------
  let currentTheme = 'dark'; // Stored in variable, not localStorage

  function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
  }

  function toggleTheme() {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }

  // ---------- Navbar Scroll Effect ----------
  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Trigger on load in case page is already scrolled
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    }
  }

  // ---------- Mobile Menu ----------
  function initMobileMenu() {
    const hamburger = document.querySelector('.nav-hamburger');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.nav-mobile-overlay');
    if (!hamburger || !navLinks) return;

    function closeMenu() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    function openMenu() {
      hamburger.classList.add('active');
      navLinks.classList.add('active');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    hamburger.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // ---------- Active Page Highlighting ----------
  function initActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // ---------- Scroll Reveal Animations (IntersectionObserver) ----------
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (revealElements.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger animation delay
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('active');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach((el, i) => {
      // Add stagger delay if in a group
      if (!el.dataset.delay && el.parentElement) {
        const siblings = el.parentElement.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        const siblingIndex = Array.from(siblings).indexOf(el);
        if (siblingIndex > 0) {
          el.dataset.delay = siblingIndex * 100;
        }
      }
      observer.observe(el);
    });
  }

  // ---------- Typing Effect (Hero) ----------
  function initTypingEffect() {
    const typedElement = document.querySelector('.typed-text');
    if (!typedElement) return;

    const texts = [
      'Backend Developer',
      'Full-Stack Engineer',
      'Problem Solver'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 80;
    const deletingSpeed = 50;
    const pauseAfterType = 2000;
    const pauseAfterDelete = 500;

    function type() {
      const currentText = texts[textIndex];

      if (!isDeleting) {
        typedElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
          isDeleting = true;
          setTimeout(type, pauseAfterType);
          return;
        }
        setTimeout(type, typingSpeed);
      } else {
        typedElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          setTimeout(type, pauseAfterDelete);
          return;
        }
        setTimeout(type, deletingSpeed);
      }
    }

    // Start typing
    setTimeout(type, 1000);
  }

  // ---------- Floating Particles (Hero) ----------
  function initParticles() {
    const container = document.querySelector('.hero-particles');
    if (!container) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      const size = Math.random() * 6 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 10 + 8}s`;
      particle.style.animationDelay = `${Math.random() * 10}s`;

      container.appendChild(particle);
    }
  }

  // ---------- Project Filter ----------
  function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
          const categories = card.dataset.categories ? card.dataset.categories.split(',') : [];

          if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'block';
            // Re-trigger animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.transition = 'all 0.5s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // ---------- Lazy Video Autoplay ----------
  function initLazyVideos() {
    const videos = document.querySelectorAll('.project-video');
    if (videos.length === 0) return;

    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.play().catch(() => {});
        } else {
          entry.target.pause();
        }
      });
    }, { threshold: 0.3 });

    videos.forEach(video => videoObserver.observe(video));
  }

  // ---------- Image Carousel ----------
  function initCarousels() {
    document.querySelectorAll('.project-carousel').forEach(carousel => {
      const slides = carousel.querySelectorAll('.carousel-slide');
      const dots = carousel.querySelectorAll('.carousel-dot');
      const prevBtn = carousel.querySelector('.carousel-btn--prev');
      const nextBtn = carousel.querySelector('.carousel-btn--next');
      if (slides.length === 0) return;

      let current = 0;
      let autoTimer = null;

      function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
      }

      function next() { goTo(current + 1); }
      function prev() { goTo(current - 1); }

      function startAuto() {
        stopAuto();
        autoTimer = setInterval(next, 4000);
      }

      function stopAuto() {
        if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
      }

      if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });
      if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });

      dots.forEach(dot => {
        dot.addEventListener('click', () => {
          goTo(parseInt(dot.dataset.index, 10));
          startAuto();
        });
      });

      // Pause auto-advance on hover
      carousel.addEventListener('mouseenter', stopAuto);
      carousel.addEventListener('mouseleave', startAuto);

      startAuto();
    });
  }

  // ---------- Contact Form Validation & Email Sending ----------
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const formContent = document.querySelector('.form-content');
    const formSuccess = document.querySelector('.form-success');
    const submitBtn = form.querySelector('button[type="submit"]');

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(input, message) {
      const group = input.closest('.form-group');
      group.classList.add('error');
      group.querySelector('.error-msg').textContent = message;
    }

    function clearError(input) {
      const group = input.closest('.form-group');
      group.classList.remove('error');
    }

    // Clear errors on input
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => clearError(input));
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Clear all errors
      [nameInput, emailInput, messageInput].forEach(input => {
        if (input) clearError(input);
      });

      // Validate name
      if (nameInput && nameInput.value.trim().length < 2) {
        showError(nameInput, 'Please enter your name (at least 2 characters)');
        isValid = false;
      }

      // Validate email
      if (emailInput && !validateEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
      }

      // Validate message
      if (messageInput && messageInput.value.trim().length < 10) {
        showError(messageInput, 'Please enter a message (at least 10 characters)');
        isValid = false;
      }

      if (isValid) {
        // Disable submit button
        if (submitBtn) submitBtn.disabled = true;

        // Send email using EmailJS
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name: nameInput.value.trim(),
          from_email: emailInput.value.trim(),
          message: messageInput.value.trim(),
          to_email: 'surajjude888@gmail.com'
        }).then(
          (response) => {
            // Success
            if (formContent) formContent.style.display = 'none';
            if (formSuccess) formSuccess.classList.add('show');

            // Reset form after a delay
            setTimeout(() => {
              form.reset();
              if (formContent) formContent.style.display = 'block';
              if (formSuccess) formSuccess.classList.remove('show');
              if (submitBtn) submitBtn.disabled = false;
            }, 4000);
          },
          (error) => {
            // Error sending email
            console.error('EmailJS error:', error);
            showError(submitBtn ? submitBtn.parentElement : form, 'Failed to send message. Please try again.');
            if (submitBtn) submitBtn.disabled = false;
          }
        );
      }
    });
  }

  // ---------- Footer Year ----------
  function initFooterYear() {
    const yearEl = document.getElementById('footer-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // ---------- Theme Toggle Button ----------
  function initThemeToggle() {
    const toggleBtn = document.querySelector('.theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', toggleTheme);
  }

  // ---------- Initialize Everything ----------
  function init() {
    setTheme(currentTheme);
    initNavbarScroll();
    initMobileMenu();
    initActiveNavLink();
    initScrollReveal();
    initTypingEffect();
    initParticles();
    initProjectFilter();
    initLazyVideos();
    initCarousels();
    initContactForm();
    initFooterYear();
    initThemeToggle();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
