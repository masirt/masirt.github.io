// Purple Premium Portfolio JavaScript with Smart Navigation

// Apple's signature easing curves with faster timing
const appleEasing = {
    standard: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
};

// Performance optimized scroll tracking
let ticking = false;
let scrollY = 0;
let windowHeight = window.innerHeight;
let documentHeight = 0;

// Smart Navigation Elements
let progressBar = null;
let sections = [];

// Faster intersection observer with optimized options
const createObserver = (callback, options = {}) => {
    const defaultOptions = {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: '-30px 0px -50px 0px'
    };
    
    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

// Faster animation queue system
class AnimationQueue {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }
    
    add(element, animation) {
        console.log('🎬 Adding to animation queue:', element.className);
        this.queue.push({ element, animation });
        if (!this.isProcessing) {
            this.process();
        }
    }
    
    async process() {
        this.isProcessing = true;
        console.log('🎬 Processing animation queue, items:', this.queue.length);
        
        while (this.queue.length > 0) {
            const { element, animation } = this.queue.shift();
            console.log('🎬 Processing animation for:', element.className);
            await this.animate(element, animation);
            await this.delay(50);
        }
        
        this.isProcessing = false;
        console.log('🎬 Animation queue processing complete');
    }
    
    animate(element, animation) {
        return new Promise(resolve => {
            if (!element.classList.contains('animate')) {
                console.log('🎬 Applying animate class to:', element.className);
                element.classList.add('animate');
                element.addEventListener('transitionend', resolve, { once: true });
                
                // Fallback timeout
                setTimeout(resolve, 500);
            } else {
                console.log('🎬 Element already animated:', element.className);
                resolve();
            }
        });
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

const animationQueue = new AnimationQueue();

// Simple and robust animation system - works with any navigation
const revealObserver = createObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.15) {
            const element = entry.target;
            animateElement(element);
            revealObserver.unobserve(element);
        }
    });
});

// Simple function to animate any element
function animateElement(element) {
    if (!element.classList.contains('animate')) {
        const delay = Array.from(element.parentNode.children).indexOf(element) * 75;
        setTimeout(() => {
            element.classList.add('animate');
            console.log('✨ Animated:', element.className);
        }, delay);
    }
}

// Force animate all visible elements in current viewport
function forceAnimateVisibleElements() {
    console.log('🚀 Force animating all visible elements...');
    
    // Get all elements that should be animated
    const animatableSelectors = [
        '.section-title',
        '.section-subtitle', 
        '.about-text',
        '.highlight-item',
        '.timeline-item',
        '.skill-category',
        '.project-card',
        '.education-item',
        '.contact-item',
        '.social-link-large',
        '.overview-card'
    ];
    
    animatableSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // If element is visible and not already animated
            if (rect.top < windowHeight && rect.bottom > 0 && !element.classList.contains('animate')) {
                // Stagger the animations
                setTimeout(() => {
                    element.classList.add('animate');
                    console.log('🎯 Force animated:', element.className);
                }, index * 100);
            }
        });
    });
}

// Enhanced navigation event handling
function handleNavigationComplete() {
    console.log('🧭 Navigation completed, force animating...');
    
    // Multiple checks to ensure animations happen
    setTimeout(() => forceAnimateVisibleElements(), 100);
    setTimeout(() => forceAnimateVisibleElements(), 300);
    setTimeout(() => forceAnimateVisibleElements(), 500);
}

// Initialize everything when DOM is ready with enhanced performance
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced loading sequence
    initializeLoadingSequence();
    
    // Core functionality with optimized timing and error handling
    setTimeout(() => {
        try {
            initializePerformanceOptimizations();
            initializeNavigation();
            initializeScrollEffects();
            initializeHeroEffects();
            initializeAnimations();
            initializeInteractions();
            initializeSmartNavigation();
            initializeIntelligentNavigation();
            initializePortfolioOverview();
            initializeBlogWIP();
            
            // Initialize new Apple-inspired features
            initializeAdvancedMicroInteractions();
            
            console.log('✨ Apple-inspired portfolio initialized successfully');
        } catch (error) {
            console.error('Error initializing portfolio:', error);
        }
    }, 50);
});

