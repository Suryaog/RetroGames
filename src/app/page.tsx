'use client'

import React from 'react'
import { Navigation } from '@/components/navigation'
import { Hero3D } from '@/components/hero-3d'
import { GameGrid } from '@/components/game-grid'
import { Leaderboard } from '@/components/leaderboard'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero3D />
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <GameGrid />
          </div>
          <div className="lg:col-span-1">
            <Leaderboard />
          </div>
        </div>
      </section>
    </main>
  )
}