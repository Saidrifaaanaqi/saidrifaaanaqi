/**
 * PORTFOLIO SCRIPT — SAID RIFAA ANAQI
 * 100% Vanilla JavaScript (ES6+)
 * Compatible with GitHub Pages (Static Hosting)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. STICKY NAVBAR & SCROLL PROGRESS INDICATOR
     ========================================================================== */
  const siteHeader = document.getElementById('site-header');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Update top scroll progress bar
    if (scrollProgress && docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }

    // Toggle header background on scroll
    if (siteHeader) {
      if (scrollTop > 25) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Toggle Back to Top button
    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial run

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     2. MOBILE MENU DRAWER
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMobileMenu = (open) => {
    if (!mobileToggle || !mobileMenu) return;
    const isOpen = open !== undefined ? open : !mobileMenu.classList.contains('open');
    
    if (isOpen) {
      mobileMenu.classList.add('open');
      mobileToggle.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => toggleMobileMenu());
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMobileMenu(false);
    });
  });

  // Close mobile menu if clicked outside
  document.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        toggleMobileMenu(false);
      }
    }
  });

  /* ==========================================================================
     3. ACTIVE NAVIGATION INDICATOR (SCROLL SPY)
     ========================================================================== */
  const navLinks = document.querySelectorAll('.nav-link');
  const trackedSections = document.querySelectorAll('section[id]');

  const highlightNavOnScroll = () => {
    const scrollPosition = window.scrollY + 120;

    trackedSections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  /* ==========================================================================
     4. SCROLL REVEAL (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-item');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if browser doesn't support IntersectionObserver
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  /* ==========================================================================
     5. PROJECT DETAIL MODAL DIALOG
     ========================================================================== */
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const projectCards = document.querySelectorAll('.project-card');

  // Modal Detail Elements
  const modalImg = document.getElementById('modal-project-img');
  const modalCategory = document.getElementById('modal-project-category');
  const modalStatus = document.getElementById('modal-project-status');
  const modalTitle = document.getElementById('modal-project-title');
  const modalDesc = document.getElementById('modal-project-desc');
  const modalFeatures = document.getElementById('modal-project-features');
  const modalTech = document.getElementById('modal-project-tech');
  const modalLiveLink = document.getElementById('modal-live-link');
  const modalRepoLink = document.getElementById('modal-repo-link');

  const openProjectModal = (card) => {
    if (!projectModal) return;

    const title = card.getAttribute('data-title') || 'Project Detail';
    const category = card.getAttribute('data-category') || 'Development';
    const status = card.getAttribute('data-status') || 'Completed';
    const image = card.getAttribute('data-image') || '';
    const desc = card.getAttribute('data-desc') || '';
    const rawFeatures = card.getAttribute('data-features') || '';
    const rawTech = card.getAttribute('data-tech') || '';
    const demoUrl = card.getAttribute('data-demo') || '#';
    const repoUrl = card.getAttribute('data-repo') || '#';

    // Populate Modal Content
    if (modalImg) {
      modalImg.src = image;
      modalImg.alt = `Tampilan antarmuka proyek ${title}`;
    }
    if (modalTitle) modalTitle.textContent = title;
    if (modalCategory) modalCategory.textContent = category;
    if (modalStatus) modalStatus.textContent = status;
    if (modalDesc) modalDesc.textContent = desc;

    // Populate Features
    if (modalFeatures) {
      modalFeatures.innerHTML = '';
      if (rawFeatures) {
        const featureItems = rawFeatures.split(';');
        featureItems.forEach(item => {
          const trimmed = item.trim();
          if (trimmed) {
            const li = document.createElement('li');
            li.className = 'modal-feature-item';
            li.textContent = trimmed;
            modalFeatures.appendChild(li);
          }
        });
      }
    }

    // Populate Tech Tags
    if (modalTech) {
      modalTech.innerHTML = '';
      if (rawTech) {
        const techList = rawTech.split(',');
        techList.forEach(tech => {
          const trimmed = tech.trim();
          if (trimmed) {
            const span = document.createElement('span');
            span.className = 'modal-tech-tag';
            span.textContent = trimmed;
            modalTech.appendChild(span);
          }
        });
      }
    }

    // Populate Links
    if (modalLiveLink) {
      modalLiveLink.href = demoUrl;
      modalLiveLink.style.display = demoUrl && demoUrl !== '#' ? 'inline-flex' : 'inline-flex';
    }
    if (modalRepoLink) {
      modalRepoLink.href = repoUrl;
    }

    // Open Native Dialog
    if (typeof projectModal.showModal === 'function') {
      projectModal.showModal();
    } else {
      projectModal.setAttribute('open', '');
    }
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    if (typeof projectModal.close === 'function') {
      projectModal.close();
    } else {
      projectModal.removeAttribute('open');
    }
    document.body.style.overflow = '';
  };

  // Attach card click handlers
  projectCards.forEach(card => {
    card.addEventListener('click', () => openProjectModal(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProjectModal(card);
      }
    });
  });

  // Close modal via close button
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  // Close modal on outside click (click on native dialog backdrop)
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      const rect = projectModal.getBoundingClientRect();
      const isInDialog = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );
      // If clicked on backdrop area outside the content box
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });

    // Native Esc key handler
    projectModal.addEventListener('cancel', (e) => {
      document.body.style.overflow = '';
    });
  }

  /* ==========================================================================
     6. CONTACT FORM VALIDATION & MAILTO ACTION
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formName = document.getElementById('form-name');
  const formEmail = document.getElementById('form-email');
  const formMessage = document.getElementById('form-message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const formStatus = document.getElementById('form-status');

  const validateEmail = (email) => {
    // RFC 5322 compatible lightweight regex
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Reset previous error feedback
      if (nameError) nameError.textContent = '';
      if (emailError) emailError.textContent = '';
      if (messageError) messageError.textContent = '';
      if (formStatus) {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
      }

      formName?.classList.remove('invalid');
      formEmail?.classList.remove('invalid');
      formMessage?.classList.remove('invalid');

      // Validate Name
      const nameVal = formName ? formName.value.trim() : '';
      if (!nameVal) {
        isValid = false;
        if (nameError) nameError.textContent = 'Nama lengkap wajib diisi.';
        formName?.classList.add('invalid');
      }

      // Validate Email
      const emailVal = formEmail ? formEmail.value.trim() : '';
      if (!emailVal) {
        isValid = false;
        if (emailError) emailError.textContent = 'Alamat email wajib diisi.';
        formEmail?.classList.add('invalid');
      } else if (!validateEmail(emailVal)) {
        isValid = false;
        if (emailError) emailError.textContent = 'Format alamat email tidak valid.';
        formEmail?.classList.add('invalid');
      }

      // Validate Message
      const messageVal = formMessage ? formMessage.value.trim() : '';
      if (!messageVal) {
        isValid = false;
        if (messageError) messageError.textContent = 'Pesan wajib diisi.';
        formMessage?.classList.add('invalid');
      } else if (messageVal.length < 5) {
        isValid = false;
        if (messageError) messageError.textContent = 'Pesan minimal berisi 5 karakter.';
        formMessage?.classList.add('invalid');
      }

      if (!isValid) return;

      // Handle successful submission via mailto link
      const recipient = 'saidrifaa@example.com';
      const subject = encodeURIComponent(`Portfolio Message: Kontak dari ${nameVal}`);
      const body = encodeURIComponent(
        `Halo Said Rifaa Anaqi,\n\n${messageVal}\n\n---\nPengirim: ${nameVal}\nEmail: ${emailVal}`
      );
      const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

      if (formStatus) {
        formStatus.textContent = 'Membuka aplikasi email Anda untuk mengirim pesan...';
        formStatus.className = 'form-status success';
      }

      // Open mail client
      window.location.href = mailtoUrl;

      // Reset form fields
      contactForm.reset();
    });
  }

  /* ==========================================================================
     7. DESKTOP CUSTOM CURSOR
     ========================================================================== */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  // Check if device supports fine hover pointer (non-touch desktop)
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (isFinePointer && cursorDot && cursorRing) {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isMoving = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!document.body.classList.contains('cursor-active')) {
        document.body.classList.add('cursor-active');
      }

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;

      if (!isMoving) {
        isMoving = true;
        renderRing();
      }
    });

    const renderRing = () => {
      // Smooth linear interpolation for the ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      if (Math.abs(mouseX - ringX) > 0.1 || Math.abs(mouseY - ringY) > 0.1) {
        requestAnimationFrame(renderRing);
      } else {
        isMoving = false;
      }
    };

    window.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-active');
    });

    // Hover scale effect over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-pill');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }
});