// Smart Navigation System for Efficient Browsing - More Subtle Approach
function initializeSmartNavigation() {
    // Add delay to ensure DOM is ready
    setTimeout(() => {
        createProgressBar();
        createSubtleNavigation();
        updateDocumentMetrics();
        
        console.log('Smart navigation initialized');
        
        // Update on scroll
        window.addEventListener('scroll', throttle(() => {
            updateProgressBar();
            updateSubtleNavigation();
            updateActiveSection();
        }, 16));
        
        // Update on resize
        window.addEventListener('resize', debounce(() => {
            updateDocumentMetrics();
        }, 150));
    }, 200);
}

// Create progress bar
function createProgressBar() {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    
    progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    
    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);
    
    console.log('Progress bar created');
}

// Create subtle navigation indicator
function createSubtleNavigation() {
    // Create a minimal breadcrumb-style indicator in the navbar
    const navbar = document.querySelector('.navbar .nav-container');
    if (!navbar) return;
    
    // Create section indicator
    const sectionIndicator = document.createElement('div');
    sectionIndicator.className = 'section-indicator';
    sectionIndicator.style.cssText = `
        position: absolute;
        right: 120px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.85rem;
        color: var(--text-secondary);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    `;
    
    navbar.appendChild(sectionIndicator);
    window.sectionIndicator = sectionIndicator;
    
    // Get all sections for navigation
    sections = Array.from(document.querySelectorAll('section[id]'));
    console.log('Found sections:', sections.map(s => s.id));
    
    // Show indicator after initial scroll
    setTimeout(() => {
        window.addEventListener('scroll', throttle(() => {
            if (window.scrollY > 100) {
                sectionIndicator.style.opacity = '1';
            } else {
                sectionIndicator.style.opacity = '0';
            }
        }, 16));
    }, 1000);
    
    console.log('Subtle navigation created');
}

// Update document metrics
function updateDocumentMetrics() {
    documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    );
    windowHeight = window.innerHeight;
}

// Update progress bar
function updateProgressBar() {
    const scrollPercent = (window.scrollY / (documentHeight - windowHeight)) * 100;
    const clampedPercent = Math.min(Math.max(scrollPercent, 0), 100);
    
    if (progressBar) {
        progressBar.style.width = clampedPercent + '%';
        
        // Add milestone indicators based on sections
        const milestones = [0, 16.67, 33.33, 50, 66.67, 83.33, 100]; // Rough section percentages
        const currentMilestone = milestones.findIndex(milestone => clampedPercent <= milestone);
        
        // Add subtle color variation based on progress
        if (clampedPercent < 25) {
            progressBar.style.background = 'linear-gradient(90deg, #8b5cf6, #a855f7)';
        } else if (clampedPercent < 50) {
            progressBar.style.background = 'linear-gradient(90deg, #a855f7, #c084fc)';
        } else if (clampedPercent < 75) {
            progressBar.style.background = 'linear-gradient(90deg, #c084fc, #a855f7)';
        } else {
            progressBar.style.background = 'linear-gradient(90deg, #a855f7, #8b5cf6)';
        }
    }
}

// Update subtle navigation
function updateSubtleNavigation() {
    const sectionIndicator = window.sectionIndicator;
    if (!sectionIndicator || !sections.length) return;
    
    const scrollPos = window.scrollY + 150; // Adjusted offset
    let currentSection = null;
    
    // Find current section
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section;
        }
    });
    
    // Update indicator text
    if (currentSection) {
        const sectionName = currentSection.id.charAt(0).toUpperCase() + currentSection.id.slice(1);
        const sectionNames = {
            'Home': 'Introduction',
            'About': 'About Me',
            'Experience': 'Experience',
            'Skills': 'Skills',
            'Projects': 'Projects',
            'Education': 'Education',
            'Contact': 'Contact'
        };
        
        sectionIndicator.textContent = sectionNames[sectionName] || sectionName;
    }
}

// Initialize section summaries for quick overview - REMOVED
// Large summary panels removed - too intrusive, opposite of the original request
function initializeSectionSummaries() {
    // Summary panels removed - they added MORE scrolling instead of reducing it
    // Focus on enhancing navigation efficiency instead
    console.log('Summary panels removed for better UX');
}

