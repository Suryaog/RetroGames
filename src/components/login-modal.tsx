'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { X, User, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, register } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password)
        if (success) {
          toast.success('Welcome back!')
          onClose()
        } else {
          toast.error('Invalid credentials')
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match')
          setIsLoading(false)
          return
        }
        
        const success = await register(formData.email, formData.username, formData.password)
        if (success) {
          toast.success('Account created successfully!')
          onClose()
        } else {
          toast.error('Registration failed')
        }
      }
    } catch (error) {
      toast.error('Something went wrong')
    }

    setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-dark-900 rounded-2xl p-8 w-full max-w-md border border-primary-800/30 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-game font-bold text-white">
            {isLogin ? 'Welcome Back' : 'Join the Game'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-primary-800/30 rounded-lg focus:border-primary-500 focus:outline-none text-white placeholder-gray-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Username (Register only) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-primary-800/30 rounded-lg focus:border-primary-500 focus:outline-none text-white placeholder-gray-500"
                  placeholder="Choose a username"
                  required
                />
              </div>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 bg-dark-800 border border-primary-800/30 rounded-lg focus:border-primary-500 focus:outline-none text-white placeholder-gray-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password (Register only) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-primary-800/30 rounded-lg focus:border-primary-500 focus:outline-none text-white placeholder-gray-500"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full neon-button py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
              </div>
            ) : (
              <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            )}
          </button>
        </form>

        {/* Toggle Login/Register */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-primary-400 hover:text-primary-300 font-semibold transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Features */}
        <div className="mt-6 pt-6 border-t border-primary-800/30">
          <p className="text-center text-sm text-gray-500 mb-3">Join thousands of players and:</p>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <span className="text-primary-400">✓</span>
              <span>Track your high scores</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-primary-400">✓</span>
              <span>Compete on global leaderboards</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-primary-400">✓</span>
              <span>Unlock achievements</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}