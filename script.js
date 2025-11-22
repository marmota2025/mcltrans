// ===================================
// Strict Mode
// ===================================
'use strict';

// ===================================
// DOM Elements
// ===================================
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('.section, .hero');
const langBtn = document.querySelector('.lang-btn');
const langDropdown = document.querySelector('.lang-dropdown');
const langOptions = document.querySelectorAll('.lang-option');
const currentLangSpan = document.querySelector('.current-lang');
const currentFlagSpan = document.querySelector('.current-flag');

// ===================================
// Language Management
// ===================================
let currentLanguage = localStorage.getItem('language') || 'fr';

// Set initial language
document.documentElement.lang = currentLanguage;

// Function to translate page
const translatePage = (lang) => {
    if (!translations[lang]) {
        console.error(`Language ${lang} not found`);
        return;
    }
    
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let translation = translations[lang];
        
        // Navigate through nested object
        for (const k of keys) {
            translation = translation[k];
            if (!translation) {
                console.warn(`Translation not found for key: ${key}`);
                return;
            }
        }
        
        // Update element content
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else {
            element.textContent = translation;
        }
    });
    
    // Update current language display
    const langMap = {
        'fr': 'FR',
        'nl': 'NL',
        'en': 'EN',
        'de': 'DE'
    };
    
    const flagMap = {
        'fr': '🇫🇷',
        'nl': '🇳🇱',
        'en': '🇬🇧',
        'de': '🇩🇪'
    };
    
    currentLangSpan.textContent = langMap[lang];
    if (currentFlagSpan) {
        currentFlagSpan.textContent = flagMap[lang];
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update active language option
    langOptions.forEach(option => {
        if (option.getAttribute('data-lang') === lang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
    
    // Store preference
    localStorage.setItem('language', lang);
    currentLanguage = lang;
};

// Initialize with saved or default language
translatePage(currentLanguage);

// Language selector event listeners
if (langBtn) {
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = langBtn.getAttribute('aria-expanded') === 'true';
        langBtn.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        langBtn.setAttribute('aria-expanded', 'false');
    });
}

if (langOptions) {
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedLang = option.getAttribute('data-lang');
            translatePage(selectedLang);
            langBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

// ===================================
// Navigation - Sticky Header
// ===================================
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow when scrolled
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, { passive: true });

// ===================================
// Mobile Menu Toggle
// ===================================
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (!isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

// ===================================
// Active Navigation Link Highlighting
// ===================================
const observerOptions = {
    root: null,
    rootMargin: '-80px 0px -80% 0px',
    threshold: 0
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// ===================================
// Smooth Scrolling (enhanced)
// ===================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Back to Top Button
// ===================================
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, { passive: true });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Form Validation & Submission
// ===================================
if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const honeypotInput = document.querySelector('input[name="honeypot"]');
    const formStatus = document.getElementById('formStatus');
    
    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    // Sanitize input to prevent XSS
    const sanitizeInput = (input) => {
        const temp = document.createElement('div');
        temp.textContent = input;
        return temp.innerHTML;
    };
    
    // Validate individual field
    const validateField = (input, validationFn, errorKey) => {
        const errorElement = input.parentElement.querySelector('.error-message');
        const errorMessage = translations[currentLanguage].contact.form[errorKey];
        
        if (!validationFn(input.value.trim())) {
            input.classList.add('error');
            errorElement.textContent = errorMessage;
            return false;
        } else {
            input.classList.remove('error');
            errorElement.textContent = '';
            return true;
        }
    };
    
    // Real-time validation
    nameInput.addEventListener('blur', () => {
        validateField(
            nameInput,
            (value) => value.length >= 2,
            'nameError'
        );
    });
    
    emailInput.addEventListener('blur', () => {
        validateField(
            emailInput,
            (value) => emailRegex.test(value),
            'emailError'
        );
    });
    
    messageInput.addEventListener('blur', () => {
        validateField(
            messageInput,
            (value) => value.length >= 10,
            'messageError'
        );
    });
    
    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Check honeypot (spam protection)
        if (honeypotInput && honeypotInput.value !== '') {
            console.log('Spam detected');
            return;
        }
        
        // Validate all fields
        const isNameValid = validateField(
            nameInput,
            (value) => value.length >= 2,
            'nameError'
        );
        
        const isEmailValid = validateField(
            emailInput,
            (value) => emailRegex.test(value),
            'emailError'
        );
        
        const isMessageValid = validateField(
            messageInput,
            (value) => value.length >= 10,
            'messageError'
        );
        
        if (!isNameValid || !isEmailValid || !isMessageValid) {
            formStatus.textContent = translations[currentLanguage].contact.form.validationError;
            formStatus.className = 'error';
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = '';
            }, 5000);
            return;
        }
        
        // Sanitize inputs
        const formData = {
            name: sanitizeInput(nameInput.value.trim()),
            email: sanitizeInput(emailInput.value.trim()),
            message: sanitizeInput(messageInput.value.trim()),
            timestamp: new Date().toISOString()
        };
        
        // Disable submit button
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = translations[currentLanguage].contact.form.sending;
        
        try {
            // In a real application, you would send this to your backend
            // For this demo, we'll simulate a successful submission
            await simulateFormSubmission(formData);
            
            // Show success message
            formStatus.textContent = translations[currentLanguage].contact.form.success;
            formStatus.className = 'success';
            
            // Reset form
            contactForm.reset();
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = '';
            }, 5000);
            
        } catch (error) {
            // Show error message
            formStatus.textContent = translations[currentLanguage].contact.form.error;
            formStatus.className = 'error';
            
            console.error('Form submission error:', error);
            
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = '';
            }, 5000);
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = translations[currentLanguage].contact.form.submit;
        }
    });
    
    // Simulate form submission (replace with actual API call)
    const simulateFormSubmission = (data) => {
        return new Promise((resolve, reject) => {
            console.log('Form data to be sent:', data);
            
            // Simulate network delay
            setTimeout(() => {
                // Simulate 95% success rate
                if (Math.random() > 0.05) {
                    resolve({ success: true, message: 'Email sent successfully' });
                } else {
                    reject(new Error('Network error'));
                }
            }, 1500);
        });
    };
}