// Apple-style enhanced navigation for efficient browsing
function initializeIntelligentNavigation() {
    setTimeout(() => {
        enhanceNavigationWithPreviews();
        addKeyboardShortcuts();
        console.log('Intelligent navigation initialized');
    }, 300);
}

// Enhance navigation with content previews (Apple-style)
function enhanceNavigationWithPreviews() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const targetId = link.getAttribute('href');
        const section = document.querySelector(targetId);
        
        if (!section) return;
        
        // Add reading time estimate
        const wordCount = section.textContent.split(' ').length;
        const readingTime = Math.ceil(wordCount / 200); // 200 words per minute
        
        // Create subtle preview tooltip
        const preview = createPreviewTooltip(targetId, readingTime);
        link.parentNode.appendChild(preview);
        
        // Apple-style hover interactions
        link.addEventListener('mouseenter', () => {
            preview.style.opacity = '1';
            preview.style.transform = 'translateY(0)';
        });
        
        link.addEventListener('mouseleave', () => {
            preview.style.opacity = '0';
            preview.style.transform = 'translateY(-5px)';
        });
    });
}

// Create minimal preview tooltip (very Apple-like)
function createPreviewTooltip(sectionId, readingTime) {
    const tooltip = document.createElement('div');
    tooltip.className = 'nav-preview';
    
    const previews = {
        '#home': 'Introduction & welcome',
        '#overview': 'Professional overview dashboard',
        '#about': 'Professional summary',
        '#experience': 'Career history & achievements',
        '#skills': 'Technical expertise',
        '#projects': 'Research & development portfolio',
        '#education': 'Academic background',
        '#contact': 'Get in touch'
    };
    
    tooltip.textContent = previews[sectionId] || 'Explore this section';
    
    tooltip.style.cssText = `
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(-5px);
        background: rgba(45, 27, 61, 0.95);
        color: white;
        padding: 0.5rem 0.8rem;
        border-radius: 6px;
        font-size: 0.75rem;
        white-space: nowrap;
        opacity: 0;
        transition: all 0.2s ease;
        pointer-events: none;
        z-index: 1000;
        border: 1px solid rgba(139, 92, 246, 0.2);
        backdrop-filter: blur(10px);
    `;
    
    return tooltip;
}

// Initialize Portfolio Overview Cards - Interactive Dashboard
function initializePortfolioOverview() {
    const overviewCards = document.querySelectorAll('.overview-card');
    
    overviewCards.forEach(card => {
        const targetSection = card.getAttribute('data-section');
        
        if (targetSection) {
            card.addEventListener('click', () => {
                const section = document.getElementById(targetSection);
                if (section) {
                    // Smooth scroll to section
                    section.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start',
                        inline: 'nearest'
                    });
                    
                    // Add a subtle flash effect to the card
                    card.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        card.style.transform = '';
                    }, 150);
                    
                    // Update URL hash
                    history.pushState(null, null, `#${targetSection}`);
                }
            });
            
            // Add hover sound effect simulation with subtle animation
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.card-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.card-icon');
                if (icon) {
                    icon.style.transform = '';
                }
            });
        }
    });
    
    // Animate cards on scroll into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // Stagger animation
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Initially hide cards for animation
    overviewCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        cardObserver.observe(card);
    });
}

// Initialize Blog Work in Progress functionality
function initializeBlogWIP() {
    const blogLink = document.querySelector('.nav-link-wip');
    
    if (blogLink) {
        blogLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create a stylish modal/tooltip for work in progress
            showBlogWIPModal();
        });
    }
}

