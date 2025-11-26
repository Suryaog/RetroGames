// ===== AUTHENTICATION SYSTEM =====

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = this.loadUsers();
        this.init();
    }

    init() {
        this.checkAuthStatus();
        this.setupEventListeners();
    }

    // Load users from localStorage
    loadUsers() {
        try {
            const users = localStorage.getItem('retro_games_users');
            return users ? JSON.parse(users) : [];
        } catch (error) {
            console.error('Error loading users:', error);
            return [];
        }
    }

    // Save users to localStorage
    saveUsers() {
        try {
            localStorage.setItem('retro_games_users', JSON.stringify(this.users));
        } catch (error) {
            console.error('Error saving users:', error);
        }
    }

    // Check if user is already logged in
    checkAuthStatus() {
        try {
            const currentUserId = localStorage.getItem('retro_games_current_user');
            if (currentUserId) {
                const user = this.users.find(u => u.id === currentUserId);
                if (user) {
                    this.currentUser = {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        avatar: user.avatar,
                        createdAt: user.createdAt
                    };
                    this.updateUI();
                } else {
                    localStorage.removeItem('retro_games_current_user');
                }
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        }
    }

    // Setup event listeners
    setupEventListeners() {
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const authForm = document.getElementById('authForm');

        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.openLoginModal());
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        if (authForm) {
            authForm.addEventListener('submit', (e) => this.handleAuthSubmit(e));
        }
    }

    // Open login modal
    openLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    // Close login modal
    closeLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.add('hidden');
            this.clearAuthForm();
        }
    }

    // Switch between login and register tabs
    switchTab(tab) {
        const loginTab = document.getElementById('loginTab');
        const registerTab = document.getElementById('registerTab');
        const usernameGroup = document.getElementById('usernameGroup');
        const authButtonText = document.getElementById('authButtonText');

        if (tab === 'register') {
            loginTab.classList.remove('active');
            registerTab.classList.add('active');
            usernameGroup.style.display = 'block';
            authButtonText.textContent = 'Register';
            document.getElementById('username').required = true;
        } else {
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            usernameGroup.style.display = 'none';
            authButtonText.textContent = 'Login';
            document.getElementById('username').required = false;
        }
        this.clearAuthMessage();
    }

    // Handle auth form submission
    async handleAuthSubmit(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const username = document.getElementById('username').value;
        const isRegister = document.getElementById('registerTab').classList.contains('active');

        if (isRegister) {
            await this.register(email, username, password);
        } else {
            await this.login(email, password);
        }
    }

    // Register new user
    async register(email, username, password) {
        try {
            // Validate input
            if (!email || !username || !password) {
                this.showAuthMessage('Please fill in all fields', 'error');
                return;
            }

            if (password.length < 6) {
                this.showAuthMessage('Password must be at least 6 characters', 'error');
                return;
            }

            // Check if user already exists
            const existingUser = this.users.find(u => u.email === email || u.username === username);
            if (existingUser) {
                this.showAuthMessage('User with this email or username already exists', 'error');
                return;
            }

            // Create new user
            const newUser = {
                id: this.generateId(),
                email,
                username,
                password: this.hashPassword(password),
                avatar: null,
                createdAt: new Date().toISOString()
            };

            this.users.push(newUser);
            this.saveUsers();

            // Log in the new user
            this.currentUser = {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username,
                avatar: newUser.avatar,
                createdAt: newUser.createdAt
            };

            localStorage.setItem('retro_games_current_user', newUser.id);
            this.showAuthMessage('Registration successful!', 'success');
            
            setTimeout(() => {
                this.closeLoginModal();
                this.updateUI();
                showToast('Welcome to Retro Games 3D! 🎮', 'success');
            }, 1000);

        } catch (error) {
            console.error('Registration failed:', error);
            this.showAuthMessage('Registration failed. Please try again.', 'error');
        }
    }

    // Login user
    async login(email, password) {
        try {
            if (!email || !password) {
                this.showAuthMessage('Please fill in all fields', 'error');
                return;
            }

            const user = this.users.find(u => u.email === email && u.password === this.hashPassword(password));
            
            if (user) {
                this.currentUser = {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    avatar: user.avatar,
                    createdAt: user.createdAt
                };

                localStorage.setItem('retro_games_current_user', user.id);
                this.showAuthMessage('Login successful!', 'success');
                
                setTimeout(() => {
                    this.closeLoginModal();
                    this.updateUI();
                    showToast(`Welcome back, ${user.username}! 🎮`, 'success');
                }, 1000);
            } else {
                this.showAuthMessage('Invalid email or password', 'error');
            }

        } catch (error) {
            console.error('Login failed:', error);
            this.showAuthMessage('Login failed. Please try again.', 'error');
        }
    }

    // Logout user
    logout() {
        try {
            localStorage.removeItem('retro_games_current_user');
            this.currentUser = null;
            this.updateUI();
            showToast('Successfully logged out', 'success');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    // Update UI based on auth status
    updateUI() {
        const loginBtn = document.getElementById('loginBtn');
        const userMenu = document.getElementById('userMenu');
        const userName = document.getElementById('userName');

        if (this.currentUser) {
            if (loginBtn) loginBtn.classList.add('hidden');
            if (userMenu) userMenu.classList.remove('hidden');
            if (userName) userName.textContent = this.currentUser.username;
        } else {
            if (loginBtn) loginBtn.classList.remove('hidden');
            if (userMenu) userMenu.classList.add('hidden');
        }
    }

    // Clear auth form
    clearAuthForm() {
        const form = document.getElementById('authForm');
        if (form) {
            form.reset();
        }
        this.clearAuthMessage();
    }

    // Show auth message
    showAuthMessage(message, type) {
        const messageEl = document.getElementById('authMessage');
        if (messageEl) {
            messageEl.textContent = message;
            messageEl.className = `auth-message ${type}`;
        }
    }

    // Clear auth message
    clearAuthMessage() {
        const messageEl = document.getElementById('authMessage');
        if (messageEl) {
            messageEl.textContent = '';
            messageEl.className = 'auth-message';
        }
    }

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Simple password hashing (for demo purposes)
    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString();
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }
}

// Global auth instance
let authSystem;

// Initialize auth system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    authSystem = new AuthSystem();
});

// Global functions for modal control
function openLoginModal() {
    if (authSystem) {
        authSystem.openLoginModal();
    }
}

function closeLoginModal() {
    if (authSystem) {
        authSystem.closeLoginModal();
    }
}

function switchTab(tab) {
    if (authSystem) {
        authSystem.switchTab(tab);
    }
}