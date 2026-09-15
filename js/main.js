/* ============================================
   TAPHCO - Modern Website Scripts
   ============================================ */

(function () {
    'use strict';

    // ============================================
    // Preloader
    // ============================================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function () {
        setTimeout(function () {
            preloader.classList.add('hidden');
        }, 600);
    });

    // Fallback: hide preloader after 3s regardless
    setTimeout(function () {
        preloader.classList.add('hidden');
    }, 3000);

    // ============================================
    // Navigation
    // ============================================
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    const backToTop = document.getElementById('backToTop');

    const handleScroll = function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTop.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            backToTop.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Mobile menu toggle
    mobileToggle.addEventListener('click', function () {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function (e) {
            if (this.closest('.dropdown')) {
                return;
            }
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Mobile dropdown toggling
    document.querySelectorAll('.dropdown > a').forEach(function (link) {
        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.parentElement.classList.toggle('open');
            }
        });
    });

    // Back to top
    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================
    // Hero Slider
    // ============================================
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let sliderInterval;
    const SLIDE_INTERVAL = 7000;

    const goToSlide = function (index) {
        slides.forEach(function (slide) {
            slide.classList.remove('active');
        });
        dots.forEach(function (dot) {
            dot.classList.remove('active');
        });
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
        resetSlider();
    };

    const nextSlide = function () {
        goToSlide((currentSlide + 1) % slides.length);
    };

    const resetSlider = function () {
        clearInterval(sliderInterval);
        sliderInterval = setInterval(nextSlide, SLIDE_INTERVAL);
    };

    dots.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
            goToSlide(index);
        });
    });

    // Keyboard navigation for accessibility
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' && window.scrollY < window.innerHeight * 0.5) {
            nextSlide();
        }
        if (e.key === 'ArrowLeft' && window.scrollY < window.innerHeight * 0.5) {
            goToSlide((currentSlide - 1 + slides.length) % slides.length);
        }
    });

    // Start slider
    sliderInterval = setInterval(nextSlide, SLIDE_INTERVAL);

    // ============================================
    // Active nav link on scroll (ScrollSpy)
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const observers = [];

    const highlightNav = function () {
        let current = '';
        sections.forEach(function (section) {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
    };

    // ============================================
    // Scroll Reveal Animations
    // ============================================
    const revealElements = document.querySelectorAll(
        '.about-text, .shareholder-card, .value-card, .objective-card, ' +
        '.product-card, .engagement-block, '.trim() + '.generique-card, ' +
        '.event-card, .rh-card, .links-category, .contact-card, ' +
        '.stat-item, .pilar-card, .condition-card'
    );

    revealElements.forEach(function (el) {
        el.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    // Stagger reveal for grids
    const grids = document.querySelectorAll(
        '.shareholders-grid, .values-grid, .objectives-grid, .products-grid, ' +
        '.generiques-grid, .events-grid, .rh-values, .links-grid, .quality-pilars, .conditions-grid'
    );

    grids.forEach(function (grid) {
        const children = grid.querySelectorAll(':scope > *');
        children.forEach(function (child, index) {
            child.classList.add('reveal', 'reveal-delay-' + ((index % 3) + 1));
            revealObserver.observe(child);
        });
    });

    // ============================================
    // Animated Counters
    // ============================================
    const counters = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    const animateCounter = function (el) {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const duration = 1800;
        const start = performance.now();

        const update = function (now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target).toLocaleString('fr-FR');
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    };

    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {
        counterObserver.observe(aboutStats);
    }

    // ============================================
    // Product Card Interactive Hover Effect
    // ============================================
    document.querySelectorAll('.product-card').forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            this.classList.add('hovered');
        });
        card.addEventListener('mouseleave', function () {
            this.classList.remove('hovered');
        });
    });

    // ============================================
    // Forms
    // ============================================

    // File upload label update
    const cvInput = document.getElementById('cv');
    if (cvInput) {
        cvInput.addEventListener('change', function () {
            const label = document.querySelector('.file-label span');
            if (this.files && this.files[0]) {
                label.textContent = this.files[0].name;
            } else {
                label.textContent = 'Choisir un fichier';
            }
        });
    }

    // Candidature form
    const candidatureForm = document.getElementById('candidatureForm');
    if (candidatureForm) {
        candidatureForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const inputs = this.querySelectorAll('input[required], select[required]');
            let valid = true;

            inputs.forEach(function (input) {
                if (!input.value.trim()) {
                    input.style.borderColor = '#ff4444';
                    valid = false;
                } else {
                    input.style.borderColor = '';
                }
            });

            if (valid) {
                showSuccess(this, 'Candidature envoyée avec succès ! Merci de nous avoir contactés. Nous examinerons votre profil et vous recontacterons si votre profil correspond à nos besoins.');
            }
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let valid = true;

            inputs.forEach(function (input) {
                if (!input.value.trim()) {
                    input.style.borderColor = '#ff4444';
                    valid = false;
                } else {
                    input.style.borderColor = '';
                }
            });

            if (valid) {
                showSuccess(this, 'Message envoyé avec succès ! Notre équipe vous répondra dans les plus brefs délais.');
            }
        });
    }

    // Input validation feedback - clear error on input
    document.querySelectorAll('input, textarea, select').forEach(function (field) {
        field.addEventListener('input', function () {
            if (this.value.trim()) {
                this.style.borderColor = '';
            }
        });
    });

    // ============================================
    // Success Notification
    // ============================================
    const showSuccess = function (form, message) {
        const existing = form.querySelector('.form-success');
        if (existing) {
            existing.remove();
        }

        const success = document.createElement('div');
        success.className = 'form-success';
        success.innerHTML =
            '<div style="background: rgba(0,166,81,0.12); border: 1px solid var(--color-primary); color: var(--color-primary-light); padding: 18px 24px; border-radius: 12px; margin-bottom: 24px; display: flex; align-items: center; gap: 12px; font-size: 0.95rem;">' +
            '<i class="fas fa-check-circle" style="font-size: 1.3rem; flex-shrink: 0;"></i>' +
            '<span>' + message + '</span></div>';

        form.prepend(success);
        form.reset();

        document.querySelectorAll('.file-label span').forEach(function (span) {
            span.textContent = 'Choisir un fichier';
        });

        setTimeout(function () {
            success.style.transition = 'opacity 0.5s, transform 0.5s';
            success.style.opacity = '0';
            success.style.transform = 'translateY(-10px)';
            setTimeout(function () {
                success.remove();
            }, 500);
        }, 5000);
    };

    // ============================================
    // Parallax effect on engagement icons
    // ============================================
    const parallaxElements = document.querySelectorAll('.engagement-icon, .pilar-icon');
    parallaxElements.forEach(function (el) {
        const parent = el.closest('.engagement-block, .pilar-card');
        if (parent) {
            parent.addEventListener('mousemove', function (e) {
                if (window.innerWidth < 768) return;
                const rect = parent.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const moveX = (x - centerX) / 25;
                const moveY = (y - centerY) / 25;
                el.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
            });
            parent.addEventListener('mouseleave', function () {
                el.style.transform = '';
            });
        }
    });

    // ============================================
    // Dynamic year in footer
    // ============================================
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const yearText = footerYear.textContent;
        const currentYear = new Date().getFullYear();
        footerYear.textContent = yearText.replace('2025', currentYear);
    }

})();