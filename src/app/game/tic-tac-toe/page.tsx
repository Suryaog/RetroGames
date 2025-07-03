'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { useGame } from '@/contexts/game-context'
import { useAuth } from '@/contexts/auth-context'
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react'
import toast from 'react-hot-toast'

type Player = 'X' | 'O' | null
type Board = Player[]

const TicTacToePage = () => {
  const { submitScore } = useGame()
  const { user } = useAuth()
  const [board, setBoard] = useState<Board>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X')
  const [winner, setWinner] = useState<Player | 'tie' | null>(null)
  const [score, setScore] = useState({ X: 0, O: 0, ties: 0 })
  const [gameCount, setGameCount] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ]

  const checkWinner = useCallback((board: Board): Player | 'tie' | null => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }
    
    if (board.every(cell => cell !== null)) {
      return 'tie'
    }
    
    return null
  }, [winningCombinations])

  const handleCellClick = (index: number) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const gameResult = checkWinner(newBoard)
    if (gameResult) {
      setWinner(gameResult)
      const newScore = { ...score }
      if (gameResult === 'X') newScore.X++
      else if (gameResult === 'O') newScore.O++
      else newScore.ties++
      
      setScore(newScore)
      setGameCount(prev => prev + 1)

      // Submit score if user is logged in
      if (user && gameResult !== 'tie') {
        const finalScore = gameResult === 'X' ? newScore.X * 100 : newScore.O * 100
        handleScoreSubmission(finalScore)
      }
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
  }

  const handleScoreSubmission = async (finalScore: number) => {
    if (isProcessing) return
    
    setIsProcessing(true)
    try {
      const success = await submitScore('tic-tac-toe', finalScore, {
        games: gameCount + 1,
        wins: score.X + (winner === 'X' ? 1 : 0),
        losses: score.O + (winner === 'O' ? 1 : 0),
        ties: score.ties + (winner === 'tie' ? 1 : 0)
      })
      
      if (success) {
        toast.success('Score submitted!')
      }
    } catch (error) {
      console.error('Score submission failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setWinner(null)
  }

  const resetScore = () => {
    setScore({ X: 0, O: 0, ties: 0 })
    setGameCount(0)
    resetGame()
  }

  const getCellStyle = (index: number) => {
    const baseStyle = "w-20 h-20 bg-dark-800 border-2 border-primary-600/30 rounded-lg flex items-center justify-center text-3xl font-bold transition-all duration-300 hover:border-primary-500/50 hover:bg-dark-700 cursor-pointer"
    
    if (winner && winningCombinations.some(combo => combo.includes(index) && combo.every(i => board[i] === winner))) {
      return `${baseStyle} bg-primary-600/20 border-primary-400 animate-pulse`
    }
    
    return baseStyle
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Games</span>
          </Link>
          
          <h1 className="text-3xl font-game font-bold text-white text-center">
            Tic Tac Toe 3D
          </h1>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={resetGame}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="Reset Game"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <div className="game-board max-w-md mx-auto">
              {/* Status */}
              <div className="text-center mb-6">
                {winner ? (
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">
                      {winner === 'tie' ? (
                        <span className="text-yellow-400">It's a Tie!</span>
                      ) : (
                        <span className={winner === 'X' ? 'text-primary-400' : 'text-neon-pink'}>
                          Player {winner} Wins! 🎉
                        </span>
                      )}
                    </h2>
                    <button
                      onClick={resetGame}
                      className="neon-button text-sm px-4 py-2"
                    >
                      Play Again
                    </button>
                  </div>
                ) : (
                  <h2 className="text-xl font-semibold">
                    <span className={currentPlayer === 'X' ? 'text-primary-400' : 'text-neon-pink'}>
                      Player {currentPlayer}'s Turn
                    </span>
                  </h2>
                )}
              </div>

              {/* 3x3 Grid */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {board.map((cell, index) => (
                  <button
                    key={index}
                    className={getCellStyle(index)}
                    onClick={() => handleCellClick(index)}
                    disabled={!!cell || !!winner}
                  >
                    {cell && (
                      <span className={cell === 'X' ? 'text-primary-400' : 'text-neon-pink'}>
                        {cell}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Game Controls */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={resetGame}
                  className="cyber-border px-4 py-2 rounded-lg hover:border-primary-500/50 transition-all duration-300"
                >
                  New Game
                </button>
                <button
                  onClick={resetScore}
                  className="cyber-border px-4 py-2 rounded-lg hover:border-red-500/50 transition-all duration-300 text-red-400"
                >
                  Reset Score
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Score Board */}
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-primary-400" />
                <span>Score Board</span>
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-primary-400 font-semibold">Player X:</span>
                  <span className="text-2xl font-bold text-primary-400">{score.X}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neon-pink font-semibold">Player O:</span>
                  <span className="text-2xl font-bold text-neon-pink">{score.O}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-400 font-semibold">Ties:</span>
                  <span className="text-2xl font-bold text-yellow-400">{score.ties}</span>
                </div>
                <hr className="border-primary-800/30" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Games Played:</span>
                  <span className="text-lg font-semibold text-white">{gameCount}</span>
                </div>
              </div>
            </div>

            {/* User Status */}
            {user ? (
              <div className="glass-effect p-4 rounded-xl">
                <h4 className="font-semibold mb-2 text-primary-400">Logged in as:</h4>
                <p className="text-white">{user.username}</p>
                <p className="text-sm text-gray-400">Scores are being tracked!</p>
              </div>
            ) : (
              <div className="glass-effect p-4 rounded-xl">
                <h4 className="font-semibold mb-2 text-yellow-400">Guest Mode</h4>
                <p className="text-gray-400 text-sm mb-3">
                  Log in to save your scores and compete on leaderboards!
                </p>
                <Link href="/" className="neon-button text-sm px-4 py-2 inline-block">
                  Login / Register
                </Link>
              </div>
            )}

            {/* Game Instructions */}
            <div className="glass-effect p-4 rounded-xl">
              <h4 className="font-semibold mb-2 text-primary-400">How to Play</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Click on any empty cell to place your mark</li>
                <li>• Get 3 in a row to win (horizontal, vertical, or diagonal)</li>
                <li>• Player X always goes first</li>
                <li>• Win games to increase your score</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicTacToePage