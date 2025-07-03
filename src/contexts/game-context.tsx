'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface GameScore {
  id: string
  score: number
  level?: number
  time?: number
  moves?: number
  gameData?: string
  userId: string
  gameId: string
  user: {
    username: string
    avatar?: string
  }
  game: {
    displayName: string
    name: string
  }
  createdAt: string
}

interface Game {
  id: string
  name: string
  displayName: string
  description?: string
  category: string
  difficulty: string
  isActive: boolean
}

interface GameContextType {
  currentGame: Game | null
  scores: GameScore[]
  isLoading: boolean
  setCurrentGame: (game: Game | null) => void
  submitScore: (gameId: string, score: number, metadata?: any) => Promise<boolean>
  fetchScores: (gameId: string, limit?: number) => Promise<void>
  fetchTopScores: (limit?: number) => Promise<void>
}

const GameContext = createContext<GameContextType | undefined>(undefined)

// Local storage keys
const SCORES_KEY = 'retro_games_scores'
const GAMES_KEY = 'retro_games_games'

// Initialize default games
const defaultGames: Game[] = [
  {
    id: '1',
    name: 'tic-tac-toe',
    displayName: 'Tic Tac Toe',
    description: 'Classic 3x3 grid game with 3D visual effects',
    category: 'Strategy',
    difficulty: 'easy',
    isActive: true,
  },
  {
    id: '2',
    name: 'snake',
    displayName: 'Snake 3D',
    description: 'Guide the snake to eat food and grow longer',
    category: 'Arcade',
    difficulty: 'medium',
    isActive: true,
  },
  {
    id: '3',
    name: 'tetris',
    displayName: 'Tetris 3D',
    description: 'Stack falling blocks to clear lines',
    category: 'Puzzle',
    difficulty: 'medium',
    isActive: true,
  },
  {
    id: '4',
    name: 'breakout',
    displayName: 'Breakout 3D',
    description: 'Break all bricks with the bouncing ball',
    category: 'Arcade',
    difficulty: 'medium',
    isActive: true,
  },
  {
    id: '5',
    name: 'pong',
    displayName: 'Pong 3D',
    description: 'Classic paddle game in stunning 3D',
    category: 'Sports',
    difficulty: 'easy',
    isActive: true,
  },
]

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [currentGame, setCurrentGame] = useState<Game | null>(null)
  const [scores, setScores] = useState<GameScore[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Initialize default games on first load
  useEffect(() => {
    const existingGames = localStorage.getItem(GAMES_KEY)
    if (!existingGames) {
      localStorage.setItem(GAMES_KEY, JSON.stringify(defaultGames))
    }
  }, [])

  const getScoresFromStorage = (): GameScore[] => {
    try {
      const scores = localStorage.getItem(SCORES_KEY)
      return scores ? JSON.parse(scores) : []
    } catch {
      return []
    }
  }

  const saveScoresToStorage = (scores: GameScore[]) => {
    try {
      localStorage.setItem(SCORES_KEY, JSON.stringify(scores))
    } catch (error) {
      console.error('Failed to save scores:', error)
    }
  }

  const getGamesFromStorage = (): Game[] => {
    try {
      const games = localStorage.getItem(GAMES_KEY)
      return games ? JSON.parse(games) : defaultGames
    } catch {
      return defaultGames
    }
  }

  const submitScore = async (gameId: string, score: number, metadata?: any): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      // Get current user from localStorage
      const currentUserId = localStorage.getItem('retro_games_current_user')
      if (!currentUserId) {
        return false
      }

      const users = JSON.parse(localStorage.getItem('retro_games_users') || '[]')
      const user = users.find((u: any) => u.id === currentUserId)
      if (!user) {
        return false
      }

      const games = getGamesFromStorage()
      const game = games.find(g => g.name === gameId)
      if (!game) {
        return false
      }

      const newScore: GameScore = {
        id: uuidv4(),
        score,
        level: metadata?.level,
        time: metadata?.time,
        moves: metadata?.moves,
        gameData: metadata ? JSON.stringify(metadata) : undefined,
        userId: user.id,
        gameId: game.id,
        user: {
          username: user.username,
          avatar: user.avatar,
        },
        game: {
          displayName: game.displayName,
          name: game.name,
        },
        createdAt: new Date().toISOString(),
      }

      const currentScores = getScoresFromStorage()
      currentScores.push(newScore)
      saveScoresToStorage(currentScores)

      await fetchScores(gameId)
      return true
    } catch (error) {
      console.error('Score submission failed:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const fetchScores = async (gameId: string, limit = 10): Promise<void> => {
    try {
      setIsLoading(true)
      const allScores = getScoresFromStorage()
      const gameScores = allScores
        .filter(score => score.game.name === gameId)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
      
      setScores(gameScores)
    } catch (error) {
      console.error('Failed to fetch scores:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchTopScores = async (limit = 10): Promise<void> => {
    try {
      setIsLoading(true)
      const allScores = getScoresFromStorage()
      const topScores = allScores
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
      
      setScores(topScores)
    } catch (error) {
      console.error('Failed to fetch top scores:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <GameContext.Provider
      value={{
        currentGame,
        scores,
        isLoading,
        setCurrentGame,
        submitScore,
        fetchScores,
        fetchTopScores,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}