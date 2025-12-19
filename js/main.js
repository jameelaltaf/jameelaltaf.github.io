/* =====================================================
   JAMEEL WANI - MAIN JAVASCRIPT
   Multi-page Portfolio
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initTheme();
    initCursor();
    initNavigation();
    initLiveTime();
    initTextScramble();
    initAnimations();
});

/* =====================================================
   LOADER
   ===================================================== */
function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    
    // Only show loader on home page
    if (!document.body.classList.contains('page-home')) {
        loader.classList.add('hidden');
        document.body.classList.add('loaded');
        return;
    }
    
    const hideLoader = () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.add('loaded');
        }, 2800);
    };
    
    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }
    
    // Fallback
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.add('loaded');
    }, 4000);
}

/* =====================================================
   THEME TOGGLE
   ===================================================== */
function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else {
        html.setAttribute('data-theme', 'dark');
    }
    
    if (!toggle) return;
    
    toggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

/* =====================================================
   CUSTOM CURSOR
   ===================================================== */
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;
    if (!window.matchMedia('(hover: hover)').matches) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animate);
    }
    animate();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-item, .cta-btn');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
    });
}

/* =====================================================
   NAVIGATION
   ===================================================== */
function initNavigation() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');
    
    // Scroll behavior
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Mobile toggle
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
        });
        
        links.forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

/* =====================================================
   LIVE TIME
   ===================================================== */
function initLiveTime() {
    const timeEl = document.getElementById('live-time');
    if (!timeEl) return;
    
    function updateTime() {
        const now = new Date();
        const options = {
            timeZone: 'Asia/Dubai',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        timeEl.textContent = now.toLocaleTimeString('en-US', options);
    }
    
    updateTime();
    setInterval(updateTime, 1000);
}

/* =====================================================
   TEXT SCRAMBLE EFFECT
   ===================================================== */
class TextScrambler {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.originalText = el.getAttribute('data-value') || el.textContent;
        this.isAnimating = false;
    }
    
    scramble() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        const length = this.originalText.length;
        let iteration = 0;
        const maxIterations = length * 3;
        
        const interval = setInterval(() => {
            this.el.textContent = this.originalText
                .split('')
                .map((char, index) => {
                    if (index < iteration / 3) {
                        return this.originalText[index];
                    }
                    if (char === ' ') return ' ';
                    return this.chars[Math.floor(Math.random() * this.chars.length)];
                })
                .join('');
            
            iteration++;
            
            if (iteration >= maxIterations) {
                clearInterval(interval);
                this.el.textContent = this.originalText;
                this.isAnimating = false;
            }
        }, 30);
    }
}

function initTextScramble() {
    const elements = document.querySelectorAll('.name-text, .project-title, .title-main');
    
    elements.forEach(el => {
        const scrambler = new TextScrambler(el);
        el.addEventListener('mouseenter', () => scrambler.scramble());
    });
}

/* =====================================================
   ANIMATIONS
   ===================================================== */
function initAnimations() {
    // Skip if GSAP not loaded
    if (typeof gsap === 'undefined') return;
    
    // Register ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Animate elements on page load
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Hero animations (home page)
    if (document.body.classList.contains('page-home')) {
        tl.from('.hero-badge', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power3.out',
            delay: 2.5
        })
        .from('.name-text', {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.15
        }, '-=0.4')
        .from('.hero-tagline span', {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.1
        }, '-=0.6')
        .from('.hero-footer', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.3');
    }
    
    // Page section animations
    if (document.querySelector('.page-section')) {
        gsap.from('.page-header', {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: 'power3.out',
            delay: 0.3
        });
        
        gsap.from('.project-item', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.5
        });
        
        gsap.from('.info-main, .info-section, .contact-grid', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            delay: 0.5
        });
    }
}
