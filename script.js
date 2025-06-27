// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger animation
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect with improved performance
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let navbarTicking = false;
    
    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll with debouncing
        if (Math.abs(scrollTop - lastScrollTop) > 5) { // Only update if significant scroll
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;
        }
        
        navbarTicking = false;
    }
    
    function requestNavbarTick() {
        if (!navbarTicking) {
            requestAnimationFrame(updateNavbar);
            navbarTicking = true;
        }
    }
    
    window.addEventListener('scroll', requestNavbarTick, { passive: true });
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Intersection Observer for animations with improved performance
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Only animate if not already animated
                if (!entry.target.classList.contains('animate-in')) {
                    entry.target.classList.add('animate-in');
                    // Unobserve after first animation to prevent re-triggering
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation with initial setup
    const animateElements = document.querySelectorAll('.timeline-item, .skill-category, .education-item, .highlight-item, .stat-item, .project-card');
    animateElements.forEach((el, index) => {
        // Add initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)';
        el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        
        // Add slight delay for staggered effect
        el.style.transitionDelay = `${index * 0.02}s`;
        
        observer.observe(el);
    });
    
    // Typing animation for hero subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.borderRight = '2px solid #bfdbfe';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 60);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    subtitle.style.borderRight = 'none';
                }, 500);
            }
        }
        
        // Start typing animation after page load
        setTimeout(typeWriter, 500);
    }
    
    // Skill tags hover effect enhancement
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
    
    // Contact form enhancement (if you decide to add one later)
    const contactLinks = document.querySelectorAll('.contact-item a');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Social links tracking and animation
    const socialLinks = document.querySelectorAll('.social-link, .social-link-large');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Scroll to top functionality
    let scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button (integrated into main scroll handler)
    let scrollTopBtnVisible = false;
    
    function updateScrollTopBtn() {
        const shouldShow = window.pageYOffset > 300;
        if (shouldShow && !scrollTopBtnVisible) {
            scrollToTopBtn.style.display = 'flex';
            scrollTopBtnVisible = true;
        } else if (!shouldShow && scrollTopBtnVisible) {
            scrollToTopBtn.style.display = 'none';
            scrollTopBtnVisible = false;
        }
    }
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effects to scroll to top button
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
    });
    
    // Performance optimization: Throttle scroll events with requestAnimationFrame
    let ticking = false;
    
    function updateOnScroll() {
        highlightNavigation();
        updateScrollTopBtn();
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    // Use requestAnimationFrame for smoother scroll performance
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger entrance animations
        const heroElements = document.querySelectorAll('.hero-text, .hero-image');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });
    
    // Add CSS for animations that need JavaScript
    const style = document.createElement('style');
    style.textContent = `
        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        .nav-link.active {
            color: #2563eb;
        }
        
        .nav-link.active::after {
            width: 100%;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        body.loaded .hero-text,
        body.loaded .hero-image {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);
});

// Removed old animation function - now using optimized Intersection Observer

// Console welcome message
console.log(`
🚀 Welcome to Marios Sirtmatsis's Portfolio Website!
💻 Built with modern web technologies
📧 Contact: mariossirtmatsis@gmail.com
🔗 LinkedIn: https://www.linkedin.com/in/msirtmatsis/
`); 