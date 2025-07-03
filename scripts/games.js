// ===== GAMES SYSTEM =====

class GameSystem {
    constructor() {
        this.currentGame = null;
        this.games = this.getGamesList();
        this.scores = this.loadScores();
        this.init();
    }

    init() {
        this.populateGamesGrid();
        this.setupEventListeners();
    }

    // Get list of all games
    getGamesList() {
        return [
            {
                id: 'tic-tac-toe',
                name: 'Tic Tac Toe 3D',
                icon: '⭕',
                description: 'Classic 3x3 grid game with stunning 3D visual effects',
                category: 'Strategy',
                difficulty: 'easy',
                isActive: true
            },
            {
                id: 'snake',
                name: 'Snake 3D',
                icon: '🐍',
                description: 'Guide the snake to eat food and grow longer',
                category: 'Arcade',
                difficulty: 'medium',
                isActive: false
            },
            {
                id: 'tetris',
                name: 'Tetris 3D',
                icon: '🧩',
                description: 'Stack falling blocks to clear lines',
                category: 'Puzzle',
                difficulty: 'medium',
                isActive: false
            },
            {
                id: 'breakout',
                name: 'Breakout 3D',
                icon: '🏓',
                description: 'Break all bricks with the bouncing ball',
                category: 'Arcade',
                difficulty: 'medium',
                isActive: false
            },
            {
                id: 'pong',
                name: 'Pong 3D',
                icon: '🏸',
                description: 'Classic paddle game in stunning 3D',
                category: 'Sports',
                difficulty: 'easy',
                isActive: false
            },
            {
                id: 'space-invaders',
                name: 'Space Invaders',
                icon: '🚀',
                description: 'Defend Earth from alien invasion',
                category: 'Shooter',
                difficulty: 'hard',
                isActive: false
            },
            {
                id: 'pacman',
                name: 'Pac-Man 3D',
                icon: '👻',
                description: 'Navigate mazes and eat dots',
                category: 'Arcade',
                difficulty: 'medium',
                isActive: false
            },
            {
                id: 'frogger',
                name: 'Frogger 3D',
                icon: '🐸',
                description: 'Cross busy roads and rivers',
                category: 'Action',
                difficulty: 'hard',
                isActive: false
            },
            {
                id: 'asteroids',
                name: 'Asteroids 3D',
                icon: '☄️',
                description: 'Destroy asteroids in space',
                category: 'Shooter',
                difficulty: 'hard',
                isActive: false
            },
            {
                id: 'memory',
                name: 'Memory Match',
                icon: '🧠',
                description: 'Find matching pairs of cards',
                category: 'Puzzle',
                difficulty: 'easy',
                isActive: false
            },
            {
                id: 'simon',
                name: 'Simon Says',
                icon: '🎵',
                description: 'Repeat color and sound sequences',
                category: 'Memory',
                difficulty: 'medium',
                isActive: false
            },
            {
                id: 'maze',
                name: 'Maze Runner',
                icon: '🌀',
                description: 'Navigate through complex 3D mazes',
                category: 'Adventure',
                difficulty: 'medium',
                isActive: false
            }
        ];
    }

    // Load scores from localStorage
    loadScores() {
        try {
            const scores = localStorage.getItem('retro_games_scores');
            return scores ? JSON.parse(scores) : [];
        } catch (error) {
            console.error('Error loading scores:', error);
            return [];
        }
    }

    // Save scores to localStorage
    saveScores() {
        try {
            localStorage.setItem('retro_games_scores', JSON.stringify(this.scores));
        } catch (error) {
            console.error('Error saving scores:', error);
        }
    }

    // Populate games grid
    populateGamesGrid() {
        const gamesGrid = document.getElementById('gamesGrid');
        if (!gamesGrid) return;

        gamesGrid.innerHTML = '';

        this.games.forEach(game => {
            const gameCard = this.createGameCard(game);
            gamesGrid.appendChild(gameCard);
        });
    }

    // Create game card element
    createGameCard(game) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.onclick = () => this.openGame(game);

        card.innerHTML = `
            <span class="game-icon">${game.icon}</span>
            <h3 class="game-title">${game.name}</h3>
            <p class="game-description">${game.description}</p>
            <div class="game-meta">
                <span class="difficulty-badge difficulty-${game.difficulty}">${game.difficulty}</span>
                <button class="play-button" ${!game.isActive ? 'disabled' : ''}>
                    ${game.isActive ? 'Play Now' : 'Coming Soon'}
                </button>
            </div>
        `;