// ===================================
// Update Copyright Year
// ===================================
const updateCopyrightYear = () => {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
};

updateCopyrightYear();

// ===================================
// Intersection Observer for Animations
// ===================================
const animateOnScroll = () => {
    const animatedElements = document.querySelectorAll('.service-card, .atout-card, .detail-item');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(element);
    });
};

// Initialize animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
    animateOnScroll();
}

// ===================================
// Performance Optimization - Debounce
// ===================================
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Debounced scroll handler for better performance
const debouncedScrollHandler = debounce(() => {
    // Add any scroll-based logic here if needed
}, 100);

window.addEventListener('scroll', debouncedScrollHandler, { passive: true });

// ===================================
// Security - Prevent XSS in dynamic content
// ===================================
const escapeHtml = (unsafe) => {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

// ===================================
// Accessibility - Keyboard Navigation
// ===================================
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        mobileMenuToggle.focus();
    }
});

// ===================================
// Page Load Performance
// ===================================
window.addEventListener('load', () => {
    // Remove any loading states
    document.body.classList.add('loaded');
    
    // Log performance metrics (for development)
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    }
});

// ===================================
// Service Worker Registration (Progressive Web App)
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you add a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => {
        //         console.log('ServiceWorker registered:', registration);
        //     })
        //     .catch(error => {
        //         console.log('ServiceWorker registration failed:', error);
        //     });
    });
}

// ===================================
// Error Handling
// ===================================
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // You could send this to an error tracking service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // You could send this to an error tracking service
});

// ===================================
// Browser Detection & Warnings
// ===================================
const detectBrowser = () => {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    
    if (ua.indexOf('Firefox') > -1) {
        browser = 'Firefox';
    } else if (ua.indexOf('Chrome') > -1) {
        browser = 'Chrome';
    } else if (ua.indexOf('Safari') > -1) {
        browser = 'Safari';
    } else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1) {
        browser = 'IE';
        // Show warning for old browsers
        console.warn('You are using an outdated browser. Please upgrade for better security and performance.');
    }
    
    return browser;
};

const currentBrowser = detectBrowser();
console.log(`Browser detected: ${currentBrowser}`);

// ===================================
// Export functions for testing (if needed)
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sanitizeInput: escapeHtml,
        debounce
    };
}