// Show Apple-style "Work in Progress" animation with beautiful design
function showBlogWIPModal() {
    console.log('🎬 Starting beautiful WIP animation...');
    
    // Remove any existing overlays
    const existingOverlay = document.querySelector('.wip-apple-overlay');
    const existingBackdrop = document.querySelector('.wip-backdrop');
    if (existingOverlay) existingOverlay.remove();
    if (existingBackdrop) existingBackdrop.remove();
    
    // Create backdrop blur element (this gets blurred)
    const backdrop = document.createElement('div');
    backdrop.className = 'wip-backdrop';
    backdrop.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        background: rgba(0, 0, 0, 0.3) !important;
        backdrop-filter: blur(0px) !important;
        z-index: 999998 !important;
        opacity: 0 !important;
        transition: all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) !important;
    `;
    
    // Create text overlay (this stays sharp)
    const overlay = document.createElement('div');
    overlay.className = 'wip-apple-overlay';
    overlay.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        background: transparent !important;
        z-index: 999999 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        opacity: 0 !important;
        transition: all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) !important;
    `;
    
    // Create clean typing text (no box, just text)
    const text = document.createElement('h1');
    text.style.cssText = `
        font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif !important;
        font-size: 4rem !important;
        font-weight: 700 !important;
        color: white !important;
        margin: 0 !important;
        padding: 0 !important;
        text-align: center !important;
        letter-spacing: -0.02em !important;
        text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8) !important;
        transform: translateY(20px) !important;
        opacity: 0 !important;
        transition: all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) !important;
        max-width: 90vw !important;
        white-space: nowrap !important;
        overflow: hidden !important;
    `;
    text.textContent = '';  // Start empty for typing effect
    
    overlay.appendChild(text);
    document.body.appendChild(backdrop);
    document.body.appendChild(overlay);
    
    console.log('✨ Beautiful overlay created');
    
    // Typing animation function (like your hero section)
    function typeText(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function typeNextChar() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeNextChar, speed);
            }
        }
        
        typeNextChar();
    }
    
    // Perfect animation sequence
    requestAnimationFrame(() => {
        // Phase 1: Show backdrop with blur
        console.log('🌫️ Phase 1: Showing backdrop with blur');
        backdrop.style.opacity = '1';
        backdrop.style.backdropFilter = 'blur(15px)';
        backdrop.style.background = 'rgba(0, 0, 0, 0.6)';
        
        // Show text overlay
        overlay.style.opacity = '1';
        
        // Phase 2: Show text container (fade in)
        setTimeout(() => {
            console.log('📝 Phase 2: Text container appearing');
            text.style.transform = 'translateY(0)';
            text.style.opacity = '1';
        }, 600);
        
        // Phase 3: Start typing animation
        setTimeout(() => {
            console.log('⌨️ Phase 3: Starting typing animation');
            typeText(text, 'Work in Progress', 100);
        }, 1000);
        
        // Phase 4: Hide text
        setTimeout(() => {
            console.log('👻 Phase 4: Text disappearing');
            text.style.transform = 'translateY(-20px)';
            text.style.opacity = '0';
            text.style.transition = 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
        }, 3200);
        
                // Phase 5: Hide backdrop and text overlay
        setTimeout(() => {
            console.log('🌅 Phase 5: Removing backdrop and overlay');
            backdrop.style.opacity = '0';
            backdrop.style.backdropFilter = 'blur(0px)';
            backdrop.style.background = 'rgba(0, 0, 0, 0)';
            overlay.style.opacity = '0';
        }, 3700);
        
        // Phase 6: Cleanup
        setTimeout(() => {
            console.log('🧹 Phase 6: Cleaning up');
            backdrop.remove();
            overlay.remove();
        }, 4500);
     });
}



// Add keyboard shortcuts for power users (very Apple)
function addKeyboardShortcuts() {
    const shortcuts = {
        '1': '#home',
        '2': '#overview',
        '3': '#about', 
        '4': '#experience',
        '5': '#skills',
        '6': '#projects',
        '7': '#education',
        '8': '#contact'
    };
    
    document.addEventListener('keydown', (e) => {
        // Only trigger if not typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        const targetSection = shortcuts[e.key];
        if (targetSection) {
            const section = document.querySelector(targetSection);
            if (section) {
                smoothScrollTo(section.offsetTop - 80, 600, appleEasing.decelerate);
            }
        }
    });
    
    // Add subtle shortcut hints (only show after scroll)
    setTimeout(() => {
        if (window.scrollY > 200) {
            showKeyboardHints();
        }
        
        window.addEventListener('scroll', throttle(() => {
            if (window.scrollY > 200) {
                showKeyboardHints();
            } else {
                hideKeyboardHints();
            }
        }, 100));
    }, 2000);
}

