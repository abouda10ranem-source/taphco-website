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
    // Forms — client-side validation & UX
    // ============================================
    //
    // NOTE: delivery is not wired yet. When ready, replace deliverFormData()
    // with a real backend call (Formspree, FormSubmit, API, etc.) and the
    // rest of the form logic will work as-is.
    // ============================================

    // File upload label update
    var cvInput = document.getElementById('cv');
    if (cvInput) {
        cvInput.addEventListener('change', function () {
            var label = document.querySelector('.file-label span');
            if (this.files && this.files[0]) {
                label.textContent = this.files[0].name;
            } else {
                label.textContent = 'Choisir un fichier';
            }
        });
    }

    // Validation helpers
    var validators = {
        email: function (value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
        },
        phone: function (value) {
            return value === '' || /^[\d\s()+\-.]{8,20}$/.test(value);
        }
    };

    var getFieldError = function (input) {
        if (!input.value.trim()) {
            return 'Ce champ est obligatoire';
        }
        if (input.type === 'email' && !validators.email(input.value.trim())) {
            return 'Adresse email invalide';
        }
        if ((input.type === 'tel' || input.name === 'telephone') && !validators.phone(input.value.trim())) {
            return 'Numéro de téléphone invalide';
        }
        if (input.type === 'file' && !input.files.length) {
            return 'Veuillez choisir un fichier';
        }
        if (input.type === 'file' && input.files[0]) {
            var file = input.files[0];
            var validExt = /\.(pdf|doc|docx)$/i.test(file.name);
            var maxSize = 10 * 1024 * 1024;
            if (!validExt) return 'Le CV doit être au format Word ou PDF';
            if (file.size > maxSize) return 'Le fichier ne doit pas dépasser 10 Mo';
        }
        return '';
    };

    var flashFieldError = function (input) {
        var message = getFieldError(input);
        var container = input.closest('.form-group');
        var existing = container ? container.querySelector('.field-error') : null;
        if (existing) existing.remove();
        if (message) {
            input.style.borderColor = 'var(--color-danger, #ff4444)';
            if (container) {
                var tip = document.createElement('small');
                tip.className = 'field-error';
                tip.textContent = message;
                container.appendChild(tip);
            }
        } else {
            input.style.borderColor = '';
        }
        return message === '';
    };

    var validateForm = function (form) {
        var required = form.querySelectorAll('[required]');
        var valid = true;
        required.forEach(function (input) {
            if (!flashFieldError(input)) valid = false;
        });
        return valid;
    };

    var findFormGroup = function (input) {
        var group = input.closest('.form-group');
        if (group) {
            var errorTip = group.querySelector('.field-error');
            if (errorTip) errorTip.remove();
            input.style.borderColor = '';
        }
    };

    // Visual feedback (success / error banner)
    var showFormNotice = function (form, type, message) {
        var existing = form.querySelector('.form-notice');
        if (existing) existing.remove();

        var notice = document.createElement('div');
        notice.className = 'form-notice ' + type;
        notice.setAttribute('role', type === 'success' ? 'status' : 'alert');
        notice.innerHTML =
            '<i class="' + (type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle') + '"></i>' +
            '<span>' + message + '</span>';
        form.prepend(notice);

        if (type === 'success') {
            form.reset();
            document.querySelectorAll('.file-label span').forEach(function (span) {
                span.textContent = 'Choisir un fichier';
            });
        }
    };

    var setLoading = function (form, loading) {
        var btn = form.querySelector('.btn-submit');
        if (!btn) return;
        btn.disabled = loading;
        btn.classList.toggle('btn-loading', loading);
        if (loading) {
            btn.dataset.originalHtml = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours…';
        } else if (btn.dataset.originalHtml) {
            btn.innerHTML = btn.dataset.originalHtml;
            delete btn.dataset.originalHtml;
        }
    };

    // ================================================================
    // SERVICE : Envoi des formulaires (Contact & Candidature)
    // ----------------------------------------------------------------
    // ÉTAT : NON CONFIGURÉ — placeholder. Ne renvoie POUR L'INSTANT un
    // succès local pour que l'UI reste testable.
    //
    // CE QUI EST NÉCESSAIRE :
    //   1. Un service d'envoi (Formspree / FormSubmit / backend maison)
    //   2. L'adresse email réceptrice de TAPHCO
    //   3. L'endpoint API du service choisi
    //
    // Pour activer : remplacer le corps de deliverFormData() par un
    // vrai appel POST (voir handleFormResult ci-dessous), puis
    // configurer la recepIndirection selon le service.
    // ================================================================
    var deliverFormData = function (formId, payload) {
        console.info('[TAPHCO] SERVICE NÉCESSAIRE : envoi du formulaire « ' + formId +
            ' » vers l\u2019email de TAPHCO — NON CONFIGURÉ (voir commentaire dans js/main.js).', payload);
        return Promise.resolve({ ok: true });
    };

    var handleFormResult = function (form, promise, successMessage) {
        setLoading(form, true);

        promise
            .then(function () {
                setLoading(form, false);
                showFormNotice(form, 'success', successMessage);
            })
            .catch(function () {
                setLoading(form, false);
                showFormNotice(form, 'error',
                    'Une erreur est survenue. Merci de réessayer ou de nous contacter à contact@taphco.dz.'
                );
            });
    };

    var gatherFormData = function (formId, form) {
        var fields = [];
        form.querySelectorAll('input, textarea, select').forEach(function (field) {
            fields.push({ name: field.name, value: field.value.trim(), type: field.type });
        });
        return { formId: formId, fields: fields, timestamp: new Date().toISOString() };
    };

    // Candidature form
    var candidatureForm = document.getElementById('candidatureForm');
    if (candidatureForm) {
        candidatureForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!validateForm(this)) return;

            var payload = gatherFormData('candidature', this);
            var msg = 'Candidature envoyée avec succès ! Merci de nous avoir contactés. Nous examinerons votre profil et vous recontacterons si votre profil correspond à nos besoins.';

            handleFormResult(this, deliverFormData('candidature', payload), msg);
        });
    }

    // Contact form
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!validateForm(this)) return;

            var payload = gatherFormData('contact', this);
            var msg = 'Message envoyé avec succès ! Notre équipe vous répondra dans les plus brefs délais.';

            handleFormResult(this, deliverFormData('contact', payload), msg);
        });
    }

    // Input validation feedback - clear error on input
    document.querySelectorAll('input, textarea, select').forEach(function (field) {
        field.addEventListener('input', function () { findFormGroup(this); });
        field.addEventListener('change', function () { findFormGroup(this); });
    });

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