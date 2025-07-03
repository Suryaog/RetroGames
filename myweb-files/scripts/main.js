// ===== MAIN APPLICATION =====

class MainApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupParticles();
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupEventListeners();
    }

    // Setup particle animation
    setupParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        // Clear existing particles
        particlesContainer.innerHTML = '';

        // Create particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random positioning and animation
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            particle.style.animationDuration = (3 + Math.random() * 4) + 's';
            
            particlesContainer.appendChild(particle);
        }

        // Regenerate particles periodically
        setInterval(() => {
            this.regenerateParticles(particlesContainer);
        }, 10000);
    }

    // Regenerate particles for continuous effect
    regenerateParticles(container) {
        const particles = container.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            setTimeout(() => {
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 3 + 's';
            }, index * 100);
        });
    }

    // Setup smooth navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                this.scrollToSection(targetId);
            });
        });
    }

    // Setup scroll effects
    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            this.updateScrollIndicator();
            this.updateNavbarAppearance();
        });
    }

    // Setup general event listeners
    setupEventListeners() {
        // Close modals on outside click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeAllModals();
            }
        });

        // Close modals on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // Prevent body scroll when modal is open
        const observer = new MutationObserver((mutations) => {
            const hasOpenModal = document.querySelector('.modal:not(.hidden)');
            document.body.style.overflow = hasOpenModal ? 'hidden' : 'auto';
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });
    }

    // Smooth scroll to section
    scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Update scroll indicator visibility
    updateScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            const scrolled = window.scrollY > 100;
            scrollIndicator.style.opacity = scrolled ? '0' : '1';
        }
    }

    // Update navbar appearance based on scroll
    updateNavbarAppearance() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const scrolled = window.scrollY > 50;
            navbar.style.background = scrolled 
                ? 'rgba(10, 10, 10, 0.98)' 
                : 'rgba(10, 10, 10, 0.95)';
        }
    }

    // Close all open modals
    closeAllModals() {
        const modals = document.querySelectorAll('.modal:not(.hidden)');
        modals.forEach(modal => {
            modal.classList.add('hidden');
        });
    }

    // Create loading spinner
    createLoadingSpinner() {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        spinner.innerHTML = `
            <div class="spinner-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        `;
        return spinner;
    }

    // Show loading state
    showLoading(element, message = 'Loading...') {
        if (!element) return;
        
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-state';
        loadingDiv.innerHTML = `
            <div class="loading-content">
                ${this.createLoadingSpinner().outerHTML}
                <p>${message}</p>
            </div>
        `;
        
        element.appendChild(loadingDiv);
        return loadingDiv;
    }

    // Hide loading state
    hideLoading(element) {
        if (!element) return;
        
        const loadingState = element.querySelector('.loading-state');
        if (loadingState) {
            loadingState.remove();
        }
    }

    // Format date for display
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        
        return date.toLocaleDateString();
    }

    // Format score for display
    formatScore(score) {
        if (score >= 1000000) {
            return (score / 1000000).toFixed(1) + 'M';
        } else if (score >= 1000) {
            return (score / 1000).toFixed(1) + 'K';
        }
        return score.toLocaleString();
    }

    // Generate random ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// ===== TOAST NOTIFICATION SYSTEM =====

class ToastSystem {
    constructor() {
        this.container = document.getElementById('toastContainer');
        this.toasts = [];
    }

    show(message, type = 'success', duration = 3000) {
        const toast = this.createToast(message, type);
        this.container.appendChild(toast);
        this.toasts.push(toast);

        // Trigger slide-in animation
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 10);

        // Auto-remove after duration
        setTimeout(() => {
            this.remove(toast);
        }, duration);

        return toast;
    }

    createToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = this.getIcon(type);
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-message">${message}</span>
        `;

        return toast;
    }

    getIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    remove(toast) {
        if (!toast || !toast.parentNode) return;

        toast.classList.add('removing');
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
            
            const index = this.toasts.indexOf(toast);
            if (index > -1) {
                this.toasts.splice(index, 1);
            }
        }, 300);
    }

    clear() {
        this.toasts.forEach(toast => this.remove(toast));
    }
}

// ===== GLOBAL UTILITY FUNCTIONS =====

// Scroll to specific sections
function scrollToGames() {
    const gamesSection = document.getElementById('games');
    if (gamesSection) {
        gamesSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToLeaderboard() {
    const leaderboardSection = document.getElementById('leaderboard');
    if (leaderboardSection) {
        leaderboardSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToHome() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Global toast instance
let toastSystem;

// Global toast function
function showToast(message, type = 'success', duration = 3000) {
    if (toastSystem) {
        return toastSystem.show(message, type, duration);
    }
}

// Copy to clipboard utility
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard!', 'success');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('Copied to clipboard!', 'success');
    } catch (err) {
        showToast('Failed to copy to clipboard', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Check if device is mobile
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Get device type
function getDeviceType() {
    if (isMobile()) return 'mobile';
    if (window.innerWidth <= 768) return 'tablet';
    return 'desktop';
}

// Performance monitoring
function measurePerformance(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
}

// Local storage helpers
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
        return false;
    }
}

function loadFromStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error('Failed to load from localStorage:', error);
        return defaultValue;
    }
}

// Initialize main application
let mainApp;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize main app
    mainApp = new MainApp();
    
    // Initialize toast system
    toastSystem = new ToastSystem();
    
    // Add device type class to body
    document.body.classList.add(`device-${getDeviceType()}`);
    
    // Welcome message
    setTimeout(() => {
        showToast('Welcome to Retro Games 3D! 🎮✨', 'success', 4000);
    }, 1000);
    
    console.log('🎮 Retro Games 3D initialized successfully!');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden - pause animations if needed
        document.body.classList.add('page-hidden');
    } else {
        // Page is visible - resume animations
        document.body.classList.remove('page-hidden');
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    showToast('You\'re back online! 🌐', 'success');
});

window.addEventListener('offline', () => {
    showToast('You\'re offline - but games still work! 📱', 'warning');
});

// Handle errors gracefully
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    showToast('Something went wrong. Please refresh the page.', 'error');
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});