// Show minimal keyboard hints
function showKeyboardHints() {
    if (document.querySelector('.keyboard-hints')) return;
    
    const hints = document.createElement('div');
    hints.className = 'keyboard-hints';
    hints.innerHTML = 'Press 1-8 for quick navigation';
    hints.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        background: rgba(45, 27, 61, 0.9);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 0.75rem;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 999;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(139, 92, 246, 0.2);
    `;
    
    document.body.appendChild(hints);
    setTimeout(() => hints.style.opacity = '1', 100);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        hints.style.opacity = '0';
        setTimeout(() => hints.remove(), 300);
    }, 3000);
}

function hideKeyboardHints() {
    const hints = document.querySelector('.keyboard-hints');
    if (hints) {
        hints.style.opacity = '0';
        setTimeout(() => hints.remove(), 300);
    }
}

// Faster loading sequence
function initializeLoadingSequence() {
    // Simplified loading - no double animation
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';
}

// Advanced navigation with faster interactions
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    
    // Faster hamburger animation
    hamburger?.addEventListener('click', () => {
        const isActive = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        if (isActive) {
            navLinks.forEach((link, index) => {
                link.style.transform = 'translateY(-15px)';
                link.style.opacity = '0';
                
                setTimeout(() => {
                    link.style.transition = `all 0.25s ${appleEasing.decelerate}`;
                    link.style.transform = 'translateY(0)';
                    link.style.opacity = '1';
                }, index * 40);
            });
        }
    });
    
    // Smooth scrolling with faster timing and animation handling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 60;
                
                smoothScrollTo(offsetTop, 600, appleEasing.decelerate);
                
                // Close mobile menu
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
                
                // Update active state
                updateActiveNavLink(targetId);
                
                // Handle animation after navigation completes
                setTimeout(() => {
                    handleNavigationComplete();
                }, 700); // Slightly longer than scroll duration
                
                // Additional immediate check for safety
                setTimeout(() => {
                    forceAnimateVisibleElements();
                }, 800);
            }
        });
    });
    
    // Handle overview card navigation (portfolio cards)
    document.addEventListener('click', (e) => {
        const overviewCard = e.target.closest('.overview-card');
        if (overviewCard) {
            console.log('🎯 Overview card clicked:', overviewCard);
            const targetSection = overviewCard.getAttribute('data-section');
            console.log('🎯 Target section:', targetSection);
            
            if (targetSection) {
                const sectionElement = document.getElementById(targetSection);
                console.log('🎯 Section element found:', sectionElement);
                
                if (sectionElement) {
                    const offsetTop = sectionElement.offsetTop - 60;
                    console.log('🎯 Scrolling to:', offsetTop);
                    smoothScrollTo(offsetTop, 600, appleEasing.decelerate);
                    
                    // Update active nav link
                    updateActiveNavLink('#' + targetSection);
                    
                    // Handle animation after jump navigation completes
                    setTimeout(() => {
                        console.log('🎯 Overview card navigation complete, triggering animations...');
                        handleNavigationComplete();
                    }, 700);
                    
                    // Additional immediate check for safety
                    setTimeout(() => {
                        forceAnimateVisibleElements();
                    }, 800);
                }
            }
        }
    });
    
    // Handle hash navigation (direct links)
    window.addEventListener('hashchange', () => {
        handleNavigationComplete();
    });
    
    // Handle initial hash navigation on page load
    if (window.location.hash) {
        setTimeout(() => {
            handleNavigationComplete();
        }, 300);
    }
    
    // Add scroll-based animation trigger as backup
    window.addEventListener('scroll', throttle(() => {
        // Force animate visible elements during scroll as backup
        forceAnimateVisibleElements();
    }, 500));
    
    // Add intersection observer for section detection
    const sections = document.querySelectorAll('section[id]');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateActiveNavLink('#' + entry.target.id);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-50px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        navObserver.observe(section);
    });
    
    // Faster navbar scroll behavior
    window.addEventListener('scroll', throttle(() => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }, 16));
}

// Custom smooth scroll with Apple easing
function smoothScrollTo(targetY, duration, easing = appleEasing.standard) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();
    
    function scroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easedProgress = easeOutCubic(progress);
        const currentY = startY + (distance * easedProgress);
        
        window.scrollTo(0, currentY);
        
        if (progress < 1) {
            requestAnimationFrame(scroll);
        }
    }
    
    requestAnimationFrame(scroll);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Fixed scroll effects - no image movement during scroll
function initializeScrollEffects() {
    // Removed parallax effects that were causing image movement issues
    
    // Make scrolling more robust for fast scrolling
    let scrollTimeout;
    window.addEventListener('scroll', throttle(() => {
        scrollY = window.scrollY;
        
        // Clear any pending scroll updates
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        // Debounce scroll updates for better performance
        scrollTimeout = setTimeout(() => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }, 10);
    }, 8));
    
    function updateScrollEffects() {
        // Keep profile image fixed - no movement during scroll
        ticking = false;
    }
}

// Enhanced Apple-style hero effects - Only scroll indicator interactions
function initializeHeroEffects() {
    // Initialize enhanced typing effect
    initializeEnhancedTyping();
    
    // Enhanced scroll indicator interaction
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about') || document.querySelector('#experience');
            if (aboutSection) {
                smoothScrollTo(aboutSection.offsetTop - 60, 800, appleEasing.decelerate);
            }
        });
        
        // Add subtle pulse animation
        scrollIndicator.style.animation = 'pulse-subtle 3s ease-in-out infinite';
    }
    
    // Add CSS for enhanced scroll indicator
    if (!document.querySelector('#hero-enhancements')) {
        const heroStyle = document.createElement('style');
        heroStyle.id = 'hero-enhancements';
        heroStyle.textContent = `
            @keyframes pulse-subtle {
                0%, 100% {
                    transform: scale(1);
                    opacity: 0.8;
                }
                50% {
                    transform: scale(1.05);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(heroStyle);
    }
}

// Faster typing animation
function typeTextAppleStyle(element, text, speed = 80) {
    element.innerHTML = '';
    element.style.position = 'relative';
    
    // Create text span and cursor
    const textSpan = document.createElement('span');
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.opacity = '1';
    cursor.style.animation = 'blink 1s infinite';
    cursor.style.marginLeft = '2px';
    
    element.appendChild(textSpan);
    element.appendChild(cursor);
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            textSpan.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            setTimeout(() => {
                if (cursor.parentNode) {
                    cursor.style.transition = 'opacity 0.3s ease';
                    cursor.style.opacity = '0';
                    setTimeout(() => cursor.remove(), 300);
                }
            }, 500);
        }
    }, speed);
}

