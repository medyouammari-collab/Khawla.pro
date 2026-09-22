/* ================================================
   LALLA KHAWLA EL ALAMI — CV SCRIPT
   GSAP Animations + Navbar Morphing + Skill Counters
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== LUCIDE ICONS =====
    if (window.lucide) {
        lucide.createIcons();
    }

    // ===== GSAP REGISTER =====
    gsap.registerPlugin(ScrollTrigger);

    // ===== MOBILE MENU TOGGLE =====
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
            });
        });
    }

    // ===== NAVBAR SCROLL MORPH =====
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero');

    if (navbar && heroSection) {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    navbar.classList.remove('scrolled');
                } else {
                    navbar.classList.add('scrolled');
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(heroSection);
    }

    // ===== SMOOTH ANCHOR SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== HERO ANIMATIONS =====
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
        .to('#heroAvatar', {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            delay: 0.3,
        })
        .fromTo('#heroName',
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8 },
            '-=0.5'
        )
        .fromTo('#heroTitle',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7 },
            '-=0.4'
        )
        .fromTo('#heroStats',
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.3'
        )
        .fromTo('#heroCtas',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.2'
        )
        .fromTo('#heroScroll',
            { opacity: 0 },
            { opacity: 1, duration: 0.8 },
            '-=0.1'
        );

    // ===== ABOUT SECTION =====
    gsap.fromTo('.about-inner', {
        opacity: 0, y: 60
    }, {
        opacity: 1, y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about',
            start: 'top 75%',
            toggleActions: 'play none none none',
        }
    });

    // ===== TIMELINE ITEMS =====
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, i) => {
        const isLeft = item.classList.contains('left');
        const xStart = isLeft ? -80 : 80;

        gsap.fromTo(item, {
            opacity: 0,
            x: xStart,
        }, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none',
            }
        });

        // Dot pulse
        const dot = item.querySelector('.timeline-dot');
        if (dot) {
            gsap.fromTo(dot, {
                scale: 0,
            }, {
                scale: 1,
                duration: 0.5,
                ease: 'back.out(2)',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                }
            });
        }
    });

    // ===== SKILL CIRCLES + COUNTERS =====
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach((card, i) => {
        const progress = card.querySelector('.skill-progress');
        const percentEl = card.querySelector('.skill-percent');
        const targetPercent = parseInt(progress?.getAttribute('data-percent') || '0');
        const circumference = 2 * Math.PI * 52; // r=52

        gsap.fromTo(card, {
            opacity: 0,
            y: 40,
        }, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 75%',
                toggleActions: 'play none none none',
                onEnter: () => {
                    // Animate circle
                    if (progress) {
                        const offset = circumference - (circumference * targetPercent / 100);
                        setTimeout(() => {
                            progress.style.strokeDashoffset = offset;
                        }, i * 120 + 200);
                    }

                    // Animate counter
                    if (percentEl) {
                        const counter = { val: 0 };
                        gsap.to(counter, {
                            val: targetPercent,
                            duration: 1.5,
                            delay: i * 0.12 + 0.3,
                            ease: 'power2.out',
                            onUpdate: () => {
                                percentEl.textContent = Math.round(counter.val) + '%';
                            }
                        });
                    }
                }
            }
        });
    });

    // ===== QUALITY TAGS =====
    gsap.fromTo('.quality-tag', {
        opacity: 0,
        scale: 0.7,
        y: 20,
    }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.qualities',
            start: 'top 85%',
            toggleActions: 'play none none none',
        }
    });

    // ===== EDUCATION CARDS =====
    const eduCards = document.querySelectorAll('.edu-card');

    eduCards.forEach((card, i) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 40,
        }, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
            }
        });
    });

    // ===== INTEREST ITEMS =====
    const interestItems = document.querySelectorAll('.interest-item');

    interestItems.forEach((item, i) => {
        gsap.fromTo(item, {
            opacity: 0,
            y: 30,
        }, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.interests-row',
                start: 'top 85%',
                toggleActions: 'play none none none',
            }
        });
    });

    // ===== CONTACT SECTION =====
    gsap.fromTo('.contact-inner', {
        opacity: 0,
        y: 50,
    }, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            toggleActions: 'play none none none',
        }
    });

    gsap.fromTo('.contact-link', {
        opacity: 0,
        x: -30,
    }, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact-links',
            start: 'top 85%',
            toggleActions: 'play none none none',
        }
    });

});
