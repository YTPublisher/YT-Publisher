// Custom JavaScript logic for YT Publisher Website

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.style.background = 'rgba(11, 15, 23, 0.95)';
            navbar.style.borderWidth = '1px';
            navbar.style.borderColor = 'hsl(220, 20%, 22%)';
            navbar.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(11, 15, 23, 0.8)';
            navbar.style.borderWidth = '1px';
            navbar.style.borderColor = 'hsl(220, 15%, 18%)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        }
    });

    // 2. Navigation Active Link Tracker on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 3. Simple Mockup Parallax Tilt Effect
    const cards = document.querySelectorAll('.mockup-card, .showcase-card, .pane-card');
    cards.forEach(card => {
        const isShowcase = card.classList.contains('showcase-card');
        const defaultTransform = isShowcase 
            ? 'perspective(1000px) rotateX(2deg) rotateY(6deg) scale3d(1, 1, 1)' 
            : 'perspective(1000px) rotateX(5deg) rotateY(-5deg) scale3d(1, 1, 1)';

        card.style.transform = defaultTransform;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Limit tilt values
            const tiltX = (y / rect.height) * -12;
            const tiltY = (x / rect.width) * 12;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = defaultTransform;
        });
    });

    // 4. Scroll Reveal Animations for Feature Cards
    const featureCards = document.querySelectorAll('.feature-card');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        observer.observe(card);
    });

    // 5. Interactive Tour Tab Toggling
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tour-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show target pane
            const targetTab = btn.getAttribute('data-tab');
            const targetPane = document.getElementById(`pane-${targetTab}`);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
});
