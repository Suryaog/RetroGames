'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/auth-context'
import { LoginModal } from '@/components/login-modal'
import { User, Trophy, Settings, LogOut, Menu, X } from 'lucide-react'

export function Navigation() {
  const { user, logout } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <nav className="relative z-50 bg-dark-950/90 backdrop-blur-md border-b border-primary-800/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-xl font-game font-bold text-neon"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-neon-pink rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">R3D</span>
              </div>
              <span>Retro Games 3D</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                href="/games" 
                className="text-gray-300 hover:text-primary-400 transition-colors"
              >
                Games
              </Link>
              <Link 
                href="/leaderboard" 
                className="text-gray-300 hover:text-primary-400 transition-colors flex items-center space-x-1"
              >
                <Trophy className="w-4 h-4" />
                <span>Leaderboard</span>
              </Link>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-300">
                    Welcome, <span className="text-primary-400 font-semibold">{user.username}</span>
                  </span>
                  <div className="flex items-center space-x-2">
                    <Link 
                      href="/profile" 
                      className="p-2 text-gray-300 hover:text-primary-400 transition-colors"
                    >
                      <User className="w-5 h-5" />
                    </Link>
                    <Link 
                      href="/settings" 
                      className="p-2 text-gray-300 hover:text-primary-400 transition-colors"
                    >
                      <Settings className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={logout}
                      className="p-2 text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="neon-button"
                >
                  Login / Register
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-primary-400 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-primary-800/30">
              <div className="flex flex-col space-y-4">
                <Link 
                  href="/games" 
                  className="text-gray-300 hover:text-primary-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Games
                </Link>
                <Link 
                  href="/leaderboard" 
                  className="text-gray-300 hover:text-primary-400 transition-colors flex items-center space-x-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Trophy className="w-4 h-4" />
                  <span>Leaderboard</span>
                </Link>
                
                {user ? (
                  <div className="flex flex-col space-y-2 pt-2 border-t border-primary-800/30">
                    <span className="text-sm text-gray-300">
                      Welcome, <span className="text-primary-400 font-semibold">{user.username}</span>
                    </span>
                    <div className="flex space-x-4">
                      <Link 
                        href="/profile" 
                        className="flex items-center space-x-1 text-gray-300 hover:text-primary-400 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      <Link 
                        href="/settings" 
                        className="flex items-center space-x-1 text-gray-300 hover:text-primary-400 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout()
                          setIsMobileMenuOpen(false)
                        }}
                        className="flex items-center space-x-1 text-gray-300 hover:text-red-400 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setShowLoginModal(true)
                      setIsMobileMenuOpen(false)
                    }}
                    className="neon-button self-start"
                  >
                    Login / Register
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
        />
      )}
    </>
  )
}