// Initialize all animations with faster timing
function initializeAnimations() {
    // Hero animations are handled by CSS only - no JavaScript interference
    
    // Set up animation classes for all elements
    const animationConfigs = [
        { selector: '.section-title', class: 'slide-in-up' },
        { selector: '.section-subtitle', class: 'fade-in-up' },
        { selector: '.about-text', class: 'fade-in-left' },
        { selector: '.highlight-item', class: 'scale-in' },
        { selector: '.timeline-item', class: 'fade-in-up' },
        { selector: '.skill-category', class: 'scale-in' },
        { selector: '.project-card', class: 'fade-in-up' },
        { selector: '.education-item', class: 'slide-in-up' },
        { selector: '.contact-item', class: 'fade-in-up' },
        { selector: '.social-link-large', class: 'fade-in-up' },
        { selector: '.overview-card', class: 'scale-in' }
    ];
    
    // Apply animation classes and set up observers
    animationConfigs.forEach(config => {
        const elements = document.querySelectorAll(config.selector);
        console.log(`🎭 Setting up ${elements.length} ${config.selector} elements`);
        
        elements.forEach((element, index) => {
            element.classList.add(config.class);
            revealObserver.observe(element);
        });
    });
    
    // Force animate visible elements on page load
    setTimeout(() => {
        console.log('🚀 Initial animation check...');
        forceAnimateVisibleElements();
    }, 200);
    
    // Additional safety checks
    setTimeout(() => forceAnimateVisibleElements(), 500);
    setTimeout(() => forceAnimateVisibleElements(), 1000);
    
    // Expose simple debug functions
    window.debugAnimations = {
        forceAnimate: forceAnimateVisibleElements,
        handleNavigation: handleNavigationComplete,
        animateAll: () => {
            // Nuclear option - animate EVERYTHING visible
            const allElements = document.querySelectorAll(
                '.section-title, .section-subtitle, .about-text, .highlight-item, ' +
                '.timeline-item, .skill-category, .project-card, .education-item, ' +
                '.contact-item, .social-link-large, .overview-card'
            );
            allElements.forEach((element, index) => {
                if (!element.classList.contains('animate')) {
                    setTimeout(() => {
                        element.classList.add('animate');
                        console.log('💥 Force animated:', element.className);
                    }, index * 50);
                }
            });
        }
    };
}

