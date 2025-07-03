'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface User {
  id: string
  email: string
  username: string
  avatar?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Local storage keys
const USERS_KEY = 'retro_games_users'
const CURRENT_USER_KEY = 'retro_games_current_user'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load current user from localStorage on startup
  useEffect(() => {
    try {
      const currentUserId = localStorage.getItem(CURRENT_USER_KEY)
      if (currentUserId) {
        const users = getUsersFromStorage()
        const foundUser = users.find(u => u.id === currentUserId)
        if (foundUser) {
          setUser(foundUser)
        } else {
          localStorage.removeItem(CURRENT_USER_KEY)
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getUsersFromStorage = (): (User & { password: string })[] => {
    try {
      const users = localStorage.getItem(USERS_KEY)
      return users ? JSON.parse(users) : []
    } catch {
      return []
    }
  }

  const saveUsersToStorage = (users: (User & { password: string })[]) => {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
    } catch (error) {
      console.error('Failed to save users:', error)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = getUsersFromStorage()
      const foundUser = users.find(u => u.email === email && u.password === password)
      
      if (foundUser) {
        const userWithoutPassword = {
          id: foundUser.id,
          email: foundUser.email,
          username: foundUser.username,
          avatar: foundUser.avatar,
          createdAt: foundUser.createdAt
        }
        setUser(userWithoutPassword)
        localStorage.setItem(CURRENT_USER_KEY, foundUser.id)
        return true
      }
      return false
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const register = async (email: string, username: string, password: string): Promise<boolean> => {
    try {
      const users = getUsersFromStorage()
      
      // Check if user already exists
      if (users.some(u => u.email === email || u.username === username)) {
        return false
      }

      const newUser = {
        id: uuidv4(),
        email,
        username,
        password,
        avatar: undefined,
        createdAt: new Date().toISOString(),
      }

      users.push(newUser)
      saveUsersToStorage(users)

      const userWithoutPassword = {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        avatar: newUser.avatar,
        createdAt: newUser.createdAt
      }
      
      setUser(userWithoutPassword)
      localStorage.setItem(CURRENT_USER_KEY, newUser.id)
      return true
    } catch (error) {
      console.error('Registration failed:', error)
      return false
    }
  }

  const logout = () => {
    try {
      localStorage.removeItem(CURRENT_USER_KEY)
      setUser(null)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}