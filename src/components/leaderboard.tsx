'use client'

import React, { useEffect, useState } from 'react'
import { useGame } from '@/contexts/game-context'
import { Trophy, Medal, Award, Crown } from 'lucide-react'

interface LeaderboardEntry {
  id: string
  score: number
  user: {
    username: string
    avatar?: string
  }
  game: {
    displayName: string
    name: string
  }
  createdAt: string
  rank: number
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1: return <Crown className="w-5 h-5 text-yellow-400" />
    case 2: return <Medal className="w-5 h-5 text-gray-300" />
    case 3: return <Award className="w-5 h-5 text-orange-400" />
    default: return <span className="w-5 h-5 flex items-center justify-center text-gray-500 font-bold">{rank}</span>
  }
}

const getRankStyle = (rank: number) => {
  switch (rank) {
    case 1: return 'border-l-yellow-400 bg-gradient-to-r from-yellow-400/10 to-transparent'
    case 2: return 'border-l-gray-300 bg-gradient-to-r from-gray-300/10 to-transparent'
    case 3: return 'border-l-orange-400 bg-gradient-to-r from-orange-400/10 to-transparent'
    default: return 'border-l-primary-500 bg-gradient-to-r from-primary-500/5 to-transparent'
  }
}

export function Leaderboard() {
  const { scores, fetchTopScores, isLoading } = useGame()
  const [selectedTimeframe, setSelectedTimeframe] = useState<'daily' | 'weekly' | 'all-time'>('all-time')

  useEffect(() => {
    fetchTopScores(10)
  }, [fetchTopScores])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-effect p-6 rounded-xl">
        <div className="flex items-center space-x-2 mb-4">
          <Trophy className="w-6 h-6 text-primary-400" />
          <h2 className="text-2xl font-game font-bold text-white">Leaderboard</h2>
        </div>
        
        {/* Timeframe Selector */}
        <div className="flex space-x-2">
          {(['daily', 'weekly', 'all-time'] as const).map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedTimeframe === timeframe
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700'
              }`}
            >
              {timeframe === 'all-time' ? 'All Time' : timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Spotlight */}
      {scores.length >= 3 && (
        <div className="glass-effect p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 text-center text-primary-400">🏆 Hall of Fame 🏆</h3>
          <div className="flex justify-center items-end space-x-4">
            {/* 2nd Place */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center mb-2 mx-auto">
                <span className="text-dark-900 font-bold text-lg">2</span>
              </div>
              <div className="text-sm font-semibold text-white">{scores[1]?.user.username}</div>
              <div className="text-xs text-gray-400">{scores[1]?.score.toLocaleString()}</div>
              <div className="text-xs text-gray-500">{scores[1]?.game.displayName}</div>
            </div>

            {/* 1st Place */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-2 mx-auto animate-pulse-slow">
                <Crown className="w-8 h-8 text-dark-900" />
              </div>
              <div className="text-lg font-bold text-yellow-400">{scores[0]?.user.username}</div>
              <div className="text-sm text-gray-300">{scores[0]?.score.toLocaleString()}</div>
              <div className="text-xs text-gray-500">{scores[0]?.game.displayName}</div>
            </div>

            {/* 3rd Place */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mb-2 mx-auto">
                <span className="text-dark-900 font-bold text-lg">3</span>
              </div>
              <div className="text-sm font-semibold text-white">{scores[2]?.user.username}</div>
              <div className="text-xs text-gray-400">{scores[2]?.score.toLocaleString()}</div>
              <div className="text-xs text-gray-500">{scores[2]?.game.displayName}</div>
            </div>
          </div>
        </div>
      )}

      {/* Full Leaderboard */}
      <div className="glass-effect rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="font-semibold text-white">Top Players</h3>
        </div>
        
        <div className="max-h-96 overflow-y-auto scrollbar-hide">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
              <p className="mt-2 text-gray-400">Loading scores...</p>
            </div>
          ) : scores.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-600" />
              <p>No scores yet!</p>
              <p className="text-sm">Be the first to set a record.</p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {scores.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`p-3 rounded-lg border-l-4 transition-all duration-300 hover:scale-[1.02] ${getRankStyle(index + 1)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8">
                        {getRankIcon(index + 1)}
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm">
                          {entry.user.username}
                        </div>
                        <div className="text-xs text-gray-500">
                          {entry.game.displayName}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary-400">
                        {entry.score.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-effect p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-primary-400 font-game">
            {scores.length > 0 ? scores[0]?.score.toLocaleString() : '-'}
          </div>
          <div className="text-xs text-gray-500">Highest Score</div>
        </div>
        <div className="glass-effect p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-neon-pink font-game">
            {new Set(scores.map(s => s.user.username)).size}
          </div>
          <div className="text-xs text-gray-500">Active Players</div>
        </div>
      </div>
    </div>
  )
}