// Faster micro-interactions
function initializeInteractions() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Card hover effects with faster timing
    const cards = document.querySelectorAll('.highlight-item, .skill-category, .project-card, .education-item, .contact-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = `transform 0.25s ${appleEasing.decelerate}, box-shadow 0.25s ${appleEasing.decelerate}`;
        });
    });
    
    // Skill tags interaction
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Profile image interaction
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', () => {
            profileImage.style.transform = 'scale(1.03)';
            profileImage.style.transition = `transform 0.4s ${appleEasing.decelerate}`;
        });
        
        profileImage.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'scale(1)';
        });
    }
    
    // Initialize scroll to top
    initializeScrollToTop();
}

// Faster scroll to top button
function initializeScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }, 16));
    
    // Faster scroll to top on click
    scrollToTopBtn.addEventListener('click', () => {
        smoothScrollTo(0, 600, appleEasing.decelerate);
    });
}

// Enhanced performance optimizations for robust scrolling
function initializePerformanceOptimizations() {
    // Preload images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
    
    // Enhanced scroll performance with better throttling
    let scrollTimer = null;
    let isScrolling = false;
    
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                isScrolling = false;
            });
            isScrolling = true;
        }
        
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        
        scrollTimer = setTimeout(() => {
            document.body.classList.remove('is-scrolling');
        }, 150);
        
        document.body.classList.add('is-scrolling');
    }, { passive: true });
    
    // Optimize resize handling
    window.addEventListener('resize', debounce(() => {
        windowHeight = window.innerHeight;
        updateDocumentMetrics();
    }, 150));
    
    // Hardware acceleration for key elements
    const acceleratedElements = document.querySelectorAll(
        '.profile-image, .timeline-content, .skill-category, .overview-card'
    );
    
    acceleratedElements.forEach(element => {
        element.style.transform = 'translateZ(0)';
        element.style.willChange = 'auto';
        element.style.backfaceVisibility = 'hidden';
    });
    
    // Add CSS for better fast scrolling performance
    if (!document.querySelector('#performance-optimizations')) {
        const perfStyle = document.createElement('style');
        perfStyle.id = 'performance-optimizations';
        perfStyle.textContent = `
            .is-scrolling * {
                pointer-events: none;
            }
            
            .overview-card, .skill-category, .timeline-content {
                contain: layout style paint;
            }
            
            /* Improve image rendering during scroll */
            .profile-image img {
                image-rendering: -webkit-optimize-contrast;
                image-rendering: optimize-contrast;
            }
        `;
        document.head.appendChild(perfStyle);
    }
    
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('⚡ Enhanced performance optimizations enabled');
}

// Update active navigation link
function updateActiveNavLink(activeId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === activeId) {
            link.classList.add('active');
            
            link.style.transform = 'scale(1.05)';
            setTimeout(() => {
                link.style.transform = 'scale(1)';
            }, 100);
        }
    });
}

// Update active section based on scroll position
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            updateActiveNavLink(`#${sectionId}`);
        }
    });
}

// Utility functions with optimized performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Fun easter egg with faster animation
document.addEventListener('keydown', (e) => {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    const currentCode = window.konamiProgress || [];
    
    if (e.keyCode === konamiCode[currentCode.length]) {
        currentCode.push(e.keyCode);
        if (currentCode.length === konamiCode.length) {
            document.body.style.animation = 'rainbow 1s ease-in-out';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 1000);
            window.konamiProgress = [];
        } else {
            window.konamiProgress = currentCode;
        }
    } else {
        window.konamiProgress = [];
    }
});

// Add CSS for faster rainbow animation
const rainbowCSS = `
@keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    50% { filter: hue-rotate(180deg); }
    100% { filter: hue-rotate(360deg); }
}
`;

