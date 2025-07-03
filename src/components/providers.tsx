'use client'

import React from 'react'
import { GameProvider } from '@/contexts/game-context'
import { AuthProvider } from '@/contexts/auth-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <GameProvider>
        {children}
      </GameProvider>
    </AuthProvider>
  )
}