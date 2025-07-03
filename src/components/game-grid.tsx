'use client'

import React from 'react'
import Link from 'next/link'
import { Play, Trophy, Clock, Users } from 'lucide-react'

interface GameInfo {
  id: string
  name: string
  displayName: string
  description: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  icon: string
  playerCount?: string
  avgPlayTime?: string
}

const games: GameInfo[] = [
  {
    id: 'tic-tac-toe',
    name: 'tic-tac-toe',
    displayName: 'Tic Tac Toe',
    description: 'Classic 3x3 grid game with 3D visual effects',
    category: 'Strategy',
    difficulty: 'easy',
    icon: '⭕',
    playerCount: '1-2',
    avgPlayTime: '2 min'
  },
  {
    id: 'snake',
    name: 'snake',
    displayName: 'Snake 3D',
    description: 'Guide the snake to eat food and grow longer',
    category: 'Arcade',
    difficulty: 'medium',
    icon: '🐍',
    playerCount: '1',
    avgPlayTime: '5 min'
  },
  {
    id: 'tetris',
    name: 'tetris',
    displayName: 'Tetris 3D',
    description: 'Stack falling blocks to clear lines',
    category: 'Puzzle',
    difficulty: 'medium',
    icon: '🧩',
    playerCount: '1',
    avgPlayTime: '10 min'
  },
  {
    id: 'breakout',
    name: 'breakout',
    displayName: 'Breakout 3D',
    description: 'Break all bricks with the bouncing ball',
    category: 'Arcade',
    difficulty: 'medium',
    icon: '🧱',
    playerCount: '1',
    avgPlayTime: '8 min'
  },
  {
    id: 'pong',
    name: 'pong',
    displayName: 'Pong 3D',
    description: 'Classic paddle game in stunning 3D',
    category: 'Sports',
    difficulty: 'easy',
    icon: '🏓',
    playerCount: '1-2',
    avgPlayTime: '5 min'
  },
  {
    id: 'space-invaders',
    name: 'space-invaders',
    displayName: 'Space Invaders',
    description: 'Defend Earth from alien invasion',
    category: 'Shooter',
    difficulty: 'medium',
    icon: '👾',
    playerCount: '1',
    avgPlayTime: '15 min'
  },
  {
    id: 'pacman',
    name: 'pacman',
    displayName: 'Pac-Man 3D',
    description: 'Navigate the maze and eat all dots',
    category: 'Arcade',
    difficulty: 'medium',
    icon: '🟡',
    playerCount: '1',
    avgPlayTime: '12 min'
  },
  {
    id: 'frogger',
    name: 'frogger',
    displayName: 'Frogger 3D',
    description: 'Help the frog cross busy roads and rivers',
    category: 'Arcade',
    difficulty: 'hard',
    icon: '🐸',
    playerCount: '1',
    avgPlayTime: '8 min'
  },
  {
    id: 'asteroids',
    name: 'asteroids',
    displayName: 'Asteroids 3D',
    description: 'Destroy asteroids while avoiding collisions',
    category: 'Shooter',
    difficulty: 'hard',
    icon: '☄️',
    playerCount: '1',
    avgPlayTime: '10 min'
  },
  {
    id: 'memory-match',
    name: 'memory-match',
    displayName: 'Memory Match',
    description: 'Find matching pairs of cards',
    category: 'Puzzle',
    difficulty: 'easy',
    icon: '🃏',
    playerCount: '1',
    avgPlayTime: '5 min'
  },
  {
    id: 'simon-says',
    name: 'simon-says',
    displayName: 'Simon Says',
    description: 'Repeat the sequence of colors and sounds',
    category: 'Memory',
    difficulty: 'medium',
    icon: '🎵',
    playerCount: '1',
    avgPlayTime: '3 min'
  },
  {
    id: 'maze-runner',
    name: 'maze-runner',
    displayName: 'Maze Runner',
    description: 'Navigate through complex 3D mazes',
    category: 'Puzzle',
    difficulty: 'hard',
    icon: '🌀',
    playerCount: '1',
    avgPlayTime: '15 min'
  }
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'text-green-400 bg-green-400/10'
    case 'medium': return 'text-yellow-400 bg-yellow-400/10'
    case 'hard': return 'text-red-400 bg-red-400/10'
    default: return 'text-gray-400 bg-gray-400/10'
  }
}

export function GameGrid() {
  return (
    <section id="games" className="py-16">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-game font-bold mb-4 text-neon">
          Choose Your Game
        </h2>
        <p className="text-gray-400 text-lg">
          Experience classic games reimagined in stunning 3D
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((game) => (
          <div key={game.id} className="game-card group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{game.icon}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(game.difficulty)}`}>
                {game.difficulty}
              </span>
            </div>

            <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-primary-400 transition-colors">
              {game.displayName}
            </h3>
            
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {game.description}
            </p>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{game.playerCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{game.avgPlayTime}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Link 
                href={`/game/${game.name}`}
                className="flex-1 bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center space-x-1 group-hover:scale-105"
              >
                <Play className="w-4 h-4" />
                <span>Play</span>
              </Link>
              <Link 
                href={`/leaderboard/${game.name}`}
                className="cyber-border px-3 py-2 rounded-lg hover:border-primary-500/50 transition-all duration-300 flex items-center justify-center"
              >
                <Trophy className="w-4 h-4 text-primary-400" />
              </Link>
            </div>

            <div className="mt-3 text-xs text-gray-600">
              Category: <span className="text-primary-400">{game.category}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Games (Coming Soon) */}
      <div className="mt-12 text-center">
        <div className="glass-effect p-6 rounded-xl max-w-md mx-auto">
          <h3 className="text-lg font-semibold mb-2 text-primary-400">More Games Coming Soon!</h3>
          <p className="text-gray-400 text-sm mb-4">
            We're working on adding more classic games to the collection.
          </p>
          <div className="text-2xl">🚀</div>
        </div>
      </div>
    </section>
  )
}