const style = document.createElement('style');
style.textContent = rainbowCSS;
document.head.appendChild(style);

// ===== ADVANCED APPLE-INSPIRED FEATURES =====

// Enhanced micro-interactions with sophisticated timing
function initializeAdvancedMicroInteractions() {
    // Enhanced button interactions with Apple-style feedback
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
            this.style.transition = 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            this.style.boxShadow = '0 12px 40px rgba(139, 92, 246, 0.25)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
        
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
            this.style.transition = 'all 0.1s cubic-bezier(0.4, 0, 0.6, 1)';
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
            this.style.transition = 'all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
    });

    // Enhanced card hover effects with sophisticated depth
    document.querySelectorAll('.overview-card, .skill-category, .timeline-content').forEach(card => {
        let isHovering = false;
        
        card.addEventListener('mouseenter', function() {
            isHovering = true;
            this.style.transform = 'translateY(-12px)';
            this.style.boxShadow = '0 25px 50px rgba(139, 92, 246, 0.2)';
            this.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            // Animate internal elements
            const icon = this.querySelector('.card-icon, .category-icon');
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(10deg)';
                icon.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            }
            
            // Stagger animate small elements
            const smallElements = this.querySelectorAll('.mini-tag, .mini-metric, .skill-item');
            smallElements.forEach((el, index) => {
                setTimeout(() => {
                    if (isHovering) {
                        el.style.transform = 'translateY(-2px) scale(1.05)';
                        el.style.transition = 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    }
                }, index * 30);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            isHovering = false;
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
            
            // Reset all internal animations
            const animatedElements = this.querySelectorAll('.card-icon, .category-icon, .mini-tag, .mini-metric, .skill-item');
            animatedElements.forEach(el => {
                el.style.transform = '';
                el.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });
        });
    });

    // Enhanced navigation with subtle feedback
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
            this.style.transition = 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        link.addEventListener('click', function() {
            // Ripple effect on click
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(139, 92, 246, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (rect.width / 2 - size / 2) + 'px';
            ripple.style.top = (rect.height / 2 - size / 2) + 'px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation CSS
    if (!document.querySelector('#ripple-animation')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.id = 'ripple-animation';
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }

    console.log('✨ Advanced micro-interactions initialized');
}

// Floating elements function removed - no longer needed

// Enhanced typing effect with Apple-quality timing
function initializeEnhancedTyping() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroSubtitle) return;

    const phrases = [
        "Transforming Data into Strategic Insights",
        "Building Production ML Solutions", 
        "Driving Organizational Impact",
        "Mastering Stakeholder Excellence"
    ];

    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    // Create separate elements for text and cursor for better control
    const textSpan = document.createElement('span');
    const cursorSpan = document.createElement('span');
    
    cursorSpan.textContent = '|';
    cursorSpan.style.cssText = `
        animation: blink 1s infinite;
        color: var(--vibrant-purple);
        font-weight: 400;
        margin-left: 2px;
    `;

    heroSubtitle.innerHTML = '';
    heroSubtitle.appendChild(textSpan);
    heroSubtitle.appendChild(cursorSpan);

    // Add cursor blink animation
    if (!document.querySelector('#cursor-blink')) {
        const cursorStyle = document.createElement('style');
        cursorStyle.id = 'cursor-blink';
        cursorStyle.textContent = `
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(cursorStyle);
    }

    function typeEffect() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isPaused) {
            setTimeout(typeEffect, 2000);
            isPaused = false;
            return;
        }

        if (!isDeleting && currentCharIndex < currentPhrase.length) {
            textSpan.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            setTimeout(typeEffect, 60 + Math.random() * 40); // Natural typing variation
        } else if (isDeleting && currentCharIndex > 0) {
            textSpan.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            setTimeout(typeEffect, 30 + Math.random() * 20);
        } else if (!isDeleting && currentCharIndex === currentPhrase.length) {
            isPaused = true;
            isDeleting = true;
            setTimeout(typeEffect, 2500);
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            setTimeout(typeEffect, 200);
        }
    }

    // Start typing effect with sophisticated timing
    setTimeout(() => {
        typeEffect();
    }, 2200);

    console.log('⌨️ Enhanced typing system initialized');
} 