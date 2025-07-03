'use client'

import React, { createContext, useContext, useState } from 'react'

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

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [currentGame, setCurrentGame] = useState<Game | null>(null)
  const [scores, setScores] = useState<GameScore[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const submitScore = async (gameId: string, score: number, metadata?: any): Promise<boolean> => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameId,
          score,
          ...metadata,
        }),
      })

      if (response.ok) {
        await fetchScores(gameId)
        return true
      }
      return false
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
      const response = await fetch(`/api/scores?gameId=${gameId}&limit=${limit}`)
      if (response.ok) {
        const scoresData = await response.json()
        setScores(scoresData)
      }
    } catch (error) {
      console.error('Failed to fetch scores:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchTopScores = async (limit = 10): Promise<void> => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/scores/top?limit=${limit}`)
      if (response.ok) {
        const scoresData = await response.json()
        setScores(scoresData)
      }
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