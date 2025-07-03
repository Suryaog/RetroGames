'use client'

import React from 'react'

export function Hero3D() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Simple CSS-based 3D Background */}
      <div className="absolute inset-0 z-0">
        {/* Floating CSS shapes */}
        <div className="floating-shapes">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
          <div className="floating-shape shape-4"></div>
          <div className="floating-shape shape-5"></div>
        </div>
        
        {/* Particle effect */}
        <div className="particles">
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}></div>
          ))}
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-game font-bold mb-6 bg-gradient-to-r from-primary-400 via-neon-pink to-neon-blue bg-clip-text text-transparent animate-glow">
            RETRO GAMES 3D
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience classic games like never before in stunning 3D. 
            Compete on global leaderboards and relive the golden age of gaming.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a 
            href="#games" 
            className="neon-button text-lg px-8 py-4 inline-flex items-center space-x-2 animate-pulse-slow"
          >
            <span>Start Playing</span>
            <span className="animate-bounce">🎮</span>
          </a>
          <a 
            href="#leaderboard" 
            className="glass-effect px-8 py-4 rounded-lg text-lg hover:bg-white/10 transition-all duration-300 border border-primary-400/30"
          >
            View Leaderboards
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          <div className="glass-effect p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-primary-400 font-game">25+</div>
            <div className="text-sm text-gray-400">Games</div>
          </div>
          <div className="glass-effect p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-neon-pink font-game">∞</div>
            <div className="text-sm text-gray-400">Fun</div>
          </div>
          <div className="glass-effect p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-neon-blue font-game">3D</div>
            <div className="text-sm text-gray-400">Graphics</div>
          </div>
          <div className="glass-effect p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-neon-green font-game">FREE</div>
            <div className="text-sm text-gray-400">To Play</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}