        return card;
    }

    // Setup event listeners
    setupEventListeners() {
        // Modal close listeners
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeGameModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeGameModal();
            }
        });
    }

    // Open game
    openGame(game) {
        if (!game.isActive) {
            showToast('This game is coming soon! 🚧', 'error');
            return;
        }

        this.currentGame = game;
        this.openGameModal(game);
    }

    // Open game modal
    openGameModal(game) {
        const modal = document.getElementById('gameModal');
        const gameTitle = document.getElementById('gameTitle');
        const gameContainer = document.getElementById('gameContainer');

        if (modal && gameTitle && gameContainer) {
            gameTitle.textContent = game.name;
            gameContainer.innerHTML = '';
            
            // Load game content
            this.loadGameContent(game, gameContainer);
            
            modal.classList.remove('hidden');
        }
    }

    // Close game modal
    closeGameModal() {
        const modal = document.getElementById('gameModal');
        if (modal) {
            modal.classList.add('hidden');
            this.currentGame = null;
        }
    }

    // Load game content
    loadGameContent(game, container) {
        switch (game.id) {
            case 'tic-tac-toe':
                this.loadTicTacToe(container);
                break;
            default:
                container.innerHTML = `
                    <div class="game-container">
                        <div class="game-board">
                            <h3>🚧 Game Coming Soon!</h3>
                            <p>This game is currently in development. Check back soon!</p>
                        </div>
                    </div>
                `;
        }
    }

    // Load Tic Tac Toe game
    loadTicTacToe(container) {
        const ticTacToe = new TicTacToeGame(container, this);
        ticTacToe.init();
    }

    // Submit score
    async submitScore(gameId, score, metadata = {}) {
        try {
            if (!authSystem || !authSystem.isLoggedIn()) {
                showToast('Please log in to save your score!', 'error');
                return false;
            }

            const user = authSystem.getCurrentUser();
            const game = this.games.find(g => g.id === gameId);
            
            if (!game) {
                throw new Error('Game not found');
            }

            const newScore = {
                id: this.generateId(),
                score,
                level: metadata.level,
                time: metadata.time,
                moves: metadata.moves,
                gameData: metadata ? JSON.stringify(metadata) : null,
                userId: user.id,
                gameId: game.id,
                user: {
                    username: user.username,
                    avatar: user.avatar
                },
                game: {
                    displayName: game.name,
                    name: game.id
                },
                createdAt: new Date().toISOString()
            };

            this.scores.push(newScore);
            this.saveScores();

            showToast(`Score ${score} saved! 🎉`, 'success');
            
            // Refresh leaderboard if it's visible
            if (leaderboardSystem) {
                leaderboardSystem.refreshLeaderboard();
            }

            return true;
        } catch (error) {
            console.error('Score submission failed:', error);
            showToast('Failed to save score', 'error');
            return false;
        }
    }

    // Get scores for a specific game
    getGameScores(gameId, limit = 10) {
        return this.scores
            .filter(score => score.game.name === gameId)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }

    // Get top scores across all games
    getTopScores(limit = 10) {
        return this.scores
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

// ===== TIC TAC TOE GAME =====

class TicTacToeGame {
    constructor(container, gameSystem) {
        this.container = container;
        this.gameSystem = gameSystem;
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.score = 0;
        this.moves = 0;
        this.startTime = Date.now();
    }

    init() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <div class="game-container">
                <div class="game-board">
                    <div class="game-info">
                        <div class="game-score">Score: ${this.score}</div>
                        <div class="game-status">${this.getStatusMessage()}</div>
                    </div>
                    
                    <div class="tic-tac-toe-grid">
                        ${this.board.map((cell, index) => `
                            <div class="tic-tac-toe-cell" data-index="${index}">
                                ${cell}
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="game-controls">
                        <button class="reset-button" onclick="this.parentNode.parentNode.parentNode.querySelector('.tic-tac-toe-grid').dispatchEvent(new CustomEvent('reset'))">
                            New Game
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.updateDisplay();
    }

    setupEventListeners() {
        const cells = this.container.querySelectorAll('.tic-tac-toe-cell');
        const grid = this.container.querySelector('.tic-tac-toe-grid');
        
        cells.forEach(cell => {
            cell.addEventListener('click', (e) => this.makeMove(e));
        });

        grid.addEventListener('reset', () => this.resetGame());
    }

    makeMove(e) {
        const index = parseInt(e.target.dataset.index);
        
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }

        this.board[index] = this.currentPlayer;
        this.moves++;
        
        e.target.textContent = this.currentPlayer;
        e.target.classList.add(this.currentPlayer.toLowerCase());

        if (this.checkWinner()) {
            this.gameActive = false;
            this.calculateScore();
            this.updateDisplay();
            
            setTimeout(() => {
                this.submitScore();
            }, 1000);
        } else if (this.board.every(cell => cell !== '')) {
            this.gameActive = false;
            this.updateDisplay();
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateDisplay();
        }
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return this.board[a] && 
                   this.board[a] === this.board[b] && 
                   this.board[a] === this.board[c];
        });
    }

    calculateScore() {
        const timeBonus = Math.max(0, 30 - Math.floor((Date.now() - this.startTime) / 1000));
        const moveBonus = Math.max(0, 15 - this.moves);
        this.score = 100 + (timeBonus * 10) + (moveBonus * 5);
    }

    getStatusMessage() {
        if (!this.gameActive) {
            if (this.checkWinner()) {
                return `🎉 Player ${this.currentPlayer} Wins! Score: ${this.score}`;
            } else {
                return "🤝 It's a Draw!";
            }
        }
        return `Player ${this.currentPlayer}'s Turn`;
    }

    updateDisplay() {
        const scoreEl = this.container.querySelector('.game-score');
        const statusEl = this.container.querySelector('.game-status');
        
        if (scoreEl) scoreEl.textContent = `Score: ${this.score}`;
        if (statusEl) statusEl.textContent = this.getStatusMessage();
    }

    async submitScore() {
        if (this.checkWinner() && this.score > 0) {
            const metadata = {
                moves: this.moves,
                time: Math.floor((Date.now() - this.startTime) / 1000),
                winner: this.currentPlayer
            };
            
            await this.gameSystem.submitScore('tic-tac-toe', this.score, metadata);
        }
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.score = 0;
        this.moves = 0;
        this.startTime = Date.now();
        
        this.render();
    }
}

// Global game system instance
let gameSystem;

// Initialize game system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    gameSystem = new GameSystem();
});

// Global functions for game modal control
function closeGameModal() {
    if (gameSystem) {
        gameSystem.closeGameModal();
    }
}