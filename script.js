/**
 * Portfolio JavaScript - Enhanced with accessibility and modern features
 * Author: Mounis Karim Elghali
 * 
 * This file contains interactive functionality for the personal portfolio website,
 * including navigation menu toggle, project information display, and accessibility features.
 */

// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

/**
 * Initialize portfolio functionality
 */
function initializePortfolio() {
    setupNavigationListeners();
    setupSmoothScrolling();
    setupKeyboardNavigation();
    setupIntersectionObserver();
}

/**
 * Toggle project information visibility
 * @param {string} id - The ID of the project description element
 */
function toggleProjectInfo(id) {
    const descriptionElement = document.getElementById(id);
    const button = document.querySelector(`[aria-controls="${id}"]`);
    
    if (!descriptionElement || !button) {
        console.warn(`Element with ID "${id}" or corresponding button not found`);
        return;
    }
    
    const isHidden = descriptionElement.classList.contains('hidden');
    
    // Toggle visibility
    if (isHidden) {
        descriptionElement.classList.remove('hidden');
        button.setAttribute('aria-expanded', 'true');
        button.textContent = 'Hide info';
        
        // Smooth reveal animation
        descriptionElement.style.opacity = '0';
        descriptionElement.style.transform = 'translateY(-10px)';
        
        requestAnimationFrame(() => {
            descriptionElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            descriptionElement.style.opacity = '1';
            descriptionElement.style.transform = 'translateY(0)';
        });
    } else {
        // Smooth hide animation
        descriptionElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        descriptionElement.style.opacity = '0';
        descriptionElement.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            descriptionElement.classList.add('hidden');
            button.setAttribute('aria-expanded', 'false');
            button.textContent = 'View info';
        }, 300);
    }
}

/**
 * Toggle navigation menu visibility (mobile)
 */
function toggleNavbar() {
    const navbarList = document.getElementById('navbar-list');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (!navbarList || !navToggle) {
        console.warn('Navigation elements not found');
        return;
    }
    
    const isActive = navbarList.classList.contains('active');
    
    // Toggle menu visibility
    navbarList.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Update ARIA attributes
    navToggle.setAttribute('aria-expanded', !isActive);
    
    // Add animation classes
    if (!isActive) {
        navbarList.style.animation = 'slideDown 0.3s ease-out';
    }
    
    // Handle body scroll lock on mobile menu open
    if (window.innerWidth <= 600) {
        document.body.style.overflow = !isActive ? 'hidden' : 'auto';
    }
}

/**
 * Setup navigation event listeners
 */
function setupNavigationListeners() {
    const navToggle = document.querySelector('.nav-toggle');
    const navbarLinks = document.querySelectorAll('.navbar-list a');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleNavbar);
    }
    
    // Close mobile menu when clicking on navigation links
    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 600) {
                const navbarList = document.getElementById('navbar-list');
                const navToggle = document.querySelector('.nav-toggle');
                
                if (navbarList.classList.contains('active')) {
                    toggleNavbar();
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        const navbarList = document.getElementById('navbar-list');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navbarList && navbarList.classList.contains('active')) {
            if (!navbarList.contains(event.target) && !navToggle.contains(event.target)) {
                toggleNavbar();
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const navbarList = document.getElementById('navbar-list');
        
        // Reset mobile menu state on resize
        if (window.innerWidth > 600 && navbarList.classList.contains('active')) {
            navbarList.classList.remove('active');
            document.querySelector('.nav-toggle').classList.remove('active');
            document.querySelector('.nav-toggle').setAttribute('aria-expanded', 'false');
            document.body.style.overflow = 'auto';
        }
    });
}

/**
 * Setup smooth scrolling for navigation links
 */
function setupSmoothScrolling() {
    const navbarLinks = document.querySelectorAll('.navbar-list a[href^="#"]');
    
    navbarLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update focus for accessibility
                targetElement.focus({ preventScroll: true });
            }
        });
    });
}

/**
 * Setup keyboard navigation enhancements
 */
function setupKeyboardNavigation() {
    // Escape key to close mobile menu
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const navbarList = document.getElementById('navbar-list');
            
            if (navbarList && navbarList.classList.contains('active')) {
                toggleNavbar();
                document.querySelector('.nav-toggle').focus();
            }
        }
    });
    
    // Arrow key navigation in mobile menu
    const navbarLinks = document.querySelectorAll('.navbar-list a');
    
    navbarLinks.forEach((link, index) => {
        link.addEventListener('keydown', (event) => {
            if (window.innerWidth <= 600) {
                if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    const nextIndex = (index + 1) % navbarLinks.length;
                    navbarLinks[nextIndex].focus();
                } else if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    const prevIndex = (index - 1 + navbarLinks.length) % navbarLinks.length;
                    navbarLinks[prevIndex].focus();
                }
            }
        });
    });
}

/**
 * Setup intersection observer for animations
 */
function setupIntersectionObserver() {
    // Only run animations if user hasn't requested reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section, .project-card');
    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Utility function to debounce events
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute immediately
 * @returns {Function} Debounced function
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(this, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
    };
}

// Global error handler for graceful degradation
window.addEventListener('error', (event) => {
    console.error('Portfolio JavaScript Error:', event.error);
    // Ensure basic functionality still works even if enhanced features fail
});

// Export functions for potential testing or external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleProjectInfo,
        toggleNavbar,
        initializePortfolio
    };
}
