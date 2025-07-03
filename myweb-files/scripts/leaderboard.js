// ===== LEADERBOARD SYSTEM =====

class LeaderboardSystem {
    constructor() {
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadLeaderboard();
    }

    // Setup event listeners
    setupEventListeners() {
        const gameFilter = document.getElementById('gameFilter');
        const refreshButton = document.getElementById('refreshScores');

        if (gameFilter) {
            gameFilter.addEventListener('change', (e) => {
                this.currentFilter = e.target.value;
                this.loadLeaderboard();
            });
        }

        if (refreshButton) {
            refreshButton.addEventListener('click', () => {
                this.refreshLeaderboard();
            });
        }
    }

    // Load leaderboard data
    loadLeaderboard() {
        if (!gameSystem) return;

        let scores;
        if (this.currentFilter === 'all') {
            scores = gameSystem.getTopScores(20);
        } else {
            scores = gameSystem.getGameScores(this.currentFilter, 20);
        }

        this.renderLeaderboard(scores);
    }

    // Render leaderboard table
    renderLeaderboard(scores) {
        const leaderboardTable = document.getElementById('leaderboardTable');
        if (!leaderboardTable) return;

        if (scores.length === 0) {
            leaderboardTable.innerHTML = `
                <div class="leaderboard-empty">
                    <h3>🎯 No Scores Yet!</h3>
                    <p>Be the first to play and set a high score!</p>
                </div>
            `;
            return;
        }

        const tableHTML = `
            <div class="leaderboard-header">
                <div>Rank</div>
                <div>Player</div>
                <div>Game</div>
                <div>Score</div>
                <div class="created-at">Date</div>
            </div>
            ${scores.map((score, index) => this.renderLeaderboardRow(score, index + 1)).join('')}
        `;

        leaderboardTable.innerHTML = tableHTML;
    }

    // Render individual leaderboard row
    renderLeaderboardRow(score, rank) {
        const rankClass = this.getRankClass(rank);
        const date = new Date(score.createdAt).toLocaleDateString();
        
        return `
            <div class="leaderboard-row">
                <div class="leaderboard-rank ${rankClass}">${this.getRankDisplay(rank)}</div>
                <div class="leaderboard-player">
                    <div class="player-info">
                        <span class="player-name">${score.user.username}</span>
                        ${score.moves ? `<span class="player-stats">${score.moves} moves</span>` : ''}
                    </div>
                </div>
                <div class="leaderboard-game">${score.game.displayName}</div>
                <div class="leaderboard-score">${score.score.toLocaleString()}</div>
                <div class="leaderboard-date created-at">${date}</div>
            </div>
        `;
    }

    // Get rank class for styling
    getRankClass(rank) {
        if (rank === 1) return 'rank-1';
        if (rank === 2) return 'rank-2';
        if (rank === 3) return 'rank-3';
        return '';
    }

    // Get rank display (with medals for top 3)
    getRankDisplay(rank) {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return `#${rank}`;
    }

    // Refresh leaderboard
    refreshLeaderboard() {
        showToast('Refreshing leaderboard...', 'success');
        this.loadLeaderboard();
    }

    // Get user's best scores
    getUserBestScores(userId) {
        if (!gameSystem) return [];

        const userScores = gameSystem.scores.filter(score => score.userId === userId);
        const bestScores = [];
        
        // Get best score for each game
        const gameIds = [...new Set(userScores.map(score => score.game.name))];
        
        gameIds.forEach(gameId => {
            const gameScores = userScores
                .filter(score => score.game.name === gameId)
                .sort((a, b) => b.score - a.score);
            
            if (gameScores.length > 0) {
                bestScores.push(gameScores[0]);
            }
        });

        return bestScores.sort((a, b) => b.score - a.score);
    }

    // Get user's rank for a specific game
    getUserRank(userId, gameId) {
        if (!gameSystem) return null;

        const gameScores = gameSystem.getGameScores(gameId, 1000);
        const userBestScore = gameScores.find(score => score.userId === userId);
        
        if (!userBestScore) return null;

        return gameScores.findIndex(score => score.id === userBestScore.id) + 1;
    }

    // Get overall user rank
    getUserOverallRank(userId) {
        if (!gameSystem) return null;

        const allScores = gameSystem.getTopScores(1000);
        const userBestScore = allScores.find(score => score.userId === userId);
        
        if (!userBestScore) return null;

        return allScores.findIndex(score => score.id === userBestScore.id) + 1;
    }

