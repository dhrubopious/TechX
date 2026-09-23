document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const navToggle = document.querySelector('.mobile-menu-toggle');
    const menuLinks = document.querySelectorAll('nav a');

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    event.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Header shadow on scroll
    const updateHeaderState = () => {
        if (!header) return;
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });

    // Mobile menu toggle
    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    nav.classList.remove('nav-open');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal, .feature-card, .news-card, .testimonial-card, .about-badge, .leader-card, .value-item, .stat-item, .hero-content, .hero-contact-card, .about-page-content, .about-page-image');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((element, index) => {
        element.classList.add('reveal');
        element.style.transitionDelay = `${index * 90}ms`;
        revealObserver.observe(element);
    });

    // More dramatic parallax motion for hero and about hero elements
    const heroSections = document.querySelectorAll('.hero, .about-page-hero');

    const handleParallax = () => {
        const scrollY = window.scrollY;

        heroSections.forEach((section) => {
            const content = section.querySelector('.hero-content, .about-page-content');
            const card = section.querySelector('.hero-contact-card, .about-page-image');

            if (!content || !card) return;

            const offset = scrollY - section.offsetTop;
            const drift = Math.min(Math.max(offset * 0.14, -60), 60);

            content.style.transform = `translateY(${drift * 0.7}px) scale(1.01)`;
            card.style.transform = `translateY(${drift * 1.15}px) scale(1.02)`;
        });
    };

    handleParallax();
    window.addEventListener('scroll', handleParallax, { passive: true });

    // Resize update for menu state
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && nav) {
            nav.classList.remove('nav-open');
            if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});