    // Generate user stats summary
    generateUserStats(userId) {
        if (!gameSystem) return null;

        const userScores = gameSystem.scores.filter(score => score.userId === userId);
        
        if (userScores.length === 0) {
            return {
                totalGames: 0,
                totalScore: 0,
                averageScore: 0,
                bestScore: 0,
                gamesPlayed: 0,
                overallRank: null
            };
        }

        const totalScore = userScores.reduce((sum, score) => sum + score.score, 0);
        const bestScore = Math.max(...userScores.map(score => score.score));
        const gamesPlayed = new Set(userScores.map(score => score.game.name)).size;
        
        return {
            totalGames: userScores.length,
            totalScore,
            averageScore: Math.round(totalScore / userScores.length),
            bestScore,
            gamesPlayed,
            overallRank: this.getUserOverallRank(userId)
        };
    }

    // Add sample data (for demonstration)
    addSampleData() {
        if (!gameSystem || gameSystem.scores.length > 0) return;

        const sampleScores = [
            {
                id: 'sample1',
                score: 250,
                moves: 5,
                time: 15,
                gameData: '{"winner":"X","moves":5}',
                userId: 'sample-user-1',
                gameId: 'tic-tac-toe',
                user: { username: 'ProGamer', avatar: null },
                game: { displayName: 'Tic Tac Toe 3D', name: 'tic-tac-toe' },
                createdAt: new Date(Date.now() - 86400000).toISOString()
            },
            {
                id: 'sample2',
                score: 180,
                moves: 7,
                time: 25,
                gameData: '{"winner":"O","moves":7}',
                userId: 'sample-user-2',
                gameId: 'tic-tac-toe',
                user: { username: 'GameMaster', avatar: null },
                game: { displayName: 'Tic Tac Toe 3D', name: 'tic-tac-toe' },
                createdAt: new Date(Date.now() - 172800000).toISOString()
            },
            {
                id: 'sample3',
                score: 150,
                moves: 9,
                time: 35,
                gameData: '{"winner":"X","moves":9}',
                userId: 'sample-user-3',
                gameId: 'tic-tac-toe',
                user: { username: 'RetroFan', avatar: null },
                game: { displayName: 'Tic Tac Toe 3D', name: 'tic-tac-toe' },
                createdAt: new Date(Date.now() - 259200000).toISOString()
            },
            {
                id: 'sample4',
                score: 200,
                moves: 6,
                time: 20,
                gameData: '{"winner":"O","moves":6}',
                userId: 'sample-user-4',
                gameId: 'tic-tac-toe',
                user: { username: 'ArcadeKing', avatar: null },
                game: { displayName: 'Tic Tac Toe 3D', name: 'tic-tac-toe' },
                createdAt: new Date(Date.now() - 345600000).toISOString()
            },
            {
                id: 'sample5',
                score: 120,
                moves: 11,
                time: 45,
                gameData: '{"winner":"X","moves":11}',
                userId: 'sample-user-5',
                gameId: 'tic-tac-toe',
                user: { username: 'PixelHero', avatar: null },
                game: { displayName: 'Tic Tac Toe 3D', name: 'tic-tac-toe' },
                createdAt: new Date(Date.now() - 432000000).toISOString()
            }
        ];

        gameSystem.scores.push(...sampleScores);
        gameSystem.saveScores();
        this.loadLeaderboard();
        
        showToast('Sample leaderboard data loaded! 🎮', 'success');
    }

    // Clear all scores (for testing)
    clearAllScores() {
        if (!gameSystem) return;
        
        if (confirm('Are you sure you want to clear all scores? This cannot be undone.')) {
            gameSystem.scores = [];
            gameSystem.saveScores();
            this.loadLeaderboard();
            showToast('All scores cleared!', 'success');
        }
    }

    // Export scores as JSON
    exportScores() {
        if (!gameSystem) return;

        const data = {
            exportDate: new Date().toISOString(),
            totalScores: gameSystem.scores.length,
            scores: gameSystem.scores
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `retro-games-scores-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showToast('Scores exported successfully!', 'success');
    }
}

// Global leaderboard instance
let leaderboardSystem;

// Initialize leaderboard system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for game system to be ready
    setTimeout(() => {
        leaderboardSystem = new LeaderboardSystem();
        
        // Add sample data if no scores exist
        if (gameSystem && gameSystem.scores.length === 0) {
            leaderboardSystem.addSampleData();
        }
    }, 100);
});

// Global functions for leaderboard controls
function refreshLeaderboard() {
    if (leaderboardSystem) {
        leaderboardSystem.refreshLeaderboard();
    }
}

function clearAllScores() {
    if (leaderboardSystem) {
        leaderboardSystem.clearAllScores();
    }
}

function exportScores() {
    if (leaderboardSystem) {
        leaderboardSystem.exportScores();
    }
}